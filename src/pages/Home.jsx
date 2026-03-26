import { useEffect, useState } from "react";
import useScrollToHash from "../hooks/useScrollToHash";

import SlideNovosPalestrantes from "../components/SlideNovosPalestrantes"
import ContentSection from "../components/ContentSection";
import DsxConsolidation from "../components/DscConsolidation";
import FaleConosco from "../components/FaleConosco";
import Footer from "../components/Footer";
import FormSection from "../components/FormSection";
import HeroSection from "../components/HeroSection";
import NewTimerHeader from "../components/NewTimerHeader";
import SecondSection from "../components/SecondSection";
import SlidePalestrantes from "../components/SlidePalestrantes";
import HeroSectionV2 from "../components/HeroSectionV2";
import SlideFaixa from "../components/SlideFaixa";
import Depoimentos from "../components/Depoimentos";
import PublicoDSX from "../components/PublicoDSX";
import FAQ from "../components/FAQ";
import BannerSection from "../components/BannerSection";
import CondicoesGrupos from "../components/CondicoesGrupos";
import BotaoWP from "../components/BotaoWP";


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
      <HeroSection/>
      <HeroSectionV2/>
      <SlideFaixa/>
      <SlideNovosPalestrantes/>
      <NewTimerHeader
        isVisible={showTimerHeader}
        headerText="O evento começa em:"
        ctaTitle="Segundo lote disponível"
        targetDate="2026-07-23T00:00:00"
      />
       

      <ContentSection />
      <SlidePalestrantes />
      <Depoimentos/>
      <PublicoDSX/>
      <BannerSection/>
      <CondicoesGrupos/>
      {/* 
      <FormSection />
      */}
      <FaleConosco />
      <FAQ/>
      <Footer />
      <BotaoWP/>
    </section>
  );
};

export default Home;
