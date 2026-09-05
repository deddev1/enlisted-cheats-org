#!/usr/bin/env node
/**
 * Lists every sitemap file with URL counts and validation status.
 * Run after build: node scripts/list-sitemaps.mjs
 * Optional live check: node scripts/list-sitemaps.mjs --live
 */
import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://enlistedcheats.org';
const LIVE = process.argv.includes('--live');

async function resolveDistRoot() {
	for (const dir of [path.join(ROOT, 'dist'), path.join(ROOT, 'dist', 'client')]) {
		try {
			await access(path.join(dir, 'sitemap-index.xml'));
			return dir;
		} catch {
			// try next
		}
	}
	throw new Error('Run `npm run build` first — no sitemap-index.xml in dist/.');
}

function extractLocs(xml) {
	return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

function isValidXml(xml) {
	return xml.startsWith('<?xml') && (xml.includes('<urlset') || xml.includes('<sitemapindex'));
}

async function checkLive(file, expectedMin) {
	const url = `${SITE}/${file}`;
	try {
		const res = await fetch(url);
		const xml = await res.text();
		const count = extractLocs(xml).length;
		const ok = res.ok && isValidXml(xml) && count >= expectedMin;
		return { ok, status: res.status, count };
	} catch (err) {
		return { ok: false, status: 0, count: 0, error: String(err) };
	}
}

async function main() {
	const DIST = await resolveDistRoot();
	const files = (await readdir(DIST))
		.filter((f) => f.startsWith('sitemap') && f.endsWith('.xml'))
		.sort((a, b) => {
			if (a === 'sitemap-index.xml') return -1;
			if (b === 'sitemap-index.xml') return 1;
			if (a === 'sitemap.xml') return -1;
			if (b === 'sitemap.xml') return 1;
			return a.localeCompare(b);
		});

	console.log(`\nAll sitemaps for ${SITE} (${files.length} files)\n`);
	console.log('| # | File | URLs | Role |');
	console.log('|---|------|------|------|');

	const indexXml = await readFile(path.join(DIST, 'sitemap-index.xml'), 'utf8');
	const indexLocs = new Set(extractLocs(indexXml));

	let n = 0;
	let errors = 0;

	for (const file of files) {
		n += 1;
		const xml = await readFile(path.join(DIST, file), 'utf8');
		const count = extractLocs(xml).length;
		const valid = isValidXml(xml);

		let role = 'locale pages';
		if (file === 'sitemap-index.xml') role = '**master index** — submit this in GSC';
		else if (file === 'sitemap.xml') role = '**English pages** (marketing + blog + reviews + guides)';
		else if (file === 'sitemap-images.xml') role = 'image entries (included in index)';
		else if (file === 'sitemap-i18n.xml') role = 'all locales combined (525 URLs)';
		else if (file.startsWith('sitemap-') && file !== 'sitemap-images.xml' && file !== 'sitemap-i18n.xml') {
			const locale = file.replace('sitemap-', '').replace('.xml', '');
			role = `${locale.toUpperCase()} locale (25 pages)`;
		}

		const inIndex = file === 'sitemap-index.xml' || file === 'sitemap-i18n.xml'
			? '—'
			: indexLocs.has(`${SITE}/${file}`)
				? 'in index'
				: 'not in index';

		if (!valid || (file !== 'sitemap-index.xml' && count === 0)) {
			errors += 1;
			console.log(`| ${n} | \`${file}\` | ${count} | ${role} | ❌ EMPTY/INVALID |`);
		} else {
			console.log(`| ${n} | \`${file}\` | ${count} | ${role} (${inIndex}) |`);
		}

		if (LIVE && file !== 'sitemap-index.xml') {
			const live = await checkLive(file, count > 0 ? 1 : 0);
			const icon = live.ok && live.count === count ? '✓' : '✗';
			console.log(`    live: ${icon} HTTP ${live.status}, ${live.count} URLs (expected ${count})`);
			if (!live.ok || live.count !== count) errors += 1;
		}
	}

	console.log('\n**Submit in Google Search Console:**');
	console.log(`- ${SITE}/sitemap-index.xml  (covers all 23 sub-sitemaps)`);
	console.log(`- ${SITE}/sitemap.xml  (English only shortcut)\n`);

	if (errors > 0) {
		console.error(`\n${errors} sitemap issue(s) found.`);
		if (LIVE) console.error('Live site may need redeploy — run build locally to compare.');
		process.exit(1);
	}
	console.log('All sitemaps valid.\n');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
