import { Fragment, useEffect, useRef, type ReactNode } from "react";

const PAUSE_EVENTS = ["pointerdown", "touchstart", "mouseenter", "focusin"] as const;
const RESUME_EVENTS = ["pointerup", "touchend", "mouseleave", "focusout"] as const;

/**
 * Horizontal infinite reel: content is rendered 3 times and the scroll position
 * wraps so the first item follows the last. `auto` slowly scrolls when visible.
 */
export function Reel({ id, label, auto = false, children }: { id: string; label: string; auto?: boolean; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let w = 0;
    let paused = false;
    let raf = 0;
    const timers: number[] = [];

    const setup = () => {
      w = el.scrollWidth / 3;
      el.scrollLeft = w;
    };
    const wrap = () => {
      if (!w) return;
      if (el.scrollLeft < w * 0.5) el.scrollLeft += w;
      else if (el.scrollLeft > w * 1.5) el.scrollLeft -= w;
    };
    const pause = () => {
      paused = true;
    };
    const resume = () => {
      timers.push(window.setTimeout(() => (paused = false), 1500));
    };

    el.addEventListener("scroll", wrap, { passive: true });
    PAUSE_EVENTS.forEach((ev) => el.addEventListener(ev, pause, { passive: true }));
    RESUME_EVENTS.forEach((ev) => el.addEventListener(ev, resume, { passive: true }));

    let io: IntersectionObserver | undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (auto && !reduce) {
      let visible = true;
      io = new IntersectionObserver((e) => (visible = e[0].isIntersecting));
      io.observe(el);
      const step = () => {
        if (visible && !paused && w) el.scrollLeft += 0.6;
        raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }

    if (document.readyState === "complete") setup();
    else window.addEventListener("load", setup);
    timers.push(window.setTimeout(setup, 300));
    const ro = new ResizeObserver(() => setup());
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", wrap);
      PAUSE_EVENTS.forEach((ev) => el.removeEventListener(ev, pause));
      RESUME_EVENTS.forEach((ev) => el.removeEventListener(ev, resume));
      window.removeEventListener("load", setup);
      timers.forEach((t) => window.clearTimeout(t));
      cancelAnimationFrame(raf);
      io?.disconnect();
      ro.disconnect();
    };
  }, [auto]);

  return (
    <div className={auto ? "reel auto" : "reel"} id={id} ref={ref} aria-label={label}>
      {[0, 1, 2].map((copy) => (
        <Fragment key={copy}>{children}</Fragment>
      ))}
    </div>
  );
}
