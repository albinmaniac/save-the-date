import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Section from '../components/Section.jsx'
import Marquee from '../components/Marquee.jsx'

const photos = [
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1400&auto=format&fit=crop', alt: 'Aria and Sam walking together' },
  { src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1400&auto=format&fit=crop', alt: 'Sunset by the backwaters' },
  { src: 'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=1400&auto=format&fit=crop', alt: 'First date coffee shop' },
  { src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1400&auto=format&fit=crop', alt: 'Venue garden lawn' },
  { src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1400&auto=format&fit=crop', alt: 'Engagement portrait' },
  { src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1400&auto=format&fit=crop', alt: 'Holding hands' },
]

// Builds an SVG path for a regular polygon with rounded corners.
function roundedPolygonPath(sides, rounding, rotationDeg) {
  const pts = []
  for (let i = 0; i < sides; i++) {
    const angle = ((360 / sides) * i + rotationDeg) * (Math.PI / 180)
    pts.push([0.5 + 0.48 * Math.cos(angle), 0.5 + 0.48 * Math.sin(angle)])
  }
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]

  let d = ''
  for (let i = 0; i < sides; i++) {
    const curr = pts[i]
    const prev = pts[(i - 1 + sides) % sides]
    const next = pts[(i + 1) % sides]
    const p1 = lerp(prev, curr, 1 - rounding)
    const p2 = lerp(curr, next, rounding)
    d += i === 0 ? `M ${p1[0]} ${p1[1]} ` : `L ${p1[0]} ${p1[1]} `
    d += `Q ${curr[0]} ${curr[1]} ${p2[0]} ${p2[1]} `
  }
  return d + 'Z'
}

// ONE shape (a rounded hexagon: same sides + same rounding every time),
// just rotated to four different angles for visual variety without
// mixing silhouettes.
const SIDES = 6
const ROUNDING = 0.22
const rotations = [0, 15, 30, 45]
const shapeDefs = rotations.map((deg, i) => ({
  id: `clip-hex-${i}`,
  d: roundedPolygonPath(SIDES, ROUNDING, deg),
}))

function PolyPhoto({ photo, index, onClick }) {
  const shape = shapeDefs[index % shapeDefs.length]
  return (
    <button onClick={onClick} className="group relative aspect-[4/5] w-full">
      <div
        className="absolute inset-0 bg-forest transition-transform duration-500 group-hover:scale-[1.04]"
        style={{ clipPath: `url(#${shape.id})` }}
      />
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        className="absolute inset-[3px] h-[calc(100%-6px)] w-[calc(100%-6px)] object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        style={{ clipPath: `url(#${shape.id})` }}
      />
      <span
        className="absolute bottom-3 left-3 font-mono text-[11px] uppercase tracking-[0.2em] text-honeydew opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
    </button>
  )
}

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null)
  const isOpen = activeIndex !== null

  const close = () => setActiveIndex(null)
  const showNext = () => setActiveIndex((i) => (i + 1) % photos.length)
  const showPrev = () => setActiveIndex((i) => (i - 1 + photos.length) % photos.length)

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') showNext()
      if (e.key === 'ArrowLeft') showPrev()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <div>
      {/* Compact filmstrip band */}
      <div id="gallery" className="border-y border-forest/20 bg-ink py-6">
        <Marquee images={photos} direction="left" speed={45} />
      </div>

      <Section bg="honeydew" index="04" label="Gallery">
        <svg width="0" height="0" className="absolute">
          <defs>
            {shapeDefs.map((s) => (
              <clipPath id={s.id} key={s.id} clipPathUnits="objectBoundingBox">
                <path d={s.d} />
              </clipPath>
            ))}
          </defs>
        </svg>

        <p className="font-mono text-xs uppercase tracking-[0.25em] text-forest/60">
          06 photographs — tap to enlarge
        </p>

        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 md:gap-8">
          {photos.map((photo, i) => (
            <PolyPhoto key={photo.src} photo={photo} index={i} onClick={() => setActiveIndex(i)} />
          ))}
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={close}
              className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-ink/90 p-4 backdrop-blur-md"
            >
              <button aria-label="Close" onClick={close}
                className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center border border-honeydew/30 text-honeydew transition-colors hover:border-celadon hover:text-celadon">
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>

              <p className="absolute left-6 top-8 font-mono text-xs tracking-[0.25em] text-honeydew/60">
                {String(activeIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
              </p>

              <button aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); showPrev() }}
                className="absolute left-4 flex h-11 w-11 items-center justify-center border border-honeydew/30 text-honeydew transition-colors hover:border-celadon hover:text-celadon md:left-10">
                <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
              </button>

              <button aria-label="Next photo" onClick={(e) => { e.stopPropagation(); showNext() }}
                className="absolute right-4 flex h-11 w-11 items-center justify-center border border-honeydew/30 text-honeydew transition-colors hover:border-celadon hover:text-celadon md:right-10">
                <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
              </button>

              <AnimatePresence mode="wait">
                <motion.figure
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  onClick={(e) => e.stopPropagation()}
                  className="flex flex-col items-center"
                >
                  <img src={photos[activeIndex].src} alt={photos[activeIndex].alt}
                    className="max-h-[75vh] max-w-[88vw] border border-honeydew/20 object-contain" />
                  <figcaption className="mt-6 font-serif text-lg italic text-honeydew/85">
                    {photos[activeIndex].alt}
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </Section>
    </div>
  )
}