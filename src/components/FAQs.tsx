import { useMemo, useState } from "react";

type FaqCategory =
  | "Experience"
  | "Safety"
  | "Booking"
  | "Gameplay"
  | "Arrival"
  | "Prep";

type FaqItem = {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
  bullets?: string[];
};

const categories: Array<FaqCategory | "All"> = [
  "All",
  "Experience",
  "Safety",
  "Booking",
  "Gameplay",
  "Arrival",
  "Prep",
];

const faqs: FaqItem[] = [
  {
    id: "what-is-hotm",
    category: "Experience",
    question: "What is Heart of the Mountain?",
    answer:
      "A cinematic, story-driven adventure where your team steps into a detailed movie-set world with dynamic lighting, effects, soundtrack, puzzles, and physical challenges. It is immersive and collaborative, without the pressure of a countdown clock.",
  },
  {
    id: "duration",
    category: "Experience",
    question: "How long does the experience last?",
    answer:
      "The adventure runs for about 70 minutes, with most teams finishing between 60 and 80 minutes. Allow another 15 to 20 minutes for check-in, briefing, and debrief.",
  },
  {
    id: "team-size",
    category: "Experience",
    question: "How many people can participate?",
    answer:
      "Heart of the Mountain is built for teams of 3 to 8 players. For larger private bookings, contact the team before booking.",
  },
  {
    id: "locked-in",
    category: "Experience",
    question: "Will we be locked inside?",
    answer:
      "No. You are never physically locked in. You can leave if needed, though stepping out may interrupt the flow of your adventure.",
  },
  {
    id: "experience-needed",
    category: "Experience",
    question: "Do I need special skills or prior experience?",
    answer:
      "No prior puzzle or escape-room experience is needed. Curiosity, teamwork, and a willingness to explore are enough.",
  },
  {
    id: "scary",
    category: "Experience",
    question: "Is it scary?",
    answer:
      "It is thrilling and atmospheric rather than horror-based. Expect low light, tight spaces, dynamic sound, and simulated effects designed to heighten the expedition.",
  },
  {
    id: "age",
    category: "Safety",
    question: "Is there an age requirement?",
    answer:
      "The experience is designed for players aged 16 and older. Anyone under 16 must be accompanied by a paying adult, and children under 12 are not recommended.",
  },
  {
    id: "accessibility",
    category: "Safety",
    question: "Is the experience accessible to all players?",
    answer:
      "Heart of the Mountain includes sensory, movement, and set-based elements that may not suit every player. If you have concerns, contact the team before booking to discuss accommodations.",
    bullets: [
      "Low-light environments",
      "Tight or enclosed spaces",
      "Loud sound effects and immersive special effects",
      "Mild climbing, crouching, uneven terrain, stairs, and slides",
      "Dexterity puzzles, movement, and lifting large objects",
      "Smoke effects",
    ],
  },
  {
    id: "leave-midway",
    category: "Safety",
    question: "What if I need to leave mid-experience?",
    answer:
      "You can exit if required. Because the adventure is story-driven, leaving midway may affect how your team completes the experience.",
  },
  {
    id: "cost",
    category: "Booking",
    question: "How much does it cost?",
    answer:
      "Pricing varies by group size. Check the live booking page for the latest rates and available sessions.",
  },
  {
    id: "book-ahead",
    category: "Booking",
    question: "Do I need to book in advance?",
    answer:
      "Yes. Sessions are limited and can sell out, so booking ahead is strongly recommended. Walk-ins are not guaranteed.",
  },
  {
    id: "reschedule",
    category: "Booking",
    question: "Can I reschedule or cancel my booking?",
    answer:
      "Rescheduling is available with at least 48 hours notice, subject to availability. Cancellations may be eligible for future booking credit, but are non-refundable.",
  },
  {
    id: "events",
    category: "Booking",
    question: "Do you offer private bookings for special events?",
    answer:
      "Yes. Corporate events, birthdays, and team-building sessions can be arranged as private bookings.",
  },
  {
    id: "increase-group",
    category: "Booking",
    question: "Can I increase my group size on the day?",
    answer:
      "Usually, yes. Extra explorers can be added on the day as long as the group does not exceed 8 participants, unless otherwise approved in writing.",
  },
  {
    id: "ask-help",
    category: "Gameplay",
    question: "Can we ask for help?",
    answer:
      "Yes. The Park Ranger can help when needed, and the mountain itself may offer guidance if you pay attention to your surroundings.",
  },
  {
    id: "dont-solve",
    category: "Gameplay",
    question: "What happens if we do not solve everything?",
    answer:
      "The journey still reaches a satisfying conclusion. Teams that uncover every secret may discover a deeper layer of the story.",
  },
  {
    id: "photos",
    category: "Gameplay",
    question: "Can we take photos or videos inside?",
    answer:
      "No. Photography and video recording are not allowed inside the adventure space so the mystery is preserved for future explorers.",
  },
  {
    id: "strangers",
    category: "Gameplay",
    question: "Will we be playing with strangers?",
    answer:
      "No. All bookings are private, so your group experiences the mountain together without strangers being added.",
  },
  {
    id: "location",
    category: "Arrival",
    question: "Where are you located, and is there parking?",
    answer:
      "Heart of the Mountain is inside Marrickville Traders at 14 Rich St, Marrickville, Sydney. There is street parking and a shared carpark nearby, but it can get busy.",
  },
  {
    id: "arrival-time",
    category: "Arrival",
    question: "What time should we arrive?",
    answer:
      "Arrive 15 minutes before your scheduled start time for check-in and briefing. Late arrivals may lose adventure time or need to be rescheduled.",
  },
  {
    id: "food-drinks",
    category: "Arrival",
    question: "Do you offer food or drinks?",
    answer:
      "Food and drinks are not served on site. The team recommends celebrating afterward at a nearby restaurant or cafe.",
  },
  {
    id: "wear",
    category: "Prep",
    question: "What should we bring or wear?",
    answer:
      "Wear enclosed shoes for safety and comfort, especially because the adventure includes uneven terrain and tight spaces. Bags and accessories can be stored in lockers.",
  },
];

