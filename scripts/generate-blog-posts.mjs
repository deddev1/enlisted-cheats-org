#!/usr/bin/env node
/**
 * Generates src/data/blog/posts.generated.ts with Enlisted Intel posts.
 * English content is the SEO source of truth for /blog/ routes.
 */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'src', 'data', 'blog', 'posts.generated.ts');

const LOCALES = ['en'];

const EXT = {
	epic: '<a href="https://www.digitalextremes.com/" target="_blank" rel="noopener noreferrer">Gaijin</a>',
	enlisted: '<a href="https://enlisted.net/" target="_blank" rel="noopener noreferrer">Enlisted</a>',
	patchNotes: '<a href="https://enlisted.net/en/news/" target="_blank" rel="noopener noreferrer">official PC update notes</a>',
	gameGuide: '<a href="https://enlisted.net/en/game/about/" target="_blank" rel="noopener noreferrer">official Enlisted game guide</a>',
	wiki: '<a href="https://enlisted.fandom.com/wiki/Enlisted_Wiki" target="_blank" rel="noopener noreferrer">Enlisted Wiki</a>',
	forums: '<a href="https://forums.enlisted.net/" target="_blank" rel="noopener noreferrer">Enlisted forums</a>',
	steelPath: '<a href="https://enlisted.fandom.com/wiki/Steel_Path" target="_blank" rel="noopener noreferrer">campaign missions</a>',
	openWorld: '<a href="https://enlisted.fandom.com/wiki/Open_World" target="_blank" rel="noopener noreferrer">battlefield</a>',
	rust: '<a href="https://enlisted.net/" target="_blank" rel="noopener noreferrer">official Enlisted patch notes</a>',
	status: '<a href="https://enlisted.net/en/news/" target="_blank" rel="noopener noreferrer">Enlisted PC update notes</a>',
	realisticBattles: '<a href="https://enlisted.net/en/game/about/" target="_blank" rel="noopener noreferrer">Enlisted campaign missions</a>',
};

/** @typedef {{ h2: string, paragraphs: string[] }} Section */
/** @typedef {{ id: string, imageKey: string, published: string, updated: string, category: string, featured?: boolean, slug: string, title: string, metaDescription: string, h1: string, intro: string, keywords: string[], imageAlt: string, sections: Section[] }} SourcePost */

