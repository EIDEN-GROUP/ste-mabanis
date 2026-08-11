/**
 * Repository layer — the ONLY module that knows where admin data lives.
 *
 * Today it reads the in-memory seed. To move to Supabase, implement
 * `AdminRepository` against the client and swap `repository` below; no screen,
 * server function or query hook changes.
 */

import {
  seedActivities,
  seedAgents,
  seedAppointments,
  seedClients,
  seedDocuments,
  seedLeads,
  seedNotifications,
  seedProperties,
  seedTasks,
  seedTransactions,
  SEED_NOW,
} from "./seed";
import {
  ACTIVE_PROPERTY_STATUSES,
  type Activity,
  type AdminProperty,
  type AdminTask,
  type Agent,
  type Appointment,
  type AppNotification,
  type Client,
  type DashboardSummary,
  type ID,
  type Lead,
  type PipelineStage,
  type Priority,
  type PropertyStatus,
  type StoredDocument,
  type Transaction,
} from "./types";

export type PropertyQuery = {
  search?: string | undefined;
  status?: PropertyStatus[] | undefined;
  transaction?: "vente" | "location" | undefined;
  agentId?: ID | undefined;
  city?: string | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  sort?: "recent" | "price_asc" | "price_desc" | "views" | undefined;
};

export type ClientQuery = {
  search?: string | undefined;
  roles?: string[] | undefined;
  temperature?: string[] | undefined;
  agentId?: ID | undefined;
};

export interface AdminRepository {
  listProperties(q?: PropertyQuery): Promise<AdminProperty[]>;
  getProperty(id: ID): Promise<AdminProperty | null>;
  updatePropertyStatus(id: ID, status: PropertyStatus): Promise<AdminProperty | null>;

  listClients(q?: ClientQuery): Promise<Client[]>;
  getClient(id: ID): Promise<Client | null>;

  listLeads(): Promise<Lead[]>;
  moveLead(id: ID, stage: PipelineStage): Promise<Lead | null>;

  listActivities(filter?: {
    clientId?: ID | undefined;
    leadId?: ID | undefined;
    propertyId?: ID | undefined;
  }): Promise<Activity[]>;
  listAppointments(range?: { from: string; to: string }): Promise<Appointment[]>;
  listDocuments(): Promise<StoredDocument[]>;
  listTasks(): Promise<AdminTask[]>;
  listTransactions(): Promise<Transaction[]>;
  listAgents(): Promise<Agent[]>;

  listNotifications(): Promise<AppNotification[]>;
  markNotificationRead(id: ID): Promise<void>;
  markAllNotificationsRead(): Promise<void>;

  getDashboard(): Promise<DashboardSummary>;
  getPriorities(): Promise<Priority[]>;
}

/* ------------------------------------------------------------------ helpers */

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

const MONTHS = ["Mars", "Avril", "Mai", "Juin", "Juillet", "Août"];

/* ------------------------------------------------------- in-memory instance */

/**
 * Mutable copies so writes performed during a session are visible on re-read.
 * A real backend makes this obsolete.
 */
const properties = [...seedProperties];
const leads = [...seedLeads];
const notifications = [...seedNotifications];

