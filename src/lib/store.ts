import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type Child, type ExtraKid, normalizeChildren, normalizeExtraKids } from "@/lib/children";
import { NEUTRAL_TAGS, normalizeTags, type AppNote, type Mode, type Screen, type StageId, type Tags, type Vote, type Wish } from "@/lib/types";

type State = {
  onboarded: boolean;
  mode: Mode;
  due: string;
  birthday: string;
  babyName: string;
  pregnancySex: "" | "girl" | "boy" | "unknown";
  bornSex: "" | "girl" | "boy" | "unknown";
  kidCount: 0 | 1 | 2 | 3;
  extraKids: ExtraKid[];
  parentName: string;
  parentBirthday: string;
  parentEmail: string;
  parentCity: string;
  parentRegion: string;
  parentCountry: string;
  children: Child[];
  activeChildId: string;
  tags: Tags;
  screen: Screen;
  quizIndex: number;
  focus: "pregnancy" | "baby";
  preview: StageId | null;
  votes: Record<string, Vote>;
  wishlist: Wish[];
  notes: AppNote[];
  detailId: string | null;
  revisitQuiz: boolean;
  revisitDismissed: boolean;
  set: (partial: Partial<Omit<State, "set" | "reset" | "addNote" | "updateNote" | "deleteNote">>) => void;
  vote: (id: string, choice: Vote, item?: Wish) => void;
  addNote: (note: AppNote) => void;
  updateNote: (id: string, text: string) => void;
  deleteNote: (id: string) => void;
  reset: () => void;
};

const initial = {
  onboarded: false,
  mode: "pregnant" as Mode,
  due: "",
  birthday: "",
  babyName: "",
  pregnancySex: "" as "" | "girl" | "boy" | "unknown",
  bornSex: "" as "" | "girl" | "boy" | "unknown",
  kidCount: 0 as 0 | 1 | 2 | 3,
  extraKids: [] as ExtraKid[],
  parentName: "",
  parentBirthday: "",
  parentEmail: "",
  parentCity: "",
  parentRegion: "",
  parentCountry: "",
  children: [] as Child[],
  activeChildId: "",
  tags: NEUTRAL_TAGS,
  screen: "welcome" as Screen,
  quizIndex: 0,
  focus: "pregnancy" as const,
  preview: null as StageId | null,
  votes: {} as Record<string, Vote>,
  wishlist: [] as Wish[],
  notes: [] as AppNote[],
  detailId: null as string | null,
  revisitQuiz: false,
  revisitDismissed: false,
};

