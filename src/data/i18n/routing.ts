import { siteConfig } from '../site';
import {
	defaultLocale,
	localeCodes,
	type LocaleCode,
	locales,
} from './locales';

/** Canonical page identifiers shared across all locales. */
export type PageId =
	| 'home'
	| 'enlisted-esp'
	| 'enlisted-aimbot'
	| 'features'
	| 'pricing'
	| 'setup'
	| 'updates'
	| 'faq'
	| 'support'
	| 'undetected'
	| 'wallhack'
	| 'radar'
	| 'eac-bypass'
	| 'cheats-2026'
	| 'hacks'
	| 'cheat-download'
	| 'mod-menu'
	| 'soft-aim'
	| 'best-cheats'
	| 'aimbot-hack'
	| 'esp-hack'
	| 'unlock-all'
	| 'privacy'
	| 'refund'
	| 'terms';

/** English (official) paths — served at site root without /en/ prefix. */
export const englishPaths: Record<PageId, string> = {
	home: '/',
	'enlisted-esp': '/enlisted-esp/',
	'enlisted-aimbot': '/enlisted-aimbot/',
	features: '/features/',
	pricing: '/pricing/',
	setup: '/setup/',
	updates: '/updates/',
	faq: '/faq/',
	support: '/support/',
	undetected: '/enlisted-cheats/',
	wallhack: '/enlisted-wallhack/',
	radar: '/enlisted-radar/',
	'eac-bypass': '/enlisted-cheats/',
	'cheats-2026': '/enlisted-cheats/',
	hacks: '/enlisted-cheats/',
	'cheat-download': '/pricing/',
	'mod-menu': '/features/',
	'soft-aim': '/enlisted-aimbot/',
	'best-cheats': '/enlisted-cheats/',
	'aimbot-hack': '/enlisted-aimbot/',
	'esp-hack': '/enlisted-esp/',
	'unlock-all': '/features/',
	privacy: '/privacy-policy/',
	refund: '/refund-policy/',
	terms: '/terms/',
};

/**
 * Core English pages for sitemap.xml — focused enlisted-cheats URLs only.
 * Thin keyword-duplicate landings redirect to these canonical pages.
 */
export const sitemapPageIds: PageId[] = [
	'home',
	'hacks',
	'enlisted-esp',
	'enlisted-aimbot',
	'wallhack',
	'radar',
	'features',
	'pricing',
	'setup',
	'updates',
	'faq',
	'support',
	'privacy',
	'refund',
	'terms',
];

/**
 * Localized URL slugs (path after /{lang}/).
 * English uses englishPaths at root; other locales use these slugs under /{lang}/.
 */
