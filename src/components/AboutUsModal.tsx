import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

export const AboutUsModal = ({
  setIsModalOpen,
}: {
  setIsModalOpen: (isOpen: boolean) => void;
}) => {
  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex"
    >
      {/* ── Left: full-height image panel ── */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:block lg:w-2/5 xl:w-1/3 relative flex-shrink-0"
      >
        <img
          src="/images/imgi_6_683ccb9761cd08b273fef1ac_68096e583872f04299c3cbe3_heart-of-the-mountain-hazel-ivy.jpg"
          alt="Hazel Ivy"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Right-edge fade into content panel */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0e0b07]" />
      </motion.div>

      {/* ── Right: scrollable content panel ── */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 bg-[#0e0b07] overflow-y-auto text-white relative"
      >
        {/* Close button */}
        <button
          onClick={() => setIsModalOpen(false)}
          aria-label="Close modal"
          className="sticky top-4 float-right mr-6 z-20 text-white/50 hover:text-white transition-colors text-2xl leading-none cursor-pointer"
        >
          ✕
        </button>

        {/* Mobile-only image banner */}
        <div className="lg:hidden relative h-56 overflow-hidden">
          <img
            src="/images/imgi_6_683ccb9761cd08b273fef1ac_68096e583872f04299c3cbe3_heart-of-the-mountain-hazel-ivy.jpg"
            alt="Hazel Ivy"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0e0b07]" />
        </div>

        <div className="px-8 lg:px-12 pt-16 lg:pt-20 pb-16 space-y-10 clear-both">

          {/* Section 1 */}
          <section>
            <h2 className="font-fjalla uppercase text-2xl text-amber-400 mb-3">
              This is going to sound crazy.
            </h2>
            <p className="text-white/80 leading-relaxed">
              My name's Hazel Ivy, and I've spent my life chasing the truth
              about what happened to my Grandmother. You might have even heard
              of her — Alice Ivy. She was a brilliant conservationist,
              researcher, inventor, explorer… She was going to change the world
              — then she disappeared.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="font-fjalla uppercase text-2xl text-amber-400 mb-3">
              The Heart of the Mountain
            </h2>
            <p className="text-white/80 leading-relaxed">
              For so many, it was just a myth — for my Grandmother — it was so
              much more… The locals tell a story of something deep, buried
              within the mountain. An untapped, everlasting energy source, an
              invisible bond between humans and nature. Alice's Journal
              mentioned the mountain called to her — that's how she knew where
              to look. Crazy right?
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="font-fjalla uppercase text-2xl text-amber-400 mb-3">
              The Expedition
            </h2>
            <p className="text-white/80 leading-relaxed mb-4">
              In 1957, Alice led a team of archaeologists and geologists on an
              expedition deep into the mountain. After weeks of painstaking
              excavation — they send word that they've found something. That's
              the last thing anyone ever hears. Alice and her entire team vanish
              without a trace. No bodies. No evidence. Nothing. Just an
              abandoned campsite and a dig-site that's "disappeared".
            </p>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-2">
              Read the newspaper archives:
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="https://cdn.prod.website-files.com/6757edddb4d6566e0a6bab83/6825293031921f1715933d96_heart-of-the-mountain-The-Continental-Times-March-11th-1957.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 underline text-sm transition-colors"
              >
                The Continental Times: March 11th, 1957 ↗
              </a>
              <a
                href="https://cdn.prod.website-files.com/6757edddb4d6566e0a6bab83/682529309f417990db9c59b4_heart-of-the-mountain-The-Continental-Times-June-13th-1957.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 underline text-sm transition-colors"
              >
                The Continental Times: June 13th, 1957 ↗
              </a>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="font-fjalla uppercase text-2xl text-amber-400 mb-3">
              The Mountain Has Never Been the Same
            </h2>
            <p className="text-white/80 leading-relaxed mb-4">
              I know, it sounds wild! But get this — since Alice disappeared the
              mountain has changed — it's like she woke it up. Strange events
              have been reported ever since from locals; seismic tremors,
              unnatural anomalies, even "voices in the wind".
            </p>
            <a
              href="https://cdn.prod.website-files.com/6757edddb4d6566e0a6bab83/682529e4780ede9a98e043c0_heart-of-the-mountain-The-Institute-of-Science-and-Excavation-Official-Report.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 underline text-sm transition-colors"
            >
              Read The Institute of Science and Excavation: Official Report ↗
            </a>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="font-fjalla uppercase text-2xl text-amber-400 mb-3">
              I'm So Close…
            </h2>
            <p className="text-white/80 leading-relaxed mb-4">
              These days the scientific community dismisses Alice Ivy as a
              dreamer. But I know she found something. Her journals, her maps,
              her research — they all point to a discovery beyond explanation.
              I've retraced her steps. I've searched every inch of this
              mountain. Nothing makes sense — there's not even an entrance.
              That can't be possible. They were digging for weeks! It's almost
              like the mountain is hiding something… waiting for the right
              people to find it.
            </p>
            <a
              href="https://cdn.prod.website-files.com/6757edddb4d6566e0a6bab83/68252b4322d4589efc436a8c_heart-of-the-mountain-Hazel-Ivy-Corkboard-of-Clues-and-Awesomeness.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 underline text-sm transition-colors"
            >
              Check out Hazel Ivy's Corkboard of Clues and Awesomeness ↗
            </a>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="font-fjalla uppercase text-2xl text-amber-400 mb-3">
              The Key to the Mystery — You
            </h2>
            <p className="text-white/80 leading-relaxed">
              I can't do this alone. I need others — people willing to step into
              the unknown, to uncover the truth — to prove Alice's discovery
              wasn't just some legend. Maybe the mountain is waiting for us.
              Maybe our presence, our determination, our drive to do good will
              be enough for the mountain to reveal itself and its secrets.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="font-fjalla uppercase text-2xl text-amber-400 mb-3">
              The Mountain is Calling
            </h2>
            <p className="text-white/80 leading-relaxed">
              Can you hear it? Will you answer? I can promise you once you set
              foot on this mountain you'll never forget it. But a word of
              warning. This isn't just a story. The mountain has its own
              secrets, its own will. And once we uncover what's inside — there's
              no going back. Now who's with me?
            </p>
          </section>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
            <a
              href="https://www.heartofthemountain.com.au/book"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center font-fjalla uppercase tracking-widest bg-amber-500 hover:bg-amber-400 text-black py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Let's Go →
            </a>
            <button
              onClick={() => setIsModalOpen(false)}
              className="flex-1 text-center font-fjalla uppercase tracking-widest border border-white/30 hover:border-white text-white py-3 px-6 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};
