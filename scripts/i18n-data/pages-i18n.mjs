import { HERO_IMAGES, clampTitle, clampDesc, section, stripZadeyoFromMeta } from './constants.mjs';
import { phrases } from './phrases.mjs';

/** Page-specific translated meta for home across locales. */
const PAGE_META_HOME = {
	es: { title: 'Enlisted Cheats 2026 | ESP, Wallhack y Aimbot', desc: 'Trucos Enlisted indetectables para Enlisted en PC. ESP wallhack, radar hack y Aimbot con mantenimiento Darkflow Software anti-cheat. Entrega digital instantánea.', h1: 'Enlisted Cheats — ESP, Wallhack y Aimbot indetectables', intro: 'Paquete undetected para Enlisted en Windows PC: ESP wallhack, radar y Aimbot con mantenimiento Darkflow Software anti-cheat tras cada parche.', imageAlt: 'Hero enlisted-cheats con ESP wallhack y Aimbot indetectables', gallery: 'Galería Enlisted Cheats — ESP, Aimbot y wallhack', cta2: 'Ver funciones', h2a: 'Por qué eligen Enlisted Cheats en 2026', h2b: 'ESP wallhack, radar y Aimbot en una licencia', topicA: 'Ideal para leer escuadrones enemigos en misiones y co-op missions.', topicB: 'Una licencia en lugar de herramientas separadas.' },
	fr: { title: 'Enlisted Cheats 2026 | ESP, Wallhack et Aimbot', desc: 'Triches Enlisted indétectables pour Enlisted sur PC. ESP wallhack, radar hack et Aimbot avec maintenance Darkflow Software anti-cheat. Livraison numérique instantanée.', h1: 'Enlisted Cheats — ESP, Wallhack et Aimbot indétectables', intro: 'Pack undetected pour Enlisted sur PC Windows : ESP wallhack, radar et Aimbot avec maintenance Darkflow Software anti-cheat après chaque patch.', imageAlt: 'Hero enlisted-cheats avec ESP wallhack et Aimbot indétectables', gallery: 'Galerie Enlisted Cheats — ESP, Aimbot et wallhack', cta2: 'Voir les fonctions', h2a: 'Pourquoi choisir Enlisted Cheats en 2026', h2b: 'ESP wallhack, radar et Aimbot en une licence', topicA: 'Idéal pour repérer les escouades ennemies en frontline campaigns, skirmishes et missions en coop.', topicB: 'Une licence au lieu d\'outils séparés.' },
	de: { title: 'Enlisted Cheats 2026 | ESP, Wallhack & Aimbot', desc: 'Undetected Enlisted Cheats für Enlisted auf PC. ESP Wallhack, Radar Hack und Aimbot mit Darkflow Software anti-cheat-Wartung. Sofortige digitale Lieferung.', h1: 'Enlisted Cheats — Undetected ESP, Wallhack & Aimbot', intro: 'Undetected Windows PC Paket für Enlisted: ESP Wallhack, Radar und Aimbot mit Darkflow Software anti-cheat-Wartung nach jedem Patch.', imageAlt: 'Enlisted-cheats Hero mit ESP Wallhack und Aimbot undetected', gallery: 'Enlisted Cheats Galerie — ESP, Aimbot und Wallhack', cta2: 'Features ansehen', h2a: 'Warum Enlisted Cheats 2026 führt', h2b: 'ESP Wallhack, Radar und Aimbot in einer Lizenz', topicA: 'Ideal um feindliche Squads in missions und co-op missions zu lesen.', topicB: 'Eine Lizenz statt separater Tools.' },
	pt: { title: 'Enlisted Cheats 2026 | ESP, Wallhack e Aimbot', desc: 'Cheats Enlisted indetectáveis para Enlisted no PC. ESP wallhack, radar hack e Aimbot com manutenção Darkflow Software anti-cheat. Entrega digital instantánea.', h1: 'Enlisted Cheats — ESP, Wallhack e Aimbot indetectáveis', intro: 'Pacote undetected para Enlisted no Windows PC: ESP wallhack, radar e Aimbot com manutenção Darkflow Software anti-cheat após cada patch.', imageAlt: 'Hero enlisted-cheats com ESP wallhack e Aimbot indetectáveis', gallery: 'Galeria Enlisted Cheats — ESP, Aimbot e wallhack', cta2: 'Ver recursos', h2a: 'Por que escolher Enlisted Cheats em 2026', h2b: 'ESP wallhack, radar e Aimbot numa licença', topicA: 'Ideal para ler esquadrões inimigos em BR e co-op missions.', topicB: 'Uma licença em vez de ferramentas separadas.' },
	it: { title: 'Enlisted Cheats 2026 | ESP, Wallhack e Aimbot', desc: 'Cheat Enlisted indetectable per Enlisted su PC. ESP wallhack, radar hack e Aimbot con manutenzione Darkflow Software anti-cheat. Consegna digitale istantanea.', h1: 'Enlisted Cheats — ESP, Wallhack e Aimbot indetectable', intro: 'Pacchetto undetected per Enlisted su PC Windows: ESP wallhack, radar e Aimbot con manutenzione Darkflow Software anti-cheat dopo ogni patch.', imageAlt: 'Hero enlisted-cheats con ESP wallhack e Aimbot indetectable', gallery: 'Galleria Enlisted Cheats — ESP, Aimbot e wallhack', cta2: 'Vedi funzioni', h2a: 'Perché scegliere Enlisted Cheats nel 2026', h2b: 'ESP wallhack, radar e Aimbot in una licenza', topicA: 'Ideale per leggere squadre nemiche in missions e co-op missions.', topicB: 'Una licenza invece di tool separati.' },
	nl: { title: 'Enlisted Cheats 2026 | ESP, Wallhack & Aimbot', desc: 'Undetected Enlisted cheats voor Enlisted op PC. ESP wallhack, radar hack en Aimbot met Darkflow Software anti-cheat-onderhoud. Directe digitale levering.', h1: 'Enlisted Cheats — Undetected ESP, Wallhack & Aimbot', intro: 'Undetected Windows PC pakket voor Enlisted: ESP wallhack, radar en Aimbot met Darkflow Software anti-cheat-onderhoud na elke patch.', imageAlt: 'Enlisted-cheats hero met ESP wallhack en Aimbot undetected', gallery: 'Enlisted Cheats galerij — ESP, Aimbot en wallhack', cta2: 'Bekijk functies', h2a: 'Waarom Enlisted Cheats in 2026', h2b: 'ESP wallhack, radar en Aimbot in één licentie', topicA: 'Ideaal om vijandelijke squads te lezen in missions en co-op missions.', topicB: 'Eén licentie in plaats van losse tools.' },
	pl: { title: 'Enlisted Cheats 2026 | ESP, Wallhack i Aimbot', desc: 'Undetected cheaty Enlisted dla Enlisted na PC. ESP wallhack, radar hack i Aimbot z konserwacją Darkflow Software anti-cheat. Natychmiastowa dostawa cyfrowa.', h1: 'Enlisted Cheats — Undetected ESP, Wallhack i Aimbot', intro: 'Pakiet undetected dla Enlisted na Windows PC: ESP wallhack, radar i Aimbot z konserwacją Darkflow Software anti-cheat po każdym patchu.', imageAlt: 'Hero enlisted-cheats z ESP wallhack i Aimbot undetected', gallery: 'Galeria Enlisted Cheats — ESP, Aimbot i wallhack', cta2: 'Zobacz funkcje', h2a: 'Dlaczego Enlisted Cheats w 2026', h2b: 'ESP wallhack, radar i Aimbot w jednej licencji', topicA: 'Idealny do czytania wrogich squadów w BR i co-op missions.', topicB: 'Jedna licencja zamiast osobnych narzędzi.' },
	ru: { title: 'Enlisted Cheats 2026 | ESP, Wallhack и Aimbot', desc: 'Undetected читы Enlisted для Enlisted на PC. ESP wallhack, radar hack и Aimbot с обслуживанием Darkflow Software anti-cheat. Мгновенная цифровая доставка.', h1: 'Enlisted Cheats — Undetected ESP, Wallhack и Aimbot', intro: 'Undetected пакет для Enlisted на Windows PC: ESP wallhack, radar и Aimbot с обслуживанием Darkflow Software anti-cheat после патчей.', imageAlt: 'Hero enlisted-cheats с ESP wallhack и Aimbot undetected', gallery: 'Галерея Enlisted Cheats — ESP, Aimbot и wallhack', cta2: 'Смотреть функции', h2a: 'Почему выбирают Enlisted Cheats в 2026', h2b: 'ESP wallhack, radar и Aimbot в одной лицензии', topicA: 'Идеально для чтения вражеских отрядов в BR и co-op missions.', topicB: 'Одна лицензия вместо отдельных инструментов.' },
	tr: { title: 'Enlisted Cheats 2026 | ESP, Wallhack ve Aimbot', desc: 'Enlisted için undetected hileler. ESP wallhack, radar hack ve Aimbot — Darkflow Software anti-cheat bakımı. Anında dijital teslimat.', h1: 'Enlisted Cheats — Undetected ESP, Wallhack ve Aimbot', intro: 'Enlisted Windows PC undetected paketi: ESP wallhack, radar ve Aimbot — Darkflow Software anti-cheat bakımı dahil.', imageAlt: 'Enlisted-cheats soldier ESP wallhack ve Aimbot undetected', gallery: 'Enlisted Cheats galeri — ESP, Aimbot ve wallhack', cta2: 'Özellikleri gör', h2a: '2026\'da neden Enlisted Cheats', h2b: 'ESP wallhack, radar ve Aimbot tek lisans', topicA: 'BR ve co-op missions\'da düşman squad okumak için ideal.', topicB: 'Ayrı araçlar yerine tek lisans.' },
	ar: { title: 'Enlisted Cheats 2026 | ESP وWallhack وAimbot', desc: 'غش Enlisted undetected لـ Enlisted على PC. ESP wallhack ورadar hack وAimbot مع صيانة Darkflow Software anti-cheat. تسليم رقمي فوري.', h1: 'Enlisted Cheats — ESP وWallhack وAimbot غير مكتشف', intro: 'حزمة undetected لـ Enlisted على Windows PC: ESP wallhack ورadar وAimbot مع صيانة Darkflow Software anti-cheat.', imageAlt: 'Hero enlisted-cheats مع ESP wallhack وAimbot undetected', gallery: 'معرض Enlisted Cheats — ESP وAimbot وwallhack', cta2: 'عرض الميزات', h2a: 'لماذا Enlisted Cheats في 2026', h2b: 'ESP wallhack ورadar وAimbot في ترخيص واحد', topicA: 'مثالي لقراءة فرق العدو في BR وco-op missions.', topicB: 'ترخيص واحد بدلاً من أدوات منفصلة.' },
	ja: { title: 'Enlisted Cheats 2026 | ESP・Wallhack・Aimbot', desc: 'Enlisted向けundetectedチート。ESP wallhack、radar hack、Aimbot、Darkflow Software anti-cheatメンテナンス。即時デジタル配信。', h1: 'Enlisted Cheats — Undetected ESP・Wallhack・Aimbot', intro: 'Enlisted Windows PC向けundetectedパッケージ：ESP wallhack、radar、Aimbot、Darkflow Software anti-cheatメンテナンス付き。', imageAlt: 'enlisted-cheats soldier ESP wallhackとAimbot undetected', gallery: 'Enlisted Cheatsギャラリー — ESP、Aimbot、wallhack', cta2: '機能を見る', h2a: '2026年にEnlisted Cheatsを選ぶ理由', h2b: 'ESP wallhack、radar、Aimbotが1ライセンス', topicA: 'BRとco-op missionsで敵スクワッドを読むのに最適。', topicB: '別ツールではなく1ライセンス。' },
	ko: { title: 'Enlisted Cheats 2026 | ESP, Wallhack, Aimbot', desc: 'Enlisted undetected 치트. ESP wallhack, radar hack, Aimbot, Darkflow Software anti-cheat 유지보수. 즉시 디지털 배송.', h1: 'Enlisted Cheats — Undetected ESP, Wallhack, Aimbot', intro: 'Enlisted Windows PC undetected 패키지: ESP wallhack, radar, Aimbot, Darkflow Software anti-cheat 유지보수 포함.', imageAlt: 'enlisted-cheats soldier ESP wallhack 및 Aimbot undetected', gallery: 'Enlisted Cheats 갤러리 — ESP, Aimbot, wallhack', cta2: '기능 보기', h2a: '2026년 Enlisted Cheats를 선택하는 이유', h2b: 'ESP wallhack, radar, Aimbot 단일 라이선스', topicA: 'BR 및 co-op missions에서 적 분대 읽기에 이상적.', topicB: '별도 도구 대신 단일 라이선스.' },
	zh: { title: 'Enlisted Cheats 2026 | ESP、Wallhack、Aimbot', desc: 'Enlisted undetected作弊。ESP wallhack、radar hack、Aimbot、Darkflow Software anti-cheat维护。即时数字交付。', h1: 'Enlisted Cheats — Undetected ESP、Wallhack、Aimbot', intro: 'Enlisted Windows PC undetected套餐：ESP wallhack、radar、Aimbot，含Darkflow Software anti-cheat维护。', imageAlt: 'enlisted-cheats soldier ESP wallhack与Aimbot undetected', gallery: 'Enlisted Cheats图库 — ESP、Aimbot、wallhack', cta2: '查看功能', h2a: '2026年选择Enlisted Cheats的原因', h2b: 'ESP wallhack、radar、Aimbot单一许可证', topicA: '适合在BR和co-op missions中读取敌方小队。', topicB: '一个许可证而非多个工具。' },
	hi: { title: 'Enlisted Cheats 2026 | ESP, Wallhack और Aimbot', desc: 'Enlisted undetected cheats. ESP wallhack, radar hack, Aimbot, anti-cheat maintenance. Instant digital delivery.', h1: 'Enlisted Cheats — Undetected ESP, Wallhack और Aimbot', intro: 'Enlisted Windows PC undetected पैकेज: ESP wallhack, radar, Aimbot, anti-cheat maintenance सहित.', imageAlt: 'enlisted-cheats soldier ESP wallhack और Aimbot undetected', gallery: 'Enlisted Cheats gallery — ESP, Aimbot, wallhack', cta2: 'फ़ीचर्स देखें', h2a: '2026 में Enlisted Cheats क्यों', h2b: 'ESP wallhack, radar, Aimbot एक लाइसेंस में', topicA: 'BR और co-op missions में दुश्मन squad पढ़ने के लिए आदर्श.', topicB: 'अलग टूल्स के बजाय एक लाइसेंस.' },
	id: { title: 'Enlisted Cheats 2026 | ESP, Wallhack & Aimbot', desc: 'Cheat Enlisted undetected untuk Enlisted di PC. ESP wallhack, radar hack, Aimbot, pemeliharaan Darkflow Software anti-cheat. Pengiriman digital instan.', h1: 'Enlisted Cheats — Undetected ESP, Wallhack & Aimbot', intro: 'Paket undetected Enlisted di Windows PC: ESP wallhack, radar, Aimbot dengan pemeliharaan Darkflow Software anti-cheat.', imageAlt: 'Hero enlisted-cheats ESP wallhack dan Aimbot undetected', gallery: 'Galeri Enlisted Cheats — ESP, Aimbot, wallhack', cta2: 'Lihat fitur', h2a: 'Mengapa Enlisted Cheats di 2026', h2b: 'ESP wallhack, radar, Aimbot dalam satu lisensi', topicA: 'Ideal membaca squad musuh di BR dan co-op missions.', topicB: 'Satu lisensi alih-alih alat terpisah.' },
	th: { title: 'Enlisted Cheats 2026 | ESP, Wallhack และ Aimbot', desc: 'Cheat Enlisted undetected สำหรับ Enlisted บน PC. ESP wallhack, radar hack, Aimbot, anti-cheat maintenance. จัดส่งดิจิทัลทันที.', h1: 'Enlisted Cheats — Undetected ESP, Wallhack และ Aimbot', intro: 'แพ็ก undetected สำหรับ Enlisted บน Windows PC: ESP wallhack, radar, Aimbot พร้อม anti-cheat maintenance', imageAlt: 'Hero enlisted-cheats ESP wallhack และ Aimbot undetected', gallery: 'แกลเลอรี Enlisted Cheats — ESP, Aimbot, wallhack', cta2: 'ดูฟีเจอร์', h2a: 'ทำไมเลือก Enlisted Cheats ปี 2026', h2b: 'ESP wallhack, radar, Aimbot ในใบอนุญาตเดียว', topicA: 'เหมาะสำหรับอ่าน squad ศัตรูใน BR และ co-op missions', topicB: 'ใบอนุญาตเดียวแทนเครื่องมือแยก' },
	vi: { title: 'Enlisted Cheats 2026 | ESP, Wallhack & Aimbot', desc: 'Cheat Enlisted undetected cho Enlisted trên PC. ESP wallhack, radar hack, Aimbot, bảo trì Darkflow Software anti-cheat. Giao hàng kỹ thuật số tức thì.', h1: 'Enlisted Cheats — Undetected ESP, Wallhack & Aimbot', intro: 'Gói undetected Enlisted trên Windows PC: ESP wallhack, radar, Aimbot với bảo trì Darkflow Software anti-cheat.', imageAlt: 'Hero enlisted-cheats ESP wallhack và Aimbot undetected', gallery: 'Thư viện Enlisted Cheats — ESP, Aimbot, wallhack', cta2: 'Xem tính năng', h2a: 'Vì sao chọn Enlisted Cheats 2026', h2b: 'ESP wallhack, radar, Aimbot trong một giấy phép', topicA: 'Lý tưởng đọc squad địch trong BR và co-op missions.', topicB: 'Một giấy phép thay vì công cụ riêng.' },
	uk: { title: 'Enlisted Cheats 2026 | ESP, Wallhack і Aimbot', desc: 'Undetected чіти Enlisted для Enlisted на PC. ESP wallhack, radar hack, Aimbot, обслуговування Darkflow Software anti-cheat. Мгновенная цифровая доставка.', h1: 'Enlisted Cheats — Undetected ESP, Wallhack і Aimbot', intro: 'Undetected пакет для Enlisted на Windows PC: ESP wallhack, radar, Aimbot з обслуговуванням Darkflow Software anti-cheat.', imageAlt: 'Hero enlisted-cheats з ESP wallhack і Aimbot undetected', gallery: 'Галерея Enlisted Cheats — ESP, Aimbot, wallhack', cta2: 'Дивитися функції', h2a: 'Чому Enlisted Cheats у 2026', h2b: 'ESP wallhack, radar і Aimbot в одній ліцензії', topicA: 'Ідеально для читання ворожих загонів у BR і co-op missions.', topicB: 'Одна ліцензія замість окремих інструментів.' },
	cs: { title: 'Enlisted Cheats 2026 | ESP, Wallhack a Aimbot', desc: 'Undetected Enlisted cheaty pro Enlisted na PC. ESP wallhack, radar hack, Aimbot, údržba Darkflow Software anti-cheat. Okamžité digitální doručení.', h1: 'Enlisted Cheats — Undetected ESP, Wallhack a Aimbot', intro: 'Undetected balíček pro Enlisted na Windows PC: ESP wallhack, radar, Aimbot s údržbou Darkflow Software anti-cheat.', imageAlt: 'Hero enlisted-cheats s ESP wallhack a Aimbot undetected', gallery: 'Galerie Enlisted Cheats — ESP, Aimbot, wallhack', cta2: 'Zobrazit funkce', h2a: 'Proč Enlisted Cheats v roce 2026', h2b: 'ESP wallhack, radar a Aimbot v jedné licenci', topicA: 'Ideální pro čtení nepřátelských squadů v BR a co-op missions.', topicB: 'Jedna licence místo samostatných nástrojů.' },
	ro: { title: 'Enlisted Cheats 2026 | ESP, Wallhack și Aimbot', desc: 'Cheats Enlisted undetected pentru Enlisted pe PC. ESP wallhack, radar hack, Aimbot, mentenanță Darkflow Software anti-cheat. Livrare digitală instantă.', h1: 'Enlisted Cheats — Undetected ESP, Wallhack și Aimbot', intro: 'Pachet undetected Enlisted pe Windows PC: ESP wallhack, radar, Aimbot cu mentenanță Darkflow Software anti-cheat.', imageAlt: 'Hero enlisted-cheats cu ESP wallhack și Aimbot undetected', gallery: 'Galerie Enlisted Cheats — ESP, Aimbot, wallhack', cta2: 'Vezi funcții', h2a: 'De ce Enlisted Cheats în 2026', h2b: 'ESP wallhack, radar și Aimbot într-o licență', topicA: 'Ideal pentru citirea squad-urilor inamice în BR și co-op missions.', topicB: 'O licență în loc de instrumente separate.' },
	sv: { title: 'Enlisted Cheats 2026 | ESP, Wallhack & Aimbot', desc: 'Undetected Enlisted cheats för Enlisted på PC. ESP wallhack, radar hack, Aimbot, Darkflow Software anti-cheat-underhåll. Omedelbar digital leverans.', h1: 'Enlisted Cheats — Undetected ESP, Wallhack & Aimbot', intro: 'Undetected paket för Enlisted på Windows PC: ESP wallhack, radar, Aimbot med Darkflow Software anti-cheat-underhåll.', imageAlt: 'Enlisted-cheats hero med ESP wallhack och Aimbot undetected', gallery: 'Enlisted Cheats galleri — ESP, Aimbot, wallhack', cta2: 'Se funktioner', h2a: 'Varför Enlisted Cheats 2026', h2b: 'ESP wallhack, radar och Aimbot i en licens', topicA: 'Ideal för att läsa fiendesquads i BR och co-op missions.', topicB: 'En licens istället för separata verktyg.' },
};

