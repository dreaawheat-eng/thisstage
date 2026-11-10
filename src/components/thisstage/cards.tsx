import { useState } from "react";
import { seedVotes, type Card } from "@/data/digest";
import type { ShopStore } from "@/data/offers";
import type { Vote } from "@/lib/types";
import { Btn } from "@/components/thisstage/ui";
import { amazonSearch } from "@/lib/shops";
import { clsx } from "clsx";

export function pickBadges(cards: Card[]): Record<string, string> {
  const products = cards.filter((card) => card.kind === "product");
  const scored = products.map((card) => ({ id: card.id, ...seedVotes(card.id) }));
  const byUsed = [...scored].sort((a, b) => b.used - a.used);
  const byWish = [...scored].sort((a, b) => b.wish - a.wish);
  const badges: Record<string, string> = {};
  if (byUsed[0]) badges[byUsed[0].id] = "Most Loved";
  if (byUsed[1] && !badges[byUsed[1].id]) badges[byUsed[1].id] = "Best Seller";
  if (byWish[0] && !badges[byWish[0].id]) badges[byWish[0].id] = "Most Wished";
  const favorite = byUsed.find((card) => !badges[card.id] && card.used > card.skip * 3);
  if (favorite) badges[favorite.id] = "Parent Favorite";
  return badges;
}

function Badge({ label }: { label?: string }) {
  if (!label) return null;
  return <span className="inline-flex rounded-full bg-clay px-2.5 py-1 text-xs font-medium text-ink">{label}</span>;
}

const VOTE_LABEL: Record<Vote, string> = {
  used: "Used it",
  skip: "Skip",
  wish: "Wish I had this",
};

export function ShelfRow({ card, badge, onOpen }: { card: Card; badge?: string; onOpen: () => void }) {
  const amazon = amazonFor(card);
  return (
    <article className="flex items-center gap-3 border-t border-line py-4">
      <button type="button" onClick={onOpen} className="flex min-w-0 flex-1 gap-3 text-left">
        {card.image ? <img src={card.image} alt="" className="size-16 shrink-0 rounded-2xl object-cover" /> : null}
        <div className="min-w-0">
          {badge ? <Badge label={badge} /> : null}
          <h3 className={clsx("line-clamp-2 font-medium leading-tight", badge && "mt-1")}>{card.name}</h3>
          {card.price ? <p className="mt-1 text-sm font-medium text-terra">{card.price}</p> : null}
          <p className="mt-1 line-clamp-2 text-sm leading-snug text-muted">{card.line}</p>
        </div>
      </button>
      {amazon ? (
        <a href={amazon.href} target="_blank" rel="noopener noreferrer" className="shrink-0 text-sm font-medium text-terra">
          Amazon
        </a>
      ) : null}
    </article>
  );
}

export function FeaturedProduct({ card, badge, onOpen }: { card: Card; badge?: string; onOpen: () => void }) {
  const shop = shopFor(card);
  const amazon = amazonFor(card);
  return (
    <article className="mt-5 overflow-hidden rounded-3xl bg-cream">
      <button type="button" onClick={onOpen} className="block w-full text-left">
        {card.image ? <img src={card.image} alt="" className="aspect-[4/3] w-full object-cover" /> : null}
        <div className="px-4 pt-4">
          <Badge label={badge} />
          <h3 className="mt-2 line-clamp-3 text-2xl font-semibold leading-tight text-ink">{card.name}</h3>
          {card.price ? <p className="mt-1 text-sm font-medium text-terra">{card.price}</p> : null}
          <p className="mt-2 leading-relaxed text-muted">{card.line}</p>
        </div>
      </button>
      {amazon ? (
        <a
          href={amazon.href}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(
            "mx-4 mt-3 inline-flex min-h-11 items-center text-base font-medium text-terra underline",
            shop && shop.href !== amazon.href ? "mb-1" : "mb-4",
          )}
        >
          Shop at Amazon
        </a>
      ) : null}
      {shop && amazon && shop.href !== amazon.href ? (
        <a href={shop.href} target="_blank" rel="noopener noreferrer" className="mx-4 mb-4 inline-flex min-h-11 items-center text-sm font-medium text-muted">
          See it at {shop.store}
        </a>
      ) : null}
    </article>
  );
}

