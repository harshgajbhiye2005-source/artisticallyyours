import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export so the site can be hosted on GitHub Pages.
  output: "export",
  // The Pages site lives at <user>.github.io/artisticallyyours — assets must
  // resolve under that subpath. Remove basePath when moving to a custom domain.
  basePath: process.env.PAGES_BASE_PATH ?? "",
  // Emit about/index.html so both /about and /about/ resolve on GitHub Pages.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
