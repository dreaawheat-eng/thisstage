import { cardsFor, type Card } from "@/data/digest";
import { withSearch } from "@/lib/keywords";
import type { Mat, StageId, Tags, Vote } from "@/lib/types";

const MATS: Mat[] = ["clean", "lowtox", "care", "works"];

function productKey(id: string): string {
  const lane = id.match(/:(budget|mid|splurge|thrift)_(clean|lowtox|care|works)$/);
  if (!lane || lane.index === undefined) return id.split(":")[0] ?? id;
  return id.slice(0, lane.index);
}

function laneFailed(votes: Record<string, Vote>, lane: string): boolean {
  let skips = 0;
  let likes = 0;
  for (const [id, vote] of Object.entries(votes)) {
    if (!id.endsWith(lane)) continue;
    if (vote === "skip") skips += 1;
    else likes += 1;
  }
  return skips >= 2 && likes === 0;
}

function stepTags(tags: Tags): Tags | null {
  const materials = MATS.indexOf(tags.materials);
  if (materials >= 0 && materials < MATS.length - 1) {
    return { ...tags, materials: MATS[materials + 1] ?? tags.materials };
  }
  if (tags.budget === "thrift") return { ...tags, budget: "budget" };
  if (tags.budget === "budget") return { ...tags, budget: "mid" };
  if (tags.budget === "mid") return { ...tags, budget: "splurge" };
  return null;
}

function learnedTags(tags: Tags, votes: Record<string, Vote>): { tags: Tags; shifted: boolean } {
  let next = tags;
  let shifted = false;
  for (let step = 0; step < 3; step += 1) {
    if (!laneFailed(votes, `${next.budget}_${next.materials}`)) break;
    const stepped = stepTags(next);
    if (!stepped) break;
    next = stepped;
    shifted = true;
  }
  return { tags: next, shifted };
}

function rankWithVotes(cards: Card[], votes: Record<string, Vote>): Card[] {
  const used = new Set<string>();
  const skip = new Set<string>();
  const wish = new Set<string>();
  for (const [id, vote] of Object.entries(votes)) {
    if (vote === "used") used.add(productKey(id));
    else if (vote === "skip") skip.add(id);
    else wish.add(id);
  }
  const kept = cards.filter((card) => !used.has(productKey(card.id)) && !skip.has(card.id));
  const visible = kept.length ? kept : cards.filter((card) => !skip.has(card.id));
  const list = visible.length ? visible : cards;
  return [...list]
    .sort((a, b) => Number(wish.has(b.id)) - Number(wish.has(a.id)))
    .map((card) => (wish.has(card.id) ? { ...card, why: `You wished for this. ${card.why}` } : card));
}

export function learnFeed(
  stageId: StageId,
  tags: Tags,
  votes: Record<string, Vote>,
  sex = "",
): { cards: Card[]; note: string | null } {
  const learned = learnedTags(tags, votes);
  const cards = rankWithVotes(cardsFor(stageId, learned.tags), votes).map((card) =>
    withSearch(card, learned.tags, stageId, sex),
  );
  const voted = Object.keys(votes).length > 0;
  if (!voted) return { cards, note: null };
  if (learned.shifted) {
    return { cards, note: "Wished items stay first. Enough skips moved this set a step looser." };
  }
  return { cards, note: "Wished items stay first. Used and skipped items come off the list." };
}
