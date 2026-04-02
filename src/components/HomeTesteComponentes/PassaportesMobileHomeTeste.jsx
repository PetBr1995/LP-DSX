import { useState } from "react";
import { ChevronDown } from "lucide-react";
import FaixaSegundoLoteHomeTeste from "./FaixaSegundoLoteHomeTeste";
import { withHublaUtm } from "../../utils/hublaUtm";

const cards = [
  {
    nome: "VIP",
    badge: "Premium",
    price: "1.297,00",
    desc: "Experiência completa com benefícios exclusivos para quem quer estar no centro das decisões.",
    bgClass: "from-[#0B0B0B] via-[#1B1409] to-[#3A280D]",
    blobClass: "bg-[#F5D247]/18",
    stripClass: "bg-[#E7A040]/20",
    link: "https://www.sympla.com.br/evento/dsx-2026-digital-summit-experience/3339721?_gl=1*2h3vo2*_gcl_au*MTEwOTMyNDE4MC4xNzczNzg0OTQ3*_ga*MTA3ODc3NDQ3NS4xNzczNzg0OTQ4*_ga_KXH10SQTZF*czE3NzUwMjA3ODckbzgkZzEkdDE3NzUwMjE0MjYkajYwJGwwJGgxMjMxOTk1NDE3",
    benefits: [
      "Acesso aos 2 dias",
      "+40 palestras",
      "Certificado de participação",
      "Networking qualificado",
      "Lounge VIP exclusivo",
      "Primeiras fileiras",
      "Kit premium",
    ],
  },
  {
    nome: "STANDARD",
    badge: "Essencial",
    price: "497,00",
    desc: "Ingresso ideal para viver os dois dias do DSX com conteúdo prático e conexões estratégicas.",
    bgClass: "from-[#111111] via-[#1A1A1A] to-[#2E2212]",
    blobClass: "bg-[#F3CB46]/14",
    stripClass: "bg-[#E7A040]/18",
    link: "https://www.sympla.com.br/evento/dsx-2026-digital-summit-experience/3339721?_gl=1*2h3vo2*_gcl_au*MTEwOTMyNDE4MC4xNzczNzg0OTQ3*_ga*MTA3ODc3NDQ3NS4xNzczNzg0OTQ4*_ga_KXH10SQTZF*czE3NzUwMjA3ODckbzgkZzEkdDE3NzUwMjE0MjYkajYwJGwwJGgxMjMxOTk1NDE3",
    benefits: [
      "Acesso aos 2 dias",
      "+40 palestras",
      "Certificado de participação",
      "Feira de negócios",
      "Networking qualificado",
    ],
  },
];

