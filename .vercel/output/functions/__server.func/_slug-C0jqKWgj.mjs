import { i as __toESM } from "./_runtime.mjs";
import { a as formatMAD, f as properties, i as cn, o as getAgent, t as agency } from "./_ssr/utils-BTE8P7Sw.mjs";
import { o as require_jsx_runtime, s as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./_slug-BMmOBTEB.mjs";
import { a as Section, i as Reveal, o as SectionHeading } from "./_ssr/layout-bits-BGOsNYiy.mjs";
import { t as LeadForm } from "./_ssr/lead-form-BUXN78FV.mjs";
import { B as Maximize, Ct as CalendarClock, Dt as BedDouble, H as Mail, O as Phone, Ot as Bath, Q as Heart, V as MapPin, gt as ChevronLeft, ht as ChevronRight, vt as Check } from "./_libs/lucide-react.mjs";
import { n as useFavorites, t as PropertyCard } from "./_ssr/property-card-DXmd3ont.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-C0jqKWgj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PropertyDetail() {
	const { property } = Route.useLoaderData();
	const agent = getAgent(property.agentSlug);
	const [active, setActive] = (0, import_react.useState)(0);
	const { isFavorite, toggle } = useFavorites();
	const fav = isFavorite(property.slug);
	const similar = properties.filter((p) => p.slug !== property.slug && p.transaction === property.transaction).slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "bg-navy pt-24 sm:pt-28",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative aspect-4/3 w-full overflow-hidden sm:aspect-21/9",
				children: [
					property.images.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src,
						alt: `${property.title} — photo ${i + 1}`,
						width: 1280,
						height: 960,
						className: cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]", i === active ? "opacity-100" : "opacity-0")
					}, src + i)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-navy/30" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Photo précédente",
						onClick: () => setActive((a) => (a - 1 + property.images.length) % property.images.length),
						className: "absolute top-1/2 left-3 grid size-11 -translate-y-1/2 place-items-center bg-white/85 text-navy transition-colors hover:bg-gold sm:left-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Photo suivante",
						onClick: () => setActive((a) => (a + 1) % property.images.length),
						className: "absolute top-1/2 right-3 grid size-11 -translate-y-1/2 place-items-center bg-white/85 text-navy transition-colors hover:bg-gold sm:right-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2",
						children: property.images.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": `Voir la photo ${i + 1}`,
							onClick: () => setActive(i),
							className: cn("h-1 transition-all duration-500", i === active ? "w-10 bg-gold" : "w-5 bg-white/50")
						}, `dot-${i}`))
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid max-w-[100rem] grid-cols-4 gap-2 px-5 py-4 sm:px-8 lg:px-12",
				children: property.images.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setActive(i),
					className: cn("aspect-4/3 overflow-hidden transition-opacity", i === active ? "opacity-100 ring-1 ring-gold" : "opacity-50 hover:opacity-85"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src,
						alt: "",
						loading: "lazy",
						width: 320,
						height: 240,
						className: "h-full w-full object-cover"
					})
				}, `thumb-${i}`))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-5 py-14 sm:px-8 sm:py-20 lg:px-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-[100rem] gap-14 lg:grid-cols-[1.6fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bg-navy px-3 py-1.5 text-[0.6rem] tracking-[0.18em] text-white uppercase",
									children: property.transaction === "vente" ? "À vendre" : "À louer"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase",
									children: ["Réf. ", property.reference]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => toggle(property.slug),
									className: "ml-auto inline-flex items-center gap-2 border border-line px-4 py-2 text-xs tracking-[0.14em] uppercase transition-colors hover:border-gold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("size-3.5", fav ? "fill-gold text-gold" : "text-navy/60") }), fav ? "Enregistré" : "Enregistrer"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "display mt-5 text-[clamp(2.25rem,5vw,4rem)]",
							children: property.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4 text-gold" }),
								property.neighborhood,
								", ",
								property.city
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "display mt-6 text-4xl text-blue",
							children: [
								formatMAD(property.price),
								" MAD",
								property.priceNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-2 font-sans text-sm text-muted-foreground",
									children: property.priceNote
								}) : null
							]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
						className: "mt-10 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spec, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize, { className: "size-4 text-gold" }),
								value: `${property.surface} m²`,
								label: "Surface habitable"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spec, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BedDouble, { className: "size-4 text-gold" }),
								value: `${property.bedrooms}`,
								label: "Chambres"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spec, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bath, { className: "size-4 text-gold" }),
								value: `${property.bathrooms}`,
								label: "Salles de bain"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spec, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "size-4 text-gold" }),
								value: `${property.year}`,
								label: "Année"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
						className: "mt-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "display rule-gold text-3xl",
							children: "Le bien"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 space-y-4 text-[0.98rem] leading-relaxed text-foreground/85",
							children: property.description.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p }, i))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
						className: "mt-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "display rule-gold text-3xl",
							children: "Prestations"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-5 grid gap-3 sm:grid-cols-2",
							children: property.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 shrink-0 text-gold" }), f]
							}, f))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
						className: "mt-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "display rule-gold text-3xl",
							children: "Situation"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 aspect-16/9 w-full overflow-hidden border border-line",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
								title: `Carte — ${property.neighborhood}`,
								src: `https://www.google.com/maps?q=${encodeURIComponent(property.mapQuery)}&output=embed`,
								loading: "lazy",
								className: "h-full w-full"
							})
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "lg:sticky lg:top-28 lg:self-start",
					children: [
						agent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border border-line bg-card p-6 shadow-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: "Votre interlocuteur"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "display grid size-14 place-items-center bg-navy text-xl text-gold",
										children: agent.initials
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: agent.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: agent.role
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5 space-y-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: `tel:${agent.phone.replace(/\s/g, "")}`,
										className: "flex items-center gap-2 hover:text-gold",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-3.5 text-gold" }),
											" ",
											agent.phone
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: `mailto:${agent.email}`,
										className: "flex items-center gap-2 hover:text-gold",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-3.5 text-gold" }),
											" ",
											agent.email
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/equipe/$slug",
									params: { slug: agent.slug },
									className: "link-underline mt-5 inline-block text-xs tracking-[0.16em] uppercase",
									children: "Voir son profil"
								})
							]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadForm, {
								intent: `property:${property.reference}`,
								submitLabel: "Planifier une visite",
								note: `Réf. ${property.reference} — nous vous proposons deux créneaux sous 24 h.`,
								fields: [
									{
										name: "nom",
										label: "Nom et prénom",
										required: true
									},
									{
										name: "telephone",
										label: "Téléphone",
										type: "tel",
										required: true
									},
									{
										name: "email",
										label: "E-mail",
										type: "email",
										required: true,
										full: true
									},
									{
										name: "creneau",
										label: "Créneau souhaité",
										type: "select",
										options: [
											"En semaine, matin",
											"En semaine, après-midi",
											"Samedi matin",
											"Visite en visioconférence"
										],
										required: true,
										full: true
									},
									{
										name: "message",
										label: "Demander plus d'informations",
										type: "textarea",
										placeholder: "Charges, travaux, titre foncier, financement…"
									}
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `https://wa.me/${agency.whatsapp}?text=${encodeURIComponent(`Bonjour, je suis intéressé par le bien ${property.reference} — ${property.title}.`)}`,
							target: "_blank",
							rel: "noreferrer noopener",
							className: "mt-4 block border border-navy px-6 py-3.5 text-center text-[0.7rem] tracking-[0.18em] uppercase transition-colors hover:bg-navy hover:text-white",
							children: "Échanger sur WhatsApp"
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			tone: "sand",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "À découvrir aussi",
				title: "Biens similaires"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3",
				children: similar.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * 80,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyCard, { property: p })
				}, p.slug))
			})]
		})
	] });
}
function Spec({ icon, value, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background p-5",
		children: [
			icon,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "display mt-2 text-2xl",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.65rem] tracking-[0.14em] text-muted-foreground uppercase",
				children: label
			})
		]
	});
}
//#endregion
export { PropertyDetail as component };
