#!/usr/bin/env node
/**
 * SEO audit for enlistedcheats.org — Enlisted Cheats keyword focus.
 * Run: node scripts/seo-audit.mjs
 * Exit 1 on critical failures.
 */
import { readFileSync, existsSync } from 'node:fs';
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
const externalGuidePage = readFileSync(join(root, 'src/components/ExternalGuidePage.astro'), 'utf8');
if (!/noindex=\{true\}/.test(externalGuidePage)) {
	fail('ExternalGuidePage.astro: external guides must be noindex');
}

const guidesHelpers = readFileSync(join(root, 'src/data/guides/helpers.ts'), 'utf8');
if (/guide\.canonicalPath/.test(guidesHelpers) && /getGuidesSitemapEntries/.test(guidesHelpers)) {
	const sitemapFn = guidesHelpers.slice(
		guidesHelpers.indexOf('export function getGuidesSitemapEntries'),
		guidesHelpers.indexOf('export function getGuidesSitemapEntries') + 1200,
	);
	if (sitemapFn.includes('for (const guide of guides)')) {
		fail('guides/helpers.ts: external guide URLs must not be in sitemap (hub only)');
	}
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

	const distGuidesHub = join(root, 'dist/guides/index.html');
	if (existsSync(distGuidesHub)) {
		const hubHtml = readFileSync(distGuidesHub, 'utf8');
		if (hubHtml.includes('noindex')) fail('dist/guides/index.html hub must remain indexable');
	}

	const distExternalGuide = join(root, 'dist/guides/guide-fortniteaimbot-com-https/index.html');
	if (existsSync(distExternalGuide)) {
		const guideHtml = readFileSync(distExternalGuide, 'utf8');
		if (!guideHtml.includes('noindex')) {
			fail('dist external guide page must include noindex robots meta');
		}
	}

	const distSitemap = join(root, 'dist/sitemap.xml');
	if (existsSync(distSitemap)) {
		const sitemapXml = readFileSync(distSitemap, 'utf8');
		const guideUrls = (sitemapXml.match(/\/guides\/guide-[^<]+/g) ?? []).length;
		if (guideUrls > 0) {
			fail(`dist/sitemap.xml lists ${guideUrls} external guide URLs — hub only expected`);
		}
		if (!sitemapXml.includes('/guides/')) {
			warn('dist/sitemap.xml: /guides/ hub not found in sitemap');
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

if (existsSync(distIndex)) {
	const emptyAltCount = (readFileSync(distIndex, 'utf8').match(/alt=""/g) || []).length;
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
