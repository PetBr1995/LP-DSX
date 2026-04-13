import { Suspense, lazy, useEffect, useRef, useState } from "react";
import ImpactoVendas from "../ComponentsVendas/ImpactoVendas";
import { audienceProfiles, faqItems, tracks } from "./newVendasData";
import {
  AudienceSection,
  BusinessExperienceSection,
  FaqSection,
  FooterSection,
  PassaportesSection,
  TracksSection,
} from "./sections";

const LazySpeakersSection = lazy(() => import("./sections/SpeakersSection"));

const NewVendasContent = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [shouldLoadSpeakers, setShouldLoadSpeakers] = useState(false);
  const speakersTriggerRef = useRef(null);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 1015);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    const trigger = speakersTriggerRef.current;
    if (!trigger) return;

    if (!("IntersectionObserver" in window)) {
      const timeoutId = window.setTimeout(() => setShouldLoadSpeakers(true), 0);
      return () => window.clearTimeout(timeoutId);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoadSpeakers(true);
        observer.disconnect();
      },
      {
        rootMargin: "380px 0px",
        threshold: 0,
      },
    );

    observer.observe(trigger);

    return () => observer.disconnect();
  }, []);

  const handleBuyPassaporte = (targetLink) => {
    window.open(targetLink, "_blank", "noopener,noreferrer");
  };

  const handleToggleFaq = (index) => {
    setOpenFaqIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="bg-black pb-10 pt-8 text-white md:pb-14 md:pt-12">
      <div ref={speakersTriggerRef}>
        {shouldLoadSpeakers ? (
          <Suspense fallback={<div className="bg-black py-16 md:py-20" />}>
            <LazySpeakersSection />
          </Suspense>
        ) : (
          <div className="bg-black py-16 md:py-20" />
        )}
      </div>
      <AudienceSection items={audienceProfiles} />
      <PassaportesSection
        isMobile={isMobile}
        onBuyPassaporte={handleBuyPassaporte}
      />
      <BusinessExperienceSection />
      <TracksSection items={tracks} />
      <ImpactoVendas />

      <FaqSection
        items={faqItems}
        openFaqIndex={openFaqIndex}
        onToggleFaq={handleToggleFaq}
      />

      <FooterSection />
    </section>
  );
};

export default NewVendasContent;
