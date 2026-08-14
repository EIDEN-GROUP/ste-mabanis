import { i as __toESM } from "../_runtime.mjs";
import { d as locations, f as properties, h as propertyTypes, i as cn } from "./utils-BTE8P7Sw.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { x as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Reveal, r as PageHero } from "./layout-bits-BGOsNYiy.mjs";
import { n as X, y as SlidersHorizontal } from "../_libs/lucide-react.mjs";
import { n as useFavorites, t as PropertyCard } from "./property-card-DXmd3ont.mjs";
import { t as Route } from "./proprietes-C7hv1psB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/proprietes-CRRqA5Tz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PropertiesPage() {
	const search = Route.useSearch();
	const navigate = useNavigate({ from: "/proprietes/" });
	const [filtersOpen, setFiltersOpen] = (0, import_react.useState)(false);
	const [onlyFavorites, setOnlyFavorites] = (0, import_react.useState)(false);
	const { favorites } = useFavorites();
	const update = (patch) => navigate({ search: (prev) => ({
		...prev,
		...patch
	}) });
	const results = (0, import_react.useMemo)(() => {
		let list = properties.filter((p) => p.transaction === search.transaction);
		if (search.lieu) list = list.filter((p) => p.locationSlug === search.lieu);
		if (search.type) list = list.filter((p) => p.type === search.type);
		const { prixMax, surfaceMin, chambres } = search;
		if (prixMax) list = list.filter((p) => p.price <= prixMax);
		if (surfaceMin) list = list.filter((p) => p.surface >= surfaceMin);
		if (chambres) list = list.filter((p) => p.bedrooms >= chambres);
		if (onlyFavorites) list = list.filter((p) => favorites.includes(p.slug));
		const sorted = [...list];
		if (search.tri === "prix-asc") sorted.sort((a, b) => a.price - b.price);
		else if (search.tri === "prix-desc") sorted.sort((a, b) => b.price - a.price);
		else if (search.tri === "surface") sorted.sort((a, b) => b.surface - a.surface);
		else sorted.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
		return sorted;
	}, [
		search,
		onlyFavorites,
		favorites
	]);
	const activeCount = (search.lieu ? 1 : 0) + (search.type ? 1 : 0) + (search.prixMax ? 1 : 0) + (search.surfaceMin ? 1 : 0) + (search.chambres ? 1 : 0);
	const filters = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Quartier",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: search.lieu,
					onChange: (e) => update({ lieu: e.target.value }),
					className: "h-11 w-full border border-line bg-background px-3 text-sm outline-none focus:border-gold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "Tous les quartiers"
					}), locations.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: l.slug,
						children: l.name
					}, l.slug))]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Type de bien",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: search.type,
					onChange: (e) => update({ type: e.target.value }),
					className: "h-11 w-full border border-line bg-background px-3 text-sm outline-none focus:border-gold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "Tous les types"
					}), propertyTypes.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: t,
						children: t
					}, t))]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Budget maximum",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: String(search.prixMax),
					onChange: (e) => update({ prixMax: Number(e.target.value) }),
					className: "h-11 w-full border border-line bg-background px-3 text-sm outline-none focus:border-gold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "0",
						children: "Sans limite"
					}), (search.transaction === "vente" ? [
						15e5,
						3e6,
						5e6,
						1e7
					] : [
						8e3,
						15e3,
						25e3
					]).map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: v,
						children: [
							new Intl.NumberFormat("fr-MA").format(v),
							" MAD",
							search.transaction === "location" ? " / mois" : ""
						]
					}, v))]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: `Surface minimum : ${search.surfaceMin || 0} m²`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "range",
					min: 0,
					max: 450,
					step: 10,
					value: search.surfaceMin,
					onChange: (e) => update({ surfaceMin: Number(e.target.value) }),
					className: "w-full accent-[var(--gold)]"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Chambres",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						0,
						1,
						2,
						3,
						4,
						5
					].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => update({ chambres: n }),
						className: cn("h-10 min-w-11 border px-3 text-sm transition-colors", search.chambres === n ? "border-gold bg-gold text-navy" : "border-line hover:border-navy"),
						children: n === 0 ? "Toutes" : `${n}+`
					}, n))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => update({
					lieu: "",
					type: "",
					prixMax: 0,
					surfaceMin: 0,
					chambres: 0
				}),
				className: "text-xs tracking-[0.16em] text-muted-foreground uppercase underline underline-offset-4 hover:text-navy",
				children: "Réinitialiser les filtres"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "Portefeuille",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Chaque bien a été visité avant d'être publié." }),
			intro: "Villas, appartements, riads, penthouses et locaux professionnels sur Agadir et le littoral. Aucun bien n'entre ici sans vérification du titre foncier."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-5 py-12 sm:px-8 sm:py-16 lg:px-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-[100rem]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-6 border-b border-line",
					children: [["vente", "location"].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => update({
							transaction: t,
							prixMax: 0
						}),
						className: cn("-mb-px border-b-2 pb-3 text-sm tracking-[0.14em] uppercase transition-colors", search.transaction === t ? "border-gold text-navy" : "border-transparent text-muted-foreground hover:text-navy"),
						children: t === "vente" ? "Acheter" : "Louer"
					}, t)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex items-center gap-3 pb-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setOnlyFavorites((v) => !v),
								className: cn("border px-4 py-2 text-xs tracking-[0.14em] uppercase transition-colors", onlyFavorites ? "border-gold bg-gold text-navy" : "border-line hover:border-navy"),
								children: [
									"Favoris (",
									favorites.length,
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: search.tri,
								onChange: (e) => update({ tri: e.target.value }),
								className: "h-9 border border-line bg-background px-3 text-xs outline-none focus:border-gold",
								"aria-label": "Trier les résultats",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "recent",
										children: "Plus récents"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "prix-asc",
										children: "Prix croissant"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "prix-desc",
										children: "Prix décroissant"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "surface",
										children: "Plus grande surface"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setFiltersOpen(true),
								className: "inline-flex items-center gap-2 border border-line px-4 py-2 text-xs tracking-[0.14em] uppercase lg:hidden",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-3.5" }),
									" Filtres",
									activeCount ? ` (${activeCount})` : ""
								]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 grid gap-10 lg:grid-cols-[17rem_1fr] lg:gap-14",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: "hidden lg:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sticky top-28",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "Filtres avancés"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6",
								children: filters
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [
							results.length,
							" bien",
							results.length > 1 ? "s" : "",
							" correspondant",
							results.length > 1 ? "s" : "",
							" à votre recherche"
						]
					}), results.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid gap-8 sm:grid-cols-2 2xl:grid-cols-3",
						children: results.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: i * 60,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyCard, { property: p })
						}, p.slug))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 border border-line bg-card p-10 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "display text-3xl",
								children: "Aucun bien ne correspond encore"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mx-auto mt-3 max-w-md text-sm text-muted-foreground",
								children: "Élargissez vos critères ou confiez-nous votre recherche : une partie de notre portefeuille ne passe jamais en ligne."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								className: "mt-6 inline-block bg-navy px-6 py-3 text-[0.7rem] tracking-[0.18em] text-white uppercase hover:bg-gold hover:text-navy",
								children: "Décrire ma recherche"
							})
						]
					})] })]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("fixed inset-0 z-[70] lg:hidden", filtersOpen ? "visible" : "invisible pointer-events-none"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("absolute inset-0 bg-navy/60 transition-opacity duration-300", filtersOpen ? "opacity-100" : "opacity-0"),
				onClick: () => setFiltersOpen(false)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("absolute inset-x-0 bottom-0 max-h-[85svh] overflow-y-auto bg-background p-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]", filtersOpen ? "translate-y-0" : "translate-y-full"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Filtres"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setFiltersOpen(false),
							"aria-label": "Fermer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
						})]
					}),
					filters,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setFiltersOpen(false),
						className: "mt-8 w-full bg-navy py-4 text-[0.7rem] tracking-[0.18em] text-white uppercase",
						children: [
							"Voir les ",
							results.length,
							" résultats"
						]
					})
				]
			})]
		})
	] });
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-2 text-[0.6rem] tracking-[0.18em] text-muted-foreground uppercase",
		children: label
	}), children] });
}
//#endregion
export { PropertiesPage as component };
