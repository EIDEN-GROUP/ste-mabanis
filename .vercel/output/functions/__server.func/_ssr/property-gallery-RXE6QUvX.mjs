import { i as __toESM } from "../_runtime.mjs";
import { i as cn } from "./utils-BWXQYj3d.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as PROPERTY_STATUSES } from "./types-CH15H5aZ.mjs";
import { S as Search, gt as ChevronLeft, ht as ChevronRight, n as X, y as SlidersHorizontal } from "../_libs/lucide-react.mjs";
import { i as Drawer, l as PROPERTY_STATUS_LABELS, n as AdminButton, w as label } from "./primitives-BRdCR_bJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/property-gallery-RXE6QUvX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Filters live inline on desktop and inside a drawer on mobile — the spec's
* "drawer-style filters" rule. Both render the same `<Fields>` body.
*/
function PropertyFilters({ value, onChange, className }) {
	const [drawerOpen, setDrawerOpen] = (0, import_react.useState)(false);
	const activeCount = (value.status?.length ?? 0) + (value.transaction ? 1 : 0) + (value.sort ? 1 : 0);
	const fields = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fields, {
		value,
		onChange
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "relative flex min-w-0 flex-1 items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "search",
						value: value.search ?? "",
						onChange: (e) => onChange({
							...value,
							search: e.target.value || void 0
						}),
						placeholder: "Référence, titre, quartier…",
						"aria-label": "Rechercher un bien",
						className: "h-11 w-full border border-line bg-admin-surface pr-3 pl-9 text-sm outline-none placeholder:text-muted-foreground focus:border-gold"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setDrawerOpen(true),
					className: "relative inline-flex h-11 shrink-0 items-center gap-2 border border-line bg-admin-surface px-4 text-[0.68rem] tracking-[0.14em] text-navy uppercase transition-colors hover:border-gold lg:hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-4" }),
						"Filtres",
						activeCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-[1.1rem] place-items-center bg-gold text-[0.6rem] text-navy tabular-nums",
							children: activeCount
						}) : null
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 hidden lg:block",
				children: fields
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer, {
				open: drawerOpen,
				onClose: () => setDrawerOpen(false),
				title: "Filtres",
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminButton, {
					variant: "outline",
					className: "flex-1",
					onClick: () => onChange({ search: value.search }),
					children: "Réinitialiser"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminButton, {
					className: "flex-1",
					onClick: () => setDrawerOpen(false),
					children: "Voir les résultats"
				})] }),
				children: fields
			})
		]
	});
}
function Fields({ value, onChange }) {
	const toggleStatus = (s) => {
		const current = value.status ?? [];
		const next = current.includes(s) ? current.filter((x) => x !== s) : [...current, s];
		onChange({
			...value,
			status: next.length ? next : void 0
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
				className: "eyebrow mb-3",
				children: "Statut"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: PROPERTY_STATUSES.map((s) => {
					const on = value.status?.includes(s) ?? false;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => toggleStatus(s),
						"aria-pressed": on,
						className: cn("min-h-9 border px-3 py-1.5 text-[0.68rem] tracking-[0.1em] uppercase transition-colors duration-300", on ? "border-gold bg-gold/10 text-navy" : "border-line text-muted-foreground hover:border-gold/60"),
						children: label(PROPERTY_STATUS_LABELS, s)
					}, s);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
				className: "eyebrow mb-3",
				children: "Transaction"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: ["vente", "location"].map((t) => {
					const on = value.transaction === t;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => onChange({
							...value,
							transaction: on ? void 0 : t
						}),
						"aria-pressed": on,
						className: cn("min-h-9 border px-3 py-1.5 text-[0.68rem] tracking-[0.1em] uppercase transition-colors duration-300", on ? "border-gold bg-gold/10 text-navy" : "border-line text-muted-foreground hover:border-gold/60"),
						children: t === "vente" ? "À vendre" : "À louer"
					}, t);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
				className: "eyebrow mb-3",
				children: "Tri"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: value.sort ?? "recent",
				onChange: (e) => onChange({
					...value,
					sort: e.target.value
				}),
				className: "h-11 w-full border border-line bg-admin-surface px-3 text-sm outline-none focus:border-gold lg:w-56",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "recent",
						children: "Plus récents"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "price_desc",
						children: "Prix décroissant"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "price_asc",
						children: "Prix croissant"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "views",
						children: "Plus vus"
					})
				]
			})] }),
			(value.status?.length || value.transaction) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onChange({ search: value.search }),
				className: "inline-flex items-center gap-1.5 text-[0.68rem] tracking-[0.12em] text-muted-foreground uppercase transition-colors hover:text-navy",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" }), "Effacer les filtres"]
			})
		]
	});
}
/**
* Swipeable gallery. On touch it is a native scroll-snap carousel — no JS drag
* handling, so momentum and rubber-banding stay native. Arrows appear from `sm`
* where a pointer is likely.
*/
function PropertyGallery({ media, className }) {
	const photos = media.filter((m) => m.kind === "photo").sort((a, b) => a.position - b.position);
	const trackRef = (0, import_react.useRef)(null);
	const [active, setActive] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const el = trackRef.current;
		if (!el) return;
		let raf = 0;
		const onScroll = () => {
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() => {
				setActive(Math.round(el.scrollLeft / el.clientWidth));
			});
		};
		el.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			el.removeEventListener("scroll", onScroll);
			cancelAnimationFrame(raf);
		};
	}, []);
	const go = (i) => {
		const el = trackRef.current;
		if (!el) return;
		el.scrollTo({
			left: i * el.clientWidth,
			behavior: "smooth"
		});
	};
	if (!photos.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid aspect-[4/3] place-items-center border border-line bg-sand", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Aucune photo"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("group relative", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: trackRef,
			className: "flex aspect-[4/3] snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
			children: photos.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative w-full shrink-0 snap-center bg-sand",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: m.url,
					alt: m.label ?? "",
					width: 1280,
					height: 960,
					className: "h-full w-full object-cover"
				})
			}, m.id))
		}), photos.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => go(Math.max(0, active - 1)),
				disabled: active === 0,
				"aria-label": "Photo précédente",
				className: "absolute top-1/2 left-3 hidden size-10 -translate-y-1/2 place-items-center bg-admin-surface/90 text-navy opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 disabled:pointer-events-none disabled:opacity-0 sm:grid",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => go(Math.min(photos.length - 1, active + 1)),
				disabled: active === photos.length - 1,
				"aria-label": "Photo suivante",
				className: "absolute top-1/2 right-3 hidden size-10 -translate-y-1/2 place-items-center bg-admin-surface/90 text-navy opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 disabled:pointer-events-none disabled:opacity-0 sm:grid",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-x-0 bottom-3 flex justify-center gap-1.5",
				children: photos.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => go(i),
					"aria-label": `Aller à la photo ${i + 1}`,
					"aria-current": i === active,
					className: cn("h-1 transition-all duration-400", i === active ? "w-6 bg-gold" : "w-2 bg-white/70")
				}, m.id))
			})
		] }) : null]
	});
}
//#endregion
export { PropertyGallery as n, PropertyFilters as t };
