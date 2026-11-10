import { useEffect, useRef, useState } from "react";
import { useApp } from "@/lib/store";
import type { AppNote } from "@/lib/types";
import { Btn } from "@/components/thisstage/ui";

const LABELS: Record<string, string> = {
  welcome: "Welcome",
  who: "Who is this for",
  setup: "About your baby",
  parent: "About you",
  home: "Home",
  detail: "Product",
  timeline: "Stages",
  circle: "Circle",
  profile: "Profile",
  wishlist: "Wish list",
  mom: "Meet Sage",
};

function screenKey(screen: string, quizIndex: number) {
  return screen === "quiz" ? `quiz-${quizIndex + 1}` : screen;
}

function screenLabel(key: string) {
  if (key.startsWith("quiz-")) return `Quiz, question ${key.slice(5)}`;
  return LABELS[key] ?? key;
}

function notesText(notes: AppNote[]) {
  const groups = new Map<string, AppNote[]>();
  for (const note of notes) {
    const list = groups.get(note.screen) ?? [];
    list.push(note);
    groups.set(note.screen, list);
  }
  return [...groups.entries()]
    .map(([screen, items]) => [`${screenLabel(screen)}`, ...items.map((item) => `- ${item.text.trim()}`)].join("\n"))
    .join("\n\n");
}

