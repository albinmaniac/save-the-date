import { Heart, Wine, Shirt, Hotel } from 'lucide-react'
import Section from '../components/Section.jsx'
import Timeline from '../components/Timeline.jsx'

const details = [
  {
    Icon: Heart,
    label: 'Ceremony',
    value: 'Backwater Heritage Resort, Alappuzha',
    sub: '12th December 2026 · 10:00 AM',
  },
  {
    Icon: Wine,
    label: 'Reception',
    value: 'Same venue, Garden Lawn',
    sub: '6:00 PM onwards',
  },
  {
    Icon: Shirt,
    label: 'Dress code',
    value: 'Garden formal',
    sub: 'Soft greens, whites, and pastels welcome',
  },
  {
    Icon: Hotel,
    label: 'Stay',
    value: 'Partner hotels nearby',
    sub: 'Ask us for recommendations and booking codes',
  },
]

function DetailCard({ Icon, label, value, sub }) {
  return (
    <div className="border border-celadon/50 bg-white/40 p-6 text-center">
      <Icon className="mx-auto h-7 w-7 text-forest" strokeWidth={1.5} />
      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-forest/80">
        {label}
      </p>
      <p className="mt-2 font-serif text-xl text-forest">{value}</p>
      <p className="mt-1 text-sm text-ink/70">{sub}</p>
    </div>
  )
}

export default function Details() {
  return (
    <Section bg="tea">
      <div className="text-center">
        <p className="font-script text-6xl text-forest md:text-7xl">
          The Details
        </p>
        <div className="mx-auto mt-4 h-px w-16 bg-forest/40" />
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2">
        {details.map((d) => (
          <DetailCard key={d.label} {...d} />
        ))}
      </div>

      <div className="mt-16 overflow-hidden rounded-sm border border-celadon/50">
        <iframe
          title="Venue map"
          className="h-80 w-full"
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps?q=Alappuzha,Kerala&output=embed"
        />
      </div>
        <Timeline />
    </Section>
  )
}