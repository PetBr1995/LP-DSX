import CTAButton from "../Mascaras/CTAButton";

const DsxParaVoce = () => {
  const infCard1 = [
    {
      icon: "/person-green.svg",
      desc: "Empresário que deseja destravar o crescimento e alcançar o próximo nível da sua empresa em 2026.",
    },
    {
      icon: "/medal.svg",
      desc: "Gestor ou líder que toma decisões importantes, buscando mais clareza, método e leitura de mercado",
    },
    {
      icon: "/lamp.svg",
      desc: "Profissional em ascensão que entende o valor de networking qualificado e referências de alto nível",
    },
  ];

  const infCard2 = [
    {
      icon: "/people.svg",
      desc: "Times de marketing e vendas que precisam sair do operacional e focar em performance e resultado",
    },
    {
      icon: "/studant.svg",
      desc: "Estudante que quer acelerar repertório, visão prática e conexão com o mercado",
    },
  ];

  return (
    <section
      className="
  py-10 relative overflow-hidden
  after:absolute after:inset-0
  after:content-['']
  after:bg-[url(/banner-dsx-para-voce.png)]
  after:bg-cover after:bg-center after:bg-no-repeat
  after:z-0
  after:brightness-75
"
    >
      {/* Título */}
      <h2 className="text-white relative z-10 font-anton uppercase text-4xl sm:text-5xl md:text-6xl text-center">
        O DSX é para você…
      </h2>

      <div className="relative z-10 max-w-7xl mx-auto mt-10 px-4 flex flex-col gap-6">
        {/* LINHA 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center">
          {infCard1.map((inf, index) => (
            <div
              key={index}
              className="
                border border-white rounded-md
                p-6
                flex flex-col justify-center gap-4
                bg-black/40 backdrop-blur-sm
                w-full max-w-[380px]
                min-h-[190px]
              "
            >
              <img src={inf.icon} alt="icon" className="w-15 h-15" />

              <p className="text-white text-sm leading-relaxed">{inf.desc}</p>
            </div>
          ))}
        </div>

        {/* LINHA 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center max-w-[820px] mx-auto">
          {infCard2.map((inf, index) => (
            <div
              key={index}
              className="
                border border-white rounded-md
                p-6
                flex flex-col justify-center gap-4
                bg-black/40 backdrop-blur-sm
                w-full max-w-[380px]
                min-h-[190px]
              "
            >
              <img src={inf.icon} alt="icon" className="w-15 h-15" />

              <p className="text-white text-sm leading-relaxed">{inf.desc}</p>
            </div>
          ))}
        </div>
        <div className="py-8">
          <CTAButton titulo="Quero meu passaporte" link="#"/>
        </div>
      </div>
    </section>
  );
};

export default DsxParaVoce;
