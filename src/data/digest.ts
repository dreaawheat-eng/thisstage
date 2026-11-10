import type { Band, Feed, Gear, Mat, Phase, SleepPlan, StageId, Style, Tags } from "@/lib/types";
import { productArt } from "@/lib/graphics";

export type Card = {
  id: string;
  kind: "product" | "task";
  sensitive: boolean;
  name: string;
  line: string;
  tags: [string, string, string];
  why: string;
  image?: string;
  keywords?: string[];
  query?: string;
  steps?: string[];
  price?: string;
  liveHref?: string;
  liveStore?: "Amazon" | "Walmart" | "Target" | "Kohl's" | "Macy's" | "Nordstrom";
};

export type Creator = { name: string; where: string; why: string };

export type FeaturedCreator = {
  name: string;
  post: string;
  image: string;
  avatar: string;
  href: string;
  initials: string;
};

export type MealSlot = "Dinner" | "Snack" | "Breakfast" | "Drink";

export type Recipe = {
  id: string;
  from: string;
  title: string;
  line: string;
  time: string;
  slot: MealSlot;
  href: string;
  image?: string;
};

export type StageMeta = {
  id: StageId;
  phase: Phase;
  label: string;
  blurb: [string, string];
  milestone?: string;
  sampleWeek?: number;
};

const BAND_WHY: Record<Band, string> = {
  budget: "you want to stretch the dollar",
  mid: "you usually buy in the middle",
  splurge: "you’ll pay more if it lasts or feels safer",
  thrift: "you’d rather buy it used or make it",
};

const MAT_WHY: Record<Mat, string> = {
  clean: "you want non-toxic and clean",
  lowtox: "you look for low-tox when you can",
  care: "ingredients matter to you some",
  works: "you mostly want what works",
};

const STYLE_WHY: Record<Style, string> = {
  firm: "Kept firm and kind",
  childled: "Kept easy to follow their lead",
  routines: "Kept steady enough for a routine",
  practical: "Kept only if it works today",
};

type Shelf = "lowtox" | "care" | "works";

function shelf(mat: Mat): Shelf {
  if (mat === "care") return "care";
  if (mat === "works") return "works";
  return "lowtox";
}

function why(hook: string, tags: Tags, withMat = true): string {
  const style = STYLE_WHY[tags.style];
  if (!withMat) return `${hook} — ${BAND_WHY[tags.budget]}. ${style}.`;
  return `${hook} — ${BAND_WHY[tags.budget]}, and ${MAT_WHY[tags.materials]}. ${style}.`;
}

function priceTag(band: Band): string {
  if (band === "budget") return "Budget";
  if (band === "splurge") return "Splurge";
  if (band === "thrift") return "Secondhand";
  return "Mid";
}

function matTag(mat: Mat): string {
  if (mat === "clean") return "Non-toxic";
  if (mat === "lowtox") return "Low-tox";
  if (mat === "care") return "Simpler";
  return "Straightforward";
}

function whereFor(band: Band, mat: Mat, kind: Card["kind"]): string {
  if (kind === "task") return "Free";
  if (band === "budget" || band === "thrift") return mat === "lowtox" || mat === "clean" ? "Drugstore" : "Any store";
  if (band === "splurge") return "Online";
  return mat === "lowtox" || mat === "clean" ? "Online" : "Store or online";
}

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function seedVotes(id: string): { used: number; skip: number; wish: number } {
  const h = hash(id);
  return {
    used: 36 + (h % 160),
    skip: 4 + ((h >> 8) % 36),
    wish: 10 + ((h >> 16) % 70),
  };
}

type Nine = Record<Band, Record<Shelf, string>>;

function nine(budget: [string, string, string], mid: [string, string, string], splurge: [string, string, string]): Nine {
  const row = (names: [string, string, string]) => ({ lowtox: names[0], care: names[1], works: names[2] });
  return {
    budget: row(budget),
    mid: row(mid),
    splurge: row(splurge),
    thrift: row(budget),
  };
}

function product(
  id: string,
  line: string,
  hook: string,
  names: Nine,
  sensitive = false,
): (tags: Tags) => Card {
  return (tags) => {
    const name = names[tags.budget][shelf(tags.materials)];
    const cardId = `${id}:${tags.budget}_${tags.materials}`;
    return {
      id: cardId,
      kind: "product",
      sensitive,
      name,
      line,
      tags: [priceTag(tags.budget), matTag(tags.materials), whereFor(tags.budget, tags.materials, "product")],
      why: why(hook, tags),
      image: productArt(id),
    };
  };
}

function task(
  id: string,
  name: string,
  line: string,
  hook: string,
  steps: string[],
  sensitive = false,
): (tags: Tags) => Card {
  return (tags) => {
    let extra = hook;
    if (tags.experience === "first") extra = `${hook}. First time through, so one page is enough`;
    if (tags.experience === "experienced") extra = `${hook}. You’ve done a version of this — keep the short list`;
    if (tags.experience === "alongside") extra = `${hook}. Someone with you has done this — keep the short list`;
    return {
      id: `${id}:${tags.budget}`,
      kind: "task",
      sensitive,
      name,
      line,
      tags: ["Free", "This week", "Not a product"],
      why: why(extra, tags, false),
      steps,
    };
  };
}

const peri = product(
  "peri",
  "Warm water and a squeeze bottle. That is the whole job.",
  "Recovery basics, not a gadget",
  nine(
    ["Simple peri bottle", "Angled peri bottle", "Store-brand peri bottle"],
    ["Fragrance-free peri bottle", "The usual peri bottle", "Peri bottle with a travel top"],
    ["Glass peri bottle", "Premium angled peri bottle", "Postpartum peri kit"],
  ),
  true,
);

const pads = product(
  "pads",
  "Heavy flow, unscented if you can stand it. Buy the overnight length.",
  "The unglamorous thing you will actually use",
  nine(
    ["Unscented drugstore pads", "Overnight pads, unscented", "Economy overnight pads"],
    ["Organic cotton pads", "Overnight pad pack", "Extra-long overnight pads"],
    ["Organic cotton pad bundle", "Soft overnight bundle", "Premium overnight bundle"],
  ),
  true,
);

const joggers = product(
  "joggers",
  "Dark, soft, and fine if they get ruined. Skip anything you have to dry-clean.",
  "Clothes for the first days home",
  nine(
    ["Dark soft joggers", "Black cotton joggers", "Dark sweatpants"],
    ["Soft cotton joggers", "Dark lounge pants", "Easy-wash black joggers"],
    ["Soft lounge set", "Modal lounge set", "Matching lounge set"],
  ),
);

const mesh = product(
  "mesh",
  "Hospital-style underwear you can toss. Dark colors hide the evidence.",
  "A disposable layer, not a wardrobe",
  nine(
    ["Mesh underwear, multipack", "High-waist disposable underwear", "Hospital-style underwear"],
    ["Organic cotton high-waist briefs", "Soft high-waist underwear", "Seamless high-waist pack"],
    ["Organic cotton brief bundle", "Soft recovery underwear set", "Premium recovery briefs"],
  ),
  true,
);

const witch = product(
  "witch",
  "Cooling liners some people like in week one. Fragrance-free is the kinder version.",
  "Optional comfort, not a treatment",
  nine(
    ["Unscented witch hazel pads", "Cooling liners", "Store-brand cooling pads"],
    ["Fragrance-free witch hazel liners", "Cooling pad pack", "Extra cooling liners"],
    ["Organic witch hazel liners", "Gentle cooling liner set", "Premium cooling pads"],
  ),
  true,
);

const prenatal = product(
  "prenatal",
  "A reminder to take one vitamin — not a dose, and not a prescription. Ask your own provider what they want you on.",
  "One bottle, not a cabinet of them",
  nine(
    ["Folate prenatal, small bottle", "Store-brand prenatal", "Basic once-a-day prenatal"],
    ["Methylfolate prenatal", "Once-a-day prenatal", "Prenatal plus a pill case"],
    ["Third-party-tested prenatal", "Subscription prenatal", "Premium prenatal pack"],
  ),
  true,
);

