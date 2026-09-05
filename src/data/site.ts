export const siteConfig = {
	name: 'Enlisted Cheats',
	url: 'https://enlistedcheats.org',
	locale: 'en',
	market: 'Worldwide',
	supportEmail: 'support@enlistedcheats.org',
	logo: '/images/enlisted-cheats-logo.webp',
	logoRaster: '/images/enlisted-cheats-logo.png',
	logoRasterWidth: 1536,
	logoRasterHeight: 1024,
	logoAlt: 'Two crossed vintage bolt-action rifles in a monochromatic X shape, Enlisted Cheats logo',
	checkoutUrl: 'https://zadeyo.com/go/QRH?to=%2Fproducts%2Fenlisted',
	defaultOgImage: '/images/enlisted-gameplay/esp.png',
} as const;

export const productInfo = {
	name: 'Enlisted Cheats',
	shortName: 'EN',
	brand: 'Enlisted Cheats',
	tagline: 'Enlisted cheats for PC — ESP, aimbot, and wallhack with updates after anti-cheat patches',
	summary:
		'Enlisted Cheats is a Windows PC package with ESP, aimbot, and wallhack for Enlisted. It works in campaigns, skirmishes, and large-scale battles, and we update it after anti-cheat and game patches.',
	game: 'Enlisted',
	delivery: 'Digital license delivery after purchase confirmation',
	platforms: ['Windows PC', 'Controllers'],
	updateCadence: 'Updates are published when Enlisted or anti-cheat patches require maintenance',
	supportHours: 'Support requests are reviewed daily',
	plans: [
		{ id: 'monthly', label: 'Monthly', price: 35, duration: 'P30D' },
		{ id: 'lifetime', label: 'Lifetime', price: 150, duration: 'P99Y' },
	],
	currency: 'USD',
	planSummaries: {
		monthly: [
			'ESP, aimbot, wallhack, and radar',
			'30 days access — $35',
			'anti-cheat updates while your license is active',
			'Instant digital delivery on Windows PC',
		],
		lifetime: [
			'ESP, aimbot, wallhack, and radar',
			'One-time $150 — no renewals',
			'anti-cheat updates for as long as you play',
			'Instant digital delivery on Windows PC',
		],
	},
	features: {
		esp: [
			'Soldier ESP across campaigns, skirmishes, and large-scale battles',
			'Enemy unit, heavy vehicle, and heavy unit outlines through terrain and obstacles',
			'Reload and health markers for soldiers and vehicles',
			'Distance readouts and snapline options',
			'Toggleable ESP categories to cut overlay noise',
			'Team and enemy colour coding for squad fights',
		],
		aimbot: [
			'Smooth aim targeting for rifles, SMGs, and melee',
			'Smoothness, FOV, and sensitivity controls',
			'Weak-spot priority and target selection options',
			'Hotkey toggles mid-fight without opening menus',
			'Per-weapon profiles for rifles, SMGs, and snipers',
		],
		radar: [
			'2D radar for enemies outside your line of sight',
			'Directional cues for flanks and spawn pushes',
			'Configurable radar range for early rotations',
		],
		general: [
			'In-client toggles for ESP, radar, and aimbot',
			'Monthly and lifetime licenses',
			'Anti-cheat maintenance notes after Enlisted patches',
			'Setup, delivery, and billing support',
		],
	},
} as const;

