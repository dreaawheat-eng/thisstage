import { o as __toESM } from "../_runtime.mjs";
import { J as require_react, x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { a as hasGateSessionMarker, t as GROK_PROVIDERS } from "./server-axd6PSjU.mjs";
import { a as MessageCircle, c as Heart, d as CalendarDays, f as Baby, i as Sprout, l as ChevronRight, n as UserRound, o as Instagram, s as House, t as Users, u as ChevronLeft } from "../_libs/lucide-react.mjs";
import { i as topicLabel, n as authMiddleware, t as TOPICS } from "./circle-topics-Dem1AvH_.mjs";
import { i as signOut, r as signIn, t as authClient } from "./client-1vAx-gM_.mjs";
import { n as createSsrRpc, r as lookupProducts } from "./products.functions-D8BGsSaF.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BuAgLoLk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function toISODate(d) {
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function parseDateOnly(iso) {
	const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
	if (!match) return null;
	const y = Number(match[1]);
	const m = Number(match[2]);
	const d = Number(match[3]);
	const date = new Date(y, m - 1, d);
	if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null;
	return date;
}
function calendarDaysBetween(later, earlier) {
	const a = Date.UTC(later.getFullYear(), later.getMonth(), later.getDate());
	const b = Date.UTC(earlier.getFullYear(), earlier.getMonth(), earlier.getDate());
	return Math.round((a - b) / 864e5);
}
/** Completed weeks from a due date. Due date itself is week 40. */
function gestationalWeek(dueISO, now = /* @__PURE__ */ new Date()) {
	const due = parseDateOnly(dueISO);
	if (!due) return null;
	const daysAlong = 280 - calendarDaysBetween(due, now);
	return Math.floor(daysAlong / 7);
}
function ageDays(birthdayISO, now = /* @__PURE__ */ new Date()) {
	const born = parseDateOnly(birthdayISO);
	if (!born) return null;
	return calendarDaysBetween(now, born);
}
var FRUIT = {
	4: "a poppy seed",
	5: "a sesame seed",
	6: "a lentil",
	7: "a blueberry",
	8: "a raspberry",
	9: "a cherry",
	10: "a kumquat",
	11: "a fig",
	12: "a lime",
	13: "a lemon",
	14: "a peach",
	15: "an apple",
	16: "an avocado",
	17: "a pear",
	18: "a bell pepper",
	19: "a mango",
	20: "a banana",
	21: "a carrot",
	22: "a spaghetti squash",
	23: "a grapefruit",
	24: "an ear of corn",
	25: "a cauliflower",
	26: "a head of lettuce",
	27: "a cabbage",
	28: "an eggplant",
	29: "a butternut squash",
	30: "a coconut",
	31: "a coconut",
	32: "a jicama",
	33: "a pineapple",
	34: "a cantaloupe",
	35: "a honeydew",
	36: "a head of romaine",
	37: "a bunch of swiss chard",
	38: "a leek",
	39: "a mini watermelon",
	40: "a small pumpkin"
};
function fruitForWeek(week) {
	if (week <= 4) return FRUIT[4];
	if (week >= 40) return FRUIT[40];
	return FRUIT[week] ?? FRUIT[20];
}
function pregnancyStageId(week) {
	if (week <= 8) return "p4";
	if (week <= 13) return "p9";
	if (week <= 20) return "p14";
	if (week <= 27) return "p21";
	if (week <= 33) return "p28";
	if (week <= 37) return "p34";
	return "p38";
}
function babyStageId(days) {
	if (days < 11) return "b0";
	if (days < 36) return "b2";
	if (days < 85) return "b6";
	if (days < 160) return "b4m";
	if (days < 245) return "b6m";
	if (days < 410) return "b9";
	return "b15";
}
function pregnancyHeadline(week) {
	if (week < 4) return "Earlier than week 4";
	if (week > 42) return "Past week 42";
	return `You’re in week ${week}`;
}
function ageFigure(days) {
	if (days <= 0) return {
		kicker: "Born",
		figure: "today"
	};
	if (days === 1) return {
		kicker: "Age",
		figure: "1 day"
	};
	if (days < 14) return {
		kicker: "Age",
		figure: `${days} days`
	};
	if (days < 60) {
		const weeks = Math.max(1, Math.floor(days / 7));
		return {
			kicker: "Age",
			figure: `${weeks} ${weeks === 1 ? "week" : "weeks"}`
		};
	}
	const months = Math.max(1, Math.floor(days / 30.4375));
	if (months < 24) return {
		kicker: "Age",
		figure: `${months} ${months === 1 ? "month" : "months"}`
	};
	const years = Math.floor(months / 12);
	return {
		kicker: "Age",
		figure: `${years} ${years === 1 ? "year" : "years"}`
	};
}
function agePhrase(days, name) {
	const who = name?.trim() || "Your baby";
	if (days <= 0) return name?.trim() ? `${name.trim()} was born today` : "Born today";
	if (days === 1) return `${who} is 1 day old`;
	if (days < 14) return `${who} is ${days} days old`;
	if (days < 60) {
		const w = Math.max(1, Math.floor(days / 7));
		return `${who} is ${w} ${w === 1 ? "week" : "weeks"} old`;
	}
	const months = Math.floor(days / 30.4375);
	if (months < 24) {
		const m = Math.max(1, months);
		return `${who} is ${m} ${m === 1 ? "month" : "months"} old`;
	}
	const years = Math.floor(months / 12);
	return `${who} is ${years} ${years === 1 ? "year" : "years"} old`;
}
function dueRelative(dueISO, now = /* @__PURE__ */ new Date()) {
	const due = parseDateOnly(dueISO);
	if (!due) return null;
	const days = calendarDaysBetween(due, now);
	if (days === 0) return "Due date is today";
	if (days > 0) {
		const weeks = Math.round(days / 7);
		if (weeks <= 1) return days === 1 ? "1 day to go" : `${days} days to go`;
		return `About ${weeks} weeks to go`;
	}
	const past = Math.abs(days);
	if (past === 1) return "1 day past the due date";
	if (past < 14) return `${past} days past the due date`;
	return "Well past the due date on file";
}
function phaseOf(id) {
	return id.startsWith("p") ? "pregnancy" : "baby";
}
/** Pregnant, or pregnant plus a child already here, stays on the plan. Baby-is-here follows age. */
function journeyFor(mode, birthday) {
	if (mode !== "baby") return "expecting";
	const days = birthday ? ageDays(birthday) : null;
	if (days === null || days < 160) return "newborn";
	if (days < 410) return "solids";
	return "toddler";
}
var QUESTIONS = [
	{
		key: "pace",
		prompt: "Do you like a heads-up, or is this week enough?",
		options: [
			{
				value: "moment",
				label: "This week is plenty",
				hint: "Don’t show me the next thing yet."
			},
			{
				value: "ahead",
				label: "I like a heads-up",
				hint: "Tell me what’s coming."
			},
			{
				value: "flow",
				label: "I’ll look when I need it",
				hint: "Keep it tucked away."
			},
			{
				value: "figuring",
				label: "Still figuring that out",
				hint: "A little peek is fine."
			}
		]
	},
	{
		key: "load",
		prompt: "How are you feeling about this stage?",
		options: [
			{
				value: "ready",
				label: "Pretty good. I’ve got this."
			},
			{
				value: "mixed",
				label: "Depends on the day"
			},
			{
				value: "full",
				label: "Honestly, it’s a lot"
			}
		]
	},
	{
		key: "help",
		prompt: "When it feels like too much, what actually helps?",
		options: [
			{
				value: "shorter",
				label: "A shorter list"
			},
			{
				value: "wait",
				label: "Tell me what can wait"
			},
			{
				value: "fine",
				label: "I’m good. Show me the useful stuff."
			}
		]
	},
	{
		key: "style",
		prompt: "When you’re with them, you tend to…",
		options: [
			{
				value: "firm",
				label: "Be warm, and still hold the line",
				hint: "You explain it, and the limit stays."
			},
			{
				value: "childled",
				label: "Follow their lead",
				hint: "Their cues matter more than the clock."
			},
			{
				value: "routines",
				label: "Keep the same rhythm",
				hint: "Same order, most days. It helps."
			},
			{
				value: "practical",
				label: "Do what gets you through the day",
				hint: "No philosophy required."
			}
		]
	},
	{
		key: "budget",
		prompt: "When you buy for the baby, what do you usually do?",
		options: [
			{
				value: "budget",
				label: "Stretch the dollar"
			},
			{
				value: "mid",
				label: "Land somewhere in the middle"
			},
			{
				value: "splurge",
				label: "Spend more if it’ll last"
			},
			{
				value: "thrift",
				label: "Buy it used, or make it",
				hint: "Thrift it when you can. Make it when that’s easier."
			}
		]
	},
	{
		key: "materials",
		prompt: "How much do you think about ingredients?",
		options: [
			{
				value: "clean",
				label: "I want it clean"
			},
			{
				value: "lowtox",
				label: "Low-tox when I can"
			},
			{
				value: "care",
				label: "I care, but I’m not strict"
			},
			{
				value: "works",
				label: "I mostly want what works"
			}
		]
	},
	{
		key: "feeding",
		prompt: "How are you hoping to feed?",
		options: [
			{
				value: "breast",
				label: "Breastfeeding"
			},
			{
				value: "formula",
				label: "Formula"
			},
			{
				value: "combo",
				label: "A little of both"
			},
			{
				value: "undecided",
				label: "I haven’t decided"
			}
		]
	},
	{
		key: "sleep",
		prompt: "Where do you picture them sleeping?",
		options: [
			{
				value: "crib",
				label: "In a crib or bassinet"
			},
			{
				value: "cosleep",
				label: "In the room with us"
			},
			{
				value: "unsure",
				label: "I haven’t decided"
			}
		]
	},
	{
		key: "food",
		prompt: "What should dinner look like at your house?",
		options: [
			{
				value: "easy",
				label: "Easy. Whatever we already eat.",
				hint: "One pan is a win."
			},
			{
				value: "vegetarian",
				label: "Vegetarian",
				hint: "No meat. Eggs and dairy are fine."
			},
			{
				value: "vegan",
				label: "Vegan",
				hint: "Plants only."
			},
			{
				value: "avoid",
				label: "Leave something out",
				hint: "Dairy, gluten, nuts, or eggs."
			},
			{
				value: "other",
				label: "Something else",
				hint: "Tell us in a few words."
			}
		]
	},
	{
		key: "gear",
		prompt: "How do you feel about baby gear?",
		options: [
			{
				value: "minimal",
				label: "As few as possible"
			},
			{
				value: "few",
				label: "A few good things"
			},
			{
				value: "helpers",
				label: "Whatever makes the day easier"
			},
			{
				value: "secondhand",
				label: "Secondhand is great"
			}
		]
	}
];
var FEEDING_NOW = {
	key: "feeding",
	prompt: "How’s feeding going?",
	options: [
		{
			value: "breast",
			label: "Breastfeeding"
		},
		{
			value: "formula",
			label: "Formula"
		},
		{
			value: "combo",
			label: "A little of both"
		},
		{
			value: "undecided",
			label: "It changes"
		}
	]
};
var SLEEP_NOW = {
	key: "sleep",
	prompt: "Where are they sleeping these days?",
	options: [
		{
			value: "crib",
			label: "In a crib or bassinet"
		},
		{
			value: "cosleep",
			label: "In the room with us"
		},
		{
			value: "unsure",
			label: "It depends on the night"
		}
	]
};
var SLEEP_CRIB = {
	key: "sleep",
	prompt: "Where are they sleeping these days?",
	options: [
		{
			value: "crib",
			label: "In a crib"
		},
		{
			value: "cosleep",
			label: "In the room with us"
		},
		{
			value: "unsure",
			label: "It depends on the night"
		}
	]
};
var SLEEP_OLDER = {
	key: "sleep",
	prompt: "Where do they sleep most nights?",
	options: [
		{
			value: "crib",
			label: "In their own bed"
		},
		{
			value: "cosleep",
			label: "In the room with us"
		},
		{
			value: "unsure",
			label: "It depends on the night"
		}
	]
};
/** Style only makes sense once a child is here. Pregnancy-only skips it. */
function askStyleFor(mode, children) {
	if (mode !== "pregnant") return true;
	return children.some((child) => child.kind === "born");
}
function questionsFor(journey, askStyle = true) {
	return QUESTIONS.flatMap((question) => {
		if (question.key === "style" && !askStyle) return [];
		if (journey === "expecting") return [question];
		if (question.key === "budget") return [{
			...question,
			prompt: "When you buy for them, what do you usually do?"
		}];
		if (question.key === "gear") return [{
			...question,
			prompt: "How do you feel about the gear?"
		}];
		if (question.key === "feeding") return journey === "newborn" ? [FEEDING_NOW] : [];
		if (question.key === "sleep") {
			if (journey === "toddler") return [SLEEP_OLDER];
			if (journey === "solids") return [SLEEP_CRIB];
			return [SLEEP_NOW];
		}
		return [question];
	});
}
var AVOID_OPTIONS = [
	{
		value: "dairy",
		label: "Dairy"
	},
	{
		value: "gluten",
		label: "Gluten"
	},
	{
		value: "nuts",
		label: "Nuts"
	},
	{
		value: "eggs",
		label: "Eggs"
	}
];
var SKIP_VALUE = {
	pace: "figuring",
	load: "mixed",
	help: "shorter",
	style: "firm",
	budget: "mid",
	materials: "works",
	feeding: "undecided",
	sleep: "unsure",
	food: "easy",
	gear: "few"
};
var FRUIT_ART = {
	"a poppy seed": "/graphics/blueberry.jpg",
	"a sesame seed": "/graphics/blueberry.jpg",
	"a lentil": "/graphics/blueberry.jpg",
	"a blueberry": "/graphics/blueberry.jpg",
	"a raspberry": "/graphics/raspberry.jpg",
	"a cherry": "/graphics/raspberry.jpg",
	"a kumquat": "/graphics/lemon.jpg",
	"a fig": "/graphics/raspberry.jpg",
	"a lime": "/graphics/lemon.jpg",
	"a lemon": "/graphics/lemon.jpg",
	"a peach": "/graphics/apple.jpg",
	"an apple": "/graphics/apple.jpg",
	"an avocado": "/graphics/avocado.jpg",
	"a pear": "/graphics/apple.jpg",
	"a mango": "/graphics/mango.jpg",
	"a banana": "/graphics/banana.jpg",
	"a grapefruit": "/graphics/lemon.jpg",
	"a coconut": "/graphics/coconut.jpg",
	"a spaghetti squash": "/graphics/pumpkin.jpg",
	"a butternut squash": "/graphics/pumpkin.jpg",
	"a pineapple": "/graphics/pineapple.jpg",
	"a cantaloupe": "/graphics/pumpkin.jpg",
	"a honeydew": "/graphics/watermelon.jpg",
	"a mini watermelon": "/graphics/watermelon.jpg",
	"a small pumpkin": "/graphics/pumpkin.jpg"
};
function fruitArt(name) {
	return FRUIT_ART[name] ?? null;
}
var PRODUCT_ART = {
	peri: "/graphics/product-care.jpg",
	pads: "/graphics/product-care.jpg",
	mesh: "/graphics/product-care.jpg",
	underwear: "/graphics/product-care.jpg",
	cream: "/graphics/product-care.jpg",
	witch: "/graphics/product-care.jpg",
	prenatal: "/graphics/product-bottle.jpg",
	joggers: "/graphics/product-clothes.jpg",
	pants: "/graphics/product-clothes.jpg",
	softpants: "/graphics/product-clothes.jpg",
	lounge: "/graphics/product-clothes.jpg",
	goinghome: "/graphics/product-clothes.jpg",
	bra: "/graphics/product-clothes.jpg",
	top: "/graphics/product-clothes.jpg",
	tees: "/graphics/product-clothes.jpg",
	hat: "/graphics/product-clothes.jpg",
	socks: "/graphics/product-clothes.jpg",
	bottle: "/graphics/product-bottle.jpg",
	regbottle: "/graphics/product-bottle.jpg",
	regsleep: "/graphics/product-sleep.jpg",
	regwater: "/graphics/product-bottle.jpg",
	regdiaper: "/graphics/product-care.jpg",
	charger: "/graphics/product-bottle.jpg",
	carrier: "/graphics/product-carrier.jpg",
	stroller: "/graphics/product-stroller.jpg",
	seat: "/graphics/product-stroller.jpg",
	cup: "/graphics/product-cup.jpg",
	snackcup: "/graphics/product-cup.jpg",
	proof: "/graphics/product-cup.jpg",
	books: "/graphics/product-books.jpg",
	shoes: "/graphics/product-shoes.jpg",
	toddlerShoes: "/graphics/product-shoes.jpg",
	insoles: "/graphics/product-shoes.jpg",
	sack: "/graphics/product-sleep.jpg",
	sound: "/graphics/product-sleep.jpg",
	play: "/graphics/product-play.jpg",
	teether: "/graphics/product-play.jpg",
	bib: "/graphics/product-play.jpg",
	mat: "/graphics/product-play.jpg",
	pillow: "/graphics/product-pillow.jpg",
	support: "/graphics/product-pillow.jpg",
	bands: "/graphics/product-pillow.jpg",
	gate: "/graphics/product-gate.jpg",
	latch: "/graphics/product-gate.jpg",
	tote: "/graphics/tote.jpg"
};
function productArt(id) {
	return PRODUCT_ART[id] ?? "/graphics/product-care.jpg";
}
var BAND_WHY = {
	budget: "you want to stretch the dollar",
	mid: "you usually buy in the middle",
	splurge: "you’ll pay more if it lasts or feels safer",
	thrift: "you’d rather buy it used or make it"
};
var MAT_WHY = {
	clean: "you want non-toxic and clean",
	lowtox: "you look for low-tox when you can",
	care: "ingredients matter to you some",
	works: "you mostly want what works"
};
var STYLE_WHY = {
	firm: "Kept firm and kind",
	childled: "Kept easy to follow their lead",
	routines: "Kept steady enough for a routine",
	practical: "Kept only if it works today"
};
function shelf(mat) {
	if (mat === "care") return "care";
	if (mat === "works") return "works";
	return "lowtox";
}
function why(hook, tags, withMat = true) {
	const style = STYLE_WHY[tags.style];
	if (!withMat) return `${hook} — ${BAND_WHY[tags.budget]}. ${style}.`;
	return `${hook} — ${BAND_WHY[tags.budget]}, and ${MAT_WHY[tags.materials]}. ${style}.`;
}
function priceTag(band) {
	if (band === "budget") return "Budget";
	if (band === "splurge") return "Splurge";
	if (band === "thrift") return "Secondhand";
	return "Mid";
}
function matTag(mat) {
	if (mat === "clean") return "Non-toxic";
	if (mat === "lowtox") return "Low-tox";
	if (mat === "care") return "Simpler";
	return "Straightforward";
}
function whereFor(band, mat, kind) {
	if (kind === "task") return "Free";
	if (band === "budget" || band === "thrift") return mat === "lowtox" || mat === "clean" ? "Drugstore" : "Any store";
	if (band === "splurge") return "Online";
	return mat === "lowtox" || mat === "clean" ? "Online" : "Store or online";
}
function hash(s) {
	let h = 2166136261;
	for (let i = 0; i < s.length; i++) {
		h ^= s.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}
function seedVotes(id) {
	const h = hash(id);
	return {
		used: 36 + h % 160,
		skip: 4 + (h >> 8) % 36,
		wish: 10 + (h >> 16) % 70
	};
}
function nine(budget, mid, splurge) {
	const row = (names) => ({
		lowtox: names[0],
		care: names[1],
		works: names[2]
	});
	return {
		budget: row(budget),
		mid: row(mid),
		splurge: row(splurge),
		thrift: row(budget)
	};
}
function product(id, line, hook, names, sensitive = false) {
	return (tags) => {
		const name = names[tags.budget][shelf(tags.materials)];
		return {
			id: `${id}:${tags.budget}_${tags.materials}`,
			kind: "product",
			sensitive,
			name,
			line,
			tags: [
				priceTag(tags.budget),
				matTag(tags.materials),
				whereFor(tags.budget, tags.materials, "product")
			],
			why: why(hook, tags),
			image: productArt(id)
		};
	};
}
function task(id, name, line, hook, steps, sensitive = false) {
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
			tags: [
				"Free",
				"This week",
				"Not a product"
			],
			why: why(extra, tags, false),
			steps
		};
	};
}
var peri = product("peri", "Warm water and a squeeze bottle. That is the whole job.", "Recovery basics, not a gadget", nine([
	"Simple peri bottle",
	"Angled peri bottle",
	"Store-brand peri bottle"
], [
	"Fragrance-free peri bottle",
	"The usual peri bottle",
	"Peri bottle with a travel top"
], [
	"Glass peri bottle",
	"Premium angled peri bottle",
	"Postpartum peri kit"
]), true);
var pads = product("pads", "Heavy flow, unscented if you can stand it. Buy the overnight length.", "The unglamorous thing you will actually use", nine([
	"Unscented drugstore pads",
	"Overnight pads, unscented",
	"Economy overnight pads"
], [
	"Organic cotton pads",
	"Overnight pad pack",
	"Extra-long overnight pads"
], [
	"Organic cotton pad bundle",
	"Soft overnight bundle",
	"Premium overnight bundle"
]), true);
var joggers = product("joggers", "Dark, soft, and fine if they get ruined. Skip anything you have to dry-clean.", "Clothes for the first days home", nine([
	"Dark soft joggers",
	"Black cotton joggers",
	"Dark sweatpants"
], [
	"Soft cotton joggers",
	"Dark lounge pants",
	"Easy-wash black joggers"
], [
	"Soft lounge set",
	"Modal lounge set",
	"Matching lounge set"
]));
var mesh = product("mesh", "Hospital-style underwear you can toss. Dark colors hide the evidence.", "A disposable layer, not a wardrobe", nine([
	"Mesh underwear, multipack",
	"High-waist disposable underwear",
	"Hospital-style underwear"
], [
	"Organic cotton high-waist briefs",
	"Soft high-waist underwear",
	"Seamless high-waist pack"
], [
	"Organic cotton brief bundle",
	"Soft recovery underwear set",
	"Premium recovery briefs"
]), true);
var witch = product("witch", "Cooling liners some people like in week one. Fragrance-free is the kinder version.", "Optional comfort, not a treatment", nine([
	"Unscented witch hazel pads",
	"Cooling liners",
	"Store-brand cooling pads"
], [
	"Fragrance-free witch hazel liners",
	"Cooling pad pack",
	"Extra cooling liners"
], [
	"Organic witch hazel liners",
	"Gentle cooling liner set",
	"Premium cooling pads"
]), true);
var prenatal = product("prenatal", "A reminder to take one vitamin — not a dose, and not a prescription. Ask your own provider what they want you on.", "One bottle, not a cabinet of them", nine([
	"Folate prenatal, small bottle",
	"Store-brand prenatal",
	"Basic once-a-day prenatal"
], [
	"Methylfolate prenatal",
	"Once-a-day prenatal",
	"Prenatal plus a pill case"
], [
	"Third-party-tested prenatal",
	"Subscription prenatal",
	"Premium prenatal pack"
]), true);
var bra = product("bra", "Wire-free and not tight. You can live in two of these.", "Comfort over a maternity haul", nine([
	"Soft cotton bralette",
	"Seamless bralette, 2-pack",
	"Sleep bra multipack"
], [
	"Organic cotton bralette",
	"Wireless everyday bra",
	"Seamless wireless bra"
], [
	"GOTS cotton bra, two colors",
	"Bra you can nurse in later",
	"Premium wireless bra"
]));
var pants = product("pants", "The waistband is the problem, not your style. One fix is enough.", "Something that still buttons", nine([
	"Button extender",
	"Over-bump leggings, basic",
	"Sale-rack leggings"
], [
	"Cotton over-bump leggings",
	"One pair of bump jeans",
	"Comfort jeggings"
], [
	"Organic over-bump denim",
	"The one good pair of bump jeans",
	"Premium maternity denim"
]));
var top = product("top", "A longer tee beats a whole new closet this month.", "Room, not a lookbook", nine([
	"Long cotton tee",
	"Soft jersey tee, 2-pack",
	"Any longer tee on sale"
], [
	"Organic long tee",
	"Bump-friendly tee",
	"Stretch jersey top"
], [
	"Organic cotton tee, two colors",
	"Nice long tee",
	"Premium stretch top"
]));
var support = product("support", "One thing that takes pressure off — a band or better shoes. Not both, unless you want them.", "Support without a gear pile", nine([
	"Simple cotton belly band",
	"Basic belly band",
	"Gel insoles"
], [
	"Cotton support band",
	"Belly band",
	"Cushioned sneakers"
], [
	"Linen-lean band",
	"Well-made support belt",
	"Maternity sneakers"
]));
var lounge = product("lounge", "Roomy clothes you will nap in. That is the dress code.", "Somewhere soft to be", nine([
	"Bump lounge set, basic",
	"Soft shorts and a tee",
	"Sale lounge set"
], [
	"Cotton bump lounge set",
	"Everyday lounge set",
	"Stretch lounge set"
], [
	"Organic lounge set",
	"The nice lounge set",
	"Premium bump lounge set"
]));
var cream = product("cream", "Belly balm is optional. It does not prevent stretch marks by force of will. Use it if it feels good.", "A maybe, not a moral test", nine([
	"Plain shea butter",
	"Drugstore belly butter",
	"Any lotion you already like"
], [
	"Fragrance-free body oil",
	"Unscented belly butter",
	"Scented belly cream"
], [
	"Cold-pressed oil, fragrance-free",
	"A nice jar of belly cream",
	"Spa-style belly balm"
]), true);
var softpants = product("softpants", "The next size of soft pants. You do not need a capsule wardrobe.", "Room to sit", nine([
	"Soft maternity joggers",
	"Stretch pants, one pair",
	"Sale joggers"
], [
	"Cotton maternity joggers",
	"Everyday bump pants",
	"Comfort work-from-home pants"
], [
	"Organic cotton joggers",
	"Nice bump trousers",
	"Premium soft pants"
]));
var tote = product("tote", "A bag with a charger, a toothbrush, and lip balm. Pack it once, then stop.", "A start, not a styled flat-lay", nine([
	"Tote you already own",
	"Cheap packing cube",
	"Grocery tote as the hospital bag"
], [
	"Simple packing cube",
	"Small weekender",
	"Packing cube set of two"
], [
	"Leather-free weekender",
	"The one nice weekender",
	"Structured hospital tote"
]));
var socks = product("socks", "Swollen feet are common late. Softer socks or a half-size up can matter more than a device.", "Feet, not another gadget", nine([
	"Soft socks, multipack",
	"Basic compression socks",
	"Cushioned socks"
], [
	"Cotton compression socks",
	"Everyday compression socks",
	"Athletic compression socks"
], [
	"Organic cotton compression socks",
	"The comfortable compression pair",
	"Premium recovery socks"
]), true);
var goinghome = product("goinghome", "For you, not a baby photo outfit. Soft, dark, easy to get on.", "The outfit you leave in", nine([
	"Dark button-front shirt",
	"Soft cardigan you own",
	"Sale button shirt"
], [
	"Cotton button-front dress",
	"Going-home cardigan",
	"Stretch button shirt"
], [
	"Organic cotton dress",
	"Soft going-home set",
	"Premium knit set"
]));
var charger = product("charger", "The long cable, packed now, so it is not a 2 a.m. problem.", "A boring thing that saves a spiral", nine([
	"Long phone cable",
	"Extra cable plus a brick",
	"Any spare charger"
], [
	"Six-foot cable",
	"Cable and a small battery",
	"Labeled spare charger"
], [
	"Long braided cable",
	"Battery pack and cable",
	"Premium battery pack"
]));
var folder = task("papers", "One folder for paperwork", "ID, insurance card, and the birth-preferences page. Not a binder system.", "Paperwork in one place", [
	"Put your ID and insurance card in a single folder.",
	"Add the one-page birth preferences, if you wrote them.",
	"Stop. Two copies are plenty."
]);
var bands = product("bands", "Some people like wristbands for nausea. They are cheap to try and easy to abandon.", "A small experiment, not a promise", nine([
	"Basic acupressure bands",
	"Drugstore wristbands",
	"Any soft wristbands"
], [
	"Fabric acupressure bands",
	"Adjustable wristbands",
	"Sport-style bands"
], [
	"Soft cotton wristbands",
	"The nicer adjustable pair",
	"Premium nausea bands"
]));
var bottle = product("water", "A bottle that opens with one hand. Fill it tonight.", "Water within reach", nine([
	"Plastic straw bottle",
	"Any straw bottle",
	"Sports bottle you own"
], [
	"Glass straw bottle",
	"Everyday straw bottle",
	"Insulated bottle"
], [
	"Glass bottle with a sleeve",
	"Nice insulated bottle",
	"Premium straw bottle"
]));
var pillow = product("pillow", "A pillow between the knees helps a lot of people sleep. A regular extra pillow counts.", "Sleep support you might already own", nine([
	"Extra bed pillow",
	"Cheap body pillow",
	"Rolled blanket, honestly"
], [
	"Cotton body pillow",
	"C-shaped pillow",
	"Full body pillow"
], [
	"Organic body pillow",
	"The well-made pregnancy pillow",
	"Premium body pillow"
]));
var tees = product("longertee", "Shirts that still cover you when you sit. Two is a wardrobe.", "Coverage, not a haul", nine([
	"Two long tees",
	"Multipack long tees",
	"Sale long-sleeve tee"
], [
	"Organic long tees, two",
	"Bump-length tee",
	"Stretch long tee"
], [
	"Organic cotton, two colors",
	"Nice long knit",
	"Premium long tee"
]));
var insoles = product("insoles", "Shoes you already like, plus cushion. Often enough.", "Use the shoes you have", nine([
	"Drugstore gel insoles",
	"Basic cushion insoles",
	"Any soft insole"
], [
	"Cork-free soft insoles",
	"All-day insoles",
	"Sport insoles"
], [
	"Premium all-day insoles",
	"The good insole pair",
	"Custom-feel insoles"
]));
var questions = task("questions", "Three questions for your next visit", "Write them in your phone now. Appointments go fast.", "A short list, not a research project", [
	"Which symptoms should make me call you?",
	"What vitamin do you actually want me on?",
	"What can wait until the next visit?"
], true);
var carResearch = task("carsearch", "Car seat research, not a purchase panic", "You are allowed to learn the categories before you buy. One evening, then close the tabs.", "Research only this week", [
	"Infant seat versus convertible — pick the path that fits your car.",
	"Check expiration dates if you are borrowing one.",
	"Stop after you know the model. Installation is a later week."
]);
var birthpage = task("birthpage", "Birth preferences, one page", "Who is with you, the lighting, feeding wishes, and what to do if the plan changes. It is not a contract.", "One page, then you’re done", [
	"Write five lines, not a booklet.",
	"Include feeding wishes and who should be in the room.",
	"Note that plans can change. Bring two copies."
], true);
var carcheck = task("carcheck", "Schedule a car seat check", "A free inspection with a certified tech. The seat can be right and still be installed wrong.", "A task, not another product", [
	"Find a free check — many fire stations and hospitals host them.",
	"Book it before the due month, not the night before.",
	"Install it yourself first, then let them correct it."
]);
var underwear = product("underwear", "High waist, dark, lots of them. You will not want to do laundry on day three.", "The unpretty pack", nine([
	"Dark cotton briefs, multipack",
	"High-waist cotton pack",
	"Cheap dark underwear"
], [
	"Organic high-waist briefs",
	"Soft high-waist pack",
	"Seamless high-waist pack"
], [
	"Organic cotton brief set",
	"Soft recovery underwear",
	"Premium high-waist set"
]));
var play = product("play", "One thing to look at on the floor. Not a gym, a mobile, and a basket.", "One object of interest", nine([
	"High-contrast board book",
	"A simple rattle",
	"Any board book from the library"
], [
	"Organic cotton play mat",
	"Small play mat",
	"Activity mat, one only"
], [
	"Wooden play gym",
	"The nice play mat",
	"Designer play gym"
]));
var bib = product("bib", "Drool is the activity. A cloth at the neck saves outfits you like.", "Absorb, don’t collect", nine([
	"Flour-sack towels",
	"Basic bandana bibs",
	"Any soft washcloths"
], [
	"Organic muslin bibs",
	"Cotton bandana bibs, 4-pack",
	"Everyday bibs"
], [
	"Organic bib set",
	"Nice cotton bib bundle",
	"Premium bib set"
]));
var teether = product("teether", "Gums can be loud this month. Cold washcloth counts as a teether.", "Something safe to chew", nine([
	"Clean cold washcloth",
	"Simple silicone teether",
	"Water-filled teether"
], [
	"Solid silicone teether",
	"Wood and silicone teether",
	"Freezer teether"
], [
	"Solid wood teether, unfinished",
	"The well-made silicone teether",
	"Premium teether set"
]), true);
var seat = product("seat", "A place to sit while you eat. Floor seats and hand-me-down chairs both count if they’re sturdy.", "Somewhere to sit, not a dining room", nine([
	"Simple floor seat",
	"Basic high-chair pad",
	"Secondhand chair, straps checked"
], [
	"Wooden floor seat",
	"Everyday high chair",
	"Compact high chair"
], [
	"Solid-wood high chair",
	"The high chair you’ll keep",
	"Full-size high chair"
]));
var cup = product("cup", "An open cup or a straw cup. You do not need six systems.", "One cup that survives the day", nine([
	"Small open cup",
	"Basic straw cup",
	"Any small cup"
], [
	"Stainless open cup",
	"Everyday straw cup",
	"Spill-resistant cup"
], [
	"Weighted stainless cup",
	"The nice straw cup",
	"Premium cup set"
]));
var mat = product("mat", "Food will hit the floor. A washable layer lowers the stakes.", "Permission to be messy", nine([
	"Old shower curtain",
	"Basic splat mat",
	"Towel you don’t love"
], [
	"Cotton splat mat",
	"Washable splat mat",
	"Vinyl splat mat"
], [
	"Linen-cotton splat mat",
	"The nice washable mat",
	"Premium splat mat"
]));
var foods = task("foods", "First foods — a conversation, not a menu", "Many families wait until closer to six months, and a clinician’s okay. This card is a pause, not a recipe.", "Research only, and only if the timing is right", [
	"Ask your child’s clinician before offering food.",
	"If they say wait, wait. The cup and the seat can still be useful.",
	"No schedules from strangers. One new taste at a time when you begin."
], true);
var proof = product("proof", "The room you actually live in. Outlets and the one tippy thing. Not the whole house in a weekend.", "One room, then stop", nine([
	"Outlet covers",
	"Basic outlet plugs",
	"Tape and outlet plugs"
], [
	"Simple outlet covers",
	"Outlet kit for one room",
	"Latch and outlet bundle"
], [
	"Furniture anchors plus covers",
	"One-room proofing kit",
	"Full anchor kit"
]));
var shoes = product("shoes", "Soft soles until they are walking a lot. Shoes are for outside, not for milestones.", "Feet first, fashion later", nine([
	"Soft booties",
	"Basic soft-sole shoes",
	"Sale crib shoes"
], [
	"Leather soft-soles",
	"Everyday first shoes",
	"Flexible sneakers"
], [
	"Leather first shoes",
	"The nice soft-sole pair",
	"Premium first walkers"
]));
var books = product("books", "A few board books, or a library card. Repetition is the point.", "Stories, not a curriculum", nine([
	"Library card",
	"Three board books, secondhand",
	"Any board book stack"
], [
	"Cloth book, two titles",
	"Board book four-pack",
	"Everyday board books"
], [
	"Cloth and board set",
	"The nice book bundle",
	"Boxed board-book set"
]));
var latch = product("latch", "Cabinets you open every day. One afternoon.", "The cabinets, not a smart home", nine([
	"Basic cabinet latches",
	"Magnetic latches, small pack",
	"Strap locks"
], [
	"Simple magnetic latches",
	"Latch set for one kitchen",
	"Adhesive latches"
], [
	"Well-made magnetic latches",
	"The latch set that doesn’t break",
	"Premium latch kit"
]));
var hat = product("hat", "Sun on a walk. A hat with a floppy brim is the whole strategy.", "Shade you can lose and replace", nine([
	"Cotton sun hat",
	"Basic bucket hat",
	"Any floppy hat"
], [
	"Organic cotton sun hat",
	"Everyday sun hat",
	"Packable hat"
], [
	"Organic brim hat",
	"The nice sun hat",
	"Premium sun hat"
]));
var sound = product("sound", "Steady noise helps some households. A box fan you already own is a legal answer.", "One sound, not a sleep program", nine([
	"Box fan you own",
	"Basic sound machine",
	"Free fan, truly"
], [
	"Simple sound machine",
	"Everyday sound machine",
	"App plus a speaker you have"
], [
	"Analog-style sound machine",
	"The machine with a real knob",
	"Premium sound machine"
]));
var sack = product("sack", "One sleep layer in the right weight. Stop swaddling once a baby shows signs of rolling, and ask your provider if you aren’t sure.", "One layer, checked for fit", nine([
	"Two cotton swaddles",
	"Basic sleep sack",
	"Receiving blankets, used snug"
], [
	"Organic muslin swaddle",
	"Cotton sleep sack",
	"Zip sleep sack"
], [
	"Organic sleep sack",
	"The well-made sleep sack",
	"Premium sleep sack"
]), true);
var gate = product("gate", "The stair or the room you need shut. Measure the opening before you buy.", "One opening, closed", nine([
	"Pressure gate, basic",
	"Basic baby gate",
	"Secondhand gate, no recalls"
], [
	"Simple pressure gate",
	"Hardware-mount gate",
	"Walk-through gate"
], [
	"Well-made pressure gate",
	"The gate that stays put",
	"Premium walk-through gate"
]));
var toddlerShoes = product("tshoes", "Shoes that stay on and bend. Leave the rigid ones on the shelf.", "Walkable, not cute-only", nine([
	"Flexible sneakers, budget",
	"Basic strap shoes",
	"Sale flexible shoes"
], [
	"Leather flexible shoes",
	"Everyday toddler sneakers",
	"Strap shoes that stay on"
], [
	"Leather everyday shoes",
	"The pair you’ll rebuy in the next size",
	"Premium flexible shoes"
]));
var snackcup = product("snackcup", "A cup for puffs or whatever you already eat. Lids optional.", "Snacks that survive the stroller", nine([
	"Small open container",
	"Basic snack cup",
	"Any lidded cup"
], [
	"Stainless snack cup",
	"Everyday snack catcher",
	"Silicone snack cup"
], [
	"Stainless snack set",
	"The cup that doesn’t crack",
	"Premium snack set"
]));
function carrier(tags) {
	const names = nine([
		"Cotton ring sling",
		"Soft wrap",
		"Used carrier, straps checked"
	], [
		"Simple ring sling",
		"Soft-structured carrier",
		"Everyday carrier"
	], [
		"Organic-fiber carrier",
		"The nice soft-structured carrier",
		"Premium carrier"
	]);
	return product("carrier", "One way to be hands-free. Inspect used buckles and read the weight range.", tags.gear === "minimal" ? "One carrier, not a stroller too" : "A way to hold the baby and still move", names)(tags);
}
function stroller(tags) {
	return product("stroller", "The one you will actually fold and leave the house with. You do not need two.", "The sanity-saving way out the door", nine([
		"Basic umbrella stroller",
		"Lightweight stroller",
		"Sale-rack stroller"
	], [
		"Compact stroller",
		"Everyday compact stroller",
		"The practical stroller"
	], [
		"Compact stroller, simpler materials",
		"The stroller you’ll walk daily",
		"Full-size stroller"
	]))(tags);
}
function outTheDoor(tags) {
	if (tags.gear === "helpers" || tags.style === "routines" && tags.gear !== "minimal") return stroller(tags);
	return carrier(tags);
}
function grid(budget, mid, splurge) {
	const row = (names) => ({
		lowtox: names[0],
		care: names[1],
		works: names[2]
	});
	return {
		budget: row(budget),
		mid: row(mid),
		splurge: row(splurge),
		thrift: row(budget)
	};
}
function kitchenFor(tags) {
	if (tags.food === "vegetarian") return "vegetarian";
	if (tags.food === "vegan") return "vegan";
	if (tags.food === "avoid") {
		if (tags.avoid === "dairy" || tags.avoid === "gluten" || tags.avoid === "nuts" || tags.avoid === "eggs") return tags.avoid;
		return "avoid";
	}
	return "easy";
}
function snack(tags, moment) {
	const names = {
		nausea: {
			easy: grid([
				"Unscented ginger chews + saltines",
				"Ginger chews and crackers",
				"Pretzels and ginger ale"
			], [
				"Ginger tea, unsweetened",
				"Bedside cracker tin",
				"Salty snack bin"
			], [
				"Small-batch ginger lozenges",
				"Nicer ginger tin",
				"Assorted bland snack box"
			]),
			vegetarian: grid([
				"Ginger tea and plain oat biscuits",
				"Oat biscuits",
				"Crackers you already eat"
			], [
				"Roasted chickpea packs",
				"Plant snack tin",
				"Seedy crackers"
			], [
				"Small-batch ginger drops",
				"Nice oat and ginger tin",
				"Vegetarian snack box"
			]),
			vegan: grid([
				"Ginger tea and rice crackers",
				"Plain oat biscuits",
				"Crackers, no dairy"
			], [
				"Roasted chickpeas",
				"Fruit and salt",
				"Vegan ginger chews"
			], [
				"Small-batch ginger drops",
				"Nice vegan ginger tin",
				"Plant-only snack box"
			]),
			dairy: grid([
				"Ginger tea and rice crackers",
				"Plain crackers",
				"Pretzels"
			], [
				"Roasted chickpeas",
				"Fruit and saltines",
				"Dairy-free ginger chews"
			], [
				"Small-batch ginger drops",
				"Nice dairy-free tin",
				"The dairy-free bland box"
			]),
			gluten: grid([
				"Plain rice crackers",
				"Rice cakes and ginger tea",
				"Fruit"
			], [
				"Cheese and grapes",
				"Yogurt and berries",
				"Gluten-free crackers"
			], [
				"Nice rice-cracker tin",
				"Gluten-free ginger lozenges",
				"The gluten-free bland box"
			]),
			nuts: grid([
				"Ginger chews and saltines",
				"Crackers",
				"Pretzels"
			], [
				"Cheese and fruit",
				"Yogurt",
				"Nut-free granola"
			], [
				"Nut-free ginger tin",
				"Seed crackers, no nuts",
				"The nut-free bland box"
			]),
			eggs: grid([
				"Ginger chews and saltines",
				"Crackers and cheese",
				"Pretzels"
			], [
				"Yogurt and fruit",
				"Cheese and crackers",
				"Egg-free bars"
			], [
				"Egg-free ginger tin",
				"Nice cracker tin",
				"The egg-free bland box"
			]),
			avoid: grid([
				"Plain rice crackers",
				"Single-ingredient crackers",
				"Rice cakes"
			], [
				"Short-list cracker box",
				"Simple bars you can read fast",
				"Familiar safe crackers"
			], [
				"Short-ingredient snack tin",
				"Simple snack box",
				"The assortment you trust"
			])
		},
		onehand: {
			easy: grid([
				"Cheese sticks and fruit",
				"Crackers and cheese",
				"Whatever is already in the fridge"
			], [
				"Unsalted nuts and fruit",
				"One-hand snack box",
				"Granola bars you like"
			], [
				"Short-list snack box, one month",
				"Nice one-hand bento bits",
				"The fancy bar box"
			]),
			vegetarian: grid([
				"Roasted chickpeas",
				"Banana and oat biscuits",
				"Peanut butter on toast"
			], [
				"Hummus cups",
				"Vegetarian snack box",
				"Trail mix you know"
			], [
				"Small-batch snack tin",
				"Nice vegetarian snack tin",
				"Premium vegetarian bars"
			]),
			vegan: grid([
				"Roasted chickpeas",
				"Banana and oat biscuits",
				"Peanut butter on toast"
			], [
				"Hummus cups",
				"Fruit and seed crackers",
				"Vegan trail mix"
			], [
				"Small-batch vegan bites",
				"Nice vegan snack tin",
				"Premium vegan bars"
			]),
			dairy: grid([
				"Hummus and crackers",
				"Fruit and sunflower seeds",
				"Peanut butter on toast"
			], [
				"Roasted chickpeas",
				"Dairy-free snack cups",
				"A bar with no milk"
			], [
				"Nice dairy-free tin",
				"Dairy-free bento bits",
				"Premium dairy-free bars"
			]),
			gluten: grid([
				"Cheese and fruit",
				"Yogurt and berries",
				"Rice cakes and peanut butter"
			], [
				"Cheese sticks and grapes",
				"Gluten-free bars",
				"Nuts and fruit"
			], [
				"Nice gluten-free tin",
				"Gluten-free bento bits",
				"Premium gluten-free bars"
			]),
			nuts: grid([
				"Cheese and fruit",
				"Yogurt and crackers",
				"Sunflower seeds and fruit"
			], [
				"Hummus cups",
				"Nut-free bars",
				"Cheese sticks"
			], [
				"Nice nut-free tin",
				"Seed-butter bites",
				"Premium nut-free bars"
			]),
			eggs: grid([
				"Cheese and fruit",
				"Yogurt and granola",
				"Crackers and cheese"
			], [
				"Hummus cups",
				"Egg-free bars",
				"Nuts and fruit"
			], [
				"Nice egg-free tin",
				"Egg-free bento bits",
				"Premium egg-free bars"
			]),
			avoid: grid([
				"Fruit you tolerate",
				"Safe crackers, pre-portioned",
				"Your known-safe snack"
			], [
				"Labeled short-list bars",
				"Simple snack cups",
				"The brand you already trust"
			], [
				"Short-ingredient box",
				"A simple curated tin",
				"Premium familiar assortment"
			])
		}
	};
	const kitchen = kitchenFor(tags);
	const name = names[moment][kitchen][tags.budget][shelf(tags.materials)];
	const line = moment === "nausea" ? "Keep it boring and nearby. Eat what stays down. This is not a nutrition plan." : "Food you can eat while holding a baby. Protein if you can, crumbs if that’s the day.";
	const foodBit = kitchen === "easy" ? "" : kitchen === "vegetarian" ? " Vegetarian, like you asked." : kitchen === "vegan" ? " Plants only, like you asked." : kitchen === "avoid" ? " Short ingredient lists, since you’re leaving something out." : ` No ${kitchen}, like you asked.`;
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
			whereFor(tags.budget, tags.materials, "product")
		],
		why: `${why(moment === "nausea" ? "A snack that asks nothing of you" : "One-hand food", tags)}${foodBit}`
	};
}
function feeding(tags) {
	const grids = {
		breast: nine([
			"Short-list nipple balm",
			"Basic nipple balm",
			"Store-brand nipple cream"
		], [
			"Fragrance-free nipple balm",
			"The balm you’ll reopen",
			"Hydrogel pads"
		], [
			"Silver nursing cups",
			"Balm plus hydrogel pads",
			"Premium hydrogel set"
		]),
		formula: nine([
			"Two glass bottles, slow flow",
			"Starter bottle set",
			"Basic slow-flow bottles"
		], [
			"Glass bottles, set of four",
			"Four everyday bottles",
			"Standard bottle set"
		], [
			"Glass bottle set and a rack",
			"The bottle set plus a drying rack",
			"Full bottle system"
		]),
		combo: nine([
			"One balm and one glass bottle",
			"Balm plus two bottles",
			"Balm and a starter bottle"
		], [
			"Fragrance-free balm and two bottles",
			"Small both-paths kit",
			"Balm plus a bottle set"
		], [
			"Silver cups plus glass bottles",
			"The nicer both-paths kit",
			"Premium balm and bottles"
		]),
		undecided: nine([
			"One balm and one bottle",
			"Either-way starter",
			"One cream, one bottle"
		], [
			"Fragrance-free balm, one bottle",
			"Small undecided kit",
			"Balm and a basic bottle"
		], [
			"Nicer balm and one glass bottle",
			"The gentle either-way kit",
			"Premium mini kit"
		])
	};
	const lines = {
		breast: "For the feeding plan you’re on. This is comfort gear, not a latch diagnosis.",
		formula: "Slow-flow nipples and as few bottles as you can wash. Ask your clinician about formula itself.",
		combo: "A little of both paths, so you aren’t shopping twice if the week changes.",
		undecided: "One balm and one bottle. You can decide the plan later — this just covers tonight."
	};
	const hooks = {
		breast: "Matched to breastfeeding",
		formula: "Matched to formula",
		combo: "Matched to doing both",
		undecided: "Kept small while you decide"
	};
	const name = grids[tags.feeding][tags.budget][shelf(tags.materials)];
	return {
		id: `feed:${tags.feeding}:${tags.budget}_${tags.materials}`,
		kind: "product",
		sensitive: true,
		name,
		line: lines[tags.feeding],
		image: tags.feeding === "formula" ? "/graphics/product-bottle.jpg" : "/graphics/product-care.jpg",
		tags: [
			priceTag(tags.budget),
			matTag(tags.materials),
			tags.feeding === "formula" ? "Bottles" : "Feeding"
		],
		why: why(hooks[tags.feeding], tags)
	};
}
nine([
	"One glass bottle, slow flow",
	"Basic bottle, one",
	"Any single slow-flow bottle"
], [
	"One glass bottle and a spare nipple",
	"Everyday single bottle",
	"One bottle, slow flow"
], [
	"One nice glass bottle",
	"The single bottle you’ll reuse",
	"Premium single bottle"
]), nine([
	"Two glass bottles, slow flow",
	"Starter bottle set",
	"Basic slow-flow bottles"
], [
	"Glass bottles, set of four",
	"Four everyday bottles",
	"Standard bottle set"
], [
	"Glass bottle set and a rack",
	"The bottle set plus a drying rack",
	"Full bottle system"
]), nine([
	"Two glass bottles",
	"Balm plus two bottles",
	"Two basic bottles"
], [
	"Two everyday bottles",
	"Small both-paths set",
	"Bottle pair, slow flow"
], [
	"Glass pair and a rack",
	"The nicer both-paths set",
	"Premium two-bottle set"
]), nine([
	"One glass bottle",
	"Either-way bottle",
	"One basic bottle"
], [
	"One glass bottle, slow flow",
	"Single undecided bottle",
	"One everyday bottle"
], [
	"One nice glass bottle",
	"The gentle either-way bottle",
	"Premium single bottle"
]);
function libraryOrBooks(tags) {
	if (tags.gear === "minimal" || tags.style === "childled") return task("library", "Library card, not a book haul", "Board books survive being chewed, and the library replaces them for free.", "You’d rather buy as little as possible", [
		"Get the card if you don’t have one.",
		"Put six board books on hold.",
		"Return them when you’re bored. That’s allowed."
	])(tags);
	return books(tags);
}
var STAGES = [
	{
		id: "p4",
		phase: "pregnancy",
		label: "Weeks 4–8",
		sampleWeek: 8,
		blurb: ["Nausea can show up before you look pregnant at all.", "A vitamin you’ll actually take, a bra that doesn’t pinch, and a snack that stays down beat any registry."],
		milestone: "The baby is still very small, and most of the change is happening out of sight. Feeling sick, tired, or nothing yet are all common."
	},
	{
		id: "p9",
		phase: "pregnancy",
		label: "Weeks 9–13",
		sampleWeek: 12,
		blurb: ["Waistbands usually complain before the bump is obvious.", "This stretch is clothes that still fit, plus a short list for appointments — not a new wardrobe."],
		milestone: "The baby is growing faster than the bump, and a more baby-like shape is taking form. Clothes often feel tight before anyone else can tell."
	},
	{
		id: "p14",
		phase: "pregnancy",
		label: "Weeks 14–20",
		sampleWeek: 20,
		blurb: ["Energy often comes back a bit, and the bump starts to need room.", "One support item matters more than a pile of gear."],
		milestone: "A lot of people feel the first flutters in these weeks. The baby is moving more, even on the days you don’t feel it yet."
	},
	{
		id: "p21",
		phase: "pregnancy",
		label: "Weeks 21–27",
		sampleWeek: 24,
		blurb: ["The belly is doing the talking now.", "Belly balm is optional, not a test of how you parent. Car-seat research can stay research."],
		milestone: "Kicks get easier to notice, and the baby has room to turn and stretch. You might even see the belly move."
	},
	{
		id: "p28",
		phase: "pregnancy",
		label: "Weeks 28–33",
		sampleWeek: 30,
		blurb: ["The third trimester is mostly logistics.", "A small hospital-bag start and one page of birth preferences are enough for this week."],
		milestone: "The baby is putting on weight, so stretches feel tighter. Movements often turn into a press or a roll instead of a big kick."
	},
	{
		id: "p34",
		phase: "pregnancy",
		label: "Weeks 34–37",
		sampleWeek: 36,
		blurb: ["Bags and car seats move from someday to this month.", "You still don’t need a color-coded binder."],
		milestone: "There’s less room now. What you feel is more often a press, a roll, or a foot than a big kick."
	},
	{
		id: "p38",
		phase: "pregnancy",
		label: "Weeks 38–42",
		sampleWeek: 38,
		blurb: ["You are close. Comfort for the first days matters more than one more cute thing.", "Think peri care, pads, and something dark and soft to wear."],
		milestone: "The baby is about ready, snug, and making smaller movements. A lot of this stage is waiting."
	},
	{
		id: "b0",
		phase: "baby",
		label: "First 10 days",
		blurb: ["The first days are recovery, feeding, and sleep, on a loop.", "Many newborns mostly eat, sleep, and want to be held. You need less than a shopping cart."],
		milestone: "A newborn is mostly eating, sleeping, and wanting to be held. The days don’t have a shape yet, and that loop is the stage."
	},
	{
		id: "b2",
		phase: "baby",
		label: "Weeks 2–5",
		blurb: ["Feeding is still the whole day for a lot of families.", "Set up the path you’re actually on — breast, formula, or both — and food you can eat with one hand."],
		milestone: "Your baby is in a stretch of cluster feeding and fussy evenings. They know your voice and want you close."
	},
	{
		id: "b6",
		phase: "baby",
		label: "About 6–12 weeks",
		blurb: ["Crying often peaks somewhere in the second month for many babies, then eases.", "One way to leave the house, plus one safe sleep layer, is the whole shopping list."],
		milestone: "Your baby is more awake and more vocal, often in a crying stretch that eases. They notice faces and start answering with sounds."
	},
	{
		id: "b4m",
		phase: "baby",
		label: "About 3–5 months",
		blurb: ["Wake windows usually stretch a little. Many babies this age grab, drool, and laugh.", "Solids can wait unless your own clinician has already said otherwise."],
		milestone: "Your baby is grabbing, drooling, and putting everything in their mouth. Rolling might be starting, or not yet."
	},
	{
		id: "b6m",
		phase: "baby",
		label: "About 6–8 months",
		blurb: ["Sitting and tasting food show up on different days for different babies.", "If food is starting, keep it slow and follow your clinician. This is not a meal plan."],
		milestone: "Your baby is working on sitting and getting curious about whatever you’re eating. Not sitting yet, and not eating yet, are both still common."
	},
	{
		id: "b9",
		phase: "baby",
		label: "About 9–13 months",
		blurb: ["Moving — crawling, cruising, or neither yet — gets more interesting than stuff.", "Many babies this age want your plate. Baby-proof the room you actually live in."],
		milestone: "Your baby is into pulling up, cruising the furniture, or still happy on the floor. They want whatever you have. Walking can wait."
	},
	{
		id: "b15",
		phase: "baby",
		label: "Early toddler",
		blurb: ["These days are motion, cups that survive a drop, and shoes that stay on.", "One safe room beats a house full of gadgets."],
		milestone: "Your toddler is into climbing, copying you, and testing the word no. Big feelings are this age, not a report card."
	}
];
var STAGE_MAP = Object.fromEntries(STAGES.map((s) => [s.id, s]));
function stageMeta(id) {
	return STAGE_MAP[id];
}
function upcomingStages(id, count) {
	const index = STAGES.findIndex((stage) => stage.id === id);
	if (index < 0 || count < 1) return [];
	const phase = STAGES[index]?.phase;
	return STAGES.slice(index + 1).filter((stage) => stage.phase === phase).slice(0, count);
}
function pack(tags, picks) {
	const out = [];
	const seen = /* @__PURE__ */ new Set();
	for (const pick of picks) {
		const card = pick(tags);
		const key = card.id.split(":")[0];
		if (seen.has(key)) continue;
		seen.add(key);
		out.push(card);
	}
	return out.slice(0, 10);
}
function cardsFor(id, tags) {
	switch (id) {
		case "p4": return pack(tags, [
			prenatal,
			bra,
			(t) => snack(t, "nausea"),
			bands,
			bottle,
			pants,
			top,
			questions,
			pillow,
			lounge
		]);
		case "p9": return pack(tags, [
			pants,
			questions,
			top,
			lounge,
			bottle,
			bra,
			prenatal,
			pillow,
			bands,
			(t) => snack(t, "nausea")
		]);
		case "p14": return pack(tags, [
			(t) => t.gear === "minimal" ? insoles(t) : support(t),
			lounge,
			questions,
			pillow,
			tees,
			pants,
			socks,
			bottle,
			cream,
			(t) => snack(t, "onehand")
		]);
		case "p21": return pack(tags, [
			cream,
			carResearch,
			softpants,
			pillow,
			insoles,
			lounge,
			tote,
			socks,
			(t) => snack(t, "onehand"),
			tees
		]);
		case "p28": return pack(tags, [
			tote,
			birthpage,
			socks,
			charger,
			(t) => snack(t, "onehand"),
			pillow,
			softpants,
			cream,
			carResearch,
			lounge
		]);
		case "p34": return pack(tags, [
			goinghome,
			carcheck,
			tote,
			charger,
			folder,
			socks,
			joggers,
			peri,
			pads,
			pillow
		]);
		case "p38": return pack(tags, [
			peri,
			pads,
			joggers,
			mesh,
			witch,
			goinghome,
			charger,
			carcheck,
			tote,
			(t) => snack(t, "onehand")
		]);
		case "b0": return pack(tags, [
			peri,
			pads,
			joggers,
			mesh,
			witch,
			feeding,
			underwear,
			(t) => snack(t, "onehand"),
			bottle,
			bib
		]);
		case "b2": return pack(tags, [
			feeding,
			(t) => snack(t, "onehand"),
			underwear,
			bib,
			bottle,
			pads,
			joggers,
			sack,
			sound,
			peri
		]);
		case "b6": return pack(tags, [
			outTheDoor,
			sack,
			(t) => snack(t, "onehand"),
			sound,
			bib,
			bottle,
			hat,
			teether,
			(t) => t.gear === "helpers" ? play(t) : books(t),
			underwear
		]);
		case "b4m": return pack(tags, [
			(t) => t.gear === "helpers" ? play(t) : books(t),
			bib,
			teether,
			hat,
			sound,
			cup,
			seat,
			mat,
			(t) => snack(t, "onehand"),
			outTheDoor
		]);
		case "b6m": return pack(tags, [
			seat,
			foods,
			cup,
			mat,
			bib,
			shoes,
			(t) => t.gear === "helpers" ? play(t) : books(t),
			hat,
			latch,
			snackcup
		]);
		case "b9": return pack(tags, [
			proof,
			shoes,
			libraryOrBooks,
			latch,
			cup,
			snackcup,
			gate,
			bib,
			mat,
			hat
		]);
		case "b15": return pack(tags, [
			toddlerShoes,
			snackcup,
			gate,
			latch,
			cup,
			proof,
			hat,
			mat,
			bib,
			(t) => t.gear === "helpers" ? play(t) : books(t)
		]);
		default: return [];
	}
}
/** Real accounts, matched to how someone parents. Stage is not a factor. */
var PARENT_CREATORS = [
	{
		name: "Hey Sleepy Baby",
		href: "https://www.instagram.com/heysleepybaby/",
		initials: "HS",
		line: "Sleep that follows the baby. No clock, and no cry-it-out.",
		style: ["childled"],
		sleep: ["cosleep"]
	},
	{
		name: "Mr. Chazz",
		href: "https://www.instagram.com/mrchazz/",
		initials: "MC",
		line: "See the child first. Guide them, without shame.",
		style: ["childled"]
	},
	{
		name: "Janet Lansbury",
		href: "https://www.instagram.com/janetlansbury/",
		initials: "JL",
		line: "Follow their lead. A few toys. A calm limit stays.",
		style: [
			"childled",
			"firm",
			"routines"
		],
		gear: ["minimal", "few"]
	},
	{
		name: "Dr. Becky",
		href: "https://www.instagram.com/drbeckyatgoodinside/",
		initials: "DB",
		line: "Warm, and the limit still holds.",
		style: ["firm", "practical"]
	},
	{
		name: "Big Little Feelings",
		href: "https://www.instagram.com/biglittlefeelings/",
		initials: "BL",
		line: "Name the feeling. The boundary stays.",
		style: ["firm", "routines"]
	},
	{
		name: "Solid Starts",
		href: "https://www.instagram.com/solidstarts/",
		initials: "SS",
		line: "Food at their pace. They decide the bite.",
		style: ["childled", "practical"]
	},
	{
		name: "Kids Eat in Color",
		href: "https://www.instagram.com/kids.eat.in.color/",
		initials: "KE",
		line: "No pressure at the table. You serve it, they choose.",
		style: ["childled", "practical"]
	},
	{
		name: "The Milk Meg",
		href: "https://www.instagram.com/themilkmeg/",
		initials: "MM",
		line: "Feeding that follows the baby’s cues.",
		style: ["childled"],
		feeding: ["breast", "combo"]
	},
	{
		name: "The Formula Mom",
		href: "https://www.instagram.com/theformulamom/",
		initials: "FM",
		line: "Bottles, without the guilt lecture.",
		style: ["practical"],
		feeding: ["formula", "combo"]
	},
	{
		name: "Low Tox Life",
		href: "https://www.instagram.com/lowtoxlife/",
		initials: "LT",
		line: "Fewer harsh ingredients, without the panic.",
		style: ["practical"],
		materials: [
			"lowtox",
			"clean",
			"care"
		]
	}
];
function creatorScore(creator, tags, useStyle) {
	let score = 0;
	if (useStyle && creator.style.includes(tags.style)) score += 5;
	if (creator.materials?.includes(tags.materials) && (tags.materials === "lowtox" || tags.materials === "clean" || tags.materials === "care")) score += 6;
	if (creator.feeding?.includes(tags.feeding) && tags.feeding !== "undecided") score += 7;
	if (creator.sleep?.includes(tags.sleep) && (tags.sleep === "cosleep" || tags.sleep === "crib")) score += 4;
	if (creator.gear?.includes(tags.gear) && tags.gear !== "either") score += 3;
	return score;
}
function rankedCreators(tags, useStyle) {
	return [...PARENT_CREATORS].sort((a, b) => creatorScore(b, tags, useStyle) - creatorScore(a, tags, useStyle));
}
function toFeatured(creator) {
	return {
		name: creator.name,
		post: creator.line,
		image: "",
		avatar: "",
		href: creator.href,
		initials: creator.initials
	};
}
function creatorsFor(tags, _stageId, useStyle = true) {
	const ranked = rankedCreators(tags, useStyle);
	const picked = [];
	const take = (creator) => {
		if (creator && !picked.includes(creator) && picked.length < 3) picked.push(creator);
	};
	if (useStyle) take(ranked.find((creator) => creator.style.includes(tags.style)));
	if (tags.materials === "lowtox" || tags.materials === "clean" || tags.materials === "care") take(ranked.find((creator) => creator.materials?.includes(tags.materials)));
	if (tags.feeding === "breast" || tags.feeding === "formula" || tags.feeding === "combo") take(ranked.find((creator) => creator.feeding?.includes(tags.feeding)));
	if (tags.sleep === "cosleep") take(ranked.find((creator) => creator.sleep?.includes(tags.sleep)));
	if (tags.gear === "minimal" || tags.gear === "few") take(ranked.find((creator) => creator.gear?.includes(tags.gear)));
	for (const creator of ranked) take(creator);
	return picked.slice(0, 3).map(toFeatured);
}
/** A short read for the stage. Product names come from what parents mark used, not from this copy. */
var STAGE_BLOG = {
	p4: {
		title: "The first weeks are not a shopping week",
		body: "What parents keep using this early is small. A prenatal they can actually swallow, a waistband that doesn’t pinch, and a snack that stays down. The crib conversation can wait."
	},
	p9: {
		title: "Clothes complain before the bump shows",
		body: "The things that get worn are the ones that still fit real life. Softer pants, a top that doesn’t gap, and a short list for the next appointment. A new wardrobe is the thing people buy and then ignore."
	},
	p14: {
		title: "One support item beats a pile of gear",
		body: "Energy often comes back a little, and so does the urge to buy. Parents who are already through this stretch talk about a pillow, shoes that don’t ache, and clothes with room. Not a room full of maybes."
	},
	p21: {
		title: "The belly is doing the talking",
		body: "The products that stay out are the boring comforts. Belly cream if you like it, pants that stretch, and a pillow that lets you stay on your side. Car-seat research can stay research for now."
	},
	p28: {
		title: "This stretch is logistics, not a haul",
		body: "Parents start a bag, not a theme. Socks, a charger, a snack you can eat in a waiting room, and one page of birth notes. That is the list that gets used."
	},
	p34: {
		title: "Bags move from later to this month",
		body: "What people are glad they already had: a going-home outfit that is soft and dark, pads, and the car seat checked before labor. Cute extras are the things still in the bag a month later."
	},
	p38: {
		title: "Pack for the first night",
		body: "The products parents reach for after birth are recovery things. Peri care, heavy pads, and something dark and soft to wear. One more cute outfit is not the item that earns its place."
	},
	b0: {
		title: "The first days are a loop",
		body: "Eat, sleep, feed, repeat. The things that get used are for you as much as the baby. Recovery care, a simple feeding setup, and clothes you can sleep in. The rest of the registry can sit."
	},
	b2: {
		title: "Feeding is still the whole day",
		body: "Parents in these weeks keep using the feeding path they are actually on, a snack they can eat with one hand, and a sleep layer that is easy at 2 a.m. A second system is the thing that stays in the box."
	},
	b6: {
		title: "One way out of the house",
		body: "Around the second month, the products that matter are a carrier or stroller you will really use, and one safe sleep setup. Parents are not collecting gear. They are trying to leave the house once."
	},
	b4m: {
		title: "They are more awake. The list can stay short.",
		body: "What gets daily use now is simple. Something to chew on, a play mat that lives on the floor you already have, and sleep clothes that still fit. Solids can wait unless your own clinician has said otherwise."
	},
	b6m: {
		title: "Sitting and tasting show up on different days",
		body: "If food is starting, parents use a soft spoon, a cup with water, and a bib that actually catches. If food is not starting, those can wait. A chair you can wipe is worth more than a gadget."
	},
	b9: {
		title: "Moving gets more interesting than stuff",
		body: "The products parents keep are the ones that survive the floor. A cup, shoes for outside, and a gate for the room you live in. Most of the toy aisle does not get a second day."
	},
	b15: {
		title: "Toddler days are motion",
		body: "What stays in rotation is practical. Shoes that stay on, a cup that survives a drop, and a snack you can hand over in the car. One safe room still beats a house full of gadgets."
	}
};
function Mark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: "/logo.png",
		alt: "",
		className: clsx("object-contain", className)
	});
}
function Btn({ variant = "primary", className, type = "button", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		className: clsx("inline-flex min-h-12 items-center justify-center rounded-full px-5 text-base font-medium transition-opacity", "disabled:cursor-not-allowed disabled:opacity-40", variant === "primary" && "bg-terra text-paper", variant === "ghost" && "bg-transparent text-ink", variant === "sand" && "bg-sand text-ink", variant === "ink" && "bg-ink text-paper", variant === "line" && "border border-line bg-paper text-ink", className),
		...props
	});
}
function Screen({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: clsx("mx-auto w-full max-w-md px-5", className),
		children
	});
}
function Disclaimer({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm leading-relaxed text-muted",
		children
	});
}
var MEDICAL = "General info, not medical advice. Ask your provider about your pregnancy or child.";
function pickBadges(cards) {
	const scored = cards.filter((card) => card.kind === "product").map((card) => ({
		id: card.id,
		...seedVotes(card.id)
	}));
	const byUsed = [...scored].sort((a, b) => b.used - a.used);
	const byWish = [...scored].sort((a, b) => b.wish - a.wish);
	const badges = {};
	if (byUsed[0]) badges[byUsed[0].id] = "Most Loved";
	if (byUsed[1] && !badges[byUsed[1].id]) badges[byUsed[1].id] = "Best Seller";
	if (byWish[0] && !badges[byWish[0].id]) badges[byWish[0].id] = "Most Wished";
	const favorite = byUsed.find((card) => !badges[card.id] && card.used > card.skip * 3);
	if (favorite) badges[favorite.id] = "Parent Favorite";
	return badges;
}
function Badge({ label }) {
	if (!label) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex rounded-full bg-clay px-2.5 py-1 text-xs font-medium text-ink",
		children: label
	});
}
var VOTE_LABEL = {
	used: "Used it",
	skip: "Skip",
	wish: "Wish I had this"
};
function ShelfRow({ card, badge, onOpen }) {
	const shop = shopFor(card);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "flex items-center gap-3 border-t border-line py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: onOpen,
			className: "flex min-w-0 flex-1 gap-3 text-left",
			children: [card.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: card.image,
				alt: "",
				className: "size-16 shrink-0 rounded-2xl object-cover"
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { label: badge }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: clsx("line-clamp-2 font-medium leading-tight", badge && "mt-1"),
						children: card.name
					}),
					card.price ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm font-medium text-terra",
						children: card.price
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 line-clamp-2 text-sm leading-snug text-muted",
						children: card.line
					})
				]
			})]
		}), shop ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: shop.href,
			target: "_blank",
			rel: "noopener noreferrer",
			className: "shrink-0 text-sm font-medium text-terra",
			children: "Shop"
		}) : null]
	});
}
function ProductCard({ card, vote, onVote, onOpen, rank, badge }) {
	const [steps, setSteps] = (0, import_react.useState)(false);
	const counts = displayCounts(card.id, vote);
	const shop = shopFor(card);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-3xl border border-line bg-paper p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onOpen,
				className: "w-full text-left",
				children: [
					card.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: card.image,
						alt: "",
						className: "mb-3 aspect-square w-full rounded-2xl object-cover"
					}) : null,
					badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { label: badge }) : rank ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-terra",
						children: rank
					}) : null,
					card.kind === "task" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-terra",
						children: "A task, not a purchase"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-1 line-clamp-3 font-display text-2xl leading-tight text-ink",
						children: card.name
					}),
					card.price ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm font-medium text-terra",
						children: card.price
					}) : null,
					card.liveStore ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: card.price ? `At ${card.liveStore}. Price can change.` : `At ${card.liveStore}.`
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 leading-relaxed text-ink",
						children: card.line
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 flex flex-wrap gap-2",
						children: (card.keywords ?? card.tags).map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "rounded-full bg-clay px-3 py-1 text-sm text-ink",
							children: tag
						}, tag))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-ink",
							children: "Why you: "
						}), card.why]
					})
				]
			}),
			card.sensitive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-relaxed text-muted",
				children: "Not a medical recommendation."
			}) : null,
			card.kind === "task" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				variant: "line",
				className: "mt-4 w-full",
				onClick: () => setSteps((v) => !v),
				children: steps ? "Hide steps" : "Show steps"
			}) : shop ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: shop.href,
				target: "_blank",
				rel: "noopener noreferrer",
				className: "mt-4 flex min-h-12 w-full items-center justify-center rounded-full bg-terra px-5 text-base font-medium text-paper",
				children: ["Shop at ", shop.store]
			}) : null,
			card.kind === "product" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreRow, {
				card,
				skip: shop?.href
			}) : null,
			steps && card.steps ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-ink",
				children: card.steps.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: step }, step))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid grid-cols-3 gap-2",
				children: [
					"used",
					"skip",
					"wish"
				].map((choice) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": vote === choice,
					onClick: () => onVote(choice),
					className: clsx("flex min-h-12 items-center justify-center rounded-full px-1 text-center text-sm font-medium leading-tight", vote === choice ? "bg-ink text-paper" : "bg-sand text-ink"),
					children: VOTE_LABEL[choice]
				}, choice))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm tabular-nums text-muted",
				children: [
					counts.used,
					" used · ",
					counts.skip,
					" skipped · ",
					counts.wish,
					" wish they’d had it"
				]
			})
		]
	});
}
function shopFor(card) {
	if (card.kind !== "product") return null;
	if (card.liveHref) return {
		store: card.liveStore ?? "Amazon",
		href: card.liveHref
	};
	const q = encodeURIComponent(card.query || card.name);
	if (card.tags[0] === "Budget" || card.tags[0] === "Secondhand") return {
		store: "Walmart",
		href: `https://www.walmart.com/search?q=${q}`
	};
	if (card.tags[0] === "Splurge") return {
		store: "Nordstrom",
		href: `https://www.nordstrom.com/sr?origin=keywordsearch&keyword=${q}`
	};
	return {
		store: "Target",
		href: `https://www.target.com/s?searchTerm=${q}`
	};
}
function storeLinks(card) {
	if (card.kind !== "product") return [];
	const q = encodeURIComponent(card.query || card.name);
	const links = [
		{
			store: "Kohl's",
			href: `https://www.kohls.com/search.jsp?submit-search=web-regular&search=${q}`
		},
		{
			store: "Macy's",
			href: `https://www.macys.com/shop/search?keyword=${q}`
		},
		{
			store: "Nordstrom",
			href: `https://www.nordstrom.com/sr?origin=keywordsearch&keyword=${q}`
		},
		{
			store: "Target",
			href: `https://www.target.com/s?searchTerm=${q}`
		},
		{
			store: "Walmart",
			href: `https://www.walmart.com/search?q=${q}`
		},
		{
			store: "Amazon",
			href: `https://www.amazon.com/s?k=${q}`
		}
	];
	if (card.liveHref && card.liveStore) return [{
		store: card.liveStore,
		href: card.liveHref
	}, ...links.filter((link) => link.store !== card.liveStore)];
	return links;
}
function StoreRow({ card, skip }) {
	const links = storeLinks(card).filter((link) => link.href !== skip).slice(0, 5);
	if (!links.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: "Also at"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 flex flex-wrap gap-x-3",
			children: links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: link.href,
				target: "_blank",
				rel: "noopener noreferrer",
				className: "inline-flex min-h-11 items-center text-sm font-medium text-terra",
				children: link.store
			}, link.store))
		})]
	});
}
function displayCounts(id, vote) {
	const seed = seedVotes(id);
	return {
		used: seed.used + (vote === "used" ? 1 : 0),
		skip: seed.skip + (vote === "skip" ? 1 : 0),
		wish: seed.wish + (vote === "wish" ? 1 : 0)
	};
}
function findCard(cards, id) {
	if (!id) return null;
	return cards.find((card) => card.id === id) ?? null;
}
function normalizeExtraKids(input) {
	if (!Array.isArray(input)) return [];
	return input.slice(0, 2).flatMap((item) => {
		if (!item || typeof item !== "object") return [];
		const row = item;
		const sex = row.sex === "girl" || row.sex === "boy" || row.sex === "unknown" ? row.sex : "";
		return [{
			name: typeof row.name === "string" ? row.name.slice(0, 40) : "",
			birthday: typeof row.birthday === "string" ? row.birthday : "",
			sex
		}];
	});
}
function emptyExtra() {
	return {
		name: "",
		birthday: "",
		sex: ""
	};
}
function extraCount(mode, kidCount) {
	if (mode === "both") return Math.max(0, kidCount - 2);
	return Math.max(0, kidCount - 1);
}
function newChildId() {
	return Math.random().toString(36).slice(2, 10);
}
function chipLabel(child) {
	const name = child.name.trim();
	if (name) return name;
	return child.kind === "pregnant" ? "Expected" : "Baby";
}
function childStageLine(child, now = /* @__PURE__ */ new Date()) {
	if (child.kind === "pregnant") {
		const week = gestationalWeek(child.due, now);
		if (week === null) return "Add a due date";
		return pregnancyHeadline(week);
	}
	const days = ageDays(child.birthday, now);
	if (days === null) return "Add a birthday";
	if (days < 0) return "Birthday is still ahead";
	return agePhrase(days);
}
function draftToChildren(draft) {
	const kids = [];
	const name = draft.babyName.trim();
	const pregnancySex = draft.pregnancySex === "girl" || draft.pregnancySex === "boy" ? draft.pregnancySex : "unknown";
	const bornSex = draft.bornSex === "girl" || draft.bornSex === "boy" ? draft.bornSex : "unknown";
	if (draft.mode !== "baby" && draft.due) kids.push({
		id: newChildId(),
		name: draft.mode === "both" ? "" : name,
		kind: "pregnant",
		due: draft.due,
		birthday: "",
		sex: pregnancySex
	});
	if (draft.mode !== "pregnant" && draft.birthday) kids.push({
		id: newChildId(),
		name,
		kind: "born",
		due: "",
		birthday: draft.birthday,
		sex: bornSex
	});
	for (const extra of draft.extraKids ?? []) {
		if (!extra.birthday) continue;
		kids.push({
			id: newChildId(),
			name: extra.name.trim(),
			kind: "born",
			due: "",
			birthday: extra.birthday,
			sex: extra.sex === "girl" || extra.sex === "boy" ? extra.sex : "unknown"
		});
	}
	return kids;
}
function normalizeChildren(raw, legacy) {
	const fromList = Array.isArray(raw) ? raw.flatMap((item) => {
		if (!item || typeof item !== "object") return [];
		const row = item;
		if (row.kind !== "pregnant" && row.kind !== "born") return [];
		if (typeof row.id !== "string" || !row.id) return [];
		return [{
			id: row.id,
			name: typeof row.name === "string" ? row.name.slice(0, 40) : "",
			kind: row.kind,
			due: typeof row.due === "string" ? row.due : "",
			birthday: typeof row.birthday === "string" ? row.birthday : "",
			sex: row.sex === "girl" || row.sex === "boy" || row.sex === "unknown" ? row.sex : "unknown"
		}];
	}) : [];
	const children = fromList.length ? fromList : draftToChildren({
		mode: legacy?.mode ?? "pregnant",
		due: legacy?.due ?? "",
		birthday: legacy?.birthday ?? "",
		babyName: legacy?.babyName ?? "",
		pregnancySex: "unknown",
		bornSex: "unknown"
	});
	return {
		children,
		activeChildId: legacy?.activeChildId && children.some((child) => child.id === legacy.activeChildId) ? legacy.activeChildId : children[0]?.id ?? ""
	};
}
var NEUTRAL_TAGS = {
	budget: "mid",
	materials: "works",
	feeding: "undecided",
	food: "easy",
	avoid: "",
	foodNote: "",
	gear: "either",
	sleep: "either",
	experience: "unspecified",
	style: "firm",
	pace: "either",
	load: "either",
	help: "either"
};
var FOODS = [
	"easy",
	"vegetarian",
	"vegan",
	"avoid",
	"other"
];
var AVOIDS = [
	"dairy",
	"gluten",
	"nuts",
	"eggs"
];
var MATS$1 = [
	"clean",
	"lowtox",
	"care",
	"works"
];
var GEARS = [
	"minimal",
	"few",
	"helpers",
	"secondhand",
	"either"
];
var SLEEPS = [
	"crib",
	"cosleep",
	"unsure",
	"either"
];
var EXPS = [
	"first",
	"experienced",
	"alongside",
	"unspecified"
];
var STYLES = [
	"firm",
	"childled",
	"routines",
	"practical"
];
var PACES = [
	"moment",
	"ahead",
	"flow",
	"figuring",
	"either"
];
var LOADS = [
	"ready",
	"mixed",
	"full",
	"either"
];
var HELPS = [
	"shorter",
	"wait",
	"fine",
	"either"
];
var BANDS = [
	"budget",
	"mid",
	"splurge",
	"thrift"
];
var FEEDS = [
	"breast",
	"formula",
	"combo",
	"undecided"
];
function normalizeTags(input) {
	const raw = input ?? {};
	const food = FOODS.includes(raw.food) ? raw.food : {
		default: "easy",
		plant: "vegetarian",
		allergen: "avoid"
	}[raw.food ?? ""] ?? "easy";
	const avoid = food === "avoid" && AVOIDS.includes(raw.avoid) ? raw.avoid : "";
	const foodNote = food === "other" && typeof raw.foodNote === "string" ? raw.foodNote.trim().slice(0, 80) : "";
	return {
		...NEUTRAL_TAGS,
		budget: BANDS.includes(raw.budget) ? raw.budget : NEUTRAL_TAGS.budget,
		materials: MATS$1.includes(raw.materials) ? raw.materials : NEUTRAL_TAGS.materials,
		feeding: FEEDS.includes(raw.feeding) ? raw.feeding : NEUTRAL_TAGS.feeding,
		gear: GEARS.includes(raw.gear) ? raw.gear : NEUTRAL_TAGS.gear,
		sleep: SLEEPS.includes(raw.sleep) ? raw.sleep : NEUTRAL_TAGS.sleep,
		experience: EXPS.includes(raw.experience) ? raw.experience : NEUTRAL_TAGS.experience,
		style: STYLES.includes(raw.style) ? raw.style : NEUTRAL_TAGS.style,
		pace: PACES.includes(raw.pace) ? raw.pace : NEUTRAL_TAGS.pace,
		load: LOADS.includes(raw.load) ? raw.load : NEUTRAL_TAGS.load,
		help: HELPS.includes(raw.help) ? raw.help : NEUTRAL_TAGS.help,
		food,
		avoid,
		foodNote
	};
}
var initial = {
	onboarded: false,
	mode: "pregnant",
	due: "",
	birthday: "",
	babyName: "",
	pregnancySex: "",
	bornSex: "",
	kidCount: 0,
	extraKids: [],
	parentName: "",
	parentBirthday: "",
	parentEmail: "",
	parentCity: "",
	parentRegion: "",
	parentCountry: "",
	children: [],
	activeChildId: "",
	tags: NEUTRAL_TAGS,
	screen: "welcome",
	quizIndex: 0,
	focus: "pregnancy",
	preview: null,
	votes: {},
	wishlist: [],
	notes: [],
	detailId: null,
	revisitQuiz: false,
	revisitDismissed: false
};
var useApp = create()(persist((set) => ({
	...initial,
	set: (partial) => set(partial),
	vote: (id, choice, item) => set((state) => {
		const next = { ...state.votes };
		const removing = next[id] === choice;
		if (removing) delete next[id];
		else next[id] = choice;
		let wishlist = state.wishlist.filter((saved) => saved.id !== id);
		if (!removing && choice === "wish" && item) wishlist = [{
			...item,
			id,
			savedAt: (/* @__PURE__ */ new Date()).toISOString()
		}, ...wishlist];
		return {
			votes: next,
			wishlist
		};
	}),
	addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
	updateNote: (id, text) => set((state) => ({ notes: state.notes.map((note) => note.id === id ? {
		...note,
		text
	} : note) })),
	deleteNote: (id) => set((state) => ({ notes: state.notes.filter((note) => note.id !== id) })),
	reset: () => set((state) => ({
		...initial,
		notes: state.notes,
		votes: {},
		wishlist: [],
		tags: { ...NEUTRAL_TAGS },
		children: []
	}))
}), {
	name: "thisstage.v1",
	skipHydration: true,
	merge: (persisted, current) => {
		const saved = persisted ?? {};
		const normalized = normalizeChildren(saved.children, {
			mode: saved.mode,
			due: saved.due,
			birthday: saved.birthday,
			babyName: saved.babyName,
			activeChildId: saved.activeChildId
		});
		const sex = (value) => value === "girl" || value === "boy" || value === "unknown" ? value : "";
		return {
			...current,
			...saved,
			pregnancySex: sex(saved.pregnancySex),
			bornSex: sex(saved.bornSex),
			kidCount: saved.kidCount === 1 || saved.kidCount === 2 || saved.kidCount === 3 ? saved.kidCount : 0,
			extraKids: normalizeExtraKids(saved.extraKids),
			parentName: saved.parentName ?? "",
			parentBirthday: saved.parentBirthday ?? "",
			parentEmail: saved.parentEmail ?? "",
			parentCity: saved.parentCity ?? "",
			parentRegion: saved.parentRegion ?? "",
			parentCountry: saved.parentCountry ?? "",
			tags: normalizeTags(saved.tags),
			votes: saved.votes ?? {},
			wishlist: normalizeWishlist(saved.wishlist),
			notes: normalizeNotes(saved.notes),
			children: normalized.children,
			activeChildId: normalized.activeChildId,
			revisitQuiz: typeof saved.revisitQuiz === "boolean" ? saved.revisitQuiz : saved.mode === "pregnant" && saved.onboarded === true,
			revisitDismissed: saved.revisitDismissed === true
		};
	},
	partialize: (state) => ({
		onboarded: state.onboarded,
		mode: state.mode,
		due: state.due,
		birthday: state.birthday,
		babyName: state.babyName,
		pregnancySex: state.pregnancySex,
		bornSex: state.bornSex,
		kidCount: state.kidCount,
		extraKids: state.extraKids,
		parentName: state.parentName,
		parentBirthday: state.parentBirthday,
		parentEmail: state.parentEmail,
		parentCity: state.parentCity,
		parentRegion: state.parentRegion,
		parentCountry: state.parentCountry,
		children: state.children,
		activeChildId: state.activeChildId,
		tags: state.tags,
		screen: state.screen,
		quizIndex: state.quizIndex,
		focus: state.focus,
		preview: state.preview,
		votes: state.votes,
		wishlist: state.wishlist,
		notes: state.notes,
		detailId: state.detailId,
		revisitQuiz: state.revisitQuiz,
		revisitDismissed: state.revisitDismissed
	})
}));
function normalizeWishlist(input) {
	if (!Array.isArray(input)) return [];
	const wishes = [];
	for (const item of input) {
		if (!item || typeof item !== "object") continue;
		const row = item;
		if (typeof row.id !== "string" || typeof row.name !== "string") continue;
		if (row.kind !== "product" && row.kind !== "task") continue;
		const tags = Array.isArray(row.tags) ? row.tags : [];
		wishes.push({
			id: row.id,
			name: row.name,
			line: typeof row.line === "string" ? row.line : "",
			why: typeof row.why === "string" ? row.why : "",
			tags: [
				String(tags[0] ?? ""),
				String(tags[1] ?? ""),
				String(tags[2] ?? "")
			],
			kind: row.kind,
			savedAt: typeof row.savedAt === "string" ? row.savedAt : "",
			query: typeof row.query === "string" ? row.query : void 0
		});
	}
	return wishes;
}
function normalizeNotes(input) {
	if (!Array.isArray(input)) return [];
	const notes = [];
	for (const item of input) {
		if (!item || typeof item !== "object") continue;
		const row = item;
		if (typeof row.id !== "string" || typeof row.screen !== "string" || typeof row.text !== "string") continue;
		notes.push({
			id: row.id,
			screen: row.screen,
			x: typeof row.x === "number" ? row.x : 50,
			y: typeof row.y === "number" ? row.y : 20,
			text: row.text,
			createdAt: typeof row.createdAt === "string" ? row.createdAt : ""
		});
	}
	return notes;
}
function pins(query) {
	return `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(query)}`;
}
function meal(id, slot, title, line, time, from, href, image = "") {
	return {
		id,
		slot,
		title,
		line,
		time,
		from,
		href,
		image
	};
}
var DRINK = meal("drink-ginger", "Drink", "Lemon ginger water", "Water with lemon and ginger, for the days a plain glass isn’t appealing.", "5 min", "Well Nourished Mamas", "https://wellnourishedmamas.com/homemade-electrolyte-drink-for-pregnancy/");
var PREGNANCY = {
	easy: [
		meal("preg-easy-dinner", "Dinner", "Sheet-pan chicken, peppers, and beans", "Protein, greens, and beans on one pan. Leftovers are the point.", "30 min", "EatingWell", "https://www.eatingwell.com/gallery/7922516/quick-easy-dinner-recipes-for-healthy-pregnancy/"),
		meal("preg-easy-snack", "Snack", "Cheese, crackers, and fruit", "A plate you can leave by the couch. Protein without cooking.", "2 min", "Pinterest", pins("easy pregnancy snack cheese fruit crackers")),
		meal("preg-easy-breakfast", "Breakfast", "Peanut butter banana overnight oats", "Oats, yogurt, and fruit, mixed at night.", "10 min", "EatingWell", "https://www.eatingwell.com/high-protein-peanut-butter-banana-blueberry-overnight-oats-8678793"),
		DRINK
	],
	vegetarian: [
		meal("preg-veg-dinner", "Dinner", "Vegetarian chili mac", "Beans, vegetables, and pasta. Plant protein, and it reheats.", "40 min", "Yummy Toddler Food", "https://www.yummytoddlerfood.com/veggie-chili-mac/"),
		meal("preg-veg-snack", "Snack", "Yogurt, fruit, and crackers", "No meat. Still something you can eat without a plan.", "3 min", "Pinterest", pins("vegetarian pregnancy snack yogurt fruit")),
		meal("preg-veg-breakfast", "Breakfast", "Peanut butter banana overnight oats", "Vegetarian. Oats and yogurt, ready in the morning.", "10 min", "EatingWell", "https://www.eatingwell.com/high-protein-peanut-butter-banana-blueberry-overnight-oats-8678793"),
		DRINK
	],
	vegan: [
		meal("preg-vegan-dinner", "Dinner", "Lentil and vegetable soup", "Plants only. Beans and vegetables in one pot.", "30 min", "Pinterest", pins("easy vegan lentil vegetable soup dinner")),
		meal("preg-vegan-snack", "Snack", "Hummus, fruit, and crackers", "No dairy, no egg. A plate you already know how to make.", "4 min", "Pinterest", pins("vegan pregnancy snack hummus fruit")),
		meal("preg-vegan-breakfast", "Breakfast", "Banana overnight oats, plant milk", "Oats and banana. Skip the yogurt.", "10 min", "Pinterest", pins("vegan banana overnight oats no yogurt")),
		DRINK
	],
	dairy: [
		meal("preg-dairy-dinner", "Dinner", "Chicken, vegetables, and rice", "No cheese and no cream. Protein and a vegetable.", "30 min", "Pinterest", pins("dairy free pregnancy dinner chicken vegetables rice")),
		meal("preg-dairy-snack", "Snack", "Hummus and fruit", "Leave the yogurt and the cheese stick off the plate.", "3 min", "Pinterest", pins("dairy free pregnancy snack hummus fruit")),
		meal("preg-dairy-breakfast", "Breakfast", "Oats with plant milk", "Banana and oats. No yogurt on top.", "10 min", "Pinterest", pins("dairy free overnight oats banana")),
		DRINK
	],
	gluten: [
		meal("preg-gluten-dinner", "Dinner", "Sheet-pan chicken and potatoes", "Skip the pasta and the bread. Chicken, potatoes, and a vegetable.", "30 min", "Pinterest", pins("gluten free sheet pan chicken potatoes dinner")),
		meal("preg-gluten-snack", "Snack", "Cheese and fruit", "Nothing made of wheat. A plate you can see through.", "2 min", "Pinterest", pins("gluten free pregnancy snack cheese fruit")),
		meal("preg-gluten-breakfast", "Breakfast", "Eggs and potatoes", "One pan. No toast beside it.", "15 min", "Pinterest", pins("gluten free pregnancy breakfast eggs potatoes")),
		DRINK
	],
	nuts: [
		meal("preg-nuts-dinner", "Dinner", "Sheet-pan chicken, peppers, and beans", "No peanut butter in the sauce. Chicken, beans, and vegetables.", "30 min", "EatingWell", "https://www.eatingwell.com/gallery/7922516/quick-easy-dinner-recipes-for-healthy-pregnancy/"),
		meal("preg-nuts-snack", "Snack", "Cheese, apple, and crackers", "Leave the nut butter in the cupboard.", "2 min", "Pinterest", pins("nut free pregnancy snack cheese apple")),
		meal("preg-nuts-breakfast", "Breakfast", "Yogurt, fruit, and oats", "Skip the peanut butter. Yogurt and fruit are enough.", "5 min", "Pinterest", pins("nut free pregnancy breakfast yogurt oats")),
		DRINK
	],
	eggs: [
		meal("preg-eggs-dinner", "Dinner", "Chicken, rice, and vegetables", "No scramble on the side. A plain dinner you can see.", "30 min", "Pinterest", pins("egg free pregnancy dinner chicken rice vegetables")),
		meal("preg-eggs-snack", "Snack", "Cheese, crackers, and fruit", "No egg bites and no muffin if you can’t see what’s in it.", "2 min", "Pinterest", pins("egg free pregnancy snack cheese fruit")),
		meal("preg-eggs-breakfast", "Breakfast", "Peanut butter banana overnight oats", "Breakfast without an egg. Oats, yogurt, and fruit.", "10 min", "EatingWell", "https://www.eatingwell.com/high-protein-peanut-butter-banana-blueberry-overnight-oats-8678793"),
		DRINK
	],
	avoid: [
		meal("preg-avoid-dinner", "Dinner", "Rice, beans, and a vegetable", "A short ingredient list, so the thing you skip is easy to see.", "25 min", "Pinterest", pins("simple allergy friendly dinner rice beans vegetables")),
		meal("preg-avoid-snack", "Snack", "Fruit you already buy", "No new brand this week. Familiar is the feature.", "2 min", "Pinterest", pins("simple allergy friendly pregnancy snack fruit")),
		meal("preg-avoid-breakfast", "Breakfast", "Oats or rice, made plain", "Add only what you already know is fine.", "10 min", "Pinterest", pins("simple allergy friendly breakfast oats")),
		DRINK
	]
};
var TODDLER = {
	easy: [
		meal("tod-easy-dinner", "Dinner", "Toddler meals, hardly any cooking", "Dinners little kids actually eat. Most of them use what you already have.", "15 min", "Yummy Toddler Food", "https://www.yummytoddlerfood.com/50-easy-toddler-meals/"),
		meal("tod-easy-snack", "Snack", "Fruit, cucumber, and a dip", "A snack plate. Cut it the way they can hold it.", "5 min", "Pinterest", pins("easy toddler snack plate fruit cucumber hummus")),
		meal("tod-easy-breakfast", "Breakfast", "Yogurt pancakes", "One bowl. Small pancakes are easier for a toddler to hold.", "20 min", "Yummy Toddler Food", "https://www.yummytoddlerfood.com/favorite-yogurt-pancakes-6-ways/")
	],
	vegetarian: [
		meal("tod-veg-dinner", "Dinner", "Vegetarian chili mac", "Beans, vegetables, and pasta. No meat, and toddlers tend to eat the noodles.", "40 min", "Yummy Toddler Food", "https://www.yummytoddlerfood.com/veggie-chili-mac/"),
		meal("tod-veg-snack", "Snack", "Cheese, fruit, and crackers", "Vegetarian, and no cooking.", "3 min", "Pinterest", pins("vegetarian toddler snack cheese fruit")),
		meal("tod-veg-breakfast", "Breakfast", "Yogurt pancakes", "No meat. A small pancake they can hold.", "20 min", "Yummy Toddler Food", "https://www.yummytoddlerfood.com/favorite-yogurt-pancakes-6-ways/")
	],
	vegan: [
		meal("tod-vegan-dinner", "Dinner", "Beans, rice, and a soft vegetable", "Plants only. Mild, and easy to share from your plate.", "25 min", "Pinterest", pins("easy vegan toddler dinner beans rice")),
		meal("tod-vegan-snack", "Snack", "Hummus, fruit, and cucumber", "No cheese and no yogurt. A dip they can poke.", "5 min", "Pinterest", pins("vegan toddler snack hummus fruit cucumber")),
		meal("tod-vegan-breakfast", "Breakfast", "Oatmeal with banana", "Plant milk, oats, and banana. No egg in the bowl.", "10 min", "Pinterest", pins("vegan toddler oatmeal banana breakfast"))
	],
	dairy: [
		meal("tod-dairy-dinner", "Dinner", "Dairy-free dinners kids will eat", "Beans, vegetables, and meals without cheese or yogurt.", "20 min", "Yummy Toddler Food", "https://www.yummytoddlerfood.com/tips-for-dairy-free-toddlers/"),
		meal("tod-dairy-snack", "Snack", "Hummus, fruit, and crackers", "Leave the cheese and the yogurt pouch off.", "4 min", "Pinterest", pins("dairy free toddler snack hummus fruit")),
		meal("tod-dairy-breakfast", "Breakfast", "Oatmeal with banana", "Plant milk instead of yogurt.", "10 min", "Pinterest", pins("dairy free toddler oatmeal breakfast"))
	],
	gluten: [
		meal("tod-gluten-dinner", "Dinner", "Potatoes, beans, and a soft vegetable", "No pasta and no bread. Foods a toddler can pick up.", "25 min", "Pinterest", pins("easy gluten free toddler dinner potatoes beans")),
		meal("tod-gluten-snack", "Snack", "Fruit and cheese", "Skip the cracker if it isn’t gluten-free.", "3 min", "Pinterest", pins("gluten free toddler snack fruit cheese")),
		meal("tod-gluten-breakfast", "Breakfast", "Eggs and potatoes", "No toast. A soft scramble and potato coins.", "15 min", "Pinterest", pins("gluten free toddler breakfast eggs potatoes"))
	],
	nuts: [
		meal("tod-nuts-dinner", "Dinner", "Toddler meals without nut butter", "Familiar dinners. Skip anything with nuts on top.", "15 min", "Pinterest", pins("nut free toddler dinner no peanut")),
		meal("tod-nuts-snack", "Snack", "Fruit, cheese, and cucumber", "No peanut butter and no granola with nuts.", "3 min", "Pinterest", pins("nut free toddler snack fruit cheese")),
		meal("tod-nuts-breakfast", "Breakfast", "Yogurt pancakes", "The batter has no nuts. Skip a peanut-butter topping.", "20 min", "Yummy Toddler Food", "https://www.yummytoddlerfood.com/favorite-yogurt-pancakes-6-ways/")
	],
	eggs: [
		meal("tod-eggs-dinner", "Dinner", "Beans, rice, and a soft vegetable", "No egg holding it together. A bowl they can eat with their hands.", "25 min", "Pinterest", pins("egg free toddler dinner beans rice")),
		meal("tod-eggs-snack", "Snack", "Fruit and crackers", "Skip the egg muffin and the baked bite.", "3 min", "Pinterest", pins("egg free toddler snack fruit crackers")),
		meal("tod-eggs-breakfast", "Breakfast", "Oatmeal with banana", "Breakfast without a pancake or a scramble.", "10 min", "Pinterest", pins("egg free toddler oatmeal breakfast"))
	],
	avoid: [
		meal("tod-avoid-dinner", "Dinner", "A plain toddler plate", "Rice or potato, a fruit, and one food you already trust.", "15 min", "Pinterest", pins("allergy friendly toddler dinner simple")),
		meal("tod-avoid-snack", "Snack", "Fruit you already buy", "No new brand. The ingredient you skip stays off the plate.", "2 min", "Pinterest", pins("allergy friendly toddler snack fruit")),
		meal("tod-avoid-breakfast", "Breakfast", "Oats or rice, made plain", "Add only what you already know is fine.", "10 min", "Pinterest", pins("allergy friendly toddler breakfast plain"))
	]
};
var PARENT = {
	easy: [
		meal("you-easy-dinner", "Dinner", "Sheet-pan chicken, peppers, and beans", "One pan. Eat it standing up if you need to.", "30 min", "EatingWell", "https://www.eatingwell.com/gallery/7922516/quick-easy-dinner-recipes-for-healthy-pregnancy/"),
		meal("you-easy-snack", "Snack", "Cheese, crackers, and fruit", "One hand. No recipe.", "2 min", "Pinterest", pins("one hand snack cheese crackers fruit")),
		DRINK
	],
	vegetarian: [
		PREGNANCY.vegetarian[0],
		meal("you-veg-snack", "Snack", "Yogurt, fruit, and crackers", "Vegetarian, and no cooking.", "3 min", "Pinterest", pins("vegetarian one hand snack yogurt fruit")),
		DRINK
	],
	vegan: [
		PREGNANCY.vegan[0],
		PREGNANCY.vegan[1],
		DRINK
	],
	dairy: [
		PREGNANCY.dairy[0],
		PREGNANCY.dairy[1],
		DRINK
	],
	gluten: [
		PREGNANCY.gluten[0],
		PREGNANCY.gluten[1],
		DRINK
	],
	nuts: [
		PREGNANCY.nuts[0],
		PREGNANCY.nuts[1],
		DRINK
	],
	eggs: [
		PREGNANCY.eggs[0],
		PREGNANCY.eggs[1],
		DRINK
	],
	avoid: [
		PREGNANCY.avoid[0],
		PREGNANCY.avoid[1],
		DRINK
	]
};
var SHOTS = {
	"drink-ginger": "/graphics/lemon.jpg",
	"preg-easy-dinner": "/graphics/eats/chicken.jpg",
	"preg-easy-snack": "/graphics/apple.jpg",
	"preg-easy-breakfast": "/graphics/eats/oats.jpg",
	"preg-veg-dinner": "/graphics/eats/chili.jpg",
	"preg-veg-snack": "/graphics/eats/plate.jpg",
	"preg-veg-breakfast": "/graphics/eats/oats.jpg",
	"preg-vegan-dinner": "/graphics/bowl.jpg",
	"preg-vegan-snack": "/graphics/eats/plate.jpg",
	"preg-vegan-breakfast": "/graphics/banana.jpg",
	"preg-dairy-dinner": "/graphics/eats/chicken.jpg",
	"preg-dairy-snack": "/graphics/eats/plate.jpg",
	"preg-dairy-breakfast": "/graphics/banana.jpg",
	"preg-gluten-dinner": "/graphics/eats/chicken.jpg",
	"preg-gluten-snack": "/graphics/apple.jpg",
	"preg-gluten-breakfast": "/graphics/bowl.jpg",
	"preg-nuts-dinner": "/graphics/eats/chicken.jpg",
	"preg-nuts-snack": "/graphics/apple.jpg",
	"preg-nuts-breakfast": "/graphics/eats/oats.jpg",
	"preg-eggs-dinner": "/graphics/eats/chicken.jpg",
	"preg-eggs-snack": "/graphics/apple.jpg",
	"preg-eggs-breakfast": "/graphics/eats/oats.jpg",
	"preg-avoid-dinner": "/graphics/bowl.jpg",
	"preg-avoid-snack": "/graphics/apple.jpg",
	"preg-avoid-breakfast": "/graphics/banana.jpg",
	"you-easy-dinner": "/graphics/eats/chicken.jpg",
	"you-easy-snack": "/graphics/apple.jpg",
	"you-veg-snack": "/graphics/eats/plate.jpg",
	"tod-easy-dinner": "/graphics/eats/plate.jpg",
	"tod-easy-snack": "/graphics/eats/plate.jpg",
	"tod-easy-breakfast": "/graphics/eats/pancakes.jpg",
	"tod-veg-dinner": "/graphics/eats/chili.jpg",
	"tod-veg-snack": "/graphics/apple.jpg",
	"tod-veg-breakfast": "/graphics/eats/pancakes.jpg",
	"tod-vegan-dinner": "/graphics/bowl.jpg",
	"tod-vegan-snack": "/graphics/eats/plate.jpg",
	"tod-vegan-breakfast": "/graphics/banana.jpg",
	"tod-dairy-dinner": "/graphics/eats/dairy.jpg",
	"tod-dairy-snack": "/graphics/eats/plate.jpg",
	"tod-dairy-breakfast": "/graphics/banana.jpg",
	"tod-gluten-dinner": "/graphics/bowl.jpg",
	"tod-gluten-snack": "/graphics/apple.jpg",
	"tod-gluten-breakfast": "/graphics/bowl.jpg",
	"tod-nuts-dinner": "/graphics/eats/plate.jpg",
	"tod-nuts-snack": "/graphics/apple.jpg",
	"tod-nuts-breakfast": "/graphics/eats/pancakes.jpg",
	"tod-eggs-dinner": "/graphics/bowl.jpg",
	"tod-eggs-snack": "/graphics/apple.jpg",
	"tod-eggs-breakfast": "/graphics/banana.jpg",
	"tod-avoid-dinner": "/graphics/bowl.jpg",
	"tod-avoid-snack": "/graphics/apple.jpg",
	"tod-avoid-breakfast": "/graphics/banana.jpg"
};
function shot(list) {
	return list.map((recipe) => ({
		...recipe,
		image: recipe.image || SHOTS[recipe.id] || "/graphics/bowl.jpg"
	}));
}
function recipesFor(tags, stageId) {
	const kitchen = kitchenFor(tags);
	if (stageId.startsWith("p")) return shot(PREGNANCY[kitchen]);
	if (stageId === "b15" || stageId === "b6m" || stageId === "b9") return shot(TODDLER[kitchen]);
	return shot(PARENT[kitchen]);
}
var PHRASE = {
	peri: "peri bottle",
	pads: "postpartum pads",
	mesh: "postpartum underwear",
	underwear: "postpartum underwear",
	cream: "nipple cream",
	witch: "witch hazel pads",
	prenatal: "prenatal vitamin",
	bra: "nursing bra",
	pants: "maternity pants",
	softpants: "maternity pants",
	joggers: "baby clothes",
	lounge: "maternity clothes",
	goinghome: "coming home outfit",
	top: "maternity top",
	tees: "baby clothes",
	support: "belly band",
	bands: "belly band",
	pillow: "nursing pillow",
	socks: "baby socks",
	tote: "diaper bag",
	charger: "breast pump",
	bottle: "baby bottles",
	regbottle: "baby bottles",
	regsleep: "baby bassinet",
	regwater: "water bottle",
	regdiaper: "newborn diapers",
	insoles: "maternity shoes",
	play: "baby toys",
	bib: "baby bibs",
	teether: "baby teether",
	seat: "baby stroller",
	cup: "baby food",
	snackcup: "toddler snack cup",
	mat: "baby play mat",
	proof: "sippy cup",
	shoes: "baby shoes",
	toddlerShoes: "toddler shoes",
	books: "baby books",
	latch: "baby proofing",
	hat: "baby hat",
	sound: "baby sound machine",
	sack: "baby sleep sack",
	gate: "baby gate",
	carrier: "baby carrier",
	stroller: "baby stroller"
};
function familyId(cardId) {
	const lane = cardId.match(/:(budget|mid|splurge|thrift)_(clean|lowtox|care|works)$/);
	const stem = lane?.index !== void 0 ? cardId.slice(0, lane.index) : cardId;
	return stem.split(":")[0] ?? stem;
}
function phrase(id, stageId, sex, tags) {
	const born = !stageId.startsWith("p");
	const toddler = stageId === "b15";
	const who = sex === "girl" ? "baby girl" : sex === "boy" ? "baby boy" : "baby";
	if (id.startsWith("snack") || id === "cup") {
		if (tags.food === "vegan") return "vegan baby food";
		if (tags.food === "vegetarian") return "vegetarian baby food";
		if (tags.avoid === "dairy") return "dairy free baby food";
		if (tags.avoid === "gluten") return "gluten free baby food";
		if (tags.avoid === "nuts") return "nut free baby food";
		if (tags.avoid === "eggs") return "egg free baby food";
		if (tags.food === "other" && tags.foodNote.trim()) return tags.foodNote.trim();
		return toddler ? "toddler snacks" : "baby food";
	}
	if (id === "regbottle" || id === "bottle" || id.startsWith("feed")) {
		if (tags.feeding === "breast") return "breastfeeding bottles";
		if (tags.feeding === "formula") return "baby formula bottles";
		if (tags.feeding === "combo") return "breastfeeding and formula bottles";
		return "baby bottles";
	}
	if (id === "charger") return tags.feeding === "formula" ? "baby bottle" : "breast pump";
	if (id === "cream") return tags.feeding === "formula" ? "baby lotion" : "nipple cream";
	if (id === "play" || id === "teether" || id === "mat") {
		const toy = toddler ? "toddler toys" : "baby toys";
		return tags.style === "childled" ? `montessori ${toy}` : toy;
	}
	if (id === "books") return tags.style === "childled" ? "montessori baby books" : "board books";
	if ([
		"joggers",
		"tees",
		"hat",
		"socks",
		"shoes",
		"toddlerShoes"
	].includes(id) && born) {
		if (id === "shoes" || id === "toddlerShoes") return toddler ? "toddler shoes" : `${who} shoes`;
		if (id === "hat") return `${who} hat`;
		return toddler ? "toddler clothes" : `${who} clothes`;
	}
	if (id === "stroller" || id === "seat") return toddler ? "toddler stroller" : stageId === "b0" ? "newborn stroller" : "baby stroller";
	if (id === "regsleep") {
		if (tags.sleep === "crib") return "baby crib firm mattress";
		if (tags.sleep === "cosleep") return "bedside bassinet";
		return "baby bassinet";
	}
	if (id === "regwater") return "insulated water bottle";
	if (id === "regdiaper") return tags.materials === "clean" || tags.materials === "lowtox" ? "fragrance free newborn diapers wipes" : "newborn diapers and wipes";
	if (id === "carrier") return stageId === "b0" || stageId.startsWith("p") ? "newborn baby carrier" : "baby carrier";
	if (id === "sack") return "baby sleep sack";
	if (id === "sound") return "baby sound machine";
	return PHRASE[id] ?? "baby products";
}
function modifiers(id, tags) {
	const words = [];
	if (tags.materials === "clean" || tags.materials === "lowtox") words.push("non toxic");
	else if (tags.materials === "care") words.push("fragrance free");
	if (tags.budget === "budget") words.push("budget");
	else if (tags.budget === "splurge") words.push("best");
	else if (tags.budget === "thrift") words.push("second hand", "diy");
	if (tags.gear === "secondhand") words.push("second hand");
	if ((id === "stroller" || id === "carrier" || id === "seat") && tags.gear === "minimal") words.push("lightweight");
	if ((id === "stroller" || id === "carrier" || id === "sound" || id === "seat") && tags.gear === "helpers") words.push("baby must haves");
	return words;
}
function withSearch(card, tags, stageId, sex) {
	if (card.kind !== "product") return card;
	const id = familyId(card.id);
	const keywords = [...modifiers(id, tags), phrase(id, stageId, sex, tags)];
	return {
		...card,
		keywords,
		query: keywords.join(" ")
	};
}
var MATS = [
	"clean",
	"lowtox",
	"care",
	"works"
];
function productKey(id) {
	const lane = id.match(/:(budget|mid|splurge|thrift)_(clean|lowtox|care|works)$/);
	if (!lane || lane.index === void 0) return id.split(":")[0] ?? id;
	return id.slice(0, lane.index);
}
function laneFailed(votes, lane) {
	let skips = 0;
	let likes = 0;
	for (const [id, vote] of Object.entries(votes)) {
		if (!id.endsWith(lane)) continue;
		if (vote === "skip") skips += 1;
		else likes += 1;
	}
	return skips >= 2 && likes === 0;
}
function stepTags(tags) {
	const materials = MATS.indexOf(tags.materials);
	if (materials >= 0 && materials < MATS.length - 1) return {
		...tags,
		materials: MATS[materials + 1] ?? tags.materials
	};
	if (tags.budget === "thrift") return {
		...tags,
		budget: "budget"
	};
	if (tags.budget === "budget") return {
		...tags,
		budget: "mid"
	};
	if (tags.budget === "mid") return {
		...tags,
		budget: "splurge"
	};
	return null;
}
function learnedTags(tags, votes) {
	let next = tags;
	let shifted = false;
	for (let step = 0; step < 3; step += 1) {
		if (!laneFailed(votes, `${next.budget}_${next.materials}`)) break;
		const stepped = stepTags(next);
		if (!stepped) break;
		next = stepped;
		shifted = true;
	}
	return {
		tags: next,
		shifted
	};
}
function rankWithVotes(cards, votes) {
	const used = /* @__PURE__ */ new Set();
	const skip = /* @__PURE__ */ new Set();
	const wish = /* @__PURE__ */ new Set();
	for (const [id, vote] of Object.entries(votes)) if (vote === "used") used.add(productKey(id));
	else if (vote === "skip") skip.add(id);
	else wish.add(id);
	const kept = cards.filter((card) => !used.has(productKey(card.id)) && !skip.has(card.id));
	const visible = kept.length ? kept : cards.filter((card) => !skip.has(card.id));
	return [...visible.length ? visible : cards].sort((a, b) => Number(wish.has(b.id)) - Number(wish.has(a.id))).map((card) => wish.has(card.id) ? {
		...card,
		why: `You wished for this. ${card.why}`
	} : card);
}
function learnFeed(stageId, tags, votes, sex = "") {
	const learned = learnedTags(tags, votes);
	const cards = rankWithVotes(cardsFor(stageId, learned.tags), votes).map((card) => withSearch(card, learned.tags, stageId, sex));
	if (!(Object.keys(votes).length > 0)) return {
		cards,
		note: null
	};
	if (learned.shifted) return {
		cards,
		note: "Wished items stay first. Enough skips moved this set a step looser."
	};
	return {
		cards,
		note: "Wished items stay first. Used and skipped items come off the list."
	};
}
function buildHome(input) {
	const now = input.now ?? /* @__PURE__ */ new Date();
	const child = input.child;
	if (!child) return { error: "Add a child to see this stage." };
	if (child.kind === "pregnant") {
		const week = gestationalWeek(child.due, now);
		if (week === null) return { error: "Add a due date to see this week." };
		const realId = pregnancyStageId(week);
		const previewOk = input.preview && phaseOf(input.preview) === "pregnancy" ? input.preview : null;
		const stageId = previewOk ?? realId;
		const meta = stageMeta(stageId);
		const fruitWeek = previewOk ? meta.sampleWeek ?? week : Math.min(40, Math.max(4, week));
		const learned = learnFeed(stageId, input.tags, input.votes ?? {}, child.sex);
		const realHeadline = pregnancyHeadline(week);
		const useStyle = input.useStyle !== false;
		return {
			phase: "pregnancy",
			stageId,
			headline: previewOk ? meta.label : realHeadline,
			sub: dueRelative(child.due, now),
			note: !previewOk && week >= 41 ? "Many pregnancies pass the due date. This is still general info, not a sign to interpret." : !previewOk && week < 4 ? "Very early. The notes below are the first-trimester set, kept short on purpose." : null,
			fruit: fruitForWeek(fruitWeek),
			milestone: meta.milestone ?? null,
			blurb: meta.blurb,
			previewing: Boolean(previewOk),
			realHeadline,
			ranked: learned.cards,
			learned: learned.note,
			creators: creatorsFor(input.tags, stageId, useStyle),
			recipes: recipesFor(input.tags, stageId),
			childName: child.name.trim(),
			heroKicker: "Week",
			heroFigure: week > 42 ? "42+" : String(Math.max(1, week)),
			realStageId: realId
		};
	}
	const days = ageDays(child.birthday, now);
	if (days === null) return { error: "Add a birthday to see this stage." };
	if (days < 0) return { error: "That birthday is still in the future." };
	const realId = babyStageId(days);
	const previewOk = input.preview && phaseOf(input.preview) === "baby" ? input.preview : null;
	const stageId = previewOk ?? realId;
	const meta = stageMeta(stageId);
	const learned = learnFeed(stageId, input.tags, input.votes ?? {}, child.sex);
	const name = child.name.trim();
	const realHeadline = agePhrase(days, name);
	const hero = ageFigure(days);
	const useStyle = input.useStyle !== false;
	return {
		phase: "baby",
		stageId,
		headline: previewOk ? meta.label : realHeadline,
		sub: null,
		note: null,
		fruit: null,
		milestone: meta.milestone ?? null,
		blurb: meta.blurb,
		previewing: Boolean(previewOk),
		realHeadline,
		ranked: learned.cards,
		learned: learned.note,
		creators: creatorsFor(input.tags, stageId, useStyle),
		recipes: recipesFor(input.tags, stageId),
		childName: name,
		heroKicker: hero.kicker,
		heroFigure: hero.figure,
		realStageId: realId
	};
}
function resolveSignInGateState(input) {
	if (input.isPending) return "pending";
	return input.hasUser ? "signed_in" : "signed_out";
}
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
function SignInGate({ children, fallback }) {
	const { user, isPending } = useCurrentUserState();
	const state = resolveSignInGateState({
		isPending,
		hasUser: user !== null
	});
	if (state === "pending") return null;
	if (state === "signed_in") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: fallback ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInButtons, {}) });
}
function SignInButtons() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex w-full max-w-sm flex-col gap-2",
		children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => signIn(p.providerId, { callbackURL: "/" }),
			className: "w-full cursor-pointer rounded-md border border-neutral-300 px-4 py-2 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900",
			children: ["Continue with ", p.label]
		}, p.providerId))
	});
}
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of) and the session is not
* gate-materialized — behind the gate the next request signs the viewer
* straight back in, so a sign-out control there is a broken loop.
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			!gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
var listCircle = createServerFn({ method: "GET" }).validator((stageId) => stageId).middleware([authMiddleware]).handler(createSsrRpc("429beb75b80485f0aa0c4d349fd0b019dc6d5356a34bbef03784654820d1d9e1"));
var postCircle = createServerFn({ method: "POST" }).validator((input) => input).middleware([authMiddleware]).handler(createSsrRpc("f054df70b924c5e9361fe8d44a468de2ce49e45230d68f6d668f1fbac9359a7d"));
var toggleLike = createServerFn({ method: "POST" }).validator((postId) => postId).middleware([authMiddleware]).handler(createSsrRpc("af0240ad393674639e5c56ec57f5b9cdc83ed55bfa0d14077b0696ef6c37acc1"));
var listComments = createServerFn({ method: "GET" }).validator((postId) => postId).middleware([authMiddleware]).handler(createSsrRpc("cb169789b899f491a02c2b1f20ae31161d6deab3fc54a9b5a6597b10448b153e"));
var addComment = createServerFn({ method: "POST" }).validator((input) => input).middleware([authMiddleware]).handler(createSsrRpc("c0ad0d8e84dc195d465c5b454a8baf489419078820007cb3e89aed9890f04433"));
var deleteCircle = createServerFn({ method: "POST" }).validator((id) => id).middleware([authMiddleware]).handler(createSsrRpc("31b3160ec23644f14642929d1a1f68dd253b181f4e54ecbd10584d5d3d4a3d1a"));
var deleteComment = createServerFn({ method: "POST" }).validator((id) => id).middleware([authMiddleware]).handler(createSsrRpc("35b56889008f21be2b8a80811a427855798cfb28cb62998918982c1a23176e63"));
var NAME_KEY = "thisstage.circle-name";
function clock(iso) {
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return "";
	return date.toLocaleTimeString([], {
		hour: "numeric",
		minute: "2-digit"
	});
}
function loadName() {
	try {
		return localStorage.getItem(NAME_KEY)?.slice(0, 24) ?? "";
	} catch {
		return "";
	}
}
function CircleChat({ stageId, stageLabel }) {
	const { isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-6 h-40 animate-pulse rounded-3xl bg-sand",
		"aria-hidden": true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInGate, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JoinRoom, { stageLabel }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feed, {
			stageId,
			stageLabel
		})
	});
}
function JoinRoom({ stageLabel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-6 rounded-3xl border border-line bg-paper p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-terra",
				children: stageLabel
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 font-display text-2xl",
				children: "Join the posts"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 space-y-2",
				children: GROK_PROVIDERS.map((provider) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => signIn(provider.providerId, { callbackURL: "/" }),
					className: "min-h-12 w-full rounded-full bg-ink px-4 text-sm font-medium text-paper",
					children: ["Continue with ", provider.label]
				}, provider.providerId))
			})
		]
	});
}
function Feed({ stageId, stageLabel }) {
	const user = useCurrentUser();
	const parentName = useApp((s) => s.parentName);
	const [posts, setPosts] = (0, import_react.useState)([]);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [topic, setTopic] = (0, import_react.useState)("momtip");
	const [body, setBody] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [sending, setSending] = (0, import_react.useState)(false);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const saved = loadName();
		const fromParent = parentName.trim().split(" ")[0]?.slice(0, 24) ?? "";
		const first = user?.displayName?.split(" ")[0]?.slice(0, 24) ?? "";
		setName(saved || fromParent || first);
	}, [user?.displayName, parentName]);
	(0, import_react.useEffect)(() => {
		let alive = true;
		async function load() {
			try {
				const next = await listCircle({ data: stageId });
				if (!alive) return;
				setPosts(next);
				setError("");
				setReady(true);
			} catch {
				if (!alive) return;
				setError("Posts didn’t load. Try again in a moment.");
				setReady(true);
			}
		}
		load();
		const timer = window.setInterval(() => void load(), 8e3);
		return () => {
			alive = false;
			window.clearInterval(timer);
		};
	}, [stageId]);
	const shown = filter === "all" ? posts : posts.filter((post) => post.topic === filter);
	async function send() {
		const note = body.trim();
		if (!note || sending) return;
		setSending(true);
		setError("");
		try {
			localStorage.setItem(NAME_KEY, name.trim().slice(0, 24));
			const result = await postCircle({ data: {
				stageId,
				body: note,
				authorName: name,
				topic
			} });
			if (!result.ok) {
				setError(result.error);
				return;
			}
			setBody("");
			setPosts(await listCircle({ data: stageId }));
		} catch {
			setError("That post didn’t send.");
		} finally {
			setSending(false);
		}
	}
	function patch(id, next) {
		setPosts((list) => list.map((post) => post.id === id ? {
			...post,
			...next
		} : post));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl",
					children: "Posts"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [stageLabel, ". Short, like a note. Not a private message."]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex gap-2 overflow-x-auto pb-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopicPill, {
					on: filter === "all",
					label: "All",
					onClick: () => setFilter("all")
				}), TOPICS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopicPill, {
					on: filter === item.id,
					label: item.label,
					onClick: () => setFilter(item.id)
				}, item.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-3xl border border-line bg-paper p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: "New post"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex gap-2 overflow-x-auto pb-1",
						children: TOPICS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopicPill, {
							on: topic === item.id,
							label: item.label,
							onClick: () => setTopic(item.id)
						}, item.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-3 block text-sm font-medium",
						children: ["First name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: name,
							maxLength: 24,
							autoComplete: "given-name",
							onChange: (e) => setName(e.target.value),
							className: "mt-2 h-12 w-full rounded-2xl border border-line bg-cream px-4 text-base font-normal"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-3 block text-sm font-medium",
						children: ["Post", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: body,
							maxLength: 280,
							rows: 3,
							placeholder: "What’s on your mind?",
							onChange: (e) => setBody(e.target.value),
							className: "mt-2 w-full rounded-2xl border border-line bg-cream px-4 py-3 text-base font-normal leading-relaxed placeholder:text-muted"
						})]
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-terra",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						className: "mt-3 w-full",
						disabled: sending || !body.trim(),
						onClick: () => void send(),
						children: sending ? "Posting…" : "Post"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-3",
				children: [ready && shown.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-3xl bg-paper px-4 py-5 leading-relaxed text-muted",
					children: "No posts here yet. Yours can be the first."
				}) : null, shown.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostCard, {
					post,
					name,
					onChange: patch,
					onRemove: () => setPosts((list) => list.filter((item) => item.id !== post.id))
				}, post.id))]
			})
		]
	});
}
function TopicPill({ on, label, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-pressed": on,
		onClick,
		className: clsx("min-h-11 shrink-0 rounded-full px-4 text-sm font-medium", on ? "bg-ink text-paper" : "border border-line bg-paper text-ink"),
		children: label
	});
}
function PostCard({ post, name, onChange, onRemove }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [comments, setComments] = (0, import_react.useState)([]);
	const [reply, setReply] = (0, import_react.useState)("");
	const [replyError, setReplyError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function like() {
		const liked = !post.liked;
		onChange(post.id, {
			liked,
			likes: post.likes + (liked ? 1 : -1)
		});
		try {
			await toggleLike({ data: post.id });
		} catch {
			onChange(post.id, {
				liked: post.liked,
				likes: post.likes
			});
		}
	}
	async function show() {
		const next = !open;
		setOpen(next);
		if (next) setComments(await listComments({ data: post.id }).catch(() => []));
	}
	async function sendReply() {
		const text = reply.trim();
		if (!text || busy) return;
		setBusy(true);
		setReplyError("");
		try {
			const result = await addComment({ data: {
				postId: post.id,
				body: text,
				authorName: name
			} });
			if (!result.ok) {
				setReplyError(result.error);
				return;
			}
			setReply("");
			setComments(await listComments({ data: post.id }));
			onChange(post.id, { comments: post.comments + 1 });
		} catch {
			setReplyError("That reply didn’t send.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-3xl border border-line bg-paper px-4 py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: post.authorName
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: clock(post.createdAt)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 inline-flex rounded-full bg-clay px-3 py-1 text-sm font-medium text-ink",
				children: topicLabel(post.topic)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-lg leading-relaxed",
				children: post.body
			}),
			post.topic === "health" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Not medical advice."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						"aria-pressed": post.liked,
						onClick: () => void like(),
						className: clsx("inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium", post.liked ? "bg-clay text-ink" : "bg-sand text-ink"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
							className: "size-4",
							fill: post.liked ? "currentColor" : "none"
						}), post.likes]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						"aria-expanded": open,
						onClick: () => void show(),
						className: "inline-flex min-h-11 items-center gap-2 rounded-full bg-sand px-3 text-sm font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }), post.comments]
					}),
					post.mine ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 px-2 text-sm font-medium text-terra",
						onClick: () => {
							deleteCircle({ data: post.id }).then(onRemove);
						},
						children: "Remove"
					}) : null
				]
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 space-y-3 border-t border-line pt-3",
				children: [
					comments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "No replies yet."
					}) : null,
					comments.map((comment) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm font-medium",
							children: [
								comment.authorName,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-normal text-muted",
									children: clock(comment.createdAt)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 leading-relaxed",
							children: comment.body
						}),
						comment.mine ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-1 min-h-11 text-sm font-medium text-terra",
							onClick: () => {
								deleteComment({ data: comment.id }).then(() => {
									setComments((list) => list.filter((item) => item.id !== comment.id));
									onChange(post.id, { comments: Math.max(0, post.comments - 1) });
								});
							},
							children: "Remove"
						}) : null
					] }, comment.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: reply,
						maxLength: 200,
						rows: 2,
						placeholder: "Reply",
						onChange: (e) => setReply(e.target.value),
						className: "w-full rounded-2xl border border-line bg-cream px-4 py-3 text-base leading-relaxed placeholder:text-muted"
					}),
					replyError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-terra",
						children: replyError
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						variant: "line",
						className: "w-full",
						disabled: busy || !reply.trim(),
						onClick: () => void sendReply(),
						children: busy ? "Sending…" : "Reply"
					})
				]
			}) : null
		]
	});
}
var LABELS = {
	welcome: "Welcome",
	who: "Who is this for",
	setup: "About your baby",
	parent: "About you",
	home: "Home",
	detail: "Product",
	timeline: "Timeline",
	circle: "Circle",
	profile: "Profile",
	wishlist: "Wish list",
	quizdraft: "Quiz draft"
};
function screenKey(screen, quizIndex) {
	return screen === "quiz" ? `quiz-${quizIndex + 1}` : screen;
}
function screenLabel(key) {
	if (key.startsWith("quiz-")) return `Quiz, question ${key.slice(5)}`;
	return LABELS[key] ?? key;
}
function notesText(notes) {
	const groups = /* @__PURE__ */ new Map();
	for (const note of notes) {
		const list = groups.get(note.screen) ?? [];
		list.push(note);
		groups.set(note.screen, list);
	}
	return [...groups.entries()].map(([screen, items]) => [`${screenLabel(screen)}`, ...items.map((item) => `- ${item.text.trim()}`)].join("\n")).join("\n\n");
}
function Notes() {
	const screen = useApp((s) => s.screen);
	const quizIndex = useApp((s) => s.quizIndex);
	const notes = useApp((s) => s.notes);
	const addNote = useApp((s) => s.addNote);
	const updateNote = useApp((s) => s.updateNote);
	const deleteNote = useApp((s) => s.deleteNote);
	const here = screenKey(screen, quizIndex);
	const pins = notes.filter((note) => note.screen === here);
	const [placing, setPlacing] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(null);
	const copyRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const area = copyRef.current;
		if (!area || copied === null) return;
		area.focus();
		area.select();
		area.setSelectionRange(0, area.value.length);
	}, [copied, notes]);
	function spot(event) {
		const rect = event.currentTarget.getBoundingClientRect();
		const x = Math.min(92, Math.max(8, (event.clientX - rect.left) / rect.width * 100));
		const y = Math.min(98, Math.max(2, (event.clientY - rect.top) / rect.height * 100));
		setDraft({
			x,
			y,
			text: ""
		});
		setPlacing(false);
		setOpen(false);
	}
	function save() {
		if (!draft) return;
		const text = draft.text.trim();
		if (!text) return;
		if (draft.id) updateNote(draft.id, text);
		else addNote({
			id: `n${Date.now().toString(36)}`,
			screen: here,
			x: draft.x,
			y: draft.y,
			text,
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		});
		setDraft(null);
	}
	function copyAll() {
		const text = notes.length ? notesText(notes) : "No notes yet.";
		const area = copyRef.current;
		let ok = false;
		if (area) {
			area.focus();
			area.select();
			area.setSelectionRange(0, text.length);
			try {
				ok = document.execCommand("copy");
			} catch {
				ok = false;
			}
		}
		setCopied(ok ? "yes" : "no");
		if (!ok && navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(() => setCopied("yes"), () => setCopied("no"));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		placing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 z-30 cursor-crosshair bg-ink/10",
			onClick: spot,
			role: "presentation"
		}) : null,
		pins.map((note, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => {
				setDraft({
					id: note.id,
					x: note.x,
					y: note.y,
					text: note.text
				});
				setPlacing(false);
				setOpen(false);
			},
			style: {
				left: `${note.x}%`,
				top: `${note.y}%`
			},
			className: "absolute z-30 flex size-8 -translate-x-1/2 -translate-y-full items-center justify-center rounded-full bg-ink text-sm font-medium text-paper",
			"aria-label": `Note ${index + 1}`,
			children: index + 1
		}, note.id)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed right-4 top-4 z-50 flex items-center gap-2",
			children: placing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setPlacing(false),
				className: "inline-flex min-h-11 items-center rounded-full bg-ink px-4 text-sm font-medium text-paper",
				children: "Done"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => {
					setOpen((value) => !value);
					setDraft(null);
				},
				className: "inline-flex min-h-11 items-center rounded-full bg-ink px-4 text-sm font-medium text-paper",
				children: ["Notes", notes.length ? ` ${notes.length}` : ""]
			})
		}),
		placing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "fixed inset-x-4 top-16 z-50 rounded-2xl bg-ink px-4 py-3 text-sm text-paper",
			children: "Tap the spot you want to change."
		}) : null,
		open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-md px-4 pb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-h-[70dvh] overflow-y-auto rounded-3xl border border-line bg-paper p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl",
						children: "Notes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Saved on this device. Select the notes below if Copy doesn’t take."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						ref: copyRef,
						readOnly: true,
						value: notes.length ? notesText(notes) : "No notes yet.",
						rows: 6,
						onFocus: (event) => event.currentTarget.select(),
						className: "mt-4 w-full rounded-2xl border border-line bg-cream px-4 py-3 text-base leading-relaxed text-ink"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						variant: "line",
						className: "mt-2 w-full",
						onClick: copyAll,
						children: copied === "yes" ? "Copied" : "Copy all notes"
					}),
					copied === "yes" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Paste them in the chat."
					}) : null,
					copied === "no" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "The preview blocked the copy. Press and hold the notes, then tap Copy."
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						className: "mt-3 w-full",
						onClick: () => {
							setPlacing(true);
							setOpen(false);
						},
						children: "Tap anywhere to add"
					}),
					notes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted",
						children: "None yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-3",
						children: notes.map((note) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								setDraft({
									id: note.id,
									x: note.x,
									y: note.y,
									text: note.text
								});
								setOpen(false);
							},
							className: "w-full rounded-2xl bg-cream px-3 py-3 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm font-medium text-terra",
								children: screenLabel(note.screen)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block leading-relaxed",
								children: note.text
							})]
						}) }, note.id))
					})
				]
			})
		}) : null,
		draft ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-md px-4 pb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "rounded-3xl border border-line bg-paper p-4",
				onSubmit: (event) => {
					event.preventDefault();
					save();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-terra",
						children: screenLabel(here)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						autoFocus: true,
						value: draft.text,
						rows: 4,
						maxLength: 500,
						placeholder: "What should change here?",
						onChange: (event) => setDraft({
							...draft,
							text: event.target.value
						}),
						className: "mt-3 w-full rounded-2xl border border-line bg-cream px-4 py-3 text-base leading-relaxed text-ink placeholder:text-muted"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							variant: "sand",
							onClick: () => setDraft(null),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							type: "submit",
							disabled: !draft.text.trim(),
							children: "Save"
						})]
					}),
					draft.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							deleteNote(draft.id);
							setDraft(null);
						},
						className: "mt-3 min-h-11 w-full text-sm font-medium text-terra",
						children: "Delete note"
					}) : null
				]
			})
		}) : null
	] });
}
function clip(value, max) {
	return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}
