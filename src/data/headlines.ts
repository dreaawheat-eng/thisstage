import type { StageId } from "@/lib/types";

export type ReadKind = "Instagram" | "Blog";

export type Read = {
  id: string;
  kind: ReadKind;
  source: string;
  title: string;
  href: string;
  image?: string;
};

export type Headline = {
  id: string;
  ask: string;
  posts: Read[];
};

const nausea: Headline = {
  id: "nausea",
  ask: "Nothing staying down?",
  posts: [
    {
      id: "acog-nausea",
      kind: "Blog",
      source: "ACOG",
      title: "Nausea can last all day. It usually starts before 9 weeks.",
      href: "https://www.acog.org/womens-health/faqs/morning-sickness-nausea-and-vomiting-of-pregnancy",
    },
    {
      id: "mod-nausea",
      kind: "Blog",
      source: "March of Dimes",
      title: "What helps, and when to tell your provider it is too much.",
      href: "https://www.marchofdimes.org/find-support/topics/pregnancy/morning-sickness",
    },
    {
      id: "karrie-early",
      kind: "Instagram",
      source: "Karrie Locher",
      title: "The first weeks, without the glow story.",
      href: "https://www.instagram.com/karrie_locher/",
      image: "/graphics/creators/karrie_locher.jpg",
    },
    {
      id: "ee-early",
      kind: "Instagram",
      source: "Expecting and Empowered",
      title: "Short movement for the days you feel wrecked.",
      href: "https://www.instagram.com/expectingandempowered/",
      image: "/graphics/creators/expectingandempowered.jpg",
    },
  ],
};

const labor: Headline = {
  id: "labor",
  ask: "Is this labor, or practice?",
  posts: [
    {
      id: "acog-labor",
      kind: "Blog",
      source: "ACOG",
      title: "How true labor and practice contractions differ.",
      href: "https://www.acog.org/womens-health/faqs/How-to-Tell-When-Labor-Begins",
    },
    {
      id: "acog-fake",
      kind: "Blog",
      source: "ACOG",
      title: "Fake contractions can hurt. Rest and water are the test.",
      href: "https://www.acog.org/womens-health/experts-and-stories/ask-acog/is-it-normal-to-feel-fake-contractions",
    },
    {
      id: "mama-labor",
      kind: "Instagram",
      source: "Gina & Roxanne",
      title: "How people actually move, and how pushing feels.",
      href: "https://www.instagram.com/mamastefit/",
      image: "/graphics/creators/mamastefit.jpg",
    },
    {
      id: "karrie-bag",
      kind: "Instagram",
      source: "Karrie Locher",
      title: "What the first night home actually uses.",
      href: "https://www.instagram.com/karrie_locher/",
      image: "/graphics/creators/karrie_locher.jpg",
    },
  ],
};

const bump: Headline = {
  id: "bump",
  ask: "Clothes quitting, kicks starting?",
  posts: [
    {
      id: "ee-mid",
      kind: "Instagram",
      source: "Expecting and Empowered",
      title: "Workouts that fit a changing body.",
      href: "https://www.instagram.com/expectingandempowered/",
      image: "/graphics/creators/expectingandempowered.jpg",
    },
    {
      id: "sleepy-mid",
      kind: "Instagram",
      source: "Hey Sleepy Baby",
      title: "Side sleeping, without a strict clock.",
      href: "https://www.instagram.com/heysleepybaby/",
      image: "/graphics/creators/heysleepybaby.jpg",
    },
    {
      id: "lowtox-mid",
      kind: "Instagram",
      source: "Low Tox Life",
      title: "Fewer harsh products, without a new personality.",
      href: "https://www.instagram.com/lowtoxlife/",
      image: "/graphics/creators/lowtoxlife.jpg",
    },
    {
      id: "acog-anxiety-preg",
      kind: "Blog",
      source: "ACOG",
      title: "Worry in pregnancy is common, and it can be treated.",
      href: "https://www.acog.org/womens-health/faqs/anxiety-and-pregnancy",
    },
  ],
};

const feeding: Headline = {
  id: "feeding-loop",
  ask: "Feeding taking the whole day?",
  posts: [
    {
      id: "aap-often",
      kind: "Blog",
      source: "HealthyChildren",
      title: "How often a newborn eats, breast or bottle.",
      href: "https://www.healthychildren.org/English/ages-stages/baby/feeding-nutrition/Pages/how-often-and-how-much-should-your-baby-eat.aspx",
    },
    {
      id: "aap-colo",
      kind: "Blog",
      source: "HealthyChildren",
      title: "The first milk is small on purpose. Frequent beats long.",
      href: "https://www.healthychildren.org/English/ages-stages/baby/breastfeeding/Pages/Colostrum-Your-Babys-First-Meal.aspx",
    },
    {
      id: "karrie-feed",
      kind: "Instagram",
      source: "Karrie Locher",
      title: "How feeding goes in the first weeks, not the poster.",
      href: "https://www.instagram.com/karrie_locher/",
      image: "/graphics/creators/karrie_locher.jpg",
    },
    {
      id: "formula",
      kind: "Instagram",
      source: "The Formula Mom",
      title: "Bottles, without the guilt lecture.",
      href: "https://www.instagram.com/theformulamom/",
      image: "/graphics/creators/theformulamom.jpg",
    },
    {
      id: "legend",
      kind: "Instagram",
      source: "Legendairy Milk",
      title: "Supply and pumping, without the scare.",
      href: "https://www.instagram.com/legendairymilk/",
      image: "/graphics/creators/legendairymilk.jpg",
    },
  ],
};

