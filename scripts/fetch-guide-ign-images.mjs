#!/usr/bin/env node
/**
 * Downloads IGN game hero images for external guides by scraping IGN game pages.
 * Run: node scripts/fetch-guide-ign-images.mjs
 */
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'public', 'images', 'guides');

/** gameId → IGN /games/ slug */
const IGN_GAME_SLUGS = {
	'deadside': 'deadside',
	'arc-raiders': 'arc-raiders',
	'genshin-impact': 'genshin-impact',
	'dead-by-daylight': 'dead-by-daylight',
	'escape-from-tarkov': 'escape-from-tarkov',
	'unturned': 'unturned',
	'war-thunder': 'war-thunder',
	'fortnite': 'fortnite',
	'marathon': 'marathon',
	'battlefield': 'battlefield-2042',
	'league-of-legends': 'league-of-legends',
	'call-of-duty-warzone': 'call-of-duty-warzone',
	'valorant': 'valorant',
	'gray-zone-warfare': 'gray-zone-warfare',
	'overwatch-2': 'overwatch-2',
	'the-isle': 'the-isle',
	'dayz': 'dayz',
	'rust': 'rust',
	'palworld': 'palworld',
	'rainbow-six-siege': 'rainbow-six-siege',
	'hunt-showdown': 'hunt-showdown',
	'destiny-2': 'destiny-2',
	'squad': 'squad',
	'once-human': 'once-human',
	'marvel-rivals': 'marvel-rivals',
	'mecha-break': 'mecha-break',
	'caliber': 'caliber',
	'call-of-duty': 'call-of-duty-modern-warfare-3',
	'bodycam': 'bodycam',
	'arena-breakout-infinite': 'arena-breakout-infinite',
	'arma-reforger': 'arma-reforger',
	'backrooms': 'escape-the-backrooms',
	'sand': 'sand',
	'the-finals': 'the-finals',
	'the-front': 'the-front',
	'lost-ark': 'lost-ark',
	'naraka-bladepoint': 'naraka-bladepoint',
	'minecraft': 'minecraft',
	'path-of-exile': 'path-of-exile',
	'warframe': 'warframe',
	'raft': 'raft',
	'sea-of-thieves': 'sea-of-thieves',
	'delta-force': 'delta-force',
};

mkdirSync(OUT_DIR, { recursive: true });

/**
 * @param {string} ignSlug
 */
async function fetchIgnImageUrl(ignSlug) {
	const pageUrl = `https://www.ign.com/games/${ignSlug}`;
	const res = await fetch(pageUrl, {
		headers: { 'User-Agent': 'Mozilla/5.0 (compatible; EnlistedCheatsGuideBot/1.0)' },
	});
	if (!res.ok) throw new Error(`Page HTTP ${res.status} for ${pageUrl}`);
	const html = await res.text();
	const matches = [...html.matchAll(/https:\/\/assets[0-9]?-prd\.ignimgs\.com\/[^"'\s;)]+|https:\/\/assets[0-9]\.ignimgs\.com\/[^"'\s;)]+/g)].map(
		(m) => m[0].split('?')[0],
	);
	const imageUrl = matches.find(
		(url) =>
			!url.includes('/registration/') &&
			!url.endsWith('.png') &&
			(url.includes('-button') || url.includes('keyart') || url.includes('key-art') || /\/20\d{2}\//.test(url)),
	);
	if (!imageUrl) throw new Error(`No IGN image found on ${pageUrl}`);
	return imageUrl;
}

let ok = 0;
let fail = 0;
/** @type {Record<string, string>} */
const resolvedSources = {};

for (const [gameId, ignSlug] of Object.entries(IGN_GAME_SLUGS)) {
	const outPath = join(OUT_DIR, `${gameId}.webp`);
	if (existsSync(outPath)) {
		console.log(`skip ${gameId} (exists)`);
		ok++;
		continue;
	}
	try {
		const imageUrl = await fetchIgnImageUrl(ignSlug);
		resolvedSources[gameId] = imageUrl;
		const imgRes = await fetch(`${imageUrl}?width=1200&format=jpg&auto=webp&quality=85`, {
			headers: { 'User-Agent': 'Mozilla/5.0 (compatible; EnlistedCheatsGuideBot/1.0)' },
		});
		if (!imgRes.ok) throw new Error(`Image HTTP ${imgRes.status}`);
		const buf = Buffer.from(await imgRes.arrayBuffer());
		const webp = await sharp(buf).resize(1200, 675, { fit: 'cover' }).webp({ quality: 82 }).toBuffer();
		writeFileSync(outPath, webp);
		console.log(`saved ${gameId}.webp ← ${imageUrl}`);
		ok++;
		await new Promise((r) => setTimeout(r, 300));
	} catch (err) {
		console.error(`FAIL ${gameId} (${ignSlug}): ${err.message}`);
		fail++;
	}
}

console.log(`Done: ${ok} ok, ${fail} failed`);
if (Object.keys(resolvedSources).length > 0) {
	console.log('Resolved sources:', JSON.stringify(resolvedSources, null, 2));
}
process.exit(fail > 0 ? 1 : 0);
