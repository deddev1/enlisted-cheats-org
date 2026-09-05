#!/usr/bin/env node
/** Final pass: fix remaining Warzone references in src/. */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'src');
const REMOVE_PAGE_IDS = ['hacks', 'cheat-download', 'mod-menu', 'soft-aim', 'best-cheats', 'aimbot-hack', 'esp-hack', 'unlock-all'];

const REPLACEMENTS = [
	['warzoneImages', 'enlistedImages'],
	["from '../data/warzone'", "from '../data/enlisted'"],
	["from './warzone'", "from './enlisted'"],
	['/undetected-warzone-cheats/', '/enlisted-cheats/'],
	['/warzone-wallhack/', '/enlisted-wallhack/'],
	['/warzone-radar-hack/', '/enlisted-radar/'],
	['/ricochet-bypass/', '/enlisted-cheats/'],
	['/warzone-cheats-2026/', '/enlisted-cheats/'],
	['/warzone-aimbot/', '/enlisted-aimbot/'],
	['/warzone-esp/', '/enlisted-esp/'],
	['/warzone-hacks/', '/enlisted-esp/'],
	['Warzone Cheats', 'Enlisted Cheats'],
	['Warzone cheats', 'Enlisted cheats'],
	['Warzone wallhack', 'Enlisted wallhack'],
	['Warzone radar', 'Enlisted radar'],
	['Warzone Aimbot', 'Enlisted Aimbot'],
	['Warzone ESP', 'Enlisted ESP'],
	['Call of Duty: Warzone', 'Enlisted'],
	['Ricochet', 'Darkflow Software anti-cheat (EAC)'],
	['ricochet', 'eac'],
	['warzonescheats.net', 'enlistedcheats.org'],
	['operatorEsp', 'playerEsp'],
	['gulagFight', 'rebootFight'],
	['alMazrah', 'battleRoyaleIsland'],
];

async function walk(dir, files = []) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) await walk(full, files);
		else if (/\.(ts|astro|js)$/.test(entry.name)) files.push(full);
	}
	return files;
}

function apply(content) {
	let r = content;
	for (const [a, b] of REPLACEMENTS) r = r.split(a).join(b);
	for (const id of REMOVE_PAGE_IDS) {
		r = r.replace(new RegExp(`\\t'${id}':[^\\n]*\\n`, 'g'), '');
		r = r.replace(new RegExp(`\\{ label:[^}]*href: '/[^']*${id}[^']*/' \\},\\n`, 'g'), '');
	}
	return r;
}

for (const file of await walk(ROOT)) {
	const orig = await readFile(file, 'utf8');
	const updated = apply(orig);
	if (updated !== orig) {
		await writeFile(file, updated);
		console.log('Fixed', path.relative(ROOT, file));
	}
}
