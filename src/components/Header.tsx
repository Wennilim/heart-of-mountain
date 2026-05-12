import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useCallback, useEffect, useState, type MouseEvent } from "react";
import {
  HERO_ABOUT_ACTIVE_RANGE,
  HERO_ABOUT_SCROLL_PROGRESS,
} from "./heroScrollPhases";

const NAV_BUTTONS = [
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const MENU_LINKS = [...NAV_BUTTONS, { label: "Book Now", href: "#book-now" }];

const DARK_SECTION_IDS = ["hero", "faq", "contact", "book-now"];

export const Header = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const headerStateTarget = useMotionValue(0);
  const headerState = useSpring(headerStateTarget, {
    stiffness: 400,
    damping: 40,
  });

  const getHeroScrollProgress = useCallback(() => {
    const hero = document.getElementById("hero");
    if (!hero) return null;

    const scrollRange = hero.offsetHeight - window.innerHeight;
    if (scrollRange <= 0) return null;

    return (window.scrollY - hero.offsetTop) / scrollRange;
  }, []);

  const scrollToHeroAbout = useCallback(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    document.body.style.overflow = "";

    const scrollRange = Math.max(hero.offsetHeight - window.innerHeight, 0);
    const maxScrollY = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      0,
    );
    const targetY = Math.min(
      hero.offsetTop + scrollRange * HERO_ABOUT_SCROLL_PROGRESS,
      maxScrollY,
    );

    window.history.replaceState({}, "", "#about");
    window.scrollTo({
      top: targetY,
      left: 0,
      behavior: "smooth",
    });
    setActiveSection("about");
  }, []);

  const scrollToBookNow = useCallback(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    document.body.style.overflow = "";

    const scrollRange = Math.max(hero.offsetHeight - window.innerHeight, 0);
    const maxScrollY = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      0,
    );
    const targetY = Math.min(hero.offsetTop + scrollRange, maxScrollY);

    window.history.replaceState({}, "", "#book-now");
    window.scrollTo({
      top: targetY,
      left: 0,
      behavior: "smooth",
    });
    setActiveSection("book-now");
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    document.body.style.overflow = "";

    const offset = 80; // matches scroll-mt-20
    const rect = element.getBoundingClientRect();
    const targetY = rect.top + window.scrollY - offset;

    window.history.replaceState({}, "", `#${id}`);
    window.scrollTo({
      top: targetY,
      left: 0,
      behavior: "smooth",
    });
    setActiveSection(id);
  }, []);

  const updateHeaderState = useCallback(
    (latest: number) => {
      let inDarkSection = false;

      // Check for sections that should have a transparent/white header.
      DARK_SECTION_IDS.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom >= 80) {
            inDarkSection = true;
          }
        }
      });

      if (inDarkSection) {
        headerStateTarget.set(0);
      } else {
        headerStateTarget.set(Math.min(1, Math.max(0, latest / 300)));
      }
    },
    [headerStateTarget],
  );

  const updateActiveSection = useCallback(() => {
    const heroProgress = getHeroScrollProgress();
    if (
      heroProgress !== null &&
      heroProgress >= HERO_ABOUT_ACTIVE_RANGE.start &&
      heroProgress <= HERO_ABOUT_ACTIVE_RANGE.end
    ) {
      setActiveSection((previous) =>
        previous === "about" ? previous : "about",
      );
      return;
    }

    const sections = MENU_LINKS.filter(
      (b) => b.href.startsWith("#") && b.href !== "#about",
    ).map((b) => b.href.slice(1));

    let current = "";
    for (const id of sections) {
      const section = document.getElementById(id);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          current = id;
          break;
        }
      }
    }
    setActiveSection((previous) => (previous === current ? previous : current));
  }, [getHeroScrollProgress]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    updateHeaderState(latest);
    updateActiveSection();
  });

  useEffect(() => {
    updateHeaderState(scrollY.get());
    const frame = requestAnimationFrame(() => {
      updateActiveSection();
    });

    return () => cancelAnimationFrame(frame);
  }, [scrollY, updateActiveSection, updateHeaderState]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    event.preventDefault();
    closeMenu();

    if (href === "#about") {
      scrollToHeroAbout();
    } else if (href === "#book-now") {
      scrollToBookNow();
    } else {
      const id = href.replace("#", "");
      scrollToSection(id);
    }
  };

  const textColor = useTransform(headerState, [0, 1], ["#ffffff", "#000000"]);
  const buttonTextColor = useTransform(headerState, (v) =>
    v > 0.5 ? "#ffffff" : "#000000",
  );

  return (
    <motion.header className="fixed top-0 left-0 z-50 flex w-full items-center justify-between bg-transparent px-5 py-5 text-white transition-all sm:px-8 sm:py-6">
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => {
          closeMenu();
          window.history.replaceState({}, "", window.location.pathname);
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }}
      >
        <img
          src="/images/imgi_2_683cd06761cd08b273017549_675807399d17d73b0f4037e7_5f9f47e7229a66f081a5466ede186fac_HOTM-rock.png"
          alt="Logo"
          className="w-16 cursor-pointer sm:w-18"
        />
      </button>

      <nav className="flex items-center gap-4 lg:gap-8">
        <ul className="gap-8 hidden lg:flex font-fjalla uppercase tracking-wider">
          {NAV_BUTTONS.filter((b) => b.label !== "Contact us").map((button) => {
            const isActive = button.href === `#${activeSection}`;
            return (
              <li key={button.label} className="relative group">
                <a
                  href={button.href}
                  onClick={(event) => handleNavClick(event, button.href)}
                  className="transition-colors relative inline-block py-1"
                >
                  {button.label}
                  <span
                    className={`
                      absolute left-0 bottom-0 h-[2px] w-full bg-current
                      transition-transform duration-300 ease-out
                      origin-left
                      ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
                    `}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <motion.a
          href="#book-now"
          onClick={(event) => handleNavClick(event, "#book-now")}
          style={{
            backgroundColor: textColor,
            color: buttonTextColor,
          }}
          className="px-8 py-2.5 rounded-full hidden lg:flex bg-radial-[at_50%_30%] from-[#EEB71C] to-[#D56405] font-bold font-fjalla uppercase tracking-widest cursor-pointer transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
        >
          {NAV_BUTTONS.find((button) => button.label === "Book Now")?.label ||
            "Book Now"}
        </motion.a>

        <motion.button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          className="relative z-50 grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-white/18 bg-black/35 text-white backdrop-blur-md transition duration-200 hover:border-[#eeb71c]/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          whileTap={{ scale: 0.94 }}
        >
          <span className="sr-only">
            {isMenuOpen ? "Close menu" : "Open menu"}
          </span>
          <span className="relative h-5 w-5">
            <motion.span
              className="absolute left-0 top-1 block h-0.5 w-5 rounded-full bg-current"
              animate={isMenuOpen ? { y: 7, rotate: 45 } : { y: 0, rotate: 0 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span
              className="absolute left-0 top-2.5 block h-0.5 w-5 rounded-full bg-current"
              animate={isMenuOpen ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span
              className="absolute left-0 top-4 block h-0.5 w-5 rounded-full bg-current"
              animate={
                isMenuOpen ? { y: -7, rotate: -45 } : { y: 0, rotate: 0 }
              }
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            />
          </span>
        </motion.button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              className="fixed inset-0 z-40 bg-black/42 backdrop-blur-[2px] lg:hidden"
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              id="mobile-menu"
              className="fixed inset-x-4 top-24 z-50 overflow-hidden rounded-lg border border-white/14 bg-[#050504]/92 text-white shadow-2xl shadow-black/40 backdrop-blur-xl sm:inset-x-8 lg:hidden"
              initial={{ opacity: 0, y: -18, scale: 0.96, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, scale: 0.98, filter: "blur(6px)" }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="border-b border-white/10 px-5 py-4">
                <p className="font-fjalla text-xs uppercase tracking-[0.26em] text-[#eeb71c]">
                  Explore
                </p>
              </div>

              <div className="grid">
                {MENU_LINKS.map((link, index) => {
                  const isBookLink = link.href === "#book-now";
                  const isActive = link.href === `#${activeSection}`;

                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      className={`flex items-center justify-between border-b border-white/10 px-5 py-4 font-fjalla text-2xl uppercase leading-none transition duration-200 last:border-b-0 ${
                        isBookLink
                          ? "bg-[#eeb71c] text-black"
                          : "text-white hover:bg-white/8"
                      }`}
                      onClick={(event) => handleNavClick(event, link.href)}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.28,
                        delay: 0.05 + index * 0.04,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <span>{link.label}</span>
                      <span
                        aria-hidden="true"
                        className={`h-2 w-2 rounded-full ${
                          isActive || isBookLink ? "bg-current" : "bg-white/24"
                        }`}
                      />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
