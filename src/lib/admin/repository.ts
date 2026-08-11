/**
 * Repository contract — the ONLY shape the admin knows about data.
 *
 * The implementation lives server-side in
 * `src/server/repository/supabase-repository.ts` and is bound inside
 * `src/lib/admin/server.ts`, so screens, query hooks and validators never see
 * where data comes from.
 *
 * Writes are deliberate: every mutation logs an activity and most raise a
 * notification, so the CRM timeline and the header bell stay truthful without
 * screens having to remember to do it.
 */

import type {
  Activity,
  ActivityKind,
  AdminProperty,
  AdminTask,
  Agent,
  Appointment,
  AppointmentKind,
  AppointmentStatus,
  AppNotification,
  AutomationOverview,
  AutomationRule,
  AutomationRuleKey,
  AutomationRun,
  Client,
  ClientMatch,
  ClientRole,
  DashboardSummary,
  DocumentCategory,
  FeaturedProperty,
  ID,
  InactiveLead,
  Lead,
  LeadSource,
  MarketingCampaign,
  MarketingStats,
  MediaKind,
  NotificationKind,
  Payment,
  PipelineStage,
  Priority,
  PropertyMatch,
  PropertyMedia,
  PropertyStatus,
  Report,
  ReportKey,
  SourceStat,
  StoredDocument,
  TaskPriority,
  TaskStatus,
  Transaction,
  TransactionStage,
} from "./types";

/* ------------------------------------------------------------------ inputs */

/**
 * A partial write where absent and `undefined` are the same thing. With
 * `exactOptionalPropertyTypes` on, `Partial<T>` rejects explicit `undefined`;
 * server validators and forms both produce `undefined` fields, so every
 * update path uses this shape and merges per key.
 */
export type Patch<T> = { [K in keyof T]?: T[K] | undefined };

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

export type PropertyInput = {
  reference?: string | undefined;
  title: string;
  status?: PropertyStatus | undefined;
  transaction: "vente" | "location";
  type: string;
  city: string;
  neighborhood: string;
  price: number;
  surface: number;
  bedrooms?: number | undefined;
  bathrooms?: number | undefined;
  description?: string | undefined;
  features?: string[] | undefined;
  agentId?: ID | undefined;
};

export type MediaInput = {
  kind?: MediaKind | undefined;
  url: string;
  label?: string | undefined;
  isCover?: boolean | undefined;
};

export type ClientInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | undefined;
  roles?: ClientRole[] | undefined;
  temperature?: "cold" | "warm" | "hot" | undefined;
  score?: number | undefined;
  source?: LeadSource | undefined;
  city?: string | undefined;
  budgetMin?: number | undefined;
  budgetMax?: number | undefined;
  notes?: string | undefined;
  agentId?: ID | undefined;
};

export type ActivityInput = {
  kind: ActivityKind;
  subject: string;
  body?: string | undefined;
  clientId?: ID | undefined;
  propertyId?: ID | undefined;
  leadId?: ID | undefined;
  agentId?: ID | undefined;
};

export type LeadInput = {
  clientId: ID;
  propertyId?: ID | undefined;
  stage?: PipelineStage | undefined;
  temperature?: "cold" | "warm" | "hot" | undefined;
  score?: number | undefined;
  source?: LeadSource | undefined;
  value?: number | undefined;
  agentId?: ID | undefined;
  nextAction?: string | undefined;
  nextActionAt?: string | undefined;
};

/** The public site posts this shape from every LeadForm on the website. */
export type PublicLeadInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | undefined;
  message?: string | undefined;
  propertyId?: ID | undefined;
  agentId?: ID | undefined;
  intent?: string | undefined;
};

export type AppointmentInput = {
  kind: AppointmentKind;
  title: string;
  startsAt: string;
  endsAt: string;
  propertyId?: ID | undefined;
  clientId?: ID | undefined;
  agentId?: ID | undefined;
  location?: string | undefined;
  status?: AppointmentStatus | undefined;
};

export type DocumentInput = {
  name: string;
  category: DocumentCategory;
  mimeType: string;
  sizeBytes: number;
  url: string;
  propertyId?: ID | undefined;
  clientId?: ID | undefined;
  transactionId?: ID | undefined;
  uploadedById?: ID | undefined;
};

export type TaskInput = {
  title: string;
  status?: TaskStatus | undefined;
  priority?: TaskPriority | undefined;
  dueAt?: string | undefined;
  assigneeId?: ID | undefined;
  entity?: { kind: "property" | "client" | "lead" | "appointment"; id: ID } | undefined;
};

export type TransactionInput = {
  propertyId: ID;
  buyerClientId: ID;
  sellerClientId?: ID | undefined;
  agentId?: ID | undefined;
  amount: number;
  commission?: number | undefined;
  stage?: TransactionStage | undefined;
};

export type PaymentInput = {
  label: string;
  amount: number;
  dueAt: string;
};

export type NotificationInput = {
  kind: NotificationKind;
  title: string;
  body: string;
  href?: string | undefined;
};

export type CampaignInput = {
  name: string;
  subject: string;
  channel: MarketingCampaign["channel"];
  audience: string;
  audienceCount: number;
};