/** Quick-scan feature list for pricing page — full explanations live on /features/. */
export const productFeatureCategories = [
	{
		title: 'Combat assist',
		columns: 1 as const,
		items: [
			'Line-of-sight visibility check',
			'Custom FOV arc',
			'FOV circle overlay',
			'Target snapline',
			'Custom aim hotkey',
			'Hold & toggle aim modes',
			'Aim smoothing slider',
			'Enemy type filter',
			'Weak-point targeting',
			'Per-weapon profiles',
		],
	},
	{
		title: 'ESP & overlays',
		columns: 1 as const,
		items: [
			'Axis & Allied soldier ESP',
			'Outlines through terrain',
			'Enemy bounding boxes',
			'Weak-point markers',
			'Enemy facing indicator',
			'Unit name labels',
			'Distance readout',
			'ESP distance filter',
			'Medkit & supply ESP',
			'Officer, tank & vehicle ESP',
		],
	},
	{
		title: 'Radar & mission tools',
		columns: 2 as const,
		items: [
			'2D off-screen radar',
			'Defense wave direction cues',
			'In-mission hotkey toggles',
			'Hotkey profiles',
			'Controller support',
			'Patch maintenance status',
			'In-game mod menu',
			'Ammo & supply markers',
			'Reload and stamina tracking',
			'Custom crosshair',
			'Squad colour coding',
			'Campaign & skirmish presets',
		],
	},
] as const;

/** Detailed feature explanations for the /features/ page. */
export const productFeatureDetails = [
	{
		id: 'aimbot',
		title: 'Combat assist',
		summary:
			'Configurable aim assistance for rifles, SMGs, and melee — tuned for campaigns, skirmishes, and large-scale battles.',
		items: [
			{
				name: 'Line-of-sight visibility check',
				description:
					'Only locks onto enemies your soldier can actually hit — reduces obvious snaps through walls and smoke and cover.',
			},
			{
				name: 'Custom FOV arc',
				description:
					'Set how wide the aimbot scans for Axis and Allied soldiers units so close fights and sniper lanes both feel natural.',
			},
			{
				name: 'FOV circle overlay',
				description: 'Optional on-screen ring showing the active aimbot radius for quick tuning in skirmishes and frontline campaigns.',
			},
			{
				name: 'Target snapline',
				description:
					'Snapline from crosshair to the current lock — useful for verifying weak-point priority on heavy units and heavy vehicles.',
			},
			{
				name: 'Custom aim hotkey',
				description: 'Hold or toggle aimbot with a key you choose — works alongside controller bindings on Windows PC.',
			},
			{
				name: 'Hold & toggle aim modes',
				description: 'Switch between hold-to-aim, toggle, and always-on profiles per weapon class.',
			},
			{
				name: 'Aim smoothing slider',
				description: 'Control how fast the reticle moves to the target — higher smoothness looks more natural in public matches.',
			},
			{
				name: 'Enemy type filter',
				description:
					'Prioritise closest enemy, lowest health, heavy units, or bosses like officers, tanks, and artillery.',
			},
			{
				name: 'Weak-point targeting',
				description:
					'Bias locks toward weak-point hitboxes on Axis, Allied, and elite units units.',
			},
			{
				name: 'Per-weapon profiles',
				description:
					'Save separate aim settings for rifles, SMGs, snipers, and melee — swap mid-mission without retuning.',
			},
		],
	},
	{
		id: 'visual',
		title: 'ESP & overlays',
		summary:
			'ESP and wallhack overlays that surface enemies, loot, and mission threats through terrain and smoke and cover.',
		items: [
			{
				name: 'Axis & Allied soldier ESP',
				description:
					'Highlights enemy factions with boxes, health bars, and distance readouts across the battle roster.',
			},
			{
				name: 'Outlines through terrain',
				description:
					'Clean outlines on Axis, Allied, and elite units units — even through smoke, cover, and smoke and cover.',
			},
			{
				name: 'Enemy bounding boxes',
				description: 'Box ESP sized to each unit type for precise reads during infantry combat and large-scale battle objectives.',
			},
			{
				name: 'Weak-point markers',
				description: 'Mark weak-point hitboxes for precision shots on heavy units, bunkers, and objective phases.',
			},
			{
				name: 'Enemy facing indicator',
				description: 'See which way an enemy is facing before you push a corridor or capture a capture point.',
			},
			{
				name: 'Unit name labels',
				description: 'Display unit names above ESP boxes — Axis riflemen, Allied squads, elite units, and more.',
			},
			{
				name: 'Distance readout',
				description: 'Meters-to-target on every box so you know when to swap weapons or abilities.',
			},
			{
				name: 'ESP distance filter',
				description:
					'Hide far-away clutter — keep overlays readable in Moscow, Normandy, and defense waves.',
			},
			{
				name: 'Medkit & supply ESP',
				description: 'Mark medkits, ammo crates, and supply points during long campaign and survival runs.',
			},
			{
				name: 'Officer, tank & vehicle ESP',
				description:
					'Dedicated styling for officers, tanks, artillery, and armoured vehicles in large-scale battles.',
			},
		],
	},
	{
		id: 'misc',
		title: 'Radar & mission tools',
		summary:
			'Radar, menu toggles, controller support, and quality-of-life tools bundled with every license.',
		items: [
			{
				name: '2D off-screen radar',
				description: 'Minimap-style blips for enemies outside your camera — great for defense, survival, and assault.',
			},
			{
				name: 'Defense wave direction cues',
				description: 'Directional hints when new enemy waves push toward your capture or survival objective.',
			},
			{
				name: 'In-mission hotkey toggles',
				description: 'Flip ESP, radar, and aimbot on or off mid-mission without alt-tabbing.',
			},
			{
				name: 'Hotkey profiles',
				description: 'Save different bind layouts for mouse/keyboard and controller loadouts.',
			},
			{
				name: 'Controller support',
				description: 'Aimbot and menu navigation tested with Xbox and PlayStation pads on Windows.',
			},
			{
				name: 'Patch maintenance status',
				description: 'Maintenance status published on Updates after Darkflow Software and Enlisted patches.',
			},
			{
				name: 'In-game mod menu',
				description: 'Full in-game menu for colours, categories, and per-module enable/disable.',
			},
			{
				name: 'Ammo & supply markers',
				description: 'Highlight supplys, ammo crates, and supply points during farm runs, campaign missions, and large-scale battle objectives.',
			},
			{
				name: 'Reload and stamina tracking',
				description: 'Track enemy reload cues and your own reload state during sustained firefights.',
			},
			{
				name: 'Custom crosshair',
				description: 'Replace the default reticle with sizes and colours that match your ESP theme.',
			},
			{
				name: 'Squad colour coding',
				description: 'Separate colours for your squad soldiers, allies, and enemies in public matches.',
			},
			{
				name: 'Campaign & skirmish presets',
				description:
					'One-click ESP and radar profiles tuned for campaign enemy density and skirmish modifier stacks.',
			},
		],
	},
] as const;

