import type { TopicId } from "@/lib/circle-topics";
import type { StageId } from "@/lib/types";

export type FeedPhase = "pregnant" | "baby" | "toddler";

export type SeedReply = {
  id: string;
  authorName: string;
  body: string;
  createdAt: string;
};

export type SeedQuestion = {
  id: string;
  phases: FeedPhase[];
  topic: TopicId;
  authorName: string;
  body: string;
  createdAt: string;
  likes: number;
  replies: SeedReply[];
};

export function feedPhase(stageId: StageId): FeedPhase {
  if (stageId.startsWith("p")) return "pregnant";
  if (stageId === "b15") return "toddler";
  return "baby";
}

export const SEED_QUESTIONS: SeedQuestion[] = [
  {
    id: "q-dinner-nausea",
    phases: ["pregnant"],
    topic: "recipe",
    authorName: "Elise",
    body: "What’s a dinner that still sounds good when nothing sounds good?",
    createdAt: "2026-11-02T18:10:00.000Z",
    likes: 12,
    replies: [
      {
        id: "q-dinner-nausea-1",
        authorName: "Jordan",
        body: "Toast, eggs, and fruit. I stopped aiming for a real dinner.",
        createdAt: "2026-11-02T19:40:00.000Z",
      },
    ],
  },
  {
    id: "q-jeans",
    phases: ["pregnant"],
    topic: "gear",
    authorName: "Sam",
    body: "Jeans quit this week. What did you actually wear out of the house?",
    createdAt: "2026-11-01T15:20:00.000Z",
    likes: 9,
    replies: [
      {
        id: "q-jeans-1",
        authorName: "Priya",
        body: "The same black pants with a panel. Dresses after that.",
        createdAt: "2026-11-01T16:05:00.000Z",
      },
    ],
  },
  {
    id: "q-pillow",
    phases: ["pregnant"],
    topic: "sleep",
    authorName: "Priya",
    body: "Side sleeping already. Was a body pillow worth it?",
    createdAt: "2026-10-31T11:00:00.000Z",
    likes: 7,
    replies: [],
  },
  {
    id: "q-prenatal",
    phases: ["pregnant"],
    topic: "health",
    authorName: "Avery",
    body: "Which prenatal did you finish, not just buy?",
    createdAt: "2026-10-30T20:15:00.000Z",
    likes: 15,
    replies: [
      {
        id: "q-prenatal-1",
        authorName: "Nora",
        body: "The one with no smell. I left the gummies. Ask your own clinician before you switch.",
        createdAt: "2026-10-30T21:02:00.000Z",
      },
    ],
  },
  {
    id: "q-diaper",
    phases: ["pregnant", "baby", "toddler"],
    topic: "gear",
    authorName: "Nora",
    body: "What diaper brand do you recommend?",
    createdAt: "2026-11-02T14:00:00.000Z",
    likes: 21,
    replies: [
      {
        id: "q-diaper-1",
        authorName: "Chris",
        body: "Store brand after the newborn size. The leak was the same.",
        createdAt: "2026-11-02T15:12:00.000Z",
      },
      {
        id: "q-diaper-2",
        authorName: "Malik",
        body: "Fragrance-free mattered more than the name on the box.",
        createdAt: "2026-11-02T17:44:00.000Z",
      },
    ],
  },
  {
    id: "q-lowtox",
    phases: ["pregnant", "baby", "toddler"],
    topic: "recipe",
    authorName: "Jordan",
    body: "What’s a low-tox dinner the baby can share?",
    createdAt: "2026-11-01T18:30:00.000Z",
    likes: 18,
    replies: [
      {
        id: "q-lowtox-1",
        authorName: "Elise",
        body: "Potatoes, chickpeas, olive oil, salt. Baby gets the plain pieces.",
        createdAt: "2026-11-01T19:10:00.000Z",
      },
    ],
  },
  {
    id: "q-nights",
    phases: ["baby"],
    topic: "feeding",
    authorName: "Sam",
    body: "Nights got long. What made the feeding part easier?",
    createdAt: "2026-10-31T09:40:00.000Z",
    likes: 11,
    replies: [],
  },
  {
    id: "q-sound",
    phases: ["baby"],
    topic: "sleep",
    authorName: "Avery",
    body: "Did a sound machine help the baby, or was it for you?",
    createdAt: "2026-10-29T22:05:00.000Z",
    likes: 8,
    replies: [
      {
        id: "q-sound-1",
        authorName: "Chris",
        body: "It covered the hallway. I don’t think the baby cared.",
        createdAt: "2026-10-30T01:15:00.000Z",
      },
    ],
  },
  {
    id: "q-toddler-dinner",
    phases: ["toddler"],
    topic: "recipe",
    authorName: "Chris",
    body: "What’s a dinner a toddler will eat two nights in a row?",
    createdAt: "2026-11-02T17:00:00.000Z",
    likes: 14,
    replies: [
      {
        id: "q-toddler-dinner-1",
        authorName: "Nora",
        body: "Rice, beans, and avocado. Breakfast food also counts.",
        createdAt: "2026-11-02T18:20:00.000Z",
      },
    ],
  },
  {
    id: "q-shoes",
    phases: ["toddler"],
    topic: "gear",
    authorName: "Nora",
    body: "Shoes that stay on. What worked?",
    createdAt: "2026-11-01T13:25:00.000Z",
    likes: 6,
    replies: [],
  },
  {
    id: "q-meltdown",
    phases: ["toddler"],
    topic: "vent",
    authorName: "Malik",
    body: "The 5pm meltdown. What do you do that isn’t a speech?",
    createdAt: "2026-10-30T17:10:00.000Z",
    likes: 19,
    replies: [
      {
        id: "q-meltdown-1",
        authorName: "Priya",
        body: "Snack first. Then outside, even for ten minutes.",
        createdAt: "2026-10-30T17:40:00.000Z",
      },
    ],
  },
];
