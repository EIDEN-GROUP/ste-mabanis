import { i as __toESM } from "../_runtime.mjs";
import { i as cn } from "./utils-BTE8P7Sw.mjs";
import { o as require_jsx_runtime, r as useQuery, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { i as PIPELINE_STAGES, r as LEAD_SOURCES } from "./types-CH15H5aZ.mjs";
import { D as useCreateLead, F as useDeleteLead, T as useCreateClient, g as propertiesQuery, n as agentsQuery, o as clientsQuery, t as activitiesQuery, tt as useUpdateLead, u as leadsQuery, z as useMoveLead } from "./queries-Dq_yS5N4.mjs";
import { Ct as CalendarClock, D as Plus, K as Layers, S as Search, Tt as Building2, i as Wallet, j as Pencil, m as Target, p as Trash2, rt as Flame, s as UserRound, ut as Clock } from "../_libs/lucide-react.mjs";
import { D as toast$1, S as formatNumber, T as relativeTime, _ as TEMPERATURE_LABELS, h as STAGE_LABELS, i as Drawer, m as SOURCE_LABELS, n as AdminButton, s as Modal, w as label, x as formatMoney } from "./primitives-mgU9LIkI.mjs";
import { a as useCan, r as useAgentScope } from "./session-CjEBg8Yn.mjs";
import { a as TemperatureBadge, r as RoleBadge } from "./status-badge-NZE311zg.mjs";
import { t as ActivityTimeline } from "./clients-CQQrlhTO.mjs";
import { i as Pipeline } from "./pipeline-CH5Q0jP1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/crm-DF84MpES.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CrmPage() {
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const [creating, setCreating] = (0, import_react.useState)(false);
	const [search, setSearch] = (0, import_react.useState)("");
	const scope = useAgentScope();
	const { data: leads = [] } = useQuery(leadsQuery());
	const { data: clients = [] } = useQuery(clientsQuery({}));
	const { data: properties = [] } = useQuery(propertiesQuery({}));
	const { data: agents = [] } = useQuery(agentsQuery());
	const { data: activities = [] } = useQuery(activitiesQuery(selectedId ? { leadId: selectedId } : {}));
	const visibleLeads = scope ? leads.filter((l) => l.agentId === scope) : leads;
	const scopedClients = scope ? clients.filter((c) => c.agentId === scope) : clients;
	const clientsById = (0, import_react.useMemo)(() => new Map(clients.map((c) => [c.id, c])), [clients]);
	const propertiesById = (0, import_react.useMemo)(() => new Map(properties.map((p) => [p.id, p])), [properties]);
	const moveLead = useMoveLead();
	const filteredLeads = (0, import_react.useMemo)(() => {
		if (!search.trim()) return visibleLeads;
		const term = search.trim().toLowerCase();
		return visibleLeads.filter((l) => {
			const client = clientsById.get(l.clientId);
			const property = l.propertyId ? propertiesById.get(l.propertyId) : void 0;
			return [
				client?.firstName,
				client?.lastName,
				client?.email,
				property?.title,
				property?.reference
			].filter(Boolean).some((v) => String(v).toLowerCase().includes(term));
		});
	}, [
		visibleLeads,
		search,
		clientsById,
		propertiesById
	]);
	const hotCount = visibleLeads.filter((l) => l.temperature === "hot" && l.stage !== "won" && l.stage !== "lost").length;
	const openValue = visibleLeads.filter((l) => l.stage !== "won" && l.stage !== "lost").reduce((s, l) => s + l.value, 0);
	const selectedLead = visibleLeads.find((l) => l.id === selectedId) ?? null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "CRM"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "display mt-1 text-2xl",
						children: "Pipeline"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminButton, {
					onClick: () => setCreating(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "Nouveau lead"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-3 gap-3",
				children: [
					{
						icon: Layers,
						label: "Leads ouverts",
						value: formatNumber(visibleLeads.length)
					},
					{
						icon: Flame,
						label: "Chauds",
						value: formatNumber(hotCount)
					},
					{
						icon: Wallet,
						label: "Valeur pipeline",
						value: formatMoney(openValue, true)
					}
				].map(({ icon: Icon, label: l, value }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 border border-line bg-admin-surface px-3.5 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-9 shrink-0 place-items-center border border-line bg-sand text-gold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-[0.58rem] tracking-[0.14em] text-muted-foreground uppercase",
							children: l
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-base font-medium text-navy tabular-nums",
							children: value
						})]
					})]
				}, l))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "relative flex items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "search",
					value: search,
					onChange: (e) => setSearch(e.target.value),
					placeholder: "Chercher un client ou un bien…",
					"aria-label": "Rechercher dans le pipeline",
					className: "h-11 w-full border border-line bg-admin-surface pr-3 pl-9 text-sm outline-none placeholder:text-muted-foreground focus:border-gold"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pipeline, {
				leads: filteredLeads,
				clients: clientsById,
				properties: propertiesById,
				onMove: (leadId, stage) => moveLead.mutate({
					id: leadId,
					stage
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadDrawer, {
				lead: selectedLead,
				client: selectedLead ? clientsById.get(selectedLead.clientId) ?? null : null,
				property: selectedLead?.propertyId ? propertiesById.get(selectedLead.propertyId) ?? null : null,
				agents,
				activities: selectedLead ? activities.filter((a) => a.leadId === selectedLead.id) : [],
				onMove: (stage) => selectedLead && moveLead.mutate({
					id: selectedLead.id,
					stage
				}),
				onClose: () => setSelectedId(null)
			}),
			creating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadFormModal, {
				clients: scopedClients,
				properties,
				agents,
				defaultAgentId: scope ?? void 0,
				onClose: () => setCreating(false)
			}) : null
		]
	});
}
function LeadDrawer({ lead, client, property, agents, activities, onMove, onClose }) {
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [deleting, setDeleting] = (0, import_react.useState)(false);
	const updateLead = useUpdateLead();
	const deleteLead = useDeleteLead();
	const canDelete = useCan("lead.delete");
	(0, import_react.useEffect)(() => {
		setDeleting(false);
	}, [lead?.id]);
	if (!lead) return null;
	const agentName = agents.find((a) => a.id === lead.agentId)?.name ?? "—";
	const setTemperature = (t) => updateLead.mutate({
		id: lead.id,
		patch: { temperature: t }
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer, {
		open: Boolean(lead),
		onClose,
		title: client ? `${client.firstName} ${client.lastName}` : "Lead",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			canDelete ? deleting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminButton, {
				variant: "danger",
				onClick: () => deleteLead.mutate(lead.id, {
					onSuccess: () => {
						setDeleting(false);
						onClose();
						toast$1.success("Lead supprimé");
					},
					onError: (error) => {
						setDeleting(false);
						toast$1.error(error instanceof Error ? error.message.replace(/^\[supabase:[^\]]+\]\s*/, "") : "Suppression impossible");
					}
				}),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), "Confirmer la suppression"]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminButton, {
				variant: "danger",
				onClick: () => setDeleting(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), "Supprimer"]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminButton, {
				variant: "outline",
				onClick: () => setEditing((v) => !v),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" }), editing ? "Voir" : "Modifier"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminButton, {
				variant: "outline",
				className: "flex-1",
				onClick: onClose,
				children: "Fermer"
			})
		] }),
		children: editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadEditForm, {
			lead,
			agents,
			onDone: () => setEditing(false)
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "display grid size-14 shrink-0 place-items-center border border-line bg-sand text-xl text-navy",
						children: client ? `${client.firstName[0]}${client.lastName[0]}` : "?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "border border-line px-2 py-0.5 text-[0.58rem] tracking-[0.12em] text-muted-foreground uppercase",
								children: label(STAGE_LABELS, lead.stage)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemperatureBadge, {
								temperature: lead.temperature,
								score: lead.score
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: [
								label(SOURCE_LABELS, lead.source),
								" · ",
								agentName,
								" · ",
								relativeTime(lead.createdAt)
							]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "space-y-2.5",
					children: [
						property ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5 border border-line bg-admin-bg/50 px-3.5 py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-4 shrink-0 text-gold" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm font-medium text-navy",
										children: property.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: property.reference
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "shrink-0 text-sm font-medium text-blue tabular-nums",
									children: formatMoney(property.price, true)
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5 border border-line bg-admin-bg/50 px-3.5 py-3 text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-4 shrink-0 text-gold" }), "Aucun bien associé"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5 border border-line bg-admin-bg/50 px-3.5 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "size-4 shrink-0 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-sm text-navy/80",
								children: [
									"Valeur de l'opportunité :",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-navy tabular-nums",
										children: formatMoney(lead.value)
									})
								]
							})]
						}),
						lead.nextAction ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-2.5 border border-line bg-admin-bg/50 px-3.5 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "mt-0.5 size-4 shrink-0 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium text-navy",
									children: lead.nextAction
								}), lead.nextActionAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }), new Date(lead.nextActionAt).toLocaleString("fr-FR", {
										day: "2-digit",
										month: "short",
										hour: "2-digit",
										minute: "2-digit"
									})]
								}) : null]
							})]
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow mb-2.5",
					children: "Étape du pipeline"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-2",
					children: PIPELINE_STAGES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => onMove(s),
						"aria-pressed": lead.stage === s,
						className: cn("min-h-9 border px-2.5 py-1.5 text-[0.66rem] tracking-[0.1em] uppercase transition-colors", lead.stage === s ? "border-gold bg-gold/10 text-navy" : "border-line text-muted-foreground hover:border-gold/60"),
						children: label(STAGE_LABELS, s)
					}, s))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow mb-2.5",
					children: "Température"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-2",
					children: [
						"cold",
						"warm",
						"hot"
					].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setTemperature(t),
						"aria-pressed": lead.temperature === t,
						className: cn("min-h-10 border text-[0.66rem] tracking-[0.12em] uppercase transition-colors", lead.temperature === t ? "border-gold bg-gold/10 text-navy" : "border-line text-muted-foreground hover:border-gold/60"),
						children: label(TEMPERATURE_LABELS, t)
					}, t))
				})] }),
				client ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow mb-2.5",
					children: "Client"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5 border border-line bg-admin-bg/50 px-3.5 py-3 text-sm text-navy/80",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-3.5 shrink-0 text-gold" }), client.email]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "size-3.5 shrink-0 text-gold" }), client.phone || "Sans téléphone"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-1.5",
							children: client.roles.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleBadge, { role: r }, r))
						})
					]
				})] }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow mb-3",
					children: "Activité"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityTimeline, { activities })] })
			]
		})
	});
}
function LeadEditForm({ lead, agents, onDone }) {
	const [form, setForm] = (0, import_react.useState)({
		score: String(lead.score),
		temperature: lead.temperature,
		source: lead.source,
		value: String(lead.value),
		nextAction: lead.nextAction ?? "",
		agentId: lead.agentId
	});
	const updateLead = useUpdateLead();
	const submit = async () => {
		await updateLead.mutateAsync({
			id: lead.id,
			patch: {
				score: Number(form.score) || 0,
				temperature: form.temperature,
				source: form.source,
				value: Number(form.value) || 0,
				nextAction: form.nextAction.trim() || void 0,
				agentId: form.agentId || void 0
			}
		});
		toast$1.success("Lead mis à jour");
		onDone();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase",
					children: "Score (0-100)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "number",
					value: form.score,
					onChange: (e) => setForm((f) => ({
						...f,
						score: e.target.value
					})),
					className: "h-11 border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase",
					children: "Température"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: form.temperature,
					onChange: (e) => setForm((f) => ({
						...f,
						temperature: e.target.value
					})),
					className: "h-11 border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold",
					children: [
						"cold",
						"warm",
						"hot"
					].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: t,
						children: label(TEMPERATURE_LABELS, t)
					}, t))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase",
					children: "Source"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: form.source,
					onChange: (e) => setForm((f) => ({
						...f,
						source: e.target.value
					})),
					className: "h-11 border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold",
					children: LEAD_SOURCES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: s,
						children: label(SOURCE_LABELS, s)
					}, s))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase",
					children: "Valeur (MAD)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "number",
					value: form.value,
					onChange: (e) => setForm((f) => ({
						...f,
						value: e.target.value
					})),
					className: "h-11 border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase",
					children: "Prochaine action"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: form.nextAction,
					onChange: (e) => setForm((f) => ({
						...f,
						nextAction: e.target.value
					})),
					placeholder: "Ex. Rappeler pour fixer la visite",
					className: "h-11 border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase",
					children: "Agent"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: form.agentId,
					onChange: (e) => setForm((f) => ({
						...f,
						agentId: e.target.value
					})),
					className: "h-11 border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold",
					children: agents.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: a.id,
						children: a.name
					}, a.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminButton, {
				className: "w-full",
				onClick: () => void submit(),
				children: "Enregistrer"
			})
		]
	});
}
function LeadFormModal({ clients, properties, agents, defaultAgentId, onClose }) {
	const [newClient, setNewClient] = (0, import_react.useState)(false);
	const [clientId, setClientId] = (0, import_react.useState)(clients[0]?.id ?? "");
	const [quick, setQuick] = (0, import_react.useState)({
		firstName: "",
		lastName: "",
		email: "",
		phone: ""
	});
	const [propertyId, setPropertyId] = (0, import_react.useState)("");
	const [source, setSource] = (0, import_react.useState)("site_web");
	const [temperature, setTemperature] = (0, import_react.useState)("cold");
	const [score, setScore] = (0, import_react.useState)("30");
	const [nextAction, setNextAction] = (0, import_react.useState)("Premier contact téléphonique");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const createLead = useCreateLead();
	const createClient = useCreateClient();
	const selectedProperty = properties.find((p) => p.id === propertyId);
	const submit = async () => {
		let targetClientId = clientId;
		if (newClient) {
			if (!quick.firstName.trim() || !quick.email.trim()) {
				toast$1.error("Client incomplet", "Prénom et email sont requis pour créer le client.");
				return;
			}
			targetClientId = (await createClient.mutateAsync({
				firstName: quick.firstName.trim(),
				lastName: quick.lastName.trim(),
				email: quick.email.trim(),
				phone: quick.phone.trim(),
				source: "site_web",
				agentId: defaultAgentId ?? agents[0]?.id
			})).id;
		}
		if (!targetClientId) {
			toast$1.error("Client requis", "Choisissez un client ou créez-en un.");
			return;
		}
		const payload = {
			clientId: targetClientId,
			propertyId: propertyId || void 0,
			source,
			temperature,
			score: Number(score) || 0,
			value: selectedProperty?.price ?? 0,
			agentId: defaultAgentId ?? agents[0]?.id,
			nextAction: nextAction.trim() || void 0,
			stage: "new"
		};
		setSaving(true);
		try {
			await createLead.mutateAsync(payload);
			toast$1.success("Lead créé", "Une tâche de premier contact a été planifiée.");
			onClose();
		} catch (err) {
			toast$1.error("Création impossible", err instanceof Error ? err.message : void 0);
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
		open: true,
		onClose,
		title: "Nouveau lead",
		description: "Le lead démarre en « Nouveau » avec une tâche de premier contact sous 24 h.",
		size: "md",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminButton, {
			variant: "outline",
			onClick: onClose,
			children: "Annuler"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminButton, {
			onClick: () => void submit(),
			disabled: saving,
			children: saving ? "Création…" : "Créer le lead"
		})] }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase",
							children: "Client"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setNewClient((v) => !v),
							className: "text-[0.68rem] font-medium text-navy underline decoration-gold decoration-2 underline-offset-2",
							children: newClient ? "Choisir un client existant" : "Créer un nouveau client"
						})]
					}), newClient ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [
							{
								key: "firstName",
								label: "Prénom *",
								type: "text"
							},
							{
								key: "lastName",
								label: "Nom",
								type: "text"
							},
							{
								key: "email",
								label: "Email *",
								type: "email"
							},
							{
								key: "phone",
								label: "Téléphone",
								type: "tel"
							}
						].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase",
								children: f.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: f.type,
								value: quick[f.key],
								onChange: (e) => setQuick((q) => ({
									...q,
									[f.key]: e.target.value
								})),
								className: "h-11 border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold"
							})]
						}, f.key))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: clientId,
						onChange: (e) => setClientId(e.target.value),
						className: "h-11 w-full border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold",
						children: clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: c.id,
							children: [
								c.firstName,
								" ",
								c.lastName,
								" — ",
								c.email
							]
						}, c.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase",
						children: "Bien concerné"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: propertyId,
						onChange: (e) => setPropertyId(e.target.value),
						className: "h-11 border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Sans bien associé"
						}), properties.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: p.id,
							children: [
								p.reference,
								" — ",
								p.title
							]
						}, p.id))]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase",
							children: "Source"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: source,
							onChange: (e) => setSource(e.target.value),
							className: "h-11 border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold",
							children: LEAD_SOURCES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s,
								children: label(SOURCE_LABELS, s)
							}, s))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase",
							children: "Température"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: temperature,
							onChange: (e) => setTemperature(e.target.value),
							className: "h-11 border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold",
							children: [
								"cold",
								"warm",
								"hot"
							].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: t,
								children: label(TEMPERATURE_LABELS, t)
							}, t))
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase",
							children: "Score"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							value: score,
							onChange: (e) => setScore(e.target.value),
							className: "h-11 border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase",
							children: ["Valeur ", selectedProperty ? "· " + formatMoney(selectedProperty.price, true) : ""]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: selectedProperty ? String(selectedProperty.price) : "0",
							disabled: true,
							className: "h-11 border border-line bg-admin-bg/40 px-3 text-sm text-muted-foreground outline-none"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase",
						children: "Prochaine action"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: nextAction,
						onChange: (e) => setNextAction(e.target.value),
						className: "h-11 border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold"
					})]
				})
			]
		})
	});
}
//#endregion
export { CrmPage as component };
