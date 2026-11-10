import type { Child } from "@/lib/children";
import { creatorsFor, stageMeta, type Card, type FeaturedCreator, type Recipe } from "@/data/digest";
import { recipesFor } from "@/data/plates";
import {
  ageDays,
  ageFigure,
  agePhrase,
  babyStageId,
  dueRelative,
  fruitForWeek,
  gestationalWeek,
  phaseOf,
  pregnancyHeadline,
  pregnancyStageId,
} from "@/lib/stage";
import { learnFeed } from "@/lib/learn";
import type { Phase, StageId, Tags, Vote } from "@/lib/types";

export type HomeView = {
  phase: Phase;
  stageId: StageId;
  headline: string;
  sub: string | null;
  note: string | null;
  fruit: string | null;
  milestone: string | null;
  blurb: [string, string];
  previewing: boolean;
  realHeadline: string;
  ranked: Card[];
  creators: FeaturedCreator[];
  recipes: Recipe[];
  childName: string;
  heroKicker: string;
  heroFigure: string;
  learned: string | null;
  realStageId: StageId;
};

export type ViewInput = {
  child: Child | null;
  tags: Tags;
  preview: StageId | null;
  votes?: Record<string, Vote>;
  now?: Date;
  /** False when the style question was never asked, so it must not rank creators. */
  useStyle?: boolean;
};

export function buildHome(input: ViewInput): HomeView | { error: string } {
  const now = input.now ?? new Date();
  const child = input.child;
  if (!child) return { error: "Add a child to see this stage." };

  if (child.kind === "pregnant") {
    const week = gestationalWeek(child.due, now);
    if (week === null) return { error: "Add a due date to see this week." };
    const realId = pregnancyStageId(week);
    const previewOk = input.preview && phaseOf(input.preview) === "pregnancy" ? input.preview : null;
    const stageId = previewOk ?? realId;
    const meta = stageMeta(stageId);
    const fruitWeek = previewOk ? (meta.sampleWeek ?? week) : Math.min(40, Math.max(4, week));
    const learned = learnFeed(stageId, input.tags, input.votes ?? {}, child.sex);
    const realHeadline = pregnancyHeadline(week);
    const useStyle = input.useStyle !== false;
    return {
      phase: "pregnancy",
      stageId,
      headline: previewOk ? meta.label : realHeadline,
      sub: dueRelative(child.due, now),
      note:
        !previewOk && week >= 41
          ? "Many pregnancies pass the due date. This is still general info, not a sign to interpret."
          : !previewOk && week < 4
            ? "Very early. The notes below are the first-trimester set, kept short on purpose."
            : null,
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
      realStageId: realId,
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
    realStageId: realId,
  };
}
