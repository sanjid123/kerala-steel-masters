// Generate public/sitemap.xml from routes + locations data.
// Runs as `prebuild` so the static sitemap reflects current data on each build.
import { writeFileSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE_URL = "https://pssteels.in";

// Pull the canonical city list straight from src/lib/locations.ts so we
// never drift out of sync.
const locSrc = readFileSync(join(ROOT, "src/lib/locations.ts"), "utf8");

function extractDistrictTowns(src) {
  const start = src.indexOf("const DISTRICTS");
  const end = src.indexOf("};", start);
  const block = src.slice(start, end);
  const towns = [];
  for (const m of block.matchAll(/"([^"]+)"/g)) {
    // skip district keys (they're property names, also quoted)
    towns.push(m[1]);
  }
  // Property names come before their arrays. We only want town strings —
  // they are the ones that appear inside `[ ... ]` blocks. Districts in
  // DISTRICTS are unquoted property names (PascalCase identifiers), so
  // every quoted string in this block IS a town.
  return towns;
}

function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const TOWNS = extractDistrictTowns(locSrc);
const CITY_SLUGS = [...new Set(TOWNS.map(toSlug))];

const SERVICE_SLUGS = [
  "ss-ms-fabrication", "gp-steel-pipe", "handrail-staircase", "gate-sitout",
  "hotel-bakery", "catering-counter", "events-decoration", "marriage-decoration",
  "sheet-pipe-bending", "steel-furniture", "custom-fabrication",
];

const PRIORITY_CITY_SLUGS = [
  "mannarkkad", "palakkad", "ottapalam", "perinthalmanna",
  "malappuram", "manjeri", "kozhikode", "thrissur",
  "ernakulam", "kochi", "kollam", "thiruvananthapuram",
];

const today = new Date().toISOString().slice(0, 10);

/** @type {{path:string;priority:string;changefreq:string}[]} */
const entries = [];

const push = (path, priority, changefreq = "weekly") =>
  entries.push({ path, priority, changefreq });

push("/", "1.0");
push("/services", "0.9");
push("/projects", "0.8");
push("/service-areas", "0.7");
push("/about", "0.7", "monthly");
push("/contact", "0.7", "monthly");

for (const s of SERVICE_SLUGS) push(`/services/${s}`, "0.8");
for (const c of CITY_SLUGS) push(`/kerala/${c}`, "0.7");
for (const c of PRIORITY_CITY_SLUGS) {
  for (const s of SERVICE_SLUGS) push(`/kerala/${c}/${s}`, "0.6");
}

const xml = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  ...entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${SITE_URL}${e.path}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      `    <changefreq>${e.changefreq}</changefreq>`,
      `    <priority>${e.priority}</priority>`,
      `  </url>`,
    ].join("\n"),
  ),
  `</urlset>`,
  ``,
].join("\n");

writeFileSync(join(ROOT, "public/sitemap.xml"), xml, "utf8");
console.log(`[sitemap] wrote ${entries.length} URLs to public/sitemap.xml`);
