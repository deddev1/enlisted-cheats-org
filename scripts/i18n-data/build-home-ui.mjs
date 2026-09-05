#!/usr/bin/env node
/** Builds scripts/i18n-data/home-ui.generated.mjs from locale phrase data + paths. */
import { writeFileSync } from 'node:fs';
import { localePhrases } from './locale-phrases.mjs';
import { englishPaths, localizedSlugs } from './paths.mjs';

const LOCALES = [
	'en', 'es', 'fr', 'de', 'pt', 'it', 'nl', 'pl', 'ru', 'tr',
	'ar', 'ja', 'ko', 'zh', 'hi', 'id', 'th', 'vi', 'uk', 'cs', 'ro', 'sv',
];

function localePath(locale, pageId) {
	if (locale === 'en') return englishPaths[pageId];
	const slug = localizedSlugs[pageId]?.[locale];
	if (pageId === 'home') return slug === '' ? `/${locale}/` : `/${locale}/${slug}/`;
	return `/${locale}/${slug}/`;
}

function L(locale, pageId, label) {
	return `<a href="${localePath(locale, pageId)}">${label}</a>`;
}

const COPY = {
	en: {
		aboutTitle: 'Cheats for Enlisted',
		modulesLabel: 'Included in every license:',
		wallhack: 'Wallhack',
		radar: 'Radar',
		premiumTitle: 'Premium access',
		viewPricing: 'View pricing',
		faqTitle: 'Frequently asked questions',
		faqIntro: 'Quick answers about setup, features, campaign missions and large-scale battles, patch-day status, and support.',
		faqSeeAll: 'See all FAQ questions',
		faqGuides: 'Read Enlisted guides',
		catStart: 'Getting started',
		catFeatures: 'Features & gameplay',
		catUpdates: 'Updates & support',
	},
	es: {
		aboutTitle: 'Trucos para Enlisted',
		modulesLabel: 'Incluido en cada licencia:',
		wallhack: 'Wallhack',
		radar: 'Radar',
		premiumTitle: 'Acceso premium',
		viewPricing: 'Ver precios',
		faqTitle: 'Preguntas frecuentes',
		faqIntro: 'Respuestas rápidas sobre instalación, funciones, misiones de campaña, estado tras parches y soporte.',
		faqSeeAll: 'Ver todas las preguntas',
		faqGuides: 'Leer guías de Enlisted',
		catStart: 'Primeros pasos',
		catFeatures: 'Funciones y juego',
		catUpdates: 'Actualizaciones y soporte',
	},
	fr: {
		aboutTitle: 'Triches pour Enlisted',
		modulesLabel: 'Inclus dans chaque licence :',
		wallhack: 'Wallhack',
		radar: 'Radar',
		premiumTitle: 'Accès premium',
		viewPricing: 'Voir les tarifs',
		faqTitle: 'Questions fréquentes',
		faqIntro: 'Réponses rapides sur l\'installation, les fonctions, les missions de campagne, les patchs et le support.',
		faqSeeAll: 'Voir toutes les questions',
		faqGuides: 'Lire les guides Enlisted',
		catStart: 'Premiers pas',
		catFeatures: 'Fonctions et gameplay',
		catUpdates: 'Mises à jour et support',
	},
	de: {
		aboutTitle: 'Cheats für Enlisted',
		modulesLabel: 'In jeder Lizenz enthalten:',
		wallhack: 'Wallhack',
		radar: 'Radar',
		premiumTitle: 'Premium-Zugang',
		viewPricing: 'Preise ansehen',
		faqTitle: 'Häufige Fragen',
		faqIntro: 'Kurze Antworten zu Setup, Features, Kampagnenmissionen, Patch-Status und Support.',
		faqSeeAll: 'Alle FAQ-Fragen',
		faqGuides: 'Enlisted-Guides lesen',
		catStart: 'Erste Schritte',
		catFeatures: 'Features & Gameplay',
		catUpdates: 'Updates & Support',
	},
	pt: { aboutTitle: 'Cheats para Enlisted', modulesLabel: 'Incluído em cada licença:', wallhack: 'Wallhack', radar: 'Radar', premiumTitle: 'Acesso premium', viewPricing: 'Ver preços', faqTitle: 'Perguntas frequentes', faqIntro: 'Respostas rápidas sobre instalação, recursos, missões de campanha, patches e suporte.', faqSeeAll: 'Ver todas as perguntas', faqGuides: 'Ler guias Enlisted', catStart: 'Primeiros passos', catFeatures: 'Recursos e jogo', catUpdates: 'Atualizações e suporte' },
	it: { aboutTitle: 'Cheat per Enlisted', modulesLabel: 'Incluso in ogni licenza:', wallhack: 'Wallhack', radar: 'Radar', premiumTitle: 'Accesso premium', viewPricing: 'Vedi prezzi', faqTitle: 'Domande frequenti', faqIntro: 'Risposte rapide su setup, funzioni, missioni campagna, patch e supporto.', faqSeeAll: 'Vedi tutte le domande', faqGuides: 'Leggi le guide Enlisted', catStart: 'Per iniziare', catFeatures: 'Funzioni e gameplay', catUpdates: 'Aggiornamenti e supporto' },
	nl: { aboutTitle: 'Cheats voor Enlisted', modulesLabel: 'Inbegrepen in elke licentie:', wallhack: 'Wallhack', radar: 'Radar', premiumTitle: 'Premium toegang', viewPricing: 'Prijzen bekijken', faqTitle: 'Veelgestelde vragen', faqIntro: 'Snelle antwoorden over setup, functies, campagnemissies, patches en support.', faqSeeAll: 'Alle FAQ-vragen', faqGuides: 'Enlisted-gidsen lezen', catStart: 'Aan de slag', catFeatures: 'Functies & gameplay', catUpdates: 'Updates & support' },
	pl: { aboutTitle: 'Cheaty do Enlisted', modulesLabel: 'W każdej licencji:', wallhack: 'Wallhack', radar: 'Radar', premiumTitle: 'Dostęp premium', viewPricing: 'Zobacz cennik', faqTitle: 'Często zadawane pytania', faqIntro: 'Szybkie odpowiedzi o instalacji, funkcjach, misjach kampanii, patchach i wsparciu.', faqSeeAll: 'Wszystkie pytania FAQ', faqGuides: 'Przewodniki Enlisted', catStart: 'Pierwsze kroki', catFeatures: 'Funkcje i rozgrywka', catUpdates: 'Aktualizacje i wsparcie' },
	ru: { aboutTitle: 'Читы для Enlisted', modulesLabel: 'В каждой лицензии:', wallhack: 'Wallhack', radar: 'Radar', premiumTitle: 'Премиум-доступ', viewPricing: 'Смотреть цены', faqTitle: 'Частые вопросы', faqIntro: 'Краткие ответы об установке, функциях, кампаниях, патчах и поддержке.', faqSeeAll: 'Все вопросы FAQ', faqGuides: 'Гайды Enlisted', catStart: 'Начало работы', catFeatures: 'Функции и геймплей', catUpdates: 'Обновления и поддержка' },
	tr: { aboutTitle: 'Enlisted hileleri', modulesLabel: 'Her lisansa dahil:', wallhack: 'Wallhack', radar: 'Radar', premiumTitle: 'Premium erişim', viewPricing: 'Fiyatları gör', faqTitle: 'Sık sorulan sorular', faqIntro: 'Kurulum, özellikler, sefer görevleri, yamalar ve destek hakkında hızlı yanıtlar.', faqSeeAll: 'Tüm SSS soruları', faqGuides: 'Enlisted rehberleri', catStart: 'Başlarken', catFeatures: 'Özellikler ve oynanış', catUpdates: 'Güncellemeler ve destek' },
	ar: { aboutTitle: 'غش Enlisted', modulesLabel: 'مشمول في كل ترخيص:', wallhack: 'Wallhack', radar: 'Radar', premiumTitle: 'وصول مميز', viewPricing: 'عرض الأسعار', faqTitle: 'الأسئلة الشائعة', faqIntro: 'إجابات سريعة عن التثبيت والميزات ومهام الحملة والتص patches والدعم.', faqSeeAll: 'كل أسئلة FAQ', faqGuides: 'أدلة Enlisted', catStart: 'البدء', catFeatures: 'الميزات واللعب', catUpdates: 'التحديثات والدعم' },
	ja: { aboutTitle: 'Enlisted向けチート', modulesLabel: '全ライセンスに含む:', wallhack: 'Wallhack', radar: 'Radar', premiumTitle: 'プレミアムアクセス', viewPricing: '料金を見る', faqTitle: 'よくある質問', faqIntro: 'セットアップ、機能、キャンペーン、パッチ、サポートへの短い回答。', faqSeeAll: 'FAQをすべて見る', faqGuides: 'Enlistedガイド', catStart: 'はじめに', catFeatures: '機能とプレイ', catUpdates: '更新とサポート' },
	ko: { aboutTitle: 'Enlisted 치트', modulesLabel: '모든 라이선스 포함:', wallhack: 'Wallhack', radar: 'Radar', premiumTitle: '프리미엄 액세스', viewPricing: '가격 보기', faqTitle: '자주 묻는 질문', faqIntro: '설치, 기능, 캠페인, 패치, 지원에 대한 빠른 답변.', faqSeeAll: 'FAQ 전체 보기', faqGuides: 'Enlisted 가이드', catStart: '시작하기', catFeatures: '기능 및 게임플레이', catUpdates: '업데이트 및 지원' },
	zh: { aboutTitle: 'Enlisted 作弊', modulesLabel: '每份许可证均含:', wallhack: 'Wallhack', radar: 'Radar', premiumTitle: '高级访问', viewPricing: '查看价格', faqTitle: '常见问题', faqIntro: '关于安装、功能、战役任务、补丁和支持的快速解答。', faqSeeAll: '查看全部 FAQ', faqGuides: 'Enlisted 指南', catStart: '入门', catFeatures: '功能与玩法', catUpdates: '更新与支持' },
	hi: { aboutTitle: 'Enlisted cheats', modulesLabel: 'हर लाइसेंस में शामिल:', wallhack: 'Wallhack', radar: 'Radar', premiumTitle: 'Premium access', viewPricing: 'कीमत देखें', faqTitle: 'अक्सर पूछे जाने वाले प्रश्न', faqIntro: 'सेटअप, फ़ीचर्स, अभियान मिशन, पैच और सहायता पर त्वरित उत्तर।', faqSeeAll: 'सभी FAQ देखें', faqGuides: 'Enlisted गाइड', catStart: 'शुरुआत', catFeatures: 'फ़ीचर्स और गेमप्ले', catUpdates: 'अपडेट और सहायता' },
	id: { aboutTitle: 'Cheat Enlisted', modulesLabel: 'Termasuk di setiap lisensi:', wallhack: 'Wallhack', radar: 'Radar', premiumTitle: 'Akses premium', viewPricing: 'Lihat harga', faqTitle: 'Pertanyaan umum', faqIntro: 'Jawaban cepat tentang setup, fitur, misi kampanye, patch, dan dukungan.', faqSeeAll: 'Lihat semua FAQ', faqGuides: 'Panduan Enlisted', catStart: 'Memulai', catFeatures: 'Fitur & gameplay', catUpdates: 'Pembaruan & dukungan' },
	th: { aboutTitle: 'Cheats สำหรับ Enlisted', modulesLabel: 'รวมในทุกใบอนุญาต:', wallhack: 'Wallhack', radar: 'Radar', premiumTitle: 'การเข้าถึงพรีเมียม', viewPricing: 'ดูราคา', faqTitle: 'คำถามที่พบบ่อย', faqIntro: 'คำตอบสั้นๆ เกี่ยวกับการติดตั้ง ฟีเจอร์ ภารกิจแคมเปญ แพตช์ และการสนับสนุน', faqSeeAll: 'ดู FAQ ทั้งหมด', faqGuides: 'คู่มือ Enlisted', catStart: 'เริ่มต้น', catFeatures: 'ฟีเจอร์และเกมเพลย์', catUpdates: 'อัปเดตและการสนับสนุน' },
	vi: { aboutTitle: 'Cheat Enlisted', modulesLabel: 'Có trong mỗi giấy phép:', wallhack: 'Wallhack', radar: 'Radar', premiumTitle: 'Truy cập premium', viewPricing: 'Xem giá', faqTitle: 'Câu hỏi thường gặp', faqIntro: 'Câu trả lời nhanh về cài đặt, tính năng, nhiệm vụ chiến dịch, bản vá và hỗ trợ.', faqSeeAll: 'Xem tất cả FAQ', faqGuides: 'Hướng dẫn Enlisted', catStart: 'Bắt đầu', catFeatures: 'Tính năng & lối chơi', catUpdates: 'Cập nhật & hỗ trợ' },
	uk: { aboutTitle: 'Чіти для Enlisted', modulesLabel: 'У кожній ліцензії:', wallhack: 'Wallhack', radar: 'Radar', premiumTitle: 'Преміум-доступ', viewPricing: 'Дивитися ціни', faqTitle: 'Поширені запитання', faqIntro: 'Короткі відповіді про встановлення, функції, кампанії, патчі та підтримку.', faqSeeAll: 'Усі питання FAQ', faqGuides: 'Гайди Enlisted', catStart: 'Початок', catFeatures: 'Функції та геймплей', catUpdates: 'Оновлення та підтримка' },
	cs: { aboutTitle: 'Cheaty pro Enlisted', modulesLabel: 'V každé licenci:', wallhack: 'Wallhack', radar: 'Radar', premiumTitle: 'Premium přístup', viewPricing: 'Zobrazit ceny', faqTitle: 'Časté dotazy', faqIntro: 'Rychlé odpovědi k instalaci, funkcím, kampaňovým misím, patchům a podpoře.', faqSeeAll: 'Všechny FAQ', faqGuides: 'Průvodce Enlisted', catStart: 'Začínáme', catFeatures: 'Funkce a hraní', catUpdates: 'Aktualizace a podpora' },
	ro: { aboutTitle: 'Cheats pentru Enlisted', modulesLabel: 'Inclus în fiecare licență:', wallhack: 'Wallhack', radar: 'Radar', premiumTitle: 'Acces premium', viewPricing: 'Vezi prețuri', faqTitle: 'Întrebări frecvente', faqIntro: 'Răspunsuri rapide despre instalare, funcții, misiuni de campanie, patch-uri și suport.', faqSeeAll: 'Toate întrebările FAQ', faqGuides: 'Ghiduri Enlisted', catStart: 'Primii pași', catFeatures: 'Funcții și gameplay', catUpdates: 'Actualizări și suport' },
	sv: { aboutTitle: 'Cheats för Enlisted', modulesLabel: 'Ingår i varje licens:', wallhack: 'Wallhack', radar: 'Radar', premiumTitle: 'Premiumåtkomst', viewPricing: 'Se priser', faqTitle: 'Vanliga frågor', faqIntro: 'Snabba svar om setup, funktioner, kampanjuppdrag, patchar och support.', faqSeeAll: 'Alla FAQ-frågor', faqGuides: 'Enlisted-guider', catStart: 'Kom igång', catFeatures: 'Funktioner & spel', catUpdates: 'Uppdateringar & support' },
};

