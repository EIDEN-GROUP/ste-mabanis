/**
 * Supabase implementation of the admin repository.
 *
 * This is the ONLY module that talks to the database. Every screen keeps using
 * the `AdminRepository` interface, so the swap from the in-memory seed changes
 * nothing above this file.
 *
 * Conventions:
 *  - Domain ids are the Postgres uuids, except agents: the app identifies staff
 *    by their profile `slug` (e.g. "yassine-el-amrani"), the repository
 *    translates slugs to uuids on writes and back on reads.
 *  - Every mutation mirrors the old in-memory behaviour: side-effect rows
 *    (activities, notifications, tasks, automation runs) are written to the
 *    same tables the UI reads, so timelines and the header bell stay truthful.
 *  - The service-role client bypasses RLS; the policies in 0002/0003 remain as
 *    defence in depth for a future auth phase.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  AdminRepository,
  ActivityInput,
  AppointmentInput,
  CampaignInput,
  ClientInput,
  ClientQuery,
  DocumentInput,
  LeadInput,
  MediaInput,
  NotificationInput,
  Patch,
  PaymentInput,
  PropertyInput,
  PropertyQuery,
  PublicLeadInput,
  ReportQuery,
  TaskInput,
  TransactionInput,
} from "../../lib/admin/repository";
import {
  ACTIVE_PROPERTY_STATUSES,
  LEAD_SOURCES,
  type Activity,
  type AdminProperty,
  type AdminTask,
  type Agent,
  type Appointment,
  type AppointmentStatus,
  type AppNotification,
  type AutomationOverview,
  type AutomationRule,
  type AutomationRuleKey,
  type AutomationRun,
  type Client,
  type ClientMatch,
  type DashboardSummary,
  type FeaturedProperty,
  type ID,
  type InactiveLead,
  type Lead,
  type LeadSource,
  type MarketingCampaign,
  type MarketingStats,
  type MediaKind,
  type Payment,
  type PipelineStage,
  type Priority,
  type PropertyMatch,
  type PropertyMedia,
  type PropertyStatus,
  type Report,
  type ReportKey,
  type SourceStat,
  type StoredDocument,
  type Transaction,
  type TransactionStage,
} from "../../lib/admin/types";
import type { Database } from "../db/types";
import { getSupabase } from "../db/client";

type DB = Database["public"]["Tables"];
type Row<T extends keyof DB> = DB[T]["Row"];

/* --------------------------------------------------------------- utils */

const now = () => new Date().toISOString();

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

const MONTHS = ["Mars", "Avril", "Mai", "Juin", "Juillet", "Août"];

function slugify(text: string) {
  return (
    norm(text)
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "bien"
  );
}

function temperatureFor(score: number): "cold" | "warm" | "hot" {
  if (score >= 70) return "hot";
  if (score >= 40) return "warm";
  return "cold";
}

function dbError(context: string, error: unknown): never {
  const message = error instanceof Error ? error.message : String(error);
  throw new Error(`[supabase:${context}] ${message}`);
}

function isUniqueViolation(error: unknown): boolean {
  return (
    typeof error === "object" && error !== null && (error as { code?: string }).code === "23505"
  );
}

/** Patch<T> → Partial<T>: our undefined-tolerant patch shape for PostgREST. */
function asPartial<T>(patch: Patch<T>): Partial<T> {
  return patch as Partial<T>;
}

function weekBuckets(fromIso: string, toIso: string) {
  const buckets: { from: number; to: number; label: string }[] = [];
  const start = new Date(fromIso).getTime();
  const end = new Date(toIso).getTime();
  const week = 7 * 86_400_000;
  for (let t = start; t < end; t += week) {
    const s = new Date(t);
    buckets.push({
      from: t,
      to: Math.min(t + week, end),
      label: s.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" }),
    });
  }
  if (buckets.length === 0) buckets.push({ from: start, to: end, label: "Période" });
  return buckets;
}

function bucketOf(buckets: { from: number; to: number }[], iso: string) {
  const t = new Date(iso).getTime();
  const idx = buckets.findIndex((b) => t >= b.from && t < b.to);
  return idx < 0 ? buckets.length - 1 : idx;
}

/* ------------------------------------------------------------- matching */

/** Scores an active property against a client's profile (0-100, or null). */
function propertyScore(property: AdminProperty, client: Client): PropertyMatch | null {
  if (!ACTIVE_PROPERTY_STATUSES.includes(property.status)) return null;
  const activeRoles = client.roles.filter((r) => r !== "seller" && r !== "landlord");
  if (activeRoles.length === 0) return null;

  const wantsRent = client.roles.includes("tenant");
  const wantsBuy = client.roles.includes("buyer") || client.roles.includes("investor");
  const isRent = property.transaction === "location";
  const isSale = property.transaction === "vente";

  let score = 0;
  const reasons: string[] = [];

  if ((wantsRent && isRent) || (wantsBuy && isSale)) {
    score += 20;
    reasons.push(isRent ? "Recherche une location" : "Recherche un achat");
  } else if ((wantsBuy && isRent) || (wantsRent && isSale)) {
    score += 5;
  } else {
    return null;
  }

  if (client.city) {
    if (norm(client.city) === norm(property.city)) {
      score += 25;
      reasons.push(`Secteur ${property.city}`);
    } else {
      score += 5;
      reasons.push(`Ville ${property.city}`);
    }
  } else {
    score += 10;
    reasons.push("Sans préférence de ville");
  }

  if (client.budgetMin !== undefined && client.budgetMax !== undefined) {
    if (property.price >= client.budgetMin && property.price <= client.budgetMax) {
      score += 30;
      reasons.push("Budget compatible");
    } else if (property.price <= client.budgetMax * 1.1) {
      score += 12;
      reasons.push("Légèrement au-dessus du budget");
    } else {
      score -= 20;
    }
  }

  if (
    property.features.some((f) => norm(f).includes("piscine")) &&
    norm(client.notes ?? "").includes("piscine")
  ) {
    score += 10;
    reasons.push("Piscine");
  }
  if (
    property.features.some((f) => norm(f).includes("vue mer")) &&
    norm(client.notes ?? "").includes("mer")
  ) {
    score += 10;
    reasons.push("Vue mer");
  }

  return score <= 0 ? null : { propertyId: property.id, score: Math.min(score, 100), reasons };
}

function clientScore(client: Client, property: AdminProperty): ClientMatch | null {
  const match = propertyScore(property, client);
  if (!match) return null;
  return { clientId: client.id, score: match.score, reasons: match.reasons };
}

/* -------------------------------------------------------------- db access */

function db(): SupabaseClient<Database> {
  return getSupabase();
}

/** All staff profiles; slugs fall back to a name-derived slug when missing. */
async function loadProfiles(): Promise<Row<"profiles">[]> {
  const { data, error } = await db().from("profiles").select("*");
  if (error) dbError("profiles", error);
  return data ?? [];
}

function agentIdOf(profile: Row<"profiles">): string {
  return profile.slug ?? slugify(profile.name);
}

/** uuid → app-level agent id (slug) for every profile. */
async function agentMap(): Promise<Map<string, string>> {
  const rows = await loadProfiles();
  const map = new Map<string, string>();
  for (const p of rows) map.set(p.id, agentIdOf(p));
  return map;
}

/** Resolve an app-level agent id (slug) to the profile uuid. */
async function slugToUuid(agentId: string): Promise<string | null> {
  const rows = await loadProfiles();
  for (const p of rows) if (agentIdOf(p) === agentId) return p.id;
  if (rows.some((p) => p.id === agentId)) return agentId;
  return null;
}

/** The first-created profile is the default agent, like seedAgents[0]. */
async function defaultAgentId(): Promise<string> {
  const rows = await loadProfiles();
  if (rows.length === 0) return "yassine-el-amrani";
  rows.sort((a, b) => a.created_at.localeCompare(b.created_at));
  return agentIdOf(rows[0]!);
}

async function countRows(table: "properties" | "transactions"): Promise<number> {
  const { count, error } = await db().from(table).select("id", { count: "exact", head: true });
  if (error) dbError(`count:${table}`, error);
  return count ?? 0;
}

/* -------------------------------------------------------------- mappers */

function mapAgent(row: Row<"profiles">): Agent {
  return {
    id: agentIdOf(row),
    name: row.name,
    role: row.role,
    email: row.email,
    avatarUrl: row.avatar_url ?? undefined,
  };
}

function mapProperty(
  row: Row<"properties">,
  media: PropertyMedia[],
  agents: Map<string, string>,
  fallbackAgent: string,
): AdminProperty {
  return {
    id: row.id,
    reference: row.reference,
    slug: row.slug,
    title: row.title,
    status: row.status,
    transaction: row.transaction,
    type: row.type,
    city: row.city,
    neighborhood: row.neighborhood,
    price: row.price,
    surface: row.surface,
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    description: row.description,
    features: row.features,
    media,
    agentId: row.agent_id ? (agents.get(row.agent_id) ?? row.agent_id) : fallbackAgent,
    ownerClientId: row.owner_client_id ?? undefined,
    soldAt: row.sold_at ?? undefined,
    views30d: row.views_30d,
    leadCount: row.lead_count,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapMedia(row: Row<"property_media">): PropertyMedia {
  return {
    id: row.id,
    propertyId: row.property_id,
    kind: row.kind,
    url: row.url,
    label: row.label ?? undefined,
    position: row.position,
    isCover: row.is_cover,
  };
}

function mapClient(
  row: Row<"clients">,
  agents: Map<string, string>,
  fallbackAgent: string,
): Client {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone,
    roles: row.roles,
    temperature: row.temperature,
    score: row.score,
    source: row.source,
    city: row.city ?? undefined,
    budgetMin: row.budget_min ?? undefined,
    budgetMax: row.budget_max ?? undefined,
    notes: row.notes ?? undefined,
    agentId: row.agent_id ? (agents.get(row.agent_id) ?? row.agent_id) : fallbackAgent,
    createdAt: row.created_at,
    lastContactedAt: row.last_contacted_at ?? undefined,
  };
}

function mapLead(row: Row<"leads">, agents: Map<string, string>, fallbackAgent: string): Lead {
  return {
    id: row.id,
    clientId: row.client_id,
    propertyId: row.property_id ?? undefined,
    stage: row.stage,
    temperature: row.temperature,
    score: row.score,
    source: row.source,
    value: row.value,
    agentId: row.agent_id ? (agents.get(row.agent_id) ?? row.agent_id) : fallbackAgent,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    nextAction: row.next_action ?? undefined,
    nextActionAt: row.next_action_at ?? undefined,
  };
}

function mapActivity(row: Row<"activities">, agents: Map<string, string>): Activity {
  return {
    id: row.id,
    kind: row.kind,
    subject: row.subject,
    body: row.body ?? undefined,
    clientId: row.client_id ?? undefined,
    propertyId: row.property_id ?? undefined,
    leadId: row.lead_id ?? undefined,
    agentId: row.agent_id ? (agents.get(row.agent_id) ?? row.agent_id) : "",
    createdAt: row.created_at,
  };
}

function mapAppointment(row: Row<"appointments">): Appointment {
  return {
    id: row.id,
    kind: row.kind,
    status: row.status,
    title: row.title,
    startsAt: row.starts_at,
    endsAt: row.ends_at,
    propertyId: row.property_id ?? undefined,
    clientId: row.client_id ?? undefined,
    agentId: row.agent_id ?? "",
    location: row.location ?? undefined,
    report:
      row.report_interest !== null && row.report_outcome !== null
        ? {
            interest: row.report_interest,
            outcome: row.report_outcome,
            nextAction: row.report_next_action ?? undefined,
          }
        : undefined,
  };
}

function mapDocument(row: Row<"documents">): StoredDocument {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    mimeType: row.mime_type,
    sizeBytes: row.size_bytes,
    version: row.version,
    url: row.storage_path,
    propertyId: row.property_id ?? undefined,
    clientId: row.client_id ?? undefined,
    transactionId: row.transaction_id ?? undefined,
    uploadedById: row.uploaded_by ?? "",
    createdAt: row.created_at,
  };
}