const bra = product(
  "bra",
  "Wire-free and not tight. You can live in two of these.",
  "Comfort over a maternity haul",
  nine(
    ["Soft cotton bralette", "Seamless bralette, 2-pack", "Sleep bra multipack"],
    ["Organic cotton bralette", "Wireless everyday bra", "Seamless wireless bra"],
    ["GOTS cotton bra, two colors", "Bra you can nurse in later", "Premium wireless bra"],
  ),
);

const pants = product(
  "pants",
  "The waistband is the problem, not your style. One fix is enough.",
  "Something that still buttons",
  nine(
    ["Button extender", "Over-bump leggings, basic", "Sale-rack leggings"],
    ["Cotton over-bump leggings", "One pair of bump jeans", "Comfort jeggings"],
    ["Organic over-bump denim", "The one good pair of bump jeans", "Premium maternity denim"],
  ),
);

const top = product(
  "top",
  "A longer tee beats a whole new closet this month.",
  "Room, not a lookbook",
  nine(
    ["Long cotton tee", "Soft jersey tee, 2-pack", "Any longer tee on sale"],
    ["Organic long tee", "Bump-friendly tee", "Stretch jersey top"],
    ["Organic cotton tee, two colors", "Nice long tee", "Premium stretch top"],
  ),
);

const support = product(
  "support",
  "One thing that takes pressure off — a band or better shoes. Not both, unless you want them.",
  "Support without a gear pile",
  nine(
    ["Simple cotton belly band", "Basic belly band", "Soft belly band"],
    ["Cotton support band", "Belly band", "Everyday support band"],
    ["Linen-lean band", "Well-made support belt", "The band that stays put"],
  ),
);

const lounge = product(
  "lounge",
  "Roomy clothes you will nap in. That is the dress code.",
  "Somewhere soft to be",
  nine(
    ["Bump lounge set, basic", "Soft shorts and a tee", "Sale lounge set"],
    ["Cotton bump lounge set", "Everyday lounge set", "Stretch lounge set"],
    ["Organic lounge set", "The nice lounge set", "Premium bump lounge set"],
  ),
);

const cream = product(
  "cream",
  "Belly balm is optional. It does not prevent stretch marks by force of will. Use it if it feels good.",
  "A maybe, not a moral test",
  nine(
    ["Plain shea butter", "Drugstore belly butter", "Any lotion you already like"],
    ["Fragrance-free body oil", "Unscented belly butter", "Scented belly cream"],
    ["Cold-pressed oil, fragrance-free", "A nice jar of belly cream", "Spa-style belly balm"],
  ),
  true,
);

const softpants = product(
  "softpants",
  "The next size of soft pants. You do not need a capsule wardrobe.",
  "Room to sit",
  nine(
    ["Soft maternity joggers", "Stretch pants, one pair", "Sale joggers"],
    ["Cotton maternity joggers", "Everyday bump pants", "Comfort work-from-home pants"],
    ["Organic cotton joggers", "Nice bump trousers", "Premium soft pants"],
  ),
);

const tote = product(
  "tote",
  "A bag with a charger, a toothbrush, and lip balm. Pack it once, then stop.",
  "A start, not a styled flat-lay",
  nine(
    ["Tote you already own", "Cheap packing cube", "Grocery tote as the hospital bag"],
    ["Simple packing cube", "Small weekender", "Packing cube set of two"],
    ["Leather-free weekender", "The one nice weekender", "Structured hospital tote"],
  ),
);

const socks = product(
  "socks",
  "Swollen feet are common late. Softer socks or a half-size up can matter more than a device.",
  "Feet, not another gadget",
  nine(
    ["Soft socks, multipack", "Basic compression socks", "Cushioned socks"],
    ["Cotton compression socks", "Everyday compression socks", "Athletic compression socks"],
    ["Organic cotton compression socks", "The comfortable compression pair", "Premium recovery socks"],
  ),
  true,
);

const goinghome = product(
  "goinghome",
  "For you, not a baby photo outfit. Soft, dark, easy to get on.",
  "The outfit you leave in",
  nine(
    ["Dark button-front shirt", "Soft cardigan you own", "Sale button shirt"],
    ["Cotton button-front dress", "Going-home cardigan", "Stretch button shirt"],
    ["Organic cotton dress", "Soft going-home set", "Premium knit set"],
  ),
);

const charger = product(
  "charger",
  "The long cable, packed now, so it is not a 2 a.m. problem.",
  "A boring thing that saves a spiral",
  nine(
    ["Long phone cable", "Extra cable plus a brick", "Any spare charger"],
    ["Six-foot cable", "Cable and a small battery", "Labeled spare charger"],
    ["Long braided cable", "Battery pack and cable", "Premium battery pack"],
  ),
);

const folder = task(
  "papers",
  "One folder for paperwork",
  "ID, insurance card, and the birth-preferences page. Not a binder system.",
  "Paperwork in one place",
  [
    "Put your ID and insurance card in a single folder.",
    "Add the one-page birth preferences, if you wrote them.",
    "Stop. Two copies are plenty.",
  ],
);

const bands = product(
  "bands",
  "Some people like wristbands for nausea. They are cheap to try and easy to abandon.",
  "A small experiment, not a promise",
  nine(
    ["Basic acupressure bands", "Drugstore wristbands", "Any soft wristbands"],
    ["Fabric acupressure bands", "Adjustable wristbands", "Sport-style bands"],
    ["Soft cotton wristbands", "The nicer adjustable pair", "Premium nausea bands"],
  ),
);

const bottle = product(
  "water",
  "A bottle that opens with one hand. Fill it tonight.",
  "Water within reach",
  nine(
    ["Plastic straw bottle", "Any straw bottle", "Sports bottle you own"],
    ["Glass straw bottle", "Everyday straw bottle", "Insulated bottle"],
    ["Glass bottle with a sleeve", "Nice insulated bottle", "Premium straw bottle"],
  ),
);

const pillow = product(
  "pillow",
  "A pillow between the knees helps a lot of people sleep. A regular extra pillow counts.",
  "Sleep support you might already own",
  nine(
    ["Extra bed pillow", "Cheap body pillow", "Rolled blanket, honestly"],
    ["Cotton body pillow", "C-shaped pillow", "Full body pillow"],
    ["Organic body pillow", "The well-made pregnancy pillow", "Premium body pillow"],
  ),
);

const tees = product(
  "longertee",
  "Shirts that still cover you when you sit. Two is a wardrobe.",
  "Coverage, not a haul",
  nine(
    ["Two long tees", "Multipack long tees", "Sale long-sleeve tee"],
    ["Organic long tees, two", "Bump-length tee", "Stretch long tee"],
    ["Organic cotton, two colors", "Nice long knit", "Premium long tee"],
  ),
);

const eyes = product(
  "eyes",
  "One swipe, one hand. Cools the puff. It does not give the sleep back.",
  "For the face you see at 3 a.m.",
  nine(
    ["Tula Glow & Get It eye balm", "Tula Glow & Get It eye balm", "Tula Glow & Get It eye balm"],
    ["Tula Glow & Get It eye balm", "Tula Glow & Get It eye balm", "Tula Glow & Get It eye balm"],
    ["Tula Glow & Get It eye balm", "Tula Glow & Get It eye balm", "Tula Glow & Get It eye balm"],
  ),
);

const blanket = product(
  "blanket",
  "One unisex swaddle. Not a nursery. The first soft thing for them.",
  "Something to look forward to",
  nine(
    ["Unisex muslin swaddle", "Unisex muslin swaddle", "Unisex muslin swaddle"],
    ["Unisex muslin swaddle", "Unisex muslin swaddle", "Unisex muslin swaddle"],
    ["Unisex muslin swaddle", "Unisex muslin swaddle", "Unisex muslin swaddle"],
  ),
);

const insoles = product(
  "insoles",
  "Shoes you already like, plus cushion. Often enough.",
  "Use the shoes you have",
  nine(
    ["Drugstore gel insoles", "Basic cushion insoles", "Any soft insole"],
    ["Cork-free soft insoles", "All-day insoles", "Sport insoles"],
    ["Premium all-day insoles", "The good insole pair", "Custom-feel insoles"],
  ),
);

