const backgrounds = {
  honeydew: 'bg-honeydew',
  tea: 'bg-tea',
  forest: 'bg-forest text-honeydew',
}

export default function Section({
  children,
  bg = 'honeydew',
  className = '',
  index,
  label,
}) {
  return (
    <section
      className={`relative border-t border-forest/15 px-6 py-16 md:px-12 md:py-28 ${backgrounds[bg]} ${className}`}
    >
      {(index || label) && (
        <div className="mx-auto mb-12 flex max-w-5xl items-center justify-between font-mono text-xs uppercase tracking-[0.25em] opacity-60">
          {index && <span>{index}</span>}
          {label && <span>{label}</span>}
        </div>
      )}
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  )
}