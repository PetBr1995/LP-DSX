import { useEffect, useState } from "react";
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

const NewVendasContent = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 1015);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handleBuyPassaporte = (targetLink) => {
    window.open(targetLink, "_blank", "noopener,noreferrer");
  };

  const handleToggleFaq = (index) => {
    setOpenFaqIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="bg-black pb-10 pt-8 text-white md:pb-14 md:pt-12">
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
