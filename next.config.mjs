/** @type {import('next').NextConfig} */

// On GitHub Pages this project is served from a sub-folder
// (https://<user>.github.io/<repo>/), so a base path is needed in
// production. Locally (next dev) it stays at the root.
// Override with NEXT_PUBLIC_BASE_PATH if the repo is renamed or the
// site is hosted somewhere that serves from the root (e.g. Vercel → "").
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.NODE_ENV === 'production' ? '/midwinter-maths-festival' : '');

const nextConfig = {
  output: 'export', // static site for GitHub Pages
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
