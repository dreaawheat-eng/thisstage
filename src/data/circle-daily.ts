import type { FeedPhase } from "@/data/circle-feed";

export type DailyPrompt = {
  id: string;
  phases: FeedPhase[];
  text: string;
  sample?: { authorName: string; body: string };
};

export type TipKind = "pregnancy" | "postpartum" | "parenting";

export type SeedNote = {
  id: string;
  kind?: TipKind;
  authorName: string;
  body: string;
};

export function tipKind(phase: FeedPhase): TipKind {
  if (phase === "pregnant") return "pregnancy";
  if (phase === "baby") return "postpartum";
  return "parenting";
}

export function tipLabel(kind: TipKind): string {
  if (kind === "pregnancy") return "Pregnancy";
  if (kind === "postpartum") return "Postpartum";
  return "Parenting";
}

export const DAILY_PROMPTS: DailyPrompt[] = [
  { id: "p-eat", phases: ["pregnant"], text: "What did you eat that actually stayed down?", sample: { authorName: "Jordan", body: "Toast and fruit. I stopped trying for a real dinner." } },
  { id: "p-wear", phases: ["pregnant"], text: "What are you wearing now that jeans quit?" },
  { id: "p-wish", phases: ["pregnant"], text: "What do you wish someone had said at this week?" },
  { id: "p-skip", phases: ["pregnant"], text: "What are you skipping on purpose?" },
  { id: "p-visit", phases: ["pregnant"], text: "What question are you saving for your next visit?" },
  { id: "p-hard", phases: ["pregnant"], text: "What part of the day is the hardest right now?" },
  { id: "p-behind", phases: ["pregnant"], text: "What would you tell someone one week behind you?" },
  { id: "b-home", phases: ["baby"], text: "What helped in the first weeks at home?", sample: { authorName: "Nora", body: "A water bottle that lives on the couch." } },
  { id: "b-registry", phases: ["baby"], text: "What did you not need from the registry?" },
  { id: "b-nights", phases: ["baby"], text: "What made nights slightly easier?" },
  { id: "b-visit", phases: ["baby"], text: "What visitor rule actually worked?" },
  { id: "b-figuring", phases: ["baby"], text: "What are you still figuring out?" },
  { id: "b-hospital", phases: ["baby"], text: "What would you tell someone leaving the hospital?" },
  { id: "b-feed", phases: ["baby"], text: "Where do you keep the water, and did that matter?" },
  { id: "t-five", phases: ["toddler"], text: "What works at 5pm that isn’t a speech?", sample: { authorName: "Priya", body: "Snack first. Outside second, even for ten minutes." } },
  { id: "t-dinner", phases: ["toddler"], text: "What dinner gets eaten two nights in a row?" },
  { id: "t-shoes", phases: ["toddler"], text: "What shoes stay on?" },
  { id: "t-phrase", phases: ["toddler"], text: "What phrase do you use when you are out of ideas?" },
  { id: "t-stop", phases: ["toddler"], text: "What did you stop buying?" },
  { id: "t-room", phases: ["toddler"], text: "What is the one room you actually made safe?" },
  { id: "t-melt", phases: ["toddler"], text: "What do you do when the meltdown is already happening?" },
];

export const HELPFUL_TIPS: SeedNote[] = [
  { id: "tip-cracker", kind: "pregnancy", authorName: "Elise", body: "Eat before you feel sick. A cracker in a pocket counts." },
  { id: "tip-pants", kind: "pregnancy", authorName: "Sam", body: "The waistband is the problem. Change the pants, not your day." },
  { id: "tip-water", kind: "postpartum", authorName: "Jordan", body: "Put the water where you sit to feed. You will not get up." },
  { id: "tip-visit", kind: "postpartum", authorName: "Nora", body: "Visitors can bring food or leave. Both is a fine visit." },
  { id: "tip-feeling", kind: "parenting", authorName: "Priya", body: "Name the feeling, then get the snack. The order matters." },
  { id: "tip-room", kind: "parenting", authorName: "Chris", body: "One safe room is enough for today." },
];

export const UNSOLICITED: SeedNote[] = [
  { id: "adv-wipe", authorName: "Malik", body: "You do not need a wipe warmer." },
  { id: "adv-just", authorName: "Avery", body: "If the advice starts with “just,” you can leave it." },
  { id: "adv-cloth", authorName: "Elise", body: "Buy the cheap burp cloths. Buy a lot of them." },
  { id: "adv-sleep", authorName: "Sam", body: "Sleep when the baby sleeps is a rumor. Sit down when the baby sleeps." },
];