export const localizedSlugs: Record<PageId, Record<LocaleCode, string>> = {
	home: {
		en: '',
		es: '',
		fr: '',
		de: '',
		pt: '',
		it: '',
		nl: '',
		pl: '',
		ru: '',
		tr: '',
		ar: '',
		ja: '',
		ko: '',
		zh: '',
		hi: '',
		id: '',
		th: '',
		vi: '',
		uk: '',
		cs: '',
		ro: '',
		sv: '',
	},
	'enlisted-esp': {
		en: 'enlisted-esp',
		es: 'trucos-enlisted-esp',
		fr: 'triche-enlisted-esp',
		de: 'enlisted-esp-wallhack',
		pt: 'cheats-enlisted-esp',
		it: 'trucchi-enlisted-esp',
		nl: 'enlisted-esp-wallhack',
		pl: 'cheaty-enlisted-esp',
		ru: 'enlisted-esp-chity',
		tr: 'enlisted-esp-hile',
		ar: 'enlisted-esp-wallhack',
		ja: 'enlisted-esp-wallhack',
		ko: 'enlisted-esp-wallhack',
		zh: 'enlisted-esp-wallhack',
		hi: 'enlisted-esp-wallhack',
		id: 'enlisted-esp-wallhack',
		th: 'enlisted-esp-wallhack',
		vi: 'enlisted-esp-wallhack',
		uk: 'enlisted-esp-chity',
		cs: 'enlisted-esp-wallhack',
		ro: 'enlisted-esp-wallhack',
		sv: 'enlisted-esp-wallhack',
	},
	'enlisted-aimbot': {
		en: 'enlisted-aimbot',
		es: 'trucos-enlisted-aimbot',
		fr: 'triche-enlisted-aimbot',
		de: 'enlisted-aimbot',
		pt: 'cheats-enlisted-aimbot',
		it: 'trucchi-enlisted-aimbot',
		nl: 'enlisted-aimbot',
		pl: 'cheaty-enlisted-aimbot',
		ru: 'enlisted-aimbot-chity',
		tr: 'enlisted-aimbot-hile',
		ar: 'enlisted-aimbot',
		ja: 'enlisted-aimbot',
		ko: 'enlisted-aimbot',
		zh: 'enlisted-aimbot',
		hi: 'enlisted-aimbot',
		id: 'enlisted-aimbot',
		th: 'enlisted-aimbot',
		vi: 'enlisted-aimbot',
		uk: 'enlisted-aimbot-chity',
		cs: 'enlisted-aimbot',
		ro: 'enlisted-aimbot',
		sv: 'enlisted-aimbot',
	},
	features: {
		en: 'features',
		es: 'caracteristicas-trucos-enlisted',
		fr: 'fonctionnalites-triche-enlisted',
		de: 'enlisted-cheats-funktionen',
		pt: 'recursos-cheats-enlisted',
		it: 'funzioni-trucchi-enlisted',
		nl: 'enlisted-cheats-functies',
		pl: 'funkcje-cheatow-enlisted',
		ru: 'funkcii-chitov-enlisted',
		tr: 'enlisted-hile-ozellikleri',
		ar: 'enlisted-cheats-features',
		ja: 'enlisted-cheats-features',
		ko: 'enlisted-cheats-features',
		zh: 'enlisted-cheats-features',
		hi: 'enlisted-cheats-features',
		id: 'enlisted-cheats-features',
		th: 'enlisted-cheats-features',
		vi: 'enlisted-cheats-features',
		uk: 'funkcii-chitiv-enlisted',
		cs: 'enlisted-cheats-funkce',
		ro: 'functii-cheats-enlisted',
		sv: 'enlisted-cheats-funktioner',
	},
	pricing: {
		en: 'pricing',
		es: 'precios-trucos-enlisted',
		fr: 'prix-triche-enlisted',
		de: 'enlisted-cheats-preise',
		pt: 'precos-cheats-enlisted',
		it: 'prezzi-trucchi-enlisted',
		nl: 'enlisted-cheats-prijzen',
		pl: 'ceny-cheatow-enlisted',
		ru: 'ceny-chitov-enlisted',
		tr: 'enlisted-hile-fiyatlari',
		ar: 'enlisted-cheats-pricing',
		ja: 'enlisted-cheats-pricing',
		ko: 'enlisted-cheats-pricing',
		zh: 'enlisted-cheats-pricing',
		hi: 'enlisted-cheats-pricing',
		id: 'enlisted-cheats-pricing',
		th: 'enlisted-cheats-pricing',
		vi: 'enlisted-cheats-pricing',
		uk: 'ciny-chitiv-enlisted',
		cs: 'enlisted-cheats-ceny',
		ro: 'preturi-cheats-enlisted',
		sv: 'enlisted-cheats-priser',
	},
	setup: {
		en: 'setup',
		es: 'instalacion-trucos-enlisted',
		fr: 'installation-triche-enlisted',
		de: 'enlisted-cheats-installation',
		pt: 'instalacao-cheats-enlisted',
		it: 'installazione-trucchi-enlisted',
		nl: 'enlisted-cheats-installatie',
		pl: 'instalacja-cheatow-enlisted',
		ru: 'ustanovka-chitov-enlisted',
		tr: 'enlisted-hile-kurulum',
		ar: 'enlisted-cheats-setup',
		ja: 'enlisted-cheats-setup',
		ko: 'enlisted-cheats-setup',
		zh: 'enlisted-cheats-setup',
		hi: 'enlisted-cheats-setup',
		id: 'enlisted-cheats-setup',
		th: 'enlisted-cheats-setup',
		vi: 'enlisted-cheats-setup',
		uk: 'vstanovka-chitiv-enlisted',
		cs: 'enlisted-cheats-instalace',
		ro: 'instalare-cheats-enlisted',
		sv: 'enlisted-cheats-installation',
	},
	updates: {
		en: 'updates',
		es: 'actualizaciones-trucos-enlisted',
		fr: 'mises-a-jour-triche-enlisted',
		de: 'enlisted-cheats-updates',
		pt: 'atualizacoes-cheats-enlisted',
		it: 'aggiornamenti-trucchi-enlisted',
		nl: 'enlisted-cheats-updates',
		pl: 'aktualizacje-cheatow-enlisted',
		ru: 'obnovleniya-chitov-enlisted',
		tr: 'enlisted-hile-guncellemeleri',
		ar: 'enlisted-cheats-updates',
		ja: 'enlisted-cheats-updates',
		ko: 'enlisted-cheats-updates',
		zh: 'enlisted-cheats-updates',
		hi: 'enlisted-cheats-updates',
		id: 'enlisted-cheats-updates',
		th: 'enlisted-cheats-updates',
		vi: 'enlisted-cheats-updates',
		uk: 'onovlennya-chitiv-enlisted',
		cs: 'enlisted-cheats-aktualizace',
		ro: 'actualizari-cheats-enlisted',
		sv: 'enlisted-cheats-uppdateringar',
	},
	faq: {
		en: 'faq',
		es: 'preguntas-trucos-enlisted',
		fr: 'faq-triche-enlisted',
		de: 'enlisted-cheats-faq',
		pt: 'faq-cheats-enlisted',
		it: 'faq-trucchi-enlisted',
		nl: 'enlisted-cheats-faq',
		pl: 'faq-cheatow-enlisted',
		ru: 'faq-chitov-enlisted',
		tr: 'enlisted-hile-sss',
		ar: 'enlisted-cheats-faq',
		ja: 'enlisted-cheats-faq',
		ko: 'enlisted-cheats-faq',
		zh: 'enlisted-cheats-faq',
		hi: 'enlisted-cheats-faq',
		id: 'enlisted-cheats-faq',
		th: 'enlisted-cheats-faq',
		vi: 'enlisted-cheats-faq',
		uk: 'faq-chitiv-enlisted',
		cs: 'enlisted-cheats-faq',
		ro: 'faq-cheats-enlisted',
		sv: 'enlisted-cheats-faq',
	},
	support: {
		en: 'support',
		es: 'soporte-trucos-enlisted',
		fr: 'support-triche-enlisted',
		de: 'enlisted-cheats-support',
		pt: 'suporte-cheats-enlisted',
		it: 'supporto-trucchi-enlisted',
		nl: 'enlisted-cheats-support',
		pl: 'wsparcie-cheatow-enlisted',
		ru: 'podderzhka-chitov-enlisted',
		tr: 'enlisted-hile-destek',
		ar: 'enlisted-cheats-support',
		ja: 'enlisted-cheats-support',
		ko: 'enlisted-cheats-support',
		zh: 'enlisted-cheats-support',
		hi: 'enlisted-cheats-support',
		id: 'enlisted-cheats-support',
		th: 'enlisted-cheats-support',
		vi: 'enlisted-cheats-support',
		uk: 'pidtrymka-chitiv-enlisted',
		cs: 'enlisted-cheats-podpora',
		ro: 'suport-cheats-enlisted',
		sv: 'enlisted-cheats-support',
	},
	undetected: {
		en: 'undetected-enlisted-cheats',
		es: 'trucos-enlisted-indetectables',
		fr: 'triche-enlisted-indetectable',
		de: 'unentdeckte-enlisted-cheats',
		pt: 'cheats-enlisted-indetectaveis',
		it: 'trucchi-enlisted-indetectabili',
		nl: 'undetected-enlisted-cheats',
		pl: 'niewykrywalne-cheats-enlisted',
		ru: 'nedecektiruemye-chity-enlisted',
		tr: 'tespit-edilemeyen-enlisted-hileleri',
		ar: 'undetected-enlisted-cheats',
		ja: 'undetected-enlisted-cheats',
		ko: 'undetected-enlisted-cheats',
		zh: 'undetected-enlisted-cheats',
		hi: 'undetected-enlisted-cheats',
		id: 'undetected-enlisted-cheats',
		th: 'undetected-enlisted-cheats',
		vi: 'undetected-enlisted-cheats',
		uk: 'nedecektovani-chity-enlisted',
		cs: 'undetected-enlisted-cheats',
		ro: 'cheats-enlisted-nedetectabile',
		sv: 'undetected-enlisted-cheats',
	},
	wallhack: {
		en: 'enlisted-wallhack',
		es: 'wallhack-trucos-enlisted',
		fr: 'wallhack-triche-enlisted',
		de: 'enlisted-wallhack',
		pt: 'wallhack-cheats-enlisted',
		it: 'wallhack-trucchi-enlisted',
		nl: 'enlisted-wallhack',
		pl: 'wallhack-cheatow-enlisted',
		ru: 'wallhack-chity-enlisted',
		tr: 'enlisted-wallhack-hile',
		ar: 'enlisted-wallhack',
		ja: 'enlisted-wallhack',
		ko: 'enlisted-wallhack',
		zh: 'enlisted-wallhack',
		hi: 'enlisted-wallhack',
		id: 'enlisted-wallhack',
		th: 'enlisted-wallhack',
		vi: 'enlisted-wallhack',
		uk: 'wallhack-chity-enlisted',
		cs: 'enlisted-wallhack',
		ro: 'wallhack-cheats-enlisted',
		sv: 'enlisted-wallhack',
	},
	radar: {
		en: 'enlisted-radar-hack',
		es: 'radar-hack-trucos-enlisted',
		fr: 'radar-hack-triche-enlisted',
		de: 'enlisted-radar-hack',
		pt: 'radar-hack-cheats-enlisted',
		it: 'radar-hack-trucchi-enlisted',
		nl: 'enlisted-radar-hack',
		pl: 'radar-hack-cheatow-enlisted',
		ru: 'radar-hack-chity-enlisted',
		tr: 'enlisted-radar-hack',
		ar: 'enlisted-radar-hack',
		ja: 'enlisted-radar-hack',
		ko: 'enlisted-radar-hack',
		zh: 'enlisted-radar-hack',
		hi: 'enlisted-radar-hack',
		id: 'enlisted-radar-hack',
		th: 'enlisted-radar-hack',
		vi: 'enlisted-radar-hack',
		uk: 'radar-hack-chity-enlisted',
		cs: 'enlisted-radar-hack',
		ro: 'radar-hack-cheats-enlisted',
		sv: 'enlisted-radar-hack',
	},
	'eac-bypass': {
		en: 'eac-bypass-enlisted',
		es: 'eac-bypass-enlisted-trucos',
		fr: 'eac-bypass-enlisted-triche',
		de: 'eac-bypass-enlisted',
		pt: 'eac-bypass-enlisted-cheats',
		it: 'eac-bypass-enlisted-trucchi',
		nl: 'eac-bypass-enlisted',
		pl: 'eac-bypass-enlisted-cheatow',
		ru: 'eac-bypass-enlisted-chity',
		tr: 'eac-bypass-enlisted',
		ar: 'eac-bypass-enlisted',
		ja: 'eac-bypass-enlisted',
		ko: 'eac-bypass-enlisted',
		zh: 'eac-bypass-enlisted',
		hi: 'eac-bypass-enlisted',
		id: 'eac-bypass-enlisted',
		th: 'eac-bypass-enlisted',
		vi: 'eac-bypass-enlisted',
		uk: 'eac-bypass-enlisted-chity',
		cs: 'eac-bypass-enlisted',
		ro: 'eac-bypass-enlisted-cheats',
		sv: 'eac-bypass-enlisted',
	},
	'cheats-2026': {
		en: 'enlisted-cheats-2026',
		es: 'trucos-enlisted-2026',
		fr: 'triche-enlisted-2026',
		de: 'enlisted-cheats-2026',
		pt: 'cheats-enlisted-2026',
		it: 'trucchi-enlisted-2026',
		nl: 'enlisted-cheats-2026',
		pl: 'cheaty-enlisted-2026',
		ru: 'chity-enlisted-2026',
		tr: 'enlisted-hileleri-2026',
		ar: 'enlisted-cheats-2026',
		ja: 'enlisted-cheats-2026',
		ko: 'enlisted-cheats-2026',
		zh: 'enlisted-cheats-2026',
		hi: 'enlisted-cheats-2026',
		id: 'enlisted-cheats-2026',
		th: 'enlisted-cheats-2026',
		vi: 'enlisted-cheats-2026',
		uk: 'chity-enlisted-2026',
		cs: 'enlisted-cheats-2026',
		ro: 'cheats-enlisted-2026',
		sv: 'enlisted-cheats-2026',
	},
	hacks: {
		en: 'enlisted-cheats',
		es: 'hacks-trucos-enlisted',
		fr: 'hacks-triche-enlisted',
		de: 'enlisted-cheats',
		pt: 'hacks-cheats-enlisted',
		it: 'hacks-trucchi-enlisted',
		nl: 'enlisted-cheats',
		pl: 'hacks-cheatow-enlisted',
		ru: 'haksy-chity-enlisted',
		tr: 'enlisted-hile-hacks',
		ar: 'enlisted-cheats',
		ja: 'enlisted-cheats',
		ko: 'enlisted-cheats',
		zh: 'enlisted-cheats',
		hi: 'enlisted-cheats',
		id: 'enlisted-cheats',
		th: 'enlisted-cheats',
		vi: 'enlisted-cheats',
		uk: 'haksy-chity-enlisted',
		cs: 'enlisted-cheats',
		ro: 'hacks-cheats-enlisted',
		sv: 'enlisted-cheats',
	},
	'cheat-download': {
		en: 'enlisted-cheat-download',
		es: 'descarga-trucos-enlisted',
		fr: 'telechargement-triche-enlisted',
		de: 'enlisted-cheat-download',
		pt: 'download-cheats-enlisted',
		it: 'download-trucchi-enlisted',
		nl: 'enlisted-cheat-download',
		pl: 'pobieranie-cheatow-enlisted',
		ru: 'skachat-chity-enlisted',
		tr: 'enlisted-hile-indir',
		ar: 'enlisted-cheat-download',
		ja: 'enlisted-cheat-download',
		ko: 'enlisted-cheat-download',
		zh: 'enlisted-cheat-download',
		hi: 'enlisted-cheat-download',
		id: 'enlisted-cheat-download',
		th: 'enlisted-cheat-download',
		vi: 'enlisted-cheat-download',
		uk: 'zavantazhennya-chitiv-enlisted',
		cs: 'enlisted-cheat-download',
		ro: 'descarcare-cheats-enlisted',
		sv: 'enlisted-cheat-download',
	},
	'mod-menu': {
		en: 'enlisted-mod-menu',
		es: 'menu-mod-trucos-enlisted',
		fr: 'menu-mod-triche-enlisted',
		de: 'enlisted-mod-menu',
		pt: 'menu-mod-cheats-enlisted',
		it: 'menu-mod-trucchi-enlisted',
		nl: 'enlisted-mod-menu',
		pl: 'menu-mod-cheatow-enlisted',
		ru: 'mod-menu-chity-enlisted',
		tr: 'enlisted-mod-menu',
		ar: 'enlisted-mod-menu',
		ja: 'enlisted-mod-menu',
		ko: 'enlisted-mod-menu',
		zh: 'enlisted-mod-menu',
		hi: 'enlisted-mod-menu',
		id: 'enlisted-mod-menu',
		th: 'enlisted-mod-menu',
		vi: 'enlisted-mod-menu',
		uk: 'mod-menu-chity-enlisted',
		cs: 'enlisted-mod-menu',
		ro: 'meniu-mod-cheats-enlisted',
		sv: 'enlisted-mod-menu',
	},
	'soft-aim': {
		en: 'enlisted-soft-aim',
		es: 'soft-aim-trucos-enlisted',
		fr: 'soft-aim-triche-enlisted',
		de: 'enlisted-soft-aim',
		pt: 'soft-aim-cheats-enlisted',
		it: 'soft-aim-trucchi-enlisted',
		nl: 'enlisted-soft-aim',
		pl: 'soft-aim-cheatow-enlisted',
		ru: 'soft-aim-chity-enlisted',
		tr: 'enlisted-soft-aim',
		ar: 'enlisted-soft-aim',
		ja: 'enlisted-soft-aim',
		ko: 'enlisted-soft-aim',
		zh: 'enlisted-soft-aim',
		hi: 'enlisted-soft-aim',
		id: 'enlisted-soft-aim',
		th: 'enlisted-soft-aim',
		vi: 'enlisted-soft-aim',
		uk: 'soft-aim-chity-enlisted',
		cs: 'enlisted-soft-aim',
		ro: 'soft-aim-cheats-enlisted',
		sv: 'enlisted-soft-aim',
	},
	'best-cheats': {
		en: 'best-enlisted-cheats',
		es: 'mejores-trucos-enlisted',
		fr: 'meilleures-triches-enlisted',
		de: 'beste-enlisted-cheats',
		pt: 'melhores-cheats-enlisted',
		it: 'migliori-trucchi-enlisted',
		nl: 'beste-enlisted-cheats',
		pl: 'najlepsze-cheats-enlisted',
		ru: 'luchshie-chity-enlisted',
		tr: 'en-iyi-enlisted-hileleri',
		ar: 'best-enlisted-cheats',
		ja: 'best-enlisted-cheats',
		ko: 'best-enlisted-cheats',
		zh: 'best-enlisted-cheats',
		hi: 'best-enlisted-cheats',
		id: 'best-enlisted-cheats',
		th: 'best-enlisted-cheats',
		vi: 'best-enlisted-cheats',
		uk: 'naykrashchi-chity-enlisted',
		cs: 'nejlepsi-enlisted-cheats',
		ro: 'cele-mai-bune-cheats-enlisted',
		sv: 'basta-enlisted-cheats',
	},
	'aimbot-hack': {
		en: 'enlisted-aimbot-hack',
		es: 'aimbot-hack-trucos-enlisted',
		fr: 'aimbot-hack-triche-enlisted',
		de: 'enlisted-aimbot-hack',
		pt: 'aimbot-hack-cheats-enlisted',
		it: 'aimbot-hack-trucchi-enlisted',
		nl: 'enlisted-aimbot-hack',
		pl: 'aimbot-hack-cheatow-enlisted',
		ru: 'aimbot-hack-chity-enlisted',
		tr: 'enlisted-aimbot-hack',
		ar: 'enlisted-aimbot-hack',
		ja: 'enlisted-aimbot-hack',
		ko: 'enlisted-aimbot-hack',
		zh: 'enlisted-aimbot-hack',
		hi: 'enlisted-aimbot-hack',
		id: 'enlisted-aimbot-hack',
		th: 'enlisted-aimbot-hack',
		vi: 'enlisted-aimbot-hack',
		uk: 'aimbot-hack-chity-enlisted',
		cs: 'enlisted-aimbot-hack',
		ro: 'aimbot-hack-cheats-enlisted',
		sv: 'enlisted-aimbot-hack',
	},
	'esp-hack': {
		en: 'enlisted-esp-hack',
		es: 'esp-hack-trucos-enlisted',
		fr: 'esp-hack-triche-enlisted',
		de: 'enlisted-esp-hack',
		pt: 'esp-hack-cheats-enlisted',
		it: 'esp-hack-trucchi-enlisted',
		nl: 'enlisted-esp-hack',
		pl: 'esp-hack-cheatow-enlisted',
		ru: 'esp-hack-chity-enlisted',
		tr: 'enlisted-esp-hack',
		ar: 'enlisted-esp-hack',
		ja: 'enlisted-esp-hack',
		ko: 'enlisted-esp-hack',
		zh: 'enlisted-esp-hack',
		hi: 'enlisted-esp-hack',
		id: 'enlisted-esp-hack',
		th: 'enlisted-esp-hack',
		vi: 'enlisted-esp-hack',
		uk: 'esp-hack-chity-enlisted',
		cs: 'enlisted-esp-hack',
		ro: 'esp-hack-cheats-enlisted',
		sv: 'enlisted-esp-hack',
	},
	'unlock-all': {
		en: 'enlisted-unlock-all',
		es: 'unlock-all-trucos-enlisted',
		fr: 'unlock-all-triche-enlisted',
		de: 'enlisted-unlock-all',
		pt: 'unlock-all-cheats-enlisted',
		it: 'unlock-all-trucchi-enlisted',
		nl: 'enlisted-unlock-all',
		pl: 'unlock-all-cheatow-enlisted',
		ru: 'unlock-all-chity-enlisted',
		tr: 'enlisted-unlock-all',
		ar: 'enlisted-unlock-all',
		ja: 'enlisted-unlock-all',
		ko: 'enlisted-unlock-all',
		zh: 'enlisted-unlock-all',
		hi: 'enlisted-unlock-all',
		id: 'enlisted-unlock-all',
		th: 'enlisted-unlock-all',
		vi: 'enlisted-unlock-all',
		uk: 'unlock-all-chity-enlisted',
		cs: 'enlisted-unlock-all',
		ro: 'unlock-all-cheats-enlisted',
		sv: 'enlisted-unlock-all',
	},
	privacy: {
		en: 'privacy-policy',
		es: 'politica-privacidad',
		fr: 'politique-confidentialite',
		de: 'datenschutz',
		pt: 'politica-privacidade',
		it: 'privacy-policy',
		nl: 'privacybeleid',
		pl: 'polityka-prywatnosci',
		ru: 'politika-konfidencialnosti',
		tr: 'gizlilik-politikasi',
		ar: 'privacy-policy',
		ja: 'privacy-policy',
		ko: 'privacy-policy',
		zh: 'privacy-policy',
		hi: 'privacy-policy',
		id: 'privacy-policy',
		th: 'privacy-policy',
		vi: 'privacy-policy',
		uk: 'polityka-konfidentsijnosti',
		cs: 'ochrana-osobnich-udaju',
		ro: 'politica-confidentialitate',
		sv: 'integritetspolicy',
	},
	refund: {
		en: 'refund-policy',
		es: 'politica-reembolso',
		fr: 'politique-remboursement',
		de: 'rueckerstattung',
		pt: 'politica-reembolso',
		it: 'politica-rimborso',
		nl: 'terugbetalingsbeleid',
		pl: 'polityka-zwrotow',
		ru: 'politika-vozvrata',
		tr: 'iade-politikasi',
		ar: 'refund-policy',
		ja: 'refund-policy',
		ko: 'refund-policy',
		zh: 'refund-policy',
		hi: 'refund-policy',
		id: 'refund-policy',
		th: 'refund-policy',
		vi: 'refund-policy',
		uk: 'polityka-povorennya',
		cs: 'refund-policy',
		ro: 'politica-rambursare',
		sv: 'aterbetalningspolicy',
	},
	terms: {
		en: 'terms',
		es: 'terminos-uso',
		fr: 'conditions-utilisation',
		de: 'nutzungsbedingungen',
		pt: 'termos-uso',
		it: 'termini-uso',
		nl: 'gebruiksvoorwaarden',
		pl: 'regulamin',
		ru: 'usloviya-ispolzovaniya',
		tr: 'kullanim-kosullari',
		ar: 'terms',
		ja: 'terms',
		ko: 'terms',
		zh: 'terms',
		hi: 'terms',
		id: 'terms',
		th: 'terms',
		vi: 'terms',
		uk: 'umovy-vykorystannya',
		cs: 'podminky-uziti',
		ro: 'termeni-utilizare',
		sv: 'anvandarvillkor',
	},
};

