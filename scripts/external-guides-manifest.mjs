/**
 * 1:1 URL manifest for external game guides.
 * Each entry maps exactly one provided URL to game metadata and a unique slug.
 */

/** @typedef {{ url: string, gameId: string, gameName: string, slug: string, anchorText: string }} GuideManifestEntry */

const ANCHOR_TEXTS = [
	'this supply',
	'more game information',
	'additional guides',
	'related supplys',
];

/** @type {string[]} */
export const PROVIDED_URLS = [
	'https://deadsidecheats.net/',
	'https://arcraiderscheat.net/',
	'https://genshincheats.net/',
	'https://dbdcheats.net/',
	'https://tarkovcheats.net/',
	'https://unturnedcheats.net/',
	'https://unturnedcheats.com/',
	'https://warthundercheats.com/',
	'https://fortniteaimbot.com/',
	'https://marathoncheats.org/',
	'https://battlefieldcheats.org/',
	'https://lolcheats.org/',
	'https://warzonecheats.org/',
	'https://valocheats.com/',
	'https://grayzonecheats.com/',
	'https://arcraiderscheats.org/',
	'https://tarkovcheats.org/',
	'https://overwatchhacks.com/',
	'https://dbdcheats.org/',
	'https://theislehacks.org/',
	'https://islecheats.net/',
	'https://warthunderhacks.com/',
	'https://marathoncheats.cc/',
	'https://besttarkovcheats.com/',
	'https://thefinalscheats.org/',
	'https://dayzcheat.net/',
	'https://fncheats.net/',
	'http://islecheat.com',
	'https://deadsidecheats.com/',
	'http://marvelrivalscheat.net/',
	'http://meccacheats.com/',
	'http://rusthack.net',
	'http://grayzonecheats.net/',
	'https://unturnedhacks.com/',
	'http://palworldhack.net/',
	'http://r6siegecheats.net/',
	'http://eftcheat.net/',
	'https://calibercheats.com/',
	'https://codcheats.net/',
	'https://huntcheats.com/',
	'https://lolcheat.net/',
	'https://marathonhacks.net/',
	'https://mecchahacks.com/',
	'https://palworldhack.com/',
	'https://tarkovhack.net/',
	'https://warthundercheats.net/',
	'https://huntshowdowncheats.com/',
	'https://destiny2cheats.com/',
	'https://tarkovhacks.net/',
	'https://r6siegecheats.com/',
	'https://sandraiderscheat.com/',
	'https://palworldhacks.com/',
	'https://squadhacks.com/',
	'https://eftcheats.net/',
	'https://marathonhack.net/',
	'https://abicheats.com/',
	'https://bodycamcheats.com/',
	'https://grayzonehacks.com/',
	'https://lolcheats.net/',
	'https://oncehumanhacks.com/',
	'https://palworldhacks.net/',
	'https://reforgercheats.com/',
	'https://rivalshacks.com/',
	'https://oncehumancheats.net/',
	'https://overwatchcheat.net/',
	'https://dayzhack.net/',
	'https://battlefieldcheat.com/',
	'https://abihacks.com/',
	'https://arcraidershack.com/',
	'https://backroomscheats.com/',
	'https://marvelrivalshacks.net/',
	'https://mecchachameleonhacks.com/',
	'https://mecchachameleonhacks.net/',
	'https://overwatch2cheats.com/',
	'https://sandraiderscheats.com/',
	'https://rivalscheats.net/',
	'https://squadcheat.com/',
	'https://sandraidersofsophiecheats.net/',
	'https://tarkovcheat.net/',
	'https://thefinalscheats.net/',
	'https://theislehacks.net/',
	'https://valoranthack.net/',
	'https://warzonehacks.net/',
	'https://thefrontcheats.com/',
	'https://lostarkcheats.net/',
	'https://valoranthacks.org/',
	'https://siegehacks.com/',
	'https://enlistedcheats.org/',
	'https://enlistedcheats.org/',
	'https://narakacheats.org/',
	'https://minecraftcheat.com/',
	'https://destiny2hack.com/',
	'https://poecheats.com/',
	'https://genshinhacks.com/',
	'https://arcraiderscheat.org/',
	'https://palworldcheats.org/',
	'https://theislecheat.net/',
	'https://tarkovcheat.org/',
	'https://theislecheats.org/',
	'https://raftcheats.com/',
	'https://sandhacks.com/',
	'https://seaofthievescheats.net/',
	'https://battlefieldhacks.net/',
	'https://thefinalshacks.com/',
	'https://deltaforcecheats.org/',
	'https://warthunderhacks.net/',
	'https://valohacks.com/',
];

