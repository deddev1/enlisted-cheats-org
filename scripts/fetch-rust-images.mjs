#!/usr/bin/env node
/**
 * Download royalty-free Enlisted-atmosphere imagery (Unsplash) into public/images
 * with SEO keyword filenames. Run: node scripts/fetch-rust-images.mjs
 */
import { mkdir, readdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const imagesDir = path.resolve('public/images');
const publicDir = path.resolve('public');

/** Unsplash photos — industrial / wilderness / rusty metal atmosphere (not game IP). */
const KEYWORD_ASSETS = [
	{ file: 'enlisted-cheats-hero.webp', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80' },
	{ file: 'enlisted-cheats-cover.webp', url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1920&q=80' },
	{ file: 'rust-loadout-builder.webp', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80' },
	{ file: 'enlisted-cheats-aimbot-combat.webp', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1920&q=80' },
	{ file: 'rust-squad-fight.webp', url: 'https://images.unsplash.com/photo-1516937941344-00b4d548a9a4?auto=format&fit=crop&w=1920&q=80' },
	{ file: 'enlisted-cheats-esp-wallhack.webp', url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80' },
	{ file: 'enlisted-cheats-package.webp', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&q=80' },
	{ file: 'rust-header-art.webp', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80' },
	{ file: 'rust-battle-royale-combat.webp', url: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1920&q=80' },
	{ file: 'rust-reboot-van-fight.webp', url: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1920&q=80' },
	{ file: 'rust-player-esp.webp', url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=80' },
	{ file: 'rust-zero-build-combat.webp', url: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1920&q=80' },
	{ file: 'rust-zero-build-mode.webp', url: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1920&q=80' },
	{ file: 'rust-battle-royale-island-map.webp', url: 'https://images.unsplash.com/photo-1569163139394-de61091f028b?auto=format&fit=crop&w=1920&q=80' },
];

const LEGACY_PATTERNS = [/^fortnite-/i];

async function fetchWebp(url) {
	const res = await fetch(url, {
		headers: { 'User-Agent': 'Mozilla/5.0 (compatible; EnlistedHacksSite/1.0)' },
	});
	if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
	const input = Buffer.from(await res.arrayBuffer());
	return sharp(input).resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 84 }).toBuffer();
}

async function removeLegacyImages() {
	const files = await readdir(imagesDir).catch(() => []);
	for (const file of files) {
		if (LEGACY_PATTERNS.some((pattern) => pattern.test(file))) {
			await unlink(path.join(imagesDir, file));
			console.log(`Removed legacy ${file}`);
		}
	}
}

async function generateBrandAssets(heroBuffer) {
	const logoBuffer = await sharp(heroBuffer)
		.resize(512, 512, { fit: 'cover' })
		.webp({ quality: 88 })
		.toBuffer();

	await writeFile(path.join(imagesDir, 'enlisted-cheats-logo.webp'), logoBuffer);

	const iconSizes = [
		{ name: 'favicon-16x16.png', size: 16 },
		{ name: 'favicon-32x32.png', size: 32 },
		{ name: 'apple-touch-icon.png', size: 180 },
		{ name: 'favicon.png', size: 192 },
	];

	for (const { name, size } of iconSizes) {
		const png = await sharp(logoBuffer).resize(size, size).png().toBuffer();
		await writeFile(path.join(publicDir, name), png);
	}

	await writeFile(path.join(publicDir, 'favicon.ico'), await sharp(logoBuffer).resize(32, 32).png().toBuffer());
}

await mkdir(imagesDir, { recursive: true });
await removeLegacyImages();

let heroBuffer = null;

for (const asset of KEYWORD_ASSETS) {
	console.log(`Fetching ${asset.file}`);
	try {
		const webp = await fetchWebp(asset.url);
		await writeFile(path.join(imagesDir, asset.file), webp);
		console.log(`Saved ${asset.file} (${webp.length} bytes)`);
		if (asset.file === 'enlisted-cheats-hero.webp') heroBuffer = webp;
	} catch (err) {
		console.warn(`Skip ${asset.file}: ${err.message}`);
	}
}

if (heroBuffer) {
	await generateBrandAssets(heroBuffer);
	console.log('Generated keyword logo + favicons from hero art.');
}

console.log(`Done — attempted ${KEYWORD_ASSETS.length} Enlisted atmosphere images.`);
