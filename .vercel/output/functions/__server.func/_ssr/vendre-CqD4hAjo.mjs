import { d as locations, h as propertyTypes, u as images } from "./utils-BWXQYj3d.mjs";
import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as Section, i as Reveal, o as SectionHeading, r as PageHero, t as Counter } from "./layout-bits-BHY2L1ae.mjs";
import { t as LeadForm } from "./lead-form-Oeo_d5pz.mjs";
import { vt as Check } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vendre-CqD4hAjo.js
var import_jsx_runtime = require_jsx_runtime();
var steps = [
	{
		title: "Estimation",
		text: "Visite du bien, analyse des comparables signés, rapport écrit remis sous 72 heures."
	},
	{
		title: "Préparation",
		text: "Conseils de mise en valeur, reportage photo professionnel, plan coté et descriptif rédigé."
	},
	{
		title: "Diffusion",
		text: "Mise en ligne simultanée, activation de notre fichier acquéreurs et des partenaires."
	},
	{
		title: "Visites",
		text: "Visites accompagnées et qualifiées, compte rendu hebdomadaire, retours d'acheteurs transmis bruts."
	},
	{
		title: "Négociation",
		text: "Défense de votre prix, vérification de la solvabilité, rédaction du compromis avec le notaire."
	},
	{
		title: "Signature",
		text: "Coordination notaire et banque jusqu'à la remise des clés, puis suivi après-vente."
	}
];
function SellPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "Vendre",
			title: "Le bon prix, dès le premier jour.",
			intro: "Un bien mal positionné perd en moyenne 9 % de sa valeur finale. Notre travail commence donc par une estimation que nous savons défendre.",
			image: images.property1
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-10 sm:grid-cols-3",
			children: [
				{
					value: 74,
					suffix: " j",
					label: "délai médian de vente en exclusivité"
				},
				{
					value: 62,
					suffix: "",
					label: "mandats exclusifs signés en 2025"
				},
				{
					value: 2,
					suffix: ",4 %",
					label: "écart moyen entre prix d'annonce et prix signé"
				}
			].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				delay: i * 80,
				className: "border-t border-gold/40 pt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "display text-5xl text-blue",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Counter, {
						value: s.value,
						suffix: s.suffix
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted-foreground",
					children: s.label
				})]
			}, s.label))
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			tone: "sand",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Notre méthode",
				title: "Six étapes, aucune improvisation",
				intro: "Chaque mandat suit le même protocole, du studio de 45 m² à la villa front d'océan."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-px bg-line sm:grid-cols-2 xl:grid-cols-3",
				children: steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					delay: i * 60,
					className: "bg-sand p-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[0.6rem] tracking-[0.2em] text-gold",
							children: ["Étape ", String(i + 1).padStart(2, "0")]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "display mt-2 text-2xl",
							children: s.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted-foreground",
							children: s.text
						})
					]
				}, s.title))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			tone: "navy",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Pourquoi nous confier votre bien"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "display mt-4 text-[clamp(2rem,4vw,3.25rem)]",
						children: "Un vendeur informé négocie mieux"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-8 space-y-3.5",
						children: [
							"Estimation gratuite, écrite et argumentée sous 72 heures",
							"Reportage photo et plan coté pris en charge par l'agence",
							"Fichier de plus de 900 acquéreurs qualifiés",
							"Sélection des visiteurs : pas de défilé inutile chez vous",
							"Compte rendu hebdomadaire, y compris quand ça ne bouge pas",
							"Accompagnement notarial et fiscal jusqu'à la signature"
						].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-3 text-sm text-white/80",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 shrink-0 text-gold" }), t]
						}, t))
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: 120,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadForm, {
						tone: "navy",
						intent: "valuation",
						submitLabel: "Demander mon estimation gratuite",
						note: "Sans engagement. Nous vous rappelons pour convenir d'une visite d'évaluation.",
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
								name: "type",
								label: "Type de bien",
								type: "select",
								options: propertyTypes,
								required: true
							},
							{
								name: "quartier",
								label: "Quartier",
								type: "select",
								options: locations.map((l) => l.name),
								required: true
							},
							{
								name: "surface",
								label: "Surface approximative (m²)",
								full: true
							},
							{
								name: "message",
								label: "Précisions utiles",
								type: "textarea",
								placeholder: "Année de construction, travaux récents, échéance de vente…"
							}
						]
					})
				})]
			})
		})
	] });
}
//#endregion
export { SellPage as component };
