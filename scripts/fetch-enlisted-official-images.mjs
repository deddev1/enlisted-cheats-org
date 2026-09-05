import { mkdir, writeFile, unlink } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'images', 'enlisted-official');

const SOURCES = [
	{
		url: 'https://enlisted.net/i/scr/10.jpg?v=20251222',
		file: 'battle-hero.jpg',
		webp: 'battle-hero.webp',
		alt: 'Enlisted WW2 battlefield screenshot with infantry and vehicles in combat',
	},
	{
		url: 'https://enlisted.net/i/scr/3.jpg?v=20251222',
		file: 'battle-combat.jpg',
		webp: 'battle-combat.webp',
		alt: 'Enlisted large-scale battle with soldiers advancing through smoke and artillery',
	},
	{
		url: 'https://enlisted.net/i/scr/thumb-6.webp?v=20251222',
		file: 'battle-thumb.webp',
		alt: 'Enlisted squad combat thumbnail for reviews and social previews',
	},
];

const VARIANT_WIDTHS = [480, 640, 960, 1400];

async function download(url) {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
	return Buffer.from(await res.arrayBuffer());
}

await mkdir(outDir, { recursive: true });

for (const item of SOURCES) {
	console.log(`Fetching ${item.file}…`);
	const buffer = await download(item.url);
	await writeFile(join(outDir, item.file), buffer);

	if (item.webp) {
		const webpBuffer = await sharp(buffer).webp({ quality: 82 }).toBuffer();
		await writeFile(join(outDir, item.webp), webpBuffer);
		const base = item.webp.replace(/\.webp$/i, '');
		for (const width of VARIANT_WIDTHS) {
			await sharp(webpBuffer)
				.resize({ width, withoutEnlargement: true })
				.webp({ quality: 82 })
				.toFile(join(outDir, `${base}-${width}w.webp`));
		}
		console.log(`  ✓ ${item.webp} (+ variants)`);
	} else {
		console.log(`  ✓ ${item.file}`);
	}
}

for (const stray of ['battle-heroundefined', 'battle-combatundefined']) {
	try {
		await unlink(join(outDir, stray));
	} catch {
		// ignore
	}
}

console.log('Done — official Enlisted screenshots saved to public/images/enlisted-official/');
