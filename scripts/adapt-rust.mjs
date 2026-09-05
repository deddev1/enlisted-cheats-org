#!/usr/bin/env node
/**
 * One-time migration: Fortnite Hacks site → Arc Raiders Hacks.
 * Run from project root: node scripts/adapt-rust.mjs
 */
import { readFile, writeFile, readdir, rm, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const RENAME_PAGE_DIRS = [
	['fortnite-aimbot', 'rust-aimbot'],
	['fortnite-esp', 'rust-esp'],
	['fortnite-wallhack', 'rust-wallhack'],
	['fortnite-radar-hack', 'rust-radar-hack'],
	['undetected-fortnite-cheats', 'undetected-rust-cheats'],
	['fortnite-cheats-2026', 'rust-cheats-2026'],
	['eac-bypass-fortnite', 'eac-bypass-rust'],
	['fortnite-hacks', 'rust-hacks'],
	['fortnite-cheat-download', 'rust-cheat-download'],
	['fortnite-mod-menu', 'rust-mod-menu'],
	['fortnite-soft-aim', 'rust-soft-aim'],
	['best-fortnite-cheats', 'best-rust-cheats'],
	['fortnite-aimbot-hack', 'rust-aimbot-hack'],
	['fortnite-esp-hack', 'rust-esp-hack'],
	['fortnite-unlock-all', 'rust-unlock-all'],
];

/** Ordered replacements — specific patterns first. */
const REPLACEMENTS = [
	['fortnitehack.net', 'arcraidershacks.net'],
	['support@fortnitehack.net', 'support@arcraidershacks.net'],
	['/products/fortnite', '/products/rust'],
	['fortnite-esp-wallhack', 'rust-esp-wallhack'],
	['fortnite-esp-hack', 'rust-esp-hack'],
	['fortnite-aimbot-hack', 'rust-aimbot-hack'],
	['undetected-fortnite-cheats', 'undetected-rust-cheats'],
	['fortnite-cheats-2026', 'rust-cheats-2026'],
	['fortnite-radar-hack', 'rust-radar-hack'],
	['fortnite-wallhack', 'rust-wallhack'],
	['eac-bypass-fortnite', 'eac-bypass-rust'],
	['fortnite-cheat-download', 'rust-cheat-download'],
	['fortnite-mod-menu', 'rust-mod-menu'],
	['fortnite-soft-aim', 'rust-soft-aim'],
	['best-fortnite-cheats', 'best-rust-cheats'],
	['fortnite-unlock-all', 'rust-unlock-all'],
	['fortnite-hacks', 'rust-hacks'],
	['fortnite-aimbot', 'rust-aimbot'],
	['fortnite-esp', 'rust-esp'],
	['fortnite-cheats', 'rust-cheats'],
	['fortnite-cheats', 'rust-cheats'],
	["'fortnite-esp'", "'rust-esp'"],
	["'fortnite-aimbot'", "'rust-aimbot'"],
	['fortniteImages', 'rustImages'],
	["from './fortnite'", "from './rust'"],
	["from '../data/fortnite'", "from '../data/rust'"],
	['fortnitecheats', 'rusthacks'],
	['project-name=fortnitecheats', 'project-name=rusthacks'],
	['name = "fortnitecheats"', 'name = "rusthacks"'],
	['"fortnite-cheats"', '"rusthacks"'],
	['https://www.epicgames.com/fortnite', 'https://rust.arcraiders.com/'],
	['https://www.fortnite.com/', 'https://rust.arcraiders.com/'],
	['https://status.epicgames.com/', 'https://rust.arcraiders.com/'],
	['Epic Games Fortnite', 'Embark Rust'],
	['Epic Games Status', 'Embark Rust status'],
	['Fortnite.com', 'Rust.com'],
	['Epic Games', 'Embark'],
	['Battle Royale island, Zero Build, and competitive lobbies', 'monuments, oil rigs, and wipe-cycle raids'],
	['Battle Royale island, Zero Build and competitive lobbies', 'monuments, oil rigs and wipe-cycle raids'],
	['BR and Zero Build', 'PVE and PVP'],
	['BR & Zero Build', 'PVE & PVP'],
	['Zero Build and Battle Royale', 'monuments and raids'],
	['Zero Build', 'monuments'],
	['Battle Royale island', 'Arc Raiders'],
	['battle royale', 'survival'],
	['Battle Royale', 'survival'],
	['reboot van rotations', 'monument rotations'],
	['reboot van fight', 'oil rig fight'],
	['reboot van', 'monument'],
	['Fortnite Hacks', 'Arc Raiders Hacks'],
	['Fortnite hacks', 'Arc Raiders Hacks'],
	['Fortnite Cheats', 'Arc Raiders Hacks'],
	['Fortnite cheats', 'Rust cheats'],
	['Fortnite cheat', 'Rust cheat'],
	['Fortnite Aimbot', 'Rust Aimbot'],
	['Fortnite ESP', 'Rust ESP'],
	['Fortnite Intel', 'Rust Intel'],
	['Fortnite', 'Rust'],
	['fortnite hacks', 'Arc Raiders Hacks'],
	['fortnite cheats', 'Arc Raiders hacks'],
	['fortnite cheat', 'rust cheat'],
	['fortnite aimbot', 'rust aimbot'],
	['fortnite esp', 'rust esp'],
	['fortnite', 'rust'],
	['FortniteCheatsSite', 'RustHacksSite'],
	['Buy Fortnite Hacks', 'Buy Arc Raiders Hacks'],
];

const TEXT_EXTENSIONS = new Set([
	'.ts', '.tsx', '.js', '.mjs', '.astro', '.css', '.json', '.toml', '.txt', '.md', '.html',
]);

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.astro']);
const SKIP_FILES = new Set([
	'adapt-rust.mjs',
	'adapt-fortnite.mjs',
	'fetch-fortnite-images.mjs',
	'fetch-rust-images.mjs',
	'seo.ts',
]);

async function walk(dir, files = []) {
	const entries = await readdir(dir, { withFileTypes: true });
	for (const entry of entries) {
		if (SKIP_DIRS.has(entry.name)) continue;
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) await walk(full, files);
		else files.push(full);
	}
	return files;
}