export type ReportQuery = {
  from?: string | undefined;
  to?: string | undefined;
};

/* ------------------------------------------------------------- repository */

export interface AdminRepository {
  listProperties(q?: PropertyQuery): Promise<AdminProperty[]>;
  getProperty(id: ID): Promise<AdminProperty | null>;
  createProperty(input: PropertyInput): Promise<AdminProperty>;
  updateProperty(id: ID, patch: Patch<PropertyInput>): Promise<AdminProperty | null>;
  updatePropertyStatus(id: ID, status: PropertyStatus): Promise<AdminProperty | null>;
  addMedia(propertyId: ID, items: MediaInput[]): Promise<AdminProperty | null>;
  updateMedia(
    id: ID,
    patch: Patch<{ label: string; isCover: boolean }>,
  ): Promise<AdminProperty | null>;
  moveMedia(id: ID, direction: -1 | 1): Promise<AdminProperty | null>;
  removeMedia(id: ID): Promise<AdminProperty | null>;
  deleteProperty(id: ID): Promise<void>;

  listClients(q?: ClientQuery): Promise<Client[]>;
  getClient(id: ID): Promise<Client | null>;
  createClient(input: ClientInput): Promise<Client>;
  updateClient(id: ID, patch: Patch<ClientInput>): Promise<Client | null>;
  deleteClient(id: ID): Promise<void>;

  listLeads(): Promise<Lead[]>;
  getLead(id: ID): Promise<Lead | null>;
  createLead(input: LeadInput): Promise<Lead>;
  createPublicLead(input: PublicLeadInput): Promise<Lead>;
  updateLead(id: ID, patch: Patch<LeadInput>): Promise<Lead | null>;
  moveLead(id: ID, stage: PipelineStage): Promise<Lead | null>;
  deleteLead(id: ID): Promise<void>;

  listActivities(filter?: {
    clientId?: ID | undefined;
    leadId?: ID | undefined;
    propertyId?: ID | undefined;
  }): Promise<Activity[]>;
  addActivity(input: ActivityInput): Promise<Activity>;

  listAppointments(range?: { from: string; to: string }): Promise<Appointment[]>;
  createAppointment(input: AppointmentInput): Promise<Appointment>;
  updateAppointment(id: ID, patch: Patch<AppointmentInput>): Promise<Appointment | null>;
  setAppointmentStatus(id: ID, status: AppointmentStatus): Promise<Appointment | null>;
  saveViewingReport(
    id: ID,
    report: { interest: number; outcome: string; nextAction?: string | undefined },
  ): Promise<Appointment | null>;

  listDocuments(): Promise<StoredDocument[]>;
  createDocument(input: DocumentInput): Promise<StoredDocument>;
  deleteDocument(id: ID): Promise<void>;

  listTasks(): Promise<AdminTask[]>;
  createTask(input: TaskInput): Promise<AdminTask>;
  updateTask(id: ID, patch: Patch<TaskInput>): Promise<AdminTask | null>;

  listTransactions(): Promise<Transaction[]>;
  createTransaction(input: TransactionInput): Promise<Transaction>;
  moveTransactionStage(id: ID, stage: TransactionStage): Promise<Transaction | null>;
  addPayment(transactionId: ID, input: PaymentInput): Promise<Transaction | null>;
  markPaymentPaid(transactionId: ID, paymentId: ID): Promise<Transaction | null>;
  deleteTransaction(id: ID): Promise<void>;

  listAgents(): Promise<Agent[]>;

  listNotifications(): Promise<AppNotification[]>;
  createNotification(input: NotificationInput): Promise<AppNotification>;
  markNotificationRead(id: ID): Promise<void>;
  markAllNotificationsRead(): Promise<void>;

  getDashboard(): Promise<DashboardSummary>;
  getPriorities(agentId?: string): Promise<Priority[]>;

  /* ------------------------------------------------------------- marketing */

  listCampaigns(): Promise<MarketingCampaign[]>;
  createCampaign(input: CampaignInput): Promise<MarketingCampaign>;
  sendCampaign(id: ID): Promise<MarketingCampaign | null>;
  deleteCampaign(id: ID): Promise<void>;
  setFeatured(propertyId: ID, until: string): Promise<FeaturedProperty[]>;
  removeFeatured(propertyId: ID): Promise<FeaturedProperty[]>;
  getMarketingStats(): Promise<MarketingStats>;

  /* --------------------------------------------------------------- matching */

  matchForClient(clientId: ID): Promise<PropertyMatch[]>;
  matchForProperty(propertyId: ID): Promise<ClientMatch[]>;
  sendMatchesToClient(clientId: ID, propertyIds: ID[]): Promise<number>;

  /* ------------------------------------------------------------- automations */

  getAutomations(): Promise<AutomationOverview>;
  setAutomation(key: AutomationRuleKey, enabled: boolean): Promise<AutomationRule[]>;
  listInactiveLeads(): Promise<InactiveLead[]>;
  createCallbackTask(leadId: ID): Promise<AdminTask | null>;

  /* ---------------------------------------------------------------- reports */

  getReport(key: ReportKey, q?: ReportQuery): Promise<Report>;
}
