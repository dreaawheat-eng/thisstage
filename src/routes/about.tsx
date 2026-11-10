import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/thisstage/site";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  return (
    <SitePage
      title="About"
      lede="The anti-overwhelm guide for pregnancy and baby. Matched to how you parent."
    >
      <p>
        ThisStage is a short guide for parents, from pregnancy through the early years. Your stage, filtered. It is not a
        registry, a medical record, or an app for children to use.
      </p>
      <p>
        You tell us who the guide is for, a due date or a birthday, and a few choices about how you shop and parent. We
        use that to show a smaller set of things for this week. You can keep more than one child and switch.
      </p>
      <p>
        Shop links may go to Amazon, Target, Walmart, Kohl’s, Macy’s, or Nordstrom. If we are approved for an affiliate program, a purchase can earn
        ThisStage a commission. That never changes the medical line at the bottom of the app: this is general
        information. Ask your own clinician.
      </p>
      <p>ThisStage is an independent product. It is not made by Amazon, Walmart, Target, Kohl’s, Macy’s, or Nordstrom.</p>
    </SitePage>
  );
}