const PassaportesMobileHomeTeste = ({ onBuyPassaporte }) => {
  const [openCard, setOpenCard] = useState("VIP");

  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center font-anton text-2xl uppercase leading-tight text-white sm:text-3xl">
          Esteja onde os grandes nomes decidem o futuro dos negócios.
        </h2>
        <p className="mt-3 text-center text-base text-white/80 sm:text-lg">
          Sua experiência começa aqui
        </p>

        <FaixaSegundoLoteHomeTeste />

        <div className="mt-8 flex flex-col items-center gap-4">
          {cards.map((card) => {
            const isOpen = openCard === card.nome;

            return (
              <article
                key={card.nome}
                className={`group aquarium-card relative mx-auto w-full max-w-[420px] overflow-hidden rounded-[22px] bg-gradient-to-br p-4 transform-gpu [transform-style:preserve-3d] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:[transform:perspective(1000px)_rotateX(3deg)_rotateY(-3deg)_scale(1.03)] ${card.bgClass}`}
              >
                <div
                  className={`absolute aquarium-blob-a h-52 w-48 ${card.blobClass} transform-gpu ${
                    card.nome === "VIP"
                      ? "-top-14 right-4 rounded-[34%]"
                      : "-top-12 left-4 rounded-[24px]"
                  } will-change-transform transition-all duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    card.nome === "VIP"
                      ? "group-hover:translate-y-7 group-hover:-translate-x-4 group-hover:scale-110"
                      : "group-hover:translate-y-7 group-hover:translate-x-4 group-hover:scale-110"
                  }`}
                />
                <div
                  className={`absolute aquarium-blob-b h-20 w-52 bg-black/35 transform-gpu ${
                    card.nome === "VIP"
                      ? "-bottom-7 left-4 rounded-[22px]"
                      : "-bottom-7 right-4 rounded-[22px]"
                  } will-change-transform transition-all duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    card.nome === "VIP"
                      ? "group-hover:translate-x-7 group-hover:-translate-y-2 group-hover:scale-105"
                      : "group-hover:-translate-x-7 group-hover:-translate-y-2 group-hover:scale-105"
                  }`}
                />
                <div
                  className={`absolute aquarium-blob-c h-14 w-42 ${card.stripClass} transform-gpu ${
                    card.nome === "VIP"
                      ? "left-5 top-1/2 -translate-y-1/2 -rotate-12 rounded-lg"
                      : "right-5 top-1/2 -translate-y-1/2 rotate-12 rounded-lg"
                  } will-change-transform transition-all duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    card.nome === "VIP"
                      ? "group-hover:translate-x-5 group-hover:-translate-y-1/2 group-hover:rotate-0 group-hover:scale-115"
                      : "group-hover:-translate-x-5 group-hover:-translate-y-1/2 group-hover:rotate-0 group-hover:scale-115"
                  }`}
                />

                <div className="relative z-10 aquarium-content transform-gpu [transform-style:preserve-3d] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[transform:translate3d(0,-2px,24px)]">
                  <h3 className="mt-4 origin-left text-3xl font-black uppercase leading-[0.9] text-white transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[transform:translate3d(0,-3px,38px)_scale(1.05)] sm:text-4xl">
                    {card.nome}
                  </h3>
                  <p className="mt-2 origin-left bg-gradient-to-r from-[#F5D247] to-[#E7A040] bg-clip-text text-4xl font-black leading-[0.9] text-transparent transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[transform:translate3d(0,-4px,46px)_scale(1.08)] sm:text-5xl">
                    R$ {card.price}
                  </p>
                  <p className="text-sm font-semibold uppercase text-white/90">
                    Passaporte
                  </p>

                  <p className="mt-4 text-base leading-relaxed text-white/92">
                    {card.desc}
                  </p>

                  <button
                    data-cta="sympla"
                    onClick={() => {
                      const targetLink = withHublaUtm(card.link);
                      if (onBuyPassaporte) {
                        onBuyPassaporte(targetLink);
                        return;
                      }
                      window.open(targetLink, "_blank");
                    }}
                    className="mt-5 w-full rounded-xl bg-gradient-to-r from-[#F3CB46] to-[#E7A040] px-4 py-3 text-sm font-black uppercase tracking-wide text-black transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[transform:translate3d(0,-2px,40px)] sm:text-base"
                  >
                    Comprar passaporte
                  </button>

                  <button
                    onClick={() => setOpenCard(isOpen ? "" : card.nome)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 bg-black/20 px-3 py-2 text-sm font-semibold uppercase text-white"
                    aria-label={
                      isOpen ? "Ocultar benefícios" : "Mostrar benefícios"
                    }
                  >
                    Benefícios
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen
                        ? "mt-3 max-h-[480px] opacity-100"
                        : "max-h-0 opacity-0"
                    } group-hover:[transform:translate3d(0,-1px,24px)]`}
                  >
                    <ul className="space-y-2 rounded-xl bg-black/25 p-3">
                      {card.benefits.map((benefit) => (
                        <li
                          key={benefit}
                          className="flex items-center gap-2 text-sm text-white"
                        >
                          <span className="text-[#F5D247]">✓</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PassaportesMobileHomeTeste;
