import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Section from '../components/Section.jsx'
import FloatingScene3D from '../components/FloatingScene3D.jsx'

const WEDDING_DATE = new Date('2027-01-02T10:00:00')

function useCountdown(targetDate) {
  const [daysLeft, setDaysLeft] = useState(getDays(targetDate))
  useEffect(() => {
    const id = setInterval(() => setDaysLeft(getDays(targetDate)), 1000 * 60 * 60)
    return () => clearInterval(id)
  }, [targetDate])
  return daysLeft
}

function getDays(targetDate) {
  const diff = targetDate.getTime() - Date.now()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

// Drifting leaf-like particles, purely decorative, for the "wandering" feel.
function FloatingParticles() {
  const particles = Array.from({ length: 10 })
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((_, i) => {
        const left = (i * 97) % 100
        const delay = (i * 1.7) % 8
        const duration = 14 + (i % 5) * 3
        const size = 4 + (i % 3) * 2
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-celadon/50"
            style={{ left: `${left}%`, width: size, height: size, bottom: -20 }}
            animate={{
              y: ['0vh', '-110vh'],
              x: [0, i % 2 === 0 ? 30 : -30, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )
      })}
    </div>
  )
}

// Hero background + text drift at different speeds as the mouse moves,
// creating a subtle layered-depth (parallax) effect.
function ParallaxHero({ daysLeft }) {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springX = useSpring(mx, { stiffness: 60, damping: 20 })
  const springY = useSpring(my, { stiffness: 60, damping: 20 })

  const bgX = useTransform(springX, [-1, 1], [-18, 18])
  const bgY = useTransform(springY, [-1, 1], [-14, 14])
  const textX = useTransform(springX, [-1, 1], [-8, 8])
  const textY = useTransform(springY, [-1, 1], [-6, 6])

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    mx.set(px * 2)
    my.set(py * 2)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative flex h-screen min-h-[640px] flex-col justify-between overflow-hidden px-6 py-28 md:px-12"
    >
      <motion.div
        className="absolute -inset-6 bg-cover bg-center"
        style={{
          x: bgX,
          y: bgY,
          backgroundImage:
            "linear-gradient(180deg, rgba(20,40,20,0.4), rgba(20,40,20,0.55)), url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop')",
        }}
      />

      <FloatingScene3D />

      <div />

      <motion.div style={{ x: textX, y: textY }} className="relative max-w-3xl text-honeydew">
        <p className="font-mono text-xs uppercase tracking-[0.3em] opacity-80">
          01 / We're getting married
        </p>
        <h1 className="mt-4 font-serif text-6xl font-medium leading-[0.95] md:text-8xl">
          Litty &amp; Felix
        </h1>
      </motion.div>

      <div className="relative flex flex-wrap items-end justify-between gap-4 border-t border-honeydew/25 pt-6 font-mono text-xs uppercase tracking-[0.2em] text-honeydew/85">
        <span>02 / 01 / 2027</span>
        <span>Pallippuram, Cherthala</span>
        <span>{daysLeft} days remaining</span>
      </div>
    </div>
  )
}

// 3D tilt-on-hover teaser card.
function TeaserCard({ target, num, title, blurb }) {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 })

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleMouseLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => scrollToSection(target)}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="group border border-forest/20 bg-honeydew p-6 text-left transition-colors hover:border-forest"
    >
      <span className="font-mono text-xs text-forest/50">{num}</span>
      <p className="mt-3 font-serif text-2xl text-forest">{title}</p>
      <p className="mt-2 text-sm text-ink/75">{blurb}</p>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-forest/70 group-hover:text-forest">
        Explore →
      </p>
    </motion.button>
  )
}

export default function Home() {
  const daysLeft = useCountdown(WEDDING_DATE)

  return (
    <div>
      <ParallaxHero daysLeft={daysLeft} />

      <Section bg="honeydew" index="—" label="Welcome note">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-2xl font-serif text-2xl leading-relaxed text-ink md:text-3xl"
        >
          We can't wait to celebrate this new chapter surrounded by the people
          we love most. Here's everything you need to join us.
        </motion.p>
      </Section>

      <Section bg="honeydew" index="—" label="Explore">
        <div className="grid gap-px border border-forest/20 bg-forest/20 sm:grid-cols-3" style={{ perspective: 800 }}>
          <TeaserCard target="story" num="02" title="Welcome" blurb="A note before the day begins." />
          <TeaserCard target="details" num="03" title="Details" blurb="Venue, timing, dress code." />
          <TeaserCard target="gallery" num="04" title="Gallery" blurb="A few favourite moments." />
        </div>
      </Section>
    </div>
  )
}