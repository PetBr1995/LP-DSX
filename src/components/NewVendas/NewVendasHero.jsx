import { useEffect, useRef, useState } from "react";
import NewVendasHeaderMask from "./NewVendasHeaderMask";
import { Calendar, ChevronLeft, ChevronRight, MapPin } from "lucide-react";

const metrics = [
  {
    target: 2000,
    label: "Participantes",
    prefix: "+",
    suffix: "",
    useThousands: true,
  },
  {
    target: 40,
    label: "Palestras",
    prefix: "+",
    suffix: "",
    useThousands: false,
  },
  {
    target: 30,
    label: "Expositores",
    prefix: "+",
    suffix: "",
    useThousands: false,
  },

];

const experienceHighlights = [
  { value: "3 PALCOS", label: "simultâneos" },
  { value: "VIP", label: "área exclusiva" },
  { value: "FEIRA", label: "de negócios" },
  { value: "PRAÇA", label: "de alimentação" },
];

const mainSpeakers = [
  {
    name: "João Branco",
    image: "/foto-joao-branco.png",
    bio: "O CMO que transformou o McDonald's em Méqui. Foram quase 10 anos na linha de frente, batendo absolutamente todos os recordes da história da marca no Brasil.",
  },
  {
    name: "João Kepler",
    image: "/novas-palestrantes/Joao-Kepler.png",
    bio: 'Autor de "O Poder do Equity" e "O Ponto Cego Empresarial". Ele não fala sobre crescimento isolado; ele desenha estratégias e amplia a visão de dezenas de grandes empresários. Você vai descobrir os problemas que o seu negócio tem e você não está enxergando.',
  },
  {
    name: "Netão Bom Beef",
    image: "/foto-netao-bom-beef.PNG",
    bio: "A verdadeira aula de escala física. Ele começou com um açougue de bairro. Hoje, fatura R$ 1 MILHÃO por dia. A trajetória real que vai virar aprendizado puro para quem quer construir um império.",
  },
  {
    name: "Fernando Miranda",
    image: "/novas-palestrantes/Fernando-Miranda.png",
    bio: "CEO da Staage e host do maior podcast de marketing do Brasil. Fernando liderou um crescimento de 40 vezes na unidade de educação da EXAME e traz a bagagem de gigantes como Banco do Brasil, XP e InfoMoney.",
  },
  {
    name: "Nicolas Charão",
    image: "/novas-palestrantes/Nicolas-Charao.png",
    bio: "O destravador de crescimento. Já ajudou mais de 50 negócios a cruzarem a barreira do primeiro milhão. Ele vai te provar que ter mais receita sem ter mais liberdade não é sucesso, é cilada.",
  },
  {
    name: "Giullya Becker",
    image: "/novas-palestrantes/GIULLYA-BECKER.png",
    bio: "Giullya Becker é publicitária e criadora do Método dos Conteúdos Magnéticos. Pioneira em oficinas práticas de criação, já formou milhares de alunos e se consolidou como referência em conteúdos que geram conexão e vendas com presença no digital.",
  },
  {
    name: "Carolina Lima",
    image: "/foto-carolina-lima.png",
    bio: "17 anos construindo estratégia de conteúdo para marcas de sucesso. Você vai entender de uma vez por todas a mecânica da atração.",
  },
  {
    name: "Roberto Reis",
    image: "/novas-palestrantes/Roberto-Reis.png",
    bio: "Estrategista eleitoral com 27 anos de atuação. Em 2026 tem eleição. E política move mercado, capital e negócio. Você vai entender quais regras vão mudar no seu setor.",
  },
  {
    name: "Afrânio Soares",
    image: "/palestrantes/AfranioSoares.png",
    bio: "Doutor em Administração e fundador da Action Pesquisas, é a maior referência em inteligência de mercado da região Norte há mais de 25 anos.",
  },
  {
    name: "Breno Maciel",
    image: "/foto-breno-maciel.png",
    bio: "CEO da Vanguarda Martech, maior agência de marketing do Norte, gerencia mais de R$ 60 milhões em verbas de marketing e é palestrante do RD Summit pelo terceiro ano consecutivo.",
  },
  {
    name: "Carlos Oshiro",
    image: "/foto-carlos-oshiro.png",
    bio: "Fundador da Targo Educação Empresarial, colunista na CBN e referência no ecossistema empresarial de Manaus há mais de 25 anos.",
  },
  {
    name: "Chay Santos",
    image: "/foto-chay-santos.png",
    bio: "CEO da Agência A Mangarataia e autora de Empreender Nunca Foi Sorte, especialista em branding estratégico e posicionamento de marcas.",
  },
  {
    name: "Clayton Pascarelli",
    image: "/foto-claytonpascarelli.png",
    bio: "Jornalista, apresentador de TV e especialista em PNL aplicada à oratória, é um dos rostos mais conhecidos da imprensa televisiva do Amazonas.",
  },
  {
    name: "Flávia Sausmikat",
    image: "/novas-palestrantes/Flavia-Sausmikat.png",
    bio: "Diretora-geral do Instituto Action de Pesquisas, atua há mais de duas décadas na análise de comportamentos sociais, eleitorais e de consumo em todo o Brasil.",
  },
  {
    name: "Fabricio Alva",
    image: "/palestrantes/FabricioAlva.png",
    bio: "Especialista em gestão empresarial com foco em estruturação de operações e processos que preparam empresas para escalar.",
  },
  {
    name: "Gisele Oshiro",
    image: "/novas-palestrantes/foto-giselle-oshiro.png",
    bio: "Empresária, especialista em inteligência emocional e apresentadora do podcast Mulheres que Inspiram na CBN.",
  },
  {
    name: "Magno Rodrigues",
    image: "/palestrantes/MagnoRodrigues.png",
    bio: "Educador financeiro e fundador da Pega Bizu, criador de uma metodologia própria que já ajudou centenas de negócios a construírem uma gestão financeira eficiente.",
  },
  {
    name: "Suelen Scop",
    image: "/palestrantes/SuellenScop.png",
    bio: "Psicóloga, diretora operacional da Singulari e especialista na aplicação prática de inteligência artificial em contextos reais de negócio.",
  },
];

