/**
 * Build a path to a file in /public that survives the GitHub Pages basePath.
 *
 * next/image with `unoptimized: true` leaves `src` untouched, so a bare
 * "/mascot.png" would resolve against the domain root and 404 on Pages.
 */
export function asset(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
