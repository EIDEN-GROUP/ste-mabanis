import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as MessageSquare, U as MailOpen, W as ListChecks, at as FilePlusCorner, et as Handshake, h as StickyNote, k as PhoneCall, st as Eye } from "../_libs/lucide-react.mjs";
import { T as relativeTime, a as EmptyState } from "./primitives-mgU9LIkI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/clients-CQQrlhTO.js
var import_jsx_runtime = require_jsx_runtime();
var $$splitComponentImporter = () => import("./clients-YCkZ1nc9.mjs");
var Route = createFileRoute("/admin/clients")({
	head: () => ({ meta: [{ title: "Clients — STE MABANIS" }, {
		name: "description",
		content: "Portefeuille clients et CRM."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var ACTIVITY_ICONS = {
	call: PhoneCall,
	email: MailOpen,
	whatsapp: MessageSquare,
	viewing: Eye,
	offer: Handshake,
	stage_change: ListChecks,
	document: FilePlusCorner,
	note: StickyNote
};
function ActivityTimeline({ activities }) {
	if (!activities.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "Aucune activité",
		description: "La timeline se remplit au fil des échanges."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "relative space-y-4 border-l border-line pl-5",
		children: activities.map((a) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute top-0.5 -left-[1.62rem] grid size-6 place-items-center border border-line bg-admin-surface text-gold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ACTIVITY_ICONS[a.kind] ?? StickyNote, { className: "size-3" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-navy",
						children: a.subject
					}),
					a.body ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-xs leading-relaxed text-muted-foreground",
						children: a.body
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[0.62rem] text-muted-foreground/70",
						children: relativeTime(a.createdAt)
					})
				]
			}, a.id);
		})
	});
}
//#endregion
export { Route as n, ActivityTimeline as t };
