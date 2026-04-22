import { useEffect, useRef, useState } from "react";
import NewVendasHeaderMask from "./NewVendasHeaderMask";
import NewVendasBigNumbersSection from "./NewVendasBigNumbersSection";
import { Calendar, ChevronLeft, ChevronRight, MapPin } from "lucide-react";

const NewVendasHero = ({
  ctaLink = "https://www.sympla.com.br/evento/dsx-2026-digital-summit-experience/3339721",
  onPrimaryCtaClick,
}) => {
  const ctaTarget = ctaLink.startsWith("#") ? "_self" : "_blank";
  const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [mainSpeakers, setMainSpeakers] = useState([]);
  const [isDraggingSpeakers, setIsDraggingSpeakers] = useState(false);
  const [hasSpeakersNearViewport, setHasSpeakersNearViewport] = useState(false);
  const speakerDragStartXRef = useRef(null);
  const speakersSectionRef = useRef(null);

  useEffect(() => {
    const sectionElement = speakersSectionRef.current;
    if (!sectionElement || typeof window === "undefined") return undefined;

    if (!("IntersectionObserver" in window)) {
      setHasSpeakersNearViewport(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setHasSpeakersNearViewport(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "300px 0px",
        threshold: 0.01,
      },
    );

    observer.observe(sectionElement);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasSpeakersNearViewport || mainSpeakers.length > 0) return;

    let isCancelled = false;
    import("./mainSpeakersData").then((module) => {
      if (isCancelled) return;
      setMainSpeakers(module.mainSpeakersData || []);
    });

    return () => {
      isCancelled = true;
    };
  }, [hasSpeakersNearViewport, mainSpeakers.length]);

  useEffect(() => {
    const getCardsPerView = () => {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 640) return 2;
      return 1;
    };

    const applyCardsPerView = () => {
      const nextCardsPerView = getCardsPerView();
      setCardsPerView(nextCardsPerView);
      setCurrentSpeakerIndex((current) =>
        Math.min(current, Math.max(mainSpeakers.length - nextCardsPerView, 0)),
      );
    };

    applyCardsPerView();
    window.addEventListener("resize", applyCardsPerView);
    return () => window.removeEventListener("resize", applyCardsPerView);
  }, [mainSpeakers.length]);

  const maxSpeakerIndex = Math.max(mainSpeakers.length - cardsPerView, 0);

  useEffect(() => {
    if (!hasSpeakersNearViewport || maxSpeakerIndex === 0 || isDraggingSpeakers) return;

    const autoplayId = window.setInterval(() => {
      setCurrentSpeakerIndex((current) =>
        current >= maxSpeakerIndex ? 0 : current + 1,
      );
    }, 4200);

    return () => window.clearInterval(autoplayId);
  }, [hasSpeakersNearViewport, maxSpeakerIndex, isDraggingSpeakers]);

  const goToNextSpeakerSlide = () => {
    setCurrentSpeakerIndex((current) => (current >= maxSpeakerIndex ? 0 : current + 1));
  };

  const goToPreviousSpeakerSlide = () => {
    setCurrentSpeakerIndex((current) => (current <= 0 ? maxSpeakerIndex : current - 1));
  };

  const handleSpeakerDragStart = (clientX) => {
    speakerDragStartXRef.current = clientX;
    setIsDraggingSpeakers(true);
  };

  const handleSpeakerDragEnd = (clientX) => {
    if (speakerDragStartXRef.current === null) return;

    const deltaX = clientX - speakerDragStartXRef.current;
    const swipeThreshold = 50;

    if (deltaX <= -swipeThreshold) {
      goToNextSpeakerSlide();
    } else if (deltaX >= swipeThreshold) {
      goToPreviousSpeakerSlide();
    }

    speakerDragStartXRef.current = null;
    setIsDraggingSpeakers(false);
  };

  return (
    <section className="bg-black text-white">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-0">
          <picture>
            <source srcSet="/optimized/banner-faq.avif" type="image/avif" />
            <source srcSet="/optimized/banner-faq.webp" type="image/webp" />
            <img
              src="/optimized/banner-faq.jpg"
              alt="Banner oficial do DSX 2026"
              className="h-full w-full object-cover object-center opacity-30"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/46 to-black/54" />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-4 pb-10 pt-10 md:pb-12 md:pt-14">
          <div className="text-center space-y-5 md:space-y-6">
          <div className="flex justify-center">
            <img
              src="/logo-dsx-horizontal-2.svg"
              alt="DSX"
              className="block h-16 w-auto object-contain md:h-20"
              loading="eager"
              decoding="async"
            />
          </div>
          <h1 className="mx-auto max-w-6xl font-anton text-[clamp(1.9rem,5vw,4.8rem)] uppercase leading-[1.3] tracking-[0.012em] md:leading-[1.12]">
            <span className="block text-[#F5C02B]">O MAIOR EVENTO</span>
            <span className="block text-white">
              DE NEGÓCIOS, MARKETING, VENDAS E INOVAÇÃO{" "}
              <span className="text-[#F5C02B]">DO NORTE</span>
            </span>
          </h1>
          <div className="mx-auto max-w-4xl">
            <p className="text-center text-[clamp(1rem,4.8vw,1.8rem)] leading-[1.1] text-white/90">
              Dois dias de conteúdo estratégico e conexões de alto nível.
            </p>
          </div>
          <div>
            <h3 className="font-anton text-[clamp(1.3rem,2.8vw,2rem)] uppercase tracking-[0.03em]">
              Onde os maiores especialistas <br /> do país se encontram.
            </h3>
          </div>
          <div className="flex justify-center items-center gap-4">

            <div className="flex items-center justify-center gap-2">
              <span><Calendar color="#F5C02B" /></span>
              <p className="text-center text-[clamp(.95rem,2.8vw,1rem)] leading-[1.2] text-white/90">
                23 e 24 de Julho
              </p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span>
                <MapPin color="#F5C02B" />
              </span>
              <div>
                <p>
                  Centro de Convenções
                </p>
                <p>
                  Vasco Vasques, Manaus/AM
                </p>
              </div>
            </div>
          </div>

          <div id="newvendas-primary-cta" className="flex justify-center">
            <NewVendasHeaderMask
              titulo="COMPRAR PASSAPORTE"
              link={ctaLink}
              target={ctaTarget}
              onClick={onPrimaryCtaClick}
              textColor="#FFFFFF"
              backgroundColor="#1E1A12"
              font="700"
              size="lg"
            />
          </div>
          </div>
        </div>
      </div>
      <NewVendasBigNumbersSection />
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-2 md:pb-12 md:pt-4">
          <section
            ref={speakersSectionRef}
            className="mx-auto mt-10 w-full max-w-6xl md:mt-12"
          >
            <h3 className="text-center font-anton text-[clamp(1.3rem,4.2vw,2.8rem)] uppercase leading-[1.08] tracking-[0.03em] text-[#F5C02B]">
              Conheça os primeiros palestrantes confirmados do DSX
            </h3>
            {hasSpeakersNearViewport && mainSpeakers.length > 0 ? (
              <div className="relative mx-auto mt-6 w-full max-w-[920px]">
                <div
                  className={`overflow-hidden select-none ${isDraggingSpeakers ? "cursor-grabbing" : "cursor-grab"}`}
                  style={{ touchAction: "pan-y" }}
                  onMouseDown={(event) => handleSpeakerDragStart(event.clientX)}
                  onMouseUp={(event) => handleSpeakerDragEnd(event.clientX)}
                  onMouseLeave={(event) => {
                    if (speakerDragStartXRef.current !== null) {
                      handleSpeakerDragEnd(event.clientX);
                    }
                  }}
                  onTouchStart={(event) => {
                    const touch = event.touches[0];
                    if (!touch) return;
                    handleSpeakerDragStart(touch.clientX);
                  }}
                  onTouchEnd={(event) => {
                    const touch = event.changedTouches[0];
                    if (!touch) return;
                    handleSpeakerDragEnd(touch.clientX);
                  }}
                >
                  <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{
                      transform: `translateX(-${(currentSpeakerIndex * 100) / cardsPerView}%)`,
                    }}
                  >
                    {mainSpeakers.map((speaker) => (
                      <div
                        key={speaker.name}
                        className="w-full shrink-0 px-0.5 sm:w-1/2 sm:px-1 lg:w-1/3 lg:px-1.5"
                      >
                        <article className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-[#5A4718] bg-black/80 text-left shadow-lg">
                          <div className="relative h-[220px] w-full overflow-hidden bg-[#000000] sm:h-[250px] md:h-[270px]">
                            <img
                              src={speaker.image}
                              alt={speaker.name}
                              className="h-full w-full object-contain object-center"
                              loading="lazy"
                              decoding="async"
                              draggable={false}
                              onDragStart={(event) => event.preventDefault()}
                            />
                          </div>

                          <div className="px-3.5 pt-3">
                            <h4 className="font-bebas text-[1.75rem] uppercase tracking-[0.02em] text-[#F5A205]">
                              {speaker.name}
                            </h4>
                          </div>
                          <div className="flex-1 px-3.5 pb-3.5">
                            <p
                              className="font-jamjuree text-sm leading-relaxed text-white/90 md:text-[14px]"
                              style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 5,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {speaker.bio}
                            </p>
                          </div>
                        </article>
                      </div>
                    ))}
                  </div>
                </div>

                {maxSpeakerIndex > 0 ? (
                  <>
                    <button
                      type="button"
                      onClick={goToPreviousSpeakerSlide}
                      aria-label="Slide anterior de palestrantes"
                      className="absolute left-2 top-1/2 z-10 -translate-y-1/2 text-[#F5C02B] transition hover:scale-110 hover:text-[#FFD45A] md:left-3"
                    >
                      <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.4} />
                    </button>
                    <button
                      type="button"
                      onClick={goToNextSpeakerSlide}
                      aria-label="Próximo slide de palestrantes"
                      className="absolute right-2 top-1/2 z-10 -translate-y-1/2 text-[#F5C02B] transition hover:scale-110 hover:text-[#FFD45A] md:right-3"
                    >
                      <ChevronRight className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.4} />
                    </button>

                  </>
                ) : null}
              </div>
            ) : (
              <div className="mx-auto mt-6 h-[270px] w-full max-w-[920px] rounded-xl border border-[#5A4718]/40 bg-black/40" />
            )}
          </section>
        </div>
    </section>
  );
};

export default NewVendasHero;
