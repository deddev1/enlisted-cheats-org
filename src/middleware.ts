import { defineMiddleware } from 'astro:middleware';
import { applySecurityHeaders } from './lib/security-headers.js';
import { getLocaleRedirectTarget } from './lib/locale-redirect.js';

function isLocalHostname(hostname: string): boolean {
	return (
		hostname === 'localhost' ||
		hostname === '127.0.0.1' ||
		hostname === '0.0.0.0' ||
		hostname.startsWith('172.') ||
		hostname.startsWith('192.168.') ||
		hostname.endsWith('.local')
	);
}

/**
 * Applies security headers and locale auto-detection redirects during dev/preview.
 */
export const onRequest = defineMiddleware(async (context, next) => {
	const { request, url, isPrerendered } = context;

	if (request.method === 'GET' || request.method === 'HEAD') {
		const isLocalHost = isLocalHostname(url.hostname);

		/** Skip locale auto-redirect on local dev/preview so every route is easy to test. */
		if (!isPrerendered && !import.meta.env.DEV && !isLocalHost) {
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
