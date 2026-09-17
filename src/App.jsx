import { motion, useReducedMotion } from 'motion/react'
import './App.css'

const menuItems = [
  { name: 'Honey Lavender Latte', detail: 'espresso, steamed milk, lavender honey', image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=900&q=85' },
  { name: 'Katrina House Blend', detail: 'our signature drip, notes of hazelnut and orange peel', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85' },
  { name: 'Matcha Sage Latte', detail: 'ceremonial matcha, oat milk, a whisper of sage', image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=900&q=85' },
  { name: 'Cardamom Cold Brew', detail: 'slow-steeped 18 hours, cardamom pod finish', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=85' },
  { name: 'Pistachio Croissant', detail: 'baked fresh each morning', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85' },
  { name: 'Brown Butter Banana Bread', detail: 'a Katrina Coffee original', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85' },
]

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1200&q=85', alt: 'Sunlit coffee shop interior' },
  { src: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=1200&q=85', alt: 'Coffee and greenery on a cafe table' },
  { src: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=85', alt: 'Coffee being prepared at the bar' },
  { src: 'https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?auto=format&fit=crop&w=1200&q=85', alt: 'Coffee shop window in natural light' },
]

const ease = [0.22, 1, 0.36, 1]
const reveal = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }
const revealTransition = { duration: 0.45, ease }
const animatedStyle = { willChange: 'opacity, transform' }

function Reveal({ children, className = '', delay = 0 }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={reveal}
      transition={{ ...revealTransition, delay: shouldReduceMotion ? 0 : delay }}
      style={animatedStyle}
    >
      {children}
    </motion.div>
  )
}

function App() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <main>
      <section className="hero" id="top">
        <motion.img
          className="hero__image"
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=2200&q=90"
          alt="Bright cafe interior with plants and a coffee counter"
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease }}
          style={animatedStyle}
        />
        <div className="hero__wash" />
        <nav className="nav" aria-label="Primary navigation">
          <a className="brand" href="#top">Katrina <span>Coffee</span></a>
          <div className="nav__links"><a href="#menu">Menu</a><a href="#story">Our story</a><a href="/events">Events</a><a href="#visit">Visit</a></div>
        </nav>
        <motion.div
          className="hero__content"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: shouldReduceMotion ? 0 : 0.12, ease }}
          style={animatedStyle}
        >
          <p className="eyebrow">Coffee, plants, patience</p>
          <h1>Slow mornings,<br />better coffee.</h1>
          <p className="hero__subhead">A small green corner of the city where the light comes in soft and the coffee is always fresh.</p>
          <a className="button" href="#menu">See the menu <span aria-hidden="true">↓</span></a>
        </motion.div>
        <p className="hero__location">GK Village, Bayawan City · Open today until 5pm</p>
      </section>

      <section className="story" id="story">
        <Reveal>
          <p className="eyebrow">A little bit about us</p>
          <p className="story__copy">Katrina Coffee started as a windowsill of herbs and a bad espresso machine. Now it&apos;s a room full of plants, sunlight, and coffee we actually love making. Come sit for a while.</p>
        </Reveal>
      </section>

      <section className="menu section" id="menu">
        <Reveal className="section__heading"><p className="eyebrow">From the counter</p><h2>Made slowly.<br />Served warmly.</h2><p>Our favorites for lingering, taking away, and everything in between.</p></Reveal>
        <div className="menu-grid">
          {menuItems.map((item, index) => (
            <Reveal className="menu-card" delay={index * 0.055} key={item.name}>
              <div className="menu-card__image"><img src={item.image} alt="" /></div>
              <div className="menu-card__copy"><span className="menu-card__number">0{index + 1}</span><div><h3>{item.name}</h3><p>{item.detail}</p></div></div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="gallery" aria-label="Katrina Coffee gallery">
        {galleryImages.map((image, index) => (
          <Reveal className={`gallery__item gallery__item--${index + 1}`} delay={index * 0.08} key={image.src}>
            <img src={image.src} alt={image.alt} />
          </Reveal>
        ))}
      </section>

      <section className="about section">
        <Reveal className="about__content"><p className="eyebrow">The whole plan</p><h2>Good coffee doesn&apos;t need to shout.</h2><p>Every cup is made slowly, every plant in this room gets talked to occasionally, and every regular gets remembered by name. That&apos;s the whole plan.</p><span className="leaf" aria-hidden="true">✳</span></Reveal>
      </section>

      <section className="visit section" id="visit">
        <Reveal className="visit__details"><p className="eyebrow">Come by</p><h2>There&apos;s always<br />a seat for you.</h2><div className="visit__facts"><p><strong>Hours</strong>Mon–Fri 7am–5pm<br />Sat–Sun 8am–4pm</p><p><strong>Find us</strong>GK Village, Bayawan City</p></div><p className="visit__note">First one&apos;s on the house if it&apos;s your first visit — just ask.</p></Reveal>
        <Reveal className="visit__image" delay={0.1}><img src="https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=1400&q=85" alt="Cafe seating by a large window" /></Reveal>
      </section>

      <footer><a className="brand" href="#top">Katrina <span>Coffee</span></a><p>Made with plants and patience.</p><a href="#top">Back to top ↑</a></footer>
    </main>
  )
}

export default App
