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
import ParceirosSection from "../components/ParceirosSection";
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

  useScrollToHash(90);

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
      <div data-section="hero">
        <HeroSection ctaLink="#passaportes" />
      </div>
      <div data-section="destaques">
        <HeroSectionV2 />
      </div>
      <div data-section="faixa">
        <SlideFaixa />
      </div>
      <div data-section="novos-palestrantes">
        <SlideNovosPalestrantes ctaLink="#passaportes" />
      </div>
      <NewTimerHeaderHomeTeste
        isVisible={showTimerHeader}
        headerText="3º lote disponível:"
        ctaTitle="Garanta seu passaporte"
        targetDate={midnightToday}
      />

      <div data-section="conteudo">
        <ContentSection />
      </div>
      <div data-section="palestrantes">
        <SlidePalestrantes />
      </div>
      <div data-section="depoimentos">
        <Depoimentos ctaLink="#passaportes" />
      </div>
      <div data-section="publico">
        <PublicoDSX />
      </div>
      <div data-section="banner">
        <BannerSection />
      </div>
      <div
        id="passaportes"
        data-section="passaportes"
        className="bg-[url(/ELEMENTOS-BANNER-2.png)] bg-cover bg-no-repeat bg-center"
      >
        {isMobile ? <PassaportesMobileHomeTeste /> : <PassaporteVendasHomeTeste />}
      </div>
      <div data-section="grupo">
        <PassaporteGrupoHomeTeste />
      </div>
      <div data-section="fale-conosco">
        <FaleConosco />
      </div>
      <div data-section="parceiros">
        <ParceirosSection />
      </div>
      <div data-section="faq">
        <FAQ />
      </div>
      <BotaoWPFooter />
      <div className="h-px w-full" data-section="footer-trigger" />
      <div data-section="footer">
        <Footer />
      </div>
    </section>
  );
};

export default HomeTeste;
