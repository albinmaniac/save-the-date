import Section from '../components/Section.jsx'

const storyBlocks = [
  {
    image:
      'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=1200&auto=format&fit=crop',
    heading: 'How we met',
    text: "It was a rainy evening in Kochi, at a friend's housewarming, of all places. Sam spilled coffee on Aria's sketchbook and spent the next hour trying to make up for it. Neither of us left that party without the other's number.",
  },
  {
    image:
      'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200&auto=format&fit=crop',
    heading: 'Falling in love',
    text: 'What started as long phone calls turned into weekend train rides, quiet Sunday markets, and the slow realization that home was wherever the other person happened to be standing.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop',
    heading: 'The proposal',
    text: 'On the backwaters at sunset, with the whole sky turning gold, Sam finally asked the question. Aria said yes before it was even finished — and the boatman started clapping before either of us could speak.',
  },
]

export default function OurStory() {
  return (
    <Section bg="honeydew">
      <div className="text-center">
        <p className="font-script text-6xl text-forest md:text-7xl">
          Our Story
        </p>
        <div className="mx-auto mt-4 h-px w-16 bg-celadon" />
      </div>

      <div className="mt-16 space-y-20">
        {storyBlocks.map((block, i) => (
          <div key={block.heading} className="mx-auto max-w-2xl text-center">
            <div
              className="mx-auto h-72 w-full max-w-lg rounded-sm bg-cover bg-center md:h-96"
              style={{ backgroundImage: `url(${block.image})` }}
            />
            <p className="mt-8 font-serif text-3xl text-forest md:text-4xl">
              {block.heading}
            </p>
            <p className="mt-4 leading-relaxed text-ink/90">{block.text}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-20 max-w-xl text-center">
        <p className="font-script text-4xl leading-relaxed text-forest md:text-5xl">
          "Every love story is beautiful, but ours is my favourite."
        </p>
      </div>
    </Section>
  )
}