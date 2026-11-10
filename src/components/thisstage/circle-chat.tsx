import { useEffect, useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import { SEED_QUESTIONS, feedPhase, type SeedQuestion } from "@/data/circle-feed";
import { DAILY_PROMPTS, HELPFUL_TIPS, UNSOLICITED, tipKind, tipLabel, type TipKind } from "@/data/circle-daily";
import { TOPICS, topicLabel, type TopicId } from "@/lib/circle-topics";
import type { StageId } from "@/lib/types";
import { useApp } from "@/lib/store";
import { Btn, SectionHead } from "@/components/thisstage/ui";
import { clsx } from "clsx";

const BOARD_KEY = "thisstage.circle.board";

type Reply = { id: string; authorName: string; body: string; createdAt: string; mine: boolean };

type Question = {
  id: string;
  authorName: string;
  body: string;
  topic: TopicId;
  createdAt: string;
  likes: number;
  liked: boolean;
  replies: Reply[];
  mine: boolean;
  seeded: boolean;
};

type Extra = { liked?: boolean; replies: Reply[] };

type Note = { id: string; authorName: string; body: string; createdAt: string; kind?: TipKind };

type Board = {
  questions: Question[];
  extras: Record<string, Extra>;
  daily: Record<string, Reply[]>;
  tips: Note[];
  advice: Note[];
};

function emptyBoard(): Board {
  return { questions: [], extras: {}, daily: {}, tips: [], advice: [] };
}

function loadBoard(): Board {
  try {
    const raw = localStorage.getItem(BOARD_KEY);
    if (!raw) return emptyBoard();
    const parsed = JSON.parse(raw) as Partial<Board>;
    return {
      questions: Array.isArray(parsed.questions) ? parsed.questions : [],
      extras: parsed.extras && typeof parsed.extras === "object" ? parsed.extras : {},
      daily: parsed.daily && typeof parsed.daily === "object" ? parsed.daily : {},
      tips: Array.isArray(parsed.tips) ? parsed.tips : [],
      advice: Array.isArray(parsed.advice) ? parsed.advice : [],
    };
  } catch {
    return emptyBoard();
  }
}

function when(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const mins = Math.round((Date.now() - date.getTime()) / 60000);
  if (mins < 60) return `${Math.max(1, mins)}m`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days}d`;
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

function fromSeed(seed: SeedQuestion, extra?: Extra): Question {
  return {
    id: seed.id,
    authorName: seed.authorName,
    body: seed.body,
    topic: seed.topic,
    createdAt: seed.createdAt,
    likes: seed.likes + (extra?.liked ? 1 : 0),
    liked: Boolean(extra?.liked),
    replies: [
      ...seed.replies.map((reply) => ({ ...reply, mine: false })),
      ...(extra?.replies ?? []),
    ],
    mine: false,
    seeded: true,
  };
}

export function CircleChat({ stageId, stageLabel }: { stageId: StageId; stageLabel: string }) {
  const parentName = useApp((s) => s.parentName);
  const first = parentName.trim().split(/\s+/)[0]?.slice(0, 24) || "You";
  const [board, setBoard] = useState<Board>(emptyBoard);
  const [ready, setReady] = useState(false);
  const [filter, setFilter] = useState<TopicId | "all">("all");
  const [topic, setTopic] = useState<TopicId>("recipe");
  const [body, setBody] = useState("");
  const [today, setToday] = useState<number | null>(null);
  const [answer, setAnswer] = useState("");
  const [tip, setTip] = useState("");
  const [advice, setAdvice] = useState("");
  const [allTips, setAllTips] = useState(false);

  useEffect(() => {
    setBoard(loadBoard());
    const date = new Date();
    setToday(Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(BOARD_KEY, JSON.stringify(board));
  }, [board, ready]);

  const phase = feedPhase(stageId);
  const kind = tipKind(phase);
  const promptPool = DAILY_PROMPTS.filter((item) => item.phases.includes(phase));
  const prompt = today == null || promptPool.length === 0 ? null : promptPool[today % promptPool.length];
  const promptKey = prompt && today != null ? `${prompt.id}:${today}` : "";
  const promptAnswers = promptKey ? board.daily[promptKey] ?? [] : [];
  const tipNotes = [
    ...board.tips.filter((item) => allTips || item.kind === kind),
    ...HELPFUL_TIPS.filter((item) => allTips || item.kind === kind),
  ];
  const adviceNotes = [...board.advice, ...UNSOLICITED];
  const seeds = SEED_QUESTIONS.filter((question) => question.phases.includes(phase)).map((question) =>
    fromSeed(question, board.extras[question.id]),
  );
  const askedHere = board.questions.filter((question) => question.id.startsWith(`${stageId}:`));
  const feed = [...askedHere, ...seeds].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  const shown = filter === "all" ? feed : feed.filter((question) => question.topic === filter);

  function addAnswer() {
    const text = answer.trim();
    if (!text || !promptKey) return;
    const reply: Reply = {
      id: crypto.randomUUID(),
      authorName: first,
      body: text.slice(0, 280),
      createdAt: new Date().toISOString(),
      mine: true,
    };
    setBoard((prev) => ({ ...prev, daily: { ...prev.daily, [promptKey]: [...(prev.daily[promptKey] ?? []), reply] } }));
    setAnswer("");
  }

  function addNote(lane: "tips" | "advice", text: string, clear: () => void) {
    const bodyText = text.trim();
    if (!bodyText) return;
    const note: Note = {
      id: crypto.randomUUID(),
      authorName: first,
      body: bodyText.slice(0, 280),
      createdAt: new Date().toISOString(),
      kind,
    };
    setBoard((prev) => ({ ...prev, [lane]: [note, ...prev[lane]] }));
    clear();
  }

  function ask() {
    const text = body.trim();
    if (!text) return;
    const question: Question = {
      id: `${stageId}:${crypto.randomUUID()}`,
      authorName: first,
      body: text.slice(0, 280),
      topic,
      createdAt: new Date().toISOString(),
      likes: 0,
      liked: false,
      replies: [],
      mine: true,
      seeded: false,
    };
    setBoard((prev) => ({ ...prev, questions: [question, ...prev.questions] }));
    setBody("");
  }

  function patch(id: string, next: Question) {
    setBoard((prev) => {
      const own = prev.questions.some((question) => question.id === id);
      if (own) {
        return { ...prev, questions: prev.questions.map((question) => (question.id === id ? next : question)) };
      }
      const seed = SEED_QUESTIONS.find((question) => question.id === id);
      if (!seed) return prev;
      return {
        ...prev,
        extras: {
          ...prev.extras,
          [id]: {
            liked: next.liked,
            replies: next.replies.filter((reply) => reply.mine),
          },
        },
      };
    });
  }

  function remove(id: string) {
    setBoard((prev) => ({ ...prev, questions: prev.questions.filter((question) => question.id !== id) }));
  }

  return (
    <section>
      {prompt ? (
        <section>
          <SectionHead title="Today" sub="One prompt. Answer only if you want to." />
          <article className="rounded-3xl border border-line bg-paper px-4 py-4">
            <p className="text-lg leading-snug">{prompt.text}</p>
            {prompt.sample ? (
              <div className="mt-3">
                <p className="text-sm font-medium">{prompt.sample.authorName}</p>
                <p className="mt-1 leading-relaxed">{prompt.sample.body}</p>
              </div>
            ) : null}
            {promptAnswers.map((item) => (
              <div key={item.id} className="mt-3">
                <p className="text-sm font-medium">{item.authorName}</p>
                <p className="mt-1 leading-relaxed">{item.body}</p>
              </div>
            ))}
            <textarea
              value={answer}
              maxLength={280}
              rows={2}
              placeholder="Your answer, if you want"
              onChange={(e) => setAnswer(e.target.value)}
              className="mt-3 w-full rounded-2xl border border-line bg-cream px-4 py-3 text-base leading-relaxed placeholder:text-muted"
            />
            <Btn variant="line" className="mt-3 w-full" disabled={!answer.trim()} onClick={addAnswer}>
              Add answer
            </Btn>
          </article>
        </section>
      ) : null}

      <section className="mt-8">
        <SectionHead title="Helpful tips" sub={`${tipLabel(kind)} for this stage. Short, and actually useful.`} />
        <div className="space-y-3">
          {tipNotes.map((item) => (
            <article key={item.id} className="rounded-3xl border border-line bg-paper px-4 py-4">
              {item.kind ? <p className="text-sm font-medium text-terra">{tipLabel(item.kind)}</p> : null}
              <p className="mt-1 leading-relaxed">{item.body}</p>
              <p className="mt-2 text-sm text-muted">{item.authorName}</p>
            </article>
          ))}
        </div>
        <textarea
          value={tip}
          maxLength={280}
          rows={2}
          placeholder="Add a tip"
          onChange={(e) => setTip(e.target.value)}
          className="mt-3 w-full rounded-2xl border border-line bg-cream px-4 py-3 text-base leading-relaxed placeholder:text-muted"
        />
        <Btn variant="line" className="mt-3 w-full" disabled={!tip.trim()} onClick={() => addNote("tips", tip, () => setTip(""))}>
          Add tip
        </Btn>
        <button type="button" onClick={() => setAllTips((open) => !open)} className="mt-2 min-h-11 text-sm font-medium text-terra">
          {allTips ? "Just this stage" : "Pregnancy, postpartum, and parenting"}
        </button>
      </section>

      <section className="mt-8">
        <SectionHead title="Unsolicited advice" sub="Nobody asked. Some of it is still right." />
        <div className="space-y-3">
          {adviceNotes.map((item) => (
            <article key={item.id} className="rounded-3xl border border-line bg-paper px-4 py-4">
              <p className="leading-relaxed">{item.body}</p>
              <p className="mt-2 text-sm text-muted">{item.authorName}</p>
            </article>
          ))}
        </div>
        <textarea
          value={advice}
          maxLength={280}
          rows={2}
          placeholder="Add yours"
          onChange={(e) => setAdvice(e.target.value)}
          className="mt-3 w-full rounded-2xl border border-line bg-cream px-4 py-3 text-base leading-relaxed placeholder:text-muted"
        />
        <Btn variant="line" className="mt-3 w-full" disabled={!advice.trim()} onClick={() => addNote("advice", advice, () => setAdvice(""))}>
          Add advice
        </Btn>
      </section>

      <section className="mt-8">
      <SectionHead title="Questions" sub={`${stageLabel}. Ask one, or answer one.`} />

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        <TopicPill on={filter === "all"} label="All" onClick={() => setFilter("all")} />
        {TOPICS.map((item) => (
          <TopicPill key={item.id} on={filter === item.id} label={item.label} onClick={() => setFilter(item.id)} />
        ))}
      </div>

      <div className="mt-4 rounded-3xl border border-line bg-paper p-4">
        <p className="text-sm font-medium">Ask a question</p>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {TOPICS.map((item) => (
            <TopicPill key={item.id} on={topic === item.id} label={item.label} onClick={() => setTopic(item.id)} />
          ))}
        </div>
        <textarea
          value={body}
          maxLength={280}
          rows={3}
          placeholder="What diaper brand do you recommend?"
          onChange={(e) => setBody(e.target.value)}
          className="mt-3 w-full rounded-2xl border border-line bg-cream px-4 py-3 text-base font-normal leading-relaxed placeholder:text-muted"
        />
        <Btn className="mt-3 w-full" disabled={!body.trim()} onClick={ask}>
          Ask
        </Btn>
      </div>

      <div className="mt-4 space-y-3">
        {shown.map((question) => (
          <QuestionCard key={question.id} question={question} name={first} onChange={patch} onRemove={() => remove(question.id)} />
        ))}
      </div>
      </section>
    </section>
  );
}

function TopicPill({ on, label, onClick }: { on: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={clsx(
        "min-h-11 shrink-0 rounded-full px-4 text-sm font-medium",
        on ? "bg-ink text-paper" : "border border-line bg-paper text-ink",
      )}
    >
      {label}
    </button>
  );
}

function QuestionCard({
  question,
  name,
  onChange,
  onRemove,
}: {
  question: Question;
  name: string;
  onChange: (id: string, next: Question) => void;
  onRemove: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [reply, setReply] = useState("");

  function like() {
    const liked = !question.liked;
    onChange(question.id, { ...question, liked, likes: question.likes + (liked ? 1 : -1) });
  }

  function sendReply() {
    const text = reply.trim();
    if (!text) return;
    const next: Reply = {
      id: crypto.randomUUID(),
      authorName: name,
      body: text.slice(0, 200),
      createdAt: new Date().toISOString(),
      mine: true,
    };
    onChange(question.id, { ...question, replies: [...question.replies, next] });
    setReply("");
    setOpen(true);
  }

  function removeReply(id: string) {
    onChange(question.id, { ...question, replies: question.replies.filter((item) => item.id !== id) });
  }

  return (
    <article className="rounded-3xl border border-line bg-paper px-4 py-4">
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-medium">{question.authorName}</p>
        <p className="text-sm text-muted">{when(question.createdAt)}</p>
      </div>
      <p className="mt-2 inline-flex rounded-full bg-clay px-3 py-1 text-sm font-medium text-ink">{topicLabel(question.topic)}</p>
      <p className="mt-3 text-lg leading-snug">{question.body}</p>
      {question.topic === "health" ? <p className="mt-2 text-sm text-muted">Not medical advice.</p> : null}
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          aria-pressed={question.liked}
          onClick={like}
          className={clsx(
            "inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium",
            question.liked ? "bg-clay text-ink" : "bg-sand text-ink",
          )}
        >
          <Heart className="size-4" fill={question.liked ? "currentColor" : "none"} />
          {question.likes}
        </button>
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-sand px-3 text-sm font-medium"
        >
          <MessageCircle className="size-4" />
          {question.replies.length}
        </button>
        {question.mine ? (
          <button type="button" className="min-h-11 px-2 text-sm font-medium text-terra" onClick={onRemove}>
            Remove
          </button>
        ) : null}
      </div>
      {open ? (
        <div className="mt-3 space-y-3 border-t border-line pt-3">
          {question.replies.length === 0 ? <p className="text-sm text-muted">No answers yet.</p> : null}
          {question.replies.map((item) => (
            <div key={item.id}>
              <p className="text-sm font-medium">
                {item.authorName} <span className="font-normal text-muted">{when(item.createdAt)}</span>
              </p>
              <p className="mt-1 leading-relaxed">{item.body}</p>
              {item.mine ? (
                <button type="button" className="mt-1 min-h-11 text-sm font-medium text-terra" onClick={() => removeReply(item.id)}>
                  Remove
                </button>
              ) : null}
            </div>
          ))}
          <textarea
            value={reply}
            maxLength={200}
            rows={2}
            placeholder="Your answer"
            onChange={(e) => setReply(e.target.value)}
            className="w-full rounded-2xl border border-line bg-cream px-4 py-3 text-base leading-relaxed placeholder:text-muted"
          />
          <Btn variant="line" className="w-full" disabled={!reply.trim()} onClick={sendReply}>
            Answer
          </Btn>
        </div>
      ) : null}
    </article>
  );
}
