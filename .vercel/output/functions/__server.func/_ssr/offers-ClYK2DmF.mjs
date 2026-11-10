//#region node_modules/.nitro/vite/services/ssr/assets/offers-ClYK2DmF.js
/** Real product pages. A price is included only when that store page showed one. Prices change. */
var prenatal = {
	title: "Nature Made Prenatal Multi + DHA, 150 softgels",
	image: "/graphics/shop/prenatal.jpg",
	price: "$30.99",
	store: "Walmart",
	href: "https://www.walmart.com/ip/Nature-Made-Prenatal-Multi-DHA-200mg-150-ct/218542505"
};
var pants = {
	title: "Motherhood maternity work pants",
	image: "/graphics/shop/pants.jpg",
	price: "$32",
	store: "Kohl's",
	href: "https://www.kohls.com/product/prd-7020182/maternity-motherhood-work-pants.jsp"
};
var tee = {
	title: "Motherhood side-ruched V-neck tee",
	image: "/graphics/shop/tee.jpg",
	price: "$12",
	store: "Kohl's",
	href: "https://www.kohls.com/product/prd-6962741/maternity-motherhood-side-ruched-v-neck-tee.jsp"
};
var bra = {
	title: "Kindred Bravely Simply Sublime nursing bra",
	image: "/graphics/shop/bra.jpg",
	price: "$52.90",
	store: "Kohl's",
	href: "https://www.kohls.com/product/prd-7574156/maternity-kindred-bravely-simply-sublime-nursing-bra.jsp"
};
var boppy = {
	title: "Boppy nursing pillow",
	image: "/graphics/shop/boppy.jpg",
	price: "$49.99",
	store: "Target",
	href: "https://www.target.com/p/boppy-nursing-pillow-gray-beige-leaves/-/A-92156302"
};
var bottles6 = {
	title: "Dr. Brown’s Options+ narrow bottles, 6 pack",
	image: "/graphics/shop/bottles6.jpg",
	price: "$29.99",
	store: "Target",
	href: "https://www.target.com/p/dr-brown-39-s-8-fl-oz-options-narrow-anti-colic-baby-bottle-6pk/-/A-89486518"
};
var bottles2 = {
	title: "Dr. Brown’s silicone bottles, 2 pack",
	image: "/graphics/shop/bottles2.jpg",
	price: "$16.99",
	store: "Target",
	href: "https://www.target.com/p/dr-brown-s-silicone-baby-bottles-9-fl-oz-2pk/-/A-95252782"
};
var halo = {
	title: "HALO SleepSack organic cotton swaddle, newborn",
	image: "/graphics/shop/halo.jpg",
	price: "$34.99",
	store: "Target",
	href: "https://www.target.com/p/halo-innovations-sleepsack-100-cotton-swaddle-wrap-cream-nb/-/A-88103964"
};
var kyte = {
	title: "Kyte Baby 1.0 TOG sleep bag",
	image: "/graphics/shop/sack.jpg",
	price: "",
	store: "Macy's",
	href: "https://www.macys.com/shop/product/kyte-baby-baby-1.0-tog-sleep-bag?ID=19306496"
};
var stroller = {
	title: "Graco Ready2Jet compact stroller",
	image: "/graphics/shop/stroller.jpg",
	price: "$189.99",
	store: "Walmart",
	href: "https://www.walmart.com/ip/Graco-Ready2Jet-Compact-Infant-Toddler-Stroller-Splatter-Art-1-Count/12512574204"
};
var bag = {
	title: "Charlie Lou Baby diaper bag",
	image: "/graphics/shop/bag.jpg",
	price: "",
	store: "Nordstrom",
	href: "https://www.nordstrom.com/s/vegan-leather-large-diaper-bag-2-insulated-bottle-pockets-checkered-crossbody-strap-stroller-straps-changing-mat-included/8385675"
};
var sippy = {
	title: "Munchkin Miracle 360 sippy cup, 10 oz",
	image: "/graphics/shop/sippy.jpg",
	price: "$5.99",
	store: "Target",
	href: "https://www.target.com/p/munchkin-miracle-360-sippy-cup-10oz-green/-/A-77286443"
};
var cream = {
	title: "Lansinoh lanolin nipple cream, 1.41 oz",
	image: "/graphics/shop/cream.jpg",
	price: "",
	store: "Target",
	href: "https://www.target.com/p/lansinoh-lanolin-nipple-cream-for-breastfeeding-essentials-1-41oz/-/A-92544"
};
var peri = {
	title: "Frida Mom upside down peri bottle",
	image: "/graphics/shop/peri.jpg",
	price: "",
	store: "Target",
	href: "https://www.target.com/p/frida-mom-upside-down-peri-bottle/-/A-76199073"
};
function rows(matches, band, item) {
	return matches.map((match) => ({
		match,
		band,
		...item
	}));
}
var OFFERS = [
	...rows(["prenatal vitamin"], "mid", prenatal),
	...rows(["maternity pants"], "mid", pants),
	...rows(["maternity top"], "mid", tee),
	...rows(["nursing bra"], "mid", bra),
	...rows(["nursing pillow"], "mid", boppy),
	...rows([
		"baby bottles",
		"breastfeeding bottles",
		"baby formula bottles",
		"breastfeeding and formula bottles",
		"baby bottle"
	], "mid", bottles6),
	...rows([
		"baby bottles",
		"breastfeeding bottles",
		"baby formula bottles",
		"breastfeeding and formula bottles",
		"baby bottle"
	], "budget", bottles2),
	...rows(["baby sleep sack", "sleep sack"], "mid", halo),
	...rows(["baby sleep sack", "sleep sack"], "splurge", kyte),
	...rows([
		"baby stroller",
		"toddler stroller",
		"newborn stroller"
	], "mid", stroller),
	...rows(["diaper bag"], "splurge", bag),
	...rows(["sippy cup"], "budget", sippy),
	...rows(["nipple cream"], "mid", cream),
	...rows(["peri bottle"], "mid", peri)
];
function offerFor(query) {
	const q = query.toLowerCase();
	const band = q.includes("budget") || q.includes("second hand") ? "budget" : q.includes("best") ? "splurge" : "mid";
	const hits = OFFERS.filter((offer) => q.includes(offer.match));
	if (!hits.length) return null;
	const same = hits.filter((offer) => offer.band === band);
	return [...same.length ? same : hits].sort((a, b) => b.match.length - a.match.length)[0] ?? null;
}
//#endregion
export { offerFor as t };