function buildHome(locale) {
	const p = phrases[locale];
	const m = PAGE_META_HOME[locale];
	return {
		title: clampTitle(stripZadeyoFromMeta(m.title)),
		description: clampDesc(stripZadeyoFromMeta(m.desc)),
		h1: m.h1,
		intro: m.intro,
		imageAlt: m.imageAlt,
		galleryTitle: m.gallery,
		heroImage: HERO_IMAGES.home,
		ctaPrimary: p.buy,
		ctaSecondary: m.cta2,
		ctaSecondaryHref: '/features/',
		sections: [
			section(m.h2a, p.s1(m.topicA), p.s2()),
			section(m.h2b, p.s1(m.topicB), p.s3()),
		],
	};
}

/** Unique English title/desc tails per page — avoids identical "| ESP wallhack & Aimbot" across locales. */
const PAGE_META_TAILS = {
	'enlisted-esp': { suffix: 'enemy boxes & Wallhack', focus: 'enemy boxes, medkit markers, and wallhack overlays' },
	'enlisted-aimbot': { suffix: 'Soft Aim Controls', focus: 'soft aim, FOV, and per-weapon Aimbot profiles' },
	features: { suffix: 'Full Feature List', focus: 'ESP, soft aim, radar, and cloud DMA controls' },
	pricing: { suffix: 'Monthly & Lifetime', focus: '$35 monthly or $150 lifetime licenses' },
	setup: { suffix: 'PC Setup Guide', focus: 'Windows PC activation and first-launch setup' },
	updates: { suffix: 'Anti-cheat maintenance Log', focus: 'anti-cheat patch status and rebuild notes' },
	faq: { suffix: 'Common Answers', focus: 'ESP, soft aim, delivery, and anti-cheat questions' },
	support: { suffix: 'Help & Contact', focus: 'order help and license support contact' },
	undetected: { suffix: 'Anti-cheat safe Status', focus: 'undetected maintenance after Darkflow Software anti-cheat patches' },
	wallhack: { suffix: 'ESP Visibility', focus: 'wallhack ESP for players, loot, and distance' },
	radar: { suffix: '2D Threat Overlay', focus: '2D radar cues for flanks and rotations' },
	'eac-bypass': { suffix: 'Patch Maintenance', focus: 'how anti-cheat updates are handled for Enlisted Cheats' },
	'cheats-2026': { suffix: 'Buyer Guide', focus: '2026 Enlisted cheats checklist before checkout' },
	hacks: { suffix: 'ESP Aimbot Guide', focus: 'the Enlisted Cheats pillar for ESP and Aimbot' },
	'cheat-download': { suffix: 'Instant Access', focus: 'digital license download after payment' },
	'mod-menu': { suffix: 'In-Game Toggles', focus: 'in-client ESP and soft aim toggles' },
	'soft-aim': { suffix: 'Smooth Aim Settings', focus: 'smooth soft aim settings for PC and controllers' },
	'best-cheats': { suffix: 'Buyer Checklist', focus: 'what to compare before buying Enlisted cheats' },
	'aimbot-hack': { suffix: 'Soft Aim Assist', focus: 'undetected Aimbot hack assist for Enlisted' },
	'esp-hack': { suffix: 'Boxes & Loot', focus: 'ESP hack boxes, loot pins, and distance' },
	'unlock-all': { suffix: 'What It Means', focus: 'unlock-all searches vs real ESP and Aimbot tools' },
};

