import { motion, type Variants } from "motion/react";

const contactCards = [
  {
    label: "Email us",
    title: "adventure@heartofthemountain.com.au",
    text: "For booking questions, private events, access needs, or anything your expedition party needs before arrival.",
    href: "mailto:adventure@heartofthemountain.com.au?subject=Heart%20of%20the%20Mountain%3A%20",
    action: "Send email",
  },
  {
    label: "Find the entrance",
    title: "Marrickville Traders",
    text: "14 Rich St, Marrickville, Sydney. Street parking and a shared carpark are nearby, but the area can get busy.",
    href: "https://maps.app.goo.gl/vpT6uQj1WvVJY7w47",
    action: "Open map",
  },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/Heartofthemountainsydney",
  },
  { label: "TikTok", href: "https://www.tiktok.com/@Heartofthemountain" },
  { label: "Facebook", href: "https://www.facebook.com/heartofthemountain" },
];

const subscribeAction =
  "https://heartofthemountain.us5.list-manage.com/subscribe/post?u=c5947eb9cb48268975dc5ae4e&id=bdbea82766&f_id=00dbebe7f0";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: smoothEase },
  },
};

export const Contact = () => {
  return (
    <motion.section
      id="contact"
      aria-label="Contact Heart of the Mountain"
      className="relative scroll-mt-20 overflow-hidden bg-[#050504] px-4 py-20 text-white sm:px-10 sm:py-28 lg:px-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={containerVariants}
    >
      <motion.img
        src="/images/imgi_9_683ccb9af5908465c833e9c2_6809647f9c766e26d3f025d1_heart-of-the-mountain-tent.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-24 sm:opacity-28"
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.6, ease: smoothEase }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,4,0.95),rgba(5,5,4,0.7)_42%,rgba(5,5,4,0.97)),radial-gradient(circle_at_24%_28%,rgba(238,183,28,0.22),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#050504] to-transparent sm:h-40" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050504] to-transparent sm:h-40" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-9 sm:gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <motion.div variants={itemVariants} className="min-w-0 max-w-3xl">
          <p className="font-fjalla text-xs uppercase tracking-[0.24em] text-[#eeb71c] sm:text-sm sm:tracking-[0.34em]">
            Get in touch
          </p>
          <h2 className="mt-4 max-w-[11ch] font-fjalla text-[2.45rem] uppercase leading-[0.98] text-white sm:mt-5 sm:max-w-none sm:text-6xl lg:text-7xl">
            Join the expedition. Your mystery is waiting.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-white/76 sm:mt-6 sm:text-lg sm:leading-7">
            For all enquiries, reach out before your descent. The team can help
            with bookings, arrival details, access questions, and private
            sessions.
          </p>

          <div className="mt-7 grid grid-cols-2 gap-2.5 sm:mt-9 sm:flex sm:flex-wrap sm:gap-3">
            <motion.a
              href="#book-now"
              className="rounded-lg bg-[#eeb71c] px-3 py-3 text-center font-fjalla text-xs uppercase tracking-[0.16em] text-black transition duration-200 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:px-7 sm:text-base sm:tracking-[0.22em]"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              Let's go
            </motion.a>
            <motion.a
              href="mailto:adventure@heartofthemountain.com.au?subject=Heart%20of%20the%20Mountain%3A%20"
              className="rounded-lg border border-white/28 px-3 py-3 text-center font-fjalla text-xs uppercase tracking-[0.16em] text-white transition duration-200 hover:border-white hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:px-7 sm:text-base sm:tracking-[0.22em]"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              Email us
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid min-w-0 gap-3 sm:gap-4"
        >
          {contactCards.map((card) => (
            <motion.a
              key={card.label}
              href={card.href}
              target={card.href.startsWith("http") ? "_blank" : undefined}
              rel={card.href.startsWith("http") ? "noreferrer" : undefined}
              className="group block w-full min-w-0 max-w-full rounded-lg border border-white/14 bg-black/55 p-4 backdrop-blur-sm transition duration-200 hover:border-[#eeb71c]/70 hover:bg-black/72 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:p-6"
              variants={itemVariants}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-start justify-between gap-3 sm:gap-6">
                <div className="min-w-0">
                  <p className="font-fjalla text-xs uppercase tracking-[0.22em] text-[#eeb71c] sm:text-sm sm:tracking-[0.28em]">
                    {card.label}
                  </p>
                  <h3 className="mt-2 max-w-full break-words font-fjalla text-[1.35rem] uppercase leading-tight text-white [overflow-wrap:anywhere] sm:mt-3 sm:text-3xl">
                    {card.title}
                  </h3>
                </div>
                <span
                  aria-hidden="true"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/18 text-lg text-white transition duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:bg-[#eeb71c] group-hover:text-black sm:h-11 sm:w-11 sm:text-xl"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                  >
                    <path d="M7 17 17 7" />
                    <path d="M8 7h9v9" />
                  </svg>
                </span>
              </div>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/68 sm:mt-5 sm:text-base">
                {card.text}
              </p>
              <p className="mt-5 font-fjalla text-xs uppercase tracking-[0.18em] text-white/72 transition duration-200 group-hover:text-[#eeb71c] sm:mt-6 sm:text-sm sm:tracking-[0.22em]">
                {card.action}
              </p>
            </motion.a>
          ))}

          <motion.div
            variants={itemVariants}
            className="rounded-lg border border-[#eeb71c]/35 bg-[#eeb71c]/10 p-4 backdrop-blur-sm sm:p-6"
          >
            <div className="grid gap-5 sm:gap-6">
              <div>
                <p className="font-fjalla text-xs uppercase tracking-[0.22em] text-[#eeb71c] sm:text-sm sm:tracking-[0.28em]">
                  Subscribe
                </p>
                <h3 className="mt-2 font-fjalla text-2xl uppercase leading-none text-white sm:text-xl lg:text-2xl">
                  Updates and offers from the mountain
                </h3>
              </div>
              <form
                action={subscribeAction}
                method="post"
                target="_blank"
                className="flex w-full flex-col gap-3 sm:flex-row sm:max-w-[32rem]"
              >
                <label className="sr-only" htmlFor="contact-email">
                  Email address
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="min-w-0 flex-1 rounded-lg border border-white/16 bg-black/45 px-4 py-3 text-sm text-white outline-none transition duration-200 placeholder:text-white/38 focus:border-[#eeb71c] sm:text-base"
                />
                <motion.button
                  type="submit"
                  className="cursor-pointer rounded-lg bg-white px-5 py-3 font-fjalla text-xs uppercase tracking-[0.16em] text-black transition duration-200 hover:bg-[#eeb71c] sm:text-sm sm:tracking-[0.18em]"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Subscribe
                </motion.button>
              </form>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-between gap-4 border-t border-white/12 pt-5"
          >
            {/* Row 1: disclaimer — full width */}
            <p className="w-full text-xs leading-6 text-white/40">
              This is a non-commercial clone built for educational purposes
              only. All rights belong to the original creators. No copyright
              infringement intended.
            </p>

            {/* Row 2: credit left · social links right */}
            <div className="grid w-full gap-4 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
              <p className="text-xs text-white/48">
                Built by{" "}
                <a
                  className="text-white/70 underline-offset-4 transition duration-200 hover:text-[#eeb71c] hover:underline"
                  href="https://www.linkedin.com/in/lim-w-857166229/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Wen Ni Lim
                </a>
              </p>

              <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded border border-white/12 px-2 py-1.5 text-center font-fjalla text-[10px] uppercase tracking-[0.12em] text-white/55 transition duration-200 hover:border-white/40 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:px-3 sm:tracking-[0.2em]"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
