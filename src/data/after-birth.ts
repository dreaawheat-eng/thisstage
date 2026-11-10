import { GUIDES, type Guide } from "@/data/guides";
import type { StageId } from "@/lib/types";

export type DailyNote = {
  id: string;
  line: string;
  urgent?: boolean;
};

/** One short note a day for the person who gave birth. Not a diagnosis. */
export const DAILY_YOU: DailyNote[] = [
  { id: "length", line: "The six-week visit is a checkup, not the finish. Mood is worth watching through the first year." },
  { id: "blues", line: "Tearful in the first two weeks is common. If it does not lift, tell your clinician. Do not wait for that visit." },
  { id: "depression", line: "Depression is not only sadness. Numb, irritable, or not yourself counts. Say it this week." },
  { id: "anxiety", line: "A mind that will not stop, or checking the baby again, is anxiety. People talk about it less than depression." },
  { id: "thoughts", line: "A scary thought that horrifies you is not the same as wanting to act. Still tell someone." },
  { id: "rage", line: "Anger that does not feel like you is one of the quiet parts. Name it if it stays." },
  { id: "birth", line: "If the birth keeps replaying, that can be trauma. You do not have to call it dramatic for it to count." },
  { id: "pmdd", line: "When periods return, a hard week before bleeding can be PMDD. Track two cycles and bring the notes." },
  { id: "thyroid", line: "A thyroid swing after birth can look like anxiety or a low mood. Ask for the blood test." },
  { id: "you", line: "Water, food, and one real conversation. The baby needs you well enough to be here." },
  { id: "psychosis", line: "Confusion, or the world looking wrong, is rare and an emergency. Call 911, or 988 in the US.", urgent: true },
];

const STAGE_GUIDES: Partial<Record<StageId, string[]>> = {
  b0: ["first-weeks-home", "shop-without-a-haul", "for-parents-not-kids"],
  b2: ["first-weeks-home", "for-parents-not-kids", "shop-without-a-haul"],
  b6: ["first-weeks-home", "four-to-nine-months", "shop-without-a-haul"],
  b4m: ["four-to-nine-months", "shop-without-a-haul", "what-this-stage-means"],
  b6m: ["four-to-nine-months", "on-the-move", "shop-without-a-haul"],
  b9: ["on-the-move", "four-to-nine-months", "what-this-stage-means"],
  b15: ["on-the-move", "what-this-stage-means", "shop-without-a-haul"],
};

export function noteForDay(day: number): DailyNote {
  const index = ((day % DAILY_YOU.length) + DAILY_YOU.length) % DAILY_YOU.length;
  return DAILY_YOU[index] ?? DAILY_YOU[0];
}

export function featuredGuides(stageId: StageId, day: number): Guide[] {
  const slugs = STAGE_GUIDES[stageId] ?? ["what-this-stage-means", "how-we-choose"];
  const pool = slugs
    .map((slug) => GUIDES.find((guide) => guide.slug === slug))
    .filter((guide): guide is Guide => Boolean(guide));
  if (pool.length === 0) return [];
  const start = ((day % pool.length) + pool.length) % pool.length;
  return [0, 1].map((step) => pool[(start + step) % pool.length]).filter((guide, index, list) => list.indexOf(guide) === index);
}
