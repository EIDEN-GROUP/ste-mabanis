import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Plus,
  Flame,
  Wallet,
  Layers,
  Pencil,
  Building2,
  CalendarClock,
  UserRound,
  Clock,
  Target,
  Search,
} from "lucide-react";
import {
  leadsQuery,
  clientsQuery,
  propertiesQuery,
  agentsQuery,
  activitiesQuery,
  useCreateLead,
  useCreateClient,
  useMoveLead,
  useUpdateLead,
} from "@/lib/admin/queries";
import type { LeadInput } from "@/lib/admin/repository";
import { LEAD_SOURCES, PIPELINE_STAGES, type Lead, type LeadTemperature } from "@/lib/admin/types";
import {
  formatMoney,
  formatNumber,
  label,
  SOURCE_LABELS,
  STAGE_LABELS,
  TEMPERATURE_LABELS,
  relativeTime,
} from "@/lib/admin/format";
import { Pipeline } from "@/components/admin/pipeline";
import { TemperatureBadge, RoleBadge } from "@/components/admin/status-badge";
import {
  Modal,
  AdminButton,
  EmptyState,
  StatCard,
  SearchSelect,
  toast,
  type StatDetail,
} from "@/components/admin/primitives";
import { useAgentScope } from "@/lib/admin/session";
import { ActivityTimeline } from "./clients";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/crm")({
  // `q` is set by the header search so a hit lands on this screen already filtered.
  validateSearch: (search: Record<string, unknown>): { q: string | undefined } => ({
    q: typeof search["q"] === "string" && search["q"] ? search["q"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Pipeline CRM   STE MABANIS" },
      { name: "description", content: "Pipeline des leads et opportunités." },
    ],
  }),
  component: CrmPage,
});

