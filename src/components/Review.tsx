import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const AUTO_ROTATE_MS = 7000;
const INITIAL_REVIEW_INDEX = 2;

const reviews = [
  {
    quote:
      "Incredible! Super immersive and like no other experience we've tried before. The storytelling, ambient sounds and set were so perfectly done it was hard to remember you weren't in the mountain. 10/10 would do it all over again!",
    author: "BrittaneeLee",
    date: "July 9, 2025",
  },
  {
    quote:
      "Such an amazing experience. Incredible set-up, top-tier set and props. Truly automated and extremely immersive. Amazing.",
    author: "Escapea",
    date: "July 8, 2025",
  },
  {
    quote:
      "LOVED this experience! Heart of the Mountain doesn’t feel like an escape room—it feels like stepping into a fantasy movie. No time limit means you’re not escaping, you’re adventuring. The set is jaw-dropping, the puzzles are physical and satisfying, and the story pulls you deep into the mountain. Total immersion. Zero reality. 10/10 would get trapped again.",
    author: "EmilyEscapes111",
    date: "July 4, 2025",
  },
  {
    quote:
      "SPECTACULAR. This room was HIGHLY immersive and atmospheric. The puzzles were detailed yet fun and you cannot emphasise how believable the set and experience is. 10/10. The host was passionate and lovely and very welcoming. Could not recommend more.",
    author: "JessLogan",
    date: "July 2, 2025",
  },
];

export const Review = () => {
  const [activeIndex, setActiveIndex] = useState(INITIAL_REVIEW_INDEX);
  const [isPaused, setIsPaused] = useState(false);

  const activeReview = reviews[activeIndex];

  const showPreviousReview = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? reviews.length - 1 : currentIndex - 1,
    );
  };

  const showNextReview = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % reviews.length);
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % reviews.length);
    }, AUTO_ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <section
      id="adventurer-review"
      aria-label="Adventurer Reviews"
      className="relative flex min-h-screen items-center justify-center overflow-hidden  px-6 py-24 text-white sm:px-10 lg:px-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <button
        type="button"
        aria-label="Previous review"
        className="absolute cursor-pointer left-4 top-1/2 z-20 hidden h-16 w-16 -translate-y-1/2 items-center justify-center text-white/85 transition duration-200 hover:scale-110 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:flex lg:left-16"
        onClick={showPreviousReview}
      >
        <ChevronLeftIcon />
      </button>

      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center text-center">
        <p className="text-base font-medium text-[#eeb71c] sm:text-lg">
          Adventurer Reviews
        </p>

        <h2 className="mt-10 max-w-5xl text-2xl font-black italic leading-tight text-white sm:text-5xl lg:text-4xl">
          Only a few have uncovered the truth...
        </h2>

        <div className="relative mt-20 min-h-52 w-full max-w-4xl sm:min-h-44 lg:mt-24">
          <AnimatePresence mode="wait">
            <motion.figure
              key={activeIndex}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="absolute inset-x-0 top-0 mx-auto"
            >
              <blockquote className="text-balance text-lg italic leading-8 text-white/95 sm:leading-10">
                "{activeReview.quote}"
              </blockquote>
              <figcaption className="mt-8 text-lg italic text-white/90">
                &mdash; {activeReview.author} ({activeReview.date})
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-24 flex items-center justify-center gap-5 md:mt-20">
 

          <div className="flex items-center justify-center gap-6">
            {reviews.map((review, index) => (
              <button
                key={review.author}
                type="button"
                aria-label={`Show review from ${review.author}`}
                aria-current={activeIndex === index}
                className={`sm:h-4 sm:w-4 h-3 w-3 cursor-pointer rounded-full transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                  activeIndex === index
                    ? "scale-110 bg-white"
                    : "bg-white/45 hover:bg-white/70"
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>

        </div>
      </div>

      <button
        type="button"
        aria-label="Next review"
        className="absolute right-4 cursor-pointer top-1/2 z-20 hidden h-16 w-16 -translate-y-1/2 items-center justify-center text-white/85 transition duration-200 hover:scale-110 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:flex lg:right-16"
        onClick={showNextReview}
      >
        <ChevronRightIcon />
      </button>
    </section>
  );
};

const ChevronLeftIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-full w-full">
    <path
      d="M15 4 7 12l8 8"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-full w-full">
    <path
      d="m9 4 8 8-8 8"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
    />
  </svg>
);