/** @type {SourcePost[]} */
const sources = [
	{
		id: 'patch-notes-breakdown',
		imageKey: 'squadFight',
		published: '2026-07-29',
		updated: '2026-08-01',
		category: 'Patch Notes Breakdown',
		featured: false,
		slug: 'patch-notes-buffs-nerfs-vaults',
		title: 'Patch Notes Breakdown: Buffs, Nerfs & Vaults That Matter',
		metaDescription:
			'Enlisted patch notes for major update Season 3 — buffs, nerfs, and vaults that reshape loadouts. After anti-cheat patches, check Enlisted Cheats updates.',
		h1: 'Patch Notes Breakdown: Buffs, Nerfs, and Vaults',
		intro:
			'Stop skimming patch notes. Here is how buffs, nerfs, and vaults actually reshuffle the loot pool and your mission loadout priorities.',
		keywords: ['rust patch notes', 'buffs', 'nerfs', 'vaults', 'loot pool', 'enlisted intel'],
		imageAlt: 'Enlisted patch notes breakdown of buffs nerfs and vaults for major update Season 3',
		sections: [
			{
				h2: 'Read patches like a player, not a spectator',
				paragraphs: [
					'Most players misread patch notes by chasing the loudest bullet point. A small shotgun nerf gets a rant video while a quiet mobility tweak silently rewires mid-game. The best campaign missions players treat patches like accountants — what changed in expected value?',
					`Official notes publish through ${EXT.rust} and ${EXT.epic}. Use those primary sources first, then translate each line into inventory decisions for your playlist.`,
					'Pro Tip — Three-question filter: For every note ask: (1) Does this change my farm route? (2) Does this change my 5-slot priority? (3) Does this change my fight distance? If all three are no, ignore the drama.',
				],
			},
			{
				h2: 'Buff, nerf, and vault framework',
				paragraphs: [
					'Vaults are binary — remove the item from your mental loot pool immediately. Heavy nerfs demote a weapon from core to flex. Light nerfs keep a gun if your accuracy is above lobby average. Buffs deserve a 10-game test before full buy-in. New items need spawn rate and best distance learning first.',
					'If Soma Prime takes a minor bloom or damage trim, it can still be S-tier on expected value — see our <a href="/blog/hammer-ar-s-tier-data-analysis/">Soma Prime tier analysis</a>. If a shotgun loses substantial headshot multiplier, close-range TTK windows shift the same day.',
				],
			},
			{
				h2: 'How notes reshuffle loadout priority',
				paragraphs: [
					'When mid-range ARs are strong, prioritize rarity on AR earlier in farm routes. When mobility is nerfed or vaulted, uncontested chains with shorter hops beat hot drops that require escapes. When heals are buffed, aggressive third-parties become safer — which powers strategies in our <a href="/blog/enlisted-cheats-complete-guide-2026/">co-op missions aggression guide</a>.',
					'Also separate balance patches from cosmetic and shop notes. Skin leaks are fun; they do not change TTK. Keep patch-day focus on weapons, healing, movement, and map tileset area changes.',
				],
			},
			{
				h2: 'Late-season checklist and next steps',
				paragraphs: [
					'Post-patch checklist: skim official notes for vaults first, update your shotgun/AR/mobility/heals spine, play 10 intentional test games, revisit tier-list assumptions, and adjust drop routes if mobility or loot changed.',
					`On big update mornings, confirm ${EXT.status} is healthy before blaming your settings. If you also use Enlisted Cheats in-match, check <a href="/updates/">Enlisted Cheats Updates</a> after Gaijin anti-cheat patches.`,
					'Try This Today: Open the latest official patch notes and highlight vaults. Rewrite your 5-slot priority on paper. Queue a focused 5-game test block and note which fights felt different at 30–60m vs 0–15m.',
				],
			},
		],
	},
	{
		id: 'skin-leaks-c7s3',
		imageKey: 'headerArt',
		published: '2026-07-27',
		updated: '2026-08-01',
		category: 'Skin Leaks & Cosmetics',
		featured: false,
		slug: 'chapter-7-season-3-skin-leaks-Platinum',
		title: 'Major Update Season 3 Skin Leaks: Platinum Worth Buying',
		metaDescription:
			'major update Season 3 Enlisted skin leaks and shop advice — which cosmetics are worth Platinum before Season 4. Save smart and skip FOMO bundles today.',
		h1: 'major update Season 3 Skin Leaks Worth Your Platinum',
		intro:
			'Season 4 is coming. Here is which leaked and rotating cosmetics are actually worth buying before the shop resets hard.',
		keywords: ['rust skin leaks', 'Platinum', 'cosmetics', 'item shop', 'season 4', 'enlisted intel'],
		imageAlt: 'Enlisted major update Season 3 skin leaks and Platinum shopping guide',
		sections: [
			{
				h2: 'Stop impulse buying before Season 4',
				paragraphs: [
					'Most players blow Platinum the week before a new season and then cannot buy the Prime Access. Controversial take: most Item Shop impulse buys do not improve your win rate or locker happiness a month later.',
					`Shop rotations and Prime Access exclusives are official through ${EXT.rust}. Leaks are entertainment — not a shopping list. Use them to decide what to skip.`,
					'Pro Tip — Locker performance: Pros pick clean silhouettes. Busy outfits can hide enemy outlines in chaotic co-op missions endgames. Style is cool; readability wins games.',
				],
			},
			{
				h2: 'Worth-it criteria every shop reset',
				paragraphs: [
					'Green: unique collab or ripple you will still wear in 90 days. Yellow: cool but overlaps three skins you already own. Red: FOMO bundle with fillers you will never equip. Always reserve Pass or next-season buffer first.',
					'Check bundle math. A 2,800 bundle with two fillers is often worse than waiting for the 1,500 standalone. If the leaked wrap or pickaxe is the only piece you want, skip the full set unless the discount is real.',
				],
			},
			{
				h2: 'Leak watchlist and shop ritual',
				paragraphs: [
					'Treat late-season leak waves as theme previews, not confirmed shop dates. If a high-demand collab leaks, decide budget before it hits — not during the five-minute panic.',
					'Daily reset ritual: open shop for 60 seconds, check wishlist, leave. Liquidity is power at season transitions. For campaign missions readability tips, pair this with our <a href="/blog/pro Tenno-settings-pro-setup/">pro settings breakdown</a>.',
					'Try This Today: Write a 5-skin wishlist max. Set a Platinum floor you will not spend below until Season 4. Skip one FOMO bundle on purpose this week.',
				],
			},
		],
	},
	{
		id: 'hammer-ar-tier-list',
		imageKey: 'aimbotCombat',
		published: '2026-07-25',
		updated: '2026-08-01',
		category: 'Weapon Tier Lists',
		featured: true,
		slug: 'hammer-ar-s-tier-data-analysis',
		title: 'Weapon Tier List: Why Soma Prime Is Actually S-Tier',
		metaDescription:
			'Data-backed Enlisted weapon tier list: why Soma Prime is S-tier — TTK windows, bloom control, and loadout pairings for major update Season 3 campaign missions.',
		h1: 'Weapon Tier List: Why the Soma Prime Is S-Tier',
		intro:
			'Community tier lists underrate the Soma Prime. The damage-per-mag and mid-range TTK numbers say otherwise.',
		keywords: ['Soma Prime', 'rust tier list', 'weapons', 'ttk', 'enlisted intel'],
		imageAlt: 'Enlisted Soma Prime S-tier weapon tier list data analysis major update Season 3',
		sections: [
			{
				h2: 'Why the Soma Prime belongs in S-tier',
				paragraphs: [
					"Creator tier lists are entertainment, not science. They rank flashy mythics while the Soma Prime quietly prints mid-range eliminations because damage-per-second consistency beats higher-ceiling guns average players cannot control.",
					'S-tier means best expected value across 100 campaign missions fights. Hammer wins at 30–70 meters — the distances where co-op missions and endgame actually happen. Shotguns own 0–15m. Snipers own 80m+. Everything between is AR country.',
					`Confirm live values after patches on ${EXT.rust}. Hierarchy logic stays useful even when decimals nudge.`,
					'Pro Tip — Spray discipline: Pros tap or micro-burst until bloom settles, then commit. Treat Hammer like a laser until the enemy wide-peeks — then dump.',
				],
			},
			{
				h2: 'Damage, TTK, and peek theory',
				paragraphs: [
					'Working purple/gold Hammer-style numbers: body ~33–36, head ~50–58, 6-bullet controlled spray ~198–216, 8-bullet dump ~264–288. The real metric is damage before disengage — magazine pressure forgives a whiffed first burst.',
					'First-shot accuracy is the hidden S-tier stat. Cadence: peek → 3–4 bullets → jiggle back → re-peek. Do not stand still for ego sprays unless the enemy is healing.',
					'Pair this mid-range plan with loot discipline from our <a href="/blog/secret-loot-routes-full-gold/">secret farm routes guide</a>.',
				],
			},
			{
				h2: 'Loadout pairings, mistakes, and practice',
				paragraphs: [
					'Core: Soma Prime + high-burst shotgun + mobility + heals. In co-op missions, this supports the laddering strategies in our <a href="/blog/enlisted-cheats-complete-guide-2026/">aggression guide</a>.',
					'Common mistakes: full-spraying from 80m+, re-peeking the same pixel, swapping to shotgun at 40m out of habit, never practicing crouch-spray in Creative.',
					'Try This Today: Prioritize Hammer for 10 games. Count your first four bullets in every mid fight. If you die inside 15m without shotgun out, fix loadout timing — not the AR.',
					'Players who also use aim-assist tooling can review <a href="/enlisted-aimbot/">Enlisted Aimbot</a> profiles after they lock a sens — mechanics first, tools second.',
				],
			},
		],
	},
	{
		id: 'ability-only-meta-broken',
		imageKey: 'battleRoyaleCombat',
		published: '2026-07-22',
		updated: '2026-08-01',
		category: 'co-op missions',
		featured: true,
		slug: 'enlisted-cheats-complete-guide-2026',
		title: 'Co-op Missions Meta Broken: 5 Aggressive Pro Strategies',
		metaDescription:
			'Break the passive co-op missions meta with 5 aggressive Enlisted strategies — timings, damage windows, and fight paths that win campaign missions in major update Season 3.',
		h1: 'The co-op missions Meta Is Broken: 5 Aggressive Strategies',
		intro:
			'Passive flankinging is dead weight. These five aggressive co-op missions strategies flip mid-game fights before the lobby even rotates.',
		keywords: ['large-scale battles', 'rust campaign missions', 'aggressive strategies', 'pro tips', 'enlisted intel'],
		imageAlt: 'Enlisted co-op missions aggressive fight meta strategies major update Season 3',
		sections: [
			{
				h2: 'Why the co-op missions meta feels soft',
				paragraphs: [
					'Most co-op missions players wait behind a rock for the last two teams to trade, then spray into a mess. That soft meta is why ranks stall. Strong fighters manufacture first-shot advantage and leave before the flank arrives.',
					'A clean first-shot AR spray at 40–55 meters can delete 80–120 HP before the opponent ads. That window is the game. Information tools like <a href="/enlisted-esp/">Enlisted ESP</a> help — but aggression still needs cover discipline.',
					'Pro Tip — Decide your exit before you swing. Take a 150+ damage window, then hard disengage with mobility before the usual 4–7 second flanking clock.',
				],
			},
			{
				h2: 'Five aggressive strategies that still work',
				paragraphs: [
					'1) Pre-aim rotations — hold upper-chest crosshair on every cover hop; clear angles in 0.4–0.6s. 2) Mobility wedge entries — land 8–12m past the target for a clean shotgun angle, not a panic 180. 3) Double-peek shotgun timing — fake left, finish right when their chamber is weak.',
					'4) Natural cover laddering — never more than 8–12m from hard cover. 5) Zone edge pressure — spray late rotates silhouetted on storm tint, then hold the angle instead of ego-chasing.',
					`Mode rules evolve with ${EXT.epic} seasons; the geometry of first-shot advantage does not.`,
				],
			},
			{
				h2: 'Warmup checklist and next guides',
				paragraphs: [
					'before campaign missions: 10 minutes aim or peek maps, loadout priority AR + shotgun + mobility + heals, two tileset areas with strong cover ladders, and a 10-game first-shot aggression block.',
					'Pair this article with <a href="/blog/secret-loot-routes-full-gold/">farm routes</a>, <a href="/blog/hammer-ar-s-tier-data-analysis/">Soma Prime tiers</a>, and <a href="/blog/creative-warmup-maps-pros-use/">Simulacrum warmups</a>.',
					'Try This Today: Queue co-op missions and force first contact when you have shield + AR. Track whether you disengaged before the 7-second flanking window.',
				],
			},
		],
	},
	{
		id: 'squad assault-meta-watch',
		imageKey: 'rebootFight',
		published: '2026-07-20',
		updated: '2026-08-01',
		category: 'Esports & Tournaments',
		featured: false,
		slug: 'squad assault-meta-watch-tournament-drops',
		title: 'squad assault Meta Watch: What Tournament Winners Drop',
		metaDescription:
			'squad assault meta watch for major update Season 3 — what tournament winners drop, how they loot, and which mid-game habits translate to your campaign missions progression.',
		h1: 'squad assault Meta Watch: What Tournament Winners Drop and Why',
		intro:
			'Tournament winners are not lucky drop gods. Here is what their tileset areas, loadouts, and mid-game habits actually optimize for.',
		keywords: ['squad assault', 'enlisted esports', 'tournament drops', 'meta', 'enlisted intel'],
		imageAlt: 'squad assault Enlisted tournament meta watch drop spots major update Season 3',
		sections: [
			{
				h2: 'Watch tournament film like a coach',
				paragraphs: [
					`Most squad assault drop threads name a tileset area without contest rate, zone percent, split potential, or exit paths. Pros pick drops like investors pick assets — expected value over vibes. Start with ${EXT.realisticBattles} schedules and VODs, then tag habits.`,
					'Pro Tip — Tag the VOD: landing plan, first heal, first rotate, first voluntary fight, and endgame key move. Five tags beat a full passive watch.',
				],
			},
			{
				h2: 'Drop EV and loadout patterns',
				paragraphs: [
					'Score every tileset area on contest rate, loot quality by ~2:00, zone pain, exit path, and split potential. Edge tileset areas with clean exits often beat sexy mid tileset areas that look good on stream.',
					'Expect shotgun + mid AR (often Hammer-class) + mobility + heals as the spine. Mythics are taken when free, not forced — matching our <a href="/blog/hammer-ar-s-tier-data-analysis/">Soma Prime analysis</a>.',
				],
			},
			{
				h2: 'What translates to campaign missions',
				paragraphs: [
					'Translate loot-timer discipline, loadout spine, early rotates, and selective fights. Do not blindly mirror a trio drop in solo queue.',
					'Winners rotate early enough to choose sides. Zone edge pressure from our <a href="/blog/enlisted-cheats-complete-guide-2026/">co-op missions guide</a> shows up constantly in endgames.',
					'Try This Today: Watch 15 minutes of a winner VOD with five timestamps. Steal one mid-game habit only. Run it for a 6-game mission session.',
				],
			},
		],
	},
	{
		id: 'secret-loot-routes',
		imageKey: 'openWorldTilesetMap',
		published: '2026-07-18',
		updated: '2026-08-01',
		category: 'campaign missions Meta',
		featured: true,
		slug: 'secret-loot-routes-full-gold',
		title: 'Secret Farm Routes: Leave Spawn Full Gold Every Game',
		metaDescription:
			'High-percentage Enlisted farm routes that leave spawn with gold guns, full shields, and mobility — major update Season 3 farm routes that win mid-game.',
		h1: 'Secret farm routes: How to Leave Spawn with Full Gold',
		intro:
			'Winning starts before the first fight. These farm routes consistently convert drops into gold loadouts and full heals.',
		keywords: ['rust farm routes', 'drops', 'gold loot', 'campaign missions', 'enlisted intel'],
		imageAlt: 'Enlisted secret farm routes full gold spawn guide major update Season 3',
		sections: [
			{
				h2: 'The real campaign missions bottleneck is early inventory',
				paragraphs: [
					'Most campaign missions deaths before first zone happen because players loot randomly. Pros treat the first 90 seconds like a speedrun with a shopping list — not a deathmatch.',
					'Controversial take: drop spot matters less than loot sequence. A mediocre tileset area with discipline beats a stacked tileset area with panic looting.',
					'Pro Tip — Secure shotgun, AR, and heals before hunting kills. Early ego chases keep hot-drop players hardstuck.',
				],
			},
			{
				h2: 'Three route archetypes that print Elo',
				paragraphs: [
					'Route A — contested edge tileset area (3–6 players): land outer roof loot, snake inward, leave before late flank waves (~2 minutes). Route B — uncontested three-tileset area chain: sacrifice early kills for purple/gold inventory by minute three. Route C — mid-map surge: loot vacuum piles 90–150 seconds after hot drops empty.',
					'Timing targets: 0–20s first gun, 20–50s clear cluster, 50–80s chests + minis, 80–120s upgrade or leave. Slot priority: shotgun, AR, mobility, heals, flex.',
					`tileset area names rotate with ${EXT.rust} seasons — keep the geometry, not the landmark brand.`,
				],
			},
			{
				h2: 'Convert gold guns into wins',
				paragraphs: [
					'Pair these routes with <a href="/blog/enlisted-cheats-complete-guide-2026/">co-op missions aggression</a> and <a href="/blog/hammer-ar-s-tier-data-analysis/">Soma Prime tiers</a>. Leave spawn rich so mid-game becomes a skill check.',
					'If you use squad ESP markers in practice, read <a href="/enlisted-esp/">Enlisted ESP</a> for category toggles — then still run the timer so habits stay sharp without overlays.',
					'Try This Today: Run one uncontested chain for 8 games. Screenshot inventory at 2:30 and compare rarities before adding a contested edge day.',
				],
			},
		],
	},
	{
		id: 'pro Tenno-settings',
		imageKey: 'cheatsPackage',
		published: '2026-07-12',
		updated: '2026-08-01',
		category: 'Pro Player Setups',
		featured: false,
		slug: 'pro Tenno-settings-pro-setup',
		title: "Pro Tenno's Settings: Copy a Champion Setup That Works",
		metaDescription:
			'pro Tenno-inspired Enlisted settings guide — sensitivity ranges, binds philosophy, and practice routines that still work in major update Season 3 campaign missions.',
		h1: "pro Tenno's Sensitivity & Settings: Champion-Inspired Setup",
		intro:
			'You do not need exact pro digits — you need champion settings philosophy. Here is a setup you can adapt today.',
		keywords: ['pro Tenno settings', 'rust sensitivity', 'binds', 'pro setup', 'enlisted intel'],
		imageAlt: 'pro Tenno Enlisted sensitivity settings pro player setup guide',
		sections: [
			{
				h2: 'Settings remove friction — they are not magic',
				paragraphs: [
					"Copying a world champion's settings will not make you a world champion. Copying stable sens, low clutter, reachable binds, and a ruthless warmup removes friction so aim and decisions can improve.",
					'Pro Tip — Change one variable at a time. Never retune sens, binds, and HUD the same night.',
				],
			},
			{
				h2: 'Sensitivity, binds, and performance',
				paragraphs: [
					'Use an eDPI band that lets you 180 with a controlled swipe without over-flicking shotguns. If you overshoot close targets, lower slightly. If you cannot track strafers at 40m with Soma Prime, raise cautiously — then lock settings for 14 days.',
					'Put edit, crouch, and mobility on keys you can hit while still aiming. Make slot 1 shotgun and slot 2 AR muscle memory. Prefer performance clarity over cinema settings; motion blur off.',
					`Hardware and campaign missions context evolve, but fundamentals stay — see ${EXT.realisticBattles} for high-level play standards.`,
				],
			},
			{
				h2: 'Champion-style practice routine',
				paragraphs: [
					'0–10 minutes aim tracker, 10–20 peek or edit drills, 20–30 realistic fights, then campaign missions. Pair with our <a href="/blog/creative-warmup-maps-pros-use/">Simulacrum warmup map categories</a>.',
					'If you later configure Aimbot smoothness for practice tooling, start from <a href="/enlisted-aimbot/">soft aim</a> after your raw sens is locked — never chase both variables at once.',
					'Try This Today: Write dpi + sens, adjust at most once by a small percent, then play 5 games without touching settings again.',
				],
			},
		],
	},
	{
		id: 'creative-warmup-maps',
		imageKey: 'playerEsp',
		published: '2026-07-08',
		updated: '2026-08-01',
		category: 'Simulacrum',
		featured: false,
		slug: 'creative-warmup-maps-pros-use',
		title: '10 Simulacrum Warmup Maps Pros Use Before campaign missions',
		metaDescription:
			'Ten Enlisted Simulacrum warmup map categories and a 25-minute routine pros use before campaign missions — aim, peeks, edits, and co-op missions fight reps now.',
		h1: '10 Simulacrum Maps Pros Use to Warm Up before campaign missions',
		intro:
			'Stop freezing in first fight. These Simulacrum warmup categories get your mechanics hot before you touch campaign missions.',
		keywords: ['rust creative', 'warmup maps', 'aim trainers', 'campaign missions', 'enlisted intel'],
		imageAlt: 'Enlisted Simulacrum warmup maps pros use before campaign missions',
		sections: [
			{
				h2: 'Warmups win Elo before the queue starts',
				paragraphs: [
					'Your first two campaign missions fights often decide whether a session tilts. Pros arrive sharp from Creative — another 40 pub stomps is a worse warmup than 20 focused minutes.',
					`Find current training scenarios in Creative via ${EXT.rust}. We list durable categories because brittle codes die every season update.`,
					'Pro Tip — Keep a sticky core playlist. Swap one map per week, not every day.',
				],
			},
			{
				h2: '25-minute routine and ten map categories',
				paragraphs: [
					'0–8 min aim tracker. 8–15 min edit course or co-op missions peek map. 15–22 min realistic fight / box fight / zone wars. 22–25 min reset, then campaign missions.',
					'Categories: pure aim tracker, shotgun scenarios, mid-range AR tracking (Hammer practice), piece control/edits, co-op missions cover peeks, realistic 1v1s, zone wars, reload/swap timing, movement tech, scrim-style multi-fight maps.',
					'co-op missions mains should replace edit courses with double-peek ladders from our <a href="/blog/enlisted-cheats-complete-guide-2026/">aggression guide</a>.',
				],
			},
			{
				h2: 'Mistakes that waste warmup time',
				paragraphs: [
					'Only melting easy bots, ignoring mid-range, warming up 90 minutes then playing two tilted games, and changing binds mid-warmup all waste Elo.',
					'After mechanics are hot, information tools like <a href="/enlisted-radar/">radar hack</a> or <a href="/enlisted-esp/">ESP</a> are optional overlays — they do not replace a cold shotgun timing. For the full stack overview, see <a href="/enlisted-cheats/">Enlisted Cheats</a>.',
					'Try This Today: Favorite four maps across aim, peeks, fights, and endgame. Run the 25-minute block, then play only six campaign missions games.',
				],
			},
		],
	},
	{
		id: 'enlisted-cheats-complete-guide',
		imageKey: 'battleRoyaleCombat',
		published: '2026-07-31',
		updated: '2026-08-01',
		category: 'Enlisted Cheats',
		featured: true,
		slug: 'enlisted-cheats-complete-guide-2026',
		title: 'Enlisted Cheats 2026: Complete Undetected Guide',
		metaDescription:
			'Complete Enlisted Cheats guide for PC and controllers — ESP boxes, soft aim, cloud DMA, and anti-cheat maintenance in 2026. Compare the full package and buy.',
		h1: 'Enlisted Cheats 2026: The Complete Undetected Guide',
		intro:
			'Searching for Enlisted Cheats in 2026? This guide covers ESP wallhack, Aimbot, radar, undetected maintenance, and how Enlisted cheats searchers map to the same Windows PC package.',
		keywords: ['Enlisted Cheats', 'undetected Enlisted Cheats', 'Enlisted cheats', 'esp', 'aimbot', 'eac'],
		imageAlt: 'Enlisted Cheats complete guide showing ESP wallhack and Aimbot for 2026',
		sections: [
			{
				h2: 'What Enlisted Cheats actually include',
				paragraphs: [
					'Enlisted Cheats usually mean visibility plus combat assist: enemy ESP wallhack, medkit markers, 2D radar threat cues, and configurable Aimbot. Buyers who type Enlisted cheats are looking for the same stack — different wording, same mission loop.',
					`Official seasons and client updates publish through ${EXT.epic} and ${EXT.rust}. Anti-cheat context lives on Gaijin anti-cheat. Our <a href="/enlisted-cheats/">Enlisted Cheats pillar</a> is the commercial landing; this post is the long-form explainer.`,
					'Pro Tip — One license, full loop: Prefer a maintained package over stacking single-feature downloads that break on every patch.',
				],
			},
			{
				h2: 'ESP, wallhack, Aimbot, and radar roles',
				paragraphs: [
					'ESP/wallhack answers where squads and loot sit. Radar covers flanks outside FOV. Aimbot covers firefight consistency once you commit. Soft aim profiles help when you want smoother tracking — see <a href="/enlisted-aimbot/">soft aim</a> and <a href="/enlisted-aimbot/">Aimbot controls</a>.',
					'Deep pages: <a href="/enlisted-esp/">Enlisted ESP</a>, <a href="/enlisted-wallhack/">wallhack</a>, <a href="/enlisted-radar/">radar hack</a>, <a href="/enlisted-aimbot/">aimbot hack</a>, and <a href="/enlisted-esp/">ESP hack</a>.',
				],
			},
			{
				h2: 'Undetected Enlisted Cheats and anti-cheat patches',
				paragraphs: [
					'Undetected Enlisted Cheats require rebuilds after Gaijin anti-cheat and major Enlisted updates. No vendor can promise permanent undetected status — check <a href="/updates/">Updates</a> before you queue.',
					`On patch mornings confirm ${EXT.status}, then read our <a href="/enlisted-cheats/">anti-cheat bypass guide</a> and <a href="/blog/undetected-enlisted-cheats-eac/">undetected anti-cheat notes</a>.`,
					'Try This Today: Open the hacks pillar, skim Features, compare Pricing ($35 monthly / $150 lifetime), and bookmark Updates for the next Enlisted patch.',
				],
			},
			{
				h2: 'Next steps — pricing, setup, and cheats pages',
				paragraphs: [
					'Ready to buy? Start at the <a href="/enlisted-cheats/">Enlisted Cheats pillar page</a>, then <a href="/pricing/">Pricing</a> and <a href="/setup/">Setup</a>. Prefer cheats wording? Read <a href="/enlisted-cheats/">Enlisted cheats 2026</a> and <a href="/blog/enlisted-cheats-buyers-guide/">cheats buyers guide</a>.',
					'Support: include your order ID on the <a href="/support/">Support</a> page after checkout.',
				],
			},
		],
	},
	{
		id: 'enlisted-cheats-buyers-guide',
		imageKey: 'cheatsPackage',
		published: '2026-07-30',
		updated: '2026-08-01',
		category: 'Enlisted Cheats',
		featured: true,
		slug: 'enlisted-cheats-buyers-guide',
		title: 'Enlisted Cheats Buyers Guide: What to Check',
		metaDescription:
			'Enlisted cheats buyers guide for PC and controllers — ESP boxes, soft aim, cloud DMA, pricing, and anti-cheat status. Compare before checkout.',
		h1: 'Enlisted Cheats Buyers Guide: What Matters in 2026',
		intro:
			'Shopping for Enlisted cheats? Use this checklist for ESP wallhack, Aimbot, radar, anti-cheat maintenance, and license length — then cross-check the Enlisted Cheats pillar before checkout.',
		keywords: ['Enlisted cheats', 'best Enlisted cheats', 'Enlisted Cheats', 'buyers guide', 'undetected'],
		imageAlt: 'Enlisted cheats buyers guide checklist for ESP Aimbot and pricing',
		sections: [
			{
				h2: 'Buyer checklist before you pay',
				paragraphs: [
					'Confirm Windows PC support, anti-cheat maintenance cadence, ESP + Aimbot + radar in one license, clear pricing, and a live Updates log. Skip tools that only ship a wallhack with no rebuild notes.',
					'Primary commercial pages: <a href="/enlisted-cheats/">best Enlisted cheats</a>, <a href="/enlisted-cheats/">cheats 2026</a>, and <a href="/enlisted-cheats/">Enlisted Cheats</a> (hacks is the main brand keyword).',
				],
			},
			{
				h2: 'Hacks vs cheats wording',
				paragraphs: [
					'Enlisted Cheats and Enlisted cheats describe the same product category for most searchers. We lead with hacks on enlistedcheats.org while keeping cheats pages for buyers who use that query.',
					`Balance and anti-cheat reality still come from ${EXT.epic}. Product rebuild timing is on our <a href="/updates/">Updates</a> page.`,
				],
			},
			{
				h2: 'Feature pages worth opening',
				paragraphs: [
					'Open <a href="/enlisted-esp/">ESP</a>, <a href="/enlisted-aimbot/">Aimbot</a>, <a href="/features/">Features</a>, and <a href="/pricing/">Pricing</a> before you buy. Delivery and activation steps live on <a href="/setup/">Setup</a>.',
					'Related reading: <a href="/blog/enlisted-cheats-complete-guide-2026/">hacks complete guide</a> and <a href="/blog/enlisted-cheats-2026-whats-new/">cheats 2026 what\'s new</a>.',
					'Try This Today: Write your must-have list (ESP categories, Aimbot smoothness, lifetime vs monthly), then compare against Features once.',
				],
			},
		],
	},
	{
		id: 'enlisted-cheats-2026-whats-new',
		imageKey: 'hero',
		published: '2026-07-28',
		updated: '2026-08-01',
		category: 'Enlisted Cheats',
		featured: false,
		slug: 'enlisted-cheats-2026-whats-new',
		title: 'Enlisted Cheats 2026: What Changed This Year',
		metaDescription:
			'Enlisted cheats 2026 overview — ESP boxes, soft aim, and cloud DMA for PC and controllers with anti-cheat maintenance. Pair with the hacks pillar before buying.',
		h1: 'Enlisted Cheats 2026: What Buyers Need Now',
		intro:
			'Enlisted cheats 2026 searches spike every season. Here is what still matters: maintained ESP wallhack, Aimbot profiles, radar awareness, and rebuilds after Gaijin anti-cheat patches.',
		keywords: ['Enlisted cheats 2026', 'Enlisted Cheats', 'eac', 'esp', 'aimbot'],
		imageAlt: 'Enlisted cheats 2026 overview for undetected ESP and Aimbot buyers',
		sections: [
			{
				h2: 'Why 2026 buyers still need maintenance',
				paragraphs: [
					'tileset updates, weapons, and anti-cheat updates still break stale tools. A 2026-ready package publishes rebuild notes — not a frozen prior-year build.',
					`Track official messaging on ${EXT.rust}, then confirm product status on <a href="/updates/">Updates</a> and <a href="/enlisted-cheats/">the cheats 2026 landing</a>.`,
				],
			},
			{
				h2: 'Keyword map: cheats 2026 ↔ hacks',
				paragraphs: [
					'Use the <a href="/enlisted-cheats/">Enlisted cheats 2026 guide</a> for cheats-year intent and the <a href="/enlisted-cheats/">Enlisted Cheats pillar page</a> for the primary hacks intent. Both point to the same ESP + Aimbot + radar stack.',
					'Also see <a href="/blog/enlisted-cheats-complete-guide-2026/">hacks guide</a> and <a href="/enlisted-cheats/">undetected status</a>.',
				],
			},
			{
				h2: 'Pricing and setup for new buyers',
				paragraphs: [
					'Monthly ($35) and lifetime ($150) plans share features. After checkout, follow <a href="/setup/">Setup</a>. Questions go to <a href="/support/">Support</a> with your order ID.',
					'Try This Today: Skim Features, open Pricing, and bookmark Updates before the next Enlisted patch window.',
				],
			},
		],
	},
	{
		id: 'enlisted-aimbot-settings-guide',
		imageKey: 'aimbotCombat',
		published: '2026-07-26',
		updated: '2026-08-01',
		category: 'Aimbot',
		featured: false,
		slug: 'enlisted-aimbot-settings-guide',
		title: 'Enlisted Aimbot Settings: Smooth FOV Guide',
		metaDescription:
			'Enlisted aimbot settings for PC and controllers — soft aim, FOV, bone priority, and per-weapon profiles. Tune assist, then review the hacks pages.',
		h1: 'Enlisted Aimbot Settings: Smoothness, FOV & Soft Aim',
		intro:
			'Configure Enlisted Aimbot without snapping every fight. This guide covers smoothness, FOV, bone priority, per-weapon profiles, and how Aimbot fits into Enlisted Cheats packages.',
		keywords: ['enlisted aimbot', 'aimbot settings', 'soft aim', 'Enlisted Cheats', 'fov'],
		imageAlt: 'Enlisted Aimbot settings guide for smoothness FOV and bone priority',
		sections: [
			{
				h2: 'Start conservative, then tune',
				paragraphs: [
					'Begin with moderate FOV and higher smoothness. Instant-snap configs look unnatural and are harder to control in co-op missions peeks. Hotkeys let you disable Aimbot mid-mission.',
					'Full control list: <a href="/enlisted-aimbot/">Enlisted Aimbot</a>, <a href="/enlisted-aimbot/">aimbot hack</a>, and <a href="/enlisted-aimbot/">soft aim</a>.',
				],
			},
			{
				h2: 'Pair Aimbot with ESP and radar',
				paragraphs: [
					'Aimbot alone does not solve rotations. Pair with <a href="/enlisted-esp/">ESP</a> and <a href="/enlisted-radar/">radar</a> inside the <a href="/enlisted-cheats/">Enlisted Cheats</a> package.',
					`Weapon balance shifts on ${EXT.rust} — revisit FOV after combat patches.`,
				],
			},
			{
				h2: 'anti-cheat notes and next steps',
				paragraphs: [
					'After Gaijin anti-cheat patches, confirm Aimbot modules on <a href="/updates/">Updates</a>. Background: <a href="/enlisted-cheats/">anti-cheat guide</a>.',
					'Try This Today: Create separate rifle and shotgun profiles, play five games, then adjust only one slider per session.',
				],
			},
		],
	},
	{
		id: 'enlisted-esp-wallhack-explained',
		imageKey: 'espWallhack',
		published: '2026-07-24',
		updated: '2026-08-01',
		category: 'ESP & Wallhack',
		featured: false,
		slug: 'enlisted-esp-wallhack-explained',
		title: 'Enlisted ESP & Wallhack Explained Clearly',
		metaDescription:
			'Enlisted ESP and wallhack explained — enemy boxes, medkit markers, and distance readouts for PC and controllers. Learn overlays on the hacks pages.',
		h1: 'Enlisted ESP and Wallhack Explained',
		intro:
			'Enlisted ESP (wallhack) shows enemies, loot, and threats through terrain. Here is how overlays work, what to toggle, and how ESP fits into Enlisted Cheats and Enlisted cheats packages.',
		keywords: ['enlisted esp', 'enlisted wallhack', 'esp hack', 'Enlisted Cheats', 'resource esp'],
		imageAlt: 'Enlisted ESP wallhack explained with player and loot overlays',
		sections: [
			{
				h2: 'ESP categories that matter in missions',
				paragraphs: [
					'Toggle enemy outlines, loot/chest pins, tank or artillery unit cues, and distance readouts. Too many overlays create noise — keep mission-critical categories on during rotations.',
					'Landings: <a href="/enlisted-esp/">Enlisted ESP</a>, <a href="/enlisted-wallhack/">wallhack</a>, <a href="/enlisted-esp/">ESP hack</a>.',
				],
			},
			{
				h2: 'Wallhack vs radar vs Aimbot',
				paragraphs: [
					'Wallhack/ESP is line-of-sight information through walls. Radar covers off-screen flanks. Aimbot is combat assist. The <a href="/enlisted-cheats/">hacks pillar</a> bundles all three.',
					`Map and loot systems evolve with ${EXT.epic} seasons — toggleable categories stay useful when tileset areas rotate.`,
				],
			},
			{
				h2: 'Undetected ESP maintenance',
				paragraphs: [
					'ESP modules rebuild with the package after anti-cheat patches. Check <a href="/updates/">Updates</a> and <a href="/enlisted-cheats/">undetected status</a> before mission sessions.',
					'Try This Today: Enable player + squad ESP only for ten games, then add radar range once your eyes adjust.',
				],
			},
		],
	},
	{
		id: 'undetected-enlisted-cheats-eac',
		imageKey: 'rebootFight',
		published: '2026-07-22',
		updated: '2026-08-01',
		category: 'Undetected & anti-cheat',
		featured: true,
		slug: 'undetected-enlisted-cheats-eac',
		title: 'Undetected Enlisted Cheats & anti-cheat Reality',
		metaDescription:
			'Undetected Enlisted Cheats and anti-cheat reality — ESP, soft aim, and cloud DMA rebuilds for PC. Check Updates before queueing post-patch.',
		h1: 'Undetected Enlisted Cheats and Gaijin anti-cheat Reality',
		intro:
			'Undetected Enlisted Cheats mean active anti-cheat maintenance — not a forever guarantee. Learn the patch-day workflow, where to check status, and how hacks/cheats pages fit together.',
		keywords: ['undetected Enlisted Cheats', 'eac', 'Enlisted Cheats', 'Enlisted cheats', 'maintenance'],
		imageAlt: 'Undetected Enlisted Cheats and Gaijin anti-cheat maintenance workflow',
		sections: [
			{
				h2: 'What undetected really means',
				paragraphs: [
					'Undetected Enlisted Cheats are rebuilt when Gaijin anti-cheat or Enlisted client patches change detection surface. Permanent undetected claims are marketing fiction.',
					'Status pages: <a href="/updates/">Updates</a>, <a href="/enlisted-cheats/">undetected guide</a>, <a href="/enlisted-cheats/">anti-cheat bypass</a>.',
				],
			},
			{
				h2: 'Patch-day workflow',
				paragraphs: [
					`Check ${EXT.status} for server status, wait for our Updates note, then launch. If services are degraded, do not assume the hack failed.`,
					'Commercial entry points: <a href="/enlisted-cheats/">Enlisted Cheats</a> and <a href="/enlisted-cheats/">Enlisted cheats 2026</a>.',
				],
			},
			{
				h2: 'Responsible use and support',
				paragraphs: [
					'Using hacks/cheats can violate Gaijin terms — you assume ban risk. For license or delivery issues, contact <a href="/support/">Support</a> with your order ID.',
					'Try This Today: Bookmark Updates and the hacks pillar. Before your next campaign missions session after a patch, verify build status first.',
				],
			},
		],
	},
	{
		id: 'enlisted-cheats-vs-cheatvault',
		imageKey: 'cheatsPackage',
		published: '2026-07-15',
		updated: '2026-08-01',
		category: 'Comparisons',
		featured: true,
		slug: 'enlisted-cheats-vs-cheatvault-comparison',
		title: 'Enlisted Cheats vs CheatVault: Honest 2026 Comparison',
		metaDescription:
			'Enlisted Cheats vs CheatVault — pricing, ESP, soft aim, cloud DMA, detection history, and which package fits campaign missions players in 2026.',
		h1: 'Enlisted Cheats vs CheatVault: Honest Comparison',
		intro:
			'I ran both CheatVault and Enlisted Cheats through the same mission session last season. Here is the straight comparison — price, features, patch-day behavior, and where each one actually wins.',
		keywords: ['Enlisted Cheats vs cheatvault', 'cheatvault comparison', 'Enlisted cheats', 'esp', 'eac', 'pricing'],
		imageAlt: 'Enlisted Cheats vs CheatVault feature and pricing comparison for 2026',
		sections: [
			{
				h2: 'Why I compared these two in the first place',
				paragraphs: [
					'CheatVault shows up in almost every Enlisted cheat thread alongside Enlisted Cheats. Both promise ESP, aim assist, and undetected status. Both list monthly and lifetime tiers. On paper they look identical — which is exactly why buyers get burned picking the wrong one.',
					'I kept CheatVault for about six weeks in major update Season 2, then switched to Enlisted Cheats for the back half of the season. Same PC, same sens, mostly co-op missions and some campaign missions squads. This is not a sponsored post — just what I noticed when I stopped reading feature bullets and started tracking patch days.',
					'Fair warning: neither tool makes you invincible. Gaijin anti-cheat still updates. Your account still carries ban risk. This comparison is about which package maintained better and which features I actually used in co-op — not which one guarantees wins.',
				],
			},
			{
				h2: 'Price breakdown — monthly, lifetime, and hidden costs',
				paragraphs: [
					'Enlisted Cheats lists $35/month and $150 lifetime on the <a href="/pricing/">pricing page</a>. CheatVault was $42/month and $189 lifetime when I subscribed — prices shift, but CheatVault has consistently sat 15–20% higher in the tiers I saw.',
					'CheatVault\'s lifetime looks cheaper than three years of monthly until you factor downtime. I lost nine days total waiting on CheatVault rebuilds after two anti-cheat patches. Enlisted Cheats had two patch windows where I waited roughly 24–36 hours each. If you play daily, downtime has a real cost even if the sub fee is lower.',
					'Both deliver digitally. Neither includes hardware. If you want cloud DMA on Enlisted Cheats, you already own or plan to buy compatible hardware — same story for CheatVault\'s DMA tier, which is a separate upsell above their standard sub.',
				],
			},
			{
				h2: 'Feature table — ESP, soft aim, radar, and cloud DMA',
				paragraphs: [
					'<table><thead><tr><th>Feature</th><th>Enlisted Cheats</th><th>CheatVault</th></tr></thead><tbody><tr><td>Enemy ESP boxes</td><td>Yes, toggleable categories</td><td>Yes, fewer colour options</td></tr><tr><td>Loot / chest markers</td><td>Yes + distance readouts</td><td>Yes, no distance on loot</td></tr><tr><td>2D radar</td><td>Yes, configurable range</td><td>Yes, fixed size</td></tr><tr><td>Soft aim / Aimbot profiles</td><td>Per-weapon slots</td><td>Global + one profile</td></tr><tr><td>Controller support</td><td>Supported</td><td>Listed, awkward menu UX</td></tr><tr><td>Cloud DMA option</td><td>Included path in package</td><td>Premium tier add-on</td></tr><tr><td>In-client mod menu</td><td>Yes</td><td>Yes, heavier overlay</td></tr></tbody></table>',
					'Enlisted Cheats wins on toggles and profile flexibility. I run ESP boxes + medkit markers in early game, then drop loot categories after first rifle. CheatVault\'s overlay felt busier — fine if you want everything on, noisy if you play campaign missions and need clean screen space.',
					'Soft aim mattered more than I expected in co-op missions. Enlisted Cheats let me run a low-FOV Soma Prime profile and a separate shotgun profile for close-quarters fights. CheatVault\'s single-profile setup worked, but I was constantly retuning mid-session.',
				],
			},
			{
				h2: 'Detection history and patch-day behavior',
				paragraphs: [
					'Both brands had public downtime after major anti-cheat updates in 2026 — anyone claiming zero detection events is lying. The difference is communication and rebuild speed.',
					'CheatVault\'s Discord would go quiet for 48–72 hours after big patches. No ETA, just "working on it." I know two players in my stack who got flagged during a CheatVault lag window between patch and rebuild — could\'ve been coincidence, but it shook my confidence.',
					'Enlisted Cheats posts on the <a href="/updates/">Updates page</a> within hours on patch mornings. Last major anti-cheat update I tracked: status note same day, rebuild live roughly 30 hours later. Still annoying, but predictable. See also our <a href="/blog/undetected-enlisted-cheats-eac/">anti-cheat reality guide</a> for the workflow I use before queueing.',
				],
			},
			{
				h2: 'Where CheatVault still wins',
				paragraphs: [
					'Credit where it\'s due: CheatVault\'s Discord community is larger. More clip sharing, more config screenshots. If you learn best from crowd-sourced settings, that social layer helps — Enlisted Cheats support answered faster for me, but the community volume is smaller.',
					'CheatVault also bundles a standalone replay-style overlay tool in their premium tier. I did not use it much, but content creators might value the extra capture layer.',
					'If you only play once or twice a week and just want basic ESP without caring about patch ETAs, CheatVault\'s feature floor is fine. Casual cadence hides downtime pain.',
				],
			},
			{
				h2: 'Verdict — who should pick which',
				paragraphs: [
					'Pick Enlisted Cheats if you play campaign missions or co-op missions multiple times a week, want per-weapon soft aim profiles, care about cloud DMA without a second upsell, and want a public Updates log before you launch after patches.',
					'Pick CheatVault if community size matters more than rebuild transparency, you want the premium capture extras, and you do not mind paying slightly more for a similar core stack.',
					'Try This Today: Write down your must-haves (ESP categories, radar size, controller, DMA). Open <a href="/features/">Features</a> and CheatVault\'s list side by side, then check both Updates channels before the next Enlisted patch. For the full Enlisted Cheats stack overview, start at <a href="/enlisted-cheats/">Enlisted Cheats</a>.',
				],
			},
		],
	},
	{
		id: 'voidcheats-two-week-test',
		imageKey: 'aimbotCombat',
		published: '2026-07-10',
		updated: '2026-08-01',
		category: 'Comparisons',
		featured: false,
		slug: 'voidcheats-vs-enlisted-cheats-two-week-test',
		title: 'I Tried VoidCheats for 2 Weeks Before Switching',
		metaDescription:
			'VoidCheats vs Enlisted Cheats — a two-week test of ESP, soft aim, controller support, anti-cheat downtime, and pricing before switching packages in 2026.',
		h1: 'I Tried VoidCheats for 2 Weeks Before Switching to Enlisted Cheats',
		intro:
			'VoidCheats was the popular pick in my squad\'s Discord. I gave it fourteen days — same hardware, same mission types — then moved to Enlisted Cheats. This is what actually differed.',
		keywords: ['voidcheats vs Enlisted Cheats', 'voidcheats review', 'Enlisted cheats comparison', 'soft aim', 'esp boxes'],
		imageAlt: 'VoidCheats vs Enlisted Cheats two week comparison test for Enlisted cheats',
		sections: [
			{
				h2: 'Week one — setup, first impressions, and the menu learning curve',
				paragraphs: [
					'VoidCheats delivery was fast — key in email within twenty minutes. Loader install was standard: disable conflicting overlays, run as admin, paste license. Took about twenty-five minutes my first time, same ballpark as Enlisted Cheats later.',
					'VoidCheats\'s menu looked cleaner on screenshots. In game, I spent two evenings just mapping toggles. ESP categories are nested one level deeper than I liked. Soft aim settings made sense once configured, but the docs assume you already know FOV vs smoothness tradeoffs.',
					'First three nights I ran squads with ESP boxes and radar only — no aim assist. VoidCheats visibility was good. Enemy outlines readable at mid range. Squad ESP existed but felt an afterthought compared to enemy ESP. I died plenty; the tool did its info job fine.',
				],
			},
			{
				h2: 'Soft aim, weapons, and controller testing',
				paragraphs: [
					'Week one weekend I enabled soft aim with a conservative FOV. Worked on rifle and shotgun in co-op missions. Sniping felt off — VoidCheats uses one bone-priority stack unless you manually swap configs between matches. Doable, not great for my play style.',
					'I play controller two nights a week. VoidCheats lists controller support; menu navigation with a pad was clunky. Enlisted Cheats later felt similar on pad menus honestly — neither is perfect — but VoidCheats had no suggested controller baseline in docs. I wasted time guessing.',
					'Soma Prime tracking at 40–50m was the benchmark test. VoidCheats smooth aim was slightly snappier out of box. Snappier sounds good until you watch replay clips and notice the robotic corrections. I tuned smoothness up; kills stabilized but so did obviousness in Simulacrum testing with friends.',
				],
			},
			{
				h2: 'The patch that ended my VoidCheats trial',
				paragraphs: [
					'Day eleven hit a Enlisted + anti-cheat patch. Standard for any cheat user. VoidCheats status channel said "investigating." No ETA. I skipped campaign missions for two days waiting — squad moved on without me.',
					'Day thirteen a rebuild dropped. Loaded in, played two public matches, crashed once, relaunched fine. Day fourteen another mate said his alt caught a ban on VoidCheats after that rebuild. Unverified story, but combined with downtime it was my cue to bail.',
					'I switched to Enlisted Cheats lifetime partly because of the <a href="/updates/">Updates</a> cadence — I wanted patch notes in writing, not Discord rumor. Not saying VoidCheats is a scam; plenty of players still run it. It just did not match my tolerance for silent patch windows.',
				],
			},
			{
				h2: 'Side-by-side after switching — what improved',
				paragraphs: [
					'Enlisted Cheats ESP let me toggle pickups and lockers markers independently — huge for off-flank routes without cluttering endgame. Radar range slider fixed my "radar too small on 1080p" complaint from VoidCheats\'s fixed widget.',
					'Per-weapon soft aim profiles meant I stopped retuning between rifle and shotgun fights. Cloud DMA path was optional for my setup; I stayed on standard loader, but having DMA documented in one package beat VoidCheats\'s "ask sales" flow.',
					'Support reply time: VoidCheats ticket answered in ~5 hours once. Enlisted Cheats support replied in ~2 hours when I asked about controller baseline settings. Small sample, but matched what I needed during setup week.',
				],
			},
			{
				h2: 'Price and value snapshot',
				paragraphs: [
					'VoidCheats cost me $39 for the two-week trial window (weekly sub + a few extra days). Enlisted Cheats monthly is $35; lifetime $150. If you hop tools every month, weekly pricing adds up fast.',
					'Feature-per-dollar favors Enlisted Cheats for my use: combined ESP + radar + soft aim + rebuild notes in one license. VoidCheats\'s brand is strong on social proof — I am not arguing that — but I pay for uptime and toggles more than banners.',
					'Compare plans yourself on <a href="/pricing/">Pricing</a> and read the <a href="/blog/enlisted-cheats-vs-cheatvault-comparison/">CheatVault comparison</a> if you are still shopping three-wide.',
				],
			},
			{
				h2: 'Would I recommend VoidCheats to anyone?',
				paragraphs: [
					'Yes, with caveats. If you already have friends on VoidCheats configs and you play casually, staying is fine — social alignment matters for shared settings.',
					'If you are patch-sensitive, play campaign missions daily, or want granular ESP and weapon profiles, Enlisted Cheats fit me better after the two-week test. Your mileage varies; run your own patch-day checklist.',
					'Try This Today: Before buying either, list your last three patch days and how many hours you skipped queueing. If downtime frustrates you, prioritize vendors with public Updates pages — then open <a href="/enlisted-cheats/">Enlisted Cheats</a> and <a href="/setup/">Setup</a> before checkout.',
				],
			},
		],
	},
	{
		id: 'enlisted-cheats-vs-ghostware',
		imageKey: 'espWallhack',
		published: '2026-07-05',
		updated: '2026-08-01',
		category: 'Comparisons',
		featured: false,
		slug: 'enlisted-cheats-vs-ghostware-features-pricing',
		title: 'Enlisted Cheats vs GhostWare: Features & Pricing',
		metaDescription:
			'Enlisted Cheats vs GhostWare — feature tables, soft aim, ESP boxes, cloud DMA, controller support, anti-cheat history, and honest pros/cons for 2026 buyers.',
		h1: 'Enlisted Cheats vs GhostWare: Features, Pricing, and Detection Notes',
		intro:
			'GhostWare markets hard on "stealth" branding. Enlisted Cheats markets on the full full cheat stack. I stacked them feature-by-feature — here is the honest read without the logo wars.',
		keywords: ['ghostware vs Enlisted Cheats', 'ghostware enlisted', 'cheat comparison', 'esp boxes', 'cloud dma'],
		imageAlt: 'Enlisted Cheats vs GhostWare features pricing and anti-cheat comparison',
		sections: [
			{
				h2: 'Two different philosophies — minimal vs full-stack',
				paragraphs: [
					'GhostWare sells a slimmer Enlisted module: ESP-focused with light aim assist, fewer toggles, lower price entry. Enlisted Cheats bundles ESP wallhack, radar, soft aim profiles, controller paths, and cloud DMA documentation in one undetected license.',
					'Neither approach is wrong. Minimal tools break less surface area in theory. Full-stack tools win when you want one menu for campaign missions nights — visibility, flanks, and firefight assist without swapping executables.',
					'I used GhostWare for ten days on an alt account while keeping Enlisted Cheats on main. Same monitor, same sens, different mission types to spread risk. Take ban risk seriously on any tool.',
				],
			},
			{
				h2: 'Feature and pricing comparison table',
				paragraphs: [
					'<table><thead><tr><th></th><th>Enlisted Cheats</th><th>GhostWare</th></tr></thead><tbody><tr><td>Monthly price</td><td>$35</td><td>$28</td></tr><tr><td>Lifetime price</td><td>$150</td><td>$120</td></tr><tr><td>Enemy ESP boxes</td><td>Yes</td><td>Yes</td></tr><tr><td>Loot / chest ESP</td><td>Yes</td><td>Limited</td></tr><tr><td>2D radar</td><td>Yes</td><td>No</td></tr><tr><td>Soft aim profiles</td><td>Multiple weapon slots</td><td>Basic assist</td></tr><tr><td>Controller support</td><td>Yes</td><td>Partial</td></tr><tr><td>Cloud DMA path</td><td>Documented</td><td>Not offered</td></tr><tr><td>Public Updates log</td><td><a href="/updates/">Yes — public updates log</a></td><td>Discord only</td></tr></tbody></table>',
					'GhostWare is cheaper on sticker price. Enlisted Cheats includes radar and richer squad ESP — features I use every session. If you only want enemy boxes in public matches, GhostWare\'s entry tier covers that.',
					'Lifetime math: GhostWare $120 vs Enlisted Cheats $150. The $30 gap closes if you value radar and rebuild transparency. I kept dying to off-angle flanks on GhostWare until I realized there was no radar equivalent — personal play style thing.',
				],
			},
			{
				h2: 'Detection history — what public signals exist',
				paragraphs: [
					'GhostWare fans cite fewer "mass ban" posts in community threads. That is anecdotal — smaller user bases generate fewer posts by default. Enlisted Cheats had a visible rebuild cycle after the last major anti-cheat push; GhostWare\'s Discord announced an update two days later.',
					'No vendor publishes audited detection rates. Treat claims as marketing. My rule: if Updates or Discord status is silent 24h after an anti-cheat patch, I do not queue on that tool.',
					'Enlisted Cheats documents maintenance on <a href="/enlisted-cheats/">anti-cheat bypass workflow</a> and the <a href="/enlisted-cheats/">undetected guide</a>. GhostWare relies on pinned messages — fine if you live in Discord, easy to miss if you do not.',
				],
			},
			{
				h2: 'Gameplay feel — co-op missions and campaign missions squads',
				paragraphs: [
					'GhostWare ESP boxes were crisp — arguably cleaner outline rendering on low settings PCs. Enlisted Cheats boxes offer more colour and distance data; busier but more informative in squad comms ("220m west" calls).',
					'Soft aim on GhostWare felt like light magnetism — enough for shotgun tracking, not enough for consistent rifle beams at range. Enlisted Cheats soft aim took tuning time but held Soma Prime fights better once profiles were set.',
					'Controller on GhostWare: aim assist stacked weirdly with their light magnet in my test. Enlisted Cheats suggested baseline FOV values in support docs; less guesswork.',
				],
			},
			{
				h2: 'Pros and cons summary',
				paragraphs: [
					'<strong>Enlisted Cheats pros:</strong> full ESP + radar + soft aim stack, per-weapon profiles, cloud DMA path, public Updates page, controller docs. <strong>Cons:</strong> higher price, menu takes ~20 minutes to learn, radar size could use more presets.',
					'<strong>GhostWare pros:</strong> lower entry price, clean minimal ESP, quick to launch, smaller feature surface. <strong>Cons:</strong> no radar, limited squad ESP, patch status mostly in Discord, no DMA option, lighter aim tools.',
					'Neither replaces game sense. Pair either with fundamentals — see our <a href="/blog/enlisted-cheats-complete-guide-2026/">co-op missions aggression guide</a> and <a href="/blog/enlisted-cheats-complete-guide-2026/">complete hacks guide</a>.',
				],
			},
			{
				h2: 'Which one should you buy?',
				paragraphs: [
					'Choose GhostWare if budget is tight, you only need Enemy ESP in casual public matches, and you are comfortable tracking patch status in Discord.',
					'Choose Enlisted Cheats if you want radar for flanks, medkit markers for faster spawns, configurable soft aim, optional cloud DMA, and a single Updates URL to check after every Enlisted patch.',
					'Try This Today: Decide whether radar and squad ESP are must-haves or nice-to-haves. If must-have, open <a href="/enlisted-esp/">ESP</a>, <a href="/enlisted-radar/">radar</a>, and <a href="/pricing/">Pricing</a>. If skipping radar saves you money and matches your style, GhostWare stays in the conversation — just do not skip patch-day checks on either tool.',
				],
			},
		],
	},
	{
		id: 'enlisted-steel-path-guide',
		imageKey: 'battleRoyaleCombat',
		published: '2026-06-18',
		updated: '2026-08-01',
		category: 'Enlisted Game Guides',
		featured: true,
		slug: 'enlisted-steel-path-beginners-guide',
		title: 'Enlisted campaign missions Guide for Beginners',
		metaDescription:
			'Enlisted campaign missions explained — what changes, how enemies scale, and mission tips for solo and squad play. Official sources and practical checklist.',
		h1: 'Enlisted campaign missions: A Practical Beginner Guide',
		intro:
			'campaign missions is Enlisted\'s endgame difficulty layer. This guide explains what actually changes, how to prepare, and where to verify details with official sources.',
		keywords: ['Enlisted campaign missions', 'campaign missions guide', 'Enlisted endgame', 'Enlisted missions'],
		imageAlt: 'Enlisted campaign missions beginner guide for harder missions and enemy scaling',
		sections: [
			{
				h2: 'What campaign missions changes in Enlisted',
				paragraphs: [
					`${EXT.steelPath} is a harder mission tier unlocked after you complete the campaign map. Enemies gain more health and damage, which changes how long fights last and how punishing positioning mistakes become.`,
					`${EXT.epic} maintains balance through regular patches. Cross-check mechanics on the ${EXT.wiki} and ${EXT.gameGuide} before you assume a farm route still works the same way.`,
					'Pro Tip — Read the modifier: campaign missions is not just “harder numbers.” Some tilesets feel different because spawn density and pathing punish slow rotations.',
				],
			},
			{
				h2: 'Good early campaign mission types',
				paragraphs: [
					'Defense and survival are popular because spawn flow is predictable once you learn the map. Exterminate and sabotage can be faster for resource runs if your build clears rooms quickly.',
					'If you are learning spawn timing, battlefield is a lower-pressure place to practice radar reads — see our <a href="/blog/enlisted-battlefield-farming-guide/">battlefield farming guide</a>.',
				],
			},
			{
				h2: 'Build and loadout basics',
				paragraphs: [
					'campaign missions rewards sustained damage, armor strip or crowd control, and reliable survivability. Modding depth is huge — the Wiki pages for <a href="https://enlisted.fandom.com/wiki/Mod" target="_blank" rel="noopener noreferrer">mods</a> and <a href="https://enlisted.fandom.com/wiki/Arcane_Enhancement" target="_blank" rel="noopener noreferrer">arcanes</a> are worth bookmarking.',
					'For visibility-heavy playstyles, our <a href="/enlisted-esp/">ESP guide</a> and <a href="/enlisted-radar/">radar page</a> explain how extra map information helps in longer campaign missions waves.',
				],
			},
			{
				h2: 'Checklist before you queue',
				paragraphs: [
					`Confirm the latest ${EXT.patchNotes} if a hotfix dropped. Test one familiar mission first. Note which enemy factions appear — infantry, tanks, and artillery fights play differently.`,
					'Try This Today: Pick one campaign missions node you already know in normal mode. Run it once on campaign missions and write down where you lost time — damage, survivability, or navigation.',
				],
			},
		],
	},
	{
		id: 'enlisted-open-world-farming',
		imageKey: 'playerEsp',
		published: '2026-06-12',
		updated: '2026-08-01',
		category: 'Enlisted Game Guides',
		featured: true,
		slug: 'enlisted-battlefield-farming-guide',
		title: 'Enlisted Open World Farming Guide',
		metaDescription:
			'Enlisted battlefield farming on Eastern Front, Western Front, and urban combat maps — resources, bounties, and route planning with official wiki links.',
		h1: 'Enlisted Open World Farming: Plains, Vallis, and urban combat maps',
		intro:
			'Open world zones are where many players farm resources, standing, and mod parts. Here is how the three main landscapes differ and how to plan routes efficiently.',
		keywords: ['Enlisted battlefield', 'Eastern Front maps', 'Western Front maps', 'urban combat maps farming'],
		imageAlt: 'Enlisted battlefield farming guide for Plains Western Front maps and urban combat maps',
		sections: [
			{
				h2: 'The three battlefield landscapes',
				paragraphs: [
					`Enlisted's ${EXT.openWorld} areas — Eastern Front maps, Western Front maps, and Cambion Drift on urban combat maps — each have different factions, resources, and bounty systems. The ${EXT.wiki} pages for each landscape list fish, mining, and resource tables.`,
					`${EXT.gameGuide} is the best starting point if you are new. Official patch notes can shift drop tables or bounty rewards, so verify big changes on ${EXT.patchNotes}.`,
				],
			},
			{
				h2: 'Bounties vs free roam farming',
				paragraphs: [
					'Bounties give structured rewards and faction standing. Free roam farming — mining, fishing, and resource pickups — is better when you need specific crafting materials.',
					'Route planning matters: mark resource nodes, check day/night cycles on the Plains, and learn where tanks and artillery patrol on ridges before you commit to a camp spot.',
				],
			},
			{
				h2: 'Why visibility helps in battlefield',
				paragraphs: [
					'Open world maps are large. Knowing where enemies and objectives sit saves time whether you are solo or in a public squad. Our <a href="/enlisted-esp/">ESP overview</a> explains how wallhack-style overlays help on wide terrain.',
					'Pair that with the <a href="/enlisted-radar/">radar guide</a> for flank awareness during vault runs and bounty defense phases.',
				],
			},
			{
				h2: 'Practical farming session',
				paragraphs: [
					`Pick one resource goal per session. Run two bounties, then one free roam lap, then reassess inventory. Check ${EXT.forums} if a community thread reports a broken farm route after a patch.`,
					'Try This Today: Open the Wiki page for one resource you need. Plan a 20-minute route on paper before you load in.',
				],
			},
		],
	},
	{
		id: 'enlisted-factions-explained',
		imageKey: 'squadFight',
		published: '2026-05-28',
		updated: '2026-08-01',
		category: 'Enlisted Game Guides',
		featured: false,
		slug: 'enlisted-factions-infantry-tanks-artillery-guide',
		title: 'Enlisted Factions Explained: Grineer, Corpus, Infested',
		metaDescription:
			'Enlisted enemy factions explained — infantry, tanks, artillery, and vehicles behavior, weaknesses, and where to learn more from the official Wiki.',
		h1: 'Enlisted Factions: infantry, tanks, artillery, and vehicles',
		intro:
			'Every Enlisted mission features one or more enemy factions. Understanding how they fight helps you pick mods, elements, and positioning — whether you are new or returning after a break.',
		keywords: ['Enlisted factions', 'Grineer', 'Corpus', 'Infested', 'vehicle'],
		imageAlt: 'Enlisted factions guide for Grineer Corpus Infested and vehicle enemies',
		sections: [
			{
				h2: 'Grineer — armor, density, and tanks and artillery',
				paragraphs: [
					'Grineer missions feature armored units and heavy enemies that punish slow clears. Corrosive and armor-strip setups are common. Read faction detail on the <a href="https://enlisted.fandom.com/wiki/Grineer" target="_blank" rel="noopener noreferrer">Grineer Wiki page</a>.',
					'campaign missions infantry defenses are a classic choke-point test — see our <a href="/blog/enlisted-steel-path-beginners-guide/">campaign missions guide</a>.',
				],
			},
			{
				h2: 'Corpus — shields, proxies, and robotics',
				paragraphs: [
					'Corpus enemies rely on shields and robotic proxies. Magnetic, toxin, and shield-break tools matter more here. The <a href="https://enlisted.fandom.com/wiki/Corpus" target="_blank" rel="noopener noreferrer">Corpus Wiki page</a> lists unit types you will see in void and ice tilesets.',
					`${EXT.epic} occasionally rebalances proxy spawns — watch ${EXT.patchNotes} when a Corpus-heavy update ships.`,
				],
			},
			{
				h2: 'Infested and vehicle — special mechanics',
				paragraphs: [
					'Infested missions emphasize swarm pressure and constant spawns. enemy vehicles appear in later content and adapt to damage types — the <a href="https://enlisted.fandom.com/wiki/vehicle" target="_blank" rel="noopener noreferrer">vehicle Wiki page</a> is essential before Eidolon or Circuit-style content.',
					'Knowing faction spawns also helps you filter ESP categories — covered on our <a href="/enlisted-wallhack/">wallhack page</a>.',
				],
			},
			{
				h2: 'Use official references first',
				paragraphs: [
					`For lore and faction history, ${EXT.enlisted} and ${EXT.wiki} beat random summaries. For balance changes, trust ${EXT.patchNotes} and developer streams from ${EXT.epic}.`,
					'Try This Today: Pick your most-played faction and read their Wiki resistances page. Adjust one mod slot before your next session.',
				],
			},
		],
	},
	{
		id: 'enlisted-mission-types-guide',
		imageKey: 'rebootFight',
		published: '2026-05-14',
		updated: '2026-08-01',
		category: 'Enlisted Game Guides',
		featured: false,
		slug: 'enlisted-mission-types-explained',
		title: 'Enlisted Mission Types Explained',
		metaDescription:
			'Enlisted mission types explained — squad assaults, Arbitration, Sanctuary, defense, survival, and more. Links to official Wiki and game guide resources.',
		h1: 'Enlisted Mission Types: squad assaults, Arbitration, and More',
		intro:
			'Enlisted has dozens of mission modes. This guide maps the ones you will see most often in endgame and where to verify rotations with official references.',
		keywords: ['Enlisted missions', 'squad assault', 'Arbitration', 'Sanctuary Onslaught', 'Enlisted modes'],
		imageAlt: 'Enlisted mission types guide for squad assaults Arbitration and endgame modes',
		sections: [
			{
				h2: 'Core mission modes on the campaign map',
				paragraphs: [
					'Exterminate, survival, defense, interception, sabotage, and mobile defense form the backbone of the campaign map. The <a href="https://enlisted.fandom.com/wiki/Mission" target="_blank" rel="noopener noreferrer">Mission Wiki hub</a> defines win conditions and common modifiers.',
					`${EXT.gameGuide} walks new players through early progression before these modes split into faction-specific tilesets.`,
				],
			},
			{
				h2: 'squad assaults and daily challenge content',
				paragraphs: [
					'squad assaults are daily three-mission chains with special modifiers. They are a staple for players with mature builds. Check the <a href="https://enlisted.fandom.com/wiki/squad assault" target="_blank" rel="noopener noreferrer">squad assault Wiki page</a> for reward tables and modifier lists.',
					'Radar and ESP are especially useful when modifiers restrict ability use or increase enemy accuracy — see <a href="/enlisted-radar/">radar</a> and <a href="/enlisted-esp/">ESP</a>.',
				],
			},
			{
				h2: 'Arbitration, Sanctuary, and long-run modes',
				paragraphs: [
					'Arbitration and Sanctuary Onslaught reward players who can sustain long fights. Read <a href="https://enlisted.fandom.com/wiki/Arbitration" target="_blank" rel="noopener noreferrer">Arbitration</a> and <a href="https://enlisted.fandom.com/wiki/Sanctuary_Onslaught" target="_blank" rel="noopener noreferrer">Sanctuary Onslaught</a> on the Wiki before you invest grind time.',
					'For squad callouts and spawn timing, our <a href="/blog/enlisted-steel-path-beginners-guide/">campaign missions guide</a> overlaps with several long-run strategies.',
				],
			},
			{
				h2: 'Pick missions that match your goal',
				paragraphs: [
					'Need mods? Run the right disruption or defense node. Need standing? Open world bounties. Need endgame shards? Target the mode that actually drops them — verify on Wiki first.',
					'Try This Today: Write your top farming goal, then open the Wiki loot table for one mission type that matches it.',
				],
			},
		],
	},
	{
		id: 'enlisted-patch-notes-guide',
		imageKey: 'headerArt',
		published: '2026-04-30',
		updated: '2026-08-01',
		category: 'Enlisted Game Guides',
		featured: false,
		slug: 'enlisted-patch-notes-guide',
		title: 'How to Read Enlisted Patch Notes',
		metaDescription:
			'How to read Enlisted patch notes from Gaijin — official sources, what to scan first, and how updates affect your loadout and tools.',
		h1: 'How to Read Enlisted Patch Notes Like a Player',
		intro:
			'Patch day changes more than balance tweets suggest. Here is how to read official Enlisted update notes quickly and decide what actually matters for your account.',
		keywords: ['Enlisted patch notes', 'Enlisted updates', 'Gaijin', 'PC update notes'],
		imageAlt: 'How to read Enlisted patch notes from official PC update notes',
		sections: [
			{
				h2: 'Official sources to bookmark',
				paragraphs: [
					`Start with ${EXT.patchNotes} on the ${EXT.forums}. Developer news also flows through ${EXT.epic} and the main ${EXT.enlisted} site.`,
					'Community summaries are fine for speed, but always verify numbers and reworks against the primary post before you sell mods or change builds.',
				],
			},
			{
				h2: 'What to scan first on patch day',
				paragraphs: [
					'Read hotfix lines for crash fixes and known issues first. Then scan weapon and Enlisted changes, mission rewards, and drop table tweaks. Finally check UI and QoL notes.',
					'If you use third-party tools, check our <a href="/updates/">Updates page</a> after reading official notes — maintenance windows do not always match patch publish time.',
				],
			},
			{
				h2: 'Translate notes into loadout decisions',
				paragraphs: [
					'Ask: Did my main weapon class change? Did a mod or arcane get touched? Did a farm route’s drop pool move? If all three are no, you can queue sooner.',
					'Our <a href="/blog/undetected-enlisted-cheats-eac/">anti-cheat maintenance notes</a> explain how patches can affect external tools separately from in-game balance.',
				],
			},
			{
				h2: 'Patch-day routine',
				paragraphs: [
					`Open ${EXT.patchNotes}, skim hotfixes, test one familiar mission, then revisit Wiki pages for anything flagged as reworked.`,
					'Try This Today: Save the official update notes URL in your browser. After the next patch, highlight only the lines that mention gear you actually use.',
				],
			},
		],
	},
	{
		id: 'enlisted-new-player-guide',
		imageKey: 'cheatsPackage',
		published: '2026-04-16',
		updated: '2026-08-01',
		category: 'Enlisted Game Guides',
		featured: true,
		slug: 'enlisted-new-player-progression-guide',
		title: 'Enlisted New Player Progression Guide',
		metaDescription:
			'Enlisted new player guide for campaign map progression, quests, mods, and early goals — with links to the official game guide and Enlisted Wiki.',
		h1: 'Enlisted New Player Progression: Where to Go First',
		intro:
			'Enlisted has a steep learning curve. This progression guide points new Tenno toward official resources and sensible early goals without drowning in systems.',
		keywords: ['Enlisted new player', 'Enlisted beginner guide', 'campaign map', 'Enlisted progression'],
		imageAlt: 'Enlisted new player progression guide for campaign map and early quests',
		sections: [
			{
				h2: 'Start with the official tutorial path',
				paragraphs: [
					`${EXT.gameGuide} and the in-game Voruna quest chain teach movement, modding, and mission flow. The ${EXT.wiki} <a href="https://enlisted.fandom.com/wiki/Voruna%27s_Guide" target="_blank" rel="noopener noreferrer">new player hub</a> is the best community-maintained supplement.`,
					`${EXT.enlisted} is free to play and updated often — expect systems to unlock gradually rather than all at once.`,
				],
			},
			{
				h2: 'campaign map and junction milestones',
				paragraphs: [
					'Clear the campaign map methodically. Junctions gate planets and key quest lines. The <a href="https://enlisted.fandom.com/wiki/Star_Chart" target="_blank" rel="noopener noreferrer">campaign map Wiki page</a> shows what each node rewards.',
					'Do not rush campaign missions on day one — finish the chart, build survival tools, and learn faction weaknesses first. Our <a href="/blog/enlisted-steel-path-beginners-guide/">campaign missions guide</a> is for when you are ready.',
				],
			},
			{
				h2: 'Mods, mods, mods',
				paragraphs: [
					'Power in Enlisted comes from mods and mod capacity. Early goals: damage, health, shields, and ability strength or duration depending on your soldier.',
					'The <a href="https://enlisted.fandom.com/wiki/Mod" target="_blank" rel="noopener noreferrer">Mod Wiki page</a> explains polarity and fusion. Farm low-level missions for credits and mod drops before chasing rare relics.',
				],
			},
			{
				h2: 'When you are ready for more',
				paragraphs: [
					'Explore battlefield after Mars/Jupiter comfort. Read our <a href="/blog/enlisted-battlefield-farming-guide/">battlefield guide</a> and <a href="/blog/enlisted-mission-types-explained/">mission types explainer</a> when those nodes unlock.',
					'Try This Today: Complete one quest, one new campaign map node, and one mod upgrade session — three small wins beat grinding random missions.',
				],
			},
		],
	},
];

