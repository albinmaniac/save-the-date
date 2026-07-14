const backgrounds = {
  honeydew: 'bg-honeydew',
  tea: 'bg-tea',
  forest: 'bg-forest text-honeydew',
}

// Every page section should use this wrapper so spacing and
// background choices stay consistent site-wide.
export default function Section({ children, bg = 'honeydew', className = '' }) {
  return (
    <section className={`${backgrounds[bg]} px-6 py-16 md:px-12 md:py-28 ${className}`}>
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  )
}
