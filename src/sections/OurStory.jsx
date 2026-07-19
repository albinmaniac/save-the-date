import Section from '../components/Section.jsx'

export default function OurStory() {
  return (
    <Section bg="honeydew" index="02" label="Welcome">
      <div className="grid gap-px border border-forest/20 bg-forest/20 md:grid-cols-2">
        <div
          className="h-64 bg-cover bg-center md:h-full"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1200&auto=format&fit=crop')",
          }}
        />
        <div className="bg-honeydew p-8 md:p-12">
          <p className="font-serif text-3xl leading-tight text-forest md:text-4xl">
            We're so grateful you're part of our story.
          </p>
          <p className="mt-6 text-sm leading-relaxed text-ink/80">
            We can't wait to celebrate this new beginning surrounded by the
            people who mean the most to us. Thank you for being here, for
            your love, and for the memories we're about to make together.
          </p>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.25em] text-forest/70">
            — Litty &amp; Felix
          </p>
        </div>
      </div>
    </Section>
  )
}