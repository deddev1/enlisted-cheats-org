export type LocaleCode =
	| 'en'
	| 'es'
	| 'fr'
	| 'de'
	| 'pt'
	| 'it'
	| 'nl'
	| 'pl'
	| 'ru'
	| 'tr'
	| 'ar'
	| 'ja'
	| 'ko'
	| 'zh'
	| 'hi'
	| 'id'
	| 'th'
	| 'vi'
	| 'uk'
	| 'cs'
	| 'ro'
	| 'sv';

export type LocaleMeta = {
	code: LocaleCode;
	name: string;
	nativeName: string;
	hreflang: string;
	ogLocale: string;
	dir: 'ltr' | 'rtl';
	region: string;
};

/**
 * UI locales (language switcher / `/{lang}/…` routes).
 * All locales are included in sitemaps and indexable.
 * @see `seoIndexableLocales`, `includeLocaleUrlsInSitemap`
 */
export const locales: LocaleMeta[] = [
	{ code: 'en', name: 'English', nativeName: 'English', hreflang: 'en', ogLocale: 'en_US', dir: 'ltr', region: 'Worldwide' },
	{ code: 'es', name: 'Spanish', nativeName: 'Español', hreflang: 'es', ogLocale: 'es_ES', dir: 'ltr', region: 'Spain & Latin America' },
	{ code: 'fr', name: 'French', nativeName: 'Français', hreflang: 'fr', ogLocale: 'fr_FR', dir: 'ltr', region: 'France & Africa' },
	{ code: 'de', name: 'German', nativeName: 'Deutsch', hreflang: 'de', ogLocale: 'de_DE', dir: 'ltr', region: 'Germany & DACH' },
	{ code: 'pt', name: 'Portuguese', nativeName: 'Português', hreflang: 'pt', ogLocale: 'pt_BR', dir: 'ltr', region: 'Brazil & Portugal' },
	{ code: 'it', name: 'Italian', nativeName: 'Italiano', hreflang: 'it', ogLocale: 'it_IT', dir: 'ltr', region: 'Italy' },
	{ code: 'nl', name: 'Dutch', nativeName: 'Nederlands', hreflang: 'nl', ogLocale: 'nl_NL', dir: 'ltr', region: 'Netherlands & Belgium' },
	{ code: 'pl', name: 'Polish', nativeName: 'Polski', hreflang: 'pl', ogLocale: 'pl_PL', dir: 'ltr', region: 'Poland' },
	{ code: 'ru', name: 'Russian', nativeName: 'Русский', hreflang: 'ru', ogLocale: 'ru_RU', dir: 'ltr', region: 'Russia & CIS' },
	{ code: 'tr', name: 'Turkish', nativeName: 'Türkçe', hreflang: 'tr', ogLocale: 'tr_TR', dir: 'ltr', region: 'Turkey' },
	{ code: 'ar', name: 'Arabic', nativeName: 'العربية', hreflang: 'ar', ogLocale: 'ar_SA', dir: 'rtl', region: 'Middle East & North Africa' },
	{ code: 'ja', name: 'Japanese', nativeName: '日本語', hreflang: 'ja', ogLocale: 'ja_JP', dir: 'ltr', region: 'Japan' },
	{ code: 'ko', name: 'Korean', nativeName: '한국어', hreflang: 'ko', ogLocale: 'ko_KR', dir: 'ltr', region: 'South Korea' },
	{ code: 'zh', name: 'Chinese', nativeName: '中文', hreflang: 'zh', ogLocale: 'zh_CN', dir: 'ltr', region: 'China & Singapore' },
	{ code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', hreflang: 'hi', ogLocale: 'hi_IN', dir: 'ltr', region: 'India' },
	{ code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', hreflang: 'id', ogLocale: 'id_ID', dir: 'ltr', region: 'Indonesia' },
	{ code: 'th', name: 'Thai', nativeName: 'ไทย', hreflang: 'th', ogLocale: 'th_TH', dir: 'ltr', region: 'Thailand' },
	{ code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', hreflang: 'vi', ogLocale: 'vi_VN', dir: 'ltr', region: 'Vietnam' },
	{ code: 'uk', name: 'Ukrainian', nativeName: 'Українська', hreflang: 'uk', ogLocale: 'uk_UA', dir: 'ltr', region: 'Ukraine' },
	{ code: 'cs', name: 'Czech', nativeName: 'Čeština', hreflang: 'cs', ogLocale: 'cs_CZ', dir: 'ltr', region: 'Czech Republic' },
	{ code: 'ro', name: 'Romanian', nativeName: 'Română', hreflang: 'ro', ogLocale: 'ro_RO', dir: 'ltr', region: 'Romania' },
	{ code: 'sv', name: 'Swedish', nativeName: 'Svenska', hreflang: 'sv', ogLocale: 'sv_SE', dir: 'ltr', region: 'Sweden & Nordics' },
];

/** Official / canonical locale — English global pages at site root. */
export const defaultLocale: LocaleCode = 'en';

export const localeCodes = locales.map((l) => l.code);

/** All locales are indexable and listed in per-locale sitemaps. */
export const seoIndexableLocales: readonly LocaleCode[] = localeCodes;

/** Include localized URLs in per-locale sitemaps and sitemap-i18n.xml. */
export const includeLocaleUrlsInSitemap = true;

export const localeMap = Object.fromEntries(locales.map((l) => [l.code, l])) as Record<
	LocaleCode,
	LocaleMeta
>;

export function isLocaleCode(value: string): value is LocaleCode {
	return localeCodes.includes(value as LocaleCode);
}

export function getLocale(code: string): LocaleMeta | undefined {
	return isLocaleCode(code) ? localeMap[code] : undefined;
}

/** UI strings for blog index pages per locale. */
export const blogUi: Record<
	LocaleCode,
	{
		blogTitle: string;
		blogDescription: string;
		blogH1: string;
		blogIntro: string;
		readMore: string;
		published: string;
		updated: string;
		relatedPosts: string;
		allPosts: string;
		home: string;
		language: string;
	}
> = {
	en: {
		blogTitle: 'Enlisted Guides & Blog | Game Tips & Product Intel',
		blogDescription:
			'Enlisted game guides on campaign missions, battlefield, factions, missions, and patch notes — plus ESP, aimbot, and anti-cheat product guides with official Wiki links.',
		blogH1: 'Enlisted Guides & Intel',
		blogIntro:
			'Game guides for campaign missions, battlefield farming, factions, mission types, and patch notes — linked to the Enlisted Wiki and Gaijin. Plus product guides for ESP, soft aim, radar, and anti-cheat maintenance.',
		readMore: 'Read guide',
		published: 'Published',
		updated: 'Updated',
		relatedPosts: 'Related Enlisted guides',
		allPosts: 'All blog posts',
		home: 'Enlisted Cheats home',
		language: 'Language',
	},
	es: {
		blogTitle: 'Blog Enlisted Cheats 2026 | Guías en 22 idiomas',
		blogDescription:
			'Blog de Enlisted Cheats con guías de trucos indetectables, ESP wallhack, radar y Aimbot para Enlisted en PC Windows.',
		blogH1: 'Blog Enlisted Cheats — Guías globales',
		blogIntro:
			'Guías SEO de trucos Enlisted indetectables, ESP wallhack, radar hack, Aimbot y mantenimiento Gaijin anti-cheat (EAC) en 22 idiomas.',
		readMore: 'Leer guía',
		published: 'Publicado',
		updated: 'Actualizado',
		relatedPosts: 'Guías Enlisted relacionadas',
		allPosts: 'Todos los artículos',
		home: 'Inicio Enlisted Cheats',
		language: 'Idioma',
	},
	fr: {
		blogTitle: 'Blog Enlisted Cheats 2026 | Guides en 22 langues',
		blogDescription:
			'Blog Enlisted Cheats : triches indétectables, ESP wallhack, radar et Aimbot pour Enlisted sur PC Windows.',
		blogH1: 'Blog Enlisted Cheats — Guides mondiaux',
		blogIntro:
			'Guides SEO triches Enlisted indétectables, ESP wallhack, radar hack, Aimbot et Gaijin anti-cheat (EAC) en 22 langues.',
		readMore: 'Lire le guide',
		published: 'Publié',
		updated: 'Mis à jour',
		relatedPosts: 'Guides Enlisted associés',
		allPosts: 'Tous les articles',
		home: 'Accueil Enlisted Cheats',
		language: 'Langue',
	},
	de: {
		blogTitle: 'Enlisted Cheats Blog 2026 | Guides in 22 Sprachen',
		blogDescription:
			'Enlisted Cheats Blog mit undetected ESP, Wallhack, Radar und Aimbot Guides für Enlisted auf Windows PC.',
		blogH1: 'Enlisted Cheats Blog — Globale Guides',
		blogIntro:
			'SEO-Guides für undetected Enlisted Cheats, ESP Wallhack, Radar Hack, Aimbot und Gaijin anti-cheat (EAC) in 22 Sprachen.',
		readMore: 'Guide lesen',
		published: 'Veröffentlicht',
		updated: 'Aktualisiert',
		relatedPosts: 'Verwandte Enlisted Guides',
		allPosts: 'Alle Beiträge',
		home: 'Enlisted Cheats Start',
		language: 'Sprache',
	},
	pt: {
		blogTitle: 'Blog Enlisted Cheats 2026 | Guias em 22 idiomas',
		blogDescription:
			'Blog Enlisted Cheats com guias de cheats indetectáveis, ESP wallhack, radar e Aimbot para Enlisted no PC.',
		blogH1: 'Blog Enlisted Cheats — Guias globais',
		blogIntro:
			'Guias SEO de cheats Enlisted indetectáveis, ESP wallhack, radar hack, Aimbot e Gaijin anti-cheat (EAC) em 22 idiomas.',
		readMore: 'Ler guia',
		published: 'Publicado',
		updated: 'Atualizado',
		relatedPosts: 'Guias Enlisted relacionados',
		allPosts: 'Todos os posts',
		home: 'Início Enlisted Cheats',
		language: 'Idioma',
	},
	it: {
		blogTitle: 'Blog Enlisted Cheats 2026 | Guide in 22 lingue',
		blogDescription:
			'Blog Enlisted Cheats con guide cheat indetectable, ESP wallhack, radar e Aimbot per Enlisted su PC Windows.',
		blogH1: 'Blog Enlisted Cheats — Guide globali',
		blogIntro:
			'Guide SEO cheat Enlisted indetectable, ESP wallhack, radar hack, Aimbot e Gaijin anti-cheat (EAC) in 22 lingue.',
		readMore: 'Leggi guida',
		published: 'Pubblicato',
		updated: 'Aggiornato',
		relatedPosts: 'Guide Enlisted correlate',
		allPosts: 'Tutti gli articoli',
		home: 'Home Enlisted Cheats',
		language: 'Lingua',
	},
	nl: {
		blogTitle: 'Enlisted Cheats Blog 2026 | Gidsen in 22 talen',
		blogDescription:
			'Enlisted Cheats blog met undetected ESP, wallhack, radar en Aimbot gidsen voor Enlisted op Windows PC.',
		blogH1: 'Enlisted Cheats Blog — Wereldwijde gidsen',
		blogIntro:
			'SEO-gidsen voor undetected Enlisted cheats, ESP wallhack, radar hack, Aimbot en Gaijin anti-cheat (EAC) in 22 talen.',
		readMore: 'Lees gids',
		published: 'Gepubliceerd',
		updated: 'Bijgewerkt',
		relatedPosts: 'Gerelateerde Enlisted gidsen',
		allPosts: 'Alle posts',
		home: 'Enlisted Cheats home',
		language: 'Taal',
	},
	pl: {
		blogTitle: 'Blog Enlisted Cheats 2026 | Poradniki w 22 językach',
		blogDescription:
			'Blog Enlisted Cheats z poradnikami undetected ESP, wallhack, radar i Aimbot dla Enlisted na PC.',
		blogH1: 'Blog Enlisted Cheats — Globalne poradniki',
		blogIntro:
			'Poradniki SEO undetected cheatów Enlisted, ESP wallhack, radar hack, Aimbot i Gaijin anti-cheat (EAC) w 22 językach.',
		readMore: 'Czytaj poradnik',
		published: 'Opublikowano',
		updated: 'Zaktualizowano',
		relatedPosts: 'Powiązane poradniki Enlisted',
		allPosts: 'Wszystkie artykuły',
		home: 'Strona główna Enlisted Cheats',
		language: 'Język',
	},
	ru: {
		blogTitle: 'Блог Enlisted Cheats 2026 | Гайды на 22 языках',
		blogDescription:
			'Блог Enlisted Cheats: undetected ESP, wallhack, radar и Aimbot для Enlisted на Windows PC.',
		blogH1: 'Блог Enlisted Cheats — Глобальные гайды',
		blogIntro:
			'SEO-гайды по undetected читам Enlisted, ESP wallhack, radar hack, Aimbot и Gaijin anti-cheat (EAC) на 22 языках.',
		readMore: 'Читать гайд',
		published: 'Опубликовано',
		updated: 'Обновлено',
		relatedPosts: 'Похожие гайды Enlisted',
		allPosts: 'Все статьи',
		home: 'Главная Enlisted Cheats',
		language: 'Язык',
	},
	tr: {
		blogTitle: 'Enlisted Cheats Blog 2026 | 22 dilde rehberler',
		blogDescription:
			'Enlisted Cheats blog: undetected ESP, wallhack, radar ve Aimbot rehberleri Enlisted Windows PC.',
		blogH1: 'Enlisted Cheats Blog — Küresel rehberler',
		blogIntro:
			'Undetected Enlisted hileleri, ESP wallhack, radar hack, Aimbot ve Gaijin anti-cheat (EAC) SEO rehberleri 22 dilde.',
		readMore: 'Rehberi oku',
		published: 'Yayınlandı',
		updated: 'Güncellendi',
		relatedPosts: 'İlgili Enlisted rehberleri',
		allPosts: 'Tüm yazılar',
		home: 'Enlisted Cheats ana sayfa',
		language: 'Dil',
	},
	ar: {
		blogTitle: 'مدونة Enlisted Cheats 2026 | أدلة بـ 22 لغة',
		blogDescription:
			'مدونة Enlisted Cheats: غش undetected وESP wallhack ورadar وAimbot لـ Enlisted على Windows PC.',
		blogH1: 'مدونة Enlisted Cheats — أدلة عالمية',
		blogIntro:
			'أدلة SEO لغش Enlisted undetected وESP wallhack ورadar hack وAimbot وGaijin anti-cheat (EAC) بـ 22 لغة.',
		readMore: 'اقرأ الدليل',
		published: 'نُشر',
		updated: 'تم التحديث',
		relatedPosts: 'أدلة Enlisted ذات صلة',
		allPosts: 'جميع المقالات',
		home: 'الرئيسية Enlisted Cheats',
		language: 'اللغة',
	},
	ja: {
		blogTitle: 'Enlisted Cheats ブログ 2026 | 22言語ガイド',
		blogDescription:
			'Enlisted Cheatsブログ：undetected ESP、wallhack、radar、Aimbotガイド。Enlisted Windows PC向け。',
		blogH1: 'Enlisted Cheats ブログ — グローバルガイド',
		blogIntro:
			'undetected Enlistedチート、ESP wallhack、radar hack、Aimbot、Gaijin anti-cheat (EAC)のSEOガイドを22言語で提供。',
		readMore: 'ガイドを読む',
		published: '公開日',
		updated: '更新日',
		relatedPosts: '関連Enlistedガイド',
		allPosts: 'すべての記事',
		home: 'Enlisted Cheats ホーム',
		language: '言語',
	},
	ko: {
		blogTitle: 'Enlisted Cheats 블로그 2026 | 22개 언어 가이드',
		blogDescription:
			'Enlisted Cheats 블로그: undetected ESP, wallhack, radar, Aimbot 가이드. Enlisted Windows PC.',
		blogH1: 'Enlisted Cheats 블로그 — 글로벌 가이드',
		blogIntro:
			'undetected Enlisted 치트, ESP wallhack, radar hack, Aimbot, Gaijin anti-cheat (EAC) SEO 가이드를 22개 언어로 제공.',
		readMore: '가이드 읽기',
		published: '게시일',
		updated: '업데이트',
		relatedPosts: '관련 Enlisted 가이드',
		allPosts: '모든 게시물',
		home: 'Enlisted Cheats 홈',
		language: '언어',
	},
	zh: {
		blogTitle: 'Enlisted Cheats 博客 2026 | 22种语言指南',
		blogDescription:
			'Enlisted Cheats博客：undetected ESP、wallhack、radar和Aimbot指南，适用于Enlisted Windows PC。',
		blogH1: 'Enlisted Cheats 博客 — 全球指南',
		blogIntro:
			'undetected Enlisted作弊、ESP wallhack、radar hack、Aimbot和Gaijin anti-cheat (EAC)的SEO指南，共22种语言。',
		readMore: '阅读指南',
		published: '发布',
		updated: '更新',
		relatedPosts: '相关Enlisted指南',
		allPosts: '所有文章',
		home: 'Enlisted Cheats 首页',
		language: '语言',
	},
	hi: {
		blogTitle: 'Enlisted Cheats ब्लॉग 2026 | 22 भाषाओं में गाइड',
		blogDescription:
			'Enlisted Cheats ब्लॉग: undetected ESP, wallhack, radar और Aimbot गाइड Enlisted Windows PC के लिए।',
		blogH1: 'Enlisted Cheats ब्लॉग — वैश्विक गाइड',
		blogIntro:
			'undetected Enlisted cheats, ESP wallhack, radar hack, Aimbot और Gaijin anti-cheat (EAC) SEO गाइड 22 भाषाओं में।',
		readMore: 'गाइड पढ़ें',
		published: 'प्रकाशित',
		updated: 'अपडेट',
		relatedPosts: 'संबंधित Enlisted गाइड',
		allPosts: 'सभी पोस्ट',
		home: 'Enlisted Cheats होम',
		language: 'भाषा',
	},
	id: {
		blogTitle: 'Blog Enlisted Cheats 2026 | Panduan 22 bahasa',
		blogDescription:
			'Blog Enlisted Cheats: panduan undetected ESP, wallhack, radar dan Aimbot untuk Enlisted di PC Windows.',
		blogH1: 'Blog Enlisted Cheats — Panduan global',
		blogIntro:
			'Panduan SEO cheat Enlisted undetected, ESP wallhack, radar hack, Aimbot dan Gaijin anti-cheat (EAC) dalam 22 bahasa.',
		readMore: 'Baca panduan',
		published: 'Dipublikasikan',
		updated: 'Diperbarui',
		relatedPosts: 'Panduan Enlisted terkait',
		allPosts: 'Semua artikel',
		home: 'Beranda Enlisted Cheats',
		language: 'Bahasa',
	},
	th: {
		blogTitle: 'บล็อก Enlisted Cheats 2026 | คู่มือ 22 ภาษา',
		blogDescription:
			'บล็อก Enlisted Cheats: คู่มือ undetected ESP, wallhack, radar และ Aimbot สำหรับ Enlisted บน PC',
		blogH1: 'บล็อก Enlisted Cheats — คู่มือทั่วโลก',
		blogIntro:
			'คู่มือ SEO สำหรับ cheat Enlisted undetected, ESP wallhack, radar hack, Aimbot และ Gaijin anti-cheat (EAC) 22 ภาษา',
		readMore: 'อ่านคู่มือ',
		published: 'เผยแพร่',
		updated: 'อัปเดต',
		relatedPosts: 'คู่มือ Enlisted ที่เกี่ยวข้อง',
		allPosts: 'บทความทั้งหมด',
		home: 'หน้าแรก Enlisted Cheats',
		language: 'ภาษา',
	},
	vi: {
		blogTitle: 'Blog Enlisted Cheats 2026 | Hướng dẫn 22 ngôn ngữ',
		blogDescription:
			'Blog Enlisted Cheats: hướng dẫn undetected ESP, wallhack, radar và Aimbot cho Enlisted trên PC.',
		blogH1: 'Blog Enlisted Cheats — Hướng dẫn toàn cầu',
		blogIntro:
			'Hướng dẫn SEO cheat Enlisted undetected, ESP wallhack, radar hack, Aimbot và Gaijin anti-cheat (EAC) bằng 22 ngôn ngữ.',
		readMore: 'Đọc hướng dẫn',
		published: 'Xuất bản',
		updated: 'Cập nhật',
		relatedPosts: 'Hướng dẫn Enlisted liên quan',
		allPosts: 'Tất cả bài viết',
		home: 'Trang chủ Enlisted Cheats',
		language: 'Ngôn ngữ',
	},
	uk: {
		blogTitle: 'Блог Enlisted Cheats 2026 | Гайди 22 мовами',
		blogDescription:
			'Блог Enlisted Cheats: undetected ESP, wallhack, radar та Aimbot для Enlisted на Windows PC.',
		blogH1: 'Блог Enlisted Cheats — Глобальні гайди',
		blogIntro:
			'SEO-гайди з undetected читів Enlisted, ESP wallhack, radar hack, Aimbot та Gaijin anti-cheat (EAC) 22 мовами.',
		readMore: 'Читати гайд',
		published: 'Опубліковано',
		updated: 'Оновлено',
		relatedPosts: "Пов'язані гайди Enlisted",
		allPosts: 'Усі статті',
		home: 'Головна Enlisted Cheats',
		language: 'Мова',
	},
	cs: {
		blogTitle: 'Blog Enlisted Cheats 2026 | Průvodce ve 22 jazycích',
		blogDescription:
			'Blog Enlisted Cheats: undetected ESP, wallhack, radar a Aimbot pro Enlisted na Windows PC.',
		blogH1: 'Blog Enlisted Cheats — Globální průvodce',
		blogIntro:
			'SEO průvodce undetected Enlisted cheaty, ESP wallhack, radar hack, Aimbot a Gaijin anti-cheat (EAC) ve 22 jazycích.',
		readMore: 'Číst průvodce',
		published: 'Publikováno',
		updated: 'Aktualizováno',
		relatedPosts: 'Související Enlisted průvodce',
		allPosts: 'Všechny články',
		home: 'Domů Enlisted Cheats',
		language: 'Jazyk',
	},
	ro: {
		blogTitle: 'Blog Enlisted Cheats 2026 | Ghiduri în 22 de limbi',
		blogDescription:
			'Blog Enlisted Cheats: ghiduri undetected ESP, wallhack, radar și Aimbot pentru Enlisted pe PC.',
		blogH1: 'Blog Enlisted Cheats — Ghiduri globale',
		blogIntro:
			'Ghiduri SEO cheat-uri Enlisted undetected, ESP wallhack, radar hack, Aimbot și Gaijin anti-cheat (EAC) în 22 de limbi.',
		readMore: 'Citește ghidul',
		published: 'Publicat',
		updated: 'Actualizat',
		relatedPosts: 'Ghiduri Enlisted related',
		allPosts: 'Toate articolele',
		home: 'Acasă Enlisted Cheats',
		language: 'Limbă',
	},
	sv: {
		blogTitle: 'Enlisted Cheats Blogg 2026 | Guider på 22 språk',
		blogDescription:
			'Enlisted Cheats blogg med undetected ESP, wallhack, radar och Aimbot guider för Enlisted på PC.',
		blogH1: 'Enlisted Cheats Blogg — Globala guider',
		blogIntro:
			'SEO-guider för undetected Enlisted cheats, ESP wallhack, radar hack, Aimbot och Gaijin anti-cheat (EAC) på 22 språk.',
		readMore: 'Läs guide',
		published: 'Publicerad',
		updated: 'Uppdaterad',
		relatedPosts: 'Relaterade Enlisted guider',
		allPosts: 'Alla inlägg',
		home: 'Enlisted Cheats hem',
		language: 'Språk',
	},
};
