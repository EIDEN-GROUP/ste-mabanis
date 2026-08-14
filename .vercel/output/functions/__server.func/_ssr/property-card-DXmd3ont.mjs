import { i as __toESM } from "../_runtime.mjs";
import { a as formatMAD, i as cn } from "./utils-BTE8P7Sw.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as Maximize, Dt as BedDouble, Ot as Bath, Q as Heart } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/property-card-DXmd3ont.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEY = "mabanis:favorites";
function read() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}
function useFavorites() {
	const [favorites, setFavorites] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		setFavorites(read());
		const onStorage = () => setFavorites(read());
		window.addEventListener("storage", onStorage);
		window.addEventListener("mabanis:favorites", onStorage);
		return () => {
			window.removeEventListener("storage", onStorage);
			window.removeEventListener("mabanis:favorites", onStorage);
		};
	}, []);
	return {
		favorites,
		toggle: (0, import_react.useCallback)((slug) => {
			const next = read().includes(slug) ? read().filter((s) => s !== slug) : [...read(), slug];
			window.localStorage.setItem(KEY, JSON.stringify(next));
			setFavorites(next);
			window.dispatchEvent(new Event("mabanis:favorites"));
		}, []),
		isFavorite: (slug) => favorites.includes(slug)
	};
}
function PropertyCard({ property, className }) {
	const { isFavorite, toggle } = useFavorites();
	const fav = isFavorite(property.slug);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("group relative flex flex-col bg-card shadow-card", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/proprietes/$slug",
				params: { slug: property.slug },
				className: "zoom-frame relative block aspect-[4/3] overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: property.images[0],
						alt: property.title,
						loading: "lazy",
						width: 1280,
						height: 960,
						className: "h-full w-full object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/60 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute top-4 left-4 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "bg-navy/90 px-3 py-1.5 text-[0.6rem] tracking-[0.18em] text-white uppercase backdrop-blur",
							children: property.transaction === "vente" ? "À vendre" : "À louer"
						}), property.isNew ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "bg-gold px-3 py-1.5 text-[0.6rem] tracking-[0.18em] text-navy uppercase",
							children: "Nouveau"
						}) : null]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": fav ? "Retirer des favoris" : "Ajouter aux favoris",
				"aria-pressed": fav,
				onClick: () => toggle(property.slug),
				className: "absolute top-3.5 right-3.5 grid size-9 place-items-center bg-white/90 backdrop-blur transition-colors hover:bg-white",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("size-4 transition-colors", fav ? "fill-gold text-gold" : "text-navy/60") })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col border-t border-line p-5 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase",
						children: [
							property.type,
							" · ",
							property.neighborhood
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "display mt-2.5 text-2xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/proprietes/$slug",
							params: { slug: property.slug },
							className: "link-underline",
							children: property.title
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-lg font-medium tracking-tight text-blue",
						children: [
							formatMAD(property.price),
							" MAD",
							property.priceNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-1 text-xs font-normal text-muted-foreground",
								children: property.priceNote
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4 text-xs text-muted-foreground",
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
									property.bedrooms,
									" ch."
								]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bath, { className: "size-3.5 text-gold" }),
									" ",
									property.bathrooms,
									" sdb"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-auto tracking-[0.12em]",
								children: property.reference
							})
						]
					})
				]
			})
		]
	});
}
//#endregion
export { useFavorites as n, PropertyCard as t };
