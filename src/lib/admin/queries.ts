/**
 * TanStack Query bindings for the admin. Screens import these, never the
 * server functions directly, so cache keys stay consistent.
 */

import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ClientQuery, PropertyQuery } from "./repository";
import {
  fetchActivities,
  fetchAgents,
  fetchAppointments,
  fetchClient,
  fetchClients,
  fetchDashboard,
  fetchDocuments,
  fetchLeads,
  fetchNotifications,
  fetchPriorities,
  fetchProperties,
  fetchProperty,
  fetchTasks,
  fetchTransactions,
  moveLead,
  readAllNotifications,
  readNotification,
  setPropertyStatus,
} from "./server";
import type { PipelineStage, PropertyStatus } from "./types";

export const adminKeys = {
  all: ["admin"] as const,
  properties: (q: PropertyQuery = {}) => ["admin", "properties", q] as const,
  property: (id: string) => ["admin", "property", id] as const,
  clients: (q: ClientQuery = {}) => ["admin", "clients", q] as const,
  client: (id: string) => ["admin", "client", id] as const,
  leads: () => ["admin", "leads"] as const,
  agents: () => ["admin", "agents"] as const,
  activities: (f: Record<string, string | undefined> = {}) => ["admin", "activities", f] as const,
  appointments: () => ["admin", "appointments"] as const,
  documents: () => ["admin", "documents"] as const,
  tasks: () => ["admin", "tasks"] as const,
  transactions: () => ["admin", "transactions"] as const,
  notifications: () => ["admin", "notifications"] as const,
  dashboard: () => ["admin", "dashboard"] as const,
  priorities: () => ["admin", "priorities"] as const,
};

export const propertiesQuery = (q: PropertyQuery = {}) =>
  queryOptions({
    queryKey: adminKeys.properties(q),
    queryFn: () => fetchProperties({ data: q }),
  });

export const propertyQuery = (id: string) =>
  queryOptions({
    queryKey: adminKeys.property(id),
    queryFn: () => fetchProperty({ data: id }),
  });

export const clientsQuery = (q: ClientQuery = {}) =>
  queryOptions({
    queryKey: adminKeys.clients(q),
    queryFn: () => fetchClients({ data: q }),
  });

export const clientQuery = (id: string) =>
  queryOptions({
    queryKey: adminKeys.client(id),
    queryFn: () => fetchClient({ data: id }),
  });

export const leadsQuery = () =>
  queryOptions({ queryKey: adminKeys.leads(), queryFn: () => fetchLeads() });

export const agentsQuery = () =>
  queryOptions({ queryKey: adminKeys.agents(), queryFn: () => fetchAgents() });

export const activitiesQuery = (
  f: { clientId?: string; leadId?: string; propertyId?: string } = {},
) =>
  queryOptions({
    queryKey: adminKeys.activities(f),
    queryFn: () => fetchActivities({ data: f }),
  });

export const appointmentsQuery = () =>
  queryOptions({ queryKey: adminKeys.appointments(), queryFn: () => fetchAppointments() });

export const documentsQuery = () =>
  queryOptions({ queryKey: adminKeys.documents(), queryFn: () => fetchDocuments() });

export const tasksQuery = () =>
  queryOptions({ queryKey: adminKeys.tasks(), queryFn: () => fetchTasks() });

export const transactionsQuery = () =>
  queryOptions({ queryKey: adminKeys.transactions(), queryFn: () => fetchTransactions() });

export const notificationsQuery = () =>
  queryOptions({ queryKey: adminKeys.notifications(), queryFn: () => fetchNotifications() });

export const dashboardQuery = () =>
  queryOptions({ queryKey: adminKeys.dashboard(), queryFn: () => fetchDashboard() });

export const prioritiesQuery = () =>
  queryOptions({ queryKey: adminKeys.priorities(), queryFn: () => fetchPriorities() });

/* -------------------------------------------------------------- mutations */

export function useSetPropertyStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { id: string; status: PropertyStatus }) => setPropertyStatus({ data: vars }),
    // A status change can remove a property from public results, so refresh
    // the dashboard counts alongside the lists.
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "properties"] });
      qc.invalidateQueries({ queryKey: adminKeys.dashboard() });
    },
  });
}

export function useMoveLead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { id: string; stage: PipelineStage }) => moveLead({ data: vars }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.leads() });
      qc.invalidateQueries({ queryKey: adminKeys.dashboard() });
    },
  });
}

export function useReadNotification() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => readNotification({ data: id }),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.notifications() }),
  });
}

export function useReadAllNotifications() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => readAllNotifications(),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.notifications() }),
  });
}
