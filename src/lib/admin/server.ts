/**
 * Typed server functions. Screens never touch the repository directly — they go
 * through these, so authorisation (and later Supabase RLS) has exactly one
 * place to live.
 */

import { createServerFn } from "@tanstack/react-start";
import { repository, type ClientQuery, type PropertyQuery } from "./repository";
import {
  PROPERTY_STATUSES,
  PIPELINE_STAGES,
  type PipelineStage,
  type PropertyStatus,
} from "./types";

/* ------------------------------------------------------------- validators */

function asString(v: unknown): string | undefined {
  return typeof v === "string" && v.length ? v : undefined;
}

function asNumber(v: unknown): number | undefined {
  return typeof v === "number" && Number.isFinite(v) ? v : undefined;
}

function asStringArray(v: unknown): string[] | undefined {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : undefined;
}

function parsePropertyQuery(raw: unknown): PropertyQuery {
  const q = (raw ?? {}) as Record<string, unknown>;
  const status = asStringArray(q["status"])?.filter((s): s is PropertyStatus =>
    (PROPERTY_STATUSES as readonly string[]).includes(s),
  );
  const tx = q["transaction"];
  const sortRaw = q["sort"];
  return {
    search: asString(q["search"]),
    status,
    transaction: tx === "vente" || tx === "location" ? tx : undefined,
    agentId: asString(q["agentId"]),
    city: asString(q["city"]),
    minPrice: asNumber(q["minPrice"]),
    maxPrice: asNumber(q["maxPrice"]),
    sort: ["recent", "price_asc", "price_desc", "views"].includes(sortRaw as string)
      ? (sortRaw as PropertyQuery["sort"])
      : undefined,
  };
}

function parseClientQuery(raw: unknown): ClientQuery {
  const q = (raw ?? {}) as Record<string, unknown>;
  return {
    search: asString(q["search"]),
    roles: asStringArray(q["roles"]),
    temperature: asStringArray(q["temperature"]),
    agentId: asString(q["agentId"]),
  };
}

function requireId(raw: unknown): string {
  const id = asString(raw);
  if (!id) throw new Error("An id is required");
  return id;
}

/* --------------------------------------------------------------- properties */

export const fetchProperties = createServerFn({ method: "GET" })
  .inputValidator(parsePropertyQuery)
  .handler(({ data }) => repository.listProperties(data));

export const fetchProperty = createServerFn({ method: "GET" })
  .inputValidator(requireId)
  .handler(({ data }) => repository.getProperty(data));

export const setPropertyStatus = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => {
    const q = (raw ?? {}) as Record<string, unknown>;
    const status = asString(q["status"]);
    if (!status || !(PROPERTY_STATUSES as readonly string[]).includes(status)) {
      throw new Error(`Unknown property status: ${String(q["status"])}`);
    }
    return { id: requireId(q["id"]), status: status as PropertyStatus };
  })
  .handler(({ data }) => repository.updatePropertyStatus(data.id, data.status));

/* ------------------------------------------------------------------ people */

export const fetchClients = createServerFn({ method: "GET" })
  .inputValidator(parseClientQuery)
  .handler(({ data }) => repository.listClients(data));

export const fetchClient = createServerFn({ method: "GET" })
  .inputValidator(requireId)
  .handler(({ data }) => repository.getClient(data));

export const fetchAgents = createServerFn({ method: "GET" }).handler(() => repository.listAgents());

/* ------------------------------------------------------------------- leads */

export const fetchLeads = createServerFn({ method: "GET" }).handler(() => repository.listLeads());

export const moveLead = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => {
    const q = (raw ?? {}) as Record<string, unknown>;
    const stage = asString(q["stage"]);
    if (!stage || !(PIPELINE_STAGES as readonly string[]).includes(stage)) {
      throw new Error(`Unknown pipeline stage: ${String(q["stage"])}`);
    }
    return { id: requireId(q["id"]), stage: stage as PipelineStage };
  })
  .handler(({ data }) => repository.moveLead(data.id, data.stage));

/* --------------------------------------------------------------- everything */

export const fetchActivities = createServerFn({ method: "GET" })
  .inputValidator((raw: unknown) => {
    const q = (raw ?? {}) as Record<string, unknown>;
    return {
      clientId: asString(q["clientId"]),
      leadId: asString(q["leadId"]),
      propertyId: asString(q["propertyId"]),
    };
  })
  .handler(({ data }) => repository.listActivities(data));

export const fetchAppointments = createServerFn({ method: "GET" }).handler(() =>
  repository.listAppointments(),
);

export const fetchDocuments = createServerFn({ method: "GET" }).handler(() =>
  repository.listDocuments(),
);

export const fetchTasks = createServerFn({ method: "GET" }).handler(() => repository.listTasks());

export const fetchTransactions = createServerFn({ method: "GET" }).handler(() =>
  repository.listTransactions(),
);

/* ------------------------------------------------------------ notifications */

export const fetchNotifications = createServerFn({ method: "GET" }).handler(() =>
  repository.listNotifications(),
);

export const readNotification = createServerFn({ method: "POST" })
  .inputValidator(requireId)
  .handler(({ data }) => repository.markNotificationRead(data));

export const readAllNotifications = createServerFn({ method: "POST" }).handler(() =>
  repository.markAllNotificationsRead(),
);

/* ---------------------------------------------------------------- dashboard */

export const fetchDashboard = createServerFn({ method: "GET" }).handler(() =>
  repository.getDashboard(),
);

export const fetchPriorities = createServerFn({ method: "GET" }).handler(() =>
  repository.getPriorities(),
);
