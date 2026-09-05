#!/usr/bin/env node
/**
 * Bulk rebrand Overwatch Hacks → War Thunder Hacks (warthunderhacks.com)
 */
import { readFileSync, writeFileSync, readdirSync, renameSync, existsSync, copyFileSync, unlinkSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const TEXT_EXTENSIONS = new Set([
	'.ts', '.tsx', '.js', '.mjs', '.astro', '.css', '.json', '.toml', '.txt', '.md', '.html',
]);

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.astro']);
const SKIP_FILES = new Set([
	'rebrand-war-thunder.mjs',
	'rebrand-overwatch.mjs',
	'rebrand-arc-raiders.mjs',
	'adapt-rust.mjs',
]);

/** Longest / most specific replacements first. */
const REPLACEMENTS = [
	// Domain & email
	['https://www.overwatchhacks.com', 'https://warthunderhacks.com'],
	['https://overwatchhacks.com', 'https://warthunderhacks.com'],
	['http://www.overwatchhacks.com', 'https://warthunderhacks.com'],
	['http://overwatchhacks.com', 'https://warthunderhacks.com'],
	['www.overwatchhacks.com', 'www.warthunderhacks.com'],
	['overwatchhacks.com', 'warthunderhacks.com'],
	['support@overwatchhacks.com', 'support@warthunderhacks.com'],
	// Canonical URL paths
	['/overwatch-wallhack/', '/war-thunder-wallhack/'],
	['/overwatch-aimbot/', '/war-thunder-aimbot/'],
	['/overwatch-radar/', '/war-thunder-radar/'],
	['/overwatch-esp/', '/war-thunder-esp/'],
	['/overwatch-hacks/', '/war-thunder-hacks/'],
	['/overwatch-unlock-all/', '/features/'],
	['/overwatch-wallhack', '/war-thunder-wallhack'],
	['/overwatch-aimbot', '/war-thunder-aimbot'],
	['/overwatch-radar', '/war-thunder-radar'],
	['/overwatch-esp', '/war-thunder-esp'],
	['/overwatch-hacks', '/war-thunder-hacks'],
	// Assets & scripts
	['data-overwatch-hacks-video', 'data-war-thunder-hacks-video'],
	['overwatch-hacks-bg-video.js', 'war-thunder-hacks-bg-video.js'],
	['overwatch-ranked-fight.webp', 'war-thunder-battle.webp'],
	['overwatch-esp-hitbox.webp', 'war-thunder-esp-modules.webp'],
	['overwatch-esp-bots.webp', 'war-thunder-esp-tanks.webp'],
	['overwatch-esp-overlay.webp', 'war-thunder-esp-overlay.webp'],
	['overwatch-aimbot-menu.webp', 'war-thunder-aimbot-menu.webp'],
	['overwatch-radar-hack.webp', 'war-thunder-radar-hack.webp'],
	['overwatch-hacks-hero.webp', 'war-thunder-hacks-hero.webp'],
	['/images/overwatch', '/images/war-thunder'],
	// Page IDs & slugs
	['overwatch-unlock-all', 'war-thunder-unlock-all'],
	['overwatch-wallhack', 'war-thunder-wallhack'],
	['overwatch-aimbot-hack', 'war-thunder-aimbot-hack'],
	['overwatch-esp-hack', 'war-thunder-esp-hack'],
	['overwatch-cheat-download', 'war-thunder-cheat-download'],
	['overwatch-cheats-2026', 'war-thunder-cheats-2026'],
	['overwatch-mod-menu', 'war-thunder-mod-menu'],
	['overwatch-soft-aim', 'war-thunder-soft-aim'],
	['best-overwatch-cheats', 'best-war-thunder-cheats'],
	['undetected-overwatch-cheats', 'undetected-war-thunder-cheats'],
	['eac-bypass-overwatch', 'eac-bypass-war-thunder'],
	['overwatch-aimbot', 'war-thunder-aimbot'],
	['overwatch-radar-hack', 'war-thunder-radar-hack'],
	['overwatch-radar', 'war-thunder-radar'],
	['overwatch-esp', 'war-thunder-esp'],
	['overwatch-hacks', 'war-thunder-hacks'],
	['overwatch-cheats', 'war-thunder-cheats'],
	// Localized slug patterns (overwatch → war-thunder)
	['eac-bypass-overwatch-trucos-overwatch', 'eac-bypass-war-thunder-trucos-war-thunder'],
	['eac-bypass-overwatch-triche-overwatch', 'eac-bypass-war-thunder-triche-war-thunder'],
	['eac-bypass-overwatch-cheats-overwatch', 'eac-bypass-war-thunder-cheats-war-thunder'],
	['eac-bypass-overwatch-chity-overwatch', 'eac-bypass-war-thunder-chity-war-thunder'],
	['undetected-overwatch-cheats', 'undetected-war-thunder-cheats'],
	['nedecektiruemye-chity-overwatch', 'nedecektiruemye-chity-war-thunder'],
	['nedecektovani-chity-overwatch', 'nedecektovani-chity-war-thunder'],
	['tespit-edilemeyen-overwatch-hileleri', 'tespit-edilemeyen-war-thunder-hileleri'],
	['niewykrywalne-cheats-overwatch', 'niewykrywalne-cheats-war-thunder'],
	['unentdeckte-overwatch-cheats', 'unentdeckte-war-thunder-cheats'],
	['cheats-overwatch-indetectaveis', 'cheats-war-thunder-indetectaveis'],
	['trucchi-overwatch-indetectabili', 'trucchi-war-thunder-indetectabili'],
	['cheats-overwatch-nedetectabile', 'cheats-war-thunder-nedetectabile'],
	['caracteristicas-trucos-overwatch', 'caracteristicas-trucos-war-thunder'],
	['fonctionnalites-triche-overwatch', 'fonctionnalites-triche-war-thunder'],
	['overwatch-cheats-funktionen', 'war-thunder-cheats-funktionen'],
	['recursos-cheats-overwatch', 'recursos-cheats-war-thunder'],
	['funzioni-trucchi-overwatch', 'funzioni-trucchi-war-thunder'],
	['overwatch-cheats-functies', 'war-thunder-cheats-functies'],
	['funkcje-cheatow-overwatch', 'funkcje-cheatow-war-thunder'],
	['funkcii-chitov-overwatch', 'funkcii-chitov-war-thunder'],
	['overwatch-hile-ozellikleri', 'war-thunder-hile-ozellikleri'],
	['precios-trucos-overwatch', 'precios-trucos-war-thunder'],
	['prix-triche-overwatch', 'prix-triche-war-thunder'],
	['overwatch-cheats-preise', 'war-thunder-cheats-preise'],
	['precos-cheats-overwatch', 'precos-cheats-war-thunder'],
	['prezzi-trucchi-overwatch', 'prezzi-trucchi-war-thunder'],
	['overwatch-cheats-prijzen', 'war-thunder-cheats-prijzen'],
	['ceny-cheatow-overwatch', 'ceny-cheatow-war-thunder'],
	['ceny-chitov-overwatch', 'ceny-chitov-war-thunder'],
	['overwatch-hile-fiyatlari', 'war-thunder-hile-fiyatlari'],
	['trucos-overwatch-2026', 'trucos-war-thunder-2026'],
	['triche-overwatch-2026', 'triche-war-thunder-2026'],
	['trucchi-overwatch-2026', 'trucchi-war-thunder-2026'],
	['cheaty-overwatch-2026', 'cheaty-war-thunder-2026'],
	['chity-overwatch-2026', 'chity-war-thunder-2026'],
	['overwatch-hileleri-2026', 'war-thunder-hileleri-2026'],
	['cheats-overwatch-2026', 'cheats-war-thunder-2026'],
	['hacks-trucos-overwatch', 'hacks-trucos-war-thunder'],
	['hacks-triche-overwatch', 'hacks-triche-war-thunder'],
	['hacks-cheats-overwatch', 'hacks-cheats-war-thunder'],
	['hacks-trucchi-overwatch', 'hacks-trucchi-war-thunder'],
	['hacks-cheatow-overwatch', 'hacks-cheatow-war-thunder'],
	['haksy-chity-overwatch', 'haksy-chity-war-thunder'],
	['overwatch-hile-hacks', 'war-thunder-hile-hacks'],
	['trucos-overwatch-esp', 'trucos-war-thunder-esp'],
	['triche-overwatch-esp', 'triche-war-thunder-esp'],
	['cheats-overwatch-esp', 'cheats-war-thunder-esp'],
	['trucchi-overwatch-esp', 'trucchi-war-thunder-esp'],
	['cheaty-overwatch-esp', 'cheaty-war-thunder-esp'],
	['chity-overwatch-esp', 'chity-war-thunder-esp'],
	['overwatch-esp-chity', 'war-thunder-esp-chity'],
	['overwatch-esp-hile', 'war-thunder-esp-hile'],
	['trucos-overwatch-aimbot', 'trucos-war-thunder-aimbot'],
	['triche-overwatch-aimbot', 'triche-war-thunder-aimbot'],
	['cheats-overwatch-aimbot', 'cheats-war-thunder-aimbot'],
	['trucchi-overwatch-aimbot', 'trucchi-war-thunder-aimbot'],
	['cheaty-overwatch-aimbot', 'cheaty-war-thunder-aimbot'],
	['chity-overwatch-aimbot', 'chity-war-thunder-aimbot'],
	['overwatch-aimbot-chity', 'war-thunder-aimbot-chity'],
	['overwatch-aimbot-hile', 'war-thunder-aimbot-hile'],
	['trucos-overwatch', 'trucos-war-thunder'],
	['triche-overwatch', 'triche-war-thunder'],
	['cheats-overwatch', 'cheats-war-thunder'],
	['trucchi-overwatch', 'trucchi-war-thunder'],
	['cheaty-overwatch', 'cheaty-war-thunder'],
	['chity-overwatch', 'chity-war-thunder'],
	['chitov-overwatch', 'chitov-war-thunder'],
	['cheatow-overwatch', 'cheatow-war-thunder'],
	['hile-overwatch', 'hile-war-thunder'],
	['overwatch-hile', 'war-thunder-hile'],
	// Review slugs
	['overwatch-soft-aim-review', 'war-thunder-soft-aim-review'],
	['overwatch-esp-ranked-review', 'war-thunder-esp-realistic-review'],
	['overwatch-cloud-dma-review', 'war-thunder-cloud-dma-review'],
	['overwatch-controller-soft-aim-review', 'war-thunder-controller-aimbot-review'],
	['overwatch-hack-setup-review', 'war-thunder-hack-setup-review'],
	['overwatch-health-esp-review', 'war-thunder-module-esp-review'],
	['overwatch-soft-aim-ranked-review', 'war-thunder-aimbot-realistic-review'],
	['overwatch-radar-hack-review', 'war-thunder-radar-hack-review'],
	['overwatch-anti-cheat-update-review', 'war-thunder-anti-cheat-update-review'],
	['overwatch-sniper-soft-aim-review', 'war-thunder-sniper-aimbot-review'],
	// Checkout & external
	['/products/overwatch-cheats', '/products/war-thunder-cheats'],
	['https://overwatch.blizzard.com/en-us/', 'https://warthunder.com/en'],
	['https://overwatch.blizzard.com/en-us', 'https://warthunder.com/en'],
	['overwatch.blizzard.com', 'warthunder.com'],
	// Game lore → War Thunder
	['enemy ultimate threat outlines before they breach your position', 'enemy vehicle threat outlines before they breach your line'],
	['enemy ultimate threat', 'artillery and bomb run threat'],
	['enemy ults', 'artillery strikes'],
	['enemy ult', 'bomb run'],
	['Enemy hero ESP', 'Vehicle ESP'],
	['enemy heroes', 'enemy tanks and aircraft'],
	['enemy hero', 'enemy vehicle'],
	['hero skeleton boxes', 'vehicle module boxes'],
	['hero ESP', 'vehicle ESP'],
	['Hero ESP', 'Vehicle ESP'],
	['health pack markers', 'repair point markers'],
	['Health pack ESP', 'Module ESP'],
	['health pack ESP', 'module ESP'],
	['ability cooldown markers', 'reload and module status markers'],
	['team fight', 'ground battle'],
	['team fights', 'ground battles'],
	['ranked matches', 'Realistic Battles'],
	['ranked match', 'Realistic Battle'],
	['Quick Play', 'Arcade Battles'],
	['Quick Play runs', 'Arcade Battle runs'],
	['control points', 'capture zones'],
	['map objectives', 'ground objectives'],
	['payload route', 'convoy route'],
	['payload fight', 'capture zone fight'],
	['flank routes', 'flank vectors'],
	['Competitive and Quick Play', 'Realistic and Arcade Battles'],
	['competitive and Quick Play', 'Realistic and Arcade Battles'],
	['Competitive', 'Realistic Battles'],
	['competitive', 'realistic battles'],
	['enemy DPS', 'enemy tank'],
	['enemy support', 'enemy SPAA'],
	['squad pushes', 'platoon pushes'],
	['squad push', 'platoon push'],
	['squad fight', 'platoon engagement'],
	['squad combat', 'platoon combat'],
	['Season 16', 'major update'],
	['Blizzard Overwatch status', 'Gaijin War Thunder status'],
	['Blizzard Overwatch', 'Gaijin War Thunder'],
	['Blizzard anti-cheat', 'Gaijin Easy Anti-Cheat'],
	['anti-cheat bypass', 'EAC bypass'],
	// Brand strings (longest first)
	['Overwatch Hacks', 'War Thunder Hacks'],
	['Overwatch ESP', 'War Thunder ESP'],
	['Overwatch Aimbot', 'War Thunder Aimbot'],
	['Overwatch Wallhack', 'War Thunder Wallhack'],
	['Overwatch wallhack', 'War Thunder wallhack'],
	['Overwatch Radar', 'War Thunder Radar'],
	['Overwatch radar', 'War Thunder radar'],
	['Overwatch hacks', 'War Thunder hacks'],
	['Overwatch hack', 'War Thunder hack'],
	['Overwatch cheat', 'War Thunder cheat'],
	['Overwatch cheats', 'War Thunder cheats'],
	['Overwatch soft aim', 'War Thunder aimbot'],
	['Overwatch maps', 'War Thunder maps'],
	['Overwatch punishes', 'War Thunder punishes'],
	['Overwatch mixes', 'War Thunder mixes'],
	['Overwatch update log', 'War Thunder update log'],
	['Overwatch Intel', 'War Thunder Intel'],
	['overwatch intel', 'war thunder intel'],
	['Overwatch 2', 'War Thunder'],
	['Overwatch', 'War Thunder'],
	['undetected overwatch hacks', 'undetected war thunder hacks'],
	['overwatch wallhack', 'war thunder wallhack'],
	['overwatch aimbot', 'war thunder aimbot'],
	['overwatch esp', 'war thunder esp'],
	['overwatch cheats', 'war thunder cheats'],
	['overwatch hacks 2026', 'war thunder hacks 2026'],
	// Project identifiers
	['project-name=overwatchhacks', 'project-name=warthunderhacks'],
	['name = "overwatchhacks"', 'name = "warthunderhacks"'],
	['"overwatch-hacks"', '"war-thunder-hacks"'],
	['Buy Overwatch Hacks', 'Buy War Thunder Hacks'],
	// Middleware hosts
	["const APEX_HOST = 'overwatchhacks.com'", "const APEX_HOST = 'warthunderhacks.com'"],
	["const WWW_HOST = 'www.overwatchhacks.com'", "const WWW_HOST = 'www.warthunderhacks.com'"],
	["const CANONICAL_ORIGIN = 'https://overwatchhacks.com'", "const CANONICAL_ORIGIN = 'https://warthunderhacks.com'"],
	// seo.ts helper
	["if (lead.toLowerCase().includes('overwatch'))", "if (lead.toLowerCase().includes('war thunder'))"],
	['return `Overwatch hacks — ${lead}`', 'return `War Thunder hacks — ${lead}`'],
	['optimized for overwatchhacks.com', 'optimized for warthunderhacks.com'],
	['| overwatchhacks.com', '| warthunderhacks.com'],
	['| Overwatch Hacks', '| War Thunder Hacks'],
	["shortName: 'OW'", "shortName: 'WT'"],
	["game: 'Overwatch'", "game: 'War Thunder'"],
	['Overwatch Hacks logo', 'War Thunder Hacks logo'],
];

const PAGE_DIR_RENAMES = [
	['overwatch-hacks', 'war-thunder-hacks'],
	['overwatch-esp', 'war-thunder-esp'],
	['overwatch-aimbot', 'war-thunder-aimbot'],
	['overwatch-wallhack', 'war-thunder-wallhack'],
	['overwatch-radar', 'war-thunder-radar'],
];

function walk(dir, files = []) {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		if (SKIP_DIRS.has(entry.name)) continue;
		const full = join(dir, entry.name);
		if (entry.isDirectory()) walk(full, files);
		else files.push(full);
	}
	return files;
}

