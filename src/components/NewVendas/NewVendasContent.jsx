import { useEffect, useState } from "react";
import {
  audienceProfiles,
  faqItems,
  featuredSpeakers,
  painPoints,
  testimonials,
  tracks,
} from "./newVendasData";
import {
  AudienceSection,
  FaqSection,
  FooterSection,
  PainPointsSection,
  PassaportesSection,
  SpeakersSection,
  TestimonialsSection,
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
    <section className="border-t border-[#2A2419] bg-[#0F0E0A] pb-10 pt-8 text-white md:pb-14 md:pt-12">
      <PainPointsSection items={painPoints} />
      <TracksSection items={tracks} />
      <SpeakersSection items={featuredSpeakers} />
      <TestimonialsSection items={testimonials} />
      <AudienceSection items={audienceProfiles} />

      <PassaportesSection isMobile={isMobile} onBuyPassaporte={handleBuyPassaporte} />

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
