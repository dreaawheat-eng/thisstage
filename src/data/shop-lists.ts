import type { Card } from "@/data/digest";
import { productArt } from "@/lib/graphics";
import type { StageId } from "@/lib/types";

export type ShopList = {
  id: string;
  title: string;
  cards: Card[];
};

type Piece = { id: string; name: string; line: string; query: string; image?: string };
type Spec = { id: string; title: string; pool: Piece[] };

const piece = (id: string, name: string, line: string, query: string, image?: string): Piece => ({ id, name, line, query, image });

const PREGNANT: Spec[] = [
  {
    id: "clothes",
    title: "Clothes that grow with you.",
    pool: [
      piece("pants", "Pants with room", "A softer waist.", "maternity pants"),
      piece("top", "A longer top", "Covers you when you sit.", "maternity top"),
      piece("bra", "A softer bra", "The one that does not dig.", "nursing bra"),
      piece("lounge", "Something soft for home", "You will live in it.", "maternity clothes"),
    ],
  },
  {
    id: "off",
    title: "Take the day off.",
    pool: [
      piece("pillow", "An extra pillow", "For your side, or just the couch.", "extra bed pillow"),
      piece("water", "Water within reach", "A bottle that opens with one hand.", "straw water bottle"),
      piece("snack", "A snack that asks nothing", "Bland is fine.", "bland crackers", "/graphics/product-cup.jpg"),
      piece("socks", "Softer socks", "The small comfort.", "comfortable socks"),
    ],
  },
  {
    id: "soon",
    title: "They will be here before you know it.",
    pool: [
      piece("blanket", "A unisex swaddle", "Soft, and not a whole nursery.", "unisex muslin swaddle"),
      piece("hat", "A soft hat", "For the first time outside.", "soft baby hat"),
      piece("books", "Goodnight Moon 123", "A board book.", "board books"),
    ],
  },
];

const NEWBORN: Spec[] = [
  {
    id: "eyes",
    title: "You barely slept.",
    pool: [
      piece("eyes", "Cooling eye balm", "One swipe under the eyes. No mess.", "tula glow eye balm"),
      piece("water", "Water for the night feed", "You forget. Put it where you sit.", "straw water bottle"),
      piece("snack", "One-hand food", "Protein if you can. Crumbs if that is the night.", "one hand snacks", "/graphics/product-cup.jpg"),
    ],
  },
  {
    id: "you",
    title: "Take care of you.",
    pool: [
      piece("peri", "Peri bottle", "Use it. Ask your clinician what else the tear needs.", "peri bottle"),
      piece("pads", "Postpartum pads", "The big ones, for the first days.", "postpartum pads"),
      piece("joggers", "Pants that do not press", "A waistband is optional.", "maternity clothes"),
      piece("underwear", "Soft underwear", "Mesh is fine. So is what the hospital sent.", "postpartum underwear"),
    ],
  },
  {
    id: "feed",
    title: "Feeding, again.",
    pool: [
      piece("bottle", "Bottles, as few as you can wash", "Slow flow. Not a cabinet of them.", "baby bottles"),
      piece("pillow", "A nursing pillow", "For your arms, now that feeding is the day.", "nursing pillow"),
      piece("cream", "Nipple cream", "Comfort. Not a latch diagnosis.", "nipple cream"),
      piece("bib", "A cloth you can spare", "Milk goes everywhere.", "soft baby bibs"),
    ],
  },
];

const AWAKE: Spec[] = [
  {
    id: "out",
    title: "You want out of the house.",
    pool: [
      piece("stroller", "A stroller you will fold", "The one that gets you out the door.", "baby stroller"),
      piece("carrier", "Or a carrier", "Hands free. Check the weight range.", "newborn baby carrier"),
      piece("hat", "A hat", "Sun on a short walk.", "soft baby hat"),
      piece("tote", "A bag that is not huge", "Diapers, a spare, and you.", "diaper bag"),
    ],
  },
  {
    id: "floor",
    title: "They’re awake. You’re on the floor.",
    pool: [
      piece("mat", "A mat", "Somewhere that is not the couch.", "baby play mat"),
      piece("play", "One thing to bat at", "Not a bin of toys.", "baby toys"),
      piece("teether", "Something to mouth", "If everything is going in the mouth.", "baby teether"),
      piece("books", "A book you can prop", "Your voice is the point.", "board books"),
    ],
  },
  {
    id: "near",
    title: "You need a snack too.",
    pool: [
      piece("snack", "A snack you can eat one-handed", "Their food comes later.", "one hand snacks", "/graphics/product-cup.jpg"),
      piece("bottle", "The bottle you are actually using", "Or skip it if you are not.", "baby bottles"),
      piece("bib", "A bib", "Spit-up is the outfit.", "soft baby bibs"),
      piece("water", "Your water", "Still the most useful thing in the room.", "straw water bottle"),
    ],
  },
];

