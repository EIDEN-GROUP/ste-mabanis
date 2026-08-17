import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Plus,
  Clock,
  CalendarDays,
  CheckCircle2,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  appointmentsQuery,
  agentsQuery,
  clientsQuery,
  propertiesQuery,
  useCreateAppointment,
  useUpdateAppointment,
  useSetAppointmentStatus,
  useSaveViewingReport,
} from "@/lib/admin/queries";
import type { Appointment, AppointmentKind, AppointmentStatus } from "@/lib/admin/types";
import { APPOINTMENT_LABELS, formatDate, formatTime, label } from "@/lib/admin/format";
import { SEED_NOW } from "@/lib/admin/seed";
import { Calendar } from "@/components/admin/calendar";
import { StatCard, Modal, AdminButton, SearchSelect } from "@/components/admin/primitives";
import { useAgentScope } from "@/lib/admin/session";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/agenda")({
  // `rdv` is set by the header search: it opens that appointment and moves the
  // calendar to its date.
  validateSearch: (search: Record<string, unknown>): { rdv: string | undefined } => ({
    rdv: typeof search["rdv"] === "string" && search["rdv"] ? search["rdv"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Agenda   STE MABANIS" },
      { name: "description", content: "Planning des rendez-vous et visites." },
    ],
  }),
  component: AgendaPage,
});

type View = "jour" | "semaine" | "mois";

const PREV_LABEL: Record<View, string> = {
  jour: "Jour précédent",
  semaine: "Semaine précédente",
  mois: "Mois précédent",
};

const NEXT_LABEL: Record<View, string> = {
  jour: "Jour suivant",
  semaine: "Semaine suivante",
  mois: "Mois suivant",
};

/** Left edge colour of a timeline block, matching the month-view chips. */
const KIND_EDGE: Record<AppointmentKind, string> = {
  viewing: "border-l-gold",
  valuation: "border-l-blue",
  signature: "border-l-positive",
  call: "border-l-muted-foreground/40",
  meeting: "border-l-status-archived",
};

const KIND_TONE: Record<AppointmentKind, string> = {
  viewing: "border-gold/50 text-gold",
  valuation: "border-blue/40 text-blue",
  signature: "border-positive/40 text-positive",
  call: "border-line text-navy/70",
  meeting: "border-status-archived text-navy/60",
};

const STATUS_TONE: Record<AppointmentStatus, string> = {
  scheduled: "border-line text-navy/75",
  confirmed: "border-gold/50 text-gold",
  done: "border-positive/40 text-positive",
  cancelled: "border-negative/40 text-negative",
  no_show: "border-negative/40 text-negative",
};

const DAY_START_MIN = 8 * 60;
const DAY_END_MIN = 20 * 60;
const DAY_SPAN_MIN = DAY_END_MIN - DAY_START_MIN;

function minutesOf(iso: string) {
  const d = new Date(iso);
  return d.getHours() * 60 + d.getMinutes();
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfWeek(d: Date) {
  const day = (d.getDay() + 6) % 7;
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() - day);
}

function addDays(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
}

