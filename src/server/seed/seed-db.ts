/**
 * db:seed — seeds the STE MABANIS back office into a Supabase project.
 *
 * Usage (from the repo root):
 *   bun run db:seed                # incremental: upserts everything
 *   bun run db:seed --reset        # wipe staff users, storage and tables first
 *   bun run db:seed --skip-storage # do not upload images to Storage
 *   bun run db:seed --dry-run      # build and print the payload, touch nothing
 *
 * Requirements:
 *   - SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (see .env.example)
 *   - SEED_STAFF_PASSWORD for the staff auth users (they are created with
 *     email confirmed, ready to sign in)
 *
 * What is seeded:
 *   - Staff auth users + profiles for the four site agents. Slugs, phone,
 *     initials, expertise, bio and languages come from src/lib/site-data.ts;
 *     the workspace staff_role comes from AGENT_STAFF_ROLE (types.ts), so the
 *     seeded workspace matches the demo roles exactly. The first-created
 *     profile is the repository's default agent, so Yassine is created first.
 *   - The 8 site properties with their images uploaded to the public
 *     "properties" Storage bucket (photos + one floor plan each, same media
 *     shape as the old in-memory seed).
 *   - The deterministic demo dataset (clients, leads, activities,
 *     appointments, documents, tasks, transactions + payments, campaigns,
 *     featured, automation rules and notifications) that the in-memory seed
 *     used to generate, with stable UUIDs (uuid v5 derived from the demo ids)
 *     so repeated runs are idempotent.
 *
 * Ids are deterministic, so re-seeding is safe; --reset additionally clears
 * auth users, storage files and every affected table for a clean demo.
 */

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { basename } from "node:path";
import {
  SEED_NOW,
  seedActivities,
  seedAppointments,
  seedCampaigns,
  seedClients,
  seedDocuments,
  seedFeatured,
  seedLeads,
  seedNotifications,
  seedProperties,
  seedTasks,
  seedTransactions,
} from "@/lib/admin/seed";
import { AGENT_STAFF_ROLE, type StaffRole } from "@/lib/admin/types";
import {
  agents as siteAgents,
  properties as siteProperties,
  type Agent as SiteAgent,
} from "@/lib/site-data";
import { getSupabase } from "@/server/db/client";
import { env } from "@/server/env";
import type { Database, PropertyStatus, TransactionKind } from "@/server/db/types";

type Insert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];

const BUCKET = "properties";
const DAY = 86_400_000;
const ISO = SEED_NOW.toISOString();

/* ------------------------------------------------------------ tiny helpers */

function log(message: string): void {
  console.log(`[seed] ${message}`);
}

function fail(message: string): never {
  console.error(`[seed] ✗ ${message}`);
  process.exit(1);
}

function iso(offsetDays: number, hour = 10, minute = 0): string {
  const d = new Date(SEED_NOW.getTime() + offsetDays * DAY);
  d.setUTCHours(hour, minute, 0, 0);
  return d.toISOString();
}

/** Deterministic uuid v5 (namespace "mabanis-seed") for stable rows. */
function uuidOf(seedId: string): string {
  const ns = Buffer.from("f71b8d4c6d2a4abba7b30e8f1c2d3e4f", "hex");
  const hash = createHash("sha1")
    .update(Buffer.concat([ns, Buffer.from(seedId, "utf8")]))
    .digest();
  hash[6] = (hash[6]! & 0x0f) | 0x50;
  hash[8] = (hash[8]! & 0x3f) | 0x80;
  const hex = hash.subarray(0, 16).toString("hex");
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20, 32),
  ].join("-");
}

/** "Yassine El Amrani" → "yassine.el-amrani" (accent-stripped, ascii). */
function slugEmail(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.+|\.+$/g, "");
}

/** Same normalization as the old seed, with @SITE_DOMAIN instead of @example.ma. */
function clientEmail(first: string, last: string): string {
  const clean = (s: string) =>
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z]/g, "");
  return `${clean(first)}.${clean(last)}@${env().SITE_DOMAIN}`;
}

