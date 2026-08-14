import { i as __toESM } from "../_runtime.mjs";
import { i as cn } from "./utils-BWXQYj3d.mjs";
import { o as require_jsx_runtime, r as useQuery, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { $ as useUpdateAppointment, K as useSaveViewingReport, S as useCreateAppointment, Y as useSetAppointmentStatus, g as propertiesQuery, n as agentsQuery, o as clientsQuery, r as appointmentsQuery } from "./queries-Dq_yS5N4.mjs";
import { D as Plus, St as CalendarDays, ft as CircleCheck, st as Eye, ut as Clock } from "../_libs/lucide-react.mjs";
import { C as formatTime, b as formatDate, g as StatCard, i as Drawer, n as AdminButton, p as SEED_NOW, s as Modal, t as APPOINTMENT_LABELS, w as label } from "./primitives-BRdCR_bJ.mjs";
import { r as useAgentScope } from "./session-BlPZ3SJa.mjs";
import { t as Calendar } from "./calendar-Ci9UynkK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/agenda-BrlHYWvU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KIND_TONE = {
	viewing: "border-gold/50 text-gold",
	valuation: "border-blue/40 text-blue",
	signature: "border-positive/40 text-positive",
	call: "border-line text-navy/70",
	meeting: "border-status-archived text-navy/60"
};
var STATUS_TONE = {
	scheduled: "border-line text-navy/75",
	confirmed: "border-gold/50 text-gold",
	done: "border-positive/40 text-positive",
	cancelled: "border-negative/40 text-negative",
	no_show: "border-negative/40 text-negative"
};
var DAY_START_MIN = 480;
var DAY_SPAN_MIN = 1200 - DAY_START_MIN;
function minutesOf(iso) {
	const d = new Date(iso);
	return d.getHours() * 60 + d.getMinutes();
}
function sameDay(a, b) {
	return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function startOfWeek(d) {
	const day = (d.getDay() + 6) % 7;
	return new Date(d.getFullYear(), d.getMonth(), d.getDate() - day);
}
function toLocalInput(d) {
	const pad = (n) => String(n).padStart(2, "0");
	return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
function toLocalTime(d) {
	const pad = (n) => String(n).padStart(2, "0");
	return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function AgendaPage() {
	const [view, setView] = (0, import_react.useState)("semaine");
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const [creating, setCreating] = (0, import_react.useState)(false);
	const scope = useAgentScope();
	const { data: appointments = [] } = useQuery(appointmentsQuery());
	const { data: clients = [] } = useQuery(clientsQuery({}));
	const { data: properties = [] } = useQuery(propertiesQuery({}));
	const { data: agents = [] } = useQuery(agentsQuery());
	const visibleAppointments = scope ? appointments.filter((a) => a.agentId === scope) : appointments;
	const scopedClients = scope ? clients.filter((c) => c.agentId === scope) : clients;
	const clientsById = (0, import_react.useMemo)(() => new Map(clients.map((c) => [c.id, c])), [clients]);
	const propertiesById = (0, import_react.useMemo)(() => new Map(properties.map((p) => [p.id, p])), [properties]);
	const agentsById = (0, import_react.useMemo)(() => new Map(agents.map((a) => [a.id, a])), [agents]);
	const today = visibleAppointments.filter((a) => sameDay(new Date(a.startsAt), SEED_NOW));
	const week = visibleAppointments.filter((a) => {
		const d = new Date(a.startsAt);
		return sameDay(d, SEED_NOW) || d > SEED_NOW && d < new Date(SEED_NOW.getTime() + 7 * 864e5);
	});
	const doneWeek = week.filter((a) => a.status === "done");
	const selected = visibleAppointments.find((a) => a.id === selectedId) ?? null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Aujourd'hui",
						value: String(today.length),
						hint: "Rendez-vous du jour",
						icon: Clock,
						index: 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "7 prochains jours",
						value: String(week.filter((a) => a.status !== "done").length),
						hint: "Dont visites : " + String(week.filter((a) => a.kind === "viewing").length),
						icon: CalendarDays,
						index: 1
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Terminés cette semaine",
						value: String(doneWeek.length),
						hint: "Visites débriefées",
						icon: CircleCheck,
						index: 2
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Visites à venir",
						value: String(visibleAppointments.filter((a) => a.kind === "viewing" && a.status !== "done").length),
						hint: "Toutes périodes",
						icon: Eye,
						index: 3
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex border border-line",
					children: [
						"jour",
						"semaine",
						"mois"
					].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setView(v),
						className: cn("px-4 py-2.5 text-[0.68rem] tracking-[0.14em] uppercase transition-colors", view === v ? "bg-navy text-white" : "text-muted-foreground hover:text-navy"),
						children: v
					}, v))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminButton, {
					onClick: () => setCreating(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), " Nouveau rendez-vous"]
				})]
			}),
			view === "mois" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { appointments: visibleAppointments }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timeline, {
				view,
				appointments: visibleAppointments,
				onSelect: setSelectedId
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppointmentDrawer, {
				appointment: selected,
				client: selected ? clientsById.get(selected.clientId ?? "") ?? null : null,
				property: selected ? propertiesById.get(selected.propertyId ?? "") ?? null : null,
				agent: selected ? agentsById.get(selected.agentId) ?? null : null,
				onClose: () => setSelectedId(null)
			}),
			creating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppointmentFormModal, {
				clients: scopedClients,
				properties,
				agents,
				defaultAgentId: scope ?? void 0,
				onClose: () => setCreating(false)
			}) : null
		]
	});
}
function Timeline({ view, appointments, onSelect }) {
	const days = (0, import_react.useMemo)(() => {
		if (view === "jour") return [SEED_NOW];
		const monday = startOfWeek(SEED_NOW);
		return Array.from({ length: 7 }, (_, i) => new Date(monday.getTime() + i * 864e5));
	}, [view]);
	const hours = Array.from({ length: DAY_SPAN_MIN / 60 }, (_, i) => DAY_START_MIN / 60 + i);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border border-line bg-admin-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("grid border-b border-line", view === "jour" ? "grid-cols-1" : "grid-cols-7"),
			children: days.map((d) => {
				const isToday = sameDay(d, SEED_NOW);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("border-r border-line py-3 text-center last:border-r-0", isToday && "bg-gold/8"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[0.58rem] tracking-[0.16em] text-muted-foreground uppercase",
						children: d.toLocaleDateString("fr-FR", { weekday: "short" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("display mt-0.5 text-lg", isToday && "text-gold"),
						children: d.getDate()
					})]
				}, d.toISOString());
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative min-w-[720px]",
				style: { height: `${DAY_SPAN_MIN / 60 * 3.5}rem` },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-full grid-cols-7",
					children: days.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative border-r border-line/60 last:border-r-0",
						children: [hours.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-x-0 border-t border-line/50 text-right pr-2",
							style: { top: `${(h * 60 - DAY_START_MIN) / DAY_SPAN_MIN * 100}%` },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "align-top text-[0.55rem] text-muted-foreground tabular-nums",
								children: [String(h).padStart(2, "0"), ":00"]
							})
						}, h)), appointments.filter((a) => sameDay(new Date(a.startsAt), d)).map((a) => {
							const start = minutesOf(a.startsAt);
							const end = Math.max(start + 30, minutesOf(a.endsAt));
							const top = (start - DAY_START_MIN) / DAY_SPAN_MIN * 100;
							const height = (end - start) / DAY_SPAN_MIN * 100;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => onSelect(a.id),
								className: cn("absolute inset-x-1 flex flex-col gap-0.5 overflow-hidden border-l-2 bg-sand px-2 py-1 text-left transition-colors hover:border-gold hover:bg-gold/10", (a.status === "cancelled" || a.status === "no_show") && "opacity-60"),
								style: {
									top: `${top}%`,
									height: `max(${height}%, 1.75rem)`
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[0.6rem] font-medium text-navy tabular-nums",
									children: formatTime(a.startsAt)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate text-[0.65rem] text-navy/80",
									children: a.title
								})]
							}, a.id);
						})]
					}, d.toISOString()))
				})
			})
		})]
	});
}
function AppointmentDrawer({ appointment, client, property, agent, onClose }) {
	const [reporting, setReporting] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [interest, setInterest] = (0, import_react.useState)(appointment?.report?.interest ?? 3);
	const [outcome, setOutcome] = (0, import_react.useState)(appointment?.report?.outcome ?? "");
	const [nextAction, setNextAction] = (0, import_react.useState)(appointment?.report?.nextAction ?? "");
	const setStatus = useSetAppointmentStatus();
	const saveReport = useSaveViewingReport();
	if (!appointment) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer, {
		open: true,
		onClose,
		title: appointment.title,
		footer: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminButton, {
			variant: "outline",
			onClick: () => setEditing(true),
			children: "Modifier"
		}, "edit"), appointment.status === "scheduled" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminButton, {
			onClick: () => setStatus.mutate({
				id: appointment.id,
				status: "confirmed"
			}),
			children: "Confirmer"
		}, "status") : null],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("border px-2.5 py-1 text-[0.6rem] tracking-[0.12em] uppercase", KIND_TONE[appointment.kind]),
						children: label(APPOINTMENT_LABELS, appointment.kind)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("border px-2.5 py-1 text-[0.6rem] tracking-[0.12em] uppercase", STATUS_TONE[appointment.status]),
						children: label({
							scheduled: "Planifié",
							confirmed: "Confirmé",
							done: "Terminé",
							cancelled: "Annulé",
							no_show: "Absence"
						}, appointment.status)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "space-y-2.5 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "w-24 shrink-0 text-xs text-muted-foreground uppercase",
								children: "Quand"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
								className: "text-navy",
								children: [
									formatDate(appointment.startsAt),
									" · ",
									formatTime(appointment.startsAt),
									" –",
									" ",
									formatTime(appointment.endsAt)
								]
							})]
						}),
						client ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "w-24 shrink-0 text-xs text-muted-foreground uppercase",
								children: "Client"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
								className: "text-navy",
								children: [
									client.firstName,
									" ",
									client.lastName
								]
							})]
						}) : null,
						property ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "w-24 shrink-0 text-xs text-muted-foreground uppercase",
								children: "Bien"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
								className: "text-navy",
								children: [
									property.title,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted-foreground",
										children: [
											"(",
											property.reference,
											")"
										]
									})
								]
							})]
						}) : null,
						agent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "w-24 shrink-0 text-xs text-muted-foreground uppercase",
								children: "Agent"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-navy",
								children: agent.name
							})]
						}) : null,
						appointment.location ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "w-24 shrink-0 text-xs text-muted-foreground uppercase",
								children: "Lieu"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-navy",
								children: appointment.location
							})]
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Statut"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex flex-wrap gap-2",
					children: [
						"confirmed",
						"done",
						"cancelled",
						"no_show"
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setStatus.mutate({
								id: appointment.id,
								status: s
							});
							if (s === "done") setReporting(true);
						},
						className: cn("border px-3 py-1.5 text-[0.62rem] tracking-[0.12em] uppercase transition-colors", appointment.status === s ? "border-gold bg-gold/10 text-gold" : "border-line text-muted-foreground hover:border-gold hover:text-navy"),
						children: label({
							scheduled: "Planifié",
							confirmed: "Confirmé",
							done: "Terminé",
							cancelled: "Annulé",
							no_show: "Absence"
						}, s)
					}, s))
				})] }),
				appointment.report ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-line bg-sand/60 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Débrief de visite"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex gap-1",
								children: Array.from({ length: 5 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-2", i < (appointment.report?.interest ?? 0) ? "bg-gold" : "bg-line") }, i))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted-foreground",
								children: [appointment.report.interest, "/5"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-navy",
							children: appointment.report.outcome
						}),
						appointment.report.nextAction ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: ["Suivi : ", appointment.report.nextAction]
						}) : null
					]
				}) : null,
				reporting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "space-y-4 border border-line p-4",
					onSubmit: (e) => {
						e.preventDefault();
						saveReport.mutate({
							id: appointment.id,
							report: {
								interest,
								outcome: outcome.trim() || "Visite effectuée",
								...nextAction.trim() ? { nextAction: nextAction.trim() } : {}
							}
						}, { onSuccess: () => setReporting(false) });
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Nouveau débrief"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground uppercase",
							children: "Intérêt du client"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex gap-1.5",
							children: Array.from({ length: 6 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setInterest(i),
								"aria-label": `Intérêt ${i}/5`,
								className: cn("size-8 border text-xs", i === 0 ? "" : "", i <= interest ? "border-gold bg-gold/15 text-gold" : "border-line text-muted-foreground"),
								children: i
							}, i))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground uppercase",
								children: "Conclusion"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: outcome,
								onChange: (e) => setOutcome(e.target.value),
								rows: 3,
								className: "border border-line bg-admin-bg/40 px-3 py-2 text-sm outline-none focus:border-gold"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground uppercase",
								children: "Prochaine action"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: nextAction,
								onChange: (e) => setNextAction(e.target.value),
								className: "h-11 border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminButton, {
							type: "submit",
							children: "Enregistrer le débrief"
						})
					]
				}) : null
			]
		}), editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppointmentFormModal, {
			appointment,
			clients: client ? [client] : [],
			properties: property ? [property] : [],
			agents: agent ? [agent] : [],
			onClose: () => setEditing(false)
		}) : null]
	});
}
function AppointmentFormModal({ appointment, clients, properties, agents, defaultAgentId, onClose }) {
	const isEdit = Boolean(appointment);
	const start = appointment ? new Date(appointment.startsAt) : new Date(SEED_NOW.getTime() + 864e5);
	const [kind, setKind] = (0, import_react.useState)(appointment?.kind ?? "viewing");
	const [title, setTitle] = (0, import_react.useState)(appointment?.title ?? "");
	const [date, setDate] = (0, import_react.useState)(toLocalInput(start));
	const [from, setFrom] = (0, import_react.useState)(toLocalTime(start));
	const [to, setTo] = (0, import_react.useState)(toLocalTime(new Date(start.getTime() + 3600 * 1e3)));
	const [clientId, setClientId] = (0, import_react.useState)(appointment?.clientId ?? "");
	const [propertyId, setPropertyId] = (0, import_react.useState)(appointment?.propertyId ?? "");
	const [agentId, setAgentId] = (0, import_react.useState)(appointment?.agentId ?? defaultAgentId ?? "");
	const [location, setLocation] = (0, import_react.useState)(appointment?.location ?? "");
	const create = useCreateAppointment();
	const update = useUpdateAppointment();
	const submit = async () => {
		const startsAt = (/* @__PURE__ */ new Date(`${date}T${from}`)).toISOString();
		const endsAt = (/* @__PURE__ */ new Date(`${date}T${to}`)).toISOString();
		if (isEdit && appointment) await update.mutateAsync({
			id: appointment.id,
			patch: {
				kind,
				title: title.trim() || "Rendez-vous",
				startsAt,
				endsAt,
				clientId: clientId || void 0,
				propertyId: propertyId || void 0,
				agentId: agentId || void 0,
				location: location.trim() || void 0
			}
		});
		else await create.mutateAsync({
			kind,
			title: title.trim() || "Rendez-vous",
			startsAt,
			endsAt,
			clientId: clientId || void 0,
			propertyId: propertyId || void 0,
			agentId: agentId || void 0,
			location: location.trim() || void 0
		});
		onClose();
	};
	const fieldCls = "h-11 border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
		open: true,
		onClose,
		title: isEdit ? "Modifier le rendez-vous" : "Nouveau rendez-vous",
		footer: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminButton, {
			variant: "outline",
			onClick: onClose,
			children: "Annuler"
		}, "cancel"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminButton, {
			onClick: submit,
			children: isEdit ? "Enregistrer" : "Créer"
		}, "save")],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground uppercase",
						children: "Type"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: kind,
						onChange: (e) => setKind(e.target.value),
						className: fieldCls,
						children: Object.keys(APPOINTMENT_LABELS).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: k,
							children: label(APPOINTMENT_LABELS, k)
						}, k))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground uppercase",
						children: "Titre"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: title,
						onChange: (e) => setTitle(e.target.value),
						placeholder: "Visite accompagnée",
						className: fieldCls
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground uppercase",
						children: "Date"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "date",
						value: date,
						onChange: (e) => setDate(e.target.value),
						className: fieldCls
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground uppercase",
						children: "Horaire"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "time",
								value: from,
								onChange: (e) => setFrom(e.target.value),
								className: fieldCls
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "–"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "time",
								value: to,
								onChange: (e) => setTo(e.target.value),
								className: fieldCls
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground uppercase",
						children: "Client"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: clientId,
						onChange: (e) => setClientId(e.target.value),
						className: fieldCls,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "—"
						}), clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: c.id,
							children: [
								c.firstName,
								" ",
								c.lastName
							]
						}, c.id))]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground uppercase",
						children: "Bien"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: propertyId,
						onChange: (e) => setPropertyId(e.target.value),
						className: fieldCls,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "—"
						}), properties.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: p.id,
							children: p.title
						}, p.id))]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground uppercase",
						children: "Agent"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: agentId,
						onChange: (e) => setAgentId(e.target.value),
						className: fieldCls,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "—"
						}), agents.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: a.id,
							children: a.name
						}, a.id))]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground uppercase",
						children: "Lieu"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: location,
						onChange: (e) => setLocation(e.target.value),
						placeholder: "Agadir",
						className: fieldCls
					})]
				})
			]
		})
	});
}
//#endregion
export { AgendaPage as component };
