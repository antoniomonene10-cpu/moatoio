import { createFileRoute } from "@tanstack/react-router";
import { DocPage } from "@/components/site/DocPage";
import { waLink } from "@/lib/site-content";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos e Condições | MOATOIO" },
      { name: "description", content: "Termos e condições dos serviços de criação de conteúdos publicitários da MOATOIO." },
      { name: "robots", content: "noindex,follow" },
      { property: "og:type", content: "article" },
      { property: "og:title", content: "Termos e Condições | MOATOIO" },
      { property: "og:description", content: "Termos e condições dos serviços de criação de conteúdos publicitários da MOATOIO." },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Termos,
});

function Termos() {
  const wa = waLink();
  return (
    <DocPage>
      <h1>Termos e Condições — MOATOIO</h1>
      <p>
        <strong>Estado: rascunho para revisão antes da publicação.</strong>
      </p>
      <h2>1. Serviços</h2>
      <p>
        A MOATOIO cria conteúdos publicitários, incluindo vídeos, fotografias, carrosséis, edição e textos, a partir dos materiais e
        instruções fornecidos pelo cliente. A produção utiliza ferramentas de inteligência artificial quando aplicável. A MOATOIO não
        promete gerir campanhas de anúncios pagos, salvo acordo escrito separado.
      </p>
      <h2>2. Orçamento e preços</h2>
      <p>
        Os preços apresentados no website devem ser confirmados antes da encomenda. Serviços complementares sem preço publicado são
        orçamentados individualmente.
      </p>
      <h2>3. Processo de encomenda</h2>
      <p>
        O cliente envia a fotografia e as informações do produto, escolhe o serviço, recebe orçamento e prazo estimado, analisa uma
        pré-visualização com marca de água, aprova e efectua o pagamento por um método confirmado pela MOATOIO. O ficheiro final sem
        marca de água é entregue após confirmação do pagamento.
      </p>
      <h2>4. Revisões</h2>
      <p>
        Incluem-se até duas revisões gratuitas, dentro do pedido e briefing originalmente aprovados. Alterações substanciais ou pedidos
        adicionais podem exigir novo orçamento.
      </p>
      <h2>5. Prazos</h2>
      <p>
        Trabalhos simples e pequenos podem ser entregues até 24 horas, sujeitos a confirmação. Projectos maiores têm prazo acordado
        individualmente. O prazo começa após recepção de materiais e instruções suficientes.
      </p>
      <h2>6. Materiais e direitos</h2>
      <p>
        O cliente declara ter autorização para utilizar os materiais enviados. A publicação de trabalhos no portfólio da MOATOIO depende
        de autorização do cliente. O cliente deve verificar a exactidão de nomes, características, preços e alegações comerciais antes
        de publicar o anúncio.
      </p>
      <h2>7. Inteligência artificial</h2>
      <p>
        Alguns conteúdos são produzidos com recurso a inteligência artificial. Resultados visuais podem apresentar diferenças face ao
        produto real; o cliente deve rever cuidadosamente a pré-visualização antes da aprovação.
      </p>
      <h2>8. Contacto</h2>
      <p>
        Pedidos e esclarecimentos:{" "}
        <a href={wa} target="_blank" rel="noopener">
          https://wa.me/258848252561
        </a>
        .
      </p>
      <p>
        <strong>Antes de publicar:</strong> confirmar identidade legal do prestador, regras de cancelamento/reembolso, tratamento de
        reclamações, jurisdição e legislação aplicável. Este rascunho não substitui aconselhamento jurídico.
      </p>
    </DocPage>
  );
}