function objectUrl(maybeUrl: string): string {
  const base = env().SUPABASE_URL.replace(/\/+$/, "");
  return `${base}/storage/v1/object/public/${BUCKET}/${basename(maybeUrl)}`;
}

/* -------------------------------------------------------------- arguments */

const args = new Set(process.argv.slice(2));
const WIPE = args.has("--reset");
const SKIP_STORAGE = args.has("--skip-storage");
const DRY_RUN = args.has("--dry-run");

/* ------------------------------------------------------------- data build */

const staffRoles: Record<string, StaffRole> = {
  ...AGENT_STAFF_ROLE,
  "nadia-lahlou": "commercial",
};

/** slug → site agent, in site order (Yassine first = default agent). */
const siteAgentById = new Map<string, SiteAgent>(siteAgents.map((a) => [a.slug, a]));

const propertyById = new Map(siteProperties.map((p) => [p.slug, p]));

/** Old seed properties carry the status cycle / dates; site data the extras. */
interface SeedPropertyRow {
  reference: string;
  slug: string;
  title: string;
  status: PropertyStatus;
  transaction: TransactionKind;
  type: string;
  city: string;
  neighborhood: string;
  price: number;
  surface: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  features: string[];
  agentId: string;
  soldAt?: string | null;
  views30d: number;
  leadCount: number;
  createdAt: string;
  updatedAt: string;
  year: number | null;
  landSurface: number | null;
  priceNote?: string | null;
  mapQuery: string;
  imagePaths: string[];
}

function buildPropertyRows(): SeedPropertyRow[] {
  return seedProperties.map((p) => {
    const site = propertyById.get(p.slug);
    return {
      reference: p.reference,
      slug: p.slug,
      title: p.title,
      status: p.status,
      transaction: p.transaction,
      type: p.type,
      city: p.city,
      neighborhood: p.neighborhood,
      price: p.price,
      surface: p.surface,
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      description: p.description,
      features: p.features,
      agentId: p.agentId,
      soldAt: p.soldAt ?? null,
      views30d: p.views30d,
      leadCount: p.leadCount,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      year: site?.year ?? null,
      landSurface: site?.landSurface ?? null,
      priceNote: site?.priceNote ?? null,
      mapQuery: site?.mapQuery ?? "",
      imagePaths: site?.images ?? [],
    };
  });
}

function buildMediaRows(propertyId: string, imagePaths: string[]): Insert<"property_media">[] {
  const url = (path: string) => (SKIP_STORAGE ? `/${basename(path)}` : objectUrl(path));
  const photos: Insert<"property_media">[] = imagePaths.map((path, i) => ({
    id: uuidOf(`${propertyId}-photo-${i}`),
    property_id: propertyId,
    kind: "photo",
    url: url(path),
    label: i === 0 ? "Façade" : `Vue ${i + 1}`,
    position: i,
    is_cover: i === 0,
    created_at: ISO,
  }));
  return [
    ...photos,
    {
      id: uuidOf(`${propertyId}-plan-0`),
      property_id: propertyId,
      kind: "floor_plan",
      url: imagePaths.length > 0 ? url(imagePaths[0]!) : "",
      label: "Plan niveau 1",
      position: 0,
      is_cover: false,
      created_at: ISO,
    },
  ];
}

/* ------------------------------------------------------------- main steps */

