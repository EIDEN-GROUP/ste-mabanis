import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { a as PROPERTY_STATUSES, i as PIPELINE_STAGES, r as LEAD_SOURCES, s as TRANSACTION_STAGES, t as ACTIVE_PROPERTY_STATUSES } from "./types-CH15H5aZ.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { i as stringType, n as enumType, r as objectType, t as coerce } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/server-DgyYIT6O.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/**
* Typed server environment.
*
* Server-only module: it reads `process.env` and is validated with Zod so a
* misconfigured deployment fails fast with an explicit message instead of a
* confusing runtime error somewhere in a query. Never import this from client
* code — the TanStack import-protection plugin enforces that.
*/
var envSchema = objectType({
	SUPABASE_URL: stringType().url("SUPABASE_URL must be a full URL, e.g. https://xxxx.supabase.co"),
	SUPABASE_SERVICE_ROLE_KEY: stringType().min(20, "SUPABASE_SERVICE_ROLE_KEY looks invalid — copy it from the Supabase dashboard"),
	SMTP_HOST: stringType().optional().default(""),
	SMTP_PORT: coerce.number().int().positive().optional().default(587),
	SMTP_USER: stringType().optional().default(""),
	SMTP_PASS: stringType().optional().default(""),
	SMTP_FROM: stringType().optional().default("STE MABANIS <contact@mabanis.com>"),
	PUBLIC_URL: stringType().url("PUBLIC_URL must be a full URL").optional().default("http://localhost:3000"),
	SITE_DOMAIN: stringType().min(1).optional().default("mabanis.com"),
	DEPLOY_TARGET: enumType([
		"node-server",
		"vercel",
		"cloudflare-module"
	]).optional().default("node-server"),
	SEED_STAFF_PASSWORD: stringType().optional().default("")
});
var cached;
/** Validated environment, parsed once per process. */
function env() {
	if (cached) return cached;
	const parsed = envSchema.safeParse(process.env);
	if (!parsed.success) {
		const details = parsed.error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`).join("\n");
		throw new Error(`Invalid server environment.\nCopy .env.example to .env and set every required value:\n${details}`);
	}
	cached = parsed.data;
	return parsed.data;
}
/**
* Supabase client factory — server only.
*
* The application never talks to Supabase from the browser. All data access
* happens inside server functions through a single service-role client, so
* business logic stays on the backend and the service-role key never leaves
* the server. Postgres Row Level Security stays enabled as defense in depth
* (policies in supabase/migrations/0002_rls.sql and 0003_*).
*/
var client;
function getSupabase() {
	if (!client) {
		const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = env();
		client = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
			auth: {
				persistSession: false,
				autoRefreshToken: false,
				detectSessionInUrl: false
			},
			global: { headers: { "x-application": "ste-mabanis-admin" } }
		});
	}
	return client;
}
var now = () => (/* @__PURE__ */ new Date()).toISOString();
var norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
var MONTHS = [
	"Mars",
	"Avril",
	"Mai",
	"Juin",
	"Juillet",
	"Août"
];
function slugify(text) {
	return norm(text).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "bien";
}
function temperatureFor(score) {
	if (score >= 70) return "hot";
	if (score >= 40) return "warm";
	return "cold";
}
function dbError(context, error) {
	const message = error instanceof Error ? error.message : String(error);
	throw new Error(`[supabase:${context}] ${message}`);
}
function isUniqueViolation(error) {
	return typeof error === "object" && error !== null && error.code === "23505";
}
/** Patch<T> → Partial<T>: our undefined-tolerant patch shape for PostgREST. */
function asPartial(patch) {
	return patch;
}
function weekBuckets(fromIso, toIso) {
	const buckets = [];
	const start = new Date(fromIso).getTime();
	const end = new Date(toIso).getTime();
	const week = 7 * 864e5;
	for (let t = start; t < end; t += week) {
		const s = new Date(t);
		buckets.push({
			from: t,
			to: Math.min(t + week, end),
			label: s.toLocaleDateString("fr-FR", {
				day: "2-digit",
				month: "short"
			})
		});
	}
	if (buckets.length === 0) buckets.push({
		from: start,
		to: end,
		label: "Période"
	});
	return buckets;
}
function bucketOf(buckets, iso) {
	const t = new Date(iso).getTime();
	const idx = buckets.findIndex((b) => t >= b.from && t < b.to);
	return idx < 0 ? buckets.length - 1 : idx;
}
/** Scores an active property against a client's profile (0-100, or null). */
function propertyScore(property, client) {
	if (!ACTIVE_PROPERTY_STATUSES.includes(property.status)) return null;
	if (client.roles.filter((r) => r !== "seller" && r !== "landlord").length === 0) return null;
	const wantsRent = client.roles.includes("tenant");
	const wantsBuy = client.roles.includes("buyer") || client.roles.includes("investor");
	const isRent = property.transaction === "location";
	const isSale = property.transaction === "vente";
	let score = 0;
	const reasons = [];
	if (wantsRent && isRent || wantsBuy && isSale) {
		score += 20;
		reasons.push(isRent ? "Recherche une location" : "Recherche un achat");
	} else if (wantsBuy && isRent || wantsRent && isSale) score += 5;
	else return null;
	if (client.city) if (norm(client.city) === norm(property.city)) {
		score += 25;
		reasons.push(`Secteur ${property.city}`);
	} else {
		score += 5;
		reasons.push(`Ville ${property.city}`);
	}
	else {
		score += 10;
		reasons.push("Sans préférence de ville");
	}
	if (client.budgetMin !== void 0 && client.budgetMax !== void 0) if (property.price >= client.budgetMin && property.price <= client.budgetMax) {
		score += 30;
		reasons.push("Budget compatible");
	} else if (property.price <= client.budgetMax * 1.1) {
		score += 12;
		reasons.push("Légèrement au-dessus du budget");
	} else score -= 20;
	if (property.features.some((f) => norm(f).includes("piscine")) && norm(client.notes ?? "").includes("piscine")) {
		score += 10;
		reasons.push("Piscine");
	}
	if (property.features.some((f) => norm(f).includes("vue mer")) && norm(client.notes ?? "").includes("mer")) {
		score += 10;
		reasons.push("Vue mer");
	}
	return score <= 0 ? null : {
		propertyId: property.id,
		score: Math.min(score, 100),
		reasons
	};
}
function clientScore(client, property) {
	const match = propertyScore(property, client);
	if (!match) return null;
	return {
		clientId: client.id,
		score: match.score,
		reasons: match.reasons
	};
}
function db() {
	return getSupabase();
}
/** All staff profiles; slugs fall back to a name-derived slug when missing. */
async function loadProfiles() {
	const { data, error } = await db().from("profiles").select("*");
	if (error) dbError("profiles", error);
	return data ?? [];
}
function agentIdOf(profile) {
	return profile.slug ?? slugify(profile.name);
}
/** uuid → app-level agent id (slug) for every profile. */
async function agentMap() {
	const rows = await loadProfiles();
	const map = /* @__PURE__ */ new Map();
	for (const p of rows) map.set(p.id, agentIdOf(p));
	return map;
}
/** Resolve an app-level agent id (slug) to the profile uuid. */
async function slugToUuid(agentId) {
	const rows = await loadProfiles();
	for (const p of rows) if (agentIdOf(p) === agentId) return p.id;
	if (rows.some((p) => p.id === agentId)) return agentId;
	return null;
}
/** The first-created profile is the default agent, like seedAgents[0]. */
async function defaultAgentId() {
	const rows = await loadProfiles();
	if (rows.length === 0) return "yassine-el-amrani";
	rows.sort((a, b) => a.created_at.localeCompare(b.created_at));
	return agentIdOf(rows[0]);
}
async function countRows(table) {
	const { count, error } = await db().from(table).select("id", {
		count: "exact",
		head: true
	});
	if (error) dbError(`count:${table}`, error);
	return count ?? 0;
}
function mapAgent(row) {
	return {
		id: agentIdOf(row),
		name: row.name,
		role: row.role,
		email: row.email,
		avatarUrl: row.avatar_url ?? void 0
	};
}
function mapProperty(row, media, agents, fallbackAgent) {
	return {
		id: row.id,
		reference: row.reference,
		slug: row.slug,
		title: row.title,
		status: row.status,
		transaction: row.transaction,
		type: row.type,
		city: row.city,
		neighborhood: row.neighborhood,
		price: row.price,
		surface: row.surface,
		bedrooms: row.bedrooms,
		bathrooms: row.bathrooms,
		description: row.description,
		features: row.features,
		media,
		agentId: row.agent_id ? agents.get(row.agent_id) ?? row.agent_id : fallbackAgent,
		ownerClientId: row.owner_client_id ?? void 0,
		soldAt: row.sold_at ?? void 0,
		views30d: row.views_30d,
		leadCount: row.lead_count,
		createdAt: row.created_at,
		updatedAt: row.updated_at
	};
}
function mapMedia(row) {
	return {
		id: row.id,
		propertyId: row.property_id,
		kind: row.kind,
		url: row.url,
		label: row.label ?? void 0,
		position: row.position,
		isCover: row.is_cover
	};
}
function mapClient(row, agents, fallbackAgent) {
	return {
		id: row.id,
		firstName: row.first_name,
		lastName: row.last_name,
		email: row.email,
		phone: row.phone,
		roles: row.roles,
		temperature: row.temperature,
		score: row.score,
		source: row.source,
		city: row.city ?? void 0,
		budgetMin: row.budget_min ?? void 0,
		budgetMax: row.budget_max ?? void 0,
		notes: row.notes ?? void 0,
		agentId: row.agent_id ? agents.get(row.agent_id) ?? row.agent_id : fallbackAgent,
		createdAt: row.created_at,
		lastContactedAt: row.last_contacted_at ?? void 0
	};
}
function mapLead(row, agents, fallbackAgent) {
	return {
		id: row.id,
		clientId: row.client_id,
		propertyId: row.property_id ?? void 0,
		stage: row.stage,
		temperature: row.temperature,
		score: row.score,
		source: row.source,
		value: row.value,
		agentId: row.agent_id ? agents.get(row.agent_id) ?? row.agent_id : fallbackAgent,
		createdAt: row.created_at,
		updatedAt: row.updated_at,
		nextAction: row.next_action ?? void 0,
		nextActionAt: row.next_action_at ?? void 0
	};
}
function mapActivity(row, agents) {
	return {
		id: row.id,
		kind: row.kind,
		subject: row.subject,
		body: row.body ?? void 0,
		clientId: row.client_id ?? void 0,
		propertyId: row.property_id ?? void 0,
		leadId: row.lead_id ?? void 0,
		agentId: row.agent_id ? agents.get(row.agent_id) ?? row.agent_id : "",
		createdAt: row.created_at
	};
}
function mapAppointment(row) {
	return {
		id: row.id,
		kind: row.kind,
		status: row.status,
		title: row.title,
		startsAt: row.starts_at,
		endsAt: row.ends_at,
		propertyId: row.property_id ?? void 0,
		clientId: row.client_id ?? void 0,
		agentId: row.agent_id ?? "",
		location: row.location ?? void 0,
		report: row.report_interest !== null && row.report_outcome !== null ? {
			interest: row.report_interest,
			outcome: row.report_outcome,
			nextAction: row.report_next_action ?? void 0
		} : void 0
	};
}
function mapDocument(row) {
	return {
		id: row.id,
		name: row.name,
		category: row.category,
		mimeType: row.mime_type,
		sizeBytes: row.size_bytes,
		version: row.version,
		url: row.storage_path,
		propertyId: row.property_id ?? void 0,
		clientId: row.client_id ?? void 0,
		transactionId: row.transaction_id ?? void 0,
		uploadedById: row.uploaded_by ?? "",
		createdAt: row.created_at
	};
}
function mapTask(row, agents) {
	return {
		id: row.id,
		title: row.title,
		status: row.status,
		priority: row.priority,
		dueAt: row.due_at ?? void 0,
		assigneeId: row.assignee_id ? agents.get(row.assignee_id) ?? row.assignee_id : "",
		entity: row.entity_kind && row.entity_id ? {
			kind: row.entity_kind,
			id: row.entity_id
		} : void 0,
		createdAt: row.created_at
	};
}
function mapPayment(row) {
	return {
		id: row.id,
		label: row.label,
		amount: row.amount,
		dueAt: row.due_at,
		paidAt: row.paid_at ?? void 0
	};
}
function mapTransaction(row, payments, agents) {
	return {
		id: row.id,
		reference: row.reference,
		stage: row.stage,
		propertyId: row.property_id,
		buyerClientId: row.buyer_client_id ?? "",
		sellerClientId: row.seller_client_id ?? void 0,
		agentId: row.agent_id ? agents.get(row.agent_id) ?? row.agent_id : "",
		amount: row.amount,
		commission: row.commission,
		payments,
		openedAt: row.opened_at,
		closedAt: row.closed_at ?? void 0
	};
}
function mapNotification(row) {
	return {
		id: row.id,
		kind: row.kind,
		title: row.title,
		body: row.body,
		read: row.read,
		createdAt: row.created_at,
		href: row.href ?? void 0
	};
}
function mapCampaign(row) {
	return {
		id: row.id,
		name: row.name,
		subject: row.subject,
		channel: row.channel,
		status: row.status,
		audience: row.audience,
		audienceCount: row.audience_count,
		sentAt: row.sent_at ?? void 0,
		opens: row.opens,
		clicks: row.clicks,
		conversions: row.conversions,
		createdAt: row.created_at
	};
}
function mapFeatured(row) {
	return {
		propertyId: row.property_id,
		since: row.since,
		until: row.until ?? ""
	};
}
function mapAutomationRun(row) {
	return {
		id: row.id,
		rule: row.rule,
		title: row.title,
		detail: row.detail,
		at: row.at
	};
}
async function mediaForProperty(propertyId) {
	const { data, error } = await db().from("property_media").select("*").eq("property_id", propertyId).order("position", { ascending: true });
	if (error) dbError("property_media", error);
	return (data ?? []).map(mapMedia);
}
/** Replace a property's media rows with the given (normalized) list. */
async function replaceMedia(propertyId, media) {
	const { error: del } = await db().from("property_media").delete().eq("property_id", propertyId);
	if (del) dbError("property_media.delete", del);
	if (media.length === 0) return;
	const rows = media.map((m) => ({
		id: m.id,
		property_id: m.propertyId,
		kind: m.kind,
		url: m.url,
		label: m.label ?? null,
		position: m.position,
		is_cover: m.isCover
	}));
	const { error } = await db().from("property_media").insert(rows);
	if (error) dbError("property_media.insert", error);
}
function sortMedia(list) {
	return [...list].sort((a, b) => {
		const order = {
			photo: 0,
			floor_plan: 1,
			video: 2
		};
		if (order[a.kind] !== order[b.kind]) return order[a.kind] - order[b.kind];
		return a.position - b.position;
	});
}
/**
* Keeps a property's media consistent after any change: sorted by kind then
* position, and exactly one photo carries the cover flag (the first photo when
* none is marked).
*/
function normalizeMedia(property) {
	const media = sortMedia(property.media);
	let coverAssigned = false;
	const normalized = media.map((m) => {
		if (m.kind !== "photo") return m;
		if (m.isCover && !coverAssigned) {
			coverAssigned = true;
			return m;
		}
		return {
			...m,
			isCover: false
		};
	});
	const firstPhoto = normalized.find((m) => m.kind === "photo");
	if (firstPhoto && !coverAssigned) {
		const idx = normalized.findIndex((m) => m.id === firstPhoto.id);
		normalized[idx] = {
			...normalized[idx],
			isCover: true
		};
	}
	return {
		...property,
		media: normalized
	};
}
async function insertActivity(input) {
	const fallback = await defaultAgentId();
	const agentUuid = await slugToUuid(input.agentId ?? fallback);
	const { data, error } = await db().from("activities").insert({
		id: crypto.randomUUID(),
		kind: input.kind,
		subject: input.subject,
		body: input.body ?? null,
		client_id: input.clientId ?? null,
		property_id: input.propertyId ?? null,
		lead_id: input.leadId ?? null,
		agent_id: agentUuid,
		created_at: now()
	}).select().single();
	if (error) dbError("activities.insert", error);
	return mapActivity(data, await agentMap());
}
async function insertNotification(input) {
	const { data, error } = await db().from("notifications").insert({
		id: crypto.randomUUID(),
		recipient_id: null,
		kind: input.kind,
		title: input.title,
		body: input.body,
		href: input.href ?? null,
		read: false,
		created_at: now()
	}).select().single();
	if (error) dbError("notifications.insert", error);
	return mapNotification(data);
}
async function insertTask(input) {
	const assigneeUuid = await slugToUuid(input.assigneeId ?? await defaultAgentId());
	const { data, error } = await db().from("tasks").insert({
		id: crypto.randomUUID(),
		title: input.title,
		status: input.status ?? "todo",
		priority: input.priority ?? "normal",
		due_at: input.dueAt ?? null,
		assignee_id: assigneeUuid,
		entity_kind: input.entity?.kind ?? null,
		entity_id: input.entity?.id ?? null,
		created_at: now()
	}).select().single();
	if (error) dbError("tasks.insert", error);
	return mapTask(data, await agentMap());
}
var AUTOMATION_META = {
	leadFirstContact: {
		title: "Nouveau lead → contact sous 24 h",
		description: "Tâche de premier contact, affectation à l'agent et notification à la création d'un lead."
	},
	visitConfirmTask: {
		title: "Visite planifiée → confirmation",
		description: "Tâche de confirmation à la planification, tâche de débrief quand la visite est terminée."
	},
	soldClosesTransaction: {
		title: "Bien vendu → transaction clôturée",
		description: "Passe la transaction associée à l'étape clôture quand un bien quitte le marché."
	},
	inactiveLeadRelance: {
		title: "Lead inactif 3 jours → relance",
		description: "Détecte les leads sans activité depuis 3 jours et crée la tâche de rappel de l'agent."
	}
};
/** Missing rows default to enabled, matching the old in-memory flags. */
async function getAutomationRule(key) {
	const { data, error } = await db().from("automation_rules").select("key, enabled, runs, last_run").eq("key", key).maybeSingle();
	if (error) dbError("automation_rules", error);
	return data ?? {
		key,
		enabled: true,
		runs: 0,
		last_run: null
	};
}
async function recordAutomationRun(key, title, detail) {
	const at = now();
	const { error } = await db().from("automation_runs").insert({
		id: crypto.randomUUID(),
		rule: key,
		title,
		detail,
		at
	});
	if (error) dbError("automation_runs.insert", error);
	const rule = await getAutomationRule(key);
	const { error: bump } = await db().from("automation_rules").update({
		runs: (rule.runs ?? 0) + 1,
		last_run: at
	}).eq("key", key);
	if (bump) dbError("automation_rules.update", bump);
}
/**
* Typed server functions. Screens never touch the repository directly — they go
* through these, so authorisation (and later Supabase RLS) has exactly one
* place to live.
*/
/** Data access goes through the Supabase repository. */
var repository = {
	async listProperties(q = {}) {
		const { data, error } = await db().from("properties").select("*");
		if (error) dbError("properties", error);
		const rows = data ?? [];
		const agents = await agentMap();
		const fallback = await defaultAgentId();
		let mediaRows = [];
		if (rows.length > 0) {
			const m = await db().from("property_media").select("*").in("property_id", rows.map((r) => r.id)).order("position", { ascending: true });
			if (m.error) dbError("property_media", m.error);
			mediaRows = m.data ?? [];
		}
		const mediaByProperty = /* @__PURE__ */ new Map();
		for (const m of mediaRows) {
			const list = mediaByProperty.get(m.property_id) ?? [];
			list.push(mapMedia(m));
			mediaByProperty.set(m.property_id, list);
		}
		let list = rows.map((r) => normalizeMedia(mapProperty(r, mediaByProperty.get(r.id) ?? [], agents, fallback)));
		if (q.search) {
			const term = norm(q.search);
			list = list.filter((p) => [
				p.title,
				p.reference,
				p.neighborhood,
				p.city,
				p.type
			].some((f) => norm(f).includes(term)));
		}
		if (q.status?.length) list = list.filter((p) => q.status.includes(p.status));
		if (q.transaction) list = list.filter((p) => p.transaction === q.transaction);
		if (q.agentId) list = list.filter((p) => p.agentId === q.agentId);
		if (q.city) list = list.filter((p) => p.city === q.city);
		if (q.minPrice) list = list.filter((p) => p.price >= q.minPrice);
		if (q.maxPrice) list = list.filter((p) => p.price <= q.maxPrice);
		switch (q.sort) {
			case "price_asc":
				list.sort((a, b) => a.price - b.price);
				break;
			case "price_desc":
				list.sort((a, b) => b.price - a.price);
				break;
			case "views":
				list.sort((a, b) => b.views30d - a.views30d);
				break;
			default: list.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
		}
		return list;
	},
	async getProperty(id) {
		const { data, error } = await db().from("properties").select("*").eq("id", id).maybeSingle();
		if (error) dbError("properties", error);
		if (!data) return null;
		const agents = await agentMap();
		const fallback = await defaultAgentId();
		return normalizeMedia(mapProperty(data, await mediaForProperty(id), agents, fallback));
	},
	async createProperty(input) {
		const id = crypto.randomUUID();
		const createdAt = now();
		const agentUuid = await slugToUuid(input.agentId ?? await defaultAgentId());
		const left = input.status === "sold" || input.status === "rented";
		for (let attempt = 0; attempt < 5; attempt++) {
			const row = {
				id,
				reference: (attempt === 0 ? input.reference : `MB-${1100 + await countRows("properties") + Math.floor(Math.random() * 90)}`) ?? `MB-${1100 + await countRows("properties") + Math.floor(Math.random() * 90)}`,
				slug: `${slugify(input.title)}-${id.slice(-4)}`,
				title: input.title,
				status: input.status ?? "draft",
				transaction: input.transaction,
				type: input.type,
				city: input.city,
				neighborhood: input.neighborhood,
				price: input.price,
				surface: input.surface,
				bedrooms: input.bedrooms ?? 0,
				bathrooms: input.bathrooms ?? 0,
				description: input.description ?? "",
				features: input.features ?? [],
				agent_id: agentUuid,
				owner_client_id: null,
				sold_at: left ? createdAt : null,
				views_30d: 0,
				lead_count: 0,
				created_at: createdAt,
				updated_at: createdAt,
				year: null,
				land_surface: null,
				price_note: null,
				map_query: null
			};
			const { data, error } = await db().from("properties").insert(row).select().single();
			if (error) {
				if (attempt < 4 && isUniqueViolation(error)) continue;
				dbError("properties.insert", error);
			}
			const property = normalizeMedia(mapProperty(data, [], await agentMap(), await defaultAgentId()));
			await insertActivity({
				kind: "note",
				subject: "Bien créé",
				body: `Fiche ${property.reference} — ${property.title}`,
				propertyId: id
			});
			return property;
		}
		throw new Error("[supabase:properties.insert] could not allocate a unique reference");
	},
	async updateProperty(id, patch) {
		const upd = {};
		if (patch.reference !== void 0) upd.reference = patch.reference;
		if (patch.title !== void 0) upd.title = patch.title;
		if (patch.status !== void 0) upd.status = patch.status;
		if (patch.transaction !== void 0) upd.transaction = patch.transaction;
		if (patch.type !== void 0) upd.type = patch.type;
		if (patch.city !== void 0) upd.city = patch.city;
		if (patch.neighborhood !== void 0) upd.neighborhood = patch.neighborhood;
		if (patch.price !== void 0) upd.price = patch.price;
		if (patch.surface !== void 0) upd.surface = patch.surface;
		if (patch.bedrooms !== void 0) upd.bedrooms = patch.bedrooms;
		if (patch.bathrooms !== void 0) upd.bathrooms = patch.bathrooms;
		if (patch.description !== void 0) upd.description = patch.description;
		if (patch.features !== void 0) upd.features = patch.features;
		if (patch.agentId !== void 0) {
			const agentUuid = await slugToUuid(patch.agentId);
			if (agentUuid) upd.agent_id = agentUuid;
		}
		if (Object.keys(upd).length === 0) return this.getProperty(id);
		const { data, error } = await db().from("properties").update({
			...asPartial(upd),
			updated_at: now()
		}).eq("id", id).select().maybeSingle();
		if (error) dbError("properties.update", error);
		if (!data) return null;
		const agents = await agentMap();
		const fallback = await defaultAgentId();
		const property = normalizeMedia(mapProperty(data, await mediaForProperty(id), agents, fallback));
		await insertActivity({
			kind: "note",
			subject: "Bien mis à jour",
			body: `${property.reference} — ${property.title}`,
			propertyId: id
		});
		return property;
	},
	async updatePropertyStatus(id, status) {
		const { data, error } = await db().from("properties").update({ status }).eq("id", id).select().maybeSingle();
		if (error) dbError("properties.update", error);
		if (!data) return null;
		const agents = await agentMap();
		const fallback = await defaultAgentId();
		const property = normalizeMedia(mapProperty(data, await mediaForProperty(id), agents, fallback));
		const left = status === "sold" || status === "rented";
		await insertActivity({
			kind: "stage_change",
			subject: `Statut → ${status}`,
			body: left ? "Le bien quitte le marché public, l'historique est conservé." : status === "available" ? "Le bien est de nouveau visible sur le site public." : void 0,
			propertyId: id
		});
		if (left) {
			await insertNotification({
				kind: "transaction",
				title: status === "sold" ? "Bien vendu" : "Bien loué",
				body: `${property.reference} — ${property.title} quitte le marché.`,
				href: "/admin/proprietes"
			});
			if ((await getAutomationRule("soldClosesTransaction")).enabled) {
				const txn = await db().from("transactions").select("*").eq("property_id", id).is("closed_at", null).neq("stage", "closing").maybeSingle();
				if (!txn.error && txn.data) {
					await db().from("transactions").update({
						stage: "closing",
						closed_at: txn.data.closed_at ?? now()
					}).eq("id", txn.data.id);
					await recordAutomationRun("soldClosesTransaction", "Transaction clôturée", `${txn.data.reference} — ${property.reference} passe à l'étape clôture.`);
				}
			}
		}
		return property;
	},
	async deleteProperty(id) {
		const { data: current, error } = await db().from("properties").select("reference, title").eq("id", id).maybeSingle();
		if (error) dbError("properties", error);
		if (!current) return;
		const { data: open, error: txnErr } = await db().from("transactions").select("id").eq("property_id", id).limit(1);
		if (txnErr) dbError("transactions", txnErr);
		if (open && open.length > 0) throw new Error("[supabase:properties.delete] Impossible de supprimer : des transactions sont liées à ce bien.");
		await db().from("property_media").delete().eq("property_id", id);
		const { error: delErr } = await db().from("properties").delete().eq("id", id);
		if (delErr) dbError("properties.delete", delErr);
		await insertActivity({
			kind: "note",
			subject: "Bien supprimé",
			body: `${current.reference} — ${current.title}`
		});
	},
	async addMedia(propertyId, items) {
		const current = await this.getProperty(propertyId);
		if (!current) return null;
		const counts = {
			photo: 0,
			floor_plan: 0,
			video: 0
		};
		for (const m of current.media) counts[m.kind] = Math.max(counts[m.kind], m.position + 1);
		const added = items.map((item, idx) => {
			const kind = item.kind ?? "photo";
			return {
				id: crypto.randomUUID(),
				propertyId,
				kind,
				url: item.url,
				label: item.label,
				position: counts[kind] + idx,
				isCover: kind === "photo" && item.isCover === true
			};
		});
		await replaceMedia(propertyId, normalizeMedia({
			...current,
			media: [...current.media, ...added]
		}).media);
		return this.getProperty(propertyId);
	},
	async updateMedia(id, patch) {
		const { data, error } = await db().from("property_media").select("property_id").eq("id", id).maybeSingle();
		if (error) dbError("property_media", error);
		if (!data) return null;
		const property = await this.getProperty(data.property_id);
		if (!property) return null;
		const media = property.media.map((m) => m.id === id ? {
			...m,
			label: patch.label ?? m.label,
			isCover: patch.isCover ?? m.isCover
		} : m);
		const next = normalizeMedia({
			...property,
			media
		});
		await replaceMedia(property.id, next.media);
		return this.getProperty(property.id);
	},
	async moveMedia(id, direction) {
		const { data, error } = await db().from("property_media").select("property_id").eq("id", id).maybeSingle();
		if (error) dbError("property_media", error);
		if (!data) return null;
		const property = await this.getProperty(data.property_id);
		if (!property) return null;
		const media = [...property.media];
		const index = media.findIndex((m) => m.id === id);
		const swapWith = index + direction;
		if (index < 0 || swapWith < 0 || swapWith >= media.length) return property;
		const a = media[index];
		const b = media[swapWith];
		if (a.kind !== b.kind) return property;
		media[index] = {
			...b,
			position: a.position
		};
		media[swapWith] = {
			...a,
			position: b.position
		};
		const next = normalizeMedia({
			...property,
			media
		});
		await replaceMedia(property.id, next.media);
		return this.getProperty(property.id);
	},
	async removeMedia(id) {
		const { data, error } = await db().from("property_media").select("property_id").eq("id", id).maybeSingle();
		if (error) dbError("property_media", error);
		if (!data) return null;
		const property = await this.getProperty(data.property_id);
		if (!property) return null;
		const next = normalizeMedia({
			...property,
			media: property.media.filter((m) => m.id !== id)
		});
		await replaceMedia(property.id, next.media);
		return this.getProperty(property.id);
	},
	async listClients(q = {}) {
		const { data, error } = await db().from("clients").select("*");
		if (error) dbError("clients", error);
		const agents = await agentMap();
		const fallback = await defaultAgentId();
		let list = (data ?? []).map((r) => mapClient(r, agents, fallback));
		if (q.search) {
			const term = norm(q.search);
			list = list.filter((c) => [
				c.firstName,
				c.lastName,
				c.email,
				c.phone
			].some((f) => norm(f).includes(term)));
		}
		if (q.roles?.length) list = list.filter((c) => c.roles.some((r) => q.roles.includes(r)));
		if (q.temperature?.length) list = list.filter((c) => q.temperature.includes(c.temperature));
		if (q.agentId) list = list.filter((c) => c.agentId === q.agentId);
		return list.sort((a, b) => b.score - a.score);
	},
	async getClient(id) {
		const { data, error } = await db().from("clients").select("*").eq("id", id).maybeSingle();
		if (error) dbError("clients", error);
		if (!data) return null;
		return mapClient(data, await agentMap(), await defaultAgentId());
	},
	async createClient(input) {
		const createdAt = now();
		const agentUuid = await slugToUuid(input.agentId ?? await defaultAgentId());
		const { data, error } = await db().from("clients").insert({
			id: crypto.randomUUID(),
			first_name: input.firstName,
			last_name: input.lastName,
			email: input.email,
			phone: input.phone ?? "",
			roles: input.roles ?? ["buyer"],
			temperature: input.temperature ?? "cold",
			score: input.score ?? 20,
			source: input.source ?? "site_web",
			city: input.city ?? null,
			budget_min: input.budgetMin ?? null,
			budget_max: input.budgetMax ?? null,
			notes: input.notes ?? null,
			agent_id: agentUuid,
			created_at: createdAt,
			last_contacted_at: createdAt
		}).select().single();
		if (error) dbError("clients.insert", error);
		const client = mapClient(data, await agentMap(), await defaultAgentId());
		await insertActivity({
			kind: "note",
			subject: "Client créé",
			body: `${client.firstName} ${client.lastName} — ${client.email}`,
			clientId: client.id
		});
		return client;
	},
	async updateClient(id, patch) {
		const { data: current, error } = await db().from("clients").select("*").eq("id", id).maybeSingle();
		if (error) dbError("clients", error);
		if (!current) return null;
		const upd = {};
		if (patch.firstName !== void 0) upd.first_name = patch.firstName;
		if (patch.lastName !== void 0) upd.last_name = patch.lastName;
		if (patch.email !== void 0) upd.email = patch.email;
		if (patch.phone !== void 0) upd.phone = patch.phone;
		if (patch.roles !== void 0) upd.roles = patch.roles;
		if (patch.temperature !== void 0) upd.temperature = patch.temperature;
		if (patch.score !== void 0) upd.score = patch.score;
		if (patch.source !== void 0) upd.source = patch.source;
		if (patch.city !== void 0) upd.city = patch.city ?? null;
		if (patch.budgetMin !== void 0) upd.budget_min = patch.budgetMin ?? null;
		if (patch.budgetMax !== void 0) upd.budget_max = patch.budgetMax ?? null;
		if (patch.notes !== void 0) upd.notes = patch.notes ?? null;
		if (patch.agentId !== void 0) {
			const agentUuid = await slugToUuid(patch.agentId);
			if (agentUuid) upd.agent_id = agentUuid;
		}
		if (Object.keys(upd).length === 0) return mapClient(current, await agentMap(), await defaultAgentId());
		const { data, error: updErr } = await db().from("clients").update(asPartial(upd)).eq("id", id).select().single();
		if (updErr) dbError("clients.update", updErr);
		const client = mapClient(data, await agentMap(), await defaultAgentId());
		await insertActivity({
			kind: "note",
			subject: "Fiche client mise à jour",
			body: `${client.firstName} ${client.lastName}`,
			clientId: id
		});
		return client;
	},
	async deleteClient(id) {
		const { data: current, error } = await db().from("clients").select("first_name, last_name, email").eq("id", id).maybeSingle();
		if (error) dbError("clients", error);
		if (!current) return;
		const { error: delErr } = await db().from("clients").delete().eq("id", id);
		if (delErr) dbError("clients.delete", delErr);
		await insertActivity({
			kind: "note",
			subject: "Client supprimé",
			body: `${current.first_name} ${current.last_name} — ${current.email}`
		});
	},
	async listLeads() {
		const { data, error } = await db().from("leads").select("*");
		if (error) dbError("leads", error);
		const agents = await agentMap();
		const fallback = await defaultAgentId();
		return (data ?? []).map((r) => mapLead(r, agents, fallback));
	},
	async getLead(id) {
		const { data, error } = await db().from("leads").select("*").eq("id", id).maybeSingle();
		if (error) dbError("leads", error);
		if (!data) return null;
		return mapLead(data, await agentMap(), await defaultAgentId());
	},
	async createLead(input) {
		const createdAt = now();
		const agentUuid = await slugToUuid(input.agentId ?? await defaultAgentId());
		const { data, error } = await db().from("leads").insert({
			id: crypto.randomUUID(),
			client_id: input.clientId,
			property_id: input.propertyId ?? null,
			stage: input.stage ?? "new",
			temperature: input.temperature ?? "cold",
			score: input.score ?? 30,
			source: input.source ?? "site_web",
			value: input.value ?? 0,
			agent_id: agentUuid,
			created_at: createdAt,
			updated_at: createdAt,
			next_action: input.nextAction ?? null,
			next_action_at: input.nextActionAt ?? null
		}).select().single();
		if (error) dbError("leads.insert", error);
		const lead = mapLead(data, await agentMap(), await defaultAgentId());
		const client = await this.getClient(lead.clientId);
		await insertActivity({
			kind: "note",
			subject: "Lead créé",
			body: `${client?.firstName ?? "Client"} ${client?.lastName ?? ""} — ${lead.stage}`,
			clientId: lead.clientId,
			propertyId: lead.propertyId,
			leadId: lead.id
		});
		if (lead.stage === "new" && (await getAutomationRule("leadFirstContact")).enabled) {
			await insertTask({
				title: "Premier contact sous 24 h",
				status: "todo",
				priority: "high",
				dueAt: new Date(Date.now() + 24 * 36e5).toISOString(),
				assigneeId: lead.agentId,
				entity: {
					kind: "lead",
					id: lead.id
				}
			});
			await insertNotification({
				kind: "lead",
				title: "Nouveau lead",
				body: `${client?.firstName ?? ""} ${client?.lastName ?? ""} — à contacter sous 24 h.`,
				href: "/admin/crm"
			});
			await recordAutomationRun("leadFirstContact", "Premier contact planifié", `${client?.firstName ?? ""} ${client?.lastName ?? ""} — tâche créée pour ${lead.agentId}.`);
		}
		return lead;
	},
	async createPublicLead(input) {
		const email = input.email.trim().toLowerCase();
		let client = await this.findClientByEmail(email);
		if (!client) client = await this.createClient({
			firstName: input.firstName,
			lastName: input.lastName,
			email,
			phone: input.phone ?? "",
			roles: ["buyer"],
			source: "site_web",
			city: void 0,
			agentId: input.agentId
		});
		else if (input.phone && !client.phone) {
			const updated = await this.updateClient(client.id, { phone: input.phone });
			if (updated) client = updated;
		}
		const property = input.propertyId ? await this.getProperty(input.propertyId) : void 0;
		const agent = input.agentId ?? client.agentId ?? await defaultAgentId();
		const lead = await this.createLead({
			clientId: client.id,
			propertyId: property?.id,
			agentId: agent,
			stage: "new",
			temperature: temperatureFor(35),
			score: 35,
			source: "site_web",
			value: property?.price ?? 0,
			nextAction: "Premier contact téléphonique",
			nextActionAt: new Date(Date.now() + 24 * 36e5).toISOString()
		});
		await insertActivity({
			kind: "note",
			subject: "Demande reçue via le site",
			body: input.message?.trim() ? input.message.trim() : `Intent : ${input.intent ?? "contact"}${property ? ` — ${property.reference}` : ""}`,
			clientId: client.id,
			propertyId: property?.id,
			leadId: lead.id
		});
		return lead;
	},
	async updateLead(id, patch) {
		const { data: current, error } = await db().from("leads").select("*").eq("id", id).maybeSingle();
		if (error) dbError("leads", error);
		if (!current) return null;
		const upd = {};
		if (patch.propertyId !== void 0) upd.property_id = patch.propertyId ?? null;
		if (patch.temperature !== void 0) upd.temperature = patch.temperature;
		if (patch.score !== void 0) upd.score = patch.score;
		if (patch.source !== void 0) upd.source = patch.source;
		if (patch.value !== void 0) upd.value = patch.value;
		if (patch.agentId !== void 0) {
			const agentUuid = await slugToUuid(patch.agentId);
			if (agentUuid) upd.agent_id = agentUuid;
		}
		if (patch.nextAction !== void 0) upd.next_action = patch.nextAction ?? null;
		if (patch.nextActionAt !== void 0) upd.next_action_at = patch.nextActionAt ?? null;
		if (Object.keys(upd).length === 0) return mapLead(current, await agentMap(), await defaultAgentId());
		const { data, error: updErr } = await db().from("leads").update({
			...asPartial(upd),
			updated_at: now()
		}).eq("id", id).select().single();
		if (updErr) dbError("leads.update", updErr);
		const lead = mapLead(data, await agentMap(), await defaultAgentId());
		const client = await this.getClient(lead.clientId);
		await insertActivity({
			kind: "note",
			subject: "Lead mis à jour",
			body: `${client?.firstName ?? ""} ${client?.lastName ?? ""} — score ${lead.score}, ${lead.temperature}`,
			clientId: lead.clientId,
			propertyId: lead.propertyId,
			leadId: id
		});
		return lead;
	},
	async moveLead(id, stage) {
		const { data, error } = await db().from("leads").update({
			stage,
			updated_at: now()
		}).eq("id", id).select().maybeSingle();
		if (error) dbError("leads.update", error);
		if (!data) return null;
		const lead = mapLead(data, await agentMap(), await defaultAgentId());
		const client = await this.getClient(lead.clientId);
		await insertActivity({
			kind: "stage_change",
			subject: `Étape → ${stage}`,
			body: `${client?.firstName ?? ""} ${client?.lastName ?? ""}`,
			clientId: lead.clientId,
			propertyId: lead.propertyId,
			leadId: id
		});
		if (stage === "won") await insertNotification({
			kind: "lead",
			title: "Lead gagné",
			body: `${client?.firstName ?? ""} ${client?.lastName ?? ""} — ouvrir une transaction.`,
			href: "/admin/transactions"
		});
		return lead;
	},
	async deleteLead(id) {
		const { data: current, error } = await db().from("leads").select("id, client_id, property_id").eq("id", id).maybeSingle();
		if (error) dbError("leads", error);
		if (!current) return;
		const { error: delErr } = await db().from("leads").delete().eq("id", id);
		if (delErr) dbError("leads.delete", delErr);
		const client = await this.getClient(current.client_id);
		await insertActivity({
			kind: "note",
			subject: "Lead supprimé",
			body: `${client?.firstName ?? ""} ${client?.lastName ?? ""}`,
			clientId: current.client_id,
			propertyId: current.property_id ?? void 0
		});
	},
	async listActivities(filter = {}) {
		let query = db().from("activities").select("*");
		if (filter.clientId) query = query.eq("client_id", filter.clientId);
		if (filter.leadId) query = query.eq("lead_id", filter.leadId);
		if (filter.propertyId) query = query.eq("property_id", filter.propertyId);
		const { data, error } = await query.order("created_at", { ascending: false });
		if (error) dbError("activities", error);
		const agents = await agentMap();
		return (data ?? []).map((r) => mapActivity(r, agents));
	},
	async addActivity(input) {
		return insertActivity(input);
	},
	async listAppointments(range) {
		let query = db().from("appointments").select("*");
		if (range) query = query.gte("starts_at", range.from).lte("starts_at", range.to);
		const { data, error } = await query.order("starts_at", { ascending: true });
		if (error) dbError("appointments", error);
		return (data ?? []).map(mapAppointment);
	},
	async createAppointment(input) {
		const agentUuid = await slugToUuid(input.agentId ?? await defaultAgentId());
		const { data, error } = await db().from("appointments").insert({
			id: crypto.randomUUID(),
			kind: input.kind,
			status: input.status ?? "scheduled",
			title: input.title,
			starts_at: input.startsAt,
			ends_at: input.endsAt,
			property_id: input.propertyId ?? null,
			client_id: input.clientId ?? null,
			agent_id: agentUuid,
			location: input.location ?? null
		}).select().single();
		if (error) dbError("appointments.insert", error);
		const appointment = mapAppointment(data);
		const client = input.clientId ? await this.getClient(input.clientId) : void 0;
		await insertActivity({
			kind: "viewing",
			subject: `Rendez-vous planifié — ${appointment.kind}`,
			body: `${appointment.title} à ${new Date(appointment.startsAt).toLocaleTimeString("fr-FR", {
				hour: "2-digit",
				minute: "2-digit"
			})}`,
			clientId: appointment.clientId,
			propertyId: appointment.propertyId
		});
		await insertNotification({
			kind: "appointment",
			title: "Rendez-vous planifié",
			body: `${client?.firstName ?? ""} ${client?.lastName ?? ""} — ${appointment.title}`,
			href: "/admin/agenda"
		});
		if (appointment.kind === "viewing" && (await getAutomationRule("visitConfirmTask")).enabled) {
			await insertTask({
				title: "Confirmer la visite",
				status: "todo",
				priority: "high",
				dueAt: (/* @__PURE__ */ new Date(new Date(appointment.startsAt).getTime() - 24 * 36e5)).toISOString(),
				assigneeId: appointment.agentId,
				entity: {
					kind: "appointment",
					id: appointment.id
				}
			});
			await recordAutomationRun("visitConfirmTask", "Visite à confirmer", `${appointment.title} — ${new Date(appointment.startsAt).toLocaleDateString("fr-FR")} ${new Date(appointment.startsAt).toLocaleTimeString("fr-FR", {
				hour: "2-digit",
				minute: "2-digit"
			})}.`);
		}
		return appointment;
	},
	async updateAppointment(id, patch) {
		const { data: current, error } = await db().from("appointments").select("*").eq("id", id).maybeSingle();
		if (error) dbError("appointments", error);
		if (!current) return null;
		const upd = {};
		if (patch.kind !== void 0) upd.kind = patch.kind;
		if (patch.title !== void 0) upd.title = patch.title;
		if (patch.startsAt !== void 0) upd.starts_at = patch.startsAt;
		if (patch.endsAt !== void 0) upd.ends_at = patch.endsAt;
		if (patch.propertyId !== void 0) upd.property_id = patch.propertyId ?? null;
		if (patch.clientId !== void 0) upd.client_id = patch.clientId ?? null;
		if (patch.agentId !== void 0) {
			const agentUuid = await slugToUuid(patch.agentId);
			if (agentUuid) upd.agent_id = agentUuid;
		}
		if (patch.location !== void 0) upd.location = patch.location ?? null;
		if (patch.status !== void 0) upd.status = patch.status;
		if (Object.keys(upd).length === 0) return mapAppointment(current);
		const { data, error: updErr } = await db().from("appointments").update(asPartial(upd)).eq("id", id).select().single();
		if (updErr) dbError("appointments.update", updErr);
		return mapAppointment(data);
	},
	async setAppointmentStatus(id, status) {
		const { data, error } = await db().from("appointments").update({ status }).eq("id", id).select().maybeSingle();
		if (error) dbError("appointments.update", error);
		if (!data) return null;
		const appointment = mapAppointment(data);
		await insertActivity({
			kind: "viewing",
			subject: `Rendez-vous → ${status}`,
			body: appointment.title,
			clientId: appointment.clientId,
			propertyId: appointment.propertyId
		});
		if (status === "done" && (await getAutomationRule("visitConfirmTask")).enabled) {
			await insertTask({
				title: "Débrief de la visite",
				status: "todo",
				priority: "normal",
				dueAt: new Date(Date.now() + 24 * 36e5).toISOString(),
				assigneeId: appointment.agentId,
				entity: {
					kind: "appointment",
					id: appointment.id
				}
			});
			await recordAutomationRun("visitConfirmTask", "Débrief demandé", `${appointment.title} — terminé, compte-rendu à rédiger.`);
		}
		return appointment;
	},
	async saveViewingReport(id, report) {
		const { data, error } = await db().from("appointments").update({
			report_interest: report.interest,
			report_outcome: report.outcome,
			report_next_action: report.nextAction ?? null,
			status: "done"
		}).eq("id", id).select().maybeSingle();
		if (error) dbError("appointments.update", error);
		if (!data) return null;
		const appointment = mapAppointment(data);
		await insertActivity({
			kind: "viewing",
			subject: "Compte-rendu de visite",
			body: `Intérêt ${report.interest}/5 — ${report.outcome}`,
			clientId: appointment.clientId,
			propertyId: appointment.propertyId
		});
		return appointment;
	},
	async listDocuments() {
		const { data, error } = await db().from("documents").select("*").order("created_at", { ascending: false });
		if (error) dbError("documents", error);
		return (data ?? []).map(mapDocument);
	},
	async createDocument(input) {
		const uploadedBy = await slugToUuid(input.uploadedById ?? await defaultAgentId());
		const { data, error } = await db().from("documents").insert({
			id: crypto.randomUUID(),
			name: input.name,
			category: input.category,
			mime_type: input.mimeType,
			size_bytes: input.sizeBytes,
			version: 1,
			storage_path: input.url,
			property_id: input.propertyId ?? null,
			client_id: input.clientId ?? null,
			transaction_id: input.transactionId ?? null,
			uploaded_by: uploadedBy,
			created_at: now()
		}).select().single();
		if (error) dbError("documents.insert", error);
		const doc = mapDocument(data);
		await insertActivity({
			kind: "document",
			subject: "Document ajouté",
			body: doc.name,
			clientId: doc.clientId,
			propertyId: doc.propertyId
		});
		return doc;
	},
	async deleteDocument(id) {
		const { error } = await db().from("documents").delete().eq("id", id);
		if (error) dbError("documents.delete", error);
	},
	async listTasks() {
		const { data, error } = await db().from("tasks").select("*");
		if (error) dbError("tasks", error);
		const agents = await agentMap();
		return (data ?? []).map((r) => mapTask(r, agents)).sort((a, b) => {
			if (a.status === "done" && b.status !== "done") return 1;
			if (b.status === "done" && a.status !== "done") return -1;
			return (a.dueAt ?? "9999").localeCompare(b.dueAt ?? "9999");
		});
	},
	async createTask(input) {
		const task = await insertTask(input);
		await insertActivity({
			kind: "note",
			subject: "Tâche créée",
			body: task.title
		});
		return task;
	},
	async updateTask(id, patch) {
		const { data: current, error } = await db().from("tasks").select("*").eq("id", id).maybeSingle();
		if (error) dbError("tasks", error);
		if (!current) return null;
		const upd = {};
		if (patch.title !== void 0) upd.title = patch.title;
		if (patch.status !== void 0) upd.status = patch.status;
		if (patch.priority !== void 0) upd.priority = patch.priority;
		if (patch.dueAt !== void 0) upd.due_at = patch.dueAt ?? null;
		if (patch.assigneeId !== void 0) {
			const agentUuid = await slugToUuid(patch.assigneeId);
			if (agentUuid) upd.assignee_id = agentUuid;
		}
		if (Object.keys(upd).length === 0) return mapTask(current, await agentMap());
		const { data, error: updErr } = await db().from("tasks").update(asPartial(upd)).eq("id", id).select().single();
		if (updErr) dbError("tasks.update", updErr);
		return mapTask(data, await agentMap());
	},
	async listTransactions() {
		const { data, error } = await db().from("transactions").select("*").order("opened_at", { ascending: false });
		if (error) dbError("transactions", error);
		const rows = data ?? [];
		let paymentRows = [];
		if (rows.length > 0) {
			const p = await db().from("payments").select("*").in("transaction_id", rows.map((r) => r.id));
			if (p.error) dbError("payments", p.error);
			paymentRows = p.data ?? [];
		}
		const paymentsByTxn = /* @__PURE__ */ new Map();
		for (const pr of paymentRows) {
			const list = paymentsByTxn.get(pr.transaction_id) ?? [];
			list.push(mapPayment(pr));
			paymentsByTxn.set(pr.transaction_id, list);
		}
		const agents = await agentMap();
		return rows.map((r) => mapTransaction(r, paymentsByTxn.get(r.id) ?? [], agents));
	},
	async createTransaction(input) {
		const year = (/* @__PURE__ */ new Date()).getFullYear();
		const count = await countRows("transactions");
		const reference = `TX-${year}-${String(count + 1).padStart(3, "0")}`;
		const openedAt = now();
		const agentUuid = await slugToUuid(input.agentId ?? await defaultAgentId());
		const commission = input.commission ?? Math.round(input.amount * .025);
		const row = {
			id: crypto.randomUUID(),
			reference,
			stage: input.stage ?? "interest",
			property_id: input.propertyId,
			buyer_client_id: input.buyerClientId,
			seller_client_id: input.sellerClientId ?? null,
			agent_id: agentUuid,
			amount: input.amount,
			commission,
			opened_at: openedAt,
			closed_at: null
		};
		const { data, error } = await db().from("transactions").insert(row).select().single();
		if (error) dbError("transactions.insert", error);
		const txn = mapTransaction(data, [], await agentMap());
		const property = await this.getProperty(txn.propertyId);
		await insertActivity({
			kind: "offer",
			subject: "Transaction ouverte",
			body: `${txn.reference} — ${property?.reference ?? ""}`,
			clientId: txn.buyerClientId,
			propertyId: txn.propertyId
		});
		await insertNotification({
			kind: "transaction",
			title: "Transaction ouverte",
			body: `${txn.reference} — ${property?.title ?? ""}`,
			href: "/admin/transactions"
		});
		return txn;
	},
	async moveTransactionStage(id, stage) {
		const { data: current, error } = await db().from("transactions").select("*").eq("id", id).maybeSingle();
		if (error) dbError("transactions", error);
		if (!current) return null;
		const { data, error: updErr } = await db().from("transactions").update({
			stage,
			closed_at: stage === "closing" ? current.closed_at ?? now() : current.closed_at
		}).eq("id", id).select().single();
		if (updErr) dbError("transactions.update", updErr);
		const txn = mapTransaction(data, [], await agentMap());
		await insertActivity({
			kind: "offer",
			subject: `Transaction → ${stage}`,
			body: txn.reference,
			clientId: txn.buyerClientId,
			propertyId: txn.propertyId
		});
		if (stage === "closing") await insertNotification({
			kind: "transaction",
			title: "Transaction clôturée",
			body: `${txn.reference} — bravo, dossier bouclé.`,
			href: "/admin/transactions"
		});
		return txn;
	},
	async addPayment(transactionId, input) {
		const { data: current, error } = await db().from("transactions").select("*").eq("id", transactionId).maybeSingle();
		if (error) dbError("transactions", error);
		if (!current) return null;
		const { data: payment, error: payErr } = await db().from("payments").insert({
			id: crypto.randomUUID(),
			transaction_id: transactionId,
			label: input.label,
			amount: input.amount,
			due_at: input.dueAt
		}).select().single();
		if (payErr) dbError("payments.insert", payErr);
		await insertActivity({
			kind: "note",
			subject: "Paiement planifié",
			body: `${payment.label} — ${payment.amount} MAD`,
			clientId: current.buyer_client_id ?? void 0,
			propertyId: current.property_id
		});
		return this.getTransaction(transactionId);
	},
	async markPaymentPaid(transactionId, paymentId) {
		const { data: current, error } = await db().from("transactions").select("*").eq("id", transactionId).maybeSingle();
		if (error) dbError("transactions", error);
		if (!current) return null;
		const { data: payment, error: payErr } = await db().from("payments").update({ paid_at: now() }).eq("id", paymentId).select().maybeSingle();
		if (payErr) dbError("payments.update", payErr);
		if (!payment) return null;
		await insertActivity({
			kind: "note",
			subject: "Paiement encaissé",
			body: `${payment.label} — ${payment.amount} MAD`,
			clientId: current.buyer_client_id ?? void 0,
			propertyId: current.property_id
		});
		return this.getTransaction(transactionId);
	},
	async deleteTransaction(id) {
		const { data: current, error } = await db().from("transactions").select("reference, property_id, buyer_client_id").eq("id", id).maybeSingle();
		if (error) dbError("transactions", error);
		if (!current) return;
		const { error: delErr } = await db().from("transactions").delete().eq("id", id);
		if (delErr) dbError("transactions.delete", delErr);
		await insertActivity({
			kind: "note",
			subject: "Transaction supprimée",
			body: `${current.reference}`,
			clientId: current.buyer_client_id ?? void 0,
			propertyId: current.property_id
		});
	},
	async listAgents() {
		const rows = await loadProfiles();
		rows.sort((a, b) => a.created_at.localeCompare(b.created_at));
		return rows.map(mapAgent);
	},
	async listNotifications() {
		const { data, error } = await db().from("notifications").select("*").is("recipient_id", null).order("created_at", { ascending: false });
		if (error) dbError("notifications", error);
		return (data ?? []).map(mapNotification);
	},
	async createNotification(input) {
		return insertNotification(input);
	},
	async markNotificationRead(id) {
		const { error } = await db().from("notifications").update({ read: true }).eq("id", id).is("recipient_id", null);
		if (error) dbError("notifications.update", error);
	},
	async markAllNotificationsRead() {
		const { error } = await db().from("notifications").update({ read: true }).is("recipient_id", null);
		if (error) dbError("notifications.update", error);
	},
	async getDashboard() {
		const since30 = (/* @__PURE__ */ new Date(Date.now() - 30 * 864e5)).toISOString();
		const [activeRes, leadsRes, txnsRes, viewingsRes] = await Promise.all([
			db().from("properties").select("id").in("status", ACTIVE_PROPERTY_STATUSES),
			db().from("leads").select("id, stage, value, source, created_at"),
			db().from("transactions").select("commission, closed_at"),
			db().from("appointments").select("id").eq("kind", "viewing").gte("starts_at", since30)
		]);
		if (activeRes.error) dbError("properties", activeRes.error);
		if (leadsRes.error) dbError("leads", leadsRes.error);
		if (txnsRes.error) dbError("transactions", txnsRes.error);
		if (viewingsRes.error) dbError("appointments", viewingsRes.error);
		const allLeads = leadsRes.data ?? [];
		const openLeads = allLeads.filter((l) => l.stage !== "won" && l.stage !== "lost");
		const won = allLeads.filter((l) => l.stage === "won");
		const pipelineValue = openLeads.reduce((sum, l) => sum + l.value, 0);
		const revenueYtd = (txnsRes.data ?? []).filter((t) => t.closed_at).reduce((sum, t) => sum + t.commission, 0);
		return {
			kpis: {
				activelistings: activeRes.data?.length ?? 0,
				newLeads30d: allLeads.filter((l) => l.created_at >= since30).length,
				viewings30d: viewingsRes.data?.length ?? 0,
				pipelineValue,
				revenueYtd,
				conversionRate: allLeads.length ? Math.round(won.length / allLeads.length * 100) : 0,
				deltas: {
					activelistings: 8,
					newLeads30d: 23,
					viewings30d: -6,
					pipelineValue: 14,
					revenueYtd: 31,
					conversionRate: 4
				}
			},
			leadsSeries: MONTHS.map((month, i) => ({
				month,
				leads: 18 + i * 4 + (i % 2 ? 6 : 0),
				viewings: 9 + i * 3
			})),
			viewsSeries: MONTHS.map((month, i) => ({
				month,
				views: 2400 + i * 620 + i % 3 * 300
			})),
			pipelineByStage: [
				"new",
				"contacted",
				"qualified",
				"viewing",
				"offer",
				"negotiation"
			].map((stage) => ({
				label: stage,
				value: allLeads.filter((l) => l.stage === stage).length
			})),
			revenueSeries: MONTHS.map((month, i) => ({
				month,
				revenue: 12e4 + i * 48e3 + (i % 2 ? 3e4 : 0)
			})),
			sourceBreakdown: LEAD_SOURCES.map((s) => ({
				label: s,
				value: allLeads.filter((l) => l.source === s).length
			}))
		};
	},
	async getPriorities(agentId) {
		const nowIso = now();
		const todayEnd = new Date(Date.now() + 864e5).toISOString();
		const agentUuids = /* @__PURE__ */ new Set();
		if (agentId) {
			const uuid = await slugToUuid(agentId);
			if (uuid) agentUuids.add(uuid);
		}
		const mine = (row) => !agentId || row.agent_id !== null && row.agent_id !== void 0 && agentUuids.has(row.agent_id) || row.assignee_id !== null && row.assignee_id !== void 0 && agentUuids.has(row.assignee_id);
		const [tasksRes, apptsRes, leadsRes] = await Promise.all([
			db().from("tasks").select("*").neq("status", "done"),
			db().from("appointments").select("*").gte("starts_at", nowIso).lte("starts_at", todayEnd),
			db().from("leads").select("*").in("stage", ["new", "contacted"])
		]);
		if (tasksRes.error) dbError("tasks", tasksRes.error);
		if (apptsRes.error) dbError("appointments", apptsRes.error);
		if (leadsRes.error) dbError("leads", leadsRes.error);
		await agentMap();
		const overdueTasks = (tasksRes.data ?? []).filter((t) => mine(t) && t.due_at !== null && t.due_at < nowIso).slice(0, 3).map((t) => ({
			id: t.id,
			kind: "task",
			title: t.title,
			detail: "Échéance dépassée",
			urgency: "overdue",
			href: "/admin/taches"
		}));
		const todayAppointments = (apptsRes.data ?? []).filter((a) => mine(a)).slice(0, 3).map((a) => ({
			id: a.id,
			kind: "appointment",
			title: a.title,
			detail: new Date(a.starts_at).toLocaleTimeString("fr-FR", {
				hour: "2-digit",
				minute: "2-digit"
			}),
			urgency: "today",
			href: "/admin/agenda"
		}));
		const staleLeads = (leadsRes.data ?? []).filter((l) => mine(l)).slice(0, 2).map((l) => ({
			id: l.id,
			kind: "lead",
			title: l.next_action ?? "Relancer le lead",
			detail: "Sans contact depuis 3 jours",
			urgency: "soon",
			href: "/admin/crm"
		}));
		return [
			...overdueTasks,
			...todayAppointments,
			...staleLeads
		];
	},
	async listCampaigns() {
		const { data, error } = await db().from("marketing_campaigns").select("*").order("created_at", { ascending: false });
		if (error) dbError("marketing_campaigns", error);
		return (data ?? []).map(mapCampaign);
	},
	async createCampaign(input) {
		const { data, error } = await db().from("marketing_campaigns").insert({
			id: crypto.randomUUID(),
			name: input.name,
			subject: input.subject,
			channel: input.channel,
			status: "draft",
			audience: input.audience,
			audience_count: input.audienceCount,
			opens: 0,
			clicks: 0,
			conversions: 0,
			created_at: now()
		}).select().single();
		if (error) dbError("marketing_campaigns.insert", error);
		const campaign = mapCampaign(data);
		await insertActivity({
			kind: "email",
			subject: "Campagne créée",
			body: `${campaign.name} — brouillon.`
		});
		return campaign;
	},
	async sendCampaign(id) {
		const { data: current, error } = await db().from("marketing_campaigns").select("*").eq("id", id).maybeSingle();
		if (error) dbError("marketing_campaigns", error);
		if (!current) return null;
		const wasSent = current.status === "sent";
		const upd = {
			status: "sent",
			sent_at: wasSent ? current.sent_at : now(),
			opens: wasSent ? current.opens : Math.round(current.audience_count * .55),
			clicks: wasSent ? current.clicks : Math.round(current.audience_count * .2),
			conversions: wasSent ? current.conversions : Math.max(1, Math.round(current.audience_count * .03))
		};
		const { data, error: updErr } = await db().from("marketing_campaigns").update(asPartial(upd)).eq("id", id).select().single();
		if (updErr) dbError("marketing_campaigns.update", updErr);
		const sent = mapCampaign(data);
		await insertActivity({
			kind: "email",
			subject: "Campagne envoyée",
			body: `${sent.name} — ${sent.audienceCount} destinataires, 3 conversions estimées.`
		});
		return sent;
	},
	async deleteCampaign(id) {
		const { error } = await db().from("marketing_campaigns").delete().eq("id", id);
		if (error) dbError("marketing_campaigns.delete", error);
	},
	async listFeatured() {
		const { data, error } = await db().from("featured_properties").select("*").order("since", { ascending: false });
		if (error) dbError("featured_properties", error);
		return (data ?? []).map(mapFeatured);
	},
	async setFeatured(propertyId, until) {
		const { error } = await db().from("featured_properties").upsert({
			property_id: propertyId,
			until
		}, { onConflict: "property_id" });
		if (error) dbError("featured_properties.upsert", error);
		return this.listFeatured();
	},
	async removeFeatured(propertyId) {
		const { error } = await db().from("featured_properties").delete().eq("property_id", propertyId);
		if (error) dbError("featured_properties.delete", error);
		return this.listFeatured();
	},
	async getMarketingStats() {
		const [campaigns, featured, leadsRes] = await Promise.all([
			this.listCampaigns(),
			this.listFeatured(),
			db().from("leads").select("source, stage")
		]);
		if (leadsRes.error) dbError("leads", leadsRes.error);
		const allLeads = leadsRes.data ?? [];
		return {
			campaigns,
			featured,
			sources: LEAD_SOURCES.map((source) => {
				const l = allLeads.filter((x) => x.source === source);
				const conversions = l.filter((x) => x.stage === "won").length;
				return {
					source,
					leads: l.length,
					conversions,
					rate: l.length ? Math.round(conversions / l.length * 100) : 0
				};
			}),
			totals: {
				sent: campaigns.filter((c) => c.status === "sent").length,
				opens: campaigns.reduce((s, c) => s + c.opens, 0),
				clicks: campaigns.reduce((s, c) => s + c.clicks, 0),
				conversions: campaigns.reduce((s, c) => s + c.conversions, 0),
				featuredCount: featured.length
			}
		};
	},
	async matchForClient(clientId) {
		const client = await this.getClient(clientId);
		if (!client) return [];
		return (await this.listProperties()).map((p) => propertyScore(p, client)).filter((m) => m !== null && m.score >= 25).sort((a, b) => b.score - a.score).slice(0, 12);
	},
	async matchForProperty(propertyId) {
		const property = await this.getProperty(propertyId);
		if (!property || !ACTIVE_PROPERTY_STATUSES.includes(property.status)) return [];
		return (await this.listClients()).map((c) => clientScore(c, property)).filter((m) => m !== null && m.score >= 25).sort((a, b) => b.score - a.score).slice(0, 12);
	},
	async sendMatchesToClient(clientId, propertyIds) {
		const client = await this.getClient(clientId);
		if (!client || propertyIds.length === 0) return 0;
		const { data: properties, error } = await db().from("properties").select("reference, title").in("id", propertyIds);
		if (error) dbError("properties", error);
		const refs = (properties ?? []).map((p) => `${p.reference} — ${p.title}`);
		await insertActivity({
			kind: "email",
			subject: "Suggestions de biens envoyées",
			body: `${refs.length} bien(s) : ${refs.join(" · ")}`,
			clientId
		});
		await insertNotification({
			kind: "lead",
			title: "Suggestions envoyées",
			body: `${client.firstName} ${client.lastName} — ${refs.length} biens transmis par e-mail.`,
			href: "/admin/matching"
		});
		const sentBy = await slugToUuid(await defaultAgentId());
		const { error: sendErr } = await db().from("match_sends").insert({
			id: crypto.randomUUID(),
			client_id: clientId,
			property_ids: propertyIds,
			sent_by: sentBy,
			sent_at: now()
		});
		if (sendErr) dbError("match_sends.insert", sendErr);
		return refs.length;
	},
	async getAutomations() {
		const keys = Object.keys(AUTOMATION_META);
		const { data: rules, error } = await db().from("automation_rules").select("*");
		if (error) dbError("automation_rules", error);
		const byKey = new Map((rules ?? []).map((r) => [r.key, r]));
		const missing = keys.filter((k) => !byKey.has(k));
		if (missing.length > 0) {
			const { error: insErr } = await db().from("automation_rules").insert(missing.map((k) => ({
				key: k,
				enabled: true,
				runs: 0
			})));
			if (insErr) dbError("automation_rules.insert", insErr);
			for (const k of missing) byKey.set(k, {
				key: k,
				enabled: true,
				runs: 0,
				last_run: null
			});
		}
		const { data: runs, error: runsErr } = await db().from("automation_runs").select("*").order("at", { ascending: false });
		if (runsErr) dbError("automation_runs", runsErr);
		return {
			rules: keys.map((k) => {
				const r = byKey.get(k);
				return {
					key: k,
					title: AUTOMATION_META[k].title,
					description: AUTOMATION_META[k].description,
					enabled: r.enabled,
					runs: r.runs ?? 0,
					lastRun: r.last_run ?? void 0
				};
			}),
			runs: (runs ?? []).map(mapAutomationRun)
		};
	},
	async setAutomation(key, enabled) {
		const { error } = await db().from("automation_rules").upsert({
			key,
			enabled
		}, { onConflict: "key" });
		if (error) dbError("automation_rules.upsert", error);
		return (await this.getAutomations()).rules;
	},
	async listInactiveLeads() {
		const cutoff = Date.now() - 3 * 864e5;
		const { data: leads, error } = await db().from("leads").select("*").not("stage", "in", "('won','lost')");
		if (error) dbError("leads", error);
		const rows = leads ?? [];
		const clientIds = rows.map((r) => r.client_id);
		let clientRows = [];
		if (clientIds.length > 0) {
			const c = await db().from("clients").select("*").in("id", clientIds);
			if (c.error) dbError("clients", c.error);
			clientRows = c.data ?? [];
		}
		let activityRows = [];
		if (rows.length > 0) {
			const a = await db().from("activities").select("lead_id, created_at").in("lead_id", rows.map((r) => r.id));
			if (a.error) dbError("activities", a.error);
			activityRows = a.data ?? [];
		}
		const lastTouchByLead = /* @__PURE__ */ new Map();
		for (const act of activityRows) {
			const t = new Date(act.created_at).getTime();
			const prev = lastTouchByLead.get(act.lead_id) ?? 0;
			lastTouchByLead.set(act.lead_id, Math.max(prev, t));
		}
		const clientsById = new Map(clientRows.map((r) => [r.id, r]));
		const agents = await agentMap();
		const fallback = await defaultAgentId();
		const out = [];
		for (const row of rows) {
			const clientRow = clientsById.get(row.client_id);
			if (!clientRow) continue;
			const lastTouch = Math.max(new Date(row.updated_at).getTime(), new Date(row.created_at).getTime(), lastTouchByLead.get(row.id) ?? 0);
			if (lastTouch >= cutoff) continue;
			out.push({
				lead: mapLead(row, agents, fallback),
				client: mapClient(clientRow, agents, fallback),
				daysInactive: Math.floor((Date.now() - lastTouch) / 864e5)
			});
		}
		return out.sort((a, b) => b.daysInactive - a.daysInactive);
	},
	async createCallbackTask(leadId) {
		const lead = await this.getLead(leadId);
		if (!lead) return null;
		const client = await this.getClient(lead.clientId);
		const task = await insertTask({
			title: "Relance — lead inactif",
			status: "todo",
			priority: "high",
			dueAt: new Date(Date.now() + 24 * 36e5).toISOString(),
			assigneeId: lead.agentId,
			entity: {
				kind: "lead",
				id: lead.id
			}
		});
		await recordAutomationRun("inactiveLeadRelance", "Relance planifiée", `${client?.firstName ?? ""} ${client?.lastName ?? ""} — rappel de l'agent sous 24 h.`);
		return task;
	},
	async getReport(key, q = {}) {
		const fromIso = q.from ? new Date(q.from).toISOString() : (/* @__PURE__ */ new Date(Date.now() - 90 * 864e5)).toISOString();
		const toIso = q.to ? new Date(q.to).toISOString() : new Date(Date.now() + 864e5).toISOString();
		const from = fromIso.slice(0, 10);
		const to = toIso.slice(0, 10);
		const inRange = (iso) => iso >= fromIso && iso <= toIso;
		const buckets = weekBuckets(fromIso, toIso);
		const [properties, leads, clients, transactions, appointments, activities, agents] = await Promise.all([
			this.listProperties(),
			this.listLeads(),
			this.listClients(),
			this.listTransactions(),
			this.listAppointments(),
			this.listActivities(),
			this.listAgents()
		]);
		if (key === "properties") {
			const list = properties.filter((p) => inRange(p.createdAt));
			const sold = properties.filter((p) => p.soldAt && inRange(p.soldAt));
			const createdSeries = buckets.map((b, i) => ({
				label: b.label,
				value: list.filter((p) => bucketOf(buckets, p.createdAt) === i).length
			}));
			return {
				key,
				title: "Rapport immobilier",
				from,
				to,
				kpis: [
					{
						label: "Biens créés",
						value: list.length
					},
					{
						label: "Biens actifs",
						value: properties.filter((p) => ACTIVE_PROPERTY_STATUSES.includes(p.status)).length
					},
					{
						label: "Vendus / loués",
						value: sold.length
					},
					{
						label: "Prix moyen (MAD)",
						value: list.length ? Math.round(list.reduce((s, p) => s + p.price, 0) / list.length) : 0
					}
				],
				series: [{
					label: "Créations de biens par semaine",
					points: createdSeries
				}],
				table: {
					columns: [
						"Référence",
						"Bien",
						"Ville",
						"Transaction",
						"Prix (MAD)",
						"Statut",
						"Vues 30 j"
					],
					rows: list.map((p) => [
						p.reference,
						p.title,
						p.city,
						p.transaction === "vente" ? "Vente" : "Location",
						String(p.price),
						p.status.replace(/_/g, " "),
						String(p.views30d)
					])
				}
			};
		}
		if (key === "crm") {
			const inRangeLeads = leads.filter((l) => inRange(l.createdAt));
			const won = inRangeLeads.filter((l) => l.stage === "won");
			const series = buckets.map((b, i) => ({
				label: b.label,
				value: inRangeLeads.filter((l) => bucketOf(buckets, l.createdAt) === i).length
			}));
			const wonSeries = buckets.map((b, i) => ({
				label: b.label,
				value: won.filter((l) => bucketOf(buckets, l.createdAt) === i).length
			}));
			return {
				key,
				title: "Rapport CRM",
				from,
				to,
				kpis: [
					{
						label: "Clients",
						value: clients.filter((c) => inRange(c.createdAt)).length
					},
					{
						label: "Leads créés",
						value: inRangeLeads.length
					},
					{
						label: "Taux de conversion",
						value: inRangeLeads.length ? Math.round(won.length / inRangeLeads.length * 100) : 0
					},
					{
						label: "Score moyen",
						value: inRangeLeads.length ? Math.round(inRangeLeads.reduce((s, l) => s + l.score, 0) / inRangeLeads.length) : 0
					}
				],
				series: [{
					label: "Leads par semaine",
					points: series
				}, {
					label: "Gagnés par semaine",
					points: wonSeries
				}],
				table: {
					columns: [
						"Client",
						"Source",
						"Score",
						"Température",
						"Étape",
						"Valeur (MAD)"
					],
					rows: inRangeLeads.slice(0, 60).map((l) => {
						const c = clients.find((x) => x.id === l.clientId);
						return [
							c ? `${c.firstName} ${c.lastName}` : l.clientId,
							l.source.replace(/_/g, " "),
							String(l.score),
							l.temperature,
							l.stage,
							String(l.value)
						];
					})
				}
			};
		}
		if (key === "agents") {
			const inRangeTxns = transactions.filter((t) => inRange(t.openedAt));
			const txnSeries = buckets.map((b, i) => ({
				label: b.label,
				value: inRangeTxns.filter((t) => bucketOf(buckets, t.openedAt) === i).length
			}));
			return {
				key,
				title: "Rapport des agents",
				from,
				to,
				kpis: [
					{
						label: "Agents",
						value: agents.length
					},
					{
						label: "Transactions",
						value: inRangeTxns.length
					},
					{
						label: "Commissions (MAD)",
						value: inRangeTxns.reduce((s, t) => s + t.commission, 0)
					},
					{
						label: "Visites",
						value: appointments.filter((a) => a.kind === "viewing" && inRange(a.startsAt)).length
					}
				],
				series: [{
					label: "Transactions ouvertes par semaine",
					points: txnSeries
				}],
				table: {
					columns: [
						"Agent",
						"Rôle",
						"Leads",
						"Visites",
						"Transactions",
						"Commission (MAD)",
						"Clôturées"
					],
					rows: agents.map((a) => {
						const aTxns = transactions.filter((t) => t.agentId === a.id);
						return [
							a.name,
							a.role,
							String(leads.filter((l) => l.agentId === a.id).length),
							String(appointments.filter((x) => x.agentId === a.id && x.kind === "viewing").length),
							String(aTxns.length),
							String(aTxns.reduce((s, t) => s + t.commission, 0)),
							String(aTxns.filter((t) => t.closedAt).length)
						];
					})
				}
			};
		}
		const inRangeActs = activities.filter((a) => inRange(a.createdAt));
		const actSeries = buckets.map((b, i) => ({
			label: b.label,
			value: inRangeActs.filter((a) => bucketOf(buckets, a.createdAt) === i).length
		}));
		const byKind = Object.entries({
			call: "Appels",
			email: "E-mails",
			whatsapp: "WhatsApp",
			viewing: "Visites",
			offer: "Offres"
		}).map(([kind, label]) => ({
			label,
			value: inRangeActs.filter((a) => a.kind === kind).length
		}));
		return {
			key,
			title: "Rapport d'activité",
			from,
			to,
			kpis: [{
				label: "Actions",
				value: inRangeActs.length
			}, ...byKind],
			series: [{
				label: "Activité par semaine",
				points: actSeries
			}],
			table: {
				columns: [
					"Date",
					"Type",
					"Sujet",
					"Agent"
				],
				rows: inRangeActs.slice(0, 60).map((a) => [
					a.createdAt.slice(0, 10),
					a.kind,
					a.subject,
					agents.find((ag) => ag.id === a.agentId)?.name ?? a.agentId
				])
			}
		};
	},
	async getTransaction(transactionId) {
		const { data, error } = await db().from("transactions").select("*").eq("id", transactionId).maybeSingle();
		if (error) dbError("transactions", error);
		if (!data) return null;
		const { data: payments, error: payErr } = await db().from("payments").select("*").eq("transaction_id", transactionId);
		if (payErr) dbError("payments", payErr);
		return mapTransaction(data, (payments ?? []).map(mapPayment), await agentMap());
	},
	async findClientByEmail(email) {
		const { data, error } = await db().from("clients").select("*").eq("email", email).maybeSingle();
		if (error) dbError("clients", error);
		if (!data) return null;
		return mapClient(data, await agentMap(), await defaultAgentId());
	}
};
function asString(v) {
	return typeof v === "string" && v.length ? v : void 0;
}
function asNumber(v) {
	return typeof v === "number" && Number.isFinite(v) ? v : void 0;
}
function asStringArray(v) {
	return Array.isArray(v) ? v.filter((x) => typeof x === "string") : void 0;
}
function asBoolean(v) {
	return typeof v === "boolean" ? v : void 0;
}
function parsePropertyQuery(raw) {
	const q = raw ?? {};
	const status = asStringArray(q["status"])?.filter((s) => PROPERTY_STATUSES.includes(s));
	const tx = q["transaction"];
	const sortRaw = q["sort"];
	return {
		search: asString(q["search"]),
		status,
		transaction: tx === "vente" || tx === "location" ? tx : void 0,
		agentId: asString(q["agentId"]),
		city: asString(q["city"]),
		minPrice: asNumber(q["minPrice"]),
		maxPrice: asNumber(q["maxPrice"]),
		sort: [
			"recent",
			"price_asc",
			"price_desc",
			"views"
		].includes(sortRaw) ? sortRaw : void 0
	};
}
function parseClientQuery(raw) {
	const q = raw ?? {};
	return {
		search: asString(q["search"]),
		roles: asStringArray(q["roles"]),
		temperature: asStringArray(q["temperature"]),
		agentId: asString(q["agentId"])
	};
}
function requireId(raw) {
	const id = asString(raw);
	if (!id) throw new Error("An id is required");
	return id;
}
var inList = (list) => (v) => typeof v === "string" && list.includes(v);
var enumOf = (list, label) => (v) => {
	if (!inList(list)(v)) throw new Error(`Unknown ${label}: ${String(v)}`);
	return v;
};
function parseObject(raw) {
	if (typeof raw !== "object" || raw === null || Array.isArray(raw)) throw new Error("Expected an object");
	return raw;
}
var fetchProperties_createServerFn_handler = createServerRpc({
	id: "9f3a99aff1063d81500f32d1f4eeb730aa8f302e979c8db754d411d4849b94fd",
	name: "fetchProperties",
	filename: "src/lib/admin/server.ts"
}, (opts) => fetchProperties.__executeServer(opts));
var fetchProperties = createServerFn({ method: "GET" }).inputValidator(parsePropertyQuery).handler(fetchProperties_createServerFn_handler, ({ data }) => repository.listProperties(data));
var fetchProperty_createServerFn_handler = createServerRpc({
	id: "05b1a83af71d29316ba7cba653b0560a4089c59ea5bd4e76c2131fa2c53f71cf",
	name: "fetchProperty",
	filename: "src/lib/admin/server.ts"
}, (opts) => fetchProperty.__executeServer(opts));
var fetchProperty = createServerFn({ method: "GET" }).inputValidator(requireId).handler(fetchProperty_createServerFn_handler, ({ data }) => repository.getProperty(data));
var setPropertyStatus_createServerFn_handler = createServerRpc({
	id: "bab716326d36fd5e008577fecf6698fc4bc8cb5568dd969c35dbde292441734a",
	name: "setPropertyStatus",
	filename: "src/lib/admin/server.ts"
}, (opts) => setPropertyStatus.__executeServer(opts));
var setPropertyStatus = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = raw ?? {};
	const status = asString(q["status"]);
	if (!status || !PROPERTY_STATUSES.includes(status)) throw new Error(`Unknown property status: ${String(q["status"])}`);
	return {
		id: requireId(q["id"]),
		status
	};
}).handler(setPropertyStatus_createServerFn_handler, ({ data }) => repository.updatePropertyStatus(data.id, data.status));
var createProperty_createServerFn_handler = createServerRpc({
	id: "9915fafd4f0e327b4641606aca46edd044591df9a17dc62c723175b0ee1b61bb",
	name: "createProperty",
	filename: "src/lib/admin/server.ts"
}, (opts) => createProperty.__executeServer(opts));
var createProperty = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	const transactionRaw = q["transaction"];
	if (transactionRaw !== "vente" && transactionRaw !== "location") throw new Error("transaction is required");
	return {
		reference: asString(q["reference"]),
		title: asString(q["title"]) ?? "",
		status: asString(q["status"]),
		transaction: transactionRaw,
		type: asString(q["type"]) ?? "",
		city: asString(q["city"]) ?? "",
		neighborhood: asString(q["neighborhood"]) ?? "",
		price: asNumber(q["price"]) ?? 0,
		surface: asNumber(q["surface"]) ?? 0,
		bedrooms: asNumber(q["bedrooms"]),
		bathrooms: asNumber(q["bathrooms"]),
		description: asString(q["description"]),
		features: asStringArray(q["features"]),
		agentId: asString(q["agentId"])
	};
}).handler(createProperty_createServerFn_handler, ({ data }) => repository.createProperty(data));
var updateProperty_createServerFn_handler = createServerRpc({
	id: "d07e50cd20f5c4d3dd56142a4cdef86a8f49f476f740733fc9ba51d4704bc904",
	name: "updateProperty",
	filename: "src/lib/admin/server.ts"
}, (opts) => updateProperty.__executeServer(opts));
var updateProperty = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	const transactionRaw = q["transaction"];
	return {
		id: requireId(q["id"]),
		patch: {
			reference: asString(q["reference"]),
			title: asString(q["title"]),
			status: asString(q["status"]),
			transaction: transactionRaw === "vente" || transactionRaw === "location" ? transactionRaw : void 0,
			type: asString(q["type"]),
			city: asString(q["city"]),
			neighborhood: asString(q["neighborhood"]),
			price: asNumber(q["price"]),
			surface: asNumber(q["surface"]),
			bedrooms: asNumber(q["bedrooms"]),
			bathrooms: asNumber(q["bathrooms"]),
			description: asString(q["description"]),
			features: asStringArray(q["features"]),
			agentId: asString(q["agentId"])
		}
	};
}).handler(updateProperty_createServerFn_handler, ({ data }) => repository.updateProperty(data.id, data.patch));
var addPropertyMedia_createServerFn_handler = createServerRpc({
	id: "f83c5c9bbbbf9120abb68d02f2aef40d2f8df389b4d02d4f74aaf0da07e93bbb",
	name: "addPropertyMedia",
	filename: "src/lib/admin/server.ts"
}, (opts) => addPropertyMedia.__executeServer(opts));
var addPropertyMedia = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	const items = Array.isArray(q["items"]) ? q["items"] : [];
	return {
		propertyId: requireId(q["propertyId"]),
		items: items.map((item) => {
			const m = parseObject(item);
			return {
				kind: asString(m["kind"]),
				url: asString(m["url"]) ?? "",
				label: asString(m["label"]),
				isCover: asBoolean(m["isCover"])
			};
		})
	};
}).handler(addPropertyMedia_createServerFn_handler, ({ data }) => repository.addMedia(data.propertyId, data.items));
var updatePropertyMedia_createServerFn_handler = createServerRpc({
	id: "90668fee5d734f819c36add3394bc4e092ed6cd9988e986b51950a894247dead",
	name: "updatePropertyMedia",
	filename: "src/lib/admin/server.ts"
}, (opts) => updatePropertyMedia.__executeServer(opts));
var updatePropertyMedia = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	return {
		id: requireId(q["id"]),
		patch: {
			label: asString(q["label"]),
			isCover: asBoolean(q["isCover"])
		}
	};
}).handler(updatePropertyMedia_createServerFn_handler, ({ data }) => repository.updateMedia(data.id, data.patch));
var movePropertyMedia_createServerFn_handler = createServerRpc({
	id: "2b3e4eeec2f0f5a6b06920a63eeff916c272ee08d2bb545a82ca8e224524ca62",
	name: "movePropertyMedia",
	filename: "src/lib/admin/server.ts"
}, (opts) => movePropertyMedia.__executeServer(opts));
var movePropertyMedia = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	const direction = q["direction"];
	if (direction !== -1 && direction !== 1) throw new Error("direction must be -1 or 1");
	return {
		id: requireId(q["id"]),
		direction
	};
}).handler(movePropertyMedia_createServerFn_handler, ({ data }) => repository.moveMedia(data.id, data.direction));
var removePropertyMedia_createServerFn_handler = createServerRpc({
	id: "2398a56c84788c03001507a7d228f4788e57173fe425c33f80e4c74d9f5b074a",
	name: "removePropertyMedia",
	filename: "src/lib/admin/server.ts"
}, (opts) => removePropertyMedia.__executeServer(opts));
var removePropertyMedia = createServerFn({ method: "POST" }).inputValidator((raw) => parseObject(raw)).handler(removePropertyMedia_createServerFn_handler, ({ data }) => repository.removeMedia(requireId(data["id"])));
var fetchClients_createServerFn_handler = createServerRpc({
	id: "9c399edd2174970fcbae0a2ca54d50b66e72ea0de7baf7258612d956f0bde71c",
	name: "fetchClients",
	filename: "src/lib/admin/server.ts"
}, (opts) => fetchClients.__executeServer(opts));
var fetchClients = createServerFn({ method: "GET" }).inputValidator(parseClientQuery).handler(fetchClients_createServerFn_handler, ({ data }) => repository.listClients(data));
var fetchClient_createServerFn_handler = createServerRpc({
	id: "5bd8fd712366ac1cb6b64707844268a3976d8dbfaaa899fdbc1fefdf21ace283",
	name: "fetchClient",
	filename: "src/lib/admin/server.ts"
}, (opts) => fetchClient.__executeServer(opts));
var fetchClient = createServerFn({ method: "GET" }).inputValidator(requireId).handler(fetchClient_createServerFn_handler, ({ data }) => repository.getClient(data));
var fetchAgents_createServerFn_handler = createServerRpc({
	id: "5049e2b343c8fe18a6baa237f9581b7b8b39d4cebb1f1c56d8f2ceac2bf8ab4b",
	name: "fetchAgents",
	filename: "src/lib/admin/server.ts"
}, (opts) => fetchAgents.__executeServer(opts));
var fetchAgents = createServerFn({ method: "GET" }).handler(fetchAgents_createServerFn_handler, () => repository.listAgents());
var createClient_createServerFn_handler = createServerRpc({
	id: "5913793dfb60667c2f108b876f349fee0dad93980295b3c3ddc06d2ad45c152b",
	name: "createClient",
	filename: "src/lib/admin/server.ts"
}, (opts) => createClient$1.__executeServer(opts));
var createClient$1 = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	return {
		firstName: asString(q["firstName"]) ?? "",
		lastName: asString(q["lastName"]) ?? "",
		email: asString(q["email"]) ?? "",
		phone: asString(q["phone"]),
		roles: asStringArray(q["roles"]),
		temperature: asString(q["temperature"]),
		score: asNumber(q["score"]),
		source: asString(q["source"]),
		city: asString(q["city"]),
		budgetMin: asNumber(q["budgetMin"]),
		budgetMax: asNumber(q["budgetMax"]),
		notes: asString(q["notes"]),
		agentId: asString(q["agentId"])
	};
}).handler(createClient_createServerFn_handler, ({ data }) => repository.createClient(data));
var updateClient_createServerFn_handler = createServerRpc({
	id: "a71936613eb0e8b475ad897c74764cd3866be04e8a0f90f399f858cde51e51ad",
	name: "updateClient",
	filename: "src/lib/admin/server.ts"
}, (opts) => updateClient.__executeServer(opts));
var updateClient = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	return {
		id: requireId(q["id"]),
		patch: {
			firstName: asString(q["firstName"]),
			lastName: asString(q["lastName"]),
			email: asString(q["email"]),
			phone: asString(q["phone"]),
			roles: asStringArray(q["roles"]),
			temperature: asString(q["temperature"]),
			score: asNumber(q["score"]),
			source: asString(q["source"]),
			city: asString(q["city"]),
			budgetMin: asNumber(q["budgetMin"]),
			budgetMax: asNumber(q["budgetMax"]),
			notes: asString(q["notes"]),
			agentId: asString(q["agentId"])
		}
	};
}).handler(updateClient_createServerFn_handler, ({ data }) => repository.updateClient(data.id, data.patch));
var addActivity_createServerFn_handler = createServerRpc({
	id: "3402b41c594a998a2dc2d26a6df5e8e0ea9ce63216021f0f9e22a19fb9121536",
	name: "addActivity",
	filename: "src/lib/admin/server.ts"
}, (opts) => addActivity.__executeServer(opts));
var addActivity = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	return {
		kind: enumOf([
			"note",
			"call",
			"email",
			"whatsapp",
			"viewing",
			"offer",
			"stage_change",
			"document"
		], "activity kind")(q["kind"]),
		subject: asString(q["subject"]) ?? "",
		body: asString(q["body"]),
		clientId: asString(q["clientId"]),
		propertyId: asString(q["propertyId"]),
		leadId: asString(q["leadId"]),
		agentId: asString(q["agentId"])
	};
}).handler(addActivity_createServerFn_handler, ({ data }) => repository.addActivity(data));
var fetchLeads_createServerFn_handler = createServerRpc({
	id: "08ecea8d0e17d4fcb879ca1a4dc96a752f12082da6e0ee00f7b74d46b5e4b570",
	name: "fetchLeads",
	filename: "src/lib/admin/server.ts"
}, (opts) => fetchLeads.__executeServer(opts));
var fetchLeads = createServerFn({ method: "GET" }).handler(fetchLeads_createServerFn_handler, () => repository.listLeads());
var fetchLead_createServerFn_handler = createServerRpc({
	id: "16a16e6028d3c769cf541104510f09b1c79968231c5bcf868c77235b256f8019",
	name: "fetchLead",
	filename: "src/lib/admin/server.ts"
}, (opts) => fetchLead.__executeServer(opts));
var fetchLead = createServerFn({ method: "GET" }).inputValidator(requireId).handler(fetchLead_createServerFn_handler, ({ data }) => repository.getLead(data));
var createLead_createServerFn_handler = createServerRpc({
	id: "682a51993c26a64e2a80e5336d8e46a738be5ff3d8b4bd402b41e98bfd653050",
	name: "createLead",
	filename: "src/lib/admin/server.ts"
}, (opts) => createLead.__executeServer(opts));
var createLead = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	const source = asString(q["source"]);
	return {
		clientId: requireId(q["clientId"]),
		propertyId: asString(q["propertyId"]),
		stage: asString(q["stage"]),
		temperature: asString(q["temperature"]),
		score: asNumber(q["score"]),
		source: source && LEAD_SOURCES.includes(source) ? source : "site_web",
		value: asNumber(q["value"]),
		agentId: asString(q["agentId"]),
		nextAction: asString(q["nextAction"]),
		nextActionAt: asString(q["nextActionAt"])
	};
}).handler(createLead_createServerFn_handler, ({ data }) => repository.createLead(data));
var createPublicLead_createServerFn_handler = createServerRpc({
	id: "ef90ff71c38ad624eb8f69d808663fe6beeec597d43360d06ca89bd3f7721105",
	name: "createPublicLead",
	filename: "src/lib/admin/server.ts"
}, (opts) => createPublicLead.__executeServer(opts));
var createPublicLead = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	return {
		firstName: asString(q["firstName"]) ?? "",
		lastName: asString(q["lastName"]) ?? "",
		email: asString(q["email"]) ?? "",
		phone: asString(q["phone"]),
		message: asString(q["message"]),
		propertyId: asString(q["propertyId"]),
		agentId: asString(q["agentId"]),
		intent: asString(q["intent"])
	};
}).handler(createPublicLead_createServerFn_handler, ({ data }) => repository.createPublicLead(data));
var updateLead_createServerFn_handler = createServerRpc({
	id: "a605871d33c8f1e79965974d4707ba15af14a8d0a3d57e197dfcbcbc059e1ec2",
	name: "updateLead",
	filename: "src/lib/admin/server.ts"
}, (opts) => updateLead.__executeServer(opts));
var updateLead = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	const source = asString(q["source"]);
	return {
		id: requireId(q["id"]),
		patch: {
			propertyId: asString(q["propertyId"]),
			temperature: asString(q["temperature"]),
			score: asNumber(q["score"]),
			source: source && LEAD_SOURCES.includes(source) ? source : void 0,
			value: asNumber(q["value"]),
			agentId: asString(q["agentId"]),
			nextAction: asString(q["nextAction"]),
			nextActionAt: asString(q["nextActionAt"])
		}
	};
}).handler(updateLead_createServerFn_handler, ({ data }) => repository.updateLead(data.id, data.patch));
var moveLead_createServerFn_handler = createServerRpc({
	id: "e078d29a7c920437916097c18f2c2b8b9597687766f17fd42899ab912595b4b2",
	name: "moveLead",
	filename: "src/lib/admin/server.ts"
}, (opts) => moveLead.__executeServer(opts));
var moveLead = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = raw ?? {};
	const stage = asString(q["stage"]);
	if (!stage || !PIPELINE_STAGES.includes(stage)) throw new Error(`Unknown pipeline stage: ${String(q["stage"])}`);
	return {
		id: requireId(q["id"]),
		stage
	};
}).handler(moveLead_createServerFn_handler, ({ data }) => repository.moveLead(data.id, data.stage));
var fetchActivities_createServerFn_handler = createServerRpc({
	id: "74c6c6127ab2cff618298f38010fc6893478608e5f39a4438f55264e12f8c490",
	name: "fetchActivities",
	filename: "src/lib/admin/server.ts"
}, (opts) => fetchActivities.__executeServer(opts));
var fetchActivities = createServerFn({ method: "GET" }).inputValidator((raw) => {
	const q = raw ?? {};
	return {
		clientId: asString(q["clientId"]),
		leadId: asString(q["leadId"]),
		propertyId: asString(q["propertyId"])
	};
}).handler(fetchActivities_createServerFn_handler, ({ data }) => repository.listActivities(data));
var fetchAppointments_createServerFn_handler = createServerRpc({
	id: "a4f5a600dbf3a18e413040efeef9b781b4078ab6d3a97e94eb9991e3aca55a4c",
	name: "fetchAppointments",
	filename: "src/lib/admin/server.ts"
}, (opts) => fetchAppointments.__executeServer(opts));
var fetchAppointments = createServerFn({ method: "GET" }).handler(fetchAppointments_createServerFn_handler, () => repository.listAppointments());
var createAppointment_createServerFn_handler = createServerRpc({
	id: "5b5a97fd4cfd8cfcf8e520f8aa20dd6342f8bfbf90b6baeed860f9f72f567829",
	name: "createAppointment",
	filename: "src/lib/admin/server.ts"
}, (opts) => createAppointment.__executeServer(opts));
var createAppointment = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	return {
		kind: enumOf([
			"viewing",
			"valuation",
			"signature",
			"call",
			"meeting"
		], "appointment kind")(q["kind"]),
		title: asString(q["title"]) ?? "",
		startsAt: asString(q["startsAt"]) ?? "",
		endsAt: asString(q["endsAt"]) ?? "",
		propertyId: asString(q["propertyId"]),
		clientId: asString(q["clientId"]),
		agentId: asString(q["agentId"]),
		location: asString(q["location"]),
		status: asString(q["status"])
	};
}).handler(createAppointment_createServerFn_handler, ({ data }) => repository.createAppointment(data));
var updateAppointment_createServerFn_handler = createServerRpc({
	id: "31f953f14119bfe19f9fc67b5e6ff09c098eace8b88958ee4ba563860f341bed",
	name: "updateAppointment",
	filename: "src/lib/admin/server.ts"
}, (opts) => updateAppointment.__executeServer(opts));
var updateAppointment = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	return {
		id: requireId(q["id"]),
		patch: {
			kind: q["kind"] !== void 0 ? enumOf([
				"viewing",
				"valuation",
				"signature",
				"call",
				"meeting"
			], "appointment kind")(q["kind"]) : void 0,
			title: asString(q["title"]),
			startsAt: asString(q["startsAt"]),
			endsAt: asString(q["endsAt"]),
			propertyId: asString(q["propertyId"]),
			clientId: asString(q["clientId"]),
			agentId: asString(q["agentId"]),
			location: asString(q["location"]),
			status: asString(q["status"])
		}
	};
}).handler(updateAppointment_createServerFn_handler, ({ data }) => repository.updateAppointment(data.id, data.patch));
var setAppointmentStatus_createServerFn_handler = createServerRpc({
	id: "3b3be3b35675729b41aa6ef214eb6fd2bcf168bb88f6aa7c38b220063266d55c",
	name: "setAppointmentStatus",
	filename: "src/lib/admin/server.ts"
}, (opts) => setAppointmentStatus.__executeServer(opts));
var setAppointmentStatus = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	return {
		id: requireId(q["id"]),
		status: enumOf([
			"scheduled",
			"confirmed",
			"done",
			"cancelled",
			"no_show"
		], "appointment status")(q["status"])
	};
}).handler(setAppointmentStatus_createServerFn_handler, ({ data }) => repository.setAppointmentStatus(data.id, data.status));
var saveViewingReport_createServerFn_handler = createServerRpc({
	id: "976299026b5a32e7ce810139f944bc1ceadf7c1d5fa002fa0df62e5555dc1966",
	name: "saveViewingReport",
	filename: "src/lib/admin/server.ts"
}, (opts) => saveViewingReport.__executeServer(opts));
var saveViewingReport = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	const interest = asNumber(q["interest"]);
	if (interest === void 0 || interest < 0 || interest > 5) throw new Error("interest must be between 0 and 5");
	return {
		id: requireId(q["id"]),
		report: {
			interest,
			outcome: asString(q["outcome"]) ?? "",
			nextAction: asString(q["nextAction"])
		}
	};
}).handler(saveViewingReport_createServerFn_handler, ({ data }) => repository.saveViewingReport(data.id, data.report));
var fetchDocuments_createServerFn_handler = createServerRpc({
	id: "1176cebe48ed2e5f967ea2390ad51b474ac07a5ab41db963cee10cb9f3d728ec",
	name: "fetchDocuments",
	filename: "src/lib/admin/server.ts"
}, (opts) => fetchDocuments.__executeServer(opts));
var fetchDocuments = createServerFn({ method: "GET" }).handler(fetchDocuments_createServerFn_handler, () => repository.listDocuments());
var createDocument_createServerFn_handler = createServerRpc({
	id: "981bf9ee4c7f1e18b277291eb432fb91c635413e401440473da8e88ad0c294b4",
	name: "createDocument",
	filename: "src/lib/admin/server.ts"
}, (opts) => createDocument.__executeServer(opts));
var createDocument = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	return {
		name: asString(q["name"]) ?? "",
		category: enumOf([
			"mandat",
			"titre_foncier",
			"compromis",
			"contrat",
			"facture",
			"diagnostic",
			"autre"
		], "document category")(q["category"] ?? "autre"),
		mimeType: asString(q["mimeType"]) ?? "application/octet-stream",
		sizeBytes: asNumber(q["sizeBytes"]) ?? 0,
		url: asString(q["url"]) ?? "",
		propertyId: asString(q["propertyId"]),
		clientId: asString(q["clientId"]),
		transactionId: asString(q["transactionId"]),
		uploadedById: asString(q["uploadedById"])
	};
}).handler(createDocument_createServerFn_handler, ({ data }) => repository.createDocument(data));
var deleteDocument_createServerFn_handler = createServerRpc({
	id: "b72406dcd82d2a5658db28d9eeae419031076090edaa2f05fb4c9e4056317e37",
	name: "deleteDocument",
	filename: "src/lib/admin/server.ts"
}, (opts) => deleteDocument.__executeServer(opts));
var deleteDocument = createServerFn({ method: "POST" }).inputValidator(requireId).handler(deleteDocument_createServerFn_handler, ({ data }) => repository.deleteDocument(data));
var fetchTasks_createServerFn_handler = createServerRpc({
	id: "44c8e837dcac27e0f1e4ad9cb409379002de0716cd442c31f6bce99ae35bb54a",
	name: "fetchTasks",
	filename: "src/lib/admin/server.ts"
}, (opts) => fetchTasks.__executeServer(opts));
var fetchTasks = createServerFn({ method: "GET" }).handler(fetchTasks_createServerFn_handler, () => repository.listTasks());
var createTask_createServerFn_handler = createServerRpc({
	id: "11b7e358ec05bb22fc81578ce8d9f1b6a1506896db9727586d3f7af68ab48ec1",
	name: "createTask",
	filename: "src/lib/admin/server.ts"
}, (opts) => createTask.__executeServer(opts));
var createTask = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	const priorities = [
		"low",
		"normal",
		"high",
		"urgent"
	];
	const entity = q["entity"];
	return {
		title: asString(q["title"]) ?? "",
		status: asString(q["status"]),
		priority: q["priority"] !== void 0 ? enumOf(priorities, "task priority")(q["priority"]) : void 0,
		dueAt: asString(q["dueAt"]),
		assigneeId: asString(q["assigneeId"]),
		entity: entity && typeof entity === "object" ? {
			kind: enumOf([
				"property",
				"client",
				"lead",
				"appointment"
			], "task entity")(entity["kind"]),
			id: requireId(entity["id"])
		} : void 0
	};
}).handler(createTask_createServerFn_handler, ({ data }) => repository.createTask(data));
var updateTask_createServerFn_handler = createServerRpc({
	id: "e95ce7eab701bd4f2171ce97e3a552f9c5df187d9da525107863310fe2f99935",
	name: "updateTask",
	filename: "src/lib/admin/server.ts"
}, (opts) => updateTask.__executeServer(opts));
var updateTask = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	return {
		id: requireId(q["id"]),
		patch: {
			title: asString(q["title"]),
			status: q["status"] !== void 0 ? enumOf([
				"todo",
				"doing",
				"done"
			], "task status")(q["status"]) : void 0,
			priority: q["priority"] !== void 0 ? enumOf([
				"low",
				"normal",
				"high",
				"urgent"
			], "task priority")(q["priority"]) : void 0,
			dueAt: asString(q["dueAt"]),
			assigneeId: asString(q["assigneeId"])
		}
	};
}).handler(updateTask_createServerFn_handler, ({ data }) => repository.updateTask(data.id, data.patch));
var fetchTransactions_createServerFn_handler = createServerRpc({
	id: "8cb28343c5935f4bd0ab0d883fafd4b0830a9db5cf0d7fcb4afb3b38fdf041ec",
	name: "fetchTransactions",
	filename: "src/lib/admin/server.ts"
}, (opts) => fetchTransactions.__executeServer(opts));
var fetchTransactions = createServerFn({ method: "GET" }).handler(fetchTransactions_createServerFn_handler, () => repository.listTransactions());
var createTransaction_createServerFn_handler = createServerRpc({
	id: "1322caae7ad694b77afc5a82dfe453a2a0f959aeb29d9f2fa1ee4e31742035a4",
	name: "createTransaction",
	filename: "src/lib/admin/server.ts"
}, (opts) => createTransaction.__executeServer(opts));
var createTransaction = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	return {
		propertyId: requireId(q["propertyId"]),
		buyerClientId: requireId(q["buyerClientId"]),
		sellerClientId: asString(q["sellerClientId"]),
		agentId: asString(q["agentId"]),
		amount: asNumber(q["amount"]) ?? 0,
		commission: asNumber(q["commission"]),
		stage: asString(q["stage"])
	};
}).handler(createTransaction_createServerFn_handler, ({ data }) => repository.createTransaction(data));
var moveTransactionStage_createServerFn_handler = createServerRpc({
	id: "7f454fd3a7c9d5a879db30c7a55cd3a93e79113e1bc001232b9052265f5b2abf",
	name: "moveTransactionStage",
	filename: "src/lib/admin/server.ts"
}, (opts) => moveTransactionStage.__executeServer(opts));
var moveTransactionStage = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	return {
		id: requireId(q["id"]),
		stage: enumOf(TRANSACTION_STAGES, "transaction stage")(q["stage"])
	};
}).handler(moveTransactionStage_createServerFn_handler, ({ data }) => repository.moveTransactionStage(data.id, data.stage));
var addPayment_createServerFn_handler = createServerRpc({
	id: "d3e0bebc5c6ab51f28fdceb0444a9e984594f887c2cac34f1cb23823b7922844",
	name: "addPayment",
	filename: "src/lib/admin/server.ts"
}, (opts) => addPayment.__executeServer(opts));
var addPayment = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	return {
		transactionId: requireId(q["transactionId"]),
		input: {
			label: asString(q["label"]) ?? "",
			amount: asNumber(q["amount"]) ?? 0,
			dueAt: asString(q["dueAt"]) ?? ""
		}
	};
}).handler(addPayment_createServerFn_handler, ({ data }) => repository.addPayment(data.transactionId, data.input));
var markPaymentPaid_createServerFn_handler = createServerRpc({
	id: "eae69727d2d7dfeeac486ae33a297211f8a31d29fdd0dbb7df33c741bdd36225",
	name: "markPaymentPaid",
	filename: "src/lib/admin/server.ts"
}, (opts) => markPaymentPaid.__executeServer(opts));
var markPaymentPaid = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	return {
		transactionId: requireId(q["transactionId"]),
		paymentId: requireId(q["paymentId"])
	};
}).handler(markPaymentPaid_createServerFn_handler, ({ data }) => repository.markPaymentPaid(data.transactionId, data.paymentId));
var createNotification_createServerFn_handler = createServerRpc({
	id: "039ae04bd3a1b98283413361e185eba45e6d72996904afa4dad2f81383927d39",
	name: "createNotification",
	filename: "src/lib/admin/server.ts"
}, (opts) => createNotification.__executeServer(opts));
var createNotification = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	return {
		kind: enumOf([
			"lead",
			"appointment",
			"task",
			"transaction",
			"system"
		], "notification kind")(q["kind"] ?? "system"),
		title: asString(q["title"]) ?? "",
		body: asString(q["body"]) ?? "",
		href: asString(q["href"])
	};
}).handler(createNotification_createServerFn_handler, ({ data }) => repository.createNotification(data));
var fetchNotifications_createServerFn_handler = createServerRpc({
	id: "d0cdb7f1b905199dae1f6cead7d97611cc295717da8512ec8fd66ff8e9ece080",
	name: "fetchNotifications",
	filename: "src/lib/admin/server.ts"
}, (opts) => fetchNotifications.__executeServer(opts));
var fetchNotifications = createServerFn({ method: "GET" }).handler(fetchNotifications_createServerFn_handler, () => repository.listNotifications());
var readNotification_createServerFn_handler = createServerRpc({
	id: "af02de984755af3d3e2b154467c92983af511ae4b9683b9b88a7d5695e77ac72",
	name: "readNotification",
	filename: "src/lib/admin/server.ts"
}, (opts) => readNotification.__executeServer(opts));
var readNotification = createServerFn({ method: "POST" }).inputValidator(requireId).handler(readNotification_createServerFn_handler, ({ data }) => repository.markNotificationRead(data));
var readAllNotifications_createServerFn_handler = createServerRpc({
	id: "5bb1bb3ca1a5db111063266f4ba5a0f8dca0f877acd9ab225f82f97c3d0b8285",
	name: "readAllNotifications",
	filename: "src/lib/admin/server.ts"
}, (opts) => readAllNotifications.__executeServer(opts));
var readAllNotifications = createServerFn({ method: "POST" }).handler(readAllNotifications_createServerFn_handler, () => repository.markAllNotificationsRead());
var fetchDashboard_createServerFn_handler = createServerRpc({
	id: "0b7e4fc432e33bbe42d44a05a08ebfece9f874f7455330791d13237b00df2ea5",
	name: "fetchDashboard",
	filename: "src/lib/admin/server.ts"
}, (opts) => fetchDashboard.__executeServer(opts));
var fetchDashboard = createServerFn({ method: "GET" }).handler(fetchDashboard_createServerFn_handler, () => repository.getDashboard());
var fetchPriorities_createServerFn_handler = createServerRpc({
	id: "2624d21020bb2f40277d2db5a02a71a11e54e6d1a42469cd170d8877b1fca558",
	name: "fetchPriorities",
	filename: "src/lib/admin/server.ts"
}, (opts) => fetchPriorities.__executeServer(opts));
var fetchPriorities = createServerFn({ method: "GET" }).inputValidator((raw) => ({ agentId: asString(raw["agentId"]) })).handler(fetchPriorities_createServerFn_handler, ({ data }) => repository.getPriorities(data.agentId));
var CAMPAIGN_CHANNELS = [
	"email",
	"whatsapp",
	"portail",
	"reseaux_sociaux"
];
var fetchCampaigns_createServerFn_handler = createServerRpc({
	id: "dc2f0579ace483378d57f6dc50a7c7bb068fef0df7ff6e2c4d077f913051efcb",
	name: "fetchCampaigns",
	filename: "src/lib/admin/server.ts"
}, (opts) => fetchCampaigns.__executeServer(opts));
var fetchCampaigns = createServerFn({ method: "GET" }).handler(fetchCampaigns_createServerFn_handler, () => repository.listCampaigns());
var fetchMarketingStats_createServerFn_handler = createServerRpc({
	id: "66288fc085b6aebf6727853f90940a02919e10331238d24c1e6d2e80f5e6e7fd",
	name: "fetchMarketingStats",
	filename: "src/lib/admin/server.ts"
}, (opts) => fetchMarketingStats.__executeServer(opts));
var fetchMarketingStats = createServerFn({ method: "GET" }).handler(fetchMarketingStats_createServerFn_handler, () => repository.getMarketingStats());
var createCampaign_createServerFn_handler = createServerRpc({
	id: "68ba1ff92b1df2fb0a1cd50b3163b521fe718b858ae224fcb155a9be7248b414",
	name: "createCampaign",
	filename: "src/lib/admin/server.ts"
}, (opts) => createCampaign.__executeServer(opts));
var createCampaign = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	return {
		name: asString(q["name"]) ?? "Campagne",
		subject: asString(q["subject"]) ?? "",
		channel: enumOf(CAMPAIGN_CHANNELS, "canal")(q["channel"] ?? "email"),
		audience: asString(q["audience"]) ?? "",
		audienceCount: asNumber(q["audienceCount"]) ?? 0
	};
}).handler(createCampaign_createServerFn_handler, ({ data }) => repository.createCampaign(data));
var sendCampaign_createServerFn_handler = createServerRpc({
	id: "b855c379f14c551bbd4c645b1f4aa3de473edeec062cc7a8c06e1cd4ca20643b",
	name: "sendCampaign",
	filename: "src/lib/admin/server.ts"
}, (opts) => sendCampaign.__executeServer(opts));
var sendCampaign = createServerFn({ method: "POST" }).inputValidator((raw) => parseObject(raw)["id"]).handler(sendCampaign_createServerFn_handler, ({ data }) => repository.sendCampaign(requireId(data)));
var deleteCampaign_createServerFn_handler = createServerRpc({
	id: "c8d473328f66c7f0fab662cfe325e2776ff77d15b2afb1ea6cb718ba9a05c7a9",
	name: "deleteCampaign",
	filename: "src/lib/admin/server.ts"
}, (opts) => deleteCampaign.__executeServer(opts));
var deleteCampaign = createServerFn({ method: "POST" }).inputValidator((raw) => parseObject(raw)["id"]).handler(deleteCampaign_createServerFn_handler, ({ data }) => repository.deleteCampaign(requireId(data)));
var deleteProperty_createServerFn_handler = createServerRpc({
	id: "207bb87efb25a061383b97dda7c474322e907dfc8f9befa74e868722982cfe35",
	name: "deleteProperty",
	filename: "src/lib/admin/server.ts"
}, (opts) => deleteProperty.__executeServer(opts));
var deleteProperty = createServerFn({ method: "POST" }).inputValidator((raw) => parseObject(raw)["id"]).handler(deleteProperty_createServerFn_handler, ({ data }) => repository.deleteProperty(requireId(data)));
var deleteClient_createServerFn_handler = createServerRpc({
	id: "d5e70933b56f2e132a5008fa7f3aedede615586d3cba46e74bdc694284ce6e62",
	name: "deleteClient",
	filename: "src/lib/admin/server.ts"
}, (opts) => deleteClient.__executeServer(opts));
var deleteClient = createServerFn({ method: "POST" }).inputValidator((raw) => parseObject(raw)["id"]).handler(deleteClient_createServerFn_handler, ({ data }) => repository.deleteClient(requireId(data)));
var deleteLead_createServerFn_handler = createServerRpc({
	id: "70facd56822a8fd72d6901ec5da7b3d29388fcbe07c6732604a548d8413defb5",
	name: "deleteLead",
	filename: "src/lib/admin/server.ts"
}, (opts) => deleteLead.__executeServer(opts));
var deleteLead = createServerFn({ method: "POST" }).inputValidator((raw) => parseObject(raw)["id"]).handler(deleteLead_createServerFn_handler, ({ data }) => repository.deleteLead(requireId(data)));
var deleteTransaction_createServerFn_handler = createServerRpc({
	id: "69a1a5bb8fb286805b18f03e9253c5d576b3c6e153b46436c92b07d08d137048",
	name: "deleteTransaction",
	filename: "src/lib/admin/server.ts"
}, (opts) => deleteTransaction.__executeServer(opts));
var deleteTransaction = createServerFn({ method: "POST" }).inputValidator((raw) => parseObject(raw)["id"]).handler(deleteTransaction_createServerFn_handler, ({ data }) => repository.deleteTransaction(requireId(data)));
var setFeatured_createServerFn_handler = createServerRpc({
	id: "08c90ec55c95a0d6e26e89123585026ed0090aba24f9b9d49c09513bc8322ea5",
	name: "setFeatured",
	filename: "src/lib/admin/server.ts"
}, (opts) => setFeatured.__executeServer(opts));
var setFeatured = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	return {
		propertyId: requireId(q["propertyId"]),
		until: asString(q["until"]) ?? new Date(Date.now() + 7 * 864e5).toISOString()
	};
}).handler(setFeatured_createServerFn_handler, ({ data }) => repository.setFeatured(data.propertyId, data.until));
var removeFeatured_createServerFn_handler = createServerRpc({
	id: "a09e79360c49c2bad594e06a1243566bb86e17c8f5227a5e53694b9310b58b86",
	name: "removeFeatured",
	filename: "src/lib/admin/server.ts"
}, (opts) => removeFeatured.__executeServer(opts));
var removeFeatured = createServerFn({ method: "POST" }).inputValidator((raw) => parseObject(raw)["propertyId"]).handler(removeFeatured_createServerFn_handler, ({ data }) => repository.removeFeatured(requireId(data)));
var fetchMatchesForClient_createServerFn_handler = createServerRpc({
	id: "118c607dbedbda17b3a2da2ae9558228c7d45ec89148600f3659d44ff0ebc156",
	name: "fetchMatchesForClient",
	filename: "src/lib/admin/server.ts"
}, (opts) => fetchMatchesForClient.__executeServer(opts));
var fetchMatchesForClient = createServerFn({ method: "POST" }).inputValidator((raw) => parseObject(raw)["clientId"]).handler(fetchMatchesForClient_createServerFn_handler, ({ data }) => repository.matchForClient(requireId(data)));
var fetchMatchesForProperty_createServerFn_handler = createServerRpc({
	id: "0a5f50238def21170bc0d3bda484b8911ed52821c8e9d6b37486db6f3add3b39",
	name: "fetchMatchesForProperty",
	filename: "src/lib/admin/server.ts"
}, (opts) => fetchMatchesForProperty.__executeServer(opts));
var fetchMatchesForProperty = createServerFn({ method: "POST" }).inputValidator((raw) => parseObject(raw)["propertyId"]).handler(fetchMatchesForProperty_createServerFn_handler, ({ data }) => repository.matchForProperty(requireId(data)));
var sendMatchesToClient_createServerFn_handler = createServerRpc({
	id: "7560614fc18d0558c7b23036318152e33968f8044338cb5e08e3341057e47657",
	name: "sendMatchesToClient",
	filename: "src/lib/admin/server.ts"
}, (opts) => sendMatchesToClient.__executeServer(opts));
var sendMatchesToClient = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	return {
		clientId: requireId(q["clientId"]),
		propertyIds: Array.isArray(q["propertyIds"]) ? q["propertyIds"].filter((x) => typeof x === "string") : []
	};
}).handler(sendMatchesToClient_createServerFn_handler, ({ data }) => repository.sendMatchesToClient(data.clientId, data.propertyIds));
var fetchAutomations_createServerFn_handler = createServerRpc({
	id: "c80c98bd018bb35ba632a4b23c039b856a15c7f612348a642c37bddb88599f71",
	name: "fetchAutomations",
	filename: "src/lib/admin/server.ts"
}, (opts) => fetchAutomations.__executeServer(opts));
var fetchAutomations = createServerFn({ method: "GET" }).handler(fetchAutomations_createServerFn_handler, () => repository.getAutomations());
var setAutomationFlag_createServerFn_handler = createServerRpc({
	id: "7894639ebbc5818d3337fb19c990fd66572d9769d20a6d3dff754754a9499048",
	name: "setAutomationFlag",
	filename: "src/lib/admin/server.ts"
}, (opts) => setAutomationFlag.__executeServer(opts));
var setAutomationFlag = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	return {
		key: [
			"leadFirstContact",
			"visitConfirmTask",
			"soldClosesTransaction",
			"inactiveLeadRelance"
		].find((k) => k === q["key"]) ?? "leadFirstContact",
		enabled: asBoolean(q["enabled"]) ?? true
	};
}).handler(setAutomationFlag_createServerFn_handler, ({ data }) => repository.setAutomation(data.key, data.enabled));
var fetchInactiveLeads_createServerFn_handler = createServerRpc({
	id: "f0aa8a82a559ccb00aef7f74a0f641d13d7984c639c781e4ff2101a4f951a4ca",
	name: "fetchInactiveLeads",
	filename: "src/lib/admin/server.ts"
}, (opts) => fetchInactiveLeads.__executeServer(opts));
var fetchInactiveLeads = createServerFn({ method: "GET" }).handler(fetchInactiveLeads_createServerFn_handler, () => repository.listInactiveLeads());
var createCallbackTask_createServerFn_handler = createServerRpc({
	id: "dc634c5a7f88e6a00ccd5941834f225f59b80c245cc96f4d8a7c25bf7d17048c",
	name: "createCallbackTask",
	filename: "src/lib/admin/server.ts"
}, (opts) => createCallbackTask.__executeServer(opts));
var createCallbackTask = createServerFn({ method: "POST" }).inputValidator((raw) => parseObject(raw)["leadId"]).handler(createCallbackTask_createServerFn_handler, ({ data }) => repository.createCallbackTask(requireId(data)));
var REPORT_KEYS = [
	"properties",
	"crm",
	"agents",
	"activity"
];
var fetchReport_createServerFn_handler = createServerRpc({
	id: "40a302b4d602d7195ca4a5ed7694898d869f5283b46cbf7dc7ddc9ae0f157c1f",
	name: "fetchReport",
	filename: "src/lib/admin/server.ts"
}, (opts) => fetchReport.__executeServer(opts));
var fetchReport = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	return {
		key: REPORT_KEYS.includes(q["key"]) ? q["key"] : "activity",
		q: {
			from: asString(q["from"]),
			to: asString(q["to"])
		}
	};
}).handler(fetchReport_createServerFn_handler, ({ data }) => repository.getReport(data.key, data.q));
//#endregion
export { addActivity_createServerFn_handler, addPayment_createServerFn_handler, addPropertyMedia_createServerFn_handler, createAppointment_createServerFn_handler, createCallbackTask_createServerFn_handler, createCampaign_createServerFn_handler, createClient_createServerFn_handler, createDocument_createServerFn_handler, createLead_createServerFn_handler, createNotification_createServerFn_handler, createProperty_createServerFn_handler, createPublicLead_createServerFn_handler, createTask_createServerFn_handler, createTransaction_createServerFn_handler, deleteCampaign_createServerFn_handler, deleteClient_createServerFn_handler, deleteDocument_createServerFn_handler, deleteLead_createServerFn_handler, deleteProperty_createServerFn_handler, deleteTransaction_createServerFn_handler, fetchActivities_createServerFn_handler, fetchAgents_createServerFn_handler, fetchAppointments_createServerFn_handler, fetchAutomations_createServerFn_handler, fetchCampaigns_createServerFn_handler, fetchClient_createServerFn_handler, fetchClients_createServerFn_handler, fetchDashboard_createServerFn_handler, fetchDocuments_createServerFn_handler, fetchInactiveLeads_createServerFn_handler, fetchLead_createServerFn_handler, fetchLeads_createServerFn_handler, fetchMarketingStats_createServerFn_handler, fetchMatchesForClient_createServerFn_handler, fetchMatchesForProperty_createServerFn_handler, fetchNotifications_createServerFn_handler, fetchPriorities_createServerFn_handler, fetchProperties_createServerFn_handler, fetchProperty_createServerFn_handler, fetchReport_createServerFn_handler, fetchTasks_createServerFn_handler, fetchTransactions_createServerFn_handler, markPaymentPaid_createServerFn_handler, moveLead_createServerFn_handler, movePropertyMedia_createServerFn_handler, moveTransactionStage_createServerFn_handler, readAllNotifications_createServerFn_handler, readNotification_createServerFn_handler, removeFeatured_createServerFn_handler, removePropertyMedia_createServerFn_handler, saveViewingReport_createServerFn_handler, sendCampaign_createServerFn_handler, sendMatchesToClient_createServerFn_handler, setAppointmentStatus_createServerFn_handler, setAutomationFlag_createServerFn_handler, setFeatured_createServerFn_handler, setPropertyStatus_createServerFn_handler, updateAppointment_createServerFn_handler, updateClient_createServerFn_handler, updateLead_createServerFn_handler, updatePropertyMedia_createServerFn_handler, updateProperty_createServerFn_handler, updateTask_createServerFn_handler };
