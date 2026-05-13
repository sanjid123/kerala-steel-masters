// Post-build: flatten dist/client → dist and drop dist/server.
// Result: a single `dist/` folder ready to upload to Hostinger public_html/.
import { existsSync, rmSync, renameSync, readdirSync, statSync, mkdirSync, cpSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const DIST = join(ROOT, "dist");
const CLIENT = join(DIST, "client");
const SERVER = join(DIST, "server");

if (!existsSync(DIST)) {
  console.log("[flatten-dist] no dist/ folder, skipping");
  process.exit(0);
}

// Remove the worker bundle — not needed for static hosting.
if (existsSync(SERVER)) {
  rmSync(SERVER, { recursive: true, force: true });
  console.log("[flatten-dist] removed dist/server");
}

// Promote dist/client/* → dist/*
if (existsSync(CLIENT)) {
  for (const entry of readdirSync(CLIENT)) {
    const from = join(CLIENT, entry);
    const to = join(DIST, entry);
    if (existsSync(to)) rmSync(to, { recursive: true, force: true });
    renameSync(from, to);
  }
  rmSync(CLIENT, { recursive: true, force: true });
  console.log("[flatten-dist] promoted dist/client/* → dist/");
}

console.log("[flatten-dist] done — upload contents of dist/ to public_html/");
