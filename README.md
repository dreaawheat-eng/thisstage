# ThisStage

Mobile web app for pregnancy through the toddler years. A parent takes a short quiz, and the app stays on the week or age they are in.

## Run

```bash
npm install
npm run dev
```

Open http://127.0.0.1:8080

```bash
npm run typecheck
npm run build
```

Node 20+ is assumed. The app uses React 19, TanStack Start `~1.168.60`, Vite, and Tailwind v4. Do not downgrade TanStack Start.

## What to read

`HANDOFF.md` is the product handoff: screens, copy that already shipped, shopping rules, brand tokens, and what is still mocked. Read that before changing the home, Stages, Circle, or the product feeds.

## Layout

The app itself is `src/components/thisstage/app.tsx`, mounted from `src/routes/index.tsx`. Product feeds are `src/data/shop-lists.ts`. Checked store photos are `src/data/offers.ts` and `public/graphics/shop/`. Saved quiz state is the Zustand key `thisstage.v1` in localStorage.

There is no live retailer API. A product photo ships only when it comes from that exact product’s store page.

The stage video clips (`public/graphics/*.mp4`) are not in this zip. The full package was about 100MB and the download was blocked. Posters (the `.jpg` next to each clip) are included. Ask for the clips separately if you need the hero video.

