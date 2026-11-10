import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { t as offerFor } from "./offers-ClYK2DmF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products.functions-D8BGsSaF.js
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
function fromOffer(query) {
	const offer = offerFor(query);
	if (!offer) return null;
	return {
		query,
		title: offer.title,
		image: offer.image,
		price: offer.price,
		store: offer.store,
		href: offer.href
	};
}
/** Checked store pages only. Department-store sites block a live scrape, and a loose product search was returning the wrong item. */
function catalogProduct(query) {
	return fromOffer(query);
}
var lookupProducts = createServerFn({ method: "POST" }).validator((input) => {
	return { queries: [...new Set((input?.queries ?? []).map((query) => query.trim()).filter(Boolean))].slice(0, 24) };
}).handler(createSsrRpc("423bb7e5835652abe514e0b2c2b4fcd6f6669bf575dcc00a18fc8a5101e91485"));
//#endregion
export { createSsrRpc as n, lookupProducts as r, catalogProduct as t };