/** The period the toolbar is currently pointing at, spelled out in full. */
function rangeLabel(view: View, anchor: Date) {
  if (view === "jour") {
    return anchor.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  if (view === "mois") {
    return anchor.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  }
  const from = startOfWeek(anchor);
  const to = addDays(from, 6);
  const sameMonth = from.getMonth() === to.getMonth();
  const left = from.toLocaleDateString(
    "fr-FR",
    sameMonth ? { day: "numeric" } : { day: "numeric", month: "short" },
  );
  const right = to.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  return `${left} – ${right}`;
}

function toLocalInput(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function toLocalTime(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** Breakdown by appointment type, for the KPI explanation modals. */
function kindRows(items: Appointment[]) {
  const counts = new Map<AppointmentKind, number>();
  for (const a of items) counts.set(a.kind, (counts.get(a.kind) ?? 0) + 1);
  return [...counts.entries()].map(([kind, n]) => ({
    label: label(APPOINTMENT_LABELS, kind),
    value: String(n),
  }));
}

function AgendaPage() {
  const [view, setView] = useState<View>("semaine");
  // The period the agenda is pointing at. One anchor for the three views: the
  // step size changes, the date does not.
  const [anchor, setAnchor] = useState<Date>(() => new Date(SEED_NOW));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const step = (dir: -1 | 1) =>
    setAnchor((d) =>
      view === "jour"
        ? addDays(d, dir)
        : view === "semaine"
          ? addDays(d, dir * 7)
          : new Date(d.getFullYear(), d.getMonth() + dir, 1),
    );

  const isOnToday =
    view === "mois"
      ? anchor.getFullYear() === SEED_NOW.getFullYear() && anchor.getMonth() === SEED_NOW.getMonth()
      : view === "semaine"
        ? sameDay(startOfWeek(anchor), startOfWeek(SEED_NOW))
        : sameDay(anchor, SEED_NOW);

  // A commercial workspace only sees the appointments its agent runs.
  const scope = useAgentScope();

  const { data: appointments = [] } = useQuery(appointmentsQuery());
  const { data: clients = [] } = useQuery(clientsQuery({}));
  const { data: properties = [] } = useQuery(propertiesQuery({}));
  const { data: agents = [] } = useQuery(agentsQuery());

  const visibleAppointments = scope
    ? appointments.filter((a) => a.agentId === scope)
    : appointments;
  const scopedClients = scope ? clients.filter((c) => c.agentId === scope) : clients;

  const clientsById = useMemo(() => new Map(clients.map((c) => [c.id, c])), [clients]);
  const propertiesById = useMemo(() => new Map(properties.map((p) => [p.id, p])), [properties]);
  const agentsById = useMemo(() => new Map(agents.map((a) => [a.id, a])), [agents]);

  const today = visibleAppointments.filter((a) => sameDay(new Date(a.startsAt), SEED_NOW));
  const week = visibleAppointments.filter((a) => {
    const d = new Date(a.startsAt);
    return (
      sameDay(d, SEED_NOW) || (d > SEED_NOW && d < new Date(SEED_NOW.getTime() + 7 * 86_400_000))
    );
  });
  const doneWeek = week.filter((a) => a.status === "done");

  const selected = visibleAppointments.find((a) => a.id === selectedId) ?? null;

  // A hit from the header search: open that appointment and move the calendar
  // onto its day, so closing the modal leaves you on the right date.
  // Guarded by a ref: `setAnchor` takes a fresh Date, and `visibleAppointments`
  // is a new array every render, so without it the effect would re-fire itself.
  const { rdv } = Route.useSearch();
  const handledRdv = useRef<string | null>(null);
  useEffect(() => {
    if (!rdv || handledRdv.current === rdv) return;
    const target = visibleAppointments.find((a) => a.id === rdv);
    if (!target) return;
    handledRdv.current = rdv;
    setSelectedId(rdv);
    setAnchor(new Date(target.startsAt));
  }, [rdv, visibleAppointments]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Aujourd'hui"
          value={String(today.length)}
          hint="Rendez-vous du jour"
          icon={Clock}
          index={0}
          detail={{
            what: "Tous les rendez-vous inscrits à la date d'aujourd'hui.",
            how: "On compte les rendez-vous dont la date de début tombe aujourd'hui, tous types confondus : visites, estimations, signatures, appels et réunions. Un commercial ne voit que ses propres rendez-vous ; la direction voit ceux de toute l'équipe.",
            why: "C'est le programme de la journée. Ouvrez la vue « Jour » ci-dessous pour les voir placés heure par heure et repérer les créneaux encore libres.",
            rows: kindRows(today),
          }}
        />
        <StatCard
          label="7 prochains jours"
          value={String(week.filter((a) => a.status !== "done").length)}
          hint={"Dont visites : " + String(week.filter((a) => a.kind === "viewing").length)}
          icon={CalendarDays}
          index={1}
          detail={{
            what: "Les rendez-vous à venir sur les sept prochains jours, ceux déjà terminés exclus.",
            how: "On prend les rendez-vous entre aujourd'hui et dans sept jours, puis on retire ceux dont le statut est « Terminé ». Les annulations et les absences restent comptées tant qu'elles n'ont pas été supprimées.",
            why: "C'est la charge de travail de la semaine. Si elle est vide en milieu de semaine, c'est le moment de relancer les leads chauds pour caler des visites.",
            rows: kindRows(week.filter((a) => a.status !== "done")),
          }}
        />
        <StatCard
          label="Terminés cette semaine"
          value={String(doneWeek.length)}
          hint="Visites débriefées"
          icon={CheckCircle2}
          index={2}
          detail={{
            what: "Les rendez-vous de la semaine qui ont été marqués comme terminés.",
            how: "Parmi les rendez-vous des sept prochains jours, on compte ceux passés au statut « Terminé ». Le statut se change depuis la fiche du rendez-vous, et passer une visite en « Terminé » ouvre directement le formulaire de débrief.",
            why: "Un rendez-vous terminé sans débrief est une information perdue : le niveau d'intérêt du client et la conclusion de la visite alimentent le score du lead. Comparez ce chiffre au nombre de rendez-vous passés pour repérer les débriefs manquants.",
          }}
        />
        <StatCard
          label="Visites à venir"
          value={String(
            visibleAppointments.filter((a) => a.kind === "viewing" && a.status !== "done").length,
          )}
          hint="Toutes périodes"
          icon={Eye}
          index={3}
          detail={{
            what: "Toutes les visites de biens encore à réaliser, sans limite de date.",
            how: "On compte les rendez-vous de type « Visite » dont le statut n'est pas « Terminé », y compris ceux planifiés dans plusieurs semaines.",
            why: "C'est le volume de visites que l'agence s'est engagée à faire. Chaque visite réalisée et débriefée fait avancer un lead dans le pipeline : ce chiffre annonce les offres des prochaines semaines.",
          }}
        />
      </div>

      {/* Toolbar: which view, which period, and the way to move through it.
          The same three controls drive day, week and month. */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex overflow-hidden rounded-md border border-line">
          {(["jour", "semaine", "mois"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              aria-pressed={view === v}
              className={cn(
                "px-4 py-2.5 text-[0.68rem] tracking-[0.14em] uppercase transition-colors",
                view === v ? "bg-navy text-white" : "text-muted-foreground hover:text-navy",
              )}
            >
              {v}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label={PREV_LABEL[view]}
            title={PREV_LABEL[view]}
            className="grid size-10 place-items-center rounded-md border border-line text-navy transition-colors hover:border-gold hover:text-gold"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setAnchor(new Date(SEED_NOW))}
            disabled={isOnToday}
            className={cn(
              "h-10 rounded-md border border-line px-3 text-[0.62rem] tracking-[0.14em] uppercase transition-colors",
              isOnToday
                ? "cursor-default text-muted-foreground/50"
                : "text-navy hover:border-gold hover:text-gold",
            )}
          >
            Aujourd'hui
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label={NEXT_LABEL[view]}
            title={NEXT_LABEL[view]}
            className="grid size-10 place-items-center rounded-md border border-line text-navy transition-colors hover:border-gold hover:text-gold"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        <p
          aria-live="polite"
          className="display min-w-0 flex-1 truncate text-lg capitalize sm:text-xl"
        >
          {rangeLabel(view, anchor)}
        </p>

        <AdminButton onClick={() => setCreating(true)}>
          <Plus className="size-3.5" /> Nouveau rendez-vous
        </AdminButton>
      </div>

      {view === "mois" ? (
        <Calendar
          appointments={visibleAppointments}
          month={anchor}
          onSelectAppointment={setSelectedId}
        />
      ) : (
        <Timeline
          view={view}
          anchor={anchor}
          appointments={visibleAppointments}
          onSelect={setSelectedId}
        />
      )}

      <AppointmentModal
        appointment={selected}
        client={selected ? (clientsById.get(selected.clientId ?? "") ?? null) : null}
        property={selected ? (propertiesById.get(selected.propertyId ?? "") ?? null) : null}
        agent={selected ? (agentsById.get(selected.agentId) ?? null) : null}
        onClose={() => setSelectedId(null)}
      />

      {creating ? (
        <AppointmentFormModal
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

/* ----------------------------------------------------------------- timeline */

function Timeline({
  view,
  anchor,
  appointments,
  onSelect,
}: {
  view: View;
  anchor: Date;
  appointments: Appointment[];
  onSelect: (id: string) => void;
}) {
  const isDay = view === "jour";

  const days = useMemo(() => {
    if (isDay) return [anchor];
    const monday = startOfWeek(anchor);
    return Array.from({ length: 7 }, (_, i) => addDays(monday, i));
  }, [isDay, anchor]);

  const hours = Array.from({ length: DAY_SPAN_MIN / 60 + 1 }, (_, i) => DAY_START_MIN / 60 + i);
  const gridHeight = `${(DAY_SPAN_MIN / 60) * 3.5}rem`;

  // "Now" marker, only when the day being looked at is the current one.
  const nowMinutes = minutesOf(SEED_NOW.toISOString());
  const nowVisible = nowMinutes >= DAY_START_MIN && nowMinutes <= DAY_END_MIN;
  const nowTop = ((nowMinutes - DAY_START_MIN) / DAY_SPAN_MIN) * 100;

  // The hour gutter is a real column, so labels never sit on top of an event.
  const columns = `4rem repeat(${days.length}, minmax(0, 1fr))`;

  return (
    <div className="overflow-hidden rounded-md border border-line bg-admin-surface">
      <div className={cn("scrollbar-gold", isDay ? "" : "overflow-x-auto")}>
        <div className={cn(isDay ? "min-w-0" : "min-w-[46rem]")}>
          {/* -------------------------------------------------- day headers */}
          <div className="grid border-b border-line" style={{ gridTemplateColumns: columns }}>
            <div className="border-r border-line" />
            {days.map((d) => {
              const isToday = sameDay(d, SEED_NOW);
              const count = appointments.filter((a) => sameDay(new Date(a.startsAt), d)).length;
              return (
                <div
                  key={d.toISOString()}
                  className={cn(
                    "border-r border-line py-3 text-center last:border-r-0",
                    isToday && "bg-gold/8",
                  )}
                >
                  <p className="text-[0.58rem] tracking-[0.16em] text-muted-foreground uppercase">
                    {d.toLocaleDateString(
                      "fr-FR",
                      isDay ? { weekday: "long" } : { weekday: "short" },
                    )}
                  </p>
                  <p className={cn("display mt-0.5 text-lg", isToday && "text-gold")}>
                    {isDay
                      ? d.toLocaleDateString("fr-FR", { day: "numeric", month: "long" })
                      : d.getDate()}
                  </p>
                  <p className="mt-0.5 text-[0.58rem] text-muted-foreground tabular-nums">
                    {count === 0 ? "—" : `${count} RDV`}
                  </p>
                </div>
              );
            })}
          </div>

          {/* ------------------------------------------------------- grid */}
          <div
            className="relative grid"
            style={{ gridTemplateColumns: columns, height: gridHeight }}
          >
            {/* Hour rules across the full width, drawn once behind the columns. */}
            {hours.map((h) => (
              <div
                key={`rule-${h}`}
                aria-hidden
                className="pointer-events-none absolute inset-x-0 border-t border-line/50"
                style={{ top: `${((h * 60 - DAY_START_MIN) / DAY_SPAN_MIN) * 100}%` }}
              />
            ))}

            {/* Labels sit just under their rule rather than astride it, so the
                first hour is not half-clipped by the panel's rounded edge. */}
            <div className="relative border-r border-line">
              {hours.slice(0, -1).map((h) => (
                <span
                  key={h}
                  className="absolute right-2 text-[0.6rem] text-muted-foreground tabular-nums"
                  style={{
                    top: `calc(${((h * 60 - DAY_START_MIN) / DAY_SPAN_MIN) * 100}% + 2px)`,
                  }}
                >
                  {String(h).padStart(2, "0")}:00
                </span>
              ))}
            </div>

            {days.map((d) => {
              const isToday = sameDay(d, SEED_NOW);
              const items = appointments
                .filter((a) => sameDay(new Date(a.startsAt), d))
                .sort((a, b) => a.startsAt.localeCompare(b.startsAt));

              return (
                <div
                  key={d.toISOString()}
                  className={cn(
                    "relative border-r border-line/60 last:border-r-0",
                    isToday && "bg-gold/4",
                  )}
                >
                  {isToday && nowVisible ? (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 z-10 border-t border-negative/70"
                      style={{ top: `${nowTop}%` }}
                    >
                      <span className="absolute -top-1 -left-1 size-2 rounded-full bg-negative" />
                    </div>
                  ) : null}

                  {items.map((a) => {
                    const start = minutesOf(a.startsAt);
                    const end = Math.max(start + 30, minutesOf(a.endsAt));
                    const top = ((start - DAY_START_MIN) / DAY_SPAN_MIN) * 100;
                    const height = ((end - start) / DAY_SPAN_MIN) * 100;
                    const cancelled = a.status === "cancelled" || a.status === "no_show";
                    return (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => onSelect(a.id)}
                        title={`${formatTime(a.startsAt)} – ${formatTime(a.endsAt)} · ${a.title}`}
                        className={cn(
                          "absolute inset-x-1 overflow-hidden rounded-md border border-line border-l-2 bg-admin-surface px-2 py-1 text-left transition-colors hover:border-gold hover:bg-gold/10",
                          KIND_EDGE[a.kind],
                          cancelled && "opacity-60",
                        )}
                        style={{ top: `${top}%`, height: `max(${height}%, 1.75rem)` }}
                      >
                        {/* The day view has the room to say more than the hour. */}
                        <span
                          className={cn(
                            "flex gap-1.5",
                            isDay ? "flex-row items-baseline" : "flex-col",
                          )}
                        >
                          <span className="shrink-0 text-[0.62rem] font-medium text-navy tabular-nums">
                            {formatTime(a.startsAt)}
                            {isDay ? ` – ${formatTime(a.endsAt)}` : ""}
                          </span>
                          <span className="min-w-0 flex-1 truncate text-[0.68rem] text-navy/80">
                            {a.title}
                          </span>
                          {isDay ? (
                            <span className="shrink-0 rounded-md border border-line px-1.5 py-0.5 text-[0.55rem] tracking-[0.1em] text-muted-foreground uppercase">
                              {label(APPOINTMENT_LABELS, a.kind)}
                            </span>
                          ) : null}
                        </span>
                        {isDay && a.location ? (
                          <span className="mt-0.5 block truncate text-[0.6rem] text-muted-foreground">
                            {a.location}
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------- appointment drawer */

function AppointmentModal({
  appointment,
  client,
  property,
  agent,
  onClose,
}: {
  appointment: Appointment | null;
  client: { id: string; firstName: string; lastName: string } | null;
  property: { id: string; title: string; reference: string } | null;
  agent: { id: string; name: string } | null;
  onClose: () => void;
}) {
  const [reporting, setReporting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [interest, setInterest] = useState(appointment?.report?.interest ?? 3);
  const [outcome, setOutcome] = useState(appointment?.report?.outcome ?? "");
  const [nextAction, setNextAction] = useState(appointment?.report?.nextAction ?? "");

  const setStatus = useSetAppointmentStatus();
  const saveReport = useSaveViewingReport();

  if (!appointment) return null;

  const actions = ["confirmed", "done", "cancelled", "no_show"] as const;

  return (
    <Modal
      open
      onClose={onClose}
      title={appointment.title}
      footer={[
        <AdminButton key="edit" variant="outline" onClick={() => setEditing(true)}>
          Modifier
        </AdminButton>,
        appointment.status === "scheduled" ? (
          <AdminButton
            key="status"
            onClick={() => setStatus.mutate({ id: appointment.id, status: "confirmed" })}
          >
            Confirmer
          </AdminButton>
        ) : null,
      ]}
    >
      <div className="space-y-5">
        <div className="flex flex-wrap gap-2">
          <span
            className={cn(
              "border px-2.5 py-1 text-[0.6rem] tracking-[0.12em] uppercase",
              KIND_TONE[appointment.kind],
            )}
          >
            {label(APPOINTMENT_LABELS, appointment.kind)}
          </span>
          <span
            className={cn(
              "border px-2.5 py-1 text-[0.6rem] tracking-[0.12em] uppercase",
              STATUS_TONE[appointment.status],
            )}
          >
            {label(
              {
                scheduled: "Planifié",
                confirmed: "Confirmé",
                done: "Terminé",
                cancelled: "Annulé",
                no_show: "Absence",
              },
              appointment.status,
            )}
          </span>
        </div>

        <dl className="space-y-2.5 text-sm">
          <div className="flex gap-3">
            <dt className="w-24 shrink-0 text-xs text-muted-foreground uppercase">Quand</dt>
            <dd className="text-navy">
              {formatDate(appointment.startsAt)} · {formatTime(appointment.startsAt)} –{" "}
              {formatTime(appointment.endsAt)}
            </dd>
          </div>
          {client ? (
            <div className="flex gap-3">
              <dt className="w-24 shrink-0 text-xs text-muted-foreground uppercase">Client</dt>
              <dd className="text-navy">
                {client.firstName} {client.lastName}
              </dd>
            </div>
          ) : null}
          {property ? (
            <div className="flex gap-3">
              <dt className="w-24 shrink-0 text-xs text-muted-foreground uppercase">Bien</dt>
              <dd className="text-navy">
                {property.title}{" "}
                <span className="text-muted-foreground">({property.reference})</span>
              </dd>
            </div>
          ) : null}
          {agent ? (
            <div className="flex gap-3">
              <dt className="w-24 shrink-0 text-xs text-muted-foreground uppercase">Agent</dt>
              <dd className="text-navy">{agent.name}</dd>
            </div>
          ) : null}
          {appointment.location ? (
            <div className="flex gap-3">
              <dt className="w-24 shrink-0 text-xs text-muted-foreground uppercase">Lieu</dt>
              <dd className="text-navy">{appointment.location}</dd>
            </div>
          ) : null}
        </dl>

        <div>
          <p className="eyebrow">Statut</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {actions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setStatus.mutate({ id: appointment.id, status: s });
                  if (s === "done") setReporting(true);
                }}
                className={cn(
                  "border px-3 py-1.5 text-[0.62rem] tracking-[0.12em] uppercase transition-colors",
                  appointment.status === s
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-line text-muted-foreground hover:border-gold hover:text-navy",
                )}
              >
                {label(
                  {
                    scheduled: "Planifié",
                    confirmed: "Confirmé",
                    done: "Terminé",
                    cancelled: "Annulé",
                    no_show: "Absence",
                  },
                  s,
                )}
              </button>
            ))}
          </div>
        </div>

        {appointment.report ? (
          <div className="rounded-md border border-line bg-sand/60 p-4">
            <p className="eyebrow">Débrief de visite</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="flex gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "size-2",
                      i < (appointment.report?.interest ?? 0) ? "bg-gold" : "bg-line",
                    )}
                  />
                ))}
              </span>
              <span className="text-xs text-muted-foreground">{appointment.report.interest}/5</span>
            </div>
            <p className="mt-2 text-sm text-navy">{appointment.report.outcome}</p>
            {appointment.report.nextAction ? (
              <p className="mt-2 text-xs text-muted-foreground">
                Suivi : {appointment.report.nextAction}
              </p>
            ) : null}
          </div>
        ) : null}

        {reporting ? (
          <form
            className="space-y-4 rounded-md border border-line p-4"
            onSubmit={(e) => {
              e.preventDefault();
              saveReport.mutate(
                {
                  id: appointment.id,
                  report: {
                    interest,
                    outcome: outcome.trim() || "Visite effectuée",
                    ...(nextAction.trim() ? { nextAction: nextAction.trim() } : {}),
                  },
                },
                { onSuccess: () => setReporting(false) },
              );
            }}
          >
            <p className="eyebrow">Nouveau débrief</p>
            <div>
              <p className="text-xs text-muted-foreground uppercase">Intérêt du client</p>
              <div className="mt-2 flex gap-1.5">
                {Array.from({ length: 6 }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setInterest(i)}
                    aria-label={`Intérêt ${i}/5`}
                    className={cn(
                      "size-8 border text-xs",
                      i === 0 ? "" : "",
                      i <= interest
                        ? "border-gold bg-gold/15 text-gold"
                        : "border-line text-muted-foreground",
                    )}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs text-muted-foreground uppercase">Conclusion</span>
              <textarea
                value={outcome}
                onChange={(e) => setOutcome(e.target.value)}
                rows={3}
                className="rounded-md border border-line bg-admin-bg/40 px-3 py-2 text-sm outline-none focus:border-gold"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs text-muted-foreground uppercase">Prochaine action</span>
              <input
                value={nextAction}
                onChange={(e) => setNextAction(e.target.value)}
                className="h-11 rounded-md border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold"
              />
            </label>
            <AdminButton type="submit">Enregistrer le débrief</AdminButton>
          </form>
        ) : null}
      </div>

      {editing ? (
        <AppointmentFormModal
          appointment={appointment}
          clients={client ? [client] : []}
          properties={property ? [property] : []}
          agents={agent ? [agent] : []}
          onClose={() => setEditing(false)}
        />
      ) : null}
    </Modal>
  );
}

/* ------------------------------------------------------- appointment form modal */

function AppointmentFormModal({
  appointment,
  clients,
  properties,
  agents,
  defaultAgentId,
  onClose,
}: {
  appointment?: Appointment | undefined;
  clients: { firstName: string; lastName: string; id: string; email?: string | undefined }[];
  properties: { title: string; id: string; reference?: string | undefined }[];
  agents: { name: string; id: string }[];
  defaultAgentId?: string | undefined;
  onClose: () => void;
}) {
  const isEdit = Boolean(appointment);
  const start = appointment
    ? new Date(appointment.startsAt)
    : new Date(SEED_NOW.getTime() + 86_400_000);
  const [kind, setKind] = useState<AppointmentKind>(appointment?.kind ?? "viewing");
  const [title, setTitle] = useState(appointment?.title ?? "");
  const [date, setDate] = useState(toLocalInput(start));
  const [from, setFrom] = useState(toLocalTime(start));
  const [to, setTo] = useState(toLocalTime(new Date(start.getTime() + 60 * 60 * 1000)));
  const [clientId, setClientId] = useState(appointment?.clientId ?? "");
  const [propertyId, setPropertyId] = useState(appointment?.propertyId ?? "");
  const [agentId, setAgentId] = useState(appointment?.agentId ?? defaultAgentId ?? "");
  const [location, setLocation] = useState(appointment?.location ?? "");

  const create = useCreateAppointment();
  const update = useUpdateAppointment();

  const submit = async () => {
    const startsAt = new Date(`${date}T${from}`).toISOString();
    const endsAt = new Date(`${date}T${to}`).toISOString();
    if (isEdit && appointment) {
      await update.mutateAsync({
        id: appointment.id,
        patch: {
          kind,
          title: title.trim() || "Rendez-vous",
          startsAt,
          endsAt,
          clientId: clientId || undefined,
          propertyId: propertyId || undefined,
          agentId: agentId || undefined,
          location: location.trim() || undefined,
        },
      });
    } else {
      await create.mutateAsync({
        kind,
        title: title.trim() || "Rendez-vous",
        startsAt,
        endsAt,
        clientId: clientId || undefined,
        propertyId: propertyId || undefined,
        agentId: agentId || undefined,
        location: location.trim() || undefined,
      });
    }
    onClose();
  };

  const fieldCls =
    "h-11 rounded-md border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold";

  return (
    <Modal
      open
      onClose={onClose}
      title={isEdit ? "Modifier le rendez-vous" : "Nouveau rendez-vous"}
      footer={[
        <AdminButton key="cancel" variant="outline" onClick={onClose}>
          Annuler
        </AdminButton>,
        <AdminButton key="save" onClick={submit}>
          {isEdit ? "Enregistrer" : "Créer"}
        </AdminButton>,
      ]}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <SearchSelect
          label="Type"
          value={kind}
          onChange={(v) => setKind(v as AppointmentKind)}
          options={(Object.keys(APPOINTMENT_LABELS) as AppointmentKind[]).map((k) => ({
            value: k,
            label: label(APPOINTMENT_LABELS, k),
          }))}
        />
        <label className="flex flex-col gap-1.5">
          <span className="text-xs text-muted-foreground uppercase">Titre</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Visite accompagnée"
            className={fieldCls}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs text-muted-foreground uppercase">Date</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={fieldCls}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs text-muted-foreground uppercase">Horaire</span>
          <div className="flex items-center gap-2">
            <input
              type="time"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className={fieldCls}
            />
            <span className="text-muted-foreground">–</span>
            <input
              type="time"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className={fieldCls}
            />
          </div>
        </label>
        <SearchSelect
          label="Client"
          value={clientId}
          onChange={setClientId}
          clearLabel="Sans client"
          placeholder="Sans client"
          searchPlaceholder="Nom du client…"
          options={clients.map((c) => ({
            value: c.id,
            label: `${c.firstName} ${c.lastName}`,
            hint: c.email,
          }))}
        />
        <SearchSelect
          label="Bien"
          value={propertyId}
          onChange={setPropertyId}
          clearLabel="Sans bien"
          placeholder="Sans bien"
          searchPlaceholder="Titre ou référence…"
          options={properties.map((p) => ({ value: p.id, label: p.title, hint: p.reference }))}
        />
        <SearchSelect
          label="Agent"
          value={agentId}
          onChange={setAgentId}
          clearLabel="Non assigné"
          placeholder="Non assigné"
          searchPlaceholder="Nom de l'agent…"
          options={agents.map((a) => ({ value: a.id, label: a.name }))}
        />
        <label className="flex flex-col gap-1.5">
          <span className="text-xs text-muted-foreground uppercase">Lieu</span>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Agadir"
            className={fieldCls}
          />
        </label>
      </div>
    </Modal>
  );
}
