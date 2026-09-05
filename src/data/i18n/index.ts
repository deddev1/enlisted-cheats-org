import type { LocaleCode } from './locales';
import { i18nContent, type PageId } from './content.generated';
import { resolvePageHeroAlt, resolvePageHeroImage } from '../enlisted';

export { i18nContent };
export type { PageId, PageContent, PageSection, LocaleUi } from './content.generated';

export function getLocaleContent(locale: LocaleCode) {
	return i18nContent[locale];
}

export function getPageContent(locale: LocaleCode, pageId: PageId) {
	const page = i18nContent[locale].pages[pageId];
	const heroImage = resolvePageHeroImage(pageId, page.heroImage);
	return {
		...page,
		heroImage,
		imageAlt: resolvePageHeroAlt(pageId, heroImage, page.imageAlt),
	};
}

export function getUi(locale: LocaleCode) {
	return i18nContent[locale].ui;
}
