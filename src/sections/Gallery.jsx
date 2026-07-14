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
    <Section bg="honeydew">
      <div className="text-center">
        <p className="font-script text-6xl text-forest md:text-7xl">Gallery</p>
        <div className="mx-auto mt-4 h-px w-16 bg-celadon" />
      </div>

      <div className="mt-16 -mx-6 md:-mx-12">
        <Marquee images={photos} direction="left" speed={45} />
      </div>

      <p className="mt-16 text-center text-sm uppercase tracking-[0.2em] text-forest/60">
        Tap any photo to view full size
      </p>

      <div className="mt-6 columns-2 gap-4 [column-fill:_balance] md:columns-3">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            onClick={() => setActiveIndex(i)}
            className="mb-4 block w-full overflow-hidden rounded-sm border border-celadon/40"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="w-full transition-transform duration-500 hover:scale-105"
            />
          </button>
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
            <button
              aria-label="Close"
              onClick={close}
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-honeydew/30 text-honeydew transition-colors hover:border-celadon hover:text-celadon"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>

            <p className="absolute left-6 top-8 text-xs tracking-[0.25em] text-honeydew/60">
              {String(activeIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
            </p>

            <button
              aria-label="Previous photo"
              onClick={(e) => { e.stopPropagation(); showPrev() }}
              className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full border border-honeydew/30 text-honeydew transition-colors hover:border-celadon hover:text-celadon md:left-10"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
            </button>

            <button
              aria-label="Next photo"
              onClick={(e) => { e.stopPropagation(); showNext() }}
              className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full border border-honeydew/30 text-honeydew transition-colors hover:border-celadon hover:text-celadon md:right-10"
            >
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
                <img
                  src={photos[activeIndex].src}
                  alt={photos[activeIndex].alt}
                  className="max-h-[75vh] max-w-[88vw] rounded-md object-contain shadow-2xl"
                />
                <figcaption className="mt-6 font-serif text-lg italic text-honeydew/85">
                  {photos[activeIndex].alt}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}