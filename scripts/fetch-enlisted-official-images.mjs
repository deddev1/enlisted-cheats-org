#!/usr/bin/env node
/**
 * Mirror enlisted.net marketing screenshots to local responsive WebP.
 * Run: node scripts/fetch-enlisted-official-images.mjs
 */
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const imagesDir = path.resolve('public/images');
const WIDTHS = [480, 640, 960, 1400];

const SOURCES = [
	{
		url: 'https://enlisted.net/i/scr/10.jpg?v=20251222',
		base: 'enlisted-official-panorama',
		quality: { master: 82, 480: 68, 640: 74, 960: 78, 1400: 82 },
	},
	{
		url: 'https://enlisted.net/i/scr/3.jpg?v=20251222',
		base: 'enlisted-official-squad-combat',
		quality: { master: 76, 480: 62, 640: 68, 960: 72, 1400: 76 },
	},
	{
		url: 'https://enlisted.net/i/scr/thumb-6.webp?v=20251222',
		base: 'enlisted-official-squad-thumb',
		quality: { master: 80 },
	},
];

async function fetchBuffer(url) {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
	return Buffer.from(await res.arrayBuffer());
}

for (const { url, base, quality } of SOURCES) {
	const input = await fetchBuffer(url);
	const meta = await sharp(input).metadata();

	const masterBuf = await sharp(input).webp({ quality: quality.master, effort: 6 }).toBuffer();
	await writeFile(path.join(imagesDir, `${base}.webp`), masterBuf);
	console.log(`Wrote ${base}.webp (${masterBuf.length} bytes)`);

	for (const width of WIDTHS) {
		if (meta.width && width > meta.width) continue;
		const q = quality[width] ?? quality.master;
		const buf = await sharp(input)
			.resize({ width, withoutEnlargement: true })
			.webp({ quality: q, effort: 6 })
			.toBuffer();
		const file = `${base}-${width}w.webp`;
		await writeFile(path.join(imagesDir, file), buf);
		console.log(`Wrote ${file} (${buf.length} bytes)`);
	}
}

console.log('Done.');
