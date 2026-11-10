export type Mode = "pregnant" | "baby" | "both";

export type Band = "budget" | "mid" | "splurge" | "thrift";
export type Mat = "clean" | "lowtox" | "care" | "works";
export type Feed = "breast" | "formula" | "combo" | "undecided";
export type Food = "easy" | "vegetarian" | "vegan" | "avoid" | "other";
export type AvoidFood = "dairy" | "gluten" | "nuts" | "eggs";
export type Gear = "minimal" | "few" | "helpers" | "secondhand" | "either";
export type SleepPlan = "crib" | "cosleep" | "unsure" | "either";
export type Experience = "first" | "experienced" | "alongside" | "unspecified";
export type Style = "firm" | "childled" | "routines" | "practical";
export type Pace = "moment" | "ahead" | "flow" | "figuring" | "either";
export type Load = "ready" | "mixed" | "full" | "either";
export type Help = "shorter" | "wait" | "fine" | "either";

export type Tags = {
  budget: Band;
  materials: Mat;
  feeding: Feed;
  food: Food;
  avoid: AvoidFood | "";
  foodNote: string;
  gear: Gear;
  sleep: SleepPlan;
  experience: Experience;
  style: Style;
  pace: Pace;
  load: Load;
  help: Help;
};

export type Vote = "used" | "skip" | "wish";

export type Wish = {
  id: string;
  name: string;
  line: string;
  why: string;
  tags: [string, string, string];
  kind: "product" | "task";
  savedAt: string;
  query?: string;
};

export type AppNote = {
  id: string;
  screen: string;
  x: number;
  y: number;
  text: string;
  createdAt: string;
};

export type Screen =
  | "welcome"
  | "who"
  | "setup"
  | "parent"
  | "quiz"
  | "home"
  | "detail"
  | "timeline"
  | "circle"
  | "mom"
  | "profile"
  | "wishlist"
  | "quizdraft";

export type StageId =
  | "p4"
  | "p9"
  | "p14"
  | "p21"
  | "p28"
  | "p34"
  | "p38"
  | "b0"
  | "b2"
  | "b6"
  | "b4m"
  | "b6m"
  | "b9"
  | "b15";

export const NEUTRAL_TAGS: Tags = {
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
  help: "either",
};

const FOODS: Food[] = ["easy", "vegetarian", "vegan", "avoid", "other"];
const AVOIDS: AvoidFood[] = ["dairy", "gluten", "nuts", "eggs"];
const MATS: Mat[] = ["clean", "lowtox", "care", "works"];
const GEARS: Gear[] = ["minimal", "few", "helpers", "secondhand", "either"];
const SLEEPS: SleepPlan[] = ["crib", "cosleep", "unsure", "either"];
const EXPS: Experience[] = ["first", "experienced", "alongside", "unspecified"];
const STYLES: Style[] = ["firm", "childled", "routines", "practical"];
const PACES: Pace[] = ["moment", "ahead", "flow", "figuring", "either"];
const LOADS: Load[] = ["ready", "mixed", "full", "either"];
const HELPS: Help[] = ["shorter", "wait", "fine", "either"];
const BANDS: Band[] = ["budget", "mid", "splurge", "thrift"];
const FEEDS: Feed[] = ["breast", "formula", "combo", "undecided"];

export function normalizeTags(input: Partial<Tags> | undefined): Tags {
  const raw = (input ?? {}) as Partial<Tags> & { food?: string };
  const legacy: Record<string, Food> = {
    default: "easy",
    plant: "vegetarian",
    allergen: "avoid",
  };
  const food = FOODS.includes(raw.food as Food)
    ? (raw.food as Food)
    : (legacy[raw.food ?? ""] ?? "easy");
  const avoid = food === "avoid" && AVOIDS.includes(raw.avoid as AvoidFood) ? (raw.avoid as AvoidFood) : "";
  const foodNote =
    food === "other" && typeof raw.foodNote === "string" ? raw.foodNote.trim().slice(0, 80) : "";
  return {
    ...NEUTRAL_TAGS,
    budget: BANDS.includes(raw.budget as Band) ? (raw.budget as Band) : NEUTRAL_TAGS.budget,
    materials: MATS.includes(raw.materials as Mat) ? (raw.materials as Mat) : NEUTRAL_TAGS.materials,
    feeding: FEEDS.includes(raw.feeding as Feed) ? (raw.feeding as Feed) : NEUTRAL_TAGS.feeding,
    gear: GEARS.includes(raw.gear as Gear) ? (raw.gear as Gear) : NEUTRAL_TAGS.gear,
    sleep: SLEEPS.includes(raw.sleep as SleepPlan) ? (raw.sleep as SleepPlan) : NEUTRAL_TAGS.sleep,
    experience: EXPS.includes(raw.experience as Experience) ? (raw.experience as Experience) : NEUTRAL_TAGS.experience,
    style: STYLES.includes(raw.style as Style) ? (raw.style as Style) : NEUTRAL_TAGS.style,
    pace: PACES.includes(raw.pace as Pace) ? (raw.pace as Pace) : NEUTRAL_TAGS.pace,
    load: LOADS.includes(raw.load as Load) ? (raw.load as Load) : NEUTRAL_TAGS.load,
    help: HELPS.includes(raw.help as Help) ? (raw.help as Help) : NEUTRAL_TAGS.help,
    food,
    avoid,
    foodNote,
  };
}

export type Phase = "pregnancy" | "baby";
