# ThisStage — conversation export + Grok Build starter

**Date:** September 23, 2026  
**Working name:** ThisStage  
**Short line:** Your stage, filtered  
**App Store / landing line:** The anti-overwhelm guide for pregnancy and baby. Matched to how you parent.

Use this file as the source of truth when you open Grok Build. Paste the “GROK BUILD PROMPT” section as the first message.

---

## 1. What the product is

ThisStage is a mobile-first guide for pregnancy through early parenthood.

The parent enters a **due date or baby birthday**, answers a short **vibe quiz**, and gets one digest for *this week only*:

- What this stage usually looks like (calm language, not medical diagnosis)
- Pregnancy: “baby is about the size of X” (fun estimate only)
- 3 curated products for *now* (not a 40-item registry)
- A few matched creators (blog / IG / YouTube)
- Optional small circle of parents with the same vibe + stage

It exists because after birth (and during pregnancy) blogs, lists, and influencers pile on. ThisStage filters to how *this* parent shops and parents.

**Not medical advice.** Milestones are based on public sources (e.g. CDC-style windows) and paraphrased. Fruit sizes are visual, not ultrasound measurements. Medicine talk between parents needs a disclaimer and no dosing.

---

## 2. Brand (locked so far)

| Piece | Decision |
|---|---|
| Name | ThisStage |
| Tagline | Your stage, filtered |
| Store subtitle | Anti-overwhelm guide for pregnancy & baby |
| Store / hero sentence | The anti-overwhelm guide for pregnancy and baby. Matched to how you parent. |
| Handle / domain direction | Prefer ThisStage as product name; thisstage.app / thisstageapp.com / @thisstageapp if exact handle is taken |
| Logo | Not final. Cream + terracotta + charcoal. Avoid clipart babies and “Live Laugh Mom” script. Parent/baby mark still TBD. |
| Voice | Calm, short, one-handed phone use. Friend texting three options—not a blog. |

---

## 3. MVP scope (build this, nothing else)

### Must have
1. Onboarding: due date **or** baby birthday + name optional
2. Short vibe quiz (see section 7)
3. Home digest for **this week / this stage only**
4. Pregnancy weeks 4–40: size-of-fruit line + 2-sentence body note + 3 product slots
5. After birth: age-based stage + 3 product slots + 1–2 milestone lines
6. Product cards: one-line description, 3 tags, “why this matches you,” affiliate-ready button
7. Votes on products: Used it / Skip it / Wish I’d had it
8. Disclaimer footer on milestone and any health-adjacent cards
9. Simple profile: edit dates, retake quiz

### Nice later (do not build in first Build pass)
- Full community / DMs / local meetups
- Medicine-sharing feed
- Native App Store / Play Store binaries
- Infinite shop
- Comments on products
- Push notifications
- Multi-child households (can stub “add another child” later)

### Hard product rules
- **3 products** per stage. “See 2 alternates” is the only expand.
- No infinite scroll shop.
- Rank by votes from **similar vibe + similar stage** when you have data; until then, hand-curate 1 default SKU per slot per vibe bucket.
- Community, if shown, is 5 cards max on home.

---

## 4. Information architecture

**Screens**
1. Welcome
2. Date (due date or birthday)
3. Quiz (5–7 taps)
4. Home digest
5. Product detail (short)
6. Stage timeline (optional list of weeks/months)
7. Circle / community (stub)
8. Profile + disclaimer

**Home digest order**
1. “You’re in week 36” / “Rylee is 11 months”
2. Fruit size (pregnancy only) or one milestone line (baby)
3. Need now — 3 cards
4. One creator to follow this month
5. Optional: 3 community cards from same vibe
6. Tiny disclaimer

---

## 5. Product card spec

```
Name
One sentence why it matters this week
3 tags (price band · material/vibe · where to buy)
Why you: one sentence tied to quiz
Votes: 128 used · 19 skipped · 46 wish they’d had it
[Get it]  [Used it]  [Skip]  [Wish I had this]
```

Affiliate disclosure once at bottom of the list: “We may earn a commission.”

---

## 6. Pregnancy + early postpartum slots (categories, not brands)

Hand these to Build as *slot types*. Brands come from quiz + later votes.

