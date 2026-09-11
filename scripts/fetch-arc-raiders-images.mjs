import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'images');

/** Seven unique Enlisted cheat screenshots — keyword-mapped for enlistedcheats.org SEO. */
const SOURCES = [
	{
		url: 'https://cdn.wh-satano.ru/arcane-wt-s1.webp',
		file: 'enlisted-cheats-hero.webp',
		alt: 'Enlisted cheats main menu with ESP, wallhack, and aimbot toggles on PC',
	},
	{
		url: 'https://cdn.wh-satano.ru/arcane-wt-s2.webp',
		file: 'enlisted-esp-overlay.webp',
		alt: 'Enlisted ESP overlay showing enemy soldier positions and module health through terrain',
	},
	{
		url: 'https://cdn.wh-satano.ru/arcane-wt-s3.webp',
		file: 'enlisted-esp-enemies.webp',
		alt: 'Enlisted wallhack ESP with enemy outline boxes and distance readouts in campaign missions',
	},
	{
		url: 'https://cdn.wh-satano.ru/smg-wt-s1.webp',
		file: 'enlisted-esp-modules.webp',
		alt: 'Enlisted aimbot lead calculator lock on enemy soldier turret during squad fight',
	},
	{
		url: 'https://cdn.wh-satano.ru/smg-wt-s2.webp',
		file: 'enlisted-aimbot-menu.webp',
		alt: 'Enlisted cheats cheat menu with aimbot, ballistic prediction, and FOV settings',
	},
	{
		url: 'https://cdn.wh-satano.ru/smg-wt-s3.webp',
		file: 'enlisted-radar-hack.webp',
		alt: 'Enlisted radar hack 2D overlay showing flank routes and enemy aircraft',
	},
	{
		url: 'https://cdn.wh-satano.ru/wtfecs1.webp',
		file: 'enlisted-mission.webp',
		alt: 'Enlisted cheats campaign mission with ESP boxes and aimbot active on capture zone',
	},
];

const VARIANT_WIDTHS = [480, 640, 960, 1400];

async function download(url) {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
	return Buffer.from(await res.arrayBuffer());
}

async function writeMaster(buffer, file) {
	const masterPath = join(outDir, file);
	await writeFile(masterPath, buffer);
	return masterPath;
}

async function writeVariants(buffer, file) {
	const base = file.replace(/\.webp$/i, '');
	for (const width of VARIANT_WIDTHS) {
		const variantPath = join(outDir, `${base}-${width}w.webp`);
		await sharp(buffer)
			.resize({ width, withoutEnlargement: true })
			.webp({ quality: 82 })
			.toFile(variantPath);
	}
}

await mkdir(outDir, { recursive: true });

for (const item of SOURCES) {
	console.log(`Fetching ${item.file}…`);
	const buffer = await download(item.url);
	await writeMaster(buffer, item.file);
	await writeVariants(buffer, item.file);
	console.log(`  ✓ ${item.file} (+ variants)`);
}

console.log('Done — 7 Enlisted cheat images installed.');
