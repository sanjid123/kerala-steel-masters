// Regenerates src/data/kerala-pincodes.json from a public India Post dataset.
// Run manually with `node scripts/build-pincode-index.mjs`. The committed JSON
// is the fallback used by the build, so this script does NOT run in `prebuild`
// (would slow builds and risk network failure). Re-run only when you want to
// refresh the dataset.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SRC =
  "https://raw.githubusercontent.com/ghousekw/india-pincodes/master/pincode.csv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "..", "src", "data", "kerala-pincodes.json");

console.log("Fetching", SRC);
const res = await fetch(SRC);
if (!res.ok) throw new Error(`HTTP ${res.status}`);
const csv = (await res.text()).split(/\r?\n/);

const out = [];
const seen = new Set();
for (let i = 1; i < csv.length; i++) {
  const cols = csv[i].split(",");
  if (cols.length < 9) continue;
  if ((cols[8] || "").toUpperCase() !== "KERALA") continue;
  const office = cols[3].trim();
  const pincode = cols[4].trim();
  const district = cols[7]
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const key = pincode + "|" + office;
  if (seen.has(key)) continue;
  seen.add(key);
  out.push({ p: pincode, o: office, d: district });
}
out.sort((a, b) => a.p.localeCompare(b.p) || a.o.localeCompare(b.o));

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(out));
console.log(`Wrote ${out.length} records → ${OUT}`);
