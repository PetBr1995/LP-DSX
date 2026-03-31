import FaixaSegundoLoteHomeTeste from "./FaixaSegundoLoteHomeTeste";
import { withHublaUtm } from "../../utils/hublaUtm";

const cards = [
  {
    nome: "VIP",
    badge: "Premium",
    price: "1.297,00",
    desc: "Para quem quer viver o DSX com acesso completo e benefícios exclusivos.",
    bgClass: "from-[#0B0B0B] via-[#1B1409] to-[#3A280D]",
    blobClass: "bg-[#F5D247]/18",
    stripClass: "bg-[#E7A040]/20",
    link: "https://www.sympla.com.br/evento/dsx-2026-digital-summit-experience/3339721",
    benefits: [
      "Acesso aos 2 dias",
      "+40 palestras",
      "Certificado de participação",
      "Feira de negócios",
      "Networking qualificado",
      "Lounge VIP exclusivo",
      "Primeiras fileiras",
      "Kit premium",
    ],
  },
  {
    nome: "STANDARD",
    badge: "Essencial",
    price: "397,00",
    desc: "Para quem quer acesso aos 2 dias de conteúdo, conexões e feira de negócios.",
    bgClass: "from-[#111111] via-[#1A1A1A] to-[#2E2212]",
    blobClass: "bg-[#F3CB46]/14",
    stripClass: "bg-[#E7A040]/18",
    link: "https://www.sympla.com.br/evento/dsx-2026-digital-summit-experience/3339721",
    benefits: [
      "Acesso aos 2 dias",
      "+40 palestras",
      "Certificado de participação",
      "Feira de negócios",
      "Networking qualificado",
    ],
  },
];

const SquishyPlanCard = ({ card, onBuyPassaporte }) => (
  <article
    className={`group relative w-full max-w-[460px] overflow-hidden rounded-[22px] bg-gradient-to-br p-5 transform-gpu [transform-style:preserve-3d] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:[transform:perspective(1100px)_rotateX(4deg)_rotateY(-4deg)_scale(1.03)] lg:p-6 ${card.bgClass}`}
  >
    <div
      className={`absolute h-60 w-56 ${card.blobClass} transform-gpu ${
        card.nome === "VIP" ? "-top-16 right-6 rounded-[34%]" : "-top-14 left-5 rounded-[26px]"
      } will-change-transform transition-all duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        card.nome === "VIP"
          ? "group-hover:translate-y-8 group-hover:-translate-x-6 group-hover:scale-110"
          : "group-hover:translate-y-8 group-hover:translate-x-6 group-hover:scale-110"
      }`}
    />
    <div
      className={`absolute h-24 w-64 bg-black/35 transform-gpu ${
        card.nome === "VIP" ? "-bottom-9 left-5 rounded-[24px]" : "-bottom-9 right-5 rounded-[24px]"
      } will-change-transform transition-all duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        card.nome === "VIP"
          ? "group-hover:translate-x-8 group-hover:-translate-y-3 group-hover:scale-105"
          : "group-hover:-translate-x-8 group-hover:-translate-y-3 group-hover:scale-105"
      }`}
    />
    <div
      className={`absolute h-16 w-48 ${card.stripClass} transform-gpu ${
        card.nome === "VIP"
          ? "left-8 top-1/2 -translate-y-1/2 -rotate-12 rounded-xl"
          : "right-8 top-1/2 -translate-y-1/2 rotate-12 rounded-xl"
      } will-change-transform transition-all duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        card.nome === "VIP"
          ? "group-hover:translate-x-6 group-hover:-translate-y-1/2 group-hover:rotate-0 group-hover:scale-115"
          : "group-hover:-translate-x-6 group-hover:-translate-y-1/2 group-hover:rotate-0 group-hover:scale-115"
      }`}
    />

    <div className="relative z-10 transform-gpu [transform-style:preserve-3d] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[transform:translate3d(0,-2px,28px)]">
      <span className="inline-block rounded-full border border-[#F5D247]/35 bg-black/25 px-3 py-1 text-sm font-semibold text-[#F5D247] transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[transform:translate3d(0,-2px,36px)]">
        {card.badge}
      </span>

      <h3 className="mt-4 origin-left text-4xl font-black uppercase leading-[0.95] text-white transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[transform:translate3d(0,-3px,46px)_scale(1.05)] lg:text-5xl">
        {card.nome}
      </h3>

      <p className="mt-3 origin-left bg-gradient-to-r from-[#F5D247] to-[#E7A040] bg-clip-text text-4xl font-black leading-[0.9] text-transparent transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[transform:translate3d(0,-4px,58px)_scale(1.08)] lg:text-5xl">
        R$ {card.price}
      </p>
      <p className="text-base font-semibold uppercase text-white/90">Passaporte</p>

      <p className="mt-4 max-w-[36ch] text-base leading-relaxed text-white/92 lg:text-lg">
        {card.desc}
      </p>

      <button
        onClick={() => {
          const targetLink = withHublaUtm(card.link);
          if (onBuyPassaporte) {
            onBuyPassaporte(targetLink);
            return;
          }
          window.open(targetLink, "_blank");
        }}
        className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#F3CB46] to-[#E7A040] px-5 py-3 text-base font-black uppercase tracking-wide text-black transform-gpu transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:brightness-95 group-hover:[transform:translate3d(0,-2px,52px)]"
      >
        Comprar passaporte
      </button>

      <div className="mt-4 transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[transform:translate3d(0,-1px,32px)]">
        <ul className="space-y-2 rounded-xl bg-black/25 p-3">
          {card.benefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-2 text-xs text-white sm:text-sm">
              <span className="text-[#F5D247]">✓</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </article>
);

const PassaporteVendasHomeTeste = ({ onBuyPassaporte }) => {
  return (
    <section className="relative overflow-hidden py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center font-anton text-2xl uppercase leading-tight text-white sm:text-3xl md:text-4xl">
          Escolha seu passaporte DSX 2026
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-white/80 sm:text-base">
          Visual novo, mesma missão: colocar você dentro do evento que acelera negócios no Norte.
        </p>

        <FaixaSegundoLoteHomeTeste />

        <div className="mt-8 flex flex-wrap justify-center gap-3 lg:gap-4">
          {cards.map((card) => (
            <SquishyPlanCard key={card.nome} card={card} onBuyPassaporte={onBuyPassaporte} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PassaporteVendasHomeTeste;
