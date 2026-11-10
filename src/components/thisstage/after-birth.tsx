import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { featuredGuides, noteForDay } from "@/data/after-birth";
import type { StageId } from "@/lib/types";
import { SectionHead } from "@/components/thisstage/ui";

export function AfterBirth({ stageId }: { stageId: StageId }) {
  const [day, setDay] = useState(0);

  useEffect(() => {
    const date = new Date();
    setDay(Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000));
  }, []);

  const note = noteForDay(day);
  const guides = featuredGuides(stageId, day);

  return (
    <div>
      <SectionHead title="For you" sub="One note today. It changes tomorrow. Not a diagnosis." />
      <article className="rounded-3xl border border-line bg-cream px-4 py-4">
        <p className="leading-relaxed">{note.line}</p>
        {note.urgent ? <p className="mt-2 text-sm font-medium text-terra">Emergency. Call 911, or 988.</p> : null}
      </article>
      {guides.length ? (
        <div className="mt-4">
          <p className="text-sm font-medium text-terra">Featured</p>
          <ul className="mt-2 space-y-2">
            {guides.map((guide) => (
              <li key={guide.slug}>
                <Link
                  to="/guides/$slug"
                  params={{ slug: guide.slug }}
                  className="block rounded-2xl border border-line bg-paper px-4 py-3"
                >
                  <span className="block font-medium leading-snug">{guide.title}</span>
                  <span className="mt-1 block text-sm leading-snug text-muted">{guide.lede}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <p className="mt-3 text-sm leading-relaxed text-muted">In a crisis, call 911 or 988.</p>
    </div>
  );
}