function mapTask(row: Row<"tasks">, agents: Map<string, string>): AdminTask {
  return {
    id: row.id,
    title: row.title,
    status: row.status,
    priority: row.priority,
    dueAt: row.due_at ?? undefined,
    assigneeId: row.assignee_id ? (agents.get(row.assignee_id) ?? row.assignee_id) : "",
    entity:
      row.entity_kind && row.entity_id ? { kind: row.entity_kind, id: row.entity_id } : undefined,
    createdAt: row.created_at,
  };
}

function mapPayment(row: Row<"payments">): Payment {
  return {
    id: row.id,
    label: row.label,
    amount: row.amount,
    dueAt: row.due_at,
    paidAt: row.paid_at ?? undefined,
  };
}

function mapTransaction(
  row: Row<"transactions">,
  payments: Payment[],
  agents: Map<string, string>,
): Transaction {
  return {
    id: row.id,
    reference: row.reference,
    stage: row.stage,
    propertyId: row.property_id,
    buyerClientId: row.buyer_client_id ?? "",
    sellerClientId: row.seller_client_id ?? undefined,
    agentId: row.agent_id ? (agents.get(row.agent_id) ?? row.agent_id) : "",
    amount: row.amount,
    commission: row.commission,
    payments,
    openedAt: row.opened_at,
    closedAt: row.closed_at ?? undefined,
  };
}

function mapNotification(row: Row<"notifications">): AppNotification {
  return {
    id: row.id,
    kind: row.kind,
    title: row.title,
    body: row.body,
    read: row.read,
    createdAt: row.created_at,
    href: row.href ?? undefined,
  };
}

function mapCampaign(row: Row<"marketing_campaigns">): MarketingCampaign {
  return {
    id: row.id,
    name: row.name,
    subject: row.subject,
    channel: row.channel,
    status: row.status,
    audience: row.audience,
    audienceCount: row.audience_count,
    sentAt: row.sent_at ?? undefined,
    opens: row.opens,
    clicks: row.clicks,
    conversions: row.conversions,
    createdAt: row.created_at,
  };
}

function mapFeatured(row: Row<"featured_properties">): FeaturedProperty {
  return {
    propertyId: row.property_id,
    since: row.since,
    until: row.until ?? "",
  };
}

function mapAutomationRun(row: Row<"automation_runs">): AutomationRun {
  return {
    id: row.id,
    rule: row.rule as AutomationRuleKey,
    title: row.title,
    detail: row.detail,
    at: row.at,
  };
}

/* ---------------------------------------------------------- media helpers */

async function mediaForProperty(propertyId: string): Promise<PropertyMedia[]> {
  const { data, error } = await db()
    .from("property_media")
    .select("*")
    .eq("property_id", propertyId)
    .order("position", { ascending: true });
  if (error) dbError("property_media", error);
  return (data ?? []).map(mapMedia);
}

/** Replace a property's media rows with the given (normalized) list. */
async function replaceMedia(propertyId: string, media: PropertyMedia[]): Promise<void> {
  const { error: del } = await db().from("property_media").delete().eq("property_id", propertyId);
  if (del) dbError("property_media.delete", del);
  if (media.length === 0) return;
  const rows = media.map((m) => ({
    id: m.id,
    property_id: m.propertyId,
    kind: m.kind,
    url: m.url,
    label: m.label ?? null,
    position: m.position,
    is_cover: m.isCover,
  }));
  const { error } = await db().from("property_media").insert(rows);
  if (error) dbError("property_media.insert", error);
}

function sortMedia(list: PropertyMedia[]) {
  return [...list].sort((a, b) => {
    const order: Record<MediaKind, number> = { photo: 0, floor_plan: 1, video: 2 };
    if (order[a.kind] !== order[b.kind]) return order[a.kind] - order[b.kind];
    return a.position - b.position;
  });
}

/**
 * Keeps a property's media consistent after any change: sorted by kind then
 * position, and exactly one photo carries the cover flag (the first photo when
 * none is marked).
 */
function normalizeMedia(property: AdminProperty): AdminProperty {
  const media = sortMedia(property.media);
  let coverAssigned = false;
  const normalized = media.map((m) => {
    if (m.kind !== "photo") return m;
    if (m.isCover && !coverAssigned) {
      coverAssigned = true;
      return m;
    }
    return { ...m, isCover: false };
  });
  const firstPhoto = normalized.find((m) => m.kind === "photo");
  if (firstPhoto && !coverAssigned) {
    const idx = normalized.findIndex((m) => m.id === firstPhoto.id);
    normalized[idx] = { ...normalized[idx]!, isCover: true };
  }
  return { ...property, media: normalized };
}

/* ------------------------------------------------- side-effect row writers */

async function insertActivity(input: ActivityInput): Promise<Activity> {
  const fallback = await defaultAgentId();
  const agentId = input.agentId ?? fallback;
  const agentUuid = await slugToUuid(agentId);
  const { data, error } = await db()
    .from("activities")
    .insert({
      id: crypto.randomUUID(),
      kind: input.kind,
      subject: input.subject,
      body: input.body ?? null,
      client_id: input.clientId ?? null,
      property_id: input.propertyId ?? null,
      lead_id: input.leadId ?? null,
      agent_id: agentUuid,
      created_at: now(),
    })
    .select()
    .single();
  if (error) dbError("activities.insert", error);
  const agents = await agentMap();
  return mapActivity(data!, agents);
}

async function insertNotification(input: NotificationInput): Promise<AppNotification> {
  const { data, error } = await db()
    .from("notifications")
    .insert({
      id: crypto.randomUUID(),
      recipient_id: null,
      kind: input.kind,
      title: input.title,
      body: input.body,
      href: input.href ?? null,
      read: false,
      created_at: now(),
    })
    .select()
    .single();
  if (error) dbError("notifications.insert", error);
  return mapNotification(data!);
}

async function insertTask(input: TaskInput): Promise<AdminTask> {
  const assigneeId = input.assigneeId ?? (await defaultAgentId());
  const assigneeUuid = await slugToUuid(assigneeId);
  const { data, error } = await db()
    .from("tasks")
    .insert({
      id: crypto.randomUUID(),
      title: input.title,
      status: input.status ?? "todo",
      priority: input.priority ?? "normal",
      due_at: input.dueAt ?? null,
      assignee_id: assigneeUuid,
      entity_kind: input.entity?.kind ?? null,
      entity_id: input.entity?.id ?? null,
      created_at: now(),
    })
    .select()
    .single();
  if (error) dbError("tasks.insert", error);
  const agents = await agentMap();
  return mapTask(data!, agents);
}

/* ---------------------------------------------------------- automations */

const AUTOMATION_META: Record<AutomationRuleKey, { title: string; description: string }> = {
  leadFirstContact: {
    title: "Nouveau lead → contact sous 24 h",
    description:
      "Tâche de premier contact, affectation à l'agent et notification à la création d'un lead.",
  },
  visitConfirmTask: {
    title: "Visite planifiée → confirmation",
    description:
      "Tâche de confirmation à la planification, tâche de débrief quand la visite est terminée.",
  },
  soldClosesTransaction: {
    title: "Bien vendu → transaction clôturée",
    description: "Passe la transaction associée à l'étape clôture quand un bien quitte le marché.",
  },
  inactiveLeadRelance: {
    title: "Lead inactif 3 jours → relance",
    description:
      "Détecte les leads sans activité depuis 3 jours et crée la tâche de rappel de l'agent.",
  },
};

/** Missing rows default to enabled, matching the old in-memory flags. */
async function getAutomationRule(key: AutomationRuleKey) {
  const { data, error } = await db()
    .from("automation_rules")
    .select("key, enabled, runs, last_run")
    .eq("key", key)
    .maybeSingle();
  if (error) dbError("automation_rules", error);
  return data ?? { key, enabled: true, runs: 0, last_run: null };
}

async function recordAutomationRun(key: AutomationRuleKey, title: string, detail: string) {
  const at = now();
  const { error } = await db()
    .from("automation_runs")
    .insert({ id: crypto.randomUUID(), rule: key, title, detail, at });
  if (error) dbError("automation_runs.insert", error);
  const rule = await getAutomationRule(key);
  const { error: bump } = await db()
    .from("automation_rules")
    .update({ runs: (rule.runs ?? 0) + 1, last_run: at })
    .eq("key", key);
  if (bump) dbError("automation_rules.update", bump);
}

/* ---------------------------------------------------------- repository */

export type SupabaseRepository = AdminRepository & {
  listFeatured(): Promise<FeaturedProperty[]>;
  getTransaction(transactionId: ID): Promise<Transaction | null>;
  findClientByEmail(email: string): Promise<Client | null>;
};

