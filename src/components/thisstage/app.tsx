import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Baby, CalendarDays, ChevronLeft, Heart, House, Instagram, MessageCircle, Sprout, ThumbsDown, ThumbsUp, UserRound, Users } from "lucide-react";
import { AVOID_OPTIONS, askStyleFor, questionsFor, journeyFor } from "@/data/quiz";
import { STAGES, stageMeta, upcomingStages, type Card } from "@/data/digest";
import { ProductCard, ShelfRow, findCard, pickBadges, shopFor } from "@/components/thisstage/cards";
import { Btn, Disclaimer, MEDICAL, Mark, Screen, SectionHead } from "@/components/thisstage/ui";
import { chipLabel, childStageLine, draftToChildren, emptyExtra, extraCount, newChildId, type Child, type Sex } from "@/lib/children";
import { ageDays, ageFigure, gestationalWeek, parseDateOnly, toISODate } from "@/lib/stage";
import { useApp } from "@/lib/store";
import { NEUTRAL_TAGS, type Food, type StageId, type Tags, type Vote } from "@/lib/types";
import { buildHome } from "@/lib/view";
import { learnFeed } from "@/lib/learn";
import { fruitArt } from "@/lib/graphics";
import { lookupProducts, type LiveProduct } from "@/lib/products.functions";
import { CircleChat } from "@/components/thisstage/circle-chat";
import { Notes } from "@/components/thisstage/notes";
import { Mom } from "@/components/thisstage/mom";
import { Untold } from "@/components/thisstage/untold";
import { AfterBirth } from "@/components/thisstage/after-birth";
import { Indoor } from "@/components/thisstage/indoor";
import { StageHeadlines } from "@/components/thisstage/headlines";
import { QuizDraft } from "@/components/thisstage/quiz-draft";
import { clsx } from "clsx";
import { offerFor } from "@/data/offers";
import { shopLists } from "@/data/shop-lists";
import { foodCaption, foodTitle } from "@/lib/vibe";

const ABOUT_YOU = "Tell us about you";
const ABOUT_KIDS = "Tell us about your kids";
const ABOUT_PARENT = "Tell us about how you parent";

const COUNTRIES = ["United States", "Canada"] as const;
const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah",
  "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
];
const CA_PROVINCES = [
  "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador",
  "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island", "Quebec",
  "Saskatchewan", "Yukon",
];

export function StageApp() {
  const app = useApp();
  const screen = (app.screen as string) === "logos" ? "home" : app.screen;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screen, app.detailId, app.quizIndex, app.focus, app.preview]);

  return (
    <div className="relative min-h-dvh bg-cream text-ink">
      {app.onboarded && (screen === "home" || screen === "timeline" || screen === "circle" || screen === "mom") ? <KidTabs /> : null}
      {screen === "welcome" ? <Welcome /> : null}
      {screen === "who" ? <Who /> : null}
      {screen === "setup" ? <Setup /> : null}
      {screen === "parent" ? <Parent /> : null}
      {screen === "quiz" ? <Quiz /> : null}
      {screen === "home" ? <Home /> : null}
      {screen === "detail" ? <Detail /> : null}
      {screen === "timeline" ? <Timeline /> : null}
      {screen === "circle" ? <Circle /> : null}
      {screen === "mom" ? <Mom /> : null}
      {screen === "profile" ? <Profile /> : null}
      {screen === "wishlist" ? <Wishlist /> : null}
      {screen === "quizdraft" ? <QuizDraft /> : null}
      {app.onboarded && screen !== "detail" && screen !== "quizdraft" ? <Nav /> : null}
      <Notes />
    </div>
  );
}

export function Splash() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-cream px-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <Mark className="size-14" />
        <p className="font-display text-4xl text-ink">ThisStage</p>
      </div>
    </div>
  );
}

function tabSub(child: Child): string {
  if (child.kind === "pregnant") {
    const week = gestationalWeek(child.due);
    if (week === null) return "Due date";
    return week > 42 ? "Week 42+" : `Week ${Math.max(1, week)}`;
  }
  const days = ageDays(child.birthday);
  if (days === null) return "Birthday";
  if (days < 0) return "Not yet";
  return ageFigure(days).figure;
}