const questions = task(
  "questions",
  "Three questions for your next visit",
  "Write them in your phone now. Appointments go fast.",
  "A short list, not a research project",
  [
    "Which symptoms should make me call you?",
    "What vitamin do you actually want me on?",
    "What can wait until the next visit?",
  ],
  true,
);

const carResearch = task(
  "carsearch",
  "Car seat research, not a purchase panic",
  "You are allowed to learn the categories before you buy. One evening, then close the tabs.",
  "Research only this week",
  [
    "Infant seat versus convertible — pick the path that fits your car.",
    "Check expiration dates if you are borrowing one.",
    "Stop after you know the model. Installation is a later week.",
  ],
);

const birthpage = task(
  "birthpage",
  "Birth preferences, one page",
  "Who is with you, the lighting, feeding wishes, and what to do if the plan changes. It is not a contract.",
  "One page, then you’re done",
  [
    "Write five lines, not a booklet.",
    "Include feeding wishes and who should be in the room.",
    "Note that plans can change. Bring two copies.",
  ],
  true,
);

const carcheck = task(
  "carcheck",
  "Schedule a car seat check",
  "A free inspection with a certified tech. The seat can be right and still be installed wrong.",
  "A task, not another product",
  [
    "Find a free check — many fire stations and hospitals host them.",
    "Book it before the due month, not the night before.",
    "Install it yourself first, then let them correct it.",
  ],
);

const underwear = product(
  "underwear",
  "High waist, dark, lots of them. You will not want to do laundry on day three.",
  "The unpretty pack",
  nine(
    ["Dark cotton briefs, multipack", "High-waist cotton pack", "Cheap dark underwear"],
    ["Organic high-waist briefs", "Soft high-waist pack", "Seamless high-waist pack"],
    ["Organic cotton brief set", "Soft recovery underwear", "Premium high-waist set"],
  ),
);

const play = product(
  "play",
  "One thing to look at on the floor. Not a gym, a mobile, and a basket.",
  "One object of interest",
  nine(
    ["High-contrast board book", "A simple rattle", "Any board book from the library"],
    ["Organic cotton play mat", "Small play mat", "Activity mat, one only"],
    ["Wooden play gym", "The nice play mat", "Designer play gym"],
  ),
);

const bib = product(
  "bib",
  "Drool is the activity. A cloth at the neck saves outfits you like.",
  "Absorb, don’t collect",
  nine(
    ["Flour-sack towels", "Basic bandana bibs", "Any soft washcloths"],
    ["Organic muslin bibs", "Cotton bandana bibs, 4-pack", "Everyday bibs"],
    ["Organic bib set", "Nice cotton bib bundle", "Premium bib set"],
  ),
);

const teether = product(
  "teether",
  "Gums can be loud this month. Cold washcloth counts as a teether.",
  "Something safe to chew",
  nine(
    ["Clean cold washcloth", "Simple silicone teether", "Water-filled teether"],
    ["Solid silicone teether", "Wood and silicone teether", "Freezer teether"],
    ["Solid wood teether, unfinished", "The well-made silicone teether", "Premium teether set"],
  ),
  true,
);

const seat = product(
  "seat",
  "A place to sit while you eat. Floor seats and hand-me-down chairs both count if they’re sturdy.",
  "Somewhere to sit, not a dining room",
  nine(
    ["Simple floor seat", "Basic high-chair pad", "Secondhand chair, straps checked"],
    ["Wooden floor seat", "Everyday high chair", "Compact high chair"],
    ["Solid-wood high chair", "The high chair you’ll keep", "Full-size high chair"],
  ),
);

const cup = product(
  "cup",
  "An open cup or a straw cup. You do not need six systems.",
  "One cup that survives the day",
  nine(
    ["Small open cup", "Basic straw cup", "Any small cup"],
    ["Stainless open cup", "Everyday straw cup", "Spill-resistant cup"],
    ["Weighted stainless cup", "The nice straw cup", "Premium cup set"],
  ),
);

const mat = product(
  "mat",
  "Food will hit the floor. A washable layer lowers the stakes.",
  "Permission to be messy",
  nine(
    ["Old shower curtain", "Basic splat mat", "Towel you don’t love"],
    ["Cotton splat mat", "Washable splat mat", "Vinyl splat mat"],
    ["Linen-cotton splat mat", "The nice washable mat", "Premium splat mat"],
  ),
);

const foods = task(
  "foods",
  "First foods — a conversation, not a menu",
  "Many families wait until closer to six months, and a clinician’s okay. This card is a pause, not a recipe.",
  "Research only, and only if the timing is right",
  [
    "Ask your child’s clinician before offering food.",
    "If they say wait, wait. The cup and the seat can still be useful.",
    "No schedules from strangers. One new taste at a time when you begin.",
  ],
  true,
);

const proof = product(
  "proof",
  "The room you actually live in. Outlets and the one tippy thing. Not the whole house in a weekend.",
  "One room, then stop",
  nine(
    ["Outlet covers", "Basic outlet plugs", "Tape and outlet plugs"],
    ["Simple outlet covers", "Outlet kit for one room", "Latch and outlet bundle"],
    ["Furniture anchors plus covers", "One-room proofing kit", "Full anchor kit"],
  ),
);

const shoes = product(
  "shoes",
  "Soft soles until they are walking a lot. Shoes are for outside, not for milestones.",
  "Feet first, fashion later",
  nine(
    ["Soft booties", "Basic soft-sole shoes", "Sale crib shoes"],
    ["Leather soft-soles", "Everyday first shoes", "Flexible sneakers"],
    ["Leather first shoes", "The nice soft-sole pair", "Premium first walkers"],
  ),
);

const books = product(
  "books",
  "A few board books, or a library card. Repetition is the point.",
  "Stories, not a curriculum",
  nine(
    ["Library card", "Three board books, secondhand", "Any board book stack"],
    ["Cloth book, two titles", "Board book four-pack", "Everyday board books"],
    ["Cloth and board set", "The nice book bundle", "Boxed board-book set"],
  ),
);

const latch = product(
  "latch",
  "Cabinets you open every day. One afternoon.",
  "The cabinets, not a smart home",
  nine(
    ["Basic cabinet latches", "Magnetic latches, small pack", "Strap locks"],
    ["Simple magnetic latches", "Latch set for one kitchen", "Adhesive latches"],
    ["Well-made magnetic latches", "The latch set that doesn’t break", "Premium latch kit"],
  ),
);

const hat = product(
  "hat",
  "Sun on a walk. A hat with a floppy brim is the whole strategy.",
  "Shade you can lose and replace",
  nine(
    ["Cotton sun hat", "Basic bucket hat", "Any floppy hat"],
    ["Organic cotton sun hat", "Everyday sun hat", "Packable hat"],
    ["Organic brim hat", "The nice sun hat", "Premium sun hat"],
  ),
);

const sound = product(
  "sound",
  "Steady noise helps some households. A box fan you already own is a legal answer.",
  "One sound, not a sleep program",
  nine(
    ["Box fan you own", "Basic sound machine", "Free fan, truly"],
    ["Simple sound machine", "Everyday sound machine", "App plus a speaker you have"],
    ["Analog-style sound machine", "The machine with a real knob", "Premium sound machine"],
  ),
);

const sack = product(
  "sack",
  "One sleep layer in the right weight. Stop swaddling once a baby shows signs of rolling, and ask your provider if you aren’t sure.",
  "One layer, checked for fit",
  nine(
    ["Two cotton swaddles", "Basic sleep sack", "Receiving blankets, used snug"],
    ["Organic muslin swaddle", "Cotton sleep sack", "Zip sleep sack"],
    ["Organic sleep sack", "The well-made sleep sack", "Premium sleep sack"],
  ),
  true,
);

const gate = product(
  "gate",
  "The stair or the room you need shut. Measure the opening before you buy.",
  "One opening, closed",
  nine(
    ["Pressure gate, basic", "Basic baby gate", "Secondhand gate, no recalls"],
    ["Simple pressure gate", "Hardware-mount gate", "Walk-through gate"],
    ["Well-made pressure gate", "The gate that stays put", "Premium walk-through gate"],
  ),
);

