import { i as __toESM } from "../_runtime.mjs";
import { i as cn } from "./utils-BTE8P7Sw.mjs";
import { o as require_jsx_runtime, r as useQuery, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { E as useCreateDocument, P as useDeleteDocument, c as documentsQuery, g as propertiesQuery, n as agentsQuery, o as clientsQuery } from "./queries-Dq_yS5N4.mjs";
import { $ as HardDrive, D as Plus, K as Layers, S as Search, it as FileText, l as Upload, lt as Download, nt as FolderOpen, p as Trash2 } from "../_libs/lucide-react.mjs";
import { a as EmptyState, b as formatDate, g as StatCard, n as AdminButton, r as DOCUMENT_LABELS, s as Modal, w as label, y as formatBytes } from "./primitives-mgU9LIkI.mjs";
import { a as useCan } from "./session-CjEBg8Yn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/documents-ioDBk03w.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATEGORIES = Object.keys(DOCUMENT_LABELS);
function DocumentsPage() {
	const [category, setCategory] = (0, import_react.useState)("all");
	const [search, setSearch] = (0, import_react.useState)("");
	const [preview, setPreview] = (0, import_react.useState)(null);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const { data: documents = [] } = useQuery(documentsQuery());
	const { data: clients = [] } = useQuery(clientsQuery({}));
	const { data: properties = [] } = useQuery(propertiesQuery({}));
	const { data: agents = [] } = useQuery(agentsQuery());
	const canManage = useCan("document.manage");
	const agentsById = (0, import_react.useMemo)(() => new Map(agents.map((a) => [a.id, a])), [agents]);
	const filtered = (0, import_react.useMemo)(() => {
		const term = search.trim().toLowerCase();
		return documents.filter((d) => {
			if (category !== "all" && d.category !== category) return false;
			if (term && !d.name.toLowerCase().includes(term)) return false;
			return true;
		});
	}, [
		documents,
		category,
		search
	]);
	const totalBytes = documents.reduce((s, d) => s + d.sizeBytes, 0);
	const versions = documents.reduce((s, d) => s + d.version, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Documents",
						value: String(documents.length),
						hint: "Fichiers archivés",
						icon: FolderOpen,
						index: 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Volume total",
						value: formatBytes(totalBytes),
						hint: "Toutes catégories",
						icon: HardDrive,
						index: 1
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Catégories",
						value: String(new Set(documents.map((d) => d.category)).size),
						hint: "Sur " + CATEGORIES.length + " possibles",
						icon: Layers,
						index: 2
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Versions",
						value: String(versions),
						hint: "Historique cumulé",
						icon: FileText,
						index: 3
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5",
					children: ["all", ...CATEGORIES].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setCategory(c),
						className: cn("border px-3 py-1.5 text-[0.62rem] tracking-[0.12em] uppercase transition-colors", category === c ? "border-gold bg-gold/10 text-gold" : "border-line text-muted-foreground hover:border-gold hover:text-navy"),
						children: c === "all" ? "Tous" : label(DOCUMENT_LABELS, c)
					}, c))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "relative flex items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 size-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: search,
							onChange: (e) => setSearch(e.target.value),
							placeholder: "Rechercher…",
							className: "h-10 w-44 border border-line bg-admin-surface pl-9 pr-3 text-sm outline-none focus:border-gold sm:w-56"
						})]
					}), canManage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminButton, {
						onClick: () => setUploading(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), " Importer"]
					}) : null]
				})]
			}),
			filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "Aucun document",
				description: "Importez des mandats, titres fonciers, compromis ou factures pour les retrouver ici.",
				action: canManage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminButton, {
					onClick: () => setUploading(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-3.5" }), " Importer un fichier"]
				}) : void 0
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-line border border-line bg-admin-surface",
				children: filtered.map((doc, i) => {
					const uploader = agentsById.get(doc.uploadedById);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						style: { ["--i"]: i },
						className: "stagger-in flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-sand/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setPreview(doc),
								className: "grid size-10 shrink-0 place-items-center border border-line bg-sand text-gold",
								"aria-label": `Aperçu de ${doc.name}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setPreview(doc),
									className: "block max-w-full truncate text-left text-sm font-medium text-navy capitalize hover:text-gold",
									children: doc.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "border border-line px-1.5 py-0.5 text-[0.55rem] tracking-[0.12em] uppercase",
											children: label(DOCUMENT_LABELS, doc.category)
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
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatDate(doc.createdAt) }),
										uploader ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"aria-hidden": true,
											children: "·"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: uploader.name })] }) : null
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: doc.url,
								target: "_blank",
								rel: "noreferrer",
								"aria-label": `Télécharger ${doc.name}`,
								className: "grid size-9 shrink-0 place-items-center border border-line text-navy transition-colors hover:border-gold",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" })
							}),
							canManage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteDocumentButton, { doc }) : null
						]
					}, doc.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentPreviewModal, {
				doc: preview,
				onClose: () => setPreview(null)
			}),
			uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadModal, {
				clients,
				properties,
				onClose: () => setUploading(false)
			}) : null
		]
	});
}
function DeleteDocumentButton({ doc }) {
	const [confirming, setConfirming] = (0, import_react.useState)(false);
	const deleteDoc = useDeleteDocument();
	if (confirming) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => deleteDoc.mutate(doc.id, { onSuccess: () => setConfirming(false) }),
		className: "border border-negative/50 px-2.5 py-2 text-[0.6rem] tracking-[0.12em] text-negative uppercase transition-colors hover:bg-negative hover:text-white",
		children: "Confirmer"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => setConfirming(true),
		"aria-label": `Supprimer ${doc.name}`,
		className: "grid size-9 shrink-0 place-items-center border border-line text-muted-foreground transition-colors hover:border-negative hover:text-negative",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
	});
}
function DocumentPreviewModal({ doc, onClose }) {
	if (!doc) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
		open: true,
		onClose,
		title: doc.name,
		size: "lg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-2 gap-3 text-sm sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs text-muted-foreground uppercase",
						children: "Catégorie"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 font-medium text-navy",
						children: label(DOCUMENT_LABELS, doc.category)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs text-muted-foreground uppercase",
						children: "Taille"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 font-medium text-navy tabular-nums",
						children: formatBytes(doc.sizeBytes)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs text-muted-foreground uppercase",
						children: "Version"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
						className: "mt-1 font-medium text-navy tabular-nums",
						children: ["v", doc.version]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs text-muted-foreground uppercase",
						children: "Ajouté le"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 font-medium text-navy",
						children: formatDate(doc.createdAt)
					})] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex min-h-[420px] items-center justify-center border border-line bg-sand/50 p-6",
				children: doc.mimeType === "application/pdf" && doc.url !== "#" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
					title: doc.name,
					src: doc.url,
					className: "h-[420px] w-full"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-3 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-14 place-items-center border border-line bg-admin-surface text-gold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-6" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Aperçu non disponible pour ce type de fichier (démo : document simulé)."
					})]
				})
			})]
		})
	});
}
function UploadModal({ clients, properties, onClose }) {
	const [file, setFile] = (0, import_react.useState)(null);
	const [category, setCategory] = (0, import_react.useState)("mandat");
	const [propertyId, setPropertyId] = (0, import_react.useState)("");
	const [clientId, setClientId] = (0, import_react.useState)("");
	const [dragging, setDragging] = (0, import_react.useState)(false);
	const inputRef = (0, import_react.useRef)(null);
	const create = useCreateDocument();
	const submit = async () => {
		if (!file) return;
		await create.mutateAsync({
			name: file.name.replace(/\.(pdf|png|jpe?g|webp|docx?)$/i, ""),
			category,
			mimeType: file.type || "application/pdf",
			sizeBytes: file.size,
			url: URL.createObjectURL(file),
			propertyId: propertyId || void 0,
			clientId: clientId || void 0
		});
		onClose();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
		open: true,
		onClose,
		title: "Importer un document",
		description: "Le fichier reste en local dans cette démo ; il sera rattaché au client ou au bien choisi.",
		footer: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminButton, {
			variant: "outline",
			onClick: onClose,
			children: "Annuler"
		}, "cancel"), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminButton, {
			disabled: !file,
			onClick: submit,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-3.5" }), " Importer"]
		}, "save")],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					role: "button",
					tabIndex: 0,
					onClick: () => inputRef.current?.click(),
					onKeyDown: (e) => e.key === "Enter" && inputRef.current?.click(),
					onDragOver: (e) => {
						e.preventDefault();
						setDragging(true);
					},
					onDragLeave: () => setDragging(false),
					onDrop: (e) => {
						e.preventDefault();
						setDragging(false);
						const f = e.dataTransfer.files?.[0];
						if (f) setFile(f);
					},
					className: cn("flex cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed py-10 text-center transition-colors", dragging ? "border-gold bg-gold/8" : "border-line hover:border-gold/60"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: cn("size-6", file ? "text-positive" : "text-gold") }),
						file ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-full truncate px-4 text-sm font-medium text-navy",
							children: file.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground tabular-nums",
							children: formatBytes(file.size)
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-navy",
							children: "Glissez un fichier ici ou cliquez pour parcourir"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "PDF, images, documents — 20 Mo max"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: inputRef,
							type: "file",
							className: "hidden",
							onChange: (e) => setFile(e.target.files?.[0] ?? null)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground uppercase",
						children: "Catégorie"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: category,
						onChange: (e) => setCategory(e.target.value),
						className: "h-11 border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold",
						children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c,
							children: label(DOCUMENT_LABELS, c)
						}, c))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground uppercase",
							children: "Bien (optionnel)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: propertyId,
							onChange: (e) => setPropertyId(e.target.value),
							className: "h-11 border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "—"
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
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground uppercase",
							children: "Client (optionnel)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: clientId,
							onChange: (e) => setClientId(e.target.value),
							className: "h-11 border border-line bg-admin-bg/40 px-3 text-sm outline-none focus:border-gold",
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
					})]
				})
			]
		})
	});
}
//#endregion
export { DocumentsPage as component };
