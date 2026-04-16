import { useMemo, useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import NewVendasHeaderMask from "../components/NewVendas/NewVendasHeaderMask";

const audienceItems = [
  {
    title: "Empresário",
    description:
      "que precisa destravar o crescimento da sua empresa com estratégia.",
  },
  {
    title: "Gestor e líder",
    description:
      "que tomam decisões e desejam mais clareza, método e visão de mercado.",
  },
  {
    title: "Profissional em ascensão",
    description:
      "que busca networking qualificado e referências de alto nível.",
  },
  {
    title: "Time de marketing e vendas",
    description:
      "que precisam focar em performance e resultado.",
  },
  {
    title: "Estudante e universitário",
    description:
      "que buscam acelerar o repertório e se conectar com o mercado de trabalho.",
  },
];

const galleryItems = [
  { src: "/img-ambiantes/amb-1.png", alt: "Networking entre participantes" },
  { src: "/img-ambiantes/amb-2.png", alt: "Discussões estratégicas no evento" },
  { src: "/img-ambiantes/amb-3.png", alt: "Palestra com plateia" },
  { src: "/img-ambiantes/amb-4.png", alt: "Conteúdo em palco principal" },
  { src: "/img-ambiantes/amb-5.png", alt: "Conversa sobre negócios" },
  { src: "/img-ambiantes/amb-6.png", alt: "Momentos de conexão no DSX" },
  { src: "/img-ambiantes/amb-7.png", alt: "Perguntas e respostas no auditório" },
  { src: "/img-ambiantes/amb-3.png", alt: "Painel com executivos" },
  { src: "/img-ambiantes/amb-2.png", alt: "Interação entre palestrantes" },
  { src: "/img-ambiantes/amb-1.png", alt: "Trocas em ambiente premium" },
];
const galleryTopRow = galleryItems.slice(0, 5);
const galleryBottomRow = galleryItems.slice(5, 10);

const faqItems = [
  {
    question: "O DSX é para o meu perfil de negócio?",
    answer:
      "Se você é dono de empresa, líder de equipe, profissional autônomo ou executivo buscando crescimento escalável e conexões de alto nível, o DSX é para você.",
  },
  {
    question: "Posso comprar agora e trocar o nome do participante depois?",
    answer:
      "Sim. A titularidade do passaporte pode ser alterada entrando em contato com o suporte após a compra.",
  },
  {
    question: "Quais são as formas de pagamento?",
    answer:
      "Você pode garantir o seu passaporte via PIX (aprovação imediata) ou parcelar no cartão de crédito em até 12 vezes.",
  },
  {
    question: "A feira de negócios está inclusa em todos os passaportes?",
    answer:
      "Sim. Tanto o passaporte Standard quanto o VIP dão acesso à feira e às ativações de marca durante o evento.",
  },
  {
    question: "Qual a diferença principal do VIP?",
    answer:
      "O VIP inclui benefícios exclusivos, como área reservada, melhor experiência presencial e ambiente ideal para networking estratégico.",
  },
];

const CHECKOUT_LINK =
  "https://www.sympla.com.br/evento/dsx-2026-digital-summit-experience/3339721";
const DSX_SECTION_IMAGE =
  "/optimized/step1/optimized/banner-public-component.avif";

const CheckoutVendas = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const yearLabel = useMemo(() => new Date().getFullYear(), []);

  return (
    <main className="bg-black text-white">
      <section className="relative overflow-hidden px-4 pb-14 pt-10 md:px-8 md:pb-20 md:pt-14">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 14% 12%, rgba(245,192,43,0.25), transparent 40%), radial-gradient(circle at 80% 20%, rgba(0,158,64,0.2), transparent 38%)",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto grid w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/10 bg-[#0B0B0B] md:grid-cols-2">
          <div className="flex flex-col justify-center px-5 py-8 md:px-10 md:py-12">
            <div className="inline-flex w-fit rounded-sm bg-[#0A0A0A] px-2 py-1">
              <img
                src="/logo-dsx-vertical.svg"
                alt="DSX 2026"
                className="h-12 w-auto object-contain md:h-14"
                loading="eager"
                decoding="async"
              />
            </div>
            <h1 className="mt-4 max-w-xl font-anton text-[clamp(2rem,6vw,2.5rem)] uppercase leading-[1.05]">
              O maior evento de negócios, marketing, vendas e inovação do Norte
            </h1>
            <p className="mt-4 max-w-lg text-[1.02rem] leading-relaxed text-white/80">
              Dois dias de conteúdo estratégico e conexões de alto nível.
            </p>
            <h2 className="mt-4 font-anton text-[clamp(1.2rem,2.8vw,1.8rem)] uppercase tracking-[0.02em] text-white">
              Onde os maiores especialistas do país se encontram.
            </h2>

            <div className="mt-4 space-y-2 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar size={18} color="#F5C02B" />
                <p className="font-jamjuree text-[0.98rem] leading-relaxed">
                  23 e 24 de Julho
                </p>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={18} color="#F5C02B" className="mt-0.5 shrink-0" />
                <p className="font-jamjuree text-[0.98rem] leading-relaxed">
                  Centro de Convenções Vasco Vasques, Manaus/AM
                </p>
              </div>
            </div>

            <div id="newvendas-primary-cta" className="mt-7">
              <NewVendasHeaderMask
                titulo="COMPRAR PASSAPORTE"
                link={CHECKOUT_LINK}
                target="_blank"
                textColor="#FFFFFF"
                backgroundColor="#1E1A12"
                font="700"
                size="lg"
              />
            </div>
          </div>

          <div className="relative min-h-[320px] md:min-h-full">
            <img
              src="/Banner-vendas-hero.png"
              alt="Palestrantes convidados no palco do DSX"
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-black/10" />
          </div>
        </div>
      </section>

      <section className="bg-[#ECECEC] px-4 py-14 text-black md:px-8 md:py-20">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-center font-anton text-[clamp(2rem,5vw,3rem)] uppercase leading-none">
            O DSX é para você...
          </h2>

          <div className="mt-8 overflow-hidden rounded-[26px] border border-black/10 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
            <img
              src={DSX_SECTION_IMAGE}
              alt="Mesa de debate no DSX"
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {audienceItems.map((item) => (
              <article key={item.title} className="rounded-2xl bg-white p-4 shadow-[0_10px_22px_rgba(0,0,0,0.08)]">
                <img
                  src="/vector-19.svg"
                  alt=""
                  aria-hidden="true"
                  className="mb-3 h-6 w-6 object-contain"
                  loading="lazy"
                  decoding="async"
                />
                <p className="font-jamjuree text-[1.02rem] leading-relaxed text-[#1A1A1A]">
                  <strong>{item.title}</strong> {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-black px-4 py-14 md:px-8 md:py-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 12% 85%, rgba(0,183,255,0.18), transparent 34%), radial-gradient(circle at 83% 5%, rgba(245,192,43,0.16), transparent 32%)",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto w-full max-w-7xl">
          <h2 className="text-center font-anton text-[clamp(2rem,6vw,3.7rem)] uppercase leading-none">
            O Ambiente que gera negócios reais
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-relaxed text-white/75 md:text-lg">
            Conteúdo aplicado, conexões de alto nível e experiências que aproximam
            decisores, marcas e oportunidades em um único lugar.
          </p>

          <div className="mt-10 space-y-4">
            <div className="faixa-wrapper">
              <div className="faixa-track gap-4">
                {[...galleryTopRow, ...galleryTopRow].map((item, index) => (
                  <div
                    key={`top-${item.src}-${index}`}
                    className="group w-[220px] shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-[#0E0E0E] md:w-[250px]"
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="h-[180px] w-full object-cover transition duration-500 group-hover:scale-105 md:h-[200px]"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="faixa-wrapper">
              <div className="faixa-track-fast gap-4" style={{ animationDirection: "reverse" }}>
                {[...galleryBottomRow, ...galleryBottomRow].map((item, index) => (
                  <div
                    key={`bottom-${item.src}-${index}`}
                    className="group w-[220px] shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-[#0E0E0E] md:w-[250px]"
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="h-[180px] w-full object-cover transition duration-500 group-hover:scale-105 md:h-[200px]"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0A0A0A] px-4 pb-16 pt-14 md:px-8 md:pb-20 md:pt-20">
        <div className="mx-auto w-full max-w-4xl">
          <h2 className="text-center font-anton text-[clamp(2rem,5vw,3rem)] uppercase leading-none">
            Perguntas frequentes
          </h2>

          <div className="mt-8 rounded-2xl border border-[#2B2B2B] bg-[#121212] p-2 md:p-3">
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index;

              return (
                <article
                  key={item.question}
                  className="border-b border-[#2B2B2B] px-3 py-4 last:border-b-0 md:px-4"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 text-left"
                    onClick={() =>
                      setOpenFaqIndex((current) =>
                        current === index ? -1 : index,
                      )
                    }
                    aria-expanded={isOpen}
                  >
                    <h3 className="font-jamjuree text-lg font-semibold leading-snug text-white md:text-[1.35rem]">
                      {item.question}
                    </h3>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#3B3B3B] text-[#F5C02B] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    >
                      <img src="/arrow-down.svg" alt="" className="h-4 w-4" />
                    </span>
                  </button>

                  <div
                    className={`grid overflow-hidden transition-all duration-300 ${
                      isOpen
                        ? "mt-3 grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <p className="overflow-hidden font-jamjuree text-[1rem] leading-relaxed text-white/80">
                      {item.answer}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="mt-8 text-center font-jamjuree text-sm text-white/45">
            DSX {yearLabel}. Todos os direitos reservados.
          </p>
        </div>
      </section>
    </main>
  );
};

export default CheckoutVendas;