const mood: Headline = {
  id: "not-yourself",
  ask: "Not feeling like yourself?",
  posts: [
    {
      id: "psi-anxiety",
      kind: "Blog",
      source: "Postpartum Support International",
      title: "Anxiety after birth is not only worry. Rage counts too.",
      href: "https://postpartum.net/beyond-the-worry-7-lesser-known-signs-of-postpartum-anxiety/",
    },
    {
      id: "psi-rage",
      kind: "Blog",
      source: "Postpartum Support International",
      title: "Why the anger shows up, and why it is not a character flaw.",
      href: "https://postpartum.net/why-do-i-feel-so-angry-the-hidden-side-of-postpartum-anxiety/",
    },
    {
      id: "acog-anx",
      kind: "Blog",
      source: "ACOG",
      title: "Anxiety can start in pregnancy or in the year after birth.",
      href: "https://www.acog.org/womens-health/faqs/anxiety-and-pregnancy",
    },
    {
      id: "dr-jaz",
      kind: "Instagram",
      source: "Dr. Jazmine",
      title: "What is going on under the mood, in plain language.",
      href: "https://www.instagram.com/themompsychologist/",
      image: "/graphics/creators/themompsychologist.jpg",
    },
  ],
};

const sleep: Headline = {
  id: "sleep-shape",
  ask: "Sleep still doesn’t have a shape?",
  posts: [
    {
      id: "hey-sleep",
      kind: "Instagram",
      source: "Hey Sleepy Baby",
      title: "Sleep that follows the baby. No cry-it-out clock.",
      href: "https://www.instagram.com/heysleepybaby/",
      image: "/graphics/creators/heysleepybaby.jpg",
    },
    {
      id: "tcb",
      kind: "Instagram",
      source: "Taking Cara Babies",
      title: "A crib rhythm, if you want a schedule.",
      href: "https://www.instagram.com/takingcarababies/",
      image: "/graphics/creators/takingcarababies.jpg",
    },
    {
      id: "janet-sleep",
      kind: "Instagram",
      source: "Janet Lansbury",
      title: "A calm limit, and fewer things in the room.",
      href: "https://www.instagram.com/janetlansbury/",
      image: "/graphics/creators/janetlansbury.jpg",
    },
    {
      id: "becky-sleep",
      kind: "Instagram",
      source: "Dr. Becky",
      title: "Warm, and the nighttime limit still holds.",
      href: "https://www.instagram.com/drbeckyatgoodinside/",
      image: "/graphics/creators/drbeckyatgoodinside.jpg",
    },
  ],
};

const solids: Headline = {
  id: "solids",
  ask: "Ready for food, or not yet?",
  posts: [
    {
      id: "aap-solids",
      kind: "Blog",
      source: "HealthyChildren",
      title: "Signs a baby is ready. Sitting matters more than a date.",
      href: "https://www.healthychildren.org/English/ages-stages/baby/feeding-nutrition/Pages/starting-solid-foods.aspx",
    },
    {
      id: "solid-starts",
      kind: "Instagram",
      source: "Solid Starts",
      title: "Food at their pace. They decide the bite.",
      href: "https://www.instagram.com/solidstarts/",
      image: "/graphics/creators/solidstarts.jpg",
    },
    {
      id: "blw",
      kind: "Instagram",
      source: "Baby-Led Weaning",
      title: "First foods they can feed themselves.",
      href: "https://www.instagram.com/babyledweanteam/",
      image: "/graphics/creators/babyledweanteam.jpg",
    },
    {
      id: "feeding-littles",
      kind: "Instagram",
      source: "Feeding Littles",
      title: "The toddler who stops after two bites is still this stage.",
      href: "https://www.instagram.com/feedinglittles/",
      image: "/graphics/creators/feedinglittles.jpg",
    },
  ],
};

const twos: Headline = {
  id: "terrible-twos",
  ask: "Going through the terrible 2s?",
  posts: [
    {
      id: "ztt-tantrum",
      kind: "Blog",
      source: "ZERO TO THREE",
      title: "Why tantrums happen, and what to do in the moment.",
      href: "https://www.zerotothree.org/resource/toddler-tantrums-101-why-they-happen-and-what-you-can-do/",
    },
    {
      id: "ztt-defiance",
      kind: "Blog",
      source: "ZERO TO THREE",
      title: "“No” is the job. Empathy first, then the limit.",
      href: "https://www.zerotothree.org/resource/coping-with-defiance-birth-to-three-years/",
    },
    {
      id: "ztt-hit",
      kind: "Blog",
      source: "ZERO TO THREE",
      title: "Hitting and biting peak when the words are not there yet.",
      href: "https://www.zerotothree.org/resource/aggressive-behavior-in-toddlers/",
    },
    {
      id: "blf",
      kind: "Instagram",
      source: "Big Little Feelings",
      title: "Name the feeling. The boundary stays.",
      href: "https://www.instagram.com/biglittlefeelings/",
      image: "/graphics/creators/biglittlefeelings.jpg",
    },
    {
      id: "becky-twos",
      kind: "Instagram",
      source: "Dr. Becky",
      title: "Warm, and you still hold the limit.",
      href: "https://www.instagram.com/drbeckyatgoodinside/",
      image: "/graphics/creators/drbeckyatgoodinside.jpg",
    },
  ],
};

const BY_STAGE: Record<StageId, Headline[]> = {
  p4: [nausea],
  p9: [nausea],
  p14: [bump],
  p21: [bump],
  p28: [labor],
  p34: [labor],
  p38: [labor],
  b0: [feeding, mood],
  b2: [feeding, mood],
  b6: [sleep, mood],
  b4m: [sleep],
  b6m: [solids],
  b9: [solids],
  b15: [twos],
};

export function headlinesFor(stageId: StageId): Headline[] {
  return BY_STAGE[stageId] ?? [];
}
