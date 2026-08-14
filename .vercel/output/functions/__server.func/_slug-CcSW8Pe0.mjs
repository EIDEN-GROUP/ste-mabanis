import { o as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { a as Section, i as Reveal, o as SectionHeading, r as PageHero } from "./_ssr/layout-bits-BGOsNYiy.mjs";
import { vt as Check } from "./_libs/lucide-react.mjs";
import { t as PropertyCard } from "./_ssr/property-card-DXmd3ont.mjs";
import { t as Route } from "./_slug-DYXQN6i3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-CcSW8Pe0.js
var import_jsx_runtime = require_jsx_runtime();
function LocationPage() {
	const { location, listings } = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: location.city,
			title: location.name,
			intro: location.intro,
			image: location.image
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-14 lg:grid-cols-[1.3fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "display rule-gold text-3xl",
				children: "Le quartier"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 space-y-4 text-[0.98rem] leading-relaxed text-foreground/85",
				children: location.editorial.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p }, i))
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				delay: 100,
				className: "space-y-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-line bg-card p-7",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Art de vivre"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-2.5",
						children: location.lifestyle.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-2.5 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 shrink-0 text-gold" }), l]
						}, l))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-navy p-7 text-white",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Investissement"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "display mt-3 text-3xl text-gold",
							children: location.priceRange
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-white/70",
							children: location.investment
						})
					]
				})]
			})]
		}) }),
		listings.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			tone: "sand",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Disponibilités",
				title: `Nos biens à ${location.name}`
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3",
				children: listings.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * 70,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyCard, { property: p })
				}, p.slug))
			})]
		}) : null
	] });
}
//#endregion
export { LocationPage as component };
