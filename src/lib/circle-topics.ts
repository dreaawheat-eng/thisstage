export const TOPICS = [
  { id: "recipe", label: "Recipe" },
  { id: "momtip", label: "Tip" },
  { id: "health", label: "Health" },
  { id: "sleep", label: "Sleep" },
  { id: "feeding", label: "Feeding" },
  { id: "gear", label: "Gear" },
  { id: "vent", label: "Vent" },
] as const;

export type TopicId = (typeof TOPICS)[number]["id"];

export function topicLabel(id: string): string {
  return TOPICS.find((topic) => topic.id === id)?.label ?? id;
}

export function isTopic(id: string): id is TopicId {
  return TOPICS.some((topic) => topic.id === id);
}
