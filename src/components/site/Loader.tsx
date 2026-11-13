import { useEffect, useState } from "react";
import { media } from "@/lib/media";

// The intro loader plays once per full page load, not on in-app navigation back to "/".
let bootDone = false;

/**
 * Intro loader state: waits for fonts + images marked `data-essential`,
 * shows at least ~1.9s (0.25s with reduced motion) and never more than 4s.
 */
export function useBootLoader() {
  const [loading, setLoading] = useState(!bootDone);
  const [mounted, setMounted] = useState(!bootDone);

  useEffect(() => {
    if (bootDone) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const MIN = reduce ? 250 : 1900;
    const MAX = 4000;
    const timers: number[] = [];
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      bootDone = true;
      setLoading(false);
      timers.push(window.setTimeout(() => setMounted(false), 700));
    };
    // performance.now() counts from navigation start, like the original inline script.
    const whenReady = () => timers.push(window.setTimeout(finish, Math.max(0, MIN - performance.now())));

    const tasks: Promise<unknown>[] = [];
    if (document.fonts?.ready) tasks.push(document.fonts.ready);
    document.querySelectorAll<HTMLImageElement>("img[data-essential]").forEach((img) => {
      tasks.push(img.decode ? img.decode().catch(() => undefined) : Promise.resolve());
    });
    Promise.all(tasks).then(whenReady, whenReady);
    timers.push(window.setTimeout(finish, MAX));

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  return { loading, mounted };
}

export function Loader({ done }: { done: boolean }) {
  return (
    <div id="loader" className={done ? "done" : undefined} role="status" aria-live="polite" aria-label="A carregar MOATOIO">
      <div className="mark">
        <img src={media("img/ui/logo-loader.jpg")} alt="" width={500} height={500} decoding="async" fetchPriority="high" />
        <span className="glint" />
      </div>
      <div className="name">MOATOIO</div>
      <div className="rule" />
      <p className="tag">Uma foto do produto, um vídeo do produto</p>
    </div>
  );
}
