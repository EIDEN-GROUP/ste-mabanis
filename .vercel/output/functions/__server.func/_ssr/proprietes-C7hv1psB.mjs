import { _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/proprietes-C7hv1psB.js
var $$splitComponentImporter = () => import("./proprietes-CRRqA5Tz.mjs");
var Route = createFileRoute("/proprietes/")({
	validateSearch: (search) => ({
		transaction: search["transaction"] === "location" ? "location" : "vente",
		lieu: typeof search["lieu"] === "string" ? search["lieu"] : "",
		type: typeof search["type"] === "string" ? search["type"] : "",
		prixMax: Number(search["prixMax"]) || 0,
		surfaceMin: Number(search["surfaceMin"]) || 0,
		chambres: Number(search["chambres"]) || 0,
		tri: typeof search["tri"] === "string" ? search["tri"] : "recent"
	}),
	head: () => ({ meta: [
		{ title: "Propriétés à vendre et à louer à Agadir — STE MABANIS" },
		{
			name: "description",
			content: "Parcourez les villas, appartements, penthouses et bureaux proposés par STE MABANIS à Agadir, Founty, la Marina et Taghazout. Filtres par prix, surface et chambres."
		},
		{
			property: "og:title",
			content: "Propriétés à vendre et à louer à Agadir"
		},
		{
			property: "og:description",
			content: "Le portefeuille complet de STE MABANIS, filtrable par quartier, type et budget."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
