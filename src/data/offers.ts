export type ShopStore = "Amazon" | "Walmart" | "Target" | "Kohl's" | "Macy's" | "Nordstrom";

export type Offer = {
  match: string;
  band: "budget" | "mid" | "splurge";
  title: string;
  image: string;
  price: string;
  store: ShopStore;
  href: string;
};

type Item = Omit<Offer, "match" | "band">;

/** Real product pages. A price is included only when that store page showed one. Prices change. */
const prenatal: Item = {
  title: "Nature Made Prenatal Multi + DHA, 150 softgels",
  image: "/graphics/shop/prenatal.jpg",
  price: "$30.99",
  store: "Walmart",
  href: "https://www.walmart.com/ip/Nature-Made-Prenatal-Multi-DHA-200mg-150-ct/218542505",
};
const pants: Item = {
  title: "Motherhood maternity work pants",
  image: "/graphics/shop/pants.jpg",
  price: "$32",
  store: "Kohl's",
  href: "https://www.kohls.com/product/prd-7020182/maternity-motherhood-work-pants.jsp",
};
const tee: Item = {
  title: "Motherhood side-ruched V-neck tee",
  image: "/graphics/shop/tee.jpg",
  price: "$12",
  store: "Kohl's",
  href: "https://www.kohls.com/product/prd-6962741/maternity-motherhood-side-ruched-v-neck-tee.jsp",
};
const bra: Item = {
  title: "Kindred Bravely Simply Sublime nursing bra",
  image: "/graphics/shop/bra.jpg",
  price: "$52.90",
  store: "Kohl's",
  href: "https://www.kohls.com/product/prd-7574156/maternity-kindred-bravely-simply-sublime-nursing-bra.jsp",
};
const boppy: Item = {
  title: "Boppy nursing pillow",
  image: "/graphics/shop/boppy.jpg",
  price: "$49.99",
  store: "Target",
  href: "https://www.target.com/p/boppy-nursing-pillow-gray-beige-leaves/-/A-92156302",
};
const bottles6: Item = {
  title: "Dr. Brown’s Options+ narrow bottles, 6 pack",
  image: "/graphics/shop/bottles6.jpg",
  price: "$29.99",
  store: "Target",
  href: "https://www.target.com/p/dr-brown-39-s-8-fl-oz-options-narrow-anti-colic-baby-bottle-6pk/-/A-89486518",
};
const bottles2: Item = {
  title: "Dr. Brown’s silicone bottles, 2 pack",
  image: "/graphics/shop/bottles2.jpg",
  price: "$16.99",
  store: "Target",
  href: "https://www.target.com/p/dr-brown-s-silicone-baby-bottles-9-fl-oz-2pk/-/A-95252782",
};
const halo: Item = {
  title: "HALO SleepSack organic cotton swaddle, newborn",
  image: "/graphics/shop/halo.jpg",
  price: "$34.99",
  store: "Target",
  href: "https://www.target.com/p/halo-innovations-sleepsack-100-cotton-swaddle-wrap-cream-nb/-/A-88103964",
};
const kyte: Item = {
  title: "Kyte Baby 1.0 TOG sleep bag",
  image: "/graphics/shop/sack.jpg",
  price: "",
  store: "Macy's",
  href: "https://www.macys.com/shop/product/kyte-baby-baby-1.0-tog-sleep-bag?ID=19306496",
};
const stroller: Item = {
  title: "Graco Ready2Jet compact stroller",
  image: "/graphics/shop/stroller.jpg",
  price: "$189.99",
  store: "Walmart",
  href: "https://www.walmart.com/ip/Graco-Ready2Jet-Compact-Infant-Toddler-Stroller-Splatter-Art-1-Count/12512574204",
};
const bag: Item = {
  title: "Charlie Lou Baby diaper bag",
  image: "/graphics/shop/bag.jpg",
  price: "",
  store: "Nordstrom",
  href: "https://www.nordstrom.com/s/vegan-leather-large-diaper-bag-2-insulated-bottle-pockets-checkered-crossbody-strap-stroller-straps-changing-mat-included/8385675",
};
const sippy: Item = {
  title: "Munchkin Miracle 360 sippy cup, 10 oz",
  image: "/graphics/shop/sippy.jpg",
  price: "$5.99",
  store: "Target",
  href: "https://www.target.com/p/munchkin-miracle-360-sippy-cup-10oz-green/-/A-77286443",
};
const cream: Item = {
  title: "Lansinoh lanolin nipple cream, 1.41 oz",
  image: "/graphics/shop/cream.jpg",
  price: "",
  store: "Target",
  href: "https://www.target.com/p/lansinoh-lanolin-nipple-cream-for-breastfeeding-essentials-1-41oz/-/A-92544",
};
const joggers: Item = {
  title: "Motherhood cozy jogger pants",
  image: "/graphics/shop/joggers.jpg",
  price: "$40",
  store: "Kohl's",
  href: "https://www.kohls.com/product/prd-8185875/maternity-motherhood-cozy-jogger-pants.jsp",
};
const peri: Item = {
  title: "Frida Mom upside down peri bottle",
  image: "/graphics/shop/peri.jpg",
  price: "",
  store: "Target",
  href: "https://www.target.com/p/frida-mom-upside-down-peri-bottle/-/A-76199073",
};
const swaddle: Item = {
  title: "Cloud Island muslin swaddle, 3 pack",
  image: "/graphics/shop/swaddle.jpg",
  price: "",
  store: "Target",
  href: "https://www.target.com/p/i-love-you-muslin-swaddle-blanket-black-white-3pk-cloud-island-8482/-/A-76167160",
};
const tula: Item = {
  title: "Tula Glow & Get It cooling eye balm",
  image: "/graphics/shop/tula-eye.jpg",
  price: "$38",
  store: "Target",
  href: "https://www.target.com/p/tula-skincare-get-it-cooling-38-brightening-eye-balm-glow-0-35oz-ulta-beauty/-/A-82557532",
};
const bodyPillow: Item = {
  title: "Room Essentials body pillow",
  image: "/graphics/shop/pillow.jpg",
  price: "$10",
  store: "Target",
  href: "https://www.target.com/p/body-pillow-white-room-essentials-8482/-/A-52291074",
};
const bottle: Item = {
  title: "Simple Modern 22oz straw water bottle",
  image: "/graphics/shop/bottle.jpg",
  price: "",
  store: "Target",
  href: "https://www.target.com/p/simple-modern-22oz-summit-water-bottle-black/-/A-94405020",
};
const crackers: Item = {
  title: "Kellogg’s Krispy saltine crackers, 16 oz",
  image: "/graphics/shop/crackers.jpg",
  price: "",
  store: "Walmart",
  href: "https://www.walmart.com/ip/Kellogg-s-Krispy-Original-Saltine-Crackers-Soup-Crackers-16-oz/11045755",
};
const socks: Item = {
  title: "Auden cloud soft lounge socks, 2 pack",
  image: "/graphics/shop/socks.jpg",
  price: "",
  store: "Target",
  href: "https://www.target.com/p/women-39-s-full-terry-with-chunky-ribbed-cuff-cloud-soft-lounge-2pk-ankle-socks-auden-8482-oatmeal-heather-brown-heather-4-10/-/A-94631246",
};
const book: Item = {
  title: "Goodnight Moon 123 board book",
  image: "/graphics/shop/book.jpg",
  price: "$7.20",
  store: "Target",
  href: "https://www.target.com/p/goodnight-moon-123-padded-board-book-by-margaret-wise-brown/-/A-90029371",
};
const hat: Item = {
  title: "Cloud Island knotted hats, 3 pack",
  image: "/graphics/shop/hat.jpg",
  price: "",
  store: "Target",
  href: "https://www.target.com/p/baby-boys-39-3pk-ribbed-hats-cloud-island-8482-blue-tan-white-newborn/-/A-1008745567",
};

