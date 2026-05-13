// Static-site build (SSG) for Hostinger / any static host.
// We disable the Cloudflare Worker adapter and turn on TanStack Start's
// SPA + prerender so every route is written as a real HTML file.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const PAGES = [
  { path: "/" },
  { path: "/about" },
  { path: "/services" },
  { path: "/projects" },
  { path: "/contact" },
];

// Only apply static-export options at production build time.
// In dev (Lovable preview) we keep the Cloudflare Worker SSR runtime so the preview hydrates.
const isBuild = process.env.NODE_ENV === "production";

export default defineConfig({
  cloudflare: isBuild ? false : undefined,
  tanstackStart: {
    pages: PAGES,
    prerender: isBuild
      ? {
          enabled: true,
          crawlLinks: true,
          autoSubfolderIndex: true,
          failOnError: false,
        }
      : undefined,
    spa: isBuild
      ? {
          enabled: true,
          prerender: {
            enabled: true,
            outputPath: "/index.html",
            crawlLinks: true,
            retryCount: 1,
          },
          maskPath: "/",
        }
      : undefined,
    // Disable auto-sitemap — we ship a hand-curated public/sitemap.xml.
    sitemap: { enabled: false },
  },
});