export const pageIds = Object.keys(englishPaths) as PageId[];

export function getLocalizedPath(pageId: PageId, locale: LocaleCode): string {
	if (locale === defaultLocale) {
		return englishPaths[pageId];
	}
	const slug = localizedSlugs[pageId][locale];
	return slug ? `/${locale}/${slug}/` : `/${locale}/`;
}

/** Map English root paths to the correct locale URL (for CTAs and inline links). */
export function localizeInternalHref(href: string, locale: LocaleCode): string {
	if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) {
		return href;
	}
	const trimmed = href.replace(/\/+$/, '') || '/';
	const withSlash = trimmed === '/' ? '/' : `${trimmed}/`;
	for (const pageId of pageIds) {
		const english = englishPaths[pageId];
		if (english === withSlash || english.replace(/\/+$/, '') === trimmed) {
			return getLocalizedPath(pageId, locale);
		}
	}
	return href;
}

export function absoluteLocalizedUrl(pageId: PageId, locale: LocaleCode): string {
	return new URL(getLocalizedPath(pageId, locale), siteConfig.url).href;
}

/**
 * Canonical path for SEO — each locale page canonicalizes to its own localized URL.
 */
export function getCanonicalPath(pageId: PageId, locale: LocaleCode = defaultLocale): string {
	return getLocalizedPath(pageId, locale);
}

