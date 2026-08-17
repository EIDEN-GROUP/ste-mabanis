import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  X,
  Inbox,
  TrendingUp,
  TrendingDown,
  Info,
  Search,
  Check,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { toast as sonnerToast } from "sonner";
import { formatPercent, normalizeText } from "@/lib/admin/format";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------- Panel */

/** The base surface every admin block sits on. Hairline, rounded-md, no shadow noise. */
export function Panel({
  children,
  className,
  as: Tag = "section",
}: {
  children: ReactNode;
  className?: string | undefined;
  as?: "section" | "div" | "article" | undefined;
}) {
  return (
    <Tag className={cn("rounded-md border border-line bg-admin-surface", className)}>
      {children}
    </Tag>
  );
}

export function PanelHeader({
  title,
  eyebrow,
  action,
  className,
}: {
  title: string;
  eyebrow?: string | undefined;
  action?: ReactNode | undefined;
  className?: string | undefined;
}) {
  return (
    <div className={cn("flex items-start gap-4 border-b border-line px-5 py-4", className)}>
      <div className="min-w-0 flex-1">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="display mt-1 truncate text-xl">{title}</h2>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

/* ---------------------------------------------------------------- StatCard */

/**
 * What a card explains when it is opened. `what` answers "what am I looking
 * at", `how` answers "where does this number come from" and `why` answers "what
 * do I do with it"   the three questions a non-technical user actually asks.
 */
export type StatDetail = {
  /** One sentence: what the number counts. */
  what: string;
  /** How it is computed   the rule in plain words, not a formula. */
  how: string;
  /** What to do when it moves. */
  why?: string | undefined;
  /** Optional breakdown table shown under the explanation. */
  rows?: { label: string; value: string }[] | undefined;
  /** Deep link to the screen that lets the user act on it. */
  href?: string | undefined;
  hrefLabel?: string | undefined;
};

const statCardSurface =
  "stagger-in group relative w-full overflow-hidden rounded-md border border-line bg-admin-surface p-5 text-left transition-[border-color,box-shadow] duration-400 hover:border-gold/60 hover:shadow-panel";

export function StatCard({
  label,
  value,
  delta,
  hint,
  icon: Icon,
  index = 0,
  className,
  detail,
  onClick,
}: {
  label: string;
  value: string;
  delta?: number | undefined;
  hint?: string | undefined;
  icon?: React.ComponentType<{ className?: string }> | undefined;
  index?: number | undefined;
  className?: string | undefined;
  detail?: StatDetail | undefined;
  /** Overrides the built-in explanation modal. */
  onClick?: (() => void) | undefined;
}) {
  const [open, setOpen] = useState(false);
  const positive = (delta ?? 0) >= 0;
  const Trend = positive ? TrendingUp : TrendingDown;
  const clickable = Boolean(detail || onClick);

  const body = (
    <>
      <div className="flex items-start gap-3" style={{ ["--i" as string]: index }}>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase">
            {label}
          </p>
          <p className="display mt-3 text-[clamp(1.75rem,4vw,2.5rem)] tabular-nums">{value}</p>
        </div>
        {Icon ? (
          <span className="grid size-10 shrink-0 place-items-center rounded-md border border-line bg-sand text-gold transition-colors duration-400 group-hover:border-gold/50">
            <Icon className="size-4" />
          </span>
        ) : null}
      </div>

      {delta !== undefined || hint ? (
        <div className="mt-4 flex items-center gap-2 border-t border-line pt-3 text-xs">
          {delta !== undefined ? (
            <span
              className={cn(
                "inline-flex items-center gap-1 font-medium tabular-nums",
                positive ? "text-positive" : "text-negative",
              )}
            >
              <Trend className="size-3.5" />
              {formatPercent(delta)}
            </span>
          ) : null}
          {hint ? <span className="truncate text-muted-foreground">{hint}</span> : null}
        </div>
      ) : null}

      {/* The affordance stays quiet until the card is hovered or focused so a
          wall of KPIs does not turn into a wall of icons. */}
      {clickable ? (
        <span
          aria-hidden
          className="pointer-events-none absolute top-3 right-3 text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <Info className="size-3.5" />
        </span>
      ) : null}
    </>
  );

  if (!clickable) {
    return <article className={cn(statCardSurface, "cursor-default", className)}>{body}</article>;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => (onClick ? onClick() : setOpen(true))}
        aria-haspopup={detail ? "dialog" : undefined}
        title={`${label}   voir le détail`}
        className={cn(
          statCardSurface,
          "cursor-pointer outline-none focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/35",
          className,
        )}
      >
        {body}
      </button>

      {detail ? (
        <StatDetailModal
          open={open}
          onClose={() => setOpen(false)}
          label={label}
          value={value}
          delta={delta}
          hint={hint}
          detail={detail}
        />
      ) : null}
    </>
  );
}

function StatDetailModal({
  open,
  onClose,
  label,
  value,
  delta,
  hint,
  detail,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  value: string;
  delta?: number | undefined;
  hint?: string | undefined;
  detail: StatDetail;
}) {
  const positive = (delta ?? 0) >= 0;
  const Trend = positive ? TrendingUp : TrendingDown;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={label}
      description={detail.what}
      size="md"
      footer={
        detail.href ? (
          <>
            <AdminButton variant="outline" onClick={onClose}>
              Fermer
            </AdminButton>
            <Link to={detail.href} onClick={onClose}>
              <AdminButton>
                {detail.hrefLabel ?? "Ouvrir l'écran"}
                <ArrowRight className="size-3.5" />
              </AdminButton>
            </Link>
          </>
        ) : (
          <AdminButton variant="outline" onClick={onClose}>
            Fermer
          </AdminButton>
        )
      }
    >
      <div className="space-y-5">
        <div className="rounded-md border border-line bg-admin-bg/50 px-4 py-4">
          <p className="eyebrow">Valeur actuelle</p>
          <p className="display mt-1 text-3xl tabular-nums">{value}</p>
          <p className="mt-2 flex flex-wrap items-center gap-2 text-xs">
            {delta !== undefined ? (
              <span
                className={cn(
                  "inline-flex items-center gap-1 font-medium tabular-nums",
                  positive ? "text-positive" : "text-negative",
                )}
              >
                <Trend className="size-3.5" />
                {formatPercent(delta)} vs période précédente
              </span>
            ) : null}
            {hint ? <span className="text-muted-foreground">{hint}</span> : null}
          </p>
        </div>

        <section>
          <p className="eyebrow">Comment ce chiffre est calculé</p>
          <p className="mt-2 text-sm leading-relaxed text-navy/80">{detail.how}</p>
        </section>

        {detail.why ? (
          <section>
            <p className="eyebrow">À quoi ça sert</p>
            <p className="mt-2 text-sm leading-relaxed text-navy/80">{detail.why}</p>
          </section>
        ) : null}

        {detail.rows?.length ? (
          <section>
            <p className="eyebrow mb-2">Détail</p>
            <dl className="overflow-hidden rounded-md border border-line">
              {detail.rows.map((r) => (
                <div
                  key={r.label}
                  className="flex items-center gap-3 border-b border-line px-3.5 py-2.5 text-sm last:border-0"
                >
                  <dt className="min-w-0 flex-1 truncate text-muted-foreground">{r.label}</dt>
                  <dd className="shrink-0 font-medium text-navy tabular-nums">{r.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}
      </div>
    </Modal>
  );
}

/* -------------------------------------------------------------- EmptyState */

export function EmptyState({
  title,
  description,
  action,
  icon: Icon = Inbox,
  className,
}: {
  title: string;
  description?: string | undefined;
  action?: ReactNode | undefined;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string | undefined;
}) {
  return (
    <div className={cn("flex flex-col items-center px-6 py-14 text-center", className)}>
      <span className="grid size-14 place-items-center rounded-md border border-line bg-sand text-gold">
        <Icon className="size-6" />
      </span>
      <h3 className="display mt-5 text-2xl">{title}</h3>
      {description ? (
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

/* ------------------------------------------------------------ LoadingState */

export function LoadingState({
  rows = 5,
  className,
  variant = "list",
}: {
  rows?: number | undefined;
  className?: string | undefined;
  variant?: "list" | "cards" | "chart" | undefined;
}) {
  if (variant === "chart") {
    return <div className={cn("skeleton h-64 w-full rounded-md", className)} aria-hidden />;
  }
  if (variant === "cards") {
    return (
      <div className={cn("grid gap-4 sm:grid-cols-2 xl:grid-cols-3", className)} aria-hidden>
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="skeleton h-52 w-full rounded-md" />
        ))}
      </div>
    );
  }
  return (
    <div className={cn("space-y-2", className)} aria-hidden>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="skeleton h-14 w-full rounded-md" />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------- Modal */

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string | undefined;
  children: ReactNode;
  footer?: ReactNode | undefined;
  size?: "sm" | "md" | "lg" | undefined;
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const widths = { sm: "max-w-md", md: "max-w-2xl", lg: "max-w-4xl" };

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6",
        open ? "visible" : "pointer-events-none invisible",
      )}
      style={{ transition: `visibility 0s linear ${open ? 0 : 320}ms` }}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        aria-hidden
        className={cn(
          "absolute inset-0 bg-navy/45 backdrop-blur-[2px] transition-opacity duration-320",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          // Rounded on every edge from sm up; as a phone sheet only the top corners
          // exist, the rest sits off-screen.
          "relative flex max-h-[92vh] w-full flex-col rounded-t-md bg-admin-surface shadow-elegant transition-[opacity,transform] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none sm:rounded-md",
          widths[size],
          // Sheet from the bottom on phones, scale-in on larger screens.
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-6 scale-100 opacity-0 sm:translate-y-0 sm:scale-[0.98]",
        )}
      >
        <header className="flex items-start gap-4 border-b border-line px-5 py-4">
          <div className="min-w-0 flex-1">
            <h2 className="display text-2xl">{title}</h2>
            {description ? (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="grid size-9 shrink-0 place-items-center rounded-md border border-line text-navy transition-colors hover:border-gold"
          >
            <X className="size-4" />
          </button>
        </header>
        <div className="scrollbar-gold min-h-0 flex-1 overflow-y-auto px-5 py-5 [--scroll-track:var(--admin-surface)]">
          {children}
        </div>
        {footer ? (
          <footer className="flex shrink-0 flex-wrap justify-end gap-3 border-t border-line px-5 py-4">
            {footer}
          </footer>
        ) : null}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Drawer */

/** Side sheet on desktop, bottom sheet on phones   used for filters and detail. */
export function Drawer({
  open,
  onClose,
  title,
  children,
  footer,
  side = "right",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode | undefined;
  side?: "right" | "left" | undefined;
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden
        className={cn(
          "fixed inset-0 z-[95] bg-navy/45 backdrop-blur-[2px] transition-opacity duration-400",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        aria-hidden={!open}
        className={cn(
          "fixed z-[96] flex flex-col bg-admin-surface shadow-elegant transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none",
          // Bottom sheet under sm, side sheet from sm up. Only the edges that face
          // the page are rounded   the ones flush with the viewport stay square.
          "inset-x-0 bottom-0 max-h-[85vh] rounded-t-md sm:inset-y-0 sm:max-h-none sm:w-full sm:max-w-[24rem] sm:rounded-t-none",
          side === "right"
            ? "sm:right-0 sm:left-auto sm:rounded-l-md"
            : "sm:left-0 sm:right-auto sm:rounded-r-md",
          open
            ? "translate-y-0 sm:translate-x-0"
            : side === "right"
              ? "translate-y-full sm:translate-y-0 sm:translate-x-full"
              : "translate-y-full sm:translate-y-0 sm:-translate-x-full",
        )}
      >
        <header className="flex shrink-0 items-center gap-3 border-b border-line px-5 py-4">
          <h2 className="display min-w-0 flex-1 truncate text-xl">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="grid size-9 shrink-0 place-items-center rounded-md border border-line text-navy transition-colors hover:border-gold"
          >
            <X className="size-4" />
          </button>
        </header>
        <div className="scrollbar-gold min-h-0 flex-1 overflow-y-auto px-5 py-5 [--scroll-track:var(--admin-surface)]">
          {children}
        </div>
        {footer ? (
          <footer className="flex shrink-0 gap-3 border-t border-line px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            {footer}
          </footer>
        ) : null}
      </aside>
    </>
  );
}

/* ------------------------------------------------------------------ Toast */

/** Thin wrapper so screens never import sonner directly. */
export const toast = {
  success: (message: string, description?: string) =>
    sonnerToast.success(message, description ? { description } : undefined),
  error: (message: string, description?: string) =>
    sonnerToast.error(message, description ? { description } : undefined),
  info: (message: string, description?: string) =>
    sonnerToast(message, description ? { description } : undefined),
};

/* ------------------------------------------------------------------ Switch */

/**
 * The one control in the back office that is a pill rather than a rounded-md
 * box: a track that reads as a track only when the knob can travel the full
 * length of it. Gold means live; off is a quiet grey so a disabled rule never
 * looks like an error.
 */
export function Switch({
  checked,
  onChange,
  label,
  className,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  className?: string | undefined;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-11 shrink-0 cursor-pointer rounded-full border transition-colors duration-300 outline-none",
        "focus-visible:ring-2 focus-visible:ring-gold/45 focus-visible:ring-offset-2 focus-visible:ring-offset-admin-surface",
        checked
          ? "border-gold bg-gold hover:bg-gold/85"
          : "border-line bg-muted-foreground/20 hover:border-gold/50",
        className,
      )}
    >
      {/* 44px track − 2px border − 18px knob − 2px gutters = 20px of travel. */}
      <span
        aria-hidden
        className={cn(
          "absolute top-[2px] left-[2px] size-[18px] rounded-full bg-white shadow-panel transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
          checked ? "translate-x-5" : "translate-x-0",
        )}
      />
    </button>
  );
}

/* ------------------------------------------------------------ SearchSelect */

export type SearchOption = {
  value: string;
  label: string;
  /** Secondary line   reference, email, city…   also matched by the search. */
  hint?: string | undefined;
};

/** Search box + list, in px   used to decide whether the panel opens upwards. */
const PANEL_MAX_HEIGHT = 268;

/**
 * The back office replacement for a native <select>: a labelled field that
 * opens a search box and filters the list as the user types. Lists here are
 * clients, biens and agents   they grow past the point where scrolling a
 * native dropdown is usable, and typing three letters is always faster.
 */
export function SearchSelect({
  label,
  value,
  onChange,
  options,
  placeholder = "Sélectionner…",
  searchPlaceholder = "Tapez pour filtrer…",
  clearLabel,
  emptyLabel = "Aucun résultat",
  disabled,
  className,
}: {
  label?: string | undefined;
  value: string;
  onChange: (value: string) => void;
  options: SearchOption[];
  placeholder?: string | undefined;
  searchPlaceholder?: string | undefined;
  /** When set, an explicit "no value" row is offered first (e.g. "Sans bien associé"). */
  clearLabel?: string | undefined;
  emptyLabel?: string | undefined;
  disabled?: boolean | undefined;
  className?: string | undefined;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [dropUp, setDropUp] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();

  const allOptions = useMemo<SearchOption[]>(
    () => (clearLabel ? [{ value: "", label: clearLabel }, ...options] : options),
    [clearLabel, options],
  );

  const filtered = useMemo(() => {
    const q = normalizeText(query.trim());
    if (!q) return allOptions;
    return allOptions.filter(
      (o) =>
        normalizeText(o.label).includes(q) || (o.hint ? normalizeText(o.hint).includes(q) : false),
    );
  }, [allOptions, query]);

  const selected = allOptions.find((o) => o.value === value);

  // Close on any click that lands outside the field.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    else setQuery("");
  }, [open]);

  // Flip the list above the field when it would otherwise open past the bottom
  // of the viewport   the last select in a modal form is the common case.
  useEffect(() => {
    if (!open) {
      setDropUp(false);
      return;
    }
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect) return;
    const below = window.innerHeight - rect.bottom;
    setDropUp(below < PANEL_MAX_HEIGHT && rect.top > below);
  }, [open]);

  // Keep the highlighted row in view while arrowing through a long list.
  useEffect(() => {
    if (!open) return;
    const node = listRef.current?.children[active] as HTMLElement | undefined;
    node?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const commit = (option: SearchOption) => {
    onChange(option.value);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const option = filtered[active];
      if (option) commit(option);
    } else if (e.key === "Escape") {
      // Stop here so the surrounding Modal does not close with the list.
      e.preventDefault();
      e.stopPropagation();
      setOpen(false);
    }
  };

  const fieldCls =
    "flex h-11 w-full items-center gap-2 rounded-md border border-line bg-admin-bg/40 px-3 text-left text-sm outline-none transition-colors";

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label ? (
        <span className="text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase">
          {label}
        </span>
      ) : null}

      <div ref={rootRef} className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          className={cn(
            fieldCls,
            "focus-visible:border-gold",
            open && "border-gold",
            disabled ? "cursor-not-allowed opacity-60" : "hover:border-gold/60",
          )}
        >
          <span className={cn("min-w-0 flex-1 truncate", !selected && "text-muted-foreground")}>
            {selected?.label ?? placeholder}
          </span>
          {selected?.hint ? (
            <span className="hidden shrink-0 text-xs text-muted-foreground sm:block">
              {selected.hint}
            </span>
          ) : null}
          <ChevronDown
            aria-hidden
            className={cn(
              "size-4 shrink-0 text-muted-foreground transition-transform duration-300",
              open && "rotate-180 text-gold",
            )}
          />
        </button>

        {open ? (
          <div
            className={cn(
              "absolute z-50 w-full overflow-hidden rounded-md border border-gold/40 bg-admin-surface shadow-elegant",
              dropUp ? "bottom-full mb-1" : "mt-1",
            )}
          >
            <div className="relative flex items-center border-b border-line">
              <Search
                aria-hidden
                className="pointer-events-none absolute left-3 size-4 text-gold"
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onKeyDown}
                placeholder={searchPlaceholder}
                aria-label={label ? `Rechercher   ${label}` : "Rechercher"}
                aria-autocomplete="list"
                aria-controls={listId}
                className="h-11 w-full bg-transparent pr-3 pl-9 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>

            {filtered.length === 0 ? (
              <p className="px-3.5 py-4 text-sm text-muted-foreground">{emptyLabel}</p>
            ) : (
              <ul
                ref={listRef}
                id={listId}
                role="listbox"
                className="scrollbar-gold max-h-56 overflow-y-auto [--scroll-track:var(--admin-surface)]"
              >
                {filtered.map((o, i) => {
                  const isSelected = o.value === value;
                  return (
                    <li
                      key={o.value || "__empty"}
                      role="option"
                      aria-selected={isSelected}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => commit(o)}
                      className={cn(
                        "flex cursor-pointer items-center gap-2 border-b border-line/60 px-3.5 py-2.5 text-sm last:border-0",
                        i === active ? "bg-gold/10 text-navy" : "text-navy/80",
                      )}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block truncate">{o.label}</span>
                        {o.hint ? (
                          <span className="block truncate text-xs text-muted-foreground">
                            {o.hint}
                          </span>
                        ) : null}
                      </span>
                      {isSelected ? <Check className="size-3.5 shrink-0 text-gold" /> : null}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- Buttons */

export function AdminButton({
  children,
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline" | "danger" | undefined;
}) {
  const styles = {
    primary: "bg-gold text-navy hover:bg-navy hover:text-white",
    outline: "border border-line text-navy hover:border-gold",
    ghost: "text-muted-foreground hover:text-navy",
    danger: "border border-negative/40 text-negative hover:bg-negative hover:text-white",
  };
  return (
    <button
      className={cn(
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2.5 text-[0.68rem] tracking-[0.14em] uppercase transition-colors duration-300",
        styles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