async function wipe() {
  log("--reset: wiping workspace…");
  const supabase = getSupabase();
  const order: { table: keyof Database["public"]["Tables"]; pk: string }[] = [
    { table: "notifications", pk: "id" },
    { table: "match_sends", pk: "id" },
    { table: "automation_runs", pk: "id" },
    { table: "automation_rules", pk: "key" },
    { table: "featured_properties", pk: "property_id" },
    { table: "payments", pk: "id" },
    { table: "transactions", pk: "id" },
    { table: "documents", pk: "id" },
    { table: "tasks", pk: "id" },
    { table: "appointments", pk: "id" },
    { table: "activities", pk: "id" },
    { table: "leads", pk: "id" },
    { table: "property_media", pk: "id" },
    { table: "properties", pk: "id" },
    { table: "clients", pk: "id" },
  ];
  for (const { table, pk } of order) {
    const { error } = await supabase.from(table).delete().not(pk, "is", null);
    if (error) fail(`cannot clear ${table}: ${error.message}`);
  }
  const staffEmails = new Set(siteAgents.map((a) => `${slugEmail(a.name)}@${env().SITE_DOMAIN}`));
  const { data: users, error: listErr } = await supabase.auth.admin.listUsers({ perPage: 200 });
  if (listErr) fail(`cannot list auth users: ${listErr.message}`);
  for (const user of users.users) {
    if (user.email && staffEmails.has(user.email)) {
      const { error: delErr } = await supabase.auth.admin.deleteUser(user.id);
      if (delErr) fail(`cannot delete user ${user.email}: ${delErr.message}`);
    }
  }
  const { data: objects, error: objErr } = await supabase.storage
    .from(BUCKET)
    .list("", { limit: 1000 });
  if (objErr) fail(`cannot list storage: ${objErr.message}`);
  const paths = (objects ?? []).map((o) => o.name);
  if (paths.length > 0) {
    const { error: rmErr } = await supabase.storage.from(BUCKET).remove(paths);
    if (rmErr) fail(`cannot clear storage: ${rmErr.message}`);
  }
}

async function uploadImages(propertyRows: SeedPropertyRow[]) {
  if (SKIP_STORAGE) {
    log("--skip-storage: images are referenced locally, nothing uploaded.");
    return;
  }
  const seen = new Map<string, string>();
  const unique = [...new Set(propertyRows.flatMap((p) => p.imagePaths))];
  for (const path of unique) {
    const name = basename(path);
    const { error } = await getSupabase()
      .storage.from(BUCKET)
      .upload(name, readFileSync(path), { upsert: true, contentType: "image/jpeg" });
    if (error) fail(`upload ${name}: ${error.message}`);
    seen.set(name, objectUrl(path));
    log(`uploaded ${name}`);
  }
}

async function seedStaff(): Promise<Map<string, string>> {
  const password = env().SEED_STAFF_PASSWORD;
  if (!password) {
    fail("SEED_STAFF_PASSWORD is empty — set it in .env to create the staff login accounts.");
  }
  const supabase = getSupabase();
  const slugToUuid = new Map<string, string>();
  for (const site of siteAgents) {
    const email = `${slugEmail(site.name)}@${env().SITE_DOMAIN}`;
    let userId = "";
    try {
      const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });
      if (error) {
        if (/already been registered|already exists/i.test(error.message)) {
          const { data: found } = await supabase.auth.admin.listUsers({ perPage: 200 });
          userId = found.users.find((u) => u.email === email)?.id ?? "";
          if (!userId) fail(`staff user ${email} exists but was not found`);
        } else {
          fail(`create auth user ${email}: ${error.message}`);
        }
      } else {
        userId = data.user?.id ?? "";
      }
    } catch (err) {
      fail(`create auth user ${email}: ${err instanceof Error ? err.message : String(err)}`);
    }
    if (!userId) fail(`no user id for ${email}`);
    const staffRole = staffRoles[site.slug] ?? "agent";
    const profile: Insert<"profiles"> = {
      id: userId,
      name: site.name,
      role: site.role,
      staff_role: staffRole,
      email,
      slug: site.slug,
      phone: site.phone,
      initials: site.initials,
      expertise: site.expertise,
      bio: site.bio,
      languages: site.languages.split(" · ").map((s) => s.trim()),
      years: site.years,
      created_at: iso(-400, 9, 0),
    };
    const { error } = await supabase.from("profiles").upsert(profile, { onConflict: "id" });
    if (error) fail(`profile upsert ${site.slug}: ${error.message}`);
    slugToUuid.set(site.slug, userId);
    log(`staff: ${site.name} <${email}> (${staffRole})`);
  }
  return slugToUuid;
}