### Pregnancy (examples — collapse similar weeks in MVP)
- Weeks 4–8: prenatal vitamin reminder, comfortable bra/top, nausea snack
- Weeks 9–13: jeans that still work, first appointment checklist (task card OK)
- Weeks 14–20: support belt or shoes, bump-friendly lounge set
- Weeks 21–27: belly cream or stretch-mark pick matching vibe, bigger-car-seat research *task*
- Weeks 28–33: hospital bag starter, birth-plan one-pager task
- Weeks 34–40: peri bottle, car seat check task, going-home outfit for parent

### First 12 weeks postpartum
- Week 0–1: peri bottle, heavy pads, soft dark joggers
- Week 2–4: nipple care or formula path (quiz), easy one-hand snacks
- Week 5–8: baby carrier or stroller (quiz: budget vs premium), sleep-safe swaddle *or* sleep sack
- Week 9–12: first solids research *only if age-appropriate later*; otherwise pumping/feeding gear matching quiz

A card can be a **task** (car-seat inspection) not a SKU.

---

## 7. Quiz — what you still need to do

This is the homework. Build can ship a quiz from the sample below; **you** decide the final 6 questions and the vibe tags they create.

### Goal
Map each parent to a few tags used to filter products and creators.

**MVP tag set (keep short):**
- Budget | Mid | Splurge-OK
- Low-tox / crunchy-leaning | Mainstream
- Feeding lean: Breast | Formula | Combo | Undecided
- Food family: No restriction | Dairy-free-ish | Plant-forward
- Style: Minimal gear | Happy to buy the helper products

Do **not** lock people into “crunchy mom” as an identity label on screen. Ask behavior; store tags in the background.

### Sample quiz (ship this, then tighten)

1. **When you buy for baby, you usually want…**  
   Stretch the dollar / Balanced / Pay more if it’s safer or lasts

2. **Ingredients and materials**  
   I look for low-tox / organic when I can · I care some · I mostly want what works

3. **Feeding plan (or current)**  
   Breast · Formula · Both · Still deciding

4. **Food in your house is mostly…**  
   Whatever the family eats · Plant-forward / vegan-leaning · Allergen-aware

5. **Gear personality**  
   Buy as little as possible · Buy the things that save sanity

6. **Who is this for?**  
   Pregnant · Baby already here · Both (expecting + have a child)

Optional 7th: first baby vs not.

### How to put the quiz out
- Inside the app, **after** the date, **before** home. 5–7 screens, one question per screen, big tap targets.
- Progress dots. Skip allowed; skipped = “mainstream / mid.”
- Retake anytime in Profile.
- Never shame a answer. No “good mom” scoring.
- Later: same quiz as a landing-page lead magnet (“Get your stage digest”) so you can collect emails before the app exists.

### Your personal to-do on the quiz
- [ ] Confirm the 6 questions above or rewrite in your voice
- [ ] For each answer, write the **tag** it sets (budget, low-tox, etc.)
- [ ] List 3 example products that would change if someone picked budget vs splurge (so the filter is real)
- [ ] Write one sentence of intro: “A few taps so we don’t show you 40 blogs.”
- [ ] Decide if feeding question is required (yes if product slots include pumps vs formula)

---

## 8. Legal / content guardrails (put in the app footer)

- ThisStage is general information, not medical advice. Talk to your child’s or your own clinician.
- Fruit-size comparisons are for fun and are not measurements.
- Milestone language: “many babies around this age…” never “your baby should.”
- No dosing. Peer “what I used” is later and must say it is not a recommendation.
- Child birthday is personal data — keep it in the account, don’t show it publicly in community.

Copyright: your quiz wording, cards, and UI copy are yours when you write them. The *idea* is not protectable. Trademark ThisStage when you use it in public.

---

## 9. Monetization (don’t code checkout in v0 unless easy)

- Free digest
- Affiliate links on the 3 products
- Later: Plus for extra children, saved lists, or ad-free circle

---

## 10. GROK BUILD PROMPT (copy everything in this box)

