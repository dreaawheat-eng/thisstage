import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

export const CONTACT_EMAIL = "hello@thisstage.app";

const NAV = [
  { to: "/about", label: "About" },
  { to: "/guides", label: "Guides" },
  { to: "/contact", label: "Contact" },
] as const;

export function SitePage({ title, lede, children }: { title: string; lede?: string; children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-cream text-ink">
      <header className="mx-auto flex max-w-2xl items-center justify-between gap-4 px-5 py-5">
        <Link to="/" className="font-display text-2xl text-ink">
          ThisStage
        </Link>
        <nav className="flex gap-4 text-sm">
          {NAV.map((item) => (
            <Link key={item.to} to={item.to} className="text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-2xl px-5 pb-10">
        <h1 className="font-display text-4xl leading-tight text-ink">{title}</h1>
        {lede ? <p className="mt-3 text-lg leading-relaxed text-muted">{lede}</p> : null}
        <div className="mt-8 space-y-4 text-base leading-relaxed">{children}</div>
      </main>
      <footer className="mx-auto max-w-2xl space-y-3 px-5 pb-10 text-sm text-muted">
        <p>General info, not medical advice. Ask your provider about your pregnancy or child.</p>
        <p>
          <Link to="/privacy" className="underline">
            Privacy
          </Link>
          {" · "}
          <Link to="/disclosure" className="underline">
            Affiliate disclosure
          </Link>
          {" · "}
          <Link to="/" className="underline">
            Open the app
          </Link>
        </p>
      </footer>
    </div>
  );
}
