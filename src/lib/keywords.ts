import type { Card } from "@/data/digest";
import type { Tags } from "@/lib/types";

const PHRASE: Record<string, string> = {
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
  stroller: "baby stroller",
};

function familyId(cardId: string): string {
  const lane = cardId.match(/:(budget|mid|splurge|thrift)_(clean|lowtox|care|works)$/);
  const stem = lane?.index !== undefined ? cardId.slice(0, lane.index) : cardId;
  return stem.split(":")[0] ?? stem;
}

function phrase(id: string, stageId: string, sex: string, tags: Tags): string {
  const born = !stageId.startsWith("p");
  const toddler = stageId === "b15";
  const who = sex === "girl" ? "baby girl" : sex === "boy" ? "baby boy" : "baby";
  if (!born) {
    if (id.startsWith("snack-nausea")) return "bland pregnancy snacks crackers";
    if (id.startsWith("snack")) return "easy pregnancy snacks";
    if (id === "water") return "water bottle straw";
    if (id === "prenatal") return "prenatal vitamin";
    if (id === "bra") return "nursing bra";
    if (id === "pants" || id === "softpants" || id === "joggers") return "maternity pants";
    if (id === "top" || id === "longertee" || id === "lounge") return "maternity clothes";
    if (id === "pillow") return "extra bed pillow";
    if (id === "blanket") return "unisex muslin swaddle";
    if (id === "eyes") return "tula glow eye balm";
    if (id === "cream") return "pregnancy belly butter";
    if (id === "support" || id === "bands") return id === "bands" ? "nausea wristbands" : "maternity belly band";
    if (id === "insoles") return "comfortable walking shoes";
    if (id === "socks") return "comfortable socks";
    if (id === "tote") return "hospital bag tote";
    if (id === "charger") return "phone charger";
    if (id === "peri") return "peri bottle";
    if (id === "pads") return "postpartum pads";
    if (id === "witch") return "witch hazel pads";
  }
  if (id === "eyes") return "tula glow eye balm";
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
  if (["joggers", "tees", "hat", "socks", "shoes", "toddlerShoes"].includes(id) && born) {
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

function modifiers(id: string, tags: Tags): string[] {
  const words: string[] = [];
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

export function profileKeywords(tags: Tags): string[] {
  const words = [
    tags.budget === "budget" ? "budget" : tags.budget === "splurge" ? "best" : tags.budget === "thrift" ? "second hand diy" : "best rated",
    tags.materials === "clean" || tags.materials === "lowtox" ? "non toxic" : tags.materials === "care" ? "fragrance free" : "baby products",
    tags.feeding === "breast" ? "breastfeeding" : tags.feeding === "formula" ? "baby formula" : tags.feeding === "combo" ? "breastfeeding" : "baby feeding",
    tags.gear === "minimal"
      ? "minimalist baby registry"
      : tags.gear === "helpers"
        ? "baby must haves"
        : tags.gear === "secondhand"
          ? "second hand baby"
          : "baby registry essentials",
  ];
  return [...new Set(words)];
}

export function withSearch(card: Card, tags: Tags, stageId: string, sex: string): Card {
  if (card.kind !== "product") return card;
  const id = familyId(card.id);
  const keywords = [...modifiers(id, tags), phrase(id, stageId, sex, tags)];
  return { ...card, keywords, query: keywords.join(" ") };
}
