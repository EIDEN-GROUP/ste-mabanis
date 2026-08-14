import { i as __toESM } from "../_runtime.mjs";
import { f as properties, i as cn } from "./utils-BWXQYj3d.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { k as useCreatePublicLead } from "./queries-Dq_yS5N4.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lead-form-Oeo_d5pz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Splits a "Nom et prénom" value into first and last name. Kept forgiving:
* a single token becomes a first name, "Madame"/"Monsieur" prefixes are
* dropped, and a trailing family name can be multi-word ("El Amrani").
*/
function splitName(raw) {
	let parts = raw.trim().replace(/^(madame|monsieur|mme|m\.)\s+/i, "").split(/\s+/);
	parts = parts.filter(Boolean);
	if (parts.length === 1) return {
		firstName: parts[0],
		lastName: ""
	};
	const lastName = parts.slice(-2).join(" ");
	return {
		firstName: parts.slice(0, -2).join(" ") || parts[0],
		lastName
	};
}
function contextFromIntent(intent) {
	if (intent.startsWith("property:")) {
		const reference = intent.slice(9);
		const property = properties.find((p) => p.reference === reference);
		return property ? { propertyId: property.slug } : {};
	}
	if (intent.startsWith("agent:")) {
		const slug = intent.slice(6);
		return slug ? { agentId: slug } : {};
	}
	return {};
}
function LeadForm({ fields, submitLabel, intent, note, tone = "light", children }) {
	const [sent, setSent] = (0, import_react.useState)(false);
	const [sending, setSending] = (0, import_react.useState)(false);
	const createLead = useCreatePublicLead();
	const dark = tone === "navy";
	if (sent) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("border p-8 text-center", dark ? "border-white/15 bg-white/5" : "border-line bg-card"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "Demande enregistrée"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "display mt-3 text-3xl",
				children: "Merci, nous revenons vers vous."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-3 text-sm", dark ? "text-white/60" : "text-muted-foreground"),
				children: "Un conseiller STE MABANIS vous rappelle sous 24 heures ouvrées. Pour une réponse immédiate, écrivez-nous sur WhatsApp."
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: (e) => {
			e.preventDefault();
			const data = new FormData(e.currentTarget);
			const { firstName, lastName } = splitName(String(data.get("nom") ?? data.get("nom_complet") ?? ""));
			const email = String(data.get("email") ?? "");
			const phone = String(data.get("telephone") ?? "");
			const message = String(data.get("message") ?? "");
			const ctx = contextFromIntent(intent);
			setSending(true);
			createLead.mutate({
				firstName: firstName || (email.split("@")[0] ?? "Visiteur"),
				lastName,
				email,
				phone,
				message,
				intent,
				...ctx
			}, {
				onSuccess: () => {
					setSending(false);
					setSent(true);
					toast.success("Votre demande a bien été transmise à nos conseillers.");
				},
				onError: (err) => {
					setSending(false);
					toast.error("Envoi impossible", { description: "Réessayez dans un instant ou contactez-nous par téléphone." });
					console.error("LeadForm submission failed", err);
				}
			});
		},
		className: cn("border p-6 sm:p-8", dark ? "border-white/15 bg-white/5" : "border-line bg-card shadow-card"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "hidden",
				name: "intent",
				value: intent
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: fields.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: cn("flex flex-col gap-1.5", (f.full || f.type === "textarea") && "sm:col-span-2"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: cn("text-[0.6rem] tracking-[0.18em] uppercase", dark ? "text-white/50" : "text-muted-foreground"),
						children: [f.label, f.required ? " *" : ""]
					}), f.type === "textarea" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						name: f.name,
						required: f.required,
						rows: 4,
						placeholder: f.placeholder,
						className: cn("border px-3 py-2.5 text-sm outline-none transition-colors focus:border-gold", dark ? "border-white/20 bg-transparent text-white placeholder:text-white/30" : "border-line bg-background")
					}) : f.type === "select" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						name: f.name,
						required: f.required,
						defaultValue: "",
						className: cn("h-11 border px-3 text-sm outline-none transition-colors focus:border-gold", dark ? "border-white/20 bg-navy text-white" : "border-line bg-background"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							disabled: true,
							children: "Sélectionner…"
						}), f.options?.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: o,
							children: o
						}, o))]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: f.name,
						type: f.type ?? "text",
						required: f.required,
						placeholder: f.placeholder,
						className: cn("h-11 border px-3 text-sm outline-none transition-colors focus:border-gold", dark ? "border-white/20 bg-transparent text-white placeholder:text-white/30" : "border-line bg-background")
					})]
				}, f.name))
			}),
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "submit",
				disabled: sending,
				className: "mt-6 w-full bg-gold px-6 py-3.5 text-[0.7rem] tracking-[0.18em] text-navy uppercase transition-colors hover:bg-navy hover:text-white disabled:opacity-60 sm:w-auto",
				children: sending ? "Envoi en cours…" : submitLabel
			}),
			note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-4 text-xs", dark ? "text-white/45" : "text-muted-foreground"),
				children: note
			}) : null
		]
	});
}
//#endregion
export { LeadForm as t };