export const trustSignals = {
	status: 'Online',
	statusNote: 'Enlisted Cheats is live for Enlisted on Windows PC.',
	delivery: 'Instant digital delivery',
	platform: 'Windows 10 & 11',
	antiCheat: 'Anti-cheat maintenance supported',
} as const;

export const seoLandingPages = [
	{ label: 'Enlisted Cheats', href: '/enlisted-cheats/' },
	{ label: 'Enlisted ESP', href: '/enlisted-esp/' },
	{ label: 'Enlisted Aimbot', href: '/enlisted-aimbot/' },
	{ label: 'Enlisted wallhack', href: '/enlisted-wallhack/' },
	{ label: 'Undetected status', href: '/enlisted-cheats/' },
	{ label: 'Pricing', href: '/pricing/' },
] as const;

export const mainNav = [
	{ label: 'Home', href: '/' },
	{ label: 'Cheats', href: '/enlisted-cheats/' },
	{ label: 'Aimbot', href: '/enlisted-aimbot/' },
	{ label: 'ESP', href: '/enlisted-esp/' },
	{ label: 'Features', href: '/features/' },
	{ label: 'Pricing', href: '/pricing/' },
	{ label: 'Setup', href: '/setup/' },
	{ label: 'Updates', href: '/updates/' },
	{ label: 'FAQ', href: '/faq/' },
] as const;