export function absoluteCanonicalUrl(pageId: PageId, locale: LocaleCode = defaultLocale): string {
	return absoluteLocalizedUrl(pageId, locale);
}

/** Full hreflang cluster — all locales plus x-default (English). */
export function getHreflangAlternates(pageId: PageId) {
	return [
		...locales.map((locale) => ({
			hreflang: locale.hreflang,
			href: absoluteLocalizedUrl(pageId, locale.code),
		})),
		{ hreflang: 'x-default' as const, href: absoluteLocalizedUrl(pageId, defaultLocale) },
	];
}

export function resolvePageIdFromPath(path: string): PageId | undefined {
	const normalized = path.endsWith('/') ? path : `${path}/`;
	for (const id of pageIds) {
		if (englishPaths[id] === normalized) return id;
	}
	return undefined;
}

export function hreflangLinksXml(pageId: PageId, escapeXml: (v: string) => string): string {
	return getHreflangAlternates(pageId)
		.map(
			(alt) =>
				`    <xhtml:link rel="alternate" hreflang="${escapeXml(alt.hreflang)}" href="${escapeXml(alt.href)}"/>`,
		)
		.join('\n');
}

export function resolvePageFromLocalizedPath(
	locale: LocaleCode,
	slug: string | undefined,
): PageId | undefined {
	if (!slug) return 'home';
	for (const pageId of pageIds) {
		if (localizedSlugs[pageId][locale] === slug) return pageId;
	}
	return undefined;
}

