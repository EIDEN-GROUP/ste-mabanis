import { i as __toESM } from "../_runtime.mjs";
import { i as cn } from "./utils-BTE8P7Sw.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { gt as ChevronLeft, ht as ChevronRight } from "../_libs/lucide-react.mjs";
import { C as formatTime, p as SEED_NOW } from "./primitives-mgU9LIkI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/calendar-Dd_FWx2_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DAY_LABELS = [
	"Lun",
	"Mar",
	"Mer",
	"Jeu",
	"Ven",
	"Sam",
	"Dim"
];
function startOfMonth(d) {
	return new Date(d.getFullYear(), d.getMonth(), 1);
}
/** Monday-first offset for the first cell of the grid. */
function leadingBlanks(d) {
	return (startOfMonth(d).getDay() + 6) % 7;
}
function sameDay(a, b) {
	return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
/**
* Month grid with a day detail panel. Day and week views arrive with Phase 3;
* the month view is what the shell needs to prove the layout and motion.
*/
function Calendar({ appointments, className }) {
	const [cursor, setCursor] = (0, import_react.useState)(() => startOfMonth(SEED_NOW));
	const [selected, setSelected] = (0, import_react.useState)(SEED_NOW);
	const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
	const blanks = leadingBlanks(cursor);
	const byDay = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const a of appointments) {
			const d = new Date(a.startsAt);
			const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
			map.set(key, [...map.get(key) ?? [], a]);
		}
		return map;
	}, [appointments]);
	const keyFor = (d) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
	const selectedItems = (byDay.get(keyFor(selected)) ?? []).sort((a, b) => a.startsAt.localeCompare(b.startsAt));
	const shift = (delta) => setCursor((c) => new Date(c.getFullYear(), c.getMonth() + delta, 1));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("min-w-0 border border-line bg-admin-surface", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-3 border-b border-line px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "display min-w-0 flex-1 truncate text-lg capitalize",
						children: cursor.toLocaleDateString("fr-FR", {
							month: "long",
							year: "numeric"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => shift(-1),
						"aria-label": "Mois précédent",
						className: "grid size-9 place-items-center border border-line text-navy transition-colors hover:border-gold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => shift(1),
						"aria-label": "Mois suivant",
						className: "grid size-9 place-items-center border border-line text-navy transition-colors hover:border-gold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-7 border-b border-line",
				children: DAY_LABELS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "py-2 text-center text-[0.58rem] tracking-[0.14em] text-muted-foreground uppercase",
					children: d
				}, d))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-7",
				children: [Array.from({ length: blanks }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-square border-r border-b border-line/60 last:border-r-0" }, `blank-${i}`)), Array.from({ length: daysInMonth }, (_, i) => {
					const date = new Date(cursor.getFullYear(), cursor.getMonth(), i + 1);
					const items = byDay.get(keyFor(date)) ?? [];
					const isToday = sameDay(date, SEED_NOW);
					const isSelected = sameDay(date, selected);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setSelected(date),
						"aria-current": isSelected ? "date" : void 0,
						className: cn("relative flex aspect-square min-h-11 flex-col items-center justify-center gap-1 border-r border-b border-line/60 transition-colors duration-200", isSelected ? "bg-gold/12" : "hover:bg-sand"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("grid size-7 place-items-center text-sm tabular-nums", isToday && "bg-navy text-white", isSelected && !isToday && "text-navy"),
							children: i + 1
						}), items.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex gap-0.5",
							children: items.slice(0, 3).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1 rounded-full bg-gold" }, a.id))
						}) : null]
					}, i);
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-line p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: selected.toLocaleDateString("fr-FR", {
						weekday: "long",
						day: "numeric",
						month: "long"
					})
				}), selectedItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted-foreground",
					children: "Aucun rendez-vous ce jour."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2",
					children: selectedItems.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						style: { ["--i"]: i },
						className: "stagger-in flex items-center gap-3 border border-line px-3 py-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-medium text-navy tabular-nums",
							children: formatTime(a.startsAt)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-0 flex-1 truncate text-sm",
							children: a.title
						})]
					}, a.id))
				})]
			})
		]
	});
}
//#endregion
export { Calendar as t };
