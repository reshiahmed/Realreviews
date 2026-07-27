import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { locales, localeNames, translations } from './i18n'

gsap.registerPlugin(ScrollTrigger)

function VideoSection() {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)

  const handlePlay = () => {
    setPlaying(true)
    requestAnimationFrame(() => videoRef.current?.play())
  }

  return (
    <section className="video-section">
      <div className={`video-frame${playing ? ' is-playing' : ''}`}>
        {playing ? (
          <video
            ref={videoRef}
            className="video-el"
            controls
            playsInline
            preload="none"
            poster="/assets/video/product-demo-poster.jpg"
          >
            <source src="/assets/video/product-demo.webm" type="video/webm" />
            <source src="/assets/video/product-demo.mp4" type="video/mp4" />
          </video>
        ) : (
          <button type="button" className="video-poster" onClick={handlePlay} aria-label="Play video">
            <img src="/assets/video/product-demo-poster.jpg" alt="" loading="lazy" />
            <span className="play-btn">
              <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
                <path d="M8 5v14l11-7z" fill="currentColor" />
              </svg>
            </span>
          </button>
        )}
      </div>
    </section>
  )
}

export default function App({ locale }) {
  const heroRef = useRef(null)
  const t = translations[locale]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('h1', { y: 30, opacity: 0, duration: 0.8, delay: 0.1, ease: 'power2.out' })
      gsap.from('.hero-sub', { y: 20, opacity: 0, duration: 0.8, delay: 0.2, ease: 'power2.out' })
      gsap.from('.hero-actions', { y: 20, opacity: 0, duration: 0.8, delay: 0.3, ease: 'power2.out' })

      gsap.from('.cta-band h2, .cta-band p, .cta-band .btn-light', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.cta-band',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      <nav className="nav" dir="ltr">
        <a href={`/${locale}/`} className="logo" aria-label="MoreReviews home">
          <picture>
            <source
              type="image/webp"
              srcSet="/assets/brand/variations/morereviews-nav-black-320.webp 1x, /assets/brand/variations/morereviews-nav-black-640.webp 2x"
            />
            <img
              src="/assets/brand/variations/morereviews-nav-black-320.png"
              srcSet="/assets/brand/variations/morereviews-nav-black-320.png 1x, /assets/brand/variations/morereviews-nav-black-640.png 2x"
              width="320"
              height="93"
              alt="MoreReviews"
            />
          </picture>
        </a>
        <div className="nav-actions">
          <LanguageSwitcher locale={locale} />
          <a href="#buy" className="nav-cta">{t.nav.buyNow}</a>
        </div>
      </nav>

      <div className="hero" ref={heroRef}>
        <div className="hero-copy">
          <h1>
            {t.hero.titlePrefix}<em>{t.hero.titleAccent}</em>{t.hero.titleSuffix}
            {t.hero.titleSecondLine && <>{' '}<span className="hero-title-second">{t.hero.titleSecondLine}</span></>}
          </h1>
          <p className="hero-sub">{t.hero.sub}</p>
          <div className="hero-actions">
            <a href="#buy" className="btn-primary">{t.hero.cta}</a>
          </div>
        </div>
      </div>

      <VideoSection />

      <section id="buy" className="cta-band">
        <h2>{t.ctaBand.title}</h2>
        <p>{t.ctaBand.body}</p>
        <a href="#" className="btn-light">{t.ctaBand.cta}</a>
      </section>
    </>
  )
}

function LanguageSwitcher({ locale }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [])

  return (
    <div className="lang-switcher" ref={ref} dir="ltr">
      <button
        type="button"
        className="lang-switcher-btn"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {localeNames[locale]}
      </button>
      <div className="lang-menu" role="menu" hidden={!open}>
        {locales.map((item) => (
          <a
            key={item}
            href={`/${item}/`}
            role="menuitem"
            aria-current={item === locale ? 'page' : undefined}
            className={item === locale ? 'is-active' : ''}
          >
            {localeNames[item]}
          </a>
        ))}
      </div>
    </div>
  )
}
