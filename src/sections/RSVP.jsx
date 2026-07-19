import { Mail, Phone, Gift } from 'lucide-react'
import Section from '../components/Section.jsx'

const RSVP_EMAIL = 'aria.and.sam@example.com'
const RSVP_DEADLINE = '15.11.2026'
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
    <Section bg="forest" index="05" label="RSVP">
      <div className="grid gap-px border border-honeydew/20 bg-honeydew/20 md:grid-cols-2">
        {/* Left: headline + CTA */}
        <div className="bg-forest p-8 md:p-12">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-celadon">
            Deadline — {RSVP_DEADLINE}
          </p>
          <h2 className="mt-4 font-serif text-5xl leading-tight text-honeydew md:text-6xl">
            Join us
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-honeydew/80">
            We'd be so happy to have you there. Please confirm your
            attendance before the date above so we can plan accordingly.
          </p>

          
          <a
            href={buildMailto()}
            className="mt-8 inline-flex items-center gap-3 border border-celadon px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-honeydew transition-colors hover:bg-celadon hover:text-forest"
          >
            <Mail className="h-4 w-4" strokeWidth={1.5} />
            RSVP via email
          </a>
        </div>

        {/* Right: structured info grid */}
        <div className="grid grid-rows-2 bg-forest">
          <div className="flex items-start gap-4 border-b border-honeydew/15 p-8 md:p-12">
            <Phone className="mt-1 h-5 w-5 shrink-0 text-celadon" strokeWidth={1.5} />
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-honeydew/60">
                Questions
              </p>
              <p className="mt-2 font-serif text-xl text-honeydew">
                {CONTACT_PHONE}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-8 md:p-12">
            <Gift className="mt-1 h-5 w-5 shrink-0 text-celadon" strokeWidth={1.5} />
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-honeydew/60">
                Registry
              </p>
              
              <a
                href="#"
                className="mt-2 inline-block font-serif text-xl text-honeydew underline decoration-celadon/50 underline-offset-4 transition-colors hover:text-celadon"
              >
                View registry
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}