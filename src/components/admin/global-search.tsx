import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Search,
  X,
  Building2,
  UserRound,
  KanbanSquare,
  CalendarDays,
  CheckSquare,
  FolderOpen,
  CornerDownLeft,
  type LucideIcon,
} from "lucide-react";
import {
  appointmentsQuery,
  clientsQuery,
  documentsQuery,
  leadsQuery,
  propertiesQuery,
  tasksQuery,
} from "@/lib/admin/queries";
import {
  APPOINTMENT_LABELS,
  DOCUMENT_LABELS,
  formatDate,
  formatMoney,
  formatTime,
  label,
  normalizeText,
  PROPERTY_STATUS_LABELS,
  STAGE_LABELS,
} from "@/lib/admin/format";
import { useAgentScope, useCan } from "@/lib/admin/session";
import { cn } from "@/lib/utils";

/** Per-group cap, so one crowded type never buries the others. */
const PER_GROUP = 4;

type Hit = {
  key: string;
  group: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  go: () => void;
};

/**
 * One search box for the whole back office: biens, clients, leads, rendez-vous,
 * tâches et documents. Choosing a result lands on the right screen already
 * filtered on that record   the header search is a way in, not a dead end.
 *
 * Data is only fetched once the field is opened; on most screens the lists are
 * already in the React Query cache anyway.
 */