const toddlerShoes = product(
  "tshoes",
  "Shoes that stay on and bend. Leave the rigid ones on the shelf.",
  "Walkable, not cute-only",
  nine(
    ["Flexible sneakers, budget", "Basic strap shoes", "Sale flexible shoes"],
    ["Leather flexible shoes", "Everyday toddler sneakers", "Strap shoes that stay on"],
    ["Leather everyday shoes", "The pair you’ll rebuy in the next size", "Premium flexible shoes"],
  ),
);

const snackcup = product(
  "snackcup",
  "A cup for puffs or whatever you already eat. Lids optional.",
  "Snacks that survive the stroller",
  nine(
    ["Small open container", "Basic snack cup", "Any lidded cup"],
    ["Stainless snack cup", "Everyday snack catcher", "Silicone snack cup"],
    ["Stainless snack set", "The cup that doesn’t crack", "Premium snack set"],
  ),
);

function carrier(tags: Tags): Card {
  const names = nine(
    ["Cotton ring sling", "Soft wrap", "Used carrier, straps checked"],
    ["Simple ring sling", "Soft-structured carrier", "Everyday carrier"],
    ["Organic-fiber carrier", "The nice soft-structured carrier", "Premium carrier"],
  );
  return product(
    "carrier",
    "One way to be hands-free. Inspect used buckles and read the weight range.",
    tags.gear === "minimal" ? "One carrier, not a stroller too" : "A way to hold the baby and still move",
    names,
  )(tags);
}

function stroller(tags: Tags): Card {
  const names = nine(
    ["Basic umbrella stroller", "Lightweight stroller", "Sale-rack stroller"],
    ["Compact stroller", "Everyday compact stroller", "The practical stroller"],
    ["Compact stroller, simpler materials", "The stroller you’ll walk daily", "Full-size stroller"],
  );
  return product(
    "stroller",
    "The one you will actually fold and leave the house with. You do not need two.",
    "The sanity-saving way out the door",
    names,
  )(tags);
}

function outTheDoor(tags: Tags): Card {
  if (tags.gear === "helpers" || (tags.style === "routines" && tags.gear !== "minimal")) return stroller(tags);
  return carrier(tags);
}

type Kitchen = "easy" | "vegetarian" | "vegan" | "dairy" | "gluten" | "nuts" | "eggs" | "avoid";

function grid(
  budget: [string, string, string],
  mid: [string, string, string],
  splurge: [string, string, string],
): Record<Band, Record<Shelf, string>> {
  const row = (names: [string, string, string]) => ({ lowtox: names[0], care: names[1], works: names[2] });
  return { budget: row(budget), mid: row(mid), splurge: row(splurge), thrift: row(budget) };
}

export function kitchenFor(tags: Tags): Kitchen {
  if (tags.food === "vegetarian") return "vegetarian";
  if (tags.food === "vegan") return "vegan";
  if (tags.food === "avoid") {
    if (tags.avoid === "dairy" || tags.avoid === "gluten" || tags.avoid === "nuts" || tags.avoid === "eggs") {
      return tags.avoid;
    }
    return "avoid";
  }
  return "easy";
}

function snack(tags: Tags, moment: "nausea" | "onehand"): Card {
  const names: Record<typeof moment, Record<Kitchen, Record<Band, Record<Shelf, string>>>> = {
    nausea: {
      easy: grid(
        ["Unscented ginger chews + saltines", "Ginger chews and crackers", "Pretzels and ginger ale"],
        ["Ginger tea, unsweetened", "Bedside cracker tin", "Salty snack bin"],
        ["Small-batch ginger lozenges", "Nicer ginger tin", "Assorted bland snack box"],
      ),
      vegetarian: grid(
        ["Ginger tea and plain oat biscuits", "Oat biscuits", "Crackers you already eat"],
        ["Roasted chickpea packs", "Plant snack tin", "Seedy crackers"],
        ["Small-batch ginger drops", "Nice oat and ginger tin", "Vegetarian snack box"],
      ),
      vegan: grid(
        ["Ginger tea and rice crackers", "Plain oat biscuits", "Crackers, no dairy"],
        ["Roasted chickpeas", "Fruit and salt", "Vegan ginger chews"],
        ["Small-batch ginger drops", "Nice vegan ginger tin", "Plant-only snack box"],
      ),
      dairy: grid(
        ["Ginger tea and rice crackers", "Plain crackers", "Pretzels"],
        ["Roasted chickpeas", "Fruit and saltines", "Dairy-free ginger chews"],
        ["Small-batch ginger drops", "Nice dairy-free tin", "The dairy-free bland box"],
      ),
      gluten: grid(
        ["Plain rice crackers", "Rice cakes and ginger tea", "Fruit"],
        ["Cheese and grapes", "Yogurt and berries", "Gluten-free crackers"],
        ["Nice rice-cracker tin", "Gluten-free ginger lozenges", "The gluten-free bland box"],
      ),
      nuts: grid(
        ["Ginger chews and saltines", "Crackers", "Pretzels"],
        ["Cheese and fruit", "Yogurt", "Nut-free granola"],
        ["Nut-free ginger tin", "Seed crackers, no nuts", "The nut-free bland box"],
      ),
      eggs: grid(
        ["Ginger chews and saltines", "Crackers and cheese", "Pretzels"],
        ["Yogurt and fruit", "Cheese and crackers", "Egg-free bars"],
        ["Egg-free ginger tin", "Nice cracker tin", "The egg-free bland box"],
      ),
      avoid: grid(
        ["Plain rice crackers", "Single-ingredient crackers", "Rice cakes"],
        ["Short-list cracker box", "Simple bars you can read fast", "Familiar safe crackers"],
        ["Short-ingredient snack tin", "Simple snack box", "The assortment you trust"],
      ),
    },
    onehand: {
      easy: grid(
        ["Cheese sticks and fruit", "Crackers and cheese", "Whatever is already in the fridge"],
        ["Unsalted nuts and fruit", "One-hand snack box", "Granola bars you like"],
        ["Short-list snack box, one month", "Nice one-hand bento bits", "The fancy bar box"],
      ),
      vegetarian: grid(
        ["Roasted chickpeas", "Banana and oat biscuits", "Peanut butter on toast"],
        ["Hummus cups", "Vegetarian snack box", "Trail mix you know"],
        ["Small-batch snack tin", "Nice vegetarian snack tin", "Premium vegetarian bars"],
      ),
      vegan: grid(
        ["Roasted chickpeas", "Banana and oat biscuits", "Peanut butter on toast"],
        ["Hummus cups", "Fruit and seed crackers", "Vegan trail mix"],
        ["Small-batch vegan bites", "Nice vegan snack tin", "Premium vegan bars"],
      ),
      dairy: grid(
        ["Hummus and crackers", "Fruit and sunflower seeds", "Peanut butter on toast"],
        ["Roasted chickpeas", "Dairy-free snack cups", "A bar with no milk"],
        ["Nice dairy-free tin", "Dairy-free bento bits", "Premium dairy-free bars"],
      ),
      gluten: grid(
        ["Cheese and fruit", "Yogurt and berries", "Rice cakes and peanut butter"],
        ["Cheese sticks and grapes", "Gluten-free bars", "Nuts and fruit"],
        ["Nice gluten-free tin", "Gluten-free bento bits", "Premium gluten-free bars"],
      ),
      nuts: grid(
        ["Cheese and fruit", "Yogurt and crackers", "Sunflower seeds and fruit"],
        ["Hummus cups", "Nut-free bars", "Cheese sticks"],
        ["Nice nut-free tin", "Seed-butter bites", "Premium nut-free bars"],
      ),
      eggs: grid(
        ["Cheese and fruit", "Yogurt and granola", "Crackers and cheese"],
        ["Hummus cups", "Egg-free bars", "Nuts and fruit"],
        ["Nice egg-free tin", "Egg-free bento bits", "Premium egg-free bars"],
      ),
      avoid: grid(
        ["Fruit you tolerate", "Safe crackers, pre-portioned", "Your known-safe snack"],
        ["Labeled short-list bars", "Simple snack cups", "The brand you already trust"],
        ["Short-ingredient box", "A simple curated tin", "Premium familiar assortment"],
      ),
    },
  };
  const kitchen = kitchenFor(tags);
  const name = names[moment][kitchen][tags.budget][shelf(tags.materials)];
  const line =
    moment === "nausea"
      ? "Keep it boring and nearby. Eat what stays down. This is not a nutrition plan."
      : "Food you can eat while holding a baby. Protein if you can, crumbs if that’s the day.";
  const foodBit =
    kitchen === "easy"
      ? ""
      : kitchen === "vegetarian"
        ? " Vegetarian, like you asked."
        : kitchen === "vegan"
          ? " Plants only, like you asked."
          : kitchen === "avoid"
            ? " Short ingredient lists, since you’re leaving something out."
            : ` No ${kitchen}, like you asked.`;
  return {
    id: `snack-${moment}:${kitchen}:${tags.budget}_${tags.materials}`,
    kind: "product",
    sensitive: false,
    name,
    line,
    image: "/graphics/product-cup.jpg",
    tags: [
      priceTag(tags.budget),
      kitchen === "easy" ? matTag(tags.materials) : kitchen === "dairy" ? "No dairy" : kitchen === "gluten" ? "No gluten" : kitchen === "nuts" ? "No nuts" : kitchen === "eggs" ? "No eggs" : kitchen === "avoid" ? "Short list" : kitchen === "vegan" ? "Vegan" : "Vegetarian",
      whereFor(tags.budget, tags.materials, "product"),
    ],
    why: `${why(moment === "nausea" ? "A snack that asks nothing of you" : "One-hand food", tags)}${foodBit}`,
  };
}

