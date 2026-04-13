import { withHublaUtm } from "../../utils/hublaUtm";

const groupPassports = [
  {
    qtdPessoas: "5 pessoas",
    valor: "472,15",
    installment: "12x de R$ 244,16",
    cash: "ou R$ 472,15 à vista (valor por participante)",
    desconto: "5% OFF",
    bgClass: "from-[#0B0B0B] via-[#1B1409] to-[#3A280D]",
    blobClass: "bg-[#F5D247]/18",
    stripClass: "bg-[#E7A040]/20",
    link: "https://www.sympla.com.br/evento/dsx-2026-digital-summit-experience/3339721?_gl=1*2h3vo2*_gcl_au*MTEwOTMyNDE4MC4xNzczNzg0OTQ3*_ga*MTA3ODc3NDQ3NS4xNzczNzg0OTQ4*_ga_KXH10SQTZF*czE3NzUwMjA3ODckbzgkZzEkdDE3NzUwMjE0MjYkajYwJGwwJGgxMjMxOTk1NDE3",
  },
  {
    qtdPessoas: "10 pessoas",
    valor: "447,30",
    installment: "12x de R$ 462,61",
    cash: "ou R$ 447,30 à vista (valor por participante)",
    desconto: "10% OFF",
    bgClass: "from-[#111111] via-[#1A1A1A] to-[#2E2212]",
    blobClass: "bg-[#F3CB46]/14",
    stripClass: "bg-[#E7A040]/18",
    link: "https://www.sympla.com.br/evento/dsx-2026-digital-summit-experience/3339721?_gl=1*2h3vo2*_gcl_au*MTEwOTMyNDE4MC4xNzczNzg0OTQ3*_ga*MTA3ODc3NDQ3NS4xNzczNzg0OTQ4*_ga_KXH10SQTZF*czE3NzUwMjA3ODckbzgkZzEkdDE3NzUwMjE0MjYkajYwJGwwJGgxMjMxOTk1NDE3",
  },
];

