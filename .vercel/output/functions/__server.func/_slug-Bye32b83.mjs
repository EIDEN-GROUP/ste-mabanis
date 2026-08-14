import { r as articles } from "./_ssr/utils-BWXQYj3d.mjs";
import { o as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./_slug-Dymf-vDA.mjs";
import { a as Section, i as Reveal } from "./_ssr/layout-bits-BHY2L1ae.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-Bye32b83.js
var import_jsx_runtime = require_jsx_runtime();
function ArticlePage() {
	const { article } = Route.useLoaderData();
	const others = articles.filter((a) => a.slug !== article.slug).slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden bg-navy pt-32 pb-16 text-white sm:pt-40 sm:pb-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: article.image,
					alt: "",
					"aria-hidden": true,
					width: 1280,
					height: 960,
					className: "absolute inset-0 h-full w-full object-cover opacity-25"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/60" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-3xl px-5 sm:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "eyebrow",
						children: [
							article.category,
							" · ",
							article.date,
							" · ",
							article.readTime
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "display mt-5 text-[clamp(2.25rem,5.5vw,4.5rem)]",
						children: article.title
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "mx-auto max-w-3xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "display text-2xl leading-snug text-blue",
					children: article.excerpt
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 space-y-5 text-[1.02rem] leading-relaxed text-foreground/85",
					children: article.body.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p }, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 border-t border-line pt-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Un projet en tête ?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: "Nos conseillers répondent à vos questions sans engagement, par téléphone ou en agence."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							className: "mt-5 inline-block bg-navy px-6 py-3.5 text-[0.7rem] tracking-[0.18em] text-white uppercase hover:bg-gold hover:text-navy",
							children: "Nous écrire"
						})
					]
				})
			]
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			tone: "sand",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "À lire ensuite"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-10 md:grid-cols-3",
				children: others.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * 70,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/actualites/$slug",
						params: { slug: a.slug },
						className: "zoom-frame block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: a.image,
								alt: a.title,
								loading: "lazy",
								width: 1280,
								height: 960,
								className: "aspect-16/10 w-full object-cover"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "display mt-4 text-2xl",
							children: a.title
						})]
					})
				}, a.slug))
			})]
		})
	] });
}
//#endregion
export { ArticlePage as component };
