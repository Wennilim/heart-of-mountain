const pricingTiers = [
  { players: "3 players", price: "$75", detail: "per person" },
  { players: "4 players", price: "$70", detail: "per person" },
  { players: "5 players", price: "$65", detail: "per person" },
];

const sessionNotes = [
  "Arrive 15 minutes early to protect your full gameplay time.",
  "Minimum of 3 players per session.",
  "All bookings are private sessions.",
];

const advisories = [
  {
    label: "Age",
    text: "16+ recommended. Players under 16 need a paying adult; players under 12 are not recommended.",
  },
  {
    label: "Accessibility",
    text: "Not recommended for epilepsy, severe claustrophobia, mobility disabilities, or sensitivity to loud sounds, low light, or smoke.",
  },
];

export const Book = () => {
  return (
    <section
      id="book-now"
      aria-label="Book Heart of the Mountain"
      className="relative h-full min-h-dvh overflow-y-auto bg-black px-5 pt-20 pb-16 text-white sm:px-10 sm:py-24 lg:h-screen lg:overflow-hidden lg:px-20 lg:pt-28 lg:pb-24"
    >
      <img
        src="/images/imgi_16_683ccb991185f977652b480b_6809647fb3e3894e6420e98e_heart-of-the-mountain-crystal.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-35 sm:opacity-45"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.9),rgba(0,0,0,0.72)_42%,rgba(0,0,0,0.48))] lg:bg-[linear-gradient(90deg,rgba(0,0,0,0.88),rgba(0,0,0,0.68)_44%,rgba(0,0,0,0.32))]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(0deg,rgba(0,0,0,0.9),transparent)]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-8 lg:min-h-[calc(100vh-13rem)] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10">
        <div className="max-w-2xl">
          <p className="font-fjalla text-xs uppercase tracking-[0.24em] text-[#eeb71c] sm:text-sm sm:tracking-[0.34em]">
            Booking briefing
          </p>
          <h2 className="mt-4 font-fjalla text-4xl uppercase leading-[0.98] text-white sm:mt-5 sm:text-6xl lg:text-7xl">
            Reserve your private descent
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-white/82 sm:mt-6 sm:text-lg sm:leading-7">
            Due to high demand, many expeditions sell out. The live calendar
            shows real-time availability, so gather your team before the next
            path into the mountain closes.
          </p>

          <div className="mt-7 grid gap-3 sm:mt-9 sm:flex sm:flex-wrap">
            <button
              type="button"
              className="w-full cursor-pointer rounded-lg bg-[#eeb71c] px-6 py-3 text-center font-fjalla text-sm uppercase tracking-[0.18em] text-black transition duration-200 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto sm:px-7 sm:text-base sm:tracking-[0.22em]"
            >
              Book now
            </button>
            <div className="flex items-center border-t border-white/20 pt-3 text-xs uppercase tracking-[0.18em] text-white/70 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0 sm:text-sm sm:tracking-[0.2em]">
              4-5 players recommended
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:gap-4 lg:gap-5">
          <div className="rounded-lg border border-white/18 bg-black/50 p-4 backdrop-blur-sm sm:p-6">
            <div className="flex items-start justify-between gap-4 border-b border-white/15 pb-4 sm:items-end sm:gap-5 sm:pb-5">
              <div>
                <p className="font-fjalla text-xs uppercase tracking-[0.22em] text-[#eeb71c] sm:text-sm sm:tracking-[0.28em]">
                  Private session
                </p>
                <h3 className="mt-2 font-fjalla text-2xl uppercase leading-none text-white sm:text-3xl">
                  Pricing
                </h3>
              </div>
              <p className="text-right text-xs text-white/62 sm:text-sm">
                Per player
              </p>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-5 sm:gap-3">
              {pricingTiers.map((tier) => (
                <div
                  key={tier.players}
                  className="rounded-lg border border-white/12 bg-white/[0.06] p-3 sm:p-4"
                >
                  <p className="text-[11px] uppercase tracking-[0.12em] text-white/62 sm:text-sm sm:tracking-[0.18em]">
                    {tier.players}
                  </p>
                  <p className="mt-2 font-fjalla text-3xl text-white sm:mt-3 sm:text-4xl">
                    {tier.price}
                  </p>
                  <p className="mt-1 text-xs text-white/60 sm:text-sm">
                    {tier.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:gap-4 md:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-lg border border-[#eeb71c]/45 bg-[#eeb71c]/10 p-4 sm:p-5">
              <p className="font-fjalla text-xs uppercase tracking-[0.22em] text-[#eeb71c] sm:text-sm sm:tracking-[0.28em]">
                Must know
              </p>
              <ul className="mt-4 space-y-2.5 text-sm leading-6 text-white/82 sm:space-y-3">
                {sessionNotes.map((note) => (
                  <li key={note} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#eeb71c]" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-white/14 bg-black/45 p-4 sm:p-5">
              <p className="font-fjalla text-xs uppercase tracking-[0.22em] text-white/70 sm:text-sm sm:tracking-[0.28em]">
                Player guidance
              </p>
              <div className="mt-4 space-y-3 sm:space-y-4">
                {advisories.map((item) => (
                  <div key={item.label}>
                    <p className="font-fjalla text-lg uppercase text-white">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-white/68">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
