import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function LegalLinks() {
  return (
    <nav className="legal-links" aria-label="Informação legal">
      <Link to="/termos">Termos e Condições</Link>
      <Link to="/privacidade">Política de Privacidade</Link>
      <Link to="/revisoes">Política de Revisões</Link>
    </nav>
  );
}

export function LegalFooter({ children, tagline }: { children?: ReactNode; tagline?: boolean }) {
  return (
    <footer className="foot">
      {children}
      <LegalLinks />
      <p className="legal">
        MOATOIO — Uma marca Ajuda Mais. © {new Date().getFullYear()}
        {tagline && (
          <>
            <br />
            Uma fotografia do produto, um vídeo com o produto.
          </>
        )}
      </p>
    </footer>
  );
}
