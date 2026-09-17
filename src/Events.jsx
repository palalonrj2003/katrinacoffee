import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import './Events.css'

const packages = [
  { id: 'morning', name: 'Morning Gathering', price: '$150', duration: '2 hrs', capacity: 'Up to 15 guests', detail: 'Coffee bar included' },
  { id: 'afternoon', name: 'Full Afternoon', price: '$350', duration: '4 hrs', capacity: 'Up to 30 guests', detail: 'Coffee + pastry spread' },
  { id: 'buyout', name: 'Full Buyout', price: '$650', duration: 'Full evening', capacity: 'Up to 45 guests', detail: 'Full menu + dedicated staff' },
  { id: 'community', name: 'Community Rate', price: '$75', duration: '2 hrs', capacity: 'Up to 20 guests', detail: 'For open mics & book clubs' },
]

const unavailable = new Set([3, 8, 14, 19, 22, 28])
const days = Array.from({ length: 30 }, (_, index) => index + 1)

function Field({ label, children }) {
  return <label className="field"><span>{label}</span>{children}</label>
}

function Events() {
  const reduceMotion = useReducedMotion()
  const [step, setStep] = useState(1)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ package: '', date: '', time: '', name: '', email: '', phone: '', guests: '', type: 'Private', notes: '' })
  const selectedPackage = packages.find((item) => item.id === form.package)
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))
  const moveNext = () => {
    const requirements = {
      1: form.package,
      2: form.date && form.time,
      3: form.name && form.email && form.phone && form.guests,
    }
    if (!requirements[step]) { setError('Please complete the marked selection before continuing.'); return }
    setError(''); setStep((current) => current + 1)
  }
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.34, ease: [0.23, 1, 0.32, 1] }
  const stepContent = {
    1: <section className="booking-step"><div className="booking-step__heading"><p className="eyebrow">First, choose a fit</p><h2>A little room<br />for your people.</h2><p>Each booking includes a calm corner of Katrina, ready for however your gathering unfolds.</p></div><div className="package-options" role="radiogroup" aria-label="Event package">{packages.map((item) => <button type="button" role="radio" aria-checked={form.package === item.id} className={`package-card ${form.package === item.id ? 'is-selected' : ''}`} onClick={() => { update('package', item.id); setError('') }} key={item.id}><span className="package-card__top"><span>{item.name}</span><strong>{item.price}</strong></span><span className="package-card__bottom"><span>{item.duration} · {item.capacity}</span><span>{item.detail}</span></span></button>)}</div></section>,
    2: <section className="booking-step booking-step--date"><div className="booking-step__heading"><p className="eyebrow">Choose a day</p><h2>Put it on<br />the calendar.</h2><p>Available dates are open for an initial booking request. We’ll confirm the details personally.</p></div><div className="date-picker"><div className="calendar"><div className="calendar__title"><span>September 2026</span><small>Unavailable dates are softened</small></div><div className="calendar__week">{['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => <span key={`${day}-${i}`}>{day}</span>)}</div><div className="calendar__days">{Array.from({ length: 2 }).map((_, i) => <i key={`empty-${i}`} />)}{days.map((day) => <button type="button" disabled={unavailable.has(day)} className={form.date === `September ${day}, 2026` ? 'is-selected' : ''} onClick={() => { update('date', `September ${day}, 2026`); setError('') }} key={day}>{day}</button>)}</div></div><div className="time-options"><p>Time of day</p>{['Morning · 8am–10am', 'Afternoon · 1pm–5pm', 'Evening · 6pm–close'].map((time) => <button type="button" className={form.time === time ? 'is-selected' : ''} onClick={() => { update('time', time); setError('') }} key={time}>{time}</button>)}</div></div></section>,
    3: <section className="booking-step booking-step--details"><div className="booking-step__heading"><p className="eyebrow">A few details</p><h2>Tell us about<br />the gathering.</h2><p>Nothing complicated — just enough for us to make the space feel like yours.</p></div><div className="details-form"><Field label="Your name"><input value={form.name} onChange={(e) => update('name', e.target.value)} autoComplete="name" /></Field><Field label="Email"><input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} autoComplete="email" /></Field><Field label="Phone"><input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} autoComplete="tel" /></Field><Field label="Estimated guests"><input type="number" min="1" value={form.guests} onChange={(e) => update('guests', e.target.value)} /></Field><Field label="Event type"><select value={form.type} onChange={(e) => update('type', e.target.value)}><option>Private</option><option>Community</option></select></Field><Field label="Anything else we should know? (optional)"><textarea value={form.notes} onChange={(e) => update('notes', e.target.value)} rows="4" /></Field></div></section>,
    4: <section className="booking-step booking-step--review"><div className="booking-step__heading"><p className="eyebrow">One last look</p><h2>Looks like<br />a good time.</h2><p>Send your request and we’ll be in touch within a day to confirm everything.</p></div><div className="review-card"><div><span>Package</span><strong>{selectedPackage?.name}</strong><em>{selectedPackage?.price}</em></div><div><span>When</span><strong>{form.date}</strong><em>{form.time}</em></div><div><span>Guests</span><strong>{form.guests} people</strong><em>{form.type} event</em></div><div><span>Contact</span><strong>{form.name}</strong><em>{form.email}</em></div></div></section>,
  }
  if (step === 5) return <Confirmation reset={() => { setForm({ package: '', date: '', time: '', name: '', email: '', phone: '', guests: '', type: 'Private', notes: '' }); setStep(1) }} />
  return <main className="events-page"><section className="events-hero" id="top"><nav className="nav events-nav" aria-label="Primary navigation"><a className="brand" href="/">Katrina <span>Coffee</span></a><div className="nav__links"><a href="/#menu">Menu</a><a href="/#story">Our story</a><a className="is-current" href="/events">Events</a><a href="/#visit">Visit</a></div></nav><div className="events-hero__content"><p className="eyebrow">At Katrina Coffee</p><h1>More than a coffee shop.<br />A place to gather.</h1><p>Book Katrina Coffee for your next birthday, book club, workshop, or quiet corporate offsite.</p><a className="button" href="#booking">Check availability <span aria-hidden="true">↓</span></a></div><p className="events-hero__note">Private parties + community things, held warmly.</p></section><section className="events-intro"><p>Whether it’s twelve people or forty, a private party or an open house for the neighborhood — we set the tables, you bring the people.</p></section><section className="event-types"><article><p className="eyebrow">For your people</p><h2>Private<br />Events</h2><p>Birthdays, showers, small celebrations. The whole space, just for you.</p></article><article><p className="eyebrow">For the neighborhood</p><h2>Community<br />Events</h2><p>Book clubs, open mics, workshops. We love hosting the regulars’ regulars.</p></article></section><section className="booking" id="booking"><div className="booking__intro"><p className="eyebrow">Start a booking</p><h2>Let’s make<br />a little room.</h2><p>No payment today. Just a few simple details, then we’ll take it from there.</p></div><div className="booking__panel"><div className="progress" aria-label={`Step ${step} of 4`}>{[1, 2, 3, 4].map((number) => <span className={number <= step ? 'is-active' : ''} key={number}><i /> <b>{number}</b></span>)}</div><AnimatePresence mode="wait" initial={false}><motion.div key={step} initial={reduceMotion ? { opacity: 0 } : { opacity: 0, transform: 'translateX(18px)' }} animate={{ opacity: 1, transform: 'translateX(0)' }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, transform: 'translateX(-12px)' }} transition={transition}>{stepContent[step]}</motion.div></AnimatePresence>{error && <p className="form-error" role="alert">{error}</p>}<div className="booking-actions">{step > 1 && <button className="text-button" type="button" onClick={() => { setError(''); setStep((current) => current - 1) }}>Back</button>}<button className="button" type="button" onClick={step === 4 ? () => setStep(5) : moveNext}>{step === 4 ? 'Send booking request' : 'Continue'} <span aria-hidden="true">→</span></button></div></div></section><footer><a className="brand" href="/">Katrina <span>Coffee</span></a><p>Made with plants and patience.</p><a href="#top">Back to top ↑</a></footer></main>
}

function Confirmation({ reset }) { return <main className="confirmation"><div><p className="eyebrow">Request received</p><h1>You’re booked in!</h1><p>We’ll follow up within 24 hours to confirm details.</p><button className="button" type="button" onClick={reset}>Plan another gathering <span aria-hidden="true">→</span></button><a href="/">Back to Katrina Coffee</a></div></main> }

export default Events
