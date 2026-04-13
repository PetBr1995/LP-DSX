import { withHublaUtm } from "../../utils/hublaUtm";
import { Check } from "lucide-react";

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

const PassaportesMobileHomeTeste = ({ onBuyPassaporte }) => {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center font-anton text-2xl uppercase leading-tight text-white sm:text-3xl">
          GARANTA O SEU PASSAPORTE PARA 2 DIAS DE EVENTO
        </h2>
        <p className="mt-3 text-center text-base font-black uppercase tracking-[0.04em] text-[#F5C02B] sm:text-lg">
          VAGAS LIMITADAS
        </p>

        <div className="mt-8 flex flex-col items-center gap-4">
          {cards.map((card) => (
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
                {card.badge ? (
                  <p className="pointer-events-none absolute -right-40 top-0 z-20 flex h-7 w-100 rotate-[35deg] items-center justify-center whitespace-nowrap border-y border-red-500/60 bg-red-900/55 text-center text-[10px] font-black uppercase leading-none tracking-[0.08em] text-red-300 shadow-[0_6px_16px_rgba(0,0,0,0.35)] sm:-right-18 sm:w-64 sm:text-xs">
                    {card.badge}
                  </p>
                ) : (
                  <div className="h-[30px]" />
                )}

                <p className="mt-3 text-xs font-semibold text-white/90">
                  PASSAPORTE
                </p>
                <h3 className="mt-2 origin-left text-3xl font-black uppercase leading-[0.9] text-white transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[transform:translate3d(0,-3px,38px)_scale(1.05)] sm:text-4xl">
                  {card.nome}
                </h3>

                <div className="mt-4">
                  <ul className="space-y-2 rounded-xl bg-black/25 p-3">
                    {card.benefits
                      .filter((benefit) => benefit.included)
                      .map((benefit) => (
                      <li
                        key={benefit.label}
                        className="flex items-center gap-2 text-sm text-white"
                      >
                        <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full border border-[#22C55E]/70 bg-[#22C55E]/15 text-[#22C55E]">
                          <Check className="h-2.5 w-2.5" strokeWidth={3} />
                        </span>
                        <span>{benefit.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-4 origin-left bg-gradient-to-r from-[#F5D247] to-[#E7A040] bg-clip-text text-2xl font-black leading-[1] text-transparent whitespace-nowrap transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[transform:translate3d(0,-4px,46px)_scale(1.08)] sm:text-3xl">
                  {`R$ ${card.price} à vista`}
                </p>
                <p className="mt-2 text-xs font-semibold text-white/90">
                  {`ou em ${card.installment}`}
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
                  COMPRAR AGORA
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PassaportesMobileHomeTeste;
