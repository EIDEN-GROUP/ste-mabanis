import { i as __toESM } from "../_runtime.mjs";
import { i as cn } from "./utils-BTE8P7Sw.mjs";
import { o as require_jsx_runtime, r as useQuery, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as PROPERTY_STATUSES, t as ACTIVE_PROPERTY_STATUSES } from "./types-CH15H5aZ.mjs";
import { B as useMovePropertyMedia, G as useRemovePropertyMedia, I as useDeleteProperty, O as useCreateProperty, Q as useSetPropertyStatus, g as propertiesQuery, n as agentsQuery, nt as useUpdateProperty, rt as useUpdatePropertyMedia, x as useAddPropertyMedia } from "./queries-Dq_yS5N4.mjs";
import { At as ArrowUp, B as Maximize, D as Plus, Dt as BedDouble, Ot as Bath, Pt as ArrowDown, Tt as Building2, V as MapPin, X as ImagePlus, a as Video, g as Star, it as FileText, j as Pencil, l as Upload, o as Users, p as Trash2, vt as Check } from "../_libs/lucide-react.mjs";
import { D as toast$1, S as formatNumber, i as Drawer, l as PROPERTY_STATUS_LABELS, n as AdminButton, s as Modal, w as label, x as formatMoney } from "./primitives-mgU9LIkI.mjs";
import { a as useCan } from "./session-CjEBg8Yn.mjs";
import { t as DataTable } from "./data-table-DToCunDP.mjs";
import { n as PropertyStatusBadge } from "./status-badge-NZE311zg.mjs";
import { n as PropertyGallery, t as PropertyFilters } from "./property-gallery-LKgJo3bR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/proprietes-BXHaym-b2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TRANSACTION_LABELS = {
	vente: "À vendre",
	location: "À louer"
};
function readFiles(files, maxWidth = 1600) {
	return Promise.all(Array.from(files).map((file) => new Promise((resolve, reject) => {
		const isVideo = file.type.startsWith("video/");
		const reader = new FileReader();
		reader.onerror = () => reject(/* @__PURE__ */ new Error(`Lecture impossible : ${file.name}`));
		reader.onload = () => {
			const url = String(reader.result ?? "");
			if (isVideo || file.type === "application/pdf") {
				resolve({
					url,
					kind: isVideo ? "video" : "floor_plan",
					label: file.name
				});
				return;
			}
			const img = new Image();
			img.onload = () => {
				const scale = Math.min(1, maxWidth / img.width);
				const canvas = document.createElement("canvas");
				canvas.width = Math.round(img.width * scale);
				canvas.height = Math.round(img.height * scale);
				const ctx = canvas.getContext("2d");
				if (!ctx) return resolve({
					url,
					kind: "photo",
					label: file.name
				});
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				resolve({
					url: canvas.toDataURL("image/jpeg", .82),
					kind: "photo",
					label: file.name
				});
			};
			img.onerror = () => resolve({
				url,
				kind: "photo",
				label: file.name
			});
			img.src = url;
		};
		reader.readAsDataURL(file);
	})));
}
function PropertiesPage() {
	const [query, setQuery] = (0, import_react.useState)({});
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [creating, setCreating] = (0, import_react.useState)(false);
	const { data = [], isPending } = useQuery(propertiesQuery(query));
	const { data: agents = [] } = useQuery(agentsQuery());
	const canCreate = useCan("property.create");
	const canEdit = useCan("property.edit");
	const agentName = (0, import_react.useCallback)((id) => agents.find((a) => a.id === id)?.name ?? "—", [agents]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Portefeuille"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "display mt-1 text-2xl",
						children: isPending ? "…" : `${formatNumber(data.length)} bien${data.length > 1 ? "s" : ""}`
					})]
				}), canCreate ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminButton, {
					onClick: () => setCreating(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "Nouveau bien"]
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyFilters, {
				value: query,
				onChange: setQuery
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
				rows: data,
				columns: [
					{
						id: "bien",
						header: "Bien",
						primary: true,
						sortValue: (p) => p.title,
						cell: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-11 shrink-0 place-items-center overflow-hidden border border-line bg-sand",
								children: (() => {
									const cover = p.media.find((m) => m.isCover) ?? p.media[0];
									return cover ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: cover.url,
										alt: "",
										loading: "lazy",
										className: "size-full object-cover"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-4 text-gold" });
								})()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate font-medium text-navy",
									children: p.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "block truncate text-xs text-muted-foreground",
									children: [
										p.reference,
										" · ",
										p.neighborhood
									]
								})]
							})]
						})
					},
					{
						id: "statut",
						header: "Statut",
						sortValue: (p) => p.status,
						cell: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyStatusBadge, { status: p.status })
					},
					{
						id: "transaction",
						header: "Transaction",
						hideBelow: "md",
						sortValue: (p) => p.transaction,
						cell: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-navy/80",
							children: TRANSACTION_LABELS[p.transaction]
						})
					},
					{
						id: "prix",
						header: "Prix",
						hideBelow: "md",
						sortValue: (p) => p.price,
						cell: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-blue tabular-nums",
							children: formatMoney(p.price)
						})
					},
					{
						id: "surface",
						header: "Surface",
						hideBelow: "lg",
						sortValue: (p) => p.surface,
						cell: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm text-navy/80 tabular-nums",
							children: [formatNumber(p.surface), " m²"]
						})
					},
					{
						id: "agent",
						header: "Agent",
						hideBelow: "lg",
						sortValue: (p) => agentName(p.agentId),
						cell: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-navy/80",
							children: agentName(p.agentId)
						})
					},
					{
						id: "vues",
						header: "Vues 30 j",
						hideBelow: "xl",
						sortValue: (p) => p.views30d,
						cell: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted-foreground tabular-nums",
							children: p.views30d
						})
					}
				],
				getRowId: (p) => p.id,
				onRowClick: setSelected,
				isLoading: isPending,
				empty: {
					title: "Aucun bien trouvé",
					description: "Modifiez vos filtres ou créez une nouvelle fiche.",
					action: canCreate ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminButton, {
						onClick: () => setCreating(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "Nouveau bien"]
					}) : void 0
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyDetailDrawer, {
				property: selected,
				agents: agents.map((a) => ({
					id: a.id,
					name: a.name
				})),
				canEdit,
				onClose: () => setSelected(null)
			}),
			creating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyFormModal, { onClose: () => setCreating(false) }) : null
		]
	});
}
function PropertyDetailDrawer({ property, agents, canEdit, onClose }) {
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [deleting, setDeleting] = (0, import_react.useState)(false);
	const setStatus = useSetPropertyStatus();
	const deleteProperty = useDeleteProperty();
	const canDelete = useCan("property.delete");
	(0, import_react.useEffect)(() => {
		setDeleting(false);
	}, [property?.id]);
	if (!property) return null;
	ACTIVE_PROPERTY_STATUSES.includes(property.status);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer, {
		open: Boolean(property),
		onClose,
		title: property.title,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			canDelete ? deleting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminButton, {
				variant: "danger",
				onClick: () => deleteProperty.mutate(property.id, {
					onSuccess: () => {
						setDeleting(false);
						onClose();
						toast$1.success("Bien supprimé");
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
			canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminButton, {
				variant: "outline",
				onClick: () => setEditing((v) => !v),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" }), editing ? "Voir la fiche" : "Modifier"]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminButton, {
				variant: "outline",
				className: "flex-1",
				onClick: onClose,
				children: "Fermer"
			})
		] }),
		children: editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyFormModal, {
			property,
			agents,
			onClose: () => setEditing(false)
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyDetailView, {
			property,
			agents,
			onSetStatus: setStatus.mutate
		})
	});
}
function PropertyDetailView({ property, agents, onSetStatus }) {
	const agentName = agents.find((a) => a.id === property.agentId)?.name ?? "—";
	const publicLive = ACTIVE_PROPERTY_STATUSES.includes(property.status);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyGallery, { media: property.media }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[0.62rem] tracking-[0.16em] text-muted-foreground uppercase",
						children: [
							property.reference,
							" · ",
							property.slug
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-auto flex items-center gap-1.5 text-xs text-muted-foreground",
						children: publicLive ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-status-available" }), "En ligne sur le site public"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-line" }), "Non publié"] })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "display mt-1 text-3xl text-blue tabular-nums",
					children: formatMoney(property.price)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						TRANSACTION_LABELS[property.transaction],
						" · ",
						property.type,
						" · ",
						property.city,
						",",
						" ",
						property.neighborhood
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow mb-2.5",
					children: "Statut"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: PROPERTY_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => onSetStatus({
							id: property.id,
							status: s
						}),
						"aria-pressed": property.status === s,
						className: cn("min-h-9 border px-3 py-1.5 text-[0.66rem] tracking-[0.1em] uppercase transition-colors duration-300", property.status === s ? "border-gold bg-gold/10 text-navy" : "border-line text-muted-foreground hover:border-gold/60"),
						children: label(PROPERTY_STATUS_LABELS, s)
					}, s))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2.5 text-xs text-muted-foreground",
					children: property.status === "available" || property.status === "reserved" || property.status === "under_offer" ? "Visible dans les résultats du site public." : property.status === "sold" || property.status === "rented" ? "Retiré du site public — l'historique et les rapports sont conservés." : "Caché du site public."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid grid-cols-2 gap-3",
				children: [
					[
						{
							icon: MapPin,
							label: "Localisation",
							value: `${property.city} · ${property.neighborhood}`
						},
						{
							icon: Maximize,
							label: "Surface",
							value: `${formatNumber(property.surface)} m²`
						},
						{
							icon: BedDouble,
							label: "Chambres",
							value: String(property.bedrooms)
						},
						{
							icon: Bath,
							label: "Salles de bain",
							value: String(property.bathrooms)
						}
					].map(({ icon: Icon, label: l, value }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 border border-line bg-admin-bg/50 px-3.5 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 shrink-0 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[0.58rem] tracking-[0.14em] text-muted-foreground uppercase",
								children: l
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium text-navy",
								children: value
							})]
						})]
					}, l)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "col-span-2 flex items-center gap-3 border border-line bg-admin-bg/50 px-3.5 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-4 shrink-0 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[0.58rem] tracking-[0.14em] text-muted-foreground uppercase",
								children: "Agent en charge"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium text-navy",
								children: agentName
							})]
						})]
					}),
					property.ownerClientId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "col-span-2 flex items-center gap-3 border border-line bg-admin-bg/50 px-3.5 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4 shrink-0 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[0.58rem] tracking-[0.14em] text-muted-foreground uppercase",
								children: "Propriétaire"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium text-navy",
								children: property.ownerClientId
							})]
						})]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow mb-2.5",
				children: "Description"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-navy/80",
				children: property.description
			})] }),
			property.features.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow mb-2.5",
				children: "Équipements"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid grid-cols-2 gap-x-4 gap-y-1.5",
				children: property.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-2 text-sm text-navy/80",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 shrink-0 text-gold" }), f]
				}, f))
			})] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaManager, { property })
		]
	});
}
function MediaManager({ property }) {
	const fileRef = (0, import_react.useRef)(null);
	const [kind, setKind] = (0, import_react.useState)("photo");
	const [dragging, setDragging] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [editingLabel, setEditingLabel] = (0, import_react.useState)("");
	const addMedia = useAddPropertyMedia();
	const updateMedia = useUpdatePropertyMedia();
	const moveMedia = useMovePropertyMedia();
	const removeMedia = useRemovePropertyMedia();
	const handleFiles = async (files) => {
		if (!files.length) return;
		setBusy(true);
		try {
			const items = await readFiles(files);
			await addMedia.mutateAsync({
				propertyId: property.id,
				items
			});
			toast$1.success("Médias ajoutés", `${items.length} élément(s) mis en ligne.`);
		} catch (err) {
			toast$1.error("Ajout impossible", err instanceof Error ? err.message : void 0);
		} finally {
			setBusy(false);
			if (fileRef.current) fileRef.current.value = "";
		}
	};
	const KINDS = {
		photo: {
			label: "Photos",
			icon: ImagePlus
		},
		floor_plan: {
			label: "Plans",
			icon: FileText
		},
		video: {
			label: "Vidéos",
			icon: Video
		}
	};
	const grouped = property.media.filter((m) => m.kind === kind);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "Médias"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2",
				children: Object.keys(KINDS).map((k) => {
					const Icon = KINDS[k].icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setKind(k),
						"aria-pressed": kind === k,
						className: cn("inline-flex min-h-9 items-center gap-1.5 border px-3 py-1.5 text-[0.66rem] tracking-[0.12em] uppercase transition-colors", kind === k ? "border-gold bg-gold/10 text-navy" : "border-line text-muted-foreground hover:border-gold/60"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" }), KINDS[k].label]
					}, k);
				})
			}),
			grouped.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-3",
				children: grouped.map((m, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "group relative border border-line bg-admin-bg/50",
					children: [
						m.kind === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
							src: m.url,
							className: "aspect-[4/3] w-full bg-sand object-cover",
							muted: true
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: m.url,
							alt: m.label ?? "",
							loading: "lazy",
							className: "aspect-[4/3] w-full bg-sand object-cover"
						}),
						m.kind === "photo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => updateMedia.mutate({
								id: m.id,
								patch: { isCover: !m.isCover }
							}),
							"aria-label": m.isCover ? "Retirer la couverture" : "Définir comme couverture",
							"aria-pressed": m.isCover,
							className: cn("absolute top-2 left-2 grid size-8 place-items-center border backdrop-blur transition-colors", m.isCover ? "border-gold bg-gold text-navy" : "border-white/40 bg-navy/60 text-white/80 hover:bg-navy"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: cn("size-3.5", m.isCover && "fill-current") })
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute top-2 right-2 border border-line bg-admin-surface/90 px-1.5 py-0.5 text-[0.55rem] tracking-[0.12em] text-muted-foreground uppercase backdrop-blur",
							children: KINDS[m.kind].label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1 border-t border-line p-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "min-w-0 flex-1 truncate text-xs text-muted-foreground",
									children: m.label ?? "Sans libellé"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setEditingId(m.id);
										setEditingLabel(m.label ?? "");
									},
									"aria-label": "Renommer",
									className: "grid size-7 shrink-0 place-items-center text-muted-foreground transition-colors hover:text-navy",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									disabled: idx === 0,
									onClick: () => moveMedia.mutate({
										id: m.id,
										direction: -1
									}),
									"aria-label": "Monter",
									className: "grid size-7 shrink-0 place-items-center text-muted-foreground transition-colors hover:text-navy disabled:opacity-30",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-3.5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									disabled: idx === grouped.length - 1,
									onClick: () => moveMedia.mutate({
										id: m.id,
										direction: 1
									}),
									"aria-label": "Descendre",
									className: "grid size-7 shrink-0 place-items-center text-muted-foreground transition-colors hover:text-navy disabled:opacity-30",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "size-3.5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => removeMedia.mutate(m.id),
									"aria-label": "Supprimer",
									className: "grid size-7 shrink-0 place-items-center text-muted-foreground transition-colors hover:text-negative",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
								})
							]
						}),
						editingId === m.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: (e) => {
								e.preventDefault();
								updateMedia.mutate({
									id: m.id,
									patch: { label: editingLabel }
								});
								setEditingId(null);
							},
							className: "flex gap-2 border-t border-line p-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								autoFocus: true,
								value: editingLabel,
								onChange: (e) => setEditingLabel(e.target.value),
								placeholder: "Libellé",
								className: "h-9 min-w-0 flex-1 border border-line bg-admin-surface px-2 text-sm outline-none focus:border-gold"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminButton, {
								className: "min-h-9 px-3",
								type: "submit",
								children: "OK"
							})]
						}) : null
					]
				}, m.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "border border-dashed border-line px-4 py-6 text-center text-xs text-muted-foreground",
				children: [
					"Aucun élément — ajoutez des ",
					KINDS[kind].label.toLowerCase(),
					" ci-dessous."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				onDragOver: (e) => {
					e.preventDefault();
					setDragging(true);
				},
				onDragLeave: () => setDragging(false),
				onDrop: (e) => {
					e.preventDefault();
					setDragging(false);
					handleFiles(e.dataTransfer.files);
				},
				className: cn("flex flex-col items-center gap-2 border border-dashed px-4 py-8 text-center transition-colors", dragging ? "border-gold bg-gold/5" : "border-line"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: cn("size-5", dragging ? "text-gold" : "text-muted-foreground") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"Glissez vos fichiers ici, ou",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => fileRef.current?.click(),
								className: "font-medium text-navy underline decoration-gold decoration-2 underline-offset-2",
								children: "parcourez"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[0.65rem] text-muted-foreground/70",
						children: kind === "photo" ? "JPG, PNG, WebP — recadrées à 1600 px" : kind === "video" ? "MP4, WebM" : "PDF, PNG, JPG"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileRef,
						type: "file",
						hidden: true,
						multiple: true,
						accept: kind === "photo" ? "image/*" : kind === "video" ? "video/*" : "application/pdf,image/*",
						onChange: (e) => e.target.files && void handleFiles(e.target.files)
					})
				]
			})
		]
	});
}
function PropertyFormModal({ property, agents, onClose }) {
	const [form, setForm] = (0, import_react.useState)(() => ({
		reference: property?.reference ?? "",
		title: property?.title ?? "",
		status: property?.status ?? "draft",
		transaction: property?.transaction ?? "vente",
		type: property?.type ?? "",
		city: property?.city ?? "",
		neighborhood: property?.neighborhood ?? "",
		price: property ? String(property.price) : "",
		surface: property ? String(property.surface) : "",
		bedrooms: property ? String(property.bedrooms) : "",
		bathrooms: property ? String(property.bathrooms) : "",
		description: property?.description ?? "",
		features: property?.features.join(", ") ?? "",
		agentId: property?.agentId ?? agents?.[0]?.id ?? ""
	}));
	const [saving, setSaving] = (0, import_react.useState)(false);
	const createProperty = useCreateProperty();
	const updateProperty = useUpdateProperty();
	const set = (key, value) => setForm((f) => ({
		...f,
		[key]: value
	}));
	const submit = async () => {
		if (!form.title.trim()) {
			toast$1.error("Titre requis", "Donnez un nom au bien pour continuer.");
			return;
		}
		const price = Number(form.price);
		const surface = Number(form.surface);
		if (!Number.isFinite(price) || price < 0 || !Number.isFinite(surface) || surface <= 0) {
			toast$1.error("Valeurs invalides", "Le prix et la surface doivent être des nombres positifs.");
			return;
		}
		const payload = {
			title: form.title.trim(),
			status: form.status,
			transaction: form.transaction,
			type: form.type.trim(),
			city: form.city.trim(),
			neighborhood: form.neighborhood.trim(),
			price,
			surface,
			bedrooms: Number(form.bedrooms) || 0,
			bathrooms: Number(form.bathrooms) || 0,
			description: form.description.trim(),
			features: form.features.split(",").map((f) => f.trim()).filter(Boolean),
			agentId: form.agentId || void 0
		};
		setSaving(true);
		try {
			if (property) {
				await updateProperty.mutateAsync({
					id: property.id,
					patch: payload
				});
				toast$1.success("Bien mis à jour");
			} else {
				await createProperty.mutateAsync({
					reference: form.reference.trim() || void 0,
					...payload
				});
				toast$1.success("Bien créé", "La fiche est prête à recevoir ses médias.");
			}
			onClose();
		} catch (err) {
			toast$1.error("Enregistrement impossible", err instanceof Error ? err.message : void 0);
		} finally {
			setSaving(false);
		}
	};
	const field = (label, value, onChange, opts = {}) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: cn("flex flex-col gap-1.5", opts.full && "sm:col-span-2"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase",
			children: [label, opts.required ? " *" : ""]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: opts.type ?? "text",
			value,
			onChange: (e) => onChange(e.target.value),
			required: opts.required,
			placeholder: opts.placeholder,
			className: "h-11 border border-line bg-admin-bg/40 px-3 text-sm outline-none transition-colors focus:border-gold"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
		open: true,
		onClose,
		title: property ? "Modifier le bien" : "Nouveau bien",
		description: property ? `${property.reference} — la fiche s'enregistre en direct.` : "La fiche reste en brouillon tant que vous ne la publiez pas.",
		size: "lg",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminButton, {
			variant: "outline",
			onClick: onClose,
			children: "Annuler"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminButton, {
			onClick: () => void submit(),
			disabled: saving,
			children: saving ? "Enregistrement…" : property ? "Enregistrer" : "Créer la fiche"
		})] }),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2",
			children: [
				field("Titre", form.title, (v) => set("title", v), {
					required: true,
					full: true,
					placeholder: "Ex. Villa avec piscine à Founty"
				}),
				field("Référence", form.reference, (v) => set("reference", v), { placeholder: "MB-XXXX (auto si vide)" }),
				field("Prix (MAD)", form.price, (v) => set("price", v), {
					type: "number",
					required: true
				}),
				field("Surface (m²)", form.surface, (v) => set("surface", v), {
					type: "number",
					required: true
				}),
				field("Chambres", form.bedrooms, (v) => set("bedrooms", v), { type: "number" }),
				field("Salles de bain", form.bathrooms, (v) => set("bathrooms", v), { type: "number" }),
				field("Type de bien", form.type, (v) => set("type", v), { required: true }),
				field("Ville", form.city, (v) => set("city", v), { required: true }),
				field("Quartier", form.neighborhood, (v) => set("neighborhood", v), { required: true }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase",
						children: "Transaction *"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-2",
						children: ["vente", "location"].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => set("transaction", t),
							"aria-pressed": form.transaction === t,
							className: cn("h-11 border text-[0.68rem] tracking-[0.12em] uppercase transition-colors", form.transaction === t ? "border-gold bg-gold/10 text-navy" : "border-line text-muted-foreground hover:border-gold/60"),
							children: TRANSACTION_LABELS[t]
						}, t))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase",
						children: "Statut"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: form.status,
						onChange: (e) => set("status", e.target.value),
						className: "h-11 border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold",
						children: PROPERTY_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s,
							children: label(PROPERTY_STATUS_LABELS, s)
						}, s))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase",
						children: "Agent en charge"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: form.agentId,
						onChange: (e) => set("agentId", e.target.value),
						className: "h-11 border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold",
						children: (agents ?? []).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: a.id,
							children: a.name
						}, a.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5 sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase",
						children: "Équipements (séparés par des virgules)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: form.features,
						onChange: (e) => set("features", e.target.value),
						placeholder: "Piscine, Jardin, Vue mer, Garage…",
						className: "h-11 border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5 sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase",
						children: "Description"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: form.description,
						onChange: (e) => set("description", e.target.value),
						rows: 5,
						placeholder: "Atouts du bien, environnement, potentiel…",
						className: "border border-line bg-admin-bg/40 px-3 py-2.5 text-sm outline-none focus:border-gold"
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-5 flex items-start gap-2 border border-line bg-admin-bg/50 px-3.5 py-3 text-xs text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "mt-0.5 size-3.5 shrink-0 text-gold" }), form.status === "draft" || form.status === "archived" ? "Ce statut masque le bien du site public." : form.status === "sold" || form.status === "rented" ? "Vendu / loué : le bien quitte les résultats publics mais garde son historique." : "Ce statut publie le bien instantanément sur le site public."]
		})]
	});
}
//#endregion
export { PropertiesPage as component };
