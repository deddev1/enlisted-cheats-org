#!/usr/bin/env node
/**
 * Generates src/data/guides/posts.generated.ts — one dedicated article per external URL.
 * Run: node scripts/generate-external-guides.mjs
 */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildManifest } from './external-guides-manifest.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'src', 'data', 'guides', 'posts.generated.ts');

/** @typedef {{ genre: string, hook: string, coreLoop: string, beginnerTip: string, midgameTip: string, advancedTip: string, metaNote: string, communityAngle: string }} GameProfile */

/** @type {Record<string, GameProfile>} */
const GAME_PROFILES = {
	'deadside': {
		genre: 'hardcore post-apocalyptic survival shooter',
		hook: 'loot routes, weapon condition, and faction tension across abandoned towns',
		coreLoop: 'scavenge military outposts, manage hunger and bleeding, and extract before rival squads collapse your run',
		beginnerTip: 'Start on low-population servers and learn one town layout until you can navigate it without a map.',
		midgameTip: 'Pair a reliable mid-range rifle with a suppressed sidearm so you can disengage quietly when a third party rotates in.',
		advancedTip: 'Track helicopter event timers — the best gear spikes when air drops land, but so does player traffic.',
		metaNote: 'Armor penetration and medical supplies matter more than raw DPS in most mid-range fights.',
		communityAngle: 'Solo players thrive on patience; duos and trios win by splitting loot roles and holding separate angles.',
	},
	'arc-raiders': {
		genre: 'cooperative extraction shooter set on a ruined Earth',
		hook: 'ARC machine patrols, shared risk, and high-value tech extractions',
		coreLoop: 'drop in with your squad, complete objectives under machine pressure, and extract before reinforcements overrun your position',
		beginnerTip: 'Learn one supply route per map and practice silent movement before chasing rare loot.',
		midgameTip: 'Designate a carrier for heavy loot and a scout who reads patrol audio cues — rotation wins more fights than aim alone.',
		advancedTip: 'Chain short extractions during peak machine activity windows when other players are distracted.',
		metaNote: 'Sound discipline separates successful extractions from total wipes.',
		communityAngle: 'Pinging threats and sharing ammo types keeps squads alive longer than individual hero plays.',
	},
	'genshin-impact': {
		genre: 'open-world action RPG with elemental combat',
		hook: 'elemental reactions, resin economy, and rotating banner planning',
		coreLoop: 'explore regions, build teams around reaction chains, and progress story and spiral abyss challenges',
		beginnerTip: 'Level one main DPS and one support first instead of spreading resources across every character.',
		midgameTip: 'Build around two-element reactions — Vaporize and Melt scale harder than raw stat stacking early on.',
		advancedTip: 'Plan resin around weekly boss materials and talent books so you never stall a core character mid-ascension.',
		metaNote: 'Energy recharge thresholds matter as much as crit ratios for burst-focused teams.',
		communityAngle: 'Co-op domains are faster when one player runs crowd control and another focuses on shield breaking.',
	},
	'dead-by-daylight': {
		genre: 'asymmetric 4v1 horror multiplayer',
		hook: 'generator pacing, chase mind games, and perk synergy',
		coreLoop: 'survivors repair generators and escape while the killer applies map pressure and shuts down saves',
		beginnerTip: 'Learn safe loop structures on one map before expanding your survivor roster.',
		midgameTip: 'Mix regression perks with information perks so you can both rush gens and read killer rotations.',
		advancedTip: 'Track hook state and teammate exhaustion — overcommitting to a dead hook loses more games than letting one go.',
		metaNote: 'Chase time is a resource; killers win by forcing inefficient rescues.',
		communityAngle: 'SWF groups coordinate gen spread and distraction timing; solo queue rewards flexible perk builds.',
	},
	'escape-from-tarkov': {
		genre: 'hardcore extraction FPS',
		hook: 'ammo types, armor classes, and raid economy',
		coreLoop: 'gear up, raid for loot and quests, and extract before losing your kit to a single mistake',
		beginnerTip: 'Run offline mode to learn extracts and common spawn angles before risking expensive kits.',
		midgameTip: 'Memorize ammo penetration values — the right round beats a more expensive gun with the wrong ammo.',
		advancedTip: 'Time raids around quest hotspots and boss spawns, but rotate routes when server traffic spikes.',
		metaNote: 'Sound, stance, and inertia control win more fights than flick aim in CQB.',
		communityAngle: 'Duos with clear callouts and shared loot rules survive longer than loosely grouped trios.',
	},
	'unturned': {
		genre: 'free-to-play zombie survival sandbox',
		hook: 'base locations, horde nights, and PvP server rules',
		coreLoop: 'loot towns, fortify a base, and survive zombie waves while watching for player raids',
		beginnerTip: 'Pick a base near water and a military spawn, but not directly on a main road.',
		midgameTip: 'Farm construction materials early — metal upgrades before your first horde night saves hours of rebuilding.',
		advancedTip: 'Learn each map\'s vehicle routes; mobility wins more fights than camping a single rooftop.',
		metaNote: 'Server rulesets change the meta — PvE hubs reward farming while PvP hubs reward fast rotations.',
		communityAngle: 'Groups split roles: builder, looter, and scout. Solo players should play stealth until geared.',
	},
	'war-thunder': {
		genre: 'combined arms vehicular combat',
		hook: 'lineup BR brackets, armor weak spots, and economy grind',
		coreLoop: 'research vehicles, build lineups for battle rating brackets, and fight in air, ground, and naval battles',
		beginnerTip: 'Stay at low BR until you understand penetration angles and spotting mechanics.',
		midgameTip: 'Build lineups with complementary roles — a scout, a brawler, and an SPAA option per bracket.',
		advancedTip: 'Study thermal and radar signatures; positioning beats raw penetration in top-tier matches.',
		metaNote: 'Spawn point selection and cap pressure often decide matches more than individual kill counts.',
		communityAngle: 'Squad squads coordinate SPAA coverage and air cover for ground pushes.',
	},
	'fortnite': {
		genre: 'building battle royale',
		hook: 'piece control, loadout rarities, and storm surge decisions',
		coreLoop: 'drop, loot, build in fights, and survive rotating zones until endgame',
		beginnerTip: 'Practice 90s and box fighting in creative before chasing ranked points.',
		midgameTip: 'Carry heals and mobility — third-party timing matters more than winning every early duel.',
		advancedTip: 'Track surge thresholds in stacked lobbies and rotate early when kill pace is high.',
		metaNote: 'Piece control and edit timing define mid-game fights more than raw shotgun accuracy.',
		communityAngle: 'Trios win with defined IGL, fragger, and support roles during rotations.',
	},
	'marathon': {
		genre: 'PvPvE extraction shooter from Bungie',
		hook: 'runner builds, contract routes, and high-risk extractions',
		coreLoop: 'select a runner, complete contracts on hostile maps, and extract with valuable gear',
		beginnerTip: 'Learn one map\'s extraction timers and patrol routes before chasing rare contracts.',
		midgameTip: 'Balance mobility and sustain — overcommitting to damage perks leaves you vulnerable during extractions.',
		advancedTip: 'Read server activity by listening for distant firefights before pushing contested zones.',
		metaNote: 'Contract chaining pays off when you plan extractions between objective clusters.',
		communityAngle: 'Squads assign loot carrier and overwatch roles to survive last-minute pushes.',
	},
	'battlefield': {
		genre: 'large-scale combined arms warfare',
		hook: 'sector control, vehicle pushes, and squad specialization',
		coreLoop: 'capture sectors, support teammates with class gadgets, and win through map control',
		beginnerTip: 'Play support or engineer first to learn spawn flow and resupply timing.',
		midgameTip: 'Run anti-vehicle loadouts when enemy armor dominates a sector — one engineer can stall a push.',
		advancedTip: 'Coordinate smoke and revives during final sector flips; ticket bleed wins tight matches.',
		metaNote: 'Map knowledge beats K/D in most Conquest and Breakthrough scenarios.',
		communityAngle: 'Full squads with a dedicated medic and recon spotter flip sectors faster than solo heroes.',
	},
	'league-of-legends': {
		genre: 'team-based MOBA',
		hook: 'lane pressure, objective timers, and teamfight positioning',
		coreLoop: 'farm lanes, secure dragons and barons, and destroy the enemy nexus through coordinated fights',
		beginnerTip: 'One-trick a simple champion until you understand wave management and vision basics.',
		midgameTip: 'Track jungle camps and objective timers — showing up first wins more skirmishes than raw mechanics.',
		advancedTip: 'Convert leads with structured sieges instead of chasing kills into fog.',
		metaNote: 'Vision control around river and Baron pit defines late-game win conditions.',
		communityAngle: 'Voice comms for teleport timings and flank angles separate coordinated teams from solo queue chaos.',
	},
	'call-of-duty-warzone': {
		genre: 'battle royale within the Call of Duty universe',
		hook: 'loadout metas, buy stations, and endgame zone positioning',
		coreLoop: 'loot, complete contracts, buy loadouts, and survive shrinking zones in squad play',
		beginnerTip: 'Use pre-made loadouts with forgiving recoil before experimenting with ultra-aggressive builds.',
		midgameTip: 'Hold high ground near buy stations during mid-game rotations — third parties punish low ground.',
		advancedTip: 'Track gas movement and self-revive inventory during final circles; placement beats ego challs.',
		metaNote: 'TTK and movement tech shift each season — verify patch notes before ranked sessions.',
		communityAngle: 'Trios with clear roles — IGL, sniper overwatch, and entry — convert leads consistently.',
	},
	'valorant': {
		genre: 'tactical 5v5 hero shooter',
		hook: 'agent utility, economy rounds, and site executes',
		coreLoop: 'win gun rounds and eco rounds through ability combos and post-plant control',
		beginnerTip: 'Learn two agents deeply — one initiator and one duelist — before expanding your pool.',
		midgameTip: 'Default slow on attack to gather info, then commit once you identify weak site anchors.',
		advancedTip: 'Track enemy ultimate economy and force fights before their win condition comes online.',
		metaNote: 'Crosshair placement and ability timing beat raw flick speed on most ranked ladders.',
		communityAngle: 'Five-stack comms with standardized callouts win more rounds than individual fragging.',
	},
	'gray-zone-warfare': {
		genre: 'open-world tactical extraction FPS',
		hook: 'realistic ballistics, long rotations, and faction missions',
		coreLoop: 'patrol open zones, complete tasks, manage stamina and injuries, and extract safely',
		beginnerTip: 'Run lighter kits until you understand stamina drain and medical systems.',
		midgameTip: 'Use drones and optics to scout before crossing open fields — visibility is punishing.',
		advancedTip: 'Plan extractions around weather and time of day; lighting changes engagement ranges.',
		metaNote: 'Ammo type and armor class interactions mirror hardcore sim expectations.',
		communityAngle: 'Fireteams with designated medic and overwatch survive multi-squad contact.',
	},
	'overwatch-2': {
		genre: 'hero team shooter',
		hook: 'role synergy, ultimate combos, and objective time',
		coreLoop: 'push payloads or hold points using tank, damage, and support ability chains',
		beginnerTip: 'Learn one hero per role so you can flex when team comps are unbalanced.',
		midgameTip: 'Track enemy ultimates and play around cooldown windows instead of constant brawling.',
		advancedTip: 'Win fights off cooldowns — force engagements when your combo is online and theirs is not.',
		metaNote: 'Objective time often decides close matches more than kill differential.',
		communityAngle: 'Stacks with shot-calling and ult tracking climb faster than solo queue fraggers.',
	},
	'the-isle': {
		genre: 'dinosaur survival sandbox',
		hook: 'growth stages, ecosystem balance, and pack hunting',
		coreLoop: 'spawn as a dinosaur, hunt or graze to grow, and survive apex predators and rival packs',
		beginnerTip: 'Start with hardy herbivores or mid-tier carnivores until you learn nesting and water sources.',
		midgameTip: 'Respect growth timers — overextending for one kill can reset hours of progress.',
		advancedTip: 'Learn map hotspots and migration paths; ambush beats chase for most carnivore builds.',
		metaNote: 'Server rules and modded dinosaurs change balance — read server descriptions before committing.',
		communityAngle: 'Packs coordinate calls and flank angles; solo apex play rewards patience and territory control.',
	},
	'dayz': {
		genre: 'hardcore open-world survival',
		hook: 'infection risk, base raids, and coastal vs inland routes',
		coreLoop: 'loot towns, manage health and hunger, avoid infected and players, and establish a stash',
		beginnerTip: 'Move inland quickly — coast spawns are crowded and low on reliable gear.',
		midgameTip: 'Carry blood bags, saline, and cooking supplies; medical failures end runs silently.',
		advancedTip: 'Study player traffic patterns around military bases and helicopter crashes.',
		metaNote: 'Sound carries far — slow movement wins more engagements than sprinting into towns.',
		communityAngle: 'Groups assign looting and overwatch roles; betrayals are part of the meta on some servers.',
	},
	'rust': {
		genre: 'harsh survival sandbox with base raids',
		hook: 'wipe cycles, electricity, and raid timing',
		coreLoop: 'farm resources, build a base, research blueprints, and raid or defend during wipe cycles',
		beginnerTip: 'Hide small starter bases off the beaten path until you have kits and blueprints.',
		midgameTip: 'Invest in airlocks and compound design before stacking loot — offline raids punish greed.',
		advancedTip: 'Time raids around server pop dips and enemy offline windows, but expect counter raids.',
		metaNote: 'Sound traps and electricity setups separate serious bases from weekend projects.',
		communityAngle: 'Clans rotate online coverage and raid teams; solo players thrive on guerrilla hits.',
	},
	'palworld': {
		genre: 'creature-collection survival crafting',
		hook: 'Pal team roles, base automation, and tower challenges',
		coreLoop: 'capture Pals, automate your base, explore dungeons, and progress technology tiers',
		beginnerTip: 'Capture Pals with useful work skills early — base automation accelerates everything else.',
		midgameTip: 'Balance combat Pals with base workers; starving your industry slows weapon upgrades.',
		advancedTip: 'Prepare elemental counters before tower bosses — damage types matter more than raw level.',
		metaNote: 'Breeding and passives create long-term power spikes beyond simple leveling.',
		communityAngle: 'Co-op bases split gathering, crafting, and boss prep across players.',
	},
	'rainbow-six-siege': {
		genre: 'tactical 5v5 breaching shooter',
		hook: 'operator gadgets, map knowledge, and round economy',
		coreLoop: 'attack or defend bomb sites using destruction, drones, and coordinated utility',
		beginnerTip: 'Learn one attacker and one defender on a single map before expanding your roster.',
		midgameTip: 'Drone every site before committing — information saves more rounds than entry fragging.',
		advancedTip: 'Track operator picks and rotate counter-strats mid-match when the enemy repeats patterns.',
		metaNote: 'Vertical play and reinforcement habits define ranked success on most maps.',
		communityAngle: 'Five-stacks with standardized strats and callouts convert rounds off intel.',
	},
	'hunt-showdown': {
		genre: 'bounty hunting PvPvE shooter',
		hook: 'boss clues, dark sight, and extraction ambushes',
		coreLoop: 'track clues, banish bosses, collect bounties, and extract while watching for rival hunters',
		beginnerTip: 'Bring sound traps and dark sight tools — audio is your primary information layer.',
		midgameTip: 'Push clues when you hear distant boss fights; third-party timing wins many bounties.',
		advancedTip: 'Extract through less popular gates when gunfire clusters on the opposite side of the map.',
		metaNote: 'Ammo types and penetration matter for boss weak points and player armor.',
		communityAngle: 'Duos with one scout and one boss DPS convert clues faster than solo hunters.',
	},
	'destiny-2': {
		genre: 'looter shooter MMO',
		hook: 'buildcrafting, power level, and endgame activities',
		coreLoop: 'complete strikes and raids, chase god rolls, and optimize builds for PvE and PvP',
		beginnerTip: 'Follow the seasonal power chase before grinding perfect stat rolls.',
		midgameTip: 'Build around one damage subtype per activity — surge mods multiply damage more than raw stats.',
		advancedTip: 'Learn raid mechanics first; DPS checks are easier when mechanics are automatic.',
		metaNote: 'Ability uptime and orb generation often beat raw weapon DPS in endgame PvE.',
		communityAngle: 'Fireteams coordinate well mods and super cycles for flawless runs.',
	},
	'squad': {
		genre: 'large-scale military teamwork shooter',
		hook: 'squad leadership, rally points, and combined arms',
		coreLoop: 'communicate with your squad, capture objectives, and support armor and logi chains',
		beginnerTip: 'Play rifleman or medic first to learn rally mechanics and stamina management.',
		midgameTip: 'Stay within voice range of your squad lead — lone wolves die without rally support.',
		advancedTip: 'Coordinate armor, logi, and infantry pushes; ticket bleed rewards organized teams.',
		metaNote: 'Map reading and FOB placement win matches more than individual K/D.',
		communityAngle: 'Full squads with dedicated SL and medic revive chains dominate public servers.',
	},
	'once-human': {
		genre: 'post-apocalyptic survival with anomaly zones',
		hook: 'deviation builds, territory control, and seasonal content',
		coreLoop: 'explore zones, craft gear, capture territories, and progress seasonal story arcs',
		beginnerTip: 'Complete tutorial territories before pushing high-level anomaly zones.',
		midgameTip: 'Balance weapon and deviation loadouts — status effects scale into late game.',
		advancedTip: 'Plan territory defenses around resource nodes your guild actually needs.',
		metaNote: 'Seasonal modifiers shift viable builds — read patch notes before investing materials.',
		communityAngle: 'Guilds split gathering, crafting, and PvP defense during territory wars.',
	},
	'marvel-rivals': {
		genre: 'hero team shooter',
		hook: 'team-up abilities, role balance, and objective fights',
		coreLoop: 'select heroes, combo ultimates, and win objective-based rounds',
		beginnerTip: 'Learn one tank, one DPS, and one support so you can fill any team gap.',
		midgameTip: 'Trigger team-up abilities during objective contests, not during staggered respawns.',
		advancedTip: 'Track enemy ultimate economy and play defensively when multiple ults are available.',
		metaNote: 'Objective time and respawn stagger win close matches on most maps.',
		communityAngle: 'Stacks with ult tracking and peel rotations climb faster than solo fraggers.',
	},
	'mecha-break': {
		genre: 'mech-based competitive shooter',
		hook: 'mech loadouts, reload timers, and arena positioning',
		coreLoop: 'pilot distinct mechs, use abilities on cooldown cycles, and control objective zones',
		beginnerTip: 'Master one balanced mech before experimenting with high-skill ceiling frames.',
		midgameTip: 'Play around shield and dash cooldowns — overextending without mobility tools is punished.',
		advancedTip: 'Bait enemy cooldowns with poke damage, then commit when their escape tools are down.',
		metaNote: 'Map verticality changes which mech archetypes control each zone.',
		communityAngle: 'Trios coordinate focus fire and peel during objective contests.',
	},
	'caliber': {
		genre: 'tactical third-person squad shooter',
		hook: 'operator classes, gadget synergies, and PvE/PvP modes',
		coreLoop: 'build squads with complementary gadgets and win tactical encounters',
		beginnerTip: 'Run a balanced squad with medic and recon before chasing damage-only comps.',
		midgameTip: 'Use smoke and recon gadgets to isolate targets instead of wide-open brawls.',
		advancedTip: 'Adapt operator picks to map layout — tight maps favor CQB specialists.',
		metaNote: 'Gadget timing matters more than raw aim in most coordinated matches.',
		communityAngle: 'Premade squads with voice comms convert rounds through gadget chains.',
	},
	'call-of-duty': {
		genre: 'fast-paced military FPS franchise',
		hook: 'multiplayer loadouts, movement tech, and seasonal metas',
		coreLoop: 'build loadouts, progress camos, and win matches across TDM, Domination, and ranked modes',
		beginnerTip: 'Use low-recoil weapons until movement and map knowledge are automatic.',
		midgameTip: 'Adjust attachments per map — long lanes favor range builds, CQC maps favor handling.',
		advancedTip: 'Pre-aim common angles and use spawn knowledge to control mid-map fights.',
		metaNote: 'Seasonal balance patches shift TTK — verify patch notes before ranked play.',
		communityAngle: 'Squads with UAV and smoke coordination win objective modes consistently.',
	},
	'bodycam': {
		genre: 'realistic body-worn camera FPS',
		hook: 'immersive gunplay, limited HUD, and tense CQB',
		coreLoop: 'clear rooms, manage recoil and stamina, and win tactical firefights',
		beginnerTip: 'Move slowly and pre-clear angles — sprinting gets punished quickly.',
		midgameTip: 'Use flashlights and door angles to control sightlines in dark interiors.',
		advancedTip: 'Slice pie around corners and avoid hard-committing without teammate cover.',
		metaNote: 'Audio and lighting are core mechanics, not cosmetic details.',
		communityAngle: 'Duos with breach and cover roles clear buildings safer than solo pushes.',
	},
	'arena-breakout-infinite': {
		genre: 'tactical extraction shooter',
		hook: 'loot value, armor classes, and raid routing',
		coreLoop: 'enter raids, loot high-value items, complete contracts, and extract before ambushes',
		beginnerTip: 'Run budget kits until you memorize extracts and high-traffic zones.',
		midgameTip: 'Learn ammo and armor interactions — penetration values decide most fights.',
		advancedTip: 'Rotate away from gunfire audio; third parties dominate contested extractions.',
		metaNote: 'Sound discipline and slow clears beat rushing for loot.',
		communityAngle: 'Duos with overwatch and carrier roles survive late extractions more often.',
	},
	'arma-reforger': {
		genre: 'Cold War era military sandbox',
		hook: 'combined arms, GM tools, and large-scale conflicts',
		coreLoop: 'fight in infantry and vehicle battles across dynamic campaigns and modded scenarios',
		beginnerTip: 'Join public infantry squads before attempting pilot or armor roles.',
		midgameTip: 'Learn radio protocols and map grids — communication wins more than solo flanks.',
		advancedTip: 'Coordinate logistics and armor pushes with command; ticket bleed rewards structure.',
		metaNote: 'Ballistics and stamina modeling punish run-and-gun playstyles.',
		communityAngle: 'Organized units with SL, medic, and AT specialists dominate public conflicts.',
	},
	'backrooms': {
		genre: 'liminal horror exploration',
		hook: 'navigation anxiety, entity avoidance, and co-op survival',
		coreLoop: 'explore procedurally familiar spaces, manage resources, and escape entities',
		beginnerTip: 'Mark routes mentally and avoid panic sprinting — noise attracts threats.',
		midgameTip: 'Share items in co-op and stay within visual range to avoid separation events.',
		advancedTip: 'Learn entity audio cues and safe-room patterns on your most-played levels.',
		metaNote: 'Calm movement and light management beat rushing for exits.',
		communityAngle: 'Co-op groups assign a navigator and a rear guard to reduce wander risk.',
	},
	'sand': {
		genre: 'open-world PvPvE sandship survival',
		hook: 'sandship builds, trampler hunts, and expedition routing',
		coreLoop: 'upgrade your sandship, explore ruins, fight tramplers, and extract valuable scrap',
		beginnerTip: 'Invest in ship storage and repair kits before chasing high-tier ruins.',
		midgameTip: 'Scout trampler patterns from range — premature pushes waste repair resources.',
		advancedTip: 'Time expeditions around storm cycles and rival crew traffic.',
		metaNote: 'Crew roles — pilot, gunner, scout — define successful PvPvE runs.',
		communityAngle: 'Full crews coordinate repairs mid-fight and split loot by role priority.',
	},
	'the-finals': {
		genre: 'destructible arena team shooter',
		hook: 'cashout modes, destruction gadgets, and mobility tools',
		coreLoop: 'bank objectives, use destruction to reshape arenas, and outplay rival teams',
		beginnerTip: 'Learn one light, medium, and heavy build to flex with team needs.',
		midgameTip: 'Destroy cover during cashout phases to expose campers and secure transfers.',
		advancedTip: 'Track enemy gadget cooldowns — windows open when demolition tools are offline.',
		metaNote: 'Vertical mobility and rebuild tools define mid-round control.',
		communityAngle: 'Trios with demolition and scout gadgets convert cashouts under pressure.',
	},
	'the-front': {
		genre: 'post-apocalyptic open-world survival',
		hook: 'base raids, tech tiers, and faction warfare',
		coreLoop: 'gather resources, research tech, build bases, and raid or defend territories',
		beginnerTip: 'Establish a hidden stash base before building a main compound.',
		midgameTip: 'Progress electricity and turrets before hoarding loot — raids come fast.',
		advancedTip: 'Scout enemy bases during pop dips and bring demolition tools for weak walls.',
		metaNote: 'Server wipe schedules dictate whether to rush or farm — read rules first.',
		communityAngle: 'Clans rotate online defense and raid squads across time zones.',
	},
	'lost-ark': {
		genre: 'action MMORPG',
		hook: 'raid mechanics, honing, and horizontal progression',
		coreLoop: 'level characters, hone gear, clear raids and guardians, and chase collectibles',
		beginnerTip: 'Follow the story to max level before diving into advanced honing.',
		midgameTip: 'Learn raid mechanics in practice modes — mechanics gate progression harder than DPS.',
		advancedTip: 'Manage gold income and honing materials weekly to avoid bottleneck stalls.',
		metaNote: 'Support classes and consumables multiply raid success more than raw item level alone.',
		communityAngle: 'Guilds schedule raid nights with dedicated supports and coaches for new players.',
	},
	'naraka-bladepoint': {
		genre: 'melee-focused battle royale',
		hook: 'parry timing, hero abilities, and armor durability',
		coreLoop: 'loot weapons, win melee duels, and survive shrinking zones in solo or squad modes',
		beginnerTip: 'Practice parry and dodge timing in training before ranked queues.',
		midgameTip: 'Manage armor durability — disengage to repair instead of forcing low-health fights.',
		advancedTip: 'Track enemy cooldowns and ultimate abilities before committing to duels.',
		metaNote: 'Movement tech and grapple routes define rotation speed more than raw sprint.',
		communityAngle: 'Trios coordinate focus targets and peel during final zone fights.',
	},
	'minecraft': {
		genre: 'sandbox survival and creativity',
		hook: 'biome routing, redstone, and mob farms',
		coreLoop: 'gather resources, craft tools, explore dimensions, and build bases or farms',
		beginnerTip: 'Establish food and shelter before nightfall on day one.',
		midgameTip: 'Build iron and fuel farms before chasing endgame gear — automation saves time.',
		advancedTip: 'Prepare potions, beds, and blocks for Nether and End travel to reduce risk.',
		metaNote: 'Biome choice affects early game pacing — villages accelerate progression.',
		communityAngle: 'Servers split builders, explorers, and redstone engineers for mega projects.',
	},
	'path-of-exile': {
		genre: 'dark fantasy action RPG',
		hook: 'skill gems, resistances, and league mechanics',
		coreLoop: 'level through acts, craft gear, map farm, and defeat endgame bosses',
		beginnerTip: 'Follow a league starter build guide instead of improvising passive trees.',
		midgameTip: 'Cap resistances and fix life pools before chasing damage multipliers.',
		advancedTip: 'Learn map modifiers and juice strategies once your build clears comfortably.',
		metaNote: 'Defense layers — block, spell suppression, armor — matter as much as DPS.',
		communityAngle: 'Trade leagues reward economy knowledge; group play speeds boss carries.',
	},
	'warframe': {
		genre: 'sci-fi action looter shooter',
		hook: 'modding, void fissures, and steel path',
		coreLoop: 'complete missions, collect mods and parts, craft warframes, and scale into endgame',
		beginnerTip: 'Clear the star chart and unlock operators before chasing prime farming.',
		midgameTip: 'Build ability strength or range based on your frame role — hybrid builds often underperform.',
		advancedTip: 'Farm relics efficiently in groups and target vaulted primes during events.',
		metaNote: 'Ability uptime and enemy strip mechanics define steel path viability.',
		communityAngle: 'Squads assign crowd control and damage roles for fissure and arbitration runs.',
	},
	'raft': {
		genre: 'ocean survival crafting',
		hook: 'raft expansion, story islands, and shark management',
		coreLoop: 'expand your raft, gather debris, explore story islands, and craft advanced tools',
		beginnerTip: 'Prioritize water purifiers and cooking stations before decorative builds.',
		midgameTip: 'Stock fuel and weapons before long story island trips — leaving prep costs hours.',
		advancedTip: 'Coordinate island roles: one gathers, one fights wildlife, one solves puzzles.',
		metaNote: 'Shark bait timing and anchor placement prevent costly raft damage.',
		communityAngle: 'Co-op crews split gathering and combat during island expeditions.',
	},
	'sea-of-thieves': {
		genre: 'pirate adventure sandbox',
		hook: 'ship roles, voyages, and PvP naval combat',
		coreLoop: 'crew a ship, complete voyages, fight skeletons and players, and turn in loot',
		beginnerTip: 'Assign clear ship roles — helm, sails, repairs — before leaving port.',
		midgameTip: 'Keep bananas, cannonballs, and planks stocked; resource droughts lose fights.',
		advancedTip: 'Listen for rival galleons and tuck at outposts before selling high-value loot.',
		metaNote: 'Wind, anchor turns, and cannon angles matter more than individual sword skill.',
		communityAngle: 'Full crews with comms win naval fights through coordinated broadsides.',
	},
	'delta-force': {
		genre: 'modern military tactical shooter',
		hook: 'large-scale warfare, operator kits, and extraction modes',
		coreLoop: 'fight in combined arms battles and high-stakes extraction scenarios',
		beginnerTip: 'Learn one operator kit and one map before switching loadouts constantly.',
		midgameTip: 'Use drones and recon gadgets to scout before crossing open ground.',
		advancedTip: 'Coordinate armor and infantry pushes during objective phases.',
		metaNote: 'Ballistics and suppression mechanics reward disciplined fireteams.',
		communityAngle: 'Squads with medics and anti-armor specialists control sectors longer.',
	},
};