function productPage(locale, pageKey, topicName, cta2href) {
	const p = phrases[locale];
	const home = PAGE_META_HOME[locale];
	const meta = PAGE_META_TAILS[pageKey] ?? { suffix: 'Enlisted Cheats', focus: 'ESP wallhack, radar, and Aimbot' };
	let titleBase = topicName.includes('2026')
		? `${topicName} | ${meta.suffix}`
		: `${topicName} 2026 | ${meta.suffix}`;
	// Short topic labels (FAQ, Support, etc.) need brand context for usable SERP titles.
	if (titleBase.length < 35) {
		titleBase = `${topicName} 2026 | Enlisted Cheats ${meta.suffix}`;
	}
	return {
		title: clampTitle(stripZadeyoFromMeta(titleBase)),
		description: clampDesc(
			stripZadeyoFromMeta(
				`${topicName}: ${meta.focus} for Enlisted. ${p.delivery}. anti-cheat maintenance included.`,
			),
		),
		h1: `${topicName} — ${meta.suffix}`,
		intro: p.s1(`${topicName} for ${p.maps}: ${meta.focus}.`),
		imageAlt: `enlisted-cheats ${pageKey} ${meta.focus} preview`,
		galleryTitle: `Enlisted Cheats ${topicName} gallery`,
		heroImage: HERO_IMAGES[pageKey],
		ctaPrimary: p.buy,
		ctaSecondary: home.cta2,
		ctaSecondaryHref: cta2href,
		sections: [
			section(`${topicName} — ${p.maps}`, p.s1(`Read enemy units with ESP wallhack.`), p.s2()),
			section(`ESP wallhack & ${p.undetected}`, p.s1('Toggle overlays for large-scale battles and frontline campaigns.'), p.s3()),
			section(`${p.delivery}`, p.s2(), p.s3()),
		],
	};
}

