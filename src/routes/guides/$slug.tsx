import { Link, createFileRoute } from "@tanstack/react-router";
import { guideBySlug } from "@/data/guides";
import { SitePage } from "@/components/thisstage/site";

export const Route = createFileRoute("/guides/$slug")({ component: GuidePage });

function GuidePage() {
  const { slug } = Route.useParams();
  const guide = guideBySlug(slug);
  if (!guide) {
    return (
      <SitePage title="That page is gone">
        <p>
          <Link to="/guides" className="underline">
            Back to the guides
          </Link>
        </p>
      </SitePage>
    );
  }
  return (
    <SitePage title={guide.title} lede={guide.lede}>
      {guide.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <p>
        <Link to="/guides" className="text-sm text-terra underline">
          All guides
        </Link>
      </p>
    </SitePage>
  );
}
