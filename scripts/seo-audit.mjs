#!/usr/bin/env node
/**
 * SEO audit for enlistedcheats.org — Enlisted Cheats keyword focus.
 * Run: node scripts/seo-audit.mjs
 * Exit 1 on critical failures.
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { englishPagesFinal } from './i18n-data/pages-en.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const DOMAIN = 'enlistedcheats.org';
const ORIGIN = `https://${DOMAIN}`;
const PRIMARY_KW = 'enlisted cheats';
const BRAND_KW = 'enlisted';

const BANNED = [
	/islecheat/i,
	/the isle/i,
	/\bfacepunch\b/i,
	/fortnitehack/i,
	/rusthacks\.net/i,
	/islecheat\.net/i,
	/arcraidershacks\.com/i,
	/overwatchhacks\.com/i,
	/\boverwatch hacks\b/i,
	/\bwar thunder\b/i,
];

const warnings = [];
const errors = [];

function warn(msg) {
	warnings.push(msg);
}
function fail(msg) {
	errors.push(msg);
}

function hasKeyword(text, kw = PRIMARY_KW) {
	return text.toLowerCase().includes(kw);
}

function checkBanned(label, text) {
	for (const re of BANNED) {
		if (re.test(text)) fail(`${label}: banned match ${re} → "${text.slice(0, 80)}..."`);
	}
}

function hasRobotsNoindex(html) {
	return (
		/name="robots"\s+content="noindex(?:,\s*nofollow)?"/.test(html) ||
		/name="googlebot"\s+content="noindex(?:,\s*nofollow)?"/.test(html)
	);
}

function walkGuideIndexHtml(dir, out = []) {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const child = join(dir, entry.name);
		if (entry.isDirectory()) walkGuideIndexHtml(child, out);
		else if (entry.name === 'index.html') out.push(child);
	}
	return out;
}

// --- EN page content ---
const pageIds = Object.keys(englishPagesFinal);
for (const id of pageIds) {
	const p = englishPagesFinal[id];
	const label = `en/${id}`;

	checkBanned(label, `${p.title} ${p.description} ${p.h1} ${p.intro}`);

	if (p.title.length > 60) fail(`${label}: title too long (${p.title.length}): ${p.title}`);
	if (p.title.length < 20) warn(`${label}: title short (${p.title.length}): ${p.title}`);

	if (p.description.length > 160) fail(`${label}: description too long (${p.description.length})`);
	if (p.description.length < 100) warn(`${label}: description short (${p.description.length})`);

	if (!hasKeyword(p.title, BRAND_KW)) {
		fail(`${label}: title missing "enlisted" → ${p.title}`);
	}
	if (!hasKeyword(p.description, BRAND_KW)) {
		fail(`${label}: description missing "enlisted" → ${p.description.slice(0, 80)}`);
	}
	if (!hasKeyword(p.h1, BRAND_KW) && !['privacy', 'refund', 'terms'].includes(id)) {
		fail(`${label}: h1 missing "enlisted" → ${p.h1}`);
	}

	// Primary keyword in money pages
	if (['home', 'hacks', 'enlisted-esp', 'enlisted-aimbot', 'pricing'].includes(id)) {
		if (!hasKeyword(p.description, PRIMARY_KW) && !hasKeyword(p.description, 'enlisted cheats')) {
			warn(`${label}: description should include primary keyword "enlisted cheats"`);
		}
	}
}

// --- site config files ---
const siteTs = readFileSync(join(root, 'src/data/site.ts'), 'utf8');
if (!siteTs.includes(ORIGIN)) fail(`site.ts missing canonical origin ${ORIGIN}`);
if (!siteTs.includes(`support@${DOMAIN}`)) fail(`site.ts missing support@${DOMAIN}`);
checkBanned('site.ts', siteTs);

const astroConfig = readFileSync(join(root, 'astro.config.mjs'), 'utf8');
if (!astroConfig.includes(ORIGIN)) fail(`astro.config.mjs missing site ${ORIGIN}`);

const robots = readFileSync(join(root, 'public/robots.txt'), 'utf8');
if (!robots.includes(DOMAIN)) fail(`robots.txt missing sitemap for ${DOMAIN}`);
checkBanned('robots.txt', robots);

const middleware = readFileSync(join(root, 'functions/_middleware.js'), 'utf8');
if (!middleware.includes(ORIGIN)) fail(`_middleware.js missing ${ORIGIN}`);
if (/['"]enlistedcheats\.org['"]/.test(middleware.match(/LEGACY_HOSTS[\s\S]*?];/)?.[0] ?? '')) {
	fail('_middleware.js: LEGACY_HOSTS must not include apex enlistedcheats.org (causes redirect loops)');
}
checkBanned('_middleware.js (content)', middleware.replace(/LEGACY_HOSTS[\s\S]*?;/, ''));

const workerEntry = readFileSync(join(root, 'worker.js'), 'utf8');
if (!workerEntry.includes("from './functions/_middleware.js'")) {
	fail('worker.js must import functions/_middleware.js for edge redirects');
}
if (!workerEntry.includes('env.ASSETS.fetch')) {
	fail('worker.js must delegate to env.ASSETS.fetch for static assets');
}

const wranglerToml = readFileSync(join(root, 'wrangler.toml'), 'utf8');
if (!/main\s*=\s*["']worker\.js["']/.test(wranglerToml)) {
	fail('wrangler.toml must set main = "worker.js"');
}
if (!wranglerToml.includes('run_worker_first = true')) {
	fail('wrangler.toml must set run_worker_first = true so redirects run before assets');
}
if (!wranglerToml.includes('binding = "ASSETS"')) {
	fail('wrangler.toml must bind static assets as ASSETS');
}

// --- guides indexing policy ---
const guidesHubPage = readFileSync(join(root, 'src/components/GuidesHubPage.astro'), 'utf8');
if (!/noindex=\{true\}/.test(guidesHubPage)) {
	fail('GuidesHubPage.astro: /guides/ hub must be noindex (cheats guides live on /blog/)');
}

const externalGuidePage = readFileSync(join(root, 'src/components/ExternalGuidePage.astro'), 'utf8');
if (!/noindex=\{true\}/.test(externalGuidePage)) {
	fail('ExternalGuidePage.astro: external guides must be noindex');
}

const blogHelpers = readFileSync(join(root, 'src/data/blog/helpers.ts'), 'utf8');
if (!/if \(isGameGuidePost\(post\)\) continue/.test(blogHelpers)) {
	fail('blog/helpers.ts: game guide posts must be excluded from blog sitemap');
}

const guidesHelpers = readFileSync(join(root, 'src/data/guides/helpers.ts'), 'utf8');
if (/guide\.canonicalPath/.test(guidesHelpers) && /getGuidesSitemapEntries/.test(guidesHelpers)) {
	const sitemapFn = guidesHelpers.slice(
		guidesHelpers.indexOf('export function getGuidesSitemapEntries'),
		guidesHelpers.indexOf('export function getGuidesSitemapEntries') + 400,
	);
	if (sitemapFn.includes('for (const guide of guides)')) {
		fail('guides/helpers.ts: external guide URLs must not be in sitemap');
	}
	if (sitemapFn.includes('guidesBasePath') && !/return \[\]/.test(sitemapFn)) {
		fail('guides/helpers.ts: getGuidesSitemapEntries must return [] — /guides/ is noindex');
	}
}

if (!/function isPartnerGuidePath/.test(middleware)) {
	fail('_middleware.js: must define isPartnerGuidePath for partner guide noindex headers');
}
if (!/X-Robots-Tag/.test(middleware)) {
	fail('_middleware.js: must set X-Robots-Tag for partner guide routes');
}
if (!/noindex: isPartnerGuidePath\(url\.pathname\)/.test(middleware)) {
	fail('_middleware.js: HTML responses under /guides/ must send X-Robots-Tag noindex');
}

// --- built output (optional) ---
const distIndex = join(root, 'dist/index.html');
if (existsSync(distIndex)) {
	const html = readFileSync(distIndex, 'utf8');
	if (!html.includes(`href="${ORIGIN}/"`)) fail('dist/index.html canonical missing apex URL');
	if (!html.includes('Enlisted') && !html.includes('Enlisted Cheats')) {
		fail('dist/index.html missing Enlisted in title/meta');
	}
	checkBanned('dist/index.html', html);

	const distGuidesDir = join(root, 'dist/guides');
	if (existsSync(distGuidesDir)) {
		const guidePages = walkGuideIndexHtml(distGuidesDir);
		const missingNoindex = guidePages.filter((page) => !hasRobotsNoindex(readFileSync(page, 'utf8')));
		if (missingNoindex.length > 0) {
			fail(
				`dist/guides: ${missingNoindex.length} partner guide page(s) missing robots noindex meta (e.g. ${missingNoindex[0]})`,
			);
		}
	}

	const distGuidesHub = join(root, 'dist/guides/index.html');
	if (existsSync(distGuidesHub)) {
		const hubHtml = readFileSync(distGuidesHub, 'utf8');
		if (!hubHtml.includes('noindex')) {
			fail('dist/guides/index.html hub must be noindex (cheats guides live on /blog/)');
		}
		const guidesHeroHtml = hubHtml.split('id="other-games-guides"')[0] ?? hubHtml;
		checkBanned('dist/guides/index.html (hero)', guidesHeroHtml);
		const externalLinkCount = (hubHtml.match(/rel="nofollow noopener noreferrer"/g) ?? []).length;
		if (externalLinkCount < 100) {
			fail(
				`dist/guides/index.html: expected ~107 external guide links on hub, found ${externalLinkCount}`,
			);
		}
	}

	const distBlogIndex = join(root, 'dist/blog/index.html');
	if (existsSync(distBlogIndex)) {
		const blogIndexHtml = readFileSync(distBlogIndex, 'utf8');
		if (blogIndexHtml.includes('noindex')) {
			fail('dist/blog/index.html cheats hub must remain indexable');
		}
		if (/Enlisted game guides hub/i.test(blogIndexHtml)) {
			fail('dist/blog/index.html must not promote game guides hub — cheats-only SEO');
		}
	}

	const distCheatsPost = join(root, 'dist/blog/cheats-2026/index.html');
	if (existsSync(distCheatsPost)) {
		const cheatsHtml = readFileSync(distCheatsPost, 'utf8');
		if (cheatsHtml.includes('noindex')) {
			fail('dist cheats blog post must remain indexable');
		}
	}

	const distGamePost = join(root, 'dist/blog/new-player/index.html');
	if (existsSync(distGamePost)) {
		const gameHtml = readFileSync(distGamePost, 'utf8');
		if (!gameHtml.includes('noindex')) {
			fail('dist game guide blog post must be noindex');
		}
	}

	const distOtherGamesHub = join(root, 'dist/guides/other-games/index.html');
	if (existsSync(distOtherGamesHub)) {
		const otherHtml = readFileSync(distOtherGamesHub, 'utf8');
		if (!hasRobotsNoindex(otherHtml) && !/http-equiv="refresh"/i.test(otherHtml)) {
			fail('dist/guides/other-games/index.html must include robots noindex or redirect to /guides/');
		}
	}

	const distExternalGuide = join(root, 'dist/guides/fortniteaimbot-com/index.html');
	if (existsSync(distExternalGuide)) {
		const guideHtml = readFileSync(distExternalGuide, 'utf8');
		if (!hasRobotsNoindex(guideHtml)) {
			fail('dist external guide page must include robots noindex meta');
		}
	}

	const distSitemap = join(root, 'dist/sitemap.xml');
	if (existsSync(distSitemap)) {
		const sitemapXml = readFileSync(distSitemap, 'utf8');
		const guideUrls = (sitemapXml.match(/\/guides\/guide-[^<]+/g) ?? []).length;
		if (guideUrls > 0) {
			fail(`dist/sitemap.xml lists ${guideUrls} external guide URLs — none expected`);
		}
		if (sitemapXml.includes('/guides/')) {
			fail('dist/sitemap.xml must not list /guides/ — hub is noindex; cheats guides live on /blog/');
		}
		const blogUrls = sitemapXml.match(/\/blog\/[^<]+/g) ?? [];
		if (blogUrls.length > 0 && blogUrls.some((u) => /enlisted-new-player-progression-guide|enlisted-mission-types-explained|enlisted-factions-infantry|enlisted-battlefield-farming|enlisted-steel-path-beginners|enlisted-patch-notes-guide|steel-path\/|new-player\//.test(u))) {
			fail('dist/sitemap.xml must not list game guide blog posts — cheats posts only');
		}
	}
}

// --- reviews pages ---
for (const file of ['src/pages/reviews/index.astro', 'src/pages/reviews/[slug]/index.astro']) {
	const src = readFileSync(join(root, file), 'utf8');
	checkBanned(file, src);
	if (!/enlisted cheats/i.test(src)) warn(`${file}: consider adding "Enlisted Cheats" keyword`);
}

// --- image alts ---
const enlistedTs = join(root, 'src/data/enlisted.ts');
if (!existsSync(enlistedTs)) fail('src/data/enlisted.ts missing');
const enlistedSrc = readFileSync(enlistedTs, 'utf8');
if (!/Enlisted/i.test(enlistedSrc)) fail('enlisted.ts image alts missing Enlisted keyword');
checkBanned('enlisted.ts', enlistedSrc);

const heroAstro = readFileSync(join(root, 'src/components/Hero.astro'), 'utf8');
if (/alt=""/.test(heroAstro)) fail('Hero.astro must not use empty alt on hero images');

const atmoBannerAstro = readFileSync(join(root, 'src/components/AtmosphericBanner.astro'), 'utf8');
if (/alt=""/.test(atmoBannerAstro)) fail('AtmosphericBanner.astro must not use empty alt on hero images');

const navbarAstro = readFileSync(join(root, 'src/components/Navbar.astro'), 'utf8');
if (/alt=""/.test(navbarAstro)) fail('Navbar.astro must not use empty alt on images');

if (existsSync(distIndex)) {
	const indexHtml = readFileSync(distIndex, 'utf8');
	// Decorative backgrounds may use role="presentation" (see HomeBlog.astro).
	const indexHtmlNoDecorative = indexHtml.replace(/<img\b[^>]*\brole="presentation"[^>]*>/gi, '');
	const emptyAltCount = (indexHtmlNoDecorative.match(/alt=""/g) || []).length;
	if (emptyAltCount > 0) {
		fail(`dist/index.html has ${emptyAltCount} image(s) with empty alt`);
	}
}

// --- report ---
console.log('\n=== SEO Audit: enlistedcheats.org ===\n');
console.log(`Pages checked: ${pageIds.length} EN landing pages`);
console.log(`Primary keyword: "${PRIMARY_KW}"`);
console.log(`Canonical: ${ORIGIN}\n`);

if (warnings.length) {
	console.log(`Warnings (${warnings.length}):`);
	for (const w of warnings) console.log(`  ⚠ ${w}`);
	console.log('');
}

if (errors.length) {
	console.log(`Errors (${errors.length}):`);
	for (const e of errors) console.log(`  ✗ ${e}`);
	console.log('\nAudit FAILED.\n');
	process.exit(1);
}

console.log('✓ All critical SEO checks passed.\n');
