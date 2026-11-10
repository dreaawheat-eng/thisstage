import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { clsx } from "clsx";
import { UNTOLD } from "@/data/untold";
import type { StageId } from "@/lib/types";
import { SectionHead } from "@/components/thisstage/ui";

export function Untold({ stageId }: { stageId: StageId }) {
  const lines = UNTOLD[stageId];
  const scroller = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
    scroller.current?.scrollTo({ left: 0 });
  }, [stageId]);

  function onScroll() {
    const el = scroller.current;
    if (!el || !el.clientWidth) return;
    const next = Math.round(el.scrollLeft / el.clientWidth);
    const clamped = Math.min(lines.length - 1, Math.max(0, next));
    setIndex((prev) => (prev === clamped ? prev : clamped));
  }

  function go(to: number) {
    const el = scroller.current;
    if (!el) return;
    const next = (to + lines.length) % lines.length;
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    setIndex(next);
  }

  return (
    <section aria-roledescription="carousel" aria-label="What they don’t tell you">
      <SectionHead title="The real part" />
      <div ref={scroller} onScroll={onScroll} className="deck">
        {lines.map((line, i) => (
          <article
            key={`${stageId}-${i}`}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${lines.length}`}
            className="pr-4"
          >
            <p className="text-lg leading-snug">{line}</p>
          </article>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <button type="button" aria-label="Previous" onClick={() => go(index - 1)} className="flex size-11 items-center justify-center rounded-full bg-cream">
          <ChevronLeft className="size-5" />
        </button>
        <div className="flex items-center gap-1">
          {lines.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show note ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => go(i)}
              className="flex size-11 items-center justify-center"
            >
              <span className={clsx("size-2 rounded-full", i === index ? "bg-terra" : "bg-line")} />
            </button>
          ))}
        </div>
        <button type="button" aria-label="Next" onClick={() => go(index + 1)} className="flex size-11 items-center justify-center rounded-full bg-cream">
          <ChevronRight className="size-5" />
        </button>
      </div>
    </section>
  );
}
