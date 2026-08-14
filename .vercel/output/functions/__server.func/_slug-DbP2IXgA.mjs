import { o as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { a as Section, i as Reveal, o as SectionHeading, r as PageHero } from "./_ssr/layout-bits-BGOsNYiy.mjs";
import { t as LeadForm } from "./_ssr/lead-form-BUXN78FV.mjs";
import { H as Mail, O as Phone } from "./_libs/lucide-react.mjs";
import { t as PropertyCard } from "./_ssr/property-card-DXmd3ont.mjs";
import { t as Route } from "./_slug-DaOh-eBx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-DbP2IXgA.js
var import_jsx_runtime = require_jsx_runtime();
function AgentPage() {
	const { agent, listings } = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: agent.role,
		title: agent.name,
		intro: agent.bio,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 flex flex-wrap gap-6 text-sm text-white/75",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: `tel:${agent.phone.replace(/\s/g, "")}`,
					className: "inline-flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4 text-gold" }),
						" ",
						agent.phone
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: `mailto:${agent.email}`,
					className: "inline-flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4 text-gold" }),
						" ",
						agent.email
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					agent.years,
					" ans d'expérience · ",
					agent.languages
				] })
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-14 lg:grid-cols-[1.4fr_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
			eyebrow: "Portefeuille",
			title: `Les biens suivis par ${agent.name.split(" ")[0]}`
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 grid gap-8 sm:grid-cols-2",
			children: listings.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: i * 70,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyCard, { property: p })
			}, p.slug))
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "lg:sticky lg:top-28 lg:self-start",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadForm, {
				intent: `agent:${agent.slug}`,
				submitLabel: `Contacter ${agent.name.split(" ")[0]}`,
				note: "Réponse sous 24 heures ouvrées.",
				fields: [
					{
						name: "nom",
						label: "Nom et prénom",
						required: true
					},
					{
						name: "telephone",
						label: "Téléphone",
						type: "tel",
						required: true
					},
					{
						name: "email",
						label: "E-mail",
						type: "email",
						required: true,
						full: true
					},
					{
						name: "message",
						label: "Votre message",
						type: "textarea",
						required: true
					}
				]
			})
		})]
	}) })] });
}
//#endregion
export { AgentPage as component };
