import { a as formatMAD, l as getProperty } from "./_ssr/utils-BWXQYj3d.mjs";
import { H as notFound, _ as createFileRoute, g as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-Cqy-Pet5.js
var $$splitComponentImporter = () => import("./_slug-tiP2FA_o.mjs");
var Route = createFileRoute("/proprietes/$slug")({
	loader: ({ params }) => {
		const property = getProperty(params.slug);
		if (!property) throw notFound();
		return { property };
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Bien indisponible — STE MABANIS" }, {
			name: "robots",
			content: "noindex"
		}] };
		const p = loaderData.property;
		const title = `${p.title} — ${formatMAD(p.price)} MAD | STE MABANIS`;
		const description = `${p.type} de ${p.surface} m² à ${p.neighborhood}, ${p.city}. ${p.bedrooms} chambres, ${p.bathrooms} salles de bain. Référence ${p.reference}.`;
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
