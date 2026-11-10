import { useEffect, useState } from "react";
import { QUESTIONS, SKIP_VALUE } from "@/data/quiz";
import { Btn, Screen } from "@/components/thisstage/ui";
import { useApp } from "@/lib/store";

type DraftAnswer = { id: string; text: string };
type DraftQuestion = {
  id: string;
  key: string;
  prompt: string;
  answers: DraftAnswer[];
  skip: string;
  notes: string;
};

const STORAGE_KEY = "thisstage.quiz-draft.v1";

function seed(): DraftQuestion[] {
  return QUESTIONS.map((question) => ({
    id: question.key,
    key: question.key,
    prompt: question.prompt,
    answers: question.options.map((option) => ({ id: option.value, text: option.label })),
    skip: labelForSkip(question.key),
    notes: "",
  }));
}

function labelForSkip(key: string): string {
  const value = SKIP_VALUE[key as keyof typeof SKIP_VALUE];
  const question = QUESTIONS.find((item) => item.key === key);
  return question?.options.find((option) => option.value === value)?.label ?? value;
}

function load(): DraftQuestion[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seed();
    const parsed = JSON.parse(raw) as DraftQuestion[];
    if (!Array.isArray(parsed) || parsed.length === 0) return seed();
    const current = parsed.filter((item) => item.key !== "experience");
    return current.length ? current : seed();
  } catch {
    return seed();
  }
}

export function draftToText(questions: DraftQuestion[]): string {
  return questions
    .map((question, index) => {
      const answers = question.answers.map((answer, i) => `Answer ${i + 1}: ${answer.text}`).join("\n");
      return [
        `Question ${index + 1}`,
        `Code key: ${question.key || "new"}`,
        `Question: ${question.prompt}`,
        answers,
        `If they skip: ${question.skip}`,
        `Notes: ${question.notes}`,
      ].join("\n");
    })
    .join("\n\n");
}

function newId(): string {
  return Math.random().toString(36).slice(2, 8);
}

export function QuizDraft() {
  const onboarded = useApp((s) => s.onboarded);
  const setScreen = useApp((s) => s.set);
  const [questions, setQuestions] = useState<DraftQuestion[]>(seed);
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setQuestions(load());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
  }, [questions, ready]);

  function update(id: string, patch: Partial<DraftQuestion>) {
    setCopied(false);
    setQuestions((list) => list.map((question) => (question.id === id ? { ...question, ...patch } : question)));
  }

  function updateAnswer(questionId: string, answerId: string, text: string) {
    setCopied(false);
    setQuestions((list) =>
      list.map((question) =>
        question.id === questionId
          ? {
              ...question,
              answers: question.answers.map((answer) => (answer.id === answerId ? { ...answer, text } : answer)),
            }
          : question,
      ),
    );
  }

  async function copyEdits() {
    const text = draftToText(questions);
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
  }

  function downloadEdits() {
    const blob = new Blob([draftToText(questions)], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ThisStage-quiz-edits.txt";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Screen className="pb-16 pt-6">
      <button
        type="button"
        onClick={() => setScreen({ screen: onboarded ? "home" : "welcome" })}
        className="min-h-11 text-sm font-medium text-terra"
      >
        Back
      </button>
      <h1 className="mt-4 font-display text-4xl text-ink">Edit the quiz</h1>
      <p className="mt-3 leading-relaxed text-muted">
        The Word file only opens as a preview, so change the questions here. These boxes do not change the live quiz
        until you paste them back to me.
      </p>

      <div className="mt-6 space-y-3">
        <Btn className="w-full" onClick={() => void copyEdits()}>
          {copied ? "Copied — paste it in the chat" : "Copy my edits"}
        </Btn>
        <Btn variant="line" className="w-full" onClick={downloadEdits}>
          Download a text file
        </Btn>
      </div>

      <div className="mt-8 space-y-6">
        {questions.map((question, index) => (
          <article key={question.id} className="rounded-3xl border border-line bg-paper p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-terra">Question {index + 1}</p>
              {index >= QUESTIONS.length ? (
                <button
                  type="button"
                  className="min-h-11 text-sm font-medium text-muted"
                  onClick={() => setQuestions((list) => list.filter((item) => item.id !== question.id))}
                >
                  Remove
                </button>
              ) : null}
            </div>
            <label className="mt-3 block text-sm font-medium">
              Question
              <textarea
                value={question.prompt}
                rows={3}
                onChange={(e) => update(question.id, { prompt: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-line bg-cream px-4 py-3 text-base font-normal leading-relaxed"
              />
            </label>
            <div className="mt-4 space-y-3">
              {question.answers.map((answer, answerIndex) => (
                <label key={answer.id} className="block text-sm font-medium">
                  Answer {answerIndex + 1}
                  <input
                    value={answer.text}
                    onChange={(e) => updateAnswer(question.id, answer.id, e.target.value)}
                    className="mt-2 h-12 w-full rounded-2xl border border-line bg-cream px-4 text-base font-normal"
                  />
                </label>
              ))}
            </div>
            <button
              type="button"
              className="mt-3 min-h-11 text-sm font-medium text-terra"
              onClick={() =>
                update(question.id, {
                  answers: [...question.answers, { id: newId(), text: "" }],
                })
              }
            >
              Add an answer
            </button>
            <label className="mt-2 block text-sm font-medium">
              If they skip, treat it as
              <input
                value={question.skip}
                onChange={(e) => update(question.id, { skip: e.target.value })}
                className="mt-2 h-12 w-full rounded-2xl border border-line bg-cream px-4 text-base font-normal"
              />
            </label>
            <label className="mt-4 block text-sm font-medium">
              Notes for me
              <textarea
                value={question.notes}
                rows={2}
                placeholder="Order, tone, or why"
                onChange={(e) => update(question.id, { notes: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-line bg-cream px-4 py-3 text-base font-normal leading-relaxed placeholder:text-muted"
              />
            </label>
          </article>
        ))}
      </div>

      <Btn
        variant="line"
        className="mt-6 w-full"
        onClick={() =>
          setQuestions((list) => [
            ...list,
            {
              id: newId(),
              key: "new",
              prompt: "",
              answers: [
                { id: newId(), text: "" },
                { id: newId(), text: "" },
                { id: newId(), text: "" },
              ],
              skip: "",
              notes: "",
            },
          ])
        }
      >
        Add a question
      </Btn>

      <div className="mt-6 space-y-3">
        <Btn className="w-full" onClick={() => void copyEdits()}>
          {copied ? "Copied — paste it in the chat" : "Copy my edits"}
        </Btn>
        <button
          type="button"
          className="min-h-11 w-full text-sm font-medium text-muted"
          onClick={() => {
            localStorage.removeItem(STORAGE_KEY);
            setQuestions(seed());
            setCopied(false);
          }}
        >
          Reset to the live quiz
        </button>
      </div>
    </Screen>
  );
}
