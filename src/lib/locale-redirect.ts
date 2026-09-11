import {
	defaultLocale,
	isLocaleCode,
	localeCodes,
	type LocaleCode,
} from '../data/i18n/locales';
import {
	getLocalizedPath,
	resolvePageFromLocalizedPath,
	resolvePageIdFromPath,
	type PageId,
} from '../data/i18n/routing';

const LOCALE_COOKIE = 'fc_locale';

/** ISO country → default site locale (UK/GB and English markets → en). */
const COUNTRY_LOCALE: Record<string, LocaleCode> = {
	GB: 'en',
	US: 'en',
	IE: 'en',
	AU: 'en',
	NZ: 'en',
	CA: 'en',
	ZA: 'en',
	FR: 'fr',
	DE: 'de',
	AT: 'de',
	CH: 'de',
	ES: 'es',
	MX: 'es',
	AR: 'es',
	CO: 'es',
	CL: 'es',
	PE: 'es',
	PT: 'pt',
	BR: 'pt',
	IT: 'it',
	NL: 'nl',
	BE: 'nl',
	PL: 'pl',
	RU: 'ru',
	TR: 'tr',
	SA: 'ar',
	AE: 'ar',
	EG: 'ar',
	JP: 'ja',
	KR: 'ko',
	CN: 'zh',
	TW: 'zh',
	SG: 'zh',
	TH: 'th',
	VN: 'vi',
	UA: 'uk',
	CZ: 'cs',
	RO: 'ro',
	SE: 'sv',
	NO: 'sv',
	DK: 'sv',
	FI: 'sv',
	IN: 'hi',
	ID: 'id',
};

const SKIP_PREFIXES = [
	'/blog',
	'/reviews',
	'/api',
	'/sitemap',
	'/robots.txt',
	'/favicon',
	'/images/',
	'/fonts/',
	'/_astro/',
];

export function parseLocaleCookie(cookieHeader: string | null): LocaleCode | null {
	if (!cookieHeader) return null;
	const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${LOCALE_COOKIE}=([^;]+)`));
	const value = match?.[1]?.trim();
	return value && isLocaleCode(value) ? value : null;
}

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
		const [primary, region] = tag.split('-');
		if (region === 'gb' || region === 'uk') return 'en';
		if (isLocaleCode(primary)) return primary;
	}

	return defaultLocale;
}

export function localeFromCountry(country: string | null | undefined): LocaleCode | null {
	if (!country) return null;
	const code = country.toUpperCase();
	return COUNTRY_LOCALE[code] ?? null;
}

export function detectPreferredLocale(input: {
	acceptLanguage?: string | null;
	cookie?: string | null;
	country?: string | null;
}): LocaleCode {
	const fromCookie = parseLocaleCookie(input.cookie ?? null);
	if (fromCookie) return fromCookie;

	const fromLang = localeFromAcceptLanguage(input.acceptLanguage ?? null);
	if (fromLang !== defaultLocale) return fromLang;

	const fromCountry = localeFromCountry(input.country);
	if (fromCountry) return fromCountry;

	return defaultLocale;
}

export function resolvePathContext(pathname: string): { locale: LocaleCode; pageId: PageId } {
	const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
	const segments = normalized.split('/').filter(Boolean);

	if (segments.length > 0 && isLocaleCode(segments[0]) && segments[0] !== defaultLocale) {
		const locale = segments[0];
		const slug = segments[1];
		const pageId = resolvePageFromLocalizedPath(locale, slug) ?? 'home';
		return { locale, pageId };
	}

	const pageId = resolvePageIdFromPath(normalized) ?? 'home';
	return { locale: defaultLocale, pageId };
}

export function shouldSkipLocaleRedirect(pathname: string): boolean {
	if (/\.[a-z0-9]+$/i.test(pathname)) return true;
	return SKIP_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(prefix));
}

/**
 * Returns a redirect target when the visitor's preferred locale differs from the
 * page locale. Respects `fc_locale` cookie and `?lang=` query overrides.
 */
export function getLocaleRedirectTarget(
	pathname: string,
	search: string,
	headers: {
		acceptLanguage?: string | null;
		cookie?: string | null;
		country?: string | null;
	},
): string | null {
	if (shouldSkipLocaleRedirect(pathname)) return null;

	const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
	if (params.has('noredirect')) return null;

	const langParam = params.get('lang');
	if (langParam && isLocaleCode(langParam)) return null;

	const { locale: currentLocale, pageId } = resolvePathContext(pathname);
	const preferred = detectPreferredLocale(headers);

	if (preferred === currentLocale) return null;

	const targetPath = getLocalizedPath(pageId, preferred);
	const target = new URL(targetPath, 'https://enlistedcheats.org');
	target.search = search;
	return target.pathname + target.search;
}

/** Slug lookup table exported for edge middleware (no TS on Cloudflare functions). */
export const localeRedirectExports = {
	localeCodes,
	defaultLocale,
	LOCALE_COOKIE,
	COUNTRY_LOCALE,
};
