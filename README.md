# PS Steels & Engineering — Website

Production site: https://pssteels.in

Built with TanStack Start (React 19 + Vite 7). Edited in [Lovable](https://lovable.dev) and auto-synced to GitHub.

---

## GitHub Sync — verify your connection

Lovable pushes every edit to the connected GitHub repo in real time. To confirm
which repo and branch are connected:

### In Lovable
- Desktop: **+** (chat input, bottom left) → **GitHub**
- Mobile: **+** (bottom-left, Chat mode) → **GitHub**

The panel shows the connected repository and offers **Connect project** if not linked yet.

### From your machine
```bash
git remote -v                       # shows the GitHub URL Lovable is pushing to
git rev-parse --abbrev-ref HEAD     # shows the current local branch
git log -1 --pretty=format:'%h %s'  # latest commit — should match Lovable's last edit
```

### On github.com
Open the repo and confirm the latest commit timestamp matches the last change
you made in Lovable (typically within ~30 seconds). If this README appeared in
your repo after the edit that created it, the sync is working.

**Connected repo / branch (fill in once verified):**

- Repo: `github.com/<owner>/<repo>`
- Default branch: `main`

---

## Local development

```bash
bun install
bun run dev          # http://localhost:8080
```

Editing files in Lovable, locally, or on github.com all stay in sync via the
two-way GitHub integration.

---

## Production build → Hostinger cPanel

This project is configured as a **static site** at build time. The dev server
still runs as a Worker so the Lovable preview works.

```bash
bun run build
```

Output lives in `dist/client/`. To deploy to Hostinger:

1. Open **cPanel → File Manager → `public_html`**.
2. Upload the **contents** of `dist/client/` (not the folder itself).
3. Enable **Show hidden files** and confirm `.htaccess` is present.
4. Submit `https://pssteels.in/sitemap.xml` in Google Search Console.

The build emits one real `.html` file per route (`/`, `/about`, `/services`,
`/projects`, `/contact`) for full crawlability by Google and AI agents
(GPTBot, ClaudeBot, PerplexityBot — see `public/robots.txt`).

---

## Project structure

```
src/routes/        # File-based routes (each one becomes a static .html page)
src/components/    # UI components
src/lib/seo.ts     # Canonical URLs + JSON-LD helpers
public/.htaccess   # Hostinger redirects, gzip, caching
public/robots.txt  # Crawler allowlist (Google + AI agents)
public/sitemap.xml # Hand-curated sitemap
```