export const footerNav = [
	{ label: 'Enlisted update log', href: '/updates/' },
	{ label: 'Contact support', href: '/support/' },
	{ label: 'Refund policy details', href: '/refund-policy/' },
	{ label: 'Privacy policy details', href: '/privacy-policy/' },
	{ label: 'Terms of use', href: '/terms/' },
] as const;

export const footerExplore = [
	{ label: 'Home', href: '/' },
	{ label: 'Enlisted Cheats', href: '/enlisted-cheats/' },
	{ label: 'ESP', href: '/enlisted-esp/' },
	{ label: 'Aimbot', href: '/enlisted-aimbot/' },
	{ label: 'Features', href: '/features/' },
	{ label: 'Pricing', href: '/pricing/' },
	{ label: 'Setup', href: '/setup/' },
	{ label: 'FAQ', href: '/faq/' },
] as const;

export const homeFaqs = [
	{
		category: 'Getting started',
		question: 'What is Enlisted Cheats?',
		answer:
			'Enlisted Cheats is a maintained Windows PC package for <a href="https://enlisted.net/en/" target="_blank" rel="noopener noreferrer">Enlisted</a> with <a href="/enlisted-esp/">ESP page</a>, <a href="/enlisted-wallhack/">wallhack</a>, <a href="/enlisted-radar/">radar</a>, and <a href="/enlisted-aimbot/">aimbot</a> controls. One license covers the full feature set plus <a href="/setup/">setup help</a>.',
	},
	{
		category: 'Getting started',
		question: 'What is included in one license?',
		answer:
			'Enemy ESP boxes, health and pickup markers, 2D radar overlays, and configurable aim assist — including per-weapon profiles and optional cloud DMA. See the <a href="/features/">full feature list</a> and compare <a href="/pricing/">license plans</a>.',
	},
	{
		category: 'Getting started',
		question: 'How are licenses delivered after checkout?',
		answer:
			'Licenses are delivered digitally after payment clears. Delivery timing can vary slightly by payment method. Keep your order confirmation handy if you contact <a href="/support/">our support team</a>.',
	},
	{
		category: 'Features & gameplay',
		question: 'Does this work for campaigns, skirmishes, and large-scale battles?',
		answer:
			'Yes. ESP and radar help you read enemy positions in frontline campaigns, skirmishes, and <a href="/blog/enlisted-large-scale-battles-guide/">large-scale battles</a> maps like Moscow, Normandy, and Tunisia maps. Aim assist covers rifle, SMG, and sniper profiles for solo or squad play.',
	},
	{
		category: 'Features & gameplay',
		question: 'Can I use a controller?',
		answer:
			'Controller support is available on Windows PC with adjustable FOV and aim settings. Menu navigation with a pad takes a little practice — see the <a href="/setup/">setup guide</a> for baseline values and <a href="/reviews/">player reviews</a> from controller players.',
	},
	{
		category: 'Features & gameplay',
		question: 'What is cloud DMA and do I need it?',
		answer:
			'Cloud DMA is an optional setup path for buyers who want hardware-assisted isolation instead of a standard loader. Most players start with the regular package. Read the <a href="/enlisted-cheats/">main guide</a> and ask <a href="/support/">support</a> before choosing DMA.',
	},
	{
		category: 'Updates & support',
		question: 'Is Enlisted Cheats permanently undetected?',
		answer:
			'No tool can promise permanent undetected status. Enlisted is maintained by <a href="https://darkflowsoftware.com/" target="_blank" rel="noopener noreferrer">Darkflow Software</a> and receives regular patches. We rebuild after anti-cheat updates and post status on the <a href="/updates/">status page</a> — check there before you load in.',
	},
	{
		category: 'Updates & support',
		question: 'Where do I check status after a Enlisted patch?',
		answer:
			'Start with our <a href="/updates/">Updates page</a>, then cross-check <a href="https://enlisted.net/en/news/" target="_blank" rel="noopener noreferrer">official PC update notes</a>. For how patches affect gameplay, read our <a href="/blog/enlisted-patch-notes-guide/">patch notes guide</a>.',
	},
	{
		category: 'Updates & support',
		question: 'How do I contact support?',
		answer:
			'Use the <a href="/support/">Support page</a> or email support@enlistedcheats.org with your order ID, Windows version, and a short description of the issue. Refund questions are covered on the <a href="/refund-policy/">refund policy</a> page.',
	},
] as const;

