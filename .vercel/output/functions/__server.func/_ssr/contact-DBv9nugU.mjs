import { t as agency } from "./utils-BTE8P7Sw.mjs";
import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as Section, i as Reveal, r as PageHero } from "./layout-bits-BGOsNYiy.mjs";
import { t as LeadForm } from "./lead-form-BUXN78FV.mjs";
import { H as Mail, L as MessageCircle, O as Phone, V as MapPin, ut as Clock } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-DBv9nugU.js
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Contact",
		title: "Dites-nous où vous en êtes.",
		intro: "Achat, vente, location, gestion ou simple question sur le marché : la première conversation est toujours gratuite."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-14 lg:grid-cols-[1fr_1.2fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
			className: "space-y-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Agence d'Agadir"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-5 space-y-4 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mt-0.5 size-4 shrink-0 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: agency.address })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "mt-0.5 size-4 shrink-0 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `tel:${agency.phone.replace(/\s/g, "")}`,
									className: "hover:text-gold",
									children: agency.phone
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `tel:${agency.mobile.replace(/\s/g, "")}`,
									className: "hover:text-gold",
									children: agency.mobile
								})
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "mt-0.5 size-4 shrink-0 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `mailto:${agency.email}`,
								className: "hover:text-gold",
								children: agency.email
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "mt-0.5 size-4 shrink-0 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: agency.hours })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: `https://wa.me/${agency.whatsapp}`,
					target: "_blank",
					rel: "noreferrer noopener",
					className: "mt-7 inline-flex items-center gap-2 bg-navy px-6 py-3.5 text-[0.7rem] tracking-[0.18em] text-white uppercase transition-colors hover:bg-gold hover:text-navy",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }), " Écrire sur WhatsApp"]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "aspect-4/3 w-full overflow-hidden border border-line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
					title: "Localisation de l'agence STE MABANIS à Agadir",
					src: "https://www.google.com/maps?q=Avenue%20Hassan%20II%2C%20Agadir%2C%20Maroc&output=embed",
					loading: "lazy",
					className: "h-full w-full"
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
			delay: 100,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadForm, {
				intent: "contact",
				submitLabel: "Envoyer ma demande",
				note: "Vos coordonnées ne sont utilisées que pour traiter votre demande.",
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
						name: "sujet",
						label: "Votre demande",
						type: "select",
						required: true,
						full: true,
						options: [
							"Acheter un bien",
							"Vendre un bien",
							"Louer un bien",
							"Demander une estimation",
							"Confier mon bien en gestion",
							"Prendre rendez-vous en agence",
							"Autre question"
						]
					},
					{
						name: "message",
						label: "Message",
						type: "textarea",
						required: true,
						placeholder: "Décrivez votre projet, votre budget et vos délais."
					}
				]
			})
		})]
	}) })] });
}
//#endregion
export { ContactPage as component };
