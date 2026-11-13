export const WHATSAPP_NUMBER = "258848252561";
export const WHATSAPP_DISPLAY = "+258 84 825 2561";
export const INSTAGRAM_URL = "https://www.instagram.com/moatoio/";
export const TIKTOK_URL = "https://www.tiktok.com/@moatoio";

export const WA_MESSAGES = {
  geral:
    "Olá, MOATOIO! Visitei o vosso catálogo e gostaria de solicitar um orçamento. Vou enviar a fotografia do meu produto. Podem ajudar-me?",
  video:
    "Olá, MOATOIO! Tenho interesse em encomendar um vídeo publicitário. Gostaria de enviar a fotografia do meu produto e solicitar um orçamento.",
  foto: "Olá, MOATOIO! Gostaria de encomendar fotografias publicitárias para o meu produto. Vou enviar a fotografia original.",
  carrossel:
    "Olá, MOATOIO! Gostaria de encomendar um carrossel de 10 slides com design e textos incluídos.",
  compl:
    "Olá, MOATOIO! Gostaria de saber mais sobre os vossos serviços complementares e solicitar um orçamento.",
} as const;

export type WaMessage = keyof typeof WA_MESSAGES;

export function waLink(msg: WaMessage = "geral"): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WA_MESSAGES[msg])}`;
}

export const FAQ: ReadonlyArray<readonly [string, string]> = [
  ["Preciso de enviar o produto fisicamente?", "Não. Na maioria dos casos, basta enviares uma fotografia do teu produto."],
  ["Como são criados os vídeos?", "Utilizamos inteligência artificial e ferramentas de criação digital para transformar fotografias em conteúdos publicitários."],
  ["Quanto tempo demora?", "Encomendas simples podem ser entregues até 24 horas. Projectos maiores têm prazo combinado."],
  ["Posso pedir alterações?", "Sim. Tens direito a até duas alterações gratuitas dentro do pedido inicial."],
  ["Como faço o pagamento?", "Trabalhamos com M-Pesa e e-Mola. O pagamento é efectuado depois de aprovares a pré-visualização."],
  ["Atendem clientes fora de Maputo?", "Sim. Atendemos clientes em todo Moçambique através do WhatsApp."],
  ["Como faço uma encomenda?", "Carrega no botão do WhatsApp, envia a fotografia do produto e indica o serviço que pretendes."],
  ["Posso ver o resultado antes de pagar?", "Sim. Enviamos uma pré-visualização com marca de água para aprovação. O ficheiro final sem marca de água é entregue após confirmação do pagamento."],
  ["A MOATOIO gere anúncios pagos?", "Não. O nosso serviço é a criação de conteúdos publicitários para publicares nas tuas próprias páginas e campanhas. A gestão de campanhas pagas não está incluída."],
  ["A MOATOIO utiliza inteligência artificial?", "Sim. A produção utiliza ferramentas de inteligência artificial e edição para criar conteúdos publicitários."],
];
