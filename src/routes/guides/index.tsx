import { Link, createFileRoute } from "@tanstack/react-router";
import { GUIDES } from "@/data/guides";
import { SitePage } from "@/components/thisstage/site";

export const Route = createFileRoute("/guides/")({ component: Guides });

function Guides() {
  return (
    <SitePage title="Guides" lede="Short notes for parents. One stage at a time.">
      <ul className="space-y-5">
        {GUIDES.map((guide) => (
          <li key={guide.slug}>
            <Link to="/guides/$slug" params={{ slug: guide.slug }} className="font-medium text-ink underline">
              {guide.title}
            </Link>
            <p className="mt-1 text-muted">{guide.lede}</p>
          </li>
        ))}
      </ul>
    </SitePage>
  );
}
