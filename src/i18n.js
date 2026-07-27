export const locales = ['en', 'tr', 'ar']

export const localeNames = { en: 'EN', tr: 'TR', ar: 'AR' }

export function localeFromPath(pathname) {
  const match = locales.find((item) => pathname === `/${item}` || pathname.startsWith(`/${item}/`))
  return match ?? 'en'
}

export const translations = {
  en: {
    seo: {
      title: 'MoreReviews: Get 5-Star Google Reviews Instantly',
      description:
        'MoreReviews NFC and QR cards help happy customers leave 5-star Google reviews in seconds, no app, typing, or searching required.',
      dir: 'ltr',
      ogLocale: 'en_US',
    },
    nav: { buyNow: 'Buy Now' },
    hero: {
      titlePrefix: 'Get more ',
      titleAccent: '5-star',
      titleSuffix: ' Google reviews.',
      titleSecondLine: 'Just one tap.',
      sub: 'The NFC + QR review card that turns happy customers into 5-star Google reviews in seconds. No app, no typing, no friction.',
      cta: 'Buy Now',
    },
    ctaBand: {
      title: 'Ready to grow your reviews?',
      body: 'Get your MoreReviews Card today, free shipping, lifetime NFC programming included.',
      cta: 'Buy Now, $29',
    },
  },
  tr: {
    seo: {
      title: 'MoreReviews: Anında 5 Yıldızlı Google Yorumları Alın',
      description:
        'MoreReviews NFC ve QR kartları, memnun müşterilerinizin saniyeler içinde 5 yıldızlı Google yorumu bırakmasını sağlar, uygulama, yazma veya arama gerekmez.',
      dir: 'ltr',
      ogLocale: 'tr_TR',
    },
    nav: { buyNow: 'Satın Al' },
    hero: {
      titlePrefix: 'Tek dokunuşla ',
      titleAccent: '5 yıldızlı',
      titleSuffix: ' Google yorumları alın.',
      sub: 'Memnun müşterileri saniyeler içinde 5 yıldızlı Google yorumuna dönüştüren NFC + QR yorum kartı. Uygulama yok, yazma yok, zahmet yok.',
      cta: 'Satın Al',
    },
    ctaBand: {
      title: 'Yorumlarınızı artırmaya hazır mısınız?',
      body: 'MoreReviews Kartınızı bugün edinin, ücretsiz kargo, ömür boyu NFC programlama dahil.',
      cta: 'Satın Al, 999 ₺',
    },
  },
  ar: {
    seo: {
      title: 'MoreReviews: احصل على تقييمات جوجل 5 نجوم فوراً',
      description:
        'تساعد بطاقات MoreReviews NFC وQR العملاء السعداء على ترك تقييم جوجل 5 نجوم خلال ثوانٍ، بدون تطبيق أو كتابة أو بحث.',
      dir: 'rtl',
      ogLocale: 'ar_AR',
    },
    nav: { buyNow: 'اشترِ الآن' },
    hero: {
      titlePrefix: 'احصل على المزيد من تقييمات جوجل ',
      titleAccent: '5 نجوم',
      titleSuffix: '. بلمسة واحدة فقط.',
      sub: 'بطاقة تقييم NFC + QR تحوّل العملاء السعداء إلى تقييمات جوجل 5 نجوم خلال ثوانٍ. بدون تطبيق، بدون كتابة، بدون تعقيد.',
      cta: 'اشترِ الآن',
    },
    ctaBand: {
      title: 'هل أنت مستعد لزيادة تقييماتك؟',
      body: 'احصل على بطاقة MoreReviews اليوم، شحن مجاني وبرمجة NFC مدى الحياة.',
      cta: 'اشترِ الآن، $29',
    },
  },
}