const PassaporteGrupoHomeTeste = ({ onBuyPassaporte }) => {
  return (
    <section className="pb-10 pt-0 md:pb-14 md:pt-0">
      <div className="mx-auto max-w-6xl px-4">
        <h3 className="text-center font-anton text-2xl uppercase text-white sm:text-3xl md:text-4xl">
          LEVE O SEU TIME
        </h3>
        <div className="mx-auto mt-3 max-w-4xl space-y-3 text-center font-jamjuree text-sm text-white/85 sm:text-base">
          <p>
            Trazer seu time para o DSX é um investimento direto em performance.
          </p>
          <p>
            Dois dias fora do operacional, absorvendo estratégia real de quem
            está construindo negócios em escala.
          </p>
          <p>
            Eles voltam com repertório, visão e ferramentas para gerar mais
            resultado.
          </p>
        </div>
        <p className="mt-4 text-center font-jamjuree text-base font-bold text-[#F5C02B] sm:text-lg">
          Quanto maior o grupo, maior o desconto:
        </p>

        <div className="mt-7 flex flex-col items-center gap-4 md:flex-row md:flex-wrap md:justify-center md:gap-6">
          {groupPassports.map((item) => (
            <article
              key={item.qtdPessoas}
              className={`group aquarium-card relative w-full max-w-[460px] overflow-hidden rounded-[22px] bg-gradient-to-br p-5 transform-gpu [transform-style:preserve-3d] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:[transform:perspective(1100px)_rotateX(4deg)_rotateY(-4deg)_scale(1.03)] ${item.bgClass}`}
            >
              <div
                className={`absolute aquarium-blob-a h-52 w-48 ${item.blobClass} transform-gpu ${
                  item.qtdPessoas === "5 pessoas"
                    ? "-top-14 right-6 rounded-[34%]"
                    : "-top-12 left-5 rounded-[24px]"
                } will-change-transform transition-all duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  item.qtdPessoas === "5 pessoas"
                    ? "group-hover:translate-y-7 group-hover:-translate-x-5 group-hover:scale-110"
                    : "group-hover:translate-y-7 group-hover:translate-x-5 group-hover:scale-110"
                }`}
              />
              <div
                className={`absolute aquarium-blob-b h-20 w-52 bg-black/35 transform-gpu ${
                  item.qtdPessoas === "5 pessoas"
                    ? "-bottom-8 left-5 rounded-[22px]"
                    : "-bottom-8 right-5 rounded-[22px]"
                } will-change-transform transition-all duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  item.qtdPessoas === "5 pessoas"
                    ? "group-hover:translate-x-7 group-hover:-translate-y-3 group-hover:scale-105"
                    : "group-hover:-translate-x-7 group-hover:-translate-y-3 group-hover:scale-105"
                }`}
              />
              <div
                className={`absolute aquarium-blob-c h-14 w-44 ${item.stripClass} transform-gpu ${
                  item.qtdPessoas === "5 pessoas"
                    ? "left-6 top-1/2 -translate-y-1/2 -rotate-12 rounded-lg"
                    : "right-6 top-1/2 -translate-y-1/2 rotate-12 rounded-lg"
                } will-change-transform transition-all duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  item.qtdPessoas === "5 pessoas"
                    ? "group-hover:translate-x-5 group-hover:-translate-y-1/2 group-hover:rotate-0 group-hover:scale-115"
                    : "group-hover:-translate-x-5 group-hover:-translate-y-1/2 group-hover:rotate-0 group-hover:scale-115"
                }`}
              />

              <div className="relative z-10 aquarium-content transform-gpu [transform-style:preserve-3d] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[transform:translate3d(0,-2px,28px)]">
                <p className="mt-2 inline-block rounded-full border border-[#F5D247]/35 bg-black/20 px-3 py-1 text-sm font-black uppercase text-[#F5D247]">
                PASSAPORTE {item.qtdPessoas}
                </p>
                <h4 className="mt-4 origin-left text-2xl font-black uppercase leading-[0.95] text-white transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[transform:translate3d(0,-3px,44px)_scale(1.05)] sm:text-3xl">
                  EM GRUPO {item.desconto}
                </h4>

                <p className="mt-3 origin-left bg-gradient-to-r from-[#F5D247] to-[#E7A040] bg-clip-text text-xl font-black leading-[1] text-transparent transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[transform:translate3d(0,-4px,54px)_scale(1.08)] sm:text-2xl">
                  {`R$ ${item.valor} à vista (por pessoa)`}
                </p>
                <p className="mt-2 text-xs font-semibold text-white/90 sm:text-sm">
                  {`ou em ${item.installment}`}
                </p>

                <button
                  data-cta="sympla"
                  onClick={() => {
                    const targetLink = withHublaUtm(item.link);
                    if (onBuyPassaporte) {
                      onBuyPassaporte(targetLink);
                      return;
                    }
                    window.open(targetLink, "_blank");
                  }}
                  className="mt-5 w-full rounded-xl bg-gradient-to-r from-[#F3CB46] to-[#E7A040] px-5 py-3 text-sm font-black uppercase tracking-wide text-black transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[transform:translate3d(0,-2px,48px)] sm:text-base"
                >
                  COMPRAR AGORA
                </button>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center font-jamjuree text-sm font-semibold text-white/85 md:text-base">
          Desconto válido para o Passaporte Standard.
        </p>

        <div className="mx-auto mt-4 max-w-[450px] rounded-2xl border border-[#3A3222] bg-[#121212] px-5 py-6 text-center md:px-8">
          <h4 className="font-anton text-2xl uppercase text-[#F5C02B] md:text-3xl">
            GARANTIR PASSAPORTES DO TIME
          </h4>
          <p className="mt-4 font-jamjuree text-base font-bold text-white md:text-lg">
            Equipes maiores?
          </p>
          <p className="mx-auto mt-3 max-w-3xl font-jamjuree text-sm leading-relaxed text-white/85 md:text-base">
            Temos condições exclusivas para grupos acima de 10 pessoas. Fale
            diretamente com o nosso comercial e garanta a melhor condição para o
            seu time.
          </p>
          <div className="mt-4 flex justify-center">
            <a
              href="https://wa.me/5592985723838"
              target="_blank"
              rel="noreferrer"
              className="font-jamjuree text-sm font-semibold text-white/90 transition hover:text-white md:text-base"
            >
              92 98572-3838
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PassaporteGrupoHomeTeste;
