#!/usr/bin/env node
/**
 * Validates built sitemaps match full multilingual SEO policy.
 * Run after `npm run build`: node scripts/validate-sitemaps.mjs
 *
 * Policy: English + 21 locale sitemaps + image sitemap, all populated.
 */
import { access, readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

/** dist/ for static builds; dist/client/ when a Cloudflare adapter rearranges assets. */
async function resolveDistRoot() {
	const candidates = [
		path.join(ROOT, 'dist'),
		path.join(ROOT, 'dist', 'client'),
	];
	for (const dir of candidates) {
		try {
			await access(path.join(dir, 'sitemap.xml'));
			return dir;
		} catch {
			// try next candidate
		}
	}
	throw new Error(
		'Could not find sitemap.xml in dist/ or dist/client/. Run `astro build` first.',
	);
}
const SITE = 'https://enlistedcheats.org';

const MARKETING_SITEMAP_PAGES = 15;
const BUILT_MARKETING_PAGES = 25; // thin landings still built; 301 to canonical URLs
const BLOG_SITEMAP_PAGES = 9; // /blog/ index + 8 cheats posts (game guides live on /guides/, noindex at /blog/)
const BLOG_HTML_PAGES = 15; // /blog/ index + all 14 posts still built as HTML
const REVIEW_PAGES = 14; // /reviews/ index + 13 review detail pages
const GUIDES_HUB_PAGES = 1; // /guides/ hub only — external guide articles are noindex
const EXTERNAL_GUIDE_HTML_PAGES = 107; // noindex guide articles still built as HTML
const SITEMAP_ENGLISH_PAGES = MARKETING_SITEMAP_PAGES + BLOG_SITEMAP_PAGES + REVIEW_PAGES + GUIDES_HUB_PAGES;
const BUILT_ENGLISH_PAGES = MARKETING_SITEMAP_PAGES + BLOG_HTML_PAGES + REVIEW_PAGES + GUIDES_HUB_PAGES;
const I18N_LOCALES = 21;
const PAGES_PER_LOCALE = 15; // canonical locale URLs in sitemap (thin landings 301)
const BUILT_LOCALE_HTML_PAGES = I18N_LOCALES * 25; // all locale routes still built as HTML
const LOCALE_UI_PAGES = BUILT_LOCALE_HTML_PAGES;
const OTHER_GAMES_GUIDE_HUB = 1;
const TOTAL_HTML_PAGES =
	BUILT_ENGLISH_PAGES + LOCALE_UI_PAGES + EXTERNAL_GUIDE_HTML_PAGES + OTHER_GAMES_GUIDE_HUB;
const HREFLANG_PER_URL = 23; // 22 locales + x-default
const SITEMAP_INDEX_ENTRIES = 23; // English + 21 locales + images
const I18N_SITEMAP_URLS = I18N_LOCALES * PAGES_PER_LOCALE;
const IMAGE_SITEMAP_ENTRIES = 5; // enlistedImages.sitemap (showcaseGameplay)

const ENGLISH_PATHS = [
	'/',
	'/enlisted-cheats/',
	'/enlisted-esp/',
	'/enlisted-aimbot/',
	'/enlisted-wallhack/',
	'/enlisted-radar/',
	'/features/',
	'/pricing/',
	'/setup/',
	'/updates/',
	'/faq/',
	'/support/',
	'/privacy-policy/',
	'/refund-policy/',
	'/terms/',
];

const I18N_LOCALE_CODES = [
	'es', 'fr', 'de', 'pt', 'it', 'nl', 'pl', 'ru', 'tr',
	'ar', 'ja', 'ko', 'zh', 'hi', 'id', 'th', 'vi', 'uk', 'cs', 'ro', 'sv',
];

function extractLocs(xml) {
	return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

function extractHreflangCount(xml, url) {
	const block = xml.split('<loc>').find((part) => part.startsWith(url.replace(/&/g, '&amp;')));
	if (!block) return 0;
	return (block.match(/hreflang="/g) ?? []).length;
}

function extractHreflangs(xml, url) {
	const block = xml.split('<loc>').find((part) => part.startsWith(url.replace(/&/g, '&amp;')));
	if (!block) return [];
	return [...block.matchAll(/hreflang="([^"]+)"/g)].map((m) => m[1]);
}

async function collectHtmlPaths(dir, base = '') {
	const entries = await readdir(dir, { withFileTypes: true });
	const paths = [];
	for (const entry of entries) {
		const rel = `${base}/${entry.name}`.replace(/\\/g, '/');
		if (entry.isDirectory()) {
			paths.push(...(await collectHtmlPaths(path.join(dir, entry.name), rel)));
		} else if (entry.name === 'index.html') {
			const urlPath = rel.replace(/\/index\.html$/, '/') || '/';
			paths.push(urlPath === '' ? '/' : urlPath);
		}
	}
	return paths;
}

function fail(msg) {
	console.error(`✗ ${msg}`);
	process.exitCode = 1;
}

function ok(msg) {
	console.log(`✓ ${msg}`);
}

function extractUrlBlocks(xml) {
	return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
}

function extractImageLocs(block) {
	return [...block.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map((m) => m[1]);
}

async function validateSitemapImages(xml, label, bump) {
	const blocks = extractUrlBlocks(xml);
	let imageCount = 0;
	let localErrors = 0;
	for (const block of blocks) {
		const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
		const loc = locMatch?.[1];
		const images = extractImageLocs(block);
		if (!images.length) {
			fail(`${label}: URL missing image:image → ${loc ?? 'unknown'}`);
			localErrors += 1;
			bump();
			continue;
		}
		for (const imageUrl of images) {
			imageCount += 1;
			if (!imageUrl.startsWith(`${SITE}/`)) {
				fail(`${label}: image URL must use ${SITE} → ${imageUrl}`);
				localErrors += 1;
				bump();
				continue;
			}
			const filePath = path.join(ROOT, 'public', new URL(imageUrl).pathname);
			try {
				await stat(filePath);
			} catch {
				fail(`${label}: image file missing on disk → ${filePath}`);
				localErrors += 1;
				bump();
			}
		}
	}
	if (localErrors === 0) {
		ok(`${label}: all ${blocks.length} URLs include ${imageCount} verified image entries`);
	}
	return localErrors === 0;
}

async function main() {
	console.log('Validating sitemaps (full multilingual policy)…\n');
	let errors = 0;
	const bump = () => {
		errors += 1;
	};

	const DIST = await resolveDistRoot();
	if (DIST !== path.join(ROOT, 'dist')) {
		console.log(`Using build output at ${path.relative(ROOT, DIST)}/\n`);
	}

	const sitemapEn = await readFile(path.join(DIST, 'sitemap.xml'), 'utf8');
	const sitemapI18n = await readFile(path.join(DIST, 'sitemap-i18n.xml'), 'utf8');
	const sitemapIndex = await readFile(path.join(DIST, 'sitemap-index.xml'), 'utf8');
	const sitemapImages = await readFile(path.join(DIST, 'sitemap-images.xml'), 'utf8');
	const robots = await readFile(path.join(ROOT, 'public', 'robots.txt'), 'utf8');

	const enLocs = extractLocs(sitemapEn);
	const i18nLocs = extractLocs(sitemapI18n);
	const imageLocs = extractLocs(sitemapImages);
	const indexLocs = extractLocs(sitemapIndex);

	// Per-locale sitemap files must each list all localized marketing pages.
	for (const locale of I18N_LOCALE_CODES) {
		const file = path.join(DIST, `sitemap-${locale}.xml`);
		const xml = await readFile(file, 'utf8');
		const locs = extractLocs(xml);
		if (locs.length !== PAGES_PER_LOCALE) {
			fail(`sitemap-${locale}.xml: expected ${PAGES_PER_LOCALE} URLs, got ${locs.length}`);
			bump();
		}
	}
	if (errors === 0) {
		ok(`All 21 locale sitemaps have ${PAGES_PER_LOCALE} URLs each`);
	}

	if (enLocs.length !== SITEMAP_ENGLISH_PAGES) {
		fail(`sitemap.xml: expected ${SITEMAP_ENGLISH_PAGES} URLs, got ${enLocs.length}`);
		bump();
	} else ok(`sitemap.xml has ${SITEMAP_ENGLISH_PAGES} English URLs`);

	if (i18nLocs.length !== I18N_SITEMAP_URLS) {
		fail(`sitemap-i18n.xml: expected ${I18N_SITEMAP_URLS} URLs, got ${i18nLocs.length}`);
		bump();
	} else ok(`sitemap-i18n.xml has ${I18N_SITEMAP_URLS} localized URLs`);

	if (imageLocs.length !== IMAGE_SITEMAP_ENTRIES) {
		fail(`sitemap-images.xml: expected ${IMAGE_SITEMAP_ENTRIES} image host URLs, got ${imageLocs.length}`);
		bump();
	} else ok(`sitemap-images.xml has ${IMAGE_SITEMAP_ENTRIES} image entries`);

	for (const p of ENGLISH_PATHS) {
		const full = `${SITE}${p === '/' ? '/' : p}`;
		if (!enLocs.includes(full)) {
			fail(`Missing English URL in sitemap.xml: ${full}`);
			bump();
		}
	}
	if (errors === 0) ok(`All ${ENGLISH_PATHS.length} English marketing paths present in sitemap.xml`);

	for (const loc of enLocs) {
		if (!loc.startsWith('https://')) {
			fail(`Non-HTTPS URL: ${loc}`);
			bump();
		}
		if (!loc.endsWith('/')) {
			fail(`URL missing trailing slash: ${loc}`);
			bump();
		}
	}
	if (errors === 0) ok('All English sitemap URLs use HTTPS with trailing slashes');

	await validateSitemapImages(sitemapEn, 'sitemap.xml', bump);
	await validateSitemapImages(sitemapImages, 'sitemap-images.xml', bump);

	const homeHreflang = extractHreflangCount(sitemapEn, `${SITE}/`);
	const homeLangs = extractHreflangs(sitemapEn, `${SITE}/`);
	if (homeHreflang !== HREFLANG_PER_URL) {
		fail(`Homepage hreflang links: expected ${HREFLANG_PER_URL}, got ${homeHreflang}`);
		bump();
	} else if (!homeLangs.includes('en') || !homeLangs.includes('x-default')) {
		fail(`Homepage hreflang must include en and x-default, got: ${homeLangs.join(', ')}`);
		bump();
	} else if (!homeLangs.includes('fr') || !homeLangs.includes('uk')) {
		fail(`Homepage hreflang must include locale peers (fr, uk, …), got: ${homeLangs.join(', ')}`);
		bump();
	} else ok(`Homepage has full hreflang cluster (${HREFLANG_PER_URL} links)`);

	if (indexLocs.length !== SITEMAP_INDEX_ENTRIES) {
		fail(`sitemap-index.xml: expected ${SITEMAP_INDEX_ENTRIES} sub-sitemaps, got ${indexLocs.length}`);
		bump();
	} else ok(`sitemap-index.xml lists ${SITEMAP_INDEX_ENTRIES} sub-sitemaps (EN + locales + images)`);

	if (!indexLocs.includes(`${SITE}/sitemap.xml`)) {
		fail('sitemap-index.xml missing sitemap.xml');
		bump();
	}
	if (!indexLocs.includes(`${SITE}/sitemap-images.xml`)) {
		fail('sitemap-index.xml missing sitemap-images.xml');
		bump();
	}
	for (const locale of I18N_LOCALE_CODES) {
		const loc = `${SITE}/sitemap-${locale}.xml`;
		if (!indexLocs.includes(loc)) {
			fail(`sitemap-index.xml missing locale sitemap: sitemap-${locale}.xml`);
			bump();
		}
	}
	if (errors === 0) ok('sitemap-index.xml lists English, all locale, and image sitemaps');

	for (const sub of ['sitemap-index.xml', 'sitemap.xml']) {
		if (!robots.includes(`${SITE}/${sub}`)) {
			fail(`robots.txt missing Sitemap: ${sub}`);
			bump();
		}
	}
	for (const sub of ['sitemap-i18n.xml', 'sitemap-images.xml', 'sitemap-blog.xml']) {
		if (robots.includes(`${SITE}/${sub}`)) {
			fail(`robots.txt must not list redundant sitemap: ${sub}`);
			bump();
		}
	}
	if (errors === 0) ok('robots.txt lists primary sitemap URLs only');

	const htmlPaths = await collectHtmlPaths(DIST);
	const sitemapPaths = new Set(enLocs.map((u) => u.replace(SITE, '') || '/'));
	const htmlSet = new Set(htmlPaths);

	if (htmlSet.size !== TOTAL_HTML_PAGES) {
		fail(`Built HTML pages: expected ${TOTAL_HTML_PAGES} (EN + locale UI), got ${htmlSet.size}`);
		bump();
	} else ok(`${TOTAL_HTML_PAGES} HTML pages built (English SEO + locale UI routes)`);

	const missingEnglish = [...sitemapPaths].filter((p) => !htmlSet.has(p));
	if (missingEnglish.length > 0) {
		fail(`Sitemap URLs without HTML: ${missingEnglish.slice(0, 5).join(', ')}`);
		bump();
	} else ok('Every English sitemap URL has a matching HTML page');

	const localeHtml = [...htmlSet].filter((p) => /^\/[a-z]{2}\//.test(p));
	if (localeHtml.length !== LOCALE_UI_PAGES) {
		fail(`Locale UI HTML pages: expected ${LOCALE_UI_PAGES}, got ${localeHtml.length}`);
		bump();
	} else ok(`${localeHtml.length} localized HTML pages built`);

	// Locale pages must be full HTML, not redirect stubs (~354 bytes).
	const frHome = path.join(DIST, 'fr', 'index.html');
	try {
		const frStat = await stat(frHome);
		if (frStat.size < 2000) {
			fail(`/fr/ built as redirect stub (${frStat.size} bytes) — check middleware SSG guard`);
			bump();
		} else {
			ok(`/fr/ builds as full HTML (${frStat.size} bytes)`);
		}
	} catch {
		fail('Missing /fr/index.html — locale pages not built');
		bump();
	}

	const warframeCheats = path.join(DIST, 'enlisted-cheats', 'index.html');
	try {
		const cheatsStat = await stat(warframeCheats);
		if (cheatsStat.size < 2000) {
			fail(`/enlisted-cheats/ built as redirect stub (${cheatsStat.size} bytes)`);
			bump();
		} else {
			ok(`/enlisted-cheats/ builds as live pillar page (${cheatsStat.size} bytes)`);
		}
	} catch {
		fail('Missing /enlisted-cheats/index.html — pillar page not built');
		bump();
	}

	console.log('');
	if (errors > 0) {
		console.error(`Validation failed with ${errors} error(s).`);
		process.exit(1);
	}
	console.log('All sitemap checks passed.');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
