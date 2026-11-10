# ThisStage — developer handoff

Mobile-first web app for pregnancy through toddler. Tagline in product: “Your stage, filtered.” The app matches a parent to the week or age they are in, then shows a short home, shopping, stages, an AI mom, and a parent circle.

This note is what is built as of November 9, 2026.

## Run it

```bash
npm install
npm run dev
```

Dev server: `http://127.0.0.1:8080` (Vite, host `0.0.0.0`, port `8080`).

```bash
npm run typecheck
npm run build
```

Stack: React 19, TanStack Start `~1.168.60` (do not downgrade; older versions are a known security block), TanStack Router, Vite 8, Tailwind v4, Zustand persist, Lucide icons. TypeScript. Fonts: Fraunces (display) and Outfit (body), loaded in the app shell.

The product UI is one client app. Route `/` mounts `StageApp` from `src/components/thisstage/app.tsx`. Other routes (`/about`, `/guides`, `/privacy`, `/login`) are site pages around it. Do not rebuild the home as a new route unless you are splitting the file on purpose.

## Where a parent lands

Quiz first (due date or birthday, parent name and email, pace, feeding, budget, and a few style questions). Answers live in Zustand, key `thisstage.v1` in localStorage. Several children are supported. Tabs at the top switch the active child.

Bottom nav: Home, Stages, Sage, Circle, Profile.

### Home

- Date, mark, and a stage clip. The clip is the child and their age. Infant stages include a parent in the frame (`public/graphics/infant-mom.mp4`).
- “This stage” is one short line about the week or age.
- Stage headlines with a few posts (Instagram-style links plus real guides). Data: `src/data/headlines.ts`.
- After birth, a short “for you” note for the mom. Data: `src/data/after-birth.ts`. Mom has to be steady for the baby to be steady. Not a diagnosis.
- Toddler only: indoor play, mostly free and sensory. Data: `src/data/indoor.ts`. Component: `src/components/thisstage/indoor.tsx`.
- Shopping is three feeds. Products rotate by UTC day. See Shopping below.
- While pregnant, there is no “For you” label above the feeds. The first headline is the first feed.

Pregnancy feed headlines, same from early weeks through the end:

1. Clothes that grow with you.
2. Take the day off.
3. They will be here before you know it. If the baby’s name is saved, use it: “Rylee will be here before you know it.”

After birth the three headlines change with the stage (newborn sleep and recovery, floor time, first foods, toddler shoes, and so on). Copy is in `src/data/shop-lists.ts`. Voice is one mom talking to another. Statements, not category labels. No subtext under those headlines.

### Stages

Tab label is still Stages. The page headline is **What’s next**. Do not bring back a “Now” block. Home already shows the current stage.

One underlined headline only. Stage names are plain, separated by a hairline, with one sentence and up to three products. Past stages sit under **Then** as a list you open. Parents who asked to stay in the week do not see later stages.

### Sage

“Meet Sage. Your AI mom.” Ask box, then the “not a clinician” line under the box. Do not put the week number on this page. Implementation: `src/components/thisstage/mom.tsx` and `src/lib/mom.functions.ts`.

### Circle

Page headline: **Someone else is wondering too.** Do not put “A prompt each day…” on the page. That line was an internal note.

What Circle actually is:

- One daily prompt. Answering is optional.
- Helpful tips and unsolicited advice, filtered by pregnancy / postpartum / parenting.
- A feed of questions other parents asked, with comments.
- The parent is already named from the quiz. No Google or X sign-in wall.

Storage is local only: `localStorage` key `thisstage.circle.board`. Seeded questions are in `src/data/circle-feed.ts`. Prompts, tips, and advice are in `src/data/circle-daily.ts`. UI is `src/components/thisstage/circle-chat.tsx`.

There is a Postgres migration for a future shared Circle (`migrations/0002_circle.sql`, `0003_circle_social.sql`). The live UI does not use it yet.

### Profile

Parent name, email, city, children, quiz answers, reset. Edit in place.

## Shopping rules

Partners we talk about: Amazon, Target, Walmart, Kohl’s, Macy’s, Nordstrom. Amazon is the default search when we do not have a checked page.

There is **no live product API**. Do not wire a loose search and trust the first image. That mismatch already happened (a sneaker card showed a nursing pillow).

How a card gets a real photo:

1. Find the exact product page.
2. Save that page’s image under `public/graphics/shop/`.
3. Add a row in `src/data/offers.ts` (`title`, `image`, `price`, `store`, `href`, and a `match` phrase).
4. The card’s `query` must contain that phrase. `offerFor()` picks the longest matching phrase.
5. Shop now opens the real `href` when we have one. Otherwise it opens an Amazon search for the query.

Checked pages already in the catalog include a prenatal, maternity pants, a long tee, a nursing bra, joggers, a Boppy (newborn feeding only, not during pregnancy), bottles, sleep sacks, a stroller, a diaper bag, a sippy cup, nipple cream, a peri bottle, a Cloud Island swaddle, Tula Glow & Get It eye balm, a body pillow, a Simple Modern bottle, saltines, Auden socks, Goodnight Moon 123, and Cloud Island knotted hats.

