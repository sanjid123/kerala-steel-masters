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

export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    pages: PAGES,
    prerender: {
      enabled: true,
      crawlLinks: true,
      autoSubfolderIndex: true,
      failOnError: false,
    },
    spa: {
      enabled: true,
      prerender: {
        enabled: true,
        outputPath: "/index.html",
        crawlLinks: true,
        retryCount: 1,
      },
      maskPath: "/",
    },
    // We ship a hand-curated public/sitemap.xml instead — auto-generation
    // includes hash anchors and skips "/" which hurts SEO.
  },
});
