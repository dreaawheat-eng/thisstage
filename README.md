# ThisStage

Mobile web app for pregnancy through the toddler years. A parent takes a short quiz, and the app stays on the week or age they are in.

This repository is the public handoff. A developer or another tool can clone it, or fetch the raw files below.

- https://github.com/dreaawheat-eng/thisstage
- https://raw.githubusercontent.com/dreaawheat-eng/thisstage/main/README.md
- https://raw.githubusercontent.com/dreaawheat-eng/thisstage/main/HANDOFF.md

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

The stage video clips are not in this repository. They are large files. The notes in `HANDOFF.md` are the source of truth for what is built.