var askMom = createServerFn({ method: "POST" }).validator((input) => {
	return {
		messages: (input.messages ?? []).slice(-6).map((turn) => ({
			role: turn.role === "assistant" ? "assistant" : "user",
			text: clip(turn.text, 500)
		})).filter((turn) => turn.text),
		stage: clip(input.stage, 80),
		about: clip(input.about, 320),
		products: (input.products ?? []).map((item) => ({
			name: clip(item?.name, 120),
			image: clip(item?.image, 500),
			query: clip(item?.query, 160)
		})).filter((item) => item.name).slice(0, 8)
	};
}).handler(createSsrRpc("6e2d870fd8cdaf53fe2b9b6d68f010402345e14cf4f3ceed8d1a7ce40648ac4b"));
var STARTERS = [
	"What should I actually buy this week?",
	"What can wait?",
	"Is there a short video for this stage?"
];
var memory = [];
function shopStyle(tags) {
	if (tags.budget === "budget") return "Watches the price.";
	if (tags.budget === "splurge") return "Will pay more if it lasts.";
	if (tags.budget === "thrift") return "Would rather buy used or make it.";
	return "Shops in the middle.";
}
function usePictured(cards) {
	const key = cards.map((card) => card.query ?? card.id).join("|");
	const [live, setLive] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		const queries = [...new Set(cards.map((card) => card.query).filter((query) => Boolean(query)))].slice(0, 8);
		if (!queries.length) return;
		let stop = false;
		lookupProducts({ data: { queries } }).then((items) => {
			if (stop) return;
			const next = {};
			for (const item of items) next[item.query] = item;
			setLive(next);
		}).catch(() => void 0);
		return () => {
			stop = true;
		};
	}, [key]);
	return cards.map((card) => {
		const hit = card.query ? live[card.query] : void 0;
		return {
			name: hit?.title || card.name,
			image: hit?.image || card.image || "",
			query: card.query || card.name
		};
	});
}
function Mom() {
	const tags = useApp((s) => s.tags);
	const children = useApp((s) => s.children);
	const activeChildId = useApp((s) => s.activeChildId);
	const preview = useApp((s) => s.preview);
	const votes = useApp((s) => s.votes);
	const [thread, setThread] = (0, import_react.useState)(memory);
	const [draft, setDraft] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const view = buildHome({
		child: children.find((item) => item.id === activeChildId) ?? children[0] ?? null,
		tags,
		preview,
		votes,
		useStyle: children.some((item) => item.kind === "born")
	});
	const stage = "error" in view ? "This stage" : view.headline;
	const about = "error" in view ? "" : `${view.blurb[0]} ${shopStyle(tags)}`;
	const products = usePictured("error" in view ? [] : view.ranked.filter((card) => card.kind === "product").slice(0, 8));
	function remember(next) {
		memory.splice(0, memory.length, ...next.slice(-12));
		setThread(memory.slice());
	}
	async function send(text) {
		const question = text.trim();
		if (!question || busy) return;
		const next = [...thread, {
			role: "user",
			text: question
		}].slice(-12);
		remember(next);
		setDraft("");
		setError("");
		setBusy(true);
		try {
			const result = await askMom({ data: {
				messages: next.map((turn) => ({
					role: turn.role,
					text: turn.text
				})),
				stage,
				about,
				products
			} });
			if (!result.ok) {
				setError(result.error);
				return;
			}
			remember([...next, {
				role: "assistant",
				text: result.answer.reply,
				products: result.answer.products,
				video: result.answer.video
			}]);
		} catch {
			setError("She couldn’t answer just now. Try again in a minute.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
		className: "flex min-h-dvh flex-col pb-28 pt-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-5xl leading-none",
				children: "Ask a mom"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-muted",
				children: [stage, ". General info, not a clinician."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex-1 space-y-4",
				children: [
					thread.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						children: STARTERS.map((prompt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => send(prompt),
							className: "block min-h-11 w-full rounded-2xl border border-line bg-paper px-4 py-3 text-left",
							children: prompt
						}, prompt))
					}) : thread.map((turn, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: turn.role === "user" ? "ml-8" : "mr-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: turn.role === "user" ? "rounded-2xl bg-ink px-4 py-3 text-paper" : "leading-relaxed",
								children: turn.text
							}),
							turn.products?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 space-y-2",
								children: turn.products.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: product.href,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "flex items-center gap-3 rounded-2xl border border-line bg-paper p-2",
									children: [product.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: product.image,
										alt: "",
										className: "size-16 shrink-0 rounded-xl object-cover"
									}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "line-clamp-2 block font-medium leading-tight",
											children: product.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-1 block text-sm font-medium text-terra",
											children: "Shop"
										})]
									})]
								}) }, product.name))
							}) : null,
							turn.video?.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: turn.video.url,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "mt-3 block overflow-hidden rounded-2xl border border-line bg-paper",
								children: [turn.video.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: turn.video.image,
									alt: "",
									className: "aspect-video w-full object-cover"
								}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "block px-3 py-3 text-sm font-medium",
									children: ["Watch · ", turn.video.title]
								})]
							}) : null
						]
					}, `${turn.role}-${index}`)),
					busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Thinking it through…"
					}) : null,
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-terra",
						children: error
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-6 flex gap-2",
				onSubmit: (event) => {
					event.preventDefault();
					send(draft);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: draft,
					maxLength: 500,
					onChange: (event) => setDraft(event.target.value),
					placeholder: "Ask about this stage",
					className: "h-12 min-w-0 flex-1 rounded-full border border-line bg-paper px-4"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: busy || !draft.trim(),
					className: "h-12 shrink-0 rounded-full bg-terra px-4 text-sm font-medium text-paper disabled:opacity-50",
					children: "Send"
				})]
			})
		]
	});
}
/** Candid lines from the stage people just left. Editorial, not a user feed and not advice. */
var UNTOLD = {
	p4: [
		"You can feel completely fine, or completely wrecked, before anyone else can tell. Both are this stage.",
		"You will photograph the test, zoom in, and still not trust it. That’s the first week, not a glitch.",
		"The only menu is whatever stays down. Ginger is not required to be a personality.",
		"Midnight searching will tell you it is fine and also not fine. Closing the tab is a skill.",
		"Your pants give out before a bump exists. The waistband is an early reporter."
	],
	p9: [
		"The “bump” is often bloat, and you will still check it in the mirror.",
		"A food you loved last month can become the enemy. That’s not a character flaw.",
		"People say you’re glowing. You are negotiating with a cracker.",
		"Waistbands quit before the announcement does.",
		"Naps stop being optional and start being how the day works."
	],
	p14: [
		"The first flutter is easy to miss. A lot of people think it’s gas. Sometimes it is gas.",
		"Energy comes back, and so does the urge to reorganize one drawer at 9 p.m.",
		"Strangers still can’t tell. Your jeans already filed a complaint.",
		"You will buy one thing “just in case,” then two more. The drawer is taking notes.",
		"Someone will quiz your due date. You do not owe them a calendar."
	],
	p21: [
		"The baby kicks in meetings and goes still the second someone wants to feel it.",
		"Side sleeping is a group project between you, a pillow, and gravity.",
		"You feel one kick and immediately need another. That math is very common.",
		"Heartburn has opinions. Tomatoes usually lose.",
		"People reach for the bump. “No thanks” is a full answer."
	],
	p28: [
		"“You must be so excited” and “you must be so tired” are the same sentence now.",
		"Getting off the couch is a three-step plan. Budget for it.",
		"A tote with a charger and a snack is a bag. The internet wants a binder. The internet is not in labor.",
		"Practice tightenings show up like a rehearsal you didn’t audition for.",
		"You will lose a sock and find it in the car seat you already installed."
	],
	p34: [
		"Walking into a room and forgetting why is a trimester, not a verdict.",
		"The baby’s schedule is “party at 2 a.m.” You are the venue.",
		"Everyone has a birth story. You can nod and not take notes.",
		"You will pack the bag, unpack it, and repack it because a lip balm felt wrong.",
		"Nesting is half useful and half reorganizing the spices like they owe you money."
	],
	p38: [
		"“Any day now” is not a calendar invite. The baby did not get the memo.",
		"You will be sure it’s starting. Often it isn’t. Both can share a Tuesday.",
		"A due date is an estimate with very confident branding.",
		"The last weeks are a lot of standing in the kitchen with a bowl of cereal.",
		"“Anything yet?” does not require a reply. Leaving it unread is allowed."
	],
	b0: [
		"The days are a loop and the nights don’t have names.",
		"You might cry because feeding was hard, or because the toast was perfect. Both count.",
		"The visitor who starts the dishwasher is the one to invite back.",
		"The outfit you pictured is in the laundry because of something you will not be naming.",
		"“Sleep when the baby sleeps” was written by someone with no group chat."
	],
	b2: [
		"Cluster feeding can take the whole afternoon. That is the stage, not a sign you broke it.",
		"You will know the hour by which side you used last.",
		"The fussy evening is loud and famous. It still feels personal at 7 p.m.",
		"Someone will suggest a schedule. The baby did not read it.",
		"Eating with one hand becomes a private résumé skill."
	],
	b6: [
		"A crying stretch in the second month is common, and it still feels aimed at you.",
		"One coffee out of the house can feel like a vacation that brought a car seat.",
		"The first real smile will not repeat on command. They are not negotiating.",
		"A messy room and a fine baby can exist in the same hour.",
		"You will ask “is this normal?” A lot of the time the answer is “loud, but yes.”"
	],
	b4m: [
		"Everything goes in the mouth, including your idea of a clean floor.",
		"They laugh at nothing and ignore the expensive toy. The wooden spoon wins.",
		"Rolling one direction and not back is a bit they commit to.",
		"You can miss the tinier stage and be relieved it’s over, on the same day.",
		"Drool is a hydration plan you did not approve."
	],
	b6m: [
		"Sitting shows up on a random Tuesday, then they tip over and try again.",
		"They want your plate and refuse the plate you made. This joke runs for years.",
		"A pouch in the bag will save a store. You will forget the pouch.",
		"Sleep can get worse the week you mentioned it was good. Don’t mention it.",
		"Raspberries get blown during the one quiet moment. It feels on purpose."
	],
	b9: [
		"They pull up on everything, including the one thing you meant to anchor.",
		"Cruising the couch is a sport. The trophy is your phone.",
		"“Not in your mouth” becomes a dialect you speak all day.",
		"Walking is not a race. A fast crawl is also doing the assignment.",
		"You baby-proof on Monday. They invent a new hazard by Thursday."
	],
	b15: [
		"“No” is a complete sentence, and they use it with confidence you wish you had.",
		"They copy the one habit you hoped they missed.",
		"Climbing is not a setting you can pause. It’s the hobby.",
		"The big feeling ends right after you sit on the floor for it. Usually.",
		"They want to do it, then want you to do it, then themselves again. That is the activity."
	]
};
function Untold({ stageId }) {
	const lines = UNTOLD[stageId];
	const scroller = (0, import_react.useRef)(null);
	const [index, setIndex] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		setIndex(0);
		scroller.current?.scrollTo({ left: 0 });
	}, [stageId]);
	function onScroll() {
		const el = scroller.current;
		if (!el || !el.clientWidth) return;
		const next = Math.round(el.scrollLeft / el.clientWidth);
		const clamped = Math.min(lines.length - 1, Math.max(0, next));
		setIndex((prev) => prev === clamped ? prev : clamped);
	}
	function go(to) {
		const el = scroller.current;
		if (!el) return;
		const next = (to + lines.length) % lines.length;
		el.scrollTo({
			left: next * el.clientWidth,
			behavior: "smooth"
		});
		setIndex(next);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-roledescription": "carousel",
		"aria-label": "What they don’t tell you",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold",
					children: "The real part"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "shrink-0 text-sm tabular-nums text-muted",
					children: [
						index + 1,
						"/",
						lines.length
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: scroller,
				onScroll,
				className: "deck mt-3",
				children: lines.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
					"aria-roledescription": "slide",
					"aria-label": `${i + 1} of ${lines.length}`,
					className: "pr-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg leading-snug",
						children: line
					})
				}, `${stageId}-${i}`))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center justify-between",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Previous",
						onClick: () => go(index - 1),
						className: "flex size-11 items-center justify-center rounded-full bg-cream",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-1",
						children: lines.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": `Show note ${i + 1}`,
							"aria-current": i === index ? "true" : void 0,
							onClick: () => go(i),
							className: "flex size-11 items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: clsx("size-2 rounded-full", i === index ? "bg-terra" : "bg-line") })
						}, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Next",
						onClick: () => go(index + 1),
						className: "flex size-11 items-center justify-center rounded-full bg-cream",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
					})
				]
			})
		]
	});
}
var STORAGE_KEY = "thisstage.quiz-draft.v1";
function seed() {
	return QUESTIONS.map((question) => ({
		id: question.key,
		key: question.key,
		prompt: question.prompt,
		answers: question.options.map((option) => ({
			id: option.value,
			text: option.label
		})),
		skip: labelForSkip(question.key),
		notes: ""
	}));
}
function labelForSkip(key) {
	const value = SKIP_VALUE[key];
	return QUESTIONS.find((item) => item.key === key)?.options.find((option) => option.value === value)?.label ?? value;
}
function load() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return seed();
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed) || parsed.length === 0) return seed();
		const current = parsed.filter((item) => item.key !== "experience");
		return current.length ? current : seed();
	} catch {
		return seed();
	}
}
function draftToText(questions) {
	return questions.map((question, index) => {
		const answers = question.answers.map((answer, i) => `Answer ${i + 1}: ${answer.text}`).join("\n");
		return [
			`Question ${index + 1}`,
			`Code key: ${question.key || "new"}`,
			`Question: ${question.prompt}`,
			answers,
			`If they skip: ${question.skip}`,
			`Notes: ${question.notes}`
		].join("\n");
	}).join("\n\n");
}
function newId() {
	return Math.random().toString(36).slice(2, 8);
}
function QuizDraft() {
	const onboarded = useApp((s) => s.onboarded);
	const setScreen = useApp((s) => s.set);
	const [questions, setQuestions] = (0, import_react.useState)(seed);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [copied, setCopied] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setQuestions(load());
		setReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
	}, [questions, ready]);
	function update(id, patch) {
		setCopied(false);
		setQuestions((list) => list.map((question) => question.id === id ? {
			...question,
			...patch
		} : question));
	}
	function updateAnswer(questionId, answerId, text) {
		setCopied(false);
		setQuestions((list) => list.map((question) => question.id === questionId ? {
			...question,
			answers: question.answers.map((answer) => answer.id === answerId ? {
				...answer,
				text
			} : answer)
		} : question));
	}
	async function copyEdits() {
		const text = draftToText(questions);
		try {
			await navigator.clipboard.writeText(text);
		} catch {
			const area = document.createElement("textarea");
			area.value = text;
			document.body.appendChild(area);
			area.select();
			document.execCommand("copy");
			area.remove();
		}
		setCopied(true);
	}
	function downloadEdits() {
		const blob = new Blob([draftToText(questions)], { type: "text/plain;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = "ThisStage-quiz-edits.txt";
		link.click();
		URL.revokeObjectURL(url);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
		className: "pb-16 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setScreen({ screen: onboarded ? "home" : "welcome" }),
				className: "min-h-11 text-sm font-medium text-terra",
				children: "Back"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 font-display text-4xl text-ink",
				children: "Edit the quiz"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 leading-relaxed text-muted",
				children: "The Word file only opens as a preview, so change the questions here. These boxes do not change the live quiz until you paste them back to me."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					className: "w-full",
					onClick: () => void copyEdits(),
					children: copied ? "Copied — paste it in the chat" : "Copy my edits"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					variant: "line",
					className: "w-full",
					onClick: downloadEdits,
					children: "Download a text file"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 space-y-6",
				children: questions.map((question, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-3xl border border-line bg-paper p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm font-medium text-terra",
								children: ["Question ", index + 1]
							}), index >= QUESTIONS.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "min-h-11 text-sm font-medium text-muted",
								onClick: () => setQuestions((list) => list.filter((item) => item.id !== question.id)),
								children: "Remove"
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-3 block text-sm font-medium",
							children: ["Question", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: question.prompt,
								rows: 3,
								onChange: (e) => update(question.id, { prompt: e.target.value }),
								className: "mt-2 w-full rounded-2xl border border-line bg-cream px-4 py-3 text-base font-normal leading-relaxed"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 space-y-3",
							children: question.answers.map((answer, answerIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm font-medium",
								children: [
									"Answer ",
									answerIndex + 1,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: answer.text,
										onChange: (e) => updateAnswer(question.id, answer.id, e.target.value),
										className: "mt-2 h-12 w-full rounded-2xl border border-line bg-cream px-4 text-base font-normal"
									})
								]
							}, answer.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-3 min-h-11 text-sm font-medium text-terra",
							onClick: () => update(question.id, { answers: [...question.answers, {
								id: newId(),
								text: ""
							}] }),
							children: "Add an answer"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-2 block text-sm font-medium",
							children: ["If they skip, treat it as", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: question.skip,
								onChange: (e) => update(question.id, { skip: e.target.value }),
								className: "mt-2 h-12 w-full rounded-2xl border border-line bg-cream px-4 text-base font-normal"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-4 block text-sm font-medium",
							children: ["Notes for me", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: question.notes,
								rows: 2,
								placeholder: "Order, tone, or why",
								onChange: (e) => update(question.id, { notes: e.target.value }),
								className: "mt-2 w-full rounded-2xl border border-line bg-cream px-4 py-3 text-base font-normal leading-relaxed placeholder:text-muted"
							})]
						})
					]
				}, question.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				variant: "line",
				className: "mt-6 w-full",
				onClick: () => setQuestions((list) => [...list, {
					id: newId(),
					key: "new",
					prompt: "",
					answers: [
						{
							id: newId(),
							text: ""
						},
						{
							id: newId(),
							text: ""
						},
						{
							id: newId(),
							text: ""
						}
					],
					skip: "",
					notes: ""
				}]),
				children: "Add a question"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					className: "w-full",
					onClick: () => void copyEdits(),
					children: copied ? "Copied — paste it in the chat" : "Copy my edits"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "min-h-11 w-full text-sm font-medium text-muted",
					onClick: () => {
						localStorage.removeItem(STORAGE_KEY);
						setQuestions(seed());
						setCopied(false);
					},
					children: "Reset to the live quiz"
				})]
			})
		]
	});
}
function foodCaption(tags, stageId) {
	const diet = tags.food === "vegetarian" ? "Vegetarian." : tags.food === "vegan" ? "Plants only." : tags.food === "avoid" ? tags.avoid ? `No ${tags.avoid}.` : "Leaves something out." : tags.food === "other" ? tags.foodNote || "The way you eat." : "Easy, with what you already eat.";
	if (stageId.startsWith("p")) return `${diet} Dinner, a snack, breakfast, a drink.`;
	if (stageId === "b15") return `${diet} Easy toddler meals.`;
	if (stageId === "b6m" || stageId === "b9") return `${diet} Meals you can share.`;
	return `${diet} One-hand food.`;
}
var ABOUT_YOU = "Tell us about you";
var ABOUT_KIDS = "Tell us about your kids";
var ABOUT_PARENT = "Tell us about how you parent";
var COUNTRIES = ["United States", "Canada"];
var US_STATES = [
	"Alabama",
	"Alaska",
	"Arizona",
	"Arkansas",
	"California",
	"Colorado",
	"Connecticut",
	"Delaware",
	"District of Columbia",
	"Florida",
	"Georgia",
	"Hawaii",
	"Idaho",
	"Illinois",
	"Indiana",
	"Iowa",
	"Kansas",
	"Kentucky",
	"Louisiana",
	"Maine",
	"Maryland",
	"Massachusetts",
	"Michigan",
	"Minnesota",
	"Mississippi",
	"Missouri",
	"Montana",
	"Nebraska",
	"Nevada",
	"New Hampshire",
	"New Jersey",
	"New Mexico",
	"New York",
	"North Carolina",
	"North Dakota",
	"Ohio",
	"Oklahoma",
	"Oregon",
	"Pennsylvania",
	"Rhode Island",
	"South Carolina",
	"South Dakota",
	"Tennessee",
	"Texas",
	"Utah",
	"Vermont",
	"Virginia",
	"Washington",
	"West Virginia",
	"Wisconsin",
	"Wyoming"
];
var CA_PROVINCES = [
	"Alberta",
	"British Columbia",
	"Manitoba",
	"New Brunswick",
	"Newfoundland and Labrador",
	"Northwest Territories",
	"Nova Scotia",
	"Nunavut",
	"Ontario",
	"Prince Edward Island",
	"Quebec",
	"Saskatchewan",
	"Yukon"
];
function StageApp() {
	const app = useApp();
	const screen = app.screen === "logos" ? "home" : app.screen;
	(0, import_react.useEffect)(() => {
		window.scrollTo(0, 0);
	}, [
		screen,
		app.detailId,
		app.quizIndex,
		app.focus,
		app.preview
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh bg-cream text-ink",
		children: [
			app.onboarded && (screen === "home" || screen === "timeline" || screen === "circle" || screen === "mom") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KidTabs, {}) : null,
			screen === "welcome" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Welcome, {}) : null,
			screen === "who" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Who, {}) : null,
			screen === "setup" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Setup, {}) : null,
			screen === "parent" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Parent, {}) : null,
			screen === "quiz" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quiz, {}) : null,
			screen === "home" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Home$1, {}) : null,
			screen === "detail" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {}) : null,
			screen === "timeline" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timeline, {}) : null,
			screen === "circle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, {}) : null,
			screen === "mom" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mom, {}) : null,
			screen === "profile" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Profile, {}) : null,
			screen === "wishlist" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wishlist, {}) : null,
			screen === "quizdraft" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizDraft, {}) : null,
			app.onboarded && screen !== "detail" && screen !== "quizdraft" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notes, {})
		]
	});
}
function Splash() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh items-center justify-center bg-cream px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-4 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-14" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-4xl text-ink",
				children: "ThisStage"
			})]
		})
	});
}
function tabSub(child) {
	if (child.kind === "pregnant") {
		const week = gestationalWeek(child.due);
		if (week === null) return "Due date";
		return week > 42 ? "Week 42+" : `Week ${Math.max(1, week)}`;
	}
	const days = ageDays(child.birthday);
	if (days === null) return "Birthday";
	if (days < 0) return "Not yet";
	return ageFigure(days).figure;
}
function KidTabs() {
	const children = useApp((s) => s.children);
	const activeChildId = useApp((s) => s.activeChildId);
	const set = useApp((s) => s.set);
	if (children.length < 2) return null;
	const active = activeChildId || children[0]?.id;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "sticky top-0 z-30 border-b border-line bg-cream",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			role: "tablist",
			"aria-label": "Your kids",
			className: "mx-auto flex w-full max-w-md overflow-x-auto",
			children: children.map((item) => {
				const on = item.id === active;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "tab",
					"aria-selected": on,
					onClick: () => set({
						activeChildId: item.id,
						preview: null
					}),
					className: clsx("min-h-14 min-w-28 flex-1 border-b-2 px-4 py-2 text-left", on ? "border-terra text-ink" : "border-transparent text-muted"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block truncate text-base font-semibold",
						children: chipLabel(item)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block truncate text-xs",
						children: tabSub(item)
					})]
				}, item.id);
			})
		})
	});
}
function Ask({ progress, onBack, title, sub, section, children }) {
	const pct = Math.round(Math.min(100, Math.max(0, progress)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
		className: "pb-16 pt-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onBack,
				"aria-label": "Back",
				className: "grid size-11 place-items-center rounded-full bg-paper text-ink shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
					className: "size-5",
					"aria-hidden": true
				})
			}),
			section ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm font-medium text-terra",
				children: section
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-1 flex-1 overflow-hidden rounded-full bg-line",
					"aria-hidden": true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full rounded-full bg-terra",
						style: { width: `${pct}%` }
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm font-medium tabular-nums text-terra",
					children: [pct, "%"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-8 text-[1.7rem] font-semibold leading-tight tracking-tight text-ink",
				children: title
			}),
			sub ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-base leading-relaxed text-muted",
				children: sub
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipToApp, {})
		]
	});
}
function skipToApp() {
	const state = useApp.getState();
	let children = state.children.length ? state.children : draftToChildren(state);
	if (!children.length) {
		const due = /* @__PURE__ */ new Date();
		due.setDate(due.getDate() + 140);
		children = [{
			id: newChildId(),
			name: "",
			kind: "pregnant",
			due: toISODate(due),
			birthday: "",
			sex: "unknown"
		}];
	}
	const activeChildId = children.some((child) => child.id === state.activeChildId) ? state.activeChildId : children[0]?.id ?? "";
	state.set({
		children,
		activeChildId,
		tags: state.tags,
		onboarded: true,
		screen: "home",
		preview: null,
		quizIndex: 0
	});
}
function SkipToApp() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: skipToApp,
		className: "mt-6 min-h-11 w-full text-sm text-muted underline",
		children: "Skip to the app"
	});
}
function choiceClass() {
	return "flex min-h-36 flex-col items-center justify-center gap-3 rounded-2xl border border-line bg-paper px-3 py-4 text-center text-ink active:border-ink";
}
function Welcome() {
	const set = useApp((s) => s.set);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
		className: "flex min-h-dvh flex-col justify-between py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-14" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-6 font-display text-5xl leading-none text-ink",
					children: "ThisStage"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-lg text-terra",
					children: "Your stage, filtered"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-sm text-lg leading-relaxed text-ink",
					children: "The anti-overwhelm guide for pregnancy and baby. Matched to how you parent."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					className: "h-14 w-full text-base",
					onClick: () => set({
						screen: "parent",
						tags: { ...NEUTRAL_TAGS },
						quizIndex: 0,
						preview: null,
						onboarded: false
					}),
					children: "Get started"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-center text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/about",
							className: "underline",
							children: "About"
						}),
						" · ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/guides",
							className: "underline",
							children: "Guides"
						}),
						" · ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/privacy",
							className: "underline",
							children: "Privacy"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => set({ screen: "quizdraft" }),
					className: "mt-4 min-h-11 w-full text-sm text-muted",
					children: "Edit the quiz questions"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipToApp, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-4 block",
					children: MEDICAL
				}) })
			] })
		]
	});
}
function Who() {
	const set = useApp((s) => s.set);
	const mode = useApp((s) => s.mode);
	const [step, setStep] = (0, import_react.useState)("where");
	const options = [
		{
			id: "pregnant",
			title: "I’m pregnant",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprout, {
				className: "size-8 text-terra",
				"aria-hidden": true
			})
		},
		{
			id: "baby",
			title: "Baby is here",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Baby, {
				className: "size-8 text-terra",
				"aria-hidden": true
			})
		},
		{
			id: "both",
			title: "Pregnant, and a baby already",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
				className: "size-8 text-terra",
				"aria-hidden": true
			})
		}
	];
	if (step === "count") {
		const counts = mode === "both" ? [2, 3] : [
			1,
			2,
			3
		];
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ask, {
			progress: 32,
			onBack: () => setStep("where"),
			section: ABOUT_KIDS,
			title: "How many little ones?",
			sub: mode === "both" ? "Count the one on the way, too." : "Each one gets their own page.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: clsx("grid gap-3", counts.length === 2 ? "grid-cols-2" : "grid-cols-3"),
				children: counts.map((count) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => set({
						kidCount: count,
						extraKids: Array.from({ length: extraCount(mode, count) }, emptyExtra),
						screen: "setup"
					}),
					className: choiceClass(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-3xl font-semibold",
						children: count
					})
				}, count))
			})
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ask, {
		progress: 24,
		onBack: () => set({ screen: "parent" }),
		section: ABOUT_KIDS,
		title: "Where are you right now?",
		sub: "We’ll start you there.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-3",
			children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => {
					if (option.id === "pregnant") {
						set({
							mode: "pregnant",
							kidCount: 1,
							extraKids: [],
							focus: "pregnancy",
							screen: "setup"
						});
						return;
					}
					set({
						mode: option.id,
						focus: option.id === "baby" ? "baby" : "pregnancy"
					});
					setStep("count");
				},
				className: clsx(choiceClass(), option.id === "both" && "col-span-2"),
				children: [option.icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-base leading-snug",
					children: option.title
				})]
			}, option.id))
		})
	});
}
function SexField({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
		className: "text-sm text-ink",
		children: label
	}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: clsx("grid gap-3", label && "mt-2"),
		children: [
			{
				id: "girl",
				label: "Girl"
			},
			{
				id: "boy",
				label: "Boy"
			},
			{
				id: "unknown",
				label: "Still a surprise"
			}
		].map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-pressed": value === option.id,
			onClick: () => onChange(option.id),
			className: clsx("min-h-16 rounded-2xl border bg-paper text-base", value === option.id ? "border-ink text-ink" : "border-line text-ink"),
			children: option.label
		}, option.id))
	})] });
}
function Setup() {
	const mode = useApp((s) => s.mode);
	const due = useApp((s) => s.due);
	const birthday = useApp((s) => s.birthday);
	const babyName = useApp((s) => s.babyName);
	const pregnancySex = useApp((s) => s.pregnancySex);
	const bornSex = useApp((s) => s.bornSex);
	const extraKids = useApp((s) => s.extraKids);
	const set = useApp((s) => s.set);
	const [step, setStep] = (0, import_react.useState)(0);
	const today = toISODate(/* @__PURE__ */ new Date());
	const needDue = mode !== "baby";
	const needBirth = mode !== "pregnant";
	const field = "mt-2 h-14 w-full min-w-0 rounded-2xl border border-line bg-paper px-4 text-base text-ink placeholder:text-muted";
	const beats = [
		...needDue ? ["due", "due-who"] : [],
		...needBirth ? ["child"] : ["name"],
		...extraKids.map((_, index) => `extra-${index}`)
	];
	const beat = beats[step] ?? "name";
	const total = beats.length;
	const extraIndex = beat.startsWith("extra-") ? Number(beat.slice(6)) : -1;
	const bornTotal = (needBirth ? 1 : 0) + extraKids.length;
	const bornIndex = beat === "child" ? 1 : extraIndex >= 0 ? extraIndex + 2 : 0;
	function birthdayError(value, name, sex) {
		if (!name.trim()) return "Add their name.";
		if (!value) return "Add the birthday.";
		if (!parseDateOnly(value)) return "That birthday doesn’t look right.";
		if (value > today) return "That birthday is still ahead.";
		const days = ageDays(value);
		if (days !== null && days > 1825) return "We cover pregnancy through the early years.";
		if (!sex) return "Pick girl, boy, or still a surprise.";
		return "";
	}
	let error = "";
	if (beat === "due") {
		if (!due) error = "Add the arrival date.";
		else if (!parseDateOnly(due)) error = "That date doesn’t look right.";
		else {
			const week = gestationalWeek(due);
			if (week !== null && (week < -4 || week > 45)) error = "That date is outside a pregnancy we can map.";
		}
	} else if (beat === "due-who") {
		if (!pregnancySex) error = "Pick girl, boy, or still a surprise.";
	} else if (beat === "name") error = "";
	else if (beat === "child") error = birthdayError(birthday, babyName, bornSex);
	else if (extraIndex >= 0) {
		const extra = extraKids[extraIndex];
		error = birthdayError(extra?.birthday ?? "", extra?.name ?? "", extra?.sex ?? "");
	}
	const both = needDue && needBirth;
	let title = "Want to add a name?";
	let sub = "Only shows on Home. Blank is fine.";
	if (beat === "due") {
		title = "When is the baby arriving?";
		sub = both ? "This date is for the one on the way." : "That’s how we know which week you’re in.";
	} else if (beat === "due-who") {
		title = "Do you know if it’s a girl or a boy?";
		sub = "Still a surprise is a fine answer.";
	} else if (bornIndex > 0) {
		sub = "We’ll keep this between us.";
		const which = bornIndex === 1 ? "first" : bornIndex === 2 ? "second" : "third";
		if (both && bornTotal === 1) title = "About the child you already have";
		else if (bornTotal === 1) title = "About your child";
		else if (both) title = bornIndex === 1 ? "About the child you already have" : "About your other child";
		else title = `Your ${which} child`;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Ask, {
		progress: 40 + step / total * 28,
		onBack: () => step > 0 ? setStep(step - 1) : set({ screen: "who" }),
		section: ABOUT_KIDS,
		title,
		sub,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-5",
				children: [
					beat === "due" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-ink",
							children: "Arrival date"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							value: due,
							onChange: (e) => set({ due: e.target.value }),
							className: field
						})]
					}) : null,
					beat === "due-who" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SexField, {
						label: "",
						value: pregnancySex,
						onChange: (sex) => set({ pregnancySex: sex })
					}) : null,
					beat === "name" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-ink",
							children: "Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: babyName,
							maxLength: 40,
							autoComplete: "off",
							placeholder: "First name",
							onChange: (e) => set({ babyName: e.target.value }),
							className: field
						})]
					}) : null,
					beat === "child" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-ink",
									children: "Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: babyName,
									maxLength: 40,
									autoComplete: "off",
									placeholder: "First name",
									onChange: (e) => set({ babyName: e.target.value }),
									className: field
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-ink",
									children: "Birthday"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "date",
									value: birthday,
									max: today,
									onChange: (e) => set({ birthday: e.target.value }),
									className: field
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SexField, {
								label: "Girl or boy?",
								value: bornSex,
								onChange: (sex) => set({ bornSex: sex })
							})
						]
					}) : null,
					extraIndex >= 0 && extraKids[extraIndex] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-ink",
									children: "Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: extraKids[extraIndex].name,
									maxLength: 40,
									placeholder: "First name",
									onChange: (e) => set({ extraKids: extraKids.map((kid, i) => i === extraIndex ? {
										...kid,
										name: e.target.value
									} : kid) }),
									className: field
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-ink",
									children: "Birthday"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "date",
									value: extraKids[extraIndex].birthday,
									max: today,
									onChange: (e) => set({ extraKids: extraKids.map((kid, i) => i === extraIndex ? {
										...kid,
										birthday: e.target.value
									} : kid) }),
									className: field
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SexField, {
								label: "Girl or boy?",
								value: extraKids[extraIndex].sex,
								onChange: (sex) => set({ extraKids: extraKids.map((kid, i) => i === extraIndex ? {
									...kid,
									sex
								} : kid) })
							})
						]
					}) : null
				]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-terra",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				className: "mt-6 h-14 w-full",
				disabled: Boolean(error),
				onClick: () => step < total - 1 ? setStep(step + 1) : set({
					screen: "quiz",
					quizIndex: 0
				}),
				children: "Next"
			})
		]
	});
}
function parentError(input) {
	const today = toISODate(/* @__PURE__ */ new Date());
	if (!input.name.trim()) return "Add your name.";
	if (!input.birthday) return "Add your birthday.";
	if (!parseDateOnly(input.birthday)) return "That birthday doesn’t look right.";
	if (input.birthday > today) return "That birthday is still ahead.";
	const age = ageDays(input.birthday);
	if (age !== null && age < 4745) return "Use the parent’s birthday.";
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) return "Add a real email.";
	if (!input.city.trim()) return "Add your city.";
	if (input.country !== "United States" && input.country !== "Canada") return "Choose your country.";
	if (!input.region.trim()) return input.country === "Canada" ? "Choose your province." : "Choose your state.";
	return "";
}
function Parent() {
	const onboarded = useApp((s) => s.onboarded);
	const parentName = useApp((s) => s.parentName);
	const parentBirthday = useApp((s) => s.parentBirthday);
	const parentEmail = useApp((s) => s.parentEmail);
	const parentCity = useApp((s) => s.parentCity);
	const parentRegion = useApp((s) => s.parentRegion);
	const parentCountry = useApp((s) => s.parentCountry);
	const set = useApp((s) => s.set);
	const today = toISODate(/* @__PURE__ */ new Date());
	const error = parentError({
		name: parentName,
		birthday: parentBirthday,
		email: parentEmail,
		city: parentCity,
		region: parentRegion,
		country: parentCountry
	});
	const field = "mt-2 h-14 w-full min-w-0 rounded-2xl border border-line bg-paper px-4 text-base text-ink placeholder:text-muted";
	const regions = parentCountry === "Canada" ? CA_PROVINCES : parentCountry === "United States" ? US_STATES : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Ask, {
		progress: 12,
		onBack: () => set({ screen: onboarded ? "profile" : "welcome" }),
		section: ABOUT_YOU,
		title: "A few basics",
		sub: "Just so we know who this is for.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium text-ink",
							children: "Your name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: parentName,
							maxLength: 60,
							autoComplete: "name",
							placeholder: "First and last",
							onChange: (e) => set({ parentName: e.target.value }),
							className: field
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium text-ink",
							children: "Your birthday"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							value: parentBirthday,
							max: today,
							autoComplete: "bday",
							onChange: (e) => set({ parentBirthday: e.target.value }),
							className: field
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium text-ink",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							inputMode: "email",
							value: parentEmail,
							maxLength: 80,
							autoComplete: "email",
							placeholder: "you@email.com",
							onChange: (e) => set({ parentEmail: e.target.value }),
							className: field
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium text-ink",
							children: "Country"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: parentCountry === "United States" || parentCountry === "Canada" ? parentCountry : "",
							autoComplete: "country-name",
							onChange: (e) => set({
								parentCountry: e.target.value,
								parentRegion: ""
							}),
							className: field,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select"
							}), COUNTRIES.map((country) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: country,
								children: country
							}, country))]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium text-ink",
								children: "City"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: parentCity,
								maxLength: 40,
								autoComplete: "address-level2",
								onChange: (e) => set({ parentCity: e.target.value }),
								className: field
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium text-ink",
								children: parentCountry === "Canada" ? "Province" : "State"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: regions.includes(parentRegion) ? parentRegion : "",
								autoComplete: "address-level1",
								onChange: (e) => set({ parentRegion: e.target.value }),
								className: field,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select"
								}), regions.map((region) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: region,
									children: region
								}, region))]
							})]
						})]
					})
				]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-terra",
				children: error
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: "This stays between us."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				className: "mt-6 h-14 w-full",
				disabled: Boolean(error),
				onClick: () => onboarded ? set({ screen: "profile" }) : set({ screen: "who" }),
				children: onboarded ? "Save" : "Next"
			})
		]
	});
}
function Quiz() {
	const quizIndex = useApp((s) => s.quizIndex);
	const tags = useApp((s) => s.tags);
	const onboarded = useApp((s) => s.onboarded);
	const mode = useApp((s) => s.mode);
	const birthday = useApp((s) => s.birthday);
	const set = useApp((s) => s.set);
	const journey = journeyFor(mode, birthday);
	const questions = questionsFor(journey, askStyleFor(mode, useApp((s) => s.children)));
	const question = questions[quizIndex] ?? questions[questions.length - 1];
	const [foodStep, setFoodStep] = (0, import_react.useState)("main");
	const [note, setNote] = (0, import_react.useState)(tags.foodNote);
	(0, import_react.useEffect)(() => {
		setFoodStep("main");
	}, [quizIndex]);
	function finish(next) {
		const settled = journey === "solids" || journey === "toddler" ? {
			...next,
			feeding: "undecided"
		} : next;
		if (quizIndex >= questions.length - 1) {
			const state = useApp.getState();
			const nextChildren = state.children.length ? state.children : draftToChildren(state);
			const activeChildId = nextChildren.some((child) => child.id === state.activeChildId) ? state.activeChildId : nextChildren[0]?.id ?? "";
			const count = state.kidCount || nextChildren.length;
			set({
				tags: {
					...settled,
					experience: count > 1 ? "experienced" : "first"
				},
				children: nextChildren,
				activeChildId,
				screen: "home",
				onboarded: true,
				preview: null,
				quizIndex: 0,
				revisitQuiz: !questions.some((item) => item.key === "style")
			});
			return;
		}
		set({
			tags: settled,
			quizIndex: quizIndex + 1
		});
	}
	function choose(value) {
		if (question.key === "food") {
			if (value === "avoid") {
				set({ tags: {
					...tags,
					food: "avoid",
					foodNote: ""
				} });
				setFoodStep("avoid");
				return;
			}
			if (value === "other") {
				setNote(tags.food === "other" ? tags.foodNote : "");
				set({ tags: {
					...tags,
					food: "other",
					avoid: ""
				} });
				setFoodStep("other");
				return;
			}
			const food = value === "vegetarian" || value === "vegan" || value === "easy" ? value : "easy";
			finish({
				...tags,
				food,
				avoid: "",
				foodNote: ""
			});
			return;
		}
		finish({
			...tags,
			[question.key]: value
		});
	}
	const onFoodFollow = question.key === "food" && foodStep !== "main";
	const wide = question.options.some((option) => option.hint) || question.options.length > 4;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ask, {
		progress: 70 + (quizIndex + 1) / questions.length * 30,
		onBack: () => {
			if (onFoodFollow) {
				setFoodStep("main");
				return;
			}
			if (quizIndex > 0) set({ quizIndex: quizIndex - 1 });
			else set({ screen: onboarded ? "profile" : "setup" });
		},
		section: ABOUT_PARENT,
		title: foodStep === "avoid" ? "Anything we should leave out?" : foodStep === "other" ? "Tell us a little more" : question.prompt,
		sub: question.key === "style" && foodStep === "main" ? "No right answer. Most of us are a mix." : question.key === "gear" && foodStep === "main" ? "Stroller, carrier, the big stuff. Not sports." : void 0,
		children: foodStep === "other" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			value: note,
			maxLength: 80,
			onChange: (e) => setNote(e.target.value),
			placeholder: "A few words",
			className: "h-28 w-full rounded-2xl border border-line bg-paper p-4"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			className: "mt-4 h-14 w-full",
			disabled: !note.trim(),
			onClick: () => finish({
				...tags,
				food: "other",
				avoid: "",
				foodNote: note.trim()
			}),
			children: "Next"
		})] }) : foodStep === "avoid" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3",
			children: AVOID_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => finish({
					...tags,
					food: "avoid",
					avoid: option.value,
					foodNote: ""
				}),
				className: "min-h-16 rounded-2xl border border-line bg-paper text-base",
				children: option.label
			}, option.value))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: clsx("grid gap-3", wide ? "grid-cols-1" : "grid-cols-2"),
			children: question.options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => choose(option.value),
				className: choiceClass(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-base leading-snug",
					children: option.label
				}), option.hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-muted",
					children: option.hint
				}) : null]
			}, option.value))
		})
	});
}
function dress(card, live) {
	if (!live || card.kind !== "product") return card;
	return {
		...card,
		name: live.title,
		image: live.image || card.image,
		price: live.price || void 0,
		liveHref: live.href,
		liveStore: live.store
	};
}
function useLiveCards(cards) {
	const key = cards.map((card) => card.query ?? card.id).join("|");
	const [live, setLive] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		const queries = [...new Set(cards.map((card) => card.query).filter((query) => Boolean(query)))].slice(0, 24);
		if (!queries.length) return;
		let stop = false;
		lookupProducts({ data: { queries } }).then((items) => {
			if (stop) return;
			const next = {};
			for (const item of items) next[item.query] = item;
			setLive(next);
		}).catch(() => void 0);
		return () => {
			stop = true;
		};
	}, [key]);
	return cards.map((card) => card.query && live[card.query] ? dress(card, live[card.query]) : card);
}
function useHome() {
	const children = useApp((s) => s.children);
	const activeChildId = useApp((s) => s.activeChildId);
	const tags = useApp((s) => s.tags);
	const preview = useApp((s) => s.preview);
	const votes = useApp((s) => s.votes);
	const child = children.find((item) => item.id === activeChildId) ?? children[0] ?? null;
	const useStyle = children.some((item) => item.kind === "born");
	return {
		child,
		children,
		view: buildHome({
			child,
			tags,
			preview,
			votes,
			useStyle
		}),
		useStyle
	};
}
function clipGroup(children, active) {
	const group = active?.kind === "pregnant" ? children.filter((child) => child.kind === "pregnant") : children.filter((child) => child.kind === "born");
	const kids = group.length ? group : active ? [active] : [];
	return {
		sex: kids.every((kid) => kid.sex === "girl") ? "girl" : kids.every((kid) => kid.sex === "boy") ? "boy" : "",
		count: Math.min(3, Math.max(1, kids.length))
	};
}
function StageClip({ stageId, sex, count }) {
	const n = count >= 3 ? 3 : count === 2 ? 2 : 1;
	const pregnant = !stageId.startsWith("b");
	const toddler = stageId === "b15";
	let src = "/graphics/preg-early.mp4";
	let poster = "/graphics/preg-early.jpg";
	let label = "A tiny cartoon baby, still small";
	if (pregnant) {
		const late = stageId === "p28" || stageId === "p34" || stageId === "p38";
		const mid = stageId === "p14" || stageId === "p21";
		const name = late ? "preg-late" : mid ? "preg-mid" : "preg-early";
		src = `/graphics/${name}.mp4`;
		poster = `/graphics/${name}.jpg`;
		label = late ? "A cartoon baby with less room, pressing a foot" : mid ? "A cartoon baby giving a kick" : "A very small cartoon baby, still curled up";
	} else {
		const file = `${toddler ? "toddler" : "baby"}${sex === "girl" || sex === "boy" ? `-${sex}` : ""}${n > 1 ? `-${n}` : ""}`;
		src = `/graphics/${file}.mp4`;
		poster = `/graphics/${file}.jpg`;
		label = `A funny cartoon for this stage`;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
		className: "mx-auto mt-6 aspect-square w-56 rounded-3xl object-cover",
		src,
		poster,
		"aria-label": label,
		autoPlay: true,
		muted: true,
		loop: true,
		playsInline: true
	}, src);
}
function NextWeeks() {
	const { view } = useHome();
	const tags = useApp((s) => s.tags);
	const preview = useApp((s) => s.preview);
	const set = useApp((s) => s.set);
	const [open, setOpen] = (0, import_react.useState)(false);
	if ("error" in view) return null;
	const pace = tags.pace;
	const count = pace === "ahead" ? 2 : pace === "figuring" || pace === "flow" && open ? 1 : 0;
	if (pace === "moment" || pace === "either" || pace === "flow" && !open) {
		if (pace !== "flow") return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setOpen(true),
			className: "mt-5 block min-h-11 w-full text-center text-sm font-medium text-terra",
			children: "What’s next"
		});
	}
	const stages = upcomingStages(view.realStageId, count);
	if (!stages.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-center text-sm font-medium text-terra",
			children: pace === "ahead" ? "Coming up" : pace === "figuring" ? "A peek" : "When you want it"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 flex flex-wrap justify-center gap-2",
			children: stages.map((stage) => {
				const on = preview === stage.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": on,
					onClick: () => set({ preview: on ? null : stage.id }),
					className: clsx("shrink-0 rounded-full px-3 py-2 text-sm", on ? "bg-ink text-paper" : "bg-paper text-ink"),
					children: stage.label
				}, stage.id);
			})
		})]
	});
}
function RetakePrompt() {
	const revisitQuiz = useApp((s) => s.revisitQuiz);
	const revisitDismissed = useApp((s) => s.revisitDismissed);
	const set = useApp((s) => s.set);
	const { child } = useHome();
	if (!revisitQuiz || revisitDismissed || !child || child.kind !== "born") return null;
	const days = ageDays(child.birthday);
	if (days === null || days < 60) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-5 rounded-2xl bg-paper px-4 py-3 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed",
				children: "It’s been a couple of months. Want to update how you parent?"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => set({
					screen: "quiz",
					quizIndex: 0
				}),
				className: "mt-2 min-h-11 text-sm font-medium text-terra",
				children: "Update answers"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => set({ revisitDismissed: true }),
				className: "mt-1 block min-h-11 w-full text-sm text-muted",
				children: "Not now"
			})
		]
	});
}
function Band({ tone, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: clsx("-mx-5 px-5 py-6", tone === "paper" ? "bg-paper" : "bg-cream"),
		children
	});
}
function Tile({ image, kicker, title, meta, href, onClick }) {
	const body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block aspect-square overflow-hidden rounded-2xl bg-sand",
			children: image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: image,
				alt: "",
				className: "size-full object-cover"
			}) : null
		}),
		kicker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-2 block text-xs font-medium text-terra",
			children: kicker
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-0.5 block line-clamp-2 text-sm font-medium leading-snug",
			children: title
		}),
		meta ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-0.5 block truncate text-xs text-muted",
			children: meta
		}) : null
	] });
	if (href) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href,
		target: "_blank",
		rel: "noopener noreferrer",
		className: "block",
		children: body
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: "block w-full text-left",
		children: body
	});
}
function Home$1() {
	const { child, children, view } = useHome();
	const tags = useApp((s) => s.tags);
	const set = useApp((s) => s.set);
	const wishlist = useApp((s) => s.wishlist);
	const [showMore, setShowMore] = (0, import_react.useState)(false);
	const monthDay = (/* @__PURE__ */ new Date()).toLocaleDateString(void 0, {
		month: "long",
		day: "numeric"
	});
	const short = tags.help === "shorter" || tags.load === "full";
	const cap = short ? 3 : 5;
	const products = "error" in view ? [] : view.ranked.filter((card) => card.kind === "product");
	const live = useLiveCards(showMore && !short ? products.slice(0, 10) : products.slice(0, cap));
	if ("error" in view) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
		className: "pb-32 pt-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: view.error }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			className: "mt-6",
			onClick: () => set({ screen: "profile" }),
			children: "Profile"
		})]
	});
	const badges = pickBadges(products);
	const art = view.fruit ? fruitArt(view.fruit) : null;
	const clip = clipGroup(children, child);
	const hidden = short ? 0 : Math.max(0, Math.min(10, products.length) - cap);
	const stageLine = view.milestone ?? view.blurb[0];
	const waiting = tags.help === "wait" ? view.ranked.filter((card) => card.kind === "task") : [];
	const shelfTitle = short ? "Short list" : tags.help === "wait" ? "This week" : "For you";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
		className: "pb-32 pt-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hero-wash -mx-5 px-5 pb-8 pt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-12 items-center justify-center rounded-full bg-mist",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-10" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg font-medium",
							children: monthDay
						}),
						tags.pace === "moment" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "size-11",
							"aria-hidden": true
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Open timeline",
							onClick: () => set({ screen: "timeline" }),
							className: "flex size-11 items-center justify-center rounded-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-6" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NextWeeks, {}),
				view.childName && children.length < 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 text-center text-base text-muted",
					children: view.childName
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: clsx("text-center font-sans text-5xl font-semibold leading-none tracking-tight", view.childName && children.length < 2 ? "mt-3" : "mt-8"),
					children: [view.heroKicker, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block text-6xl",
						children: view.heroFigure
					})]
				}),
				view.sub ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-center text-lg",
					children: view.sub
				}) : null,
				view.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-center text-sm leading-relaxed text-muted",
					children: view.note
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageClip, {
					stageId: view.stageId,
					sex: clip.sex,
					count: clip.count
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "mt-6 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-terra",
							children: "This stage"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 text-lg font-semibold leading-snug",
							children: stageLine
						}),
						tags.load === "full" && !view.previewing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "Kept short."
						}) : null,
						view.fruit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center gap-3 text-left",
							children: [art ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: art,
								alt: "",
								className: "size-16 shrink-0 rounded-2xl object-cover"
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm leading-snug",
								children: [
									"About the size of ",
									view.fruit,
									"."
								]
							})]
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RetakePrompt, {}),
				view.previewing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 rounded-2xl bg-paper px-4 py-3 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm leading-relaxed",
						children: [
							"Previewing another stage. Today is still ",
							view.realHeadline,
							"."
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => set({ preview: null }),
						className: "mt-1 min-h-11 text-sm font-medium text-terra",
						children: "Back to today"
					})]
				}) : null
			]
		}), [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Untold, { stageId: view.stageId }, "real"),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold",
					children: shelfTitle
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rail tiles mt-3",
					children: live.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						image: card.image,
						title: card.name,
						meta: card.liveStore ? [card.liveStore, card.price].filter(Boolean).join(" · ") : card.price || badges[card.id],
						onClick: () => set({
							screen: "detail",
							detailId: card.id
						})
					}, card.id))
				}),
				hidden > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setShowMore((open) => !open),
					className: "mt-3 min-h-11 text-sm font-medium text-terra",
					children: showMore ? "Fewer" : `More · ${hidden}`
				}) : null
			] }, "for-you"),
			waiting.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-semibold",
				children: "Later"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2",
				children: waiting.slice(0, 3).map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "border-t border-line",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => set({
							screen: "detail",
							detailId: card.id
						}),
						className: "block min-h-11 w-full py-3 text-left text-sm font-medium",
						children: card.name
					})
				}, card.id))
			})] }, "later") : null,
			view.recipes.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold",
					children: "Eat"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-sm text-muted",
					children: foodCaption(tags, view.stageId)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rail tiles mt-3",
					children: view.recipes.map((recipe) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						image: recipe.image,
						kicker: recipe.slot,
						title: recipe.title,
						meta: recipe.from,
						href: recipe.href
					}, recipe.id))
				})
			] }, "eat") : null,
			view.creators.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-semibold",
				children: "Follow"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-3",
				children: view.creators.slice(0, 3).map((creator) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: creator.href,
					target: "_blank",
					rel: "noopener noreferrer",
					"aria-label": `${creator.name} on Instagram`,
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-12 shrink-0 items-center justify-center rounded-2xl bg-mist text-ink",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, {
							className: "size-5",
							"aria-hidden": true
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-medium",
							children: creator.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "line-clamp-2 block text-sm leading-snug text-muted",
							children: creator.post
						})]
					})]
				}) }, creator.name))
			})] }, "follow") : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => set({ screen: "wishlist" }),
				className: "block min-h-11 text-sm font-medium text-terra",
				children: ["Wishlist", wishlist.length ? ` · ${wishlist.length}` : ""]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => set({ screen: "mom" }),
				className: "block min-h-11 text-sm font-medium text-terra",
				children: "Ask a mom"
			})] }, "more")
		].filter(Boolean).map((block, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Band, {
			tone: index % 2 === 0 ? "paper" : "cream",
			children: block
		}, index))]
	});
}
function Detail() {
	const detailId = useApp((s) => s.detailId);
	const votes = useApp((s) => s.votes);
	const vote = useApp((s) => s.vote);
	const set = useApp((s) => s.set);
	const { view } = useHome();
	const cards = useLiveCards("error" in view ? [] : view.ranked);
	if ("error" in view) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
		className: "pb-16 pt-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => set({
				screen: "home",
				detailId: null
			}),
			className: "min-h-11 text-sm font-medium text-terra",
			children: "Back"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4",
			children: view.error
		})]
	});
	const card = findCard(cards, detailId);
	if (!card) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
		className: "pb-16 pt-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => set({
				screen: "home",
				detailId: null
			}),
			className: "min-h-11 text-sm font-medium text-terra",
			children: "Back"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4",
			children: "That one isn’t in this stage."
		})]
	});
	const badge = pickBadges(view.ranked.filter((item) => item.kind === "product"))[card.id];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
		className: "pb-16 pt-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => set({
				screen: "home",
				detailId: null
			}),
			className: "min-h-11 text-sm font-medium text-terra",
			children: "Back"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
				card,
				badge,
				vote: votes[card.id],
				onOpen: () => void 0,
				onVote: (choice) => vote(card.id, choice, {
					id: card.id,
					name: card.name,
					line: card.line,
					why: card.why,
					tags: card.tags,
					kind: card.kind,
					savedAt: "",
					query: card.query
				})
			})
		})]
	});
}
function Timeline() {
	const { child, view } = useHome();
	const tags = useApp((s) => s.tags);
	const votes = useApp((s) => s.votes);
	const set = useApp((s) => s.set);
	const [open, setOpen] = (0, import_react.useState)({});
	const [soonOpen, setSoonOpen] = (0, import_react.useState)(false);
	if (!child || "error" in view) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
		className: "pb-32 pt-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-5xl leading-none",
			children: "Timeline"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-muted",
			children: "Add a child to see the stages."
		})]
	});
	const index = STAGES.findIndex((stage) => stage.id === view.realStageId);
	const later = index >= 0 ? STAGES.slice(index + 1) : [];
	const soon = tags.pace === "ahead" ? later : tags.pace === "figuring" ? soonOpen ? later : later.slice(0, 1) : tags.pace === "flow" || tags.pace === "either" ? soonOpen ? later.slice(0, 2) : [] : [];
	const groups = [
		{
			title: "Then",
			stages: STAGES.slice(0, Math.max(0, index))
		},
		{
			title: "Now",
			stages: index >= 0 ? [STAGES[index]] : []
		},
		{
			title: "Soon",
			stages: soon
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
		className: "pb-32 pt-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-5xl leading-none",
				children: "Timeline"
			}),
			groups.map((group) => group.stages.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl",
					children: group.title
				}), group.stages.map((stage) => {
					const sex = child.sex === "girl" || child.sex === "boy" ? child.sex : "";
					const products = learnFeed(stage.id, tags, votes, sex).cards.filter((card) => card.kind === "product");
					const shown = open[stage.id] ? products : products.slice(0, 5);
					const blog = STAGE_BLOG[stage.id];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "mt-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl font-semibold",
								children: stage.label
							}),
							stage.milestone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 leading-relaxed",
								children: stage.milestone
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "mt-4 font-medium",
								children: blog.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm leading-relaxed text-muted",
								children: blog.body
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2",
								children: shown.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShelfRow, {
									card,
									onOpen: () => set({
										screen: "detail",
										detailId: card.id,
										preview: stage.id
									})
								}, card.id))
							}),
							products.length > 5 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setOpen((prev) => ({
									...prev,
									[stage.id]: !prev[stage.id]
								})),
								className: "min-h-11 text-sm font-medium text-terra",
								children: open[stage.id] ? "Show less" : "More"
							}) : null
						]
					}, stage.id);
				})]
			}, group.title) : null),
			tags.pace === "moment" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-sm leading-relaxed text-muted",
				children: "You asked to stay in this week. Later stages stay off."
			}) : null,
			later.length && (tags.pace === "flow" || tags.pace === "either") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setSoonOpen((value) => !value),
				className: "mt-6 min-h-11 text-sm font-medium text-terra",
				children: soonOpen ? "Hide what’s next" : "What’s next"
			}) : null,
			later.length > 1 && tags.pace === "figuring" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setSoonOpen((value) => !value),
				className: "mt-6 min-h-11 text-sm font-medium text-terra",
				children: soonOpen ? "Just the next one" : "Show later stages"
			}) : null
		]
	});
}
function Circle() {
	const { view } = useHome();
	const stageId = "error" in view ? "b0" : view.stageId;
	const label = "error" in view ? "This stage" : stageMeta(stageId).label;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
		className: "pb-32 pt-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-5xl leading-none",
			children: "Circle"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleChat, {
				stageId,
				stageLabel: label
			})
		})]
	});
}
function Profile() {
	const children = useApp((s) => s.children);
	const activeChildId = useApp((s) => s.activeChildId);
	const tags = useApp((s) => s.tags);
	const parentName = useApp((s) => s.parentName);
	const parentCity = useApp((s) => s.parentCity);
	const parentRegion = useApp((s) => s.parentRegion);
	const parentCountry = useApp((s) => s.parentCountry);
	const set = useApp((s) => s.set);
	const reset = useApp((s) => s.reset);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	const today = toISODate(/* @__PURE__ */ new Date());
	function saveChild(next) {
		const list = children.some((child) => child.id === next.id) ? children.map((child) => child.id === next.id ? next : child) : [...children, next];
		set({
			children: list,
			activeChildId: next.id,
			preview: null,
			tags: {
				...tags,
				experience: list.length > 1 ? "experienced" : "first"
			}
		});
		setEditing(null);
	}
	function removeChild(id) {
		const list = children.filter((child) => child.id !== id);
		set({
			children: list,
			activeChildId: activeChildId === id ? list[0]?.id ?? "" : activeChildId,
			preview: null,
			tags: {
				...tags,
				experience: list.length > 1 ? "experienced" : "first"
			}
		});
		setEditing(null);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
		className: "pb-32 pt-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-5xl leading-none",
				children: "Profile"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "mt-6 rounded-3xl border border-line bg-paper p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "You"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-2xl",
						children: parentName.trim() || "Your name"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							parentCity,
							parentRegion,
							parentCountry
						].map((part) => part.trim()).filter(Boolean).join(", ") || "City, state, country"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						variant: "line",
						className: "mt-4 w-full",
						onClick: () => set({ screen: "parent" }),
						children: "Edit your details"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-semibold",
						children: "Kids"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 space-y-3",
						children: children.map((child) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
							className: "rounded-3xl border border-line bg-paper p-4",
							children: editing === child.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChildForm, {
								child,
								today,
								canRemove: children.length > 1,
								onCancel: () => setEditing(null),
								onSave: saveChild,
								onRemove: () => removeChild(child.id)
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-2xl",
									children: chipLabel(child)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted",
									children: childStageLine(child)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex gap-2",
									children: [child.id !== activeChildId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
										className: "flex-1",
										onClick: () => set({
											activeChildId: child.id,
											preview: null,
											screen: "home"
										}),
										children: "Use this stage"
									}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
										variant: "line",
										className: "flex-1",
										onClick: () => setEditing(child.id),
										children: "Edit"
									})]
								})
							] })
						}, child.id))
					}),
					editing === "new" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "mt-3 rounded-3xl border border-line bg-paper p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl",
							children: "Another child"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChildForm, {
							child: {
								id: newChildId(),
								name: "",
								kind: "born",
								due: "",
								birthday: "",
								sex: ""
							},
							today,
							canRemove: false,
							onCancel: () => setEditing(null),
							onSave: saveChild,
							onRemove: () => setEditing(null)
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						variant: "line",
						className: "mt-4 w-full",
						onClick: () => setEditing("new"),
						children: "Add a child"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				className: "mt-8 w-full",
				onClick: () => set({
					screen: "quiz",
					quizIndex: 0
				}),
				children: "Change your answers"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				variant: "line",
				className: "mt-3 w-full",
				onClick: () => set({ screen: "wishlist" }),
				children: "Wishlist"
			}),
			confirm ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-3xl border border-line bg-paper p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Clear kids, quiz, and votes on this device?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						variant: "sand",
						onClick: () => setConfirm(false),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						variant: "ink",
						onClick: () => {
							reset();
							setConfirm(false);
						},
						children: "Clear"
					})]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setConfirm(true),
				className: "mt-6 min-h-11 text-sm text-muted",
				children: "Clear this device"
			})
		]
	});
}
function Wishlist() {
	const wishlist = useApp((s) => s.wishlist);
	const set = useApp((s) => s.set);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
		className: "pb-32 pt-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => set({ screen: "home" }),
				className: "min-h-11 text-sm font-medium text-terra",
				children: "Home"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-5xl leading-none",
				children: "Wishlist"
			}),
			wishlist.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-muted",
				children: "Nothing saved yet. Tap “Wish I had this” on a product."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 divide-y divide-line",
				children: wishlist.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "py-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => set({
							screen: "detail",
							detailId: item.id
						}),
						className: "text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: item.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: item.line
						})]
					})
				}, item.id))
			})
		]
	});
}
function ChildForm({ child, today, canRemove, onCancel, onSave, onRemove }) {
	const [draft, setDraft] = (0, import_react.useState)(child);
	let error = "";
	if (!draft.name.trim()) error = "Add their name.";
	else if (!draft.sex) error = "Pick girl, boy, or still a surprise.";
	else if (draft.kind === "pregnant") {
		if (!draft.due) error = "Add the arrival date.";
		else if (!parseDateOnly(draft.due)) error = "That date doesn’t look right.";
	} else if (!draft.birthday) error = "Add the birthday.";
	else if (!parseDateOnly(draft.birthday)) error = "That birthday doesn’t look right.";
	else if (draft.birthday > today) error = "That birthday is still ahead.";
	const field = "mt-2 h-12 w-full rounded-2xl border border-line bg-cream px-4 text-lg font-normal";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm font-medium",
				children: ["Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: draft.name,
					maxLength: 40,
					onChange: (e) => setDraft({
						...draft,
						name: e.target.value
					}),
					className: field
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SexField, {
				label: "Girl or boy?",
				value: draft.sex,
				onChange: (sex) => setDraft({
					...draft,
					sex
				})
			}),
			draft.kind === "pregnant" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm font-medium",
				children: ["Due date", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "date",
					value: draft.due,
					onChange: (e) => setDraft({
						...draft,
						due: e.target.value
					}),
					className: field
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm font-medium",
				children: ["Birthday", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "date",
					value: draft.birthday,
					max: today,
					onChange: (e) => setDraft({
						...draft,
						birthday: e.target.value
					}),
					className: field
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-terra",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					variant: "sand",
					onClick: onCancel,
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					disabled: Boolean(error),
					onClick: () => onSave({
						...draft,
						name: draft.name.trim(),
						due: draft.kind === "pregnant" ? draft.due : "",
						birthday: draft.kind === "born" ? draft.birthday : ""
					}),
					children: "Save"
				})]
			}),
			canRemove ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onRemove,
				className: "min-h-11 text-sm font-medium text-terra",
				children: "Remove this child"
			}) : null
		]
	});
}
function Nav() {
	const screen = useApp((s) => s.screen);
	const set = useApp((s) => s.set);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-x-0 bottom-0 z-40",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "safe-bottom mx-auto w-full max-w-md px-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "mb-3 grid grid-cols-5 rounded-full border border-line bg-paper px-1 py-1",
				children: [
					{
						id: "home",
						label: "Home",
						icon: House
					},
					{
						id: "timeline",
						label: "Timeline",
						icon: CalendarDays
					},
					{
						id: "mom",
						label: "Ask",
						icon: MessageCircle
					},
					{
						id: "circle",
						label: "Circle",
						icon: Users
					},
					{
						id: "profile",
						label: "Profile",
						icon: UserRound
					}
				].map((item) => {
					const on = screen === item.id;
					const Icon = item.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						"aria-current": on ? "page" : void 0,
						onClick: () => set({
							screen: item.id,
							detailId: null
						}),
						className: clsx("flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-full text-xs", on ? "text-terra" : "text-muted"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "size-5",
							"aria-hidden": true
						}), item.label]
					}, item.id);
				})
			})
		})
	});
}
function Home() {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let alive = true;
		const finish = () => {
			if (alive) setReady(true);
		};
		const unsub = useApp.persist.onFinishHydration(finish);
		const pending = useApp.persist.rehydrate();
		if (pending) pending.then(finish, finish);
		if (useApp.persist.hasHydrated()) finish();
		return () => {
			alive = false;
			unsub();
		};
	}, []);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageApp, {});
}
//#endregion
export { Home as component };
