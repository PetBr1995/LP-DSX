import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getSpeakerImageSources } from "./speakerImageUtils";

const mainSpeakers = [
  {
    name: "JoÃ£o Branco",
    image: "/foto-joao-branco.png",
    bio: "O CMO que transformou o McDonald's em MÃ©qui. Foram quase 10 anos na linha de frente, batendo absolutamente todos os recordes da histÃ³ria da marca no Brasil.",
  },
  {
    name: "JoÃ£o Kepler",
    image: "/novas-palestrantes/Joao-Kepler.png",
    bio: 'Autor de "O Poder do Equity" e "O Ponto Cego Empresarial". Ele nÃ£o fala sobre crescimento isolado; ele desenha estratÃ©gias e amplia a visÃ£o de dezenas de grandes empresÃ¡rios. VocÃª vai descobrir os problemas que o seu negÃ³cio tem e vocÃª nÃ£o estÃ¡ enxergando.',
  },
  {
    name: "NetÃ£o Bom Beef",
    image: "/foto-netao-bom-beef.PNG",
    bio: "A verdadeira aula de escala fÃ­sica. Ele comeÃ§ou com um aÃ§ougue de bairro. Hoje, fatura R$ 1 MILHÃƒO por dia. A trajetÃ³ria real que vai virar aprendizado puro para quem quer construir um impÃ©rio.",
  },
  {
    name: "Fernando Miranda",
    image: "/novas-palestrantes/Fernando-Miranda.png",
    bio: "CEO da Staage e host do maior podcast de marketing do Brasil. Fernando liderou um crescimento de 40 vezes na unidade de educaÃ§Ã£o da EXAME e traz a bagagem de gigantes como Banco do Brasil, XP e InfoMoney.",
  },
  {
    name: "Nicolas CharÃ£o",
    image: "/novas-palestrantes/Nicolas-Charao.png",
    bio: "O destravador de crescimento. JÃ¡ ajudou mais de 50 negÃ³cios a cruzarem a barreira do primeiro milhÃ£o. Ele vai te provar que ter mais receita sem ter mais liberdade nÃ£o Ã© sucesso, Ã© cilada.",
  },
  {
    name: "Giullya Becker",
    image: "/novas-palestrantes/GIULLYA-BECKER.png",
    bio: "Giullya Becker Ã© publicitÃ¡ria e criadora do MÃ©todo dos ConteÃºdos MagnÃ©ticos. Pioneira em oficinas prÃ¡ticas de criaÃ§Ã£o, jÃ¡ formou milhares de alunos e se consolidou como referÃªncia em conteÃºdos que geram conexÃ£o e vendas com presenÃ§a no digital.",
  },
  {
    name: "Carolina Lima",
    image: "/foto-carolina-lima.png",
    bio: "17 anos construindo estratÃ©gia de conteÃºdo para marcas de sucesso. VocÃª vai entender de uma vez por todas a mecÃ¢nica da atraÃ§Ã£o.",
  },
  {
    name: "Roberto Reis",
    image: "/novas-palestrantes/Roberto-Reis.png",
    bio: "Estrategista eleitoral com 27 anos de atuaÃ§Ã£o. Em 2026 tem eleiÃ§Ã£o. E polÃ­tica move mercado, capital e negÃ³cio. VocÃª vai entender quais regras vÃ£o mudar no seu setor.",
  },
  {
    name: "AfrÃ¢nio Soares",
    image: "/palestrantes/AfranioSoares.png",
    bio: "Doutor em AdministraÃ§Ã£o e fundador da Action Pesquisas, Ã© a maior referÃªncia em inteligÃªncia de mercado da regiÃ£o Norte hÃ¡ mais de 25 anos.",
  },
  {
    name: "Breno Maciel",
    image: "/foto-breno-maciel.png",
    bio: "CEO da Vanguarda Martech, maior agÃªncia de marketing do Norte, gerencia mais de R$ 60 milhÃµes em verbas de marketing e Ã© palestrante do RD Summit pelo terceiro ano consecutivo.",
  },
  {
    name: "Carlos Oshiro",
    image: "/foto-carlos-oshiro.png",
    bio: "Fundador da Targo EducaÃ§Ã£o Empresarial, colunista na CBN e referÃªncia no ecossistema empresarial de Manaus hÃ¡ mais de 25 anos.",
  },
  {
    name: "Chay Santos",
    image: "/foto-chay-santos.png",
    bio: "CEO da AgÃªncia A Mangarataia e autora de Empreender Nunca Foi Sorte, especialista em branding estratÃ©gico e posicionamento de marcas.",
  },
  {
    name: "FlÃ¡via Sausmikat",
    image: "/novas-palestrantes/Flavia-Sausmikat.png",
    bio: "Diretora-geral do Instituto Action de Pesquisas, atua hÃ¡ mais de duas dÃ©cadas na anÃ¡lise de comportamentos sociais, eleitorais e de consumo em todo o Brasil.",
  },
  {
    name: "Fabricio Alva",
    image: "/palestrantes/FabricioAlva.png",
    bio: "Especialista em gestÃ£o empresarial com foco em estruturaÃ§Ã£o de operaÃ§Ãµes e processos que preparam empresas para escalar.",
  },
  {
    name: "Gisele Oshiro",
    image: "/novas-palestrantes/foto-giselle-oshiro.png",
    bio: "EmpresÃ¡ria, especialista em inteligÃªncia emocional e apresentadora do podcast Mulheres que Inspiram na CBN.",
  },
  {
    name: "Magno Rodrigues",
    image: "/palestrantes/MagnoRodrigues.png",
    bio: "Educador financeiro e fundador da Pega Bizu, criador de uma metodologia prÃ³pria que jÃ¡ ajudou centenas de negÃ³cios a construÃ­rem uma gestÃ£o financeira eficiente.",
  },
  {
    name: "Suelen Scop",
    image: "/palestrantes/SuellenScop.png",
    bio: "PsicÃ³loga, diretora operacional da Singulari e especialista na aplicaÃ§Ã£o prÃ¡tica de inteligÃªncia artificial em contextos reais de negÃ³cio.",
  },
];

