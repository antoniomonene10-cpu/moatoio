import { useEffect, type RefObject } from "react";

/** Fade/slide-in for `.rv`, `.rv-l`, `.rv-r` elements inside `rootRef` (adds `.in` once visible). */
export function useReveal(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    root.querySelectorAll<HTMLElement>(".rv,.rv-l,.rv-r").forEach((el, i) => {
      el.style.setProperty("--d", `${(i % 4) * 0.08}s`);
      io.observe(el);
    });
    const t = window.setTimeout(() => {
      root.querySelectorAll(".hero .rv-l,.hero .rv-r").forEach((e) => e.classList.add("in"));
    }, 60);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, [rootRef]);
}