function feeding(tags: Tags): Card {
  const breast = nine(
    ["Short-list nipple balm", "Basic nipple balm", "Store-brand nipple cream"],
    ["Fragrance-free nipple balm", "The balm you’ll reopen", "Hydrogel pads"],
    ["Silver nursing cups", "Balm plus hydrogel pads", "Premium hydrogel set"],
  );
  const formula = nine(
    ["Two glass bottles, slow flow", "Starter bottle set", "Basic slow-flow bottles"],
    ["Glass bottles, set of four", "Four everyday bottles", "Standard bottle set"],
    ["Glass bottle set and a rack", "The bottle set plus a drying rack", "Full bottle system"],
  );
  const combo = nine(
    ["One balm and one glass bottle", "Balm plus two bottles", "Balm and a starter bottle"],
    ["Fragrance-free balm and two bottles", "Small both-paths kit", "Balm plus a bottle set"],
    ["Silver cups plus glass bottles", "The nicer both-paths kit", "Premium balm and bottles"],
  );
  const undecided = nine(
    ["One balm and one bottle", "Either-way starter", "One cream, one bottle"],
    ["Fragrance-free balm, one bottle", "Small undecided kit", "Balm and a basic bottle"],
    ["Nicer balm and one glass bottle", "The gentle either-way kit", "Premium mini kit"],
  );
  const grids = { breast, formula, combo, undecided };
  const lines: Record<Tags["feeding"], string> = {
    breast: "For the feeding plan you’re on. This is comfort gear, not a latch diagnosis.",
    formula: "Slow-flow nipples and as few bottles as you can wash. Ask your clinician about formula itself.",
    combo: "A little of both paths, so you aren’t shopping twice if the week changes.",
    undecided: "One balm and one bottle. You can decide the plan later — this just covers tonight.",
  };
  const hooks: Record<Tags["feeding"], string> = {
    breast: "Matched to breastfeeding",
    formula: "Matched to formula",
    combo: "Matched to doing both",
    undecided: "Kept small while you decide",
  };
  const name = grids[tags.feeding][tags.budget][shelf(tags.materials)];
  return {
    id: `feed:${tags.feeding}:${tags.budget}_${tags.materials}`,
    kind: "product",
    sensitive: true,
    name,
    line: lines[tags.feeding],
    image: tags.feeding === "formula" ? "/graphics/product-bottle.jpg" : "/graphics/product-care.jpg",
    tags: [priceTag(tags.budget), matTag(tags.materials), tags.feeding === "formula" ? "Bottles" : "Feeding"],
    why: why(hooks[tags.feeding], tags),
  };
}

const REGISTRY_BOTTLES: Record<Tags["feeding"], { line: string; hook: string; names: Nine }> = {
  breast: {
    line: "One slow-flow bottle for a pumped feeding. Not a cabinet of them.",
    hook: "Matched to breastfeeding",
    names: nine(
      ["One glass bottle, slow flow", "Basic bottle, one", "Any single slow-flow bottle"],
      ["One glass bottle and a spare nipple", "Everyday single bottle", "One bottle, slow flow"],
      ["One nice glass bottle", "The single bottle you’ll reuse", "Premium single bottle"],
    ),
  },
  formula: {
    line: "A small starter set and slow-flow nipples. Ask your clinician about the formula itself.",
    hook: "Matched to formula",
    names: nine(
      ["Two glass bottles, slow flow", "Starter bottle set", "Basic slow-flow bottles"],
      ["Glass bottles, set of four", "Four everyday bottles", "Standard bottle set"],
      ["Glass bottle set and a rack", "The bottle set plus a drying rack", "Full bottle system"],
    ),
  },
  combo: {
    line: "Two bottles, so a pumped feeding and a formula feeding both have a home.",
    hook: "Matched to doing both",
    names: nine(
      ["Two glass bottles", "Balm plus two bottles", "Two basic bottles"],
      ["Two everyday bottles", "Small both-paths set", "Bottle pair, slow flow"],
      ["Glass pair and a rack", "The nicer both-paths set", "Premium two-bottle set"],
    ),
  },
  undecided: {
    line: "One bottle. Enough if you pump, enough if you use formula, and easy to add to later.",
    hook: "Kept to one while you decide",
    names: nine(
      ["One glass bottle", "Either-way bottle", "One basic bottle"],
      ["One glass bottle, slow flow", "Single undecided bottle", "One everyday bottle"],
      ["One nice glass bottle", "The gentle either-way bottle", "Premium single bottle"],
    ),
  },
};

function registryBottles(tags: Tags): Card {
  const pack = REGISTRY_BOTTLES[tags.feeding];
  return product("regbottle", pack.line, pack.hook, pack.names, true)(tags);
}

function registrySleep(tags: Tags): Card {
  const plan = tags.sleep === "either" ? "unsure" : tags.sleep;
  if (plan === "crib") {
    return product(
      "regsleep",
      "One crib or bassinet, a firm mattress, and no bumper. A used crib is fine only if it isn’t recalled.",
      "Their own flat sleep space",
      nine(
        ["Bassinet or a basic mini crib", "Basic crib", "Used crib, recall checked"],
        ["Standard crib, firm mattress", "Everyday crib", "Mini crib"],
        ["Crib you can convert later", "The crib that lasts", "Solid-wood crib"],
      ),
      true,
    )(tags);
  }
  if (plan === "cosleep") {
    return product(
      "regsleep",
      "A bedside bassinet keeps the baby in your room on their own flat surface. Sharing the adult bed has risks. Ask your provider before you do that. This is not a pillow.",
      "In your room, on their own surface",
      nine(
        ["Basic bedside bassinet", "Simple bedside sleeper", "Used bedside bassinet, recall checked"],
        ["Bedside bassinet", "Everyday bedside sleeper", "Bassinet that attaches to the bed frame"],
        ["Well-made bedside bassinet", "The bedside sleeper you’ll actually use", "Premium bedside bassinet"],
      ),
      true,
    )(tags);
  }
  return product(
    "regsleep",
    "A bassinet that can sit next to the bed. You can decide on a crib later.",
    "One sleep spot while you decide",
    nine(
      ["Basic bassinet", "Simple bassinet", "Used bassinet, recall checked"],
      ["Everyday bassinet", "Bedside or standalone bassinet", "Compact bassinet"],
      ["The bassinet you’ll keep nearby", "Well-made bassinet", "Premium bassinet"],
    ),
    true,
  )(tags);
}

export type Essential = { key: string; title: string; note: string; card: Card };

