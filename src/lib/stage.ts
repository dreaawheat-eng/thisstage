import type { Phase, StageId } from "@/lib/types";

export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function parseDateOnly(iso: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;
  const y = Number(match[1]);
  const m = Number(match[2]);
  const d = Number(match[3]);
  const date = new Date(y, m - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null;
  return date;
}

export function calendarDaysBetween(later: Date, earlier: Date): number {
  const a = Date.UTC(later.getFullYear(), later.getMonth(), later.getDate());
  const b = Date.UTC(earlier.getFullYear(), earlier.getMonth(), earlier.getDate());
  return Math.round((a - b) / 86_400_000);
}

/** Completed weeks from a due date. Due date itself is week 40. */
export function gestationalWeek(dueISO: string, now = new Date()): number | null {
  const due = parseDateOnly(dueISO);
  if (!due) return null;
  const daysUntil = calendarDaysBetween(due, now);
  const daysAlong = 280 - daysUntil;
  return Math.floor(daysAlong / 7);
}

export function ageDays(birthdayISO: string, now = new Date()): number | null {
  const born = parseDateOnly(birthdayISO);
  if (!born) return null;
  return calendarDaysBetween(now, born);
}

const FRUIT: Record<number, string> = {
  4: "a poppy seed",
  5: "a sesame seed",
  6: "a lentil",
  7: "a blueberry",
  8: "a raspberry",
  9: "a cherry",
  10: "a kumquat",
  11: "a fig",
  12: "a lime",
  13: "a lemon",
  14: "a peach",
  15: "an apple",
  16: "an avocado",
  17: "a pear",
  18: "a bell pepper",
  19: "a mango",
  20: "a banana",
  21: "a carrot",
  22: "a spaghetti squash",
  23: "a grapefruit",
  24: "an ear of corn",
  25: "a cauliflower",
  26: "a head of lettuce",
  27: "a cabbage",
  28: "an eggplant",
  29: "a butternut squash",
  30: "a coconut",
  31: "a coconut",
  32: "a jicama",
  33: "a pineapple",
  34: "a cantaloupe",
  35: "a honeydew",
  36: "a head of romaine",
  37: "a bunch of swiss chard",
  38: "a leek",
  39: "a mini watermelon",
  40: "a small pumpkin",
};

export function fruitForWeek(week: number): string {
  if (week <= 4) return FRUIT[4];
  if (week >= 40) return FRUIT[40];
  return FRUIT[week] ?? FRUIT[20];
}

export function pregnancyStageId(week: number): StageId {
  if (week <= 8) return "p4";
  if (week <= 13) return "p9";
  if (week <= 20) return "p14";
  if (week <= 27) return "p21";
  if (week <= 33) return "p28";
  if (week <= 37) return "p34";
  return "p38";
}

export function babyStageId(days: number): StageId {
  if (days < 11) return "b0";
  if (days < 36) return "b2";
  if (days < 85) return "b6";
  if (days < 160) return "b4m";
  if (days < 245) return "b6m";
  if (days < 410) return "b9";
  return "b15";
}

export function pregnancyHeadline(week: number): string {
  if (week < 4) return "Earlier than week 4";
  if (week > 42) return "Past week 42";
  return `You’re in week ${week}`;
}

export function ageFigure(days: number): { kicker: string; figure: string } {
  if (days <= 0) return { kicker: "Born", figure: "today" };
  if (days === 1) return { kicker: "Age", figure: "1 day" };
  if (days < 14) return { kicker: "Age", figure: `${days} days` };
  if (days < 60) {
    const weeks = Math.max(1, Math.floor(days / 7));
    return { kicker: "Age", figure: `${weeks} ${weeks === 1 ? "week" : "weeks"}` };
  }
  const months = Math.max(1, Math.floor(days / 30.4375));
  if (months < 24) return { kicker: "Age", figure: `${months} ${months === 1 ? "month" : "months"}` };
  const years = Math.floor(months / 12);
  return { kicker: "Age", figure: `${years} ${years === 1 ? "year" : "years"}` };
}

export function agePhrase(days: number, name?: string): string {
  const who = name?.trim() || "Your baby";
  if (days <= 0) return name?.trim() ? `${name.trim()} was born today` : "Born today";
  if (days === 1) return `${who} is 1 day old`;
  if (days < 14) return `${who} is ${days} days old`;
  if (days < 60) {
    const w = Math.max(1, Math.floor(days / 7));
    return `${who} is ${w} ${w === 1 ? "week" : "weeks"} old`;
  }
  const months = Math.floor(days / 30.4375);
  if (months < 24) {
    const m = Math.max(1, months);
    return `${who} is ${m} ${m === 1 ? "month" : "months"} old`;
  }
  const years = Math.floor(months / 12);
  return `${who} is ${years} ${years === 1 ? "year" : "years"} old`;
}

export function dueRelative(dueISO: string, now = new Date()): string | null {
  const due = parseDateOnly(dueISO);
  if (!due) return null;
  const days = calendarDaysBetween(due, now);
  if (days === 0) return "Due date is today";
  if (days > 0) {
    const weeks = Math.round(days / 7);
    if (weeks <= 1) return days === 1 ? "1 day to go" : `${days} days to go`;
    return `About ${weeks} weeks to go`;
  }
  const past = Math.abs(days);
  if (past === 1) return "1 day past the due date";
  if (past < 14) return `${past} days past the due date`;
  return "Well past the due date on file";
}

export function phaseOf(id: StageId): Phase {
  return id.startsWith("p") ? "pregnancy" : "baby";
}

export function addDaysISO(iso: string, days: number): string {
  const d = parseDateOnly(iso);
  if (!d) return iso;
  d.setDate(d.getDate() + days);
  return toISODate(d);
}
