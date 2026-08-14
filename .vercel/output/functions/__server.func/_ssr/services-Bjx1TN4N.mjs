import { g as services, u as images } from "./utils-BWXQYj3d.mjs";
import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Section, i as Reveal, o as SectionHeading, r as PageHero } from "./layout-bits-BHY2L1ae.mjs";
import { vt as Check } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services-Bjx1TN4N.js
var import_jsx_runtime = require_jsx_runtime();
function ServicesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "Services",
			title: "Tout se traite en interne, du premier appel à la dixième année.",
			intro: "Nous n'externalisons ni l'estimation, ni la commercialisation, ni la gestion. C'est plus exigeant, et c'est la seule façon de tenir nos engagements.",
			image: images.editorial1
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-px bg-line md:grid-cols-2 xl:grid-cols-3",
			children: services.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				delay: i * 60,
				className: "bg-background p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[0.6rem] tracking-[0.2em] text-gold",
						children: String(i + 1).padStart(2, "0")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "display mt-3 text-3xl",
						children: s.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted-foreground",
						children: s.summary
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-5 space-y-2.5",
						children: s.points.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-2.5 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 shrink-0 text-gold" }), p]
						}, p))
					})
				]
			}, s.slug))
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			tone: "navy",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				tone: "navy",
				eyebrow: "Passer à l'action",
				title: "Par quoi souhaitez-vous commencer ?",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/vendre",
						className: "bg-gold px-6 py-3.5 text-[0.7rem] tracking-[0.18em] text-navy uppercase",
						children: "Estimer mon bien"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						className: "border border-white/30 px-6 py-3.5 text-[0.7rem] tracking-[0.18em] uppercase",
						children: "Parler à un conseiller"
					})]
				})
			})
		})
	] });
}
//#endregion
export { ServicesPage as component };