export function Notes() {
  const screen = useApp((s) => s.screen);
  const quizIndex = useApp((s) => s.quizIndex);
  const notes = useApp((s) => s.notes);
  const addNote = useApp((s) => s.addNote);
  const updateNote = useApp((s) => s.updateNote);
  const deleteNote = useApp((s) => s.deleteNote);
  const here = screenKey(screen, quizIndex);
  const pins = notes.filter((note) => note.screen === here);
  const [placing, setPlacing] = useState(false);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<{ id?: string; x: number; y: number; text: string } | null>(null);
  const [copied, setCopied] = useState<"yes" | "no" | null>(null);
  const copyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const area = copyRef.current;
    if (!area || copied === null) return;
    area.focus();
    area.select();
    area.setSelectionRange(0, area.value.length);
  }, [copied, notes]);

  function spot(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.min(92, Math.max(8, ((event.clientX - rect.left) / rect.width) * 100));
    const y = Math.min(98, Math.max(2, ((event.clientY - rect.top) / rect.height) * 100));
    setDraft({ x, y, text: "" });
    setPlacing(false);
    setOpen(false);
  }

  function save() {
    if (!draft) return;
    const text = draft.text.trim();
    if (!text) return;
    if (draft.id) updateNote(draft.id, text);
    else {
      addNote({
        id: `n${Date.now().toString(36)}`,
        screen: here,
        x: draft.x,
        y: draft.y,
        text,
        createdAt: new Date().toISOString(),
      });
    }
    setDraft(null);
  }

  function copyAll() {
    const text = notes.length ? notesText(notes) : "No notes yet.";
    const area = copyRef.current;
    let ok = false;
    if (area) {
      area.focus();
      area.select();
      area.setSelectionRange(0, text.length);
      try {
        ok = document.execCommand("copy");
      } catch {
        ok = false;
      }
    }
    setCopied(ok ? "yes" : "no");
    if (!ok && navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(text).then(
        () => setCopied("yes"),
        () => setCopied("no"),
      );
    }
  }

  return (
    <>
      {placing ? (
        <div
          className="absolute inset-0 z-30 cursor-crosshair bg-ink/10"
          onClick={spot}
          role="presentation"
        />
      ) : null}

      {pins.map((note, index) => (
        <button
          key={note.id}
          type="button"
          onClick={() => {
            setDraft({ id: note.id, x: note.x, y: note.y, text: note.text });
            setPlacing(false);
            setOpen(false);
          }}
          style={{ left: `${note.x}%`, top: `${note.y}%` }}
          className="absolute z-30 flex size-8 -translate-x-1/2 -translate-y-full items-center justify-center rounded-full bg-ink text-sm font-medium text-paper"
          aria-label={`Note ${index + 1}`}
        >
          {index + 1}
        </button>
      ))}

      <div className="fixed right-4 top-4 z-50 flex items-center gap-2">
        {placing ? (
          <button
            type="button"
            onClick={() => setPlacing(false)}
            className="inline-flex min-h-11 items-center rounded-full bg-ink px-4 text-sm font-medium text-paper"
          >
            Done
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setOpen((value) => !value);
              setDraft(null);
            }}
            className="inline-flex min-h-11 items-center rounded-full bg-ink px-4 text-sm font-medium text-paper"
          >
            Notes{notes.length ? ` ${notes.length}` : ""}
          </button>
        )}
      </div>

      {placing ? (
        <p className="fixed inset-x-4 top-16 z-50 rounded-2xl bg-ink px-4 py-3 text-sm text-paper">
          Tap the spot you want to change.
        </p>
      ) : null}

      {open ? (
        <div className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-md px-4 pb-4">
          <div className="max-h-[70dvh] overflow-y-auto rounded-3xl border border-line bg-paper p-4">
            <p className="font-display text-2xl">Notes</p>
            <p className="mt-1 text-sm text-muted">Saved on this device. Select the notes below if Copy doesn’t take.</p>
            <textarea
              ref={copyRef}
              readOnly
              value={notes.length ? notesText(notes) : "No notes yet."}
              rows={6}
              onFocus={(event) => event.currentTarget.select()}
              className="mt-4 w-full rounded-2xl border border-line bg-cream px-4 py-3 text-base leading-relaxed text-ink"
            />
            <Btn variant="line" className="mt-2 w-full" onClick={copyAll}>
              {copied === "yes" ? "Copied" : "Copy all notes"}
            </Btn>
            {copied === "yes" ? <p className="mt-2 text-sm text-muted">Paste them in the chat.</p> : null}
            {copied === "no" ? (
              <p className="mt-2 text-sm text-muted">The preview blocked the copy. Press and hold the notes, then tap Copy.</p>
            ) : null}
            <Btn className="mt-3 w-full" onClick={() => { setPlacing(true); setOpen(false); }}>
              Tap anywhere to add
            </Btn>
            {notes.length === 0 ? (
              <p className="mt-4 text-sm text-muted">None yet.</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {notes.map((note) => (
                  <li key={note.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setDraft({ id: note.id, x: note.x, y: note.y, text: note.text });
                        setOpen(false);
                      }}
                      className="w-full rounded-2xl bg-cream px-3 py-3 text-left"
                    >
                      <span className="block text-sm font-medium text-terra">{screenLabel(note.screen)}</span>
                      <span className="mt-1 block leading-relaxed">{note.text}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : null}

      {draft ? (
        <div className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-md px-4 pb-4">
          <form
            className="rounded-3xl border border-line bg-paper p-4"
            onSubmit={(event) => {
              event.preventDefault();
              save();
            }}
          >
            <p className="text-sm font-medium text-terra">{screenLabel(here)}</p>
            <textarea
              autoFocus
              value={draft.text}
              rows={4}
              maxLength={500}
              placeholder="What should change here?"
              onChange={(event) => setDraft({ ...draft, text: event.target.value })}
              className="mt-3 w-full rounded-2xl border border-line bg-cream px-4 py-3 text-base leading-relaxed text-ink placeholder:text-muted"
            />
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Btn variant="sand" onClick={() => setDraft(null)}>
                Cancel
              </Btn>
              <Btn type="submit" disabled={!draft.text.trim()}>
                Save
              </Btn>
            </div>
            {draft.id ? (
              <button
                type="button"
                onClick={() => {
                  deleteNote(draft.id!);
                  setDraft(null);
                }}
                className="mt-3 min-h-11 w-full text-sm font-medium text-terra"
              >
                Delete note
              </button>
            ) : null}
          </form>
        </div>
      ) : null}
    </>
  );
}
