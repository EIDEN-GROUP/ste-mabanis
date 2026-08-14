import { i as __toESM } from "../_runtime.mjs";
import { i as cn, t as agency, u as images } from "./utils-BTE8P7Sw.mjs";
import { i as QueryClientProvider, o as require_jsx_runtime, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { S as useRouter, _ as createFileRoute, d as HeadContent, f as useRouterState, g as lazyRouteComponent, h as Outlet, m as createRouter, u as Scripts, v as createRootRouteWithContext, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$24 } from "../_slug-BMmOBTEB.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { G as LayoutDashboard, H as Mail, L as MessageCircle, O as Phone, V as MapPin, ot as Facebook, q as Instagram, ut as Clock } from "../_libs/lucide-react.mjs";
import { t as Route$25 } from "../_slug-BRTgo5IE.mjs";
import { t as Route$26 } from "../_slug-DYXQN6i3.mjs";
import { t as Route$27 } from "../_slug-DaOh-eBx.mjs";
import { t as mabanis_logo_default } from "./mabanis-logo-GECC4AGv.mjs";
import { n as Route$28 } from "./clients-CQQrlhTO.mjs";
import { t as Route$29 } from "./proprietes-C7hv1psB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-_ydrkzzW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-Dir031VD.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
/** Slim inline nav — the full site map lives in the overlay menu. */
var nav = [
	{
		to: "/proprietes",
		label: "Propriétés"
	},
	{
		to: "/quartiers",
		label: "Quartiers"
	},
	{
		to: "/services",
		label: "Services"
	},
	{
		to: "/vendre",
		label: "Vendre"
	},
	{
		to: "/agence",
		label: "L'agence"
	}
];
var menuGroups = [
	{
		title: "Vous souhaitez acheter ?",
		links: [
			{
				to: "/proprietes",
				label: "Biens à vendre",
				search: { transaction: "vente" }
			},
			{
				to: "/quartiers",
				label: "Quartiers d'Agadir"
			},
			{
				to: "/services",
				label: "Accompagnement achat"
			}
		]
	},
	{
		title: "Vous souhaitez vendre ?",
		links: [
			{
				to: "/vendre",
				label: "Vendre"
			},
			{
				to: "/vendre",
				label: "Estimer"
			},
			{
				to: "/temoignages",
				label: "Ils nous ont fait confiance"
			}
		]
	},
	{
		title: "Location à Agadir",
		links: [{
			to: "/proprietes",
			label: "Biens à louer",
			search: { transaction: "location" }
		}, {
			to: "/services",
			label: "Gestion locative"
		}]
	},
	{
		title: "À propos",
		links: [
			{
				to: "/agence",
				label: "Notre agence"
			},
			{
				to: "/equipe",
				label: "Équipe"
			},
			{
				to: "/actualites",
				label: "Actualités"
			},
			{
				to: "/contact",
				label: "Contact"
			}
		]
	}
];
var panelImages = [
	images.property1,
	images.locationTaghazout,
	images.editorial1
];
/** Open sweeps left→right: the photo wipes, then three slices of the panel. */
var SLICES = 3;
var ENTER = {
	wipe: 700,
	slice: 620,
	sliceLead: 140,
	sliceStep: 80,
	content: 420,
	contentStep: 70
};
var EXIT = {
	wipe: 520,
	slice: 480,
	sliceStep: 60,
	content: 220
};
var EXIT_TOTAL = 780;
var EASE = "cubic-bezier(0.76, 0, 0.24, 1)";
function useReducedMotion() {
	const [reduced, setReduced] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const sync = () => setReduced(mq.matches);
		sync();
		mq.addEventListener("change", sync);
		return () => mq.removeEventListener("change", sync);
	}, []);
	return reduced;
}
function SiteHeader() {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [slide, setSlide] = (0, import_react.useState)(0);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const reduced = useReducedMotion();
	const overHero = pathname === "/";
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 40);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [pathname]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const onKey = (e) => {
			if (e.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = prev;
			window.removeEventListener("keydown", onKey);
		};
	}, [open]);
	(0, import_react.useEffect)(() => {
		if (!open || reduced) return;
		const id = setInterval(() => setSlide((s) => (s + 1) % panelImages.length), 5200);
		return () => clearInterval(id);
	}, [open, reduced]);
	const solid = scrolled || !overHero;
	const ms = (n) => reduced ? 0 : n;
	const logoTone = open ? "lg:brightness-0 lg:invert" : solid ? "" : "brightness-0 invert";
	const sliceStyle = (i) => ({
		transitionDuration: `${ms(open ? ENTER.slice : EXIT.slice)}ms`,
		transitionDelay: `${ms(open ? ENTER.sliceLead + i * ENTER.sliceStep : (SLICES - 1 - i) * EXIT.sliceStep)}ms`,
		transitionTimingFunction: EASE
	});
	const contentStyle = (i) => ({
		transitionDuration: `${ms(open ? 620 : EXIT.content)}ms`,
		transitionDelay: `${ms(open ? ENTER.content + i * ENTER.contentStep : 0)}ms`
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: cn("fixed inset-x-0 top-0 z-[70] transition-[background-color,border-color,padding] duration-500 motion-reduce:transition-none", open ? "border-b border-transparent py-5" : solid ? "border-b border-line bg-background/95 py-3 backdrop-blur-md" : "border-b border-white/10 py-5"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-[100rem] items-center gap-6 px-5 sm:px-8 lg:px-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "shrink-0",
					"aria-label": "STE MABANIS — accueil",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: mabanis_logo_default,
						alt: "STE MABANIS",
						width: 300,
						height: 200,
						className: cn("h-11 w-full transition-all duration-500 motion-reduce:transition-none sm:h-12", logoTone)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: cn("ml-auto hidden items-center gap-7 transition-[opacity,transform] duration-400 motion-reduce:transition-none lg:flex", open ? "pointer-events-none -translate-y-1 opacity-0" : "translate-y-0 opacity-100"),
					children: nav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						className: cn("link-underline text-[0.78rem] tracking-[0.1em] uppercase transition-colors", solid ? "text-navy/75 hover:text-navy" : "text-white/80 hover:text-white"),
						activeProps: { className: solid ? "text-navy" : "text-white" },
						children: item.label
					}, item.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex items-center gap-3 lg:ml-0 lg:gap-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("flex items-center gap-3 transition-opacity duration-300 motion-reduce:transition-none", open ? "pointer-events-none opacity-0" : "opacity-100"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `tel:${agency.mobile.replace(/\s/g, "")}`,
								className: cn("hidden items-center gap-2 text-xs tracking-wide xl:inline-flex", solid ? "text-navy/70" : "text-white/75"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-3.5 text-gold" }), agency.mobile]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/admin",
								"aria-label": "Ouvrir le tableau de bord",
								className: cn("hidden items-center gap-2 border px-4 py-2.5 text-[0.7rem] tracking-[0.16em] uppercase transition-colors lg:inline-flex", solid ? "border-line text-navy/80 hover:border-gold hover:text-navy" : "border-white/35 text-white/85 hover:border-white hover:text-white"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "size-3.5 text-gold" }), "Dashboard"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								className: "hidden bg-gold px-5 py-2.5 text-[0.7rem] tracking-[0.16em] text-navy uppercase transition-colors hover:bg-navy hover:text-white sm:inline-block",
								children: "Nous contacter"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setOpen((v) => !v),
						"aria-expanded": open,
						"aria-label": open ? "Fermer le menu" : "Ouvrir le menu",
						className: cn("flex size-11 shrink-0 items-center justify-center border transition-colors duration-500 motion-reduce:transition-none", open ? "border-gold text-navy" : solid ? "border-line text-navy hover:border-gold" : "border-white/40 text-white hover:border-white"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex w-4 flex-col items-stretch gap-[4px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-px w-full bg-current transition-transform duration-500 motion-reduce:transition-none", open && "translate-y-[5px] rotate-45") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-px w-full bg-current transition-opacity duration-300 motion-reduce:transition-none", open && "opacity-0") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-px w-full bg-current transition-transform duration-500 motion-reduce:transition-none", open && "-translate-y-[5px] -rotate-45") })
							]
						})
					})]
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("fixed inset-0 z-[60]", open ? "visible" : "pointer-events-none invisible"),
		style: { transition: `visibility 0s linear ${ms(open ? 0 : EXIT_TOTAL)}ms` },
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "Menu principal",
		"aria-hidden": !open,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-y-0 left-0 hidden w-1/2 overflow-hidden bg-navy transition-[clip-path] lg:block",
				style: {
					clipPath: open ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
					transitionDuration: `${ms(open ? ENTER.wipe : EXIT.wipe)}ms`,
					transitionDelay: `${ms(open ? 0 : 200)}ms`,
					transitionTimingFunction: EASE
				},
				children: [panelImages.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src,
					alt: "",
					"aria-hidden": true,
					className: cn("absolute inset-0 size-full object-cover transition-opacity duration-[1400ms] motion-reduce:transition-none", open && "menu-kenburns", i === slide ? "opacity-100" : "opacity-0")
				}, src)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-br from-navy/55 via-navy/15 to-transparent" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-y-0 right-0 flex w-full lg:w-1/2",
				children: Array.from({ length: SLICES }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("h-full flex-1 origin-left bg-background transition-transform", open ? "scale-x-100" : "scale-x-0"),
					style: sliceStyle(i)
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-y-0 right-0 flex w-full flex-col overflow-y-auto px-6 pt-28 pb-10 sm:px-10 lg:w-1/2 lg:justify-center lg:px-16 lg:pt-16 lg:pb-8 xl:px-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:gap-y-8",
					children: menuGroups.map((group, gi) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("transition-[opacity,transform]", open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"),
						style: contentStyle(gi),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow mb-4",
							children: group.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-1.5",
							children: group.links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: link.to,
								search: link.search,
								onClick: () => setOpen(false),
								className: "display inline-block text-2xl text-navy transition-[color,transform] duration-400 hover:translate-x-1.5 hover:text-gold sm:text-[1.75rem]",
								children: link.label
							}) }, `${link.to}-${link.label}`))
						})]
					}, group.title))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-8 transition-[opacity,transform] lg:mt-10 lg:pt-6", open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"),
					style: contentStyle(menuGroups.length),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `tel:${agency.mobile.replace(/\s/g, "")}`,
							className: "inline-flex items-center gap-2 text-sm text-navy/75 transition-colors hover:text-gold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-3.5 text-gold" }), agency.mobile]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `mailto:${agency.email}`,
							className: "inline-flex items-center gap-2 text-sm text-navy/75 transition-colors hover:text-gold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-3.5 text-gold" }), agency.email]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin",
							onClick: () => setOpen(false),
							className: "inline-flex items-center gap-2 border border-line px-3 py-2 text-[0.68rem] tracking-[0.14em] text-navy/80 uppercase transition-colors hover:border-gold hover:text-navy",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "size-3.5 text-gold" }), "Dashboard"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-9 items-center justify-center rounded-full border border-line text-navy/70 transition-colors hover:border-gold hover:text-gold",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-9 items-center justify-center rounded-full border border-line text-navy/70 transition-colors hover:border-gold hover:text-gold",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Facebook, { className: "size-4" })
							})]
						})
					]
				})]
			})
		]
	})] });
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "bg-navy text-white/70",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-[100rem] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:px-12 lg:py-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: mabanis_logo_default,
					alt: "STE MABANIS",
					width: 240,
					height: 240,
					className: "h-16 w-auto brightness-0 invert"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-sm text-sm leading-relaxed",
					children: "Agence immobilière indépendante installée à Agadir depuis 2008. Vente, location, estimation et gestion locative sur l'ensemble du Grand Agadir et du littoral."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-[0.65rem] tracking-[0.22em] text-gold uppercase",
					children: "Explorer"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-5 space-y-3 text-sm",
					children: [
						{
							to: "/proprietes",
							label: "Propriétés"
						},
						{
							to: "/quartiers",
							label: "Quartiers"
						},
						{
							to: "/services",
							label: "Services"
						},
						{
							to: "/vendre",
							label: "Vendre avec nous"
						},
						{
							to: "/temoignages",
							label: "Témoignages"
						}
					].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						className: "link-underline hover:text-white",
						children: l.label
					}) }, l.to))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-[0.65rem] tracking-[0.22em] text-gold uppercase",
					children: "Agence"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-5 space-y-3 text-sm",
					children: [
						{
							to: "/agence",
							label: "Notre histoire"
						},
						{
							to: "/equipe",
							label: "Nos conseillers"
						},
						{
							to: "/actualites",
							label: "Actualités & guides"
						},
						{
							to: "/contact",
							label: "Contact"
						}
					].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						className: "link-underline hover:text-white",
						children: l.label
					}) }, l.to))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-[0.65rem] tracking-[0.22em] text-gold uppercase",
					children: "Nous joindre"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-5 space-y-4 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mt-0.5 size-4 shrink-0 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: agency.address })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "mt-0.5 size-4 shrink-0 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `tel:${agency.mobile.replace(/\s/g, "")}`,
								className: "hover:text-white",
								children: agency.mobile
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "mt-0.5 size-4 shrink-0 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `mailto:${agency.email}`,
								className: "hover:text-white",
								children: agency.email
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "mt-0.5 size-4 shrink-0 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: agency.hours })]
						})
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-white/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-[100rem] flex-col gap-2 px-5 py-6 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" STE MABANIS — Ste Gestion et Services. Agadir, Maroc."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tracking-[0.2em] text-white/40 uppercase",
					children: "mabanis.au"
				})]
			})
		})]
	});
}
var mabanis_favicon_default = "/assets/mabanis-favicon-DOR1EI9x.png";
function BrandLoader() {
	const [phase, setPhase] = (0, import_react.useState)("in");
	(0, import_react.useEffect)(() => {
		if (sessionStorage.getItem("mabanis:loaded")) {
			setPhase("done");
			return;
		}
		const t1 = setTimeout(() => setPhase("out"), 1350);
		const t2 = setTimeout(() => {
			setPhase("done");
			sessionStorage.setItem("mabanis:loaded", "1");
		}, 2200);
		return () => {
			clearTimeout(t1);
			clearTimeout(t2);
		};
	}, []);
	if (phase === "done") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": true,
		className: "fixed inset-0 z-[100] flex items-center justify-center bg-navy transition-[opacity,clip-path] duration-[850ms] ease-[cubic-bezier(0.76,0,0.24,1)]",
		style: phase === "out" ? {
			opacity: 0,
			clipPath: "inset(0 0 100% 0)",
			pointerEvents: "none"
		} : { clipPath: "inset(0 0 0 0)" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-7 px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: mabanis_favicon_default,
					alt: "",
					width: 220,
					height: 220,
					className: "w-40 animate-rise sm:w-52"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative h-px w-40 overflow-hidden bg-white/15 sm:w-56",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "loader-sweep absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-gold to-transparent" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "animate-rise text-[0.65rem] tracking-[0.34em] text-white/45 uppercase",
					children: "Agadir · Immobilier"
				})
			]
		})
	});
}
function WhatsAppButton({ message }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: `https://wa.me/${agency.whatsapp}?text=${encodeURIComponent(message ?? "Bonjour STE MABANIS, je souhaite obtenir des informations.")}`,
		target: "_blank",
		rel: "noreferrer noopener",
		"aria-label": "Écrire sur WhatsApp",
		className: "fixed right-4 bottom-4 z-40 grid size-12 place-items-center rounded-full bg-navy text-white shadow-elegant transition-transform duration-300 hover:scale-105 hover:bg-gold hover:text-navy sm:right-6 sm:bottom-6 sm:size-14",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-5 sm:size-6" })
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-navy px-4 text-white",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Erreur 404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "display mt-4 text-6xl",
					children: "Cette page n'existe plus"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-white/60",
					children: "Le bien ou la page que vous cherchez a peut-être été vendu, loué ou déplacé."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/proprietes",
						className: "bg-gold px-6 py-3 text-xs tracking-[0.18em] text-navy uppercase",
						children: "Voir les biens"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "border border-white/25 px-6 py-3 text-xs tracking-[0.18em] uppercase",
						children: "Accueil"
					})]
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-navy px-4 text-white",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "display text-4xl",
					children: "Cette page n'a pas pu se charger"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-white/60",
					children: "Un incident technique est survenu. Réessayez ou revenez à l'accueil."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "bg-gold px-6 py-3 text-xs tracking-[0.18em] text-navy uppercase",
						children: "Réessayer"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "border border-white/25 px-6 py-3 text-xs tracking-[0.18em] uppercase",
						children: "Accueil"
					})]
				})
			]
		})
	});
}
var Route$23 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "STE MABANIS — Agence immobilière à Agadir" },
			{
				name: "description",
				content: "Vente, location, estimation et gestion locative à Agadir et sur le littoral. Villas, appartements et investissements sélectionnés par STE MABANIS."
			},
			{
				name: "author",
				content: "STE MABANIS"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "theme-color",
				content: "#071A2F"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				type: "image/png",
				href: "/favicon.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "fr",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$23.useRouteContext();
	if (useRouterState({ select: (s) => s.location.pathname }).startsWith("/admin")) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, { position: "top-right" })]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLoader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppButton, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, { position: "bottom-center" })
		]
	});
}
var $$splitComponentImporter$22 = () => import("./routes-C-bHNq0o.mjs");
var Route$22 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "STE MABANIS | Immobilier de caractère à Agadir & Souss-Massa" },
		{
			name: "description",
			content: "Villas, appartements et investissements sélectionnés à Agadir, Founty, la Marina et Taghazout. Vente, location, estimation et gestion locative depuis 2024."
		},
		{
			property: "og:title",
			content: "STE MABANIS | Immobilier de caractère à Agadir"
		},
		{
			property: "og:description",
			content: "Une agence indépendante d'Agadir : biens sélectionnés, estimation argumentée, accompagnement de A à Z."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./admin-CtwLYjbO.mjs");
var Route$21 = createFileRoute("/admin")({
	head: () => ({ meta: [
		{ title: "Administration — STE MABANIS" },
		{
			name: "description",
			content: "Console de gestion STE MABANIS : portefeuille, CRM, agenda et transactions."
		},
		{
			name: "robots",
			content: "noindex, nofollow"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
/** Redirects to the dashboard when the workspace doesn't allow the current URL. */
var $$splitComponentImporter$20 = () => import("./agence-DPRka_IE.mjs");
var Route$20 = createFileRoute("/agence")({
	head: () => ({ meta: [
		{ title: "L'agence STE MABANIS — Immobilier à Agadir depuis 2008" },
		{
			name: "description",
			content: "Histoire, vision, valeurs et expertise de STE MABANIS, agence immobilière indépendante installée à Agadir depuis 2008."
		},
		{
			property: "og:title",
			content: "L'agence STE MABANIS — Agadir depuis 2008"
		},
		{
			property: "og:description",
			content: "Une agence indépendante, franche sur les prix et rigoureuse sur le juridique."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./contact-DBv9nugU.mjs");
var Route$19 = createFileRoute("/contact")({
	head: () => ({ meta: [
		{ title: "Contact — STE MABANIS, agence immobilière à Agadir" },
		{
			name: "description",
			content: "Contactez STE MABANIS : avenue Hassan II à Agadir, téléphone, e-mail, WhatsApp et prise de rendez-vous en agence ou en visioconférence."
		},
		{
			property: "og:title",
			content: "Contact — STE MABANIS Agadir"
		},
		{
			property: "og:description",
			content: "Un conseiller vous répond sous 24 heures ouvrées."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./services-koS12crW.mjs");
var Route$18 = createFileRoute("/services")({
	head: () => ({ meta: [
		{ title: "Services immobiliers à Agadir — STE MABANIS" },
		{
			name: "description",
			content: "Achat, vente, location, estimation, investissement, gestion locative et accompagnement personnalisé à Agadir par STE MABANIS."
		},
		{
			property: "og:title",
			content: "Services immobiliers à Agadir — STE MABANIS"
		},
		{
			property: "og:description",
			content: "Sept métiers, un seul interlocuteur, de l'estimation à la gestion du bien."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./temoignages-B-MHfr2x.mjs");
var Route$17 = createFileRoute("/temoignages")({
	head: () => ({ meta: [
		{ title: "Témoignages clients — STE MABANIS Agadir" },
		{
			name: "description",
			content: "Acheteurs, vendeurs, investisseurs et propriétaires racontent leur expérience avec l'agence STE MABANIS à Agadir."
		},
		{
			property: "og:title",
			content: "Témoignages clients — STE MABANIS"
		},
		{
			property: "og:description",
			content: "Ce que disent nos clients, y compris quand nous les avons contredits."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./vendre-FtzMXlOU.mjs");
var Route$16 = createFileRoute("/vendre")({
	head: () => ({ meta: [
		{ title: "Vendre son bien à Agadir — Estimation gratuite | STE MABANIS" },
		{
			name: "description",
			content: "Estimation gratuite sous 72 h, reportage photo professionnel, diffusion coordonnée : délai médian de vente de 74 jours en mandat exclusif."
		},
		{
			property: "og:title",
			content: "Vendre son bien à Agadir avec STE MABANIS"
		},
		{
			property: "og:description",
			content: "Une estimation argumentée, une commercialisation préparée, un suivi hebdomadaire."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./actualites-Cbr_sJba.mjs");
var Route$15 = createFileRoute("/actualites/")({
	head: () => ({ meta: [
		{ title: "Actualités & guides immobiliers Agadir — STE MABANIS" },
		{
			name: "description",
			content: "Analyses de marché, guides d'achat, conseils aux vendeurs et actualité immobilière d'Agadir par les conseillers STE MABANIS."
		},
		{
			property: "og:title",
			content: "Actualités & guides immobiliers d'Agadir"
		},
		{
			property: "og:description",
			content: "Comprendre le marché gadiri avant d'acheter, de vendre ou d'investir."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./admin-BwfLKBwy.mjs");
var Route$14 = createFileRoute("/admin/")({
	head: () => ({ meta: [{ title: "Tableau de bord — STE MABANIS" }, {
		name: "description",
		content: "Indicateurs, pipeline et priorités du jour."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./agenda-DYbmOI67.mjs");
var Route$13 = createFileRoute("/admin/agenda")({
	head: () => ({ meta: [{ title: "Agenda — STE MABANIS" }, {
		name: "description",
		content: "Planning des rendez-vous et visites."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./automatisations-5u9hN9hF.mjs");
var Route$12 = createFileRoute("/admin/automatisations")({
	head: () => ({ meta: [{ title: "Automatisations — STE MABANIS" }, {
		name: "description",
		content: "Règles automatiques de l'agence."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./crm-DF84MpES.mjs");
var Route$11 = createFileRoute("/admin/crm")({
	head: () => ({ meta: [{ title: "Pipeline CRM — STE MABANIS" }, {
		name: "description",
		content: "Pipeline des leads et opportunités."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./design-BDZAFzcg.mjs");
var Route$10 = createFileRoute("/admin/design")({
	head: () => ({ meta: [{ title: "Design system — STE MABANIS" }, {
		name: "description",
		content: "Bibliothèque de composants réutilisables de l'admin."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./documents-ioDBk03w.mjs");
var Route$9 = createFileRoute("/admin/documents")({
	head: () => ({ meta: [{ title: "Documents — STE MABANIS" }, {
		name: "description",
		content: "Centre documentaire de l'agence."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./marketing-C3GsCZLD.mjs");
var Route$8 = createFileRoute("/admin/marketing")({
	head: () => ({ meta: [{ title: "Marketing — STE MABANIS" }, {
		name: "description",
		content: "Campagnes, biens à la une et suivi des sources."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./matching-BWmcLABO.mjs");
var Route$7 = createFileRoute("/admin/matching")({
	head: () => ({ meta: [{ title: "Matching — STE MABANIS" }, {
		name: "description",
		content: "Correspondances entre biens et clients."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./portail-client-iR8kdvmj.mjs");
var Route$6 = createFileRoute("/admin/portail-client")({
	head: () => ({ meta: [{ title: "Portail client — STE MABANIS" }, {
		name: "description",
		content: "Architecture du portail client."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./proprietes-BXHaym-b2.mjs");
var Route$5 = createFileRoute("/admin/proprietes")({
	head: () => ({ meta: [{ title: "Propriétés — STE MABANIS" }, {
		name: "description",
		content: "Gestion du portefeuille immobilier."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./rapports-1wUAg7Uq.mjs");
var Route$4 = createFileRoute("/admin/rapports")({
	head: () => ({ meta: [{ title: "Rapports — STE MABANIS" }, {
		name: "description",
		content: "Rapports immobiliers exportables en CSV et PDF."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./taches-hszUzKoh.mjs");
var Route$3 = createFileRoute("/admin/taches")({
	head: () => ({ meta: [{ title: "Tâches — STE MABANIS" }, {
		name: "description",
		content: "Suivi des tâches de l'agence."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./transactions-CtXwF4zg.mjs");
var Route$2 = createFileRoute("/admin/transactions")({
	head: () => ({ meta: [{ title: "Transactions — STE MABANIS" }, {
		name: "description",
		content: "Suivi des transactions immobilières."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./equipe-CVahp4cx.mjs");
var Route$1 = createFileRoute("/equipe/")({
	head: () => ({ meta: [
		{ title: "Nos conseillers immobiliers à Agadir — STE MABANIS" },
		{
			name: "description",
			content: "Rencontrez les conseillers STE MABANIS : prestige, résidentiel, gestion locative et expertise. Un interlocuteur référent par dossier."
		},
		{
			property: "og:title",
			content: "Nos conseillers immobiliers à Agadir"
		},
		{
			property: "og:description",
			content: "Quatre spécialistes, une même exigence : vous dire les choses telles qu'elles sont."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./quartiers-8fPqWvgb.mjs");
var Route = createFileRoute("/quartiers/")({
	head: () => ({ meta: [
		{ title: "Quartiers d'Agadir : où acheter ou louer — STE MABANIS" },
		{
			name: "description",
			content: "Founty, Marina, Taghazout, Hay Mohammadi, centre-ville : prix au m², ambiance et potentiel d'investissement quartier par quartier."
		},
		{
			property: "og:title",
			content: "Quartiers d'Agadir : où acheter ou louer"
		},
		{
			property: "og:description",
			content: "Le guide honnête des secteurs d'Agadir, avec fourchettes de prix réelles."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$22.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$23
});
var AdminRoute = Route$21.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$23
});
var AgenceRoute = Route$20.update({
	id: "/agence",
	path: "/agence",
	getParentRoute: () => Route$23
});
var ContactRoute = Route$19.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$23
});
var ServicesRoute = Route$18.update({
	id: "/services",
	path: "/services",
	getParentRoute: () => Route$23
});
var TemoignagesRoute = Route$17.update({
	id: "/temoignages",
	path: "/temoignages",
	getParentRoute: () => Route$23
});
var VendreRoute = Route$16.update({
	id: "/vendre",
	path: "/vendre",
	getParentRoute: () => Route$23
});
var ActualitesIndexRoute = Route$15.update({
	id: "/actualites/",
	path: "/actualites/",
	getParentRoute: () => Route$23
});
var ActualitesSlugRoute = Route$25.update({
	id: "/actualites/$slug",
	path: "/actualites/$slug",
	getParentRoute: () => Route$23
});
var AdminIndexRoute = Route$14.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var AdminAgendaRoute = Route$13.update({
	id: "/agenda",
	path: "/agenda",
	getParentRoute: () => AdminRoute
});
var AdminAutomatisationsRoute = Route$12.update({
	id: "/automatisations",
	path: "/automatisations",
	getParentRoute: () => AdminRoute
});
var AdminClientsRoute = Route$28.update({
	id: "/clients",
	path: "/clients",
	getParentRoute: () => AdminRoute
});
var AdminCrmRoute = Route$11.update({
	id: "/crm",
	path: "/crm",
	getParentRoute: () => AdminRoute
});
var AdminDesignRoute = Route$10.update({
	id: "/design",
	path: "/design",
	getParentRoute: () => AdminRoute
});
var AdminDocumentsRoute = Route$9.update({
	id: "/documents",
	path: "/documents",
	getParentRoute: () => AdminRoute
});
var AdminMarketingRoute = Route$8.update({
	id: "/marketing",
	path: "/marketing",
	getParentRoute: () => AdminRoute
});
var AdminMatchingRoute = Route$7.update({
	id: "/matching",
	path: "/matching",
	getParentRoute: () => AdminRoute
});
var AdminPortailClientRoute = Route$6.update({
	id: "/portail-client",
	path: "/portail-client",
	getParentRoute: () => AdminRoute
});
var AdminProprietesRoute = Route$5.update({
	id: "/proprietes",
	path: "/proprietes",
	getParentRoute: () => AdminRoute
});
var AdminRapportsRoute = Route$4.update({
	id: "/rapports",
	path: "/rapports",
	getParentRoute: () => AdminRoute
});
var AdminTachesRoute = Route$3.update({
	id: "/taches",
	path: "/taches",
	getParentRoute: () => AdminRoute
});
var AdminTransactionsRoute = Route$2.update({
	id: "/transactions",
	path: "/transactions",
	getParentRoute: () => AdminRoute
});
var EquipeIndexRoute = Route$1.update({
	id: "/equipe/",
	path: "/equipe/",
	getParentRoute: () => Route$23
});
var EquipeSlugRoute = Route$27.update({
	id: "/equipe/$slug",
	path: "/equipe/$slug",
	getParentRoute: () => Route$23
});
var ProprietesIndexRoute = Route$29.update({
	id: "/proprietes/",
	path: "/proprietes/",
	getParentRoute: () => Route$23
});
var ProprietesSlugRoute = Route$24.update({
	id: "/proprietes/$slug",
	path: "/proprietes/$slug",
	getParentRoute: () => Route$23
});
var QuartiersIndexRoute = Route.update({
	id: "/quartiers/",
	path: "/quartiers/",
	getParentRoute: () => Route$23
});
var QuartiersSlugRoute = Route$26.update({
	id: "/quartiers/$slug",
	path: "/quartiers/$slug",
	getParentRoute: () => Route$23
});
var AdminRouteChildren = {
	AdminAgendaRoute,
	AdminAutomatisationsRoute,
	AdminClientsRoute,
	AdminCrmRoute,
	AdminDesignRoute,
	AdminDocumentsRoute,
	AdminMarketingRoute,
	AdminMatchingRoute,
	AdminPortailClientRoute,
	AdminProprietesRoute,
	AdminRapportsRoute,
	AdminTachesRoute,
	AdminTransactionsRoute,
	AdminIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AdminRoute: AdminRoute._addFileChildren(AdminRouteChildren),
	AgenceRoute,
	ContactRoute,
	ServicesRoute,
	TemoignagesRoute,
	VendreRoute,
	ActualitesSlugRoute,
	EquipeSlugRoute,
	ProprietesSlugRoute,
	QuartiersSlugRoute,
	ActualitesIndexRoute,
	EquipeIndexRoute,
	ProprietesIndexRoute,
	QuartiersIndexRoute
};
var routeTree = Route$23._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
