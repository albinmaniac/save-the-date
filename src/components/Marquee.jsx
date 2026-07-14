export default function Marquee({ images, direction = 'left', speed = 40 }) {
  const doubled = [...images, ...images]

  return (
    <div className="overflow-hidden">
      <div
        className="flex gap-6 w-max"
        style={{
          animation: `scroll-${direction} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((img, i) => (
          <div
            key={i}
            className="h-64 w-80 shrink-0 overflow-hidden rounded-3xl border border-celadon/40 md:h-80 md:w-96"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="h-full w-full object-cover"
            />
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