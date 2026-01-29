import CTAButton from "../Mascaras/CTAButton";

const Temas = () => {
  const inf = [
    {
      titulo: "Empreendedorismo e Negócios",
      desc: "Estratégia, visão e decisões para construir empresas mais sólidas, escaláveis e preparadas para crescer com consistência.",
    },
    {
      titulo: "Empreendedorismo e Negócios",
      desc: "Estratégia, visão e decisões para construir empresas mais sólidas, escaláveis e preparadas para crescer com consistência.",
    },
    {
      titulo: "Empreendedorismo e Negócios",
      desc: "Estratégia, visão e decisões para construir empresas mais sólidas, escaláveis e preparadas para crescer com consistência.",
    },
    {
      titulo: "Empreendedorismo e Negócios",
      desc: "Estratégia, visão e decisões para construir empresas mais sólidas, escaláveis e preparadas para crescer com consistência.",
    },
    {
      titulo: "Empreendedorismo e Negócios",
      desc: "Estratégia, visão e decisões para construir empresas mais sólidas, escaláveis e preparadas para crescer com consistência.",
    },
    {
      titulo: "Empreendedorismo e Negócios",
      desc: "Estratégia, visão e decisões para construir empresas mais sólidas, escaláveis e preparadas para crescer com consistência.",
    },
  ];

  return (
    <section
      className="
        relative overflow-hidden
        py-16
        bg-[url(/fundo-temas.png)]
        bg-cover bg-center bg-no-repeat
      "
    >
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/80 z-0" />

      {/* Conteúdo */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Título */}
        <h2 className=" leading-1.3 sm:1.6 md:1.6 lg:1.7 text-white text-center font-anton uppercase text-4xl sm:text-5xl md:text-6xl">
          Os temas que movem decisões,
          <br />
          crescimento e resultados
        </h2>

        <p className="tracking-widest text-white text-center mt-4 uppercase text-xl sm:text-2xl font-extralight font-jamjuree">
          nos palcos do DSX 2026
        </p>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-12">
          {inf.map((item, index) => (
            <div
              key={index}
              className="
                flex flex-col gap-3
                text-center
                max-w-sm mx-auto
              "
            >
              <h3 className="font-jamjuree uppercase text-[#F5D247] text-lg tracking-wide">
                {item.titulo}
              </h3>

              <p className="text-white text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="py-8">
          <CTAButton titulo="Quero meu passaporte" />
        </div>
      </div>
    </section>
  );
};

export default Temas;
