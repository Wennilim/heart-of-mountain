import { useRef } from "react";
import { useBackgroundAudio } from "../hooks/useBackgroundAudio";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Story } from "./Story";
import { AnswerCall } from "./AnswerCall";
import { AboutUs } from "./AboutUs";
import { Review } from "./Review";
import { Book } from "./Book";
import { SCROLL_PHASE } from "./heroScrollPhases";

const BACKGROUND_AUDIO_SRC = "/sounds/HOTM-WEBSITE-THEME.mp3";
const AUDIO_ON_ICON =
  "/images/imgi_17_675a38734a324401c8bfd54c_volume-on-icon.png";
const AUDIO_OFF_ICON =
  "/images/imgi_64_675a3873e03723ff1d6a022d_volume-off-icon.png";
const TUNNEL_IMG =
  "/images/imgi_60_683ccea8c51867570937ebc2_6758a8b0a37d25574e14c0ae_big-tunnel-2.jpg";

const GALLERY_IMG = [
  "/images/imgi_7_686d5ed1ae0deac1ae739b13_4.jpg",
  "/images/imgi_8_686d5ed33463be561de4568d_1.jpg",
  "/images/imgi_9_683ccb9af5908465c833e9c2_6809647f9c766e26d3f025d1_heart-of-the-mountain-tent.jpg",
  "/images/imgi_10_686d5ed270a61cfcd7b076a1_5.jpg",
  "/images/imgi_11_683ccb9bca0a0ddd3d47fe5d_6809647fe6232fbffc92eab4_heart-of-the-mountain-water.jpg",
  "/images/imgi_12_686d5ed10553704a8ad40189_3.jpg",
  "/images/imgi_13_683ccb98bb11df97318aab40_6809647f49ba99dddfa49533_heart-of-the-mountain-lever.jpg",
  "/images/imgi_14_686d5ed2756a059a325bde4e_6.jpg",
  "/images/imgi_15_686d5ed3c3c6d44ae1652b21_2.jpg",
  "/images/imgi_16_683ccb991185f977652b480b_6809647fb3e3894e6420e98e_heart-of-the-mountain-crystal.jpg",
];

// ─── Scroll phase map (section = 7600vh) ───────────────────────────────────
// 0.00 – 0.24 : hero text + foreground hold, background/foreground push in
// 0.20 – 0.34 : hero text + foreground drift away
// 0.24 – 0.54 : video clip-path circle blooms, holds, then clears
// 0.50 – 1.00 : tunnel overlay fades in and keeps a slow scroll-driven zoom
// 0.54 – 0.89 : Story → AnswerCall → AboutUs, evenly staggered
// 0.865 – 0.95 : quote + pinned gallery reveal
// 0.945 – 0.99 : review reveal, hold, exit
// 0.988 – 1.00 : booking reveal
// ──────────────────────────────────────────────────────────────────────────

// How many zoom-in cycles inside the tunnel scroll range
const TUNNEL_LOOPS = 1;
const HERO_SCROLL_HEIGHT = "7600vh";
const GALLERY_START_PROGRESS = 0.875;
const GALLERY_VISIBLE_PROGRESS = 0.895;

