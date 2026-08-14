import { i as __toESM } from "../_runtime.mjs";
import { i as cn } from "./utils-BWXQYj3d.mjs";
import { o as require_jsx_runtime, r as useQuery, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { J as useSendMatches, f as matchesForClientQuery, g as propertiesQuery, o as clientsQuery, p as matchesForPropertyQuery } from "./queries-Dq_yS5N4.mjs";
import { S as Search, Tt as Building2, vt as Check, x as Send, yt as CheckCheck } from "../_libs/lucide-react.mjs";
import { D as toast$1, a as EmptyState, f as ROLE_LABELS, n as AdminButton, u as Panel, w as label, x as formatMoney } from "./primitives-BRdCR_bJ.mjs";
import { a as useCan, r as useAgentScope } from "./session-BlPZ3SJa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/matching-DXdfVz_8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MatchingPage() {
	const [tab, setTab] = (0, import_react.useState)("client");
	const [search, setSearch] = (0, import_react.useState)("");
	const [clientId, setClientId] = (0, import_react.useState)("");
	const [propertyId, setPropertyId] = (0, import_react.useState)("");
	const [picked, setPicked] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const scope = useAgentScope();
	const canSend = useCan("match.send");
	const { data: clients = [] } = useQuery(clientsQuery({}));
	const { data: properties = [] } = useQuery(propertiesQuery({}));
	const { data: clientMatches = [] } = useQuery(matchesForClientQuery(clientId));
	const { data: propertyMatches = [] } = useQuery(matchesForPropertyQuery(propertyId));
	const sendMatches = useSendMatches();
	const propertiesById = (0, import_react.useMemo)(() => new Map(properties.map((p) => [p.id, p])), [properties]);
	const scopedClients = (0, import_react.useMemo)(() => scope ? clients.filter((c) => c.agentId === scope) : clients, [clients, scope]);
	const clientsById = (0, import_react.useMemo)(() => new Map(scopedClients.map((c) => [c.id, c])), [scopedClients]);
	const filteredClients = (0, import_react.useMemo)(() => {
		const term = search.trim().toLowerCase();
		return scopedClients.filter((c) => c.roles.some((r) => r === "buyer" || r === "tenant" || r === "investor")).filter((c) => term ? `${c.firstName} ${c.lastName} ${c.email} ${c.city ?? ""}`.toLowerCase().includes(term) : true);
	}, [scopedClients, search]);
	const activeProperties = (0, import_react.useMemo)(() => properties.filter((p) => [
		"available",
		"reserved",
		"under_offer"
	].includes(p.status)), [properties]);
	const selectedClient = clientId ? clientsById.get(clientId) ?? null : null;
	const togglePick = (pid) => {
		setPicked((prev) => {
			const next = new Set(prev);
			if (next.has(pid)) next.delete(pid);
			else next.add(pid);
			return next;
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "Matching propriété ⟷ client"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground",
				children: "Score de compatibilité calculé sur le budget, le secteur et la nature de la recherche. Envoyez les meilleurs biens au client en un clic."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex border border-line",
				children: [["client", "Par client"], ["property", "Par bien"]].map(([key, labelText]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab(key),
					className: cn("px-4 py-2.5 text-[0.68rem] tracking-[0.14em] uppercase transition-colors", tab === key ? "bg-navy text-white" : "text-muted-foreground hover:text-navy"),
					children: labelText
				}, key))
			})]
		}), tab === "client" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientTab, {
			clients: filteredClients,
			search,
			onSearch: setSearch,
			selectedId: clientId,
			onSelect: (id) => {
				setClientId(id);
				setPicked(/* @__PURE__ */ new Set());
			},
			matches: clientMatches,
			propertiesById,
			picked,
			canSend,
			onTogglePick: togglePick,
			onSendAll: () => {
				if (!selectedClient) return;
				const ids = clientMatches.map((m) => m.propertyId);
				sendMatches.mutate({
					clientId: selectedClient.id,
					propertyIds: ids
				}, { onSuccess: () => toast$1.success("Suggestions envoyées", `${ids.length} biens transmis à ${selectedClient.firstName}.`) });
			},
			onSendPicked: () => {
				if (!selectedClient || picked.size === 0) return;
				sendMatches.mutate({
					clientId: selectedClient.id,
					propertyIds: [...picked]
				}, { onSuccess: () => {
					toast$1.success("Suggestions envoyées", `${picked.size} biens transmis à ${selectedClient.firstName}.`);
					setPicked(/* @__PURE__ */ new Set());
				} });
			}
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyTab, {
			properties: activeProperties,
			selectedId: propertyId,
			onSelect: setPropertyId,
			matches: propertyMatches,
			clientsById
		})]
	});
}
function ClientTab({ clients, search, onSearch, selectedId, onSelect, matches, propertiesById, picked, canSend, onTogglePick, onSendAll, onSendPicked }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[20rem_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "self-start",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "border-b border-line px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display text-base",
					children: "Clients acheteurs"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "relative mt-3 flex items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 size-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: search,
						onChange: (e) => onSearch(e.target.value),
						placeholder: "Nom, e-mail, ville…",
						className: "h-10 w-full border border-line bg-admin-bg/40 pl-9 pr-3 text-sm outline-none focus:border-gold"
					})]
				})]
			}), clients.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "Aucun client",
				description: "Aucun acheteur ne correspond à la recherche."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "max-h-[26rem] divide-y divide-line overflow-y-auto",
				children: clients.slice(0, 30).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onSelect(c.id),
					className: cn("flex w-full items-center gap-3 px-4 py-3 text-left transition-colors", selectedId === c.id ? "bg-gold/10" : "hover:bg-sand/60"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "display grid size-9 shrink-0 place-items-center border border-line bg-admin-surface text-xs text-navy",
							children: [c.firstName[0] ?? "", c.lastName[0] ?? ""]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "block truncate text-sm font-medium text-navy",
								children: [
									c.firstName,
									" ",
									c.lastName
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "block truncate text-xs text-muted-foreground",
								children: [
									c.city ?? "—",
									" · ",
									label(ROLE_LABELS, c.roles[0] ?? "buyer")
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: cn("size-4", selectedId === c.id ? "text-gold" : "text-transparent") })
					]
				}) }, c.id))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-w-0 space-y-4",
			children: selectedId === "" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "Sélectionnez un client",
				description: "Choisissez un acheteur à gauche pour voir ses biens recommandés."
			}) : matches.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "Aucune correspondance",
				description: "Aucun bien actif ne correspond au profil de ce client. Élargissez le budget ou le secteur."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-navy",
						children: matches.length
					}), " biens recommandés pour ce client"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminButton, {
						variant: "outline",
						disabled: picked.size === 0 || !canSend,
						onClick: onSendPicked,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-3.5" }),
							" Envoyer la sélection (",
							picked.size,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminButton, {
						onClick: onSendAll,
						disabled: !canSend,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-3.5" }), " Tout envoyer"]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: matches.map((m) => {
					const property = propertiesById.get(m.propertyId);
					if (!property) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex cursor-pointer items-start gap-4 border border-line bg-admin-surface p-4 transition-colors hover:border-gold/60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: picked.has(m.propertyId),
							onChange: () => onTogglePick(m.propertyId),
							className: "mt-1 size-4 accent-gold"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-baseline gap-x-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-sm font-medium text-navy",
											children: property.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs text-muted-foreground tabular-nums",
											children: [
												property.reference,
												" · ",
												property.city
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-medium text-blue tabular-nums",
											children: formatMoney(property.price, true)
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2.5 flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-1.5 flex-1 bg-line",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full bg-gold",
											style: { width: `${m.score}%` }
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-sm font-medium text-gold tabular-nums",
										children: [m.score, " %"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2.5 flex flex-wrap gap-1.5",
									children: m.reasons.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "border border-line px-2 py-0.5 text-[0.58rem] tracking-[0.1em] text-muted-foreground uppercase",
										children: r
									}, r))
								})
							]
						})]
					}) }, m.propertyId);
				})
			})] })
		})]
	});
}
function PropertyTab({ properties, selectedId, onSelect, matches, clientsById }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[20rem_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "self-start",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-line px-4 py-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display text-base",
					children: "Biens actifs"
				})
			}), properties.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "Aucun bien actif",
				description: "Publiez des biens pour les recommander."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "max-h-[26rem] divide-y divide-line overflow-y-auto",
				children: properties.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onSelect(p.id),
					className: cn("flex w-full items-center gap-3 px-4 py-3 text-left transition-colors", selectedId === p.id ? "bg-gold/10" : "hover:bg-sand/60"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: cn("size-4 shrink-0", selectedId === p.id ? "text-gold" : "text-muted-foreground") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate text-sm font-medium text-navy",
							children: p.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "block text-xs text-muted-foreground tabular-nums",
							children: [
								p.reference,
								" · ",
								formatMoney(p.price, true)
							]
						})]
					})]
				}) }, p.id))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-w-0 space-y-4",
			children: selectedId === "" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "Sélectionnez un bien",
				description: "Choisissez un bien à gauche pour voir les clients les plus compatibles."
			}) : matches.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "Aucun client compatible",
				description: "Aucun acheteur ou locataire du fichier ne correspond à ce bien."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: matches.map((m) => {
					const client = clientsById.get(m.clientId);
					if (!client) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-4 border border-line bg-admin-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "display grid size-10 shrink-0 place-items-center border border-line bg-sand text-xs text-navy",
								children: [client.firstName[0] ?? "", client.lastName[0] ?? ""]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-baseline gap-x-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
											className: "text-sm font-medium text-navy",
											children: [
												client.firstName,
												" ",
												client.lastName
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs text-muted-foreground",
											children: [
												client.city ?? "—",
												" ·",
												" ",
												client.budgetMin !== void 0 && client.budgetMax !== void 0 ? `${formatMoney(client.budgetMin, true)} – ${formatMoney(client.budgetMax, true)}` : "Budget non renseigné"
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2.5 flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-1.5 flex-1 bg-line",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-full bg-gold",
												style: { width: `${m.score}%` }
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-sm font-medium text-gold tabular-nums",
											children: [m.score, " %"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2.5 flex flex-wrap gap-1.5",
										children: m.reasons.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "border border-line px-2 py-0.5 text-[0.58rem] tracking-[0.1em] text-muted-foreground uppercase",
											children: r
										}, r))
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "hidden shrink-0 items-center gap-1 border border-line px-2.5 py-1 text-[0.58rem] tracking-[0.12em] text-muted-foreground uppercase sm:inline-flex",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "size-3.5 text-gold" }),
									" ",
									m.reasons.length,
									" critères"
								]
							})
						]
					}) }, m.clientId);
				})
			})
		})]
	});
}
//#endregion
export { MatchingPage as component };
