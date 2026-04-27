import { withHublaUtm } from "../../utils/hublaUtm";

import { rememberDsxFormOrigin } from "../../utils/formOrigin";

const groupPassports = [
  {
    lote: "Lote 4",
    qtdPessoas: "5 pessoas",
    valor: "662,15",
    installment: "12x de R$ 56,57",
    cash: "ou R$ 662,15 à vista (valor por participante)",
    desconto: "5% OFF",
    link: "https://www.sympla.com.br/evento/dsx-2026-digital-summit-experience/3339721?_gl=1*2h3vo2*_gcl_au*MTEwOTMyNDE4MC4xNzczNzg0OTQ3*_ga*MTA3ODc3NDQ3NS4xNzczNzg0OTQ4*_ga_KXH10SQTZF*czE3NzUwMjA3ODckbzgkZzEkdDE3NzUwMjE0MjYkajYwJGwwJGgxMjMxOTk1NDE3",
  },
  {
    lote: "Lote 4",
    qtdPessoas: "10 pessoas",
    valor: "627,30",
    installment: "12x de R$ 53,59",
    cash: "ou R$ 627,30 à vista (valor por participante)",
    desconto: "10% OFF",
    link: "https://www.sympla.com.br/evento/dsx-2026-digital-summit-experience/3339721?_gl=1*2h3vo2*_gcl_au*MTEwOTMyNDE4MC4xNzczNzg0OTQ3*_ga*MTA3ODc3NDQ3NS4xNzczNzg0OTQ4*_ga_KXH10SQTZF*czE3NzUwMjA3ODckbzgkZzEkdDE3NzUwMjE0MjYkajYwJGwwJGgxMjMxOTk1NDE3",
  },
];

const PassaporteGrupoHomeTeste = ({
  onBuyPassaporte,
  hideBuyButton = false,
}) => {
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

        <div className="mt-7 mx-auto grid w-full max-w-[1128px] grid-cols-1 justify-items-center gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
          {groupPassports.map((item) => (
            <article
              key={item.qtdPessoas}
              className="relative h-full min-h-[348px] w-full max-w-[360px] overflow-hidden rounded-[22px] border border-[#E7A040]/35 bg-[#161616] p-5"
            >
              <div className="relative z-10 flex h-full flex-col">
                <p className="mt-2 inline-block rounded-full border border-[#F5D247]/35 bg-black/20 px-3 py-1 text-xs font-black uppercase text-[#F5D247]">
                  {`PASSAPORTE ${item.qtdPessoas}`}
                </p>
                <div className="mt-2 inline-flex w-fit items-center gap-2 rounded-md border border-[#F5D247]/65 bg-gradient-to-r from-[#2D220A] via-[#4B3911] to-[#2D220A] px-3 py-1.5 shadow-[0_0_0_1px_rgba(245,210,71,0.2),0_8px_18px_rgba(0,0,0,0.35)]">
                  <span className="h-2 w-2 rounded-full bg-[#F5D247]" />
                  <span className="text-[11px] font-black uppercase tracking-[0.12em] text-[#FFE27A]">
                    {item.lote}
                  </span>
                </div>
                <h4 className="mt-4 text-xl font-black uppercase leading-[0.95] text-white sm:text-2xl">
                  EM GRUPO {item.desconto}
                </h4>
                <div className="mt-5">
                  <p className="bg-gradient-to-r from-[#F5D247] to-[#E7A040] bg-clip-text text-lg font-black leading-[1] text-transparent sm:text-xl">
                    {`R$ ${item.valor} à vista (por pessoa)`}
                  </p>
                  <p className="mt-2 text-[11px] font-semibold text-white/90 sm:text-xs">
                    {`ou em ${item.installment}`}
                  </p>

                  {!hideBuyButton ? (
                    <button
                      data-cta="sympla"
                      onClick={() => {
                        const targetLink = withHublaUtm(item.link);
                        const formOrigin = `Grupo ${item.qtdPessoas}`;
                        rememberDsxFormOrigin(formOrigin);
                        if (onBuyPassaporte) {
                          onBuyPassaporte(targetLink, formOrigin);
                          return;
                        }
                        window.location.href = targetLink;
                      }}
                      className="mt-5 w-full rounded-xl bg-gradient-to-r from-[#F3CB46] to-[#E7A040] px-5 py-3 text-xs font-black uppercase tracking-wide text-black sm:text-sm"
                    >
                      COMPRAR AGORA
                    </button>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
          <article className="relative h-full min-h-[348px] w-full max-w-[360px] overflow-hidden rounded-[22px] border border-[#E7A040]/35 bg-[#161616] p-5">
            <div className="flex h-full flex-col items-center justify-center text-center">
              <h4 className="font-anton text-xl uppercase text-[#F5C02B] sm:text-2xl">
                + DE 10 PESSOAS
              </h4>
              <p className="mt-3 font-jamjuree text-sm font-bold text-white sm:text-base">
                Condição comercial exclusiva
              </p>
              <p className="mt-3 max-w-[26ch] font-jamjuree text-xs leading-relaxed text-white/85 sm:text-sm">
                Fale diretamente com o nosso comercial e garanta a melhor
                condição para o seu time.
              </p>
              <a
                href="https://wa.me/5592985723838"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 font-jamjuree text-sm font-bold text-white md:text-base"
                aria-label="Falar no WhatsApp"
              >
                <img
                  src="/whatsapp.svg"
                  alt="WhatsApp"
                  className="h-5 w-5 object-contain"
                  loading="lazy"
                  decoding="async"
                />
                (92) 98572-3838
              </a>
            </div>
          </article>
        </div>

        <p className="mt-8 text-center font-jamjuree text-sm font-semibold text-white/85 md:text-base">
          Desconto válido para o Passaporte Standard.
        </p>
      </div>
    </section>
  );
};

export default PassaporteGrupoHomeTeste;
