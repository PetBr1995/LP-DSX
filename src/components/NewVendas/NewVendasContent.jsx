import { useEffect, useState } from "react";
import ImpactoVendas from "../ComponentsVendas/ImpactoVendas";
import ParceirosSection from "../ParceirosSection";
import NewVendasSpeakersSlider from "./NewVendasSpeakersSlider";
import { audienceProfiles, faqItems, tracks } from "./newVendasData";
import { rememberDsxFormOrigin } from "../../utils/formOrigin";
import {
  AudienceSection,
  BusinessExperienceSection,
  FaqSection,
  FooterSection,
  PassaportesSection,
  TracksSection,
} from "./sections";

const NewVendasContent = ({
  hidePassaporteButtons = false,
  onBuyPassaporte: onBuyPassaporteProp,
}) => {
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

  const handleBuyPassaporte = (targetLink, formOrigin) => {
    if (formOrigin) {
      rememberDsxFormOrigin(formOrigin);
    }
    if (typeof onBuyPassaporteProp === "function") {
      onBuyPassaporteProp(targetLink, formOrigin);
      return;
    }

    window.location.href = targetLink;
  };

  const handleToggleFaq = (index) => {
    setOpenFaqIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="bg-black pb-10 pt-0 text-white md:pb-14 md:pt-0">
      <section className="bg-black px-4 pb-10 md:px-8 md:pb-14">
        <NewVendasSpeakersSlider />
      </section>
      <AudienceSection items={audienceProfiles} />
      <PassaportesSection
        isMobile={isMobile}
        onBuyPassaporte={handleBuyPassaporte}
        hidePassaporteButtons={hidePassaporteButtons}
      />
      <BusinessExperienceSection />
      <TracksSection items={tracks} />
      <ImpactoVendas />
      <ParceirosSection />

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
