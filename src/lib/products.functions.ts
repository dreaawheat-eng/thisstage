import { createServerFn } from "@tanstack/react-start";
import { offerFor, type ShopStore } from "@/data/offers";

export type LiveProduct = {
  query: string;
  title: string;
  image: string;
  price: string;
  store: ShopStore;
  href: string;
};

function fromOffer(query: string): LiveProduct | null {
  const offer = offerFor(query);
  if (!offer) return null;
  return {
    query,
    title: offer.title,
    image: offer.image,
    price: offer.price,
    store: offer.store,
    href: offer.href,
  };
}

/** Checked store pages only. Department-store sites block a live scrape, and a loose product search was returning the wrong item. */
export function catalogProduct(query: string): LiveProduct | null {
  return fromOffer(query);
}

export const lookupProducts = createServerFn({ method: "POST" })
  .validator((input: { queries?: string[] }) => {
    const queries = [...new Set((input?.queries ?? []).map((query) => query.trim()).filter(Boolean))].slice(0, 24);
    return { queries };
  })
  .handler(async ({ data }) => {
    const found: LiveProduct[] = [];
    for (const query of data.queries) {
      const hit = fromOffer(query);
      if (hit) found.push(hit);
    }
    return found;
  });
