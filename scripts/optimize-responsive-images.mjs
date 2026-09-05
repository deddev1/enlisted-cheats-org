import { readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const imagesDir = path.resolve('public/images');

/** Hero LCP asset — responsive widths for srcset */
const HERO_WIDTHS = [480, 640, 960, 1400];

/** Below-fold content images — responsive widths for gallery/product cards */
const CONTENT_WIDTHS = [480, 640, 960];

const HERO_FILE = 'enlisted-cheats-hero.webp';

const SKIP_PATTERNS = [
	/-\d+w\.webp$/i,
	/zadeyo-logo/i,
	/favicon/i,
	/enlisted-cheats-logo/i,
	/^rust-/i,
];

async function optimizeHero() {
	const source = path.join(imagesDir, HERO_FILE);
	const meta = await sharp(source).metadata();
	const results = [];

	for (const width of HERO_WIDTHS) {
		if (meta.width && width > meta.width) continue;
		const file = `enlisted-cheats-hero-${width}w.webp`;
		const dest = path.join(imagesDir, file);
		const quality = width <= 480 ? 62 : width <= 640 ? 72 : 80;
		const buffer = await sharp(source)
			.resize({ width, withoutEnlargement: true })
			.webp({ quality, effort: 6 })
			.toBuffer();
		await writeFile(dest, buffer);
		results.push({ file, width, bytes: buffer.length });
		console.log(`Wrote ${file} (${buffer.length} bytes)`);
	}

	return results;
}

async function optimizeEnlistedScreenshots() {
	const files = await readdir(imagesDir);
	const sources = files.filter((file) => /^warframe-.*\.png$/i.test(file));
	const results = [];

	for (const file of sources) {
		const source = path.join(imagesDir, file);
		const base = file.replace(/\.png$/i, '');
		const meta = await sharp(source).metadata();

		const master = `${base}.webp`;
		const masterBuffer = await sharp(source).webp({ quality: 82, effort: 6 }).toBuffer();
		await writeFile(path.join(imagesDir, master), masterBuffer);
		results.push({ file: master, width: meta.width ?? 0, bytes: masterBuffer.length });
		console.log(`Wrote ${master} (${masterBuffer.length} bytes)`);

		for (const width of CONTENT_WIDTHS) {
			if (meta.width && width >= meta.width) continue;
			const variant = `${base}-${width}w.webp`;
			const dest = path.join(imagesDir, variant);
			const quality = width <= 480 ? 72 : width <= 640 ? 78 : 82;
			const buffer = await sharp(source)
				.resize({ width, withoutEnlargement: true })
				.webp({ quality, effort: 6 })
				.toBuffer();
			await writeFile(dest, buffer);
			results.push({ file: variant, width, bytes: buffer.length });
			console.log(`Wrote ${variant} (${buffer.length} bytes)`);
		}
	}

	return results;
}

async function optimizeContentImages() {
	const files = await readdir(imagesDir);
	const sources = files.filter(
		(file) =>
			file.endsWith('.webp') &&
			file.startsWith('warframe-') &&
			!file.endsWith('.png') &&
			!SKIP_PATTERNS.some((pattern) => pattern.test(file)) &&
			file !== HERO_FILE &&
			!/-\d+w\.webp$/i.test(file),
	);

	const results = [];

	for (const file of sources) {
		const source = path.join(imagesDir, file);
		const meta = await sharp(source).metadata();
		const base = file.replace(/\.webp$/i, '');

		for (const width of CONTENT_WIDTHS) {
			const variant = `${base}-${width}w.webp`;
			const dest = path.join(imagesDir, variant);
			try {
				const existing = await sharp(dest).metadata();
				if (existing.width) continue;
			} catch {
				// variant missing — generate below
			}
			if (meta.width && width >= meta.width) continue;
			const quality = width <= 480 ? 72 : width <= 640 ? 78 : 82;
			const buffer = await sharp(source)
				.resize({ width, withoutEnlargement: true })
				.webp({ quality, effort: 6 })
				.toBuffer();
			await writeFile(dest, buffer);
			results.push({ file: variant, width, bytes: buffer.length });
			console.log(`Wrote ${variant} (${buffer.length} bytes)`);
		}
	}

	return results;
}

const heroResults = await optimizeHero();
const screenshotResults = await optimizeEnlistedScreenshots();
const contentResults = await optimizeContentImages();
console.log(
	`Done — ${heroResults.length} hero + ${screenshotResults.length} screenshot + ${contentResults.length} content variants.`,
);
