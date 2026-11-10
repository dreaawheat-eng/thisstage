import { Instagram } from "lucide-react";
import { headlinesFor } from "@/data/headlines";
import type { StageId } from "@/lib/types";
import { SectionHead } from "@/components/thisstage/ui";

export function StageHeadlines({ stageId }: { stageId: StageId }) {
  const sets = headlinesFor(stageId);
  if (!sets.length) return null;
  return (
    <div className="space-y-8">
      {sets.map((set) => (
        <section key={set.id}>
          <SectionHead title={set.ask} sub="A few posts for this. Not the whole internet." />
          <ul className="space-y-2">
            {set.posts.map((post) => (
              <li key={post.id}>
                <a
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-line bg-paper px-3 py-3"
                >
                  {post.image ? (
                    <span className="relative size-12 shrink-0">
                      <img src={post.image} alt="" className="size-12 rounded-2xl object-cover" />
                      {post.kind === "Instagram" ? (
                        <span className="absolute -right-1 -bottom-1 flex size-5 items-center justify-center rounded-full bg-paper">
                          <Instagram className="size-3" aria-hidden />
                        </span>
                      ) : null}
                    </span>
                  ) : (
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-mist text-xs font-medium text-ink">
                      {post.kind === "Instagram" ? <Instagram className="size-5" aria-hidden /> : "Read"}
                    </span>
                  )}
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-terra">
                      {post.kind} · {post.source}
                    </span>
                    <span className="mt-0.5 block leading-snug">{post.title}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
