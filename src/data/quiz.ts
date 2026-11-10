import type { Mode } from "@/lib/types";
import { ageDays } from "@/lib/stage";

export type QuizKey = "pace" | "load" | "help" | "style" | "budget" | "materials" | "feeding" | "sleep" | "food" | "gear";

export type Question = {
  key: QuizKey;
  prompt: string;
  options: { value: string; label: string; hint?: string }[];
};

export type Journey = "expecting" | "newborn" | "solids" | "toddler";

/** Pregnant, or pregnant plus a child already here, stays on the plan. Baby-is-here follows age. */
export function journeyFor(mode: Mode, birthday: string): Journey {
  if (mode !== "baby") return "expecting";
  const days = birthday ? ageDays(birthday) : null;
  if (days === null || days < 160) return "newborn";
  if (days < 410) return "solids";
  return "toddler";
}

export const QUESTIONS: Question[] = [
  {
    key: "pace",
    prompt: "Do you like a heads-up, or is this week enough?",
    options: [
      { value: "moment", label: "This week is plenty", hint: "Don’t show me the next thing yet." },
      { value: "ahead", label: "I like a heads-up", hint: "Tell me what’s coming." },
      { value: "flow", label: "I’ll look when I need it", hint: "Keep it tucked away." },
      { value: "figuring", label: "Still figuring that out", hint: "A little peek is fine." },
    ],
  },
  {
    key: "load",
    prompt: "How are you feeling about this stage?",
    options: [
      { value: "ready", label: "Pretty good. I’ve got this." },
      { value: "mixed", label: "Depends on the day" },
      { value: "full", label: "Honestly, it’s a lot" },
    ],
  },
  {
    key: "help",
    prompt: "When it feels like too much, what actually helps?",
    options: [
      { value: "shorter", label: "A shorter list" },
      { value: "wait", label: "Tell me what can wait" },
      { value: "fine", label: "I’m good. Show me the useful stuff." },
    ],
  },
  {
    key: "style",
    prompt: "When you’re with them, you tend to…",
    options: [
      { value: "firm", label: "Be warm, and still hold the line", hint: "You explain it, and the limit stays." },
      { value: "childled", label: "Follow their lead", hint: "Their cues matter more than the clock." },
      { value: "routines", label: "Keep the same rhythm", hint: "Same order, most days. It helps." },
      { value: "practical", label: "Do what gets you through the day", hint: "No philosophy required." },
    ],
  },
  {
    key: "budget",
    prompt: "When you buy for the baby, what do you usually do?",
    options: [
      { value: "budget", label: "Stretch the dollar" },
      { value: "mid", label: "Land somewhere in the middle" },
      { value: "splurge", label: "Spend more if it’ll last" },
      { value: "thrift", label: "Buy it used, or make it", hint: "Thrift it when you can. Make it when that’s easier." },
    ],
  },
  {
    key: "materials",
    prompt: "How much do you think about ingredients?",
    options: [
      { value: "clean", label: "I want it clean" },
      { value: "lowtox", label: "Low-tox when I can" },
      { value: "care", label: "I care, but I’m not strict" },
      { value: "works", label: "I mostly want what works" },
    ],
  },
  {
    key: "feeding",
    prompt: "How are you hoping to feed?",
    options: [
      { value: "breast", label: "Breastfeeding" },
      { value: "formula", label: "Formula" },
      { value: "combo", label: "A little of both" },
      { value: "undecided", label: "I haven’t decided" },
    ],
  },
  {
    key: "sleep",
    prompt: "Where do you picture them sleeping?",
    options: [
      { value: "crib", label: "In a crib or bassinet" },
      { value: "cosleep", label: "In the room with us" },
      { value: "unsure", label: "I haven’t decided" },
    ],
  },
  {
    key: "food",
    prompt: "What should dinner look like at your house?",
    options: [
      { value: "easy", label: "Easy. Whatever we already eat.", hint: "One pan is a win." },
      { value: "vegetarian", label: "Vegetarian", hint: "No meat. Eggs and dairy are fine." },
      { value: "vegan", label: "Vegan", hint: "Plants only." },
      { value: "avoid", label: "Leave something out", hint: "Dairy, gluten, nuts, or eggs." },
      { value: "other", label: "Something else", hint: "Tell us in a few words." },
    ],
  },
  {
    key: "gear",
    prompt: "How do you feel about baby gear?",
    options: [
      { value: "minimal", label: "As few as possible" },
      { value: "few", label: "A few good things" },
      { value: "helpers", label: "Whatever makes the day easier" },
      { value: "secondhand", label: "Secondhand is great" },
    ],
  },
];

const FEEDING_NOW: Question = {
  key: "feeding",
  prompt: "How’s feeding going?",
  options: [
    { value: "breast", label: "Breastfeeding" },
    { value: "formula", label: "Formula" },
    { value: "combo", label: "A little of both" },
    { value: "undecided", label: "It changes" },
  ],
};

const SLEEP_NOW: Question = {
  key: "sleep",
  prompt: "Where are they sleeping these days?",
  options: [
    { value: "crib", label: "In a crib or bassinet" },
    { value: "cosleep", label: "In the room with us" },
    { value: "unsure", label: "It depends on the night" },
  ],
};

const SLEEP_CRIB: Question = {
  key: "sleep",
  prompt: "Where are they sleeping these days?",
  options: [
    { value: "crib", label: "In a crib" },
    { value: "cosleep", label: "In the room with us" },
    { value: "unsure", label: "It depends on the night" },
  ],
};

const SLEEP_OLDER: Question = {
  key: "sleep",
  prompt: "Where do they sleep most nights?",
  options: [
    { value: "crib", label: "In their own bed" },
    { value: "cosleep", label: "In the room with us" },
    { value: "unsure", label: "It depends on the night" },
  ],
};

/** Style only makes sense once a child is here. Pregnancy-only skips it. */
export function askStyleFor(mode: Mode, children: { kind: string }[]): boolean {
  if (mode !== "pregnant") return true;
  return children.some((child) => child.kind === "born");
}

export function questionsFor(journey: Journey, askStyle = true): Question[] {
  return QUESTIONS.flatMap((question) => {
    if (question.key === "style" && !askStyle) return [];
    if (journey === "expecting") return [question];
    if (question.key === "budget") return [{ ...question, prompt: "When you buy for them, what do you usually do?" }];
    if (question.key === "gear") return [{ ...question, prompt: "How do you feel about the gear?" }];
    if (question.key === "feeding") return journey === "newborn" ? [FEEDING_NOW] : [];
    if (question.key === "sleep") {
      if (journey === "toddler") return [SLEEP_OLDER];
      if (journey === "solids") return [SLEEP_CRIB];
      return [SLEEP_NOW];
    }
    return [question];
  });
}

export const AVOID_OPTIONS: { value: "dairy" | "gluten" | "nuts" | "eggs"; label: string }[] = [
  { value: "dairy", label: "Dairy" },
  { value: "gluten", label: "Gluten" },
  { value: "nuts", label: "Nuts" },
  { value: "eggs", label: "Eggs" },
];

export const SKIP_VALUE: Record<QuizKey, string> = {
  pace: "figuring",
  load: "mixed",
  help: "shorter",
  style: "firm",
  budget: "mid",
  materials: "works",
  feeding: "undecided",
  sleep: "unsure",
  food: "easy",
  gear: "few",
};