function CrmPage() {
  const { q } = Route.useSearch();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [search, setSearch] = useState(q ?? "");

  // Arriving from the header search   or searching again while already here.
  useEffect(() => {
    if (q) setSearch(q);
  }, [q]);

  // A commercial workspace only sees the leads it owns.
  const scope = useAgentScope();

  const { data: leads = [] } = useQuery(leadsQuery());
  const { data: clients = [] } = useQuery(clientsQuery({}));
  const { data: properties = [] } = useQuery(propertiesQuery({}));
  const { data: agents = [] } = useQuery(agentsQuery());
  const { data: activities = [] } = useQuery(
    activitiesQuery(selectedId ? { leadId: selectedId } : {}),
  );

  const visibleLeads = scope ? leads.filter((l) => l.agentId === scope) : leads;
  const scopedClients = scope ? clients.filter((c) => c.agentId === scope) : clients;

  const clientsById = useMemo(() => new Map(clients.map((c) => [c.id, c])), [clients]);
  const propertiesById = useMemo(() => new Map(properties.map((p) => [p.id, p])), [properties]);
  const moveLead = useMoveLead();

  const filteredLeads = useMemo(() => {
    if (!search.trim()) return visibleLeads;
    const term = search.trim().toLowerCase();
    return visibleLeads.filter((l) => {
      const client = clientsById.get(l.clientId);
      const property = l.propertyId ? propertiesById.get(l.propertyId) : undefined;
      return [
        client?.firstName,
        client?.lastName,
        client?.email,
        property?.title,
        property?.reference,
      ]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(term));
    });
  }, [visibleLeads, search, clientsById, propertiesById]);

  const hotCount = visibleLeads.filter(
    (l) => l.temperature === "hot" && l.stage !== "won" && l.stage !== "lost",
  ).length;
  const openValue = visibleLeads
    .filter((l) => l.stage !== "won" && l.stage !== "lost")
    .reduce((s, l) => s + l.value, 0);

  // Where the leads sit right now   shown inside the KPI explanation modals.
  const stageRows = PIPELINE_STAGES.map((s) => ({
    label: label(STAGE_LABELS, s),
    value: formatNumber(visibleLeads.filter((l) => l.stage === s).length),
  })).filter((r) => r.value !== "0");

  const tiles: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
    detail: StatDetail;
  }[] = [
    {
      icon: Layers,
      label: "Leads ouverts",
      value: formatNumber(visibleLeads.length),
      detail: {
        what: "Tous les leads visibles dans votre pipeline.",
        how: "On compte les leads du tableau ci-dessous, colonnes « Gagné » et « Perdu » comprises. Un commercial ne voit que les leads dont il est l'agent ; la direction voit ceux de toute l'équipe.",
        why: "C'est le volume total à suivre. Les colonnes du tableau montrent où ils sont bloqués : une colonne qui gonfle est une étape où le processus coince.",
        rows: stageRows,
      },
    },
    {
      icon: Flame,
      label: "Chauds",
      value: formatNumber(hotCount),
      detail: {
        what: "Les leads marqués « Chaud » et encore en cours.",
        how: "On compte les leads dont la température est « Chaud » et dont l'étape n'est ni « Gagné » ni « Perdu ». La température se règle à la main dans la fiche du lead, ou monte après une visite bien notée.",
        why: "Ce sont les affaires à traiter en priorité aujourd'hui. Un lead chaud laissé sans contact plus de 48 h redevient tiède.",
      },
    },
    {
      icon: Wallet,
      label: "Valeur pipeline",
      value: formatMoney(openValue, true),
      detail: {
        what: "La somme des affaires encore ouvertes dans votre pipeline.",
        how: "On additionne la valeur de chaque lead qui n'est ni gagné ni perdu. La valeur reprend le prix du bien associé au lead, ou le montant saisi à la main dans la fiche.",
        why: "C'est le chiffre d'affaires potentiel en négociation. Rapporté au taux de conversion du tableau de bord, il donne une prévision réaliste de ce qui sera signé.",
        rows: stageRows,
      },
    },
  ];

  const selectedLead = visibleLeads.find((l) => l.id === selectedId) ?? null;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="eyebrow">CRM</p>
          <h2 className="display mt-1 text-2xl">Pipeline</h2>
        </div>
        <AdminButton onClick={() => setCreating(true)}>
          <Plus className="size-3.5" />
          Nouveau lead
        </AdminButton>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {tiles.map(({ icon, label: l, value, detail }) => (
          <StatCard key={l} label={l} value={value} icon={icon} detail={detail} />
        ))}
      </div>

      <label className="relative flex items-center">
        <Search className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Chercher un client ou un bien…"
          aria-label="Rechercher dans le pipeline"
          className="h-11 w-full rounded-md border border-line bg-admin-surface pr-3 pl-9 text-sm outline-none placeholder:text-muted-foreground focus:border-gold"
        />
      </label>

      <Pipeline
        leads={filteredLeads}
        clients={clientsById}
        properties={propertiesById}
        onMove={(leadId, stage) => moveLead.mutate({ id: leadId, stage })}
      />

      <LeadModal
        lead={selectedLead}
        client={selectedLead ? (clientsById.get(selectedLead.clientId) ?? null) : null}
        property={
          selectedLead?.propertyId ? (propertiesById.get(selectedLead.propertyId) ?? null) : null
        }
        agents={agents}
        activities={selectedLead ? activities.filter((a) => a.leadId === selectedLead.id) : []}
        onMove={(stage) => selectedLead && moveLead.mutate({ id: selectedLead.id, stage })}
        onClose={() => setSelectedId(null)}
      />

      {creating ? (
        <LeadFormModal
          clients={scopedClients}
          properties={properties}
          agents={agents}
          defaultAgentId={scope ?? undefined}
          onClose={() => setCreating(false)}
        />
      ) : null}
    </div>
  );
}

/* ---------------------------------------------------------------- lead modal */

