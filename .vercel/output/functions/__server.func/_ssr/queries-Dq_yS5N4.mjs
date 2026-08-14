import { a as useQueryClient, n as queryOptions, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-C2eBRuW-.mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { a as PROPERTY_STATUSES, i as PIPELINE_STAGES, r as LEAD_SOURCES, s as TRANSACTION_STAGES } from "./types-CH15H5aZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/queries-Dq_yS5N4.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/**
* Typed server functions. Screens never touch the repository directly — they go
* through these, so authorisation (and later Supabase RLS) has exactly one
* place to live.
*/
/** Data access goes through the Supabase repository. */
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
var fetchProperties = createServerFn({ method: "GET" }).inputValidator(parsePropertyQuery).handler(createSsrRpc("9f3a99aff1063d81500f32d1f4eeb730aa8f302e979c8db754d411d4849b94fd"));
createServerFn({ method: "GET" }).inputValidator(requireId).handler(createSsrRpc("05b1a83af71d29316ba7cba653b0560a4089c59ea5bd4e76c2131fa2c53f71cf"));
var setPropertyStatus = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = raw ?? {};
	const status = asString(q["status"]);
	if (!status || !PROPERTY_STATUSES.includes(status)) throw new Error(`Unknown property status: ${String(q["status"])}`);
	return {
		id: requireId(q["id"]),
		status
	};
}).handler(createSsrRpc("bab716326d36fd5e008577fecf6698fc4bc8cb5568dd969c35dbde292441734a"));
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
}).handler(createSsrRpc("9915fafd4f0e327b4641606aca46edd044591df9a17dc62c723175b0ee1b61bb"));
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
}).handler(createSsrRpc("d07e50cd20f5c4d3dd56142a4cdef86a8f49f476f740733fc9ba51d4704bc904"));
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
}).handler(createSsrRpc("f83c5c9bbbbf9120abb68d02f2aef40d2f8df389b4d02d4f74aaf0da07e93bbb"));
var updatePropertyMedia = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	return {
		id: requireId(q["id"]),
		patch: {
			label: asString(q["label"]),
			isCover: asBoolean(q["isCover"])
		}
	};
}).handler(createSsrRpc("90668fee5d734f819c36add3394bc4e092ed6cd9988e986b51950a894247dead"));
var movePropertyMedia = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	const direction = q["direction"];
	if (direction !== -1 && direction !== 1) throw new Error("direction must be -1 or 1");
	return {
		id: requireId(q["id"]),
		direction
	};
}).handler(createSsrRpc("2b3e4eeec2f0f5a6b06920a63eeff916c272ee08d2bb545a82ca8e224524ca62"));
var removePropertyMedia = createServerFn({ method: "POST" }).inputValidator((raw) => parseObject(raw)).handler(createSsrRpc("2398a56c84788c03001507a7d228f4788e57173fe425c33f80e4c74d9f5b074a"));
var fetchClients = createServerFn({ method: "GET" }).inputValidator(parseClientQuery).handler(createSsrRpc("9c399edd2174970fcbae0a2ca54d50b66e72ea0de7baf7258612d956f0bde71c"));
var fetchClient = createServerFn({ method: "GET" }).inputValidator(requireId).handler(createSsrRpc("5bd8fd712366ac1cb6b64707844268a3976d8dbfaaa899fdbc1fefdf21ace283"));
var fetchAgents = createServerFn({ method: "GET" }).handler(createSsrRpc("5049e2b343c8fe18a6baa237f9581b7b8b39d4cebb1f1c56d8f2ceac2bf8ab4b"));
var createClient = createServerFn({ method: "POST" }).inputValidator((raw) => {
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
}).handler(createSsrRpc("5913793dfb60667c2f108b876f349fee0dad93980295b3c3ddc06d2ad45c152b"));
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
}).handler(createSsrRpc("a71936613eb0e8b475ad897c74764cd3866be04e8a0f90f399f858cde51e51ad"));
createServerFn({ method: "POST" }).inputValidator((raw) => {
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
}).handler(createSsrRpc("3402b41c594a998a2dc2d26a6df5e8e0ea9ce63216021f0f9e22a19fb9121536"));
var fetchLeads = createServerFn({ method: "GET" }).handler(createSsrRpc("08ecea8d0e17d4fcb879ca1a4dc96a752f12082da6e0ee00f7b74d46b5e4b570"));
createServerFn({ method: "GET" }).inputValidator(requireId).handler(createSsrRpc("16a16e6028d3c769cf541104510f09b1c79968231c5bcf868c77235b256f8019"));
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
}).handler(createSsrRpc("682a51993c26a64e2a80e5336d8e46a738be5ff3d8b4bd402b41e98bfd653050"));
/** Public site lead forms post straight into the CRM through this. */
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
}).handler(createSsrRpc("ef90ff71c38ad624eb8f69d808663fe6beeec597d43360d06ca89bd3f7721105"));
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
}).handler(createSsrRpc("a605871d33c8f1e79965974d4707ba15af14a8d0a3d57e197dfcbcbc059e1ec2"));
var moveLead = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = raw ?? {};
	const stage = asString(q["stage"]);
	if (!stage || !PIPELINE_STAGES.includes(stage)) throw new Error(`Unknown pipeline stage: ${String(q["stage"])}`);
	return {
		id: requireId(q["id"]),
		stage
	};
}).handler(createSsrRpc("e078d29a7c920437916097c18f2c2b8b9597687766f17fd42899ab912595b4b2"));
var fetchActivities = createServerFn({ method: "GET" }).inputValidator((raw) => {
	const q = raw ?? {};
	return {
		clientId: asString(q["clientId"]),
		leadId: asString(q["leadId"]),
		propertyId: asString(q["propertyId"])
	};
}).handler(createSsrRpc("74c6c6127ab2cff618298f38010fc6893478608e5f39a4438f55264e12f8c490"));
var fetchAppointments = createServerFn({ method: "GET" }).handler(createSsrRpc("a4f5a600dbf3a18e413040efeef9b781b4078ab6d3a97e94eb9991e3aca55a4c"));
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
}).handler(createSsrRpc("5b5a97fd4cfd8cfcf8e520f8aa20dd6342f8bfbf90b6baeed860f9f72f567829"));
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
}).handler(createSsrRpc("31f953f14119bfe19f9fc67b5e6ff09c098eace8b88958ee4ba563860f341bed"));
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
}).handler(createSsrRpc("3b3be3b35675729b41aa6ef214eb6fd2bcf168bb88f6aa7c38b220063266d55c"));
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
}).handler(createSsrRpc("976299026b5a32e7ce810139f944bc1ceadf7c1d5fa002fa0df62e5555dc1966"));
var fetchDocuments = createServerFn({ method: "GET" }).handler(createSsrRpc("1176cebe48ed2e5f967ea2390ad51b474ac07a5ab41db963cee10cb9f3d728ec"));
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
}).handler(createSsrRpc("981bf9ee4c7f1e18b277291eb432fb91c635413e401440473da8e88ad0c294b4"));
var deleteDocument = createServerFn({ method: "POST" }).inputValidator(requireId).handler(createSsrRpc("b72406dcd82d2a5658db28d9eeae419031076090edaa2f05fb4c9e4056317e37"));
var fetchTasks = createServerFn({ method: "GET" }).handler(createSsrRpc("44c8e837dcac27e0f1e4ad9cb409379002de0716cd442c31f6bce99ae35bb54a"));
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
}).handler(createSsrRpc("11b7e358ec05bb22fc81578ce8d9f1b6a1506896db9727586d3f7af68ab48ec1"));
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
}).handler(createSsrRpc("e95ce7eab701bd4f2171ce97e3a552f9c5df187d9da525107863310fe2f99935"));
var fetchTransactions = createServerFn({ method: "GET" }).handler(createSsrRpc("8cb28343c5935f4bd0ab0d883fafd4b0830a9db5cf0d7fcb4afb3b38fdf041ec"));
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
}).handler(createSsrRpc("1322caae7ad694b77afc5a82dfe453a2a0f959aeb29d9f2fa1ee4e31742035a4"));
var moveTransactionStage = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	return {
		id: requireId(q["id"]),
		stage: enumOf(TRANSACTION_STAGES, "transaction stage")(q["stage"])
	};
}).handler(createSsrRpc("7f454fd3a7c9d5a879db30c7a55cd3a93e79113e1bc001232b9052265f5b2abf"));
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
}).handler(createSsrRpc("d3e0bebc5c6ab51f28fdceb0444a9e984594f887c2cac34f1cb23823b7922844"));
var markPaymentPaid = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	return {
		transactionId: requireId(q["transactionId"]),
		paymentId: requireId(q["paymentId"])
	};
}).handler(createSsrRpc("eae69727d2d7dfeeac486ae33a297211f8a31d29fdd0dbb7df33c741bdd36225"));
createServerFn({ method: "POST" }).inputValidator((raw) => {
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
}).handler(createSsrRpc("039ae04bd3a1b98283413361e185eba45e6d72996904afa4dad2f81383927d39"));
var fetchNotifications = createServerFn({ method: "GET" }).handler(createSsrRpc("d0cdb7f1b905199dae1f6cead7d97611cc295717da8512ec8fd66ff8e9ece080"));
var readNotification = createServerFn({ method: "POST" }).inputValidator(requireId).handler(createSsrRpc("af02de984755af3d3e2b154467c92983af511ae4b9683b9b88a7d5695e77ac72"));
var readAllNotifications = createServerFn({ method: "POST" }).handler(createSsrRpc("5bb1bb3ca1a5db111063266f4ba5a0f8dca0f877acd9ab225f82f97c3d0b8285"));
var fetchDashboard = createServerFn({ method: "GET" }).handler(createSsrRpc("0b7e4fc432e33bbe42d44a05a08ebfece9f874f7455330791d13237b00df2ea5"));
var fetchPriorities = createServerFn({ method: "GET" }).inputValidator((raw) => ({ agentId: asString(raw["agentId"]) })).handler(createSsrRpc("2624d21020bb2f40277d2db5a02a71a11e54e6d1a42469cd170d8877b1fca558"));
var CAMPAIGN_CHANNELS = [
	"email",
	"whatsapp",
	"portail",
	"reseaux_sociaux"
];
createServerFn({ method: "GET" }).handler(createSsrRpc("dc2f0579ace483378d57f6dc50a7c7bb068fef0df7ff6e2c4d077f913051efcb"));
var fetchMarketingStats = createServerFn({ method: "GET" }).handler(createSsrRpc("66288fc085b6aebf6727853f90940a02919e10331238d24c1e6d2e80f5e6e7fd"));
var createCampaign = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	return {
		name: asString(q["name"]) ?? "Campagne",
		subject: asString(q["subject"]) ?? "",
		channel: enumOf(CAMPAIGN_CHANNELS, "canal")(q["channel"] ?? "email"),
		audience: asString(q["audience"]) ?? "",
		audienceCount: asNumber(q["audienceCount"]) ?? 0
	};
}).handler(createSsrRpc("68ba1ff92b1df2fb0a1cd50b3163b521fe718b858ae224fcb155a9be7248b414"));
var sendCampaign = createServerFn({ method: "POST" }).inputValidator((raw) => parseObject(raw)["id"]).handler(createSsrRpc("b855c379f14c551bbd4c645b1f4aa3de473edeec062cc7a8c06e1cd4ca20643b"));
var deleteCampaign = createServerFn({ method: "POST" }).inputValidator((raw) => parseObject(raw)["id"]).handler(createSsrRpc("c8d473328f66c7f0fab662cfe325e2776ff77d15b2afb1ea6cb718ba9a05c7a9"));
var deleteProperty = createServerFn({ method: "POST" }).inputValidator((raw) => parseObject(raw)["id"]).handler(createSsrRpc("207bb87efb25a061383b97dda7c474322e907dfc8f9befa74e868722982cfe35"));
var deleteClient = createServerFn({ method: "POST" }).inputValidator((raw) => parseObject(raw)["id"]).handler(createSsrRpc("d5e70933b56f2e132a5008fa7f3aedede615586d3cba46e74bdc694284ce6e62"));
var deleteLead = createServerFn({ method: "POST" }).inputValidator((raw) => parseObject(raw)["id"]).handler(createSsrRpc("70facd56822a8fd72d6901ec5da7b3d29388fcbe07c6732604a548d8413defb5"));
var deleteTransaction = createServerFn({ method: "POST" }).inputValidator((raw) => parseObject(raw)["id"]).handler(createSsrRpc("69a1a5bb8fb286805b18f03e9253c5d576b3c6e153b46436c92b07d08d137048"));
var setFeatured = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	return {
		propertyId: requireId(q["propertyId"]),
		until: asString(q["until"]) ?? new Date(Date.now() + 7 * 864e5).toISOString()
	};
}).handler(createSsrRpc("08c90ec55c95a0d6e26e89123585026ed0090aba24f9b9d49c09513bc8322ea5"));
var removeFeatured = createServerFn({ method: "POST" }).inputValidator((raw) => parseObject(raw)["propertyId"]).handler(createSsrRpc("a09e79360c49c2bad594e06a1243566bb86e17c8f5227a5e53694b9310b58b86"));
var fetchMatchesForClient = createServerFn({ method: "POST" }).inputValidator((raw) => parseObject(raw)["clientId"]).handler(createSsrRpc("118c607dbedbda17b3a2da2ae9558228c7d45ec89148600f3659d44ff0ebc156"));
var fetchMatchesForProperty = createServerFn({ method: "POST" }).inputValidator((raw) => parseObject(raw)["propertyId"]).handler(createSsrRpc("0a5f50238def21170bc0d3bda484b8911ed52821c8e9d6b37486db6f3add3b39"));
var sendMatchesToClient = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	return {
		clientId: requireId(q["clientId"]),
		propertyIds: Array.isArray(q["propertyIds"]) ? q["propertyIds"].filter((x) => typeof x === "string") : []
	};
}).handler(createSsrRpc("7560614fc18d0558c7b23036318152e33968f8044338cb5e08e3341057e47657"));
var fetchAutomations = createServerFn({ method: "GET" }).handler(createSsrRpc("c80c98bd018bb35ba632a4b23c039b856a15c7f612348a642c37bddb88599f71"));
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
}).handler(createSsrRpc("7894639ebbc5818d3337fb19c990fd66572d9769d20a6d3dff754754a9499048"));
var fetchInactiveLeads = createServerFn({ method: "GET" }).handler(createSsrRpc("f0aa8a82a559ccb00aef7f74a0f641d13d7984c639c781e4ff2101a4f951a4ca"));
var createCallbackTask = createServerFn({ method: "POST" }).inputValidator((raw) => parseObject(raw)["leadId"]).handler(createSsrRpc("dc634c5a7f88e6a00ccd5941834f225f59b80c245cc96f4d8a7c25bf7d17048c"));
var REPORT_KEYS = [
	"properties",
	"crm",
	"agents",
	"activity"
];
var fetchReport = createServerFn({ method: "POST" }).inputValidator((raw) => {
	const q = parseObject(raw);
	return {
		key: REPORT_KEYS.includes(q["key"]) ? q["key"] : "activity",
		q: {
			from: asString(q["from"]),
			to: asString(q["to"])
		}
	};
}).handler(createSsrRpc("40a302b4d602d7195ca4a5ed7694898d869f5283b46cbf7dc7ddc9ae0f157c1f"));
/**
* TanStack Query bindings for the admin. Screens import these, never the
* server functions directly, so cache keys stay consistent.
*/
var adminKeys = {
	all: ["admin"],
	properties: (q = {}) => [
		"admin",
		"properties",
		q
	],
	property: (id) => [
		"admin",
		"property",
		id
	],
	clients: (q = {}) => [
		"admin",
		"clients",
		q
	],
	client: (id) => [
		"admin",
		"client",
		id
	],
	leads: () => ["admin", "leads"],
	lead: (id) => [
		"admin",
		"lead",
		id
	],
	agents: () => ["admin", "agents"],
	activities: (f = {}) => [
		"admin",
		"activities",
		f
	],
	appointments: () => ["admin", "appointments"],
	documents: () => ["admin", "documents"],
	tasks: () => ["admin", "tasks"],
	transactions: () => ["admin", "transactions"],
	notifications: () => ["admin", "notifications"],
	dashboard: () => ["admin", "dashboard"],
	priorities: (agentId) => [
		"admin",
		"priorities",
		agentId
	],
	campaigns: () => ["admin", "campaigns"],
	marketingStats: () => ["admin", "marketingStats"],
	featured: () => ["admin", "featured"],
	matchesForClient: (clientId) => [
		"admin",
		"matches",
		"client",
		clientId
	],
	matchesForProperty: (propertyId) => [
		"admin",
		"matches",
		"property",
		propertyId
	],
	automations: () => ["admin", "automations"],
	inactiveLeads: () => ["admin", "inactiveLeads"],
	report: (key, from, to) => [
		"admin",
		"report",
		key,
		from,
		to
	]
};
var propertiesQuery = (q = {}) => queryOptions({
	queryKey: adminKeys.properties(q),
	queryFn: () => fetchProperties({ data: q })
});
var clientsQuery = (q = {}) => queryOptions({
	queryKey: adminKeys.clients(q),
	queryFn: () => fetchClients({ data: q })
});
var clientQuery = (id) => queryOptions({
	queryKey: adminKeys.client(id),
	queryFn: () => fetchClient({ data: id })
});
var leadsQuery = () => queryOptions({
	queryKey: adminKeys.leads(),
	queryFn: () => fetchLeads()
});
var agentsQuery = () => queryOptions({
	queryKey: adminKeys.agents(),
	queryFn: () => fetchAgents()
});
var activitiesQuery = (f = {}) => queryOptions({
	queryKey: adminKeys.activities(f),
	queryFn: () => fetchActivities({ data: f })
});
var appointmentsQuery = () => queryOptions({
	queryKey: adminKeys.appointments(),
	queryFn: () => fetchAppointments()
});
var documentsQuery = () => queryOptions({
	queryKey: adminKeys.documents(),
	queryFn: () => fetchDocuments()
});
var tasksQuery = () => queryOptions({
	queryKey: adminKeys.tasks(),
	queryFn: () => fetchTasks()
});
var transactionsQuery = () => queryOptions({
	queryKey: adminKeys.transactions(),
	queryFn: () => fetchTransactions()
});
var notificationsQuery = () => queryOptions({
	queryKey: adminKeys.notifications(),
	queryFn: () => fetchNotifications()
});
var dashboardQuery = () => queryOptions({
	queryKey: adminKeys.dashboard(),
	queryFn: () => fetchDashboard()
});
var prioritiesQuery = (agentId) => queryOptions({
	queryKey: adminKeys.priorities(agentId),
	queryFn: () => fetchPriorities({ data: { agentId } })
});
var marketingStatsQuery = () => queryOptions({
	queryKey: adminKeys.marketingStats(),
	queryFn: () => fetchMarketingStats()
});
var automationsQuery = () => queryOptions({
	queryKey: adminKeys.automations(),
	queryFn: () => fetchAutomations()
});
var inactiveLeadsQuery = () => queryOptions({
	queryKey: adminKeys.inactiveLeads(),
	queryFn: () => fetchInactiveLeads()
});
var matchesForClientQuery = (clientId) => queryOptions({
	queryKey: adminKeys.matchesForClient(clientId),
	queryFn: () => fetchMatchesForClient({ data: { clientId } }),
	enabled: Boolean(clientId)
});
var matchesForPropertyQuery = (propertyId) => queryOptions({
	queryKey: adminKeys.matchesForProperty(propertyId),
	queryFn: () => fetchMatchesForProperty({ data: { propertyId } }),
	enabled: Boolean(propertyId)
});
var reportQuery = (key, from, to) => queryOptions({
	queryKey: adminKeys.report(key, from, to),
	queryFn: () => fetchReport({ data: {
		key,
		q: {
			from,
			to
		}
	} })
});
/** Invalidate every list that a write can affect. */
function invalidateAfterWrite(qc) {
	qc.invalidateQueries({ queryKey: adminKeys.all });
}
function useSetPropertyStatus() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (vars) => setPropertyStatus({ data: vars }),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: adminKeys.all });
		}
	});
}
function useCreateProperty() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (vars) => createProperty({ data: vars }),
		onSuccess: () => invalidateAfterWrite(qc)
	});
}
function useUpdateProperty() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (vars) => updateProperty({ data: vars }),
		onSuccess: () => invalidateAfterWrite(qc)
	});
}
function useAddPropertyMedia() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (vars) => addPropertyMedia({ data: vars }),
		onSuccess: () => invalidateAfterWrite(qc)
	});
}
function useUpdatePropertyMedia() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (vars) => updatePropertyMedia({ data: vars }),
		onSuccess: () => invalidateAfterWrite(qc)
	});
}
function useMovePropertyMedia() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (vars) => movePropertyMedia({ data: vars }),
		onSuccess: () => invalidateAfterWrite(qc)
	});
}
function useRemovePropertyMedia() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id) => removePropertyMedia({ data: { id } }),
		onSuccess: () => invalidateAfterWrite(qc)
	});
}
function useCreateClient() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (vars) => createClient({ data: vars }),
		onSuccess: () => invalidateAfterWrite(qc)
	});
}
function useUpdateClient() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (vars) => updateClient({ data: vars }),
		onSuccess: () => invalidateAfterWrite(qc)
	});
}
function useCreateLead() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (vars) => createLead({ data: vars }),
		onSuccess: () => invalidateAfterWrite(qc)
	});
}
function useCreatePublicLead() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (vars) => createPublicLead({ data: vars }),
		onSuccess: () => invalidateAfterWrite(qc)
	});
}
function useUpdateLead() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (vars) => updateLead({ data: vars }),
		onSuccess: () => invalidateAfterWrite(qc)
	});
}
function useMoveLead() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (vars) => moveLead({ data: vars }),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: adminKeys.all });
		}
	});
}
function useCreateAppointment() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (vars) => createAppointment({ data: vars }),
		onSuccess: () => invalidateAfterWrite(qc)
	});
}
function useUpdateAppointment() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (vars) => updateAppointment({ data: vars }),
		onSuccess: () => invalidateAfterWrite(qc)
	});
}
function useSetAppointmentStatus() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (vars) => setAppointmentStatus({ data: vars }),
		onSuccess: () => invalidateAfterWrite(qc)
	});
}
function useSaveViewingReport() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (vars) => saveViewingReport({ data: vars }),
		onSuccess: () => invalidateAfterWrite(qc)
	});
}
function useCreateDocument() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (vars) => createDocument({ data: vars }),
		onSuccess: () => invalidateAfterWrite(qc)
	});
}
function useDeleteDocument() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id) => deleteDocument({ data: id }),
		onSuccess: () => invalidateAfterWrite(qc)
	});
}
function useDeleteProperty() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id) => deleteProperty({ data: { id } }),
		onSuccess: () => invalidateAfterWrite(qc)
	});
}
function useDeleteClient() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id) => deleteClient({ data: { id } }),
		onSuccess: () => invalidateAfterWrite(qc)
	});
}
function useDeleteLead() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id) => deleteLead({ data: { id } }),
		onSuccess: () => invalidateAfterWrite(qc)
	});
}
function useCreateTask() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (vars) => createTask({ data: vars }),
		onSuccess: () => invalidateAfterWrite(qc)
	});
}
function useUpdateTask() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (vars) => updateTask({ data: vars }),
		onSuccess: () => invalidateAfterWrite(qc)
	});
}
function useCreateTransaction() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (vars) => createTransaction({ data: vars }),
		onSuccess: () => invalidateAfterWrite(qc)
	});
}
function useMoveTransactionStage() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (vars) => moveTransactionStage({ data: vars }),
		onSuccess: () => invalidateAfterWrite(qc)
	});
}
function useAddPayment() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (vars) => addPayment({ data: vars }),
		onSuccess: () => invalidateAfterWrite(qc)
	});
}
function useDeleteTransaction() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id) => deleteTransaction({ data: { id } }),
		onSuccess: () => invalidateAfterWrite(qc)
	});
}
function useMarkPaymentPaid() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (vars) => markPaymentPaid({ data: vars }),
		onSuccess: () => invalidateAfterWrite(qc)
	});
}
function useReadNotification() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id) => readNotification({ data: id }),
		onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.notifications() })
	});
}
function useReadAllNotifications() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: () => readAllNotifications(),
		onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.notifications() })
	});
}
function useCreateCampaign() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (vars) => createCampaign({ data: vars }),
		onSuccess: () => invalidateAfterWrite(qc)
	});
}
function useSendCampaign() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id) => sendCampaign({ data: { id } }),
		onSuccess: () => invalidateAfterWrite(qc)
	});
}
function useDeleteCampaign() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id) => deleteCampaign({ data: { id } }),
		onSuccess: () => invalidateAfterWrite(qc)
	});
}
function useSetFeatured() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (vars) => setFeatured({ data: vars }),
		onSuccess: () => invalidateAfterWrite(qc)
	});
}
function useRemoveFeatured() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (propertyId) => removeFeatured({ data: { propertyId } }),
		onSuccess: () => invalidateAfterWrite(qc)
	});
}
function useSendMatches() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (vars) => sendMatchesToClient({ data: vars }),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: adminKeys.all });
		}
	});
}
function useSetAutomation() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (vars) => setAutomationFlag({ data: vars }),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: adminKeys.automations() });
		}
	});
}
function useCreateCallbackTask() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (leadId) => createCallbackTask({ data: { leadId } }),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: adminKeys.all });
		}
	});
}
//#endregion
export { useUpdateAppointment as $, useCreateTask as A, useMovePropertyMedia as B, useCreateCallbackTask as C, useCreateLead as D, useCreateDocument as E, useDeleteLead as F, useRemovePropertyMedia as G, useReadAllNotifications as H, useDeleteProperty as I, useSendMatches as J, useSaveViewingReport as K, useDeleteTransaction as L, useDeleteCampaign as M, useDeleteClient as N, useCreateProperty as O, useDeleteDocument as P, useSetPropertyStatus as Q, useMarkPaymentPaid as R, useCreateAppointment as S, useCreateClient as T, useReadNotification as U, useMoveTransactionStage as V, useRemoveFeatured as W, useSetAutomation as X, useSetAppointmentStatus as Y, useSetFeatured as Z, reportQuery as _, clientQuery as a, useAddPayment as b, documentsQuery as c, marketingStatsQuery as d, useUpdateClient as et, matchesForClientQuery as f, propertiesQuery as g, prioritiesQuery as h, automationsQuery as i, useUpdateTask as it, useCreateTransaction as j, useCreatePublicLead as k, inactiveLeadsQuery as l, notificationsQuery as m, agentsQuery as n, useUpdateProperty as nt, clientsQuery as o, matchesForPropertyQuery as p, useSendCampaign as q, appointmentsQuery as r, useUpdatePropertyMedia as rt, dashboardQuery as s, activitiesQuery as t, useUpdateLead as tt, leadsQuery as u, tasksQuery as v, useCreateCampaign as w, useAddPropertyMedia as x, transactionsQuery as y, useMoveLead as z };