/** Map Accept-Language header to preferred locale (region-aware). */
export function localeFromAcceptLanguage(header: string | null): LocaleCode {
	if (!header) return defaultLocale;
	const prefs = header
		.split(',')
		.map((part) => {
			const [tag, qPart] = part.trim().split(';');
			const q = qPart?.startsWith('q=') ? Number.parseFloat(qPart.slice(2)) : 1;
			return { tag: tag.toLowerCase(), q };
		})
		.sort((a, b) => b.q - a.q);

	for (const { tag } of prefs) {
		const primary = tag.split('-')[0];
		if (localeCodes.includes(primary as LocaleCode)) return primary as LocaleCode;
	}
	return defaultLocale;
}

export function getNavForLocale(locale: LocaleCode, labels: Record<string, string>) {
	const items: { label: string; href: string; pageId?: PageId }[] = [
		{ label: labels.home, href: getLocalizedPath('home', locale), pageId: 'home' },
		{ label: labels.features, href: getLocalizedPath('features', locale), pageId: 'features' },
		{ label: labels.cheats ?? 'Cheats', href: getLocalizedPath('hacks', locale), pageId: 'hacks' },
		{ label: labels.updates, href: getLocalizedPath('updates', locale), pageId: 'updates' },
		{ label: labels.pricing, href: getLocalizedPath('pricing', locale), pageId: 'pricing' },
		{ label: labels.faq, href: getLocalizedPath('faq', locale), pageId: 'faq' },
		{ label: labels.reviews ?? 'Reviews', href: '/reviews/' },
	];
	return items;
}