const NewVendasSpeakersSlider = () => {
  const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isDraggingSpeakers, setIsDraggingSpeakers] = useState(false);
  const speakerDragStartXRef = useRef(null);

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
  }, []);

  const maxSpeakerIndex = Math.max(mainSpeakers.length - cardsPerView, 0);

  useEffect(() => {
    if (maxSpeakerIndex === 0 || isDraggingSpeakers) return;

    const autoplayId = window.setInterval(() => {
      setCurrentSpeakerIndex((current) =>
        current >= maxSpeakerIndex ? 0 : current + 1,
      );
    }, 4200);

    return () => window.clearInterval(autoplayId);
  }, [maxSpeakerIndex, isDraggingSpeakers]);

  const goToNextSpeakerSlide = () => {
    setCurrentSpeakerIndex((current) =>
      current >= maxSpeakerIndex ? 0 : current + 1,
    );
  };

  const goToPreviousSpeakerSlide = () => {
    setCurrentSpeakerIndex((current) =>
      current <= 0 ? maxSpeakerIndex : current - 1,
    );
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
    <section className="mx-auto mt-8 w-full max-w-6xl">
      <h3 className="text-center font-anton text-[clamp(1.3rem,4.2vw,2.8rem)] uppercase leading-[1.08] tracking-[0.03em] text-[#F5C02B]">
        ConheÃ§a os primeiros palestrantes confirmados do DSX
      </h3>

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
                    {(() => {
                      const imageSources = getSpeakerImageSources(speaker.image);
                      return (
                        <picture>
                          {imageSources.avif ? (
                            <source srcSet={imageSources.avif} type="image/avif" />
                          ) : null}
                          {imageSources.webp ? (
                            <source srcSet={imageSources.webp} type="image/webp" />
                          ) : null}
                          <img
                            src={imageSources.fallback}
                            alt={speaker.name}
                            className="h-full w-full object-contain object-center"
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                            onDragStart={(event) => event.preventDefault()}
                          />
                        </picture>
                      );
                    })()}
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
              aria-label="PrÃ³ximo slide de palestrantes"
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 text-[#F5C02B] transition hover:scale-110 hover:text-[#FFD45A] md:right-3"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.4} />
            </button>
          </>
        ) : null}
      </div>
    </section>
  );
};

export default NewVendasSpeakersSlider;

