import { i as __toESM } from "../_runtime.mjs";
import { i as cn } from "./utils-BTE8P7Sw.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { i as PIPELINE_STAGES } from "./types-CH15H5aZ.mjs";
import { B as Maximize, Dt as BedDouble, H as Mail, O as Phone, Ot as Bath, St as CalendarDays, V as MapPin, it as FileText, lt as Download, o as Users, st as Eye, ut as Clock } from "../_libs/lucide-react.mjs";
import { C as formatTime, T as relativeTime, b as formatDate, h as STAGE_LABELS, m as SOURCE_LABELS, r as DOCUMENT_LABELS, t as APPOINTMENT_LABELS, w as label, x as formatMoney, y as formatBytes } from "./primitives-mgU9LIkI.mjs";
import { a as TemperatureBadge, n as PropertyStatusBadge, r as RoleBadge } from "./status-badge-NZE311zg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pipeline-CH5Q0jP1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var cardBase = "group min-w-0 border border-line bg-admin-surface transition-[border-color,box-shadow] duration-400 hover:border-gold/60 hover:shadow-panel";
function PropertyCard({ property, onClick, index = 0, className }) {
	const cover = property.media.find((m) => m.isCover) ?? property.media[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		onClick,
		style: { ["--i"]: index },
		className: cn(cardBase, "stagger-in flex flex-col", onClick && "cursor-pointer", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "zoom-frame relative aspect-[4/3] overflow-hidden bg-sand",
			children: [cover ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: cover.url,
				alt: "",
				loading: "lazy",
				width: 1280,
				height: 960,
				className: "h-full w-full object-cover"
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-3 left-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyStatusBadge, {
					status: property.status,
					className: "bg-admin-surface/90 backdrop-blur"
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase",
					children: [
						property.reference,
						" · ",
						property.neighborhood
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "display mt-2 line-clamp-2 text-lg leading-snug",
					children: property.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-base font-medium tracking-tight text-blue tabular-nums",
					children: formatMoney(property.price, true)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize, { className: "size-3.5 text-gold" }),
								" ",
								property.surface,
								" m²"
							]
						}),
						property.bedrooms > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BedDouble, { className: "size-3.5 text-gold" }),
								" ",
								property.bedrooms
							]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bath, { className: "size-3.5 text-gold" }),
								" ",
								property.bathrooms
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex items-center gap-4 border-t border-line pt-3 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 tabular-nums",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3.5" }),
								" ",
								property.views30d
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 tabular-nums",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3.5" }),
								" ",
								property.leadCount
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-auto",
							children: relativeTime(property.updatedAt)
						})
					]
				})
			]
		})]
	});
}
function ClientCard({ client, onClick, index = 0, className }) {
	const initials = `${client.firstName[0] ?? ""}${client.lastName[0] ?? ""}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		onClick,
		style: { ["--i"]: index },
		className: cn(cardBase, "stagger-in p-4", onClick && "cursor-pointer", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "display grid size-11 shrink-0 place-items-center border border-line bg-sand text-base text-navy",
						children: initials
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "truncate text-sm font-medium text-navy",
							children: [
								client.firstName,
								" ",
								client.lastName
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-0.5 truncate text-xs text-muted-foreground",
							children: [label(SOURCE_LABELS, client.source), client.city ? ` · ${client.city}` : ""]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemperatureBadge, {
						temperature: client.temperature,
						score: client.score
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-wrap gap-1.5",
				children: client.roles.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleBadge, { role: r }, r))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-3 space-y-1.5 border-t border-line pt-3 text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-3.5 shrink-0 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "min-w-0 truncate",
							children: client.email
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-3.5 shrink-0 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "min-w-0 truncate tabular-nums",
							children: client.phone
						})]
					}),
					client.budgetMin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5 shrink-0 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
							className: "min-w-0 truncate tabular-nums",
							children: [
								formatMoney(client.budgetMin, true),
								" – ",
								formatMoney(client.budgetMax ?? 0, true)
							]
						})]
					}) : null
				]
			})
		]
	});
}
function LeadCard({ lead, client, property, onClick, draggable, onDragStart, index = 0, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		onClick,
		draggable,
		onDragStart,
		style: { ["--i"]: index },
		className: cn(cardBase, "stagger-in p-3.5", onClick && "cursor-pointer", draggable && "active:cursor-grabbing", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "min-w-0 flex-1 truncate text-sm font-medium text-navy",
					children: client ? `${client.firstName} ${client.lastName}` : "Lead"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemperatureBadge, { temperature: lead.temperature })]
			}),
			property ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 line-clamp-1 text-xs text-muted-foreground",
				children: property.title
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 text-xs text-muted-foreground italic",
				children: "Sans bien associé"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm font-medium text-blue tabular-nums",
				children: formatMoney(lead.value, true)
			}),
			lead.nextAction ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2.5 flex items-start gap-1.5 border-t border-line pt-2.5 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "mt-0.5 size-3 shrink-0 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "line-clamp-2",
					children: lead.nextAction
				})]
			}) : null
		]
	});
}
function AppointmentCard({ appointment, client, property, index = 0, className }) {
	const done = appointment.status === "done";
	const cancelled = appointment.status === "cancelled" || appointment.status === "no_show";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		style: { ["--i"]: index },
		className: cn(cardBase, "stagger-in flex min-w-0 gap-3 p-4", cancelled && "opacity-65", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex w-14 shrink-0 flex-col items-center border-r border-line pr-3 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[0.6rem] tracking-[0.12em] text-muted-foreground uppercase",
				children: new Date(appointment.startsAt).toLocaleDateString("fr-FR", { month: "short" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "display text-2xl tabular-nums",
				children: new Date(appointment.startsAt).getDate()
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "min-w-0 flex-1 truncate text-sm font-medium text-navy",
						children: appointment.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 border border-line px-2 py-0.5 text-[0.58rem] tracking-[0.12em] text-muted-foreground uppercase",
						children: label(APPOINTMENT_LABELS, appointment.kind)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 flex items-center gap-1.5 text-xs text-muted-foreground tabular-nums",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-3.5 text-gold" }),
						formatTime(appointment.startsAt),
						" – ",
						formatTime(appointment.endsAt)
					]
				}),
				client ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 truncate text-xs text-muted-foreground",
					children: [
						client.firstName,
						" ",
						client.lastName
					]
				}) : null,
				property ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 truncate text-xs text-muted-foreground",
					children: property.title
				}) : null,
				done && appointment.report ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2.5 border-t border-line pt-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-1.5 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Intérêt"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex gap-0.5",
							children: Array.from({ length: 5 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5", i < appointment.report.interest ? "bg-gold" : "bg-line") }, i))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 line-clamp-2 text-xs text-muted-foreground",
						children: appointment.report.outcome
					})]
				}) : null
			]
		})]
	});
}
function DocumentCard({ document: doc, index = 0, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		style: { ["--i"]: index },
		className: cn(cardBase, "stagger-in flex items-center gap-3 p-4", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-10 shrink-0 place-items-center border border-line bg-sand text-gold",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "truncate text-sm font-medium text-navy capitalize",
					children: doc.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label(DOCUMENT_LABELS, doc.category) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							children: "·"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums",
							children: formatBytes(doc.sizeBytes)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							children: "·"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums",
							children: ["v", doc.version]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							children: "·"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatDate(doc.createdAt) })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": `Télécharger ${doc.name}`,
				className: "grid size-9 shrink-0 place-items-center border border-line text-navy transition-colors hover:border-gold",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" })
			})
		]
	});
}
/**
* Kanban pipeline. Columns scroll horizontally on small screens with snap
* points, so a phone gets one readable column at a time instead of a squeeze.
* Drag-and-drop is pointer-only; the select on each card is the accessible
* path to the same action.
*/
function Pipeline({ leads, clients, properties, onMove, className }) {
	const [dragging, setDragging] = (0, import_react.useState)(null);
	const [over, setOver] = (0, import_react.useState)(null);
	const byStage = (stage) => leads.filter((l) => l.stage === stage);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex gap-4 overflow-x-auto pb-3 [scrollbar-width:thin] snap-x snap-mandatory lg:snap-none", className),
		children: PIPELINE_STAGES.map((stage) => {
			const items = byStage(stage);
			const total = items.reduce((s, l) => s + l.value, 0);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				onDragOver: (e) => {
					if (!dragging) return;
					e.preventDefault();
					setOver(stage);
				},
				onDragLeave: () => setOver((s) => s === stage ? null : s),
				onDrop: (e) => {
					e.preventDefault();
					if (dragging) onMove?.(dragging, stage);
					setDragging(null);
					setOver(null);
				},
				className: cn("flex w-[17rem] shrink-0 snap-start flex-col border bg-admin-bg/60 transition-colors duration-300 sm:w-[19rem] lg:w-auto lg:flex-1 lg:min-w-[15rem]", over === stage ? "border-gold bg-gold/5" : "border-line"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex items-center gap-2 border-b border-line px-3.5 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "min-w-0 flex-1 truncate text-[0.65rem] tracking-[0.16em] text-navy uppercase",
							children: label(STAGE_LABELS, stage)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 bg-sand px-1.5 py-0.5 text-[0.62rem] font-medium text-navy tabular-nums",
							children: items.length
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "border-b border-line px-3.5 py-2 text-[0.68rem] text-muted-foreground tabular-nums",
						children: formatMoney(total, true)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-1 flex-col gap-2.5 p-2.5",
						children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-6 text-center text-xs text-muted-foreground/70",
							children: "Vide"
						}) : items.map((lead, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadCard, {
								lead,
								client: clients.get(lead.clientId),
								property: lead.propertyId ? properties.get(lead.propertyId) : void 0,
								index: i,
								draggable: Boolean(onMove),
								onDragStart: () => setDragging(lead.id),
								className: cn(dragging === lead.id && "opacity-40")
							}), onMove ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								"aria-label": "Déplacer vers une autre étape",
								value: stage,
								onChange: (e) => onMove(lead.id, e.target.value),
								className: "min-h-9 w-full border border-line bg-admin-surface px-2 py-1 text-[0.68rem] text-muted-foreground outline-none focus:border-gold",
								children: PIPELINE_STAGES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: s,
									children: label(STAGE_LABELS, s)
								}, s))
							}) : null]
						}, lead.id))
					})
				]
			}, stage);
		})
	});
}
//#endregion
export { PropertyCard as a, Pipeline as i, ClientCard as n, DocumentCard as r, AppointmentCard as t };
