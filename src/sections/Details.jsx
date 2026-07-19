import { Heart, Wine, Shirt, Hotel } from 'lucide-react'
import Section from '../components/Section.jsx'
import Timeline from '../components/Timeline.jsx'

const details = [
  {
    Icon: Heart,
    num: '01',
    label: 'Ceremony',
    value: "St. Mary's Forane Church, Pallippuram, Cherthala",
    sub: '12.12.2026 — 10:00',
  },
  {
    Icon: Wine,
    num: '02',
    label: 'Reception',
    value: "St. Mary's Parish Hall, Pallippuram, Cherthala",
    sub: '18:00 onwards',
  },
  {
    Icon: Shirt,
    num: '03',
    label: 'Dress code',
    value: 'Garden formal',
    sub: 'Soft greens, whites, pastels',
  },
  {
    Icon: Hotel,
    num: '04',
    label: 'Stay',
    value: 'Partner hotels nearby',
    sub: 'Ask us for booking codes',
  },
]

function DetailCard({ Icon, num, label, value, sub }) {
  return (
    <div className="bg-tea p-8">
      <div className="flex items-start justify-between">
        <Icon className="h-6 w-6 text-forest" strokeWidth={1.5} />
        <span className="font-mono text-xs text-forest/50">{num}</span>
      </div>
      <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.25em] text-forest/70">
        {label}
      </p>
      <p className="mt-2 font-serif text-2xl text-forest">{value}</p>
      <p className="mt-1 text-sm text-ink/70">{sub}</p>
    </div>
  )
}

export default function Details() {
  return (
    <Section bg="tea" index="03" label="Details">
      <div className="grid gap-px border border-forest/20 bg-forest/20 sm:grid-cols-2">
        {details.map((d) => (
          <DetailCard key={d.label} {...d} />
        ))}
      </div>

      <div className="mt-px overflow-hidden border border-forest/20">
        <iframe
          title="Venue map"
          className="h-80 w-full grayscale-[15%]"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3932.130351275333!2d76.3616596!3d9.7550246!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b08797e27d80f57%3A0x412e92503f942d1e!2sSt.%20Mary&#39;s%20Forane%20Church_Syro%20Malabar%2C%20Pallippuram!5e0!3m2!1sen!2sin!4v1784463259952!5m2!1sen!2sin"
        />
      </div>

      <Timeline />
    </Section>
  )
}