export const supabaseRepository: SupabaseRepository = {
  /* ---------------------------------------------------------- properties */

  async listProperties(q = {}) {
    const { data, error } = await db().from("properties").select("*");
    if (error) dbError("properties", error);
    const rows = data ?? [];
    const agents = await agentMap();
    const fallback = await defaultAgentId();

    let mediaRows: Row<"property_media">[] = [];
    if (rows.length > 0) {
      const m = await db()
        .from("property_media")
        .select("*")
        .in(
          "property_id",
          rows.map((r) => r.id),
        )
        .order("position", { ascending: true });
      if (m.error) dbError("property_media", m.error);
      mediaRows = m.data ?? [];
    }
    const mediaByProperty = new Map<string, PropertyMedia[]>();
    for (const m of mediaRows) {
      const list = mediaByProperty.get(m.property_id) ?? [];
      list.push(mapMedia(m));
      mediaByProperty.set(m.property_id, list);
    }

    let list = rows.map((r) =>
      normalizeMedia(mapProperty(r, mediaByProperty.get(r.id) ?? [], agents, fallback)),
    );

    if (q.search) {
      const term = norm(q.search);
      list = list.filter((p) =>
        [p.title, p.reference, p.neighborhood, p.city, p.type].some((f) => norm(f).includes(term)),
      );
    }
    if (q.status?.length) list = list.filter((p) => q.status!.includes(p.status));
    if (q.transaction) list = list.filter((p) => p.transaction === q.transaction);
    if (q.agentId) list = list.filter((p) => p.agentId === q.agentId);
    if (q.city) list = list.filter((p) => p.city === q.city);
    if (q.minPrice) list = list.filter((p) => p.price >= q.minPrice!);
    if (q.maxPrice) list = list.filter((p) => p.price <= q.maxPrice!);

    switch (q.sort) {
      case "price_asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "views":
        list.sort((a, b) => b.views30d - a.views30d);
        break;
      default:
        list.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    }
    return list;
  },

  async getProperty(id) {
    const { data, error } = await db().from("properties").select("*").eq("id", id).maybeSingle();
    if (error) dbError("properties", error);
    if (!data) return null;
    const agents = await agentMap();
    const fallback = await defaultAgentId();
    return normalizeMedia(mapProperty(data, await mediaForProperty(id), agents, fallback));
  },

  async createProperty(input) {
    const id = crypto.randomUUID();
    const createdAt = now();
    const agentUuid = await slugToUuid(input.agentId ?? (await defaultAgentId()));
    const left = input.status === "sold" || input.status === "rented";

    for (let attempt = 0; attempt < 5; attempt++) {
      const reference =
        attempt === 0
          ? input.reference
          : `MB-${1100 + (await countRows("properties")) + Math.floor(Math.random() * 90)}`;
      const row: Row<"properties"> = {
        id,
        reference:
          reference ??
          `MB-${1100 + (await countRows("properties")) + Math.floor(Math.random() * 90)}`,
        slug: `${slugify(input.title)}-${id.slice(-4)}`,
        title: input.title,
        status: input.status ?? "draft",
        transaction: input.transaction,
        type: input.type,
        city: input.city,
        neighborhood: input.neighborhood,
        price: input.price,
        surface: input.surface,
        bedrooms: input.bedrooms ?? 0,
        bathrooms: input.bathrooms ?? 0,
        description: input.description ?? "",
        features: input.features ?? [],
        agent_id: agentUuid,
        owner_client_id: null,
        sold_at: left ? createdAt : null,
        views_30d: 0,
        lead_count: 0,
        created_at: createdAt,
        updated_at: createdAt,
        year: null,
        land_surface: null,
        price_note: null,
        map_query: null,
      };
      const { data, error } = await db().from("properties").insert(row).select().single();
      if (error) {
        if (attempt < 4 && isUniqueViolation(error)) continue;
        dbError("properties.insert", error);
      }
      const agents = await agentMap();
      const fallback = await defaultAgentId();
      const property = normalizeMedia(mapProperty(data!, [], agents, fallback));
      await insertActivity({
        kind: "note",
        subject: "Bien créé",
        body: `Fiche ${property.reference} — ${property.title}`,
        propertyId: id,
      });
      return property;
    }
    throw new Error("[supabase:properties.insert] could not allocate a unique reference");
  },

  async updateProperty(id, patch) {
    const upd: Patch<Row<"properties">> = {};
    if (patch.reference !== undefined) upd.reference = patch.reference;
    if (patch.title !== undefined) upd.title = patch.title;
    if (patch.status !== undefined) upd.status = patch.status;
    if (patch.transaction !== undefined) upd.transaction = patch.transaction;
    if (patch.type !== undefined) upd.type = patch.type;
    if (patch.city !== undefined) upd.city = patch.city;
    if (patch.neighborhood !== undefined) upd.neighborhood = patch.neighborhood;
    if (patch.price !== undefined) upd.price = patch.price;
    if (patch.surface !== undefined) upd.surface = patch.surface;
    if (patch.bedrooms !== undefined) upd.bedrooms = patch.bedrooms;
    if (patch.bathrooms !== undefined) upd.bathrooms = patch.bathrooms;
    if (patch.description !== undefined) upd.description = patch.description;
    if (patch.features !== undefined) upd.features = patch.features;
    if (patch.agentId !== undefined) {
      const agentUuid = await slugToUuid(patch.agentId);
      if (agentUuid) upd.agent_id = agentUuid;
    }
    if (Object.keys(upd).length === 0) return this.getProperty(id);
    const { data, error } = await db()
      .from("properties")
      .update({ ...asPartial(upd), updated_at: now() })
      .eq("id", id)
      .select()
      .maybeSingle();
    if (error) dbError("properties.update", error);
    if (!data) return null;
    const agents = await agentMap();
    const fallback = await defaultAgentId();
    const property = normalizeMedia(
      mapProperty(data, await mediaForProperty(id), agents, fallback),
    );
    await insertActivity({
      kind: "note",
      subject: "Bien mis à jour",
      body: `${property.reference} — ${property.title}`,
      propertyId: id,
    });
    return property;
  },

  async updatePropertyStatus(id, status) {
    const { data, error } = await db()
      .from("properties")
      .update({ status })
      .eq("id", id)
      .select()
      .maybeSingle();
    if (error) dbError("properties.update", error);
    if (!data) return null;
    const agents = await agentMap();
    const fallback = await defaultAgentId();
    // The stamp_property_exit trigger keeps sold_at truthful.
    const property = normalizeMedia(
      mapProperty(data, await mediaForProperty(id), agents, fallback),
    );
    const left = status === "sold" || status === "rented";
    await insertActivity({
      kind: "stage_change",
      subject: `Statut → ${status}`,
      body: left
        ? "Le bien quitte le marché public, l'historique est conservé."
        : status === "available"
          ? "Le bien est de nouveau visible sur le site public."
          : undefined,
      propertyId: id,
    });
    if (left) {
      await insertNotification({
        kind: "transaction",
        title: status === "sold" ? "Bien vendu" : "Bien loué",
        body: `${property.reference} — ${property.title} quitte le marché.`,
        href: "/admin/proprietes",
      });
      // Automation: close any open transaction on this property.
      const rule = await getAutomationRule("soldClosesTransaction");
      if (rule.enabled) {
        const txn = await db()
          .from("transactions")
          .select("*")
          .eq("property_id", id)
          .is("closed_at", null)
          .neq("stage", "closing")
          .maybeSingle();
        if (!txn.error && txn.data) {
          await db()
            .from("transactions")
            .update({ stage: "closing", closed_at: txn.data.closed_at ?? now() })
            .eq("id", txn.data.id);
          await recordAutomationRun(
            "soldClosesTransaction",
            "Transaction clôturée",
            `${txn.data.reference} — ${property.reference} passe à l'étape clôture.`,
          );
        }
      }
    }
    return property;
  },

  async deleteProperty(id) {
    const { data: current, error } = await db()
      .from("properties")
      .select("reference, title")
      .eq("id", id)
      .maybeSingle();
    if (error) dbError("properties", error);
    if (!current) return;
    // transactions.property_id is on delete restrict — refuse loudly.
    const { data: open, error: txnErr } = await db()
      .from("transactions")
      .select("id")
      .eq("property_id", id)
      .limit(1);
    if (txnErr) dbError("transactions", txnErr);
    if (open && open.length > 0) {
      throw new Error(
        "[supabase:properties.delete] Impossible de supprimer : des transactions sont liées à ce bien.",
      );
    }
    await db().from("property_media").delete().eq("property_id", id);
    const { error: delErr } = await db().from("properties").delete().eq("id", id);
    if (delErr) dbError("properties.delete", delErr);
    await insertActivity({
      kind: "note",
      subject: "Bien supprimé",
      body: `${current.reference} — ${current.title}`,
    });
  },

  async addMedia(propertyId, items) {
    const current = await this.getProperty(propertyId);
    if (!current) return null;
    const counts: Record<MediaKind, number> = { photo: 0, floor_plan: 0, video: 0 };
    for (const m of current.media) counts[m.kind] = Math.max(counts[m.kind], m.position + 1);
    const added: PropertyMedia[] = items.map((item, idx) => {
      const kind = item.kind ?? "photo";
      return {
        id: crypto.randomUUID(),
        propertyId,
        kind,
        url: item.url,
        label: item.label,
        position: counts[kind] + idx,
        isCover: kind === "photo" && item.isCover === true,
      };
    });
    const next = normalizeMedia({ ...current, media: [...current.media, ...added] });
    await replaceMedia(propertyId, next.media);
    return this.getProperty(propertyId);
  },

  async updateMedia(id, patch) {
    const { data, error } = await db()
      .from("property_media")
      .select("property_id")
      .eq("id", id)
      .maybeSingle();
    if (error) dbError("property_media", error);
    if (!data) return null;
    const property = await this.getProperty(data.property_id);
    if (!property) return null;
    const media = property.media.map((m) =>
      m.id === id
        ? {
            ...m,
            label: patch.label ?? m.label,
            isCover: patch.isCover ?? m.isCover,
          }
        : m,
    );
    const next = normalizeMedia({ ...property, media });
    await replaceMedia(property.id, next.media);
    return this.getProperty(property.id);
  },

  async moveMedia(id, direction) {
    const { data, error } = await db()
      .from("property_media")
      .select("property_id")
      .eq("id", id)
      .maybeSingle();
    if (error) dbError("property_media", error);
    if (!data) return null;
    const property = await this.getProperty(data.property_id);
    if (!property) return null;
    const media = [...property.media];
    const index = media.findIndex((m) => m.id === id);
    const swapWith = index + direction;
    if (index < 0 || swapWith < 0 || swapWith >= media.length) return property;
    const a = media[index]!;
    const b = media[swapWith]!;
    if (a.kind !== b.kind) return property;
    media[index] = { ...b, position: a.position };
    media[swapWith] = { ...a, position: b.position };
    const next = normalizeMedia({ ...property, media });
    await replaceMedia(property.id, next.media);
    return this.getProperty(property.id);
  },

  async removeMedia(id) {
    const { data, error } = await db()
      .from("property_media")
      .select("property_id")
      .eq("id", id)
      .maybeSingle();
    if (error) dbError("property_media", error);
    if (!data) return null;
    const property = await this.getProperty(data.property_id);
    if (!property) return null;
    const next = normalizeMedia({
      ...property,
      media: property.media.filter((m) => m.id !== id),
    });
    await replaceMedia(property.id, next.media);
    return this.getProperty(property.id);
  },

  /* ------------------------------------------------------------ clients */

  async listClients(q = {}) {
    const { data, error } = await db().from("clients").select("*");
    if (error) dbError("clients", error);
    const agents = await agentMap();
    const fallback = await defaultAgentId();
    let list = (data ?? []).map((r) => mapClient(r, agents, fallback));
    if (q.search) {
      const term = norm(q.search);
      list = list.filter((c) =>
        [c.firstName, c.lastName, c.email, c.phone].some((f) => norm(f).includes(term)),
      );
    }
    if (q.roles?.length) list = list.filter((c) => c.roles.some((r) => q.roles!.includes(r)));
    if (q.temperature?.length) list = list.filter((c) => q.temperature!.includes(c.temperature));
    if (q.agentId) list = list.filter((c) => c.agentId === q.agentId);
    return list.sort((a, b) => b.score - a.score);
  },

  async getClient(id) {
    const { data, error } = await db().from("clients").select("*").eq("id", id).maybeSingle();
    if (error) dbError("clients", error);
    if (!data) return null;
    const agents = await agentMap();
    return mapClient(data, agents, await defaultAgentId());
  },

  async createClient(input) {
    const createdAt = now();
    const agentUuid = await slugToUuid(input.agentId ?? (await defaultAgentId()));
    const { data, error } = await db()
      .from("clients")
      .insert({
        id: crypto.randomUUID(),
        first_name: input.firstName,
        last_name: input.lastName,
        email: input.email,
        phone: input.phone ?? "",
        roles: input.roles ?? ["buyer"],
        temperature: input.temperature ?? "cold",
        score: input.score ?? 20,
        source: input.source ?? "site_web",
        city: input.city ?? null,
        budget_min: input.budgetMin ?? null,
        budget_max: input.budgetMax ?? null,
        notes: input.notes ?? null,
        agent_id: agentUuid,
        created_at: createdAt,
        last_contacted_at: createdAt,
      })
      .select()
      .single();
    if (error) dbError("clients.insert", error);
    const agents = await agentMap();
    const client = mapClient(data!, agents, await defaultAgentId());
    await insertActivity({
      kind: "note",
      subject: "Client créé",
      body: `${client.firstName} ${client.lastName} — ${client.email}`,
      clientId: client.id,
    });
    return client;
  },

  async updateClient(id, patch) {
    const { data: current, error } = await db()
      .from("clients")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) dbError("clients", error);
    if (!current) return null;
    const upd: Patch<Row<"clients">> = {};
    if (patch.firstName !== undefined) upd.first_name = patch.firstName;
    if (patch.lastName !== undefined) upd.last_name = patch.lastName;
    if (patch.email !== undefined) upd.email = patch.email;
    if (patch.phone !== undefined) upd.phone = patch.phone;
    if (patch.roles !== undefined) upd.roles = patch.roles;
    if (patch.temperature !== undefined) upd.temperature = patch.temperature;
    if (patch.score !== undefined) upd.score = patch.score;
    if (patch.source !== undefined) upd.source = patch.source;
    if (patch.city !== undefined) upd.city = patch.city ?? null;
    if (patch.budgetMin !== undefined) upd.budget_min = patch.budgetMin ?? null;
    if (patch.budgetMax !== undefined) upd.budget_max = patch.budgetMax ?? null;
    if (patch.notes !== undefined) upd.notes = patch.notes ?? null;
    if (patch.agentId !== undefined) {
      const agentUuid = await slugToUuid(patch.agentId);
      if (agentUuid) upd.agent_id = agentUuid;
    }
    if (Object.keys(upd).length === 0)
      return mapClient(current, await agentMap(), await defaultAgentId());
    const { data, error: updErr } = await db()
      .from("clients")
      .update(asPartial(upd))
      .eq("id", id)
      .select()
      .single();
    if (updErr) dbError("clients.update", updErr);
    const agents = await agentMap();
    const client = mapClient(data!, agents, await defaultAgentId());
    await insertActivity({
      kind: "note",
      subject: "Fiche client mise à jour",
      body: `${client.firstName} ${client.lastName}`,
      clientId: id,
    });
    return client;
  },

  async deleteClient(id) {
    const { data: current, error } = await db()
      .from("clients")
      .select("first_name, last_name, email")
      .eq("id", id)
      .maybeSingle();
    if (error) dbError("clients", error);
    if (!current) return;
    const { error: delErr } = await db().from("clients").delete().eq("id", id);
    if (delErr) dbError("clients.delete", delErr);
    await insertActivity({
      kind: "note",
      subject: "Client supprimé",
      body: `${current.first_name} ${current.last_name} — ${current.email}`,
    });
  },

  /* -------------------------------------------------------------- leads */

  async listLeads() {
    const { data, error } = await db().from("leads").select("*");
    if (error) dbError("leads", error);
    const agents = await agentMap();
    const fallback = await defaultAgentId();
    return (data ?? []).map((r) => mapLead(r, agents, fallback));
  },

  async getLead(id) {
    const { data, error } = await db().from("leads").select("*").eq("id", id).maybeSingle();
    if (error) dbError("leads", error);
    if (!data) return null;
    const agents = await agentMap();
    return mapLead(data, agents, await defaultAgentId());
  },

  async createLead(input) {
    const createdAt = now();
    const agentUuid = await slugToUuid(input.agentId ?? (await defaultAgentId()));
    const { data, error } = await db()
      .from("leads")
      .insert({
        id: crypto.randomUUID(),
        client_id: input.clientId,
        property_id: input.propertyId ?? null,
        stage: input.stage ?? "new",
        temperature: input.temperature ?? "cold",
        score: input.score ?? 30,
        source: input.source ?? "site_web",
        value: input.value ?? 0,
        agent_id: agentUuid,
        created_at: createdAt,
        updated_at: createdAt,
        next_action: input.nextAction ?? null,
        next_action_at: input.nextActionAt ?? null,
      })
      .select()
      .single();
    if (error) dbError("leads.insert", error);
    const agents = await agentMap();
    const lead = mapLead(data!, agents, await defaultAgentId());
    const client = await this.getClient(lead.clientId);
    await insertActivity({
      kind: "note",
      subject: "Lead créé",
      body: `${client?.firstName ?? "Client"} ${client?.lastName ?? ""} — ${lead.stage}`,
      clientId: lead.clientId,
      propertyId: lead.propertyId,
      leadId: lead.id,
    });
    // Automation: a brand-new lead gets a follow-up task and a notification.
    if (lead.stage === "new" && (await getAutomationRule("leadFirstContact")).enabled) {
      await insertTask({
        title: "Premier contact sous 24 h",
        status: "todo",
        priority: "high",
        dueAt: new Date(Date.now() + 24 * 3_600_000).toISOString(),
        assigneeId: lead.agentId,
        entity: { kind: "lead", id: lead.id },
      });
      await insertNotification({
        kind: "lead",
        title: "Nouveau lead",
        body: `${client?.firstName ?? ""} ${client?.lastName ?? ""} — à contacter sous 24 h.`,
        href: "/admin/crm",
      });
      await recordAutomationRun(
        "leadFirstContact",
        "Premier contact planifié",
        `${client?.firstName ?? ""} ${client?.lastName ?? ""} — tâche créée pour ${lead.agentId}.`,
      );
    }
    return lead;
  },

  async createPublicLead(input) {
    const email = input.email.trim().toLowerCase();
    let client = await this.findClientByEmail(email);
    if (!client) {
      client = await this.createClient({
        firstName: input.firstName,
        lastName: input.lastName,
        email,
        phone: input.phone ?? "",
        roles: ["buyer"],
        source: "site_web",
        city: undefined,
        agentId: input.agentId,
      });
    } else if (input.phone && !client.phone) {
      const updated = await this.updateClient(client.id, { phone: input.phone });
      if (updated) client = updated;
    }
    const property = input.propertyId ? await this.getProperty(input.propertyId) : undefined;
    const agent = input.agentId ?? client.agentId ?? (await defaultAgentId());
    const lead = await this.createLead({
      clientId: client.id,
      propertyId: property?.id,
      agentId: agent,
      stage: "new",
      temperature: temperatureFor(35),
      score: 35,
      source: "site_web",
      value: property?.price ?? 0,
      nextAction: "Premier contact téléphonique",
      nextActionAt: new Date(Date.now() + 24 * 3_600_000).toISOString(),
    });
    await insertActivity({
      kind: "note",
      subject: "Demande reçue via le site",
      body: input.message?.trim()
        ? input.message.trim()
        : `Intent : ${input.intent ?? "contact"}${property ? ` — ${property.reference}` : ""}`,
      clientId: client.id,
      propertyId: property?.id,
      leadId: lead.id,
    });
    return lead;
  },

  async updateLead(id, patch) {
    const { data: current, error } = await db()
      .from("leads")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) dbError("leads", error);
    if (!current) return null;
    const upd: Patch<Row<"leads">> = {};
    if (patch.propertyId !== undefined) upd.property_id = patch.propertyId ?? null;
    if (patch.temperature !== undefined) upd.temperature = patch.temperature;
    if (patch.score !== undefined) upd.score = patch.score;
    if (patch.source !== undefined) upd.source = patch.source;
    if (patch.value !== undefined) upd.value = patch.value;
    if (patch.agentId !== undefined) {
      const agentUuid = await slugToUuid(patch.agentId);
      if (agentUuid) upd.agent_id = agentUuid;
    }
    if (patch.nextAction !== undefined) upd.next_action = patch.nextAction ?? null;
    if (patch.nextActionAt !== undefined) upd.next_action_at = patch.nextActionAt ?? null;
    if (Object.keys(upd).length === 0)
      return mapLead(current, await agentMap(), await defaultAgentId());
    const { data, error: updErr } = await db()
      .from("leads")
      .update({ ...asPartial(upd), updated_at: now() })
      .eq("id", id)
      .select()
      .single();
    if (updErr) dbError("leads.update", updErr);
    const agents = await agentMap();
    const lead = mapLead(data!, agents, await defaultAgentId());
    const client = await this.getClient(lead.clientId);
    await insertActivity({
      kind: "note",
      subject: "Lead mis à jour",
      body: `${client?.firstName ?? ""} ${client?.lastName ?? ""} — score ${lead.score}, ${lead.temperature}`,
      clientId: lead.clientId,
      propertyId: lead.propertyId,
      leadId: id,
    });
    return lead;
  },

  async moveLead(id, stage) {
    const { data, error } = await db()
      .from("leads")
      .update({ stage, updated_at: now() })
      .eq("id", id)
      .select()
      .maybeSingle();
    if (error) dbError("leads.update", error);
    if (!data) return null;
    const agents = await agentMap();
    const lead = mapLead(data, agents, await defaultAgentId());
    const client = await this.getClient(lead.clientId);
    await insertActivity({
      kind: "stage_change",
      subject: `Étape → ${stage}`,
      body: `${client?.firstName ?? ""} ${client?.lastName ?? ""}`,
      clientId: lead.clientId,
      propertyId: lead.propertyId,
      leadId: id,
    });
    // A won lead is the seed of a transaction; surface it in the inbox.
    if (stage === "won") {
      await insertNotification({
        kind: "lead",
        title: "Lead gagné",
        body: `${client?.firstName ?? ""} ${client?.lastName ?? ""} — ouvrir une transaction.`,
        href: "/admin/transactions",
      });
    }
    return lead;
  },

  async deleteLead(id) {
    const { data: current, error } = await db()
      .from("leads")
      .select("id, client_id, property_id")
      .eq("id", id)
      .maybeSingle();
    if (error) dbError("leads", error);
    if (!current) return;
    const { error: delErr } = await db().from("leads").delete().eq("id", id);
    if (delErr) dbError("leads.delete", delErr);
    const client = await this.getClient(current.client_id);
    await insertActivity({
      kind: "note",
      subject: "Lead supprimé",
      body: `${client?.firstName ?? ""} ${client?.lastName ?? ""}`,
      clientId: current.client_id,
      propertyId: current.property_id ?? undefined,
    });
  },

  /* -------------------------------------------------------- activities */

  async listActivities(filter = {}) {
    let query = db().from("activities").select("*");
    if (filter.clientId) query = query.eq("client_id", filter.clientId);
    if (filter.leadId) query = query.eq("lead_id", filter.leadId);
    if (filter.propertyId) query = query.eq("property_id", filter.propertyId);
    const { data, error } = await query.order("created_at", { ascending: false });
    if (error) dbError("activities", error);
    const agents = await agentMap();
    return (data ?? []).map((r) => mapActivity(r, agents));
  },

  async addActivity(input) {
    return insertActivity(input);
  },

  /* ------------------------------------------------------ appointments */

  async listAppointments(range) {
    let query = db().from("appointments").select("*");
    if (range) {
      query = query.gte("starts_at", range.from).lte("starts_at", range.to);
    }
    const { data, error } = await query.order("starts_at", { ascending: true });
    if (error) dbError("appointments", error);
    return (data ?? []).map(mapAppointment);
  },

  async createAppointment(input) {
    const agentUuid = await slugToUuid(input.agentId ?? (await defaultAgentId()));
    const { data, error } = await db()
      .from("appointments")
      .insert({
        id: crypto.randomUUID(),
        kind: input.kind,
        status: input.status ?? "scheduled",
        title: input.title,
        starts_at: input.startsAt,
        ends_at: input.endsAt,
        property_id: input.propertyId ?? null,
        client_id: input.clientId ?? null,
        agent_id: agentUuid,
        location: input.location ?? null,
      })
      .select()
      .single();
    if (error) dbError("appointments.insert", error);
    const appointment = mapAppointment(data!);
    const client = input.clientId ? await this.getClient(input.clientId) : undefined;
    await insertActivity({
      kind: "viewing",
      subject: `Rendez-vous planifié — ${appointment.kind}`,
      body: `${appointment.title} à ${new Date(appointment.startsAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}`,
      clientId: appointment.clientId,
      propertyId: appointment.propertyId,
    });
    await insertNotification({
      kind: "appointment",
      title: "Rendez-vous planifié",
      body: `${client?.firstName ?? ""} ${client?.lastName ?? ""} — ${appointment.title}`,
      href: "/admin/agenda",
    });
    // Automation: a scheduled viewing must be confirmed by the agent.
    if (appointment.kind === "viewing" && (await getAutomationRule("visitConfirmTask")).enabled) {
      await insertTask({
        title: "Confirmer la visite",
        status: "todo",
        priority: "high",
        dueAt: new Date(new Date(appointment.startsAt).getTime() - 24 * 3_600_000).toISOString(),
        assigneeId: appointment.agentId,
        entity: { kind: "appointment", id: appointment.id },
      });
      await recordAutomationRun(
        "visitConfirmTask",
        "Visite à confirmer",
        `${appointment.title} — ${new Date(appointment.startsAt).toLocaleDateString("fr-FR")} ${new Date(appointment.startsAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}.`,
      );
    }
    return appointment;
  },

  async updateAppointment(id, patch) {
    const { data: current, error } = await db()
      .from("appointments")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) dbError("appointments", error);
    if (!current) return null;
    const upd: Patch<Row<"appointments">> = {};
    if (patch.kind !== undefined) upd.kind = patch.kind;
    if (patch.title !== undefined) upd.title = patch.title;
    if (patch.startsAt !== undefined) upd.starts_at = patch.startsAt;
    if (patch.endsAt !== undefined) upd.ends_at = patch.endsAt;
    if (patch.propertyId !== undefined) upd.property_id = patch.propertyId ?? null;
    if (patch.clientId !== undefined) upd.client_id = patch.clientId ?? null;
    if (patch.agentId !== undefined) {
      const agentUuid = await slugToUuid(patch.agentId);
      if (agentUuid) upd.agent_id = agentUuid;
    }
    if (patch.location !== undefined) upd.location = patch.location ?? null;
    if (patch.status !== undefined) upd.status = patch.status;
    if (Object.keys(upd).length === 0) return mapAppointment(current);
    const { data, error: updErr } = await db()
      .from("appointments")
      .update(asPartial(upd))
      .eq("id", id)
      .select()
      .single();
    if (updErr) dbError("appointments.update", updErr);
    return mapAppointment(data!);
  },

  async setAppointmentStatus(id, status) {
    const { data, error } = await db()
      .from("appointments")
      .update({ status })
      .eq("id", id)
      .select()
      .maybeSingle();
    if (error) dbError("appointments.update", error);
    if (!data) return null;
    const appointment = mapAppointment(data);
    await insertActivity({
      kind: "viewing",
      subject: `Rendez-vous → ${status}`,
      body: appointment.title,
      clientId: appointment.clientId,
      propertyId: appointment.propertyId,
    });
    // Automation: a finished viewing gets a debrief task.
    if (status === "done" && (await getAutomationRule("visitConfirmTask")).enabled) {
      await insertTask({
        title: "Débrief de la visite",
        status: "todo",
        priority: "normal",
        dueAt: new Date(Date.now() + 24 * 3_600_000).toISOString(),
        assigneeId: appointment.agentId,
        entity: { kind: "appointment", id: appointment.id },
      });
      await recordAutomationRun(
        "visitConfirmTask",
        "Débrief demandé",
        `${appointment.title} — terminé, compte-rendu à rédiger.`,
      );
    }
    return appointment;
  },

  async saveViewingReport(id, report) {
    const { data, error } = await db()
      .from("appointments")
      .update({
        report_interest: report.interest,
        report_outcome: report.outcome,
        report_next_action: report.nextAction ?? null,
        status: "done",
      })
      .eq("id", id)
      .select()
      .maybeSingle();
    if (error) dbError("appointments.update", error);
    if (!data) return null;
    const appointment = mapAppointment(data);
    await insertActivity({
      kind: "viewing",
      subject: "Compte-rendu de visite",
      body: `Intérêt ${report.interest}/5 — ${report.outcome}`,
      clientId: appointment.clientId,
      propertyId: appointment.propertyId,
    });
    return appointment;
  },

  /* ---------------------------------------------------------- documents */

  async listDocuments() {
    const { data, error } = await db()
      .from("documents")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) dbError("documents", error);
    return (data ?? []).map(mapDocument);
  },

  async createDocument(input) {
    const uploadedBy = await slugToUuid(input.uploadedById ?? (await defaultAgentId()));
    const { data, error } = await db()
      .from("documents")
      .insert({
        id: crypto.randomUUID(),
        name: input.name,
        category: input.category,
        mime_type: input.mimeType,
        size_bytes: input.sizeBytes,
        version: 1,
        storage_path: input.url,
        property_id: input.propertyId ?? null,
        client_id: input.clientId ?? null,
        transaction_id: input.transactionId ?? null,
        uploaded_by: uploadedBy,
        created_at: now(),
      })
      .select()
      .single();
    if (error) dbError("documents.insert", error);
    const doc = mapDocument(data!);
    await insertActivity({
      kind: "document",
      subject: "Document ajouté",
      body: doc.name,
      clientId: doc.clientId,
      propertyId: doc.propertyId,
    });
    return doc;
  },

  async deleteDocument(id) {
    const { error } = await db().from("documents").delete().eq("id", id);
    if (error) dbError("documents.delete", error);
  },

  /* ------------------------------------------------------------- tasks */

  async listTasks() {
    const { data, error } = await db().from("tasks").select("*");
    if (error) dbError("tasks", error);
    const agents = await agentMap();
    return (data ?? [])
      .map((r) => mapTask(r, agents))
      .sort((a, b) => {
        if (a.status === "done" && b.status !== "done") return 1;
        if (b.status === "done" && a.status !== "done") return -1;
        return (a.dueAt ?? "9999").localeCompare(b.dueAt ?? "9999");
      });
  },

  async createTask(input) {
    const task = await insertTask(input);
    await insertActivity({
      kind: "note",
      subject: "Tâche créée",
      body: task.title,
    });
    return task;
  },

  async updateTask(id, patch) {
    const { data: current, error } = await db()
      .from("tasks")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) dbError("tasks", error);
    if (!current) return null;
    const upd: Patch<Row<"tasks">> = {};
    if (patch.title !== undefined) upd.title = patch.title;
    if (patch.status !== undefined) upd.status = patch.status;
    if (patch.priority !== undefined) upd.priority = patch.priority;
    if (patch.dueAt !== undefined) upd.due_at = patch.dueAt ?? null;
    if (patch.assigneeId !== undefined) {
      const agentUuid = await slugToUuid(patch.assigneeId);
      if (agentUuid) upd.assignee_id = agentUuid;
    }
    if (Object.keys(upd).length === 0) return mapTask(current, await agentMap());
    const { data, error: updErr } = await db()
      .from("tasks")
      .update(asPartial(upd))
      .eq("id", id)
      .select()
      .single();
    if (updErr) dbError("tasks.update", updErr);
    return mapTask(data!, await agentMap());
  },

  /* ------------------------------------------------------ transactions */

  async listTransactions() {
    const { data, error } = await db()
      .from("transactions")
      .select("*")
      .order("opened_at", { ascending: false });
    if (error) dbError("transactions", error);
    const rows = data ?? [];
    let paymentRows: Row<"payments">[] = [];
    if (rows.length > 0) {
      const p = await db()
        .from("payments")
        .select("*")
        .in(
          "transaction_id",
          rows.map((r) => r.id),
        );
      if (p.error) dbError("payments", p.error);
      paymentRows = p.data ?? [];
    }
    const paymentsByTxn = new Map<string, Payment[]>();
    for (const pr of paymentRows) {
      const list = paymentsByTxn.get(pr.transaction_id) ?? [];
      list.push(mapPayment(pr));
      paymentsByTxn.set(pr.transaction_id, list);
    }
    const agents = await agentMap();
    return rows.map((r) => mapTransaction(r, paymentsByTxn.get(r.id) ?? [], agents));
  },

  async createTransaction(input) {
    const year = new Date().getFullYear();
    const count = await countRows("transactions");
    const reference = `TX-${year}-${String(count + 1).padStart(3, "0")}`;
    const openedAt = now();
    const agentUuid = await slugToUuid(input.agentId ?? (await defaultAgentId()));
    const commission = input.commission ?? Math.round(input.amount * 0.025);
    const row: Row<"transactions"> = {
      id: crypto.randomUUID(),
      reference,
      stage: input.stage ?? "interest",
      property_id: input.propertyId,
      buyer_client_id: input.buyerClientId,
      seller_client_id: input.sellerClientId ?? null,
      agent_id: agentUuid,
      amount: input.amount,
      commission,
      opened_at: openedAt,
      closed_at: null,
    };
    const { data, error } = await db().from("transactions").insert(row).select().single();
    if (error) dbError("transactions.insert", error);
    const txn = mapTransaction(data!, [], await agentMap());
    const property = await this.getProperty(txn.propertyId);
    await insertActivity({
      kind: "offer",
      subject: "Transaction ouverte",
      body: `${txn.reference} — ${property?.reference ?? ""}`,
      clientId: txn.buyerClientId,
      propertyId: txn.propertyId,
    });
    await insertNotification({
      kind: "transaction",
      title: "Transaction ouverte",
      body: `${txn.reference} — ${property?.title ?? ""}`,
      href: "/admin/transactions",
    });
    return txn;
  },

  async moveTransactionStage(id, stage) {
    const { data: current, error } = await db()
      .from("transactions")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) dbError("transactions", error);
    if (!current) return null;
    const { data, error: updErr } = await db()
      .from("transactions")
      .update({
        stage,
        closed_at: stage === "closing" ? (current.closed_at ?? now()) : current.closed_at,
      })
      .eq("id", id)
      .select()
      .single();
    if (updErr) dbError("transactions.update", updErr);
    const txn = mapTransaction(data!, [], await agentMap());
    await insertActivity({
      kind: "offer",
      subject: `Transaction → ${stage}`,
      body: txn.reference,
      clientId: txn.buyerClientId,
      propertyId: txn.propertyId,
    });
    if (stage === "closing") {
      await insertNotification({
        kind: "transaction",
        title: "Transaction clôturée",
        body: `${txn.reference} — bravo, dossier bouclé.`,
        href: "/admin/transactions",
      });
    }
    return txn;
  },

  async addPayment(transactionId, input) {
    const { data: current, error } = await db()
      .from("transactions")
      .select("*")
      .eq("id", transactionId)
      .maybeSingle();
    if (error) dbError("transactions", error);
    if (!current) return null;
    const { data: payment, error: payErr } = await db()
      .from("payments")
      .insert({
        id: crypto.randomUUID(),
        transaction_id: transactionId,
        label: input.label,
        amount: input.amount,
        due_at: input.dueAt,
      })
      .select()
      .single();
    if (payErr) dbError("payments.insert", payErr);
    await insertActivity({
      kind: "note",
      subject: "Paiement planifié",
      body: `${payment!.label} — ${payment!.amount} MAD`,
      clientId: current.buyer_client_id ?? undefined,
      propertyId: current.property_id,
    });
    return this.getTransaction(transactionId);
  },

  async markPaymentPaid(transactionId, paymentId) {
    const { data: current, error } = await db()
      .from("transactions")
      .select("*")
      .eq("id", transactionId)
      .maybeSingle();
    if (error) dbError("transactions", error);
    if (!current) return null;
    const { data: payment, error: payErr } = await db()
      .from("payments")
      .update({ paid_at: now() })
      .eq("id", paymentId)
      .select()
      .maybeSingle();
    if (payErr) dbError("payments.update", payErr);
    if (!payment) return null;
    await insertActivity({
      kind: "note",
      subject: "Paiement encaissé",
      body: `${payment.label} — ${payment.amount} MAD`,
      clientId: current.buyer_client_id ?? undefined,
      propertyId: current.property_id,
    });
    return this.getTransaction(transactionId);
  },

  async deleteTransaction(id) {
    const { data: current, error } = await db()
      .from("transactions")
      .select("reference, property_id, buyer_client_id")
      .eq("id", id)
      .maybeSingle();
    if (error) dbError("transactions", error);
    if (!current) return;
    const { error: delErr } = await db().from("transactions").delete().eq("id", id);
    if (delErr) dbError("transactions.delete", delErr);
    await insertActivity({
      kind: "note",
      subject: "Transaction supprimée",
      body: `${current.reference}`,
      clientId: current.buyer_client_id ?? undefined,
      propertyId: current.property_id,
    });
  },

  /* ------------------------------------------------------------- agents */

  async listAgents() {
    const rows = await loadProfiles();
    rows.sort((a, b) => a.created_at.localeCompare(b.created_at));
    return rows.map(mapAgent);
  },

  /* ------------------------------------------------------ notifications */

  async listNotifications() {
    const { data, error } = await db()
      .from("notifications")
      .select("*")
      .is("recipient_id", null)
      .order("created_at", { ascending: false });
    if (error) dbError("notifications", error);
    return (data ?? []).map(mapNotification);
  },

  async createNotification(input) {
    return insertNotification(input);
  },

  async markNotificationRead(id) {
    const { error } = await db()
      .from("notifications")
      .update({ read: true })
      .eq("id", id)
      .is("recipient_id", null);
    if (error) dbError("notifications.update", error);
  },

  async markAllNotificationsRead() {
    const { error } = await db()
      .from("notifications")
      .update({ read: true })
      .is("recipient_id", null);
    if (error) dbError("notifications.update", error);
  },

  /* ---------------------------------------------------------- dashboard */

  async getDashboard(): Promise<DashboardSummary> {
    const since30 = new Date(Date.now() - 30 * 86_400_000).toISOString();
    const [activeRes, leadsRes, txnsRes, viewingsRes] = await Promise.all([
      db().from("properties").select("id").in("status", ACTIVE_PROPERTY_STATUSES),
      db().from("leads").select("id, stage, value, source, created_at"),
      db().from("transactions").select("commission, closed_at"),
      db().from("appointments").select("id").eq("kind", "viewing").gte("starts_at", since30),
    ]);
    if (activeRes.error) dbError("properties", activeRes.error);
    if (leadsRes.error) dbError("leads", leadsRes.error);
    if (txnsRes.error) dbError("transactions", txnsRes.error);
    if (viewingsRes.error) dbError("appointments", viewingsRes.error);

    const allLeads = leadsRes.data ?? [];
    const openLeads = allLeads.filter((l) => l.stage !== "won" && l.stage !== "lost");
    const won = allLeads.filter((l) => l.stage === "won");
    const pipelineValue = openLeads.reduce((sum, l) => sum + l.value, 0);
    const revenueYtd = (txnsRes.data ?? [])
      .filter((t) => t.closed_at)
      .reduce((sum, t) => sum + t.commission, 0);

    const stages: PipelineStage[] = [
      "new",
      "contacted",
      "qualified",
      "viewing",
      "offer",
      "negotiation",
    ];

    return {
      kpis: {
        activelistings: activeRes.data?.length ?? 0,
        newLeads30d: allLeads.filter((l) => l.created_at >= since30).length,
        viewings30d: viewingsRes.data?.length ?? 0,
        pipelineValue,
        revenueYtd,
        conversionRate: allLeads.length ? Math.round((won.length / allLeads.length) * 100) : 0,
        deltas: {
          activelistings: 8,
          newLeads30d: 23,
          viewings30d: -6,
          pipelineValue: 14,
          revenueYtd: 31,
          conversionRate: 4,
        },
      },
      leadsSeries: MONTHS.map((month, i) => ({
        month,
        leads: 18 + i * 4 + (i % 2 ? 6 : 0),
        viewings: 9 + i * 3,
      })),
      viewsSeries: MONTHS.map((month, i) => ({
        month,
        views: 2400 + i * 620 + (i % 3) * 300,
      })),
      pipelineByStage: stages.map((stage) => ({
        label: stage,
        value: allLeads.filter((l) => l.stage === stage).length,
      })),
      revenueSeries: MONTHS.map((month, i) => ({
        month,
        revenue: 120_000 + i * 48_000 + (i % 2 ? 30_000 : 0),
      })),
      sourceBreakdown: LEAD_SOURCES.map((s) => ({
        label: s,
        value: allLeads.filter((l) => l.source === s).length,
      })),
    };
  },

  async getPriorities(agentId?: string): Promise<Priority[]> {
    const nowIso = now();
    const todayEnd = new Date(Date.now() + 86_400_000).toISOString();
    const agentUuids = new Set<string>();
    if (agentId) {
      const uuid = await slugToUuid(agentId);
      if (uuid) agentUuids.add(uuid);
    }
    const mine = (row: { agent_id?: string | null; assignee_id?: string | null }) =>
      !agentId ||
      (row.agent_id !== null && row.agent_id !== undefined && agentUuids.has(row.agent_id)) ||
      (row.assignee_id !== null &&
        row.assignee_id !== undefined &&
        agentUuids.has(row.assignee_id));

    const [tasksRes, apptsRes, leadsRes] = await Promise.all([
      db().from("tasks").select("*").neq("status", "done"),
      db().from("appointments").select("*").gte("starts_at", nowIso).lte("starts_at", todayEnd),
      db().from("leads").select("*").in("stage", ["new", "contacted"]),
    ]);
    if (tasksRes.error) dbError("tasks", tasksRes.error);
    if (apptsRes.error) dbError("appointments", apptsRes.error);
    if (leadsRes.error) dbError("leads", leadsRes.error);
    const agents = await agentMap();

    const overdueTasks = (tasksRes.data ?? [])
      .filter((t) => mine(t) && t.due_at !== null && t.due_at < nowIso)
      .slice(0, 3)
      .map<Priority>((t) => ({
        id: t.id,
        kind: "task",
        title: t.title,
        detail: "Échéance dépassée",
        urgency: "overdue",
        href: "/admin/taches",
      }));

    const todayAppointments = (apptsRes.data ?? [])
      .filter((a) => mine(a))
      .slice(0, 3)
      .map<Priority>((a) => ({
        id: a.id,
        kind: "appointment",
        title: a.title,
        detail: new Date(a.starts_at).toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        urgency: "today",
        href: "/admin/agenda",
      }));

    const staleLeads = (leadsRes.data ?? [])
      .filter((l) => mine(l))
      .slice(0, 2)
      .map<Priority>((l) => ({
        id: l.id,
        kind: "lead",
        title: l.next_action ?? "Relancer le lead",
        detail: "Sans contact depuis 3 jours",
        urgency: "soon",
        href: "/admin/crm",
      }));

    return [...overdueTasks, ...todayAppointments, ...staleLeads];
  },

  /* ---------------------------------------------------------- marketing */

  async listCampaigns() {
    const { data, error } = await db()
      .from("marketing_campaigns")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) dbError("marketing_campaigns", error);
    return (data ?? []).map(mapCampaign);
  },

  async createCampaign(input) {
    const { data, error } = await db()
      .from("marketing_campaigns")
      .insert({
        id: crypto.randomUUID(),
        name: input.name,
        subject: input.subject,
        channel: input.channel,
        status: "draft",
        audience: input.audience,
        audience_count: input.audienceCount,
        opens: 0,
        clicks: 0,
        conversions: 0,
        created_at: now(),
      })
      .select()
      .single();
    if (error) dbError("marketing_campaigns.insert", error);
    const campaign = mapCampaign(data!);
    await insertActivity({
      kind: "email",
      subject: "Campagne créée",
      body: `${campaign.name} — brouillon.`,
    });
    return campaign;
  },

  async sendCampaign(id) {
    const { data: current, error } = await db()
      .from("marketing_campaigns")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) dbError("marketing_campaigns", error);
    if (!current) return null;
    const wasSent = current.status === "sent";
    const upd: Patch<Row<"marketing_campaigns">> = {
      status: "sent",
      sent_at: wasSent ? current.sent_at : now(),
      opens: wasSent ? current.opens : Math.round(current.audience_count * 0.55),
      clicks: wasSent ? current.clicks : Math.round(current.audience_count * 0.2),
      conversions: wasSent
        ? current.conversions
        : Math.max(1, Math.round(current.audience_count * 0.03)),
    };
    const { data, error: updErr } = await db()
      .from("marketing_campaigns")
      .update(asPartial(upd))
      .eq("id", id)
      .select()
      .single();
    if (updErr) dbError("marketing_campaigns.update", updErr);
    const sent = mapCampaign(data!);
    await insertActivity({
      kind: "email",
      subject: "Campagne envoyée",
      body: `${sent.name} — ${sent.audienceCount} destinataires, 3 conversions estimées.`,
    });
    return sent;
  },

  async deleteCampaign(id) {
    const { error } = await db().from("marketing_campaigns").delete().eq("id", id);
    if (error) dbError("marketing_campaigns.delete", error);
  },

  async listFeatured() {
    const { data, error } = await db()
      .from("featured_properties")
      .select("*")
      .order("since", { ascending: false });
    if (error) dbError("featured_properties", error);
    return (data ?? []).map(mapFeatured);
  },

  async setFeatured(propertyId, until) {
    const { error } = await db()
      .from("featured_properties")
      .upsert({ property_id: propertyId, until }, { onConflict: "property_id" });
    if (error) dbError("featured_properties.upsert", error);
    return this.listFeatured();
  },

  async removeFeatured(propertyId) {
    const { error } = await db().from("featured_properties").delete().eq("property_id", propertyId);
    if (error) dbError("featured_properties.delete", error);
    return this.listFeatured();
  },

  async getMarketingStats(): Promise<MarketingStats> {
    const [campaigns, featured, leadsRes] = await Promise.all([
      this.listCampaigns(),
      this.listFeatured(),
      db().from("leads").select("source, stage"),
    ]);
    if (leadsRes.error) dbError("leads", leadsRes.error);
    const allLeads = leadsRes.data ?? [];
    const sources: SourceStat[] = LEAD_SOURCES.map((source) => {
      const l = allLeads.filter((x) => x.source === source);
      const conversions = l.filter((x) => x.stage === "won").length;
      return {
        source,
        leads: l.length,
        conversions,
        rate: l.length ? Math.round((conversions / l.length) * 100) : 0,
      };
    });
    return {
      campaigns,
      featured,
      sources,
      totals: {
        sent: campaigns.filter((c) => c.status === "sent").length,
        opens: campaigns.reduce((s, c) => s + c.opens, 0),
        clicks: campaigns.reduce((s, c) => s + c.clicks, 0),
        conversions: campaigns.reduce((s, c) => s + c.conversions, 0),
        featuredCount: featured.length,
      },
    };
  },

  /* ---------------------------------------------------------- matching */

  async matchForClient(clientId) {
    const client = await this.getClient(clientId);
    if (!client) return [];
    const properties = await this.listProperties();
    return properties
      .map((p) => propertyScore(p, client))
      .filter((m): m is PropertyMatch => m !== null && m.score >= 25)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12);
  },

  async matchForProperty(propertyId) {
    const property = await this.getProperty(propertyId);
    if (!property || !ACTIVE_PROPERTY_STATUSES.includes(property.status)) return [];
    const clients = await this.listClients();
    return clients
      .map((c) => clientScore(c, property))
      .filter((m): m is ClientMatch => m !== null && m.score >= 25)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12);
  },

  async sendMatchesToClient(clientId, propertyIds) {
    const client = await this.getClient(clientId);
    if (!client || propertyIds.length === 0) return 0;
    const { data: properties, error } = await db()
      .from("properties")
      .select("reference, title")
      .in("id", propertyIds);
    if (error) dbError("properties", error);
    const refs = (properties ?? []).map((p) => `${p.reference} — ${p.title}`);
    await insertActivity({
      kind: "email",
      subject: "Suggestions de biens envoyées",
      body: `${refs.length} bien(s) : ${refs.join(" · ")}`,
      clientId,
    });
    await insertNotification({
      kind: "lead",
      title: "Suggestions envoyées",
      body: `${client.firstName} ${client.lastName} — ${refs.length} biens transmis par e-mail.`,
      href: "/admin/matching",
    });
    const sentBy = await slugToUuid(await defaultAgentId());
    const { error: sendErr } = await db().from("match_sends").insert({
      id: crypto.randomUUID(),
      client_id: clientId,
      property_ids: propertyIds,
      sent_by: sentBy,
      sent_at: now(),
    });
    if (sendErr) dbError("match_sends.insert", sendErr);
    return refs.length;
  },

  /* ------------------------------------------------------- automations */

  async getAutomations(): Promise<AutomationOverview> {
    const keys = Object.keys(AUTOMATION_META) as AutomationRuleKey[];
    const { data: rules, error } = await db().from("automation_rules").select("*");
    if (error) dbError("automation_rules", error);
    const byKey = new Map((rules ?? []).map((r) => [r.key, r]));
    const missing = keys.filter((k) => !byKey.has(k));
    if (missing.length > 0) {
      const { error: insErr } = await db()
        .from("automation_rules")
        .insert(missing.map((k) => ({ key: k, enabled: true, runs: 0 })));
      if (insErr) dbError("automation_rules.insert", insErr);
      for (const k of missing) byKey.set(k, { key: k, enabled: true, runs: 0, last_run: null });
    }
    const { data: runs, error: runsErr } = await db()
      .from("automation_runs")
      .select("*")
      .order("at", { ascending: false });
    if (runsErr) dbError("automation_runs", runsErr);
    return {
      rules: keys.map((k) => {
        const r = byKey.get(k)!;
        return {
          key: k,
          title: AUTOMATION_META[k].title,
          description: AUTOMATION_META[k].description,
          enabled: r.enabled,
          runs: r.runs ?? 0,
          lastRun: r.last_run ?? undefined,
        };
      }),
      runs: (runs ?? []).map(mapAutomationRun),
    };
  },

  async setAutomation(key, enabled) {
    const { error } = await db()
      .from("automation_rules")
      .upsert({ key, enabled }, { onConflict: "key" });
    if (error) dbError("automation_rules.upsert", error);
    return (await this.getAutomations()).rules;
  },

  async listInactiveLeads(): Promise<InactiveLead[]> {
    const cutoff = Date.now() - 3 * 86_400_000;
    const { data: leads, error } = await db()
      .from("leads")
      .select("*")
      .not("stage", "in", "('won','lost')");
    if (error) dbError("leads", error);
    const rows = leads ?? [];
    const clientIds = rows.map((r) => r.client_id);
    let clientRows: Row<"clients">[] = [];
    if (clientIds.length > 0) {
      const c = await db().from("clients").select("*").in("id", clientIds);
      if (c.error) dbError("clients", c.error);
      clientRows = c.data ?? [];
    }
    let activityRows: { lead_id: string | null; created_at: string }[] = [];
    if (rows.length > 0) {
      const a = await db()
        .from("activities")
        .select("lead_id, created_at")
        .in(
          "lead_id",
          rows.map((r) => r.id),
        );
      if (a.error) dbError("activities", a.error);
      activityRows = a.data ?? [];
    }
    const lastTouchByLead = new Map<string, number>();
    for (const act of activityRows) {
      const t = new Date(act.created_at).getTime();
      const prev = lastTouchByLead.get(act.lead_id!) ?? 0;
      lastTouchByLead.set(act.lead_id!, Math.max(prev, t));
    }
    const clientsById = new Map(clientRows.map((r) => [r.id, r]));
    const agents = await agentMap();
    const fallback = await defaultAgentId();

    const out: InactiveLead[] = [];
    for (const row of rows) {
      const clientRow = clientsById.get(row.client_id);
      if (!clientRow) continue;
      const lastTouch = Math.max(
        new Date(row.updated_at).getTime(),
        new Date(row.created_at).getTime(),
        lastTouchByLead.get(row.id) ?? 0,
      );
      if (lastTouch >= cutoff) continue;
      out.push({
        lead: mapLead(row, agents, fallback),
        client: mapClient(clientRow, agents, fallback),
        daysInactive: Math.floor((Date.now() - lastTouch) / 86_400_000),
      });
    }
    return out.sort((a, b) => b.daysInactive - a.daysInactive);
  },

  async createCallbackTask(leadId) {
    const lead = await this.getLead(leadId);
    if (!lead) return null;
    const client = await this.getClient(lead.clientId);
    const task = await insertTask({
      title: "Relance — lead inactif",
      status: "todo",
      priority: "high",
      dueAt: new Date(Date.now() + 24 * 3_600_000).toISOString(),
      assigneeId: lead.agentId,
      entity: { kind: "lead", id: lead.id },
    });
    await recordAutomationRun(
      "inactiveLeadRelance",
      "Relance planifiée",
      `${client?.firstName ?? ""} ${client?.lastName ?? ""} — rappel de l'agent sous 24 h.`,
    );
    return task;
  },

  /* ----------------------------------------------------------- reports */

  async getReport(key: ReportKey, q: ReportQuery = {}): Promise<Report> {
    const fromIso = q.from
      ? new Date(q.from).toISOString()
      : new Date(Date.now() - 90 * 86_400_000).toISOString();
    const toIso = q.to
      ? new Date(q.to).toISOString()
      : new Date(Date.now() + 86_400_000).toISOString();
    const from = fromIso.slice(0, 10);
    const to = toIso.slice(0, 10);
    const inRange = (iso: string) => iso >= fromIso && iso <= toIso;
    const buckets = weekBuckets(fromIso, toIso);

    const [properties, leads, clients, transactions, appointments, activities, agents] =
      await Promise.all([
        this.listProperties(),
        this.listLeads(),
        this.listClients(),
        this.listTransactions(),
        this.listAppointments(),
        this.listActivities(),
        this.listAgents(),
      ]);

    if (key === "properties") {
      const list = properties.filter((p) => inRange(p.createdAt));
      const sold = properties.filter((p) => p.soldAt && inRange(p.soldAt));
      const createdSeries = buckets.map((b, i) => ({
        label: b.label,
        value: list.filter((p) => bucketOf(buckets, p.createdAt) === i).length,
      }));
      return {
        key,
        title: "Rapport immobilier",
        from,
        to,
        kpis: [
          { label: "Biens créés", value: list.length },
          {
            label: "Biens actifs",
            value: properties.filter((p) => ACTIVE_PROPERTY_STATUSES.includes(p.status)).length,
          },
          { label: "Vendus / loués", value: sold.length },
          {
            label: "Prix moyen (MAD)",
            value: list.length
              ? Math.round(list.reduce((s, p) => s + p.price, 0) / list.length)
              : 0,
          },
        ],
        series: [{ label: "Créations de biens par semaine", points: createdSeries }],
        table: {
          columns: [
            "Référence",
            "Bien",
            "Ville",
            "Transaction",
            "Prix (MAD)",
            "Statut",
            "Vues 30 j",
          ],
          rows: list.map((p) => [
            p.reference,
            p.title,
            p.city,
            p.transaction === "vente" ? "Vente" : "Location",
            String(p.price),
            p.status.replace(/_/g, " "),
            String(p.views30d),
          ]),
        },
      };
    }

    if (key === "crm") {
      const inRangeLeads = leads.filter((l) => inRange(l.createdAt));
      const won = inRangeLeads.filter((l) => l.stage === "won");
      const series = buckets.map((b, i) => ({
        label: b.label,
        value: inRangeLeads.filter((l) => bucketOf(buckets, l.createdAt) === i).length,
      }));
      const wonSeries = buckets.map((b, i) => ({
        label: b.label,
        value: won.filter((l) => bucketOf(buckets, l.createdAt) === i).length,
      }));
      return {
        key,
        title: "Rapport CRM",
        from,
        to,
        kpis: [
          { label: "Clients", value: clients.filter((c) => inRange(c.createdAt)).length },
          { label: "Leads créés", value: inRangeLeads.length },
          {
            label: "Taux de conversion",
            value: inRangeLeads.length ? Math.round((won.length / inRangeLeads.length) * 100) : 0,
          },
          {
            label: "Score moyen",
            value: inRangeLeads.length
              ? Math.round(inRangeLeads.reduce((s, l) => s + l.score, 0) / inRangeLeads.length)
              : 0,
          },
        ],
        series: [
          { label: "Leads par semaine", points: series },
          { label: "Gagnés par semaine", points: wonSeries },
        ],
        table: {
          columns: ["Client", "Source", "Score", "Température", "Étape", "Valeur (MAD)"],
          rows: inRangeLeads.slice(0, 60).map((l) => {
            const c = clients.find((x) => x.id === l.clientId);
            return [
              c ? `${c.firstName} ${c.lastName}` : l.clientId,
              l.source.replace(/_/g, " "),
              String(l.score),
              l.temperature,
              l.stage,
              String(l.value),
            ];
          }),
        },
      };
    }

    if (key === "agents") {
      const inRangeTxns = transactions.filter((t) => inRange(t.openedAt));
      const txnSeries = buckets.map((b, i) => ({
        label: b.label,
        value: inRangeTxns.filter((t) => bucketOf(buckets, t.openedAt) === i).length,
      }));
      return {
        key,
        title: "Rapport des agents",
        from,
        to,
        kpis: [
          { label: "Agents", value: agents.length },
          { label: "Transactions", value: inRangeTxns.length },
          {
            label: "Commissions (MAD)",
            value: inRangeTxns.reduce((s, t) => s + t.commission, 0),
          },
          {
            label: "Visites",
            value: appointments.filter((a) => a.kind === "viewing" && inRange(a.startsAt)).length,
          },
        ],
        series: [{ label: "Transactions ouvertes par semaine", points: txnSeries }],
        table: {
          columns: [
            "Agent",
            "Rôle",
            "Leads",
            "Visites",
            "Transactions",
            "Commission (MAD)",
            "Clôturées",
          ],
          rows: agents.map((a) => {
            const aTxns = transactions.filter((t) => t.agentId === a.id);
            return [
              a.name,
              a.role,
              String(leads.filter((l) => l.agentId === a.id).length),
              String(appointments.filter((x) => x.agentId === a.id && x.kind === "viewing").length),
              String(aTxns.length),
              String(aTxns.reduce((s, t) => s + t.commission, 0)),
              String(aTxns.filter((t) => t.closedAt).length),
            ];
          }),
        },
      };
    }

    const inRangeActs = activities.filter((a) => inRange(a.createdAt));
    const actSeries = buckets.map((b, i) => ({
      label: b.label,
      value: inRangeActs.filter((a) => bucketOf(buckets, a.createdAt) === i).length,
    }));
    const kindLabel: Record<string, string> = {
      call: "Appels",
      email: "E-mails",
      whatsapp: "WhatsApp",
      viewing: "Visites",
      offer: "Offres",
    };
    const byKind = Object.entries(kindLabel).map(([kind, label]) => ({
      label,
      value: inRangeActs.filter((a) => a.kind === kind).length,
    }));
    return {
      key,
      title: "Rapport d'activité",
      from,
      to,
      kpis: [{ label: "Actions", value: inRangeActs.length }, ...byKind],
      series: [{ label: "Activité par semaine", points: actSeries }],
      table: {
        columns: ["Date", "Type", "Sujet", "Agent"],
        rows: inRangeActs
          .slice(0, 60)
          .map((a) => [
            a.createdAt.slice(0, 10),
            a.kind,
            a.subject,
            agents.find((ag) => ag.id === a.agentId)?.name ?? a.agentId,
          ]),
      },
    };
  },

  /* ------------------------------------------------------ internal */

  async getTransaction(transactionId: ID): Promise<Transaction | null> {
    const { data, error } = await db()
      .from("transactions")
      .select("*")
      .eq("id", transactionId)
      .maybeSingle();
    if (error) dbError("transactions", error);
    if (!data) return null;
    const { data: payments, error: payErr } = await db()
      .from("payments")
      .select("*")
      .eq("transaction_id", transactionId);
    if (payErr) dbError("payments", payErr);
    return mapTransaction(data, (payments ?? []).map(mapPayment), await agentMap());
  },

  async findClientByEmail(email: string): Promise<Client | null> {
    const { data, error } = await db().from("clients").select("*").eq("email", email).maybeSingle();
    if (error) dbError("clients", error);
    if (!data) return null;
    const agents = await agentMap();
    return mapClient(data, agents, await defaultAgentId());
  },
};
