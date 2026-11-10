import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { t as offerFor } from "./offers-ClYK2DmF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products.functions-Dky7JRfo.js
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
var lookupProducts_createServerFn_handler = createServerRpc({
	id: "423bb7e5835652abe514e0b2c2b4fcd6f6669bf575dcc00a18fc8a5101e91485",
	name: "lookupProducts",
	filename: "src/lib/products.functions.ts"
}, (opts) => lookupProducts.__executeServer(opts));
var lookupProducts = createServerFn({ method: "POST" }).validator((input) => {
	return { queries: [...new Set((input?.queries ?? []).map((query) => query.trim()).filter(Boolean))].slice(0, 24) };
}).handler(lookupProducts_createServerFn_handler, async ({ data }) => {
	const found = [];
	for (const query of data.queries) {
		const hit = fromOffer(query);
		if (hit) found.push(hit);
	}
	return found;
});
//#endregion
export { lookupProducts_createServerFn_handler };
