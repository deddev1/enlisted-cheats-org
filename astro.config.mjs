// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Static Cloudflare Pages site — no deployment adapter.
// Do not add @astrojs/cloudflare; sitemaps and HTML must emit to dist/ root.
// https://astro.build/config
export default defineConfig({
	site: 'https://enlistedcheats.org',
	trailingSlash: 'always',
	compressHTML: true,
	devToolbar: { enabled: false },
	server: {
		host: true,
		port: 4321,
		strictPort: true,
	},
	preview: {
		host: true,
		port: 4321,
		strictPort: true,
	},
	build: {
		// 'auto' keeps small styles inline but emits the large Tailwind bundle as a
		// cached external file — 'always' inflated HTML to ~160KB and tanked the
		// text/HTML ratio that SEO checkers score.
		inlineStylesheets: 'auto',
		format: 'directory',
	},
	vite: {
		plugins: [tailwindcss()],
		server: {
			allowedHosts: true,
		},
		preview: {
			allowedHosts: true,
		},
		build: {
			cssMinify: true,
			minify: 'terser',
			assetsInlineLimit: 4096,
			target: 'es2022',
			rollupOptions: {
				output: {
					manualChunks: undefined,
				},
			},
		},
	},
});
