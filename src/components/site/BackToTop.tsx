import { useEffect, useState } from "react";

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY >= 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      className="top"
      id="top"
      aria-label="Voltar ao topo"
      hidden={!show}
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      }}
    >
      ↑
    </button>
  );
}
