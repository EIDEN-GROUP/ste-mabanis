import { d as locations, m as propertiesByLocation, u as images } from "./utils-BTE8P7Sw.mjs";
import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Section, i as Reveal, r as PageHero } from "./layout-bits-BGOsNYiy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quartiers-8fPqWvgb.js
var import_jsx_runtime = require_jsx_runtime();
function LocationsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Quartiers",
		title: "Le bon quartier vaut mieux que le beau salon.",
		intro: "Nos repères de prix viennent de transactions réellement signées sur le Grand Agadir, pas d'annonces en vitrine.",
		image: images.locationAgadir
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-8 md:grid-cols-2 xl:grid-cols-3",
		children: locations.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
			delay: i * 70,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/quartiers/$slug",
				params: { slug: l.slug },
				className: "zoom-frame group block bg-card shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: l.image,
						alt: l.name,
						loading: "lazy",
						width: 1280,
						height: 960,
						className: "aspect-4/3 w-full object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[0.6rem] tracking-[0.2em] text-gold uppercase",
							children: l.city
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "display mt-2 text-2xl",
							children: l.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-muted-foreground",
							children: l.intro
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex items-center justify-between border-t border-line pt-4 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tracking-[0.12em] text-blue uppercase",
								children: l.priceRange
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: [propertiesByLocation(l.slug).length, " bien(s)"]
							})]
						})
					]
				})]
			})
		}, l.slug))
	}) })] });
}
//#endregion
export { LocationsPage as component };