function KidTabs() {
  const children = useApp((s) => s.children);
  const activeChildId = useApp((s) => s.activeChildId);
  const set = useApp((s) => s.set);
  if (children.length < 2) return null;
  const active = activeChildId || children[0]?.id;
  return (
    <div className="sticky top-0 z-30 border-b border-line bg-cream">
      <div role="tablist" aria-label="Your kids" className="mx-auto flex w-full max-w-md overflow-x-auto">
        {children.map((item) => {
          const on = item.id === active;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => set({ activeChildId: item.id, preview: null })}
              className={clsx("min-h-14 min-w-28 flex-1 border-b-2 px-4 py-2 text-left", on ? "border-terra text-ink" : "border-transparent text-muted")}
            >
              <span className="block truncate text-base font-semibold">{chipLabel(item)}</span>
              <span className="block truncate text-xs">{tabSub(item)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Ask({
  progress,
  onBack,
  title,
  sub,
  section,
  children,
}: {
  progress: number;
  onBack: () => void;
  title: string;
  sub?: string;
  section?: string;
  children: ReactNode;
}) {
  const pct = Math.round(Math.min(100, Math.max(0, progress)));
  return (
    <Screen className="pb-16 pt-5">
      <button type="button" onClick={onBack} aria-label="Back" className="grid size-11 place-items-center rounded-full bg-paper text-ink shadow-sm">
        <ChevronLeft className="size-5" aria-hidden />
      </button>
      {section ? <p className="mt-6 text-sm font-medium text-terra">{section}</p> : null}
      <div className="mt-3 flex items-center gap-3">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-line" aria-hidden>
          <div className="h-full rounded-full bg-terra" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-sm font-medium tabular-nums text-terra">{pct}%</p>
      </div>
      <h1 className="mt-8 text-[1.7rem] font-semibold leading-tight tracking-tight text-ink">{title}</h1>
      {sub ? <p className="mt-3 text-base leading-relaxed text-muted">{sub}</p> : null}
      <div className="mt-8">{children}</div>
      <SkipToApp />
    </Screen>
  );
}

function skipToApp() {
  const state = useApp.getState();
  let children = state.children.length ? state.children : draftToChildren(state);
  if (!children.length) {
    const due = new Date();
    due.setDate(due.getDate() + 20 * 7);
    children = [{ id: newChildId(), name: "", kind: "pregnant", due: toISODate(due), birthday: "", sex: "unknown" }];
  }
  const activeChildId = children.some((child) => child.id === state.activeChildId) ? state.activeChildId : (children[0]?.id ?? "");
  state.set({ children, activeChildId, tags: state.tags, onboarded: true, screen: "home", preview: null, quizIndex: 0 });
}

function SkipToApp() {
  return (
    <button type="button" onClick={skipToApp} className="mt-6 min-h-11 w-full text-sm text-muted underline">
      Skip to the app
    </button>
  );
}

function choiceClass() {
  return "flex min-h-36 flex-col items-center justify-center gap-3 rounded-2xl border border-line bg-paper px-3 py-4 text-center text-ink active:border-ink";
}

function Welcome() {
  const set = useApp((s) => s.set);
  return (
    <Screen className="flex min-h-dvh flex-col justify-between py-12">
      <div />
      <div>
        <Mark className="size-14" />
        <h1 className="mt-6 font-display text-5xl leading-none text-ink">ThisStage</h1>
        <p className="mt-3 text-lg text-terra">Your stage, filtered</p>
        <p className="mt-6 max-w-sm text-lg leading-relaxed text-ink">
          The anti-overwhelm guide for pregnancy and baby. Matched to how you parent.
        </p>
      </div>
      <div>
        <Btn
          className="h-14 w-full text-base"
          onClick={() => set({ screen: "parent", tags: { ...NEUTRAL_TAGS }, quizIndex: 0, preview: null, onboarded: false })}
        >
          Get started
        </Btn>
        <p className="mt-4 text-center text-sm text-muted">
          <Link to="/about" className="underline">About</Link>
          {" · "}
          <Link to="/guides" className="underline">Guides</Link>
          {" · "}
          <Link to="/privacy" className="underline">Privacy</Link>
        </p>
        <button type="button" onClick={() => set({ screen: "quizdraft" })} className="mt-4 min-h-11 w-full text-sm text-muted">
          Edit the quiz questions
        </button>
        <SkipToApp />
        <Disclaimer>
          <span className="mt-4 block">{MEDICAL}</span>
        </Disclaimer>
      </div>
    </Screen>
  );
}

function Who() {
  const set = useApp((s) => s.set);
  const mode = useApp((s) => s.mode);
  const [step, setStep] = useState<"where" | "count">("where");
  const options: { id: "pregnant" | "baby" | "both"; title: string; icon: ReactNode }[] = [
    { id: "pregnant", title: "I’m pregnant", icon: <Sprout className="size-8 text-terra" aria-hidden /> },
    { id: "baby", title: "Baby is here", icon: <Baby className="size-8 text-terra" aria-hidden /> },
    { id: "both", title: "Pregnant, and a baby already", icon: <Users className="size-8 text-terra" aria-hidden /> },
  ];

  if (step === "count") {
    const counts = (mode === "both" ? [2, 3] : [1, 2, 3]) as readonly (1 | 2 | 3)[];
    return (
      <Ask progress={32} onBack={() => setStep("where")} section={ABOUT_KIDS} title="How many little ones?" sub={mode === "both" ? "Count the one on the way, too." : "Each one gets their own page."}>
        <div className={clsx("grid gap-3", counts.length === 2 ? "grid-cols-2" : "grid-cols-3")}>
          {counts.map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => set({ kidCount: count, extraKids: Array.from({ length: extraCount(mode, count) }, emptyExtra), screen: "setup" })}
              className={choiceClass()}
            >
              <span className="text-3xl font-semibold">{count}</span>
            </button>
          ))}
        </div>
      </Ask>
    );
  }

  return (
    <Ask progress={24} onBack={() => set({ screen: "parent" })} section={ABOUT_KIDS} title="Where are you right now?" sub="We’ll start you there.">
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => {
              if (option.id === "pregnant") {
                set({ mode: "pregnant", kidCount: 1, extraKids: [], focus: "pregnancy", screen: "setup" });
                return;
              }
              set({ mode: option.id, focus: option.id === "baby" ? "baby" : "pregnancy" });
              setStep("count");
            }}
            className={clsx(choiceClass(), option.id === "both" && "col-span-2")}
          >
            {option.icon}
            <span className="text-base leading-snug">{option.title}</span>
          </button>
        ))}
      </div>
    </Ask>
  );
}

