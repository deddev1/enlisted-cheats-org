#!/usr/bin/env node
/**
 * Bulk rebrand War Thunder Hacks → Warframe Cheats (warframecheats.net)
 */
import { readFileSync, writeFileSync, readdirSync, renameSync, existsSync, unlinkSync, rmSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const TEXT_EXTENSIONS = new Set([
	'.ts', '.tsx', '.js', '.mjs', '.astro', '.css', '.json', '.toml', '.txt', '.md', '.html',
]);

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.astro']);
const SKIP_FILES = new Set([
	'rebrand-warframe.mjs',
	'rebrand-war-thunder.mjs',
	'rebrand-overwatch.mjs',
	'rebrand-arc-raiders.mjs',
	'adapt-rust.mjs',
]);

/** Longest / most specific replacements first. */
const REPLACEMENTS = [
	// Domain & email
	['https://www.warthunderhacks.com', 'https://warframecheats.net'],
	['https://warthunderhacks.com', 'https://warframecheats.net'],
	['http://www.warthunderhacks.com', 'https://warframecheats.net'],
	['http://warthunderhacks.com', 'https://warframecheats.net'],
	['www.warthunderhacks.com', 'www.warframecheats.net'],
	['warthunderhacks.com', 'warframecheats.net'],
	['support@warthunderhacks.com', 'support@warframecheats.net'],
	// Canonical URL paths
	['/war-thunder-wallhack/', '/warframe-wallhack/'],
	['/war-thunder-aimbot/', '/warframe-aimbot/'],
	['/war-thunder-radar/', '/warframe-radar/'],
	['/war-thunder-esp/', '/warframe-esp/'],
	['/war-thunder-hacks/', '/warframe-cheats/'],
	['/war-thunder-wallhack', '/warframe-wallhack'],
	['/war-thunder-aimbot', '/warframe-aimbot'],
	['/war-thunder-radar', '/warframe-radar'],
	['/war-thunder-esp', '/warframe-esp'],
	['/war-thunder-hacks', '/warframe-cheats'],
	// Rust leftover paths → warframe
	['/rust-wallhack/', '/warframe-wallhack/'],
	['/rust-aimbot/', '/warframe-aimbot/'],
	['/rust-radar/', '/warframe-radar/'],
	['/rust-esp/', '/warframe-esp/'],
	['/rust-hacks/', '/warframe-cheats/'],
	['/rust-wallhack', '/warframe-wallhack'],
	['/rust-aimbot', '/warframe-aimbot'],
	['/rust-radar', '/warframe-radar'],
	['/rust-esp', '/warframe-esp'],
	['/rust-hacks', '/warframe-cheats'],
	['/eac-bypass-rust/', '/warframe-cheats/'],
	['/undetected-rust-cheats/', '/warframe-cheats/'],
	['/rust-cheats-2026/', '/warframe-cheats/'],
	['/rust-cheat-download/', '/pricing/'],
	['/rust-mod-menu/', '/features/'],
	['/rust-soft-aim/', '/warframe-aimbot/'],
	['/best-rust-cheats/', '/warframe-cheats/'],
	['/rust-aimbot-hack/', '/warframe-aimbot/'],
	['/rust-esp-hack/', '/warframe-esp/'],
	['/rust-unlock-all/', '/features/'],
	// Assets & scripts
	['data-war-thunder-hacks-video', 'data-warframe-cheats-video'],
	['data-rust-hacks-video', 'data-warframe-cheats-video'],
	['war-thunder-hacks-bg-video.js', 'warframe-cheats-bg-video.js'],
	['rust-hacks-bg-video.js', 'warframe-cheats-bg-video.js'],
	['war-thunder-ranked-fight.webp', 'warframe-mission.webp'],
	['war-thunder-esp-hitbox.webp', 'warframe-esp-modules.webp'],
	['war-thunder-esp-bots.webp', 'warframe-esp-enemies.webp'],
	['war-thunder-esp-overlay.webp', 'warframe-esp-overlay.webp'],
	['war-thunder-aimbot-menu.webp', 'warframe-aimbot-menu.webp'],
	['war-thunder-radar-hack.webp', 'warframe-radar-hack.webp'],
	['war-thunder-hacks-hero.webp', 'warframe-cheats-hero.webp'],
	['war-thunder-hacks-video-poster.webp', 'warframe-cheats-video-poster.webp'],
	['war-thunder-hacks-preview.mp4', 'warframe-cheats-preview.mp4'],
	['war-thunder-esp-tanks.webp', 'warframe-esp-enemies.webp'],
	['war-thunder-esp-modules.webp', 'warframe-esp-modules.webp'],
	['war-thunder-battle.webp', 'warframe-mission.webp'],
	['/images/war-thunder', '/images/warframe'],
	['/images/rust', '/images/warframe'],
	['/videos/war-thunder', '/videos/warframe'],
	['/videos/rust', '/videos/warframe'],
	// Page IDs & slugs
	['war-thunder-unlock-all', 'warframe-unlock-all'],
	['war-thunder-wallhack', 'warframe-wallhack'],
	['war-thunder-aimbot-hack', 'warframe-aimbot-hack'],
	['war-thunder-esp-hack', 'warframe-esp-hack'],
	['war-thunder-cheat-download', 'warframe-cheat-download'],
	['war-thunder-cheats-2026', 'warframe-cheats-2026'],
	['war-thunder-mod-menu', 'warframe-mod-menu'],
	['war-thunder-soft-aim', 'warframe-soft-aim'],
	['best-war-thunder-cheats', 'best-warframe-cheats'],
	['undetected-war-thunder-cheats', 'undetected-warframe-cheats'],
	['eac-bypass-war-thunder', 'eac-bypass-warframe'],
	['war-thunder-aimbot', 'warframe-aimbot'],
	['war-thunder-radar-hack', 'warframe-radar-hack'],
	['war-thunder-radar', 'warframe-radar'],
	['war-thunder-esp', 'warframe-esp'],
	['war-thunder-hacks', 'warframe-cheats'],
	['war-thunder-cheats', 'warframe-cheats'],
	['rust-unlock-all', 'warframe-unlock-all'],
	['rust-wallhack', 'warframe-wallhack'],
	['rust-aimbot-hack', 'warframe-aimbot-hack'],
	['rust-esp-hack', 'warframe-esp-hack'],
	['rust-cheat-download', 'warframe-cheat-download'],
	['rust-cheats-2026', 'warframe-cheats-2026'],
	['rust-mod-menu', 'warframe-mod-menu'],
	['rust-soft-aim', 'warframe-soft-aim'],
	['best-rust-cheats', 'best-warframe-cheats'],
	['undetected-rust-cheats', 'undetected-warframe-cheats'],
	['eac-bypass-rust', 'eac-bypass-warframe'],
	['rust-aimbot', 'warframe-aimbot'],
	['rust-radar-hack', 'warframe-radar-hack'],
	['rust-radar', 'warframe-radar'],
	['rust-esp', 'warframe-esp'],
	['rust-hacks', 'warframe-cheats'],
	['rust-cheats', 'warframe-cheats'],
	// Localized slug patterns
	['eac-bypass-war-thunder-trucos-war-thunder', 'eac-bypass-warframe-trucos-warframe'],
	['eac-bypass-war-thunder-triche-war-thunder', 'eac-bypass-warframe-triche-warframe'],
	['eac-bypass-war-thunder-cheats-war-thunder', 'eac-bypass-warframe-cheats-warframe'],
	['eac-bypass-war-thunder-chity-war-thunder', 'eac-bypass-warframe-chity-warframe'],
	['undetected-war-thunder-cheats', 'undetected-warframe-cheats'],
	['nedecektiruemye-chity-war-thunder', 'nedecektiruemye-chity-warframe'],
	['nedecektovani-chity-war-thunder', 'nedecektovani-chity-warframe'],
	['tespit-edilemeyen-war-thunder-hileleri', 'tespit-edilemeyen-warframe-hileleri'],
	['niewykrywalne-cheats-war-thunder', 'niewykrywalne-cheats-warframe'],
	['unentdeckte-war-thunder-cheats', 'unentdeckte-warframe-cheats'],
	['cheats-war-thunder-indetectaveis', 'cheats-warframe-indetectaveis'],
	['trucchi-war-thunder-indetectabili', 'trucchi-warframe-indetectabili'],
	['cheats-war-thunder-nedetectabile', 'cheats-warframe-nedetectabile'],
	['trucos-war-thunder', 'trucos-warframe'],
	['triche-war-thunder', 'triche-warframe'],
	['cheats-war-thunder', 'cheats-warframe'],
	['trucchi-war-thunder', 'trucchi-warframe'],
	['cheaty-war-thunder', 'cheaty-warframe'],
	['chity-war-thunder', 'chity-warframe'],
	['chitov-war-thunder', 'chitov-warframe'],
	['cheatow-war-thunder', 'cheatow-warframe'],
	['hile-war-thunder', 'hile-warframe'],
	['war-thunder-hile', 'warframe-hile'],
	['hacks-trucos-war-thunder', 'hacks-trucos-warframe'],
	['hacks-triche-war-thunder', 'hacks-triche-warframe'],
	['hacks-cheats-war-thunder', 'hacks-cheats-warframe'],
	['hacks-trucchi-war-thunder', 'hacks-trucchi-warframe'],
	['hacks-cheatow-war-thunder', 'hacks-cheatow-warframe'],
	['haksy-chity-war-thunder', 'haksy-chity-warframe'],
	['war-thunder-hile-hacks', 'warframe-hile-hacks'],
	// Review slugs
	['war-thunder-soft-aim-review', 'warframe-soft-aim-review'],
	['war-thunder-esp-realistic-review', 'warframe-esp-mission-review'],
	['war-thunder-cloud-dma-review', 'warframe-cloud-dma-review'],
	['war-thunder-controller-aimbot-review', 'warframe-controller-aimbot-review'],
	['war-thunder-hack-setup-review', 'warframe-cheat-setup-review'],
	['war-thunder-module-esp-review', 'warframe-ability-esp-review'],
	['war-thunder-aimbot-realistic-review', 'warframe-aimbot-mission-review'],
	['war-thunder-radar-hack-review', 'warframe-radar-hack-review'],
	['war-thunder-anti-cheat-update-review', 'warframe-anti-cheat-update-review'],
	['war-thunder-sniper-aimbot-review', 'warframe-sniper-aimbot-review'],
	// Checkout & external
	['/products/war-thunder-cheats', '/products/warframe-cheats'],
	['/products/rust-cheats', '/products/warframe-cheats'],
	['https://warthunder.com/en', 'https://www.warframe.com/'],
	['https://warthunder.com/en-us', 'https://www.warframe.com/'],
	['warthunder.com', 'warframe.com'],
	// Game lore → Warframe
	['enemy vehicle threat outlines before they breach your line', 'enemy Warframe threat outlines before they breach your position'],
	['artillery and bomb run threat', 'ability and heavy attack threat'],
	['artillery strikes', 'heavy attacks'],
	['bomb run', 'heavy attack'],
	['Vehicle ESP', 'Frame ESP'],
	['enemy tanks and aircraft', 'enemy Warframes and Sentients'],
	['enemy vehicle', 'enemy Warframe'],
	['vehicle module boxes', 'enemy outline boxes'],
	['vehicle ESP', 'frame ESP'],
	['repair point markers', 'health pickup markers'],
	['Module ESP', 'Ability ESP'],
	['module ESP', 'ability ESP'],
	['reload and module status markers', 'ability cooldown and health markers'],
	['ground battle', 'mission fight'],
	['ground battles', 'mission fights'],
	['Realistic Battles', 'Steel Path missions'],
	['Realistic Battle', 'Steel Path mission'],
	['Arcade Battles', 'open world missions'],
	['Arcade Battle', 'open world mission'],
	['capture zones', 'mission objectives'],
	['ground objectives', 'mission objectives'],
	['convoy route', 'extraction route'],
	['capture zone fight', 'objective fight'],
	['flank vectors', 'spawn routes'],
	['Realistic and Arcade Battles', 'Steel Path and open world missions'],
	['realistic and Arcade Battles', 'Steel Path and open world missions'],
	['realistic battles', 'Steel Path missions'],
	['enemy tank', 'enemy Warframe'],
	['enemy SPAA', 'enemy heavy unit'],
	['platoon pushes', 'squad pushes'],
	['platoon push', 'squad push'],
	['platoon engagement', 'squad fight'],
	['platoon combat', 'squad combat'],
	['major update', 'major update'],
	['Gaijin War Thunder status', 'Digital Extremes Warframe status'],
	['Gaijin War Thunder', 'Digital Extremes Warframe'],
	['Gaijin Easy Anti-Cheat', 'Digital Extremes anti-cheat'],
	['EAC bypass', 'anti-cheat bypass'],
	['EAC updates', 'anti-cheat updates'],
	['EAC patches', 'anti-cheat patches'],
	['after EAC patches', 'after anti-cheat patches'],
	['Easy Anti-Cheat', 'anti-cheat'],
	// Brand strings (longest first)
	['War Thunder Hacks', 'Warframe Cheats'],
	['War Thunder ESP', 'Warframe ESP'],
	['War Thunder Aimbot', 'Warframe Aimbot'],
	['War Thunder Wallhack', 'Warframe Wallhack'],
	['War Thunder wallhack', 'Warframe wallhack'],
	['War Thunder Radar', 'Warframe Radar'],
	['War Thunder radar', 'Warframe radar'],
	['War Thunder hacks', 'Warframe cheats'],
	['War Thunder hack', 'Warframe cheat'],
	['War Thunder cheat', 'Warframe cheat'],
	['War Thunder cheats', 'Warframe cheats'],
	['War Thunder aimbot', 'Warframe aimbot'],
	['War Thunder maps', 'Warframe missions'],
	['War Thunder punishes', 'Warframe punishes'],
	['War Thunder mixes', 'Warframe mixes'],
	['War Thunder update log', 'Warframe update log'],
	['War Thunder Intel', 'Warframe Intel'],
	['war thunder intel', 'warframe intel'],
	['undetected war thunder hacks', 'undetected warframe cheats'],
	['war thunder wallhack', 'warframe wallhack'],
	['war thunder aimbot', 'warframe aimbot'],
	['war thunder esp', 'warframe esp'],
	['war thunder cheats', 'warframe cheats'],
	['war thunder hacks 2026', 'warframe cheats 2026'],
	['War Thunder', 'Warframe'],
	// Rust leftovers
	['Rust Hacks', 'Warframe Cheats'],
	['Rust hacks', 'Warframe cheats'],
	['Rust ESP', 'Warframe ESP'],
	['Rust Aimbot', 'Warframe Aimbot'],
	['Rust cheats', 'Warframe cheats'],
	['Rust cheat', 'Warframe cheat'],
	['Rust', 'Warframe'],
	['rust hacks', 'warframe cheats'],
	['rust cheats', 'warframe cheats'],
	['rust cheat', 'warframe cheat'],
	['rust aimbot', 'warframe aimbot'],
	['rust esp', 'warframe esp'],
	// Project identifiers
	['project-name=warthunderhacks', 'project-name=warframecheats'],
	['project-name=rusthacks', 'project-name=warframecheats'],
	['name = "warthunderhacks"', 'name = "warframecheats"'],
	['name = "rusthacks"', 'name = "warframecheats"'],
	['"war-thunder-hacks"', '"warframe-cheats"'],
	['"rust-hacks"', '"warframe-cheats"'],
	['Buy War Thunder Hacks', 'Buy Warframe Cheats'],
	['Buy Rust Hacks', 'Buy Warframe Cheats'],
	// Middleware hosts
	["const APEX_HOST = 'warthunderhacks.com'", "const APEX_HOST = 'warframecheats.net'"],
	["const WWW_HOST = 'www.warthunderhacks.com'", "const WWW_HOST = 'www.warframecheats.net'"],
	["const CANONICAL_ORIGIN = 'https://warthunderhacks.com'", "const CANONICAL_ORIGIN = 'https://warframecheats.net'"],
	// seo.ts helper
	["if (lead.toLowerCase().includes('war thunder'))", "if (lead.toLowerCase().includes('warframe'))"],
	['return `War Thunder hacks — ${lead}`', 'return `Warframe cheats — ${lead}`'],
	['optimized for warthunderhacks.com', 'optimized for warframecheats.net'],
	['| warthunderhacks.com', '| warframecheats.net'],
	['| War Thunder Hacks', '| Warframe Cheats'],
	["shortName: 'WT'", "shortName: 'WF'"],
	["game: 'War Thunder'", "game: 'Warframe'"],
	['War Thunder Hacks logo', 'Warframe Cheats logo'],
	['rustImages', 'warframeImages'],
	['rustHeroVideo', 'warframeHeroVideo'],
	['rustVideo', 'warframeVideo'],
	["from './rust'", "from './warframe'"],
	["from '../data/rust'", "from '../data/warframe'"],
];

const PAGE_DIR_RENAMES = [
	['war-thunder-hacks', 'warframe-cheats'],
	['war-thunder-esp', 'warframe-esp'],
	['war-thunder-aimbot', 'warframe-aimbot'],
	['war-thunder-wallhack', 'warframe-wallhack'],
	['war-thunder-radar', 'warframe-radar'],
];

const RUST_PAGE_DIRS_TO_REMOVE = [
	'rust-mod-menu',
	'rust-cheats-2026',
	'rust-unlock-all',
	'rust-soft-aim',
	'rust-esp-hack',
	'undetected-rust-cheats',
	'rust-cheat-download',
	'eac-bypass-rust',
	'best-rust-cheats',
	'rust-aimbot-hack',
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

function removeRustPages() {
	for (const dir of RUST_PAGE_DIRS_TO_REMOVE) {
		const target = join(root, 'src', 'pages', dir);
		if (existsSync(target)) {
			rmSync(target, { recursive: true, force: true });
			console.log(`Removed rust page: ${dir}`);
		}
	}
}

function renameDataFile() {
	const src = join(root, 'src', 'data', 'rust.ts');
	const dest = join(root, 'src', 'data', 'warframe.ts');
	if (existsSync(src)) {
		let content = readFileSync(src, 'utf8');
		content = apply(content);
		writeFileSync(dest, content);
		unlinkSync(src);
		console.log('Renamed src/data/rust.ts → warframe.ts');
	} else if (existsSync(dest)) {
		let content = readFileSync(dest, 'utf8');
		content = apply(content);
		writeFileSync(dest, content);
	}
}

function renameBgVideoScript() {
	const candidates = [
		['war-thunder-hacks-bg-video.js', 'warframe-cheats-bg-video.js'],
		['rust-hacks-bg-video.js', 'warframe-cheats-bg-video.js'],
	];
	for (const [from, to] of candidates) {
		const src = join(root, 'public', 'scripts', from);
		const dest = join(root, 'public', 'scripts', to);
		if (existsSync(src)) {
			let content = readFileSync(src, 'utf8');
			content = apply(content);
			writeFileSync(dest, content);
			if (from !== to) unlinkSync(src);
			console.log(`Renamed ${from} → ${to}`);
		}
	}
	const dest = join(root, 'public', 'scripts', 'warframe-cheats-bg-video.js');
	if (existsSync(dest)) {
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
	if (!existsSync(file)) return;
	let content = readFileSync(file, 'utf8');
	content = apply(content);
	const extraRedirects = {
		'/war-thunder-hacks': '/warframe-cheats/',
		'/war-thunder-hacks/': '/warframe-cheats/',
		'/war-thunder-esp': '/warframe-esp/',
		'/war-thunder-esp/': '/warframe-esp/',
		'/war-thunder-aimbot': '/warframe-aimbot/',
		'/war-thunder-aimbot/': '/warframe-aimbot/',
		'/war-thunder-wallhack': '/warframe-wallhack/',
		'/war-thunder-wallhack/': '/warframe-wallhack/',
		'/war-thunder-radar': '/warframe-radar/',
		'/war-thunder-radar/': '/warframe-radar/',
		'/rust-hacks': '/warframe-cheats/',
		'/rust-hacks/': '/warframe-cheats/',
		'/rust-esp': '/warframe-esp/',
		'/rust-esp/': '/warframe-esp/',
		'/rust-aimbot': '/warframe-aimbot/',
		'/rust-aimbot/': '/warframe-aimbot/',
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
	writeFileSync(file, content);
	console.log('Patched functions/_middleware.js redirects');
}

function patchPublicRedirects() {
	const file = join(root, 'public', '_redirects');
	if (!existsSync(file)) return;
	let content = readFileSync(file, 'utf8');
	content = apply(content);
	const lines = [
		'/war-thunder-hacks /warframe-cheats/ 301',
		'/war-thunder-hacks/ /warframe-cheats/ 301',
		'/war-thunder-esp /warframe-esp/ 301',
		'/war-thunder-esp/ /warframe-esp/ 301',
		'/war-thunder-aimbot /warframe-aimbot/ 301',
		'/war-thunder-aimbot/ /warframe-aimbot/ 301',
		'/war-thunder-wallhack /warframe-wallhack/ 301',
		'/war-thunder-wallhack/ /warframe-wallhack/ 301',
		'/war-thunder-radar /warframe-radar/ 301',
		'/war-thunder-radar/ /warframe-radar/ 301',
		'/rust-hacks /warframe-cheats/ 301',
		'/rust-hacks/ /warframe-cheats/ 301',
	];
	for (const line of lines) {
		if (!content.includes(line.split(' ')[0])) {
			content += `\n${line}`;
		}
	}
	writeFileSync(file, content);
	console.log('Patched public/_redirects');
}

console.log('Rebranding War Thunder Hacks → Warframe Cheats...\n');
renamePageDirs();
removeRustPages();
renameDataFile();
renameBgVideoScript();
transformFiles();
patchMiddlewareRedirects();
patchPublicRedirects();
console.log('\nRebrand complete. Next: npm run fetch:images && npm run generate:i18n && node scripts/generate-blog-posts.mjs');