function apply(content) {
	let result = content;
	for (const [from, to] of REPLACEMENTS) {
		if (result.includes(from)) result = result.split(from).join(to);
	}
	return result;
}

function renamePageDirs() {
	for (const [from, to] of PAGE_DIR_RENAMES) {
		const src = join(root, 'src', 'pages', from);
		const dest = join(root, 'src', 'pages', to);
		if (existsSync(src)) {
			renameSync(src, dest);
			console.log(`Renamed page: ${from} → ${to}`);
		}
	}
}

function renameBgVideoScript() {
	const src = join(root, 'public', 'scripts', 'overwatch-hacks-bg-video.js');
	const dest = join(root, 'public', 'scripts', 'war-thunder-hacks-bg-video.js');
	if (existsSync(src)) {
		let content = readFileSync(src, 'utf8');
		content = apply(content);
		writeFileSync(dest, content);
		unlinkSync(src);
		console.log('Renamed overwatch-hacks-bg-video.js → war-thunder-hacks-bg-video.js');
	} else if (existsSync(dest)) {
		let content = readFileSync(dest, 'utf8');
		content = apply(content);
		writeFileSync(dest, content);
	}
}

function transformFiles() {
	const files = walk(root);
	let changed = 0;
	for (const file of files) {
		if (!TEXT_EXTENSIONS.has(extname(file))) continue;
		if (SKIP_FILES.has(file.split(/[/\\]/).pop())) continue;
		const original = readFileSync(file, 'utf8');
		const updated = apply(original);
		if (updated !== original) {
			writeFileSync(file, updated);
			changed++;
		}
	}
	console.log(`\nTransformed ${changed} files`);
}