export const FAQs = () => {
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>("All");
  const [openId, setOpenId] = useState(faqs[0].id);

  const visibleFaqs = useMemo(() => {
    if (activeCategory === "All") return faqs;
    return faqs.filter((faq) => faq.category === activeCategory);
  }, [activeCategory]);

  const featuredFaqs = faqs.filter((faq) =>
    ["duration", "team-size", "arrival-time"].includes(faq.id),
  );

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="relative scroll-mt-20 overflow-hidden bg-[#050504] px-4 py-20 text-white sm:px-10 sm:py-32 lg:px-20 lg:py-44"
    >
      <img
        src="/images/imgi_60_683ccea8c51867570937ebc2_6758a8b0a37d25574e14c0ae_big-tunnel-2.jpg"
        alt="tunnel"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-25"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(238,183,28,0.2),transparent_26%),linear-gradient(180deg,rgba(0,0,0,0.9),rgba(0,0,0,0.72)_45%,rgba(0,0,0,0.94))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-[#050504] to-transparent sm:h-40" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 sm:gap-12 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <p className="font-fjalla text-xs uppercase tracking-[0.24em] text-[#eeb71c] sm:text-sm sm:tracking-[0.34em]">
            Expedition notes
          </p>
          <h2 className="mt-4 max-w-[11ch] font-fjalla text-[2.45rem] uppercase leading-[0.98] text-white sm:mt-5 sm:max-w-none sm:text-6xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-6 text-white/72 sm:mt-6 sm:text-lg sm:leading-7">
            Everything your team should know before stepping into the mountain,
            from arrival timing and group size to safety, booking, and gameplay.
          </p>

          <div className="-mx-4 mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:mt-8 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-1 [&::-webkit-scrollbar]:hidden">
            {featuredFaqs.map((faq) => (
              <button
                key={faq.id}
                type="button"
                className="w-[min(78vw,18rem)] shrink-0 snap-start rounded-lg border border-white/12 bg-white/[0.06] p-4 text-left transition duration-200 hover:border-[#eeb71c]/70 hover:bg-[#eeb71c]/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto sm:min-w-0"
                onClick={() => {
                  setActiveCategory(faq.category);
                  setOpenId(faq.id);
                }}
              >
                <span className="font-fjalla text-xs uppercase tracking-[0.18em] text-[#eeb71c] sm:text-sm sm:tracking-[0.22em]">
                  {faq.category}
                </span>
                <span className="mt-2 block text-sm leading-6 text-white/78">
                  {faq.question}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-7 grid grid-cols-2 gap-2.5 sm:mt-8 sm:flex sm:flex-wrap sm:gap-3">
            <a
              href="#book-now"
              className="rounded-lg bg-[#eeb71c] px-3 py-3 text-center font-fjalla text-xs uppercase tracking-[0.16em] text-black transition duration-200 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:px-6 sm:text-sm sm:tracking-[0.22em]"
            >
              Book now
            </a>
            <a
              href="mailto:adventure@heartofthemountain.com.au"
              className="rounded-lg border border-white/28 px-3 py-3 text-center font-fjalla text-xs uppercase tracking-[0.16em] text-white transition duration-200 hover:border-white hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:px-6 sm:text-sm sm:tracking-[0.22em]"
            >
              Contact
            </a>
          </div>
        </div>

        <div className="min-w-0">
          <div
            aria-label="FAQ categories"
            className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  className={`shrink-0 snap-start cursor-pointer rounded-lg border px-3 py-2 font-fjalla text-xs uppercase tracking-[0.14em] transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:px-4 sm:text-sm sm:tracking-[0.18em] ${
                    isActive
                      ? "border-[#eeb71c] bg-[#eeb71c] text-black"
                      : "border-white/16 bg-black/35 text-white/72 hover:border-white/50 hover:text-white"
                  }`}
                  onClick={() => {
                    setActiveCategory(category);
                    const nextFaq =
                      category === "All"
                        ? faqs[0]
                        : faqs.find((faq) => faq.category === category);
                    if (nextFaq) setOpenId(nextFaq.id);
                  }}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="mt-4 space-y-3 lg:mt-5 lg:max-h-[42rem] lg:overflow-y-auto lg:pr-2">
            {visibleFaqs.map((faq, index) => {
              const isOpen = openId === faq.id;

              return (
                <article
                  key={faq.id}
                  className="overflow-hidden rounded-lg border border-white/12 bg-black/52 backdrop-blur-sm transition duration-200 hover:border-white/24"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${faq.id}-answer`}
                    className="flex w-full cursor-pointer items-start gap-3 px-3.5 py-4 text-left sm:gap-5 sm:px-6 sm:py-5"
                    onClick={() => setOpenId(isOpen ? "" : faq.id)}
                  >
                    <span className="pt-1 font-fjalla text-xs text-[#eeb71c] sm:text-sm">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1 break-words font-fjalla text-lg uppercase leading-6 text-white sm:text-2xl sm:leading-7">
                      {faq.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/18 text-xl leading-none text-white transition duration-200 sm:h-9 sm:w-9 sm:text-2xl ${
                        isOpen ? "rotate-45 bg-white text-black" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>

                  <div
                    id={`${faq.id}-answer`}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-white/10 px-3.5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
                        <p className="max-w-3xl text-[15px] leading-6 text-white/74 sm:text-base sm:leading-7">
                          {faq.answer}
                        </p>
                        {faq.bullets && (
                          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                            {faq.bullets.map((bullet) => (
                              <li
                                key={bullet}
                                className="flex gap-3 text-sm leading-6 text-white/68"
                              >
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#eeb71c]" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
