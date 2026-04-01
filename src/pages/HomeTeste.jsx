import { useEffect, useMemo, useState } from "react";
import useScrollToHash from "../hooks/useScrollToHash";

import SlideNovosPalestrantes from "../components/SlideNovosPalestrantes";
import ContentSection from "../components/ContentSection";
import FaleConosco from "../components/FaleConosco";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import NewTimerHeaderHomeTeste from "../components/HomeTesteComponentes/NewTimerHeaderHomeTeste";
import SlidePalestrantes from "../components/SlidePalestrantes";
import HeroSectionV2 from "../components/HeroSectionV2";
import SlideFaixa from "../components/SlideFaixa";
import Depoimentos from "../components/Depoimentos";
import PublicoDSX from "../components/PublicoDSX";
import FAQ from "../components/FAQ";
import BannerSection from "../components/BannerSection";
import BotaoWPFooter from "../components/BotaoWPFooter";
import PassaporteVendasHomeTeste from "../components/HomeTesteComponentes/PassaporteVendasHomeTeste";
import PassaportesMobileHomeTeste from "../components/HomeTesteComponentes/PassaportesMobileHomeTeste";
import PassaporteGrupoHomeTeste from "../components/HomeTesteComponentes/PassaporteGrupoHomeTeste";

const HomeTeste = () => {
  const [showTimerHeader, setShowTimerHeader] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const midnightToday = useMemo(() => {
    const date = new Date();
    date.setHours(24, 0, 0, 0);
    return date;
  }, []);

  // Garante scroll ao chegar com /#form, /#faleconosco etc.
  useScrollToHash(90); // 90px = altura do header (ajuste)

  useEffect(() => {
    const onScroll = () => setShowTimerHeader(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 1015);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <section id="home" className="bg-black pb-43 md:pb-18 overflow-x-hidden">
      <HeroSection ctaLink="#passaportes" />
      <HeroSectionV2 />
      <SlideFaixa />
      <div>
        <SlideNovosPalestrantes ctaLink="#passaportes" />
      </div>
      <NewTimerHeaderHomeTeste
        isVisible={showTimerHeader}
        headerText="3º lote disponível:"
        ctaTitle="Garanta seu passaporte"
        targetDate={midnightToday}
      />

      <div>
        <ContentSection />
      </div>
      <SlidePalestrantes />
      <Depoimentos ctaLink="#passaportes" />
      <PublicoDSX />
      <BannerSection />
      <div
        id="passaportes"
        className="bg-[url(/ELEMENTOS-BANNER-2.png)] bg-cover bg-no-repeat bg-center"
      >
        {isMobile ? <PassaportesMobileHomeTeste /> : <PassaporteVendasHomeTeste />}
      </div>
      <PassaporteGrupoHomeTeste />
      <FaleConosco />
      <FAQ />
      <BotaoWPFooter />
      <Footer />
    </section>
  );
};

export default HomeTeste;
