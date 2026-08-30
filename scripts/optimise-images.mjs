/**
 * Optimises everything in /public before the site is built.
 *
 * This runs automatically on every build (see the "prebuild" script), so
 * artwork can be dropped into the repo straight from a phone or a design
 * export without anyone remembering to compress it first.
 *
 * What it does:
 *   - Case-study deck panels (00.jpg, 01.png, …) become WebP, roughly half
 *     the weight at the same visible quality. The original is deleted, since
 *     the deck PDFs remain the real source.
 *   - Thumbnails (thumb.jpg) stay JPEG — they double as the Open Graph card
 *     when a page is shared, and not every social scraper reads WebP — but
 *     they are re-encoded if they are heavier than they need to be.
 *   - Anything wider than MAX_WIDTH is scaled down. Nothing on the site is
 *     displayed larger than that, so the extra pixels were never seen.
 *
 * It is safe to run repeatedly: work already done is skipped.
 */
import { readdir, stat, unlink, rename } from "node:fs/promises";
import { join, extname, basename, dirname } from "node:path";
import sharp from "sharp";

const PUBLIC = new URL("../public/", import.meta.url).pathname;

// No image is ever displayed wider than the 1152px content column, doubled
// for high-density screens.
const MAX_WIDTH = 2304;
const WEBP_QUALITY = 82;
const JPEG_QUALITY = 82;
// Re-encode a JPEG only when there is enough to gain to be worth the churn.
const JPEG_REENCODE_OVER = 180 * 1024;

const isPanel = (name) => /^\d\d\.(jpg|jpeg|png)$/i.test(name);
const isThumb = (name) => /^thumb\.(jpg|jpeg|png)$/i.test(name);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

const kb = (n) => `${Math.round(n / 1024)}K`;

let before = 0;
let after = 0;
const changes = [];

for await (const path of walk(PUBLIC)) {
  const name = basename(path);
  const ext = extname(path).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

  const size = (await stat(path)).size;
  const image = sharp(path);
  const meta = await image.metadata();
  const oversized = meta.width > MAX_WIDTH;
  const resize = oversized ? { width: MAX_WIDTH, withoutEnlargement: true } : null;

  if (isPanel(name)) {
    // Deck panel → WebP, replacing the original.
    const target = path.replace(/\.(jpg|jpeg|png)$/i, ".webp");
    let pipeline = sharp(path);
    if (resize) pipeline = pipeline.resize(resize);
    await pipeline.webp({ quality: WEBP_QUALITY, effort: 6 }).toFile(target);
    const now = (await stat(target)).size;
    await unlink(path);
    before += size;
    after += now;
    changes.push(`  ${name} → ${basename(target)}  ${kb(size)} → ${kb(now)}`);
    continue;
  }

  if (isThumb(name) && (size > JPEG_REENCODE_OVER || oversized)) {
    // Stays JPEG for Open Graph, but need not be this heavy.
    const tmp = join(dirname(path), `.tmp-${name}`);
    let pipeline = sharp(path);
    if (resize) pipeline = pipeline.resize(resize);
    await pipeline
      .jpeg({ quality: JPEG_QUALITY, progressive: true, mozjpeg: true })
      .toFile(tmp);
    const now = (await stat(tmp)).size;
    if (now < size) {
      await rename(tmp, path);
      before += size;
      after += now;
      changes.push(`  ${name} re-encoded  ${kb(size)} → ${kb(now)}`);
    } else {
      await unlink(tmp);
    }
    continue;
  }

  if (oversized) {
    const tmp = join(dirname(path), `.tmp-${name}`);
    await sharp(path).resize(resize).toFile(tmp);
    const now = (await stat(tmp)).size;
    await rename(tmp, path);
    before += size;
    after += now;
    changes.push(`  ${name} ${meta.width}px → ${MAX_WIDTH}px  ${kb(size)} → ${kb(now)}`);
  }
}

if (changes.length === 0) {
  console.log("optimise-images: everything already optimised");
} else {
  console.log(`optimise-images: ${changes.length} file(s) optimised`);
  for (const line of changes) console.log(line);
  console.log(`  total ${kb(before)} → ${kb(after)} (${Math.round((1 - after / before) * 100)}% saved)`);
}