async function seedContent(slugToUuid: Map<string, string>) {
  const supabase = getSupabase();
  const agentUuid = (slug: string) => slugToUuid.get(slug) ?? null;

  /* -------------------------------------------------------- properties */
  const propertyRows = buildPropertyRows();
  const propertyUuid = (slug: string) => uuidOf(`property:${slug}`);
  const properties: Insert<"properties">[] = propertyRows.map((p) => ({
    id: propertyUuid(p.slug),
    reference: p.reference,
    slug: p.slug,
    title: p.title,
    status: p.status,
    transaction: p.transaction,
    type: p.type,
    city: p.city,
    neighborhood: p.neighborhood,
    price: p.price,
    surface: p.surface,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    description: p.description,
    features: p.features,
    agent_id: agentUuid(p.agentId),
    owner_client_id: null,
    sold_at: p.soldAt ?? null,
    views_30d: p.views30d,
    lead_count: p.leadCount,
    created_at: p.createdAt,
    updated_at: p.updatedAt,
    year: p.year,
    land_surface: p.landSurface,
    price_note: p.priceNote ?? null,
    map_query: p.mapQuery,
  }));
  const { error: propsErr } = await supabase
    .from("properties")
    .upsert(properties, { onConflict: "reference" });
  if (propsErr) fail(`properties: ${propsErr.message}`);

  // Media is replaced wholesale for the seeded properties (no natural key).
  const { error: mediaDel } = await supabase
    .from("property_media")
    .delete()
    .in(
      "property_id",
      propertyRows.map((p) => propertyUuid(p.slug)),
    );
  if (mediaDel) fail(`property_media clean: ${mediaDel.message}`);
  const media = propertyRows.flatMap((p) => buildMediaRows(propertyUuid(p.slug), p.imagePaths));
  const { error: mediaErr } = await supabase.from("property_media").insert(media);
  if (mediaErr) fail(`property_media: ${mediaErr.message}`);
  log(`properties: ${properties.length} (${media.length} media rows)`);

  /* ---------------------------------------------------------- clients */
  const clients: Insert<"clients">[] = seedClients.map((c) => ({
    id: uuidOf(c.id),
    first_name: c.firstName,
    last_name: c.lastName,
    email: clientEmail(c.firstName, c.lastName),
    phone: c.phone,
    roles: c.roles,
    temperature: c.temperature,
    score: c.score,
    source: c.source,
    city: c.city ?? null,
    budget_min: c.budgetMin ?? null,
    budget_max: c.budgetMax ?? null,
    notes: c.notes ?? null,
    agent_id: agentUuid(c.agentId),
    created_at: c.createdAt,
    last_contacted_at: c.lastContactedAt ?? null,
  }));
  const { error: clientsErr } = await supabase
    .from("clients")
    .upsert(clients, { onConflict: "id" });
  if (clientsErr) fail(`clients: ${clientsErr.message}`);

  /* ------------------------------------------------------------ leads */
  const leads: Insert<"leads">[] = seedLeads.map((l) => ({
    id: uuidOf(l.id),
    client_id: uuidOf(l.clientId),
    property_id: l.propertyId ? propertyUuid(l.propertyId) : null,
    stage: l.stage,
    temperature: l.temperature,
    score: l.score,
    source: l.source,
    value: l.value,
    agent_id: agentUuid(l.agentId),
    next_action: l.nextAction ?? null,
    next_action_at: l.nextActionAt ?? null,
    created_at: l.createdAt,
    updated_at: l.updatedAt,
  }));
  const { error: leadsErr } = await supabase.from("leads").upsert(leads, { onConflict: "id" });
  if (leadsErr) fail(`leads: ${leadsErr.message}`);

  /* ------------------------------------------------------- activities */
  const activities: Insert<"activities">[] = seedActivities.map((a) => ({
    id: uuidOf(a.id),
    kind: a.kind,
    subject: a.subject,
    body: a.body ?? null,
    client_id: a.clientId ? uuidOf(a.clientId) : null,
    property_id: a.propertyId ? propertyUuid(a.propertyId) : null,
    lead_id: a.leadId ? uuidOf(a.leadId) : null,
    agent_id: a.agentId ? agentUuid(a.agentId) : null,
    created_at: a.createdAt,
  }));
  const { error: actsErr } = await supabase
    .from("activities")
    .upsert(activities, { onConflict: "id" });
  if (actsErr) fail(`activities: ${actsErr.message}`);

  /* ----------------------------------------------------- appointments */
  const appointments: Insert<"appointments">[] = seedAppointments.map((a) => ({
    id: uuidOf(a.id),
    kind: a.kind,
    status: a.status,
    title: a.title,
    starts_at: a.startsAt,
    ends_at: a.endsAt,
    property_id: a.propertyId ? propertyUuid(a.propertyId) : null,
    client_id: a.clientId ? uuidOf(a.clientId) : null,
    agent_id: a.agentId ? agentUuid(a.agentId) : null,
    location: a.location ?? null,
    report_interest: a.report?.interest ?? null,
    report_outcome: a.report?.outcome ?? null,
    report_next_action: a.report?.nextAction ?? null,
    created_at: ISO,
  }));
  const { error: apptsErr } = await supabase
    .from("appointments")
    .upsert(appointments, { onConflict: "id" });
  if (apptsErr) fail(`appointments: ${apptsErr.message}`);

  /* -------------------------------------------------------- documents */
  const documents: Insert<"documents">[] = seedDocuments.map((d) => ({
    id: uuidOf(d.id),
    name: d.name,
    category: d.category,
    mime_type: d.mimeType,
    size_bytes: d.sizeBytes,
    version: d.version,
    storage_path: `documents/seed/${d.name}`,
    property_id: d.propertyId ? propertyUuid(d.propertyId) : null,
    client_id: d.clientId ? uuidOf(d.clientId) : null,
    transaction_id: null,
    uploaded_by: d.uploadedById ? agentUuid(d.uploadedById) : null,
    created_at: d.createdAt,
  }));
  const { error: docsErr } = await supabase
    .from("documents")
    .upsert(documents, { onConflict: "id" });
  if (docsErr) fail(`documents: ${docsErr.message}`);

  /* ------------------------------------------------------------ tasks */
  const tasks: Insert<"tasks">[] = seedTasks.map((t) => ({
    id: uuidOf(t.id),
    title: t.title,
    status: t.status,
    priority: t.priority,
    due_at: t.dueAt ?? null,
    assignee_id: t.assigneeId ? agentUuid(t.assigneeId) : null,
    entity_kind: t.entity ? t.entity.kind : null,
    entity_id: t.entity && t.entity.id ? uuidOf(t.entity.id) : null,
    created_at: t.createdAt,
  }));
  const { error: tasksErr } = await supabase.from("tasks").upsert(tasks, { onConflict: "id" });
  if (tasksErr) fail(`tasks: ${tasksErr.message}`);

  /* ------------------------------------------------------ transactions */
  const transactions: Insert<"transactions">[] = seedTransactions.map((t) => ({
    id: uuidOf(t.id),
    reference: t.reference,
    stage: t.stage,
    property_id: propertyUuid(t.propertyId),
    buyer_client_id: t.buyerClientId ? uuidOf(t.buyerClientId) : null,
    seller_client_id: t.sellerClientId ? uuidOf(t.sellerClientId) : null,
    agent_id: t.agentId ? agentUuid(t.agentId) : null,
    amount: t.amount,
    commission: t.commission,
    opened_at: t.openedAt,
    closed_at: t.closedAt ?? null,
  }));
  const { error: txnsErr } = await supabase
    .from("transactions")
    .upsert(transactions, { onConflict: "id" });
  if (txnsErr) fail(`transactions: ${txnsErr.message}`);

  const payments: Insert<"payments">[] = seedTransactions.flatMap((t) =>
    t.payments.map((p) => ({
      id: uuidOf(p.id),
      transaction_id: uuidOf(t.id),
      label: p.label,
      amount: p.amount,
      due_at: p.dueAt,
      paid_at: p.paidAt ?? null,
    })),
  );
  const { error: paysErr } = await supabase.from("payments").upsert(payments, { onConflict: "id" });
  if (paysErr) fail(`payments: ${paysErr.message}`);

  /* -------------------------------------------------------- campaigns */
  const campaigns: Insert<"marketing_campaigns">[] = seedCampaigns.map((c) => ({
    id: uuidOf(c.id),
    name: c.name,
    subject: c.subject,
    channel: c.channel,
    status: c.status,
    audience: c.audience,
    audience_count: c.audienceCount,
    sent_at: c.sentAt ?? null,
    opens: c.opens,
    clicks: c.clicks,
    conversions: c.conversions,
    created_at: c.createdAt,
  }));
  const { error: campsErr } = await supabase
    .from("marketing_campaigns")
    .upsert(campaigns, { onConflict: "id" });
  if (campsErr) fail(`campaigns: ${campsErr.message}`);

  /* --------------------------------------------------------- featured */
  const featured: Insert<"featured_properties">[] = seedFeatured.map((f) => ({
    property_id: propertyUuid(f.propertyId),
    since: f.since,
    until: f.until ?? null,
  }));
  const { error: featErr } = await supabase
    .from("featured_properties")
    .upsert(featured, { onConflict: "property_id" });
  if (featErr) fail(`featured: ${featErr.message}`);

  /* ------------------------------------------------------- automations */
  const ruleKeys = [
    "leadFirstContact",
    "visitConfirmTask",
    "soldClosesTransaction",
    "inactiveLeadRelance",
  ];
  const rules: Insert<"automation_rules">[] = ruleKeys.map((key) => ({
    key,
    enabled: true,
    runs: 0,
    last_run: null,
  }));
  const { error: rulesErr } = await supabase
    .from("automation_rules")
    .upsert(rules, { onConflict: "key" });
  if (rulesErr) fail(`automation_rules: ${rulesErr.message}`);

  /* ----------------------------------------------------- notifications */
  const notifications: Insert<"notifications">[] = seedNotifications.map((n) => ({
    id: uuidOf(n.id),
    recipient_id: null,
    kind: n.kind,
    title: n.title,
    body: n.body,
    href: n.href ?? null,
    read: n.read,
    created_at: n.createdAt,
  }));
  const { error: notifsErr } = await supabase
    .from("notifications")
    .upsert(notifications, { onConflict: "id" });
  if (notifsErr) fail(`notifications: ${notifsErr.message}`);

  log(
    `content: ${clients.length} clients, ${leads.length} leads, ${activities.length} activities, ` +
      `${appointments.length} appointments, ${documents.length} documents, ${tasks.length} tasks, ` +
      `${transactions.length} transactions (${payments.length} payments), ${campaigns.length} campaigns, ` +
      `${featured.length} featured, ${rules.length} automation rules, ${notifications.length} notifications`,
  );
}

