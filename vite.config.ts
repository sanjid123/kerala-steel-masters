// Static-site build (SSG) for Hostinger / any static host.
// We disable the Cloudflare Worker adapter and turn on TanStack Start's
// SPA + prerender so every route is written as a real HTML file.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const SERVICE_SLUGS = [
  "ss-ms-fabrication", "gp-steel-pipe", "handrail-staircase", "gate-sitout",
  "hotel-bakery", "catering-counter", "events-decoration", "marriage-decoration",
  "sheet-pipe-bending", "steel-furniture", "custom-fabrication",
];

// Mirror PRIORITY_CITY_SLUGS / CITIES from src/lib/locations.ts to avoid
// importing TS into the vite config.
const PRIORITY_CITY_SLUGS = [
  "mannarkkad", "palakkad", "ottapalam", "perinthalmanna",
  "malappuram", "manjeri", "kozhikode", "thrissur",
  "ernakulam", "kochi", "kollam", "thiruvananthapuram",
];

const ALL_CITY_SLUGS = [
  // Thiruvananthapuram
  "thiruvananthapuram","neyyattinkara","nedumangad","attingal","varkala","kilimanoor","vizhinjam","kazhakkoottam",
  // Kollam
  "kollam","karunagappally","kottarakkara","punalur","paravur","chavara","sasthamcotta","kundara",
  // Pathanamthitta
  "pathanamthitta","thiruvalla","adoor","pandalam","ranni","konni","mallappally","kozhencherry",
  // Alappuzha
  "alappuzha","cherthala","kayamkulam","mavelikkara","chengannur","haripad","ambalappuzha","aroor",
  // Kottayam
  "kottayam","changanassery","pala","vaikom","ettumanoor","kanjirappally","mundakayam","pambady",
  // Idukki
  "thodupuzha","kattappana","adimali","munnar","kumily","nedumkandam","painavu","vagamon",
  // Ernakulam
  "kochi","ernakulam","aluva","muvattupuzha","perumbavoor","kothamangalam","north-paravur","angamaly","kalamassery","thrippunithura",
  // Thrissur
  "thrissur","guruvayur","kunnamkulam","irinjalakuda","kodungallur","chavakkad","chalakudy","wadakkanchery",
  // Palakkad
  "palakkad","ottapalam","shoranur","chittur","mannarkkad","pattambi","cherpulassery","alathur",
  // Malappuram
  "malappuram","manjeri","tirur","ponnani","perinthalmanna","kottakkal","nilambur","kondotty","valanchery","tanur",
  // Kozhikode
  "kozhikode","vatakara","koyilandy","ramanattukara","feroke","mukkom","thamarassery","balussery",
  // Wayanad
  "kalpetta","sulthan-bathery","mananthavady","meenangadi","panamaram","vythiri",
  // Kannur
  "kannur","thalassery","payyanur","taliparamba","iritty","mattannur","anthoor","kuthuparamba",
  // Kasaragod
  "kasaragod","kanhangad","nileshwaram","uppala","kumbla","cheruvathur","manjeshwaram",
];

const PAGES = [
  { path: "/" },
  { path: "/about" },
  { path: "/services" },
  { path: "/projects" },
  { path: "/contact" },
  ...SERVICE_SLUGS.map((s) => ({ path: `/services/${s}` })),
  ...ALL_CITY_SLUGS.map((c) => ({ path: `/kerala/${c}` })),
  // City × service combos only for priority cities to keep build size in check
  ...PRIORITY_CITY_SLUGS.flatMap((c) =>
    SERVICE_SLUGS.map((s) => ({ path: `/kerala/${c}/${s}` })),
  ),
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
    // Disable auto-sitemap — we ship a generated public/sitemap.xml.
    sitemap: { enabled: false },
  },
});
