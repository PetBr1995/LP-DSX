import { useEffect, useState } from "react";
import Header from "./Header";

const HeroSection = () => {
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowHeader(window.scrollY > 10); // >10px pra evitar "tremida"
    onScroll(); // garante estado correto ao carregar
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Header
        className={`
          transition-all duration-400 ease-out
          ${showHeader ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}
        `}
      />

      <section className="relative w-full mt-34 sm:mt-0 pb-[56%] overflow-hidden bg-black">
        <iframe
          src="https://player.vimeo.com/video/1146735494?autoplay=1&muted=1&loop=1&controls=0&title=0&byline=0&portrait=0&autopause=0&playsinline=1"
          className="absolute inset-0 w-full h-full pointer-events-none"
          allow="autoplay;"
        />
        <div className="relative z-10"></div>
      </section>
    </>
  );
};

export default HeroSection;
