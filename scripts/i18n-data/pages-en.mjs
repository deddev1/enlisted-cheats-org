import { HERO_IMAGES, clampTitle, clampDesc, section, stripZadeyoFromMeta, EXT } from './constants.mjs';

/** Richest English page content — source of truth for structure. */
export const enPages = {
	home: {
		title: 'Enlisted Cheats 2026 | ESP, Aimbot & Hacks for PC',
		description:
			'Enlisted cheats for Windows PC — ESP, aimbot, wallhack & radar. $35/mo or $150 lifetime. Setup guides, patch updates & buyer reviews.',
		h1: 'Enlisted Cheats',
		intro:
			'A focused Windows PC package for Enlisted: Enemy ESP, aimbot controls, and wallhack overlays with Gaijin anti-cheat maintenance after major patches.',
		imageAlt: 'Enlisted Cheats hero banner with WWII soldiers in cinematic battlefield combat',
		galleryTitle: 'Enlisted Cheats visuals',
		ctaPrimary: 'Buy Enlisted Cheats',
		ctaSecondary: 'See all features',
		ctaSecondaryHref: '/features/',
		sections: [
			section(
				'Built for campaign missions pressure',
				'Enlisted punishes incomplete information. Enlisted Cheats puts ESP, wallhack, and aimbot in one license so you can read co-op missions, flank pushes, and team pushes before you commit.',
				`Client and anti-cheat updates come from ${EXT.epic} and ${EXT.eac}. When a patch needs a rebuild, we post status on the <a href="/updates/">Updates page</a> — no permanent “undetected forever” promises.`,
				'Monthly ($35) and lifetime ($150) licenses ship digitally after payment confirmation, with maintenance rebuilds when anti-cheat or game updates require them.',
				'Compare the <a href="/enlisted-cheats/">Enlisted Cheats guide</a>, <a href="/enlisted-esp/">ESP</a>, <a href="/enlisted-aimbot/">Aimbot</a>, and <a href="/enlisted-cheats/">undetected status</a> pages before checkout.',
			),
			section(
				'One license, clear controls',
				'Instead of stacking separate tools, you get Enemy ESP, medkit markers, radar cues, and aimbot profiles in a single package aimed at battlefield and campaign missions.',
				'Details live on the <a href="/enlisted-esp/">ESP</a>, <a href="/enlisted-aimbot/">Aimbot</a>, <a href="/enlisted-wallhack/">wallhack</a>, and <a href="/features/">features</a> pages — or jump to <a href="/pricing/">Pricing</a> for plans.',
				`On patch mornings, check ${EXT.status}, then confirm our maintenance notes so you are not loading an outdated build.`,
				'Ready? Open <a href="/pricing/">Pricing</a>, follow <a href="/setup/">Setup</a> after delivery, and keep <a href="/faq/">FAQ</a> / <a href="/support/">Support</a> handy.',
			),
		],
	},
	'enlisted-esp': {
		title: 'Enlisted ESP 2026 | Wallhack & Enemy Boxes for PC',
		description:
			'Enlisted cheats ESP wallhack — enemy boxes, health bars, loot markers & distance readouts. Bundled with aimbot & radar in one license.',
		h1: 'Enlisted ESP — Wallhack & Enemy Boxes',
		intro:
			'Visibility tools for Enlisted. Read enemy units, lockers, resource caches, and pickups, and distance before you commit to a fight — with toggleable ESP wallhack overlays for large-scale battles and campaign missions.',
		imageAlt: 'Enlisted ESP overlay with enemy outline boxes, health bars, and distance readouts',
		galleryTitle: 'Enlisted ESP overlay visuals',
		ctaPrimary: 'Buy Enlisted Cheats',
		ctaSecondary: 'Enlisted wallhack guide',
		ctaSecondaryHref: '/enlisted-wallhack/',
		sections: [
			section(
				'What Enlisted ESP solves in campaign missions',
				'Enlisted missions punish incomplete information. Enlisted Cheats ESP wallhack helps you spot enemy units early, spot tanks and artillery before they push your position, and mark lockers and caches worth the detour.',
				'On campaign missions, co-op missions, and campaign missions, that visibility gap is often the difference between a clean flanking and a wiped squad. ESP ships bundled with radar overlays and Aimbot in one license.',
				`Enlisted live updates and tileset changes are published by ${EXT.epic}. When tileset areas or loot rules shift, ESP categories stay useful because they track enemies and containers — not a single static landmark.`,
			),
			section(
				'Enemy, tank or artillery unit, and squad ESP wallhack categories',
				'Toggle enemy unit outlines, tank or artillery unit threat cues, pickup awareness markers, and loot or chest pins so only mission-critical ESP wallhack overlays stay active during rotations.',
				'Distance readouts and snapline options help you control engagement range. Team and enemy colour coding supports co-op missions and co-op squads alike.',
				'Compare category detail on the <a href="/enlisted-wallhack/">wallhack page</a> and pair visibility with the <a href="/enlisted-radar/">radar hack</a> for flanks outside your FOV.',
				[
					'enemy unit ESP outlines with distance',
					'pickups and lockers markers for faster rotations',
					'tank or artillery unit and pickup threat cues',
					'Toggleable categories to reduce overlay noise',
				],
			),
			section(
				'Undetected ESP with anti-cheat maintenance',
				'Enlisted Cheats ESP wallhack is maintained for Enlisted with rebuilds after Gaijin anti-cheat patches. Check the <a href="/updates/">Updates page</a> before you queue — no cheat guarantees permanent undetected status.',
				`Read ${EXT.eac} for how anti-cheat updates ship, then cross-check our <a href="/enlisted-cheats/">anti-cheat maintenance maintenance guide</a> after major patches.`,
				'Checkout includes instant digital delivery for Windows 10 and 11. After purchase, follow the <a href="/setup/">Setup guide</a> and tune overlays before your first mission session.',
			),
			section(
				'ESP next steps — Aimbot, pricing, and support',
				'ESP alone wins information wars; Aimbot covers the firefight. Review <a href="/enlisted-aimbot/">Aimbot controls</a> if you want one license for visibility and assist.',
				'Compare monthly ($35) and lifetime ($150) on <a href="/pricing/">Pricing</a>, then keep <a href="/support/">Support</a> ready if activation needs a human reply.',
				'Still researching? The <a href="/enlisted-cheats/">best Enlisted cheats guide</a> and <a href="/enlisted-cheats/">2026 buyer guide</a> summarize the full stack.',
			),
		],
	},
	'enlisted-aimbot': {
		title: 'Enlisted Aimbot 2026 | Soft Aim for PC & Controller',
		description:
			'Enlisted cheats aimbot with FOV, smoothing & weak-point targeting. Per-weapon profiles for rifles, shotguns & snipers on Windows PC.',
		h1: 'Enlisted Aimbot — Soft Aim for PC & Controller',
		intro:
			'Configurable Aimbot tools for Enlisted firefights. Smoothness, FOV, bone priority, and per-weapon profiles — bundled with ESP wallhack and radar in one undetected license.',
		imageAlt: 'Enlisted cheats cheat menu with soft aim, FOV slider, and bone priority settings',
		galleryTitle: 'Enlisted Aimbot combat previews',
		ctaPrimary: 'Buy Enlisted Cheats',
		ctaSecondary: 'See ESP wallhack',
		ctaSecondaryHref: '/enlisted-esp/',
		sections: [
			section(
				'Aimbot tuned for Enlisted combat pace',
				'Enlisted mixes long-range rifle fights with close-quarters shotgun pushes. Enlisted Cheats Aimbot includes smoothness, FOV, and sensitivity controls tuned for that pace — with hotkey toggles mid-mission.',
				'Bone priority and target selection options cover closest enemy, lowest health, or highest-threat targets during squad fights and defense sectors and squad assault modifiers.',
				`Weapon balance and season rules change via ${EXT.rust}. Revisit Aimbot FOV and smoothness after major combat patches so assist still matches the live TTK windows.`,
			),
			section(
				'Per-weapon Aimbot profiles',
				'Save separate Aimbot profiles for rifles, SMGs, and sniper rifles. Switch between long-range rifle beams and close-quarters room clears without reopening menus every spawn.',
				'Prefer softer tracking? Read the <a href="/enlisted-aimbot/">soft aim guide</a>. Want the search term most players use? See <a href="/enlisted-aimbot/">aimbot hack</a>.',
				'Aimbot ships alongside <a href="/enlisted-esp/">ESP wallhack</a> and <a href="/enlisted-radar/">2D radar</a> in the same Enlisted Cheats license.',
				[
					'Smoothness, FOV, and sensitivity sliders',
					'Bone priority and threat-based targeting',
					'Hotkeys to toggle Aimbot mid-mission',
					'Per-weapon profile slots for rifle/ shotgun / sniper',
				],
			),
			section(
				'anti-cheat maintenance for undetected Aimbot',
				'Enlisted Cheats rebuilds Aimbot behavior when Gaijin anti-cheat or major Enlisted patches land. Maintenance notes appear on the <a href="/updates/">Updates page</a> so you know when a new build is live.',
				`Cross-check service health on ${EXT.status} and anti-cheat context on ${EXT.eac}, then follow our <a href="/enlisted-cheats/">anti-cheat maintenance guide</a> before queueing on patch day.`,
				'Responsible settings matter — undetected status requires ongoing maintenance, not set-and-forget configs. Start with conservative smoothness, then tune.',
			),
			section(
				'Buy Aimbot with ESP — pricing and setup',
				'Every plan includes Aimbot plus ESP and radar. Compare options on <a href="/pricing/">Pricing</a>, then activate with the <a href="/setup/">Setup guide</a>.',
				'Questions about delivery or profiles? Use <a href="/faq/">FAQ</a> or email <a href="/support/">Support</a> with your order ID.',
				'Want the full control list first? Open <a href="/features/">Features</a> before checkout.',
			),
		],
	},
	features: {
		title: 'Enlisted Cheats Features | ESP, Aimbot & Radar',
		description:
			'Full Enlisted cheats feature list — ESP, soft aim, radar, hotkeys & controller support. Review every toggle before checkout.',
		h1: 'Enlisted Cheats Features — Full Control List',
		intro:
			'Every ESP wallhack, radar hack, and Aimbot control included in the Enlisted Cheats package for Enlisted on Windows PC — with anti-cheat maintenance after major patches.',
		imageAlt: 'Enlisted ESP overlay with hero boxes and health bars',
		galleryTitle: 'Enlisted Cheats feature gallery',
		ctaPrimary: 'Buy Enlisted Cheats',
		ctaSecondary: 'View pricing',
		ctaSecondaryHref: '/pricing/',
		sections: [
			section(
				'ESP wallhack and visibility features',
				'enemy unit ESP wallhack, tank or artillery unit and pickup threat cues, pickups and lockers markers, distance readouts, snaplines, and toggleable ESP categories for mission-critical overlays only.',
				'Team and enemy colour coding supports co-op missions and campaign missions. Deep-dive the <a href="/enlisted-esp/">ESP page</a> and <a href="/enlisted-wallhack/">wallhack guide</a> for category-level detail.',
				`Map and loot systems evolve with ${EXT.epic} season updates — toggleable ESP categories keep overlays useful when tileset areas rotate.`,
			),
			section(
				'Radar hack and Aimbot controls',
				'2D radar overlay with directional threat cues, configurable range for rotations and final circles, plus Aimbot smoothness, FOV, bone priority, hotkeys, and per-weapon profiles.',
				'All tools share in-client toggles so you can adjust ESP, radar, and Aimbot during live Enlisted sessions. See <a href="/enlisted-radar/">radar</a> and <a href="/enlisted-aimbot/">Aimbot</a> for settings walkthroughs.',
				'Prefer a menu-first workflow? The <a href="/features/">mod menu page</a> explains mid-mission toggles without alt-tabbing.',
			),
			section(
				'Licensing, delivery, and anti-cheat maintenance',
				'Monthly ($35) and lifetime ($150) licenses with instant digital delivery. anti-cheat maintenance rebuilds publish on the <a href="/updates/">Updates page</a> after anti-cheat or game patches.',
				`Monitor ${EXT.status} on patch days, then confirm rebuild notes before you queue. Setup and billing help lives on <a href="/support/">Support</a> and support@enlistedcheats.org.`,
				'Next step: compare plans on <a href="/pricing/">Pricing</a> or read <a href="/enlisted-cheats/">how undetected maintenance works</a>.',
			),
		],
	},
	pricing: {
		title: 'Buy Enlisted Cheats | $35/mo or $150 Lifetime',
		description:
			'Buy Enlisted cheats — $35/month or $150 lifetime. ESP, aimbot & wallhack included. Instant digital delivery on Windows PC.',
		h1: 'Enlisted Cheats Pricing — Monthly & Lifetime',
		intro:
			'Choose monthly or lifetime access to undetected Enlisted Cheats — ESP wallhack, radar hack, and Aimbot for Enlisted on Windows PC. Instant digital delivery after payment.',
		imageAlt: 'Enlisted wallhack ESP showing enemy units and enemy vehicles through objective corners',
		galleryTitle: 'Enlisted Cheats package visuals',
		ctaPrimary: 'Buy Enlisted Cheats',
		ctaSecondary: 'Read setup guide',
		ctaSecondaryHref: '/setup/',
		sections: [
			section(
				'Monthly and lifetime Enlisted Cheats plans',
				'Monthly license: $35 USD for 30 days of full ESP wallhack, radar hack, and Aimbot access with anti-cheat maintenance included during your term.',
				'Lifetime license: $150 USD for long-term access to the same undetected Enlisted Cheats package — ideal if you play Enlisted regularly across seasons.',
				'Both plans unlock the same feature stack described on <a href="/features/">Features</a>. Choose monthly to test, or lifetime if you already know you want the full toolkit.',
			),
			section(
				'What every plan includes',
				'enemy ESP wallhack, medkit markers, 2D radar overlays, Aimbot controls, in-client toggles, and maintenance rebuilds after Gaijin anti-cheat or major Enlisted patches.',
				`update calendars and client updates come from ${EXT.rust}. Active licenses receive rebuild access when we publish maintenance on <a href="/updates/">Updates</a>.`,
				'Digital delivery starts after payment confirmation. Keep your order reference for <a href="/support/">Support</a> requests and follow <a href="/setup/">Setup</a> for first launch.',
			),
			section(
				'Refund, billing, and buying checklist',
				'Review the <a href="/refund-policy/">Refund Policy</a> before purchase. For billing or delivery issues, contact Support with your order details.',
				'Prices are listed in USD. Availability is worldwide for Windows 10 and 11 PCs.',
				'Still comparing tools? Read <a href="/enlisted-cheats/">best Enlisted cheats</a>, <a href="/enlisted-cheats/">undetected status</a>, and <a href="/faq/">FAQ</a> before you checkout.',
			),
		],
	},
	setup: {
		title: 'Enlisted Cheats Setup | Install Guide for Windows PC',
		description:
			'Install Enlisted cheats on Windows 10/11. Activate your license, tune ESP & aimbot profiles, check patch status before queueing.',
		h1: 'Enlisted Cheats Setup — PC & Controller Guide',
		intro:
			'Install and configure Enlisted Cheats for Enlisted on Windows 10 or 11. Activate your license, load ESP wallhack and Aimbot profiles, and verify anti-cheat maintenance status before queueing.',
		imageAlt: 'Enlisted aimbot hitbox lock on enemy unit during campaign squad fight',
		galleryTitle: 'Enlisted Cheats setup visuals',
		ctaPrimary: 'Buy Enlisted Cheats',
		ctaSecondary: 'Contact support',
		ctaSecondaryHref: '/support/',
		sections: [
			section(
				'Before you install Enlisted Cheats',
				'Confirm your order email and license details. Check the <a href="/updates/">Updates page</a> for the latest anti-cheat maintenance build before launching Enlisted.',
				`Also glance at ${EXT.status} if Enlisted servers look unstable on patch day — a platform outage is not a license fault.`,
				'Enlisted Cheats requires Windows 10 or 11. Close conflicting overlay software that may interfere with ESP wallhack or Aimbot toggles.',
			),
			section(
				'Activate ESP wallhack and Aimbot profiles',
				'Follow the delivery instructions in your license email. Load default ESP wallhack categories for enemies, pickups, and lockers — then tune radar range and Aimbot smoothness to your playstyle.',
				'Use in-client hotkeys to toggle ESP, radar, and Aimbot mid-mission. Details for each module live on <a href="/enlisted-esp/">ESP</a>, <a href="/enlisted-aimbot/">Aimbot</a>, and <a href="/features/">mod menu</a>.',
				'Prefer a soft tracking feel? Start with the <a href="/enlisted-aimbot/">soft aim</a> recommendations before raising aggressiveness.',
			),
			section(
				'After Enlisted or Gaijin anti-cheat patches',
				'When Gaijin ships a major Enlisted update or Gaijin anti-cheat patch, revisit Updates before queueing. Download maintenance rebuilds when posted.',
				`Official anti-cheat background: ${EXT.eac}. Our practical workflow is documented on the <a href="/enlisted-cheats/">anti-cheat maintenance page</a> and <a href="/enlisted-cheats/">undetected guide</a>.`,
				'Contact <a href="/support/">Support</a> with your order ID if activation fails after a patch — include Windows version and error details for faster replies.',
			),
		],
	},
	updates: {
		title: 'Enlisted Cheats Updates | Patch & Status Log',
		description:
			'Enlisted cheats update log — check build status after game patches. Maintenance notes for ESP, aimbot & radar rebuilds.',
		h1: 'Enlisted Cheats Updates — Maintenance Log',
		intro:
			'Track anti-cheat maintenance and Enlisted patch rebuilds for the undetected ESP wallhack, radar hack, and Aimbot package. Check here before queueing after major updates.',
		imageAlt: 'Enlisted wallhack ESP skeleton on enemy tank or artillery unit hero in campaign missions',
		galleryTitle: 'Enlisted patch and maintenance visuals',
		ctaPrimary: 'Buy Enlisted Cheats',
		ctaSecondary: 'Undetected status guide',
		ctaSecondaryHref: '/enlisted-cheats/',
		sections: [
			section(
				'Why the Updates page matters',
				'Enlisted and Gaijin anti-cheat receive frequent patches. Enlisted Cheats publishes maintenance notes when ESP wallhack, radar, or Aimbot behavior needs a rebuild.',
				`Use ${EXT.status} for Enlisted launcher health and this page for Enlisted Cheats build status — both matter on big update days.`,
				'Checking this log before you queue reduces surprises after game days or seasonal launches on campaign missions and co-op missions.',
			),
			section(
				'What maintenance entries cover',
				'Entries note Gaijin anti-cheat compatibility status, rebuilt ESP wallhack overlays, radar range fixes, Aimbot tuning after weapon balance changes, and digital delivery of new builds to active licenses.',
				'Lifetime and monthly subscribers receive rebuild access during active license terms. See <a href="/pricing/">Pricing</a> if you need to renew.',
				'For context on why rebuilds happen, read the <a href="/enlisted-cheats/">anti-cheat maintenance guide</a> and <a href="/enlisted-cheats/">undetected Enlisted cheats</a> explainer.',
			),
			section(
				'Staying undetected after patches',
				'No cheat guarantees permanent undetected status. Combine maintenance updates with responsible in-game settings and patch awareness.',
				`Follow patch notes from ${EXT.rust}, then confirm our rebuild is live before campaign missions.`,
				'For urgent status questions after an anti-cheat update, contact <a href="/support/">Support</a> with your license tier and last played build version.',
			),
		],
	},
	faq: {
		title: 'Enlisted Cheats FAQ | ESP, Aimbot & Safety',
		description:
			'Enlisted cheats FAQ — licensing, ESP, aimbot, controller support, patch-day status & pricing. Clear answers before you buy.',
		h1: 'Enlisted Cheats FAQ — Common Questions',
		intro:
			'Answers about undetected Enlisted Cheats — ESP wallhack, radar hack, Aimbot, anti-cheat maintenance, checkout, and Enlisted compatibility on Windows PC.',
		imageAlt: 'Enlisted radar hack 2D minimap overlay showing flank routes and enemy units and enemy vehicles',
		galleryTitle: 'Enlisted Cheats FAQ visuals',
		ctaPrimary: 'Buy Enlisted Cheats',
		ctaSecondary: 'Contact support',
		ctaSecondaryHref: '/support/',
		sections: [
			section(
				'What is Enlisted Cheats?',
				'Enlisted Cheats is an undetected cheat package for Enlisted on Windows PC. It includes ESP wallhack, 2D radar-style awareness, and Aimbot controls with anti-cheat maintenance updates.',
				'Packages cover campaign missions and co-op missions. Explore <a href="/features/">Features</a> for the full control list and <a href="/enlisted-esp/">ESP</a> / <a href="/enlisted-aimbot/">Aimbot</a> for module detail.',
				`Enlisted is developed and published by ${EXT.epic}. Cheats are third-party tools and may violate Gaijin' Terms of Service — use is at your own risk.`,
			),
			section(
				'Are Enlisted Cheats undetected in 2026?',
				'Enlisted Cheats is maintained with rebuilds after Gaijin anti-cheat and game patches. Check the <a href="/updates/">Updates page</a> for current status — no cheat can guarantee permanent undetected operation.',
				'Read <a href="/enlisted-cheats/">undetected Enlisted cheats</a> and the <a href="/enlisted-cheats/">anti-cheat guide</a> for the maintenance workflow.',
				'Responsible settings and reading maintenance notes before queueing are essential.',
			),
			section(
				'Delivery, pricing, and support',
				'Licenses deliver digitally after payment confirmation. Monthly is $35; lifetime is $150 USD — see <a href="/pricing/">Pricing</a>.',
				'Contact support@enlistedcheats.org or the <a href="/support/">Support page</a> with order details for setup or billing help. First launch steps are on <a href="/setup/">Setup</a>.',
				'Refund eligibility is covered in the <a href="/refund-policy/">Refund Policy</a>.',
			),
		],
	},
	support: {
		title: 'Enlisted Cheats Support | Contact & Help',
		description:
			'Contact Enlisted Cheats support for licenses, setup & billing. Email support@enlistedcheats.org with your order ID.',
		h1: 'Enlisted Cheats Support — Contact Us',
		intro:
			'Get help with Enlisted Cheats licenses, checkout, ESP wallhack setup, Aimbot profiles, and anti-cheat maintenance for Enlisted on Windows PC.',
		imageAlt: 'Enlisted cheats campaign missions objective fight with ESP boxes and aimbot active',
		galleryTitle: 'Enlisted Cheats support resources',
		ctaPrimary: 'Email support',
		ctaSecondary: 'Read setup guide',
		ctaSecondaryHref: '/setup/',
		sections: [
			section(
				'When to contact support',
				'Reach out for order issues, license activation failures, ESP wallhack or Aimbot setup questions, and post-patch problems after anti-cheat maintenance rebuilds.',
				'Include your order ID, license tier (monthly or lifetime), Windows version, and a clear description of the issue.',
				'Many answers already live in <a href="/faq/">FAQ</a>, <a href="/setup/">Setup</a>, and <a href="/updates/">Updates</a> — check those first for faster resolution.',
			),
			section(
				'Response times and scope',
				'Support requests are reviewed daily. Enlisted Cheats support covers delivery, billing, setup, and maintenance — not in-game coaching or account recovery for Gaijin bans.',
				`Account and game policy questions belong with ${EXT.epic}. We can help with license delivery and product configuration only.`,
				'Check the Updates page and FAQ before opening a ticket — many post-patch questions are answered there.',
			),
			section(
				'Self-service resources',
				'Setup guide, Features list, Updates log, Refund Policy, and Terms of Use are linked from the footer. anti-cheat maintenance notes live on the dedicated <a href="/enlisted-cheats/">Gaijin anti-cheat page</a>.',
				'Email: support@enlistedcheats.org',
				'Ready to purchase or renew? Open <a href="/pricing/">Pricing</a>. Need feature detail first? See <a href="/features/">Features</a>.',
			),
		],
	},
	undetected: {
		title: 'Undetected Enlisted Cheats 2026 | Anti-cheat safe',
		description:
			'Undetected Enlisted Cheats with anti-cheat maintenance for ESP boxes, soft aim, and cloud DMA on PC and controllers. Check status before you queue.',
		h1: 'Undetected Enlisted Cheats — Anti-cheat maintenance',
		intro:
			'How Enlisted Cheats stays maintained for Enlisted after Gaijin anti-cheat patches — ESP wallhack, radar hack, and Aimbot rebuilds for Windows PC.',
		imageAlt: 'Enlisted wallhack ESP skeleton boxes on enemy units and enemy vehicles through map geometry',
		galleryTitle: 'Undetected Enlisted Cheats visuals',
		ctaPrimary: 'Buy Enlisted Cheats',
		ctaSecondary: 'anti-cheat maintenance guide',
		ctaSecondaryHref: '/enlisted-cheats/',
		sections: [
			section(
				'What undetected means for Enlisted Cheats',
				'Undetected Enlisted Cheats means the package is actively maintained against Gaijin anti-cheat and major Enlisted patches — not that detection is impossible forever.',
				'Rebuilds target ESP wallhack overlays, radar behavior, and Aimbot signatures after Gaijin anti-cheat updates.',
				`Anti-cheat technology is documented by ${EXT.eac}; Enlisted client updates ship through ${EXT.epic}. Undetected status is an ongoing process tied to those releases.`,
			),
			section(
				'anti-cheat maintenance workflow',
				'When Gaijin anti-cheat or Enlisted updates ship, the team assesses ESP, radar, and Aimbot modules, publishes status on the <a href="/updates/">Updates page</a>, and delivers rebuilt builds to active licenses.',
				`On patch mornings, also check ${EXT.status} for Enlisted outages that can look like product failures.`,
				'Deep technical workflow: <a href="/enlisted-cheats/">anti-cheat maintenance Enlisted guide</a>. Feature stack: <a href="/features/">Features</a>.',
			),
			section(
				'Responsible use and next steps',
				'Combine maintenance with conservative in-game settings. Read the <a href="/faq/">FAQ</a> and Updates log regularly — undetected status is not a one-time promise.',
				'Lifetime and monthly plans include rebuild access during active terms — see <a href="/pricing/">Pricing</a>.',
				'New buyers should also read <a href="/enlisted-cheats/">Enlisted cheats 2026</a> and complete <a href="/setup/">Setup</a> after delivery.',
			),
		],
	},
	wallhack: {
		title: 'Enlisted Wallhack 2026 | ESP Boxes Through Terrain',
		description:
			'Enlisted wallhack ESP highlights Grineer, Corpus & Infested through cover. Toggle categories for campaign missions & battlefield.',
		h1: 'Enlisted Wallhack — ESP Boxes & Visibility',
		intro:
			'Enlisted wallhack ESP for Enlisted — see enemies, pickups, and lockers through toggleable wallhack overlays built for large-scale battles and campaign missions.',
		imageAlt: 'Enlisted wallhack ESP skeleton boxes on enemy unit hero in campaign missions',
		galleryTitle: 'Enlisted wallhack ESP gallery',
		ctaPrimary: 'Buy Enlisted Cheats',
		ctaSecondary: 'Enlisted ESP page',
		ctaSecondaryHref: '/enlisted-esp/',
		sections: [
			section(
				'Wallhack ESP vs raw aim tools',
				'A Enlisted wallhack focuses on information — enemy outlines, loot pins, tank or artillery unit threat cues — rather than automatic aiming. Enlisted Cheats bundles wallhack ESP with radar and optional Aimbot in one license.',
				'Toggle categories so only the wallhack overlays you need stay active during rotations and defense sectors.',
				'For the broader ESP keyword page see <a href="/enlisted-esp/">Enlisted ESP</a>; for combat assist see <a href="/enlisted-aimbot/">Aimbot</a>.',
			),
			section(
				'Map coverage for wallhack ESP',
				'Wallhack overlays support campaign missions, co-op missions, and campaign missions with distance readouts and snaplines for engagement control.',
				`tileset updates and tileset area changes are announced via ${EXT.rust}. Wallhack remains useful because it tracks entities, not fixed landmarks alone.`,
				'Pair wallhack awareness with <a href="/enlisted-radar/">radar hack</a> cues for flanks during building and rooftop fights.',
			),
			section(
				'Undetected wallhack maintenance',
				'ESP wallhack modules rebuild after Gaijin anti-cheat patches. Follow the <a href="/updates/">Updates page</a> and complete checkout for instant license delivery on Windows PC.',
				'Learn the full maintenance story on <a href="/enlisted-cheats/">undetected Enlisted cheats</a> and <a href="/enlisted-cheats/">anti-cheat maintenance</a>.',
				'Ready to buy? Compare <a href="/pricing/">Pricing</a> or continue to the <a href="/enlisted-esp/">ESP hack</a> landing for alternate search wording.',
			),
		],
	},
	radar: {
		title: 'Enlisted Radar Hack 2026 | 2D Minimap for Enlisted',
		description:
			'Enlisted radar hack shows off-screen enemies on a 2D minimap. Directional cues for defense, survival & squad play.',
		h1: 'Enlisted Radar Hack — 2D Threat Awareness',
		intro:
			'2D radar-style overlay for Enlisted — directional threat cues for nearby players outside your line of sight, bundled with ESP wallhack and Aimbot.',
		imageAlt: 'Enlisted ESP distance markers and hero health readouts in campaign missions',
		galleryTitle: 'Enlisted radar hack visuals',
		ctaPrimary: 'Buy Enlisted Cheats',
		ctaSecondary: 'See ESP wallhack',
		ctaSecondaryHref: '/enlisted-esp/',
		sections: [
			section(
				'Why radar hack matters in Enlisted',
				'Multi-floor tilesets stack vertical fights — catwalks, doorways, and side spawns. A 2D radar overlay shows nearby enemy threats outside direct line of sight so you can reposition before a flank wave.',
				'Enlisted Cheats radar complements <a href="/enlisted-esp/">ESP wallhack</a> markers during squad pushes and final-circle scrims.',
				`Mode rules and seasonal changes come from ${EXT.epic}. Radar range remains configurable when map scale or mobility meta shifts.`,
			),
			section(
				'Configurable radar range',
				'Adjust radar range for early rotations versus tight defense sectors. Directional cues highlight flanks during tileset clears and tank or artillery unit pushes across campaign missions and co-op missions.',
				'Toggle radar alongside ESP and Aimbot with in-client hotkeys during live missions — see the <a href="/features/">mod menu</a> page.',
				'Combat follow-up lives on <a href="/enlisted-aimbot/">Aimbot</a> when you convert radar info into a fight.',
			),
			section(
				'Maintenance and licensing',
				'Radar hack modules receive anti-cheat maintenance rebuilds with the full Enlisted Cheats package. Monthly and lifetime licenses include digital delivery — see <a href="/pricing/">Pricing</a>.',
				'Check <a href="/updates/">Updates</a> after major Enlisted patches before relying on previous radar configs.',
				'New to the stack? Start at <a href="/features/">Features</a> or <a href="/enlisted-cheats/">undetected status</a>.',
			),
		],
	},
	'eac-bypass': {
		title: 'Enlisted Anti-Cheat Maintenance | Patch Guide',
		description:
			'How Enlisted Cheats rebuild after Gaijin anti-cheat patches — ESP, aimbot & radar maintenance for PC. Read before queueing.',
		h1: 'Enlisted Anti-Cheat — Maintenance Guide',
		intro:
			'Understand Gaijin anti-cheat maintenance for Enlisted Cheats — how ESP wallhack, radar hack, and Aimbot rebuild after Enlisted security updates.',
		imageAlt: 'Enlisted undetected hacks status with ESP overlay on enemy units and enemy vehicles',
		galleryTitle: 'anti-cheat maintenance visuals',
		ctaPrimary: 'Buy Enlisted Cheats',
		ctaSecondary: 'Check updates',
		ctaSecondaryHref: '/updates/',
		sections: [
			section(
				'Gaijin anti-cheat overview',
				`Gaijin anti-cheat is Gaijin’ anti-cheat for Enlisted on PC (see ${EXT.eac}). Security updates can affect ESP wallhack, radar, and Aimbot behavior — requiring maintenance rebuilds for undetected packages.`,
				`Enlisted Cheats monitors anti-cheat patch notes and Enlisted seasonal updates from ${EXT.epic} to schedule module reviews.`,
				'“anti-cheat maintenance” in our wording means timely maintenance — not a permanent free pass around anti-cheat.',
			),
			section(
				'What happens after an anti-cheat patch',
				'The team tests ESP overlays, radar signatures, and Aimbot profiles against the new build, publishes status on <a href="/updates/">Updates</a>, and ships rebuilt packages to active licenses.',
				`Confirm Enlisted service health on ${EXT.status} if the launcher or matchmaking fails during the same window.`,
				'Avoid queueing on old builds after major patch days until maintenance notes confirm a new release. Related reading: <a href="/enlisted-cheats/">undetected Enlisted cheats</a>.',
			),
			section(
				'No permanent bypass guarantee',
				'anti-cheat maintenance in practice means timely maintenance. Read the undetected guide, <a href="/faq/">FAQ</a>, and Updates log before every session.',
				'Contact <a href="/support/">Support</a> if activation fails immediately after a posted rebuild.',
				'Buying for the first time? Compare <a href="/pricing/">Pricing</a> and finish <a href="/setup/">Setup</a> only after Updates shows a live build.',
			),
		],
	},
	'cheats-2026': {
		title: 'Enlisted Cheats 2026 | Hacks with ESP & Cloud DMA',
		description:
			'Best Enlisted cheats 2026: ESP boxes, soft aim, and cloud DMA for PC and controllers. Undetected Enlisted Cheats with anti-cheat maintenance — compare and buy.',
		h1: 'Enlisted Cheats 2026 — ESP, Soft Aim & Cloud DMA',
		intro:
			'The 2026 Enlisted Cheats package for Enlisted — undetected ESP wallhack, radar hack, and Aimbot with anti-cheat maintenance, instant delivery, and Windows PC support.',
		imageAlt: 'Enlisted cheats main menu with ESP wallhack and soft aim toggles on PC',
		galleryTitle: 'Enlisted Cheats 2026 gallery',
		ctaPrimary: 'Buy Enlisted Cheats',
		ctaSecondary: 'Compare features',
		ctaSecondaryHref: '/features/',
		sections: [
			section(
				'Why Enlisted Cheats leads in 2026',
				'2026 seasons bring new maps, weapons, and Gaijin anti-cheat updates. Enlisted Cheats bundles ESP wallhack, radar hack, and Aimbot with active maintenance — not a stale prior-year build.',
				`Track official official patch messaging on ${EXT.rust}, then use our <a href="/updates/">Updates log</a> for product rebuild timing.`,
				'Monthly ($35) and lifetime ($150) plans cover campaign missions and co-op missions loops — see <a href="/pricing/">Pricing</a>.',
			),
			section(
				'Full feature stack for 2026 buyers',
				'enemy ESP wallhack, medkit markers, 2D radar overlays, Aimbot profiles, in-client toggles, and post-patch rebuilds — one license instead of stacking separate tools.',
				'Deep links: <a href="/enlisted-cheats/">Enlisted Cheats pillar</a>, <a href="/enlisted-esp/">ESP</a>, <a href="/enlisted-aimbot/">Aimbot</a>, <a href="/enlisted-wallhack/">wallhack</a>, <a href="/enlisted-radar/">radar</a>, <a href="/enlisted-cheats/">undetected</a>.',
				'Instant digital delivery after checkout confirmation worldwide.',
			),
			section(
				'Before you buy in 2026',
				'Read the <a href="/enlisted-cheats/">Enlisted Cheats</a> pillar, Features, Pricing, Setup, and Updates pages. Check undetected status notes after every major patch — responsible use and maintenance awareness matter.',
				'Also compare the <a href="/enlisted-cheats/">best Enlisted cheats</a> checklist, <a href="/blog/enlisted-cheats-complete-guide-2026/">2026 complete guide</a>, and <a href="/faq/">FAQ</a>.',
				'Support is available at support@enlistedcheats.org via the <a href="/support/">Support page</a>.',
			),
		],
	},
	hacks: {
		title: 'Undetected Enlisted Cheats 2026 | PC Hacks Guide',
		description:
			'Undetected Enlisted cheats with ESP, aimbot & wallhack for PC. Maintenance after patches, pricing & setup — no permanent undetected promises.',
		h1: 'Enlisted Cheats & Hacks — ESP, Aimbot & Wallhack',
		intro:
			'Enlisted cheats and hacks for campaign missions, squad assaults, and large-scale battles combine ESP wallhack visibility, 2D radar threat cues, and aimbot controls in one Windows PC license — maintained after Gaijin anti-cheat patches. This is the pillar guide for Enlisted Cheats in 2026.',
		imageAlt: 'Enlisted cheats campaign missions objective fight with ESP boxes and aimbot active',
		galleryTitle: 'Enlisted Cheats gallery — ESP, Aimbot, wallhack',
		ctaPrimary: 'Buy Enlisted Cheats',
		ctaSecondary: 'See undetected guide',
		ctaSecondaryHref: '/enlisted-cheats/',
		sections: [
			section(
				'What Enlisted Cheats include in 2026',
				'Players searching for Enlisted Cheats usually want visibility and combat tools without stacking separate downloads. Enlisted Cheats bundles enemy ESP wallhack, medkit markers, 2D radar overlays, and configurable Aimbot in one maintained package — the same toolkit often called Enlisted cheats.',
				'Coverage spans campaign missions and co-op missions with in-client toggles for live missions. Monthly ($35) and lifetime ($150) licenses unlock the full stack.',
				`Official game updates come from ${EXT.epic}; our hacks package tracks those releases via the <a href="/updates/">Updates page</a>. Cross-check platform health on ${EXT.status} before patch-day queues.`,
			),
			section(
				'Enlisted Cheats vs Enlisted cheats — same stack, clear pages',
				'Searchers use Enlisted Cheats and Enlisted cheats interchangeably. This pillar focuses on hacks language; the <a href="/enlisted-cheats/">Enlisted cheats 2026</a> and <a href="/enlisted-cheats/">best Enlisted cheats</a> pages cover buyer comparisons in cheats wording.',
				'Deep-dive modules: <a href="/enlisted-esp/">Enlisted ESP</a>, <a href="/enlisted-aimbot/">Enlisted Aimbot</a>, <a href="/enlisted-wallhack/">wallhack</a>, <a href="/enlisted-radar/">radar hack</a>, and <a href="/enlisted-aimbot/">soft aim</a>.',
				'Blog guides expand each keyword: <a href="/blog/enlisted-cheats-complete-guide-2026/">hacks complete guide</a>, <a href="/blog/enlisted-cheats-buyers-guide/">cheats buyers guide</a>, and <a href="/blog/undetected-enlisted-cheats-eac/">undetected anti-cheat notes</a>.',
			),
			section(
				'Enlisted Cheats vs single-feature tools',
				'Standalone hacks often cover only wallhack or only aim assist. Enlisted Cheats maps the full mission loop: read enemy units, track lockers and resource caches, spot flanks on radar, and tune Aimbot per weapon class.',
				'Compare the <a href="/enlisted-esp/">ESP</a>, <a href="/enlisted-aimbot/">Aimbot</a>, and <a href="/features/">Features</a> pages — or review <a href="/pricing/">Pricing</a> for monthly and lifetime licenses.',
				'Related landings: <a href="/pricing/">cheat download</a>, <a href="/features/">mod menu</a>, <a href="/enlisted-aimbot/">aimbot hack</a>, <a href="/enlisted-esp/">ESP hack</a>.',
			),
			section(
				'Undetected Enlisted Cheats with anti-cheat maintenance',
				'Undetected Enlisted Cheats require rebuilds after Gaijin anti-cheat and major Enlisted patches. Check Updates before queueing — maintenance notes confirm when a new build is live. No package can promise permanent undetected status.',
				`See ${EXT.eac} for anti-cheat background and our <a href="/enlisted-cheats/">anti-cheat maintenance guide</a> for the practical workflow. Pair with <a href="/enlisted-cheats/">undetected Enlisted cheats</a> for status language buyers expect.`,
				'Digital delivery runs after checkout for Windows 10 and 11 PCs worldwide. After purchase, follow <a href="/setup/">Setup</a> and keep <a href="/support/">Support</a> ready with your order ID.',
			),
		],
	},
	'cheat-download': {
		title: 'Enlisted Hack Download 2026 | Instant Access',
		description:
			'Enlisted cheat download with instant license delivery — ESP boxes, soft aim, and cloud DMA for PC and controllers. Buy, activate, and play.',
		h1: 'Enlisted Hack Download — Instant License Delivery',
		intro:
			'How Enlisted cheat download works for Enlisted — digital license delivery after payment confirmation, with ESP wallhack, radar hack, and Aimbot access on Windows PC.',
		imageAlt: 'Enlisted wallhack ESP showing enemy units and enemy vehicles through objective corners',
		galleryTitle: 'Enlisted cheat download visuals',
		ctaPrimary: 'Buy Enlisted Cheats',
		ctaSecondary: 'Setup guide',
		ctaSecondaryHref: '/setup/',
		sections: [
			section(
				'How Enlisted cheat download delivery works',
				'After checkout confirms payment, Enlisted Cheats license details arrive digitally by email. No physical shipment — access begins once activation instructions are delivered.',
				'Keep your order confirmation and license email ready for the <a href="/setup/">Setup guide</a> and Support requests.',
				`If Enlisted servers are down, check ${EXT.status} before assuming a download failure.`,
			),
			section(
				'What your download unlocks',
				'Every Enlisted cheat download includes enemy ESP wallhack, pickups and lockers markers, 2D radar overlays, Aimbot profiles, and in-client toggles for large-scale battles and campaign missions.',
				'Monthly ($35) and lifetime ($150) plans share the same feature stack — compare options on the <a href="/pricing/">Pricing page</a>.',
				'Feature detail: <a href="/features/">Features</a>. Module pages: <a href="/enlisted-esp/">ESP</a>, <a href="/enlisted-aimbot/">Aimbot</a>.',
			),
			section(
				'After purchase — setup and updates',
				'Follow Setup to activate ESP wallhack and Aimbot on Windows 10 or 11. When Enlisted or Gaijin anti-cheat patches ship, check the <a href="/updates/">Updates page</a> for maintenance rebuilds.',
				'Contact <a href="/support/">Support</a> with your order ID if delivery or activation fails within 24 hours of purchase.',
				'Also read <a href="/enlisted-cheats/">undetected status</a> so you know what “download ready” means after a patch.',
			),
		],
	},
	'mod-menu': {
		title: 'Enlisted Mod Menu 2026 | ESP & Soft Aim Toggles',
		description:
			'Enlisted mod menu for in-match toggles — ESP boxes, soft aim, radar, and cloud DMA on PC and controllers. Undetected Enlisted Cheats package.',
		h1: 'Enlisted Mod Menu — In-Client Control Panel',
		intro:
			'Enlisted mod menu controls for Enlisted — toggle ESP wallhack categories, radar range, and Aimbot profiles mid-mission without leaving your soldier session on Windows PC.',
		imageAlt: 'Enlisted cheats mod menu with soft aim profiles and ESP toggles',
		galleryTitle: 'Enlisted mod menu gallery',
		ctaPrimary: 'Buy Enlisted Cheats',
		ctaSecondary: 'Full feature list',
		ctaSecondaryHref: '/features/',
		sections: [
			section(
				'What a Enlisted mod menu controls',
				'A Enlisted mod menu is the in-client panel where you enable ESP wallhack overlays, adjust radar range, and switch Aimbot profiles during live missions. Enlisted Cheats keeps those toggles accessible with hotkeys.',
				'Toggle enemy outlines, medkit markers, tank or artillery unit cues, and per-weapon Aimbot settings without alt-tabbing out of Enlisted.',
				'Control deep-dives: <a href="/enlisted-esp/">ESP</a>, <a href="/enlisted-aimbot/">Aimbot</a>, <a href="/enlisted-radar/">radar</a>.',
			),
			section(
				'Mod menu categories for large-scale battles and campaign missions',
				'Separate ESP wallhack categories for players, pickups, lockers, and caches let you reduce overlay noise during rotations and defense sectors.',
				'Radar hack range and Aimbot smoothness adjust from the same mod menu — useful when Enlisted balance patches change fight distances and mobility.',
				'Soft tracking players should start with <a href="/enlisted-aimbot/">soft aim</a> profiles before aggressive FOV.',
			),
			section(
				'Maintained mod menu after anti-cheat patches',
				'Enlisted mod menu behavior is rebuilt when Gaijin anti-cheat or major Enlisted updates land. Follow the <a href="/updates/">Updates page</a> and <a href="/enlisted-cheats/">anti-cheat maintenance guide</a> before queueing on patch days.',
				'Checkout with instant digital delivery for monthly and lifetime licenses — see <a href="/pricing/">Pricing</a>.',
				'Need install steps? Open <a href="/setup/">Setup</a> after your license email arrives.',
			),
		],
	},
	'soft-aim': {
		title: 'Enlisted Soft Aim 2026 | Smooth Aimbot Settings',
		description:
			'Enlisted aimbot settings for natural tracking on PC and controllers. Smoothness, FOV, and bone priority — included in our Enlisted Cheats with ESP boxes.',
		h1: 'Enlisted Soft Aim — Smooth Aimbot Controls',
		intro:
			'Enlisted aimbot settings for Enlisted — configurable Aimbot smoothness, FOV, bone priority, and hotkey toggles bundled with ESP wallhack and radar in one undetected license.',
		imageAlt: 'Enlisted aimbot ESP boxes and FOV circle on enemy units and enemy vehicles in large-scale battles',
		galleryTitle: 'Enlisted aimbot gallery',
		ctaPrimary: 'Buy Enlisted Cheats',
		ctaSecondary: 'Aimbot controls',
		ctaSecondaryHref: '/enlisted-aimbot/',
		sections: [
			section(
				'What Enlisted aimbot means',
				'Enlisted aimbot refers to Aimbot behavior tuned for smooth, natural-looking tracking rather than instant snap. Enlisted Cheats exposes smoothness, FOV, and sensitivity sliders so you control how assist feels in missions firefights.',
				'Bone priority and target selection cover closest enemy, lowest health, or highest-threat targets during squad fights.',
				'Full Aimbot documentation: <a href="/enlisted-aimbot/">Enlisted Aimbot</a>. Alternate wording: <a href="/enlisted-aimbot/">aimbot hack</a>.',
			),
			section(
				'Soft aim profiles per weapon class',
				'Save separate soft aim profiles for rifles, SMGs, and sniper rifles. Switch between long-range rifle beams and close-quarters room clears with hotkeys mid-mission.',
				`Weapon TTKs shift with ${EXT.rust} balance patches — retune smoothness after major combat updates.`,
				'Soft aim ships alongside <a href="/enlisted-esp/">ESP wallhack</a> and <a href="/enlisted-radar/">2D radar</a> overlays.',
			),
			section(
				'Undetected soft aim with anti-cheat maintenance',
				'Aimbot modules rebuild after Gaijin anti-cheat patches. Check the <a href="/updates/">Updates page</a> before queueing — responsible settings and maintenance awareness matter for undetected play.',
				'Monthly and lifetime licenses checkout with digital delivery on Windows PC — <a href="/pricing/">Pricing</a>.',
				'Activation help: <a href="/setup/">Setup</a> · status questions: <a href="/support/">Support</a>.',
			),
		],
	},
	'best-cheats': {
		title: 'Best Enlisted Cheats 2026 | Buyer Guide',
		description:
			'Best Enlisted Cheats for 2026: ESP boxes, soft aim, cloud DMA, and anti-cheat maintenance on PC and controllers. Use this checklist before checkout.',
		h1: 'Best Enlisted Cheats — 2026 Buyer Guide',
		intro:
			'Compare the best Enlisted cheats for Enlisted in 2026 — undetected ESP wallhack, radar hack, and Aimbot in one maintained package with Gaijin anti-cheat rebuilds and instant delivery.',
		imageAlt: 'Enlisted wallhack ESP showing enemy units and enemy vehicles through objective corners',
		galleryTitle: 'Best Enlisted cheats gallery',
		ctaPrimary: 'Buy Enlisted Cheats',
		ctaSecondary: 'Compare pricing',
		ctaSecondaryHref: '/pricing/',
		sections: [
			section(
				'What makes the best Enlisted cheats in 2026',
				'The best Enlisted cheats combine active anti-cheat maintenance, a full ESP wallhack and radar stack, configurable Aimbot, and clear update communication — not a stale build from a prior season.',
				'Enlisted Cheats covers campaign missions and co-op missions with in-client toggles and post-patch rebuilds.',
				`Verify the live game is healthy via ${EXT.status}, then confirm our <a href="/updates/">Updates</a> note before you judge any package “best.”`,
			),
			section(
				'Best Enlisted cheats feature checklist',
				'Look for enemy ESP wallhack, medkit markers, 2D radar overlays, Aimbot profiles, hotkey toggles, and documented maintenance after Enlisted patches.',
				'Review <a href="/features/">Features</a>, <a href="/enlisted-cheats/">undetected status</a>, and <a href="/enlisted-cheats/">Enlisted cheats 2026</a> before checkout — monthly ($35) and lifetime ($150) plans available.',
				'Module pages worth opening: <a href="/enlisted-esp/">ESP</a>, <a href="/enlisted-aimbot/">Aimbot</a>, <a href="/enlisted-cheats/">hacks</a>.',
			),
			section(
				'Buying the best Enlisted cheats safely',
				'Purchase through secure checkout for instant digital delivery. Read Setup, FAQ, and Updates pages before your first queue — and contact Support with order details if activation needs help.',
				'No cheat guarantees permanent undetected status — combine maintenance with responsible in-game settings.',
				`Remember: using cheats can violate Gaijin terms. Proceed only if you accept that risk.`,
			),
		],
	},
	'aimbot-hack': {
		title: 'Enlisted Aimbot Hack 2026 | Soft Aim Assist',
		description:
			'Enlisted aimbot hack with soft aim for PC and controllers. FOV, bone priority, and hotkeys — bundled with ESP boxes in our Enlisted Cheats package.',
		h1: 'Enlisted Aimbot Hack — Soft Aim Assist',
		intro:
			'Enlisted aimbot hack tools for Enlisted — smoothness, FOV, bone priority, per-weapon profiles, and hotkey toggles bundled with ESP wallhack and radar in one undetected license.',
		imageAlt: 'Enlisted aimbot hack menu with silent aim and bone priority toggles',
		galleryTitle: 'Enlisted aimbot hack gallery',
		ctaPrimary: 'Buy Enlisted Cheats',
		ctaSecondary: 'Aimbot settings',
		ctaSecondaryHref: '/enlisted-aimbot/',
		sections: [
			section(
				'Enlisted aimbot hack vs visibility tools',
				'A Enlisted aimbot hack focuses on assisted targeting during firefights — while ESP wallhack and radar handle map awareness. Enlisted Cheats bundles aimbot hack modules with visibility overlays in one license.',
				'Smoothness, FOV, and sensitivity controls tune assist for Enlisted combat pace across large-scale battles and campaign missions.',
				'Prefer softer tracking language? See <a href="/enlisted-aimbot/">soft aim</a>. Full settings: <a href="/enlisted-aimbot/">Aimbot page</a>.',
			),
			section(
				'Aimbot hack controls and hotkeys',
				'Bone priority options cover head, chest, or dynamic targets. Hotkeys enable or disable aimbot hack mid-mission without opening menus during rotations or final circles.',
				'Per-weapon profile slots separate long-range rifle tuning from close-quarters shotgun settings.',
				`Balance patches from ${EXT.rust} can change ideal FOV — retune after major weapon updates.`,
			),
			section(
				'Undetected aimbot hack maintenance',
				'Aimbot hack signatures rebuild after Gaijin anti-cheat updates. Follow the <a href="/updates/">Updates page</a> and <a href="/enlisted-cheats/">anti-cheat maintenance guide</a> before queueing after patch days.',
				'Checkout with instant digital delivery for Windows 10 and 11 — <a href="/pricing/">Pricing</a>.',
				'Pair with <a href="/enlisted-esp/">ESP</a> for the full information + assist loop.',
			),
		],
	},
	'esp-hack': {
		title: 'Enlisted ESP Hack 2026 | enemy boxes & Loot',
		description:
			'Enlisted ESP hack with enemy boxes and medkit markers for PC and controllers. Undetected Enlisted cheats with cloud DMA — see overlays and buy.',
		h1: 'Enlisted ESP Hack — enemy boxes Guide',
		intro:
			'Enlisted ESP hack overlays for Enlisted — enemy outlines, tank or artillery unit threat cues, pickups and lockers markers with distance readouts across campaign missions and co-op missions.',
		imageAlt: 'Enlisted ESP hack with hero skeleton, bounding box, and ult tracking labels',
		galleryTitle: 'Enlisted ESP hack gallery',
		ctaPrimary: 'Buy Enlisted Cheats',
		ctaSecondary: 'ESP controls',
		ctaSecondaryHref: '/enlisted-esp/',
		sections: [
			section(
				'What a Enlisted ESP hack shows',
				'A Enlisted ESP hack renders enemy unit outlines, tank or artillery unit positions, and loot pins through walls and terrain — closing the information gap before you commit to a fight.',
				'Distance readouts and snapline options help control engagement range during squad pushes and flanking scenarios.',
				'Canonical visibility guide: <a href="/enlisted-esp/">Enlisted ESP</a>. Wallhack wording: <a href="/enlisted-wallhack/">wallhack</a>.',
			),
			section(
				'ESP hack categories for campaign missions',
				'Toggle Enemy ESP hack, medkit markers, chest pins, and tank or artillery unit cues independently so only mission-critical overlays stay active during rotations.',
				'Team and enemy colour coding supports co-op missions and campaign missions.',
				`tileset area and loot changes publish through ${EXT.epic} — keep categories toggled to what the current map rewards.`,
			),
			section(
				'Undetected ESP hack with anti-cheat maintenance',
				'ESP hack modules rebuild after Gaijin anti-cheat and Enlisted patches. Check the <a href="/updates/">Updates page</a> before queueing — pair ESP hack awareness with <a href="/enlisted-radar/">radar hack</a> for flank reads.',
				'Licenses deliver digitally after checkout on Windows PC — see <a href="/pricing/">Pricing</a>.',
				'Install steps: <a href="/setup/">Setup</a>. Status questions: <a href="/enlisted-cheats/">undetected guide</a>.',
			),
		],
	},
	'unlock-all': {
		title: 'Enlisted Unlock All 2026 | What It Really Means',
		description:
			'Enlisted unlock all explained vs real Enlisted Cheats — ESP boxes, soft aim, and cloud DMA for PC and controllers. Know what you are buying.',
		h1: 'Enlisted Unlock All — What Players Search For',
		intro:
			'Enlisted unlock all is a common search term for Enlisted — this page clarifies what unlock-all tools claim versus the ESP wallhack, radar hack, and Aimbot tools Enlisted Cheats actually provides on Windows PC.',
		imageAlt: 'Enlisted ESP boxes and distances on enemy units and enemy vehicles in campaign mission',
		galleryTitle: 'Enlisted unlock all guide visuals',
		ctaPrimary: 'Buy Enlisted Cheats',
		ctaSecondary: 'See features',
		ctaSecondaryHref: '/features/',
		sections: [
			section(
				'What Enlisted unlock all usually means',
				'Enlisted unlock all searches often refer to instant access to weapons, camos, skins, or Prime Access tiers. Those claims differ from visibility and combat-assist tools like ESP wallhack and Aimbot.',
				'Enlisted Cheats focuses on in-match awareness — Enemy ESP, medkit markers, radar overlays, and configurable Aimbot — not account-wide cosmetic unlocks.',
				`Cosmetics and Prime Access items are sold through ${EXT.rust}. Be wary of unlock-all downloads that promise free skins — they are often scams.`,
			),
			section(
				'Visibility tools vs unlock-all claims',
				'ESP wallhack helps you spot enemy units, lockers, and resource caches during live missions. Radar hack adds flank awareness; Aimbot covers combat assist with smoothness and hotkey controls.',
				'For loadout planning during a match, pickups and lockers markers speed BR rotations — see the <a href="/enlisted-esp/">ESP</a> and <a href="/features/">Features</a> pages for the full tool list.',
				'Related: <a href="/enlisted-cheats/">Enlisted Cheats</a> and <a href="/enlisted-cheats/">best Enlisted cheats</a>.',
			),
			section(
				'Buying Enlisted Cheats for the right reasons',
				'If you need undetected ESP wallhack, radar hack, and Aimbot for Enlisted on Windows PC, compare <a href="/pricing/">Pricing</a> and read the <a href="/setup/">Setup guide</a> before checkout.',
				'Check the <a href="/updates/">Updates page</a> after Gaijin anti-cheat patches — maintenance rebuilds publish for active licenses.',
				'Questions? <a href="/faq/">FAQ</a> and <a href="/support/">Support</a> cover delivery and configuration — not cosmetic unlocks.',
			),
		],
	},
	privacy: {
		title: 'Privacy Policy | Enlisted Cheats',
		description:
			'Privacy policy for Enlisted Cheats. How we handle support emails, order data, and checkout for Enlisted cheats licenses on enlistedcheats.org.',
		h1: 'Enlisted Cheats Privacy Policy',
		intro: 'How Enlisted Cheats handles information when you browse enlistedcheats.org or contact support about a Enlisted license.',
		imageAlt: 'Enlisted ESP overlay visual for privacy policy page',
		galleryTitle: 'Enlisted Cheats legal resources',
		ctaPrimary: 'Email support',
		ctaSecondary: 'Read terms of use',
		ctaSecondaryHref: '/terms/',
		sections: [
			section(
				'Information we may collect',
				'We may collect contact details you send by email, order references needed to resolve support requests, and basic technical data used to operate and secure the website.',
				'We do not sell personal data. Checkout payment details are processed by the checkout provider — review their privacy terms for transaction data.',
				['Contact details you send by email', 'Order references for support requests', 'Basic technical data for site security'],
			),
			section(
				'How information is used',
				'Information is used to respond to support requests, process order issues, improve site reliability, and meet legal obligations when required.',
				'Analytics may use aggregated traffic data without identifying individual Enlisted Cheats customers.',
			),
			section(
				'Your choices and contact',
				'You may request correction or deletion of support email data by contacting support@enlistedcheats.org with your request details.',
				'Policy updates publish on this page. Continued use of enlistedcheats.org after updates means you accept the revised policy. Also see <a href="/terms/">Terms of Use</a> and <a href="/refund-policy/">Refund Policy</a>.',
			),
		],
	},
	refund: {
		title: 'Refund Policy | Enlisted Cheats',
		description:
			'Refund policy for Enlisted Cheats. Digital delivery terms and eligibility for Enlisted Cheats packages with ESP, soft aim, and cloud DMA.',
		h1: 'Enlisted Cheats Refund Policy',
		intro:
			'Refund terms for Enlisted Cheats licenses — ESP wallhack, radar hack, and Aimbot packages purchased through checkout for Enlisted.',
		imageAlt: 'Enlisted ESP overlay visual for refund policy page',
		galleryTitle: 'Enlisted Cheats billing resources',
		ctaPrimary: 'Contact support',
		ctaSecondary: 'Read privacy policy',
		ctaSecondaryHref: '/privacy-policy/',
		sections: [
			section(
				'Digital delivery and eligibility',
				'Enlisted Cheats licenses deliver digitally after payment confirmation. Because access begins immediately, refunds are limited to cases outlined below.',
				'Submit refund requests within 24 hours of purchase with your order ID and reason.',
			),
			section(
				'When refunds may be approved',
				'Duplicate charges, failed delivery despite confirmed payment, or technical activation failures verified by support may qualify for review.',
				'Refund decisions are final. Chargebacks without contacting support first may result in license revocation. See also <a href="/terms/">Terms of Use</a>.',
			),
			section(
				'How to request a refund',
				'Email support@enlistedcheats.org with subject "Refund Request", your order ID, purchase date, and issue summary — or use the <a href="/support/">Support page</a>.',
				'Approved refunds process back to the original payment method when possible. Pricing details live on <a href="/pricing/">Pricing</a>.',
			),
		],
	},
	terms: {
		title: 'Terms of Use 2026 | Enlisted Cheats Rules',
		description:
			'Terms of use for enlistedcheats.org and Enlisted Cheats licenses. Usage rules, anti-cheat risk, and liability for PC and controller cheats.',
		h1: 'Enlisted Cheats Terms of Use',
		intro: 'Terms governing use of enlistedcheats.org and Enlisted Cheats licenses for Enlisted on Windows PC.',
		imageAlt: 'Enlisted ESP overlay visual for terms of use page',
		galleryTitle: 'Enlisted Cheats legal pages',
		ctaPrimary: 'Email support',
		ctaSecondary: 'Read privacy policy',
		ctaSecondaryHref: '/privacy-policy/',
		sections: [
			section(
				'Acceptance and license scope',
				'By purchasing or using Enlisted Cheats you agree to these terms. Licenses grant personal use of ESP wallhack, radar, and Aimbot tools for Enlisted on Windows PC only.',
				'Sharing, reselling, or reverse-engineering the package violates these terms and may revoke access.',
			),
			section(
				'Risk and anti-cheat disclaimer',
				`Using cheats in Enlisted may violate Gaijin terms and result in account penalties. Enlisted Cheats provides maintenance but does not guarantee undetected status or account safety.`,
				'You assume all risk. We are not liable for bans, data loss, or damages arising from product use. See also <a href="/enlisted-cheats/">undetected status</a>.',
			),
			section(
				'Changes and governing law',
				'We may update these terms by posting revisions on this page. Continued use after changes constitutes acceptance.',
				'Contact support@enlistedcheats.org for questions. Related policies: <a href="/privacy-policy/">Privacy</a> and <a href="/refund-policy/">Refunds</a>.',
			),
		],
	},
};

/** Attach heroImage paths and clamp meta lengths. */
export function finalizePage(pageId, page) {
	return {
		...page,
		title: clampTitle(stripZadeyoFromMeta(page.title)),
		description: clampDesc(stripZadeyoFromMeta(page.description)),
		heroImage: HERO_IMAGES[pageId],
	};
}

export function finalizePages(pages) {
	const out = {};
	for (const [id, page] of Object.entries(pages)) {
		out[id] = finalizePage(id, page);
	}
	return out;
}

export const englishPagesFinal = finalizePages(enPages);
