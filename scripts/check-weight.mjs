/**
 * Weighs the built site and fails the build if a page got too heavy.
 *
 * This runs automatically after every build (see the "postbuild" script).
 * Its job is to catch the mistake that actually happens: a full-resolution
 * photo or an untouched phone video landing in /public and quietly shipping
 * to visitors. The build stops with a message naming the file, rather than
 * the site simply becoming slow without anyone noticing.
 *
 * Budgets are deliberately loose — they flag a mistake, not a design choice.
 * Raise them here if the site legitimately outgrows them.
 */
import { readdir, stat, readFile } from "node:fs/promises";
import { join, extname, relative } from "node:path";

const OUT = new URL("../out/", import.meta.url).pathname;

// A single asset a visitor might download in one go.
const MAX_ASSET = 1.5 * 1024 * 1024;
// Everything one page pulls in, excluding video (which loads only on hover).
const MAX_PAGE = 3 * 1024 * 1024;

const MEDIA = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".svg", ".mp4", ".webm", ".mp3", ".woff2"];
const VIDEO = [".mp4", ".webm"];

const mb = (n) => `${(n / 1024 / 1024).toFixed(2)} MB`;
const kb = (n) => `${Math.round(n / 1024)}K`;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

const problems = [];
const oversized = [];

// 1. No single asset should be huge.
for await (const path of walk(OUT)) {
  const ext = extname(path).toLowerCase();
  if (!MEDIA.includes(ext)) continue;
  const { size } = await stat(path);
  if (size > MAX_ASSET) oversized.push({ path: relative(OUT, path), size });
}

// 2. No page should pull in too much at once. Counts the media each page's
//    HTML actually references, so a shared asset is charged to every page
//    that uses it — which is what a visitor experiences.
const sizes = new Map();
for await (const path of walk(OUT)) {
  if (MEDIA.includes(extname(path).toLowerCase())) {
    sizes.set("/" + relative(OUT, path), (await stat(path)).size);
  }
}

const pages = [];
for await (const path of walk(OUT)) {
  if (path.endsWith(".html")) pages.push(path);
}

const report = [];
for (const page of pages) {
  const html = await readFile(page, "utf8");
  let total = 0;
  // A clip ships as both .webm and .mp4 but a browser fetches exactly one,
  // so charge each clip once, at its heaviest format.
  const clips = new Map();
  for (const [asset, size] of sizes) {
    // basePath-aware: match on the asset path as it appears in the markup.
    if (html.includes(asset) || html.includes(asset.replace(/^\//, ""))) {
      const ext = extname(asset).toLowerCase();
      if (VIDEO.includes(ext)) {
        const stem = asset.slice(0, -ext.length);
        clips.set(stem, Math.max(clips.get(stem) ?? 0, size));
      } else total += size;
    }
  }
  const video = [...clips.values()].reduce((a, b) => a + b, 0);
  const name = "/" + relative(OUT, page).replace(/index\.html$/, "");
  report.push({ name, total, video });
  if (total > MAX_PAGE) problems.push(`${name} loads ${mb(total)} (budget ${mb(MAX_PAGE)})`);
}

report.sort((a, b) => b.total - a.total);
console.log("check-weight: page weight, heaviest first");
for (const { name, total, video } of report.slice(0, 12)) {
  const tail = video ? `  (+ ${kb(video)} video, only on hover)` : "";
  console.log(`  ${mb(total).padStart(8)}  ${name}${tail}`);
}

if (oversized.length) {
  console.log("");
  for (const { path, size } of oversized) {
    problems.push(`${path} is ${mb(size)} (budget ${mb(MAX_ASSET)} per file)`);
  }
}

if (problems.length) {
  console.error("\ncheck-weight: FAILED\n");
  for (const p of problems) console.error(`  ✗ ${p}`);
  const hasVideo = oversized.some((o) => VIDEO.includes(extname(o.path).toLowerCase()));
  console.error(
    hasVideo
      ? "\nA video this large is a raw export — it needs cutting to a short " +
          "muted loop\nbefore it goes on a tile. See scripts/README.md.\n"
      : "\nAn asset this large is almost always a full-resolution export that " +
          "slipped in.\nRun `npm run optimise` to compress it.\n",
  );
  process.exit(1);
}

console.log("\ncheck-weight: all pages within budget");
