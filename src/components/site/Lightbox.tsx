import { useEffect, useRef } from "react";

export type LightboxItem = { src: string; alt: string };

export function Lightbox({ item, onClose }: { item: LightboxItem | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!item) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [item, onClose]);

  return (
    <div
      className="lb"
      id="lb"
      hidden={!item}
      role="dialog"
      aria-modal="true"
      aria-label="Fotografia ampliada"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button aria-label="Fechar" id="lbx" ref={closeRef} onClick={onClose}>
        ×
      </button>
      {item && <img src={item.src} alt={item.alt} />}
    </div>
  );
}