export const Hero = () => {
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Single spring for all transforms — silky feel
  const sp = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.3,
  });

  // ── Background: scales across the full scroll range ──
  const bgScale = useTransform(sp, [0, 0.5, 1], [1, 2.7, 4.8]);

  // ── Foreground / text ──
  const fgOpacity = useTransform(
    sp,
    [0, SCROLL_PHASE.heroHoldEnd, SCROLL_PHASE.heroExitEnd],
    [1, 1, 0],
  );
  const fgScale = useTransform(sp, [0, SCROLL_PHASE.heroExitEnd], [1, 2.65]);
  const fgY = useTransform(sp, [0, SCROLL_PHASE.heroExitEnd], [0, -180]);
  const textY = useTransform(sp, [0, SCROLL_PHASE.heroExitEnd], [0, 180]);
  const blurVal = useTransform(
    sp,
    [0.12, SCROLL_PHASE.heroExitEnd],
    [0, 10],
  );
  const blur = useTransform(blurVal, (v) => `blur(${v}px)`);

  // ── Badge ──
  const badgeScale = useTransform(sp, [0, 0.12, 0.24], [1, 1, 0.88]);
  const badgeX = useTransform(sp, [0, 0.24], [0, -24]);
  const badgeY = useTransform(sp, [0, 0.24], [0, 48]);
  const badgeOpacity = useTransform(sp, [0, 0.12, 0.24], [1, 1, 0]);

  // ── Video clip-path bloom ──
  const videoOpacity = useTransform(
    sp,
    [
      SCROLL_PHASE.videoStart,
      SCROLL_PHASE.videoVisible,
      SCROLL_PHASE.videoHoldEnd,
      SCROLL_PHASE.videoEnd,
    ],
    [0, 1, 1, 0],
  );
  const clipRadius = useTransform(
    sp,
    [SCROLL_PHASE.videoStart + 0.01, SCROLL_PHASE.videoHoldEnd - 0.04],
    [0, 150],
  );
  const clipPath = useTransform(clipRadius, (r) => `circle(${r}% at 50% 50%)`);

  // ── Tunnel: fade the whole overlay in once ──
  const tunnelOpacity = useTransform(
    sp,
    [SCROLL_PHASE.tunnelStart, SCROLL_PHASE.tunnelVisible],
    [0, 1],
  );

  // ── Tunnel scroll-driven zoom loop ──────────────────────────────────────
  //  Map the tunnel section [tunnelStart → 1.0] to raw [0 → 1]
  const tunnelRaw = useTransform(sp, [SCROLL_PHASE.tunnelStart, 1.0], [0, 1]);

  // Layer A: phase = (raw * LOOPS) % 1  — no offset
  // Layer B: phase = (raw * LOOPS + 0.5) % 1 — half-cycle offset
  // This means: when A is at 100% (fading out, large scale),
  //             B is at 50% (mid-zoom, fully opaque) → seamless handoff.

  const layerAScale = useTransform(tunnelRaw, (v) => {
    const phase = (v * TUNNEL_LOOPS) % 1;
    return 1.0 + phase * 1.8; // 1.0 → 2.8
  });

  const layerBScale = useTransform(tunnelRaw, (v) => {
    const phase = (v * TUNNEL_LOOPS + 0.5) % 1;
    return 1.0 + phase * 1.8;
  });

  // Opacity envelope: fade in fast, sustain, fade out before reset
  // [0, 0.07, 0.72, 0.90, 1] → [0, 1, 1, 0, 0]
  const layerAOpacity = useTransform(tunnelRaw, (v) => {
    const p = (v * TUNNEL_LOOPS) % 1;
    if (p < 0.07) return p / 0.07; // 0→1  (fade in)
    if (p < 0.72) return 1; // sustain
    if (p < 0.9) return 1 - (p - 0.72) / 0.18; // 1→0 (fade out)
    return 0; // invisible (reset)
  });

  const layerBOpacity = useTransform(tunnelRaw, (v) => {
    const p = (v * TUNNEL_LOOPS + 0.5) % 1;
    if (p < 0.07) return p / 0.07;
    if (p < 0.72) return 1;
    if (p < 0.9) return 1 - (p - 0.72) / 0.18;
    return 0;
  });

  // ── Audio button fades with tunnel ──
  const btnOpacity = useTransform(
    sp,
    [SCROLL_PHASE.tunnelStart, SCROLL_PHASE.tunnelVisible],
    [1, 0],
  );

  const { error, isPlaying, toggle } = useBackgroundAudio({
    src: BACKGROUND_AUDIO_SRC,
    volume: 0.65,
  });

  const audioIcon = isPlaying ? AUDIO_ON_ICON : AUDIO_OFF_ICON;

  // Story: fades in after video, fades out before AnswerCall.
  const storyOpacity = useTransform(
    sp,
    [
      SCROLL_PHASE.storyStart,
      SCROLL_PHASE.storyVisible,
      SCROLL_PHASE.storyHoldEnd,
      SCROLL_PHASE.storyEnd,
    ],
    [0, 1, 1, 0],
  );
  const storyScale = useTransform(
    sp,
    [SCROLL_PHASE.storyStart, SCROLL_PHASE.storyVisible],
    [0.93, 1],
  );
  const storyY = useTransform(
    sp,
    [SCROLL_PHASE.storyStart, SCROLL_PHASE.storyVisible],
    [40, 0],
  );

  // AnswerCall: fades IN after Story, fades OUT before AboutUs.
  const answerCallOpacity = useTransform(
    sp,
    [
      SCROLL_PHASE.answerStart,
      SCROLL_PHASE.answerVisible,
      SCROLL_PHASE.answerHoldEnd,
      SCROLL_PHASE.answerEnd,
    ],
    [0, 1, 1, 0],
  );
  const answerCallScale = useTransform(
    sp,
    [SCROLL_PHASE.answerStart, SCROLL_PHASE.answerVisible],
    [0.93, 1],
  );
  const answerCallY = useTransform(
    sp,
    [SCROLL_PHASE.answerStart, SCROLL_PHASE.answerVisible],
    [40, 0],
  );

  // AboutUs: fades in after AnswerCall exits, then clears before Quote/Gallery.
  const aboutUsOpacity = useTransform(
    sp,
    [
      SCROLL_PHASE.aboutStart,
      SCROLL_PHASE.aboutVisible,
      SCROLL_PHASE.aboutHoldEnd,
      SCROLL_PHASE.aboutEnd,
    ],
    [0, 1, 1, 0],
  );
  const aboutUsScale = useTransform(
    sp,
    [SCROLL_PHASE.aboutStart, SCROLL_PHASE.aboutVisible],
    [0.93, 1],
  );
  const aboutUsY = useTransform(
    sp,
    [SCROLL_PHASE.aboutStart, SCROLL_PHASE.aboutVisible],
    [40, 0],
  );

  // Quote: fades in, sticks at top during gallery, then rises off screen.
  const quoteOpacity = useTransform(
    sp,
    [
      SCROLL_PHASE.quoteStart,
      SCROLL_PHASE.quoteVisible,
      SCROLL_PHASE.quoteHoldEnd,
      SCROLL_PHASE.quoteEnd,
    ],
    [0, 1, 1, 0],
  );
  const quoteScale = useTransform(
    sp,
    [SCROLL_PHASE.quoteStart, SCROLL_PHASE.quoteVisible],
    [1.8, 1],
  );
  // enters from below → sticks at -200px during gallery → rises off-screen after gallery exits
  const quoteY = useTransform(
    sp,
    [
      SCROLL_PHASE.quoteStart,
      SCROLL_PHASE.quoteVisible,
      SCROLL_PHASE.quoteLift,
      SCROLL_PHASE.quoteHoldEnd,
      SCROLL_PHASE.quoteEnd,
    ],
    [40, 0, -200, -200, -420],
  );

  // Review: eases in as quote/gallery clear, then exits into the booking screen.
  const reviewOpacity = useTransform(
    sp,
    [
      SCROLL_PHASE.reviewStart,
      SCROLL_PHASE.reviewVisible,
      SCROLL_PHASE.reviewHoldEnd,
      SCROLL_PHASE.reviewEnd,
    ],
    [0, 1, 1, 0],
  );
  const reviewScale = useTransform(
    sp,
    [
      SCROLL_PHASE.reviewStart,
      SCROLL_PHASE.reviewVisible,
      SCROLL_PHASE.reviewHoldEnd,
      SCROLL_PHASE.reviewEnd,
    ],
    [0.08, 1, 1, 0.96],
  );
  const reviewY = useTransform(
    sp,
    [
      SCROLL_PHASE.reviewStart,
      SCROLL_PHASE.reviewVisible,
      SCROLL_PHASE.reviewHoldEnd,
      SCROLL_PHASE.reviewEnd,
    ],
    [24, 0, 0, -56],
  );
  const reviewPointerEvents = useTransform(reviewOpacity, (opacity) =>
    opacity > 0.5 ? "auto" : "none",
  );

  // Book: begins during the final review fade for a smoother handoff.
  const bookOpacity = useTransform(sp, [SCROLL_PHASE.bookStart, 1], [0, 1]);
  const bookScale = useTransform(sp, [SCROLL_PHASE.bookStart, 1], [0.96, 1]);
  const bookY = useTransform(sp, [SCROLL_PHASE.bookStart, 1], [72, 0]);
  const bookPointerEvents = useTransform(bookOpacity, (opacity) =>
    opacity > 0.5 ? "auto" : "none",
  );

  // Gallery: slides in, scrolls through, fully exits with the quote.
  const galleryOpacity = useTransform(
    sp,
    [
      SCROLL_PHASE.quoteVisible,
      GALLERY_VISIBLE_PROGRESS,
      SCROLL_PHASE.quoteHoldEnd,
      SCROLL_PHASE.galleryEnd,
    ],
    [0, 1, 1, 0],
  );
  const galleryX = useTransform(
    sp,
    [GALLERY_START_PROGRESS, SCROLL_PHASE.galleryEnd],
    ["400vw", "-680vw"], // -680vw ensures last image fully exits left edge
  );
  const galleryScale = useTransform(
    sp,
    [GALLERY_START_PROGRESS, GALLERY_VISIBLE_PROGRESS],
    [0.9, 1],
  );

  return (
    <section
      id="hero"
      ref={ref}
      className="relative w-full"
      style={{ height: HERO_SCROLL_HEIGHT }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background — scales continuously across full scroll */}
        <motion.img
          src="/images/imgi_61_683ccd8d954a257e67548f42_675a0b68d5b830edb2bd454c_background-v3.jpg"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ scale: bgScale }}
        />

        {/* Foreground parallax */}
        <motion.img
          src="/images/imgi_62_683ccd8fc2f6395cf4a9ae49_675a0a541363a87c38cc32fe_foreground-v2.png"
          alt="Foreground"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: fgOpacity, y: fgY, scale: fgScale, filter: blur }}
        />
        <motion.div
          className="absolute inset-0 w-full h-full flex justify-center items-center z-[35]"
          style={{ opacity: storyOpacity, scale: storyScale, y: storyY }}
        >
          <Story />
        </motion.div>

        <motion.div
          className="absolute inset-0 w-full h-full flex justify-center items-center z-[36]"
          style={{
            opacity: answerCallOpacity,
            scale: answerCallScale,
            y: answerCallY,
          }}
        >
          <AnswerCall />
        </motion.div>

        <motion.div
          className="absolute inset-0 w-full h-full flex justify-center items-center z-[37]"
          style={{
            opacity: aboutUsOpacity,
            scale: aboutUsScale,
            y: aboutUsY,
          }}
        >
          <AboutUs />
        </motion.div>

        {/* quote — rises from center, then sticks at top-third */}
        <motion.h2
          className="absolute inset-0 w-full h-full flex justify-center items-center z-[38] text-white px-8 text-center text-4xl font-fjalla uppercase pointer-events-none"
          style={{
            opacity: quoteOpacity,
            scale: quoteScale,
            y: quoteY,
          }}
        >
          Lose yourself in ingenious puzzle spaces
          <br /> — each more remarkable than the last.
        </motion.h2>

        {/* gallery — slides in from right while quote stays at top */}
        <motion.div
          className="absolute top-2/3 left-0 flex -translate-y-1/2 gap-8 pl-[20vw] will-change-transform z-[38]"
          style={{ x: galleryX, opacity: galleryOpacity, scale: galleryScale }}
        >
          {GALLERY_IMG.map((src) => (
            <motion.div
              key={src}
              className="h-[44vh] shrink-0 overflow-hidden rounded-xl md:h-[52vh]"
              style={{ width: "min(62vw, 680px)" }}
            >
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover"
                draggable={false}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Review — scales up from center dot after quote exits */}
        <motion.div
          className="absolute inset-0 w-full h-full z-[50] overflow-hidden"
          style={{
            opacity: reviewOpacity,
            scale: reviewScale,
            y: reviewY,
            pointerEvents: reviewPointerEvents,
          }}
        >
          <Review />
        </motion.div>

        <motion.div
          className="absolute inset-0 w-full h-full z-[60] overflow-hidden"
          style={{
            opacity: bookOpacity,
            scale: bookScale,
            y: bookY,
            pointerEvents: bookPointerEvents,
          }}
        >
          <Book />
        </motion.div>

        {/* ── Video: clip-path circle bloom ── */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{ opacity: videoOpacity, clipPath }}
        >
          <video
            src="/videos/ads.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* ── Tunnel: scroll-driven infinite zoom loop ── */}
        <motion.div
          className="absolute inset-0 z-[25] pointer-events-none overflow-hidden"
          style={{ opacity: tunnelOpacity }}
        >
          {/* Layer A */}
          <motion.img
            src={TUNNEL_IMG}
            alt=""
            className="absolute inset-0 w-full h-full object-cover origin-center"
            style={{ scale: layerAScale, opacity: layerAOpacity }}
          />
          {/* Layer B — half-cycle offset so A→B crossfade is seamless */}
          <motion.img
            src={TUNNEL_IMG}
            alt=""
            className="absolute inset-0 w-full h-full object-cover origin-center"
            style={{ scale: layerBScale, opacity: layerBOpacity }}
          />
        </motion.div>

        {/* Badge */}
        <motion.div
          className="absolute bottom-10 left-10 z-30 w-12 lg:w-32"
          style={{
            opacity: badgeOpacity,
            scale: badgeScale,
            x: badgeX,
            y: badgeY,
            willChange: "transform, opacity",
          }}
        >
          <motion.img
            src="/images/imgi_3_6918fb84ecd803e93abae6db_2025TERPECABadgeNominee-0w-300h.png"
            alt="Hero Badge"
            className="w-full object-contain"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
        </motion.div>

        {/* Audio toggle */}
        <motion.button
          type="button"
          aria-label={
            isPlaying ? "Pause background music" : "Play background music"
          }
          aria-pressed={isPlaying}
          title={error?.message ?? "Toggle background music"}
          className="absolute bottom-10 right-10 z-50 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          style={{ opacity: btnOpacity }}
          onClick={toggle}
        >
          <img src={audioIcon} alt="" className="w-12 object-contain lg:w-16" />
        </motion.button>

        {/* Hero text */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white bg-black/10">
          <motion.img
            style={{ opacity: fgOpacity, y: fgY }}
            src="/images/imgi_2_683cd06761cd08b273017549_675807399d17d73b0f4037e7_5f9f47e7229a66f081a5466ede186fac_HOTM-rock.png"
            alt="Logo"
            className="max-w-72 cursor-pointer"
          />
          <motion.p
            style={{ opacity: fgOpacity, y: textY }}
            className="mt-4 text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center tracking-widest uppercase opacity-80 font-fjalla font-bold"
          >
            Australian-first <br /> adventure experience
          </motion.p>
        </div>
      </div>
    </section>
  );
};