const BITES: Spec[] = [
  {
    id: "bites",
    title: "First foods are messy.",
    pool: [
      piece("cup", "An open cup", "Water, mostly.", "baby cups"),
      piece("bib", "A bib with a pocket", "Catches the mess.", "soft baby bibs"),
      piece("snackcup", "A cup for puffs", "Whatever you are already offering.", "toddler snack cup"),
      piece("proof", "A cup with a lid", "For the drops.", "sippy cup"),
    ],
  },
  {
    id: "move",
    title: "They won’t stay still.",
    pool: [
      piece("shoes", "Soft shoes", "For outside.", "baby shoes"),
      piece("gate", "A gate", "The doorway they found.", "baby gate"),
      piece("latch", "A cupboard latch", "At their height.", "baby proof latch"),
      piece("stroller", "A stroller", "For the walk, not the house.", "baby stroller"),
    ],
  },
  {
    id: "floor",
    title: "Back on the floor.",
    pool: [
      piece("mat", "The mat", "Washable is the feature.", "baby play mat"),
      piece("play", "One toy that stays out", "The rest can be put away.", "baby toys"),
      piece("books", "Board books", "Chewable is normal.", "board books"),
      piece("hat", "A hat for the door", "The outing is still short.", "soft baby hat"),
    ],
  },
];

const TODDLER: Spec[] = [
  {
    id: "shoes",
    title: "The shoes come right off.",
    pool: [
      piece("tshoes", "Flexible shoes", "They have to bend with the foot.", "toddler shoes"),
      piece("hat", "A hat they might keep on", "Might.", "toddler sun hat"),
      piece("socks", "Socks that do not vanish", "Grip if the floors are slick.", "toddler socks"),
    ],
  },
  {
    id: "snack",
    title: "Someone is hungry again.",
    pool: [
      piece("snackcup", "A snack cup", "Puffs, crackers, or the leftovers.", "toddler snack cup"),
      piece("cup", "Their cup", "The one they will not throw. Good luck.", "toddler cups"),
      piece("proof", "A cup with a lid", "For the car, not a doctrine.", "sippy cup"),
      piece("bib", "A bib, still", "Dinner is a sport.", "toddler bib"),
    ],
  },
  {
    id: "climb",
    title: "They climb everything.",
    pool: [
      piece("gate", "A gate at the stairs", "The one place that matters.", "baby gate"),
      piece("latch", "Latches at their reach", "Cleaner and snacks live there.", "baby proof latch"),
      piece("mat", "A soft landing", "For the jump they will invent.", "toddler play mat"),
      piece("play", "Something that is not a screen", "A box counts. This is the backup.", "toddler toys"),
    ],
  },
];

const BY_STAGE: Record<StageId, Spec[]> = {
  p4: PREGNANT,
  p9: PREGNANT,
  p14: PREGNANT,
  p21: PREGNANT,
  p28: PREGNANT,
  p34: PREGNANT,
  p38: PREGNANT,
  b0: NEWBORN,
  b2: NEWBORN,
  b6: AWAKE,
  b4m: AWAKE,
  b6m: BITES,
  b9: BITES,
  b15: TODDLER,
};

function card(item: Piece): Card {
  return {
    id: `${item.id}:feed`,
    kind: "product",
    sensitive: false,
    name: item.name,
    line: item.line,
    tags: ["Today", "Partner", "This stage"],
    why: item.line,
    image: item.image ?? productArt(item.id),
    query: item.query,
  };
}

function daily(pool: Piece[], day: number): Piece[] {
  const count = Math.min(3, pool.length);
  if (!count) return [];
  const start = ((day % pool.length) + pool.length) % pool.length;
  return Array.from({ length: count }, (_, index) => pool[(start + index) % pool.length]);
}

function soonTitle(name: string): string {
  const clean = name.trim();
  if (!clean || clean.toLowerCase() === "baby") return "They will be here before you know it.";
  return `${clean} will be here before you know it.`;
}

export function shopLists(stageId: StageId, day: number, babyName = ""): ShopList[] {
  const specs = (BY_STAGE[stageId] ?? PREGNANT).slice(0, 3).map((spec) =>
    spec.id === "soon" ? { ...spec, title: soonTitle(babyName) } : spec,
  );
  return specs.map((spec) => ({
    id: spec.id,
    title: spec.title,
    cards: daily(spec.pool, day).map(card),
  }));
}