function copyFor(locale) {
	return COPY[locale] ?? COPY.en;
}

function buildAbout(locale, c, lp) {
	const maps = lp?.maps ?? 'campaign missions, squad assaults, and large-scale battles';
	if (locale === 'en') {
		return {
			title: c.aboutTitle,
			lead: `${L(locale, 'hacks', 'Enlisted Cheats')} is a ${L(locale, 'setup', 'Windows PC')} package for ${maps} — ${L(locale, 'enlisted-esp', 'ESP')}, ${L(locale, 'wallhack', 'wallhack')}, ${L(locale, 'enlisted-aimbot', 'aimbot')}, and ${L(locale, 'radar', 'radar')} in one license with ${L(locale, 'updates', 'updates')} after patches.`,
			text1: `Read enemy positions through smoke and cover with soldier ESP, 2D radar overlays, and configurable aim assist. Toggle modules in-client during Eastern Front, Western Front, and urban combat — see the full ${L(locale, 'features', 'feature list')}.`,
			text2: `Setup takes minutes on Windows PC with controller support. We publish maintenance notes after Gaijin anti-cheat patches. Compare ${L(locale, 'pricing', 'monthly and lifetime plans')} or follow the ${L(locale, 'setup', 'setup guide')}.`,
			modulesLabel: c.modulesLabel,
			wallhack: c.wallhack,
			radar: c.radar,
			premiumTitle: c.premiumTitle,
			premiumCopy: `Get the full ${L(locale, 'features', 'cheat stack')} with instant delivery and rebuilds when ${L(locale, 'updates', 'anti-cheat updates')} land.`,
			viewPricing: c.viewPricing,
		};
	}
	if (locale === 'es') {
		return {
			title: c.aboutTitle,
			lead: `${L(locale, 'hacks', 'Enlisted Cheats')} es un paquete para ${L(locale, 'setup', 'PC Windows')} en ${maps}: ${L(locale, 'enlisted-esp', 'ESP')}, ${L(locale, 'wallhack', 'wallhack')}, ${L(locale, 'enlisted-aimbot', 'aimbot')} y ${L(locale, 'radar', 'radar')} en una licencia con ${L(locale, 'updates', 'actualizaciones')} tras cada parche.`,
			text1: `Lee posiciones enemigas con ESP de soldados, radar 2D y aim assist configurable. Activa módulos en partida en el Frente Oriental, Occidental y combate urbano — consulta la ${L(locale, 'features', 'lista de funciones')}.`,
			text2: `La instalación tarda minutos en Windows con soporte de mando. Publicamos notas tras parches de Gaijin anti-cheat. Compara ${L(locale, 'pricing', 'planes mensuales y de por vida')} o sigue la ${L(locale, 'setup', 'guía de instalación')}.`,
			modulesLabel: c.modulesLabel,
			wallhack: c.wallhack,
			radar: c.radar,
			premiumTitle: c.premiumTitle,
			premiumCopy: `Accede al ${L(locale, 'features', 'stack completo')} con entrega instantánea y rebuilds tras ${L(locale, 'updates', 'actualizaciones anti-cheat')}.`,
			viewPricing: c.viewPricing,
		};
	}
	if (locale === 'fr') {
		return {
			title: c.aboutTitle,
			lead: `${L(locale, 'hacks', 'Enlisted Cheats')} est un pack ${L(locale, 'setup', 'PC Windows')} pour ${maps} — ${L(locale, 'enlisted-esp', 'ESP')}, ${L(locale, 'wallhack', 'wallhack')}, ${L(locale, 'enlisted-aimbot', 'aimbot')} et ${L(locale, 'radar', 'radar')} en une licence avec ${L(locale, 'updates', 'mises à jour')} après chaque patch.`,
			text1: `Repérez les positions ennemies avec ESP soldats, radar 2D et soft aim configurable. Basculez les modules en jeu sur le Front Est, Ouest et en urbain — voir la ${L(locale, 'features', 'liste des fonctions')}.`,
			text2: `Installation en quelques minutes sur Windows avec manette. Notes de maintenance après les patchs Gaijin anti-cheat. Comparez les ${L(locale, 'pricing', 'formules mensuelles et à vie')} ou suivez le ${L(locale, 'setup', 'guide d\'installation')}.`,
			modulesLabel: c.modulesLabel,
			wallhack: c.wallhack,
			radar: c.radar,
			premiumTitle: c.premiumTitle,
			premiumCopy: `Obtenez le ${L(locale, 'features', 'pack complet')} avec livraison instantanée et rebuilds après ${L(locale, 'updates', 'mises à jour anti-cheat')}.`,
			viewPricing: c.viewPricing,
		};
	}
	if (locale === 'de') {
		return {
			title: c.aboutTitle,
			lead: `${L(locale, 'hacks', 'Enlisted Cheats')} ist ein ${L(locale, 'setup', 'Windows-PC')}-Paket für ${maps} — ${L(locale, 'enlisted-esp', 'ESP')}, ${L(locale, 'wallhack', 'Wallhack')}, ${L(locale, 'enlisted-aimbot', 'Aimbot')} und ${L(locale, 'radar', 'Radar')} in einer Lizenz mit ${L(locale, 'updates', 'Updates')} nach Patches.`,
			text1: `Erkenne Gegner durch Rauch und Deckung mit Soldaten-ESP, 2D-Radar und konfigurierbarem Aim-Assist. Module im Spiel umschalten — siehe die ${L(locale, 'features', 'Feature-Liste')}.`,
			text2: `Setup in Minuten auf Windows mit Controller-Support. Wartungshinweise nach Gaijin-Anti-Cheat-Patches. ${L(locale, 'pricing', 'Monats- und Lifetime-Tarife')} vergleichen oder ${L(locale, 'setup', 'Setup-Guide')} folgen.`,
			modulesLabel: c.modulesLabel,
			wallhack: c.wallhack,
			radar: c.radar,
			premiumTitle: c.premiumTitle,
			premiumCopy: `Voller ${L(locale, 'features', 'Cheat-Stack')} mit sofortiger Lieferung und Rebuilds nach ${L(locale, 'updates', 'Anti-Cheat-Updates')}.`,
			viewPricing: c.viewPricing,
		};
	}
	// Fallback: native shell using locale maps phrase
	return {
		title: c.aboutTitle,
		lead: `${L(locale, 'hacks', 'Enlisted Cheats')} — ${L(locale, 'enlisted-esp', 'ESP')}, ${L(locale, 'wallhack', 'wallhack')}, ${L(locale, 'enlisted-aimbot', 'aimbot')}, ${L(locale, 'radar', 'radar')} (${maps}). ${L(locale, 'updates', 'Updates')} included.`,
		text1: lp?.espRead ?? COPY.en.text1,
		text2: `${L(locale, 'pricing', 'Pricing')} · ${L(locale, 'setup', 'Setup')} · ${L(locale, 'features', 'Features')}.`,
		modulesLabel: c.modulesLabel,
		wallhack: c.wallhack,
		radar: c.radar,
		premiumTitle: c.premiumTitle,
		premiumCopy: `${L(locale, 'features', 'Features')} + ${L(locale, 'updates', 'Updates')}.`,
		viewPricing: c.viewPricing,
	};
}

