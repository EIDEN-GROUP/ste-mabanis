import { o as getAgent, p as propertiesByAgent } from "./_ssr/utils-BTE8P7Sw.mjs";
import { H as notFound, _ as createFileRoute, g as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-DaOh-eBx.js
var $$splitComponentImporter = () => import("./_slug-DbP2IXgA.mjs");
var Route = createFileRoute("/equipe/$slug")({
	loader: ({ params }) => {
		const agent = getAgent(params.slug);
		if (!agent) throw notFound();
		return {
			agent,
			listings: propertiesByAgent(agent.slug)
		};
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Conseiller introuvable — STE MABANIS" }, {
			name: "robots",
			content: "noindex"
		}] };
		const a = loaderData.agent;
		const title = `${a.name} — ${a.role} | STE MABANIS`;
		const description = `${a.name}, ${a.years} ans d'expérience à Agadir. Spécialités : ${a.expertise}.`;
		return { meta: [
			{ title },
			{
				name: "description",
				content: description
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: description
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
