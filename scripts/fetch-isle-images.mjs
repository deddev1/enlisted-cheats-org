#!/usr/bin/env node
/**
 * Download The Isle Steam store screenshots into existing public/images paths
 * so hero/gallery/OG keep working without path rewires.
 * Run: node scripts/fetch-isle-images.mjs
 */
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const imagesDir = path.resolve('public/images');

const STEAM_SHOTS = [
	'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/376210/ss_6cd28dd53eafdc554e5ce34f8a16dcc5b98108a1.1920x1080.jpg',
	'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/376210/ss_8d63cb38072130b757b20c230b0c8acb5277c111.1920x1080.jpg',
	'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/376210/ss_afcf388e9e0db1392670fa01d935a9f81967be3c.1920x1080.jpg',
	'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/376210/ss_24b6c83804afa270e658ef5b234f4b6edd6bef07.1920x1080.jpg',
	'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/376210/ss_868033a862fd428cce7fbd476fd0cc8e3b747ae8.1920x1080.jpg',
	'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/376210/ss_621af6de335a68d0fc50c89154b31664cd682646.1920x1080.jpg',
	'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/376210/ss_adc8573f459c7db0720079504ee65049f74302dd.1920x1080.jpg',
	'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/376210/ss_86a537b7ec72eda17fe2c32e51c11512623dfee9.1920x1080.jpg',
	'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/376210/ss_33d76fde3b16046a457f75b0813572a7e948a10b.1920x1080.jpg',
	'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/376210/ss_37fc8f90654e67ea2130dd82282a9439319493ae.1920x1080.jpg',
	'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/376210/ss_12ee4ee37c7d8d2026bb84ef1f7ba5002917a945.1920x1080.jpg',
	'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/376210/ss_b2b27b7017219659be182fbe486cfbb073b67e4a.1920x1080.jpg',
];

/** Map existing SEO filenames → Steam screenshot index */
const TARGETS = [
	{ file: 'enlisted-cheats-hero.webp', shot: 0 },
	{ file: 'enlisted-esp-overlay.webp', shot: 1 },
	{ file: 'enlisted-esp-enemies.webp', shot: 2 },
	{ file: 'enlisted-esp-modules.webp', shot: 3 },
	{ file: 'enlisted-aimbot-menu.webp', shot: 4 },
	{ file: 'rust-recoil-trainer.webp', shot: 5 },
	{ file: 'enlisted-aimbot-ui.webp', shot: 6 },
	{ file: 'enlisted-wallhack-ui.webp', shot: 7 },
	{ file: 'enlisted-cheats-menu.webp', shot: 8 },
	{ file: 'enlisted-cheats-dashboard.webp', shot: 8 },
	{ file: 'enlisted-cheats-cover.webp', shot: 9 },
	{ file: 'enlisted-cheats-panel.webp', shot: 10 },
	{ file: 'enlisted-cheats-status.webp', shot: 11 },
	{ file: 'enlisted-radar-ui.webp', shot: 2 },
	{ file: 'enlisted-soft-aim-ui.webp', shot: 4 },
	{ file: 'enlisted-cheats-dashboard.webp', shot: 1 },
];

async function fetchBuffer(url) {
	const res = await fetch(url, {
		headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Enlisted CheatsSite/1.0)' },
	});
	if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
	return Buffer.from(await res.arrayBuffer());
}

const cache = new Map();

async function getShot(index) {
	if (!cache.has(index)) {
		const buf = await fetchBuffer(STEAM_SHOTS[index]);
		cache.set(index, buf);
		console.log(`Fetched shot ${index}`);
	}
	return cache.get(index);
}

const seen = new Set();
for (const { file, shot } of TARGETS) {
	if (seen.has(file)) continue;
	seen.add(file);
	const input = await getShot(shot);
	const webp = await sharp(input)
		.resize({ width: 1920, withoutEnlargement: true })
		.webp({ quality: 84, effort: 6 })
		.toBuffer();
	await writeFile(path.join(imagesDir, file), webp);
	console.log(`Wrote ${file} (${webp.length} bytes)`);
}

console.log('Done — Isle screenshots written to existing paths.');
