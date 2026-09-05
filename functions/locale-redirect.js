const LOCALE_COOKIE = 'fc_locale';
const DEFAULT_LOCALE = 'en';
const LOCALE_CODES = new Set([
	'en', 'es', 'fr', 'de', 'pt', 'it', 'nl', 'pl', 'ru', 'tr',
	'ar', 'ja', 'ko', 'zh', 'hi', 'id', 'th', 'vi', 'uk', 'cs', 'ro', 'sv',
]);

const COUNTRY_LOCALE = {
	GB: 'en', US: 'en', IE: 'en', AU: 'en', NZ: 'en', CA: 'en', ZA: 'en',
	FR: 'fr', DE: 'de', AT: 'de', CH: 'de', ES: 'es', MX: 'es', AR: 'es',
	PT: 'pt', BR: 'pt', IT: 'it', NL: 'nl', BE: 'nl', PL: 'pl', RU: 'ru',
	TR: 'tr', SA: 'ar', AE: 'ar', JP: 'ja', KR: 'ko', CN: 'zh', TW: 'zh',
	TH: 'th', VN: 'vi', UA: 'uk', CZ: 'cs', RO: 'ro', SE: 'sv', IN: 'hi', ID: 'id',
};

/**
 * Redirect homepage visitors to their locale folder when appropriate.
 * Full path mapping for inner pages is handled client-side via LocaleSuggest.
 */
export function getHomeLocaleRedirect(pathname, search, headers) {
	if (pathname !== '/' && pathname !== '') return null;
	if (search && new URLSearchParams(search).has('noredirect')) return null;

	const cookie = headers.get('cookie');
	const cookieMatch = cookie?.match(new RegExp(`(?:^|;\\s*)${LOCALE_COOKIE}=([^;]+)`));
	const cookieLocale = cookieMatch?.[1]?.trim();
	if (cookieLocale && LOCALE_CODES.has(cookieLocale)) {
		if (cookieLocale === DEFAULT_LOCALE) return null;
		return `/${cookieLocale}/`;
	}

	const accept = headers.get('accept-language');
	if (accept) {
		for (const part of accept.split(',')) {
			const tag = part.trim().split(';')[0].toLowerCase();
			if (tag.endsWith('-gb') || tag.endsWith('-uk')) return null;
			const primary = tag.split('-')[0];
			if (LOCALE_CODES.has(primary) && primary !== DEFAULT_LOCALE) {
				return `/${primary}/`;
			}
		}
	}

	const country = headers.get('cf-ipcountry');
	const fromCountry = country ? COUNTRY_LOCALE[country] : null;
	if (fromCountry && fromCountry !== DEFAULT_LOCALE) {
		return `/${fromCountry}/`;
	}

	return null;
}