export const useApp = create<State>()(
  persist(
    (set) => ({
      ...initial,
      set: (partial) => set(partial),
      vote: (id, choice, item) =>
        set((state) => {
          const next = { ...state.votes };
          const removing = next[id] === choice;
          if (removing) delete next[id];
          else next[id] = choice;
          let wishlist = state.wishlist.filter((saved) => saved.id !== id);
          if (!removing && choice === "wish" && item) {
            wishlist = [{ ...item, id, savedAt: new Date().toISOString() }, ...wishlist];
          }
          return { votes: next, wishlist };
        }),
      addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
      updateNote: (id, text) =>
        set((state) => ({
          notes: state.notes.map((note) => (note.id === id ? { ...note, text } : note)),
        })),
      deleteNote: (id) => set((state) => ({ notes: state.notes.filter((note) => note.id !== id) })),
      reset: () =>
        set((state) => ({ ...initial, notes: state.notes, votes: {}, wishlist: [], tags: { ...NEUTRAL_TAGS }, children: [] })),
    }),
    {
      name: "thisstage.v1",
      skipHydration: true,
      merge: (persisted, current) => {
        const saved = (persisted ?? {}) as Partial<State>;
        const normalized = normalizeChildren(saved.children, {
          mode: saved.mode,
          due: saved.due,
          birthday: saved.birthday,
          babyName: saved.babyName,
          activeChildId: saved.activeChildId,
        });
        const sex = (value: unknown) => (value === "girl" || value === "boy" || value === "unknown" ? value : "");
        return {
          ...current,
          ...saved,
          pregnancySex: sex(saved.pregnancySex),
          bornSex: sex(saved.bornSex),
          kidCount: saved.kidCount === 1 || saved.kidCount === 2 || saved.kidCount === 3 ? saved.kidCount : 0,
          extraKids: normalizeExtraKids(saved.extraKids),
          parentName: saved.parentName ?? "",
          parentBirthday: saved.parentBirthday ?? "",
          parentEmail: saved.parentEmail ?? "",
          parentCity: saved.parentCity ?? "",
          parentRegion: saved.parentRegion ?? "",
          parentCountry: saved.parentCountry ?? "",
          tags: normalizeTags(saved.tags),
          votes: saved.votes ?? {},
          wishlist: normalizeWishlist(saved.wishlist),
          notes: normalizeNotes(saved.notes),
          children: normalized.children,
          activeChildId: normalized.activeChildId,
          revisitQuiz: typeof saved.revisitQuiz === "boolean" ? saved.revisitQuiz : saved.mode === "pregnant" && saved.onboarded === true,
          revisitDismissed: saved.revisitDismissed === true,
        };
      },
      partialize: (state) => ({
        onboarded: state.onboarded,
        mode: state.mode,
        due: state.due,
        birthday: state.birthday,
        babyName: state.babyName,
        pregnancySex: state.pregnancySex,
        bornSex: state.bornSex,
        kidCount: state.kidCount,
        extraKids: state.extraKids,
        parentName: state.parentName,
        parentBirthday: state.parentBirthday,
        parentEmail: state.parentEmail,
        parentCity: state.parentCity,
        parentRegion: state.parentRegion,
        parentCountry: state.parentCountry,
        children: state.children,
        activeChildId: state.activeChildId,
        tags: state.tags,
        screen: state.screen,
        quizIndex: state.quizIndex,
        focus: state.focus,
        preview: state.preview,
        votes: state.votes,
        wishlist: state.wishlist,
        notes: state.notes,
        detailId: state.detailId,
        revisitQuiz: state.revisitQuiz,
        revisitDismissed: state.revisitDismissed,
      }),
    },
  ),
);

function normalizeWishlist(input: unknown): Wish[] {
  if (!Array.isArray(input)) return [];
  const wishes: Wish[] = [];
  for (const item of input) {
    if (!item || typeof item !== "object") continue;
    const row = item as Partial<Wish>;
    if (typeof row.id !== "string" || typeof row.name !== "string") continue;
    if (row.kind !== "product" && row.kind !== "task") continue;
    const tags = Array.isArray(row.tags) ? row.tags : [];
    wishes.push({
      id: row.id,
      name: row.name,
      line: typeof row.line === "string" ? row.line : "",
      why: typeof row.why === "string" ? row.why : "",
      tags: [String(tags[0] ?? ""), String(tags[1] ?? ""), String(tags[2] ?? "")],
      kind: row.kind,
      savedAt: typeof row.savedAt === "string" ? row.savedAt : "",
      query: typeof row.query === "string" ? row.query : undefined,
    });
  }
  return wishes;
}

function normalizeNotes(input: unknown): AppNote[] {
  if (!Array.isArray(input)) return [];
  const notes: AppNote[] = [];
  for (const item of input) {
    if (!item || typeof item !== "object") continue;
    const row = item as Partial<AppNote>;
    if (typeof row.id !== "string" || typeof row.screen !== "string" || typeof row.text !== "string") continue;
    notes.push({
      id: row.id,
      screen: row.screen,
      x: typeof row.x === "number" ? row.x : 50,
      y: typeof row.y === "number" ? row.y : 20,
      text: row.text,
      createdAt: typeof row.createdAt === "string" ? row.createdAt : "",
    });
  }
  return notes;
}
