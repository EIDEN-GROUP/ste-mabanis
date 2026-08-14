import { i as __toESM } from "../_runtime.mjs";
import { i as cn } from "./utils-BWXQYj3d.mjs";
import { o as require_jsx_runtime, r as useQuery, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { s as TRANSACTION_STAGES } from "./types-CH15H5aZ.mjs";
import { L as useDeleteTransaction, R as useMarkPaymentPaid, V as useMoveTransactionStage, b as useAddPayment, g as propertiesQuery, j as useCreateTransaction, n as agentsQuery, o as clientsQuery, y as transactionsQuery } from "./queries-Dq_yS5N4.mjs";
import { D as Plus, dt as Circle, ft as CircleCheck, gt as ChevronLeft, ht as ChevronRight, p as Trash2 } from "../_libs/lucide-react.mjs";
import { D as toast$1, a as EmptyState, b as formatDate, g as StatCard, i as Drawer, n as AdminButton, s as Modal, v as TRANSACTION_STAGE_LABELS, w as label, x as formatMoney } from "./primitives-BRdCR_bJ.mjs";
import { a as useCan } from "./session-BlPZ3SJa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/transactions-CzU68t5t.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STAGE_INDEX = TRANSACTION_STAGES.reduce((acc, s, i) => {
	acc[s] = i;
	return acc;
}, {});
function TransactionsPage() {
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const [creating, setCreating] = (0, import_react.useState)(false);
	const { data: transactions = [] } = useQuery(transactionsQuery());
	const { data: clients = [] } = useQuery(clientsQuery({}));
	const { data: properties = [] } = useQuery(propertiesQuery({}));
	const { data: agents = [] } = useQuery(agentsQuery());
	const canManage = useCan("transaction.manage");
	const clientsById = (0, import_react.useMemo)(() => new Map(clients.map((c) => [c.id, c])), [clients]);
	const propertiesById = (0, import_react.useMemo)(() => new Map(properties.map((p) => [p.id, p])), [properties]);
	const agentsById = (0, import_react.useMemo)(() => new Map(agents.map((a) => [a.id, a])), [agents]);
	const open = transactions.filter((t) => !t.closedAt);
	const pipelineValue = open.reduce((s, t) => s + t.amount, 0);
	const commission = open.reduce((s, t) => s + t.commission, 0);
	const closing = transactions.filter((t) => t.stage === "closing").length;
	const selected = transactions.find((t) => t.id === selectedId) ?? null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "En cours",
						value: String(open.length),
						hint: "Transactions ouvertes",
						icon: Circle,
						index: 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Volume pipeline",
						value: formatMoney(pipelineValue, true),
						hint: "Montant des transactions ouvertes",
						icon: ChevronRight,
						index: 1
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Commissions à percevoir",
						value: formatMoney(commission, true),
						hint: "Base 2,5 % du prix",
						icon: CircleCheck,
						index: 2
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Clôtures imminentes",
						value: String(closing),
						hint: "À l'étape clôture",
						icon: ChevronLeft,
						index: 3
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Pipeline des transactions"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "De l'intérêt à la clôture — cliquez sur un dossier pour le détailler."
				})] }), canManage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminButton, {
					onClick: () => setCreating(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), " Nouvelle transaction"]
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto pb-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex min-w-[1120px] gap-4",
					children: TRANSACTION_STAGES.map((stage) => {
						const items = transactions.filter((t) => t.stage === stage);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-[130px] flex-1 flex-col",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between border-b-2 border-line pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-[0.62rem] tracking-[0.14em] text-navy uppercase",
									children: label(TRANSACTION_STAGE_LABELS, stage)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground tabular-nums",
									children: items.length
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 flex flex-col gap-3",
								children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "py-4 text-center text-xs text-muted-foreground italic",
									children: "Vide"
								}) : items.map((t) => {
									const property = propertiesById.get(t.propertyId);
									const buyer = clientsById.get(t.buyerClientId);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setSelectedId(t.id),
										className: "group border border-line bg-admin-surface p-3.5 text-left transition-colors hover:border-gold/60",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[0.6rem] tracking-[0.14em] text-muted-foreground uppercase",
												children: t.reference
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1.5 line-clamp-2 text-sm font-medium text-navy",
												children: property?.title ?? "Bien supprimé"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-sm font-medium text-blue tabular-nums",
												children: formatMoney(t.amount, true)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 truncate text-xs text-muted-foreground",
												children: buyer ? `${buyer.firstName} ${buyer.lastName}` : "Acheteur"
											})
										]
									}, t.id);
								})
							})]
						}, stage);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionDrawer, {
				transaction: selected,
				property: selected ? propertiesById.get(selected.propertyId) ?? null : null,
				buyer: selected ? clientsById.get(selected.buyerClientId) ?? null : null,
				seller: selected?.sellerClientId ? clientsById.get(selected.sellerClientId) ?? null : null,
				agent: selected ? agentsById.get(selected.agentId) ?? null : null,
				onClose: () => setSelectedId(null)
			}),
			creating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionFormModal, {
				clients,
				properties,
				agents,
				onClose: () => setCreating(false)
			}) : null
		]
	});
}
function TransactionDrawer({ transaction, property, buyer, seller, agent, onClose }) {
	const [addingPayment, setAddingPayment] = (0, import_react.useState)(false);
	const [labelPay, setLabelPay] = (0, import_react.useState)("Acompte");
	const [amount, setAmount] = (0, import_react.useState)("");
	const [dueAt, setDueAt] = (0, import_react.useState)("");
	const moveStage = useMoveTransactionStage();
	const addPayment = useAddPayment();
	const markPaid = useMarkPaymentPaid();
	const deleteTransaction = useDeleteTransaction();
	const canDelete = useCan("transaction.delete");
	const [deleting, setDeleting] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setDeleting(false);
	}, [transaction?.id]);
	if (!transaction) return null;
	const stageIndex = STAGE_INDEX[transaction.stage] ?? 0;
	const progress = Math.round(stageIndex / (TRANSACTION_STAGES.length - 1) * 100);
	const paidTotal = transaction.payments.filter((p) => p.paidAt).reduce((s, p) => s + p.amount, 0);
	const shift = (dir) => {
		const next = TRANSACTION_STAGES[stageIndex + dir];
		if (next) moveStage.mutate({
			id: transaction.id,
			stage: next
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer, {
		open: true,
		onClose,
		title: transaction.reference,
		footer: [
			...canDelete ? [deleting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminButton, {
				variant: "danger",
				onClick: () => deleteTransaction.mutate(transaction.id, {
					onSuccess: () => {
						setDeleting(false);
						onClose();
						toast$1.success("Transaction supprimée");
					},
					onError: (error) => {
						setDeleting(false);
						toast$1.error(error instanceof Error ? error.message.replace(/^\[supabase:[^\]]+\]\s*/, "") : "Suppression impossible");
					}
				}),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), " Confirmer"]
			}, "del-confirm") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminButton, {
				variant: "danger",
				onClick: () => setDeleting(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), " Supprimer"]
			}, "del")] : [],
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminButton, {
				variant: "outline",
				disabled: stageIndex === 0,
				onClick: () => shift(-1),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-3.5" }), " Reculer"]
			}, "back"),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminButton, {
				disabled: stageIndex === TRANSACTION_STAGES.length - 1 || Boolean(transaction.closedAt),
				onClick: () => shift(1),
				children: ["Avancer ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5" })]
			}, "fwd")
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"Étape ",
							stageIndex + 1,
							" / ",
							TRANSACTION_STAGES.length
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums",
							children: [progress, " %"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 h-1.5 bg-line",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full bg-gold transition-[width] duration-500",
							style: { width: `${progress}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm font-medium text-navy",
						children: label(TRANSACTION_STAGE_LABELS, transaction.stage)
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "space-y-2.5 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "w-24 shrink-0 text-xs text-muted-foreground uppercase",
								children: "Bien"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-navy",
								children: property ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
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
								] }) : "Bien supprimé"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "w-24 shrink-0 text-xs text-muted-foreground uppercase",
								children: "Acheteur"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-navy",
								children: buyer ? `${buyer.firstName} ${buyer.lastName}` : "—"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "w-24 shrink-0 text-xs text-muted-foreground uppercase",
								children: "Vendeur"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-navy",
								children: seller ? `${seller.firstName} ${seller.lastName}` : "—"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "w-24 shrink-0 text-xs text-muted-foreground uppercase",
								children: "Agent"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-navy",
								children: agent?.name ?? "—"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "w-24 shrink-0 text-xs text-muted-foreground uppercase",
								children: "Montant"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-navy tabular-nums",
								children: formatMoney(transaction.amount)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "w-24 shrink-0 text-xs text-muted-foreground uppercase",
								children: "Commission"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-navy tabular-nums",
								children: formatMoney(transaction.commission)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "w-24 shrink-0 text-xs text-muted-foreground uppercase",
								children: "Ouverte le"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-navy",
								children: formatDate(transaction.openedAt)
							})]
						}),
						transaction.closedAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "w-24 shrink-0 text-xs text-muted-foreground uppercase",
								children: "Clôturée le"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-positive",
								children: formatDate(transaction.closedAt)
							})]
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Échéancier de paiement"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-muted-foreground tabular-nums",
						children: [formatMoney(paidTotal), " encaissés"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2.5 space-y-2",
					children: transaction.payments.map((p) => {
						const paid = Boolean(p.paidAt);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: cn("flex items-center gap-3 border border-line px-3 py-2.5", paid && "bg-sand/60 opacity-80"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("shrink-0", paid ? "text-positive" : "text-muted-foreground"),
									children: paid ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: cn("truncate text-sm text-navy", paid && "line-through"),
										children: p.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: [
											"Échéance ",
											formatDate(p.dueAt),
											paid ? ` · payé le ${formatDate(p.paidAt)}` : ""
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium text-navy tabular-nums",
									children: formatMoney(p.amount, true)
								}),
								!paid ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => markPaid.mutate({
										transactionId: transaction.id,
										paymentId: p.id
									}),
									className: "border border-line px-2.5 py-1.5 text-[0.6rem] tracking-[0.12em] text-navy uppercase transition-colors hover:border-gold",
									children: "Encaisser"
								}) : null
							]
						}, p.id);
					})
				})] }),
				addingPayment ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "space-y-3 border border-line p-4",
					onSubmit: (e) => {
						e.preventDefault();
						const amt = Number(amount);
						if (!amt || !dueAt) return;
						addPayment.mutate({
							transactionId: transaction.id,
							label: labelPay.trim() || "Versement",
							amount: amt,
							dueAt: (/* @__PURE__ */ new Date(`${dueAt}T12:00:00`)).toISOString()
						}, { onSuccess: () => setAddingPayment(false) });
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Ajouter un versement"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground uppercase",
								children: "Libellé"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: labelPay,
								onChange: (e) => setLabelPay(e.target.value),
								className: "h-11 border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground uppercase",
									children: "Montant (MAD)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									value: amount,
									onChange: (e) => setAmount(e.target.value),
									className: "h-11 border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground uppercase",
									children: "Échéance"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "date",
									value: dueAt,
									onChange: (e) => setDueAt(e.target.value),
									className: "h-11 border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminButton, {
							type: "submit",
							children: "Ajouter"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminButton, {
					variant: "outline",
					onClick: () => setAddingPayment(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), " Ajouter un versement"]
				})
			]
		})
	});
}
function TransactionFormModal({ clients, properties, agents, onClose }) {
	const [propertyId, setPropertyId] = (0, import_react.useState)("");
	const [buyerClientId, setBuyerClientId] = (0, import_react.useState)("");
	const [sellerClientId, setSellerClientId] = (0, import_react.useState)("");
	const [agentId, setAgentId] = (0, import_react.useState)("");
	const [amount, setAmount] = (0, import_react.useState)("");
	const [commission, setCommission] = (0, import_react.useState)("");
	const create = useCreateTransaction();
	const submit = async () => {
		if (!propertyId || !buyerClientId) return;
		await create.mutateAsync({
			propertyId,
			buyerClientId,
			sellerClientId: sellerClientId || void 0,
			agentId: agentId || void 0,
			amount: Number(amount) || 0,
			commission: commission ? Number(commission) : void 0
		});
		onClose();
	};
	const fieldCls = "h-11 border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
		open: true,
		onClose,
		title: "Nouvelle transaction",
		footer: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminButton, {
			variant: "outline",
			onClick: onClose,
			children: "Annuler"
		}, "cancel"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminButton, {
			disabled: !propertyId || !buyerClientId,
			onClick: submit,
			children: "Créer"
		}, "save")],
		children: properties.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "Aucun bien disponible",
			description: "Créez d'abord un bien dans la section Propriétés."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5 sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground uppercase",
						children: "Bien"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: propertyId,
						onChange: (e) => setPropertyId(e.target.value),
						className: fieldCls,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Sélectionner…"
						}), properties.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: p.id,
							children: [
								p.title,
								" (",
								p.reference,
								")"
							]
						}, p.id))]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground uppercase",
						children: "Acheteur"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: buyerClientId,
						onChange: (e) => setBuyerClientId(e.target.value),
						className: fieldCls,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Sélectionner…"
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
						children: "Vendeur"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: sellerClientId,
						onChange: (e) => setSellerClientId(e.target.value),
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
						children: "Montant (MAD)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						value: amount,
						onChange: (e) => setAmount(e.target.value),
						className: fieldCls
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground uppercase",
						children: "Commission (MAD)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						value: commission,
						onChange: (e) => setCommission(e.target.value),
						placeholder: "2,5 % si vide",
						className: fieldCls
					})]
				})
			]
		})
	});
}
//#endregion
export { TransactionsPage as component };
