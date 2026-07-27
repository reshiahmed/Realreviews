import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Counter({ target, decimals = 0, suffix = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const counter = { val: 0 }
    const tween = gsap.to(counter, {
      val: target,
      duration: 1.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      onUpdate: () => {
        el.textContent = counter.val.toFixed(decimals) + suffix
      },
    })
    return () => tween.kill()
  }, [target, decimals, suffix])

  return <div className="stat-num" ref={ref}>0</div>
}

export default function App() {
  const heroImgRef = useRef(null)
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.badge', { y: -20, opacity: 0, duration: 0.7, ease: 'power2.out' })
      gsap.from('h1', { y: 30, opacity: 0, duration: 0.8, delay: 0.1, ease: 'power2.out' })
      gsap.from('.hero-sub', { y: 20, opacity: 0, duration: 0.8, delay: 0.2, ease: 'power2.out' })
      gsap.from('.hero-actions', { y: 20, opacity: 0, duration: 0.8, delay: 0.3, ease: 'power2.out' })
      gsap.from('.price-row, .stars', { y: 15, opacity: 0, duration: 0.8, delay: 0.4, ease: 'power2.out' })
      gsap.from(heroImgRef.current, { scale: 0.85, opacity: 0, duration: 1, delay: 0.2, ease: 'power3.out' })

      gsap.to(heroImgRef.current, {
        y: 60,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.from('.feature', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.features',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from('.steps .step', {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.steps',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from('.stat', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.stat-band',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

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
      <nav className="nav">
        <div className="logo">MoreReviews</div>
        <a href="#buy" className="nav-cta">Buy Now</a>
      </nav>

      <div className="hero" ref={heroRef}>
        <div className="hero-copy">
          <div className="badge"><span>★★★★★</span> Trusted by 2,000+ businesses</div>
          <h1>Get more <em>5-star</em> Google reviews. Just one tap.</h1>
          <p className="hero-sub">The NFC + QR review card that turns happy customers into 5-star Google reviews in seconds — no app, no typing, no friction.</p>
          <div className="hero-actions">
            <a href="#buy" className="btn-primary">Buy Now — $29</a>
            <a href="#how" className="btn-secondary">See how it works</a>
          </div>
          <div className="price-row">
            <span className="price">$29.00</span>
            <span className="price-old">$45.00</span>
          </div>
          <div className="stars">★★★★★ <span className="stars-count">4.9/5 from 340 reviews</span></div>
        </div>
        <div className="hero-media">
          <img ref={heroImgRef} src="/assets/google-review-card-hero-v2.png" alt="MoreReviews NFC Google review card next to smartphone" />
        </div>
      </div>

      <section className="features">
        <div className="feature">
          <div className="feature-icon">⚡</div>
          <h3>Tap & Review</h3>
          <p>Customers tap their phone on the card and land directly on your Google review page — no searching required.</p>
        </div>
        <div className="feature">
          <div className="feature-icon">📱</div>
          <h3>Works on Any Phone</h3>
          <p>NFC for modern phones, QR code as backup. Every customer can leave a review, every time.</p>
        </div>
        <div className="feature">
          <div className="feature-icon">📈</div>
          <h3>More Reviews, Fast</h3>
          <p>Businesses using MoreReviews see 3-5x more reviews within the first month.</p>
        </div>
      </section>

      <section id="how" className="how">
        <h2 className="section-title">How it works</h2>
        <p className="section-sub">Set up once. Collect reviews forever.</p>
        <div className="steps">
          <div className="step">
            <div className="step-num">1</div>
            <h4>Set your link</h4>
            <p>We program the card with your Google Business review link.</p>
          </div>
          <div className="step">
            <div className="step-num">2</div>
            <h4>Place it at checkout</h4>
            <p>Set the card on your counter, table, or hand it to customers directly.</p>
          </div>
          <div className="step">
            <div className="step-num">3</div>
            <h4>Watch reviews roll in</h4>
            <p>One tap or scan takes customers straight to your review form.</p>
          </div>
        </div>
      </section>

      <section className="stat-band">
        <div className="stat">
          <Counter target={2000} />
          <div className="stat-label">Businesses using MoreReviews</div>
        </div>
        <div className="stat">
          <Counter target={4.9} decimals={1} />
          <div className="stat-label">Average customer rating</div>
        </div>
        <div className="stat">
          <Counter target={5} suffix="x" />
          <div className="stat-label">More reviews within 30 days</div>
        </div>
      </section>

      <section id="buy" className="cta-band">
        <h2>Ready to grow your reviews?</h2>
        <p>Get your MoreReviews Card today — free shipping, lifetime NFC programming included.</p>
        <a href="#" className="btn-light">Buy Now — $29</a>
      </section>

      <footer>
        &copy; 2026 MoreReviews. All rights reserved.
      </footer>
    </>
  )
}
