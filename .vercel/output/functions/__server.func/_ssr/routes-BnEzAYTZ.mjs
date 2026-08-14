import { i as __toESM } from "../_runtime.mjs";
import { _ as socials, d as locations, f as properties, h as propertyTypes, i as cn, r as articles, u as images, y as testimonials } from "./utils-BWXQYj3d.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { x as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useTransform, c as AnimatePresence, i as useSpring, o as useScroll, r as useReducedMotion, s as motion } from "../_libs/framer-motion+[...].mjs";
import { a as Section, i as Reveal, n as EASE, o as SectionHeading, s as TextReveal } from "./layout-bits-BHY2L1ae.mjs";
import { Mt as ArrowRight, S as Search, V as MapPin, _t as ChevronDown, g as Star, jt as ArrowUpRight, kt as AtSign, ot as Facebook, q as Instagram } from "../_libs/lucide-react.mjs";
import { t as PropertyCard } from "./property-card-BR9HeY2C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BnEzAYTZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Lucide has no Threads glyph; the @ mark stands in for the handle. */
var SOCIAL_ICONS = {
	Instagram,
	Threads: AtSign,
	Facebook
};
/** Each block arrives a beat after the previous one. */
var HERO_STEP = (i) => ({
	initial: {
		opacity: 0,
		y: 24
	},
	animate: {
		opacity: 1,
		y: 0
	},
	transition: {
		duration: .9,
		ease: EASE,
		delay: .15 + i * .13
	}
});
function HomeHero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 -z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
						className: "size-full object-cover",
						src: "/hero-villa.mp4",
						poster: "/hero-villa-poster.jpg",
						autoPlay: true,
						muted: true,
						loop: true,
						playsInline: true,
						preload: "metadata",
						"aria-hidden": true,
						tabIndex: -1
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black/55" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-y-0 left-0 z-10 hidden w-12 flex-col items-center justify-between border-r border-white/10 py-32 xl:flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[0.6rem] tracking-[0.3em] text-white/45 [writing-mode:vertical-rl]",
					children: "AGADIR — MAROC"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-4",
					children: [socials.map((social) => {
						const Icon = SOCIAL_ICONS[social.label];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: social.href,
							target: "_blank",
							rel: "noreferrer noopener",
							"aria-label": social.label,
							className: "grid size-8 place-items-center text-white/45 transition-colors duration-500 hover:text-gold",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
						}, social.label);
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-16 w-px bg-white/20" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mx-auto flex w-full max-w-[100rem] flex-1 flex-col px-5 pt-28 pb-14 sm:px-8 sm:pt-32 lg:px-12 lg:pt-36 xl:pl-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 flex-col justify-center py-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.p, {
							className: "flex items-center gap-4 text-[0.7rem] font-medium tracking-[0.3em] text-white/70 uppercase",
							...HERO_STEP(0),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-10 bg-gold" }), "Bienvenue chez STE MABANIS"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
							className: "mt-7 max-w-4xl text-[clamp(2.5rem,6vw,5.4rem)] leading-[0.98] font-bold tracking-[-0.02em] text-white uppercase",
							...HERO_STEP(1),
							children: ["L'élégance immobilière", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-gold",
								children: " à Agadir."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							className: "mt-7 max-w-xl text-[0.95rem] leading-relaxed text-white/65 sm:text-base",
							...HERO_STEP(2),
							children: "Des propriétés d'exception au cœur d'Agadir et du Souss-Massa. Depuis 2024, STE MABANIS sélectionne et accompagne des projets immobiliers où emplacement, architecture et qualité de vie se rencontrent."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							className: "mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center",
							...HERO_STEP(3),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/proprietes",
								className: "btn-sheen group inline-flex items-center justify-center gap-3 rounded-md bg-gold px-8 py-4 text-[0.8rem] font-medium text-navy transition-colors duration-500 hover:bg-white",
								children: ["Découvrir nos biens", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 transition-transform duration-500 group-hover:translate-x-1.5" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/vendre",
								className: "inline-flex items-center justify-center gap-3 rounded-md border border-white/35 px-8 py-4 text-[0.8rem] font-medium text-white transition-colors duration-500 hover:border-white hover:bg-white/10",
								children: "Estimation gratuite"
							})]
						})
					]
				})
			})
		]
	});
}
/** Label · champ arrondi · légende — la trame de la maquette. */
function Field({ label, hint, value, onChange, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex min-w-0 flex-1 flex-col gap-2 px-1 py-1 sm:px-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[0.78rem] font-semibold text-navy",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "relative block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value,
					onChange: (e) => onChange(e.target.value),
					className: "h-11 w-full cursor-pointer appearance-none rounded-md border border-line bg-white pr-10 pl-4 text-sm text-navy transition-colors duration-300 outline-none hover:border-navy/30 focus:border-gold",
					children
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-navy/40" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hidden truncate text-[0.72rem] text-muted-foreground sm:block",
				children: hint
			})
		]
	});
}
function HeroSearch({ className }) {
	const navigate = useNavigate();
	const [transaction, setTransaction] = (0, import_react.useState)("vente");
	const [lieu, setLieu] = (0, import_react.useState)("");
	const [type, setType] = (0, import_react.useState)("");
	const [prixMax, setPrixMax] = (0, import_react.useState)("");
	const submit = () => navigate({
		to: "/proprietes",
		search: {
			transaction,
			lieu,
			type,
			prixMax: prixMax ? Number(prixMax) : 0,
			chambres: 0,
			surfaceMin: 0,
			tri: "recent"
		}
	});
	const lieuLabel = locations.find((l) => l.slug === lieu)?.city ?? "Tout le Grand Agadir";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("w-full", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-md bg-white p-4 shadow-[0_30px_70px_-32px_rgba(7,26,47,0.55)] sm:p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 inline-flex rounded-md bg-navy/90 p-1 backdrop-blur-sm",
				children: [{
					key: "vente",
					label: "Acheter"
				}, {
					key: "location",
					label: "Louer"
				}].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTransaction(t.key),
					"aria-pressed": transaction === t.key,
					className: cn("rounded-sm px-6 py-2.5 text-[0.78rem] font-medium transition-colors duration-500", transaction === t.key ? "bg-white text-navy" : "text-white/65 hover:text-white"),
					children: t.label
				}, t.key))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-0 lg:divide-x lg:divide-line sm:gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
						label: "Localisation",
						hint: lieuLabel,
						value: lieu,
						onChange: setLieu,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Tout le Grand Agadir"
						}), locations.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: l.slug,
							children: l.name
						}, l.slug))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
						label: "Type de bien",
						hint: type || "Villas, appartements, riads…",
						value: type,
						onChange: setType,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Tous les types"
						}), propertyTypes.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: t,
							children: t
						}, t))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
						label: "Budget",
						hint: transaction === "vente" ? "Prix d'achat maximum" : "Loyer mensuel maximum",
						value: prixMax,
						onChange: setPrixMax,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Sans limite"
						}), transaction === "vente" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "1500000",
								children: "1 500 000 MAD"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "3000000",
								children: "3 000 000 MAD"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "5000000",
								children: "5 000 000 MAD"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "10000000",
								children: "10 000 000 MAD"
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "8000",
								children: "8 000 MAD / mois"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "15000",
								children: "15 000 MAD / mois"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "25000",
								children: "25 000 MAD / mois"
							})
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "shrink-0 lg:pl-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: submit,
							className: "btn-sheen group flex w-full items-center justify-center gap-2.5 rounded-md bg-navy px-8 py-4 text-[0.8rem] font-medium text-white transition-colors duration-500 hover:bg-gold hover:text-navy lg:w-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" }), "Rechercher"]
						})
					})
				]
			})]
		})
	});
}
/**
* Desktop: panels that expand on hover, so the five secteurs of the Grand Agadir
* fit in a single screen. Mobile: a snap carousel of the same cards.
*/
function QuartiersShowcase() {
	const [active, setActive] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "hidden h-[32rem] gap-2 lg:flex xl:h-[36rem]",
		children: locations.map((l, i) => {
			const isActive = i === active;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/quartiers/$slug",
				params: { slug: l.slug },
				onMouseEnter: () => setActive(i),
				onFocus: () => setActive(i),
				"aria-label": `Découvrir ${l.name}`,
				className: "group relative rounded-md min-w-0 overflow-hidden outline-none",
				style: {
					flexGrow: isActive ? 3.6 : 1,
					flexBasis: 0,
					transition: "flex-grow 900ms cubic-bezier(0.16, 1, 0.3, 1)"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: l.image,
						alt: "",
						"aria-hidden": true,
						loading: "lazy",
						width: 1280,
						height: 960,
						className: cn("size-full object-cover transition-[transform,filter] duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]", isActive ? "scale-105 saturate-100" : "scale-100 saturate-50")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("absolute inset-0 transition-opacity duration-700", isActive ? "bg-gradient-to-t from-navy via-navy/35 to-transparent" : "bg-navy/70") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: cn("absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 pb-8 transition-opacity duration-500", isActive ? "pointer-events-none opacity-0" : "opacity-100 delay-200"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "display text-lg whitespace-nowrap text-white [writing-mode:vertical-rl] [text-orientation:mixed]",
							children: l.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-8 w-px bg-gold" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: cn("absolute inset-x-0 bottom-0 block p-8 transition-[opacity,transform] duration-700", isActive ? "translate-y-0 opacity-100 delay-150" : "pointer-events-none translate-y-5 opacity-0"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2 text-[0.62rem] tracking-[0.24em] text-gold uppercase",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5" }), l.city]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "display mt-3 block text-4xl text-white",
								children: l.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-3 block max-w-md text-sm leading-relaxed text-white/70",
								children: l.intro
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm tracking-[0.12em] text-gold-soft",
									children: l.priceRange
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2 text-[0.65rem] tracking-[0.2em] text-white uppercase",
									children: ["Explorer", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4 text-gold transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" })]
								})]
							})
						]
					})
				]
			}, l.slug);
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:hidden [&::-webkit-scrollbar]:hidden",
		children: locations.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/quartiers/$slug",
			params: { slug: l.slug },
			className: "zoom-frame group rounded-md relative block h-[24rem] w-[78%] shrink-0 snap-start sm:w-[52%]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: l.image,
					alt: "",
					"aria-hidden": true,
					loading: "lazy",
					width: 1280,
					height: 960,
					className: "size-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 bg-gradient-to-t from-navy via-navy/35 to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "absolute inset-x-0 bottom-0 block p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "display block text-2xl text-white",
						children: l.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-2 block text-xs tracking-[0.16em] text-gold uppercase",
						children: l.priceRange
					})]
				})
			]
		}, l.slug))
	})] });
}
var TESTIMONIALS_ROTATE_MS = 7e3;
var TESTIMONIALS_VIEWPORT = {
	once: true,
	amount: .2
};
/** Uncovered left to right — the same gesture as the blog photographs. */
var TESTIMONIALS_WIPE = {
	hidden: { clipPath: "inset(0% 100% 0% 0%)" },
	show: {
		clipPath: "inset(0% 0% 0% 0%)",
		transition: {
			duration: 1.25,
			ease: EASE
		}
	}
};
/**
* Social proof as a single editorial spread: a full-width two-tone heading,
* then the photograph on the left and the quote on the right, paged by numbered
* markers. It advances on its own and wraps around, pausing while the visitor
* is hovering or tabbing through it.
*/
function TestimonialsSection() {
	const items = testimonials.slice(0, 5);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [paused, setPaused] = (0, import_react.useState)(false);
	const reduced = useReducedMotion();
	const active = items[index];
	(0, import_react.useEffect)(() => {
		if (reduced || paused) return;
		const id = setInterval(() => setIndex((i) => (i + 1) % items.length), TESTIMONIALS_ROTATE_MS);
		return () => clearInterval(id);
	}, [
		reduced,
		paused,
		items.length
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		tone: "sand",
		className: "py-16 sm:py-20 lg:py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "display max-w-lg text-[clamp(1.9rem,4.5vw,3.75rem)] leading-[0.98]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextReveal, { text: "Ne nous croyez pas" }),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground/30",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextReveal, {
							text: "sur parole.",
							delay: 180
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: 240,
				className: "shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/temoignages",
					className: "link-underline inline-flex items-center gap-2 text-[0.72rem] tracking-[0.18em] uppercase",
					children: ["Tous les témoignages ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4 text-gold" })]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 grid gap-8 sm:mt-14 lg:grid-cols-[minmax(0,53fr)_minmax(0,47fr)] lg:gap-14 xl:gap-20",
			onMouseEnter: () => setPaused(true),
			onMouseLeave: () => setPaused(false),
			onFocusCapture: () => setPaused(true),
			onBlurCapture: () => setPaused(false),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: "hidden",
				whileInView: "show",
				viewport: TESTIMONIALS_VIEWPORT,
				variants: {
					hidden: {},
					show: {}
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "relative aspect-[4/3] overflow-hidden rounded-md sm:aspect-[3/2]",
					variants: TESTIMONIALS_WIPE,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: images.testimonialsImage,
						alt: "",
						"aria-hidden": true,
						loading: "lazy",
						width: 1500,
						height: 1e3,
						className: "absolute inset-0 size-full object-cover"
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				delay: 140,
				className: "flex flex-col border-t border-foreground/15 pt-7 sm:pt-9",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "flex flex-wrap items-center gap-2",
						children: items.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setIndex(i),
							"aria-label": `Témoignage ${i + 1} sur ${items.length}`,
							"aria-current": i === index,
							className: cn("grid size-9 place-items-center rounded-full border text-[0.72rem] transition-colors duration-500", i === index ? "border-navy bg-navy text-white" : "border-foreground/20 text-foreground/50 hover:border-navy hover:text-navy"),
							children: i + 1
						}) }, t.name))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						className: "quote shrink-0 text-[3.4rem] leading-[0.5] text-navy sm:text-[4.2rem]",
						children: "”"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative mt-8 min-h-[15rem] sm:min-h-[16rem] lg:min-h-[18rem]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						initial: false,
						mode: "wait",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.blockquote, {
							initial: {
								opacity: 0,
								y: 14
							},
							animate: {
								opacity: 1,
								y: 0
							},
							exit: {
								opacity: 0,
								y: -10
							},
							transition: {
								duration: .55,
								ease: EASE
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "quote text-[1.2rem] leading-[1.5] text-navy sm:text-[1.45rem] lg:text-[1.6rem]",
								children: [
									"« ",
									active.quote,
									" »"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
								className: "mt-7 flex flex-wrap items-center gap-x-4 gap-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[0.72rem] tracking-[0.16em] text-navy uppercase",
										children: active.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-foreground/25",
										children: "/"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex gap-1 text-gold",
										"aria-label": "Note : 5 sur 5",
										children: Array.from({ length: 5 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3.5 fill-gold" }, i))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "w-full text-[0.78rem] text-muted-foreground sm:w-auto",
										children: [
											active.role,
											" · ",
											active.location
										]
									})
								]
							})]
						}, active.name)
					})
				})]
			})]
		})]
	});
}
var services = [
	{
		index: "01",
		title: "Acheter",
		to: "/proprietes",
		search: { transaction: "vente" },
		image: images.property1,
		text: "Une sélection de biens à Agadir et dans le Souss-Massa, choisie pour répondre à chaque projet de vie ou d'investissement."
	},
	{
		index: "02",
		title: "Vendre",
		to: "/vendre",
		search: void 0,
		image: images.teamOffice,
		text: "Une estimation précise, une présentation exigeante et une stratégie de commercialisation pensée pour valoriser votre bien."
	},
	{
		index: "03",
		title: "Louer",
		to: "/proprietes",
		search: { transaction: "location" },
		image: images.property2,
		text: "Des propriétés soigneusement sélectionnées et un accompagnement de proximité pour trouver le bien qui vous correspond."
	}
];
function CinematicServices() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "bg-ink text-white",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `mx-auto max-w-[100rem] px-5 pt-20 sm:px-8 pb-16 sm:pt-24 lg:items-start lg:px-12 lg:pt-20 SERVICES_GRID`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "eyebrow flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-gold" }), "Nos services"]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-[clamp(2.1rem,4.2vw,4.1rem)] leading-[1.06] font-normal tracking-[-0.035em]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextReveal, {
							className: "p-0!",
							text: "Comment MABANIS"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-white/40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextReveal, {
							text: "vous accompagne",
							delay: 180
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-white/10",
				children: services.map((service) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceRow, { service }, service.index))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-[100rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "max-w-3xl text-[clamp(1.5rem,2.8vw,2.5rem)] leading-[1] font-normal tracking-[-0.02em]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextReveal, { text: "Une équipe qui vous guide à chaque étape de votre projet," }),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-white/40",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextReveal, {
								text: "à Agadir, dans le Souss-Massa et sur le littoral atlantique.",
								delay: 220
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: 260,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/contact",
						className: "btn-sheen group mt-10 inline-flex items-center justify-center gap-3 rounded-md border border-white px-7! py-3.5 text-[0.68rem] tracking-[0.18em] font-medium uppercase text-white transition-colors duration-500 hover:bg-gold hover:border-gold hover:text-navy",
						children: ["Commencer avec MABANIS", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 transition-transform duration-500 group-hover:translate-x-1" })]
					})
				})]
			})
		]
	});
}
function ServiceRow({ service }) {
	const ref = (0, import_react.useRef)(null);
	const [animated, setAnimated] = (0, import_react.useState)(false);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"]
	});
	const imageY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
	const titleY = useSpring(useTransform(scrollYProgress, [0, 1], [36, -36]), SERVICES_SPRING);
	const arrowX = useSpring(useTransform(scrollYProgress, [
		0,
		.5,
		1
	], [
		-26,
		0,
		14
	]), SERVICES_SPRING);
	(0, import_react.useEffect)(() => {
		setAnimated(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		className: "border-t border-white/10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: service.to,
			search: service.search,
			className: "group relative block overflow-hidden outline-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"aria-hidden": true,
				className: "absolute inset-0 opacity-0 transition-opacity duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
						src: service.image,
						alt: "",
						loading: "lazy",
						width: 1600,
						height: 900,
						className: "absolute inset-0 size-full scale-[1.22] object-cover transition-[scale] duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.12]",
						style: { y: animated ? imageY : 0 }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-ink/55" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/30 to-ink/70" })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `relative mx-auto flex max-w-[100rem] flex-col gap-y-10 px-5 py-16 sm:px-8 sm:py-20 lg:min-h-[15vh] lg:items-center lg:px-12 lg:py-16 SERVICES_GRID`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-5 sm:gap-7",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							className: "shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-9 place-items-center rounded-full border border-white/30 text-[0.62rem] text-white/80 transition-colors duration-500 group-hover:border-gold group-hover:text-gold",
								children: service.index
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: 90,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-[17rem] pt-1 text-[1rem] leading-[1.8] text-white/90",
								children: service.text
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						style: { y: animated ? titleY : 0 },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.span, {
							className: "relative inline-block pb-2 lg:pb-3",
							initial: "hidden",
							whileInView: "show",
							viewport: {
								once: true,
								amount: .4
							},
							variants: {
								hidden: {},
								show: {}
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block overflow-hidden pb-[0.08em]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
									className: "block text-[clamp(3.5rem,18vw,9rem)] leading-[0.85] font-normal tracking-[-0.045em] whitespace-nowrap lg:text-[clamp(4rem,10.5vw,10.5rem)]",
									variants: {
										hidden: { y: "105%" },
										show: {
											y: "0%",
											transition: {
												duration: 1.15,
												ease: EASE
											}
										}
									},
									children: service.title
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute bottom-0 left-[0.03em] h-[5px] w-full origin-left scale-x-0 bg-white transition-[scale] duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 [@media(hover:none)]:scale-x-100" })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "self-end lg:self-center lg:justify-self-end",
						style: { x: animated ? arrowX : 0 },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
							className: "size-12 text-white transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 sm:size-16 lg:size-20 xl:size-24",
							strokeWidth: 1
						})
					})
				]
			})]
		})
	});
}
var SERVICES_SPRING = {
	stiffness: 110,
	damping: 30,
	mass: .4
};
var BLOG_VIEWPORT = {
	once: true,
	amount: .2
};
/** Text and dividers share one entrance: a short rise, staggered by the parent. */
var BLOG_RISE = {
	hidden: {
		opacity: 0,
		y: 18
	},
	show: {
		opacity: 1,
		y: 0,
		transition: {
			duration: .85,
			ease: EASE
		}
	}
};
var BLOG_LINE = {
	hidden: { scaleX: 0 },
	show: {
		scaleX: 1,
		transition: {
			duration: 1.15,
			ease: EASE
		}
	}
};
/** The photograph is uncovered left to right, like a curtain pulled aside. */
var BLOG_WIPE = {
	hidden: { clipPath: "inset(0% 100% 0% 0%)" },
	show: {
		clipPath: "inset(0% 0% 0% 0%)",
		transition: {
			duration: 1.25,
			ease: EASE
		}
	}
};
/**
* Editorial blog list: no cards, no shadows — the house section heading, then
* full-width rows separated by hairlines, each pairing a dated write-up with a
* landscape photograph. Content comes from the shared `articles` source, so
* every row links to a real /actualites/$slug page.
*/
function BlogSection() {
	const posts = articles.slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		tone: "sand",
		className: "pt-0! pb-16 sm:pb-20 lg:pb-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
			eyebrow: "Blog & ressources",
			title: "Nos analyses et nos actualités.",
			intro: "Découvrez nos conseils, nos analyses du marché et nos dernières actualités immobilières.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/actualites",
				className: "link-underline inline-flex items-center gap-2 text-[0.72rem] tracking-[0.18em] uppercase",
				children: ["Voir le blog ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4 text-gold" })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-14 sm:mt-16 lg:mt-20",
			children: [posts.map((article, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlogArticle, {
				article,
				index: i
			}, article.slug)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				className: "block h-px origin-left bg-foreground/15",
				initial: "hidden",
				whileInView: "show",
				viewport: BLOG_VIEWPORT,
				variants: BLOG_LINE
			})]
		})]
	});
}
function BlogArticle({ article, index }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
		className: "relative",
		initial: "hidden",
		whileInView: "show",
		viewport: BLOG_VIEWPORT,
		variants: {
			hidden: {},
			show: { transition: {
				staggerChildren: .08,
				delayChildren: index * .04
			} }
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
			className: "absolute inset-x-0 top-0 h-px origin-left bg-foreground/15",
			variants: BLOG_LINE
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/actualites/$slug",
			params: { slug: article.slug },
			className: "group flex flex-col gap-6 py-10 sm:gap-8 sm:py-12 lg:grid lg:grid-cols-[minmax(0,42fr)_minmax(0,58fr)] lg:grid-rows-[auto_minmax(0,1fr)] lg:gap-x-10 lg:gap-y-8 lg:py-14 xl:gap-x-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.time, {
					dateTime: article.iso,
					className: "text-[0.74rem] tracking-[0.1em] text-foreground/45 lg:col-start-1 lg:row-start-1",
					variants: BLOG_RISE,
					children: article.iso
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "overflow-hidden lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start",
					variants: BLOG_WIPE,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
						src: article.image,
						alt: article.title,
						loading: "lazy",
						width: 2100,
						height: 1e3,
						className: "aspect-[16/10] w-full object-cover transition-[scale] duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] lg:aspect-[21/10]",
						variants: {
							hidden: { scale: 1.08 },
							show: {
								scale: 1,
								transition: {
									duration: 1.5,
									ease: EASE
								}
							}
						}
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-start-1 lg:row-start-2 lg:self-end",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h3, {
							className: "max-w-[26rem] text-[clamp(1.45rem,2.3vw,2.1rem)] leading-[1.15] font-medium tracking-[-0.03em] text-foreground transition-opacity duration-500 group-hover:opacity-60",
							variants: BLOG_RISE,
							children: article.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							className: "mt-4 max-w-[24rem] text-[0.92rem] leading-[1.75] text-muted-foreground",
							variants: BLOG_RISE,
							children: article.excerpt
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.span, {
							className: "mt-8 inline-flex items-center gap-2.5 rounded-md border border-foreground/20 px-5 py-2.5 text-[0.72rem] tracking-[0.04em] text-foreground transition-colors duration-500 group-hover:border-foreground/70",
							variants: BLOG_RISE,
							children: ["Lire l'article", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5 transition-transform duration-500 group-hover:translate-x-1" })]
						})
					]
				})
			]
		})]
	});
}
function Home() {
	const featured = properties.filter((p) => p.featured).slice(0, 4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeHero, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative z-30 mx-auto -mt-px max-w-[100rem] px-5 sm:px-8 lg:-mt-[5.5rem] lg:px-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroSearch, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			className: "py-16 sm:py-20 lg:py-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Sélection du moment",
				title: "Des biens d'exception, à Agadir.",
				intro: "Une poignée d'adresses que nous avons visitées, vérifiées et que nous défendons personnellement auprès de nos acquéreurs.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/proprietes",
					className: "link-underline inline-flex items-center gap-2 text-[0.72rem] tracking-[0.18em] uppercase",
					children: ["Tout le portefeuille ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4 text-gold" })]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "-mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 xl:grid-cols-4 xl:gap-8 [&::-webkit-scrollbar]:hidden",
				children: featured.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * 90,
					className: "w-[82%] shrink-0 snap-start sm:w-auto sm:shrink",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyCard, {
						property: p,
						className: "h-full transition-shadow duration-700 hover:shadow-elegant"
					})
				}, p.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CinematicServices, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			tone: "navy",
			className: "bg-ink overflow-hidden pt-0!",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-[100rem] gap-8 lg:grid-cols-[40%_60%] lg:items-center lg:gap-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "max-w-[30rem] text-[clamp(1.9rem,6vw,3.75rem)] leading-[1.05] font-bold uppercase tracking-[-0.02em]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextReveal, { text: "Une expertise " }),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-white/40",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextReveal, {
								text: "de chaque quartier.",
								delay: 220
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: 260,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:max-w-10/12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-white",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextReveal, {
								text: "Une connaissance approfondie d'Agadir et de ses quartiers pour vous guider vers les adresses qui correspondent réellement à votre projet.",
								delay: 220,
								className: "text-[clamp(1.05rem,2.2vw,1.5rem)]"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/quartiers",
							className: "btn-sheen group mt-6 inline-flex items-center justify-center gap-3 rounded-md bg-gold px-7 py-3.5 text-[0.68rem] tracking-[0.18em] font-medium uppercase text-navy transition-colors duration-500 hover:bg-white",
							children: ["Tous les quartiers", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 transition-transform duration-500 group-hover:translate-x-1" })]
						})]
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: 120,
				className: "mt-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuartiersShowcase, {})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TestimonialsSection, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlogSection, {})
	] });
}
//#endregion
export { Home as component };
