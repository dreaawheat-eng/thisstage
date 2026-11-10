import { createFileRoute } from "@tanstack/react-router";
import { CONTACT_EMAIL, SitePage } from "@/components/thisstage/site";

export const Route = createFileRoute("/privacy")({ component: Privacy });

function Privacy() {
  return (
    <SitePage title="Privacy" lede="Draft for October 2026. The parent is the user. A child is not.">
      <p>
        ThisStage is a guide for adults. We do not ask children to make an account, post, or pay. If you type a child’s
        name, birthday, or due date, you are the parent or caregiver entering it so we can pick a stage.
      </p>
      <h2 className="pt-2 font-display text-2xl">What stays on this device</h2>
      <p>
        The quiz, dates, parent name, email, city, votes, and wish list are saved in this browser. Clearing the
        browser data clears them. We do not sell that information.
      </p>
      <h2 className="pt-2 font-display text-2xl">What a shop link does</h2>
      <p>
        Shop now opens Amazon, Target, Walmart, Kohl’s, Macy’s, or Nordstrom in a new tab. Those sites set their own cookies and have their own
        privacy policies. If our affiliate programs are active, the link can tell the store that ThisStage sent you.
      </p>
      <h2 className="pt-2 font-display text-2xl">Circle</h2>
      <p>
        Circle uses the first name from your profile. Questions and replies are saved in this browser. Do not post a
        child’s full name, address, or medical details.
      </p>
      <h2 className="pt-2 font-display text-2xl">Contact</h2>
      <p>
        Questions about this policy:{" "}
        <a className="text-terra underline" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </SitePage>
  );
}
