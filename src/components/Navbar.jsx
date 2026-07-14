import { useState, useEffect } from 'react'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'story', label: 'Our Story' },
  { id: 'details', label: 'Details' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'rsvp', label: 'RSVP' },
]

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [overHero, setOverHero] = useState(true)

  useEffect(() => {
    const heroEl = document.getElementById('home')
    if (!heroEl) return

    // Switches as soon as the hero has scrolled ~85% out of view,
    // so the change happens just before text would become unreadable.
    const observer = new IntersectionObserver(
      ([entry]) => setOverHero(entry.intersectionRatio > 0.15),
      { threshold: [0, 0.15, 1] }
    )
    observer.observe(heroEl)
    return () => observer.disconnect()
  }, [])

  const isDark = overHero // true = over hero photo, light text; false = over honeydew, dark text

  const handleLinkClick = (id) => {
    setOpen(false)
    scrollToSection(id)
  }

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-6 transition-colors duration-300 md:px-12 ${
          isDark ? '' : 'bg-honeydew/90 backdrop-blur-sm shadow-sm'
        }`}
      >
        <button
          onClick={() => handleLinkClick('home')}
          className={`font-serif text-xl tracking-wide transition-colors duration-300 ${
            isDark ? 'text-honeydew' : 'text-forest'
          }`}
        >
          A &amp; S
        </button>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
          className={`flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-full border transition-colors duration-300 hover:border-celadon ${
            isDark ? 'border-honeydew/60' : 'border-forest/50'
          }`}
        >
          <span
            className={`block h-px w-5 transition-transform duration-300 ${
              isDark ? 'bg-honeydew' : 'bg-forest'
            } ${open ? 'translate-y-[7px] rotate-45' : ''}`}
          />
          <span
            className={`block h-px w-5 transition-opacity duration-200 ${
              isDark ? 'bg-honeydew' : 'bg-forest'
            } ${open ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-px w-5 transition-transform duration-300 ${
              isDark ? 'bg-honeydew' : 'bg-forest'
            } ${open ? '-translate-y-[7px] -rotate-45' : ''}`}
          />
        </button>
      </div>

      <div
        className={`fixed inset-0 z-30 flex items-center justify-center bg-forest transition-opacity duration-500 ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <ul className="text-center">
          {links.map((link, i) => (
            <li key={link.id} className="my-3 overflow-hidden">
              <button
                onClick={() => handleLinkClick(link.id)}
                style={{ transitionDelay: open ? `${i * 60}ms` : '0ms' }}
                className={`inline-block font-serif text-4xl text-honeydew transition-all duration-500 hover:text-celadon md:text-6xl ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
        <p className="absolute bottom-10 text-sm tracking-widest text-tea">
          Aria &amp; Sam · 12th December 2026
        </p>
      </div>
    </>
  )
}