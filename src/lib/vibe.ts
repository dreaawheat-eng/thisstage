import type { StageId, Tags } from "@/lib/types";

export function vibeChips(tags: Tags): string[] {
  const chips: string[] = [];
  if (tags.pace === "ahead") chips.push("A step ahead");
  if (tags.materials === "clean") chips.push("Non-toxic");
  else if (tags.materials === "lowtox") chips.push("Low-tox");
  else if (tags.materials === "care") chips.push("Simpler ingredients");
  if (tags.style === "firm") chips.push("Firm and kind");
  else if (tags.style === "childled") chips.push("Child-led");
  else if (tags.style === "routines") chips.push("Routines");
  else if (tags.style === "practical") chips.push("Practical");
  if (tags.food === "vegetarian") chips.push("Vegetarian");
  else if (tags.food === "vegan") chips.push("Vegan");
  else if (tags.food === "avoid" && tags.avoid) chips.push(`No ${tags.avoid}`);
  else if (tags.food === "other" && tags.foodNote) chips.push(tags.foodNote.slice(0, 24));
  if (tags.feeding === "breast") chips.push("Breastfeeding");
  else if (tags.feeding === "formula") chips.push("Formula");
  else if (tags.feeding === "combo") chips.push("Combo feeding");
  if (tags.gear === "minimal") chips.push("Fewer things");
  else if (tags.gear === "few") chips.push("A few things");
  else if (tags.gear === "helpers") chips.push("Helpful gear");
  else if (tags.gear === "secondhand") chips.push("Second-hand");
  if (chips.length < 3 && tags.budget === "budget") chips.push("Stretch the dollar");
  else if (chips.length < 3 && tags.budget === "thrift") chips.push("Used or homemade");
  else if (chips.length < 3 && tags.budget === "splurge") chips.push("Pay for what lasts");
  return chips.slice(0, 3);
}

/** One line for the home shelf. Skips answers they never really made. */
export function shelfLine(tags: Tags, includeStyle: boolean): string {
  const bits: string[] = [];
  if (includeStyle) {
    if (tags.style === "childled") bits.push("following their lead");
    else if (tags.style === "routines") bits.push("a steady rhythm");
    else if (tags.style === "firm") bits.push("warm, with the limit held");
    else if (tags.style === "practical") bits.push("what gets you through today");
  }
  if (tags.materials === "clean") bits.push("non-toxic");
  else if (tags.materials === "lowtox") bits.push("low-tox");
  else if (tags.materials === "care") bits.push("simpler ingredients");
  if (tags.feeding === "breast") bits.push("breastfeeding");
  else if (tags.feeding === "formula") bits.push("formula");
  else if (tags.feeding === "combo") bits.push("combo feeding");
  if (tags.gear === "minimal") bits.push("as few things as possible");
  else if (tags.gear === "few") bits.push("a few good things");
  else if (tags.gear === "helpers") bits.push("gear that makes the day easier");
  else if (tags.gear === "secondhand") bits.push("secondhand when it works");
  if (tags.budget === "budget") bits.push("easier on the budget");
  else if (tags.budget === "thrift") bits.push("used or homemade");
  else if (tags.budget === "splurge") bits.push("paying for what lasts");
  if (tags.sleep === "cosleep") bits.push("sleeping in the room with you");
  else if (tags.sleep === "crib") bits.push("their own sleep space");
  if (!bits.length) return "Matched to what you told us.";
  return `Matched to ${bits.slice(0, 3).join(", ")}.`;
}

export function foodTitle(tags: Tags, stageId: StageId): string {
  if (tags.food === "vegan") return "Vegan today";
  if (tags.food === "vegetarian") return "Vegetarian today";
  if (tags.food === "avoid") {
    if (tags.avoid === "dairy") return "Dairy-free today";
    if (tags.avoid === "gluten") return "Gluten-free today";
    if (tags.avoid === "nuts") return "Nut-free today";
    if (tags.avoid === "eggs") return "Egg-free today";
  }
  if (stageId === "b15" || stageId === "b6m" || stageId === "b9") return "Toddler plates";
  if (!stageId.startsWith("p")) return "One-hand plates";
  return "Recipes today";
}

export function foodCaption(tags: Tags, stageId: StageId): string {
  const diet =
    tags.food === "vegetarian"
      ? "Vegetarian."
      : tags.food === "vegan"
        ? "Plants only."
        : tags.food === "avoid"
          ? tags.avoid
            ? `No ${tags.avoid}.`
            : "Leaves something out."
          : tags.food === "other"
            ? tags.foodNote || "The way you eat."
            : "Easy, with what you already eat.";
  if (stageId.startsWith("p")) return `${diet} A drink, breakfast, a snack, dinner.`;
  if (stageId === "b15") return `${diet} Easy toddler meals.`;
  if (stageId === "b6m" || stageId === "b9") return `${diet} Meals you can share.`;
  return `${diet} One-hand food.`;
}

export function creatorLine(tags: Tags, includeStyle: boolean): string {
  if (!includeStyle) return "Matched to how you want to feed, buy, and rest.";
  if (tags.style === "childled") return "Follow their lead. That’s who we picked.";
  if (tags.style === "routines") return "A steady rhythm. That’s who we picked.";
  if (tags.style === "practical") return "What gets you through the day. That’s who we picked.";
  if (tags.style === "firm") return "Warm, and the limit stays. That’s who we picked.";
  return "Matched to how you parent.";
}

export function sharesVibe(mine: string[], theirs: string[]): boolean {
  if (mine.length === 0 || theirs.length === 0) return false;
  const set = new Set(mine);
  return theirs.some((chip) => set.has(chip));
}