function rows(matches: string[], band: Offer["band"], item: Item): Offer[] {
  return matches.map((match) => ({ match, band, ...item }));
}

export const OFFERS: Offer[] = [
  ...rows(["prenatal vitamin"], "mid", prenatal),
  ...rows(["maternity pants"], "mid", pants),
  ...rows(["maternity top"], "mid", tee),
  ...rows(["maternity clothes"], "mid", joggers),
  ...rows(["nursing bra"], "mid", bra),
  ...rows(["nursing pillow"], "mid", boppy),
  ...rows(["baby bottles", "breastfeeding bottles", "baby formula bottles", "breastfeeding and formula bottles", "baby bottle"], "mid", bottles6),
  ...rows(["baby bottles", "breastfeeding bottles", "baby formula bottles", "breastfeeding and formula bottles", "baby bottle"], "budget", bottles2),
  ...rows(["baby sleep sack", "sleep sack"], "mid", halo),
  ...rows(["baby sleep sack", "sleep sack"], "splurge", kyte),
  ...rows(["baby stroller", "toddler stroller", "newborn stroller"], "mid", stroller),
  ...rows(["diaper bag"], "splurge", bag),
  ...rows(["sippy cup"], "budget", sippy),
  ...rows(["nipple cream"], "mid", cream),
  ...rows(["peri bottle"], "mid", peri),
  ...rows(["unisex muslin swaddle"], "mid", swaddle),
  ...rows(["tula glow eye balm"], "mid", tula),
  ...rows(["extra bed pillow", "body pillow"], "mid", bodyPillow),
  ...rows(["straw water bottle"], "mid", bottle),
  ...rows(["bland crackers", "saltine crackers"], "mid", crackers),
  ...rows(["comfortable socks"], "mid", socks),
  ...rows(["board books", "goodnight moon"], "mid", book),
  ...rows(["soft baby hat"], "mid", hat),
];

export function offerFor(query: string): Offer | null {
  const q = query.toLowerCase();
  const band: Offer["band"] = q.includes("budget") || q.includes("second hand") ? "budget" : q.includes("best") ? "splurge" : "mid";
  const hits = OFFERS.filter((offer) => q.includes(offer.match));
  if (!hits.length) return null;
  const same = hits.filter((offer) => offer.band === band);
  const pool = same.length ? same : hits;
  return [...pool].sort((a, b) => b.match.length - a.match.length)[0] ?? null;
}
