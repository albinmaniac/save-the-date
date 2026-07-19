import { useState, useEffect } from 'react'
import Monogram from './Monogram.jsx'

const links = [
  { id: 'home', label: 'Home', num: '01' },
  { id: 'story', label: 'Welcome', num: '02' },
  { id: 'details', label: 'Details', num: '03' },
  { id: 'gallery', label: 'Gallery', num: '04' },
  { id: 'rsvp', label: 'RSVP', num: '05' },
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
    const observer = new IntersectionObserver(
      ([entry]) => setOverHero(entry.intersectionRatio > 0.15),
      { threshold: [0, 0.15, 1] }
    )
    observer.observe(heroEl)
    return () => observer.disconnect()
  }, [])

  const isDark = overHero

  const handleLinkClick = (id) => {
    setOpen(false)
    scrollToSection(id)
  }

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-20 flex items-center justify-between border-b px-6 py-6 transition-colors duration-300 md:px-12 ${
          isDark
            ? 'border-honeydew/20'
            : 'border-forest/15 bg-honeydew/95 backdrop-blur-sm'
        }`}
      >
        <Monogram dark={isDark} onClick={() => handleLinkClick('home')} />

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
          className={`flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
            isDark ? 'text-honeydew' : 'text-forest'
          }`}
        >
          {open ? 'Close' : 'Menu'}
          <span
            className={`inline-block h-px w-6 transition-colors duration-300 ${
              isDark ? 'bg-honeydew' : 'bg-forest'
            }`}
          />
        </button>
      </div>

      <div
        className={`fixed inset-0 z-30 flex items-center justify-center bg-forest transition-opacity duration-500 ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <ul className="w-full max-w-md px-6">
          {links.map((link, i) => (
            <li key={link.id} className="overflow-hidden border-b border-honeydew/15">
              <button
                onClick={() => handleLinkClick(link.id)}
                style={{ transitionDelay: open ? `${i * 60}ms` : '0ms' }}
                className={`flex w-full items-center justify-between py-5 transition-all duration-500 hover:pl-3 ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
              >
                <span className="font-mono text-xs text-celadon">{link.num}</span>
                <span className="font-serif text-3xl text-honeydew md:text-4xl">
                  {link.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}