import manifest from "./media-manifest.json";

const MEDIA = manifest as Record<string, string>;

/** Resolve an original site path (e.g. "img/work/t01.webp") to its hosted CDN URL. */
export function media(path: string): string {
  const url = MEDIA[path];
  if (!url) {
    console.warn(`[media] missing asset: ${path}`);
    return `/${path}`;
  }
  return url;
}

/** Two-digit index used by the original file names (00, 01, …). */
export const pad2 = (n: number) => String(n).padStart(2, "0");
