import { i as __toESM } from "../_runtime.mjs";
import { i as cn } from "./utils-BWXQYj3d.mjs";
import { o as require_jsx_runtime, r as useQuery, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { C as useCreateCallbackTask, X as useSetAutomation, i as automationsQuery, l as inactiveLeadsQuery, r as appointmentsQuery } from "./queries-Dq_yS5N4.mjs";
import { Ct as CalendarClock, Ft as AlarmClock, Z as History, k as PhoneCall, t as Zap, x as Send } from "../_libs/lucide-react.mjs";
import { D as toast$1, T as relativeTime, a as EmptyState, n as AdminButton, u as Panel } from "./primitives-BRdCR_bJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/automatisations-BIjuFQW3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AutomationsPage() {
	const { data: automations } = useQuery(automationsQuery());
	const { data: inactive = [] } = useQuery(inactiveLeadsQuery());
	const { data: appointments = [] } = useQuery(appointmentsQuery());
	const setAutomation = useSetAutomation();
	const createCallback = useCreateCallbackTask();
	const rules = automations?.rules ?? [];
	const runs = automations?.runs ?? [];
	const pendingConfirmations = (0, import_react.useMemo)(() => {
		const soon = new Date(Date.now() + 48 * 36e5).toISOString();
		return appointments.filter((a) => a.kind === "viewing" && a.status === "scheduled" && a.startsAt >= (/* @__PURE__ */ new Date()).toISOString() && a.startsAt <= soon).slice(0, 8);
	}, [appointments]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Moteur d'automatisation"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground",
					children: "Chaque règle déclenche tâches et notifications quand un événement se produit. Désactiver une règle n'efface pas son historique."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-2 border border-line px-3 py-1.5 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3.5 text-gold" }),
						rules.filter((r) => r.enabled).length,
						"/",
						rules.length,
						" règles actives"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: rules.map((rule) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					className: "p-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-10 shrink-0 place-items-center border border-line bg-sand text-gold",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-medium text-navy",
										children: rule.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										checked: rule.enabled,
										onChange: (v) => setAutomation.mutate({
											key: rule.key,
											enabled: v
										}),
										label: rule.title
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 text-xs leading-relaxed text-muted-foreground",
									children: rule.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 flex items-center gap-3 border-t border-line pt-3 text-xs text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "tabular-nums",
										children: [
											rule.runs,
											" déclenchement",
											rule.runs > 1 ? "s" : ""
										]
									}), rule.lastRun ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "tabular-nums",
										children: ["Dernier : ", relativeTime(rule.lastRun)]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Jamais déclenchée" })]
								})
							]
						})]
					})
				}, rule.key))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 xl:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					className: "xl:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex items-center gap-3 border-b border-line px-5 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-4 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "display flex-1 text-lg",
							children: "Journal des exécutions"
						})]
					}), runs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						title: "Aucune exécution",
						description: "Les prochains événements apparaîtront ici."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y divide-line",
						children: runs.slice(0, 14).map((run) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-3 px-5 py-3.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("mt-0.5 grid size-8 shrink-0 place-items-center border", run.rule === "inactiveLeadRelance" ? "border-negative/40 text-negative" : "border-gold/50 text-gold"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3.5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-navy",
										children: run.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 line-clamp-2 text-xs text-muted-foreground",
										children: run.detail
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "shrink-0 text-xs text-muted-foreground tabular-nums",
									children: relativeTime(run.at)
								})
							]
						}, run.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center gap-3 border-b border-line px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneCall, { className: "size-4 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "display flex-1 text-lg",
						children: "Relance des leads inactifs"
					})]
				}), inactive.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "Aucun lead inactif",
					description: "Tous les leads ont été contactés dans les 3 derniers jours.",
					icon: PhoneCall
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-line",
					children: inactive.slice(0, 6).map(({ lead, client, daysInactive }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3 px-5 py-3.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlarmClock, { className: "size-4 shrink-0 text-negative" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate text-sm font-medium text-navy",
									children: [
										client.firstName,
										" ",
										client.lastName
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										"Inactif depuis ",
										daysInactive,
										" jour",
										daysInactive > 1 ? "s" : ""
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminButton, {
								variant: "outline",
								onClick: () => createCallback.mutate(lead.id, { onSuccess: () => toast$1.success("Relance planifiée", "La tâche est apparue dans le tableau des tâches.") }),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-3.5" })
							})
						]
					}, lead.id))
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-3 border-b border-line px-5 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "size-4 text-gold" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "display flex-1 text-lg",
						children: "Visites à confirmer (48 h)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground tabular-nums",
						children: pendingConfirmations.length
					})
				]
			}), pendingConfirmations.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "Aucune visite à confirmer",
				description: "Les visites planifiées non confirmées apparaîtront ici.",
				icon: CalendarClock
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-line",
				children: pendingConfirmations.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-3 px-5 py-3.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-medium text-navy",
							children: a.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								new Date(a.startsAt).toLocaleDateString("fr-FR", {
									day: "2-digit",
									month: "short"
								}),
								" ",
								"·",
								" ",
								new Date(a.startsAt).toLocaleTimeString("fr-FR", {
									hour: "2-digit",
									minute: "2-digit"
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "border border-gold/50 px-2.5 py-1 text-[0.58rem] tracking-[0.12em] text-gold uppercase",
						children: "À confirmer"
					})]
				}, a.id))
			})] })
		]
	});
}
function Switch({ checked, onChange, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		role: "switch",
		"aria-checked": checked,
		"aria-label": label,
		onClick: () => onChange(!checked),
		className: cn("relative h-6 w-11 shrink-0 border transition-colors duration-300", checked ? "border-gold bg-gold" : "border-line bg-sand"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("absolute top-0.5 size-[18px] bg-white shadow-panel transition-transform duration-300", checked ? "translate-x-[calc(100%-2px)]" : "translate-x-0.5"),
			style: { left: 0 }
		})
	});
}
//#endregion
export { AutomationsPage as component };
