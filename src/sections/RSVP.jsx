import { Mail, Gift, Phone } from 'lucide-react'
import Section from '../components/Section.jsx'

const RSVP_EMAIL = 'aria.and.sam@example.com'
const RSVP_DEADLINE = '15th November 2026'
const CONTACT_PHONE = '+91 98765 43210'

function buildMailto() {
  const subject = encodeURIComponent("RSVP — Aria & Sam's Wedding")
  const body = encodeURIComponent(
    'Hi Aria & Sam,\n\nWe would love to confirm our attendance!\n\nName(s):\nNumber of guests:\nDietary restrictions (if any):\n\nSee you there!'
  )
  return `mailto:${RSVP_EMAIL}?subject=${subject}&body=${body}`
}

export default function RSVP() {
  return (
    <Section bg="forest">
      <div className="text-center">
        <p className="font-script text-6xl text-honeydew md:text-7xl">RSVP</p>
        <div className="mx-auto mt-4 h-px w-16 bg-celadon" />
        <p className="mx-auto mt-6 max-w-md leading-relaxed text-honeydew/85">
          We'd be so happy to have you there. Please let us know you're coming
          by <span className="text-celadon">{RSVP_DEADLINE}</span>.
        </p>
      </div>

      <div className="mt-12 flex justify-center">
        <a
          href={buildMailto()}
          className="inline-flex items-center gap-3 border border-celadon px-8 py-4 font-serif text-lg text-honeydew transition-colors hover:bg-celadon hover:text-forest"
        >
          <Mail className="h-5 w-5" strokeWidth={1.5} />
          RSVP via email
        </a>
      </div>

      <div className="mx-auto mt-16 grid max-w-md gap-6 border-t border-honeydew/20 pt-10 sm:grid-cols-2">
        <div className="flex items-start gap-3">
          <Phone className="mt-1 h-5 w-5 shrink-0 text-celadon" strokeWidth={1.5} />
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-honeydew/70">
              Questions?
            </p>
            <p className="mt-1 text-honeydew">{CONTACT_PHONE}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Gift className="mt-1 h-5 w-5 shrink-0 text-celadon" strokeWidth={1.5} />
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-honeydew/70">
              Registry
            </p>
            <a
              href="#"
              className="mt-1 inline-block text-honeydew underline decoration-celadon/50 underline-offset-4 transition-colors hover:text-celadon"
            >
              View our registry
            </a>
          </div>
        </div>
      </div>
    </Section>
  )
}