export function parentEssentials(tags: Tags): Essential[] {
  const eatNote = {
    breast: "From your answer: breast. One bottle, not a system.",
    formula: "From your answer: formula.",
    combo: "From your answer: both.",
    undecided: "From your answer: still deciding. We kept it to one.",
  }[tags.feeding];
  const sleepNote = {
    crib: "From your answer: crib or bassinet.",
    cosleep: "From your answer: co-sleeping. Bedside bassinet, not a bed pillow.",
    unsure: "You weren’t sure yet, so this is one bassinet.",
    either: "You weren’t sure yet, so this is one bassinet.",
  }[tags.sleep];
  const water = product(
    "regwater",
    "The bottle you will refill at 3 a.m. One is enough.",
    "For you, not the baby",
    nine(
      ["Basic insulated bottle", "Any bottle you’ll refill", "Store-brand water bottle"],
      ["Insulated bottle", "Everyday water bottle", "Straw bottle"],
      ["The bottle that stays cold", "Nice insulated bottle", "Premium water bottle"],
    ),
  )(tags);
  const diapers = product(
    "regdiaper",
    "A small stack of newborn diapers and one wipe. Buy the big box after you know what fits.",
    "Bathroom, then stop",
    nine(
      ["Newborn diaper small pack and store-brand wipes", "Basic diapers and wipes", "Small diaper stack and wipes"],
      ["Newborn diapers and fragrance-free wipes", "Everyday diaper and wipe set", "One wipe, one small diaper box"],
      ["Fragrance-free newborn set", "The diaper and wipe you’ll rebuy", "Premium fragrance-free set"],
    ),
  )(tags);
  return [
    { key: "eat", title: "Eat", note: eatNote, card: registryBottles(tags) },
    { key: "sleep", title: "Sleep", note: sleepNote, card: registrySleep(tags) },
    { key: "drink", title: "Drink", note: "For you. The baby’s bottles are under Eat.", card: water },
    { key: "bathroom", title: "Bathroom", note: "Diapers and wipes. One of each to start.", card: diapers },
    { key: "snacks", title: "Snacks", note: "For you, matched to how you eat. Not a baby menu.", card: snack(tags, "onehand") },
  ];
}

function libraryOrBooks(tags: Tags): Card {
  if (tags.gear === "minimal" || tags.style === "childled") {
    return task(
      "library",
      "Library card, not a book haul",
      "Board books survive being chewed, and the library replaces them for free.",
      "You’d rather buy as little as possible",
      ["Get the card if you don’t have one.", "Put six board books on hold.", "Return them when you’re bored. That’s allowed."],
    )(tags);
  }
  return books(tags);
}

export const STAGES: StageMeta[] = [
  {
    id: "p4",
    phase: "pregnancy",
    label: "Weeks 4–8",
    sampleWeek: 8,
    blurb: [
      "Nausea can show up before you look pregnant at all.",
      "A vitamin you’ll actually take, a bra that doesn’t pinch, and a snack that stays down beat any registry.",
    ],
    milestone: "The baby is still very small, and most of the change is happening out of sight. Feeling sick, tired, or nothing yet are all common.",
  },
  {
    id: "p9",
    phase: "pregnancy",
    label: "Weeks 9–13",
    sampleWeek: 12,
    blurb: [
      "Waistbands usually complain before the bump is obvious.",
      "This stretch is clothes that still fit, plus a short list for appointments — not a new wardrobe.",
    ],
    milestone: "The baby is growing faster than the bump, and a more baby-like shape is taking form. Clothes often feel tight before anyone else can tell.",
  },
  {
    id: "p14",
    phase: "pregnancy",
    label: "Weeks 14–20",
    sampleWeek: 20,
    blurb: [
      "Energy often comes back a bit, and the bump starts to need room.",
      "One support item matters more than a pile of gear.",
    ],
    milestone: "A lot of people feel the first flutters in these weeks. The baby is moving more, even on the days you don’t feel it yet.",
  },
  {
    id: "p21",
    phase: "pregnancy",
    label: "Weeks 21–27",
    sampleWeek: 24,
    blurb: [
      "The belly is doing the talking now.",
      "Belly balm is optional, not a test of how you parent. Car-seat research can stay research.",
    ],
    milestone: "Kicks get easier to notice, and the baby has room to turn and stretch. You might even see the belly move.",
  },
  {
    id: "p28",
    phase: "pregnancy",
    label: "Weeks 28–33",
    sampleWeek: 30,
    blurb: [
      "The third trimester is mostly logistics.",
      "A small hospital-bag start and one page of birth preferences are enough for this week.",
    ],
    milestone: "The baby is putting on weight, so stretches feel tighter. Movements often turn into a press or a roll instead of a big kick.",
  },
  {
    id: "p34",
    phase: "pregnancy",
    label: "Weeks 34–37",
    sampleWeek: 36,
    blurb: [
      "Bags and car seats move from someday to this month.",
      "You still don’t need a color-coded binder.",
    ],
    milestone: "There’s less room now. What you feel is more often a press, a roll, or a foot than a big kick.",
  },
  {
    id: "p38",
    phase: "pregnancy",
    label: "Weeks 38–42",
    sampleWeek: 38,
    blurb: [
      "You are close. Comfort for the first days matters more than one more cute thing.",
      "Think peri care, pads, and something dark and soft to wear.",
    ],
    milestone: "The baby is about ready, snug, and making smaller movements. A lot of this stage is waiting.",
  },
  {
    id: "b0",
    phase: "baby",
    label: "First 10 days",
    blurb: [
      "The first days are recovery, feeding, and sleep, on a loop.",
      "Many newborns mostly eat, sleep, and want to be held. You need less than a shopping cart.",
    ],
    milestone: "A newborn is mostly eating, sleeping, and wanting to be held. The days don’t have a shape yet, and that loop is the stage.",
  },
  {
    id: "b2",
    phase: "baby",
    label: "Weeks 2–5",
    blurb: [
      "Feeding is still the whole day for a lot of families.",
      "Set up the path you’re actually on — breast, formula, or both — and food you can eat with one hand.",
    ],
    milestone: "Your baby is in a stretch of cluster feeding and fussy evenings. They know your voice and want you close.",
  },
  {
    id: "b6",
    phase: "baby",
    label: "About 6–12 weeks",
    blurb: [
      "Crying often peaks somewhere in the second month for many babies, then eases.",
      "One way to leave the house, plus one safe sleep layer, is the whole shopping list.",
    ],
    milestone: "Your baby is more awake and more vocal, often in a crying stretch that eases. They notice faces and start answering with sounds.",
  },
  {
    id: "b4m",
    phase: "baby",
    label: "About 3–5 months",
    blurb: [
      "Wake windows usually stretch a little. Many babies this age grab, drool, and laugh.",
      "Solids can wait unless your own clinician has already said otherwise.",
    ],
    milestone: "Your baby is grabbing, drooling, and putting everything in their mouth. Rolling might be starting, or not yet.",
  },
  {
    id: "b6m",
    phase: "baby",
    label: "About 6–8 months",
    blurb: [
      "Sitting and tasting food show up on different days for different babies.",
      "If food is starting, keep it slow and follow your clinician. This is not a meal plan.",
    ],
    milestone: "Your baby is working on sitting and getting curious about whatever you’re eating. Not sitting yet, and not eating yet, are both still common.",
  },
  {
    id: "b9",
    phase: "baby",
    label: "About 9–13 months",
    blurb: [
      "Moving — crawling, cruising, or neither yet — gets more interesting than stuff.",
      "Many babies this age want your plate. Baby-proof the room you actually live in.",
    ],
    milestone: "Your baby is into pulling up, cruising the furniture, or still happy on the floor. They want whatever you have. Walking can wait.",
  },
  {
    id: "b15",
    phase: "baby",
    label: "Early toddler",
    blurb: [
      "These days are motion, cups that survive a drop, and shoes that stay on.",
      "One safe room beats a house full of gadgets.",
    ],
    milestone: "Your toddler is into climbing, copying you, and testing the word no. Big feelings are this age, not a report card.",
  },
];

