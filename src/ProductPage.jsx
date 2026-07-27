import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ProductPage() {
  const stageRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    const stage = stageRef.current
    let ctx

    const setup = () => {
      if (ctx) ctx.revert()

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: stage,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 0.5,
          onUpdate: (self) => {
            if (video.duration) {
              video.currentTime = self.progress * video.duration
            }
          },
        })

        gsap.from('.cta-band h2, .cta-band p, .cta-band .btn-light', {
          y: 24,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.cta-band',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    }

    if (video.readyState >= 1) {
      setup()
    } else {
      video.addEventListener('loadedmetadata', setup, { once: true })
    }

    return () => {
      video.removeEventListener('loadedmetadata', setup)
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <>
      <nav className="nav">
        <div className="logo">MoreReviews</div>
        <a href="#buy" className="nav-cta">Buy Now</a>
      </nav>

      <div className="stage" ref={stageRef}>
        <video
          ref={videoRef}
          className="stage-video"
          muted
          playsInline
          preload="auto"
          poster="/assets/video/product-demo-poster.jpg"
        >
          <source src="/assets/video/product-demo.webm" type="video/webm" />
          <source src="/assets/video/product-demo.mp4" type="video/mp4" />
        </video>
      </div>

      <section id="buy" className="cta-band">
        <h2>Ready to grow your reviews?</h2>
        <p>Get your MoreReviews Card today — free shipping, lifetime NFC programming included.</p>
        <a href="#" className="btn-light">Buy Now — $29</a>
      </section>
    </>
  )
}
