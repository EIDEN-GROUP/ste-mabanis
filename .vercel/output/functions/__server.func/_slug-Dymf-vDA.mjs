import { s as getArticle } from "./_ssr/utils-BWXQYj3d.mjs";
import { H as notFound, _ as createFileRoute, g as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-Dymf-vDA.js
var $$splitComponentImporter = () => import("./_slug-Bye32b83.mjs");
var Route = createFileRoute("/actualites/$slug")({
	loader: ({ params }) => {
		const article = getArticle(params.slug);
		if (!article) throw notFound();
		return { article };
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Article introuvable — STE MABANIS" }, {
			name: "robots",
			content: "noindex"
		}] };
		const a = loaderData.article;
		return { meta: [
			{ title: `${a.title} — STE MABANIS` },
			{
				name: "description",
				content: a.excerpt
			},
			{
				property: "og:title",
				content: a.title
			},
			{
				property: "og:description",
				content: a.excerpt
			},
			{
				property: "og:type",
				content: "article"
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
