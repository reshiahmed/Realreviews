import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ProductPage from './ProductPage.jsx'
import { locales, localeFromPath, translations } from './i18n'

const { pathname } = window.location

if (pathname.startsWith('/product')) {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <ProductPage />
    </StrictMode>,
  )
} else {
  const locale = localeFromPath(pathname)

  const isLocalized = locales.some((item) => pathname === `/${item}` || pathname.startsWith(`/${item}/`))
  if (!isLocalized) {
    window.history.replaceState(null, '', `/${locale}/${window.location.hash}`)
  }

  const seo = translations[locale].seo
  const origin = window.location.origin
  document.documentElement.lang = locale
  document.documentElement.dir = seo.dir
  document.title = seo.title

  function setMeta(selector, attribute, value) {
    let element = document.head.querySelector(selector)
    if (!element) {
      element = document.createElement('meta')
      const [name, content] = selector
        .replace(/^meta\[|\]$/g, '')
        .split('=')
        .map((part) => part.replaceAll('"', ''))
      element.setAttribute(name, content)
      document.head.appendChild(element)
    }
    element.setAttribute(attribute, value)
  }

  setMeta('meta[name="description"]', 'content', seo.description)
  setMeta('meta[property="og:title"]', 'content', seo.title)
  setMeta('meta[property="og:description"]', 'content', seo.description)
  setMeta('meta[property="og:locale"]', 'content', seo.ogLocale)
  setMeta('meta[property="og:url"]', 'content', `${origin}/${locale}/`)

  document.querySelectorAll('link[rel="canonical"], link[rel="alternate"][hreflang]').forEach((el) => el.remove())

  const canonical = document.createElement('link')
  canonical.rel = 'canonical'
  canonical.href = `${origin}/${locale}/`
  document.head.appendChild(canonical)

  for (const item of locales) {
    const alternate = document.createElement('link')
    alternate.rel = 'alternate'
    alternate.hreflang = item
    alternate.href = `${origin}/${item}/`
    document.head.appendChild(alternate)
  }

  const defaultAlternate = document.createElement('link')
  defaultAlternate.rel = 'alternate'
  defaultAlternate.hreflang = 'x-default'
  defaultAlternate.href = `${origin}/en/`
  document.head.appendChild(defaultAlternate)

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App locale={locale} />
    </StrictMode>,
  )
}
