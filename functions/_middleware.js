import { getHomeLocaleRedirect } from './locale-redirect.js';
import { GUIDE_SLUG_REDIRECTS } from './guide-slug-redirects.js';
import { LOCALE_PATH_REDIRECTS } from './locale-path-redirects.js';

const CANONICAL_ORIGIN = 'https://enlistedcheats.org';
const APEX_HOST = 'enlistedcheats.org';
const WWW_HOST = 'www.enlistedcheats.org';

/** Old hosts → canonical apex (301). Never include the apex host itself. */
const LEGACY_HOSTS = new Set([
	'arcraidershacks.net',
	'www.arcraidershacks.net',
	'arcraidershacks.com',
	'www.arcraidershacks.com',
	'overwatchhacks.com',
	'www.overwatchhacks.com',
	'warthunderhacks.net',
	'www.warthunderhacks.net',
	'fortnitehack.net',
	'www.fortnitehack.net',
	'fortnitecheats.xyz',
	'www.fortnitecheats.xyz',
	'fortnitecheats.net',
	'www.fortnitecheats.net',
	'fortnitecheats.com',
	'www.fortnitecheats.com',
]);

// Keep in sync with public/_redirects (which preserves query strings by default).
// All targets are final canonical URLs — no chains/loops.
const PATH_REDIRECTS = {
	'/warframe-radar/': '/enlisted-radar/',
	'/warframe-radar': '/enlisted-radar/',
	'/warframe-wallhack/': '/enlisted-wallhack/',
	'/warframe-wallhack': '/enlisted-wallhack/',
	'/warframe-aimbot/': '/enlisted-aimbot/',
	'/warframe-aimbot': '/enlisted-aimbot/',
	'/warframe-esp/': '/enlisted-esp/',
	'/warframe-esp': '/enlisted-esp/',
	'/warframe-cheats/': '/enlisted-cheats/',
	'/warframe-cheats': '/enlisted-cheats/',
	'/sitemap-0.xml': '/sitemap.xml',
	'/blog/enlisted-cheats-2026-whats-new/': '/blog/enlisted-cheats-complete-guide-2026/',
	'/blog/enlisted-cheats-2026-whats-new': '/blog/enlisted-cheats-complete-guide-2026/',
	'/guides/other-games/': '/guides/#other-games-guides',
	'/guides/other-games': '/guides/#other-games-guides',
	'/fortnite-cheats': '/',
	'/fortnite-cheats/': '/',
	'/fortnite-hacks': '/enlisted-cheats/',
	'/fortnite-hacks/': '/enlisted-cheats/',
	'/fortnite-aimbot': '/enlisted-aimbot/',
	'/fortnite-aimbot/': '/enlisted-aimbot/',
	'/fortnite-esp': '/enlisted-esp/',
	'/fortnite-esp/': '/enlisted-esp/',
	'/fortnite-wallhack': '/enlisted-wallhack/',
	'/fortnite-wallhack/': '/enlisted-wallhack/',
	'/undetected-fortnite-cheats': '/enlisted-cheats/',
	'/undetected-fortnite-cheats/': '/enlisted-cheats/',
	'/eac-bypass-fortnite': '/enlisted-cheats/',
	'/eac-bypass-fortnite/': '/enlisted-cheats/',
	'/eac-bypass': '/enlisted-cheats/',
	'/eac-bypass/': '/enlisted-cheats/',
	'/warzone-aimbot': '/enlisted-aimbot/',
	'/warzone-aimbot/': '/enlisted-aimbot/',
	'/warzone-esp': '/enlisted-esp/',
	'/warzone-esp/': '/enlisted-esp/',
	'/ricochet-bypass': '/enlisted-cheats/',
	'/ricochet-bypass/': '/enlisted-cheats/',
	'/arc-raiders-hacks': '/enlisted-cheats/',
	'/arc-raiders-hacks/': '/enlisted-cheats/',
	'/arc-raiders-esp': '/enlisted-esp/',
	'/arc-raiders-esp/': '/enlisted-esp/',
	'/arc-raiders-aimbot': '/enlisted-aimbot/',
	'/arc-raiders-aimbot/': '/enlisted-aimbot/',
	'/arc-raiders-wallhack': '/enlisted-wallhack/',
	'/arc-raiders-wallhack/': '/enlisted-wallhack/',
	'/arc-raiders-radar': '/enlisted-radar/',
	'/arc-raiders-radar/': '/enlisted-radar/',
	'/overwatch-hacks': '/enlisted-cheats/',
	'/overwatch-hacks/': '/enlisted-cheats/',
	'/overwatch-esp': '/enlisted-esp/',
	'/overwatch-esp/': '/enlisted-esp/',
	'/overwatch-aimbot': '/enlisted-aimbot/',
	'/overwatch-aimbot/': '/enlisted-aimbot/',
	'/overwatch-wallhack': '/enlisted-wallhack/',
	'/overwatch-wallhack/': '/enlisted-wallhack/',
	'/overwatch-radar': '/enlisted-radar/',
	'/overwatch-radar/': '/enlisted-radar/',
	'/war-thunder-hacks': '/enlisted-cheats/',
	'/war-thunder-hacks/': '/enlisted-cheats/',
	'/war-thunder-esp': '/enlisted-esp/',
	'/war-thunder-esp/': '/enlisted-esp/',
	'/war-thunder-aimbot': '/enlisted-aimbot/',
	'/war-thunder-aimbot/': '/enlisted-aimbot/',
	'/war-thunder-wallhack': '/enlisted-wallhack/',
	'/war-thunder-wallhack/': '/enlisted-wallhack/',
	'/war-thunder-radar': '/enlisted-radar/',
	'/war-thunder-radar/': '/enlisted-radar/',
	'/rust-hacks': '/enlisted-cheats/',
	'/rust-hacks/': '/enlisted-cheats/',
	'/rust-aimbot': '/enlisted-aimbot/',
	'/rust-aimbot/': '/enlisted-aimbot/',
	'/rust-esp': '/enlisted-esp/',
	'/rust-esp/': '/enlisted-esp/',
	'/enlisted-cheats': '/enlisted-cheats/',
	'/enlisted-esp': '/enlisted-esp/',
	'/enlisted-aimbot': '/enlisted-aimbot/',
	'/enlisted-wallhack': '/enlisted-wallhack/',
	'/enlisted-radar': '/enlisted-radar/',
	'/enlisted-radar-hack': '/enlisted-radar/',
	'/enlisted-radar-hack/': '/enlisted-radar/',
	'/undetected-enlisted-cheats': '/enlisted-cheats/',
	'/undetected-enlisted-cheats/': '/enlisted-cheats/',
	'/eac-bypass-enlisted': '/enlisted-cheats/',
	'/eac-bypass-enlisted/': '/enlisted-cheats/',
	'/enlisted-cheats-2026': '/enlisted-cheats/',
	'/enlisted-cheats-2026/': '/enlisted-cheats/',
	'/best-enlisted-cheats': '/enlisted-cheats/',
	'/best-enlisted-cheats/': '/enlisted-cheats/',
	'/enlisted-cheat-download': '/pricing/',
	'/enlisted-cheat-download/': '/pricing/',
	'/enlisted-mod-menu': '/features/',
	'/enlisted-mod-menu/': '/features/',
	'/enlisted-soft-aim': '/enlisted-aimbot/',
	'/enlisted-soft-aim/': '/enlisted-aimbot/',
	'/enlisted-aimbot-hack': '/enlisted-aimbot/',
	'/enlisted-aimbot-hack/': '/enlisted-aimbot/',
	'/enlisted-esp-hack': '/enlisted-esp/',
	'/enlisted-esp-hack/': '/enlisted-esp/',
	'/enlisted-unlock-all': '/features/',
	'/enlisted-unlock-all/': '/features/',
	'/blog/elitefn-vs-enlisted-cheats-two-week-test': '/blog/voidcheats-vs-enlisted-cheats-two-week-test/',
	'/blog/elitefn-vs-enlisted-cheats-two-week-test/': '/blog/voidcheats-vs-enlisted-cheats-two-week-test/',
};

