import { withHublaUtm } from "../../utils/hublaUtm";

const groupPassports = [
  {
    qtdPessoas: "5 pessoas",
    valor: "472,15",
    desconto: "5% OFF",
    desc: "Ideal para times menores que querem alinhar visão e execução no DSX.",
    bgClass: "from-[#0B0B0B] via-[#1B1409] to-[#3A280D]",
    blobClass: "bg-[#F5D247]/18",
    stripClass: "bg-[#E7A040]/20",
    link: "https://www.sympla.com.br/evento/dsx-2026-digital-summit-experience/3339721?_gl=1*2h3vo2*_gcl_au*MTEwOTMyNDE4MC4xNzczNzg0OTQ3*_ga*MTA3ODc3NDQ3NS4xNzczNzg0OTQ4*_ga_KXH10SQTZF*czE3NzUwMjA3ODckbzgkZzEkdDE3NzUwMjE0MjYkajYwJGwwJGgxMjMxOTk1NDE3",
  },
  {
    qtdPessoas: "10 pessoas",
    valor: "447,30",
    desconto: "10% OFF",
    desc: "Pacote para empresas que querem levar liderança e operação para a imersão.",
    bgClass: "from-[#111111] via-[#1A1A1A] to-[#2E2212]",
    blobClass: "bg-[#F3CB46]/14",
    stripClass: "bg-[#E7A040]/18",
    link: "https://www.sympla.com.br/evento/dsx-2026-digital-summit-experience/3339721?_gl=1*2h3vo2*_gcl_au*MTEwOTMyNDE4MC4xNzczNzg0OTQ3*_ga*MTA3ODc3NDQ3NS4xNzczNzg0OTQ4*_ga_KXH10SQTZF*czE3NzUwMjA3ODckbzgkZzEkdDE3NzUwMjE0MjYkajYwJGwwJGgxMjMxOTk1NDE3",
  },
];

const PassaporteGrupoHomeTeste = ({ onBuyPassaporte }) => {
  return (
    <section className="pb-10 pt-2 md:pb-14">
      <div className="mx-auto max-w-6xl px-4">
        <h3 className="text-center font-anton text-2xl uppercase text-white sm:text-3xl md:text-4xl">
          Passaporte em grupo
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-white/80 sm:text-base">
          Condições especiais para levar seu time inteiro e acelerar resultados
          juntos.
        </p>

        <div className="mt-7 flex flex-col items-center gap-4 md:flex-row md:flex-wrap md:justify-center md:gap-6">
          {groupPassports.map((item) => (
            <article
              key={item.qtdPessoas}
              className={`group relative w-full max-w-[460px] overflow-hidden rounded-[22px] bg-gradient-to-br p-5 transform-gpu [transform-style:preserve-3d] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:[transform:perspective(1100px)_rotateX(4deg)_rotateY(-4deg)_scale(1.03)] ${item.bgClass}`}
            >
              <div
                className={`absolute h-52 w-48 ${item.blobClass} transform-gpu ${
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
                className={`absolute h-20 w-52 bg-black/35 transform-gpu ${
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
                className={`absolute h-14 w-44 ${item.stripClass} transform-gpu ${
                  item.qtdPessoas === "5 pessoas"
                    ? "left-6 top-1/2 -translate-y-1/2 -rotate-12 rounded-lg"
                    : "right-6 top-1/2 -translate-y-1/2 rotate-12 rounded-lg"
                } will-change-transform transition-all duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  item.qtdPessoas === "5 pessoas"
                    ? "group-hover:translate-x-5 group-hover:-translate-y-1/2 group-hover:rotate-0 group-hover:scale-115"
                    : "group-hover:-translate-x-5 group-hover:-translate-y-1/2 group-hover:rotate-0 group-hover:scale-115"
                }`}
              />

              <div className="relative z-10 transform-gpu [transform-style:preserve-3d] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[transform:translate3d(0,-2px,28px)]">
                <span className="inline-block rounded-full border border-[#F5D247]/35 bg-black/25 px-3 py-1 text-xs font-semibold text-[#F5D247] transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[transform:translate3d(0,-2px,36px)]">
                  Em grupo
                </span>

                <h4 className="mt-4 origin-left text-3xl font-black uppercase leading-[0.95] text-white transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[transform:translate3d(0,-3px,44px)_scale(1.05)] sm:text-4xl">
                  {item.qtdPessoas}
                </h4>
                <p className="mt-2 inline-block rounded-full border border-[#F5D247]/35 bg-black/20 px-3 py-1 text-sm font-black uppercase text-[#F5D247]">
                  {item.desconto}
                </p>

                <p className="mt-3 origin-left bg-gradient-to-r from-[#F5D247] to-[#E7A040] bg-clip-text text-4xl font-black leading-[0.9] text-transparent transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[transform:translate3d(0,-4px,54px)_scale(1.08)] sm:text-5xl">
                  R$ {item.valor}
                </p>
                <p className="text-sm font-semibold uppercase text-white/90">
                  Por pessoa
                </p>

                <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base">
                  {item.desc}
                </p>

                <button
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
                  Comprar passaporte
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PassaporteGrupoHomeTeste;
