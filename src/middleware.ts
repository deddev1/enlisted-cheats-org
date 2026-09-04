import { defineMiddleware } from 'astro:middleware';
import { applySecurityHeaders } from './lib/security-headers.js';
import { getLocaleRedirectTarget } from './lib/locale-redirect.js';

/**
 * Applies security headers and locale auto-detection redirects during dev/preview.
 */
export const onRequest = defineMiddleware(async (context, next) => {
	const { request, url, isPrerendered } = context;

	if (request.method === 'GET' || request.method === 'HEAD') {
		const isLocalHost =
			url.hostname === 'localhost' ||
			url.hostname === '127.0.0.1' ||
			url.hostname === '0.0.0.0';

		/** Skip during static prerender — no Accept-Language, so every locale would redirect to en. */
		if (!isPrerendered && (!import.meta.env.DEV || !isLocalHost)) {
			const redirectTarget = getLocaleRedirectTarget(url.pathname, url.search, {
				acceptLanguage: request.headers.get('accept-language'),
				cookie: request.headers.get('cookie'),
				country: request.headers.get('cf-ipcountry'),
			});

			if (redirectTarget) {
				const headers = new Headers({
					Location: redirectTarget,
					'Cache-Control': 'no-store',
				});
				applySecurityHeaders(headers);
				return new Response(null, { status: 302, headers });
			}
		}
	}

	const response = await next();
	const headers = new Headers(response.headers);
	const contentType = headers.get('Content-Type') || '';
	const isHtml = contentType.includes('text/html');

	applySecurityHeaders(headers, {
		html: isHtml,
		dev: import.meta.env.DEV,
	});

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
});
