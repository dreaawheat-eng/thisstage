import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/thisstage/site";

export const Route = createFileRoute("/disclosure")({ component: Disclosure });

function Disclosure() {
  return (
    <SitePage title="Affiliate disclosure" lede="Some links may pay us. The short list is still a short list.">
      <p>
        ThisStage is a participant in affiliate programs, including Amazon Associates and the partner programs for
        Target and Walmart, when those applications are approved. As an Amazon Associate we earn from qualifying
        purchases. Kohl’s, Macy’s, and Nordstrom links are just the store. We do not earn from those unless we add a program later.
      </p>
      <p>
        Shop at Amazon is the main button. Target, Walmart, Kohl’s, Macy’s, and Nordstrom stay one tap away.
        If you buy through one of those links, we may earn a commission at no extra cost to you. We do not mark a product
        as better because it pays more. Prices and stock are the store’s, and they change.
      </p>
      <p>ThisStage is not affiliated with, endorsed by, or made by Amazon, Walmart, Target, Kohl’s, Macy’s, or Nordstrom.</p>
    </SitePage>
  );
}
