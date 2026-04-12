import { withHublaUtm } from "../../utils/hublaUtm";

const cards = [
  {
    nome: "VIP",
    price: "1.297,00",
    installment: "12x de R$ 134,14",
    cash: "ou R$ 1.297,00 à vista",
    badge: "MAIS VENDIDO",
    bgClass: "from-[#0B0B0B] via-[#1B1409] to-[#3A280D]",
    blobClass: "bg-[#F5D247]/18",
    stripClass: "bg-[#E7A040]/20",
    link: "https://www.sympla.com.br/evento/dsx-2026-digital-summit-experience/3339721?_gl=1*2h3vo2*_gcl_au*MTEwOTMyNDE4MC4xNzczNzg0OTQ3*_ga*MTA3ODc3NDQ3NS4xNzczNzg0OTQ4*_ga_KXH10SQTZF*czE3NzUwMjA3ODckbzgkZzEkdDE3NzUwMjE0MjYkajYwJGwwJGgxMjMxOTk1NDE3",
    benefits: [
      { label: "Lounge VIP exclusivo", included: true },
      { label: "Networking com decisores", included: true },
      { label: "Kit premium", included: true },
      { label: "Primeiras fileiras", included: true },
      { label: "2 dias de evento", included: true },
      { label: "+40 palestras", included: true },
      { label: "Feira de negócios", included: true },
      { label: "Certificado de participação", included: true },
    ],
  },
  {
    nome: "STANDARD",
    price: "497,00",
    installment: "12x de R$ 51,40",
    cash: "ou R$ 497,00 à vista",
    bgClass: "from-[#111111] via-[#1A1A1A] to-[#2E2212]",
    blobClass: "bg-[#F3CB46]/14",
    stripClass: "bg-[#E7A040]/18",
    link: "https://www.sympla.com.br/evento/dsx-2026-digital-summit-experience/3339721?_gl=1*2h3vo2*_gcl_au*MTEwOTMyNDE4MC4xNzczNzg0OTQ3*_ga*MTA3ODc3NDQ3NS4xNzczNzg0OTQ4*_ga_KXH10SQTZF*czE3NzUwMjA3ODckbzgkZzEkdDE3NzUwMjE0MjYkajYwJGwwJGgxMjMxOTk1NDE3",
    benefits: [
      { label: "Lounge VIP exclusivo", included: false },
      { label: "Networking com decisores", included: false },
      { label: "Kit premium", included: false },
      { label: "Primeiras fileiras", included: false },
      { label: "2 dias de evento", included: true },
      { label: "+40 palestras", included: true },
      { label: "Feira de negócios", included: true },
      { label: "Certificado de participação", included: true },
    ],
  },
];

const SquishyPlanCard = ({ card, onBuyPassaporte }) => (
  <article
    className={`group relative w-full max-w-[460px] overflow-hidden rounded-[22px] bg-gradient-to-br p-5 transform-gpu [transform-style:preserve-3d] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:[transform:perspective(1100px)_rotateX(4deg)_rotateY(-4deg)_scale(1.03)] lg:p-6 ${card.bgClass}`}
  >
    <div
      className={`absolute h-60 w-56 ${card.blobClass} transform-gpu ${
        card.nome === "VIP"
          ? "-top-16 right-6 rounded-[34%]"
          : "-top-14 left-5 rounded-[26px]"
      } will-change-transform transition-all duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        card.nome === "VIP"
          ? "group-hover:translate-y-8 group-hover:-translate-x-6 group-hover:scale-110"
          : "group-hover:translate-y-8 group-hover:translate-x-6 group-hover:scale-110"
      }`}
    />
    <div
      className={`absolute h-24 w-64 bg-black/35 transform-gpu ${
        card.nome === "VIP"
          ? "-bottom-9 left-5 rounded-[24px]"
          : "-bottom-9 right-5 rounded-[24px]"
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
      {card.badge ? (
        <p className="block text-center w-full rounded-full border border-red-600/50 bg-red-900/35 px-3 py-1.5 text-sm font-black uppercase tracking-[0.06em] text-red-500">
          {card.badge}
        </p>
      ) : (
        <div className="h-[30px]" />
      )}

      <p className="mt-3 text-sm font-semibold uppercase text-white/90">
        PASSAPORTE
      </p>
      <h3 className="mt-2 origin-left text-4xl font-black uppercase leading-[0.95] text-white transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[transform:translate3d(0,-3px,46px)_scale(1.05)] lg:text-5xl">
        {card.nome}
      </h3>

      <div className="mt-4 transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[transform:translate3d(0,-1px,32px)]">
        <ul className="space-y-2 rounded-xl bg-black/25 p-3">
          {card.benefits.map((benefit) => (
            <li
              key={benefit.label}
              className="flex items-center gap-2 text-xs text-white sm:text-sm"
            >
              <span>{benefit.included ? "✅" : "❌"}</span>
              <span>{benefit.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-4 origin-left bg-gradient-to-r from-[#F5D247] to-[#E7A040] bg-clip-text text-2xl font-black leading-[1] text-transparent whitespace-nowrap transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[transform:translate3d(0,-4px,58px)_scale(1.08)] lg:text-3xl">
        {card.installment}
      </p>
      <p className="mt-2 text-sm font-semibold uppercase text-white/90">
        {card.cash}
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
        className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#F3CB46] to-[#E7A040] px-5 py-3 text-base font-black uppercase tracking-wide text-black transform-gpu transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:brightness-95 group-hover:[transform:translate3d(0,-2px,52px)]"
      >
        COMPRAR AGORA
      </button>
    </div>
  </article>
);

const PassaporteVendasHomeTeste = ({ onBuyPassaporte }) => {
  return (
    <section className="relative overflow-hidden py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center font-anton text-2xl uppercase leading-tight text-white sm:text-3xl md:text-4xl">
          GARANTA O SEU PASSAPORTE PARA 2 DIAS DE EVENTO
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base font-black uppercase tracking-[0.04em] text-[#F5C02B] sm:text-lg">
          VAGAS LIMITADAS
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3 lg:gap-4">
          {cards.map((card) => (
            <SquishyPlanCard
              key={card.nome}
              card={card}
              onBuyPassaporte={onBuyPassaporte}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PassaporteVendasHomeTeste;
