import type { NextConfig } from "next";

// The Pages site lives at <user>.github.io/artisticallyyours — assets must
// resolve under that subpath. Remove PAGES_BASE_PATH when moving to a custom
// domain and everything falls back to the site root.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static export so the site can be hosted on GitHub Pages.
  output: "export",
  basePath,
  // Emit about/index.html so both /about and /about/ resolve on GitHub Pages.
  trailingSlash: true,
  // With unoptimized images, next/image does NOT prepend basePath to `src`,
  // so components build their own paths from this value.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { unoptimized: true },
};

export default nextConfig;