const STAGE_MAP = Object.fromEntries(STAGES.map((s) => [s.id, s])) as Record<StageId, StageMeta>;

export function stageMeta(id: StageId): StageMeta {
  return STAGE_MAP[id];
}

export function upcomingStages(id: StageId, count: number): StageMeta[] {
  const index = STAGES.findIndex((stage) => stage.id === id);
  if (index < 0 || count < 1) return [];
  const phase = STAGES[index]?.phase;
  return STAGES.slice(index + 1)
    .filter((stage) => stage.phase === phase)
    .slice(0, count);
}

function pack(tags: Tags, picks: Array<(tags: Tags) => Card>): Card[] {
  const out: Card[] = [];
  const seen = new Set<string>();
  for (const pick of picks) {
    const card = pick(tags);
    const key = card.id.split(":")[0];
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(card);
  }
  return out.slice(0, 10);
}

export function cardsFor(id: StageId, tags: Tags): Card[] {
  switch (id) {
    case "p4":
      return pack(tags, [
        prenatal,
        bra,
        (t) => snack(t, "nausea"),
        bands,
        bottle,
        pants,
        top,
        questions,
        pillow,
        lounge,
      ]);
    case "p9":
      return pack(tags, [
        pants,
        questions,
        top,
        lounge,
        bottle,
        bra,
        prenatal,
        pillow,
        bands,
        (t) => snack(t, "nausea"),
      ]);
    case "p14":
      return pack(tags, [blanket, support, pants, lounge, pillow, tees, socks, bottle, cream, questions]);
    case "p21":
      return pack(tags, [blanket, support, softpants, lounge, cream, socks, tote, tees, pillow, questions]);
    case "p28":
      return pack(tags, [
        tote,
        birthpage,
        socks,
        charger,
        (t) => snack(t, "onehand"),
        softpants,
        cream,
        carResearch,
        lounge,
      ]);
    case "p34":
      return pack(tags, [goinghome, carcheck, tote, charger, folder, socks, joggers, peri, pads, softpants]);
    case "p38":
      return pack(tags, [
        peri,
        pads,
        joggers,
        mesh,
        witch,
        lounge,
        carcheck,
        goinghome,
        (t) => snack(t, "onehand"),
      ]);
    case "b0":
      return pack(tags, [eyes, peri, pads, joggers, mesh, witch, feeding, pillow, underwear, (t) => snack(t, "onehand")]);
    case "b2":
      return pack(tags, [eyes, feeding, pillow, (t) => snack(t, "onehand"), underwear, bib, bottle, pads, joggers, sack]);
    case "b6":
      return pack(tags, [
        outTheDoor,
        sack,
        (t) => snack(t, "onehand"),
        sound,
        bib,
        bottle,
        hat,
        teether,
        (t) => (t.gear === "helpers" ? play(t) : books(t)),
        underwear,
      ]);
    case "b4m":
      return pack(tags, [
        (t) => (t.gear === "helpers" ? play(t) : books(t)),
        bib,
        teether,
        hat,
        sound,
        cup,
        seat,
        mat,
        (t) => snack(t, "onehand"),
        outTheDoor,
      ]);
    case "b6m":
      return pack(tags, [
        seat,
        foods,
        cup,
        mat,
        bib,
        shoes,
        (t) => (t.gear === "helpers" ? play(t) : books(t)),
        hat,
        latch,
        snackcup,
      ]);
    case "b9":
      return pack(tags, [proof, shoes, libraryOrBooks, latch, cup, snackcup, gate, bib, mat, hat]);
    case "b15":
      return pack(tags, [
        toddlerShoes,
        snackcup,
        gate,
        latch,
        cup,
        proof,
        hat,
        mat,
        bib,
        (t) => (t.gear === "helpers" ? play(t) : books(t)),
      ]);
    default:
      return [];
  }
}

type ParentCreator = {
  name: string;
  href: string;
  initials: string;
  avatar: string;
  line: string;
  style: Style[];
  materials?: Mat[];
  feeding?: Feed[];
  sleep?: SleepPlan[];
  gear?: Gear[];
};

/** Real accounts, matched to how someone parents. A new trio each calendar day. */
const PARENT_CREATORS: ParentCreator[] = [
  {
    name: "Hey Sleepy Baby",
    href: "https://www.instagram.com/heysleepybaby/",
    initials: "HS",
    avatar: "/graphics/creators/heysleepybaby.jpg",
    line: "Sleep that follows the baby. No clock, and no cry-it-out.",
    style: ["childled"],
    sleep: ["cosleep"],
  },
  {
    name: "Mr. Chazz",
    href: "https://www.instagram.com/mrchazz/",
    initials: "MC",
    avatar: "/graphics/creators/mrchazz.jpg",
    line: "See the child first. Guide them, without shame.",
    style: ["childled"],
  },
  {
    name: "Janet Lansbury",
    href: "https://www.instagram.com/janetlansbury/",
    initials: "JL",
    avatar: "/graphics/creators/janetlansbury.jpg",
    line: "Follow their lead. A few toys. A calm limit stays.",
    style: ["childled", "firm", "routines"],
    gear: ["minimal", "few"],
  },
  {
    name: "Dr. Becky",
    href: "https://www.instagram.com/drbeckyatgoodinside/",
    initials: "DB",
    avatar: "/graphics/creators/drbeckyatgoodinside.jpg",
    line: "Warm, and the limit still holds.",
    style: ["firm", "practical"],
  },
  {
    name: "Big Little Feelings",
    href: "https://www.instagram.com/biglittlefeelings/",
    initials: "BL",
    avatar: "/graphics/creators/biglittlefeelings.jpg",
    line: "Name the feeling. The boundary stays.",
    style: ["firm", "routines"],
  },
  {
    name: "Solid Starts",
    href: "https://www.instagram.com/solidstarts/",
    initials: "SS",
    avatar: "/graphics/creators/solidstarts.jpg",
    line: "Food at their pace. They decide the bite.",
    style: ["childled", "practical"],
  },
  {
    name: "Kids Eat in Color",
    href: "https://www.instagram.com/kids.eat.in.color/",
    initials: "KE",
    avatar: "/graphics/creators/kidseatincolor.jpg",
    line: "No pressure at the table. You serve it, they choose.",
    style: ["childled", "practical"],
  },
  {
    name: "The Milk Meg",
    href: "https://www.instagram.com/themilkmeg/",
    initials: "MM",
    avatar: "",
    line: "Feeding that follows the baby’s cues.",
    style: ["childled"],
    feeding: ["breast", "combo"],
  },
  {
    name: "The Formula Mom",
    href: "https://www.instagram.com/theformulamom/",
    initials: "FM",
    avatar: "/graphics/creators/theformulamom.jpg",
    line: "Bottles, without the guilt lecture.",
    style: ["practical"],
    feeding: ["formula", "combo"],
  },
  {
    name: "Low Tox Life",
    href: "https://www.instagram.com/lowtoxlife/",
    initials: "LT",
    avatar: "/graphics/creators/lowtoxlife.jpg",
    line: "Fewer harsh ingredients, without the panic.",
    style: ["practical"],
    materials: ["lowtox", "clean", "care"],
  },
  {
    name: "Taking Cara Babies",
    href: "https://www.instagram.com/takingcarababies/",
    initials: "TC",
    avatar: "/graphics/creators/takingcarababies.jpg",
    line: "A crib rhythm for naps and nights.",
    style: ["routines", "firm"],
    sleep: ["crib"],
  },
  {
    name: "Karrie Locher",
    href: "https://www.instagram.com/karrie_locher/",
    initials: "KL",
    avatar: "/graphics/creators/karrie_locher.jpg",
    line: "The first weeks at home, including how feeding actually goes.",
    style: ["practical"],
    feeding: ["breast", "combo"],
  },
  {
    name: "Feeding Littles",
    href: "https://www.instagram.com/feedinglittles/",
    initials: "FL",
    avatar: "/graphics/creators/feedinglittles.jpg",
    line: "Baby-led bites, and the toddler who stops after two.",
    style: ["practical", "childled"],
  },
  {
    name: "Busy Toddler",
    href: "https://www.instagram.com/busytoddler/",
    initials: "BT",
    avatar: "/graphics/creators/busytoddler.jpg",
    line: "Short play from things already in the house.",
    style: ["practical"],
    gear: ["helpers", "few"],
  },
  {
    name: "Yummy Toddler Food",
    href: "https://www.instagram.com/yummytoddlerfood/",
    initials: "YT",
    avatar: "/graphics/creators/yummytoddlerfood.jpg",
    line: "Meals a toddler will sit down for.",
    style: ["practical"],
  },
  {
    name: "Nurtured First",
    href: "https://www.instagram.com/nurturedfirst/",
    initials: "NF",
    avatar: "/graphics/creators/nurturedfirst.jpg",
    line: "Words for the hard moment. Kind, and still clear.",
    style: ["childled", "firm"],
  },
  {
    name: "Dr. Jazmine",
    href: "https://www.instagram.com/themompsychologist/",
    initials: "DJ",
    avatar: "/graphics/creators/themompsychologist.jpg",
    line: "What is going on under the behavior.",
    style: ["practical", "childled"],
  },
  {
    name: "Baby-Led Weaning",
    href: "https://www.instagram.com/babyledweanteam/",
    initials: "BW",
    avatar: "/graphics/creators/babyledweanteam.jpg",
    line: "First foods they feed themselves.",
    style: ["practical", "childled"],
  },
  {
    name: "Raised Good",
    href: "https://www.instagram.com/raisedgood/",
    initials: "RG",
    avatar: "/graphics/creators/raisedgood.jpg",
    line: "Slower days. Less stuff, more of the child.",
    style: ["childled"],
    gear: ["minimal", "few"],
  },
  {
    name: "Transforming Toddlerhood",
    href: "https://www.instagram.com/transformingtoddlerhood/",
    initials: "TT",
    avatar: "/graphics/creators/transformingtoddlerhood.jpg",
    line: "A toddler limit that does not turn into a fight.",
    style: ["firm", "routines"],
  },
  {
    name: "Legendairy Milk",
    href: "https://www.instagram.com/legendairymilk/",
    initials: "LM",
    avatar: "/graphics/creators/legendairymilk.jpg",
    line: "Supply and pumping, without the scare.",
    style: ["practical"],
    feeding: ["breast", "combo"],
  },
  {
    name: "Expecting and Empowered",
    href: "https://www.instagram.com/expectingandempowered/",
    initials: "EE",
    avatar: "/graphics/creators/expectingandempowered.jpg",
    line: "Short workouts for pregnancy and after.",
    style: ["practical", "routines"],
  },
  {
    name: "Gina & Roxanne",
    href: "https://www.instagram.com/mamastefit/",
    initials: "GR",
    avatar: "/graphics/creators/mamastefit.jpg",
    line: "How to move while pregnant, and how to push.",
    style: ["practical"],
  },
];

