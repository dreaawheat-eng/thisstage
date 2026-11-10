# ThisStage — website brand handoff

For the website developer. Match the app. Do not invent a second look.

November 4, 2026

---

## 1. The job of the site

ThisStage is a short guide for parents, from pregnancy through the early toddler years. The site should feel like the app: quiet, warm, and easy to scan. Forest green on warm off-white. No pink. No “mama.” Not a registry carnival.

One screen, one idea. Short sentences. Plenty of space.

## 2. Name and lines

Use these exactly.

| | |
|---|---|
| Name | ThisStage |
| Say it | One word. Capital T, capital S. Not “This Stage.” |
| Tagline | Your stage, filtered |
| One line | The anti-overwhelm guide for pregnancy and baby. Matched to how you parent. |
| About | A short guide for parents, from pregnancy through the early years. It is not a registry, a medical record, or an app for children to use. |
| Footer, every page | General info, not medical advice. Ask your provider about your pregnancy or child. |

Contact placeholder: hello@thisstage.app
Confirm this inbox is real before launch.

## 3. Voice

- Write to “you.” Short sentences. Plain words.
- Gender-neutral. Say parent, you, the baby, the toddler.
- Do not say mama, mommy, journey, tribe, algorithm, or boss mom.
- No exclamation points as a style. No fake urgency.
- The AI is named Sage. On the product she is “Meet Sage. Your AI mom.” Do not rename the whole brand around “mom.”
- Shop talk stays honest. If a link can earn a commission, say so. Never imply a product is medical advice.

## 4. Color

Paste these. Names match the app.

| Token | Hex | Use |
|---|---|---|
| cream | #f7f7f5 | Page background |
| paper | #ffffff | Cards, inputs |
| sand | #efefec | Quiet buttons, pressed-off chips |
| ink | #1c1c1a | Text, rare dark buttons |
| muted | #6a6a64 | Secondary text |
| line | #e4e4e0 | Hairline borders, dividers |
| terra | #1f6a4d | Brand green. Buttons, links, the short rule under headlines, focus ring |
| clay | #e4f0e9 | Soft green fill. Selection, small stickers |
| mist | #d7efe6 | Soft green wash behind the mark |
| butter | #f6e7a8 | Rare highlight only. Do not build a yellow brand. |
| apricot | #f3e2cf | Rare warm wash only. Not a second brand color. |

Do not add pink, purple, or baby blue.

Hero wash, if you need a soft top:

```css
background:
  radial-gradient(90% 70% at 50% 0%, #e5f3ed 0%, transparent 70%),
  radial-gradient(70% 40% at 100% 10%, #f4f1e8 0%, transparent 55%),
  #f7f7f5;
```

```css
:root {
  --cream: #f7f7f5;
  --paper: #ffffff;
  --sand: #efefec;
  --ink: #1c1c1a;
  --muted: #6a6a64;
  --line: #e4e4e0;
  --terra: #1f6a4d;
  --clay: #e4f0e9;
  --mist: #d7efe6;
  --butter: #f6e7a8;
  --apricot: #f3e2cf;
}
```

## 5. Type

| Role | Family | Weight | Use |
|---|---|---|---|
| Display | Fraunces | 520 and 640 | Headlines, the wordmark |
| Sans | Outfit | 400, 500, 600 | Body, buttons, labels |

Fallback: Fraunces → Iowan Old Style, Palatino, Georgia. Outfit → Avenir Next, Segoe UI, sans-serif.

Google Fonts:

```
https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,520;9..144,640&family=Outfit:wght@400;500;600&display=swap
```

- Headlines: tight line-height, medium weight, not bold-black.
- Body: 16–18px, relaxed line-height.
- Secondary: 14px, color muted.
- Do not use a script font. Do not set headlines in all caps.

## 6. Logo

File in this folder: `logo.png`

