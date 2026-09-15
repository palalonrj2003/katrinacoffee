# Katrina Coffee — Coffee Shop Website Brief

*A fictional coffee brand: warm & cozy, sage green + cream, botanical, bright & airy, single-page scroll site.*

---

## 1. Copy (ready to drop in)

### Hero
- **Headline:** Slow mornings, better coffee.
- **Subhead:** A small green corner of the city where the light comes in soft and the coffee is always fresh.
- **CTA button:** See the menu

### Intro / Story strip
> Katrina Coffee started as a windowsill of herbs and a bad espresso machine. Now it's a room full of plants, sunlight, and coffee we actually love making. Come sit for a while.

### Menu preview (6 items)
1. **Honey Lavender Latte** — espresso, steamed milk, lavender honey
2. **Katrina House Blend** — our signature drip, notes of hazelnut and orange peel
3. **Matcha Sage Latte** — ceremonial matcha, oat milk, a whisper of sage
4. **Cardamom Cold Brew** — slow-steeped 18 hours, cardamom pod finish
5. **Pistachio Croissant** — baked fresh each morning
6. **Brown Butter Banana Bread** — a Katrina Coffee original

### About / Philosophy
> We believe good coffee doesn't need to shout. Every cup is made slowly, every plant in this room gets talked to occasionally, and every regular gets remembered by name. That's the whole plan.

### Visit us
- **Hours:** Mon–Fri 7am–5pm · Sat–Sun 8am–4pm
- **Location:** 214 Willow Street *(placeholder — swap for real address)*
- **Line:** "First one's on the house if it's your first visit — just ask."

### Footer
- Katrina Coffee Co. · Made with plants and patience.

---

## 2. Design Brief (for your coding tool)

**Overall direction:** Minimal, typographic, generous whitespace (Emil Kowalski–style restraint). Botanical and calm, never busy. Motion should feel quiet and intentional, not flashy — short durations, ease-out curves, subtle stagger.

### Palette
| Role | Color | Hex |
|---|---|---|
| Background | Cream | `#F7F3EA` |
| Primary text | Deep charcoal-green | `#2B3328` |
| Accent / primary | Sage green | `#8A9A7E` |
| Accent light | Soft sage | `#C8D3BE` |
| Highlight / CTA | Warm terracotta (sparingly) | `#C98A5E` |

### Typography
- Headings: a soft serif (e.g. "Fraunces" or "Lora") — warm, a little editorial
- Body: clean sans (e.g. "Inter" or "Manrope")
- Generous line-height, large hero type (64–96px desktop), tight tracking on labels

### Section-by-section
1. **Hero** — full-bleed bright photo (plants + light), headline fades/slides up 400ms after load, subtle scale on the background image (Framer Motion `initial`/`animate`, no bounce)
2. **Story strip** — centered short paragraph, fades in on scroll (`whileInView`)
3. **Menu preview** — card grid, 3 columns desktop, hover = slight lift + shadow, image zoom 1.03x on hover
4. **Gallery** — 3–4 images, staggered fade/slide-up on scroll entry (stagger delay ~80ms between items)
5. **About** — text block, plant illustration or texture as background accent, no animation needed (let it breathe)
6. **Visit us** — two-column: hours/address text + map placeholder or static image
7. **Footer** — simple, minimal, no motion

### Motion rules
- Durations: 300–500ms, ease `[0.22, 1, 0.36, 1]` (soft ease-out)
- No parallax, no bounce, no spinning — everything should feel like it's settling into place
- Scroll-triggered reveals use `whileInView` with `viewport={{ once: true }}`

### Images
- Use **Unsplash** or **Pexels** (free-to-use, high-res) — search terms: "bright coffee shop plants," "latte art natural light," "cafe interior sage green," "bakery pastry case bright"
- Avoid pulling images from design blogs/Pinterest aggregators — licensing is unclear
- Aim for: soft natural light, greenery visible, warm neutral tones — avoid dark/moody shots, they clash with the palette

---

## 3. Tech Stack

- **Build tool:** Vite + React
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Fonts:** Google Fonts — Fraunces (headings), Inter (body)
- **Deployment:** Vercel or Netlify (zero-config for Vite)
