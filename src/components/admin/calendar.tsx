import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import type { Appointment, AppointmentKind } from "@/lib/admin/types";
import { APPOINTMENT_LABELS, formatTime, label } from "@/lib/admin/format";
import { SEED_NOW } from "@/lib/admin/seed";
import { cn } from "@/lib/utils";

const DAY_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

/** How many programmes fit in a month cell before the "+N" row takes over. */
const MAX_CHIPS = 3;

/** Chip colour by appointment type, so a month scan reads by nature of the day. */
const KIND_CHIP: Record<AppointmentKind, string> = {
  viewing: "border-l-gold bg-gold/10 text-navy",
  valuation: "border-l-blue bg-blue/10 text-navy",
  signature: "border-l-positive bg-positive/10 text-navy",
  call: "border-l-line bg-sand text-navy/80",
  meeting: "border-l-status-archived bg-sand text-navy/80",
};

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

/** Monday-first offset for the first cell of the grid. */
function leadingBlanks(d: Date) {
  return (startOfMonth(d).getDay() + 6) % 7;
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function keyFor(d: Date) {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

/**
 * Month grid with a day detail panel.
 *
 * Each cell lists the day's programme as clickable chips rather than dots: the
 * point of a month view is to read the month, and three dots never told anyone
 * whether Tuesday held a signature or a phone call.
 *
 * Pass `month` to drive the grid from the page (the page then owns the
 * navigation header); leave it out and the calendar navigates itself.
 */
export function Calendar({
  appointments,
  month,
  onSelectAppointment,
  className,
}: {
  appointments: Appointment[];
  month?: Date | undefined;
  onSelectAppointment?: ((id: string) => void) | undefined;
  className?: string | undefined;
}) {
  const [internalCursor, setInternalCursor] = useState(() => startOfMonth(SEED_NOW));
  const [selected, setSelected] = useState<Date>(SEED_NOW);

  const controlled = month !== undefined;
  // Keyed on the month itself, not the Date instance: the page hands us a new
  // object on every render, and an unstable cursor would re-run the effect below
  // on each one.
  const monthKey = month ? `${month.getFullYear()}-${month.getMonth()}` : "";
  const cursor = useMemo(
    () => (month ? startOfMonth(month) : internalCursor),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [monthKey, internalCursor, controlled],
  );

  // Follow the page when it moves to another month: keep the detail panel on a
  // day that actually exists in the grid being shown.
  useEffect(() => {
    if (
      selected.getFullYear() === cursor.getFullYear() &&
      selected.getMonth() === cursor.getMonth()
    ) {
      return;
    }
    setSelected(
      sameDay(startOfMonth(SEED_NOW), cursor)
        ? SEED_NOW
        : new Date(cursor.getFullYear(), cursor.getMonth(), 1),
    );
  }, [cursor, selected]);

  const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
  const blanks = leadingBlanks(cursor);

  const byDay = useMemo(() => {
    const map = new Map<string, Appointment[]>();
    for (const a of appointments) {
      const d = new Date(a.startsAt);
      const key = keyFor(d);
      map.set(key, [...(map.get(key) ?? []), a]);
    }
    for (const list of map.values()) list.sort((a, b) => a.startsAt.localeCompare(b.startsAt));
    return map;
  }, [appointments]);

  const selectedItems = byDay.get(keyFor(selected)) ?? [];

  const shift = (delta: number) =>
    setInternalCursor((c) => new Date(c.getFullYear(), c.getMonth() + delta, 1));

  return (
    // min-w-0: as a grid/flex child it must be allowed to shrink below the
    // min-content width of its header row.
    // overflow-hidden keeps the day grid's cell borders inside the rounded corner.
    <div
      className={cn(
        "min-w-0 overflow-hidden rounded-md border border-line bg-admin-surface",
        className,
      )}
    >
      {controlled ? null : (
        <header className="flex items-center gap-3 border-b border-line px-4 py-3">
          <h3 className="display min-w-0 flex-1 truncate text-lg capitalize">
            {cursor.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
          </h3>
          <button
            type="button"
            onClick={() => shift(-1)}
            aria-label="Mois précédent"
            className="grid size-9 place-items-center rounded-md border border-line text-navy transition-colors hover:border-gold"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => shift(1)}
            aria-label="Mois suivant"
            className="grid size-9 place-items-center rounded-md border border-line text-navy transition-colors hover:border-gold"
          >
            <ChevronRight className="size-4" />
          </button>
        </header>
      )}

      {/* Chips need room to be legible; below ~46rem the month scrolls sideways
          rather than squeezing seven columns of unreadable text. */}
      <div className="scrollbar-gold overflow-x-auto">
        <div className="min-w-[46rem]">
          <div className="grid grid-cols-7 border-b border-line">
            {DAY_LABELS.map((d) => (
              <div
                key={d}
                className="py-2 text-center text-[0.58rem] tracking-[0.14em] text-muted-foreground uppercase"
              >
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {Array.from({ length: blanks }, (_, i) => (
              <div key={`blank-${i}`} className="min-h-28 border-r border-b border-line/60" />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const date = new Date(cursor.getFullYear(), cursor.getMonth(), i + 1);
              const items = byDay.get(keyFor(date)) ?? [];
              const isToday = sameDay(date, SEED_NOW);
              const isSelected = sameDay(date, selected);
              const overflow = items.length - MAX_CHIPS;

              return (
                <div
                  key={i}
                  onClick={() => setSelected(date)}
                  aria-current={isSelected ? "date" : undefined}
                  className={cn(
                    "flex min-h-28 cursor-pointer flex-col gap-1 border-r border-b border-line/60 p-1.5 transition-colors duration-200",
                    isSelected ? "bg-gold/10" : "hover:bg-sand/70",
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className={cn(
                        "grid size-6 shrink-0 place-items-center rounded-md text-xs tabular-nums",
                        isToday && "bg-navy text-white",
                        isSelected && !isToday && "border border-gold/50 text-navy",
                      )}
                    >
                      {i + 1}
                    </span>
                    {items.length ? (
                      <span className="ml-auto text-[0.55rem] text-muted-foreground tabular-nums">
                        {items.length}
                      </span>
                    ) : null}
                  </div>

                  {/* The programme of the day, readable at a glance. */}
                  <ul className="flex min-w-0 flex-col gap-0.5">
                    {items.slice(0, MAX_CHIPS).map((a) => {
                      const cancelled = a.status === "cancelled" || a.status === "no_show";
                      return (
                        <li key={a.id}>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelected(date);
                              onSelectAppointment?.(a.id);
                            }}
                            title={`${formatTime(a.startsAt)} · ${a.title}`}
                            className={cn(
                              "flex w-full min-w-0 items-center gap-1 rounded-sm border-l-2 px-1.5 py-0.5 text-left transition-opacity hover:opacity-80",
                              KIND_CHIP[a.kind],
                              cancelled && "line-through opacity-55",
                            )}
                          >
                            <span className="shrink-0 text-[0.55rem] font-medium tabular-nums">
                              {formatTime(a.startsAt)}
                            </span>
                            <span className="min-w-0 flex-1 truncate text-[0.6rem]">{a.title}</span>
                          </button>
                        </li>
                      );
                    })}
                    {overflow > 0 ? (
                      <li className="px-1.5 text-[0.55rem] text-muted-foreground">
                        + {overflow} autre{overflow > 1 ? "s" : ""}
                      </li>
                    ) : null}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-line p-4">
        <p className="eyebrow">
          {selected.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
        </p>
        {selectedItems.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">Aucun rendez-vous ce jour.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {selectedItems.map((a, i) => (
              <li key={a.id} style={{ ["--i" as string]: i }} className="stagger-in">
                <button
                  type="button"
                  onClick={() => onSelectAppointment?.(a.id)}
                  disabled={!onSelectAppointment}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md border border-line px-3 py-2.5 text-left transition-colors",
                    onSelectAppointment && "hover:border-gold hover:bg-sand/60",
                  )}
                >
                  <span className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-navy tabular-nums">
                    <Clock className="size-3 text-gold" />
                    {formatTime(a.startsAt)}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm">{a.title}</span>
                  <span className="hidden shrink-0 rounded-md border border-line px-2 py-0.5 text-[0.55rem] tracking-[0.12em] text-muted-foreground uppercase sm:block">
                    {label(APPOINTMENT_LABELS, a.kind)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
