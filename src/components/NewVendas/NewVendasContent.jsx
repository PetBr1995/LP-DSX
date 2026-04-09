import { useEffect, useState } from "react";
import PassaporteVendasHomeTeste from "../HomeTesteComponentes/PassaporteVendasHomeTeste";
import PassaportesMobileHomeTeste from "../HomeTesteComponentes/PassaportesMobileHomeTeste";
import PassaporteGrupoHomeTeste from "../HomeTesteComponentes/PassaporteGrupoHomeTeste";

const painPoints = [
  "Seu concorrente esta crescendo e voce nao entende como",
  "Investe em marketing mas nao ve retorno previsivel",
  "Sua empresa depende 100% de indicacao e boca a boca",
  "Quer usar IA e novas ferramentas mas nao sabe por onde comecar",
  "Sente que falta estrategia, direcao e as conexoes certas",
];

const tracks = [
  {
    icon: "💰",
    title: "Vendas",
    description: "Atrair, negociar e fechar contratos maiores",
  },
  {
    icon: "📊",
    title: "Marketing & Performance",
    description: "Trafego pago, funis e automacoes",
  },
  {
    icon: "🎯",
    title: "Posicionamento & Branding",
    description: "Seja referencia e destaque sua marca",
  },
  {
    icon: "🤖",
    title: "Inteligencia Artificial",
    description: "Automatize e escale com IA",
  },
  {
    icon: "📈",
    title: "Ferramentas de Crescimento",
    description: "Estrategias e tecnologias de escala",
  },
  {
    icon: "🏢",
    title: "Gestao Comercial",
    description: "Processos, CRM e operacao",
  },
];

const featuredSpeakers = [
  {
    initials: "FM",
    name: "Fernando Miranda",
    role: "CEO de Financas",
    color: "bg-[#F06400]",
  },
  {
    initials: "NC",
    name: "Nicolas Charao",
    role: "Founder Vaga VTX",
    color: "bg-[#1E63B8]",
  },
  {
    initials: "RR",
    name: "Roberto Reis",
    role: "Relacoes Governamentais",
    color: "bg-[#3C7D2E]",
  },
  {
    initials: "JK",
    name: "Joao Kepler",
    role: "Investidor & Mentor",
    color: "bg-[#6B23A8]",
  },
  {
    initials: "FS",
    name: "Flavia Sassunkai",
    role: "Estrategista Digital",
    color: "bg-[#D52A2A]",
  },
];

const testimonials = [
  {
    tag: "Palestrante",
    quote:
      '"A energia do publico e a organizacao me surpreenderam. Um dos melhores eventos que ja participei no Norte."',
    author: "Palestrante DSX 2025",
  },
  {
    tag: "Expositor",
    quote:
      '"Fechei mais de 15 contatos comerciais em 2 dias. O retorno sobre o investimento foi imediato."',
    author: "Expositor DSX 2025",
  },
  {
    tag: "Participante",
    quote:
      '"Sai do DSX com uma visao completamente nova do meu negocio. As conexoes que fiz ja geraram 3 parcerias."',
    author: "Participante DSX 2025",
  },
];

const audienceProfiles = [
  {
    title: "Empresario",
    description: "Que precisa destravar o crescimento com estrategia e conexoes certas",
  },
  {
    title: "Gestor e lider",
    description: "Que toma decisoes e precisa de visao de mercado atualizada",
  },
  {
    title: "Profissional em ascensao",
    description: "Que busca networking qualificado e referencias de alto nivel",
  },
  {
    title: "Time de marketing e vendas",
    description: "Que precisa focar em performance, resultados e novas ferramentas",
  },
  {
    title: "Estudante e universitario",
    description: "Que quer acelerar a entrada no mercado com as conexoes certas",
  },
];

