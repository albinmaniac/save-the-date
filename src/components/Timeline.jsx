const schedule = [
  { time: '10:00', title: 'Ceremony', text: 'The ceremony begins at 10am sharp by the lakeside. Please arrive by 9:45 so we can start on time. Seating is open — sit anywhere you like.' },
  { time: '11:00', title: 'Cocktails', text: 'Join us on the garden lawn for drinks and canapés while we sneak off for photos. Lawn games are set up if you fancy a break.' },
  { time: '13:00', title: 'Lunch', text: 'A four-course Kerala feast prepared by the resort kitchen, featuring local, seasonal ingredients.' },
  { time: '16:00', title: 'Cake & dessert', text: 'Time to cut the cake — followed by coffee, tea, and a fairly indulgent amount of dessert.' },
  { time: '18:00', title: 'Dancing', text: "The dance floor opens with our first dance. After that, it's all yours. Music runs until midnight — requests welcome." },
  { time: '00:00', title: 'The end', text: 'The night wraps up at midnight. Cabs can be pre-booked, or there will be a few on standby.' },
]

export default function Timeline() {
  return (
    <div className="mt-16">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-forest/70">
        Schedule
      </p>
      <p className="mt-2 font-serif text-4xl text-forest md:text-5xl">
        Our day
      </p>

      <div className="mt-12 border-t border-forest/20">
        {schedule.map((item, i) => (
          <div
            key={item.time}
            className="grid gap-2 border-b border-forest/20 py-6 md:grid-cols-[80px_120px_1fr] md:items-baseline md:gap-8"
          >
            <span className="font-mono text-xs text-forest/50">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="font-mono text-sm text-forest">{item.time}</span>
            <div>
              <p className="font-serif text-xl text-forest">{item.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink/70">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}