import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, r as useQuery, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as PROPERTY_STATUSES, i as PIPELINE_STAGES } from "./types-CH15H5aZ.mjs";
import { c as documentsQuery, g as propertiesQuery, o as clientsQuery, r as appointmentsQuery, u as leadsQuery, z as useMoveLead } from "./queries-Dq_yS5N4.mjs";
import { D as Plus, Tt as Building2 } from "../_libs/lucide-react.mjs";
import { D as toast$1, T as relativeTime, a as EmptyState, d as PanelHeader, g as StatCard, i as Drawer, l as PROPERTY_STATUS_LABELS, n as AdminButton, o as LoadingState, s as Modal, u as Panel, w as label, x as formatMoney } from "./primitives-BRdCR_bJ.mjs";
import { t as Calendar } from "./calendar-Ci9UynkK.mjs";
import { t as DataTable } from "./data-table-D16aF3Go.mjs";
import { a as TemperatureBadge, i as StageBadge, n as PropertyStatusBadge, r as RoleBadge, t as PriorityBadge } from "./status-badge-Dgx8kPC0.mjs";
import { a as PropertyCard, i as Pipeline, n as ClientCard, r as DocumentCard, t as AppointmentCard } from "./pipeline-CmiHMleY.mjs";
import { n as PropertyGallery, t as PropertyFilters } from "./property-gallery-RXE6QUvX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/design-Bb4WXe_n.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Block({ title, note, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
			eyebrow: "Composant",
			title
		}),
		note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "border-b border-line px-5 py-3 text-xs text-muted-foreground",
			children: note
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-5",
			children
		})
	] });
}
function DesignSystemPage() {
	const [filters, setFilters] = (0, import_react.useState)({});
	const [modalOpen, setModalOpen] = (0, import_react.useState)(false);
	const [drawerOpen, setDrawerOpen] = (0, import_react.useState)(false);
	const { data: properties = [], isPending: propsPending } = useQuery(propertiesQuery(filters));
	const { data: clients = [] } = useQuery(clientsQuery());
	const { data: leads = [] } = useQuery(leadsQuery());
	const { data: appointments = [] } = useQuery(appointmentsQuery());
	const { data: documents = [] } = useQuery(documentsQuery());
	const moveLead = useMoveLead();
	const clientMap = (0, import_react.useMemo)(() => new Map(clients.map((c) => [c.id, c])), [clients]);
	const propertyMap = (0, import_react.useMemo)(() => new Map(properties.map((p) => [p.id, p])), [properties]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Phase 2 — fondations"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "display mt-2 text-3xl",
						children: "Bibliothèque de composants"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground",
						children: [
							"Chaque composant utilise les tokens sémantiques de",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								className: "bg-sand px-1.5 py-0.5 text-xs",
								children: "src/styles.css"
							}),
							" — aucune couleur n'est codée en dur. Tous sont responsives de 375 à 1440 px."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
				title: "StatCard",
				note: "Tuile d'indicateur avec delta et icône.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							index: 0,
							label: "Biens actifs",
							value: "24",
							delta: 8,
							hint: "en ligne",
							icon: Building2
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							index: 1,
							label: "Pipeline",
							value: "18,4 M MAD",
							delta: 14,
							hint: "en cours"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							index: 2,
							label: "Visites",
							value: "37",
							delta: -6,
							hint: "30 jours"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							index: 3,
							label: "Conversion",
							value: "12%",
							hint: "sans delta"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
				title: "Badges",
				note: "Statuts de bien, étapes de pipeline, température, priorité, rôle.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: PROPERTY_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyStatusBadge, { status: s }, s))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: PIPELINE_STAGES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageBadge, { stage: s }, s))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemperatureBadge, {
									temperature: "cold",
									score: 22
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemperatureBadge, {
									temperature: "warm",
									score: 58
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemperatureBadge, {
									temperature: "hot",
									score: 87
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, { priority: "low" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, { priority: "normal" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, { priority: "high" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, { priority: "urgent" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: [
								"buyer",
								"seller",
								"tenant",
								"landlord",
								"investor"
							].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleBadge, { role: r }, r))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
				title: "Boutons, Modal, Drawer, Toast",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminButton, {
							onClick: () => setModalOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "Ouvrir la modale"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminButton, {
							variant: "outline",
							onClick: () => setDrawerOpen(true),
							children: "Ouvrir le drawer"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminButton, {
							variant: "ghost",
							onClick: () => toast$1.success("Enregistré", "Le bien est publié."),
							children: "Toast succès"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminButton, {
							variant: "danger",
							onClick: () => toast$1.error("Échec", "Vérifiez le mandat."),
							children: "Toast erreur"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
				title: "PropertyFilters",
				note: "Inline à partir de lg, en drawer en dessous.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyFilters, {
					value: filters,
					onChange: setFilters
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
				title: "DataTable",
				note: "Vrai tableau à partir de md, cartes empilées en dessous. Colonnes triables.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
					rows: properties,
					columns: [
						{
							id: "title",
							header: "Bien",
							primary: true,
							sortValue: (p) => p.title,
							cell: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-medium text-navy",
									children: p.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate text-xs text-muted-foreground",
									children: [
										p.reference,
										" · ",
										p.neighborhood
									]
								})]
							})
						},
						{
							id: "status",
							header: "Statut",
							sortValue: (p) => p.status,
							cell: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyStatusBadge, { status: p.status })
						},
						{
							id: "price",
							header: "Prix",
							sortValue: (p) => p.price,
							className: "text-right tabular-nums",
							cell: (p) => formatMoney(p.price, true)
						},
						{
							id: "views",
							header: "Vues",
							hideBelow: "lg",
							sortValue: (p) => p.views30d,
							className: "text-right tabular-nums",
							cell: (p) => p.views30d
						},
						{
							id: "updated",
							header: "Mis à jour",
							hideBelow: "xl",
							sortValue: (p) => p.updatedAt,
							cell: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: relativeTime(p.updatedAt)
							})
						}
					],
					getRowId: (p) => p.id,
					isLoading: propsPending,
					onRowClick: (p) => toast$1.info(p.title, label(PROPERTY_STATUS_LABELS, p.status)),
					empty: {
						title: "Aucun bien",
						description: "Ajustez les filtres ci-dessus."
					}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Block, {
				title: "PropertyCard / ClientCard",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
					children: properties.slice(0, 3).map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyCard, {
						property: p,
						index: i
					}, p.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
					children: clients.slice(0, 3).map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientCard, {
						client: c,
						index: i
					}, c.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
				title: "PropertyGallery",
				note: "Carrousel scroll-snap, swipe natif au doigt.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-w-xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyGallery, { media: properties[0]?.media ?? [] })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
				title: "Pipeline",
				note: "Kanban glisser-déposer. Colonnes en scroll-snap sur mobile ; le select de chaque carte est l'équivalent accessible.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pipeline, {
					leads,
					clients: clientMap,
					properties: propertyMap,
					onMove: (id, stage) => moveLead.mutate({
						id,
						stage
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
				title: "Calendar / AppointmentCard",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { appointments }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-w-0 space-y-3",
						children: appointments.slice(0, 4).map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppointmentCard, {
							appointment: a,
							client: a.clientId ? clientMap.get(a.clientId) : void 0,
							property: a.propertyId ? propertyMap.get(a.propertyId) : void 0,
							index: i
						}, a.id))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
				title: "DocumentCard",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: documents.slice(0, 4).map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentCard, {
						document: d,
						index: i
					}, d.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
				title: "EmptyState / LoadingState",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border border-line",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							title: "Aucun bien",
							description: "Créez votre première fiche pour la publier sur le site.",
							action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminButton, { children: "Ajouter un bien" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border border-line p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingState, { rows: 4 })
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				open: modalOpen,
				onClose: () => setModalOpen(false),
				title: "Exemple de modale",
				description: "Feuille par le bas sur mobile, fenêtre centrée à partir de sm.",
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminButton, {
					variant: "outline",
					onClick: () => setModalOpen(false),
					children: "Annuler"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminButton, {
					onClick: () => {
						setModalOpen(false);
						toast$1.success("Confirmé");
					},
					children: "Confirmer"
				})] }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-muted-foreground",
					children: "Le corps défile si le contenu dépasse la hauteur disponible. Échap ferme, le scroll de la page est bloqué pendant l'ouverture."
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer, {
				open: drawerOpen,
				onClose: () => setDrawerOpen(false),
				title: "Exemple de drawer",
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminButton, {
					className: "flex-1",
					onClick: () => setDrawerOpen(false),
					children: "Fermer"
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-muted-foreground",
					children: "Feuille par le bas sous sm, panneau latéral au-dessus. Utilisé pour les filtres et les fiches de détail."
				})
			})
		]
	});
}
//#endregion
export { DesignSystemPage as component };