const CLOSING_TEMPLATES = [
	'For more game updates, guides, and related resources, you can also explore {link}.',
	'If you want deeper game updates, walkthroughs, and related resources, you can also explore {link}.',
	'When you are ready for more game information and community guides, you can also explore {link}.',
	'For additional perspectives on updates, builds, and related resources, you can also explore {link}.',
];

const FOCUS_ANGLES = [
	'early-game fundamentals',
	'mid-game optimization',
	'endgame efficiency',
	'PvP awareness',
	'co-op coordination',
	'economy and crafting',
	'map knowledge',
	'loadout planning',
];

/**
 * @param {string} str
 */
function hashString(str) {
	let h = 0;
	for (let i = 0; i < str.length; i++) {
		h = (h * 31 + str.charCodeAt(i)) >>> 0;
	}
	return h;
}

/**
 * @param {import('./external-guides-manifest.mjs').GuideManifestEntry} entry
 * @param {number} index
 */
function buildArticle(entry, index) {
	const profile = GAME_PROFILES[entry.gameId];
	if (!profile) throw new Error(`Missing game profile: ${entry.gameId}`);

	const seed = hashString(entry.url);
	const angle = FOCUS_ANGLES[seed % FOCUS_ANGLES.length];
	const closingTemplate = CLOSING_TEMPLATES[seed % CLOSING_TEMPLATES.length];
	const externalLink = `<a href="${entry.url}" target="_blank" rel="noopener noreferrer">${entry.anchorText}</a>`;
	const closing = closingTemplate.replace('{link}', externalLink);

	const published = `2026-${String((index % 12) + 1).padStart(2, '0')}-${String((index % 27) + 1).padStart(2, '0')}`;
	const updated = published;

	const title = `${entry.gameName} Guide: ${angle.replace(/\b\w/g, (c) => c.toUpperCase())} & Core Gameplay`;
	const h1 = `${entry.gameName} gameplay guide`;
	const metaDescription = `A practical ${entry.gameName} guide covering ${profile.hook}, with tips for ${angle}, progression, and smarter in-game decisions.`;
	const intro = `${entry.gameName} is a ${profile.genre} built around ${profile.hook}. Whether you are learning the basics or refining your ${angle}, this guide breaks down how the core loop works and where most players lose momentum.`;

	const sections = [
		{
			h2: `Understanding the ${entry.gameName} core loop`,
			paragraphs: [
				`At its heart, ${entry.gameName} rewards players who respect the core loop: ${profile.coreLoop}. Matches unfold quickly when you understand these rhythms, and painfully when you treat every engagement the same.`,
				`New players often chase highlight plays before they understand ${angle}. Slow down, learn one reliable strategy, and let muscle memory build around map flow and resource timing.`,
				profile.communityAngle,
			],
		},
		{
			h2: 'Beginner foundations that actually stick',
			paragraphs: [
				profile.beginnerTip,
				`Focus on ${angle} during your first sessions instead of copying streamer builds. ${entry.gameName} punishes rushed decisions — especially when you have not learned safe rotations, healing windows, or extraction timing.`,
				`Keep notes after each session: what killed you, what loot you skipped, and where traffic felt heavy. Patterns emerge fast once you review mistakes instead of queueing instantly.`,
			],
		},
		{
			h2: 'Mid-game habits that separate average from consistent',
			paragraphs: [
				profile.midgameTip,
				`Mid-game is where ${entry.gameName} players either stabilize or stall. Invest in repeatable habits: check your inventory before pushing, communicate intent with teammates, and rotate before you are forced to.`,
				profile.metaNote,
			],
		},
		{
			h2: 'Advanced decisions under pressure',
			paragraphs: [
				profile.advancedTip,
				`High-skill play in ${entry.gameName} is mostly decision-making. The best players win fights they choose, disengage fights they did not initiate, and extract before greed flips a winning run.`,
				`Review ${angle} after tough losses. Was the mistake positioning, timing, or resource management? Fixing one layer per week compounds faster than chasing new gear alone.`,
			],
		},
		{
			h2: 'Staying current with updates and meta shifts',
			paragraphs: [
				`${entry.gameName} evolves with balance patches, seasonal events, and community discoveries. Re-test your loadouts after major updates instead of assuming last month’s strategies still dominate.`,
				`Follow official patch notes and trusted community breakdowns, then validate changes in low-stakes matches before taking new builds into ranked or high-loot zones.`,
				closing,
			],
		},
	];

	return {
		id: entry.slug,
		slug: entry.slug,
		gameId: entry.gameId,
		gameName: entry.gameName,
		externalUrl: entry.url,
		anchorText: entry.anchorText,
		published,
		updated,
		title,
		metaDescription,
		h1,
		intro,
		keywords: [entry.gameName, `${entry.gameName} guide`, angle, profile.genre, 'gameplay tips'],
		sections,
	};
}

function serialize(value, indent = '\t') {
	if (typeof value === 'string') {
		return JSON.stringify(value);
	}
	if (Array.isArray(value)) {
		if (value.length === 0) return '[]';
		return `[\n${value.map((v) => `${indent}\t${serialize(v, indent + '\t')}`).join(',\n')}\n${indent}]`;
	}
	if (value && typeof value === 'object') {
		const entries = Object.entries(value);
		return `{\n${entries.map(([k, v]) => `${indent}\t${k}: ${serialize(v, indent + '\t')}`).join(',\n')}\n${indent}}`;
	}
	return String(value);
}

const manifest = buildManifest();
const articles = manifest.map((entry, index) => buildArticle(entry, index));

const ts = `// AUTO-GENERATED by scripts/generate-external-guides.mjs — do not edit by hand.
import type { ExternalGuidePost } from './types';

export const externalGuidePosts: ExternalGuidePost[] = ${serialize(articles)};
`;

writeFileSync(OUT, ts, 'utf8');
console.log(`Generated ${articles.length} external guide posts → ${OUT}`);
