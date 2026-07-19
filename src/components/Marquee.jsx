 export default function Marquee({ images, direction = 'left', speed = 45 }) {
  const doubled = [...images, ...images]

  return (
    <div className="w-full overflow-hidden">
      <div
        className="flex w-max"
        style={{ animation: `scroll-${direction} ${speed}s linear infinite` }}
      >
        {doubled.map((img, i) => (
          <div key={i} className="flex w-40 shrink-0 flex-col md:w-48">
            <div className="flex justify-between px-2 py-1.5">
              {Array.from({ length: 6 }).map((_, h) => (
                <span key={h} className="h-1.5 w-2.5 rounded-[2px] bg-honeydew/85" />
              ))}
            </div>

            <div className="border-x border-honeydew/10 px-1.5">
              <div className="relative h-28 overflow-hidden border border-honeydew/25 md:h-36">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-1.5 left-1.5 font-mono text-[9px] uppercase tracking-[0.15em] text-honeydew/90">
                  Fr.{String((i % images.length) + 1).padStart(2, '0')}
                </span>
              </div>
            </div>

            <div className="flex justify-between px-2 py-1.5">
              {Array.from({ length: 6 }).map((_, h) => (
                <span key={h} className="h-1.5 w-2.5 rounded-[2px] bg-honeydew/85" />
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}