The mark is two overlapping rounded figures in forest green (#1f6a4d). It is not a letter, a heart, or a stork.

The wordmark is the word ThisStage set in Fraunces. It is not a custom drawn logo. On a dark green button, the word is white. On cream, the word is ink.

Leave clear space around the mark. Do not recolor it pink. Do not put it in a circle badge.

## 7. Layout and components

Match these. They are what the app already does.

**Page**
- Background cream.
- Text ink.
- Comfortable side padding. The app column is narrow (about 448px). The website can be wider, but keep the same quiet cards. Do not turn it into a 12-column marketing template.

**Section headline**
- Fraunces, about 30px on a section, about 48px on a page title.
- Under it: a short forest-green pill, 40px wide, 2px tall, fully rounded.
- Optional subtitle under the rule, 14px, muted.
- Do not underline the whole headline. One short rule only.

**Cards**
- White or cream fill.
- 1px border, color line.
- Corner radius 24px.
- One idea per card. A label, a title, one or two lines.

**Buttons**
- Pill shape. Fully rounded. Minimum height 48px.
- Primary: terra fill, white text, medium weight.
- Secondary: white fill, 1px line border, ink text.
- Quiet: sand fill, ink text.
- Dark, rare: ink fill, white text.
- Disabled: 40% opacity. Do not change the color.

**Chips and stickers**
- Pill. 14px. Medium weight.
- Off: white or sand, line border.
- On: ink fill, white text.
- A “New” or “Best seller” sticker sits on the top left of a photo, small, paper fill, ink text.

**Links in prose**
- Terra, underlined.

**Focus**
- 2px terra outline, 3px offset. Do not remove it.

**Photos**
- Square or 4:5 on product cards. Soft corners, 16px on tiles, 24px on big cards.
- Real product photos, not illustrations, when we are showing something to buy.

## 8. What the product actually is

Describe the real app. Do not add features that are not here.

- A short quiz: who the guide is for, a due date or birthday, how you shop, eat, feed, sleep, and parent.
- Home is this week or this stage. Not every week at once.
- Shopping list: a few real products, a photo, a short line, Shop now.
- After the birth, home splits. **You** comes first (mood, recovery, postpartum, PMDD). **The baby** comes after.
- Toddler stage adds **Inside**: free indoor play, including sensory play, using what you already have.
- Recipes match how they eat.
- Creators like you: a few real people, with a photo and an Instagram link.
- Stages: Then, Now, Soon. Not a dense timeline.
- Sage: an AI mom for this stage. She is not a clinician. The page says “Meet Sage” and “Your AI mom.”
- Circle: one prompt a day, helpful tips, unsolicited advice, and questions parents can answer.
- More than one child. Switch from the top.

Shops we link: Amazon, Target, Walmart, Kohl’s, Macy’s, Nordstrom.
Amazon is the main Shop now button when we have a search. Some cards open a specific product page.
ThisStage is independent. It is not made by those stores.

## 9. Pages to start

1. Home — name, tagline, one line, Get started, a quiet look at the product.
2. About — the about line in section 2.
3. How it works — quiz, then a filtered stage. Three steps, not a feature grid.
4. Guides — short reading. Same type and the green rule.
5. Privacy — parent is the user. A child is not. Quiz answers stay on the device unless we later say otherwise.
6. Affiliate disclosure — some shop links may pay us. The short list is still a short list. No extra cost to the parent.
7. Contact — hello@thisstage.app

Footer on every page: the medical line, Privacy, Affiliate disclosure.

## 10. Do not

- Pink, lavender, or baby-blue gradients.
- Script fonts, storks, rattles, or a heart as the logo.
- “Mama,” “journey,” “tribe,” “boss mom,” “you’ve got this!”
- Milestone deadlines, doses, or “your baby should.”
- Countdown timers, fake scarcity, pop-up coupons.
- A site that talks to the child. The parent is the user.
- Hiding the medical line to look cleaner.

## 11. A reference headline

```
ThisStage

Your stage, filtered

The anti-overwhelm guide for pregnancy and baby.
Matched to how you parent.

[ Get started ]
```

“Get started” is a forest-green pill. The tagline is terra. The headline is Fraunces, ink, on cream.
