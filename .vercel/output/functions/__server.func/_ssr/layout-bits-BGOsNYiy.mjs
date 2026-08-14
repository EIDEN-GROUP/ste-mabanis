import { i as __toESM } from "../_runtime.mjs";
import { i as cn } from "./utils-BTE8P7Sw.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as animate, r as useReducedMotion, s as motion, t as useInView } from "../_libs/framer-motion+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/layout-bits-BGOsNYiy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var hero_agadir_default = "/assets/hero-agadir-DFgWPer_.jpg";
/** House easing — the same curve every transition on the site leans on. */
var EASE = [
	.16,
	1,
	.3,
	1
];
var ENTER = {
	duration: .9,
	ease: EASE
};
var VIEWPORT = {
	once: true,
	amount: .15,
	margin: "0px 0px -8% 0px"
};
/** Fade + rise, triggered the first time the block enters the viewport. */
function Reveal({ children, className, delay = 0, y = 26 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className,
		initial: {
			opacity: 0,
			y
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: VIEWPORT,
		transition: {
			...ENTER,
			delay: delay / 1e3
		},
		children
	});
}
/** Headline that climbs word by word out of an overflow mask. */
function TextReveal({ text, className, delay = 0, step = 55 }) {
	const words = text.split(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
		className: cn("inline", className),
		initial: "hidden",
		whileInView: "show",
		viewport: {
			once: true,
			amount: .25
		},
		variants: {
			hidden: {},
			show: { transition: {
				staggerChildren: step / 1e3,
				delayChildren: delay / 1e3
			} }
		},
		children: words.map((word, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "inline-block overflow-hidden py-[0.14em] align-bottom",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				className: "inline-block",
				variants: {
					hidden: {
						y: "110%",
						opacity: 0
					},
					show: {
						y: "0%",
						opacity: 1,
						transition: {
							duration: .95,
							ease: EASE
						}
					}
				},
				children: word
			})
		}), i < words.length - 1 ? " " : null] }, `${word}-${i}`))
	});
}
/** Counts up to `value` once the number is on screen. */
function Counter({ value, suffix = "", duration = 1.8 }) {
	const ref = (0, import_react.useRef)(null);
	const inView = useInView(ref, {
		once: true,
		amount: .4
	});
	const reduced = useReducedMotion();
	const [display, setDisplay] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!inView) return;
		if (reduced) {
			setDisplay(value);
			return;
		}
		const controls = animate(0, value, {
			duration,
			ease: [
				.22,
				1,
				.36,
				1
			],
			onUpdate: (v) => setDisplay(Math.round(v))
		});
		return () => controls.stop();
	}, [
		inView,
		value,
		duration,
		reduced
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		ref,
		children: [display, suffix]
	});
}
/**
* One hero for every page: a full-bleed photograph, and the title laid across
* it. Index pages split their title in two around a gold rule that draws itself
* once the words have landed (`lead` + `trail`); detail pages, whose titles are
* a person or a place, pass a single `title` instead.
*
* The photograph is what the fixed header rides over while it is still
* transparent, so a hero without one would leave the bar unreadable — hence the
* fallback image rather than an optional one.
*/
function PageHero({ eyebrow, title, lead, trail, intro, image = hero_agadir_default, children }) {
	const split = Boolean(lead && trail);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative isolate flex min-h-[82svh] flex-col justify-center overflow-hidden bg-navy text-white",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
				src: image,
				alt: "",
				"aria-hidden": true,
				width: 1920,
				height: 1280,
				className: "absolute inset-0 -z-10 size-full object-cover",
				initial: {
					scale: 1.14,
					opacity: 0
				},
				animate: {
					scale: 1,
					opacity: 1
				},
				transition: {
					duration: 1.8,
					ease: EASE
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 -z-10 bg-black/45",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/25 to-black/55",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto w-full max-w-[100rem] px-5 pt-32 pb-16 sm:px-8 sm:pt-40 lg:px-12 lg:pb-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.p, {
						className: "eyebrow flex items-center gap-4",
						initial: {
							opacity: 0,
							y: 14
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .8,
							ease: EASE
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-10 bg-gold" }), eyebrow]
					}),
					split ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "display mt-8 flex items-center gap-5 text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] sm:gap-8 lg:gap-12",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 text-white",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextReveal, {
									text: lead,
									delay: 120
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
								"aria-hidden": true,
								className: "h-px min-w-6 flex-1 origin-left bg-gold/70",
								initial: { scaleX: 0 },
								animate: { scaleX: 1 },
								transition: {
									duration: 1.1,
									ease: EASE,
									delay: .75
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 text-gold",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextReveal, {
									text: trail,
									delay: 260
								})
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "display mt-8 max-w-4xl text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95]",
						children: typeof title === "string" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextReveal, {
							text: title,
							delay: 120
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
							className: "inline-block",
							initial: {
								opacity: 0,
								y: 26
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .9,
								ease: EASE,
								delay: .12
							},
							children: title
						})
					}),
					intro ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						className: "mt-8 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg",
						initial: {
							opacity: 0,
							y: 18
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .9,
							ease: EASE,
							delay: .3
						},
						children: intro
					}) : null,
					children ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							y: 18
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .9,
							ease: EASE,
							delay: .42
						},
						children
					}) : null
				]
			})
		]
	});
}
function Section({ children, className, id, tone = "light" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id,
		className: cn("px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-32", tone === "sand" && "bg-sand", tone === "navy" && "bg-navy text-white", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-[100rem]",
			children
		})
	});
}
function SectionHeading({ eyebrow, title, intro, action, tone = "light", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", tone === "navy" && "[&_h2]:text-white", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "eyebrow flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-gold" }), eyebrow]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display mt-4 text-[clamp(2rem,4.5vw,3.75rem)] leading-[0.98]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextReveal, {
						text: title,
						delay: 80
					})
				}),
				intro ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: 160,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("mt-5 text-base leading-relaxed", tone === "navy" ? "text-white/70" : "text-muted-foreground"),
						children: intro
					})
				}) : null
			]
		}), action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
			delay: 240,
			className: "shrink-0",
			children: action
		}) : null]
	});
}
//#endregion
export { Section as a, Reveal as i, EASE as n, SectionHeading as o, PageHero as r, TextReveal as s, Counter as t };