const TOPIC_NAMES = {
	'enlisted-esp': { en: 'Enlisted ESP', es: 'Enlisted ESP', fr: 'Enlisted ESP', de: 'Enlisted ESP', pt: 'Enlisted ESP', it: 'Enlisted ESP', nl: 'Enlisted ESP', pl: 'Enlisted ESP', ru: 'Enlisted ESP', tr: 'Enlisted ESP', ar: 'Enlisted ESP', ja: 'Enlisted ESP', ko: 'Enlisted ESP', zh: 'Enlisted ESP', hi: 'Enlisted ESP', id: 'Enlisted ESP', th: 'Enlisted ESP', vi: 'Enlisted ESP', uk: 'Enlisted ESP', cs: 'Enlisted ESP', ro: 'Enlisted ESP', sv: 'Enlisted ESP' },
	'enlisted-aimbot': { en: 'Enlisted Aimbot', es: 'Enlisted Aimbot', fr: 'Enlisted Aimbot', de: 'Enlisted Aimbot', pt: 'Enlisted Aimbot', it: 'Enlisted Aimbot', nl: 'Enlisted Aimbot', pl: 'Enlisted Aimbot', ru: 'Enlisted Aimbot', tr: 'Enlisted Aimbot', ar: 'Enlisted Aimbot', ja: 'Enlisted Aimbot', ko: 'Enlisted Aimbot', zh: 'Enlisted Aimbot', hi: 'Enlisted Aimbot', id: 'Enlisted Aimbot', th: 'Enlisted Aimbot', vi: 'Enlisted Aimbot', uk: 'Enlisted Aimbot', cs: 'Enlisted Aimbot', ro: 'Enlisted Aimbot', sv: 'Enlisted Aimbot' },
	features: { en: 'Features', es: 'Funciones', fr: 'Fonctions', de: 'Features', pt: 'Recursos', it: 'Funzioni', nl: 'Functies', pl: 'Funkcje', ru: 'Функции', tr: 'Özellikler', ar: 'الميزات', ja: '機能', ko: '기능', zh: '功能', hi: 'फ़ीचर्स', id: 'Fitur', th: 'ฟีเจอร์', vi: 'Tính năng', uk: 'Функції', cs: 'Funkce', ro: 'Funcții', sv: 'Funktioner' },
	pricing: { en: 'Pricing', es: 'Precios', fr: 'Tarifs', de: 'Preise', pt: 'Preços', it: 'Prezzi', nl: 'Prijzen', pl: 'Cennik', ru: 'Цены', tr: 'Fiyatlar', ar: 'الأسعار', ja: '料金', ko: '가격', zh: '价格', hi: 'कीमत', id: 'Harga', th: 'ราคา', vi: 'Giá', uk: 'Ціни', cs: 'Ceny', ro: 'Prețuri', sv: 'Priser' },
	setup: { en: 'Setup', es: 'Instalación', fr: 'Installation', de: 'Setup', pt: 'Instalação', it: 'Setup', nl: 'Setup', pl: 'Instalacja', ru: 'Установка', tr: 'Kurulum', ar: 'التثبيت', ja: 'セットアップ', ko: '설치', zh: '安装', hi: 'सेटअप', id: 'Setup', th: 'ติดตั้ง', vi: 'Cài đặt', uk: 'Встановлення', cs: 'Instalace', ro: 'Instalare', sv: 'Installation' },
	updates: { en: 'Updates', es: 'Actualizaciones', fr: 'Mises à jour', de: 'Updates', pt: 'Atualizações', it: 'Aggiornamenti', nl: 'Updates', pl: 'Aktualizacje', ru: 'Обновления', tr: 'Güncellemeler', ar: 'التحديثات', ja: '更新', ko: '업데이트', zh: '更新', hi: 'अपडेट', id: 'Pembaruan', th: 'อัปเดต', vi: 'Cập nhật', uk: 'Оновлення', cs: 'Aktualizace', ro: 'Actualizări', sv: 'Uppdateringar' },
	faq: { en: 'FAQ', es: 'FAQ', fr: 'FAQ', de: 'FAQ', pt: 'FAQ', it: 'FAQ', nl: 'FAQ', pl: 'FAQ', ru: 'FAQ', tr: 'SSS', ar: 'الأسئلة', ja: 'FAQ', ko: 'FAQ', zh: '常见问题', hi: 'FAQ', id: 'FAQ', th: 'FAQ', vi: 'FAQ', uk: 'FAQ', cs: 'FAQ', ro: 'FAQ', sv: 'FAQ' },
	support: { en: 'Support', es: 'Soporte', fr: 'Support', de: 'Support', pt: 'Suporte', it: 'Supporto', nl: 'Support', pl: 'Wsparcie', ru: 'Поддержка', tr: 'Destek', ar: 'الدعم', ja: 'サポート', ko: '지원', zh: '支持', hi: 'सहायता', id: 'Dukungan', th: 'สนับสนุน', vi: 'Hỗ trợ', uk: 'Підтримка', cs: 'Podpora', ro: 'Suport', sv: 'Support' },
	undetected: { en: 'Undetected Cheats', es: 'Trucos indetectables', fr: 'Triches indétectables', de: 'Undetected Cheats', pt: 'Cheats indetectáveis', it: 'Cheat indetectable', nl: 'Undetected Cheats', pl: 'Cheaty undetected', ru: 'Undetected читы', tr: 'Undetected hileler', ar: 'غش undetected', ja: 'Undetectedチート', ko: 'Undetected 치트', zh: 'Undetected作弊', hi: 'Undetected cheats', id: 'Cheat undetected', th: 'Cheats undetected', vi: 'Cheat undetected', uk: 'Undetected чіти', cs: 'Undetected cheaty', ro: 'Cheats undetected', sv: 'Undetected cheats' },
	wallhack: { en: 'Enlisted Wallhack', es: 'Enlisted Wallhack', fr: 'Enlisted Wallhack', de: 'Enlisted Wallhack', pt: 'Enlisted Wallhack', it: 'Enlisted Wallhack', nl: 'Enlisted Wallhack', pl: 'Enlisted Wallhack', ru: 'Enlisted Wallhack', tr: 'Enlisted Wallhack', ar: 'Enlisted Wallhack', ja: 'Enlisted Wallhack', ko: 'Enlisted Wallhack', zh: 'Enlisted Wallhack', hi: 'Enlisted Wallhack', id: 'Enlisted Wallhack', th: 'Enlisted Wallhack', vi: 'Enlisted Wallhack', uk: 'Enlisted Wallhack', cs: 'Enlisted Wallhack', ro: 'Enlisted Wallhack', sv: 'Enlisted Wallhack' },
	radar: { en: 'Radar Hack', es: 'Radar hack', fr: 'Radar hack', de: 'Radar Hack', pt: 'Radar hack', it: 'Radar hack', nl: 'Radar Hack', pl: 'Radar hack', ru: 'Radar hack', tr: 'Radar hack', ar: 'Radar hack', ja: 'Radar Hack', ko: 'Radar Hack', zh: 'Radar Hack', hi: 'Radar Hack', id: 'Radar hack', th: 'Radar Hack', vi: 'Radar hack', uk: 'Radar hack', cs: 'Radar Hack', ro: 'Radar hack', sv: 'Radar Hack' },
	'eac-bypass': { en: 'Anti-cheat bypass', es: 'Bypass Darkflow Software anti-cheat', fr: 'Bypass Darkflow Software anti-cheat', de: 'Anti-cheat bypass', pt: 'Bypass Darkflow Software anti-cheat', it: 'Bypass Darkflow Software anti-cheat', nl: 'Anti-cheat bypass', pl: 'Bypass Darkflow Software anti-cheat', ru: 'Bypass Darkflow Software anti-cheat', tr: 'anti-cheat bypass', ar: 'Bypass Darkflow Software anti-cheat', ja: 'Anti-cheat bypass', ko: 'Anti-cheat bypass', zh: 'Anti-cheat bypass', hi: 'Anti-cheat bypass', id: 'Bypass Darkflow Software anti-cheat', th: 'Anti-cheat bypass', vi: 'Bypass Darkflow Software anti-cheat', uk: 'Bypass Darkflow Software anti-cheat', cs: 'Anti-cheat bypass', ro: 'Bypass Darkflow Software anti-cheat', sv: 'Anti-cheat bypass' },
	'cheats-2026': { en: 'Enlisted Cheats 2026', es: 'Enlisted Cheats 2026', fr: 'Enlisted Cheats 2026', de: 'Enlisted Cheats 2026', pt: 'Enlisted Cheats 2026', it: 'Enlisted Cheats 2026', nl: 'Enlisted Cheats 2026', pl: 'Enlisted Cheats 2026', ru: 'Enlisted Cheats 2026', tr: 'Enlisted Cheats 2026', ar: 'Enlisted Cheats 2026', ja: 'Enlisted Cheats 2026', ko: 'Enlisted Cheats 2026', zh: 'Enlisted Cheats 2026', hi: 'Enlisted Cheats 2026', id: 'Enlisted Cheats 2026', th: 'Enlisted Cheats 2026', vi: 'Enlisted Cheats 2026', uk: 'Enlisted Cheats 2026', cs: 'Enlisted Cheats 2026', ro: 'Enlisted Cheats 2026', sv: 'Enlisted Cheats 2026' },
	hacks: { en: 'Enlisted Cheats', es: 'Enlisted Cheats', fr: 'Enlisted Cheats', de: 'Enlisted Cheats', pt: 'Enlisted Cheats', it: 'Enlisted Cheats', nl: 'Enlisted Cheats', pl: 'Enlisted Cheats', ru: 'Enlisted Cheats', tr: 'Enlisted Cheats', ar: 'Enlisted Cheats', ja: 'Enlisted Cheats', ko: 'Enlisted Cheats', zh: 'Enlisted Cheats', hi: 'Enlisted Cheats', id: 'Enlisted Cheats', th: 'Enlisted Cheats', vi: 'Enlisted Cheats', uk: 'Enlisted Cheats', cs: 'Enlisted Cheats', ro: 'Enlisted Cheats', sv: 'Enlisted Cheats' },
	'cheat-download': { en: 'Enlisted Cheats Download', es: 'Descarga Enlisted Cheats', fr: 'Téléchargement Enlisted Cheats', de: 'Enlisted Cheats Download', pt: 'Download Enlisted Cheats', it: 'Download Enlisted Cheats', nl: 'Enlisted Cheats Download', pl: 'Pobieranie Enlisted Cheats', ru: 'Скачать Enlisted Cheats', tr: 'Enlisted Hile İndir', ar: 'Enlisted Cheats Download', ja: 'Enlisted Cheats Download', ko: 'Enlisted Cheats Download', zh: 'Enlisted Cheats Download', hi: 'Enlisted Cheats Download', id: 'Enlisted Cheats Download', th: 'Enlisted Cheats Download', vi: 'Enlisted Cheats Download', uk: 'Завантаження Enlisted Cheats', cs: 'Enlisted Cheats Download', ro: 'Descărcare Enlisted Cheats', sv: 'Enlisted Cheats Download' },
	'mod-menu': { en: 'Enlisted Mod Menu', es: 'Enlisted Mod Menu', fr: 'Enlisted Mod Menu', de: 'Enlisted Mod Menu', pt: 'Enlisted Mod Menu', it: 'Enlisted Mod Menu', nl: 'Enlisted Mod Menu', pl: 'Enlisted Mod Menu', ru: 'Enlisted Mod Menu', tr: 'Enlisted Mod Menu', ar: 'Enlisted Mod Menu', ja: 'Enlisted Mod Menu', ko: 'Enlisted Mod Menu', zh: 'Enlisted Mod Menu', hi: 'Enlisted Mod Menu', id: 'Enlisted Mod Menu', th: 'Enlisted Mod Menu', vi: 'Enlisted Mod Menu', uk: 'Enlisted Mod Menu', cs: 'Enlisted Mod Menu', ro: 'Enlisted Mod Menu', sv: 'Enlisted Mod Menu' },
	'soft-aim': { en: 'Enlisted Soft Aim', es: 'Enlisted Soft Aim', fr: 'Enlisted Soft Aim', de: 'Enlisted Soft Aim', pt: 'Enlisted Soft Aim', it: 'Enlisted Soft Aim', nl: 'Enlisted Soft Aim', pl: 'Enlisted Soft Aim', ru: 'Enlisted Soft Aim', tr: 'Enlisted Soft Aim', ar: 'Enlisted Soft Aim', ja: 'Enlisted Soft Aim', ko: 'Enlisted Soft Aim', zh: 'Enlisted Soft Aim', hi: 'Enlisted Soft Aim', id: 'Enlisted Soft Aim', th: 'Enlisted Soft Aim', vi: 'Enlisted Soft Aim', uk: 'Enlisted Soft Aim', cs: 'Enlisted Soft Aim', ro: 'Enlisted Soft Aim', sv: 'Enlisted Soft Aim' },
	'best-cheats': { en: 'Best Enlisted Cheats', es: 'Mejores Enlisted Cheats', fr: 'Meilleures Enlisted Cheats', de: 'Beste Enlisted Cheats', pt: 'Melhores Enlisted Cheats', it: 'Migliori Enlisted Cheats', nl: 'Beste Enlisted Cheats', pl: 'Najlepsze Enlisted Cheats', ru: 'Лучшие Enlisted Cheats', tr: 'En İyi Enlisted Hileleri', ar: 'Best Enlisted Cheats', ja: 'Best Enlisted Cheats', ko: 'Best Enlisted Cheats', zh: 'Best Enlisted Cheats', hi: 'Best Enlisted Cheats', id: 'Best Enlisted Cheats', th: 'Best Enlisted Cheats', vi: 'Best Enlisted Cheats', uk: 'Найкращі Enlisted Cheats', cs: 'Nejlepší Enlisted Cheats', ro: 'Cele mai bune Enlisted Cheats', sv: 'Bästa Enlisted Cheats' },
	'aimbot-hack': { en: 'Enlisted Aimbot Hack', es: 'Enlisted Aimbot Hack', fr: 'Enlisted Aimbot Hack', de: 'Enlisted Aimbot Hack', pt: 'Enlisted Aimbot Hack', it: 'Enlisted Aimbot Hack', nl: 'Enlisted Aimbot Hack', pl: 'Enlisted Aimbot Hack', ru: 'Enlisted Aimbot Hack', tr: 'Enlisted Aimbot Hack', ar: 'Enlisted Aimbot Hack', ja: 'Enlisted Aimbot Hack', ko: 'Enlisted Aimbot Hack', zh: 'Enlisted Aimbot Hack', hi: 'Enlisted Aimbot Hack', id: 'Enlisted Aimbot Hack', th: 'Enlisted Aimbot Hack', vi: 'Enlisted Aimbot Hack', uk: 'Enlisted Aimbot Hack', cs: 'Enlisted Aimbot Hack', ro: 'Enlisted Aimbot Hack', sv: 'Enlisted Aimbot Hack' },
	'esp-hack': { en: 'Enlisted ESP Hack', es: 'Enlisted ESP Hack', fr: 'Enlisted ESP Hack', de: 'Enlisted ESP Hack', pt: 'Enlisted ESP Hack', it: 'Enlisted ESP Hack', nl: 'Enlisted ESP Hack', pl: 'Enlisted ESP Hack', ru: 'Enlisted ESP Hack', tr: 'Enlisted ESP Hack', ar: 'Enlisted ESP Hack', ja: 'Enlisted ESP Hack', ko: 'Enlisted ESP Hack', zh: 'Enlisted ESP Hack', hi: 'Enlisted ESP Hack', id: 'Enlisted ESP Hack', th: 'Enlisted ESP Hack', vi: 'Enlisted ESP Hack', uk: 'Enlisted ESP Hack', cs: 'Enlisted ESP Hack', ro: 'Enlisted ESP Hack', sv: 'Enlisted ESP Hack' },
	'unlock-all': { en: 'Enlisted Unlock All', es: 'Enlisted Unlock All', fr: 'Enlisted Unlock All', de: 'Enlisted Unlock All', pt: 'Enlisted Unlock All', it: 'Enlisted Unlock All', nl: 'Enlisted Unlock All', pl: 'Enlisted Unlock All', ru: 'Enlisted Unlock All', tr: 'Enlisted Unlock All', ar: 'Enlisted Unlock All', ja: 'Enlisted Unlock All', ko: 'Enlisted Unlock All', zh: 'Enlisted Unlock All', hi: 'Enlisted Unlock All', id: 'Enlisted Unlock All', th: 'Enlisted Unlock All', vi: 'Enlisted Unlock All', uk: 'Enlisted Unlock All', cs: 'Enlisted Unlock All', ro: 'Enlisted Unlock All', sv: 'Enlisted Unlock All' },
};

