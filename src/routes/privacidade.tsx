import { createFileRoute } from "@tanstack/react-router";
import { DocPage } from "@/components/site/DocPage";
import { waLink } from "@/lib/site-content";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | MOATOIO" },
      { name: "description", content: "Como a MOATOIO trata os dados e materiais enviados pelos clientes." },
      { name: "robots", content: "noindex,follow" },
      { property: "og:type", content: "article" },
      { property: "og:title", content: "Política de Privacidade | MOATOIO" },
      { property: "og:description", content: "Como a MOATOIO trata os dados e materiais enviados pelos clientes." },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Privacidade,
});

function Privacidade() {
  return (
    <DocPage>
      <h1>Política de Privacidade — MOATOIO</h1>
      <p>
        <strong>Estado: rascunho para revisão antes da publicação.</strong>
      </p>
      <p>
        A MOATOIO recolhe apenas os dados necessários para responder a pedidos de orçamento, produzir conteúdos e prestar os serviços
        solicitados.
      </p>
      <h2>Dados que podem ser fornecidos</h2>
      <ul>
        <li>Nome ou identificação comercial, se o cliente decidir partilhar.</li>
        <li>Número de WhatsApp e mensagens enviadas voluntariamente.</li>
        <li>Fotografias, vídeos, descrições e instruções dos produtos enviados para produção.</li>
        <li>Informações necessárias para confirmar pagamentos e entregar ficheiros.</li>
      </ul>
      <h2>Finalidades</h2>
      <p>
        Os dados são utilizados para responder a pedidos, preparar orçamentos, produzir e rever conteúdos, confirmar pagamentos e
        entregar os ficheiros finais.
      </p>
      <h2>Partilha e conservação</h2>
      <p>
        Não venderemos dados pessoais. O acesso deve ser limitado às pessoas e prestadores estritamente necessários à execução do
        serviço. Definir internamente prazos de conservação e procedimentos de eliminação antes da publicação desta política.
      </p>
      <h2>Conteúdos de clientes</h2>
      <p>Fotografias e materiais enviados para produção não devem ser publicados no portfólio sem autorização expressa do cliente.</p>
      <h2>Contacto e direitos</h2>
      <p>
        Para pedidos de acesso, correcção ou eliminação de dados, contactar a MOATOIO através do WhatsApp:{" "}
        <a href={waLink()} target="_blank" rel="noopener">
          https://wa.me/258879532393
        </a>
        .
      </p>
      <p>
        <strong>Antes de publicar:</strong> confirmar a entidade jurídica responsável, morada/contacto oficial, ferramentas de análise
        utilizadas, alojamento, prazos de conservação e requisitos legais aplicáveis em Moçambique. Este rascunho não substitui
        aconselhamento jurídico.
      </p>
    </DocPage>
  );
}
