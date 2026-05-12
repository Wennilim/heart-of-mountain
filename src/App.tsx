import { useEffect } from "react";
import { Header } from "./components/Header";
import { FAQs } from "./components/FAQs";
import { Hero } from "./components/Hero";
import { Contact } from "./components/Contact";
import { HERO_ABOUT_SCROLL_PROGRESS } from "./components/heroScrollPhases";

function App() {
  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const id = href.slice(1);
      const hero = document.getElementById("hero");

      if (id === "about" && hero) {
        event.preventDefault();
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
        window.scrollTo({ top: targetY, behavior: "smooth" });
      } else if (id === "book-now" && hero) {
        event.preventDefault();
        const scrollRange = Math.max(hero.offsetHeight - window.innerHeight, 0);
        const maxScrollY = Math.max(
          document.documentElement.scrollHeight - window.innerHeight,
          0,
        );
        const targetY = Math.min(hero.offsetTop + scrollRange, maxScrollY);
        window.history.replaceState({}, "", "#book-now");
        window.scrollTo({ top: targetY, behavior: "smooth" });
      } else {
        const element = document.getElementById(id);
        if (element) {
          event.preventDefault();
          const offset = 80; // matches scroll-mt-20
          const rect = element.getBoundingClientRect();
          const targetY = rect.top + window.scrollY - offset;
          window.history.replaceState({}, "", `#${id}`);
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <FAQs />
      <Contact />
    </>
  );
}

export default App;
