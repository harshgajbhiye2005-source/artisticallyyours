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
 *   - Every other image keeps its format — thumbnails double as the Open
 *     Graph card when a page is shared, and not every social scraper reads
 *     WebP — but is re-encoded when heavier than it needs to be.
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
// Re-encode only when there is enough to gain to be worth the churn. Set
// above the weight of a legitimate full-width cover, so deliberately cut
// artwork is not put through a second lossy pass to save a few percent.
const REENCODE_OVER = 300 * 1024;

const isPanel = (name) => /^\d\d\.(jpg|jpeg|png)$/i.test(name);

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

  if (size > REENCODE_OVER || oversized) {
    // Everything else stays in its own format — thumbnails double as the
    // Open Graph card, and not every social scraper reads WebP — but nothing
    // needs to be this heavy.
    const tmp = join(dirname(path), `.tmp-${name}`);
    let pipeline = sharp(path);
    if (resize) pipeline = pipeline.resize(resize);
    pipeline =
      ext === ".png"
        ? pipeline.png({ compressionLevel: 9, palette: true })
        : pipeline.jpeg({ quality: JPEG_QUALITY, progressive: true, mozjpeg: true });
    await pipeline.toFile(tmp);
    const now = (await stat(tmp)).size;
    if (now < size) {
      await rename(tmp, path);
      before += size;
      after += now;
      changes.push(`  ${name} re-encoded  ${kb(size)} → ${kb(now)}`);
    } else {
      await unlink(tmp);
    }
  }
}

if (changes.length === 0) {
  console.log("optimise-images: everything already optimised");
} else {
  console.log(`optimise-images: ${changes.length} file(s) optimised`);
  for (const line of changes) console.log(line);
  console.log(`  total ${kb(before)} → ${kb(after)} (${Math.round((1 - after / before) * 100)}% saved)`);
}
