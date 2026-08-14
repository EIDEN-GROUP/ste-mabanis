import { r as articles, u as images } from "./utils-BWXQYj3d.mjs";
import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Section, i as Reveal, r as PageHero } from "./layout-bits-BHY2L1ae.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/actualites-DEH3Pc7d.js
var import_jsx_runtime = require_jsx_runtime();
function NewsPage() {
	const [lead, ...rest] = articles;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Actualités & insights",
		title: "Le marché expliqué par ceux qui le pratiquent.",
		intro: "Pas de communiqués : des chiffres issus de nos transactions et des conseils que nous donnons déjà à nos clients.",
		image: images.locationAgadir
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [lead ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/actualites/$slug",
		params: { slug: lead.slug },
		className: "zoom-frame group grid gap-8 lg:grid-cols-2 lg:items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: lead.image,
				alt: lead.title,
				loading: "lazy",
				width: 1280,
				height: 960,
				className: "aspect-4/3 w-full object-cover"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[0.62rem] tracking-[0.2em] text-gold uppercase",
				children: [
					lead.category,
					" · ",
					lead.date,
					" · ",
					lead.readTime
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "display mt-4 text-[clamp(2rem,4vw,3.5rem)]",
				children: lead.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 leading-relaxed text-muted-foreground",
				children: lead.excerpt
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "link-underline mt-6 inline-block text-[0.7rem] tracking-[0.18em] uppercase",
				children: "Lire l'article"
			})
		] })]
	}) }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-16 grid gap-10 md:grid-cols-2 xl:grid-cols-4",
		children: rest.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
			delay: i * 70,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/actualites/$slug",
				params: { slug: a.slug },
				className: "zoom-frame group block",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: a.image,
							alt: a.title,
							loading: "lazy",
							width: 1280,
							height: 960,
							className: "aspect-4/3 w-full object-cover"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-5 text-[0.6rem] tracking-[0.2em] text-gold uppercase",
						children: [
							a.category,
							" · ",
							a.readTime
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "display mt-2 text-2xl",
						children: a.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted-foreground",
						children: a.excerpt
					})
				]
			})
		}, a.slug))
	})] })] });
}
//#endregion
export { NewsPage as component };
