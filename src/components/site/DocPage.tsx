import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { BrandMark } from "./Brand";
import { LegalFooter } from "./LegalFooter";

/** Layout for the legal pages (Termos, Privacidade, Revisões). */
export function DocPage({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="docbar">
        <div className="wrap nav-in">
          <Link className="brand" to="/" aria-label="MOATOIO, voltar ao início">
            <BrandMark />
          </Link>
          <Link className="btn ghost" to="/">
            ← Voltar ao início
          </Link>
        </div>
      </header>
      <main className="doc">{children}</main>
      <LegalFooter />
    </>
  );
}
