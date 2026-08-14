import { u as images, y as testimonials } from "./utils-BWXQYj3d.mjs";
import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Section, i as Reveal, r as PageHero } from "./layout-bits-BHY2L1ae.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/temoignages-212uXFz9.js
var import_jsx_runtime = require_jsx_runtime();
function TestimonialsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Témoignages",
		title: "Ce qu'on retient, une fois les clés remises.",
		intro: "Nous publions les retours tels qu'ils nous sont transmis, y compris ceux qui commencent par « j'ai râlé ».",
		image: images.editorial1
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "columns-1 gap-8 md:columns-2 xl:columns-3",
		children: testimonials.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
			delay: i * 60,
			className: "mb-8 break-inside-avoid bg-card p-8 shadow-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "display text-3xl text-gold",
					children: "“"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[1.02rem] leading-relaxed",
					children: t.quote
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 border-t border-line pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: t.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							t.role,
							" · ",
							t.location
						]
					})]
				})
			]
		}, t.name))
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
		className: "mt-16 bg-navy p-10 text-center text-white sm:p-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "display text-[clamp(1.9rem,4vw,3rem)]",
			children: "Le prochain témoignage sera peut-être le vôtre."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/contact",
			className: "mt-8 inline-block bg-gold px-7 py-4 text-[0.7rem] tracking-[0.18em] text-navy uppercase",
			children: "Démarrer mon projet"
		})]
	})] })] });
}
//#endregion
export { TestimonialsPage as component };