function creatorScore(creator: ParentCreator, tags: Tags, useStyle: boolean): number {
  let score = 0;
  if (useStyle && creator.style.includes(tags.style)) score += 5;
  if (
    creator.materials?.includes(tags.materials) &&
    (tags.materials === "lowtox" || tags.materials === "clean" || tags.materials === "care")
  ) {
    score += 6;
  }
  if (creator.feeding?.includes(tags.feeding) && tags.feeding !== "undecided") score += 7;
  if (creator.sleep?.includes(tags.sleep) && (tags.sleep === "cosleep" || tags.sleep === "crib")) score += 4;
  if (creator.gear?.includes(tags.gear) && tags.gear !== "either") score += 3;
  return score;
}

function rankedCreators(tags: Tags, useStyle: boolean): ParentCreator[] {
  return [...PARENT_CREATORS].sort((a, b) => {
    const diff = creatorScore(b, tags, useStyle) - creatorScore(a, tags, useStyle);
    return diff || a.name.localeCompare(b.name);
  });
}

function dayIndex() {
  return Math.floor(Date.now() / 86_400_000);
}

function toFeatured(creator: ParentCreator): FeaturedCreator {
  return {
    name: creator.name,
    post: creator.line,
    image: "",
    avatar: creator.avatar,
    href: creator.href,
    initials: creator.initials,
  };
}

export function creatorsFor(tags: Tags, _stageId: StageId, useStyle = true): FeaturedCreator[] {
  const ranked = rankedCreators(tags, useStyle);
  const top = creatorScore(ranked[0], tags, useStyle);
  const close = ranked.filter((creator) => {
    const score = creatorScore(creator, tags, useStyle);
    return score > 0 && score >= top - 3;
  });
  const pool = close.length >= 6 ? close : ranked.slice(0, Math.min(9, ranked.length));
  const start = dayIndex() % pool.length;
  const picked: ParentCreator[] = [];
  for (let i = 0; i < Math.min(3, pool.length); i += 1) picked.push(pool[(start + i) % pool.length]);
  return picked.map(toFeatured);
}

export function creatorFor(tags: Tags, _phase: Phase): Creator {
  const [top] = creatorsFor(tags, "b0");
  return { name: top.name, where: "How you parent", why: top.post };
}


export function tagSentences(tags: Tags): string[] {
  const budget = {
    budget: "You’d rather stretch the dollar.",
    mid: "You usually buy in the middle.",
    splurge: "You’ll pay more if it lasts or feels safer.",
    thrift: "You’d rather buy it used or make it.",
  }[tags.budget];
  const materials = {
    clean: "You want non-toxic and clean.",
    lowtox: "You look for low-tox when you can.",
    care: "Ingredients matter to you some.",
    works: "You mostly want what works.",
  }[tags.materials];
  const feedingLine = {
    breast: "Feeding plan: breast.",
    formula: "Feeding plan: formula.",
    combo: "Feeding plan: both.",
    undecided: "Feeding plan: still deciding.",
  }[tags.feeding];
  const food =
    tags.food === "other"
      ? tags.foodNote
        ? `Recipes: you wrote “${tags.foodNote}.”`
        : "Recipes: other. No note yet."
      : tags.food === "avoid"
        ? tags.avoid
          ? `Recipes leave out ${tags.avoid}.`
          : "Recipes leave something out. Ingredient not chosen yet."
        : {
            easy: "Recipes should just be easy.",
            vegetarian: "Recipes should be vegetarian.",
            vegan: "Recipes should be vegan.",
            avoid: "Recipes leave something out.",
            other: "Recipes: other.",
          }[tags.food];
  const gear = {
    minimal: "You’d rather buy as little as possible.",
    few: "You want a few well-chosen things.",
    helpers: "You’re open to the thing that saves sanity.",
    secondhand: "You’d rather shop second-hand.",
    either: "Gear preference: no strong lean.",
  }[tags.gear];
  const sleep = {
    crib: "Sleep plan: crib or bassinet.",
    cosleep: "Sleep plan: co-sleeping, with a bedside bassinet.",
    unsure: "Sleep plan: not sure yet.",
    either: "Sleep plan: not chosen.",
  }[tags.sleep];
  const exp = {
    first: "This is a first baby.",
    experienced: "You’ve done this before.",
    alongside: "You’re doing this with someone who has.",
    unspecified: "First baby: not specified.",
  }[tags.experience];
  const style = {
    firm: "Style: firm and kind.",
    childled: "Style: child-led.",
    routines: "Style: routines first.",
    practical: "Style: practical.",
  }[tags.style];
  const pace = {
    moment: "You want this week, not the next one.",
    ahead: "You like to see the next stage.",
    flow: "You’ll look ahead when you need it.",
    figuring: "You’re still figuring out how far ahead to look.",
    either: "Planning style: not chosen.",
  }[tags.pace];
  const load = {
    ready: "This stage feels pretty prepared.",
    mixed: "This stage feels up and down.",
    full: "This stage feels like a lot.",
    either: "How this stage feels: not chosen.",
  }[tags.load];
  const help = {
    shorter: "A shorter list helps.",
    wait: "You want to know what can wait.",
    fine: "You’re okay seeing what helps.",
    either: "What helps: not chosen.",
  }[tags.help];
  return [pace, load, help, style, budget, materials, feedingLine, food, gear, sleep, exp];
}
