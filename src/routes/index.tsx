import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

import { BackToTop } from "@/components/site/BackToTop";
import { BrandMark } from "@/components/site/Brand";
import { LegalFooter } from "@/components/site/LegalFooter";
import { Lightbox, type LightboxItem } from "@/components/site/Lightbox";
import { Loader, useBootLoader } from "@/components/site/Loader";
import { Reel } from "@/components/site/Reel";
import { SiteNav } from "@/components/site/SiteNav";
import { WaLink } from "@/components/site/WaLink";
import { useReveal } from "@/hooks/use-reveal";
import { media, pad2 } from "@/lib/media";
import { FAQ, INSTAGRAM_URL, TIKTOK_URL, WHATSAPP_DISPLAY } from "@/lib/site-content";

const TITLE = "MOATOIO | Vídeos e Fotografias Publicitárias em Moçambique";
const DESCRIPTION =
  "Criamos vídeos publicitários, fotografias profissionais e carrosséis para produtos usando inteligência artificial. Envia uma fotografia e pede o teu orçamento à MOATOIO.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "vídeos publicitários Moçambique, fotografias de produtos, carrosséis para redes sociais, anúncios de roupa, vídeos de moda, marketing digital Moçambique, MOATOIO",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "MOATOIO" },
      { property: "og:locale", content: "pt_MZ" },
      { property: "og:title", content: "MOATOIO | Uma fotografia do produto, um vídeo com o produto." },
      { property: "og:description", content: "Transformamos fotografias de produtos em conteúdos publicitários profissionais." },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "MOATOIO | Uma fotografia do produto, um vídeo com o produto." },
      { name: "twitter:description", content: "Transformamos fotografias de produtos em conteúdos publicitários profissionais." },
    ],
    links: [
      { rel: "preload", as: "image", href: media("img/work/w04.webp") },
      { rel: "preload", as: "image", href: media("img/ui/logo-loader.jpg") },
    ],
  }),
  component: Index,
});

const NUMS = Array.from({ length: 10 }, (_, i) => i + 1);
const PHOTOS = Array.from({ length: 20 }, (_, i) => pad2(i));

