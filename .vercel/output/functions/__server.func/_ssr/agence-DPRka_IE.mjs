import { b as values, n as agents, u as images, v as stats } from "./utils-BTE8P7Sw.mjs";
import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Section, i as Reveal, o as SectionHeading, r as PageHero, t as Counter } from "./layout-bits-BGOsNYiy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/agence-DPRka_IE.js
var import_jsx_runtime = require_jsx_runtime();
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "L'agence",
			title: "Née à Agadir, restée à Agadir.",
			intro: "STE MABANIS — Ste Gestion et Services — a ouvert son premier bureau à Talborjt en 2008. Nous n'avons jamais cherché à couvrir tout le Maroc : nous préférons connaître un territoire par cœur.",
			image: images.teamOffice
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Notre histoire"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display mt-4 text-[clamp(2rem,4vw,3.25rem)]",
					children: "Dix-huit ans à apprendre une ville"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-4 text-[0.98rem] leading-relaxed text-foreground/85",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "L'agence est née d'un constat simple : à Agadir, on vendait beaucoup de biens sans jamais les avoir visités, et on estimait au doigt mouillé. Nous avons décidé de faire l'inverse — visiter chaque bien, vérifier chaque titre, argumenter chaque prix." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "De trois personnes en 2008, l'équipe est passée à onze collaborateurs répartis entre transaction, gestion locative et expertise. Le portefeuille a suivi : plus de 640 transactions accompagnées et 180 lots gérés pour le compte de propriétaires résidents et non-résidents." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Notre vision n'a pas bougé : être l'agence que l'on recommande à sa famille, celle qui dit non à un mandat surévalué plutôt que d'immobiliser un bien six mois." })
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: 120,
				className: "zoom-frame",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: images.locationAgadir,
					alt: "Vue aérienne de la baie d'Agadir",
					loading: "lazy",
					width: 1280,
					height: 960,
					className: "aspect-4/5 w-full object-cover"
				})
			})]
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			tone: "navy",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-10 sm:grid-cols-2 lg:grid-cols-4",
				children: stats.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					delay: i * 80,
					className: "border-t border-gold/40 pt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "display text-5xl text-gold sm:text-6xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Counter, {
							value: s.value,
							suffix: s.suffix
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-white/65",
						children: s.label
					})]
				}, s.label))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			tone: "sand",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Nos valeurs",
				title: "Ce sur quoi nous ne transigeons pas"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-px bg-line sm:grid-cols-2 xl:grid-cols-4",
				children: values.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					delay: i * 70,
					className: "bg-sand p-7",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "display rule-gold text-2xl",
						children: v.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted-foreground",
						children: v.text
					})]
				}, v.title))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
			eyebrow: "L'équipe",
			title: "Onze personnes, quatre visages que vous croiserez le plus",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/equipe",
				className: "link-underline text-[0.72rem] tracking-[0.18em] uppercase",
				children: "Voir toute l'équipe"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-12 grid gap-px bg-line sm:grid-cols-2 xl:grid-cols-4",
			children: agents.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				delay: i * 70,
				className: "bg-background p-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "display grid size-14 place-items-center bg-navy text-xl text-gold",
						children: a.initials
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "display mt-4 text-2xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/equipe/$slug",
							params: { slug: a.slug },
							className: "link-underline",
							children: a.name
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: a.role
					})
				]
			}, a.slug))
		})] })
	] });
}
//#endregion
export { AboutPage as component };
