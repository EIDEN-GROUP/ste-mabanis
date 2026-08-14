import { c as getLocation, m as propertiesByLocation } from "./_ssr/utils-BWXQYj3d.mjs";
import { H as notFound, _ as createFileRoute, g as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-m6fwD15U.js
var $$splitComponentImporter = () => import("./_slug-DT2cpPK8.mjs");
var Route = createFileRoute("/quartiers/$slug")({
	loader: ({ params }) => {
		const location = getLocation(params.slug);
		if (!location) throw notFound();
		return {
			location,
			listings: propertiesByLocation(location.slug)
		};
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Quartier introuvable — STE MABANIS" }, {
			name: "robots",
			content: "noindex"
		}] };
		const l = loaderData.location;
		const title = `Immobilier à ${l.name} (${l.city}) — STE MABANIS`;
		return { meta: [
			{ title },
			{
				name: "description",
				content: `${l.intro} Prix constatés : ${l.priceRange}.`
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: l.intro
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
