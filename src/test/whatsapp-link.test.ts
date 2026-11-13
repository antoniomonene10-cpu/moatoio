import { describe, expect, it } from "vitest";
import { WA_MESSAGES, waLink } from "@/lib/site-content";

describe("WhatsApp order links", () => {
  it("opens the MOATOIO number with the chosen service message pre-filled", () => {
    const url = new URL(waLink("video"));
    expect(url.origin + url.pathname).toBe("https://wa.me/258879532393");
    expect(url.searchParams.get("text")).toBe(WA_MESSAGES.video);
  });

  it("falls back to the general message", () => {
    expect(new URL(waLink()).searchParams.get("text")).toBe(WA_MESSAGES.geral);
  });
});