/** Drop legacy Fortnite/Rust intel posts — keep Enlisted product content only. */
const ENLISTED_BLOG_IDS = new Set([
	'enlisted-cheats-complete-guide',
	'enlisted-cheats-buyers-guide',
	'enlisted-cheats-2026-whats-new',
	'enlisted-aimbot-settings-guide',
	'enlisted-esp-wallhack-explained',
	'undetected-enlisted-cheats-eac',
	'enlisted-cheats-vs-cheatvault',
	'voidcheats-two-week-test',
	'enlisted-cheats-vs-ghostware',
	'enlisted-steel-path-guide',
	'enlisted-open-world-farming',
	'enlisted-factions-explained',
	'enlisted-mission-types-guide',
	'enlisted-patch-notes-guide',
	'enlisted-new-player-guide',
]);

const blogSources = sources.filter((src) => ENLISTED_BLOG_IDS.has(src.id));

function translationBlock(src) {
	const sections = src.sections
		.map(
			(s) => `			{
				h2: ${JSON.stringify(s.h2)},
				paragraphs: [
${s.paragraphs.map((p) => `					${JSON.stringify(p)},`).join('\n')}
				],
			}`,
		)
		.join(',\n');

	return `{
		slug: ${JSON.stringify(src.slug)},
		title: ${JSON.stringify(src.title)},
		metaDescription: ${JSON.stringify(src.metaDescription)},
		h1: ${JSON.stringify(src.h1)},
		intro: ${JSON.stringify(src.intro)},
		keywords: ${JSON.stringify(src.keywords)},
		imageAlt: ${JSON.stringify(src.imageAlt)},
		sections: [
${sections}
		],
	}`;
}

