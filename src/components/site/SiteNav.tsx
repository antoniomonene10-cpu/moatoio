import { useEffect, useRef, useState } from "react";
import { BrandMark } from "./Brand";
import { WaLink } from "./WaLink";

const LINKS = [
  ["inicio", "Início"],
  ["servicos", "Serviços"],
  ["portfolio", "Portfólio"],
  ["como-funciona", "Como funciona"],
  ["faq", "FAQ"],
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const barRef = useRef<HTMLElement>(null);

  // Reading progress bar
  useEffect(() => {
    const root = document.documentElement;
    let tick = false;
    const update = () => {
      const h = root.scrollHeight - window.innerHeight;
      const p = h > 0 ? window.scrollY / h : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${Math.min(1, p)})`;
      tick = false;
    };
    const onScroll = () => {
      if (!tick) {
        tick = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the link of the section in view
  useEffect(() => {
    const observers = Array.from(document.querySelectorAll<HTMLElement>("main section[id]")).map((s) => {
      const o = new IntersectionObserver(
        (es) => es.forEach((e) => e.isIntersecting && setActive(s.id)),
        { rootMargin: "-45% 0px -50% 0px" },
      );
      o.observe(s);
      return o;
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="nav" id="nav">
      <div className="wrap nav-in">
        <a className="brand" href="#inicio" aria-label="MOATOIO, uma marca Ajuda Mais">
          <BrandMark />
        </a>
        <nav className={open ? "links open" : "links"} id="links" aria-label="Principal">
          {LINKS.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? "on" : undefined} onClick={close}>
              {label}
            </a>
          ))}
          <WaLink className="btn gold" msg="geral">
            Fazer vídeo
          </WaLink>
        </nav>
        <button
          className="burger"
          id="burger"
          aria-label="Abrir menu"
          aria-expanded={open}
          aria-controls="links"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <div className="progress" aria-hidden="true">
        <i ref={barRef} id="bar" />
      </div>
    </header>
  );
}
