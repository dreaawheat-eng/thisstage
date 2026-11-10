import { useEffect, useState } from "react";
import { askMom, type MomProduct, type MomReply } from "@/lib/mom.functions";
import { lookupProducts, type LiveProduct } from "@/lib/products.functions";
import { Screen, SectionHead } from "@/components/thisstage/ui";
import { useApp } from "@/lib/store";
import { buildHome } from "@/lib/view";
import type { Card } from "@/data/digest";
import type { Tags } from "@/lib/types";

type Bubble = { role: "user" | "assistant"; text: string; products?: MomProduct[]; video?: MomReply["video"] };

const STARTERS = ["What should I actually buy this week?", "What can wait?", "Is there a short video for this stage?"];

const memory: Bubble[] = [];

function shopStyle(tags: Tags) {
  if (tags.budget === "budget") return "Watches the price.";
  if (tags.budget === "splurge") return "Will pay more if it lasts.";
  if (tags.budget === "thrift") return "Would rather buy used or make it.";
  return "Shops in the middle.";
}

function usePictured(cards: Card[]) {
  const key = cards.map((card) => card.query ?? card.id).join("|");
  const [live, setLive] = useState<Record<string, LiveProduct>>({});
  useEffect(() => {
    const queries = [...new Set(cards.map((card) => card.query).filter((query): query is string => Boolean(query)))].slice(0, 8);
    if (!queries.length) return;
    let stop = false;
    lookupProducts({ data: { queries } })
      .then((items) => {
        if (stop) return;
        const next: Record<string, LiveProduct> = {};
        for (const item of items) next[item.query] = item;
        setLive(next);
      })
      .catch(() => undefined);
    return () => {
      stop = true;
    };
  }, [key]);
  return cards.map((card) => {
    const hit = card.query ? live[card.query] : undefined;
    return {
      name: hit?.title || card.name,
      image: hit?.image || card.image || "",
      query: card.query || card.name,
    };
  });
}

export function Mom() {
  const tags = useApp((s) => s.tags);
  const children = useApp((s) => s.children);
  const activeChildId = useApp((s) => s.activeChildId);
  const preview = useApp((s) => s.preview);
  const votes = useApp((s) => s.votes);
  const [thread, setThread] = useState<Bubble[]>(memory);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const child = children.find((item) => item.id === activeChildId) ?? children[0] ?? null;
  const useStyle = children.some((item) => item.kind === "born");
  const view = buildHome({ child, tags, preview, votes, useStyle });
  const stage = "error" in view ? "This stage" : view.headline;
  const about = "error" in view ? "" : `${view.blurb[0]} ${shopStyle(tags)}`;
  const products = usePictured("error" in view ? [] : view.ranked.filter((card) => card.kind === "product").slice(0, 8));

  function remember(next: Bubble[]) {
    memory.splice(0, memory.length, ...next.slice(-12));
    setThread(memory.slice());
  }

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;
    const next = [...thread, { role: "user" as const, text: question }].slice(-12);
    remember(next);
    setDraft("");
    setError("");
    setBusy(true);
    try {
      const result = await askMom({
        data: {
          messages: next.map((turn) => ({ role: turn.role, text: turn.text })),
          stage,
          about,
          products,
        },
      });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      remember([
        ...next,
        {
          role: "assistant",
          text: result.answer.reply,
          products: result.answer.products,
          video: result.answer.video,
        },
      ]);
    } catch {
      setError("She couldn’t answer just now. Try again in a minute.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Screen className="flex min-h-dvh flex-col pb-28 pt-8">
      <SectionHead as="h1" title="Meet Sage" sub="Your AI mom." />

      <div className="mt-6 flex-1 space-y-4">
        {thread.length === 0 ? (
          <div className="space-y-2">
            {STARTERS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => send(prompt)}
                className="block min-h-11 w-full rounded-2xl border border-line bg-paper px-4 py-3 text-left"
              >
                {prompt}
              </button>
            ))}
          </div>
        ) : (
          thread.map((turn, index) => (
            <article key={`${turn.role}-${index}`} className={turn.role === "user" ? "ml-8" : "mr-4"}>
              <p className={turn.role === "user" ? "rounded-2xl bg-ink px-4 py-3 text-paper" : "leading-relaxed"}>{turn.text}</p>
              {turn.products?.length ? (
                <ul className="mt-3 space-y-2">
                  {turn.products.map((product) => (
                    <li key={product.name}>
                      <a
                        href={product.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-2xl border border-line bg-paper p-2"
                      >
                        {product.image ? <img src={product.image} alt="" className="size-16 shrink-0 rounded-xl object-cover" /> : null}
                        <span className="min-w-0">
                          <span className="line-clamp-2 block font-medium leading-tight">{product.name}</span>
                          <span className="mt-1 block text-sm font-medium text-terra">Shop</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
              {turn.video?.url ? (
                <a href={turn.video.url} target="_blank" rel="noopener noreferrer" className="mt-3 block overflow-hidden rounded-2xl border border-line bg-paper">
                  {turn.video.image ? <img src={turn.video.image} alt="" className="aspect-video w-full object-cover" /> : null}
                  <span className="block px-3 py-3 text-sm font-medium">Watch · {turn.video.title}</span>
                </a>
              ) : null}
            </article>
          ))
        )}
        {busy ? <p className="text-sm text-muted">Thinking it through…</p> : null}
        {error ? <p className="text-sm text-terra">{error}</p> : null}
      </div>

      <form
        className="mt-6 flex gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          void send(draft);
        }}
      >
        <input
          value={draft}
          maxLength={500}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ask Sage about this stage"
          className="h-12 min-w-0 flex-1 rounded-full border border-line bg-paper px-4"
        />
        <button type="submit" disabled={busy || !draft.trim()} className="h-12 shrink-0 rounded-full bg-terra px-4 text-sm font-medium text-paper disabled:opacity-50">
          Send
        </button>
      </form>
      <p className="mt-2 text-center text-sm text-muted">Not a clinician.</p>
    </Screen>
  );
}
