//#region node_modules/.nitro/vite/services/ssr/assets/types-CH15H5aZ.js
var PROPERTY_STATUSES = [
	"draft",
	"available",
	"reserved",
	"under_offer",
	"sold",
	"rented",
	"archived"
];
/** Statuses that still belong in public search results. */
var ACTIVE_PROPERTY_STATUSES = [
	"available",
	"reserved",
	"under_offer"
];
var LEAD_SOURCES = [
	"site_web",
	"recommandation",
	"portail",
	"reseaux_sociaux",
	"telephone",
	"walk_in"
];
var STAFF_ROLES = {
	directrice: {
		label: "Directrice",
		tagline: "Direction & administration",
		capabilities: [
			"Accès complet à tous les espaces",
			"Gestion du portefeuille, des ventes et du budget",
			"Rapports, automatisations et marketing",
			"Seule autorisée à supprimer des données"
		]
	},
	commercial: {
		label: "Commercial",
		tagline: "Ventes & relation client",
		capabilities: [
			"Voir et éditer les biens",
			"Gérer ses propres clients, leads et visites",
			"Matching et envoi de sélections",
			"Lecture de ses transactions et documents"
		]
	},
	assistant: {
		label: "Assistant direction",
		tagline: "Support opérationnel",
		capabilities: [
			"Agenda et visites de l'agence",
			"Documents et tâches",
			"Clients : création et mise à jour",
			"Lecture seule des biens et transactions"
		]
	}
};
/** Which seeded agent plays which staff role in the demo workspace. */
var AGENT_STAFF_ROLE = {
	"yassine-el-amrani": "directrice",
	"salma-bouhaddou": "commercial",
	"nadia-lahlou": "commercial",
	"karim-ouhssaine": "assistant"
};
var PIPELINE_STAGES = [
	"new",
	"contacted",
	"qualified",
	"viewing",
	"offer",
	"negotiation",
	"won",
	"lost"
];
var TRANSACTION_STAGES = [
	"interest",
	"visit",
	"offer",
	"negotiation",
	"agreement",
	"contract",
	"payment",
	"closing"
];
//#endregion
export { PROPERTY_STATUSES as a, PIPELINE_STAGES as i, AGENT_STAFF_ROLE as n, STAFF_ROLES as o, LEAD_SOURCES as r, TRANSACTION_STAGES as s, ACTIVE_PROPERTY_STATUSES as t };
