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
/** Shared English blog SEO copy — blog posts ship in English only. */
const blogUiContent = {
	blogTitle: 'Enlisted Cheats Blog | ESP, Aimbot & Anti-Cheat Guides',
	blogDescription:
		'Enlisted Cheats blog — ESP, aimbot, wallhack, undetected status, vendor comparisons, setup tips, and anti-cheat maintenance after Gaijin patches.',
	blogH1: 'Enlisted Cheats blog',
	blogIntro:
		'Buying guides, feature breakdowns, undetected anti-cheat notes, and honest comparisons — written for players evaluating Enlisted Cheats on Windows PC.',
} as const;

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
		...blogUiContent,
		readMore: 'Read guide',
		published: 'Published',
		updated: 'Updated',
		relatedPosts: 'Related cheat guides',
		allPosts: 'All blog posts',
		home: 'Enlisted Cheats home',
		language: 'Language',
	},
	es: {
		...blogUiContent,
		readMore: 'Leer guía',
		published: 'Publicado',
		updated: 'Actualizado',
		relatedPosts: 'Guías Enlisted relacionadas',
		allPosts: 'Todos los artículos',
		home: 'Inicio Enlisted Cheats',
		language: 'Idioma',
	},
	fr: {
		...blogUiContent,
		readMore: 'Lire le guide',
		published: 'Publié',
		updated: 'Mis à jour',
		relatedPosts: 'Guides Enlisted associés',
		allPosts: 'Tous les articles',
		home: 'Accueil Enlisted Cheats',
		language: 'Langue',
	},
	de: {
		...blogUiContent,
		readMore: 'Guide lesen',
		published: 'Veröffentlicht',
		updated: 'Aktualisiert',
		relatedPosts: 'Verwandte Enlisted Guides',
		allPosts: 'Alle Beiträge',
		home: 'Enlisted Cheats Start',
		language: 'Sprache',
	},
	pt: {
		...blogUiContent,
		readMore: 'Ler guia',
		published: 'Publicado',
		updated: 'Atualizado',
		relatedPosts: 'Guias Enlisted relacionados',
		allPosts: 'Todos os posts',
		home: 'Início Enlisted Cheats',
		language: 'Idioma',
	},
	it: {
		...blogUiContent,
		readMore: 'Leggi guida',
		published: 'Pubblicato',
		updated: 'Aggiornato',
		relatedPosts: 'Guide Enlisted correlate',
		allPosts: 'Tutti gli articoli',
		home: 'Home Enlisted Cheats',
		language: 'Lingua',
	},
	nl: {
		...blogUiContent,
		readMore: 'Lees gids',
		published: 'Gepubliceerd',
		updated: 'Bijgewerkt',
		relatedPosts: 'Gerelateerde Enlisted gidsen',
		allPosts: 'Alle posts',
		home: 'Enlisted Cheats home',
		language: 'Taal',
	},
	pl: {
		...blogUiContent,
		readMore: 'Czytaj poradnik',
		published: 'Opublikowano',
		updated: 'Zaktualizowano',
		relatedPosts: 'Powiązane poradniki Enlisted',
		allPosts: 'Wszystkie artykuły',
		home: 'Strona główna Enlisted Cheats',
		language: 'Język',
	},
	ru: {
		...blogUiContent,
		readMore: 'Читать гайд',
		published: 'Опубликовано',
		updated: 'Обновлено',
		relatedPosts: 'Похожие гайды Enlisted',
		allPosts: 'Все статьи',
		home: 'Главная Enlisted Cheats',
		language: 'Язык',
	},
	tr: {
		...blogUiContent,
		readMore: 'Rehberi oku',
		published: 'Yayınlandı',
		updated: 'Güncellendi',
		relatedPosts: 'İlgili Enlisted rehberleri',
		allPosts: 'Tüm yazılar',
		home: 'Enlisted Cheats ana sayfa',
		language: 'Dil',
	},
	ar: {
		...blogUiContent,
		readMore: 'اقرأ الدليل',
		published: 'نُشر',
		updated: 'تم التحديث',
		relatedPosts: 'أدلة Enlisted ذات صلة',
		allPosts: 'جميع المقالات',
		home: 'الرئيسية Enlisted Cheats',
		language: 'اللغة',
	},
	ja: {
		...blogUiContent,
		readMore: 'ガイドを読む',
		published: '公開日',
		updated: '更新日',
		relatedPosts: '関連Enlistedガイド',
		allPosts: 'すべての記事',
		home: 'Enlisted Cheats ホーム',
		language: '言語',
	},
	ko: {
		...blogUiContent,
		readMore: '가이드 읽기',
		published: '게시일',
		updated: '업데이트',
		relatedPosts: '관련 Enlisted 가이드',
		allPosts: '모든 게시물',
		home: 'Enlisted Cheats 홈',
		language: '언어',
	},
	zh: {
		...blogUiContent,
		readMore: '阅读指南',
		published: '发布',
		updated: '更新',
		relatedPosts: '相关Enlisted指南',
		allPosts: '所有文章',
		home: 'Enlisted Cheats 首页',
		language: '语言',
	},
	hi: {
		...blogUiContent,
		readMore: 'गाइड पढ़ें',
		published: 'प्रकाशित',
		updated: 'अपडेट',
		relatedPosts: 'संबंधित Enlisted गाइड',
		allPosts: 'सभी पोस्ट',
		home: 'Enlisted Cheats होम',
		language: 'भाषा',
	},
	id: {
		...blogUiContent,
		readMore: 'Baca panduan',
		published: 'Dipublikasikan',
		updated: 'Diperbarui',
		relatedPosts: 'Panduan Enlisted terkait',
		allPosts: 'Semua artikel',
		home: 'Beranda Enlisted Cheats',
		language: 'Bahasa',
	},
	th: {
		...blogUiContent,
		readMore: 'อ่านคู่มือ',
		published: 'เผยแพร่',
		updated: 'อัปเดต',
		relatedPosts: 'คู่มือ Enlisted ที่เกี่ยวข้อง',
		allPosts: 'บทความทั้งหมด',
		home: 'หน้าแรก Enlisted Cheats',
		language: 'ภาษา',
	},
	vi: {
		...blogUiContent,
		readMore: 'Đọc hướng dẫn',
		published: 'Xuất bản',
		updated: 'Cập nhật',
		relatedPosts: 'Hướng dẫn Enlisted liên quan',
		allPosts: 'Tất cả bài viết',
		home: 'Trang chủ Enlisted Cheats',
		language: 'Ngôn ngữ',
	},
	uk: {
		...blogUiContent,
		readMore: 'Читати гайд',
		published: 'Опубліковано',
		updated: 'Оновлено',
		relatedPosts: "Пов'язані гайди Enlisted",
		allPosts: 'Усі статті',
		home: 'Головна Enlisted Cheats',
		language: 'Мова',
	},
	cs: {
		...blogUiContent,
		readMore: 'Číst průvodce',
		published: 'Publikováno',
		updated: 'Aktualizováno',
		relatedPosts: 'Související Enlisted průvodce',
		allPosts: 'Všechny články',
		home: 'Domů Enlisted Cheats',
		language: 'Jazyk',
	},
	ro: {
		...blogUiContent,
		readMore: 'Citește ghidul',
		published: 'Publicat',
		updated: 'Actualizat',
		relatedPosts: 'Ghiduri Enlisted related',
		allPosts: 'Toate articolele',
		home: 'Acasă Enlisted Cheats',
		language: 'Limbă',
	},
	sv: {
		...blogUiContent,
		readMore: 'Läs guide',
		published: 'Publicerad',
		updated: 'Uppdaterad',
		relatedPosts: 'Relaterade Enlisted guider',
		allPosts: 'Alla inlägg',
		home: 'Enlisted Cheats hem',
		language: 'Språk',
	},
};
