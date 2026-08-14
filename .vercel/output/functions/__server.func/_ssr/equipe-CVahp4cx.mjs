import { n as agents, p as propertiesByAgent, u as images } from "./utils-BTE8P7Sw.mjs";
import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Section, i as Reveal, r as PageHero } from "./layout-bits-BGOsNYiy.mjs";
import { H as Mail, O as Phone } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/equipe-CVahp4cx.js
var import_jsx_runtime = require_jsx_runtime();
function TeamPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Équipe",
		title: "Vous n'aurez jamais à réexpliquer votre dossier.",
		intro: "Un conseiller référent vous suit du premier appel à la remise des clés, épaulé par l'ensemble de l'agence.",
		image: images.teamOffice
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-10 lg:grid-cols-2",
		children: agents.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
			delay: i * 80,
			className: "border border-line bg-card p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "display grid size-16 shrink-0 place-items-center bg-navy text-2xl text-gold",
						children: a.initials
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "display text-3xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/equipe/$slug",
							params: { slug: a.slug },
							className: "link-underline",
							children: a.name
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs tracking-[0.14em] text-muted-foreground uppercase",
						children: a.role
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-sm leading-relaxed text-foreground/85",
					children: a.bio
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-6 grid gap-3 border-t border-line pt-5 text-sm sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-[0.6rem] tracking-[0.18em] text-muted-foreground uppercase",
						children: "Spécialités"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1",
						children: a.expertise
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-[0.6rem] tracking-[0.18em] text-muted-foreground uppercase",
						children: "Langues"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1",
						children: a.languages
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-wrap gap-4 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `tel:${a.phone.replace(/\s/g, "")}`,
							className: "inline-flex items-center gap-2 hover:text-gold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-3.5 text-gold" }),
								" ",
								a.phone
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `mailto:${a.email}`,
							className: "inline-flex items-center gap-2 hover:text-gold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-3.5 text-gold" }),
								" ",
								a.email
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ml-auto text-xs text-muted-foreground",
							children: [propertiesByAgent(a.slug).length, " biens suivis"]
						})
					]
				})
			]
		}, a.slug))
	}) })] });
}
//#endregion
export { TeamPage as component };
