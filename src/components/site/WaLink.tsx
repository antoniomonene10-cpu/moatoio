import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { waLink, type WaMessage } from "@/lib/site-content";
import { WaIcon } from "./WaIcon";

type Props = {
  msg?: WaMessage;
  className?: string;
  icon?: boolean;
  children: ReactNode;
  "aria-label"?: string;
};

/** Opens WhatsApp with the pre-filled message for the chosen service. */
export function WaLink({ msg = "geral", className, icon, children, ...rest }: Props) {
  return (
    <a className={cn("wa", className)} href={waLink(msg)} target="_blank" rel="noopener" {...rest}>
      {icon && <WaIcon />}
      {children}
    </a>
  );
}