function patchMiddlewareRedirects() {
	const file = join(root, 'functions', '_middleware.js');
	let content = readFileSync(file, 'utf8');
	if (!content.includes("'overwatchhacks.com'")) {
		content = content.replace(
			"'www.arcraidershacks.com',",
			"'www.arcraidershacks.com',\n\t'overwatchhacks.com',\n\t'www.overwatchhacks.com',",
		);
	}
	const extraRedirects = {
		'/overwatch-hacks': '/war-thunder-hacks/',
		'/overwatch-hacks/': '/war-thunder-hacks/',
		'/overwatch-esp': '/war-thunder-esp/',
		'/overwatch-esp/': '/war-thunder-esp/',
		'/overwatch-aimbot': '/war-thunder-aimbot/',
		'/overwatch-aimbot/': '/war-thunder-aimbot/',
		'/overwatch-wallhack': '/war-thunder-wallhack/',
		'/overwatch-wallhack/': '/war-thunder-wallhack/',
		'/overwatch-radar': '/war-thunder-radar/',
		'/overwatch-radar/': '/war-thunder-radar/',
	};
	for (const [from, to] of Object.entries(extraRedirects)) {
		const key = `'${from}': '${to}'`;
		if (!content.includes(key)) {
			content = content.replace(
				'const PATH_REDIRECTS = {',
				`const PATH_REDIRECTS = {\n\t'${from}': '${to}',`,
			);
		}
	}
	// Update existing redirect targets from overwatch → war-thunder
	content = content.replaceAll("'/overwatch-hacks/'", "'/war-thunder-hacks/'");
	content = content.replaceAll("'/overwatch-esp/'", "'/war-thunder-esp/'");
	content = content.replaceAll("'/overwatch-aimbot/'", "'/war-thunder-aimbot/'");
	content = content.replaceAll("'/overwatch-wallhack/'", "'/war-thunder-wallhack/'");
	content = content.replaceAll("'/overwatch-radar/'", "'/war-thunder-radar/'");
	writeFileSync(file, content);
	console.log('Patched functions/_middleware.js redirects');
}

