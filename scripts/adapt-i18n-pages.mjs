#!/usr/bin/env node
/** Adapt pages-en.mjs and pages-i18n.mjs from Warzone source. */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.resolve(ROOT, '..', 'amansand');

const REMOVE_PAGE_KEYS = [
	'hacks', 'cheat-download', 'mod-menu', 'soft-aim', 'best-cheats',
	'aimbot-hack', 'esp-hack', 'unlock-all',
];

const REPLACEMENTS = [
	['warzone-esp', 'enlisted-esp'],
	['warzone-aimbot', 'enlisted-aimbot'],
	["'ricochet'", "'eac-bypass'"],
	['ricochet-bypass', 'eac-bypass-enlisted'],
	['undetected-warzone-cheats', 'undetected-enlisted-cheats'],
	['warzone-wallhack', 'enlisted-wallhack'],
	['warzone-radar-hack', 'enlisted-radar-hack'],
	['warzone-cheats-2026', 'enlisted-cheats-2026'],
	['call-of-duty-warzone-cheats', 'enlisted-cheats'],
	['call-of-duty-warzone', 'rust'],
	['Call of Duty: Warzone', 'Enlisted'],
	['Call of Duty Warzone', 'Enlisted'],
	['Warzone Cheats', 'Enlisted Cheats'],
	['Warzone cheats', 'Enlisted cheats'],
	['Warzone cheat', 'Enlisted cheat'],
	['Warzone ESP', 'Enlisted ESP'],
	['Warzone Aimbot', 'Enlisted Aimbot'],
	['Warzone wallhack', 'Enlisted wallhack'],
	['Warzone radar', 'Enlisted radar'],
	['Warzone firefights', 'Enlisted firefights'],
	['Warzone combat', 'Enlisted combat'],
	['Warzone patches', 'Enlisted patches'],
	['Warzone updates', 'Enlisted updates'],
	['Warzone setup', 'Enlisted setup'],
	['Warzone license', 'Enlisted license'],
	['Warzone licenses', 'Enlisted licenses'],
	['Warzone sessions', 'Enlisted sessions'],
	['in Warzone', 'in Enlisted'],
	['for Warzone', 'for Enlisted'],
	['Warzone on', 'Enlisted on'],
	['Warzone or', 'Enlisted or'],
	['Warzone\'s', 'Enlisted\'s'],
	['Warzone ', 'Enlisted '],
	['Ricochet anti-cheat', 'Gaijin anti-cheat (EAC)'],
	['Ricochet maintenance', 'anti-cheat maintenance'],
	['Ricochet bypass', 'anti-cheat bypass'],
	['Ricochet Bypass', 'EAC Bypass'],
	['Ricochet', 'Gaijin anti-cheat (EAC)'],
	['ricochet', 'eac'],
	['support@warzonescheats.net', 'support@enlistedcheats.org'],
	['Verdansk, Urzikstan, and Rebirth Island', 'capture objectives, supply routes, and ranked seasons'],
	['Verdansk, Urzikstan and Rebirth Island', 'capture objectives, supply routes and ranked seasons'],
	['gulag fights', 'map rotations'],
	['gulag fight', 'supply route fight'],
	['gulag rounds', 'respawn rounds'],
	['gulag', 'control point'],
	['operators', 'players'],
	['operator', 'player'],
	['Operators', 'Players'],
	['Operator', 'Player'],
	['UAV', 'supply drop'],
	['Resurgence and campaign missions', 'capture objectives and raids'],
	['BR and Resurgence', 'large-scale battles and campaign missions'],
	['BR & Resurgence', 'PVE & PVP'],
	['loadout drops', 'loot chests'],
	['loadout drop', 'loot chest'],
	['contracts', 'chests'],
	['contract', 'chest'],
	['Activision\'s', 'Embark\''],
	['Call of Duty combat pace', 'Enlisted combat pace'],
	['COD', 'Enlisted'],
];

function apply(content) {
	let r = content;
	for (const [a, b] of REPLACEMENTS) r = r.split(a).join(b);
	return r;
}

function removePageObjectBlocks(content) {
	let r = content;
	for (const key of REMOVE_PAGE_KEYS) {
		const quoted = `'${key}'`;
		const patterns = [
			new RegExp(`\\t${quoted}: \\{[\\s\\S]*?\\},\\n`, 'g'),
			new RegExp(`\\t${key.replace(/-/g, '\\-')}: \\{[\\s\\S]*?\\},\\n`, 'g'),
		];
		for (const p of patterns) r = r.replace(p, '');
	}
	return r;
}

async function adaptFile(rel) {
	let content = await readFile(path.join(SRC, rel), 'utf8');
	content = apply(content);
	content = removePageObjectBlocks(content);
	await writeFile(path.join(ROOT, rel), content);
	console.log('Adapted', rel);
}

await adaptFile('scripts/i18n-data/pages-en.mjs');
await adaptFile('scripts/i18n-data/pages-i18n.mjs');
await adaptFile('scripts/i18n-data/phrases.mjs');

// Patch phrases KW object
let phrases = await readFile(path.join(ROOT, 'scripts/i18n-data/phrases.mjs'), 'utf8');
phrases = phrases.replace(
	/const KW = \{[\s\S]*?\};/,
	`const KW = {
	esp: 'ESP wallhack',
	radar: 'radar hack',
	aimbot: 'Aimbot',
	product: 'Enlisted Cheats',
	game: 'Enlisted',
	checkout: 'Zadeyo',
	eac: 'Gaijin anti-cheat (EAC)',
};`,
);
phrases = phrases.replace(/KW\.ricochet/g, 'KW.eac');
phrases = phrases.replace(/maps: '[^']*'/g, "maps: 'capture objectives, supply routes, and ranked seasons'");
await writeFile(path.join(ROOT, 'scripts/i18n-data/phrases.mjs'), phrases);

console.log('Done adapting i18n pages.');