```
Build a mobile-first web app called ThisStage.

Brand
- Name: ThisStage
- Tagline under logo: Your stage, filtered
- Hero sentence: The anti-overwhelm guide for pregnancy and baby. Matched to how you parent.
- Visual: warm cream background, terracotta and charcoal, large tap targets, short copy, lots of whitespace. No cluttered marketplace. Feels like a calm magazine, not Target.

Purpose
Parents enter a due date or a baby’s birthday, take a 6-question vibe quiz, and see ONE weekly digest: this stage only. Never dump 20 products.

Onboarding flow
1. Welcome screen with name + tagline + “Get my digest”
2. Toggle: I’m pregnant / I have a baby / both
3. Date picker: due date and/or birthday
4. Quiz, one question per screen, progress dots, skip allowed
5. Land on Home

Quiz questions
1. When you buy for baby you usually want: Stretch the dollar / Balanced / Pay more if it’s safer or lasts
2. Ingredients and materials: Low-tox when I can / I care some / I want what works
3. Feeding: Breast / Formula / Both / Still deciding
4. Food at home: Whatever the family eats / Plant-forward / Allergen-aware
5. Gear: Buy as little as possible / Buy things that save sanity
6. First baby? Yes / No / Prefer not to say

Map answers to hidden tags: budget|mid|splurge, lowtox|mid|mainstream, breast|formula|combo|undecided, default|plant|allergen, minimal|helpers, first|experienced.

Home digest (this is the core screen)
- Header: “Week 28” or “4 months old” computed from the date
- If pregnant: “This week baby is about the size of a [fruit]. Fun estimate, not a medical measurement.”
- 2 sentences about this stage in plain language
- NEED NOW: exactly 3 product cards
- 1 creator card (placeholder name + why they match this vibe)
- Footer disclaimer: “General info, not medical advice. Ask your provider about your pregnancy or child.”

Product card
- Title, one sentence, three small tags, “Why you: …”
- Buttons: Get it | Used it | Skip | Wish I had this
- Show fake starter counts so the UI is visible
- Get it can be a # link for now

Include seed content
- At least 4 pregnancy weeks (8, 20, 34, 38) and 4 baby ages (1 week, 6 weeks, 4 months, 9 months)
- For each, 3 placeholder products that change if budget vs splurge and if low-tox vs mainstream
- Example week 38 budget+lowtox: peri bottle, drugstore pads, dark joggers
- Example week 38 splurge+lowtox: glass peri bottle, organic pads, soft lounge set
- Tasks allowed as cards (e.g. “Schedule car seat check”)

Other screens
- Timeline list of stages
- Profile: edit dates, retake quiz
- Circle tab: stub “Moms in your vibe at this stage” with 3 fake recipe/snack cards. No DMs. Caption: recipes and snacks only for now.

Rules
- Mobile phone layout first (390px wide)
- One-handed, big buttons
- No hamburger full of features
- Do not invent medical cutoffs or say “your baby should”
- Do not show more than 3 products without a “See 2 alternates” control
- Publish as a PWA-friendly web app

After the first version works, I will iterate: real copy, real product links, and the quiz wording.
```

---

## 11. After Build ships the first draft

1. Tap through on your phone. Cut any screen that feels like a blog.
2. Replace placeholder products with 3 real links you would have wanted.
3. Put the quiz intro in your voice.
4. Add privacy one-liner and the medical disclaimer.
5. Share the grok.me (or thisstage.app) link with 5 moms in different vibes and watch where they get lost.

---

## 12. Conversation decisions log

- Problem: overwhelm of milestones, bloggers, and products after baby arrives; same pain in pregnancy.
- Solution: birthday/due date + values quiz → digest of people, places, things for this stage only.
- Parent profiles expanded beyond crunchy/vegan/budget; MVP tags stay few.
- Pregnancy included, including “size of a fruit,” labeled as fun.
- Product UX: 3 items, short copy, votes (used / skip / wish I’d had it), rank by similar parents.
- Community: same-vibe, same-stage; recipes/snacks first; medicines later with no dosing.
- Grok Build: good for web/mobile prototype; not a one-click App Store app. Wrap later (Capacitor etc.).
- SuperGrok is enough to start Build; Plus only if the weekly usage pool runs out.
- Trademark the name when used in commerce; copyright covers your words and UI, not the idea.
- Milestones: you can draft from public sources; clinician review before you claim medical authority.
```