export const seoFaqs = [
	...homeFaqs,
	{
		category: 'Product details',
		question: 'What is a Enlisted wallhack?',
		answer:
			'A Enlisted wallhack is an ESP overlay that highlights Axis, Allied, and elite units units through terrain. Enlisted Cheats <a href="/enlisted-wallhack/">wallhack</a> includes distance readouts, category toggles, and team colours for campaign and large-scale battles.',
	},
	{
		category: 'Product details',
		question: 'Does Enlisted Cheats include a radar hack?',
		answer:
			'Yes. <a href="/enlisted-radar/">2D radar overlays</a> show nearby threats outside your direct view — useful for reading flanks during defense, survival, and squad pushes.',
	},
	{
		category: 'Product details',
		question: 'How does anti-cheat affect Enlisted Cheats?',
		answer:
			'Anti-cheat monitors Enlisted on Windows PC. After major patches we publish maintenance notes on <a href="/updates/">Updates</a>. Read the <a href="/enlisted-cheats/">maintenance guide</a> and our <a href="/blog/undetected-enlisted-cheats-eac/">anti-cheat explainer</a> for what to expect on patch day.',
	},
	{
		category: 'Product details',
		question: 'Where can I read Enlisted game guides?',
		answer:
			'Our <a href="/blog/">blog</a> covers Enlisted battle types, frontline campaigns, factions, large-scale battle farming, and how to read official patch notes — with links to the <a href="https://enlisted.fandom.com/wiki/Enlisted_Wiki" target="_blank" rel="noopener noreferrer">Enlisted Wiki</a> and <a href="https://enlisted.net/en/game-guide/" target="_blank" rel="noopener noreferrer">official game guide</a>.',
	},
] as const;

export type CustomerReview = {
	handle: string;
	title: string;
	rating: 3 | 4 | 5;
	text: string;
	short: string;
	slug: string;
	seoTitle: string;
	seoDescription: string;
	date: string;
	tag?: string;
};

