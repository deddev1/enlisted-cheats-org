#!/usr/bin/env node
/** Fix remaining i18n key mismatches and ui-strings. */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.resolve(ROOT, '..', 'amansand');

const UI_REPLACEMENTS = [
	['Warzone Cheats', 'Enlisted Cheats'],
	['Warzone cheats', 'Enlisted cheats'],
	['Warzone Cheats', 'Enlisted Cheats'],
	['Call of Duty: Warzone', 'Enlisted'],
	['Call of Duty Warzone', 'Enlisted'],
	['Call of Duty', 'Enlisted'],
	['Warzone PC', 'Enlisted PC'],
	['for Warzone', 'for Enlisted'],
	['Warzone ', 'Enlisted '],
	['warzone ', 'rust '],
	['Ricochet maintenance', 'anti-cheat maintenance'],
	['Ricochet anti-cheat', 'Darkflow Software anti-cheat (EAC)'],
	['Ricochet', 'Darkflow Software anti-cheat (EAC)'],
	['operatorEsp', 'playerEsp'],
	['gulagFight', 'rebootFight'],
	['alMazrah', 'battleRoyaleIsland'],
	['operators', 'players'],
	['operator', 'player'],
	['Operators', 'Players'],
	['Operator', 'Player'],
	['Al Mazrah', 'Enlisted'],
	['Verdansk', 'Enlisted'],
	['Resurgence', 'mission objectives'],
	['gulag', 'control point'],
	['warzonescheats.net', 'enlistedcheats.org'],
	['Trucos Warzone', 'Trucos Enlisted'],
	['Triches Warzone', 'Triches Enlisted'],
	['Cheats Warzone', 'Cheats Enlisted'],
];

function apply(content) {
	let r = content;
	for (const [a, b] of UI_REPLACEMENTS) r = r.split(a).join(b);
	return r;
}

// Rebuild ui-strings from clean source
for (const file of ['ui-strings-part1.mjs', 'ui-strings-part2.mjs']) {
	let content = await readFile(path.join(SRC, 'scripts/i18n-data', file), 'utf8');
	content = apply(content);
	await writeFile(path.join(ROOT, 'scripts/i18n-data', file), content);
	console.log('Fixed', file);
}

// Fix pages-en eac key
let pagesEn = await readFile(path.join(ROOT, 'scripts/i18n-data/pages-en.mjs'), 'utf8');
pagesEn = pagesEn.replace(/\teac: \{/, "\t'eac-bypass': {");
pagesEn = pagesEn.replace(/Enlisted Warzone/g, 'Enlisted');
pagesEn = pagesEn.replace(/for Enlisted Warzone/g, 'for Enlisted');
await writeFile(path.join(ROOT, 'scripts/i18n-data/pages-en.mjs'), pagesEn);

// Fix pages-i18n
let pagesI18n = await readFile(path.join(ROOT, 'scripts/i18n-data/pages-i18n.mjs'), 'utf8');
pagesI18n = apply(pagesI18n);
pagesI18n = pagesI18n.replace(/'ricochet'/g, "'eac-bypass'");
pagesI18n = pagesI18n.replace(/ricochet:/g, "'eac-bypass':");
await writeFile(path.join(ROOT, 'scripts/i18n-data/pages-i18n.mjs'), pagesI18n);

// Fix generate-i18n pages count
let gen = await readFile(path.join(ROOT, 'scripts/generate-i18n-content.mjs'), 'utf8');
gen = gen.replace('Pages per locale: 25', 'Pages per locale: 17');
await writeFile(path.join(ROOT, 'scripts/generate-i18n-content.mjs'), gen);

console.log('Fixed i18n keys.');