function Index() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { loading, mounted } = useBootLoader();
  const [lightbox, setLightbox] = useState<LightboxItem | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useReveal(rootRef);

  // Portfolio videos: load + play only while visible, always muted.
  useEffect(() => {
    const vids = Array.from(rootRef.current?.querySelectorAll<HTMLVideoElement>(".vi video") ?? []);
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) {
            const s = v.querySelector("source");
            if (s?.dataset.src) {
              s.src = s.dataset.src;
              delete s.dataset.src;
              v.load();
            }
            v.play()?.catch(() => undefined);
          } else v.pause();
        }),
      { threshold: 0.3 },
    );
    vids.forEach((v) => {
      v.muted = true;
      io.observe(v);
    });
    return () => io.disconnect();
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    lastFocus.current?.focus();
  }, []);

  return (
    <div ref={rootRef} className={loading ? "is-loading" : undefined}>
      {mounted && <Loader done={!loading} />}
      <SiteNav />

      <main id="page">
        <section className="hero" id="inicio">
          <div className="wrap hero-in">
            <div className="hero-txt rv-l">
              <p className="eyebrow">MOATOIO · Uma marca Ajuda Mais</p>
              <h1>
                Uma fotografia do produto, <em>um vídeo com o produto.</em>
              </h1>
              <p className="lead">
                Transformamos fotografias dos teus produtos em conteúdos publicitários profissionais com inteligência artificial.
              </p>
              <ul className="chips">
                <li>Vídeos publicitários</li>
                <li>Fotografias profissionais</li>
                <li>Carrosséis para redes sociais</li>
              </ul>
              <WaLink className="btn gold big" msg="geral" icon>
                Enviar fotografia do meu produto
              </WaLink>
              <p className="small">Atendimento em todo Moçambique.</p>
              <p className="fast">⚡ Entrega rápida — até 24h para encomendas simples.</p>
            </div>
            <div className="hero-img rv-r">
              <img
                src={media("img/work/w04.webp")}
                alt="Modelo com dreads longos e vestido preto em estúdio com luz dourada"
                width={1200}
                height={2152}
                data-essential=""
                fetchPriority="high"
              />
            </div>
          </div>
        </section>

        <section className="sec" id="servicos">
          <div className="wrap">
            <header className="sh rv">
              <h2>Os nossos serviços</h2>
              <p>Soluções criativas para apresentar os teus produtos de forma profissional.</p>
            </header>
            <div className="cards">
              <article className="card rv">
                <div className="ph">
                  <img loading="lazy" src={media("img/work/t16.webp")} alt="Modelo a apresentar um vestido vermelho elegante" width={640} height={1138} />
                </div>
                <div className="cb">
                  <h3>Vídeos Publicitários</h3>
                  <p>Transformamos fotografias dos teus produtos em vídeos publicitários com modelos, movimento e apresentação profissional.</p>
                  <p className="price">a partir de 250 MT</p>
                  <p className="note">O preço aumenta proporcionalmente ao desejado.</p>
                  <WaLink className="btn gold" msg="video" icon>
                    Encomendar vídeo
                  </WaLink>
                </div>
              </article>
              <article className="card rv">
                <div className="ph">
                  <img loading="lazy" src={media("img/work/t19.webp")} alt="Fotografia editorial de sapatos de salto" width={640} height={1138} />
                </div>
                <div className="cb">
                  <h3>Fotografias Publicitárias</h3>
                  <p>Criamos fotografias profissionais para destacar os teus produtos e valorizar a apresentação da tua marca.</p>
                  <p className="price">40 MT por fotografia final</p>
                  <WaLink className="btn gold" msg="foto" icon>
                    Encomendar fotografia
                  </WaLink>
                </div>
              </article>
              <article className="card rv">
                <div className="ph quad">
                  <img loading="lazy" src={media("img/work/t13.webp")} alt="Mala em vários ângulos" width={640} height={1138} />
                  <img loading="lazy" src={media("img/work/t14.webp")} alt="Sandálias em vários ângulos" width={640} height={1138} />
                  <img loading="lazy" src={media("img/work/t19.webp")} alt="Sapatos de salto" width={640} height={1138} />
                  <img loading="lazy" src={media("img/work/t12.webp")} alt="Joia em caixa" width={640} height={1138} />
                </div>
                <div className="cb">
                  <h3>Carrosséis para redes sociais</h3>
                  <p>Publicações com design profissional e textos incluídos, preparadas para apresentar melhor os teus produtos.</p>
                  <p className="price">200 MT / 10 slides</p>
                  <WaLink className="btn gold" msg="carrossel" icon>
                    Encomendar carrossel
                  </WaLink>
                </div>
              </article>
              <article className="card rv">
                <div className="ph">
                  <img loading="lazy" src={media("img/work/t15.webp")} alt="Ambiente criativo de produção de conteúdos" width={640} height={1138} />
                </div>
                <div className="cb">
                  <h3>Serviços Complementares</h3>
                  <ul className="tick">
                    <li>Edição de vídeos</li>
                    <li>Legendas</li>
                    <li>Textos publicitários</li>
                    <li>Narração</li>
                    <li>Conteúdos personalizados</li>
                    <li>Outros serviços de criação</li>
                  </ul>
                  <p className="price">A partir de… — solicita o teu orçamento.</p>
                  <WaLink className="btn gold" msg="compl" icon>
                    Solicitar orçamento
                  </WaLink>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="sec alt" id="portfolio">
          <div className="wrap">
            <header className="sh rv">
              <h2>O que conseguimos criar</h2>
              <p>Uma fotografia pode transformar-se numa apresentação completamente diferente.</p>
            </header>
            <h3 className="sub rv">Vídeos de trabalhos</h3>
            <Reel id="reelV" label="Vídeos de trabalhos, deslize para o lado">
              {NUMS.map((n) => {
                const v = `v${pad2(n)}`;
                return (
                  <div className="vi" key={v}>
                    <video muted loop playsInline preload="none" poster={media(`vid/${v}.jpg`)} aria-label={`Vídeo de trabalho ${n}`}>
                      <source data-src={media(`vid/${v}.mp4`)} type="video/mp4" />
                    </video>
                  </div>
                );
              })}
            </Reel>
            <h3 className="sub rv">Antes e depois</h3>
            <Reel id="reelB" label="Antes e depois, deslize para o lado">
              {NUMS.map((n) => (
                <div className="ba" key={n}>
                  <figure>
                    <img loading="lazy" src={media(`img/ba/${n}a.webp`)} alt={`Antes: fotografia original do produto ${n}`} />
                    <figcaption>Antes</figcaption>
                  </figure>
                  <figure>
                    <img loading="lazy" src={media(`img/ba/${n}d.webp`)} alt={`Depois: conteúdo criado pela MOATOIO ${n}`} />
                    <figcaption>Depois</figcaption>
                  </figure>
                </div>
              ))}
            </Reel>
            <h3 className="sub rv">Fotografias de trabalhos</h3>
            <Reel id="reelP" label="Fotografias de trabalhos, deslize para o lado" auto>
              {PHOTOS.map((k, i) => {
                const alt = `Fotografia publicitária de trabalho realizado ${i + 1}`;
                return (
                  <button
                    className="pi"
                    key={k}
                    aria-label={`Ampliar fotografia ${i + 1}`}
                    onClick={(e) => {
                      lastFocus.current = e.currentTarget;
                      setLightbox({ src: media(`img/work/w${k}.webp`), alt });
                    }}
                  >
                    <img loading="lazy" src={media(`img/work/t${k}.webp`)} alt={alt} width={640} height={800} />
                  </button>
                );
              })}
            </Reel>
            <p className="center rv">
              <a className="btn ghost" href={INSTAGRAM_URL} target="_blank" rel="noopener">
                Ver mais exemplos no Instagram
              </a>
            </p>
          </div>
        </section>

        <section className="sec" id="como-funciona">
          <div className="wrap">
            <header className="sh rv">
              <h2>É simples começar</h2>
              <p>Envia uma fotografia. Nós tratamos da transformação.</p>
            </header>
            <ol className="steps">
              {[
                ["11", "Envia uma fotografia do teu produto.", "O cliente envia a fotografia pelo WhatsApp."],
                ["03", "Escolhe o serviço.", "Vídeo, fotografia, carrossel ou outro serviço."],
                ["08", "Recebe uma pré-visualização.", "A equipa prepara o conteúdo e envia uma versão com marca de água para aprovação."],
                ["06", "Aprova e efectua o pagamento.", "Depois da aprovação, o cliente efectua o pagamento através de M-Pesa ou e-Mola."],
                ["10", "Recebe o ficheiro final.", "O ficheiro final é entregue sem marca de água após confirmação do pagamento."],
              ].map(([icon, title, text], i) => (
                <li className="rv" key={title}>
                  <img src={media(`img/icons/${icon}.svg`)} alt="" width={56} height={56} />
                  <b>{i + 1}</b>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
            <div className="hl rv">
              <p>
                <strong>Até 2 alterações gratuitas.</strong>
              </p>
              <p>Entrega até 24 horas para encomendas simples, mediante confirmação. Projectos maiores terão prazo acordado com o cliente.</p>
            </div>
          </div>
        </section>

        <section className="sec alt" id="vantagens">
          <div className="wrap adv">
            <div>
              <header className="sh left rv">
                <h2>Porquê escolher a MOATOIO?</h2>
              </header>
              <ul className="advs">
                {[
                  ["04", "Criação com inteligência artificial"],
                  ["01", "Anúncios a partir de uma fotografia"],
                  ["02", "Apresentação profissional dos produtos"],
                  ["11", "Atendimento em Moçambique"],
                  ["03", "Preços acessíveis"],
                  ["09", "Até duas alterações gratuitas"],
                  ["07", "Entrega rápida"],
                  ["12", "Conteúdos adaptados às redes sociais"],
                ].map(([icon, label]) => (
                  <li className="rv" key={label}>
                    <img src={media(`img/icons/${icon}.svg`)} alt="" width={36} height={36} />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
            <figure className="advimg rv">
              <img loading="lazy" src={media("img/work/w09.webp")} alt="Modelo com vestido verde num jardim elegante" width={1200} height={2152} />
              <figcaption>O teu produto merece uma apresentação à altura.</figcaption>
            </figure>
          </div>
        </section>

        <section className="sec" id="precos">
          <div className="wrap">
            <header className="sh rv">
              <h2>Preços dos nossos serviços</h2>
              <p>Escolhe o serviço e começa a valorizar os teus produtos.</p>
            </header>
            <div className="prices">
              <article className="pc rv">
                <h3>Vídeos</h3>
                <p className="pbig">a partir de 250 MT</p>
                <p>Preços calculados proporcionalmente à duração.</p>
                <WaLink className="btn gold" msg="video">Encomendar pelo WhatsApp</WaLink>
              </article>
              <article className="pc rv">
                <h3>Fotografias</h3>
                <p className="pbig">40 MT</p>
                <p>por cada fotografia final produzida.</p>
                <WaLink className="btn gold" msg="foto">Encomendar pelo WhatsApp</WaLink>
              </article>
              <article className="pc rv">
                <h3>Carrosséis</h3>
                <p className="pbig">200 MT</p>
                <p>por 10 slides. Design e textos incluídos.</p>
                <WaLink className="btn gold" msg="carrossel">Encomendar pelo WhatsApp</WaLink>
              </article>
              <article className="pc rv">
                <h3>Serviços adicionais</h3>
                <ul className="tick">
                  {["Edição", "Narração", "Legendas", "Textos publicitários", "Conteúdos personalizados", "Acompanhamento", "Monitoramento", "Aconselhamento"].map(
                    (s) => (
                      <li key={s}>{s}</li>
                    ),
                  )}
                </ul>
                <p className="pbig sm">A partir de… — pede o teu orçamento.</p>
                <WaLink className="btn gold" msg="compl">Encomendar pelo WhatsApp</WaLink>
              </article>
            </div>
            <div className="pay rv">
              <span>Pagamentos:</span>
              <img src={media("img/ui/mpesa.png")} alt="M-Pesa" width={48} height={48} />
              <img src={media("img/ui/emola.png")} alt="e-Mola" width={48} height={48} />
              <small>Os dados de pagamento são fornecidos durante a encomenda.</small>
            </div>
          </div>
        </section>

        <section className="sec alt" id="faq">
          <div className="wrap narrow">
            <header className="sh rv">
              <h2>Perguntas frequentes</h2>
            </header>
            <div className="faq" id="faqList">
              {FAQ.map(([q, a]) => (
                <details className="rv" key={q}>
                  <summary>{q}</summary>
                  <div className="ans">
                    <p>{a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="final">
          <div className="wrap final-in">
            <div className="rv">
              <h2>Pronto para transformar o teu produto?</h2>
              <p>Envia uma fotografia do teu produto e deixa a MOATOIO criar uma apresentação que chama a atenção.</p>
              <WaLink className="btn gold big" msg="geral" icon>
                Enviar fotografia do meu produto
              </WaLink>
              <p className="small">Fala connosco e solicita o teu orçamento.</p>
              <figure className="qr">
                <img loading="lazy" src={media("img/ui/qrcode.webp")} alt="Código QR para abrir o WhatsApp da MOATOIO" width={439} height={780} />
                <figcaption>Ou lê o código com a câmara do telemóvel.</figcaption>
              </figure>
            </div>
            <img className="rv" loading="lazy" src={media("img/work/w08.webp")} alt="Modelo com dreads e vestido azul" width={1200} height={2152} />
          </div>
        </section>
      </main>

      <LegalFooter tagline>
        <div className="wrap foot-in">
          <div className="brand sm">
            <BrandMark size={36} />
          </div>
          <p>Transformamos fotografias de produtos em conteúdos publicitários profissionais.</p>
          <div className="soc">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener">
              Instagram
            </a>
            <a href={TIKTOK_URL} target="_blank" rel="noopener">
              TikTok
            </a>
            <WaLink msg="geral">WhatsApp</WaLink>
            <span>{WHATSAPP_DISPLAY}</span>
          </div>
        </div>
      </LegalFooter>

      <WaLink className="fab" msg="geral" icon aria-label="Falar no WhatsApp">
        <span>WhatsApp</span>
      </WaLink>
      <BackToTop />
      <Lightbox item={lightbox} onClose={closeLightbox} />
    </div>
  );
}