export function EssentialCard({
  title,
  card,
  vote,
  onVote,
}: {
  title: string;
  card: Card;
  vote?: Vote;
  onVote: (choice: Vote) => void;
}) {
  const shop = shopFor(card);
  const amazon = amazonFor(card);
  return (
    <article className="border-t border-line py-4">
      <p className="text-sm font-medium text-terra">{title}</p>
      <div className="mt-2 flex gap-3">
        {card.image ? <img src={card.image} alt="" className="size-14 shrink-0 rounded-xl object-cover" /> : null}
        <div className="min-w-0">
          <h3 className="font-medium leading-tight text-ink">{card.name}</h3>
          {card.price ? <p className="mt-1 text-sm font-medium text-terra">{card.price}</p> : null}
          <p className="mt-1 text-sm leading-snug text-muted">{card.line}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {amazon ? (
          <a
            href={amazon.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-full bg-terra px-4 text-sm font-medium text-paper"
          >
            Shop at Amazon
          </a>
        ) : null}
        {shop && amazon && shop.href !== amazon.href ? (
          <a href={shop.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm font-medium text-terra">
            {shop.store}
          </a>
        ) : null}
        {(["used", "skip", "wish"] as const).map((choice) => (
          <button
            key={choice}
            type="button"
            aria-pressed={vote === choice}
            onClick={() => onVote(choice)}
            className={clsx(
              "min-h-11 rounded-full px-3 text-sm",
              vote === choice ? "bg-ink text-paper" : "bg-sand text-ink",
            )}
          >
            {VOTE_LABEL[choice]}
          </button>
        ))}
      </div>
    </article>
  );
}

export function ProductCard({
  card,
  vote,
  onVote,
  onOpen,
  rank,
  badge,
}: {
  card: Card;
  vote?: Vote;
  onVote: (choice: Vote) => void;
  onOpen: () => void;
  rank?: number;
  badge?: string;
}) {
  const [steps, setSteps] = useState(false);
  const counts = displayCounts(card.id, vote);
  const shop = shopFor(card);
  const amazon = amazonFor(card);

  return (
    <article className="rounded-3xl border border-line bg-paper p-4">
      <button type="button" onClick={onOpen} className="w-full text-left">
        {card.image ? <img src={card.image} alt="" className="mb-3 aspect-square w-full rounded-2xl object-cover" /> : null}
        {badge ? <Badge label={badge} /> : rank ? <p className="text-sm font-medium text-terra">{rank}</p> : null}
        {card.kind === "task" ? (
          <p className="text-sm font-medium text-terra">A task, not a purchase</p>
        ) : null}
        <h3 className="mt-1 line-clamp-3 font-display text-2xl leading-tight text-ink">{card.name}</h3>
        {card.price ? <p className="mt-1 text-sm font-medium text-terra">{card.price}</p> : null}
        {card.liveStore ? (
          <p className="mt-1 text-xs text-muted">{card.price ? `At ${card.liveStore}. Price can change.` : `At ${card.liveStore}.`}</p>
        ) : null}
        <p className="mt-2 leading-relaxed text-ink">{card.line}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {(card.keywords ?? card.tags).map((tag) => (
            <li key={tag} className="rounded-full bg-clay px-3 py-1 text-sm text-ink">
              {tag}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          <span className="font-medium text-ink">Why you: </span>
          {card.why}
        </p>
      </button>

      {card.sensitive ? (
        <p className="mt-3 text-sm leading-relaxed text-muted">Not a medical recommendation.</p>
      ) : null}

      {card.kind === "task" ? (
        <Btn variant="line" className="mt-4 w-full" onClick={() => setSteps((v) => !v)}>
          {steps ? "Hide steps" : "Show steps"}
        </Btn>
      ) : amazon ? (
        <a
          href={amazon.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex min-h-12 w-full items-center justify-center rounded-full bg-terra px-5 text-base font-medium text-paper"
        >
          Shop at Amazon
        </a>
      ) : null}
      {card.kind === "product" && shop && amazon && shop.href !== amazon.href ? (
        <a href={shop.href} target="_blank" rel="noopener noreferrer" className="mt-2 flex min-h-11 w-full items-center justify-center text-sm font-medium text-terra">
          See it at {shop.store}
        </a>
      ) : null}
      {card.kind === "product" ? <StoreRow card={card} skip={[amazon?.href, shop?.href].filter((href): href is string => Boolean(href))} /> : null}

      {steps && card.steps ? (
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-ink">
          {card.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      ) : null}

      <div className="mt-3 grid grid-cols-3 gap-2">
        {(["used", "skip", "wish"] as const).map((choice) => (
          <button
            key={choice}
            type="button"
            aria-pressed={vote === choice}
            onClick={() => onVote(choice)}
            className={clsx(
              "flex min-h-12 items-center justify-center rounded-full px-1 text-center text-sm font-medium leading-tight",
              vote === choice ? "bg-ink text-paper" : "bg-sand text-ink",
            )}
          >
            {VOTE_LABEL[choice]}
          </button>
        ))}
      </div>
      <p className="mt-2 text-sm tabular-nums text-muted">
        {counts.used} used · {counts.skip} skipped · {counts.wish} wish they’d had it
      </p>
    </article>
  );
}

export function amazonFor(card: Card): { store: "Amazon"; href: string } | null {
  if (card.kind !== "product") return null;
  if (card.liveStore === "Amazon" && card.liveHref) return { store: "Amazon", href: card.liveHref };
  return { store: "Amazon", href: amazonSearch(card.query || card.name) };
}

export function shopFor(card: Card): { store: ShopStore; href: string } | null {
  if (card.kind !== "product") return null;
  if (card.liveHref) return { store: card.liveStore ?? "Amazon", href: card.liveHref };
  return amazonFor(card);
}

export function storeLinks(card: Card): { store: ShopStore; href: string }[] {
  if (card.kind !== "product") return [];
  const q = encodeURIComponent(card.query || card.name);
  const links: { store: ShopStore; href: string }[] = [
    { store: "Amazon", href: amazonSearch(card.query || card.name) },
    { store: "Target", href: `https://www.target.com/s?searchTerm=${q}` },
    { store: "Walmart", href: `https://www.walmart.com/search?q=${q}` },
    { store: "Kohl's", href: `https://www.kohls.com/search.jsp?submit-search=web-regular&search=${q}` },
    { store: "Macy's", href: `https://www.macys.com/shop/search?keyword=${q}` },
    { store: "Nordstrom", href: `https://www.nordstrom.com/sr?origin=keywordsearch&keyword=${q}` },
  ];
  if (card.liveHref && card.liveStore) {
    return [{ store: card.liveStore, href: card.liveHref }, ...links.filter((link) => link.store !== card.liveStore)];
  }
  return links;
}

function StoreRow({ card, skip }: { card: Card; skip?: string[] }) {
  const hidden = new Set(skip ?? []);
  const links = storeLinks(card).filter((link) => !hidden.has(link.href));
  if (!links.length) return null;
  return (
    <div className="mt-3">
      <p className="text-xs text-muted">Also at</p>
      <div className="mt-1 flex flex-wrap gap-x-3">
        {links.map((link) => (
          <a key={link.store} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm font-medium text-terra">
            {link.store}
          </a>
        ))}
      </div>
    </div>
  );
}

export function displayCounts(id: string, vote?: Vote) {
  const seed = seedVotes(id);
  return {
    used: seed.used + (vote === "used" ? 1 : 0),
    skip: seed.skip + (vote === "skip" ? 1 : 0),
    wish: seed.wish + (vote === "wish" ? 1 : 0),
  };
}

export function findCard(cards: Card[], id: string | null): Card | null {
  if (!id) return null;
  return cards.find((card) => card.id === id) ?? null;
}
