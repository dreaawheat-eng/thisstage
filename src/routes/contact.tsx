import { createFileRoute } from "@tanstack/react-router";
import { CONTACT_EMAIL, SitePage } from "@/components/thisstage/site";

export const Route = createFileRoute("/contact")({ component: Contact });

function Contact() {
  return (
    <SitePage title="Contact" lede="Questions about the guide, your account, or a link that looks wrong.">
      <p>
        Email{" "}
        <a className="text-terra underline" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
        . We read it. We do not use this address for medical advice.
      </p>
      <p>
        ThisStage is for parents in the United States. If you write about a child’s health, contact your own clinician
        first.
      </p>
      <p className="text-sm text-muted">
        Draft address for now. Replace {CONTACT_EMAIL} with an inbox you actually check before you send this site to
        Amazon, Walmart, or Target.
      </p>
    </SitePage>
  );
}
