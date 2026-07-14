const schedule = [
  {
    time: '10:00',
    title: 'Ceremony',
    text: 'The ceremony begins at 10am sharp by the lakeside. Please arrive by 9:45 so we can start on time. Seating is open — sit anywhere you like.',
  },
  {
    time: '11:00',
    title: 'Cocktails',
    text: 'Join us on the garden lawn for drinks and canapés while we sneak off for photos. Lawn games are set up if you fancy a break.',
  },
  {
    time: '13:00',
    title: 'Lunch',
    text: 'A four-course Kerala feast prepared by the resort kitchen, featuring local, seasonal ingredients.',
  },
  {
    time: '16:00',
    title: 'Cake & dessert',
    text: 'Time to cut the cake — followed by coffee, tea, and a fairly indulgent amount of dessert.',
  },
  {
    time: '18:00',
    title: 'Dancing',
    text: "The dance floor opens with our first dance. After that, it's all yours. Music runs until midnight — requests welcome.",
  },
  {
    time: '00:00',
    title: 'The end',
    text: 'The night wraps up at midnight. Cabs can be pre-booked, or there will be a few on standby.',
  },
]

export default function Timeline() {
  return (
    <div className="mt-20">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-forest/70">
          Schedule
        </p>
        <p className="mt-2 font-serif text-4xl text-forest md:text-5xl">
          Our day
        </p>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink/70">
          Here's how the day will unfold. Timings might shift slightly, but
          we'll keep you posted.
        </p>
      </div>

      <div className="relative mt-16">
        {/* center line — desktop only */}
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-celadon/60 md:block" />
        {/* left line — mobile only */}
        <div className="absolute left-0 top-0 h-full w-px bg-celadon/60 md:hidden" />

        <div className="space-y-12 md:space-y-0">
          {schedule.map((item, i) => {
            const isLeft = i % 2 === 0
            return (
              <div key={item.time} className="relative md:grid md:grid-cols-2 md:gap-12">
                {/* dot marker */}
                <span className="absolute left-0 top-1.5 h-2 w-2 -translate-x-[3px] rounded-full bg-forest md:left-1/2 md:-translate-x-1/2" />

                {isLeft ? (
                  <>
                    <div className="pb-12 pl-8 text-left md:pb-0 md:pl-0 md:pr-4 md:text-right">
                      <p className="text-xs tracking-widest text-forest/60">{item.time}</p>
                      <p className="mt-1 font-serif text-2xl text-forest">{item.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-ink/75">{item.text}</p>
                    </div>
                    <div className="hidden md:block" />
                  </>
                ) : (
                  <>
                    <div className="hidden md:block" />
                    <div className="pb-12 pl-8 text-left md:pb-0 md:pl-4">
                      <p className="text-xs tracking-widest text-forest/60">{item.time}</p>
                      <p className="mt-1 font-serif text-2xl text-forest">{item.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-ink/75">{item.text}</p>
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}