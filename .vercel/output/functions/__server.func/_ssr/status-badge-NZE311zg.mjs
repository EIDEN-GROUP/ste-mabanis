import { i as cn } from "./utils-BTE8P7Sw.mjs";
import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as TEMPERATURE_LABELS, c as PRIORITY_LABELS, f as ROLE_LABELS, h as STAGE_LABELS, l as PROPERTY_STATUS_LABELS, w as label } from "./primitives-mgU9LIkI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/status-badge-NZE311zg.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Every status colour comes from a token; the dot carries the hue so the text
* stays readable at small sizes and the badge works on any surface.
*/
var STATUS_DOT = {
	draft: "bg-status-draft",
	available: "bg-status-available",
	reserved: "bg-status-reserved",
	under_offer: "bg-status-offer",
	sold: "bg-status-sold",
	rented: "bg-status-rented",
	archived: "bg-status-archived"
};
var TEMP_STYLES = {
	cold: "border-temp-cold/40 text-temp-cold",
	warm: "border-temp-warm/50 text-temp-warm",
	hot: "border-temp-hot/40 text-temp-hot"
};
var PRIORITY_STYLES = {
	low: "border-line text-muted-foreground",
	normal: "border-line text-navy/75",
	high: "border-status-offer/40 text-status-offer",
	urgent: "border-negative/40 text-negative"
};
var base = "inline-flex items-center gap-1.5 border px-2.5 py-1 text-[0.6rem] tracking-[0.12em] uppercase whitespace-nowrap";
function PropertyStatusBadge({ status, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn(base, "border-line text-navy/80", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 shrink-0 rounded-full", STATUS_DOT[status]) }), label(PROPERTY_STATUS_LABELS, status)]
	});
}
function TemperatureBadge({ temperature, score, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn(base, TEMP_STYLES[temperature], className),
		children: [label(TEMPERATURE_LABELS, temperature), score !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "tabular-nums opacity-70",
			children: score
		}) : null]
	});
}
function StageBadge({ stage, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(base, stage === "won" ? "border-positive/40 text-positive" : stage === "lost" ? "border-negative/35 text-negative" : "border-line text-navy/75", className),
		children: label(STAGE_LABELS, stage)
	});
}
function PriorityBadge({ priority, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(base, PRIORITY_STYLES[priority], className),
		children: label(PRIORITY_LABELS, priority)
	});
}
function RoleBadge({ role, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(base, "border-line text-muted-foreground", className),
		children: label(ROLE_LABELS, role)
	});
}
//#endregion
export { TemperatureBadge as a, StageBadge as i, PropertyStatusBadge as n, RoleBadge as r, PriorityBadge as t };
