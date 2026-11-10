import type { ButtonHTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";

export function Mark({ className }: { className?: string }) {
  return <img src="/logo.png" alt="" className={clsx("object-contain", className)} />;
}

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <Mark className="size-9" />
      <div>
        <p className={clsx("font-display text-xl leading-none", light ? "text-paper" : "text-ink")}>
          ThisStage
        </p>
        <p className={clsx("mt-1 text-sm", light ? "text-sand" : "text-muted")}>Your stage, filtered</p>
      </div>
    </div>
  );
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "sand" | "ink" | "line";
};

export function Btn({ variant = "primary", className, type = "button", ...props }: BtnProps) {
  return (
    <button
      type={type}
      className={clsx(
        "inline-flex min-h-12 items-center justify-center rounded-full px-5 text-base font-medium transition-opacity",
        "disabled:cursor-not-allowed disabled:opacity-40",
        variant === "primary" && "bg-terra text-paper",
        variant === "ghost" && "bg-transparent text-ink",
        variant === "sand" && "bg-sand text-ink",
        variant === "ink" && "bg-ink text-paper",
        variant === "line" && "border border-line bg-paper text-ink",
        className,
      )}
      {...props}
    />
  );
}

export function SectionHead({
  title,
  sub,
  aside,
  as = "h2",
  className,
}: {
  title: string;
  sub?: string;
  aside?: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const Tag = as;
  const size = as === "h1" ? "text-5xl" : as === "h3" ? "text-2xl" : "text-3xl";
  return (
    <header className={clsx("mb-4", className)}>
      <div className="flex items-end justify-between gap-4">
        <Tag className={clsx("font-display font-medium leading-none tracking-tight text-ink", size)}>{title}</Tag>
        {aside ? <div className="shrink-0 pb-0.5 text-sm tabular-nums text-muted">{aside}</div> : null}
      </div>
      <div className="mt-3 h-0.5 w-10 rounded-full bg-terra" aria-hidden />
      {sub ? <p className="mt-2 text-sm leading-snug text-muted">{sub}</p> : null}
    </header>
  );
}

export function Screen({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx("mx-auto w-full max-w-md px-5", className)}>{children}</div>;
}

export function Disclaimer({ children }: { children: ReactNode }) {
  return <p className="text-sm leading-relaxed text-muted">{children}</p>;
}

export const MEDICAL =
  "General info, not medical advice. Ask your provider about your pregnancy or child.";