function patchValidateSitemaps() {
	const file = join(root, 'scripts', 'validate-sitemaps.mjs');
	let content = readFileSync(file, 'utf8');
	content = apply(content);
	content = content.replace(
		"const ENGLISH_PATHS = [\n\t'/',\n\t'/overwatch-hacks/',",
		"const ENGLISH_PATHS = [\n\t'/',\n\t'/war-thunder-hacks/',",
	);
	writeFileSync(file, content);
	console.log('Patched validate-sitemaps.mjs');
}

function patchPublicRedirects() {
	const file = join(root, 'public', '_redirects');
	let content = readFileSync(file, 'utf8');
	content = apply(content);
	const lines = [
		'/overwatch-hacks /war-thunder-hacks/ 301',
		'/overwatch-hacks/ /war-thunder-hacks/ 301',
		'/overwatch-esp /war-thunder-esp/ 301',
		'/overwatch-esp/ /war-thunder-esp/ 301',
		'/overwatch-aimbot /war-thunder-aimbot/ 301',
		'/overwatch-aimbot/ /war-thunder-aimbot/ 301',
		'/overwatch-wallhack /war-thunder-wallhack/ 301',
		'/overwatch-wallhack/ /war-thunder-wallhack/ 301',
		'/overwatch-radar /war-thunder-radar/ 301',
		'/overwatch-radar/ /war-thunder-radar/ 301',
	];
	for (const line of lines) {
		if (!content.includes(line.split(' ')[0])) {
			content += `\n${line}`;
		}
	}
	writeFileSync(file, content);
	console.log('Patched public/_redirects');
}

function patchI18nValidation() {
	const file = join(root, 'scripts', 'generate-i18n-content.mjs');
	let content = readFileSync(file, 'utf8');
	content = apply(content);
	if (!content.includes('/images/war-thunder')) {
		content = content.replace(
			"!p.heroImage?.startsWith('/images/overwatch')",
			"!p.heroImage?.startsWith('/images/war-thunder')",
		);
	}
	writeFileSync(file, content);
	console.log('Patched generate-i18n-content.mjs');
}

console.log('Rebranding Overwatch Hacks → War Thunder Hacks...\n');
renamePageDirs();
renameBgVideoScript();
transformFiles();
patchMiddlewareRedirects();
patchValidateSitemaps();
patchPublicRedirects();
patchI18nValidation();
console.log('\nRebrand complete. Next: npm run fetch:images && npm run generate:i18n && node scripts/generate-blog-posts.mjs');
