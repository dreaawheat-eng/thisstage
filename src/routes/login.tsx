import { createFileRoute } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <main className="grid min-h-dvh place-items-center bg-cream px-6 text-ink">
      <div className="w-full max-w-sm">
        <p className="font-display text-4xl">ThisStage</p>
        <h1 className="mt-3 font-display text-2xl">Sign in to join a circle</h1>
        <p className="mt-3 leading-relaxed text-muted">
          Your digest stays on this device. Sign-in is only for talking with parents in the same stage.
        </p>
        {authEnabled ? (
          <div className="mt-6 space-y-2">
            {GROK_PROVIDERS.map((provider) => (
              <button
                key={provider.providerId}
                type="button"
                onClick={() => signIn(provider.providerId, { callbackURL: "/" })}
                className="min-h-12 w-full rounded-full bg-ink px-4 text-sm font-medium text-paper"
              >
                Continue with {provider.label}
              </button>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-sm text-muted">Sign-in is off.</p>
        )}
      </div>
    </main>
  );
}