function applyReplacements(content) {
	let result = content;
	for (const [from, to] of REPLACEMENTS) {
		result = result.split(from).join(to);
	}
	return result;
}

async function transformTextFiles() {
	const files = await walk(ROOT);
	let changed = 0;
	for (const file of files) {
		const ext = path.extname(file);
		if (!TEXT_EXTENSIONS.has(ext)) continue;
		if (SKIP_FILES.has(path.basename(file))) continue;
		const original = await readFile(file, 'utf8');
		const updated = applyReplacements(original);
		if (updated !== original) {
			await writeFile(file, updated, 'utf8');
			changed++;
		}
	}
	console.log(`Transformed ${changed} text files`);
}

async function renamePageDirs() {
	for (const [from, to] of RENAME_PAGE_DIRS) {
		const src = path.join(ROOT, 'src', 'pages', from);
		const dest = path.join(ROOT, 'src', 'pages', to);
		try {
			await rename(src, dest);
			console.log(`Renamed page: ${from} → ${to}`);
		} catch (e) {
			console.warn(`Skip rename ${from}: ${e.message}`);
		}
	}
}

async function renameDataFile() {
	const from = path.join(ROOT, 'src', 'data', 'fortnite.ts');
	const to = path.join(ROOT, 'src', 'data', 'rust.ts');
	try {
		await rename(from, to);
		console.log('Renamed fortnite.ts → rust.ts');
	} catch (e) {
		console.warn(`fortnite.ts rename: ${e.message}`);
	}
}

async function updatePageAstroFiles() {
	const idMap = {
		'rust-aimbot': 'rust-aimbot',
		'rust-esp': 'rust-esp',
		'rust-wallhack': 'wallhack',
		'rust-radar-hack': 'radar',
		'undetected-rust-cheats': 'undetected',
		'rust-cheats-2026': 'cheats-2026',
		'eac-bypass-rust': 'eac-bypass',
		'rust-hacks': 'hacks',
		'rust-cheat-download': 'cheat-download',
		'rust-mod-menu': 'mod-menu',
		'rust-soft-aim': 'soft-aim',
		'best-rust-cheats': 'best-cheats',
		'rust-aimbot-hack': 'aimbot-hack',
		'rust-esp-hack': 'esp-hack',
		'rust-unlock-all': 'unlock-all',
	};
	for (const [, to] of RENAME_PAGE_DIRS) {
		const file = path.join(ROOT, 'src', 'pages', to, 'index.astro');
		const pageIdVal = idMap[to] || to;
		const content = `---
import LocalizedPage from '../../components/LocalizedPage.astro';
---

<LocalizedPage locale="en" pageId="${pageIdVal}" />
`;
		try {
			await writeFile(file, content, 'utf8');
		} catch {
			/* ignore */
		}
	}
}

async function renameImages() {
	const imagesDir = path.join(ROOT, 'public', 'images');
	let files;
	try {
		files = await readdir(imagesDir);
	} catch {
		return;
	}
	for (const file of files) {
		if (!file.includes('fortnite')) continue;
		const newName = file.replace(/fortnite/g, 'rust');
		if (newName !== file) {
			await rename(path.join(imagesDir, file), path.join(imagesDir, newName));
			console.log(`Renamed image: ${file} → ${newName}`);
		}
	}
}

async function main() {
	console.log('Adapting Fortnite template → Arc Raiders Hacks...\n');
	await renamePageDirs();
	await renameDataFile();
	await transformTextFiles();
	await updatePageAstroFiles();
	await renameImages();
	console.log('\nDone. Next: fetch Rust images, polish SEO, regenerate i18n.');
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