const formatMetricValue = (value, metric) => {
  const baseValue = metric.useThousands
    ? value.toLocaleString("pt-BR")
    : String(value);
  return `${metric.prefix}${baseValue}${metric.suffix}`;
};

const NewVendasHero = ({
  ctaLink = "https://www.sympla.com.br/evento/dsx-2026-digital-summit-experience/3339721",
  onPrimaryCtaClick,
}) => {
  const [animatedValues, setAnimatedValues] = useState(metrics.map(() => 0));
  const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isDraggingSpeakers, setIsDraggingSpeakers] = useState(false);
  const speakerDragStartXRef = useRef(null);

  useEffect(() => {
    const duration = 1900;
    const start = performance.now();
    let frameId;

    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const nextValues = metrics.map((metric) =>
        Math.round(metric.target * easedProgress),
      );
      setAnimatedValues(nextValues);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, []);

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
    <section className="relative overflow-hidden bg-black text-white">
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[url(/[DSX]-Banner-Site-BG.png)] bg-cover bg-center bg-no-repeat opacity-40"
        aria-hidden="true"
      />
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
            <p className="text-center text-[clamp(1rem,4.8vw,2.6rem)] leading-[1.1] text-white/90">
              Dois dias de conteúdo estratégico e conexões de alto nível.
            </p>
          </div>
          <div>
            <h3 className="font-anton text-[clamp(1.3rem,2.8vw,2rem)] uppercase tracking-[0.03em]">
              Onde os maiores especialistas <br /> do país se encontram.
            </h3>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span><Calendar color="#F5C02B" /></span>
            <p className="text-center text-[clamp(.95rem,2.8vw,1.45rem)] leading-[1.2] text-white/90">
              23 e 24 de Julho
            </p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <span>
              <MapPin color="#F5C02B"/>
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

          <div id="newvendas-primary-cta" className="flex justify-center">
            <NewVendasHeaderMask
              titulo="COMPRAR PASSAPORTE"
              link={ctaLink}
              target="_blank"
              onClick={onPrimaryCtaClick}
              textColor="#FFFFFF"
              backgroundColor="#1E1A12"
              font="700"
              size="lg"
            />
          </div>

          <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-x-3 gap-y-5 px-2 py-2">
            {metrics.map((item, index) => (
              <div key={item.label} className="min-w-0 w-[30%] text-center">
                <p className="font-jamjuree font-extrabold text-[28px] leading-none tracking-normal text-white sm:text-[36px] md:text-[64px]">
                  {formatMetricValue(animatedValues[index] ?? 0, item)}
                </p>
                <p className="mt-1 font-jamjuree text-[11px] font-bold uppercase tracking-[0.02em] text-white md:text-[19px]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-2 grid w-full max-w-5xl grid-cols-2 gap-3 px-2 md:grid-cols-4 md:gap-4">
            {experienceHighlights.map((item) => (
              <div
                key={`${item.value}-${item.label}`}
                className="nv-highlight-wrap"
              >
                <div className="nv-highlight-inner px-3 py-3 text-center">
                  <p className="font-jamjuree font-extrabold leading-none text-[#F5C02B] text-[20px] md:text-[30px]">
                    {item.value}
                  </p>
                  <p className="mt-1 font-jamjuree text-[10px] font-bold uppercase tracking-[0.02em] text-white md:text-[14px]">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <section className="mx-auto mt-8 w-full max-w-6xl">
            <h3 className="text-center font-anton text-[clamp(1.3rem,4.2vw,2.8rem)] uppercase leading-[1.08] tracking-[0.03em] text-[#F5C02B]">
              Conheça os primeiros palestrantes confirmados do DSX
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
          </section>
        </div>
      </div>
    </section>
  );
};

export default NewVendasHero;
