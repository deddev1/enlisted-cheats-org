import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const supabaseBase =
	'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/enlisted';

const imagesDir = path.resolve('public/images');
const CONTENT_WIDTHS = [480, 640, 960];

/** Remote Supabase assets mapped to local responsive basenames. */
const ASSETS = [
	{
		url: `${supabaseBase}/Screenshot%202026-09-04%20161627.png`,
		base: 'enlisted-gameplay-wallhack',
	},
	{
		url: `${supabaseBase}/Screenshot%202026-09-04%20161636.png`,
		base: 'enlisted-gameplay-esp',
	},
	{
		url: `${supabaseBase}/Screenshot%202026-09-04%20161643.png`,
		base: 'enlisted-gameplay-aimbot',
	},
	{
		url: `${supabaseBase}/Screenshot%202026-09-04%20161704.png`,
		base: 'enlisted-gameplay-radar-combat',
	},
	{
		url: `${supabaseBase}/Screenshot%202026-09-04%20161712.png`,
		base: 'enlisted-gameplay-radar-map',
	},
	{
		url: `${supabaseBase}/bottom-shop-bg.webp`,
		base: 'enlisted-pricing-shop-bg',
	},
];

async function fetchBuffer(url) {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
	}
	return Buffer.from(await response.arrayBuffer());
}

async function writeResponsiveWebp(sourceBuffer, base) {
	const masterPath = path.join(imagesDir, `${base}.webp`);
	const masterBuffer = await sharp(sourceBuffer).webp({ quality: 82, effort: 6 }).toBuffer();
	await writeFile(masterPath, masterBuffer);
	console.log(`Wrote ${base}.webp (${masterBuffer.length} bytes)`);

	const meta = await sharp(sourceBuffer).metadata();

	for (const width of CONTENT_WIDTHS) {
		if (!meta.width) continue;

		if (width >= meta.width) {
			if (width === 480) {
				const variant = `${base}-480w.webp`;
				const buffer = await sharp(sourceBuffer)
					.resize({ width: meta.width, withoutEnlargement: true })
					.webp({ quality: 72, effort: 6 })
					.toBuffer();
				await writeFile(path.join(imagesDir, variant), buffer);
				console.log(`Wrote ${variant} (${buffer.length} bytes, native ${meta.width}px)`);
			}
			continue;
		}

		const quality = width <= 480 ? 72 : width <= 640 ? 78 : 82;
		const variant = `${base}-${width}w.webp`;
		const buffer = await sharp(sourceBuffer)
			.resize({ width, withoutEnlargement: true })
			.webp({ quality, effort: 6 })
			.toBuffer();
		await writeFile(path.join(imagesDir, variant), buffer);
		console.log(`Wrote ${variant} (${buffer.length} bytes)`);
	}
}

async function main() {
	for (const asset of ASSETS) {
		const buffer = await fetchBuffer(asset.url);
		await writeResponsiveWebp(buffer, asset.base);
	}
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