const faqItems = [
  {
    pergunta: "Quando acontece o DSX 2026?",
    resposta:
      "O DSX 2026 acontece nos dias 23 e 24 julho, no Centro de Convencoes Vasco Vasques em Manaus.",
  },
  {
    pergunta: "Para quem e o DSX?",
    resposta:
      "Para empresarios, gestores e lideres, profissionais em ascensao, times de marketing e vendas e estudantes/universitarios que querem acelerar repertorio, conexoes e decisoes com visao pratica de mercado.",
  },
  {
    pergunta: "Ja existe programacao e palestrantes confirmados?",
    resposta:
      "A curadoria ainda esta em construcao, porem, voce pode conferir as atuais presencas confirmadas em nosso perfil oficial @dsx.summit. Para acompanhar os anuncios oficiais, entre em nosso Grupo VIP no Whatsapp. Acesse o link para entrar:",
    link: "https://chat.whatsapp.com/GXEsJXjFNBi1a3LLAiG90R",
  },
  {
    pergunta: "Quais tipos de passaporte estarao disponiveis?",
    resposta:
      "Contamos com diferentes opcoes para perfis e objetivos, incluindo Standard, VIP, passaportes em grupo (10 e 5 pessoas), alem de condicoes especificas para estudantes e PCD.",
  },
  {
    pergunta: "O evento emite certificado?",
    resposta:
      "Sim. O DSX 2026 contara com certificado de participacao, com orientacoes de acesso e emissao informadas mais perto da data.",
  },
];

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

  return (
    <section className="border-t border-[#1C1C1C] bg-[#050505] pb-10 pt-8 text-white md:pb-14 md:pt-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="space-y-3">
          {painPoints.map((item) => (
            <div
              key={item}
              className="rounded-xl border border-[#1B1E23] bg-[#0B0D11] px-5 py-4 text-[14px] text-[#D8D8D8] md:text-[17px]"
            >
              <span className="mr-2 text-[#E23636]">✕</span>
              {item}
            </div>
          ))}
        </div>

        <p className="py-10 text-center text-[22px] font-semibold text-[#F5C02B] md:py-12 md:text-[34px]">
          No DSX, voce resolve tudo isso em 2 dias.
        </p>
      </div>

      <div className="border-t border-[#101010] bg-[#07090E] py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-[34px] font-extrabold leading-tight md:text-[52px]">
            6 trilhas de conteudo para{" "}
            <span className="text-[#F5C02B]">resultados reais</span>
          </h2>
          <p className="mt-2 text-center text-[15px] text-[#8F8F8F] md:mt-3 md:text-[20px]">
            Cada trilha foi desenhada para gerar acoes praticas no dia seguinte ao
            evento.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2">
            {tracks.map((track) => (
              <article
                key={track.title}
                className="rounded-xl border border-[#1A1E24] bg-[#101216] p-5 md:p-6"
              >
                <p className="text-[26px]">{track.icon}</p>
                <h3 className="mt-3 text-[23px] font-bold leading-tight text-white md:text-[30px]">
                  {track.title}
                </h3>
                <p className="mt-2 text-[14px] text-[#9EA3AB] md:text-[18px]">
                  {track.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-[#101010] bg-[#050505] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-[34px] font-extrabold leading-tight md:text-[50px]">
            Os principais nomes do mercado no palco do DSX
          </h2>
          <p className="mt-2 text-center text-[15px] text-[#8F8F8F] md:text-[20px]">
            Aprenda com quem transforma decisoes em resultados
          </p>

          <div className="mx-auto mt-10 flex max-w-5xl flex-wrap items-start justify-center gap-x-6 gap-y-8 md:gap-x-10">
            {featuredSpeakers.map((speaker, index) => (
              <article
                key={speaker.initials}
                className={`w-[130px] text-center md:w-[160px] ${
                  index === 4 ? "md:mt-2" : ""
                }`}
              >
                <div
                  className={`mx-auto flex h-[96px] w-[96px] items-center justify-center rounded-2xl border-2 border-[#F5C02B] text-[38px] font-extrabold text-white md:h-[112px] md:w-[112px] md:text-[42px] ${speaker.color}`}
                >
                  {speaker.initials}
                </div>
                <h3 className="mt-3 text-[15px] font-bold leading-tight text-[#F5C02B] md:text-[18px]">
                  {speaker.name}
                </h3>
                <p className="mt-1 text-[12px] text-[#8A8A8A] md:text-[14px]">{speaker.role}</p>
              </article>
            ))}
          </div>

          <p className="mt-10 text-center text-[14px] text-[#7F7F7F] md:text-[18px]">
            + dezenas de palestrantes confirmados para a edicao 2026
          </p>
        </div>
      </div>

      <div className="border-t border-[#101010] bg-[#080A0F] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-[35px] font-extrabold leading-tight md:text-[52px]">
            O DSX mudou o jogo para quem participou
          </h2>
          <p className="mt-2 text-center text-[15px] text-[#8F8F8F] md:text-[20px]">
            Depoimentos reais da edicao 2025
          </p>

          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
            {testimonials.map((item) => (
              <article
                key={item.quote}
                className="rounded-xl border border-[#1A1E24] bg-[#101216] p-5 md:p-6"
              >
                <span className="inline-flex rounded-md bg-[#241f0e] px-3 py-1 text-[11px] font-semibold text-[#F5C02B] md:text-[12px]">
                  {item.tag}
                </span>
                <p className="mt-4 text-[16px] leading-relaxed text-[#D9D9D9] md:text-[20px]">
                  {item.quote}
                </p>
                <p className="mt-4 text-[14px] font-semibold text-white md:text-[18px]">
                  {item.author}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-[#101010] bg-[#050505] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-[36px] font-extrabold leading-tight md:text-[52px]">
            O DSX e para voce que e...
          </h2>

          <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-3">
            {audienceProfiles.map((profile) => (
              <article
                key={profile.title}
                className="rounded-xl border border-[#3A2B03] bg-[#13100A] p-5 md:p-6"
              >
                <h3 className="text-[24px] font-bold leading-tight text-[#F5C02B] md:text-[30px]">
                  {profile.title}
                </h3>
                <p className="mt-3 text-[16px] leading-relaxed text-[#B4B4B4] md:text-[20px]">
                  {profile.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div
        id="passaportes"
        className="border-t border-[#101010] bg-[url(/ELEMENTOS-BANNER-2.png)] bg-cover bg-center bg-no-repeat"
      >
        {isMobile ? (
          <PassaportesMobileHomeTeste onBuyPassaporte={handleBuyPassaporte} />
        ) : (
          <PassaporteVendasHomeTeste onBuyPassaporte={handleBuyPassaporte} />
        )}
        <PassaporteGrupoHomeTeste onBuyPassaporte={handleBuyPassaporte} />
      </div>

      <div className="border-t border-[#101010] bg-[#050505] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-[36px] font-extrabold leading-tight md:text-[52px]">
            Perguntas frequentes
          </h2>
          <div className="mx-auto mt-10 max-w-5xl">
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index;
              const answerId = `faq-answer-${index}`;

              return (
                <article key={item.pergunta} className="border-b border-[#1B1B1B] py-5">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 text-left"
                    onClick={() =>
                      setOpenFaqIndex((current) => (current === index ? null : index))
                    }
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                  >
                    <h3 className="pr-4 text-[18px] font-semibold text-white md:text-[26px]">
                      {item.pergunta}
                    </h3>
                    <span
                      aria-hidden="true"
                      className={`grid h-8 w-8 place-items-center text-[#F5D247] transition duration-300 ease-in-out ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      <img src="/arrow-down.svg" alt="" className="h-5 w-5" />
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "mt-3 grid-rows-[1fr] opacity-100"
                        : "mt-0 grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p id={answerId} className="pr-8 text-[15px] text-[#A8A8A8] md:text-[18px]">
                        {item.resposta}
                      </p>
                      {item.link ? (
                        <div className="mt-3">
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-md border border-[#F5D247] px-3 py-2 text-sm font-semibold text-[#F5D247] transition hover:bg-[#F5D247] hover:text-black"
                          >
                            Entrar no grupo do WhatsApp
                            <span aria-hidden>↗</span>
                          </a>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <footer className="relative border-t border-[#2F260A] bg-[#050505] px-4 py-8">
        <div className="mx-auto max-w-6xl space-y-6 text-center">
          <p className="text-[12px] text-[#8A8A8A] md:text-[13px]">
            Pagamento 100% seguro · Parcelamento em ate 12x
          </p>

          <div className="border-t border-[#1A1A1A] pt-6">
            <p className="text-[11px] text-[#8A8A8A] md:text-[12px]">
              DSX — Digital Summit Experience © 2026 · Realizacao: Digital Hub
              Experience
            </p>
            <p className="mt-1 text-[11px] text-[#8A8A8A] md:text-[12px]">
              Este site nao faz parte do website do Facebook ou do Facebook Inc.
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default NewVendasContent;