const CTA2_HREF = {
	'enlisted-esp': '/enlisted-wallhack/',
	'enlisted-aimbot': '/enlisted-esp/',
	features: '/pricing/',
	pricing: '/setup/',
	setup: '/support/',
	updates: '/enlisted-cheats/',
	faq: '/support/',
	support: '/setup/',
	undetected: '/enlisted-cheats/',
	wallhack: '/enlisted-esp/',
	radar: '/enlisted-esp/',
	'eac-bypass': '/updates/',
	'cheats-2026': '/features/',
	hacks: '/enlisted-cheats/',
	'cheat-download': '/setup/',
	'mod-menu': '/features/',
	'soft-aim': '/enlisted-aimbot/',
	'best-cheats': '/pricing/',
	'aimbot-hack': '/enlisted-aimbot/',
	'esp-hack': '/enlisted-esp/',
	'unlock-all': '/features/',
};

function buildLegal(locale, pageKey, kind) {
	const p = phrases[locale];
	const titles = {
		privacy: { es: 'Política de privacidad', fr: 'Politique de confidentialité', de: 'Datenschutz', pt: 'Política de privacidade', it: 'Informativa privacy', nl: 'Privacybeleid', pl: 'Polityka prywatności', ru: 'Политика конфиденциальности', tr: 'Gizlilik politikası', ar: 'سياسة الخصوصية', ja: 'プライバシーポリシー', ko: '개인정보 처리방침', zh: '隐私政策', hi: 'गोपनीयता नीति', id: 'Kebijakan privasi', th: 'นโยบายความเป็นส่วนตัว', vi: 'Chính sách bảo mật', uk: 'Політика конфіденційності', cs: 'Zásady ochrany soukromí', ro: 'Politica de confidențialitate', sv: 'Integritetspolicy' },
		refund: { es: 'Política de reembolso', fr: 'Politique de remboursement', de: 'Rückerstattung', pt: 'Política de reembolso', it: 'Politica di rimborso', nl: 'Restitutiebeleid', pl: 'Polityka zwrotów', ru: 'Политика возврата', tr: 'İade politikası', ar: 'سياسة الاسترداد', ja: '返金ポリシー', ko: '환불 정책', zh: '退款政策', hi: 'रिफंड नीति', id: 'Kebijakan refund', th: 'นโยบายการคืนเงิน', vi: 'Chính sách hoàn tiền', uk: 'Політика повернення', cs: 'Zásady vrácení peněz', ro: 'Politica de rambursare', sv: 'Återbetalningspolicy' },
		terms: { es: 'Términos de uso', fr: 'Conditions d\'utilisation', de: 'Nutzungsbedingungen', pt: 'Termos de uso', it: 'Termini di utilizzo', nl: 'Gebruiksvoorwaarden', pl: 'Warunki użytkowania', ru: 'Условия использования', tr: 'Kullanım şartları', ar: 'شروط الاستخدام', ja: '利用規約', ko: '이용 약관', zh: '使用条款', hi: 'उपयोग की शर्तें', id: 'Syarat penggunaan', th: 'ข้อกำหนดการใช้งาน', vi: 'Điều khoản sử dụng', uk: 'Умови використання', cs: 'Podmínky použití', ro: 'Termeni de utilizare', sv: 'Användarvillkor' },
	};
	const h1 = titles[kind][locale] ?? (kind === 'privacy' ? 'Privacy Policy' : kind === 'refund' ? 'Refund Policy' : 'Terms of Use');
	return {
		title: clampTitle(stripZadeyoFromMeta(`${h1} | Enlisted Cheats`)),
		description: clampDesc(stripZadeyoFromMeta(`${h1} for Enlisted Cheats — ESP wallhack, Aimbot, ${p.win}.`)),
		h1,
		intro: p.s1(`${h1} for enlistedcheats.org and Enlisted licenses.`),
		imageAlt: `enlisted-cheats ${kind} ESP wallhack Aimbot legal page`,
		galleryTitle: `Enlisted Cheats ${kind} supplys`,
		heroImage: HERO_IMAGES[pageKey],
		ctaPrimary: locale === 'ar' ? 'مراسلة الدعم' : locale === 'ja' ? 'サポートにメール' : locale === 'ko' ? '지원 이메일' : locale === 'zh' ? '邮件支持' : 'Email support',
		ctaSecondary: kind === 'privacy' ? (locale === 'es' ? 'Leer términos' : locale === 'fr' ? 'Lire conditions' : locale === 'de' ? 'Nutzungsbedingungen' : locale === 'ar' ? 'اقرأ الشروط' : locale === 'ja' ? '利用規約' : 'Read terms') : kind === 'refund' ? (locale === 'es' ? 'Leer privacidad' : 'Read privacy') : (locale === 'es' ? 'Leer privacidad' : 'Read privacy'),
		ctaSecondaryHref: kind === 'privacy' ? '/terms/' : '/privacy-policy/',
		sections: [
			section(
				kind === 'privacy' ? (locale === 'es' ? 'Información que recopilamos' : locale === 'fr' ? 'Informations collectées' : locale === 'de' ? 'Erhobene Daten' : locale === 'ar' ? 'المعلومات التي نجمعها' : locale === 'ja' ? '収集する情報' : 'Information we collect') :
				kind === 'refund' ? (locale === 'es' ? 'Entrega digital' : locale === 'fr' ? 'Livraison numérique' : locale === 'de' ? 'Digitale Lieferung' : locale === 'ar' ? 'التسليم الرقمي' : locale === 'ja' ? 'デジタル配信' : 'Digital delivery') :
				(locale === 'es' ? 'Aceptación de términos' : locale === 'fr' ? 'Acceptation' : locale === 'de' ? 'Annahme' : locale === 'ar' ? 'قبول الشروط' : locale === 'ja' ? '規約への同意' : 'Acceptance of terms'),
				p.s1('Contact email, Zadeyo order references, and basic site security data.'),
				kind === 'privacy' ? 'Payment details are processed by Zadeyo checkout — not stored on enlistedcheats.org.' : p.s2(),
			),
			section(
				kind === 'privacy' ? (locale === 'es' ? 'Uso de la información' : locale === 'fr' ? 'Utilisation' : locale === 'de' ? 'Datennutzung' : locale === 'ar' ? 'استخدام المعلومات' : locale === 'ja' ? '情報の利用' : 'How we use data') :
				kind === 'refund' ? (locale === 'es' ? 'Cuándo se aprueba' : locale === 'fr' ? 'Approbation' : locale === 'de' ? 'Genehmigung' : locale === 'ar' ? 'موافقة الاسترداد' : locale === 'ja' ? '返金承認' : 'Refund approval') :
				(locale === 'es' ? 'Riesgos y anti-cheat' : locale === 'fr' ? 'Risques' : locale === 'de' ? 'Risiko' : locale === 'ar' ? 'المخاطر' : locale === 'ja' ? 'リスク' : 'Risk disclaimer'),
				p.s1('Support responses, order resolution, and legal compliance when required.'),
				kind === 'terms' ? 'Using cheats may violate Enlisted terms — you assume all ban risk.' : p.s3(),
			),
			section(
				kind === 'privacy' ? (locale === 'es' ? 'Tus derechos' : locale === 'fr' ? 'Vos droits' : locale === 'de' ? 'Ihre Rechte' : locale === 'ar' ? 'حقوقك' : locale === 'ja' ? 'あなたの権利' : 'Your rights') :
				kind === 'refund' ? (locale === 'es' ? 'Cómo solicitar' : locale === 'fr' ? 'Comment demander' : locale === 'de' ? 'Anfrage stellen' : locale === 'ar' ? 'كيفية الطلب' : locale === 'ja' ? '申請方法' : 'How to request') :
				(locale === 'es' ? 'Cambios' : locale === 'fr' ? 'Modifications' : locale === 'de' ? 'Änderungen' : locale === 'ar' ? 'التغييرات' : locale === 'ja' ? '変更' : 'Policy changes'),
				p.legal(),
				'Email: support@enlistedcheats.org',
			),
		],
	};
}

/** Build all pages for a non-English locale. */
export function buildPagesForLocale(locale) {
	const pages = { home: buildHome(locale) };
	for (const [pageKey, names] of Object.entries(TOPIC_NAMES)) {
		pages[pageKey] = productPage(locale, pageKey, names[locale], CTA2_HREF[pageKey]);
	}
	for (const kind of ['privacy', 'refund', 'terms']) {
		pages[kind] = buildLegal(locale, kind, kind);
	}
	return pages;
}
