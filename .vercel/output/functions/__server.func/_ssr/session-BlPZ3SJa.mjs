import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as AGENT_STAFF_ROLE, o as STAFF_ROLES } from "./types-CH15H5aZ.mjs";
import { E as seedAgents } from "./primitives-BRdCR_bJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/session-BlPZ3SJa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ALL = [
	"directrice",
	"commercial",
	"assistant"
];
var SALES = ["directrice", "commercial"];
var ACTION_ROLES = {
	"screen.design": ["directrice"],
	"screen.rapports": ["directrice"],
	"screen.automatisations": ["directrice"],
	"screen.marketing": ["directrice"],
	"screen.portail-client": ["directrice"],
	"screen.matching": SALES,
	"screen.crm": SALES,
	"screen.agenda": ALL,
	"screen.transactions": ALL,
	"screen.documents": ALL,
	"screen.taches": ALL,
	"screen.proprietes": ALL,
	"screen.clients": ALL,
	"property.create": ["directrice"],
	"property.edit": SALES,
	"property.delete": ["directrice"],
	"client.create": ALL,
	"client.edit": ALL,
	"client.delete": ["directrice"],
	"lead.move": SALES,
	"lead.convert": SALES,
	"lead.delete": ["directrice"],
	"appointment.manage": ALL,
	"transaction.manage": ["directrice"],
	"transaction.delete": ["directrice"],
	"document.manage": ["directrice", "assistant"],
	"task.manage": ALL,
	"report.export": ["directrice"],
	"campaign.manage": ["directrice"],
	"automation.toggle": ["directrice"],
	"match.send": SALES
};
function can(role, action) {
	return ACTION_ROLES[action].includes(role);
}
var ROLE_STORAGE_KEY = "mabanis:admin:role";
var AGENT_STORAGE_KEY = "mabanis:admin:agent";
var VALID_ROLES = [
	"directrice",
	"commercial",
	"assistant"
];
var SessionContext = (0, import_react.createContext)(null);
function agentsFor(role) {
	return seedAgents.filter((a) => AGENT_STAFF_ROLE[a.id] === role);
}
function SessionProvider({ children }) {
	const [role, setRole] = (0, import_react.useState)("directrice");
	const [agentId, setAgentId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const savedRole = localStorage.getItem(ROLE_STORAGE_KEY);
		if (VALID_ROLES.includes(savedRole)) {
			setRole(savedRole);
			const savedAgent = localStorage.getItem(AGENT_STORAGE_KEY);
			if (savedAgent) setAgentId(savedAgent);
		}
	}, []);
	const switchRole = (0, import_react.useCallback)((next) => {
		setRole(next);
		localStorage.setItem(ROLE_STORAGE_KEY, next);
		if (next !== "commercial") {
			setAgentId(null);
			localStorage.removeItem(AGENT_STORAGE_KEY);
		}
	}, []);
	const switchAgent = (0, import_react.useCallback)((next) => {
		setAgentId(next);
		if (next) localStorage.setItem(AGENT_STORAGE_KEY, next);
		else localStorage.removeItem(AGENT_STORAGE_KEY);
	}, []);
	const value = (0, import_react.useMemo)(() => {
		const effectiveAgent = role === "commercial" && agentId && agentsFor("commercial").some((a) => a.id === agentId) ? agentId : role === "commercial" ? agentsFor("commercial")[0]?.id ?? null : agentId;
		return {
			role,
			roleInfo: STAFF_ROLES[role],
			agentId: effectiveAgent,
			switchRole,
			switchAgent,
			can: (action) => can(role, action)
		};
	}, [
		role,
		agentId,
		switchRole,
		switchAgent
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionContext.Provider, {
		value,
		children
	});
}
function useSession() {
	const ctx = (0, import_react.useContext)(SessionContext);
	if (!ctx) throw new Error("useSession must be used inside <SessionProvider>");
	return ctx;
}
/** True when the current session is scoped to a single agent's records. */
function useAgentScope() {
	const { role, agentId } = useSession();
	return role === "commercial" ? agentId : null;
}
function useCan(action) {
	const { can: has } = useSession();
	return has(action);
}
function useAgentsForRole(role) {
	return (0, import_react.useMemo)(() => agentsFor(role), [role]);
}
//#endregion
export { useCan as a, useAgentsForRole as i, SessionProvider as n, useSession as o, useAgentScope as r, ACTION_ROLES as t };
