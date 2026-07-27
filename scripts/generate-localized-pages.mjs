import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const siteUrl = 'https://www.morereviews.com'
const pages = {
  en: {
    dir: 'ltr',
    ogLocale: 'en_US',
    title: 'MoreReviews — Get 5-Star Google Reviews Instantly',
    description:
      'MoreReviews NFC and QR cards help happy customers leave 5-star Google reviews in seconds—no app, typing, or searching required.',
  },
  tr: {
    dir: 'ltr',
    ogLocale: 'tr_TR',
    title: 'MoreReviews — Anında 5 Yıldızlı Google Yorumları Alın',
    description:
      'MoreReviews NFC ve QR kartları, memnun müşterilerinizin saniyeler içinde 5 yıldızlı Google yorumu bırakmasını sağlar — uygulama, yazma veya arama gerekmez.',
  },
  ar: {
    dir: 'rtl',
    ogLocale: 'ar_AR',
    title: 'MoreReviews — احصل على تقييمات جوجل 5 نجوم فوراً',
    description:
      'تساعد بطاقات MoreReviews NFC وQR العملاء السعداء على ترك تقييم جوجل 5 نجوم خلال ثوانٍ — بدون تطبيق أو كتابة أو بحث.',
  },
}

const distPath = resolve('dist')
const template = await readFile(resolve(distPath, 'index.html'), 'utf8')

for (const [locale, page] of Object.entries(pages)) {
  const alternates = Object.keys(pages)
    .map((item) => `    <link rel="alternate" hreflang="${item}" href="${siteUrl}/${item}/" />`)
    .join('\n')

  const localized = template
    .replace(/<html[^>]*>/, `<html lang="${locale}" dir="${page.dir}">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${page.title}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${page.description}" />`,
    )
    .replace(
      /<meta property="og:locale" content="[^"]*" \/>/,
      `<meta property="og:locale" content="${page.ogLocale}" />`,
    )
    .replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${page.title}" />`,
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:description" content="${page.description}" />`,
    )
    .replace(
      /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${siteUrl}/${locale}/" />`,
    )
    .replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${siteUrl}/${locale}/" />`,
    )
    .replace(
      /(?:\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*" \/>){4}/,
      `\n${alternates}\n    <link rel="alternate" hreflang="x-default" href="${siteUrl}/en/" />`,
    )

  const directory = resolve(distPath, locale)
  await mkdir(directory, { recursive: true })
  await writeFile(resolve(directory, 'index.html'), localized)
}
