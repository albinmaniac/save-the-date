import { useEffect, useState } from 'react'
import Section from '../components/Section.jsx'

const WEDDING_DATE = new Date('2026-12-12T10:00:00')

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

function TeaserCard({ target, image, title, blurb }) {
  return (
    <button
      onClick={() => scrollToSection(target)}
      className="group block overflow-hidden rounded-sm border border-celadon/40 bg-white/40 text-left transition-colors hover:border-forest"
    >
      <div
        className="h-56 w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="p-6">
        <p className="font-serif text-2xl text-forest">{title}</p>
        <p className="mt-2 text-sm text-ink/80">{blurb}</p>
        <p className="mt-4 text-xs uppercase tracking-widest text-forest/80 group-hover:text-forest">
          Scroll down →
        </p>
      </div>
    </button>
  )
}

export default function Home() {
  const daysLeft = useCountdown(WEDDING_DATE)

  return (
    <div>
      <div
        className="relative flex h-screen min-h-[640px] items-center justify-center bg-cover bg-center text-center"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(20,40,20,0.35), rgba(20,40,20,0.55)), url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop')",
        }}
      >
        <div className="px-6 text-honeydew">
          <p className="mb-4 font-script text-4xl text-honeydew/95 md:text-5xl">
            We're getting married
          </p>
          <h1 className="font-serif text-6xl font-medium leading-tight md:text-8xl">
            Aria &amp; Sam
          </h1>
          <p className="mt-5 text-sm tracking-[0.2em] opacity-90">
            12 · 12 · 2026 &nbsp;·&nbsp; Kerala, India
          </p>
        </div>
        <p className="absolute bottom-8 text-xs tracking-[0.2em] text-honeydew/80">
          Scroll to explore
        </p>
      </div>

      <Section bg="honeydew" className="text-center">
        <p className="mx-auto max-w-2xl font-serif text-2xl leading-relaxed text-ink md:text-3xl">
          We can't wait to celebrate this new chapter surrounded by the people
          we love most. Here's everything you need to join us.
        </p>
      </Section>

      <div className="bg-tea py-6 text-center">
        <p className="font-serif text-xl text-forest md:text-2xl">
          {daysLeft} {daysLeft === 1 ? 'day' : 'days'} to go
        </p>
      </div>

      <Section bg="honeydew">
        <div className="grid gap-8 md:grid-cols-3">
          <TeaserCard
            target="story"
            image="https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=800&auto=format&fit=crop"
            title="Our Story"
            blurb="How it all began, from first hello to forever."
          />
          <TeaserCard
            target="details"
            image="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800&auto=format&fit=crop"
            title="Details"
            blurb="Venue, timing, dress code — everything you need to know."
          />
          <TeaserCard
            target="gallery"
            image="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop"
            title="Gallery"
            blurb="A few of our favourite moments together so far."
          />
        </div>
      </Section>
    </div>
  )
}