/**
 * Resolve an original site path (e.g. "img/work/t01.webp") to its public URL.
 * Files live in `public/img` and `public/vid`, so they are served from the
 * site's own domain on any host (Lovable, Vercel, …).
 */
export function media(path: string): string {
  return `/${path.replace(/^\/+/, "")}`;
}

/** Two-digit index used by the original file names (00, 01, …). */
export const pad2 = (n: number) => String(n).padStart(2, "0");
