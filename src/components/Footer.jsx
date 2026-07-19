import Monogram from './Monogram.jsx'

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const links = [
  { id: 'home', label: 'Home' },
  { id: 'story', label: 'Welcome' },
  { id: 'details', label: 'Details' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'rsvp', label: 'RSVP' },
]

export default function Footer() {
  return (
    <footer className="border-t border-honeydew/15 bg-forest px-6 py-14 text-honeydew md:px-12">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-3 md:gap-6">
        <div>
          <Monogram dark onClick={() => scrollToSection('home')} />
          <p className="mt-4 font-serif text-xl">Litty &amp; Felix</p>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-celadon">
            12.12.2026
          </p>
        </div>

        <nav className="flex flex-col gap-2 md:border-x md:border-honeydew/15 md:px-6">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-left font-mono text-xs uppercase tracking-[0.2em] text-honeydew/80 transition-colors hover:text-celadon"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="font-mono text-xs uppercase tracking-[0.2em] text-honeydew/60">
          Kerala, India
        </div>
      </div>
    </footer>
  )
}