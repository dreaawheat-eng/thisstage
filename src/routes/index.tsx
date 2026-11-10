import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Splash, StageApp } from "@/components/thisstage/app";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    const finish = () => {
      if (alive) setReady(true);
    };
    const unsub = useApp.persist.onFinishHydration(finish);
    const pending = useApp.persist.rehydrate() as void | Promise<void>;
    if (pending) void pending.then(finish, finish);
    if (useApp.persist.hasHydrated()) finish();
    return () => {
      alive = false;
      unsub();
    };
  }, []);

  if (!ready) return <Splash />;
  return <StageApp />;
}