export const inMemoryRepository: AdminRepository = {
  async listProperties(q = {}) {
    let list = [...properties];

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
    return properties.find((p) => p.id === id) ?? null;
  },

  async updatePropertyStatus(id, status) {
    const i = properties.findIndex((p) => p.id === id);
    const current = properties[i];
    if (!current) return null;
    const left = status === "sold" || status === "rented";
    const next: AdminProperty = {
      ...current,
      status,
      // Leaving the market records a date; the record itself is never removed,
      // so history and reporting stay intact.
      soldAt: left ? new Date().toISOString() : undefined,
      updatedAt: new Date().toISOString(),
    };
    properties[i] = next;
    return next;
  },

  async listClients(q = {}) {
    let list = [...seedClients];
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
    return seedClients.find((c) => c.id === id) ?? null;
  },

  async listLeads() {
    return [...leads];
  },

  async moveLead(id, stage) {
    const i = leads.findIndex((l) => l.id === id);
    const current = leads[i];
    if (!current) return null;
    const next: Lead = { ...current, stage, updatedAt: new Date().toISOString() };
    leads[i] = next;
    return next;
  },

  async listActivities(filter = {}) {
    return seedActivities
      .filter(
        (a) =>
          (!filter.clientId || a.clientId === filter.clientId) &&
          (!filter.leadId || a.leadId === filter.leadId) &&
          (!filter.propertyId || a.propertyId === filter.propertyId),
      )
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },

  async listAppointments(range) {
    if (!range) return [...seedAppointments];
    return seedAppointments.filter((a) => a.startsAt >= range.from && a.startsAt <= range.to);
  },

  async listDocuments() {
    return [...seedDocuments].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },

  async listTasks() {
    return [...seedTasks];
  },

  async listTransactions() {
    return [...seedTransactions];
  },

  async listAgents() {
    return [...seedAgents];
  },

  async listNotifications() {
    return [...notifications].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },

  async markNotificationRead(id) {
    const i = notifications.findIndex((n) => n.id === id);
    const current = notifications[i];
    if (current) notifications[i] = { ...current, read: true };
  },

  async markAllNotificationsRead() {
    notifications.forEach((n, i) => {
      notifications[i] = { ...n, read: true };
    });
  },

  async getDashboard(): Promise<DashboardSummary> {
    const active = properties.filter((p) => ACTIVE_PROPERTY_STATUSES.includes(p.status));
    const openLeads = leads.filter((l) => l.stage !== "won" && l.stage !== "lost");
    const won = leads.filter((l) => l.stage === "won");

    const pipelineValue = openLeads.reduce((sum, l) => sum + l.value, 0);
    const revenueYtd = seedTransactions
      .filter((t) => t.closedAt)
      .reduce((sum, t) => sum + t.commission, 0);

    const viewings30d = seedAppointments.filter(
      (a) =>
        a.kind === "viewing" &&
        a.startsAt >= new Date(SEED_NOW.getTime() - 30 * 86_400_000).toISOString(),
    ).length;

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
        activelistings: active.length,
        newLeads30d: leads.length,
        viewings30d,
        pipelineValue,
        revenueYtd,
        conversionRate: leads.length ? Math.round((won.length / leads.length) * 100) : 0,
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
        value: leads.filter((l) => l.stage === stage).length,
      })),
      revenueSeries: MONTHS.map((month, i) => ({
        month,
        revenue: 120_000 + i * 48_000 + (i % 2 ? 30_000 : 0),
      })),
      sourceBreakdown: [
        { label: "site_web", value: leads.filter((l) => l.source === "site_web").length },
        {
          label: "recommandation",
          value: leads.filter((l) => l.source === "recommandation").length,
        },
        { label: "portail", value: leads.filter((l) => l.source === "portail").length },
        {
          label: "reseaux_sociaux",
          value: leads.filter((l) => l.source === "reseaux_sociaux").length,
        },
        { label: "telephone", value: leads.filter((l) => l.source === "telephone").length },
        { label: "walk_in", value: leads.filter((l) => l.source === "walk_in").length },
      ],
    };
  },

  async getPriorities(): Promise<Priority[]> {
    const now = SEED_NOW.toISOString();
    const todayEnd = new Date(SEED_NOW.getTime() + 86_400_000).toISOString();

    const overdueTasks = seedTasks
      .filter((t) => t.status !== "done" && t.dueAt && t.dueAt < now)
      .slice(0, 3)
      .map<Priority>((t) => ({
        id: t.id,
        kind: "task",
        title: t.title,
        detail: "Échéance dépassée",
        urgency: "overdue",
        href: "/admin/taches",
      }));

    const todayAppointments = seedAppointments
      .filter((a) => a.startsAt >= now && a.startsAt <= todayEnd)
      .slice(0, 3)
      .map<Priority>((a) => ({
        id: a.id,
        kind: "appointment",
        title: a.title,
        detail: new Date(a.startsAt).toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        urgency: "today",
        href: "/admin/agenda",
      }));

    const staleLeads = leads
      .filter((l) => l.stage === "new" || l.stage === "contacted")
      .slice(0, 2)
      .map<Priority>((l) => ({
        id: l.id,
        kind: "lead",
        title: l.nextAction ?? "Relancer le lead",
        detail: "Sans contact depuis 3 jours",
        urgency: "soon",
        href: "/admin/crm",
      }));

    return [...overdueTasks, ...todayAppointments, ...staleLeads];
  },
};

/** Swap this binding to move the whole admin onto Supabase. */
export const repository: AdminRepository = inMemoryRepository;
