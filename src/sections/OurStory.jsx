import Section from '../components/Section.jsx'

export default function OurStory() {
  return (
    <Section bg="honeydew">
      <div className="text-center">
        <p className="font-script text-6xl text-forest md:text-7xl">
          Welcome
        </p>
        <div className="mx-auto mt-4 h-px w-16 bg-celadon" />
      </div>

      <div className="mx-auto mt-14 max-w-xl text-center">
        <div
          className="mx-auto h-64 w-full max-w-md rounded-sm bg-cover bg-center md:h-80"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1200&auto=format&fit=crop')",
          }}
        />

        <p className="mt-10 font-serif text-2xl leading-relaxed text-forest md:text-3xl">
          We're so grateful you're part of our story.
        </p>

        <p className="mt-6 leading-relaxed text-ink/85">
          We can't wait to celebrate this new beginning surrounded by the
          people who mean the most to us. Thank you for being here, for your
          love, and for the memories we're about to make together.
        </p>

        <p className="mt-10 font-script text-4xl text-forest md:text-5xl">
          With love, Aria &amp; Sam
        </p>
      </div>
    </Section>
  )
}