export function GlobalSearch() {
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [active, setActive] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sheetInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const scope = useAgentScope();
  const canCrm = useCan("screen.crm");

  const live = open || sheet;
  const trimmed = term.trim();
  const q = normalizeText(trimmed);

  const { data: properties = [] } = useQuery({ ...propertiesQuery({}), enabled: live });
  const { data: clients = [] } = useQuery({ ...clientsQuery({}), enabled: live });
  const { data: leads = [] } = useQuery({ ...leadsQuery(), enabled: live && canCrm });
  const { data: appointments = [] } = useQuery({ ...appointmentsQuery(), enabled: live });
  const { data: tasks = [] } = useQuery({ ...tasksQuery(), enabled: live });
  const { data: documents = [] } = useQuery({ ...documentsQuery(), enabled: live });

  const clientsById = useMemo(() => new Map(clients.map((c) => [c.id, c])), [clients]);

  const hits = useMemo<Hit[]>(() => {
    if (q.length < 2) return [];
    const matches = (...fields: (string | number | undefined)[]) =>
      fields.some((f) => f !== undefined && normalizeText(String(f)).includes(q));

    const out: Hit[] = [];

    for (const p of properties
      .filter((x) => matches(x.title, x.reference, x.neighborhood, x.city))
      .slice(0, PER_GROUP)) {
      out.push({
        key: `p-${p.id}`,
        group: "Biens",
        icon: Building2,
        title: p.title,
        subtitle: `${p.reference} · ${label(PROPERTY_STATUS_LABELS, p.status)} · ${formatMoney(p.price, true)}`,
        go: () => void navigate({ to: "/admin/proprietes", search: { q: p.reference } }),
      });
    }

    const visibleClients = scope ? clients.filter((c) => c.agentId === scope) : clients;
    for (const c of visibleClients
      .filter((x) =>
        matches(x.firstName, x.lastName, `${x.firstName} ${x.lastName}`, x.email, x.phone, x.city),
      )
      .slice(0, PER_GROUP)) {
      out.push({
        key: `c-${c.id}`,
        group: "Clients",
        icon: UserRound,
        title: `${c.firstName} ${c.lastName}`,
        subtitle: [c.email, c.phone].filter(Boolean).join(" · "),
        go: () => void navigate({ to: "/admin/clients", search: { q: c.email || c.lastName } }),
      });
    }

    if (canCrm) {
      const visibleLeads = scope ? leads.filter((l) => l.agentId === scope) : leads;
      for (const l of visibleLeads
        .filter((x) => {
          const c = clientsById.get(x.clientId);
          return matches(
            c?.firstName,
            c?.lastName,
            `${c?.firstName} ${c?.lastName}`,
            c?.email,
            x.nextAction,
          );
        })
        .slice(0, PER_GROUP)) {
        const c = clientsById.get(l.clientId);
        const name = c ? `${c.firstName} ${c.lastName}` : "Lead";
        out.push({
          key: `l-${l.id}`,
          group: "Leads",
          icon: KanbanSquare,
          title: name,
          subtitle: `${label(STAGE_LABELS, l.stage)} · ${formatMoney(l.value, true)}`,
          go: () => void navigate({ to: "/admin/crm", search: { q: c?.email || name } }),
        });
      }
    }

    const visibleAppointments = scope
      ? appointments.filter((a) => a.agentId === scope)
      : appointments;
    for (const a of visibleAppointments
      .filter((x) => matches(x.title, x.location))
      .sort((x, y) => y.startsAt.localeCompare(x.startsAt))
      .slice(0, PER_GROUP)) {
      out.push({
        key: `a-${a.id}`,
        group: "Rendez-vous",
        icon: CalendarDays,
        title: a.title,
        subtitle: `${label(APPOINTMENT_LABELS, a.kind)} · ${formatDate(a.startsAt)} à ${formatTime(a.startsAt)}`,
        go: () => void navigate({ to: "/admin/agenda", search: { rdv: a.id } }),
      });
    }

    const visibleTasks = scope ? tasks.filter((t) => t.assigneeId === scope) : tasks;
    for (const t of visibleTasks.filter((x) => matches(x.title)).slice(0, PER_GROUP)) {
      out.push({
        key: `t-${t.id}`,
        group: "Tâches",
        icon: CheckSquare,
        title: t.title,
        subtitle: t.dueAt ? `Échéance ${formatDate(t.dueAt)}` : "Sans échéance",
        go: () => void navigate({ to: "/admin/taches" }),
      });
    }

    for (const d of documents.filter((x) => matches(x.name)).slice(0, PER_GROUP)) {
      out.push({
        key: `d-${d.id}`,
        group: "Documents",
        icon: FolderOpen,
        title: d.name,
        subtitle: `${label(DOCUMENT_LABELS, d.category)} · v${d.version}`,
        go: () => void navigate({ to: "/admin/documents", search: { q: d.name } }),
      });
    }

    return out;
  }, [
    q,
    properties,
    clients,
    clientsById,
    leads,
    appointments,
    tasks,
    documents,
    scope,
    canCrm,
    navigate,
  ]);

  // Reset the highlight whenever the result set changes under it.
  useEffect(() => setActive(0), [q]);

  // Close on a click outside either surface.
  useEffect(() => {
    if (!live) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (rootRef.current?.contains(t) || sheetRef.current?.contains(t)) return;
      setOpen(false);
      setSheet(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [live]);

  // Ctrl/Cmd+K from anywhere in the back office.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (window.matchMedia("(min-width: 768px)").matches) {
          setOpen(true);
          inputRef.current?.focus();
        } else {
          setSheet(true);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (sheet) sheetInputRef.current?.focus();
  }, [sheet]);

  const close = () => {
    setOpen(false);
    setSheet(false);
    setTerm("");
  };

  const run = (hit: Hit) => {
    hit.go();
    close();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (hits.length ? (i + 1) % hits.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (hits.length ? (i - 1 + hits.length) % hits.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const hit = hits[active];
      if (hit) run(hit);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };

  const results = (
    <Results hits={hits} term={trimmed} active={active} onPick={run} onHover={setActive} />
  );

  return (
    <>
      {/* ------------------------------------------------------- desktop */}
      <div ref={rootRef} className="relative hidden md:block">
        <label className="relative flex items-center">
          <Search className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
          <input
            ref={inputRef}
            type="search"
            value={term}
            onChange={(e) => {
              setTerm(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            placeholder="Rechercher…"
            aria-label="Rechercher dans tout le back-office"
            className="h-10 w-52 rounded-md border border-line bg-background pr-3 pl-9 text-sm transition-[width,border-color] duration-300 outline-none placeholder:text-muted-foreground focus:w-72 focus:border-gold lg:w-64 lg:focus:w-80"
          />
        </label>
        {open && trimmed ? (
          <div className="absolute right-0 z-50 mt-2 w-[26rem] overflow-hidden rounded-md border border-line bg-admin-surface shadow-elegant">
            {results}
          </div>
        ) : null}
      </div>

      {/* -------------------------------------------------------- mobile */}
      <button
        type="button"
        onClick={() => setSheet(true)}
        aria-label="Rechercher"
        className="grid size-10 shrink-0 place-items-center rounded-md border border-line text-navy transition-colors hover:border-gold md:hidden"
      >
        <Search className="size-4" />
      </button>

      {sheet ? (
        <div className="fixed inset-0 z-[90] bg-navy/40 backdrop-blur-[2px] md:hidden">
          <div ref={sheetRef} className="border-b border-line bg-admin-surface p-3 shadow-elegant">
            <div className="flex items-center gap-2">
              <label className="relative flex min-w-0 flex-1 items-center">
                <Search className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
                <input
                  ref={sheetInputRef}
                  type="search"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Bien, client, lead, RDV…"
                  aria-label="Rechercher dans tout le back-office"
                  className="h-11 w-full rounded-md border border-line bg-background pr-3 pl-9 text-sm outline-none focus:border-gold"
                />
              </label>
              <button
                type="button"
                onClick={close}
                aria-label="Fermer la recherche"
                className="grid size-11 shrink-0 place-items-center rounded-md border border-line text-navy"
              >
                <X className="size-4" />
              </button>
            </div>
            {trimmed ? (
              <div className="mt-2 overflow-hidden rounded-md border border-line">{results}</div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

/* --------------------------------------------------------------- results */

function Results({
  hits,
  term,
  active,
  onPick,
  onHover,
}: {
  hits: Hit[];
  term: string;
  active: number;
  onPick: (hit: Hit) => void;
  onHover: (index: number) => void;
}) {
  if (term.trim().length < 2) {
    return <p className="px-4 py-4 text-sm text-muted-foreground">Tapez au moins deux lettres.</p>;
  }
  if (hits.length === 0) {
    return (
      <p className="px-4 py-4 text-sm text-muted-foreground">
        Aucun résultat pour « {term} ». La recherche couvre les biens, clients, leads, rendez-vous,
        tâches et documents.
      </p>
    );
  }

  let index = -1;
  let lastGroup = "";

  return (
    <div className="scrollbar-gold max-h-[26rem] overflow-y-auto [--scroll-track:var(--admin-surface)]">
      {hits.map((hit) => {
        index += 1;
        const i = index;
        const newGroup = hit.group !== lastGroup;
        lastGroup = hit.group;
        const Icon = hit.icon;

        return (
          <div key={hit.key}>
            {newGroup ? (
              <p className="border-b border-line bg-admin-bg/60 px-3.5 py-1.5 text-[0.55rem] tracking-[0.18em] text-muted-foreground uppercase">
                {hit.group}
              </p>
            ) : null}
            <button
              type="button"
              onMouseEnter={() => onHover(i)}
              onClick={() => onPick(hit)}
              className={cn(
                "flex w-full items-center gap-3 border-b border-line/60 px-3.5 py-2.5 text-left transition-colors",
                i === active ? "bg-gold/10" : "hover:bg-sand/60",
              )}
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-md border border-line bg-sand text-gold">
                <Icon className="size-3.5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-navy">{hit.title}</span>
                <span className="block truncate text-xs text-muted-foreground">{hit.subtitle}</span>
              </span>
              {i === active ? (
                <CornerDownLeft aria-hidden className="size-3.5 shrink-0 text-gold" />
              ) : null}
            </button>
          </div>
        );
      })}
    </div>
  );
}