function buildFaqItems(locale, c) {
	const q = (cat, question, answer) => ({ category: cat, question, answer });
	if (locale === 'es') {
		return [
			q(c.catStart, '¿Qué es Enlisted Cheats?', `${L(locale, 'hacks', 'Enlisted Cheats')} es un paquete mantenido para ${L(locale, 'setup', 'PC Windows')} con ${L(locale, 'enlisted-esp', 'ESP')}, ${L(locale, 'wallhack', 'wallhack')}, ${L(locale, 'radar', 'radar')} y ${L(locale, 'enlisted-aimbot', 'aimbot')}.`),
			q(c.catStart, '¿Qué incluye una licencia?', `ESP enemigo, radar 2D y aim assist — ver ${L(locale, 'features', 'funciones')} y ${L(locale, 'pricing', 'precios')}.`),
			q(c.catStart, '¿Cómo se entregan las licencias?', `Entrega digital tras el pago. Contacta ${L(locale, 'support', 'soporte')} si necesitas ayuda.`),
			q(c.catFeatures, '¿Funciona en misiones de campaña y asaltos de escuadrón?', `Sí — ESP y radar para ${localePhrases.es.maps}.`),
			q(c.catFeatures, '¿Puedo usar mando?', `Sí en Windows PC. Consulta la ${L(locale, 'setup', 'guía de instalación')}.`),
			q(c.catFeatures, '¿Qué es cloud DMA?', `Opción avanzada opcional. La mayoría empieza con el paquete estándar — ${L(locale, 'support', 'soporte')}.`),
			q(c.catUpdates, '¿Es permanentemente indetectable?', `Ningún cheat lo garantiza. Revisa la ${L(locale, 'updates', 'página de actualizaciones')} tras parches de Gaijin.`),
			q(c.catUpdates, '¿Dónde ver el estado tras un parche?', `${L(locale, 'updates', 'Actualizaciones')} y notas oficiales de Enlisted.`),
			q(c.catUpdates, '¿Cómo contacto soporte?', `${L(locale, 'support', 'Soporte')} o support@enlistedcheats.org con tu ID de pedido.`),
		];
	}
	if (locale === 'fr') {
		return [
			q(c.catStart, 'Qu\'est-ce qu\'Enlisted Cheats ?', `Pack maintenu pour ${L(locale, 'setup', 'PC Windows')} avec ${L(locale, 'enlisted-esp', 'ESP')}, ${L(locale, 'wallhack', 'wallhack')}, ${L(locale, 'radar', 'radar')} et ${L(locale, 'enlisted-aimbot', 'aimbot')}.`),
			q(c.catStart, 'Que comprend une licence ?', `ESP, radar 2D et soft aim — voir ${L(locale, 'features', 'fonctions')} et ${L(locale, 'pricing', 'tarifs')}.`),
			q(c.catStart, 'Comment sont livrées les licences ?', `Livraison numérique après paiement. ${L(locale, 'support', 'Support')} si besoin.`),
			q(c.catFeatures, 'Compatible missions de campagne et assauts d\'escouade ?', `Oui — ESP et radar pour ${localePhrases.fr.maps}.`),
			q(c.catFeatures, 'Manette supportée ?', `Oui sur Windows. Voir le ${L(locale, 'setup', 'guide d\'installation')}.`),
			q(c.catFeatures, 'Qu\'est-ce que le cloud DMA ?', `Option avancée. La plupart utilisent le pack standard — ${L(locale, 'support', 'support')}.`),
			q(c.catUpdates, 'Indétectable en permanence ?', `Aucune garantie. Consultez ${L(locale, 'updates', 'Mises à jour')} après les patchs Gaijin.`),
			q(c.catUpdates, 'Où vérifier le statut après un patch ?', `${L(locale, 'updates', 'Mises à jour')} et notes officielles Enlisted.`),
			q(c.catUpdates, 'Contacter le support ?', `${L(locale, 'support', 'Support')} ou support@enlistedcheats.org.`),
		];
	}
	if (locale === 'de') {
		return [
			q(c.catStart, 'Was ist Enlisted Cheats?', `Gepflegtes ${L(locale, 'setup', 'Windows-PC')}-Paket mit ${L(locale, 'enlisted-esp', 'ESP')}, ${L(locale, 'wallhack', 'Wallhack')}, ${L(locale, 'radar', 'Radar')} und ${L(locale, 'enlisted-aimbot', 'Aimbot')}.`),
			q(c.catStart, 'Was ist in einer Lizenz enthalten?', `ESP, 2D-Radar, Aim-Assist — ${L(locale, 'features', 'Features')} und ${L(locale, 'pricing', 'Preise')}.`),
			q(c.catStart, 'Wie erfolgt die Lieferung?', `Digital nach Zahlung. ${L(locale, 'support', 'Support')} bei Fragen.`),
			q(c.catFeatures, 'Funktioniert es in Kampagnenmissionen und Squad-Angriffen?', `Ja — ESP und Radar für ${localePhrases.de.maps}.`),
			q(c.catFeatures, 'Controller-Unterstützung?', `Ja unter Windows. Siehe ${L(locale, 'setup', 'Setup-Guide')}.`),
			q(c.catFeatures, 'Was ist Cloud-DMA?', `Optionale Hardware-Isolation. Meist reicht das Standard-Paket — ${L(locale, 'support', 'Support')}.`),
			q(c.catUpdates, 'Dauerhaft unentdeckt?', `Keine Garantie. ${L(locale, 'updates', 'Updates-Seite')} nach Gaijin-Patches prüfen.`),
			q(c.catUpdates, 'Status nach Patch prüfen?', `${L(locale, 'updates', 'Updates')} und offizielle Enlisted-News.`),
			q(c.catUpdates, 'Support kontaktieren?', `${L(locale, 'support', 'Support')} oder support@enlistedcheats.org.`),
		];
	}
	// English default FAQ
	return [
		q(c.catStart, 'What is Enlisted Cheats?', `${L(locale, 'hacks', 'Enlisted Cheats')} is a maintained ${L(locale, 'setup', 'Windows PC')} package with ${L(locale, 'enlisted-esp', 'ESP')}, ${L(locale, 'wallhack', 'wallhack')}, ${L(locale, 'radar', 'radar')}, and ${L(locale, 'enlisted-aimbot', 'aimbot')}.`),
		q(c.catStart, 'What is included in one license?', `Enemy ESP, 2D radar, and aim assist — see ${L(locale, 'features', 'features')} and ${L(locale, 'pricing', 'pricing')}.`),
		q(c.catStart, 'How are licenses delivered?', `Digital delivery after payment. Contact ${L(locale, 'support', 'support')} if needed.`),
		q(c.catFeatures, 'Does this work for campaign missions and squad assaults?', `Yes — ESP and radar for ${localePhrases[locale]?.maps ?? 'campaign missions and squad assaults'}.`),
		q(c.catFeatures, 'Can I use a controller?', `Yes on Windows PC. See the ${L(locale, 'setup', 'setup guide')}.`),
		q(c.catFeatures, 'What is cloud DMA?', `Optional advanced setup. Most use the standard package — ask ${L(locale, 'support', 'support')}.`),
		q(c.catUpdates, 'Is it permanently undetected?', `No tool guarantees that. Check ${L(locale, 'updates', 'Updates')} after Gaijin patches.`),
		q(c.catUpdates, 'Where to check status after a patch?', `${L(locale, 'updates', 'Updates page')} and official Enlisted news.`),
		q(c.catUpdates, 'How do I contact support?', `${L(locale, 'support', 'Support')} or support@enlistedcheats.org with your order ID.`),
	];
}

const homeUiByLocale = {};
for (const locale of LOCALES) {
	const c = copyFor(locale);
	const lp = localePhrases[locale];
	homeUiByLocale[locale] = {
		homeAbout: buildAbout(locale, c, lp),
		homeFaq: {
			title: c.faqTitle ?? COPY.en.faqTitle,
			intro: c.faqIntro ?? COPY.en.faqIntro,
			seeAll: c.faqSeeAll ?? COPY.en.faqSeeAll,
			readGuides: c.faqGuides ?? COPY.en.faqGuides,
			items: buildFaqItems(locale, c),
		},
	};
}

writeFileSync(
	new URL('./home-ui.generated.mjs', import.meta.url),
	`/** Auto-generated home About/FAQ UI — run: node scripts/i18n-data/build-home-ui.mjs */\nexport const homeUiByLocale = ${JSON.stringify(homeUiByLocale, null, '\t')};\n`,
);
console.log('✓ Wrote home-ui.generated.mjs');
