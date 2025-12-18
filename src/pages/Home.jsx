import { useEffect, useState } from "react";
import useScrollToHash from "../hooks/useScrollToHash";

import ContentSection from "../components/ContentSection";
import DsxConsolidation from "../components/DscConsolidation";
import FaleConosco from "../components/FaleConosco";
import Footer from "../components/Footer";
import FormSection from "../components/FormSection";
import HeroSection from "../components/HeroSection";
import NewTimerHeader from "../components/NewTimerHeader";
import SecondSection from "../components/SecondSection";
import SlidePalestrantes from "../components/SlidePalestrantes";

const Home = () => {
  const [showTimerHeader, setShowTimerHeader] = useState(false);

  // ✅ garante scroll ao chegar com /#form, /#faleconosco etc.
  useScrollToHash(90); // 90px = altura do header (ajuste)

  useEffect(() => {
    const onScroll = () => setShowTimerHeader(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="home" className="bg-black pb-43 md:pb-18 overflow-x-hidden">
      <HeroSection />

      <NewTimerHeader isVisible={showTimerHeader} />

      <SecondSection />
      <SlidePalestrantes />
      <DsxConsolidation />
      <ContentSection />
      <FormSection />
      <FaleConosco />
      <Footer />
    </section>
  );
};

export default Home;
