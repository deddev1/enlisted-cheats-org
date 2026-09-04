#!/usr/bin/env node
/**
 * Normalize copy for Enlisted — removes Fortnite/Rust/Epic/EAC leftovers.
 * Run: node scripts/fix-warframe-accuracy.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/** @type {[string | RegExp, string][]} */
const RULES = [
	[/Epic services/gi, 'Enlisted servers'],
	[/Epic platform/gi, 'Enlisted launcher'],
	[/Epic's rules/gi, "Gaijin' Terms of Service"],
	[/Epic terms/gi, 'Gaijin terms'],
	[/If Epic services/gi, 'If Enlisted servers'],
	[/Embark' anti-cheat/gi, 'Gaijin anti-cheat'],
	[/Enlisted or EAC patch/gi, 'Enlisted or anti-cheat patch'],
	[/and EAC questions/gi, 'and anti-cheat questions'],
	[/EAC patch/gi, 'anti-cheat patch'],
	[/EAC history/gi, 'anti-cheat history'],
	[/EAC comparison/gi, 'anti-cheat comparison'],
	[/Battle royale fights happen in three dimensions — rooftops, windows, and flanks\./gi,
		'Multi-floor tilesets stack vertical fights — catwalks, doorways, and side spawns.'],
	[/extraction loop/gi, 'mission loop'],
	[/extraction phase rounds/gi, 'defense sectors and squad assault modifiers'],
	[/extraction phase/gi, 'defense sectors'],
	[/supply route/gi, 'squad assault route'],
	[/endgame circles/gi, 'defense sectors'],
	[/ranked squad fight/gi, 'campaign squad fight'],
	[/ranked objective fight/gi, 'campaign missions objective fight'],
	[/ranked-critical/gi, 'mission-critical'],
	[/ranked lobbies/gi, 'co-op squads'],
	[/ranked block/gi, 'mission session'],
	[/before ranked/gi, 'before campaign missions'],
	[/Built for ranked pressure/gi, 'Built for campaign missions pressure'],
	[/before a third party/gi, 'before a flank wave'],
	[/third parties/gi, 'flank waves'],
	[/third-party flanks/gi, 'flank waves'],
	[/enemy squads/gi, 'enemy units'],
	[/enemy player/gi, 'enemy unit'],
	[/enemy players/gi, 'enemy units'],
	[/closest player/gi, 'closest enemy'],
	[/vehicles, loot, chests/gi, 'lockers, resource caches, and pickups'],
	[/vehicles and chests/gi, 'lockers and resource caches'],
	[/loot and chest/gi, 'pickups and lockers'],
	[/loot chests/gi, 'resource caches'],
	[/supply-drop/gi, 'pickup'],
	[/mid-match/gi, 'mid-mission'],
	[/map rotations/gi, 'tileset rotations'],
	[/map rotation/gi, 'tileset rotation'],
	[/POIs/g, 'tileset areas'],
	[/POI/g, 'tileset area'],
	[/loot routes/gi, 'farm routes'],
	[/drop path/gi, 'farm route'],
	[/track players and containers/gi, 'track enemies and containers'],
	[/track players/gi, 'track enemies'],
	[/player threats/gi, 'enemy threats'],
	[/enemy soldiers/gi, 'enemy units'],
	[/enemy soldier/gi, 'enemy unit'],
	[/Enlisted' live seasons/gi, "Enlisted's live updates"],
	[/season updates from/gi, 'game updates from'],
	[/season calendars/gi, 'update calendars'],
	[/season notes from/gi, 'patch notes from'],
	[/season messaging/gi, 'official patch messaging'],
	[/season maps/gi, 'tileset updates'],
	[/for ranked/gi, 'for campaign missions'],
	[/in ranked/gi, 'in campaign missions'],
	[/ranked loadout/gi, 'mission loadout'],
	[/ranked climb/gi, 'campaign missions progression'],
	[/ranked grinders/gi, 'campaign missions players'],
	[/ranked/gi, 'campaign missions'],
	[/FNCS/gi, 'squad assault'],
	[/vbucks/gi, 'Platinum'],
	[/V-Bucks/gi, 'Platinum'],
	[/Bugha/gi, 'pro Tenno'],
	[/zero-build/gi, 'ability-only'],
	[/Battle Pass/gi, 'Prime Access'],
	[/Embark/gi, 'Gaijin'],
	[/Epic patch/gi, 'Enlisted patch'],
	[/every Epic patch/gi, 'every Enlisted patch'],
	[/Epic health/gi, 'server status'],
	[/Cheats are flanking tools/gi, 'Cheats are third-party tools'],
	[/for Embark bans/gi, 'for game bans'],
	[/notice vehicles before/gi, 'spot tanks and artillery before'],
	[/mark chests worth/gi, 'mark lockers and caches worth'],
	[/players, loot, and vehicles/gi, 'enemies, pickups, and lockers'],
	[/loot, chests, and vehicles/gi, 'pickups, lockers, and caches'],
	[/see players, loot, vehicles/gi, 'see enemies, pickups, and lockers'],
	[/live matches/gi, 'live missions'],
	[/in BR —/gi, 'in co-op —'],
	[/\bBR loop\b/gi, 'mission loop'],
	[/\bBR players\b/gi, 'campaign missions players'],
	[/\bBR stack\b/gi, 'full cheat stack'],
	[/\bin BR\b/gi, 'in missions'],
	[/in BR and/gi, 'in squad assaults and'],
	[/ghostware rust/gi, 'ghostware warframe'],
	[/rust wallhack/gi, 'enlisted wallhack'],
	[/loot esp/gi, 'resource esp'],
	[/wipe-to-raid/gi, 'mission-to-rewards'],
	[/OW2/gi, 'Enlisted'],
	[/payload corners/gi, 'objective corners'],
	[/payload escorts/gi, 'defense sectors'],
	[/per-hero/gi, 'per-weapon'],
	[/hitscan and projectile/gi, 'primaries and secondaries'],
	[/AK, SMG, and bolt/gi, 'rifles, SMGs, and sniper rifles'],
	[/AK, SMG ve bolt/gi, 'rifle, shotgun ve sniper'],
	[/Hammer AR/gi, 'Soma Prime'],
	[/hammer ar/gi, 'soma prime'],
	[/box fights/gi, 'close-quarters fights'],
	[/creative 1v1s/gi, 'Simulacrum testing'],
	[/Creative warmup/gi, 'Simulacrum warmup'],
	[/Creative Mode/gi, 'Simulacrum'],
	[/island codes/gi, 'training scenarios'],
	[/Reboot Van/gi, 'defense objective'],
	[/control point/gi, 'defense objective'],
	[/battle royale/gi, 'campaign missions'],
	[/capture objectives/gi, 'co-op missions'],
	[/Player, vehicle, and ability/gi, 'Enemy, tank or artillery unit, and ability'],
	[/vehicle threat cues/gi, 'tank or artillery unit threat cues'],
	[/vehicle cues/gi, 'tank or artillery unit cues'],
	[/vehicle pushes/gi, 'tank or artillery unit pushes'],
	[/vehicle ESP/gi, 'tank or artillery unit ESP'],
	[/vehicle and pickup/gi, 'tank or artillery unit and pickup'],
	[/vehicle positions/gi, 'tank or artillery unit positions'],
	[/building clears/gi, 'tileset clears'],
	[/pub lobbies/gi, 'public matches'],
	[/pubs\b/gi, 'public matches'],
	[/playlists/gi, 'mission types'],
	[/assault rifles/gi, 'rifles'],
	[/long-range AR /gi, 'long-range rifle '],
	[/AR beams/gi, 'rifle beams'],
	[/AR fights/gi, 'rifle fights'],
	[/AR and SMG/gi, 'rifle and shotgun'],
	[/AR \//gi, 'rifle/'],
	[/ SMG /gi, ' shotgun '],
	[/SMGs/gi, 'shotguns'],
	[/SMG profile/gi, 'shotgun profile'],
	[/SMG profiles/gi, 'shotgun profiles'],
	[/SMG tracking/gi, 'shotgun tracking'],
	[/SMG pushes/gi, 'shotgun pushes'],
	[/SMG in/gi, 'shotgun in'],
	[/first AR/gi, 'first rifle'],
	[/Enlisted itself is published by/gi, 'Enlisted is developed and published by'],
	[/campaign missions lobbies/gi, 'campaign missions'],
	[/large-scale battles and campaign missions play/gi, 'battlefield and campaign missions'],
	[/shows players, loot/gi, 'shows enemies, loot'],
	[/player ESP wallhack/gi, 'enemy ESP wallhack'],
	[/Player ESP/gi, 'Enemy ESP'],
	[/player ESP/gi, 'enemy ESP'],
	[/player outlines/gi, 'enemy outlines'],
	[/Player ESP boxes/gi, 'Enemy ESP boxes'],
	[/player boxes/gi, 'enemy boxes'],
	[/Player boxes/gi, 'Enemy boxes'],
	[/player ESP in/gi, 'enemy ESP in'],
	[/only need player ESP/gi, 'only need enemy ESP'],
	[/player ESP —/gi, 'enemy ESP —'],
	[/ability-only-meta-broken-aggressive-strategies/gi, 'enlisted-cheats-complete-guide-2026'],
];

const FILES = [
	'scripts/i18n-data/pages-en.mjs',
	'scripts/i18n-data/pages-i18n.mjs',
	'scripts/i18n-data/ui-strings-part1.mjs',
	'scripts/i18n-data/ui-strings-part2.mjs',
	'src/data/site.ts',
	'scripts/generate-blog-posts.mjs',
	'src/data/schema.ts',
	'src/components/HomeSeo.astro',
	'src/data/i18n/gallery-ui.ts',
	'src/data/warframe.ts',
	'src/components/Gallery.astro',
	'src/data/page-sitemap.ts',
];

function applyRules(text) {
	let out = text;
	for (const [from, to] of RULES) {
		out = out.replace(from, to);
	}
	return out;
}

for (const rel of FILES) {
	const path = join(ROOT, rel);
	const next = applyRules(readFileSync(path, 'utf8'));
	writeFileSync(path, next);
	console.log('✓', rel);
}

// English UI image alts — canonical Enlisted terminology
const uiPath = join(ROOT, 'scripts/i18n-data/ui-strings-part1.mjs');
let ui = readFileSync(uiPath, 'utf8');
ui = ui.replace(
	/aimbotCombat: '[^']+'/,
	"aimbotCombat: 'Enlisted aimbot targeting a enemy tank during a campaign mission'",
);
ui = ui.replace(
	/squadFight: '[^']+'/,
	"squadFight: 'Enlisted squad co-op fight with ESP and aimbot active in a squad assault'",
);
ui = ui.replace(
	/battleRoyale: '[^']+'/,
	"battleRoyale: 'Enlisted campaign missions fight with undetected ESP overlays'",
);
ui = ui.replace(
	/battleRoyaleIsland: '[^']+'/,
	"battleRoyaleIsland: 'Enlisted cheats menu with per-weapon aimbot profiles'",
);
ui = ui.replace(
	/espWallhack: '[^']+'/,
	"espWallhack: 'Enlisted ESP overlay highlighting enemy infantry and tanks units through walls'",
);
ui = ui.replace(
	/playerEsp: '[^']+'/,
	"playerEsp: 'Enlisted wallhack ESP boxes on Grineer, Corpus, and enemy vehicles in campaign missions'",
);
ui = ui.replace(
	/rebootFight: '[^']+'/,
	"rebootFight: 'Enlisted radar hack 2D minimap showing flank routes in a squad assault'",
);
writeFileSync(uiPath, ui);
console.log('✓ scripts/i18n-data/ui-strings-part1.mjs (en image alts)');

// Normalize rebootFight alts across all locale UI files (remove BR leftovers)
for (const part of ['ui-strings-part1.mjs', 'ui-strings-part2.mjs']) {
	const partPath = join(ROOT, 'scripts/i18n-data', part);
	let partUi = readFileSync(partPath, 'utf8');
	partUi = partUi.replace(/rebootFight: '[^']*'/g, "rebootFight: 'Enlisted squad assault defense fight with aimbot cheats active'");
	writeFileSync(partPath, partUi);
	console.log('✓ scripts/i18n-data/' + part);
}

console.log('Done. Run: npm run generate:i18n && node scripts/generate-blog-posts.mjs');