/** Domain pattern → game metadata */
const GAME_RULES = [
	{ test: /deadside/i, gameId: 'deadside', gameName: 'Deadside' },
	{ test: /arcraiders/i, gameId: 'arc-raiders', gameName: 'ARC Raiders' },
	{ test: /genshin/i, gameId: 'genshin-impact', gameName: 'Genshin Impact' },
	{ test: /dbd/i, gameId: 'dead-by-daylight', gameName: 'Dead by Daylight' },
	{ test: /tarkov|eft/i, gameId: 'escape-from-tarkov', gameName: 'Escape from Tarkov' },
	{ test: /unturned/i, gameId: 'unturned', gameName: 'Unturned' },
	{ test: /warthunder/i, gameId: 'war-thunder', gameName: 'War Thunder' },
	{ test: /fortnite|fncheats/i, gameId: 'fortnite', gameName: 'Fortnite' },
	{ test: /marathon/i, gameId: 'marathon', gameName: 'Marathon' },
	{ test: /battlefield/i, gameId: 'battlefield', gameName: 'Battlefield' },
	{ test: /lol|league/i, gameId: 'league-of-legends', gameName: 'League of Legends' },
	{ test: /warzone/i, gameId: 'call-of-duty-warzone', gameName: 'Call of Duty: Warzone' },
	{ test: /valo/i, gameId: 'valorant', gameName: 'Valorant' },
	{ test: /grayzone/i, gameId: 'gray-zone-warfare', gameName: 'Gray Zone Warfare' },
	{ test: /overwatch/i, gameId: 'overwatch-2', gameName: 'Overwatch 2' },
	{ test: /isle/i, gameId: 'the-isle', gameName: 'The Isle' },
	{ test: /dayz/i, gameId: 'dayz', gameName: 'DayZ' },
	{ test: /rust/i, gameId: 'rust', gameName: 'Rust' },
	{ test: /palworld/i, gameId: 'palworld', gameName: 'Palworld' },
	{ test: /r6|siege/i, gameId: 'rainbow-six-siege', gameName: 'Rainbow Six Siege' },
	{ test: /hunt/i, gameId: 'hunt-showdown', gameName: 'Hunt: Showdown' },
	{ test: /destiny2/i, gameId: 'destiny-2', gameName: 'Destiny 2' },
	{ test: /squad/i, gameId: 'squad', gameName: 'Squad' },
	{ test: /oncehuman/i, gameId: 'once-human', gameName: 'Once Human' },
	{ test: /marvelrivals|rivals/i, gameId: 'marvel-rivals', gameName: 'Marvel Rivals' },
	{ test: /meccha|mecca/i, gameId: 'mecha-break', gameName: 'Mecha BREAK' },
	{ test: /caliber/i, gameId: 'caliber', gameName: 'Caliber' },
	{ test: /codcheats/i, gameId: 'call-of-duty', gameName: 'Call of Duty' },
	{ test: /bodycam/i, gameId: 'bodycam', gameName: 'Bodycam' },
	{ test: /abi/i, gameId: 'arena-breakout-infinite', gameName: 'Arena Breakout: Infinite' },
	{ test: /reforger/i, gameId: 'arma-reforger', gameName: 'Arma Reforger' },
	{ test: /backrooms/i, gameId: 'backrooms', gameName: 'Backrooms' },
	{ test: /sandraiders|sandhacks/i, gameId: 'sand', gameName: 'SAND' },
	{ test: /thefinals/i, gameId: 'the-finals', gameName: 'The Finals' },
	{ test: /thefront/i, gameId: 'the-front', gameName: 'The Front' },
	{ test: /lostark/i, gameId: 'lost-ark', gameName: 'Lost Ark' },
	{ test: /naraka/i, gameId: 'naraka-bladepoint', gameName: 'Naraka: Bladepoint' },
	{ test: /minecraft/i, gameId: 'minecraft', gameName: 'Minecraft' },
	{ test: /poe/i, gameId: 'path-of-exile', gameName: 'Path of Exile' },
	{ test: /warframe/i, gameId: 'warframe', gameName: 'Enlisted' },
	{ test: /raft/i, gameId: 'raft', gameName: 'Raft' },
	{ test: /seaofthieves/i, gameId: 'sea-of-thieves', gameName: 'Sea of Thieves' },
	{ test: /deltaforce/i, gameId: 'delta-force', gameName: 'Delta Force' },
];

/**
 * @param {string} url
 */
function classifyGame(url) {
	const host = new URL(url).hostname.replace(/^www\./, '');
	for (const rule of GAME_RULES) {
		if (rule.test.test(host)) {
			return { gameId: rule.gameId, gameName: rule.gameName };
		}
	}
	throw new Error(`Unable to classify game for URL: ${url}`);
}

/**
 * @param {string} url
 */
function urlToSlug(url) {
	const parsed = new URL(url);
	const host = parsed.hostname.replace(/^www\./, '').replace(/\./g, '-');
	const scheme = parsed.protocol === 'http:' ? 'http' : 'https';
	return `guide-${host}-${scheme}`;
}

/**
 * @returns {GuideManifestEntry[]}
 */
export function buildManifest() {
	const seen = new Set();
	/** @type {GuideManifestEntry[]} */
	const entries = [];

	for (let i = 0; i < PROVIDED_URLS.length; i++) {
		const url = PROVIDED_URLS[i];
		if (seen.has(url)) continue;
		seen.add(url);

		const { gameId, gameName } = classifyGame(url);
		const slug = urlToSlug(url);
		const anchorText = ANCHOR_TEXTS[i % ANCHOR_TEXTS.length];

		entries.push({ url, gameId, gameName, slug, anchorText });
	}

	return entries;
}
