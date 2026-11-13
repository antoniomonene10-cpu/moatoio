import { media } from "@/lib/media";

export function BrandMark({ size = 44 }: { size?: number }) {
  return (
    <>
      <img src={media("img/ui/logo-t.png")} alt="Símbolo A/M" width={size} height={size} />
      <i className="sep" />
      <span>
        <b>MOATOIO</b>
        <small>Uma marca Ajuda Mais</small>
      </span>
    </>
  );
}
