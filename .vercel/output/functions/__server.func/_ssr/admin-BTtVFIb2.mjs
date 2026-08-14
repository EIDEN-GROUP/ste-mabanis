import { i as cn } from "./utils-BWXQYj3d.mjs";
import { o as require_jsx_runtime, r as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as prioritiesQuery, s as dashboardQuery } from "./queries-Dq_yS5N4.mjs";
import { A as Percent, Mt as ArrowRight, Tt as Building2, b as ShieldCheck, c as UserPlus, d as TrendingUp, i as Wallet, u as TriangleAlert, ut as Clock, wt as CalendarCheck } from "../_libs/lucide-react.mjs";
import { S as formatNumber, a as EmptyState, d as PanelHeader, g as StatCard, h as STAGE_LABELS, m as SOURCE_LABELS, o as LoadingState, u as Panel, w as label, x as formatMoney } from "./primitives-BRdCR_bJ.mjs";
import { i as useAgentsForRole, o as useSession, r as useAgentScope, t as ACTION_ROLES } from "./session-BlPZ3SJa.mjs";
import { a as TrendChart, i as DonutChart, n as CategoryBarChart, r as ChartLegend, t as AreaTrendChart } from "./charts-CyqKhVF4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-BTtVFIb2.js
var import_jsx_runtime = require_jsx_runtime();
var URGENCY = {
	overdue: {
		tone: "text-negative border-negative/35",
		icon: TriangleAlert,
		word: "En retard"
	},
	today: {
		tone: "text-status-offer border-status-offer/35",
		icon: Clock,
		word: "Aujourd'hui"
	},
	soon: {
		tone: "text-muted-foreground border-line",
		icon: Clock,
		word: "À suivre"
	}
};
var ACTION_LABELS = {
	"screen.design": "Fiche design",
	"screen.rapports": "Rapports",
	"screen.automatisations": "Automatisations",
	"screen.marketing": "Campagnes",
	"screen.portail-client": "Portail client",
	"screen.matching": "Matching",
	"screen.crm": "CRM / Leads",
	"screen.agenda": "Agenda",
	"screen.transactions": "Transactions",
	"screen.documents": "Documents",
	"screen.taches": "Tâches",
	"screen.proprietes": "Propriétés",
	"screen.clients": "Clients",
	"property.create": "Créer un bien",
	"property.edit": "Modifier un bien",
	"property.delete": "Supprimer un bien",
	"client.create": "Créer un client",
	"client.edit": "Modifier un client",
	"client.delete": "Supprimer un client",
	"lead.move": "Déplacer un lead",
	"lead.convert": "Convertir un lead",
	"lead.delete": "Supprimer un lead",
	"appointment.manage": "Gérer les visites",
	"transaction.manage": "Gérer les transactions",
	"transaction.delete": "Supprimer une transaction",
	"document.manage": "Gérer les documents",
	"task.manage": "Gérer les tâches",
	"report.export": "Exporter les rapports",
	"campaign.manage": "Gérer les campagnes",
	"automation.toggle": "Activer les automatisations",
	"match.send": "Envoyer des biens"
};
var ROLE_COLUMNS = [
	{
		role: "directrice",
		label: "Directrice"
	},
	{
		role: "commercial",
		label: "Commercial"
	},
	{
		role: "assistant",
		label: "Assistant"
	}
];
function DashboardPage() {
	const { role, roleInfo, agentId } = useSession();
	const scope = useAgentScope();
	const commercialAgents = useAgentsForRole("commercial");
	const { data, isPending } = useQuery(dashboardQuery());
	const { data: priorities = [], isPending: prioritiesPending } = useQuery(prioritiesQuery(scope ?? void 0));
	if (isPending || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingState, {
			variant: "cards",
			rows: 6
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingState, { variant: "chart" })]
	});
	const { kpis } = data;
	const isDirectrice = role === "directrice";
	const agentName = commercialAgents.find((a) => a.id === agentId)?.name;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Tableau de bord"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "display mt-1 text-2xl",
					children: ["Bonjour", agentName ? `, ${agentName}` : `, ${roleInfo.label}`]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: roleInfo.tagline
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 2xl:grid-cols-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						index: 0,
						label: "Biens actifs",
						value: formatNumber(kpis.activelistings),
						delta: kpis.deltas["activelistings"],
						hint: "en ligne",
						icon: Building2
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						index: 1,
						label: "Nouveaux leads",
						value: formatNumber(kpis.newLeads30d),
						delta: kpis.deltas["newLeads30d"],
						hint: "30 jours",
						icon: UserPlus
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						index: 2,
						label: "Visites",
						value: formatNumber(kpis.viewings30d),
						delta: kpis.deltas["viewings30d"],
						hint: "30 jours",
						icon: CalendarCheck
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						index: 3,
						label: "Pipeline",
						value: formatMoney(kpis.pipelineValue, true),
						delta: kpis.deltas["pipelineValue"],
						hint: "en cours",
						icon: Wallet
					}),
					isDirectrice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						index: 4,
						label: "Honoraires",
						value: formatMoney(kpis.revenueYtd, true),
						delta: kpis.deltas["revenueYtd"],
						hint: "cumul",
						icon: TrendingUp
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						index: 5,
						label: "Conversion",
						value: `${kpis.conversionRate}%`,
						delta: kpis.deltas["conversionRate"],
						hint: "leads gagnés",
						icon: Percent
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 xl:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					className: "xl:col-span-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
						eyebrow: "À traiter",
						title: "Priorités du jour"
					}), prioritiesPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingState, {
						rows: 4,
						className: "p-4"
					}) : priorities.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						title: "Rien d'urgent",
						description: "Toutes les échéances sont tenues."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: priorities.map((p, i) => {
						const u = URGENCY[p.urgency];
						const Icon = u.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							style: { ["--i"]: i },
							className: "stagger-in",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: p.href,
								className: "flex items-start gap-3 border-b border-line px-5 py-3.5 transition-colors last:border-0 hover:bg-sand",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("mt-0.5 grid size-8 shrink-0 place-items-center border", u.tone),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block truncate text-sm font-medium text-navy",
											children: p.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "mt-0.5 block text-xs text-muted-foreground",
											children: [
												u.word,
												" · ",
												p.detail
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "mt-1 size-4 shrink-0 text-muted-foreground/50" })
								]
							})
						}, p.id);
					}) })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					className: "xl:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
						eyebrow: "Acquisition",
						title: "Leads et visites"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, {
							data: data.leadsSeries,
							xKey: "month",
							series: [{
								key: "leads",
								name: "Leads"
							}, {
								key: "viewings",
								name: "Visites"
							}],
							height: 280
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
						eyebrow: "Audience",
						title: "Vues du site"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AreaTrendChart, {
							data: data.viewsSeries,
							xKey: "month",
							dataKey: "views",
							name: "Vues",
							formatter: formatNumber
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
						eyebrow: "Honoraires",
						title: "Revenus par mois"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryBarChart, {
							data: data.revenueSeries,
							xKey: "month",
							dataKey: "revenue",
							name: "Honoraires",
							formatter: (v) => formatMoney(v, true)
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
						eyebrow: "CRM",
						title: "Pipeline par étape"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryBarChart, {
							data: data.pipelineByStage.map((p) => ({
								label: label(STAGE_LABELS, p.label),
								value: p.value
							})),
							xKey: "label",
							dataKey: "value",
							name: "Leads",
							horizontal: true
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
						eyebrow: "Origine",
						title: "Sources des leads"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DonutChart, { data: data.sourceBreakdown.map((s) => ({
							label: label(SOURCE_LABELS, s.label),
							value: s.value
						})) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLegend, { items: data.sourceBreakdown.map((s) => ({
							label: label(SOURCE_LABELS, s.label),
							value: String(s.value)
						})) })]
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
				eyebrow: "Rôles et permissions",
				title: "Qui peut faire quoi",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1.5 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5 text-gold" }), roleInfo.label]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[640px] border-collapse text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-4 text-[0.62rem] font-medium tracking-[0.14em] text-muted-foreground uppercase",
							children: "Action"
						}), ROLE_COLUMNS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 px-3 text-center text-[0.62rem] font-medium tracking-[0.14em] uppercase",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn(c.role === role && "text-gold"),
								children: c.label
							})
						}, c.role))]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: Object.keys(ACTION_ROLES).map((action) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line/60 transition-colors last:border-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-1.5 pr-4 text-navy",
							children: ACTION_LABELS[action]
						}), ROLE_COLUMNS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-1.5 px-3 text-center",
							children: ACTION_ROLES[action].includes(c.role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gold",
								children: "✓"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground/40",
								children: "·"
							})
						}, c.role))]
					}, action)) })]
				})
			})] }) })
		]
	});
}
//#endregion
export { DashboardPage as component };
