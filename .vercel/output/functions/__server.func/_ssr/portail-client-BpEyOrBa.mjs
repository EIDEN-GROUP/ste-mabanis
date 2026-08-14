import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { Q as Heart, St as CalendarDays, ct as ExternalLink, nt as FolderOpen, tt as GitBranch } from "../_libs/lucide-react.mjs";
import { u as Panel } from "./primitives-BRdCR_bJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portail-client-BpEyOrBa.js
var import_jsx_runtime = require_jsx_runtime();
var MODULES = [
	{
		icon: Heart,
		title: "Biens favoris",
		detail: "Le client épinglera ses biens préférés pour les retrouver à tout moment.",
		status: "Prévu"
	},
	{
		icon: CalendarDays,
		title: "Mes visites",
		detail: "Récapitulatif des visites programmées, passées et à venir, avec notes de visite.",
		status: "Prévu"
	},
	{
		icon: FolderOpen,
		title: "Mes documents",
		detail: "Pièces du dossier (compromis, contrats, relevés) partagées en un clic par l'agence.",
		status: "Prévu"
	},
	{
		icon: GitBranch,
		title: "Suivi de ma transaction",
		detail: "Suivi pas à pas : offre, compromis, financement, acte. Statut mis à jour par l'agence.",
		status: "Prévu"
	}
];
function PortailClientPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "border-b border-line px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display text-xl",
					children: "Portail client"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-2xl text-sm text-muted-foreground",
					children: "Espace privé des clients MABANIS : un accès sécurisé pour suivre ses biens favoris, ses visites, ses documents et l'avancement de sa transaction. L'espace public sera servi sur une route dédiée, alimenté par les mêmes données que le back-office."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 p-5 sm:grid-cols-2",
				children: MODULES.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-4 border border-line bg-admin-bg/40 p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-10 shrink-0 place-items-center border border-line bg-sand text-gold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(m.icon, { className: "size-4.5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-medium text-navy",
								children: m.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "border border-gold/50 px-2 py-0.5 text-[0.55rem] tracking-[0.14em] text-gold uppercase",
								children: m.status
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs leading-relaxed text-muted-foreground",
							children: m.detail
						})]
					})]
				}, m.title))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-line px-5 py-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display text-xl",
					children: "Prochaines étapes"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "divide-y divide-line text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3 px-5 py-3.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 shrink-0 rounded-full bg-gold" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-navy",
								children: "Table clients enrichi"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-auto text-xs text-muted-foreground",
								children: "email vérifié + statut d'invitation"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3 px-5 py-3.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 shrink-0 rounded-full bg-gold" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-navy",
								children: "Page publique /portail/:id"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-auto text-xs text-muted-foreground",
								children: "accès par lien sécurisé"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3 px-5 py-3.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 shrink-0 rounded-full bg-gold" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-navy",
								children: "Envoi automatique du lien"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-auto text-xs text-muted-foreground",
								children: "à la création du client"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3 px-5 py-3.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 shrink-0 rounded-full bg-gold" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-navy",
								children: "Actions agents"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-auto text-xs text-muted-foreground",
								children: "partage de documents, mise à jour du suivi"
							})
						]
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-4 px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "L'architecture de données (clients, visites, documents, transactions) est déjà en place — le portail viendra la consommer telle quelle."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "/admin/clients",
					className: "inline-flex shrink-0 items-center gap-1.5 border border-line px-3 py-2 text-xs tracking-[0.12em] text-navy uppercase transition-colors hover:border-gold hover:text-gold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" }), " Voir les clients"]
				})]
			}) })
		]
	});
}
//#endregion
export { PortailClientPage as component };