/* ---------------------------------------------------------------- runner */

function getSiteDomain(): string {
  if (DRY_RUN) return "mabanis.com";
  return env().SITE_DOMAIN;
}

async function main() {
  log(
    `STE MABANIS seeder — ${WIPE ? "reset + seed" : "incremental seed"} (now: ${SEED_NOW.toISOString()})`,
  );
  const propertyRows = buildPropertyRows();
  const domain = getSiteDomain();
  if (DRY_RUN) {
    log("--dry-run: printing payload…");
    log(`staff: ${siteAgents.length}`);
    for (const site of siteAgents) {
      log(
        `  ${site.name} <${slugEmail(site.name)}@${domain}> ` +
          `slug=${site.slug} role=${staffRoles[site.slug] ?? "agent"}`,
      );
    }
    log(`properties: ${propertyRows.length}`);
    for (const p of propertyRows) {
      log(`  ${p.reference} ${p.slug} ${p.status} agent=${p.agentId} media=${p.imagePaths.length}`);
    }
    log(
      `clients: ${seedClients.length} · leads: ${seedLeads.length} · activities: ${seedActivities.length} · ` +
        `appointments: ${seedAppointments.length} · documents: ${seedDocuments.length} · ` +
        `tasks: ${seedTasks.length} · transactions: ${seedTransactions.length} · ` +
        `campaigns: ${seedCampaigns.length} · featured: ${seedFeatured.length} · ` +
        `notifications: ${seedNotifications.length}`,
    );
    log("dry-run complete — nothing was written.");
    return;
  }

  if (WIPE) await wipe();
  await uploadImages(propertyRows);
  const slugToUuid = await seedStaff();
  await seedContent(slugToUuid);
  log(`done in ${(performance.now() / 1000).toFixed(1)}s — app runs against the live project.`);
}

main().catch((err) => fail(err instanceof Error ? err.message : String(err)));