const SECURITY_HEADERS = {
	'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
	'X-Content-Type-Options': 'nosniff',
	'Referrer-Policy': 'strict-origin-when-cross-origin',
	'X-Frame-Options': 'DENY',
	'Cross-Origin-Opener-Policy': 'same-origin',
	'Cross-Origin-Resource-Policy': 'same-origin',
	'Cross-Origin-Embedder-Policy': 'credentialless',
	'Origin-Agent-Cluster': '?1',
	'Permissions-Policy':
		'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()',
	'Content-Security-Policy': [
		"default-src 'self'",
		"base-uri 'self'",
		"object-src 'none'",
		"frame-ancestors 'none'",
		"form-action 'self' https://zadeyo.com",
		"img-src 'self' data: blob: https:",
		"media-src 'self'",
		"font-src 'self' data:",
		"style-src 'self' 'unsafe-inline'",
		"script-src 'self' 'unsafe-inline'",
		"connect-src 'self'",
		"upgrade-insecure-requests",
		"trusted-types default",
		"require-trusted-types-for 'script'",
	].join('; '),
};

function getClientProtocol(request) {
	const visitor = request.headers.get('cf-visitor');
	if (visitor) {
		try {
			const scheme = JSON.parse(visitor).scheme;
			if (scheme) return String(scheme).toLowerCase();
		} catch {
			// ignore malformed cf-visitor
		}
	}

	const forwarded = request.headers.get('x-forwarded-proto');
	if (forwarded) {
		return forwarded.split(',')[0].trim().toLowerCase();
	}

	return new URL(request.url).protocol.replace(':', '').toLowerCase();
}

