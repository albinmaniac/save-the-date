function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  const links = [
    { id: 'home', label: 'Home' },
    { id: 'story', label: 'Our Story' },
    { id: 'details', label: 'Details' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'rsvp', label: 'RSVP' },
  ]

  return (
    <footer className="bg-forest px-6 py-14 text-center text-honeydew md:px-12">
      <p className="font-serif text-2xl tracking-wide">A &amp; S</p>

      <nav className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm tracking-wide">
        {links.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollToSection(link.id)}
            className="transition-colors hover:text-celadon"
          >
            {link.label}
          </button>
        ))}
      </nav>

      <p className="mt-8 text-xs tracking-widest text-tea">
        12th December 2026 · Kerala, India
      </p>
    </footer>
  )
}