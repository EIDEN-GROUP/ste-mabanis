import { i as __toESM } from "../_runtime.mjs";
import { i as cn } from "./utils-BTE8P7Sw.mjs";
import { o as require_jsx_runtime, r as useQuery, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { A as useCreateTask, g as propertiesQuery, it as useUpdateTask, n as agentsQuery, o as clientsQuery, u as leadsQuery, v as tasksQuery } from "./queries-Dq_yS5N4.mjs";
import { Ct as CalendarClock, D as Plus, Ft as AlarmClock, Mt as ArrowRight, Nt as ArrowLeft, h as StickyNote, vt as Check } from "../_libs/lucide-react.mjs";
import { T as relativeTime, a as EmptyState, b as formatDate, c as PRIORITY_LABELS, g as StatCard, n as AdminButton, p as SEED_NOW, s as Modal, w as label } from "./primitives-mgU9LIkI.mjs";
import { r as useAgentScope } from "./session-CjEBg8Yn.mjs";
import { t as PriorityBadge } from "./status-badge-NZE311zg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/taches-hszUzKoh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUS_LABELS = {
	todo: "À faire",
	doing: "En cours",
	done: "Terminées"
};
var ENTITY_LABELS = {
	property: "Bien",
	client: "Client",
	lead: "Lead",
	appointment: "RDV"
};
function TasksPage() {
	const [creating, setCreating] = (0, import_react.useState)(false);
	const scope = useAgentScope();
	const { data: tasks = [] } = useQuery(tasksQuery());
	const { data: agents = [] } = useQuery(agentsQuery());
	const { data: leads = [] } = useQuery(leadsQuery());
	const { data: clients = [] } = useQuery(clientsQuery({}));
	const { data: properties = [] } = useQuery(propertiesQuery({}));
	const visibleTasks = scope ? tasks.filter((t) => t.assigneeId === scope) : tasks;
	const agentsById = (0, import_react.useMemo)(() => new Map(agents.map((a) => [a.id, a])), [agents]);
	const leadsById = (0, import_react.useMemo)(() => new Map(leads.map((l) => [l.id, l])), [leads]);
	const clientsById = (0, import_react.useMemo)(() => new Map(clients.map((c) => [c.id, c])), [clients]);
	const propertiesById = (0, import_react.useMemo)(() => new Map(properties.map((p) => [p.id, p])), [properties]);
	const open = visibleTasks.filter((t) => t.status !== "done");
	const overdue = open.filter((t) => t.dueAt && new Date(t.dueAt) < SEED_NOW);
	const today = open.filter((t) => {
		if (!t.dueAt) return false;
		const d = new Date(t.dueAt);
		return d.getFullYear() === SEED_NOW.getFullYear() && d.getMonth() === SEED_NOW.getMonth() && d.getDate() === SEED_NOW.getDate();
	});
	const done = visibleTasks.filter((t) => t.status === "done");
	const byStatus = (0, import_react.useMemo)(() => ({
		todo: visibleTasks.filter((t) => t.status === "todo").sort((a, b) => (a.dueAt ?? "9999").localeCompare(b.dueAt ?? "9999")),
		doing: visibleTasks.filter((t) => t.status === "doing"),
		done: visibleTasks.filter((t) => t.status === "done")
	}), [visibleTasks]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "En retard",
						value: String(overdue.length),
						hint: "Échéance dépassée",
						icon: AlarmClock,
						index: 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Pour aujourd'hui",
						value: String(today.length),
						hint: "À traiter ce jour",
						icon: CalendarClock,
						index: 1
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Ouvertes",
						value: String(open.length),
						hint: "À faire + en cours",
						icon: StickyNote,
						index: 2
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Terminées",
						value: String(done.length),
						hint: "Au total",
						icon: Check,
						index: 3
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Tableau des tâches"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Les rappels automatiques (premier contact, débrief de visite) apparaissent ici."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminButton, {
					onClick: () => setCreating(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), " Nouvelle tâche"]
				})]
			}),
			tasks.length === 0 || visibleTasks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: tasks.length === 0 ? "Aucune tâche" : "Aucune tâche dans cet espace",
				description: tasks.length === 0 ? "Créez la première tâche de l'agence ou laissez les automatismes la créer pour vous." : "Les tâches attribuées aux autres agents ne sont pas visibles ici.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminButton, {
					onClick: () => setCreating(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), " Créer une tâche"]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [
					"todo",
					"doing",
					"done"
				].map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col border border-line bg-admin-surface",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-line px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[0.62rem] tracking-[0.16em] text-navy uppercase",
							children: STATUS_LABELS[status]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground tabular-nums",
							children: byStatus[status].length
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-1 flex-col gap-3 p-3",
						children: byStatus[status].length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-8 text-center text-xs text-muted-foreground italic",
							children: status === "done" ? "Rien de terminé." : "Aucune tâche."
						}) : byStatus[status].map((task, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskCard, {
							task,
							index: i,
							agentName: agentsById.get(task.assigneeId)?.name,
							entityName: entityName(task, {
								leadsById,
								clientsById,
								propertiesById
							})
						}, task.id))
					})]
				}, status))
			}),
			creating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskFormModal, {
				agents,
				leads,
				clients,
				properties,
				defaultAssigneeId: scope ?? void 0,
				onClose: () => setCreating(false)
			}) : null
		]
	});
}
function entityName(task, maps) {
	const entity = task.entity;
	if (!entity) return null;
	if (entity.kind === "lead") {
		const l = maps.leadsById.get(entity.id);
		if (!l) return null;
		const c = maps.clientsById.get(l.clientId);
		return c ? `${c.firstName} ${c.lastName}` : `Lead ${entity.id}`;
	}
	if (entity.kind === "client") {
		const c = maps.clientsById.get(entity.id);
		return c ? `${c.firstName} ${c.lastName}` : null;
	}
	if (entity.kind === "property") return maps.propertiesById.get(entity.id)?.title ?? null;
	return null;
}
function TaskCard({ task, index, agentName, entityName }) {
	const update = useUpdateTask();
	const overdue = task.status !== "done" && (task.dueAt ? new Date(task.dueAt) < SEED_NOW : false);
	const entity = task.entity;
	const patch = (p) => update.mutate({
		id: task.id,
		patch: p
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		style: { ["--i"]: index },
		className: cn("stagger-in group border border-line bg-admin-surface p-3.5 transition-colors hover:border-gold/60", task.status === "done" && "opacity-60"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-2.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => patch({ status: task.status === "done" ? "todo" : "done" }),
				"aria-label": task.status === "done" ? "Rouvrir la tâche" : "Marquer terminée",
				className: cn("mt-0.5 grid size-5 shrink-0 place-items-center border transition-colors", task.status === "done" ? "border-positive bg-positive text-white" : "border-line text-transparent hover:border-gold group-hover:text-muted-foreground/50"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: cn("text-sm font-medium text-navy", task.status === "done" && "line-through"),
					children: task.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, { priority: task.priority }),
						entity ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "border border-line px-1.5 py-0.5 text-[0.55rem] tracking-[0.12em] uppercase",
							children: label(ENTITY_LABELS, entity.kind)
						}) : null,
						entityName ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: entityName
						}) : null,
						agentName ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums",
							children: ["· ", agentName]
						}) : null
					]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2.5 flex items-center justify-between border-t border-line pt-2.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: cn("flex items-center gap-1.5 text-xs tabular-nums", overdue ? "text-negative" : "text-muted-foreground"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlarmClock, { className: "size-3.5" }), task.dueAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [formatDate(task.dueAt), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-muted-foreground/70",
					children: ["· ", relativeTime(task.dueAt)]
				})] }) : "Sans échéance"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1",
				children: [
					task.status === "todo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => patch({ status: "doing" }),
						"aria-label": "Passer en cours",
						className: "grid size-7 place-items-center border border-line text-muted-foreground transition-colors hover:border-gold hover:text-navy",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })
					}) : null,
					task.status === "doing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => patch({ status: "todo" }),
						"aria-label": "Revenir à faire",
						className: "grid size-7 place-items-center border border-line text-muted-foreground transition-colors hover:border-gold hover:text-navy",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5" })
					}) : null,
					task.status === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => patch({ status: "doing" }),
						"aria-label": "Reprendre la tâche",
						className: "grid size-7 place-items-center border border-line text-muted-foreground transition-colors hover:border-gold hover:text-navy",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })
					}) : null
				]
			})]
		})]
	});
}
function TaskFormModal({ agents, leads, clients, properties, defaultAssigneeId, onClose }) {
	const [title, setTitle] = (0, import_react.useState)("");
	const [priority, setPriority] = (0, import_react.useState)("normal");
	const [dueAt, setDueAt] = (0, import_react.useState)("");
	const [assigneeId, setAssigneeId] = (0, import_react.useState)(defaultAssigneeId ?? "");
	const [entityKind, setEntityKind] = (0, import_react.useState)("none");
	const [entityId, setEntityId] = (0, import_react.useState)("");
	const create = useCreateTask();
	const entityOptions = entityKind === "lead" ? leads.map((l) => {
		const c = clients.find((x) => x.id === l.clientId);
		return {
			id: l.id,
			label: c ? `${c.firstName} ${c.lastName}` : `Lead ${l.id}`
		};
	}) : entityKind === "client" ? clients.map((c) => ({
		id: c.id,
		label: `${c.firstName} ${c.lastName}`
	})) : properties.map((p) => ({
		id: p.id,
		label: p.title
	}));
	const submit = async () => {
		if (!title.trim()) return;
		await create.mutateAsync({
			title: title.trim(),
			priority,
			dueAt: dueAt ? (/* @__PURE__ */ new Date(`${dueAt}T12:00:00`)).toISOString() : void 0,
			assigneeId: assigneeId || void 0,
			entity: entityKind !== "none" && entityId ? {
				kind: entityKind,
				id: entityId
			} : void 0
		});
		onClose();
	};
	const fieldCls = "h-11 border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
		open: true,
		onClose,
		title: "Nouvelle tâche",
		description: "Attribuez une échéance et un agent ; la tâche apparaît immédiatement sur le tableau.",
		footer: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminButton, {
			variant: "outline",
			onClick: onClose,
			children: "Annuler"
		}, "cancel"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminButton, {
			disabled: !title.trim(),
			onClick: submit,
			children: "Créer"
		}, "save")],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5 sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground uppercase",
						children: "Titre"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: title,
						onChange: (e) => setTitle(e.target.value),
						placeholder: "Ex. Relancer M. Alaoui pour les pièces du dossier",
						className: fieldCls
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground uppercase",
						children: "Priorité"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: priority,
						onChange: (e) => setPriority(e.target.value),
						className: fieldCls,
						children: Object.keys(PRIORITY_LABELS).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: p,
							children: label(PRIORITY_LABELS, p)
						}, p))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground uppercase",
						children: "Échéance"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "date",
						value: dueAt,
						onChange: (e) => setDueAt(e.target.value),
						className: fieldCls
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground uppercase",
						children: "Agent"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: assigneeId,
						onChange: (e) => setAssigneeId(e.target.value),
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
						children: "Rattacher à"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: entityKind,
						onChange: (e) => {
							setEntityKind(e.target.value);
							setEntityId("");
						},
						className: fieldCls,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "none",
								children: "Aucun"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "lead",
								children: "Lead"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "client",
								children: "Client"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "property",
								children: "Bien"
							})
						]
					})]
				}),
				entityKind !== "none" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5 sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground uppercase",
						children: "Élément"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: entityId,
						onChange: (e) => setEntityId(e.target.value),
						className: fieldCls,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Sélectionner…"
						}), entityOptions.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: o.id,
							children: o.label
						}, o.id))]
					})]
				}) : null
			]
		})
	});
}
//#endregion
export { TasksPage as component };
