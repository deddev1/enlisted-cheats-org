import { localePhrases } from './locale-phrases.mjs';

/** Shared product terms kept in English for SEO keywords across locales. */
export const KW = {
	esp: 'ESP wallhack',
	radar: 'radar hack',
	aimbot: 'Aimbot',
	product: 'Enlisted Cheats',
	game: 'Enlisted',
	checkout: 'Zadeyo',
	eac: 'Gaijin anti-cheat',
};

const LOCALE_CORE = {
	es: {
		buy: 'Obtener acceso', win: 'PC Windows',
		delivery: 'entrega digital instantánea', monthly: '$35/mes', lifetime: '$150 de por vida',
		s1: (topic, lp) => `${KW.product} ofrece ${KW.esp}, ${KW.radar} y ${KW.aimbot} ${lp.undetected} para ${KW.game} en ${LOCALE_CORE.es.win}. ${topic}`,
		s2: (lp) => `Licencias con ${LOCALE_CORE.es.delivery} vía ${lp.checkout}. Planes ${LOCALE_CORE.es.monthly} y ${LOCALE_CORE.es.lifetime} incluyen mantenimiento ${KW.eac}.`,
		s3: (lp) => `Consulta la ${lp.updatesPage} antes de jugar tras parches de ${KW.eac}. Ningún cheat garantiza ${lp.undetectedStatus} permanente.`,
	},
	fr: {
		buy: "Obtenir l'accès", win: 'PC Windows',
		delivery: 'livraison numérique instantanée', monthly: '35 $/mois', lifetime: '150 $ à vie',
		s1: (topic, lp) => `${KW.product} combine ${KW.esp}, ${KW.radar} et ${KW.aimbot} ${lp.undetected} pour ${KW.game} sur ${LOCALE_CORE.fr.win}. ${topic}`,
		s2: (lp) => `Licences avec ${LOCALE_CORE.fr.delivery} via ${lp.checkout}. Forfaits ${LOCALE_CORE.fr.monthly} et ${LOCALE_CORE.fr.lifetime} incluent la maintenance ${KW.eac}.`,
		s3: (lp) => `Consultez la ${lp.updatesPage} après les patchs ${KW.eac}. Aucune triche ne garantit un ${lp.undetectedStatus} permanent.`,
	},
	de: {
		buy: 'Zugang erhalten', win: 'Windows PC',
		delivery: 'sofortige digitale Lieferung', monthly: '$35/Monat', lifetime: '$150 Lifetime',
		s1: (topic, lp) => `${KW.product} bündelt ${KW.esp}, ${KW.radar} und ${KW.aimbot} als ${lp.undetected} Paket für ${KW.game} auf ${LOCALE_CORE.de.win}. ${topic}`,
		s2: (lp) => `Lizenzen mit ${LOCALE_CORE.de.delivery} über ${lp.checkout}. ${LOCALE_CORE.de.monthly} und ${LOCALE_CORE.de.lifetime} inkl. ${KW.eac}-Wartung.`,
		s3: (lp) => `Prüfe die ${lp.updatesPage} nach ${KW.eac}-Patches. Kein Cheat garantiert dauerhaft ${lp.undetectedStatus}.`,
	},
	pt: {
		buy: 'Comprar Enlisted Cheats', win: 'PC Windows',
		delivery: 'entrega digital instantânea', monthly: '$35/mês', lifetime: '$150 vitalício',
		s1: (topic, lp) => `${KW.product} reúne ${KW.esp}, ${KW.radar} e ${KW.aimbot} ${lp.undetected} para ${KW.game} no ${LOCALE_CORE.pt.win}. ${topic}`,
		s2: (lp) => `Licenças com ${LOCALE_CORE.pt.delivery} via ${lp.checkout}. Planos ${LOCALE_CORE.pt.monthly} e ${LOCALE_CORE.pt.lifetime} incluem manutenção ${KW.eac}.`,
		s3: (lp) => `Verifique a ${lp.updatesPage} após patches ${KW.eac}. Nenhum cheat garante ${lp.undetectedStatus} permanente.`,
	},
	it: {
		buy: 'Acquista Enlisted Cheats', win: 'PC Windows',
		delivery: 'consegna digitale istantanea', monthly: '$35/mese', lifetime: '$150 a vita',
		s1: (topic, lp) => `${KW.product} unisce ${KW.esp}, ${KW.radar} e ${KW.aimbot} ${lp.undetected} per ${KW.game} su ${LOCALE_CORE.it.win}. ${topic}`,
		s2: (lp) => `Licenze con ${LOCALE_CORE.it.delivery} via ${lp.checkout}. Piani ${LOCALE_CORE.it.monthly} e ${LOCALE_CORE.it.lifetime} includono manutenzione ${KW.eac}.`,
		s3: (lp) => `Controlla la ${lp.updatesPage} dopo patch ${KW.eac}. Nessun cheat garantisce ${lp.undetectedStatus} permanente.`,
	},
	nl: {
		buy: 'Enlisted Cheats kopen', win: 'Windows PC',
		delivery: 'directe digitale levering', monthly: '$35/maand', lifetime: '$150 lifetime',
		s1: (topic, lp) => `${KW.product} bundelt ${KW.esp}, ${KW.radar} en ${KW.aimbot} als ${lp.undetected} pakket voor ${KW.game} op ${LOCALE_CORE.nl.win}. ${topic}`,
		s2: (lp) => `Licenties met ${LOCALE_CORE.nl.delivery} via ${lp.checkout}. ${LOCALE_CORE.nl.monthly} en ${LOCALE_CORE.nl.lifetime} incl. ${KW.eac}-onderhoud.`,
		s3: (lp) => `Check de ${lp.updatesPage} na ${KW.eac}-patches. Geen cheat garandeert permanent ${lp.undetectedStatus}.`,
	},
	pl: {
		buy: 'Kup Enlisted Cheats', win: 'PC Windows',
		delivery: 'natychmiastowa dostawa cyfrowa', monthly: '$35/mies.', lifetime: '$150 lifetime',
		s1: (topic, lp) => `${KW.product} łączy ${KW.esp}, ${KW.radar} i ${KW.aimbot} w pakiecie ${lp.undetected} dla ${KW.game} na ${LOCALE_CORE.pl.win}. ${topic}`,
		s2: (lp) => `Licencje z ${LOCALE_CORE.pl.delivery} przez ${lp.checkout}. Plany ${LOCALE_CORE.pl.monthly} i ${LOCALE_CORE.pl.lifetime} z konserwacją ${KW.eac}.`,
		s3: (lp) => `Sprawdź ${lp.updatesPage} po patchach ${KW.eac}. Żaden cheat nie gwarantuje stałego ${lp.undetectedStatus}.`,
	},
	ru: {
		buy: 'Купить Enlisted Cheats', win: 'Windows PC',
		delivery: 'мгновенная цифровая доставка', monthly: '$35/мес', lifetime: '$150 навсегда',
		s1: (topic, lp) => `${KW.product} объединяет ${KW.esp}, ${KW.radar} и ${KW.aimbot} в ${lp.undetected} пакете для ${KW.game} на ${LOCALE_CORE.ru.win}. ${topic}`,
		s2: (lp) => `Лицензии с ${LOCALE_CORE.ru.delivery} через ${lp.checkout}. Тарифы ${LOCALE_CORE.ru.monthly} и ${LOCALE_CORE.ru.lifetime} включают обслуживание ${KW.eac}.`,
		s3: (lp) => `Проверяйте ${lp.updatesPage} после патчей ${KW.eac}. Ни один чит не гарантирует постоянный ${lp.undetectedStatus}.`,
	},
	tr: {
		buy: 'Enlisted Cheats satın al', win: 'Windows PC',
		delivery: 'anında dijital teslimat', monthly: '$35/ay', lifetime: '$150 ömür boyu',
		s1: (topic, lp) => `${KW.product}, ${KW.game} için ${LOCALE_CORE.tr.win} üzerinde ${KW.esp}, ${KW.radar} ve ${KW.aimbot} ${lp.undetected} paket sunar. ${topic}`,
		s2: (lp) => `${lp.checkout} ile ${LOCALE_CORE.tr.delivery}. ${LOCALE_CORE.tr.monthly} ve ${LOCALE_CORE.tr.lifetime} planları ${KW.eac} bakımı içerir.`,
		s3: (lp) => `${KW.eac} yamalarından sonra ${lp.updatesPage} sayfasını kontrol edin. Hiçbir hile kalıcı ${lp.undetectedStatus} garantisi vermez.`,
	},
	ar: {
		buy: 'اشترِ Enlisted Cheats', win: 'Windows PC',
		delivery: 'تسليم رقمي فوري', monthly: '35$/شهر', lifetime: '150$ مدى الحياة',
		s1: (topic, lp) => `${KW.product} يجمع ${KW.esp} و${KW.radar} و${KW.aimbot} ${lp.undetected} لـ ${KW.game} على ${LOCALE_CORE.ar.win}. ${topic}`,
		s2: (lp) => `تراخيص مع ${LOCALE_CORE.ar.delivery} عبر ${lp.checkout}. خطط ${LOCALE_CORE.ar.monthly} و${LOCALE_CORE.ar.lifetime} تشمل صيانة ${KW.eac}.`,
		s3: (lp) => `راجع ${lp.updatesPage} بعد تص patches ${KW.eac}. لا يضمن أي غش ${lp.undetectedStatus} دائمًا.`,
	},
	ja: {
		buy: 'Enlisted Cheatsを購入', win: 'Windows PC',
		delivery: '即時デジタル配信', monthly: '$35/月', lifetime: '$150永久',
		s1: (topic, lp) => `${KW.product}は${KW.game}向け${LOCALE_CORE.ja.win}用${KW.esp}、${KW.radar}、${KW.aimbot}の${lp.undetected}パッケージです。${topic}`,
		s2: (lp) => `${lp.checkout}で${LOCALE_CORE.ja.delivery}。${LOCALE_CORE.ja.monthly}と${LOCALE_CORE.ja.lifetime}プランに${KW.eac}メンテナンス含む。`,
		s3: (lp) => `${KW.eac}パッチ後は${lp.updatesPage}を確認。永久${lp.undetectedStatus}は保証されません。`,
	},
	ko: {
		buy: 'Enlisted Cheats 구매', win: 'Windows PC',
		delivery: '즉시 디지털 배송', monthly: '$35/월', lifetime: '$150 평생',
		s1: (topic, lp) => `${KW.product}는 ${KW.game} ${LOCALE_CORE.ko.win}용 ${KW.esp}, ${KW.radar}, ${KW.aimbot} ${lp.undetected} 패키지입니다. ${topic}`,
		s2: (lp) => `${lp.checkout}로 ${LOCALE_CORE.ko.delivery}. ${LOCALE_CORE.ko.monthly} 및 ${LOCALE_CORE.ko.lifetime} 요금제에 ${KW.eac} 유지보수 포함.`,
		s3: (lp) => `${KW.eac} 패치 후 ${lp.updatesPage}를 확인하세요. 영구 ${lp.undetectedStatus}는 보장되지 않습니다.`,
	},
	zh: {
		buy: '购买 Enlisted Cheats', win: 'Windows PC',
		delivery: '即时数字交付', monthly: '$35/月', lifetime: '$150终身',
		s1: (topic, lp) => `${KW.product}为${KW.game}${LOCALE_CORE.zh.win}提供${KW.esp}、${KW.radar}和${KW.aimbot}${lp.undetected}套餐。${topic}`,
		s2: (lp) => `通过${lp.checkout}${LOCALE_CORE.zh.delivery}。${LOCALE_CORE.zh.monthly}和${LOCALE_CORE.zh.lifetime}含${KW.eac}维护。`,
		s3: (lp) => `${KW.eac}补丁后请查看${lp.updatesPage}。无任何作弊保证永久${lp.undetectedStatus}。`,
	},
	hi: {
		buy: 'Enlisted Cheats खरीदें', win: 'Windows PC',
		delivery: 'तुरंत डिजिटल डिलीवरी', monthly: '$35/माह', lifetime: '$150 लाइफ़टाइम',
		s1: (topic, lp) => `${KW.product} ${KW.game} के लिए ${LOCALE_CORE.hi.win} पर ${KW.esp}, ${KW.radar} और ${KW.aimbot} ${lp.undetected} पैकेज देता है। ${topic}`,
		s2: (lp) => `${lp.checkout} से ${LOCALE_CORE.hi.delivery}। ${LOCALE_CORE.hi.monthly} और ${LOCALE_CORE.hi.lifetime} में ${KW.eac} रखरखाव शामिल।`,
		s3: (lp) => `${KW.eac} पैच के बाद ${lp.updatesPage} देखें। कोई भी cheat स्थायी ${lp.undetectedStatus} गारंटी नहीं देता।`,
	},
	id: {
		buy: 'Beli Enlisted Cheats', win: 'PC Windows',
		delivery: 'pengiriman digital instan', monthly: '$35/bulan', lifetime: '$150 seumur hidup',
		s1: (topic, lp) => `${KW.product} menyediakan ${KW.esp}, ${KW.radar}, dan ${KW.aimbot} ${lp.undetected} untuk ${KW.game} di ${LOCALE_CORE.id.win}. ${topic}`,
		s2: (lp) => `${LOCALE_CORE.id.delivery} via ${lp.checkout}. Paket ${LOCALE_CORE.id.monthly} dan ${LOCALE_CORE.id.lifetime} termasuk pemeliharaan ${KW.eac}.`,
		s3: (lp) => `Periksa ${lp.updatesPage} setelah patch ${KW.eac}. Tidak ada cheat yang menjamin ${lp.undetectedStatus} permanen.`,
	},
	th: {
		buy: 'ซื้อ Enlisted Cheats', win: 'Windows PC',
		delivery: 'จัดส่งดิจิทัลทันที', monthly: '$35/เดือน', lifetime: '$150 ตลอดชีพ',
		s1: (topic, lp) => `${KW.product} รวม ${KW.esp}, ${KW.radar} และ ${KW.aimbot} แบบ ${lp.undetected} สำหรับ ${KW.game} บน ${LOCALE_CORE.th.win} ${topic}`,
		s2: (lp) => `${LOCALE_CORE.th.delivery} ผ่าน ${lp.checkout} แพ็ก ${LOCALE_CORE.th.monthly} และ ${LOCALE_CORE.th.lifetime} รวมการดูแล ${KW.eac}`,
		s3: (lp) => `ตรวจ${lp.updatesPage}หลังแพตช์ ${KW.eac} ไม่มี cheat รับประกัน${lp.undetectedStatus}ถาวร`,
	},
	vi: {
		buy: 'Mua Enlisted Cheats', win: 'PC Windows',
		delivery: 'giao hàng kỹ thuật số tức thì', monthly: '$35/tháng', lifetime: '$150 trọn đời',
		s1: (topic, lp) => `${KW.product} cung cấp ${KW.esp}, ${KW.radar} và ${KW.aimbot} ${lp.undetected} cho ${KW.game} trên ${LOCALE_CORE.vi.win}. ${topic}`,
		s2: (lp) => `${lp.checkout} với ${LOCALE_CORE.vi.delivery}. Gói ${LOCALE_CORE.vi.monthly} và ${LOCALE_CORE.vi.lifetime} gồm bảo trì ${KW.eac}.`,
		s3: (lp) => `Kiểm tra ${lp.updatesPage} sau bản vá ${KW.eac}. Không cheat nào đảm bảo ${lp.undetectedStatus} vĩnh viễn.`,
	},
	uk: {
		buy: 'Купити Enlisted Cheats', win: 'Windows PC',
		delivery: 'миттєва цифрова доставка', monthly: '$35/міс', lifetime: '$150 назавжди',
		s1: (topic, lp) => `${KW.product} об'єднує ${KW.esp}, ${KW.radar} і ${KW.aimbot} у ${lp.undetected} пакеті для ${KW.game} на ${LOCALE_CORE.uk.win}. ${topic}`,
		s2: (lp) => `Ліцензії з ${LOCALE_CORE.uk.delivery} через ${lp.checkout}. Тарифи ${LOCALE_CORE.uk.monthly} і ${LOCALE_CORE.uk.lifetime} включають обслуговування ${KW.eac}.`,
		s3: (lp) => `Перевіряйте ${lp.updatesPage} після патчів ${KW.eac}. Жоден чит не гарантує постійний ${lp.undetectedStatus}.`,
	},
	cs: {
		buy: 'Koupit Enlisted Cheats', win: 'Windows PC',
		delivery: 'okamžité digitální doručení', monthly: '$35/měs.', lifetime: '$150 lifetime',
		s1: (topic, lp) => `${KW.product} spojuje ${KW.esp}, ${KW.radar} a ${KW.aimbot} jako ${lp.undetected} balíček pro ${KW.game} na ${LOCALE_CORE.cs.win}. ${topic}`,
		s2: (lp) => `Licence s ${LOCALE_CORE.cs.delivery} přes ${lp.checkout}. Plány ${LOCALE_CORE.cs.monthly} a ${LOCALE_CORE.cs.lifetime} včetně údržby ${KW.eac}.`,
		s3: (lp) => `Po patchích ${KW.eac} zkontrolujte ${lp.updatesPage}. Žádný cheat negarantuje trvalý ${lp.undetectedStatus}.`,
	},
	ro: {
		buy: 'Cumpără Enlisted Cheats', win: 'PC Windows',
		delivery: 'livrare digitală instantă', monthly: '$35/lună', lifetime: '$150 pe viață',
		s1: (topic, lp) => `${KW.product} combină ${KW.esp}, ${KW.radar} și ${KW.aimbot} ${lp.undetected} pentru ${KW.game} pe ${LOCALE_CORE.ro.win}. ${topic}`,
		s2: (lp) => `Licențe cu ${LOCALE_CORE.ro.delivery} via ${lp.checkout}. Planuri ${LOCALE_CORE.ro.monthly} și ${LOCALE_CORE.ro.lifetime} includ mentenanță ${KW.eac}.`,
		s3: (lp) => `Verificați ${lp.updatesPage} după patch-uri ${KW.eac}. Niciun cheat nu garantează ${lp.undetectedStatus} permanent.`,
	},
	sv: {
		buy: 'Köp Enlisted Cheats', win: 'Windows PC',
		delivery: 'omedelbar digital leverans', monthly: '$35/mån', lifetime: '$150 lifetime',
		s1: (topic, lp) => `${KW.product} kombinerar ${KW.esp}, ${KW.radar} och ${KW.aimbot} som ${lp.undetected} paket för ${KW.game} på ${LOCALE_CORE.sv.win}. ${topic}`,
		s2: (lp) => `Licenser med ${LOCALE_CORE.sv.delivery} via ${lp.checkout}. ${LOCALE_CORE.sv.monthly} och ${LOCALE_CORE.sv.lifetime} inkl. ${KW.eac}-underhåll.`,
		s3: (lp) => `Kontrollera ${lp.updatesPage} efter ${KW.eac}-patchar. Ingen cheat garanterar permanent ${lp.undetectedStatus}.`,
	},
};

/** Per-locale phrase book for composing native paragraphs. */
export const phrases = Object.fromEntries(
	Object.entries(localePhrases).map(([locale, lp]) => {
		const core = LOCALE_CORE[locale];
		return [
			locale,
			{
				...lp,
				buy: core.buy,
				win: core.win,
				delivery: core.delivery,
				monthly: core.monthly,
				lifetime: core.lifetime,
				maps: lp.maps,
				undetected: lp.undetected,
				s1: (topic) => core.s1(topic, lp),
				s2: () => core.s2(lp),
				s3: () => core.s3(lp),
				legal: () => lp.legalEmail,
			},
		];
	}),
);
