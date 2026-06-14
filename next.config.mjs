/** @type {import('next').NextConfig} */

// On GitHub Pages this project is served from a sub-folder
// (https://<user>.github.io/<repo>/), so a base path is needed in
// production. Locally (next dev) it stays at the root, and on Vercel the
// site is served from the root too — Vercel sets VERCEL=1 during the build,
// so we auto-detect it and use no base path there.
// Override with NEXT_PUBLIC_BASE_PATH to force a value anywhere (e.g. "").
// NB: GitHub Pages paths are case-sensitive — this must match the repository
// name exactly (Midwinter-Maths-Festival).
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.NODE_ENV === 'production' && !process.env.VERCEL
    ? '/Midwinter-Maths-Festival'
    : '');

const nextConfig = {
  output: 'export', // static site for GitHub Pages
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
