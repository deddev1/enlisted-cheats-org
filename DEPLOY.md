# Deploy enlistedcheats.org

Step-by-step guide to deploy the Enlisted Cheats static site to **enlistedcheats.org** on Cloudflare Pages, configure DNS, and submit to Google Search Console.

## Prerequisites

- Node.js **≥ 22.12.0**
- Cloudflare account with access to **enlistedcheats.org** DNS
- Wrangler CLI (included as dev dependency): `npx wrangler login`

## 1. Build and validate locally

From the project root:

```bash
npm install
npm run generate:i18n
node scripts/generate-blog-posts.mjs
npm run build:validate
```

`build:validate` runs `astro build` then `scripts/validate-sitemaps.mjs`. All sitemap checks must pass before deploying.

Expected output: **556** indexable HTML pages (25 English marketing + 15 blog URLs + 21 locales × 25 pages each).

## 2. Cloudflare deployment

### Option A — Workers Git deploy (current setup)

If your Cloudflare project runs **`npx wrangler deploy`** on push, the repo is configured to build automatically via `wrangler.toml`:

```toml
[build]
command = "node scripts/cloudflare-build.mjs"
```

Or set the dashboard **Build command** to:

```
npm run build:cf
```

**Root directory** must be blank (repo root). Set these environment variables if needed:

| Variable | Value |
|----------|-------|
| `NODE_VERSION` | `22` |

Redeploy by pushing to the connected branch.

### Option B — Cloudflare Pages (Git-connected)

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
2. Select this repository.
3. Configure build settings:
   - **Project name:** `arcraidershacks`
   - **Production branch:** `main`
   - **Build command:** `npm run build:cf`
   - **Build output directory:** `dist`
   - **Node.js version:** 22 (set via environment variable `NODE_VERSION=22` if needed)
4. Save and deploy. Cloudflare runs the build on each push.

### Option C — Direct upload / Wrangler CLI

```bash
npm run build:validate
npm run deploy
```

Or for Pages: `npm run pages:deploy` (see `wrangler.toml`).

## 3. Custom domain and DNS

Add **enlistedcheats.org** as the primary custom domain on the Pages project.

### Apex (enlistedcheats.org)

In **Cloudflare DNS** for the zone:

| Type  | Name | Content              | Proxy |
|-------|------|----------------------|-------|
| CNAME | `@`  | `<pages-subdomain>.pages.dev` | Proxied (orange cloud) |

Cloudflare CNAME flattening handles apex records automatically.

### www → apex redirect

1. Add a DNS record for `www` pointing to the same Pages project (proxied CNAME or A record).
2. In **Rules** → **Redirect Rules** (or Bulk Redirects), create:
   - **Source:** `www.enlistedcheats.org/*`
   - **Target:** `https://enlistedcheats.org/${1}`
   - **Status:** 301

The deployed `functions/_middleware.js` also enforces apex canonical host, legacy domain redirects (`rusthacks.xyz`, `.net`, `.com`), and legacy path redirects.

### SSL / HTTPS

1. **SSL/TLS** → **Overview** → set mode to **Full (strict)**.
2. **Edge Certificates** → enable **Always Use HTTPS**.
3. After enabling, **Caching** → **Configuration** → **Purge Everything** once.

## 4. Post-deploy smoke test

Verify these URLs return **200** with correct content:

- `https://enlistedcheats.org/`
- `https://enlistedcheats.org/es/`
- `https://enlistedcheats.org/enlisted-cheats/`
- `https://enlistedcheats.org/enlisted-aimbot/`
- `https://enlistedcheats.org/sitemap-index.xml`
- `https://enlistedcheats.org/robots.txt`

Verify redirects:

- `https://enlistedcheats.org` → `https://enlistedcheats.org` (301)
- `https://enlistedcheats.org` → `https://enlistedcheats.org` (301)
- `https://rusthacks.xyz` → `https://enlistedcheats.org` (301)
- Legacy paths (e.g. `/warzone-aimbot/`) → Enlisted equivalents (301)

## 5. Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console).
2. **Add property** → choose **Domain** → enter `enlistedcheats.org`.
3. Verify ownership via the **DNS TXT record** Cloudflare provides (add in Cloudflare DNS, wait for propagation, then confirm in GSC).
4. After verification, open **Sitemaps** and submit:
   ```
   https://enlistedcheats.org/sitemap-index.xml
   ```
5. Use **URL Inspection** to request indexing for:
   - Homepage (`/`)
   - Pillar page (`/enlisted-cheats/`)
   - Key landing pages (`/enlisted-aimbot/`, `/enlisted-esp/`, `/enlisted-cheats-2026/`, etc.)
   - A sample of locale homepages (`/es/`, `/de/`, `/fr/`)
6. Monitor **Pages** (Coverage), **Core Web Vitals**, and **International targeting** (hreflang) over the following weeks.

## 6. Ongoing maintenance

| Task | Command / action |
|------|------------------|
| Regenerate i18n content | `npm run generate:i18n` (after editing `scripts/i18n-data/*`) |
| Regenerate blog posts | `node scripts/generate-blog-posts.mjs` |
| Full build + SEO validation | `npm run build:validate` |
| Refresh gallery images | `npm run fetch:images` then `npm run optimize:images` |
| Redeploy | Push to Git (auto) or `npm run pages:deploy` |

## Checklist

- [ ] `npm run build:validate` passes locally
- [ ] Cloudflare Pages project attached to this repo
- [ ] Custom domain `enlistedcheats.org` attached and active
- [ ] `www` redirects to apex
- [ ] Legacy domains 301 to `enlistedcheats.org`
- [ ] Always Use HTTPS enabled
- [ ] `robots.txt` and sitemaps serve from `https://enlistedcheats.org`
- [ ] Google Search Console domain verified
- [ ] `sitemap-index.xml` submitted in GSC
- [ ] Homepage and `/enlisted-cheats/` requested for indexing