function LeadModal({
  lead,
  client,
  property,
  agents,
  activities,
  onMove,
  onClose,
}: {
  lead: Lead | null;
  client: import("@/lib/admin/types").Client | null;
  property: import("@/lib/admin/types").AdminProperty | null;
  agents: { id: string; name: string }[];
  activities: import("@/lib/admin/types").Activity[];
  onMove: (stage: import("@/lib/admin/types").PipelineStage) => void;
  onClose: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const updateLead = useUpdateLead();

  if (!lead) return null;

  const agentName = agents.find((a) => a.id === lead.agentId)?.name ?? " ";

  const setTemperature = (t: LeadTemperature) =>
    updateLead.mutate({ id: lead.id, patch: { temperature: t } });

  return (
    <Modal
      open={Boolean(lead)}
      onClose={onClose}
      title={client ? `${client.firstName} ${client.lastName}` : "Lead"}
      footer={
        <>
          <AdminButton variant="outline" onClick={() => setEditing((v) => !v)}>
            <Pencil className="size-3.5" />
            {editing ? "Voir" : "Modifier"}
          </AdminButton>
          <AdminButton variant="outline" className="flex-1" onClick={onClose}>
            Fermer
          </AdminButton>
        </>
      }
    >
      {editing ? (
        <LeadEditForm lead={lead} agents={agents} onDone={() => setEditing(false)} />
      ) : (
        <div className="space-y-5">
          <div className="flex items-start gap-4">
            <span className="display grid size-14 shrink-0 place-items-center rounded-md border border-line bg-sand text-xl text-navy">
              {client ? `${client.firstName[0]}${client.lastName[0]}` : "?"}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md border border-line px-2 py-0.5 text-[0.58rem] tracking-[0.12em] text-muted-foreground uppercase">
                  {label(STAGE_LABELS, lead.stage)}
                </span>
                <TemperatureBadge temperature={lead.temperature} score={lead.score} />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {label(SOURCE_LABELS, lead.source)} · {agentName} · {relativeTime(lead.createdAt)}
              </p>
            </div>
          </div>

          <dl className="space-y-2.5">
            {property ? (
              <div className="flex items-center gap-2.5 rounded-md border border-line bg-admin-bg/50 px-3.5 py-3">
                <Building2 className="size-4 shrink-0 text-gold" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-navy">{property.title}</p>
                  <p className="text-xs text-muted-foreground">{property.reference}</p>
                </div>
                <span className="shrink-0 text-sm font-medium text-blue tabular-nums">
                  {formatMoney(property.price, true)}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2.5 rounded-md border border-line bg-admin-bg/50 px-3.5 py-3 text-sm text-muted-foreground">
                <Building2 className="size-4 shrink-0 text-gold" />
                Aucun bien associé
              </div>
            )}

            <div className="flex items-center gap-2.5 rounded-md border border-line bg-admin-bg/50 px-3.5 py-3">
              <Wallet className="size-4 shrink-0 text-gold" />
              <span className="text-sm text-navy/80">
                Valeur de l'opportunité :{" "}
                <span className="font-medium text-navy tabular-nums">
                  {formatMoney(lead.value)}
                </span>
              </span>
            </div>

            {lead.nextAction ? (
              <div className="flex items-start gap-2.5 rounded-md border border-line bg-admin-bg/50 px-3.5 py-3">
                <Target className="mt-0.5 size-4 shrink-0 text-gold" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-navy">{lead.nextAction}</p>
                  {lead.nextActionAt ? (
                    <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="size-3" />
                      {new Date(lead.nextActionAt).toLocaleString("fr-FR", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}
          </dl>

          <section>
            <p className="eyebrow mb-2.5">Étape du pipeline</p>
            <div className="grid grid-cols-2 gap-2">
              {PIPELINE_STAGES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => onMove(s)}
                  aria-pressed={lead.stage === s}
                  className={cn(
                    "min-h-9 border px-2.5 py-1.5 text-[0.66rem] tracking-[0.1em] uppercase transition-colors",
                    lead.stage === s
                      ? "border-gold bg-gold/10 text-navy"
                      : "border-line text-muted-foreground hover:border-gold/60",
                  )}
                >
                  {label(STAGE_LABELS, s)}
                </button>
              ))}
            </div>
          </section>

          <section>
            <p className="eyebrow mb-2.5">Température</p>
            <div className="grid grid-cols-3 gap-2">
              {(["cold", "warm", "hot"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTemperature(t)}
                  aria-pressed={lead.temperature === t}
                  className={cn(
                    "min-h-10 border text-[0.66rem] tracking-[0.12em] uppercase transition-colors",
                    lead.temperature === t
                      ? "border-gold bg-gold/10 text-navy"
                      : "border-line text-muted-foreground hover:border-gold/60",
                  )}
                >
                  {label(TEMPERATURE_LABELS, t)}
                </button>
              ))}
            </div>
          </section>

          {client ? (
            <section>
              <p className="eyebrow mb-2.5">Client</p>
              <div className="space-y-1.5 rounded-md border border-line bg-admin-bg/50 px-3.5 py-3 text-sm text-navy/80">
                <p className="flex items-center gap-2">
                  <UserRound className="size-3.5 shrink-0 text-gold" />
                  {client.email}
                </p>
                <p className="flex items-center gap-2">
                  <CalendarClock className="size-3.5 shrink-0 text-gold" />
                  {client.phone || "Sans téléphone"}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {client.roles.map((r) => (
                    <RoleBadge key={r} role={r} />
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          <section>
            <p className="eyebrow mb-3">Activité</p>
            <ActivityTimeline activities={activities} />
          </section>
        </div>
      )}
    </Modal>
  );
}

/* -------------------------------------------------------------- lead edit */

function LeadEditForm({
  lead,
  agents,
  onDone,
}: {
  lead: Lead;
  agents: { id: string; name: string }[];
  onDone: () => void;
}) {
  const [form, setForm] = useState({
    score: String(lead.score),
    temperature: lead.temperature,
    source: lead.source,
    value: String(lead.value),
    nextAction: lead.nextAction ?? "",
    agentId: lead.agentId,
  });
  const updateLead = useUpdateLead();

  const submit = async () => {
    await updateLead.mutateAsync({
      id: lead.id,
      patch: {
        score: Number(form.score) || 0,
        temperature: form.temperature,
        source: form.source as Lead["source"],
        value: Number(form.value) || 0,
        nextAction: form.nextAction.trim() || undefined,
        agentId: form.agentId || undefined,
      },
    });
    toast.success("Lead mis à jour");
    onDone();
  };

  return (
    <div className="space-y-4">
      <label className="flex flex-col gap-1.5">
        <span className="text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase">
          Score (0-100)
        </span>
        <input
          type="number"
          value={form.score}
          onChange={(e) => setForm((f) => ({ ...f, score: e.target.value }))}
          className="h-11 rounded-md border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold"
        />
      </label>

      <SearchSelect
        label="Température"
        value={form.temperature}
        onChange={(v) => setForm((f) => ({ ...f, temperature: v as LeadTemperature }))}
        options={(["cold", "warm", "hot"] as const).map((t) => ({
          value: t,
          label: label(TEMPERATURE_LABELS, t),
        }))}
      />

      <SearchSelect
        label="Source"
        value={form.source}
        onChange={(v) => setForm((f) => ({ ...f, source: v as Lead["source"] }))}
        options={LEAD_SOURCES.map((s) => ({ value: s, label: label(SOURCE_LABELS, s) }))}
      />

      <label className="flex flex-col gap-1.5">
        <span className="text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase">
          Valeur (MAD)
        </span>
        <input
          type="number"
          value={form.value}
          onChange={(e) => setForm((f) => ({ ...f, value: e.target.value }))}
          className="h-11 rounded-md border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase">
          Prochaine action
        </span>
        <input
          value={form.nextAction}
          onChange={(e) => setForm((f) => ({ ...f, nextAction: e.target.value }))}
          placeholder="Ex. Rappeler pour fixer la visite"
          className="h-11 rounded-md border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold"
        />
      </label>

      <SearchSelect
        label="Agent"
        value={form.agentId}
        onChange={(v) => setForm((f) => ({ ...f, agentId: v }))}
        searchPlaceholder="Nom de l'agent…"
        options={agents.map((a) => ({ value: a.id, label: a.name }))}
      />

      <AdminButton className="w-full" onClick={() => void submit()}>
        Enregistrer
      </AdminButton>
    </div>
  );
}

/* ---------------------------------------------------------------- new lead */

function LeadFormModal({
  clients,
  properties,
  agents,
  defaultAgentId,
  onClose,
}: {
  clients: import("@/lib/admin/types").Client[];
  properties: import("@/lib/admin/types").AdminProperty[];
  agents: { id: string; name: string }[];
  defaultAgentId?: string | undefined;
  onClose: () => void;
}) {
  const [newClient, setNewClient] = useState(false);
  const [clientId, setClientId] = useState(clients[0]?.id ?? "");
  const [quick, setQuick] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [propertyId, setPropertyId] = useState("");
  // The source, the temperature and the score describe how this contact reached
  // the agency   they belong to the client's record, so they follow it rather
  // than starting from a generic default.
  const [source, setSource] = useState<Lead["source"]>(clients[0]?.source ?? "site_web");
  const [temperature, setTemperature] = useState<LeadTemperature>(
    clients[0]?.temperature ?? "cold",
  );
  const [score, setScore] = useState(clients[0] ? String(clients[0].score) : "30");
  const [nextAction, setNextAction] = useState("Premier contact téléphonique");
  const [saving, setSaving] = useState(false);

  const createLead = useCreateLead();
  const createClient = useCreateClient();

  const selectedProperty = properties.find((p) => p.id === propertyId);
  const selectedClient = clients.find((c) => c.id === clientId);

  /** Picking a client refills the fields its record already answers. */
  const pickClient = (id: string) => {
    setClientId(id);
    const client = clients.find((c) => c.id === id);
    if (!client) return;
    setSource(client.source);
    setTemperature(client.temperature);
    setScore(String(client.score));
  };

  const submit = async () => {
    let targetClientId = clientId;
    if (newClient) {
      if (!quick.firstName.trim() || !quick.email.trim()) {
        toast.error("Client incomplet", "Prénom et email sont requis pour créer le client.");
        return;
      }
      const created = await createClient.mutateAsync({
        firstName: quick.firstName.trim(),
        lastName: quick.lastName.trim(),
        email: quick.email.trim(),
        phone: quick.phone.trim(),
        source: "site_web",
        agentId: defaultAgentId ?? agents[0]?.id,
      });
      targetClientId = created.id;
    }
    if (!targetClientId) {
      toast.error("Client requis", "Choisissez un client ou créez-en un.");
      return;
    }
    const payload: LeadInput = {
      clientId: targetClientId,
      propertyId: propertyId || undefined,
      source,
      temperature,
      score: Number(score) || 0,
      value: selectedProperty?.price ?? 0,
      agentId: defaultAgentId ?? agents[0]?.id,
      nextAction: nextAction.trim() || undefined,
      stage: "new",
    };
    setSaving(true);
    try {
      await createLead.mutateAsync(payload);
      toast.success("Lead créé", "Une tâche de premier contact a été planifiée.");
      onClose();
    } catch (err) {
      toast.error("Création impossible", err instanceof Error ? err.message : undefined);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open
      onClose={onClose}
      title="Nouveau lead"
      description="Le lead démarre en « Nouveau » avec une tâche de premier contact sous 24 h."
      size="md"
      footer={
        <>
          <AdminButton variant="outline" onClick={onClose}>
            Annuler
          </AdminButton>
          <AdminButton onClick={() => void submit()} disabled={saving}>
            {saving ? "Création…" : "Créer le lead"}
          </AdminButton>
        </>
      }
    >
      <div className="grid gap-4">
        <fieldset className="space-y-3">
          <div className="flex items-center justify-between">
            <legend className="text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase">
              Client
            </legend>
            <button
              type="button"
              onClick={() => setNewClient((v) => !v)}
              className="text-[0.68rem] font-medium text-navy underline decoration-gold decoration-2 underline-offset-2"
            >
              {newClient ? "Choisir un client existant" : "Créer un nouveau client"}
            </button>
          </div>

          {newClient ? (
            <div className="grid grid-cols-2 gap-3">
              {(
                [
                  { key: "firstName", label: "Prénom *", type: "text" },
                  { key: "lastName", label: "Nom", type: "text" },
                  { key: "email", label: "Email *", type: "email" },
                  { key: "phone", label: "Téléphone", type: "tel" },
                ] as const
              ).map((f) => (
                <label key={f.key} className="flex flex-col gap-1.5">
                  <span className="text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase">
                    {f.label}
                  </span>
                  <input
                    type={f.type}
                    value={quick[f.key]}
                    onChange={(e) => setQuick((q) => ({ ...q, [f.key]: e.target.value }))}
                    className="h-11 rounded-md border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold"
                  />
                </label>
              ))}
            </div>
          ) : (
            <SearchSelect
              value={clientId}
              onChange={pickClient}
              placeholder="Choisir un client"
              searchPlaceholder="Nom ou email du client…"
              options={clients.map((c) => ({
                value: c.id,
                label: `${c.firstName} ${c.lastName}`,
                hint: c.email,
              }))}
            />
          )}
        </fieldset>

        <SearchSelect
          label="Bien concerné"
          value={propertyId}
          onChange={setPropertyId}
          clearLabel="Sans bien associé"
          placeholder="Sans bien associé"
          searchPlaceholder="Titre ou référence…"
          options={properties.map((p) => ({
            value: p.id,
            label: p.title,
            hint: p.reference,
          }))}
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <SearchSelect
              label="Source"
              value={source}
              onChange={(v) => setSource(v as Lead["source"])}
              options={LEAD_SOURCES.map((s) => ({ value: s, label: label(SOURCE_LABELS, s) }))}
            />
            {!newClient && selectedClient ? (
              <p className="mt-1.5 text-[0.65rem] text-muted-foreground">
                Reprise de la fiche de {selectedClient.firstName} {selectedClient.lastName}.
              </p>
            ) : null}
          </div>

          <SearchSelect
            label="Température"
            value={temperature}
            onChange={(v) => setTemperature(v as LeadTemperature)}
            options={(["cold", "warm", "hot"] as const).map((t) => ({
              value: t,
              label: label(TEMPERATURE_LABELS, t),
            }))}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase">
              Score
            </span>
            <input
              type="number"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              className="h-11 rounded-md border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase">
              Valeur {selectedProperty ? "· " + formatMoney(selectedProperty.price, true) : ""}
            </span>
            <input
              value={selectedProperty ? String(selectedProperty.price) : "0"}
              disabled
              className="h-11 rounded-md border border-line bg-admin-bg/40 px-3 text-sm text-muted-foreground outline-none"
            />
          </label>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase">
            Prochaine action
          </span>
          <input
            value={nextAction}
            onChange={(e) => setNextAction(e.target.value)}
            className="h-11 rounded-md border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold"
          />
        </label>
      </div>
    </Modal>
  );
}
