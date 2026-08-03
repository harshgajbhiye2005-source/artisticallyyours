/**
 * Absolute base URL for metadata, social cards, robots and sitemap.
 *
 * Defaults to the GitHub Pages URL. When the site moves to its own domain,
 * set NEXT_PUBLIC_SITE_URL=https://artisticallyyours.in in the deploy
 * workflow (and drop PAGES_BASE_PATH) — nothing else needs to change.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://harshgajbhiye2005-source.github.io/artisticallyyours"
).replace(/\/$/, "");
