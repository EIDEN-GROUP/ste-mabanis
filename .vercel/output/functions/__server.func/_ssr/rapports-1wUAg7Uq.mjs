import { i as __toESM } from "../_runtime.mjs";
import { i as cn } from "./utils-BTE8P7Sw.mjs";
import { o as require_jsx_runtime, r as useQuery, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as reportQuery } from "./queries-Dq_yS5N4.mjs";
import { E as Printer, lt as Download, w as RotateCcw, xt as CalendarRange } from "../_libs/lucide-react.mjs";
import { b as formatDate, g as StatCard, n as AdminButton, u as Panel } from "./primitives-mgU9LIkI.mjs";
import { a as TrendChart } from "./charts-Dxo2HWxE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rapports-1wUAg7Uq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	{
		key: "properties",
		label: "Biens"
	},
	{
		key: "crm",
		label: "CRM"
	},
	{
		key: "agents",
		label: "Agents"
	},
	{
		key: "activity",
		label: "Activité"
	}
];
var TAB_TITLES = {
	properties: "Rapport immobilier",
	crm: "Rapport CRM",
	agents: "Rapport agents",
	activity: "Rapport d'activité"
};
function toYmd(d) {
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function fromYmd(value, endOfDay) {
	const [y, m, d] = value.split("-").map(Number);
	return new Date(y, m - 1, d, endOfDay ? 23 : 0, endOfDay ? 59 : 0, 0).toISOString();
}
function ReportsPage() {
	const today = /* @__PURE__ */ new Date();
	const defaultFrom = toYmd(/* @__PURE__ */ new Date(today.getTime() - 90 * 864e5));
	const defaultTo = toYmd(today);
	const [tab, setTab] = (0, import_react.useState)("properties");
	const [from, setFrom] = (0, import_react.useState)(defaultFrom);
	const [to, setTo] = (0, import_react.useState)(defaultTo);
	const { data: report } = useQuery(reportQuery(tab, fromYmd(from, false), fromYmd(to, true)));
	const kpis = report?.kpis ?? [];
	const series = report?.series ?? [];
	const chartData = (0, import_react.useMemo)(() => {
		const src = report?.series ?? [];
		return (src[0]?.points ?? []).map((p, i) => ({
			label: p.label,
			...Object.fromEntries(src.map((s, j) => [`v${j}`, s.points[i]?.value ?? 0]))
		}));
	}, [report?.series]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5 text-xs text-muted-foreground uppercase",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarRange, { className: "size-3.5" }), " Du"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "date",
								value: from,
								onChange: (e) => setFrom(e.target.value || defaultFrom),
								className: "h-11 border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground uppercase",
								children: "Au"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "date",
								value: to,
								onChange: (e) => setTo(e.target.value || defaultTo),
								className: "h-11 border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setFrom(defaultFrom);
								setTo(defaultTo);
							},
							className: "grid h-11 place-items-center border border-line px-3 text-muted-foreground transition-colors hover:border-gold hover:text-gold",
							"aria-label": "Réinitialiser les dates",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminButton, {
						variant: "outline",
						onClick: () => exportCsv(report),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), " CSV"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminButton, {
						variant: "outline",
						onClick: () => printReport(report),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "size-3.5" }), " Imprimer / PDF"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1 border-b border-line",
				children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab(t.key),
					className: cn("border-b-2 px-4 py-2.5 text-sm tracking-wide uppercase transition-colors", tab === t.key ? "border-gold text-navy" : "border-transparent text-muted-foreground hover:text-navy"),
					children: t.label
				}, t.key))
			}),
			report ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
					children: kpis.map((k, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: k.label,
						value: formatKpi(k.label, k.value),
						index: i
					}, k.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
					className: "border-b border-line px-5 py-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap items-center justify-between gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "display text-xl",
							children: TAB_TITLES[tab]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: [
								formatDate(report.from),
								" — ",
								formatDate(report.to)
							]
						})] })
					})
				}), series.length > 0 && series.some((s) => s.points.length > 0) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, {
						data: chartData,
						xKey: "label",
						series: series.map((s, j) => ({
							key: `v${j}`,
							name: s.label
						})),
						height: 240
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-5 py-10 text-center text-sm text-muted-foreground",
					children: "Aucune donnée sur la période sélectionnée."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "border-b border-line px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "display text-xl",
						children: "Détail"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: [report.table.rows.length, " lignes · exportable en CSV et PDF."]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[720px] text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
							className: "border-b border-line text-left text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase",
							children: report.table.columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-3 font-medium whitespace-nowrap",
								children: c
							}, c))
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-line",
							children: report.table.rows.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
								className: "transition-colors hover:bg-sand/40",
								children: row.map((cell, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: cn("px-5 py-3 text-muted-foreground", j === 0 && "font-medium text-navy"),
									children: cell
								}, j))
							}, i))
						})]
					})
				})] })
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border border-line bg-admin-surface px-6 py-16 text-center text-sm text-muted-foreground",
				children: "Chargement du rapport…"
			})
		]
	});
}
function formatKpi(label, value) {
	if (/Prix|MAD|CA/i.test(label)) return value.toLocaleString("fr-FR");
	return String(value);
}
function escapeHtml(v) {
	return v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function toCsv(columns, rows) {
	const esc = (v) => /[";\n]/.test(v) ? `"${v.replace(/"/g, "\"\"")}"` : v;
	return [columns, ...rows].map((r) => r.map(esc).join(";")).join("\r\n");
}
function exportCsv(report) {
	if (!report) return;
	const blob = new Blob(["﻿" + toCsv(report.table.columns, report.table.rows)], { type: "text/csv;charset=utf-8;" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `mabanis-${report.key}-${report.from.slice(0, 10)}.csv`;
	a.click();
	URL.revokeObjectURL(url);
}
function printReport(report) {
	if (!report) return;
	const w = window.open("", "_blank", "width=900,height=700");
	if (!w) return;
	const rows = report.table.rows.map((r) => `<tr>${r.map((c) => `<td>${escapeHtml(c)}</td>`).join("")}</tr>`).join("");
	const headers = report.table.columns.map((c) => `<th>${escapeHtml(c)}</th>`).join("");
	const body = [
		`<h1>${escapeHtml(report.title)}</h1>`,
		`<p class="period">STE MABANIS · ${escapeHtml(formatDate(report.from))} — ${escapeHtml(formatDate(report.to))}</p>`,
		`<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`,
		`<p class="foot">Généré le ${escapeHtml(formatDate((/* @__PURE__ */ new Date()).toISOString()))}</p>`
	].join("");
	w.document.write(`<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>${escapeHtml(report.title)}</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: "Segoe UI", Arial, sans-serif; margin: 32px; color: #141419; }
  h1 { font-size: 22px; margin: 0 0 4px; }
  .period { margin: 0 0 24px; color: #6b6b76; font-size: 13px; }
  table { width: 100%; border-collapse: collapse; font-size: 12px; }
  th { text-align: left; text-transform: uppercase; letter-spacing: 0.08em; font-size: 10px;
       color: #6b6b76; border-bottom: 2px solid #d8d2c2; padding: 8px 10px; }
  td { border-bottom: 1px solid #ece7d8; padding: 8px 10px; color: #2b2b33; }
  tr:last-child td { border-bottom: none; }
  .foot { margin-top: 24px; color: #a19a87; font-size: 11px; }
  @media print { body { margin: 12mm; } }
</style>
</head>
<body>
${body}
<script>window.onload = function () { setTimeout(function () { window.print(); }, 300); };<\/script>
</body>
</html>`);
	w.document.close();
}
//#endregion
export { ReportsPage as component };
