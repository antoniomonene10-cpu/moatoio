import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { media } from "../lib/media";

function NotFoundComponent() {
  return (
    <div className="e404-page">
      <main className="e404">
        <img
          src={media("img/ui/404.webp")}
          alt="404 — Página não encontrada. A página que procura pode ter sido removida, mudado de endereço ou não existe."
          width={1400}
          height={933}
        />
        <h1 className="sr">Página não encontrada</h1>
        <Link to="/" aria-label="Voltar ao início">
          <span className="sr">Voltar ao início</span>
        </Link>
      </main>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <main className="error-404">
      <p className="error-404__code">Erro</p>
      <h1>Esta página não carregou</h1>
      <p>Algo correu mal do nosso lado. Tenta novamente ou volta ao início.</p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <button
          className="error-404__button"
          onClick={() => {
            router.invalidate();
            reset();
          }}
        >
          Tentar novamente
        </button>
        <a className="error-404__button" href="/">
          Voltar ao início
        </a>
      </div>
    </main>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    // Each content route sets its own title/description/og tags. Never add og:image here.
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "MOATOIO" },
      { name: "description", content: "Vídeos e fotografias publicitárias a partir de uma fotografia do produto." },
      { name: "author", content: "MOATOIO" },
      { name: "theme-color", content: "#080808" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Manrope:wght@600;800&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/img/ui/favicon-32.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/img/ui/favicon-192.png" },
      { rel: "apple-touch-icon", href: "/img/ui/apple-touch-icon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-MZ">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
