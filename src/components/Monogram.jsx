// LIFE = LI (Litty) + FE (Felix). The two pairs are visually split by a
// thin diagonal rule so the origin of the word is legible at a glance,
// with the full names revealed as a small caption on hover.
export default function Monogram({ dark = false, onClick }) {
  const fg = dark ? 'text-honeydew' : 'text-forest'
  const border = dark ? 'border-honeydew' : 'border-forest'
  const rule = dark ? 'bg-honeydew/40' : 'bg-forest/40'

  return (
    <button
      onClick={onClick}
      className={`group relative flex h-11 w-11 items-center justify-center border transition-colors duration-300 ${border}`}
    >
      <span className={`font-mono text-[13px] font-medium leading-none tracking-tight ${fg}`}>
        LI
      </span>
      <span className={`mx-[1px] h-6 w-px rotate-[20deg] ${rule}`} />
      <span className={`font-mono text-[13px] font-medium leading-none tracking-tight ${fg}`}>
        FE
      </span>

      <span
        className={`pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.15em] opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${fg}`}
      >
        Litty &amp; Felix
      </span>
    </button>
  )
}