function SexField({ label, value, onChange }: { label: string; value: string; onChange: (sex: Sex) => void }) {
  const options: { id: Sex; label: string }[] = [
    { id: "girl", label: "Girl" },
    { id: "boy", label: "Boy" },
    { id: "unknown", label: "Still a surprise" },
  ];
  return (
    <fieldset>
      {label ? <legend className="text-sm text-ink">{label}</legend> : null}
      <div className={clsx("grid gap-3", label && "mt-2")}>
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={value === option.id}
            onClick={() => onChange(option.id)}
            className={clsx("min-h-16 rounded-2xl border bg-paper text-base", value === option.id ? "border-ink text-ink" : "border-line text-ink")}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function Setup() {
  const mode = useApp((s) => s.mode);
  const due = useApp((s) => s.due);
  const birthday = useApp((s) => s.birthday);
  const babyName = useApp((s) => s.babyName);
  const pregnancySex = useApp((s) => s.pregnancySex);
  const bornSex = useApp((s) => s.bornSex);
  const extraKids = useApp((s) => s.extraKids);
  const set = useApp((s) => s.set);
  const [step, setStep] = useState(0);
  const today = toISODate(new Date());
  const needDue = mode !== "baby";
  const needBirth = mode !== "pregnant";
  const field = "mt-2 h-14 w-full min-w-0 rounded-2xl border border-line bg-paper px-4 text-base text-ink placeholder:text-muted";
  const beats = [
    ...(needDue ? (["due", "due-who"] as const) : []),
    ...(needBirth ? (["child"] as const) : ["name" as const]),
    ...extraKids.map((_, index) => `extra-${index}` as const),
  ];
  const beat = beats[step] ?? "name";
  const total = beats.length;
  const extraIndex = beat.startsWith("extra-") ? Number(beat.slice(6)) : -1;
  const bornTotal = (needBirth ? 1 : 0) + extraKids.length;
  const bornIndex = beat === "child" ? 1 : extraIndex >= 0 ? extraIndex + 2 : 0;

  function birthdayError(value: string, name: string, sex: string): string {
    if (!name.trim()) return "Add their name.";
    if (!value) return "Add the birthday.";
    if (!parseDateOnly(value)) return "That birthday doesn’t look right.";
    if (value > today) return "That birthday is still ahead.";
    const days = ageDays(value);
    if (days !== null && days > 365 * 5) return "We cover pregnancy through the early years.";
    if (!sex) return "Pick girl, boy, or still a surprise.";
    return "";
  }

  let error = "";
  if (beat === "due") {
    if (!due) error = "Add the arrival date.";
    else if (!parseDateOnly(due)) error = "That date doesn’t look right.";
    else {
      const week = gestationalWeek(due);
      if (week !== null && (week < -4 || week > 45)) error = "That date is outside a pregnancy we can map.";
    }
  } else if (beat === "due-who") {
    if (!pregnancySex) error = "Pick girl, boy, or still a surprise.";
  } else if (beat === "name") {
    error = "";
  } else if (beat === "child") {
    error = birthdayError(birthday, babyName, bornSex);
  } else if (extraIndex >= 0) {
    const extra = extraKids[extraIndex];
    error = birthdayError(extra?.birthday ?? "", extra?.name ?? "", extra?.sex ?? "");
  }

  const both = needDue && needBirth;
  let title = "Want to add a name?";
  let sub = "Only shows on Home. Blank is fine.";
  if (beat === "due") {
    title = "When is the baby arriving?";
    sub = both ? "This date is for the one on the way." : "That’s how we know which week you’re in.";
  } else if (beat === "due-who") {
    title = "Do you know if it’s a girl or a boy?";
    sub = "Still a surprise is a fine answer.";
  } else if (bornIndex > 0) {
    sub = "We’ll keep this between us.";
    const which = bornIndex === 1 ? "first" : bornIndex === 2 ? "second" : "third";
    if (both && bornTotal === 1) title = "About the child you already have";
    else if (bornTotal === 1) title = "About your child";
    else if (both) title = bornIndex === 1 ? "About the child you already have" : "About your other child";
    else title = `Your ${which} child`;
  }

  return (
    <Ask progress={40 + (step / total) * 28} onBack={() => (step > 0 ? setStep(step - 1) : set({ screen: "who" }))} section={ABOUT_KIDS} title={title} sub={sub}>
      <div className="space-y-5">
        {beat === "due" ? (
          <label className="block">
            <span className="text-sm text-ink">Arrival date</span>
            <input type="date" value={due} onChange={(e) => set({ due: e.target.value })} className={field} />
          </label>
        ) : null}
        {beat === "due-who" ? <SexField label="" value={pregnancySex} onChange={(sex) => set({ pregnancySex: sex })} /> : null}
        {beat === "name" ? (
          <label className="block">
            <span className="text-sm text-ink">Name</span>
            <input value={babyName} maxLength={40} autoComplete="off" placeholder="First name" onChange={(e) => set({ babyName: e.target.value })} className={field} />
          </label>
        ) : null}
        {beat === "child" ? (
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm text-ink">Name</span>
              <input value={babyName} maxLength={40} autoComplete="off" placeholder="First name" onChange={(e) => set({ babyName: e.target.value })} className={field} />
            </label>
            <label className="block">
              <span className="text-sm text-ink">Birthday</span>
              <input type="date" value={birthday} max={today} onChange={(e) => set({ birthday: e.target.value })} className={field} />
            </label>
            <SexField label="Girl or boy?" value={bornSex} onChange={(sex) => set({ bornSex: sex })} />
          </div>
        ) : null}
        {extraIndex >= 0 && extraKids[extraIndex] ? (
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm text-ink">Name</span>
              <input
                value={extraKids[extraIndex].name}
                maxLength={40}
                placeholder="First name"
                onChange={(e) => set({ extraKids: extraKids.map((kid, i) => (i === extraIndex ? { ...kid, name: e.target.value } : kid)) })}
                className={field}
              />
            </label>
            <label className="block">
              <span className="text-sm text-ink">Birthday</span>
              <input
                type="date"
                value={extraKids[extraIndex].birthday}
                max={today}
                onChange={(e) => set({ extraKids: extraKids.map((kid, i) => (i === extraIndex ? { ...kid, birthday: e.target.value } : kid)) })}
                className={field}
              />
            </label>
            <SexField
              label="Girl or boy?"
              value={extraKids[extraIndex].sex}
              onChange={(sex) => set({ extraKids: extraKids.map((kid, i) => (i === extraIndex ? { ...kid, sex } : kid)) })}
            />
          </div>
        ) : null}
      </div>
      {error ? <p className="mt-4 text-sm text-terra">{error}</p> : null}
      <Btn className="mt-6 h-14 w-full" disabled={Boolean(error)} onClick={() => (step < total - 1 ? setStep(step + 1) : set({ screen: "quiz", quizIndex: 0 }))}>
        Next
      </Btn>
    </Ask>
  );
}

function parentError(input: { name: string; birthday: string; email: string; city: string; region: string; country: string }): string {
  const today = toISODate(new Date());
  if (!input.name.trim()) return "Add your name.";
  if (!input.birthday) return "Add your birthday.";
  if (!parseDateOnly(input.birthday)) return "That birthday doesn’t look right.";
  if (input.birthday > today) return "That birthday is still ahead.";
  const age = ageDays(input.birthday);
  if (age !== null && age < 13 * 365) return "Use the parent’s birthday.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) return "Add a real email.";
  if (!input.city.trim()) return "Add your city.";
  if (input.country !== "United States" && input.country !== "Canada") return "Choose your country.";
  if (!input.region.trim()) return input.country === "Canada" ? "Choose your province." : "Choose your state.";
  return "";
}

function Parent() {
  const onboarded = useApp((s) => s.onboarded);
  const parentName = useApp((s) => s.parentName);
  const parentBirthday = useApp((s) => s.parentBirthday);
  const parentEmail = useApp((s) => s.parentEmail);
  const parentCity = useApp((s) => s.parentCity);
  const parentRegion = useApp((s) => s.parentRegion);
  const parentCountry = useApp((s) => s.parentCountry);
  const set = useApp((s) => s.set);
  const today = toISODate(new Date());
  const error = parentError({ name: parentName, birthday: parentBirthday, email: parentEmail, city: parentCity, region: parentRegion, country: parentCountry });
  const field = "mt-2 h-14 w-full min-w-0 rounded-2xl border border-line bg-paper px-4 text-base text-ink placeholder:text-muted";
  const regions = parentCountry === "Canada" ? CA_PROVINCES : parentCountry === "United States" ? US_STATES : [];

  return (
    <Ask progress={12} onBack={() => set({ screen: onboarded ? "profile" : "welcome" })} section={ABOUT_YOU} title="A few basics" sub="Just so we know who this is for.">
      <div className="space-y-5">
        <label className="block">
          <span className="text-sm font-medium text-ink">Your name</span>
          <input value={parentName} maxLength={60} autoComplete="name" placeholder="First and last" onChange={(e) => set({ parentName: e.target.value })} className={field} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink">Your birthday</span>
          <input type="date" value={parentBirthday} max={today} autoComplete="bday" onChange={(e) => set({ parentBirthday: e.target.value })} className={field} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink">Email</span>
          <input type="email" inputMode="email" value={parentEmail} maxLength={80} autoComplete="email" placeholder="you@email.com" onChange={(e) => set({ parentEmail: e.target.value })} className={field} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink">Country</span>
          <select value={parentCountry === "United States" || parentCountry === "Canada" ? parentCountry : ""} autoComplete="country-name" onChange={(e) => set({ parentCountry: e.target.value, parentRegion: "" })} className={field}>
            <option value="">Select</option>
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-sm font-medium text-ink">City</span>
            <input value={parentCity} maxLength={40} autoComplete="address-level2" onChange={(e) => set({ parentCity: e.target.value })} className={field} />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-ink">{parentCountry === "Canada" ? "Province" : "State"}</span>
            <select value={regions.includes(parentRegion) ? parentRegion : ""} autoComplete="address-level1" onChange={(e) => set({ parentRegion: e.target.value })} className={field}>
              <option value="">Select</option>
              {regions.map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </label>
        </div>
      </div>
      {error ? <p className="mt-4 text-sm text-terra">{error}</p> : <p className="mt-4 text-sm text-muted">This stays between us.</p>}
      <Btn className="mt-6 h-14 w-full" disabled={Boolean(error)} onClick={() => (onboarded ? set({ screen: "profile" }) : set({ screen: "who" }))}>
        {onboarded ? "Save" : "Next"}
      </Btn>
    </Ask>
  );
}

function Quiz() {
  const quizIndex = useApp((s) => s.quizIndex);
  const tags = useApp((s) => s.tags);
  const onboarded = useApp((s) => s.onboarded);
  const mode = useApp((s) => s.mode);
  const birthday = useApp((s) => s.birthday);
  const set = useApp((s) => s.set);
  const journey = journeyFor(mode, birthday);
  const children = useApp((s) => s.children);
  const askStyle = askStyleFor(mode, children);
  const questions = questionsFor(journey, askStyle);
  const question = questions[quizIndex] ?? questions[questions.length - 1];
  const [foodStep, setFoodStep] = useState<"main" | "avoid" | "other">("main");
  const [note, setNote] = useState(tags.foodNote);

  useEffect(() => {
    setFoodStep("main");
  }, [quizIndex]);

  function finish(next: Tags) {
    const settled = journey === "solids" || journey === "toddler" ? { ...next, feeding: "undecided" as const } : next;
    if (quizIndex >= questions.length - 1) {
      const state = useApp.getState();
      const nextChildren = state.children.length ? state.children : draftToChildren(state);
      const activeChildId = nextChildren.some((child) => child.id === state.activeChildId) ? state.activeChildId : (nextChildren[0]?.id ?? "");
      const count = state.kidCount || nextChildren.length;
      set({
        tags: { ...settled, experience: count > 1 ? "experienced" : "first" },
        children: nextChildren,
        activeChildId,
        screen: "home",
        onboarded: true,
        preview: null,
        quizIndex: 0,
        revisitQuiz: !questions.some((item) => item.key === "style"),
      });
      return;
    }
    set({ tags: settled, quizIndex: quizIndex + 1 });
  }

  function choose(value: string) {
    if (question.key === "food") {
      if (value === "avoid") {
        set({ tags: { ...tags, food: "avoid", foodNote: "" } });
        setFoodStep("avoid");
        return;
      }
      if (value === "other") {
        setNote(tags.food === "other" ? tags.foodNote : "");
        set({ tags: { ...tags, food: "other", avoid: "" } });
        setFoodStep("other");
        return;
      }
      const food = (value === "vegetarian" || value === "vegan" || value === "easy" ? value : "easy") as Food;
      finish({ ...tags, food, avoid: "", foodNote: "" });
      return;
    }
    finish({ ...tags, [question.key]: value } as Tags);
  }

  const onFoodFollow = question.key === "food" && foodStep !== "main";
  const wide = question.options.some((option) => option.hint) || question.options.length > 4;

  return (
    <Ask
      progress={70 + ((quizIndex + 1) / questions.length) * 30}
      onBack={() => {
        if (onFoodFollow) {
          setFoodStep("main");
          return;
        }
        if (quizIndex > 0) set({ quizIndex: quizIndex - 1 });
        else set({ screen: onboarded ? "profile" : "setup" });
      }}
      section={ABOUT_PARENT}
      title={foodStep === "avoid" ? "Anything we should leave out?" : foodStep === "other" ? "Tell us a little more" : question.prompt}
      sub={question.key === "style" && foodStep === "main" ? "No right answer. Most of us are a mix." : question.key === "gear" && foodStep === "main" ? "Stroller, carrier, the big stuff. Not sports." : undefined}
    >
      {foodStep === "other" ? (
        <div>
          <textarea value={note} maxLength={80} onChange={(e) => setNote(e.target.value)} placeholder="A few words" className="h-28 w-full rounded-2xl border border-line bg-paper p-4" />
          <Btn className="mt-4 h-14 w-full" disabled={!note.trim()} onClick={() => finish({ ...tags, food: "other", avoid: "", foodNote: note.trim() })}>
            Next
          </Btn>
        </div>
      ) : foodStep === "avoid" ? (
        <div className="grid gap-3">
          {AVOID_OPTIONS.map((option) => (
            <button key={option.value} type="button" onClick={() => finish({ ...tags, food: "avoid", avoid: option.value, foodNote: "" })} className="min-h-16 rounded-2xl border border-line bg-paper text-base">
              {option.label}
            </button>
          ))}
        </div>
      ) : (
        <div className={clsx("grid gap-3", wide ? "grid-cols-1" : "grid-cols-2")}>
          {question.options.map((option) => (
            <button key={option.value} type="button" onClick={() => choose(option.value)} className={choiceClass()}>
              <span className="text-base leading-snug">{option.label}</span>
              {option.hint ? <span className="text-sm text-muted">{option.hint}</span> : null}
            </button>
          ))}
        </div>
      )}
    </Ask>
  );
}

function catalogDress(card: Card): Card {
  if (card.kind !== "product" || !card.query) return card;
  const offer = offerFor(card.query);
  if (!offer) return card;
  return { ...card, name: offer.title, image: offer.image || card.image, price: offer.price || undefined, liveHref: offer.href, liveStore: offer.store };
}

function dress(card: Card, live?: LiveProduct): Card {
  if (!live || card.kind !== "product") return card;
  return { ...card, name: live.title, image: live.image || card.image, price: live.price || undefined, liveHref: live.href, liveStore: live.store };
}

function useLiveCards(cards: Card[]) {
  const ready = cards.map(catalogDress);
  const key = ready.map((card) => card.query ?? card.id).join("|");
  const [live, setLive] = useState<Record<string, LiveProduct>>({});
  useEffect(() => {
    const queries = [...new Set(ready.map((card) => card.query).filter((query): query is string => Boolean(query)))].slice(0, 24);
    if (!queries.length) return;
    let stop = false;
    lookupProducts({ data: { queries } })
      .then((items) => {
        if (stop) return;
        const next: Record<string, LiveProduct> = {};
        for (const item of items) next[item.query] = item;
        setLive(next);
      })
      .catch(() => undefined);
    return () => {
      stop = true;
    };
  }, [key]);
  return ready.map((card) => (card.query && live[card.query] ? dress(card, live[card.query]) : card));
}

function useHome() {
  const children = useApp((s) => s.children);
  const activeChildId = useApp((s) => s.activeChildId);
  const tags = useApp((s) => s.tags);
  const preview = useApp((s) => s.preview);
  const votes = useApp((s) => s.votes);
  const child = children.find((item) => item.id === activeChildId) ?? children[0] ?? null;
  const useStyle = children.some((item) => item.kind === "born");
  const view = buildHome({ child, tags, preview, votes, useStyle });
  return { child, children, view, useStyle };
}

function StageClip({ stageId, ageKicker, ageFigure }: { stageId: string; ageKicker: string; ageFigure: string }) {
  const pregnant = !stageId.startsWith("b");
  const infant = stageId === "b0" || stageId === "b2" || stageId === "b6" || stageId === "b4m";
  const toddler = stageId === "b15";
  let src = "/graphics/preg-early.mp4";
  let poster = "/graphics/preg-early.jpg";
  let label = "A small clay baby";
  if (pregnant) {
    const late = stageId === "p28" || stageId === "p34" || stageId === "p38";
    const mid = stageId === "p14" || stageId === "p21";
    const name = late ? "preg-late" : mid ? "preg-mid" : "preg-early";
    src = `/graphics/${name}.mp4`;
    poster = `/graphics/${name}.jpg`;
    label = "A clay baby, and the week";
  } else if (infant) {
    src = "/graphics/infant-mom.mp4";
    poster = "/graphics/infant-mom.jpg";
    label = "A clay parent holding a clay baby, and the age";
  } else {
    const band = toddler ? "toddler" : "baby";
    src = `/graphics/${band}.mp4`;
    poster = `/graphics/${band}.jpg`;
    label = "A clay child, and the age";
  }
  return (
    <div className="relative mx-auto mt-6 w-56">
      <video key={src} className="aspect-square w-full rounded-3xl object-cover" src={src} poster={poster} aria-label={label} autoPlay muted loop playsInline />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 rounded-b-3xl bg-gradient-to-t from-ink/75 to-transparent px-3 pt-10 pb-3 text-center text-paper">
        <p className="text-xs font-medium tracking-wide">{ageKicker}</p>
        <p className="font-display text-3xl leading-none">{ageFigure}</p>
      </div>
    </div>
  );
}

function NextWeeks() {
  const { view } = useHome();
  const tags = useApp((s) => s.tags);
  const preview = useApp((s) => s.preview);
  const set = useApp((s) => s.set);
  const [open, setOpen] = useState(false);
  if ("error" in view) return null;
  const pace = tags.pace;
  const count = pace === "ahead" ? 2 : pace === "figuring" || (pace === "flow" && open) ? 1 : 0;
  if (pace === "moment" || pace === "either" || pace === "flow" && !open) {
    if (pace !== "flow") return null;
    return (
      <button type="button" onClick={() => setOpen(true)} className="mt-5 block min-h-11 w-full text-center text-sm font-medium text-terra">
        What’s next
      </button>
    );
  }
  const stages = upcomingStages(view.realStageId, count);
  if (!stages.length) return null;
  const kicker = pace === "ahead" ? "Coming up" : pace === "figuring" ? "A peek" : "When you want it";
  return (
    <div className="mt-5">
      <p className="text-center text-sm font-medium text-terra">{kicker}</p>
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        {stages.map((stage) => {
          const on = preview === stage.id;
          return (
            <button key={stage.id} type="button" aria-pressed={on} onClick={() => set({ preview: on ? null : stage.id })} className={clsx("shrink-0 rounded-full px-3 py-2 text-sm", on ? "bg-ink text-paper" : "bg-paper text-ink")}>
              {stage.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RetakePrompt() {
  const revisitQuiz = useApp((s) => s.revisitQuiz);
  const revisitDismissed = useApp((s) => s.revisitDismissed);
  const set = useApp((s) => s.set);
  const { child } = useHome();
  if (!revisitQuiz || revisitDismissed || !child || child.kind !== "born") return null;
  const days = ageDays(child.birthday);
  if (days === null || days < 60) return null;
  return (
    <div className="mt-5 rounded-2xl bg-paper px-4 py-3 text-center">
      <p className="text-sm leading-relaxed">It’s been a couple of months. Want to update how you parent?</p>
      <button type="button" onClick={() => set({ screen: "quiz", quizIndex: 0 })} className="mt-2 min-h-11 text-sm font-medium text-terra">
        Update answers
      </button>
      <button type="button" onClick={() => set({ revisitDismissed: true })} className="mt-1 block min-h-11 w-full text-sm text-muted">
        Not now
      </button>
    </div>
  );
}

function Band({ children }: { children: ReactNode }) {
  return <section className="-mx-5 mt-3 border-t border-line bg-paper px-5 py-6">{children}</section>;
}

function Tile({
  image,
  kicker,
  title,
  meta,
  href,
  onClick,
}: {
  image?: string;
  kicker?: string;
  title: string;
  meta?: string;
  href?: string;
  onClick?: () => void;
}) {
  const body = (
    <>
      <span className="block aspect-square overflow-hidden rounded-2xl bg-sand">
        {image ? <img src={image} alt="" className="size-full object-cover" /> : null}
      </span>
      {kicker ? <span className="mt-2 block text-xs font-medium text-terra">{kicker}</span> : null}
      <span className="mt-0.5 block line-clamp-2 text-sm font-medium leading-snug">{title}</span>
      {meta ? <span className="mt-0.5 block truncate text-xs text-muted">{meta}</span> : null}
    </>
  );
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {body}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className="block w-full text-left">
      {body}
    </button>
  );
}

function MustHave({
  card,
  badge,
  vote,
  onVote,
  onOpen,
}: {
  card: Card;
  badge?: string;
  vote?: Vote;
  onVote: (choice: Vote) => void;
  onOpen: () => void;
}) {
  const shop = shopFor(card);
  const mark = (choice: Vote, label: string, icon: ReactNode, hot = false) => {
    const on = vote === choice;
    return (
      <button
        type="button"
        aria-label={label}
        aria-pressed={on}
        onClick={() => onVote(choice)}
        className={clsx(
          "flex min-h-11 flex-1 items-center justify-center rounded-full",
          on ? (hot ? "bg-terra text-paper" : "bg-ink text-paper") : "bg-sand text-ink",
        )}
      >
        {icon}
      </button>
    );
  };
  return (
    <article>
      <button type="button" onClick={onOpen} className="block w-full text-left">
        <span className="relative block aspect-square overflow-hidden rounded-2xl bg-sand">
          {card.image ? <img src={card.image} alt="" className="size-full object-cover" /> : null}
          {badge ? (
            <span className="absolute top-2 left-2 rounded-full bg-paper px-2.5 py-1 text-xs font-medium text-ink">{badge}</span>
          ) : null}
        </span>
        <span className="mt-2 block line-clamp-2 text-sm font-medium leading-snug">{card.name}</span>
        <span className="mt-0.5 line-clamp-2 block text-xs leading-snug text-muted">{card.line}</span>
        {card.price ? <span className="mt-1 block text-xs font-medium">{card.price}</span> : null}
      </button>
      <div className="mt-2 flex gap-1">
        {mark("skip", "Not for me", <ThumbsDown className="size-4" aria-hidden />)}
        {mark("used", "Got it", <ThumbsUp className="size-4" aria-hidden />)}
        {mark("wish", "Save to wishlist", <Heart className={clsx("size-4", vote === "wish" && "fill-current")} aria-hidden />, true)}
      </div>
      {shop ? (
        <a
          href={shop.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex min-h-11 w-full items-center justify-center rounded-full bg-terra px-3 text-sm font-medium text-paper"
        >
          Shop now
        </a>
      ) : null}
    </article>
  );
}

function Home() {
  const { view, child } = useHome();
  const tags = useApp((s) => s.tags);
  const set = useApp((s) => s.set);
  const wishlist = useApp((s) => s.wishlist);
  const votes = useApp((s) => s.votes);
  const vote = useApp((s) => s.vote);
  const monthDay = new Date().toLocaleDateString(undefined, { month: "long", day: "numeric" });
  const day = Math.floor(Date.now() / 86_400_000);
  const lists = shopLists("error" in view ? "p4" : view.stageId, day, child?.name ?? "");
  const live = useLiveCards(lists.flatMap((list) => list.cards));

  if ("error" in view) {
    return (
      <Screen className="pb-32 pt-16">
        <p>{view.error}</p>
        <Btn className="mt-6" onClick={() => set({ screen: "profile" })}>Profile</Btn>
      </Screen>
    );
  }

  const badges = pickBadges(live);
  const fresh = live.find((card) => !badges[card.id]);
  if (fresh) badges[fresh.id] = "New";
  const dressed = lists.map((list) => ({
    ...list,
    cards: list.cards.map((card) => live.find((item) => item.id === card.id) ?? card),
  }));
  const art = view.fruit ? fruitArt(view.fruit) : null;
  const stageLine = view.milestone ?? view.blurb[0];
  const waiting = tags.help === "wait" ? view.ranked.filter((card) => card.kind === "task") : [];
  const shelfTitle = view.stageId.startsWith("p") ? "" : view.stageId === "b15" ? "For them" : "For baby";

  return (
    <Screen className="pb-32 pt-0">
      <div className="hero-wash -mx-5 px-5 pb-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex size-12 items-center justify-center rounded-full bg-mist">
            <Mark className="size-10" />
          </div>
          <p className="text-lg font-medium">{monthDay}</p>
          {tags.pace === "moment" ? (
            <span className="size-11" aria-hidden />
          ) : (
            <button type="button" aria-label="Open stages" onClick={() => set({ screen: "timeline" })} className="flex size-11 items-center justify-center rounded-full">
              <CalendarDays className="size-6" />
            </button>
          )}
        </div>
        <NextWeeks />
        <StageClip stageId={view.stageId} ageKicker={view.heroKicker} ageFigure={view.heroFigure} />
        {view.sub ? <p className="mt-4 text-center text-lg">{view.sub}</p> : null}
        {view.note ? <p className="mt-2 text-center text-sm leading-relaxed text-muted">{view.note}</p> : null}
        <article className="mt-6 border-t border-line pt-5 text-center">
          <p className="text-sm font-medium text-terra">This stage</p>
          <h2 className="mt-2 text-lg font-semibold leading-snug">{stageLine}</h2>
          {tags.load === "full" && !view.previewing ? (
            <p className="mt-2 text-sm text-muted">Kept short.</p>
          ) : null}
          {view.fruit ? (
            <div className="mt-4 flex items-center gap-3 text-left">
              {art ? <img src={art} alt="" className="size-16 shrink-0 rounded-2xl object-cover" /> : null}
              <p className="text-sm leading-snug">About the size of {view.fruit}.</p>
            </div>
          ) : null}
        </article>
        <RetakePrompt />
        {view.previewing ? (
          <div className="mt-5 rounded-2xl bg-paper px-4 py-3 text-center">
            <p className="text-sm leading-relaxed">Previewing another stage. Today is still {view.realHeadline}.</p>
            <button type="button" onClick={() => set({ preview: null })} className="mt-1 min-h-11 text-sm font-medium text-terra">Back to today</button>
          </div>
        ) : null}
      </div>
      {[
        <StageHeadlines key="headlines" stageId={view.stageId} />,
        <Untold key="real" stageId={view.stageId} />,
        !view.stageId.startsWith("p") ? <AfterBirth key="you" stageId={view.stageId} /> : null,
        view.stageId === "b15" ? <Indoor key="inside" /> : null,
        <div key="must-haves">
          {shelfTitle ? <SectionHead title={shelfTitle} /> : null}
          <div className="space-y-6">
            {dressed.map((list) => (
              <section key={list.id}>
                <SectionHead as="h3" title={list.title} />
                <div className="rail picks">
                  {list.cards.map((card) => (
                    <MustHave
                      key={card.id}
                      card={card}
                      badge={badges[card.id]}
                      vote={votes[card.id]}
                      onVote={(choice) => vote(card.id, choice, { id: card.id, name: card.name, line: card.line, why: card.why, tags: card.tags, kind: card.kind, savedAt: "", query: card.query })}
                      onOpen={() => set({ screen: "detail", detailId: card.id })}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>,
        waiting.length ? (
          <div key="later">
            <SectionHead title="Later" />
            <ul>
              {waiting.slice(0, 3).map((card) => (
                <li key={card.id} className="border-t border-line">
                  <button type="button" onClick={() => set({ screen: "detail", detailId: card.id })} className="block min-h-11 w-full py-3 text-left text-sm font-medium">
                    {card.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null,
        view.recipes.length ? (
          <div key="eat">
            <SectionHead title={foodTitle(tags, view.stageId)} sub={foodCaption(tags, view.stageId)} />
            <div className="rail tiles">
              {view.recipes.map((recipe) => (
                <Tile key={recipe.id} image={recipe.image} kicker={recipe.slot} title={recipe.title} meta={recipe.from} href={recipe.href} />
              ))}
            </div>
          </div>
        ) : null,
        view.creators.length ? (
          <div key="follow">
            <SectionHead title="Creators like you" />
            <ul className="space-y-3">
              {view.creators.slice(0, 3).map((creator) => (
                <li key={creator.name}>
                  <a href={creator.href} target="_blank" rel="noopener noreferrer" aria-label={`${creator.name} on Instagram`} className="flex items-center gap-3">
                    <span className="relative size-12 shrink-0">
                      {creator.avatar ? (
                        <img src={creator.avatar} alt="" className="size-12 rounded-2xl object-cover" />
                      ) : (
                        <span className="flex size-12 items-center justify-center rounded-2xl bg-mist text-ink">
                          <Instagram className="size-5" aria-hidden />
                        </span>
                      )}
                      {creator.avatar ? (
                        <span className="absolute -right-1 -bottom-1 flex size-5 items-center justify-center rounded-full bg-paper">
                          <Instagram className="size-3" aria-hidden />
                        </span>
                      ) : null}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium">{creator.name}</span>
                      <span className="line-clamp-2 block text-sm leading-snug text-muted">{creator.post}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null,
      ]
        .filter(Boolean)
        .map((block, index) => (
          <Band key={index}>{block}</Band>
        ))}
      <div className="mt-4 flex flex-col">
        <button type="button" onClick={() => set({ screen: "wishlist" })} className="min-h-11 text-left text-sm font-medium text-terra">
          Wishlist{wishlist.length ? ` · ${wishlist.length}` : ""}
        </button>
        <button type="button" onClick={() => set({ screen: "mom" })} className="min-h-11 text-left text-sm font-medium text-terra">
          Meet Sage
        </button>
      </div>
    </Screen>
  );
}

function Detail() {
  const detailId = useApp((s) => s.detailId);
  const votes = useApp((s) => s.votes);
  const vote = useApp((s) => s.vote);
  const set = useApp((s) => s.set);
  const { view } = useHome();
  const ranked = "error" in view ? [] : view.ranked;
  const cards = useLiveCards(ranked);
  if ("error" in view) {
    return (
      <Screen className="pb-16 pt-8">
        <button type="button" onClick={() => set({ screen: "home", detailId: null })} className="min-h-11 text-sm font-medium text-terra">Back</button>
        <p className="mt-4">{view.error}</p>
      </Screen>
    );
  }
  const card = findCard(cards, detailId);
  if (!card) {
    return (
      <Screen className="pb-16 pt-8">
        <button type="button" onClick={() => set({ screen: "home", detailId: null })} className="min-h-11 text-sm font-medium text-terra">Back</button>
        <p className="mt-4">That one isn’t in this stage.</p>
      </Screen>
    );
  }
  const badge = pickBadges(view.ranked.filter((item) => item.kind === "product"))[card.id];
  return (
    <Screen className="pb-16 pt-8">
      <button type="button" onClick={() => set({ screen: "home", detailId: null })} className="min-h-11 text-sm font-medium text-terra">Back</button>
      <div className="mt-4">
        <ProductCard
          card={card}
          badge={badge}
          vote={votes[card.id]}
          onOpen={() => undefined}
          onVote={(choice) => vote(card.id, choice, { id: card.id, name: card.name, line: card.line, why: card.why, tags: card.tags, kind: card.kind, savedAt: "", query: card.query })}
        />
      </div>
    </Screen>
  );
}

function Timeline() {
  const { child, view } = useHome();
  const tags = useApp((s) => s.tags);
  const votes = useApp((s) => s.votes);
  const set = useApp((s) => s.set);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [soonOpen, setSoonOpen] = useState(false);
  if (!child || "error" in view) {
    return (
      <Screen className="pb-32 pt-8">
        <SectionHead as="h1" title="What’s next" />
        <p className="text-muted">Add a child to see the stages.</p>
      </Screen>
    );
  }
  const index = STAGES.findIndex((stage) => stage.id === view.realStageId);
  const later = index >= 0 ? STAGES.slice(index + 1) : [];
  const past = STAGES.slice(0, Math.max(0, index));
  const nextStages =
    tags.pace === "ahead"
      ? later
      : tags.pace === "figuring"
        ? soonOpen
          ? later
          : later.slice(0, 1)
        : tags.pace === "flow" || tags.pace === "either"
          ? soonOpen
            ? later.slice(0, 3)
            : later.slice(0, 1)
          : [];
  const stageBlock = (stage: (typeof STAGES)[number], first: boolean, heading = true) => {
    const sex = child.sex === "girl" || child.sex === "boy" ? child.sex : "";
    const products = learnFeed(stage.id, tags, votes, sex).cards.filter((card) => card.kind === "product");
    const shown = open[`more:${stage.id}`] ? products : products.slice(0, 3);
    return (
      <article key={stage.id} className={first ? "" : "mt-8 border-t border-line pt-6"}>
        {heading ? <h3 className="font-display text-2xl font-medium leading-snug tracking-tight">{stage.label}</h3> : null}
        {stage.milestone ? <p className="mt-3 text-sm leading-relaxed">{stage.milestone}</p> : null}
        <div className="mt-2">
          {shown.map((card) => (
            <ShelfRow key={card.id} card={card} onOpen={() => set({ screen: "detail", detailId: card.id, preview: stage.id })} />
          ))}
        </div>
        {products.length > 3 ? (
          <button type="button" onClick={() => setOpen((prev) => ({ ...prev, [`more:${stage.id}`]: !prev[`more:${stage.id}`] }))} className="min-h-11 text-sm font-medium text-terra">
            {open[`more:${stage.id}`] ? "Show less" : "More"}
          </button>
        ) : null}
      </article>
    );
  };
  return (
    <Screen className="pb-32 pt-8">
      <SectionHead as="h1" title="What’s next" />
      {nextStages.length ? (
        <section className="mt-6">
          {nextStages.map((stage, stageIndex) => stageBlock(stage, stageIndex === 0))}
        </section>
      ) : null}
      {tags.pace === "moment" ? (
        <p className="mt-8 text-sm leading-relaxed text-muted">You asked to stay in this week. Later stages stay off.</p>
      ) : null}
      {later.length > nextStages.length ? (
        <button type="button" onClick={() => setSoonOpen((value) => !value)} className="mt-2 min-h-11 text-sm font-medium text-terra">
          {soonOpen ? "Just the next one" : "More stages"}
        </button>
      ) : null}
      {past.length ? (
        <section className="mt-10">
          <p className="text-sm font-medium text-terra">Then</p>
          <ul className="mt-2">
            {past.map((stage) => (
              <li key={stage.id} className="border-t border-line">
                <button
                  type="button"
                  onClick={() => setOpen((prev) => ({ ...prev, [stage.id]: !prev[stage.id] }))}
                  className="flex min-h-11 w-full items-center justify-between py-2 text-left"
                >
                  <span className="font-medium">{stage.label}</span>
                  <span className="text-sm text-muted">{open[stage.id] ? "Hide" : "Open"}</span>
                </button>
                {open[stage.id] ? <div className="pb-4">{stageBlock(stage, true, false)}</div> : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </Screen>
  );
}

function Circle() {
  const { view } = useHome();
  const stageId: StageId = "error" in view ? "b0" : view.stageId;
  const label = "error" in view ? "This stage" : stageMeta(stageId).label;
  return (
    <Screen className="pb-32 pt-8">
      <SectionHead as="h1" title="Someone else is wondering too." />
      <div className="mt-2">
        <CircleChat stageId={stageId} stageLabel={label} />
      </div>
    </Screen>
  );
}

function Profile() {
  const children = useApp((s) => s.children);
  const activeChildId = useApp((s) => s.activeChildId);
  const tags = useApp((s) => s.tags);
  const parentName = useApp((s) => s.parentName);
  const parentCity = useApp((s) => s.parentCity);
  const parentRegion = useApp((s) => s.parentRegion);
  const parentCountry = useApp((s) => s.parentCountry);
  const set = useApp((s) => s.set);
  const reset = useApp((s) => s.reset);
  const [editing, setEditing] = useState<string | null>(null);
  const [confirm, setConfirm] = useState(false);
  const today = toISODate(new Date());

  function saveChild(next: Child) {
    const exists = children.some((child) => child.id === next.id);
    const list = exists ? children.map((child) => (child.id === next.id ? next : child)) : [...children, next];
    set({ children: list, activeChildId: next.id, preview: null, tags: { ...tags, experience: list.length > 1 ? "experienced" : "first" } });
    setEditing(null);
  }

  function removeChild(id: string) {
    const list = children.filter((child) => child.id !== id);
    set({
      children: list,
      activeChildId: activeChildId === id ? (list[0]?.id ?? "") : activeChildId,
      preview: null,
      tags: { ...tags, experience: list.length > 1 ? "experienced" : "first" },
    });
    setEditing(null);
  }

  return (
    <Screen className="pb-32 pt-8">
      <SectionHead as="h1" title="Profile" />
      <article className="mt-6 rounded-3xl border border-line bg-paper p-4">
        <p className="text-sm text-muted">You</p>
        <p className="mt-1 font-display text-2xl">{parentName.trim() || "Your name"}</p>
        <p className="mt-1 text-sm text-muted">{[parentCity, parentRegion, parentCountry].map((part) => part.trim()).filter(Boolean).join(", ") || "City, state, country"}</p>
        <Btn variant="line" className="mt-4 w-full" onClick={() => set({ screen: "parent" })}>Edit your details</Btn>
      </article>
      <section className="mt-8">
        <SectionHead title="Kids" />
        <div className="mt-3 space-y-3">
          {children.map((child) => (
            <article key={child.id} className="rounded-3xl border border-line bg-paper p-4">
              {editing === child.id ? (
                <ChildForm child={child} today={today} canRemove={children.length > 1} onCancel={() => setEditing(null)} onSave={saveChild} onRemove={() => removeChild(child.id)} />
              ) : (
                <>
                  <p className="font-display text-2xl">{chipLabel(child)}</p>
                  <p className="mt-1 text-sm text-muted">{childStageLine(child)}</p>
                  <div className="mt-3 flex gap-2">
                    {child.id !== activeChildId ? (
                      <Btn className="flex-1" onClick={() => set({ activeChildId: child.id, preview: null, screen: "home" })}>Use this stage</Btn>
                    ) : null}
                    <Btn variant="line" className="flex-1" onClick={() => setEditing(child.id)}>Edit</Btn>
                  </div>
                </>
              )}
            </article>
          ))}
        </div>
        {editing === "new" ? (
          <article className="mt-3 rounded-3xl border border-line bg-paper p-4">
            <p className="font-display text-2xl">Another child</p>
            <ChildForm child={{ id: newChildId(), name: "", kind: "born", due: "", birthday: "", sex: "" }} today={today} canRemove={false} onCancel={() => setEditing(null)} onSave={saveChild} onRemove={() => setEditing(null)} />
          </article>
        ) : (
          <Btn variant="line" className="mt-4 w-full" onClick={() => setEditing("new")}>Add a child</Btn>
        )}
      </section>
      <Btn className="mt-8 w-full" onClick={() => set({ screen: "quiz", quizIndex: 0 })}>Change your answers</Btn>
      <Btn variant="line" className="mt-3 w-full" onClick={() => set({ screen: "wishlist" })}>Wishlist</Btn>
      {confirm ? (
        <div className="mt-8 rounded-3xl border border-line bg-paper p-4">
          <p>Clear kids, quiz, and votes on this device?</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Btn variant="sand" onClick={() => setConfirm(false)}>Cancel</Btn>
            <Btn variant="ink" onClick={() => { reset(); setConfirm(false); }}>Clear</Btn>
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => setConfirm(true)} className="mt-6 min-h-11 text-sm text-muted">Clear this device</button>
      )}
    </Screen>
  );
}

function Wishlist() {
  const wishlist = useApp((s) => s.wishlist);
  const set = useApp((s) => s.set);
  return (
    <Screen className="pb-32 pt-8">
      <button type="button" onClick={() => set({ screen: "home" })} className="min-h-11 text-sm font-medium text-terra">Home</button>
      <SectionHead as="h1" className="mt-2" title="Wishlist" />
      {wishlist.length === 0 ? <p className="mt-4 text-muted">Nothing saved yet. Tap the heart on the shopping list.</p> : null}
      <ul className="mt-4 divide-y divide-line">
        {wishlist.map((item) => (
          <li key={item.id} className="py-4">
            <button type="button" onClick={() => set({ screen: "detail", detailId: item.id })} className="text-left">
              <p className="font-medium">{item.name}</p>
              <p className="mt-1 text-sm text-muted">{item.line}</p>
            </button>
          </li>
        ))}
      </ul>
    </Screen>
  );
}

function ChildForm({
  child,
  today,
  canRemove,
  onCancel,
  onSave,
  onRemove,
}: {
  child: Child;
  today: string;
  canRemove: boolean;
  onCancel: () => void;
  onSave: (child: Child) => void;
  onRemove: () => void;
}) {
  const [draft, setDraft] = useState(child);
  let error = "";
  if (!draft.name.trim()) error = "Add their name.";
  else if (!draft.sex) error = "Pick girl, boy, or still a surprise.";
  else if (draft.kind === "pregnant") {
    if (!draft.due) error = "Add the arrival date.";
    else if (!parseDateOnly(draft.due)) error = "That date doesn’t look right.";
  } else if (!draft.birthday) error = "Add the birthday.";
  else if (!parseDateOnly(draft.birthday)) error = "That birthday doesn’t look right.";
  else if (draft.birthday > today) error = "That birthday is still ahead.";
  const field = "mt-2 h-12 w-full rounded-2xl border border-line bg-cream px-4 text-lg font-normal";
  return (
    <div className="mt-3 space-y-4">
      <label className="block text-sm font-medium">
        Name
        <input value={draft.name} maxLength={40} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className={field} />
      </label>
      <SexField label="Girl or boy?" value={draft.sex} onChange={(sex) => setDraft({ ...draft, sex })} />
      {draft.kind === "pregnant" ? (
        <label className="block text-sm font-medium">
          Due date
          <input type="date" value={draft.due} onChange={(e) => setDraft({ ...draft, due: e.target.value })} className={field} />
        </label>
      ) : (
        <label className="block text-sm font-medium">
          Birthday
          <input type="date" value={draft.birthday} max={today} onChange={(e) => setDraft({ ...draft, birthday: e.target.value })} className={field} />
        </label>
      )}
      {error ? <p className="text-sm text-terra">{error}</p> : null}
      <div className="grid grid-cols-2 gap-2">
        <Btn variant="sand" onClick={onCancel}>Cancel</Btn>
        <Btn disabled={Boolean(error)} onClick={() => onSave({ ...draft, name: draft.name.trim(), due: draft.kind === "pregnant" ? draft.due : "", birthday: draft.kind === "born" ? draft.birthday : "" })}>Save</Btn>
      </div>
      {canRemove ? (
        <button type="button" onClick={onRemove} className="min-h-11 text-sm font-medium text-terra">Remove this child</button>
      ) : null}
    </div>
  );
}

function Nav() {
  const screen = useApp((s) => s.screen);
  const set = useApp((s) => s.set);
  const items: { id: "home" | "timeline" | "mom" | "circle" | "profile"; label: string; icon: typeof House }[] = [
    { id: "home", label: "Home", icon: House },
    { id: "timeline", label: "Stages", icon: CalendarDays },
    { id: "mom", label: "AI Mom", icon: MessageCircle },
    { id: "circle", label: "Circle", icon: Users },
    { id: "profile", label: "Profile", icon: UserRound },
  ];
  return (
    <div className="fixed inset-x-0 bottom-0 z-40">
      <div className="safe-bottom mx-auto w-full max-w-md px-4">
        <nav className="mb-3 grid grid-cols-5 rounded-full border border-line bg-paper px-1 py-1">
          {items.map((item) => {
            const on = screen === item.id;
            const Icon = item.icon;
            return (
              <button key={item.id} type="button" aria-current={on ? "page" : undefined} onClick={() => set({ screen: item.id, detailId: null })} className={clsx("flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-full text-xs", on ? "text-terra" : "text-muted")}>
                <Icon className="size-5" aria-hidden />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
