import { i as __toESM } from "../_runtime.mjs";
import { f as properties, i as cn, n as agents } from "./utils-BTE8P7Sw.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { Y as Inbox, d as TrendingUp, f as TrendingDown, n as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/primitives-mgU9LIkI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Seed dataset for the admin.
*
* Properties and agents are derived from the public site content so both sides
* of the app describe the same agency. Everything else (clients, leads,
* appointments…) is generated deterministically — no Math.random, so SSR and
* client render agree and screenshots stay stable between runs.
*/
/** Fixed clock so relative dates in the seed are reproducible. */
var SEED_NOW = /* @__PURE__ */ new Date("2026-08-11T09:00:00.000Z");
var day = 864e5;
function iso(offsetDays, hour = 10, minute = 0) {
	const d = new Date(SEED_NOW.getTime() + offsetDays * day);
	d.setUTCHours(hour, minute, 0, 0);
	return d.toISOString();
}
/** Small deterministic PRNG so the seed is stable across renders. */
function rng(seed) {
	let s = seed;
	return () => {
		s = (s * 1664525 + 1013904223) % 4294967296;
		return s / 4294967296;
	};
}
var rand = rng(20260811);
/**
* Cyclic index. `noUncheckedIndexedAccess` is on, so plain `list[i]` is
* `T | undefined`; wrapping the modulo here keeps every call site non-null
* without scattering assertions through the seed.
*/
function at(list, i) {
	return list[(i % list.length + list.length) % list.length];
}
var pick = (list, r = rand()) => at(list, Math.floor(r * list.length));
var seedAgents = agents.map((a) => ({
	id: a.slug,
	name: a.name,
	role: a.role,
	email: a.email
}));
var statusCycle = [
	"available",
	"available",
	"reserved",
	"under_offer",
	"sold",
	"available",
	"rented",
	"draft",
	"available",
	"archived"
];
function mediaFor(p, id) {
	return [...p.images.map((url, i) => ({
		id: `${id}-photo-${i}`,
		propertyId: id,
		kind: "photo",
		url,
		label: i === 0 ? "Façade" : `Vue ${i + 1}`,
		position: i,
		isCover: i === 0
	})), {
		id: `${id}-plan-0`,
		propertyId: id,
		kind: "floor_plan",
		url: at(p.images, 0),
		label: "Plan niveau 1",
		position: 0,
		isCover: false
	}];
}
var seedProperties = properties.map((p, i) => {
	const id = p.slug;
	const status = at(statusCycle, i);
	const left = status === "sold" || status === "rented";
	return {
		id,
		reference: p.reference,
		slug: p.slug,
		title: p.title,
		status,
		transaction: p.transaction,
		type: p.type,
		city: p.city,
		neighborhood: p.neighborhood,
		price: p.price,
		surface: p.surface,
		bedrooms: p.bedrooms,
		bathrooms: p.bathrooms,
		description: p.description.join("\n\n"),
		features: p.features,
		media: mediaFor(p, id),
		agentId: p.agentSlug,
		soldAt: left ? iso(-20 - i * 3) : void 0,
		views30d: 180 + Math.floor(rand() * 900),
		leadCount: 2 + Math.floor(rand() * 14),
		createdAt: iso(-120 - i * 7),
		updatedAt: iso(-i * 2)
	};
});
var firstNames = [
	"Amine",
	"Leïla",
	"Youssef",
	"Fatima",
	"Omar",
	"Sanaa",
	"Rachid",
	"Imane",
	"Hicham",
	"Nawal",
	"Mehdi",
	"Khadija",
	"Tarik",
	"Soukaina",
	"Anas",
	"Meryem",
	"Jean-Marc",
	"Claire",
	"Otmane",
	"Zineb"
];
var lastNames = [
	"Benali",
	"Tazi",
	"El Fassi",
	"Bennani",
	"Chraibi",
	"Alaoui",
	"Berrada",
	"Idrissi",
	"Sekkat",
	"Lamrani",
	"Moreau",
	"Dubois",
	"Ait Taleb",
	"Ouazzani",
	"Belkadi",
	"Hassani",
	"Naciri",
	"Bouzid",
	"Kettani",
	"Sabri"
];
var roleSets = [
	["buyer"],
	["seller"],
	["tenant"],
	["landlord"],
	["investor"],
	["buyer", "investor"],
	["seller", "landlord"]
];
var sources = [
	"site_web",
	"recommandation",
	"portail",
	"reseaux_sociaux",
	"telephone",
	"walk_in"
];
function temperatureFor(score) {
	if (score >= 70) return "hot";
	if (score >= 40) return "warm";
	return "cold";
}
var seedClients = Array.from({ length: 24 }, (_, i) => {
	const score = Math.floor(rand() * 100);
	const first = at(firstNames, i);
	const last = at(lastNames, i * 3);
	const budgetMin = 7e5 + Math.floor(rand() * 12) * 25e4;
	return {
		id: `client-${i + 1}`,
		firstName: first,
		lastName: last,
		email: `${first.toLowerCase().replace(/[^a-z]/g, "")}.${last.toLowerCase().replace(/[^a-z]/g, "")}@example.ma`,
		phone: `+212 6${String(60 + i % 9)} ${String(1e5 + i * 4321).slice(0, 6)}`,
		roles: at(roleSets, i),
		temperature: temperatureFor(score),
		score,
		source: at(sources, i),
		city: pick([
			"Agadir",
			"Casablanca",
			"Marrakech",
			"Rabat",
			"Paris",
			"Taghazout"
		]),
		budgetMin,
		budgetMax: budgetMin + 9e5,
		notes: i % 4 === 0 ? "Financement bancaire en cours de validation." : void 0,
		agentId: at(seedAgents, i).id,
		createdAt: iso(-Math.floor(rand() * 180)),
		lastContactedAt: i % 5 === 0 ? void 0 : iso(-Math.floor(rand() * 12))
	};
});
var stageCycle = [
	"new",
	"new",
	"contacted",
	"contacted",
	"qualified",
	"qualified",
	"viewing",
	"viewing",
	"offer",
	"negotiation",
	"won",
	"lost"
];
var seedLeads = Array.from({ length: 30 }, (_, i) => {
	const client = at(seedClients, i);
	const property = at(seedProperties, i);
	const score = Math.floor(rand() * 100);
	return {
		id: `lead-${i + 1}`,
		clientId: client.id,
		propertyId: i % 6 === 0 ? void 0 : property.id,
		stage: at(stageCycle, i),
		temperature: temperatureFor(score),
		score,
		source: at(sources, i),
		value: property.price,
		agentId: client.agentId,
		createdAt: iso(-Math.floor(rand() * 60)),
		updatedAt: iso(-Math.floor(rand() * 10)),
		nextAction: i % 3 === 0 ? "Rappeler pour confirmer la visite" : "Envoyer la sélection de biens",
		nextActionAt: iso(Math.floor(rand() * 6) - 2, 9 + i % 8)
	};
});
Array.from({ length: 40 }, (_, i) => {
	const lead = at(seedLeads, i);
	const kind = at([
		"call",
		"email",
		"whatsapp",
		"viewing",
		"note",
		"stage_change"
	], i);
	return {
		id: `activity-${i + 1}`,
		kind,
		subject: {
			call: "Appel sortant",
			email: "Email envoyé",
			whatsapp: "Message WhatsApp",
			viewing: "Visite effectuée",
			note: "Note interne",
			stage_change: "Changement d'étape",
			offer: "Offre reçue",
			document: "Document ajouté"
		}[kind] ?? kind,
		body: kind === "note" ? "Client intéressé par une vue mer, budget flexible de 10%." : kind === "viewing" ? "Visite de 45 minutes, très bon accueil du bien." : void 0,
		clientId: lead.clientId,
		propertyId: lead.propertyId,
		leadId: lead.id,
		agentId: lead.agentId,
		createdAt: iso(-Math.floor(rand() * 30), 8 + i % 10)
	};
});
Array.from({ length: 18 }, (_, i) => {
	const lead = at(seedLeads, i);
	const offset = i % 12 - 4;
	const hour = 9 + i % 8;
	const kind = at([
		"viewing",
		"valuation",
		"signature",
		"call",
		"meeting"
	], i);
	const past = offset < 0;
	return {
		id: `appt-${i + 1}`,
		kind,
		status: past ? i % 5 === 0 ? "no_show" : "done" : i % 3 === 0 ? "confirmed" : "scheduled",
		title: kind === "viewing" ? "Visite accompagnée" : kind === "valuation" ? "Rendez-vous d'estimation" : kind === "signature" ? "Signature du compromis" : kind === "call" ? "Appel de suivi" : "Point de dossier",
		startsAt: iso(offset, hour),
		endsAt: iso(offset, hour + 1),
		propertyId: lead.propertyId,
		clientId: lead.clientId,
		agentId: lead.agentId,
		location: "Agadir",
		report: past ? {
			interest: 1 + Math.floor(rand() * 5),
			outcome: i % 3 === 0 ? "Intéressé, demande une seconde visite" : "Bien trop petit",
			nextAction: i % 2 === 0 ? "Proposer 2 biens similaires" : void 0
		} : void 0
	};
});
Array.from({ length: 14 }, (_, i) => {
	const property = at(seedProperties, i);
	const category = at([
		"mandat",
		"titre_foncier",
		"compromis",
		"contrat",
		"facture",
		"diagnostic"
	], i);
	return {
		id: `doc-${i + 1}`,
		name: `${category.replace(/_/g, " ")} — ${property.reference}.pdf`,
		category,
		mimeType: "application/pdf",
		sizeBytes: 12e4 + Math.floor(rand() * 3e6),
		version: 1 + i % 3,
		url: "#",
		propertyId: property.id,
		clientId: at(seedClients, i).id,
		uploadedById: at(seedAgents, i).id,
		createdAt: iso(-Math.floor(rand() * 90))
	};
});
Array.from({ length: 16 }, (_, i) => {
	const lead = at(seedLeads, i);
	return {
		id: `task-${i + 1}`,
		title: at([
			"Rappeler le client après la visite",
			"Envoyer le rapport d'estimation",
			"Relancer pour les pièces du dossier",
			"Préparer le mandat de vente",
			"Confirmer le rendez-vous de signature",
			"Mettre à jour les photos du bien"
		], i),
		status: i % 4 === 0 ? "done" : i % 3 === 0 ? "doing" : "todo",
		priority: at([
			"low",
			"normal",
			"high",
			"urgent"
		], i),
		dueAt: iso(i % 9 - 3, 12),
		assigneeId: lead.agentId,
		entity: {
			kind: "lead",
			id: lead.id
		},
		createdAt: iso(-Math.floor(rand() * 20))
	};
});
Array.from({ length: 8 }, (_, i) => {
	const property = at(seedProperties, i * 2);
	const stages = [
		"interest",
		"visit",
		"offer",
		"negotiation",
		"agreement",
		"contract",
		"payment",
		"closing"
	];
	const amount = Math.round(property.price * (.92 + rand() * .08));
	return {
		id: `txn-${i + 1}`,
		reference: `TX-2026-${String(i + 1).padStart(3, "0")}`,
		stage: at(stages, i),
		propertyId: property.id,
		buyerClientId: at(seedClients, i).id,
		sellerClientId: at(seedClients, i + 7).id,
		agentId: property.agentId,
		amount,
		commission: Math.round(amount * .025),
		payments: [{
			id: `pay-${i + 1}-1`,
			label: "Acompte",
			amount: Math.round(amount * .1),
			dueAt: iso(-15 + i),
			paidAt: i % 2 === 0 ? iso(-14 + i) : void 0
		}, {
			id: `pay-${i + 1}-2`,
			label: "Solde à la signature",
			amount: Math.round(amount * .9),
			dueAt: iso(20 + i)
		}],
		openedAt: iso(-40 - i * 5),
		closedAt: i % 8 === 7 ? iso(-2) : void 0
	};
});
iso(-8, 9), iso(-14), iso(-3, 14), iso(-5), iso(-1);
seedProperties[0].id, iso(-6), iso(9), seedProperties[3].id, iso(-3), iso(12);
iso(0, 8, 40), iso(0, 8, 10), iso(-1, 16, 30), iso(-1, 11, 5), iso(-2, 9, 20);
/** Shared formatters for the admin. French locale throughout, like the site. */
var madCompact = new Intl.NumberFormat("fr-FR", {
	notation: "compact",
	maximumFractionDigits: 1
});
var madFull = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });
function formatMoney(value, compact = false) {
	return `${compact ? madCompact.format(value) : madFull.format(value)} MAD`;
}
function formatNumber(value) {
	return madFull.format(value);
}
function formatPercent(value) {
	return `${value > 0 ? "+" : ""}${value}%`;
}
function formatDate(iso) {
	return new Date(iso).toLocaleDateString("fr-FR", {
		day: "2-digit",
		month: "short",
		year: "numeric"
	});
}
function formatTime(iso) {
	return new Date(iso).toLocaleTimeString("fr-FR", {
		hour: "2-digit",
		minute: "2-digit"
	});
}
function formatBytes(bytes) {
	if (bytes < 1024) return `${bytes} o`;
	const units = [
		"Ko",
		"Mo",
		"Go"
	];
	let v = bytes / 1024;
	let i = 0;
	while (v >= 1024 && i < units.length - 1) {
		v /= 1024;
		i++;
	}
	return `${v.toFixed(1)} ${units[i]}`;
}
/**
* Relative time against the seed clock, not the wall clock, so the seeded
* "il y a 2 h" stays truthful while the data is static.
*/
function relativeTime(iso, now = SEED_NOW) {
	const diff = new Date(iso).getTime() - now.getTime();
	const abs = Math.abs(diff);
	const minute = 6e4;
	const hour = 60 * minute;
	const day = 24 * hour;
	const rtf = new Intl.RelativeTimeFormat("fr-FR", { numeric: "auto" });
	if (abs < hour) return rtf.format(Math.round(diff / minute), "minute");
	if (abs < day) return rtf.format(Math.round(diff / hour), "hour");
	if (abs < 30 * day) return rtf.format(Math.round(diff / day), "day");
	return formatDate(iso);
}
var PROPERTY_STATUS_LABELS = {
	draft: "Brouillon",
	available: "Disponible",
	reserved: "Réservé",
	under_offer: "Sous offre",
	sold: "Vendu",
	rented: "Loué",
	archived: "Archivé"
};
var STAGE_LABELS = {
	new: "Nouveau",
	contacted: "Contacté",
	qualified: "Qualifié",
	viewing: "Visite",
	offer: "Offre",
	negotiation: "Négociation",
	won: "Gagné",
	lost: "Perdu"
};
var TEMPERATURE_LABELS = {
	cold: "Froid",
	warm: "Tiède",
	hot: "Chaud"
};
var ROLE_LABELS = {
	buyer: "Acquéreur",
	seller: "Vendeur",
	tenant: "Locataire",
	landlord: "Propriétaire",
	investor: "Investisseur"
};
var SOURCE_LABELS = {
	site_web: "Site web",
	recommandation: "Recommandation",
	portail: "Portail",
	reseaux_sociaux: "Réseaux sociaux",
	telephone: "Téléphone",
	walk_in: "Visite agence"
};
var APPOINTMENT_LABELS = {
	viewing: "Visite",
	valuation: "Estimation",
	signature: "Signature",
	call: "Appel",
	meeting: "Rendez-vous"
};
var DOCUMENT_LABELS = {
	mandat: "Mandat",
	titre_foncier: "Titre foncier",
	compromis: "Compromis",
	contrat: "Contrat",
	facture: "Facture",
	diagnostic: "Diagnostic",
	autre: "Autre"
};
var PRIORITY_LABELS = {
	low: "Basse",
	normal: "Normale",
	high: "Haute",
	urgent: "Urgente"
};
var TRANSACTION_STAGE_LABELS = {
	interest: "Intérêt",
	visit: "Visite",
	offer: "Offre",
	negotiation: "Négociation",
	agreement: "Accord",
	contract: "Contrat",
	payment: "Paiement",
	closing: "Clôture"
};
var label = (map, key) => map[key] ?? key;
/** The base surface every admin block sits on. Square, hairline, no shadow noise. */
function Panel({ children, className, as: Tag = "section" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
		className: cn("border border-line bg-admin-surface", className),
		children
	});
}
function PanelHeader({ title, eyebrow, action, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-start gap-4 border-b border-line px-5 py-4", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [eyebrow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: eyebrow
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "display mt-1 truncate text-xl",
				children: title
			})]
		}), action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "shrink-0",
			children: action
		}) : null]
	});
}
function StatCard({ label, value, delta, hint, icon: Icon, index = 0, className }) {
	const positive = (delta ?? 0) >= 0;
	const Trend = positive ? TrendingUp : TrendingDown;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: cn("stagger-in group relative overflow-hidden p-5 transition-[border-color,box-shadow] duration-400 hover:border-gold/60 hover:shadow-panel", className),
		as: "article",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			style: { ["--i"]: index },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "display mt-3 text-[clamp(1.75rem,4vw,2.5rem)] tabular-nums",
					children: value
				})]
			}), Icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-10 shrink-0 place-items-center border border-line bg-sand text-gold transition-colors duration-400 group-hover:border-gold/50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
			}) : null]
		}), delta !== void 0 || hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex items-center gap-2 border-t border-line pt-3 text-xs",
			children: [delta !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: cn("inline-flex items-center gap-1 font-medium tabular-nums", positive ? "text-positive" : "text-negative"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trend, { className: "size-3.5" }), formatPercent(delta)]
			}) : null, hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate text-muted-foreground",
				children: hint
			}) : null]
		}) : null]
	});
}
function EmptyState({ title, description, action, icon: Icon = Inbox, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col items-center px-6 py-14 text-center", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-14 place-items-center border border-line bg-sand text-gold",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-6" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "display mt-5 text-2xl",
				children: title
			}),
			description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground",
				children: description
			}) : null,
			action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: action
			}) : null
		]
	});
}
function LoadingState({ rows = 5, className, variant = "list" }) {
	if (variant === "chart") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("skeleton h-64 w-full", className),
		"aria-hidden": true
	});
	if (variant === "cards") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid gap-4 sm:grid-cols-2 xl:grid-cols-3", className),
		"aria-hidden": true,
		children: Array.from({ length: rows }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-52 w-full" }, i))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("space-y-2", className),
		"aria-hidden": true,
		children: Array.from({ length: rows }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-14 w-full" }, i))
	});
}
function Modal({ open, onClose, title, description, children, footer, size = "md" }) {
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = prev;
			window.removeEventListener("keydown", onKey);
		};
	}, [open, onClose]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6", open ? "visible" : "pointer-events-none invisible"),
		style: { transition: `visibility 0s linear ${open ? 0 : 320}ms` },
		"aria-hidden": !open,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			onClick: onClose,
			"aria-hidden": true,
			className: cn("absolute inset-0 bg-navy/45 backdrop-blur-[2px] transition-opacity duration-320", open ? "opacity-100" : "opacity-0")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-label": title,
			className: cn("relative flex max-h-[92vh] w-full flex-col bg-admin-surface shadow-elegant transition-[opacity,transform] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none", {
				sm: "max-w-md",
				md: "max-w-2xl",
				lg: "max-w-4xl"
			}[size], open ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-100 opacity-0 sm:translate-y-0 sm:scale-[0.98]"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-start gap-4 border-b border-line px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "display text-2xl",
							children: title
						}), description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: description
						}) : null]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						"aria-label": "Fermer",
						className: "grid size-9 shrink-0 place-items-center border border-line text-navy transition-colors hover:border-gold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-h-0 flex-1 overflow-y-auto px-5 py-5",
					children
				}),
				footer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
					className: "flex shrink-0 flex-wrap justify-end gap-3 border-t border-line px-5 py-4",
					children: footer
				}) : null
			]
		})]
	});
}
/** Side sheet on desktop, bottom sheet on phones — used for filters and detail. */
function Drawer({ open, onClose, title, children, footer, side = "right" }) {
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = prev;
			window.removeEventListener("keydown", onKey);
		};
	}, [open, onClose]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		onClick: onClose,
		"aria-hidden": true,
		className: cn("fixed inset-0 z-[95] bg-navy/45 backdrop-blur-[2px] transition-opacity duration-400", open ? "opacity-100" : "pointer-events-none opacity-0")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		role: "dialog",
		"aria-modal": "true",
		"aria-label": title,
		"aria-hidden": !open,
		className: cn("fixed z-[96] flex flex-col bg-admin-surface shadow-elegant transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none", "inset-x-0 bottom-0 max-h-[85vh] rounded-t-lg sm:inset-y-0 sm:max-h-none sm:w-full sm:max-w-[24rem] sm:rounded-none", side === "right" ? "sm:right-0 sm:left-auto" : "sm:left-0 sm:right-auto", open ? "translate-y-0 sm:translate-x-0" : side === "right" ? "translate-y-full sm:translate-y-0 sm:translate-x-full" : "translate-y-full sm:translate-y-0 sm:-translate-x-full"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex shrink-0 items-center gap-3 border-b border-line px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display min-w-0 flex-1 truncate text-xl",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					"aria-label": "Fermer",
					className: "grid size-9 shrink-0 place-items-center border border-line text-navy transition-colors hover:border-gold",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 overflow-y-auto px-5 py-5",
				children
			}),
			footer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "flex shrink-0 gap-3 border-t border-line px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]",
				children: footer
			}) : null
		]
	})] });
}
/** Thin wrapper so screens never import sonner directly. */
var toast$1 = {
	success: (message, description) => toast.success(message, description ? { description } : void 0),
	error: (message, description) => toast.error(message, description ? { description } : void 0),
	info: (message, description) => toast(message, description ? { description } : void 0)
};
function AdminButton({ children, variant = "primary", className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cn("inline-flex min-h-10 items-center justify-center gap-2 px-4 py-2.5 text-[0.68rem] tracking-[0.14em] uppercase transition-colors duration-300", {
			primary: "bg-gold text-navy hover:bg-navy hover:text-white",
			outline: "border border-line text-navy hover:border-gold",
			ghost: "text-muted-foreground hover:text-navy",
			danger: "border border-negative/40 text-negative hover:bg-negative hover:text-white"
		}[variant], className),
		...props,
		children
	});
}
//#endregion
export { formatTime as C, toast$1 as D, seedAgents as E, formatNumber as S, relativeTime as T, TEMPERATURE_LABELS as _, EmptyState as a, formatDate as b, PRIORITY_LABELS as c, PanelHeader as d, ROLE_LABELS as f, StatCard as g, STAGE_LABELS as h, Drawer as i, PROPERTY_STATUS_LABELS as l, SOURCE_LABELS as m, AdminButton as n, LoadingState as o, SEED_NOW as p, DOCUMENT_LABELS as r, Modal as s, APPOINTMENT_LABELS as t, Panel as u, TRANSACTION_STAGE_LABELS as v, label as w, formatMoney as x, formatBytes as y };
