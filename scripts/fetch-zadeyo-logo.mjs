import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const imagesDir = join(root, 'public', 'images');
const publicDir = join(root, 'public');

const LOGO_URL = 'https://zadeyo.com/rt-removebg-preview.png';

async function main() {
	await mkdir(imagesDir, { recursive: true });

	const response = await fetch(LOGO_URL);
	if (!response.ok) {
		throw new Error(`Failed to fetch logo: ${response.status} ${response.statusText}`);
	}

	const logoBuffer = Buffer.from(await response.arrayBuffer());
	const meta = await sharp(logoBuffer).metadata();

	await writeFile(join(imagesDir, 'zadeyo-logo.png'), logoBuffer);
	await writeFile(
		join(imagesDir, 'zadeyo-logo.webp'),
		await sharp(logoBuffer).webp({ quality: 90 }).toBuffer(),
	);

	const iconSizes = [
		{ name: 'favicon-16x16.png', size: 16 },
		{ name: 'favicon-32x32.png', size: 32 },
		{ name: 'favicon-48x48.png', size: 48 },
		{ name: 'apple-touch-icon.png', size: 180 },
		{ name: 'favicon.png', size: 192 },
		{ name: 'android-chrome-512x512.png', size: 512 },
	];

	for (const { name, size } of iconSizes) {
		const png = await sharp(logoBuffer)
			.resize(size, size, {
				fit: 'contain',
				background: { r: 0, g: 0, b: 0, alpha: 0 },
			})
			.png()
			.toBuffer();
		await writeFile(join(publicDir, name), png);
	}

	await writeFile(
		join(publicDir, 'favicon.ico'),
		await sharp(logoBuffer)
			.resize(32, 32, {
				fit: 'contain',
				background: { r: 0, g: 0, b: 0, alpha: 0 },
			})
			.png()
			.toBuffer(),
	);

	console.log(`Wrote zadeyo logo (${meta.width}x${meta.height}) + favicons from ${LOGO_URL}`);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