export const customerReviews = [
	{
		handle: 'krypt0_arc',
		title: 'Soft aim on frontline campaigns',
		rating: 5,
		text: 'Using this for a few weeks on frontline campaigns. Soft aim feels natural on rifles and I have not had issues in public squads. Took me a bit to figure out the menu layout but after that it has been smooth.',
		short: 'Using this for a few weeks on frontline campaigns. Soft aim feels natural on rifles and I have not had issues in public squads.',
		slug: 'enlisted-soft-aim-review-xkrypt0',
		seoTitle: 'Soft aim review by @krypt0_arc | Enlisted Cheats',
		seoDescription:
			'Buyer review from @krypt0_arc on soft aim for frontline campaigns after setup on Windows PC.',
		date: '2026-03-14',
	},
	{
		handle: 'extractR4K',
		title: 'ESP on large-scale battles',
		rating: 4,
		text: 'ESP helps a lot on Moscow and Tunisia when you are trying to spot heavies on ridges before pushing the objective. Radar could be a little bigger on 1080p. Still happy with it for what I paid.',
		short: 'ESP helps on Moscow and Tunisia when spotting heavies before pushing the objective. Radar could be bigger on 1080p.',
		slug: 'enlisted-esp-realistic-review-buildsr4k',
		seoTitle: 'ESP review by @extractR4K | Enlisted Cheats',
		seoDescription:
			'Buyer review from @extractR4K on ESP boxes and radar during large-scale battles.',
		date: '2026-02-08',
	},
	{
		handle: 'jakeDMA',
		title: 'Cloud DMA setup',
		rating: 5,
		text: 'I moved over from another tool that got flagged last patch. DMA setup sounded intimidating but support walked me through it on Discord in under an hour. Still running clean after the latest hotfix.',
		short: 'Moved from another tool that got flagged. Support walked me through DMA setup on Discord. Still running after the latest hotfix.',
		slug: 'enlisted-cloud-dma-review-dma-wizard',
		seoTitle: 'Cloud DMA review by @jakeDMA | Enlisted Cheats',
		seoDescription:
			'Buyer review from @jakeDMA on cloud DMA setup and patch-day stability.',
		date: '2026-01-22',
	},
	{
		handle: 'padWarMain',
		title: 'Controller support',
		rating: 4,
		text: 'Did not expect controller support to work this well. Aim assist needed some FOV tweaking with my Xbox pad. Opening the menu with a controller is clunky but playable.',
		short: 'Controller support works better than I expected. Needed some FOV tweaks with my Xbox pad.',
		slug: 'enlisted-controller-aimbot-review-ctrl-player99',
		seoTitle: 'Controller review by @padWarMain | Enlisted Cheats',
		seoDescription:
			'Buyer review from @padWarMain on aim assist and menu use with an Xbox controller.',
		date: '2026-04-02',
	},
	{
		handle: 'stormchaser07',
		title: 'Setup took patience',
		rating: 3,
		text: 'Features are solid once everything is running. First launch was annoying because Windows Defender flagged the loader. Not entirely their fault, but the setup guide could be clearer. Support replied in a couple hours with a fix. ESP and pickup markers work well in frontline campaigns.',
		short: 'Solid once running. Setup guide could be clearer and Defender flagged the loader at first. Support helped same day.',
		slug: 'enlisted-cheat-setup-review-stormchaser07',
		seoTitle: 'Setup review by @stormchaser07 | Enlisted Cheats',
		seoDescription:
			'Honest buyer review from @stormchaser07 on first-time setup and support response time.',
		date: '2026-05-19',
	},
	{
		handle: 'loot_goblin_42',
		title: 'Supply ESP',
		rating: 5,
		text: 'Mostly bought this for supply tracking on long survival runs. Being able to see cooldowns and medkits without tabbing around saves a surprising amount of time.',
		short: 'Mostly bought for supply tracking on survival runs. Cooldown and pickup markers save a lot of time.',
		slug: 'enlisted-soldier-esp-review-lootgoblinx',
		seoTitle: 'Supply ESP review by @loot_goblin_42 | Enlisted Cheats',
		seoDescription:
			'Buyer review from @loot_goblin_42 on supply ESP, cooldown markers, and survival battles.',
		date: '2026-06-11',
	},
	{
		handle: 'steelpath42',
		title: 'Weapon profiles',
		rating: 4,
		text: 'Been on this since early access. Separate profiles for rifle and SMG actually matter in tight maps. Only gripe is waiting about a day for an update after one patch. Updates page helped at least.',
		short: 'Separate rifle and SMG profiles matter in tight maps. Waited about a day for one patch update.',
		slug: 'enlisted-aimbot-realistic-review-steelpathgrind42',
		seoTitle: 'Aim profiles review by @steelpath42 | Enlisted Cheats',
		seoDescription:
			'Buyer review from @steelpath42 on per-weapon aim profiles and post-patch update timing.',
		date: '2026-03-28',
	},
	{
		handle: 'vanlife_arc',
		title: 'Radar on defense',
		rating: 5,
		text: 'Radar makes defense waves way less chaotic. Seeing flank routes before they hit the pod is huge when you are in a pub squad and nobody is calling spawns.',
		short: 'Radar makes defense waves less chaotic. Seeing flank routes before they hit the pod is huge in pub squads.',
		slug: 'enlisted-radar-hack-review-vanlifefn',
		seoTitle: 'Radar review by @vanlife_arc | Enlisted Cheats',
		seoDescription:
			'Buyer review from @vanlife_arc on radar during defense battles and squad play.',
		date: '2026-07-03',
	},
	{
		handle: 'patchdaymike',
		title: 'Patch day downtime',
		rating: 4,
		text: 'Every cheat goes down on patch day. Difference here is they posted a status update within a few hours and I was back the next morning. That is about all you can ask for.',
		short: 'Goes down on patch day like everything else. Status update within a few hours and back the next morning.',
		slug: 'enlisted-anti-cheat-update-review-patchdaymike',
		seoTitle: 'Patch day review by @patchdaymike | Enlisted Cheats',
		seoDescription:
			'Buyer review from @patchdaymike on downtime and communication after a Enlisted patch.',
		date: '2026-02-27',
	},
	{
		handle: 'snipezonly',
		title: 'Sniper profile',
		rating: 5,
		text: 'Sniper profile plus ESP tags is exactly what I wanted for sniper duels. No complaints so far.',
		short: 'Sniper profile plus ESP tags is exactly what I wanted for sniper duels.',
		slug: 'enlisted-sniper-aimbot-review-snipezonly',
		seoTitle: 'Sniper profile review by @snipezonly | Enlisted Cheats',
		seoDescription:
			'Buyer review from @snipezonly on the sniper aim profile and ESP tagging.',
		date: '2026-07-21',
	},
	{
		handle: 'nightowl_pc',
		title: 'Monthly sub',
		rating: 4,
		text: 'Started on monthly to test it before committing. Performance has been stable enough that I will probably grab lifetime next sale. Menu is a little crowded but you get used to it.',
		short: 'Started monthly to test it. Stable enough that I will probably grab lifetime next sale.',
		slug: 'enlisted-monthly-sub-review-nightowl',
		seoTitle: 'Monthly sub review by @nightowl_pc | Enlisted Cheats',
		seoDescription:
			'Buyer review from @nightowl_pc on trying the monthly plan before upgrading.',
		date: '2026-05-06',
	},
	{
		handle: 'oldvet_wf',
		title: 'Lifetime key',
		rating: 5,
		text: 'Picked up lifetime after bouncing between free menus for years. Having one package with ESP, aim assist, and radar that actually gets updated is worth it to me.',
		short: 'Picked up lifetime after years of bouncing between free menus. One package that actually gets updated.',
		slug: 'enlisted-lifetime-key-review-oldvet',
		seoTitle: 'Lifetime key review by @oldvet_wf | Enlisted Cheats',
		seoDescription:
			'Buyer review from @oldvet_wf on switching to a lifetime Enlisted Cheats key.',
		date: '2026-01-09',
	},
	{
		handle: 'duoqueue',
		title: 'Playing with a friend',
		rating: 4,
		text: 'Me and a friend both run it for duo skirmishes. ESP and radar make callouts way easier when we are on voice and not staring at the same screen. Wish there was a cleaner way to reset settings between missions.',
		short: 'Friend and I both run it for duo skirmishes. ESP and radar make callouts easier on voice.',
		slug: 'enlisted-squad-play-review-duoqueue',
		seoTitle: 'Squad play review by @duoqueue | Enlisted Cheats',
		seoDescription:
			'Buyer review from @duoqueue on using ESP and radar during duo skirmish runs.',
		date: '2026-04-18',
	},
] as const satisfies readonly CustomerReview[];

export const customerReviewStats = {
	averageRating:
		Math.round(
			(customerReviews.reduce((sum, review) => sum + review.rating, 0) / customerReviews.length) * 10,
		) / 10,
	totalCount: customerReviews.length,
} as const;
