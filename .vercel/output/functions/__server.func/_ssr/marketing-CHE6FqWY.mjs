import { i as __toESM } from "../_runtime.mjs";
import { i as cn } from "./utils-BWXQYj3d.mjs";
import { o as require_jsx_runtime, r as useQuery, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { M as useDeleteCampaign, W as useRemoveFeatured, Z as useSetFeatured, d as marketingStatsQuery, g as propertiesQuery, q as useSendCampaign, w as useCreateCampaign } from "./queries-Dq_yS5N4.mjs";
import { D as Plus, F as MousePointerClick, H as Mail, I as MessageSquare, g as Star, o as Users, p as Trash2, x as Send, z as Megaphone } from "../_libs/lucide-react.mjs";
import { D as toast$1, T as relativeTime, a as EmptyState, b as formatDate, g as StatCard, m as SOURCE_LABELS, n as AdminButton, s as Modal, u as Panel, w as label, x as formatMoney } from "./primitives-BRdCR_bJ.mjs";
import { n as CategoryBarChart, r as ChartLegend } from "./charts-CyqKhVF4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/marketing-CHE6FqWY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CHANNEL_LABELS = {
	email: "E-mail",
	whatsapp: "WhatsApp",
	portail: "Portail",
	reseaux_sociaux: "Réseaux sociaux"
};
var CHANNEL_ICONS = {
	email: Mail,
	whatsapp: MessageSquare,
	portail: Megaphone,
	reseaux_sociaux: Users
};
var STATUS_STYLE = {
	draft: "border-line text-muted-foreground",
	scheduled: "border-blue/40 text-blue",
	sent: "border-positive/40 text-positive"
};
function MarketingPage() {
	const { data: stats } = useQuery(marketingStatsQuery());
	const { data: properties = [] } = useQuery(propertiesQuery({}));
	const [creating, setCreating] = (0, import_react.useState)(false);
	const sendCampaign = useSendCampaign();
	const deleteCampaign = useDeleteCampaign();
	const setFeat = useSetFeatured();
	const removeFeat = useRemoveFeatured();
	const campaigns = stats?.campaigns ?? [];
	stats?.featured;
	const sources = stats?.sources ?? [];
	const totals = stats?.totals;
	const featuredUntil = (0, import_react.useMemo)(() => {
		const m = /* @__PURE__ */ new Map();
		for (const f of stats?.featured ?? []) m.set(f.propertyId, f.until);
		return m;
	}, [stats?.featured]);
	const activeProperties = (0, import_react.useMemo)(() => properties.filter((p) => [
		"available",
		"reserved",
		"under_offer"
	].includes(p.status)), [properties]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Campagnes envoyées",
						value: String(totals?.sent ?? 0),
						hint: "Sur toutes les périodes",
						icon: Send,
						index: 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Ouvertures",
						value: String(totals?.opens ?? 0),
						hint: "Cumulées",
						icon: Mail,
						index: 1
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Clics",
						value: String(totals?.clicks ?? 0),
						hint: "Liens visités",
						icon: MousePointerClick,
						index: 2
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Conversions",
						value: String(totals?.conversions ?? 0),
						hint: "Leads générés",
						icon: Users,
						index: 3
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display text-xl",
					children: "Biens à la une"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Mis en avant sur la page d'accueil publique, avec une date de fin."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminButton, {
					onClick: () => setCreating(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), " Nouvelle campagne"]
				})]
			}), activeProperties.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "Aucun bien actif",
				description: "Publiez un bien pour le mettre à la une."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[640px] text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line text-left text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-3 font-medium",
								children: "Bien"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-3 font-medium",
								children: "Prix"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-3 font-medium",
								children: "Statut"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-3 font-medium",
								children: "À la une jusqu'au"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-3 text-right font-medium",
								children: "Action"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-line",
						children: activeProperties.map((p) => {
							const until = featuredUntil.get(p.id);
							const isFeatured = Boolean(until);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "transition-colors hover:bg-sand/40",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "max-w-[18rem] px-5 py-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate font-medium text-navy",
											children: p.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground tabular-nums",
											children: p.reference
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3 text-navy tabular-nums",
										children: formatMoney(p.price, true)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "border border-line px-2 py-0.5 text-[0.58rem] tracking-[0.12em] text-muted-foreground uppercase",
											children: p.status.replace(/_/g, " ")
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3 text-muted-foreground tabular-nums",
										children: isFeatured ? formatDate(until) : "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3 text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => {
												if (isFeatured) removeFeatured(p);
												else setFeatured(p);
											},
											className: cn("inline-flex items-center gap-1.5 border px-2.5 py-1.5 text-[0.6rem] tracking-[0.12em] uppercase transition-colors", isFeatured ? "border-gold/60 text-gold" : "border-line text-muted-foreground hover:border-gold hover:text-gold"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: cn("size-3.5", isFeatured && "fill-gold") }), isFeatured ? "Retirer" : "À la une"]
										})
									})
								]
							}, p.id);
						})
					})]
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 xl:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
					className: "border-b border-line px-5 py-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "display text-xl",
						children: "Campagnes"
					})
				}), campaigns.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "Aucune campagne",
					description: "Créez votre première campagne d'acquisition."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-line",
					children: campaigns.map((c) => {
						const Icon = CHANNEL_ICONS[c.channel];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "px-5 py-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid size-9 shrink-0 place-items-center border border-line bg-sand text-gold",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-center gap-x-3 gap-y-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "truncate text-sm font-medium text-navy",
														children: c.name
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: cn("border px-2 py-0.5 text-[0.58rem] tracking-[0.12em] uppercase", STATUS_STYLE[c.status]),
														children: c.status
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs text-muted-foreground",
														children: label(CHANNEL_LABELS, c.channel)
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 line-clamp-1 text-xs text-muted-foreground",
												children: c.subject
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-1 text-xs text-muted-foreground tabular-nums",
												children: [
													c.audience,
													" · ",
													c.audienceCount,
													" destinataires",
													c.sentAt ? ` · envoyée ${relativeTime(c.sentAt)}` : ""
												]
											}),
											c.status === "sent" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-2.5 flex flex-wrap gap-x-5 gap-y-1 text-xs",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-muted-foreground",
														children: [
															"Ouvertures",
															" ",
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "font-medium text-navy tabular-nums",
																children: c.opens
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-muted-foreground",
														children: [
															"Clics",
															" ",
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "font-medium text-navy tabular-nums",
																children: c.clicks
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-muted-foreground",
														children: [
															"Conversions",
															" ",
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "font-medium text-positive tabular-nums",
																children: c.conversions
															})
														]
													})
												]
											}) : null
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex shrink-0 gap-1.5",
										children: [c.status !== "sent" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => send(c),
											"aria-label": `Envoyer ${c.name}`,
											className: "grid size-9 place-items-center border border-line text-navy transition-colors hover:border-gold",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })
										}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => remove(c),
											"aria-label": `Supprimer ${c.name}`,
											className: "grid size-9 place-items-center border border-line text-muted-foreground transition-colors hover:border-negative hover:text-negative",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
										})]
									})
								]
							})
						}, c.id);
					})
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "border-b border-line px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "display text-xl",
						children: "Origine des leads"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Volume et conversion par source."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryBarChart, {
							data: sources.map((s) => ({
								label: label(SOURCE_LABELS, s.source),
								value: s.leads
							})),
							xKey: "label",
							dataKey: "value",
							name: "Leads",
							height: 220,
							horizontal: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 border-t border-line pt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLegend, { items: sources.map((s) => ({ label: label(SOURCE_LABELS, s.source) })) })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 divide-y divide-line",
							children: sources.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-3 py-2.5 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "min-w-0 flex-1 truncate text-navy",
										children: label(SOURCE_LABELS, s.source)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted-foreground tabular-nums",
										children: [s.leads, " leads"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "w-20 text-right text-muted-foreground tabular-nums",
										children: [s.conversions, " convertis"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: cn("w-16 text-right font-medium tabular-nums", s.rate >= 20 ? "text-positive" : s.rate > 0 ? "text-gold" : "text-muted-foreground"),
										children: [s.rate, " %"]
									})
								]
							}, s.source))
						})
					]
				})] })]
			}),
			creating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CampaignModal, { onClose: () => setCreating(false) }) : null
		]
	});
	function send(c) {
		sendCampaign.mutate(c.id, { onSuccess: () => toast$1.success("Campagne envoyée", `${c.audienceCount} destinataires contactés.`) });
	}
	function remove(c) {
		deleteCampaign.mutate(c.id, { onSuccess: () => toast$1.success("Campagne supprimée") });
	}
	function setFeatured(p) {
		const until = new Date(Date.now() + 7 * 864e5).toISOString();
		setFeat.mutate({
			propertyId: p.id,
			until
		}, { onSuccess: () => toast$1.success("Bien mis à la une", "Visible sur la page d'accueil pendant 7 jours.") });
	}
	function removeFeatured(p) {
		removeFeat.mutate(p.id, { onSuccess: () => toast$1.success("Bien retiré de la une") });
	}
}
function CampaignModal({ onClose }) {
	const [name, setName] = (0, import_react.useState)("");
	const [subject, setSubject] = (0, import_react.useState)("");
	const [channel, setChannel] = (0, import_react.useState)("email");
	const [audience, setAudience] = (0, import_react.useState)("");
	const [audienceCount, setAudienceCount] = (0, import_react.useState)("");
	const create = useCreateCampaign();
	const submit = async () => {
		await create.mutateAsync({
			name: name.trim() || "Campagne sans titre",
			subject: subject.trim(),
			channel,
			audience: audience.trim(),
			audienceCount: Number(audienceCount) || 0
		});
		onClose();
	};
	const fieldCls = "h-11 border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
		open: true,
		onClose,
		title: "Nouvelle campagne",
		description: "Le brouillon peut être envoyé immédiatement depuis la liste.",
		footer: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminButton, {
			variant: "outline",
			onClick: onClose,
			children: "Annuler"
		}, "cancel"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminButton, {
			onClick: submit,
			children: "Créer le brouillon"
		}, "save")],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5 sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground uppercase",
						children: "Nom de la campagne"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: name,
						onChange: (e) => setName(e.target.value),
						placeholder: "Coup de cœur Marina — Septembre",
						className: fieldCls
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5 sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground uppercase",
						children: "Objet / message"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: subject,
						onChange: (e) => setSubject(e.target.value),
						placeholder: "Ex. 3 biens d'exception face à la Marina",
						className: fieldCls
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground uppercase",
						children: "Canal"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: channel,
						onChange: (e) => setChannel(e.target.value),
						className: fieldCls,
						children: Object.keys(CHANNEL_LABELS).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c,
							children: label(CHANNEL_LABELS, c)
						}, c))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground uppercase",
						children: "Taille de l'audience"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						value: audienceCount,
						onChange: (e) => setAudienceCount(e.target.value),
						placeholder: "Ex. 240",
						className: fieldCls
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5 sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground uppercase",
						children: "Segment ciblé"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: audience,
						onChange: (e) => setAudience(e.target.value),
						placeholder: "Ex. Acheteurs Marina — budget ≥ 2 M MAD",
						className: fieldCls
					})]
				})
			]
		})
	});
}
//#endregion
export { MarketingPage as component };
