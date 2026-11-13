import { createFileRoute } from "@tanstack/react-router";
import { DocPage } from "@/components/site/DocPage";

export const Route = createFileRoute("/revisoes")({
  head: () => ({
    meta: [
      { title: "Política de Revisões | MOATOIO" },
      { name: "description", content: "Como funcionam as revisões gratuitas e adicionais nas encomendas da MOATOIO." },
      { name: "robots", content: "noindex,follow" },
      { property: "og:type", content: "article" },
      { property: "og:title", content: "Política de Revisões | MOATOIO" },
      { property: "og:description", content: "Como funcionam as revisões gratuitas e adicionais nas encomendas da MOATOIO." },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Revisoes,
});

function Revisoes() {
  return (
    <DocPage>
      <h1>Política de Revisões — MOATOIO</h1>
      <ul>
        <li>
          Cada encomenda inclui até <strong>2 revisões gratuitas</strong>.
        </li>
        <li>As revisões devem respeitar o serviço, produto e briefing aprovados no início.</li>
        <li>Enviar todas as alterações pretendidas de forma clara e agrupada.</li>
        <li>Mudança de produto, conceito, modelo, cenário ou direcção criativa depois da aprovação pode ser considerada novo trabalho.</li>
        <li>Revisões adicionais são avaliadas e orçamentadas antes de serem executadas.</li>
        <li>A produção final sem marca de água é entregue após aprovação e confirmação do pagamento.</li>
        <li>O cliente deve conferir textos, preços, cores, detalhes e características do produto antes de aprovar.</li>
      </ul>
      <p>
        <strong>Nota:</strong> definir e publicar uma regra de cancelamento/reembolso separada, após validação comercial e jurídica.
      </p>
    </DocPage>
  );
}