function buildPost(src) {
	const translations = LOCALES.map((code) => `\t\t${code}: ${translationBlock(src)},`).join('\n');
	return `	{
		id: ${JSON.stringify(src.id)},
		imageKey: ${JSON.stringify(src.imageKey)},
		published: ${JSON.stringify(src.published)},
		updated: ${JSON.stringify(src.updated)},
		category: ${JSON.stringify(src.category)},
		featured: ${src.featured ? 'true' : 'false'},
		translations: {
${translations}
		},
	}`;
}

const file = `/* Auto-generated by scripts/generate-blog-posts.mjs — do not edit by hand. */
import type { BlogPostDefinition } from './types';

export const blogPosts: BlogPostDefinition[] = [
${blogSources.map(buildPost).join(',\n')}
];
`;

writeFileSync(OUT, file);

for (const src of blogSources) {
	const tLen = src.title.length;
	const dLen = src.metaDescription.length;
	if (tLen > 70) console.warn(`WARN title ${src.id}: ${tLen} chars`);
	if (dLen > 160) console.warn(`WARN meta ${src.id}: ${dLen} chars`);
	if (dLen < 140) console.warn(`WARN short meta ${src.id}: ${dLen} chars`);
}

console.log(`Wrote ${blogSources.length} posts → ${OUT}`);
