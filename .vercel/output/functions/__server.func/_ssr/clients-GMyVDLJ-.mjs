import { i as __toESM } from "../_runtime.mjs";
import { i as cn } from "./utils-BWXQYj3d.mjs";
import { o as require_jsx_runtime, r as useQuery, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { N as useDeleteClient, T as useCreateClient, a as clientQuery, et as useUpdateClient, n as agentsQuery, o as clientsQuery, r as appointmentsQuery, t as activitiesQuery, u as leadsQuery } from "./queries-Dq_yS5N4.mjs";
import { D as Plus, H as Mail, I as MessageSquare, It as Activity, O as Phone, S as Search, St as CalendarDays, Tt as Building2, U as MailOpen, V as MapPin, W as ListChecks, _ as SquareKanban, at as FilePlusCorner, et as Handshake, h as StickyNote, i as Wallet, j as Pencil, k as PhoneCall, p as Trash2, st as Eye } from "../_libs/lucide-react.mjs";
import { D as toast$1, S as formatNumber, T as relativeTime, _ as TEMPERATURE_LABELS, a as EmptyState, f as ROLE_LABELS, i as Drawer, m as SOURCE_LABELS, n as AdminButton, s as Modal, w as label, x as formatMoney } from "./primitives-BRdCR_bJ.mjs";
import { a as useCan, r as useAgentScope } from "./session-BlPZ3SJa.mjs";
import { t as DataTable } from "./data-table-D16aF3Go.mjs";
import { a as TemperatureBadge, r as RoleBadge } from "./status-badge-Dgx8kPC0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/clients-GMyVDLJ-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ROLES = [
	"buyer",
	"seller",
	"tenant",
	"landlord",
	"investor"
];
var TEMPS = [
	"cold",
	"warm",
	"hot"
];
var ACTIVITY_ICONS = {
	call: PhoneCall,
	email: MailOpen,
	whatsapp: MessageSquare,
	viewing: Eye,
	offer: Handshake,
	stage_change: ListChecks,
	document: FilePlusCorner,
	note: StickyNote
};
function ClientsPage() {
	const [query, setQuery] = (0, import_react.useState)({});
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const [creating, setCreating] = (0, import_react.useState)(false);
	const scope = useAgentScope();
	const { data: clients = [], isPending } = useQuery(clientsQuery(query));
	const { data: agents = [] } = useQuery(agentsQuery());
	const { data: selected } = useQuery(clientQuery(selectedId ?? ""));
	const { data: activities = [] } = useQuery(activitiesQuery(selectedId ? { clientId: selectedId } : {}));
	const { data: leads = [] } = useQuery(leadsQuery());
	const { data: appointments = [] } = useQuery(appointmentsQuery());
	const agentName = (id) => agents.find((a) => a.id === id)?.name ?? "—";
	const visibleClients = scope ? clients.filter((c) => c.agentId === scope) : clients;
	const toggle = (key, value) => {
		const current = query[key] ?? [];
		const next = current.includes(value) ? current.filter((x) => x !== value) : [...current, value];
		setQuery((q) => ({
			...q,
			[key]: next.length ? next : void 0
		}));
	};
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
						children: isPending ? "…" : `${formatNumber(visibleClients.length)} client${visibleClients.length > 1 ? "s" : ""}`
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminButton, {
					onClick: () => setCreating(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "Nouveau client"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "relative flex items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "search",
						value: query.search ?? "",
						onChange: (e) => setQuery((q) => ({
							...q,
							search: e.target.value || void 0
						})),
						placeholder: "Nom, email, téléphone…",
						"aria-label": "Rechercher un client",
						className: "h-11 w-full border border-line bg-admin-surface pr-3 pl-9 text-sm outline-none placeholder:text-muted-foreground focus:border-gold"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-x-6 gap-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "mr-1 text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase",
							children: "Rôles"
						}), ROLES.map((r) => {
							const on = query.roles?.includes(r) ?? false;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => toggle("roles", r),
								"aria-pressed": on,
								className: cn("min-h-8 border px-2.5 py-1 text-[0.66rem] tracking-[0.1em] uppercase transition-colors", on ? "border-gold bg-gold/10 text-navy" : "border-line text-muted-foreground hover:border-gold/60"),
								children: label(ROLE_LABELS, r)
							}, r);
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "mr-1 text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase",
							children: "Température"
						}), TEMPS.map((t) => {
							const on = query.temperature?.includes(t) ?? false;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => toggle("temperature", t),
								"aria-pressed": on,
								className: cn("min-h-8 border px-2.5 py-1 text-[0.66rem] tracking-[0.1em] uppercase transition-colors", on ? "border-gold bg-gold/10 text-navy" : "border-line text-muted-foreground hover:border-gold/60"),
								children: label(TEMPERATURE_LABELS, t)
							}, t);
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
				rows: visibleClients,
				columns: [
					{
						id: "client",
						header: "Client",
						primary: true,
						sortValue: (c) => `${c.lastName} ${c.firstName}`,
						cell: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "display grid size-10 shrink-0 place-items-center border border-line bg-sand text-sm text-navy",
								children: [c.firstName[0], c.lastName[0]]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "block truncate font-medium text-navy",
									children: [
										c.firstName,
										" ",
										c.lastName
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate text-xs text-muted-foreground",
									children: c.email
								})]
							})]
						})
					},
					{
						id: "roles",
						header: "Rôles",
						sortValue: (c) => c.roles.join(","),
						cell: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex flex-wrap gap-1",
							children: c.roles.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleBadge, { role: r }, r))
						})
					},
					{
						id: "temperature",
						header: "Score",
						hideBelow: "sm",
						sortValue: (c) => c.score,
						cell: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemperatureBadge, {
							temperature: c.temperature,
							score: c.score
						})
					},
					{
						id: "budget",
						header: "Budget",
						hideBelow: "lg",
						sortValue: (c) => c.budgetMin ?? 0,
						cell: (c) => c.budgetMin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm text-navy/80 tabular-nums",
							children: [
								formatMoney(c.budgetMin, true),
								" – ",
								formatMoney(c.budgetMax ?? 0, true)
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted-foreground",
							children: "—"
						})
					},
					{
						id: "source",
						header: "Source",
						hideBelow: "xl",
						sortValue: (c) => c.source,
						cell: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-navy/80",
							children: label(SOURCE_LABELS, c.source)
						})
					},
					{
						id: "contact",
						header: "Dernier contact",
						hideBelow: "md",
						sortValue: (c) => c.lastContactedAt ?? "",
						cell: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted-foreground",
							children: c.lastContactedAt ? relativeTime(c.lastContactedAt) : "Jamais"
						})
					}
				],
				getRowId: (c) => c.id,
				onRowClick: (c) => setSelectedId(c.id),
				isLoading: isPending,
				empty: {
					title: "Aucun client trouvé",
					description: "Modifiez vos filtres ou créez une nouvelle fiche client.",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminButton, {
						onClick: () => setCreating(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "Nouveau client"]
					})
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientDrawer, {
				client: selected ?? null,
				agents,
				agentName,
				activities,
				leads: leads.filter((l) => l.clientId === selectedId),
				appointments: appointments.filter((a) => a.clientId === selectedId),
				onClose: () => setSelectedId(null)
			}),
			creating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientFormModal, {
				agents: agents.map((a) => ({
					id: a.id,
					name: a.name
				})),
				defaultAgentId: scope ?? void 0,
				onClose: () => setCreating(false)
			}) : null
		]
	});
}
function ClientDrawer({ client, agents, agentName, activities, leads, appointments, onClose }) {
	const [tab, setTab] = (0, import_react.useState)("activity");
	const updateClient = useUpdateClient();
	const deleteClient = useDeleteClient();
	const canDelete = useCan("client.delete");
	const [deleting, setDeleting] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setDeleting(false);
	}, [client?.id]);
	if (!client) return null;
	const saveTemperature = (t) => updateClient.mutate({
		id: client.id,
		patch: { temperature: t }
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer, {
		open: Boolean(client),
		onClose,
		title: `${client.firstName} ${client.lastName}`,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			canDelete ? deleting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminButton, {
				variant: "danger",
				onClick: () => deleteClient.mutate(client.id, {
					onSuccess: () => {
						setDeleting(false);
						onClose();
						toast$1.success("Client supprimé");
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
				onClick: () => setTab("edit"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" }), "Modifier"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminButton, {
				variant: "outline",
				className: "flex-1",
				onClick: onClose,
				children: "Fermer"
			})
		] }),
		children: tab === "edit" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientFormModal, {
			client,
			agents: agents.map((a) => ({
				id: a.id,
				name: a.name
			})),
			onClose: () => setTab("activity")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "display grid size-14 shrink-0 place-items-center border border-line bg-sand text-xl text-navy",
							children: [client.firstName[0], client.lastName[0]]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: client.roles.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleBadge, { role: r }, r))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-xs text-muted-foreground",
								children: [
									label(SOURCE_LABELS, client.source),
									client.city ? ` · ${client.city}` : "",
									" · ",
									agentName(client.agentId)
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemperatureBadge, {
							temperature: client.temperature,
							score: client.score
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "grid grid-cols-1 gap-2.5 sm:grid-cols-2",
					children: [
						{
							icon: Mail,
							value: client.email
						},
						{
							icon: Phone,
							value: client.phone || "—"
						},
						{
							icon: MapPin,
							value: client.city ?? "—"
						},
						{
							icon: Wallet,
							value: client.budgetMin ? `${formatMoney(client.budgetMin)} – ${formatMoney(client.budgetMax ?? 0)}` : "Budget non renseigné"
						}
					].map(({ icon: Icon, value }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5 border border-line bg-admin-bg/50 px-3 py-2.5 text-sm text-navy/80",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5 shrink-0 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-0 truncate",
							children: value
						})]
					}, value))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow mb-2.5",
					children: "Température"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-2",
					children: TEMPS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => saveTemperature(t),
						"aria-pressed": client.temperature === t,
						className: cn("min-h-10 border text-[0.66rem] tracking-[0.12em] uppercase transition-colors", client.temperature === t ? "border-gold bg-gold/10 text-navy" : "border-line text-muted-foreground hover:border-gold/60"),
						children: label(TEMPERATURE_LABELS, t)
					}, t))
				})] }),
				client.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "border border-line bg-admin-bg/50 px-3.5 py-3 text-sm text-navy/80",
					children: client.notes
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2",
					children: [
						{
							key: "activity",
							label: "Activité",
							icon: Activity
						},
						{
							key: "leads",
							label: "Leads",
							icon: SquareKanban
						},
						{
							key: "appointments",
							label: "RDV",
							icon: CalendarDays
						}
					].map(({ key, label: l, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setTab(key),
						"aria-pressed": tab === key,
						className: cn("inline-flex min-h-9 flex-1 items-center justify-center gap-1.5 border text-[0.66rem] tracking-[0.12em] uppercase transition-colors", tab === key ? "border-gold bg-gold/10 text-navy" : "border-line text-muted-foreground hover:border-gold/60"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" }), l]
					}, key))
				}),
				tab === "activity" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityTimeline, { activities }) : tab === "leads" ? leads.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: leads.map((lead) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3 border border-line bg-admin-bg/50 px-3.5 py-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-4 shrink-0 text-gold" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-0 flex-1 truncate text-navy/80",
								children: lead.nextAction ?? "Lead sans prochaine action"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemperatureBadge, {
								temperature: lead.temperature,
								score: lead.score
							})
						]
					}, lead.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "Aucun lead",
					description: "Ce client n'a pas encore de lead ouvert."
				}) : appointments.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: appointments.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3 border border-line bg-admin-bg/50 px-3.5 py-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-4 shrink-0 text-gold" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-0 flex-1 truncate text-navy/80",
								children: a.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground tabular-nums",
								children: new Date(a.startsAt).toLocaleDateString("fr-FR", {
									day: "2-digit",
									month: "short"
								})
							})
						]
					}, a.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "Aucun rendez-vous",
					description: "Aucun rendez-vous enregistré pour ce client."
				})
			]
		})
	});
}
function ActivityTimeline({ activities }) {
	if (!activities.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "Aucune activité",
		description: "La timeline se remplit au fil des échanges."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "relative space-y-4 border-l border-line pl-5",
		children: activities.map((a) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute top-0.5 -left-[1.62rem] grid size-6 place-items-center border border-line bg-admin-surface text-gold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ACTIVITY_ICONS[a.kind] ?? StickyNote, { className: "size-3" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-navy",
						children: a.subject
					}),
					a.body ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-xs leading-relaxed text-muted-foreground",
						children: a.body
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[0.62rem] text-muted-foreground/70",
						children: relativeTime(a.createdAt)
					})
				]
			}, a.id);
		})
	});
}
function ClientFormModal({ client, agents, defaultAgentId, onClose }) {
	const [form, setForm] = (0, import_react.useState)(() => ({
		firstName: client?.firstName ?? "",
		lastName: client?.lastName ?? "",
		email: client?.email ?? "",
		phone: client?.phone ?? "",
		roles: client?.roles ?? ["buyer"],
		temperature: client?.temperature ?? "cold",
		score: client ? String(client.score) : "20",
		source: client?.source ?? "site_web",
		city: client?.city ?? "",
		budgetMin: client?.budgetMin ? String(client.budgetMin) : "",
		budgetMax: client?.budgetMax ? String(client.budgetMax) : "",
		notes: client?.notes ?? "",
		agentId: client?.agentId ?? defaultAgentId ?? agents[0]?.id ?? ""
	}));
	const [saving, setSaving] = (0, import_react.useState)(false);
	const createClient = useCreateClient();
	const updateClient = useUpdateClient();
	const set = (key, value) => setForm((f) => ({
		...f,
		[key]: value
	}));
	const toggleRole = (r) => {
		const current = form.roles;
		const next = current.includes(r) ? current.filter((x) => x !== r) : [...current, r];
		set("roles", next.length ? next : ["buyer"]);
	};
	const submit = async () => {
		if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim()) {
			toast$1.error("Informations requises", "Nom, prénom et email sont obligatoires.");
			return;
		}
		const payload = {
			firstName: form.firstName.trim(),
			lastName: form.lastName.trim(),
			email: form.email.trim(),
			phone: form.phone.trim(),
			roles: form.roles,
			temperature: form.temperature,
			score: Number(form.score) || 0,
			source: form.source,
			city: form.city.trim() || void 0,
			budgetMin: form.budgetMin ? Number(form.budgetMin) : void 0,
			budgetMax: form.budgetMax ? Number(form.budgetMax) : void 0,
			notes: form.notes.trim() || void 0,
			agentId: form.agentId || void 0
		};
		setSaving(true);
		try {
			if (client) {
				await updateClient.mutateAsync({
					id: client.id,
					patch: payload
				});
				toast$1.success("Client mis à jour");
			} else {
				await createClient.mutateAsync(payload);
				toast$1.success("Client créé");
			}
			onClose();
		} catch (err) {
			toast$1.error("Enregistrement impossible", err instanceof Error ? err.message : void 0);
		} finally {
			setSaving(false);
		}
	};
	const field = (lbl, value, onChange, opts = {}) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex flex-col gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase",
			children: [lbl, opts.required ? " *" : ""]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: opts.type ?? "text",
			value,
			onChange: (e) => onChange(e.target.value),
			required: opts.required,
			placeholder: opts.placeholder,
			className: "h-11 border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
		open: true,
		onClose,
		title: client ? "Modifier le client" : "Nouveau client",
		description: client ? "Les modifications alimentent la timeline." : "La fiche démarre froide, le score s'affine au fil des échanges.",
		size: "lg",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminButton, {
			variant: "outline",
			onClick: onClose,
			children: "Annuler"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminButton, {
			onClick: () => void submit(),
			disabled: saving,
			children: saving ? "Enregistrement…" : client ? "Enregistrer" : "Créer la fiche"
		})] }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2",
			children: [
				field("Prénom", form.firstName, (v) => set("firstName", v), { required: true }),
				field("Nom", form.lastName, (v) => set("lastName", v), { required: true }),
				field("Email", form.email, (v) => set("email", v), {
					type: "email",
					required: true
				}),
				field("Téléphone", form.phone, (v) => set("phone", v), {
					type: "tel",
					placeholder: "+212 6…"
				}),
				field("Ville", form.city, (v) => set("city", v)),
				field("Budget min (MAD)", form.budgetMin, (v) => set("budgetMin", v), { type: "number" }),
				field("Budget max (MAD)", form.budgetMax, (v) => set("budgetMax", v), { type: "number" }),
				field("Score", form.score, (v) => set("score", v), { type: "number" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase",
						children: "Source"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: form.source,
						onChange: (e) => set("source", e.target.value),
						className: "h-11 border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold",
						children: Object.entries(SOURCE_LABELS).map(([key, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: key,
							children: value
						}, key))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase",
						children: "Température"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: form.temperature,
						onChange: (e) => set("temperature", e.target.value),
						className: "h-11 border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold",
						children: TEMPS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: t,
							children: label(TEMPERATURE_LABELS, t)
						}, t))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase",
						children: "Agent"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: form.agentId,
						onChange: (e) => set("agentId", e.target.value),
						className: "h-11 border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold",
						children: agents.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: a.id,
							children: a.name
						}, a.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
					className: "flex flex-col gap-2 sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase",
						children: "Rôles"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: ROLES.map((r) => {
							const on = form.roles.includes(r);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => toggleRole(r),
								"aria-pressed": on,
								className: cn("min-h-9 border px-3 py-1.5 text-[0.66rem] tracking-[0.1em] uppercase transition-colors", on ? "border-gold bg-gold/10 text-navy" : "border-line text-muted-foreground hover:border-gold/60"),
								children: label(ROLE_LABELS, r)
							}, r);
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5 sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase",
						children: "Notes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: form.notes,
						onChange: (e) => set("notes", e.target.value),
						rows: 3,
						placeholder: "Financement, contraintes, préférences…",
						className: "border border-line bg-admin-bg/40 px-3 py-2.5 text-sm outline-none focus:border-gold"
					})]
				})
			]
		})
	});
}
//#endregion
export { ActivityTimeline, ClientsPage as component };
