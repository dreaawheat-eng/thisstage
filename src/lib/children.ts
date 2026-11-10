import { ageDays, agePhrase, gestationalWeek, pregnancyHeadline } from "@/lib/stage";
import type { Mode } from "@/lib/types";

export type Sex = "girl" | "boy" | "unknown";

export type Child = {
  id: string;
  name: string;
  kind: "pregnant" | "born";
  due: string;
  birthday: string;
  sex: Sex | "";
};

export type ExtraKid = {
  name: string;
  birthday: string;
  sex: Sex | "";
};

export function normalizeExtraKids(input: unknown): ExtraKid[] {
  if (!Array.isArray(input)) return [];
  return input.slice(0, 2).flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const row = item as Partial<ExtraKid>;
    const sex = row.sex === "girl" || row.sex === "boy" || row.sex === "unknown" ? row.sex : "";
    return [
      {
        name: typeof row.name === "string" ? row.name.slice(0, 40) : "",
        birthday: typeof row.birthday === "string" ? row.birthday : "",
        sex,
      },
    ];
  });
}

export function emptyExtra(): ExtraKid {
  return { name: "", birthday: "", sex: "" };
}

export function extraCount(mode: Mode, kidCount: number): number {
  if (mode === "both") return Math.max(0, kidCount - 2);
  return Math.max(0, kidCount - 1);
}

export function newChildId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function chipLabel(child: Child): string {
  const name = child.name.trim();
  if (name) return name;
  return child.kind === "pregnant" ? "Expected" : "Baby";
}

export function childStageLine(child: Child, now = new Date()): string {
  if (child.kind === "pregnant") {
    const week = gestationalWeek(child.due, now);
    if (week === null) return "Add a due date";
    return pregnancyHeadline(week);
  }
  const days = ageDays(child.birthday, now);
  if (days === null) return "Add a birthday";
  if (days < 0) return "Birthday is still ahead";
  return agePhrase(days);
}

export function draftToChildren(draft: {
  mode: Mode;
  due: string;
  birthday: string;
  babyName: string;
  pregnancySex?: Sex | "";
  bornSex?: Sex | "";
  extraKids?: ExtraKid[];
}): Child[] {
  const kids: Child[] = [];
  const name = draft.babyName.trim();
  const pregnancySex = draft.pregnancySex === "girl" || draft.pregnancySex === "boy" ? draft.pregnancySex : "unknown";
  const bornSex = draft.bornSex === "girl" || draft.bornSex === "boy" ? draft.bornSex : "unknown";
  if (draft.mode !== "baby" && draft.due) {
    kids.push({
      id: newChildId(),
      name: draft.mode === "both" ? "" : name,
      kind: "pregnant",
      due: draft.due,
      birthday: "",
      sex: pregnancySex,
    });
  }
  if (draft.mode !== "pregnant" && draft.birthday) {
    kids.push({
      id: newChildId(),
      name,
      kind: "born",
      due: "",
      birthday: draft.birthday,
      sex: bornSex,
    });
  }
  for (const extra of draft.extraKids ?? []) {
    if (!extra.birthday) continue;
    kids.push({
      id: newChildId(),
      name: extra.name.trim(),
      kind: "born",
      due: "",
      birthday: extra.birthday,
      sex: extra.sex === "girl" || extra.sex === "boy" ? extra.sex : "unknown",
    });
  }
  return kids;
}

export function normalizeChildren(raw: unknown, legacy?: {
  mode?: Mode;
  due?: string;
  birthday?: string;
  babyName?: string;
  activeChildId?: string;
}): { children: Child[]; activeChildId: string } {
  const fromList = Array.isArray(raw)
    ? raw.flatMap((item) => {
        if (!item || typeof item !== "object") return [];
        const row = item as Partial<Child>;
        if (row.kind !== "pregnant" && row.kind !== "born") return [];
        if (typeof row.id !== "string" || !row.id) return [];
        return [
          {
            id: row.id,
            name: typeof row.name === "string" ? row.name.slice(0, 40) : "",
            kind: row.kind,
            due: typeof row.due === "string" ? row.due : "",
            birthday: typeof row.birthday === "string" ? row.birthday : "",
            sex: row.sex === "girl" || row.sex === "boy" || row.sex === "unknown" ? row.sex : "unknown",
          } satisfies Child,
        ];
      })
    : [];
  const children = fromList.length
    ? fromList
    : draftToChildren({
        mode: legacy?.mode ?? "pregnant",
        due: legacy?.due ?? "",
        birthday: legacy?.birthday ?? "",
        babyName: legacy?.babyName ?? "",
        pregnancySex: "unknown",
        bornSex: "unknown",
      });
  const active =
    legacy?.activeChildId && children.some((child) => child.id === legacy.activeChildId)
      ? legacy.activeChildId
      : (children[0]?.id ?? "");
  return { children, activeChildId: active };
}