/** Partner guide routes — hub, wrappers, and legacy paths must never be indexed. */
function isPartnerGuidePath(pathname) {
	return pathname === '/guides' || pathname.startsWith('/guides/');
}

function applySecurityHeaders(headers, { html = false, noindex = false } = {}) {
	for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
		headers.set(key, value);
	}

	if (noindex) {
		headers.set('X-Robots-Tag', 'noindex, nofollow');
	}

	if (html) {
		const contentType = headers.get('Content-Type') || '';
		if (!/charset=/i.test(contentType)) {
			headers.set('Content-Type', 'text/html; charset=utf-8');
		}
		headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
		headers.set('CDN-Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
		headers.set('Cloudflare-CDN-Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
	}
}

export async function onRequest(context) {
	const url = new URL(context.request.url);
	const host = url.hostname.toLowerCase();
	const proto = getClientProtocol(context.request);

	const isLegacyHost = LEGACY_HOSTS.has(host);
	const isProductionHost = host === APEX_HOST || host === WWW_HOST || isLegacyHost;
	const needsHostRedirect = host === WWW_HOST || isLegacyHost;
	const needsHttpsRedirect = isProductionHost && proto === 'http';

	if (needsHostRedirect || needsHttpsRedirect) {
		const mappedPath = PATH_REDIRECTS[url.pathname] ?? url.pathname;
		const target = new URL(mappedPath + url.search, CANONICAL_ORIGIN);
		// Never redirect to the same URL — prevents loops if LEGACY_HOSTS is misconfigured.
		if (target.origin + target.pathname + target.search !== url.origin + url.pathname + url.search) {
			const headers = new Headers({
				Location: target.toString(),
				'Cache-Control': 'no-store',
				'CDN-Cache-Control': 'no-store',
				'Cloudflare-CDN-Cache-Control': 'no-store',
			});
			applySecurityHeaders(headers, { noindex: isPartnerGuidePath(mappedPath) });
			return new Response(null, { status: 301, headers });
		}
	}

	const pathRedirect = PATH_REDIRECTS[url.pathname] ?? GUIDE_SLUG_REDIRECTS[url.pathname];
	if (pathRedirect) {
		const headers = new Headers({
			Location: new URL(pathRedirect + url.search, CANONICAL_ORIGIN).toString(),
			'Cache-Control': 'no-store',
		});
		applySecurityHeaders(headers, {
			noindex: isPartnerGuidePath(url.pathname) || isPartnerGuidePath(pathRedirect.split('#')[0]),
		});
		return new Response(null, { status: 301, headers });
	}

	const localePathRedirect = LOCALE_PATH_REDIRECTS[url.pathname];
	if (localePathRedirect) {
		const headers = new Headers({
			Location: new URL(localePathRedirect + url.search, CANONICAL_ORIGIN).toString(),
			'Cache-Control': 'no-store',
		});
		applySecurityHeaders(headers);
		return new Response(null, { status: 301, headers });
	}

	const homeLocaleRedirect = getHomeLocaleRedirect(
		url.pathname,
		url.search,
		context.request.headers,
	);
	if (homeLocaleRedirect) {
		const headers = new Headers({
			Location: new URL(homeLocaleRedirect + url.search, CANONICAL_ORIGIN).toString(),
			'Cache-Control': 'no-store',
		});
		applySecurityHeaders(headers);
		return new Response(null, { status: 302, headers });
	}

	const response = await context.next();
	const headers = new Headers(response.headers);
	const contentType = headers.get('Content-Type') || '';
	const isHtml = contentType.includes('text/html');

	applySecurityHeaders(headers, {
		html: isHtml,
		noindex: isPartnerGuidePath(url.pathname),
	});

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
}