Feeds are built in `shopLists()` in `src/data/shop-lists.ts`. Each headline has a pool. The UTC day index rotates which three show. Pools on the same screen must not repeat the same product.

Introduce baby things slowly. Middle and late pregnancy can show one soft unisex item. A nursing pillow waits until the baby is here. Do not recommend trendy sneakers against a body headline.

Wishlist is a heart on the card. Votes are used / skip / wish, stored in `thisstage.v1`.

## Stages in the model

`StageId` in `src/lib/types.ts`:

| Id | Meaning |
|---|---|
| p4 | Weeks 4–8 |
| p9 | Weeks 9–13 |
| p14 | Weeks 14–20 |
| p21 | Weeks 21–27 |
| p28 | Weeks 28–33 |
| p34 | Weeks 34–37 |
| p38 | Weeks 38–42 |
| b0 | First 10 days |
| b2 | Weeks 2–5 |
| b6 | About 6 weeks |
| b4m | About 4 months |
| b6m | About 6 months |
| b9 | About 9 months |
| b15 | Toddler, from about 15 months |

Week math and age labels: `src/lib/stage.ts`. Stage copy and the older product pack: `src/data/digest.ts`. The home shopping feeds no longer depend on that 10-card pack. They use `shop-lists.ts`.

Pace from the quiz still matters on Stages. `ahead` can see further. `moment` stays in this week. Home no longer shows a strip of future weeks unless they asked to look ahead.

## Look

Tokens are in `src/styles.css`.

| Token | Value | Use |
|---|---|---|
| cream | `#f7f7f5` | page background |
| paper | `#ffffff` | cards, alternating bands |
| ink | `#1c1c1a` | text |
| muted | `#6a6a64` | secondary text |
| line | `#e4e4e0` | hairlines |
| terra | `#1f6a4d` | the short rule under a headline, links, focus |
| clay / mist | `#e4f0e9` / `#d7efe6` | soft green fills |

One underlined headline per screen (`SectionHead` in `src/components/thisstage/ui.tsx`). Do not stack a second underlined headline under it. That was the Stages problem. Stage names and feed titles can be type, not another rule, when a page title is already on screen. Home feed titles still use `SectionHead` because the page title is the stage clip, not a text headline.

Voice: short, calm, specific. A mom who already knows the day. Not clinical, not cute, not a shopping category. No subtitles that explain the feature to the builder. If a line is an instruction to us, it does not ship.

Logo: `public/logo.png`.

## What the developer still has to build

- A real account, if Circle and the wishlist should follow the parent across phones. Auth scaffolding exists (`better-auth`, `src/lib/auth`, `migrations/0001_auth.sql`). The quiz currently does not require it. Circle does not use it.
- Shared Circle comments. The UI is per browser.
- A real affiliate or product API, with an exact product id in and a photo out. Until that exists, add products the way `offers.ts` does.
- Affiliate tracking on Shop now (Amazon Associates, Target, and the department stores). Links are plain product or search URLs today. Earnings are not wired.
- Sage is a server function, not a finished clinical product. Keep the “not a clinician” line. Do not diagnose postpartum mood disorders. The after-birth notes can name that the weeks and months after birth are hard, and can point at help. PSI is 1-800-944-4773. Crisis line is 988.
- Website should match this app. The app is the source of truth if an older brief disagrees.
- Do not publish on `@tanstack/react-start` below `1.168.60`.

## Files to open first

| Path | What it is |
|---|---|
| `src/components/thisstage/app.tsx` | Screens, nav, home, stages, circle page, profile |
| `src/components/thisstage/ui.tsx` | `SectionHead`, buttons, screen shell |
| `src/components/thisstage/cards.tsx` | Product cards, Shop now, heart |
| `src/data/shop-lists.ts` | The three feed headlines and product pools |
| `src/data/offers.ts` | Checked store pages and photos |
| `src/data/digest.ts` | Stage list, older product logic, creators |
| `src/data/quiz.ts` | Quiz questions |
| `src/lib/store.ts` | Saved parent, children, votes |
| `src/lib/stage.ts` | Due date and age to `StageId` |
| `src/styles.css` | Color and type |
| `public/graphics/` | Clips, fruit, product photos |

## Product decisions already made

- Gender-neutral until a sex is chosen. Say “you” and the baby’s name. The audience is moms; the copy should not assume a dad is the user, and it should not say “mama” in every line.
- One Shop now button. No second CTA.
- Stickers (best seller, new) sit on the photo, not as a separate row.
- Creators rotate daily and open that creator’s Instagram. Section name is Creators like you.
- Recipes are a daily food block matched to the quiz, not a section called Dinner.
- Nursing pillow is a newborn feeding item only.
- Postpartum content is split: the mom first, then the baby.
- Toddler indoor ideas are free and use what is already in the house.
