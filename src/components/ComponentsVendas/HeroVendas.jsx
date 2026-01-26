import CTAButton from "../../components/Mascaras/CTAButton";

const HeroVendas = () => {
  const info = [
    {
      number: "+2.000",
      title: "Participantes",
    },
    {
      number: "+30",
      title: "Expositores",
    },
    {
      number: "+50",
      title: "Palestrantes",
    },
  ];

  return (
    <section
      className="
            relative pt-10 sm:pt-20 md:pt-30
            bg-[url('/Banner-vendas-hero.png')]
            bg-center bg-cover bg-no-repeat

            after:absolute
            after:content-['']
            after:top-0
            after:left-1/2
            after:-translate-x-1/2
            after:bg-[url('/vector-29.svg')]
            after:bg-no-repeat
            after:bg-contain
            after:w-200
            after:h-200
            after:z-1
            after:opacity-40
            after:sm:opacity-60
            after:md:opacity-85
            "
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55"></div>

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <img src="/logo-dsx-horizontal.svg" className="mb-10" alt="logo-dsx" />

        <h2 className="text-center font-anton uppercase text-white text-3xl sm:text-4xl sm:leading-18  md:text-6xl mb-10">
          O MAIOR EVENTO DE NEGÓCIOS, MARKETING,
          <br />
          VENDAS E INOVAÇÃO DO NORTE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {info.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl bg-gradient-to-r from-[#F5D247] to-[#E9A741] bg-clip-text text-transparent">
                {item.number}
              </h2>

              <p className="uppercase text-xl md:text-2xl font-extralight text-[#F5D247]">
                {item.title}
              </p>
            </div>
          ))}
        </div>
        <div className="py-8">
          <CTAButton titulo="Quero meu passaporte" link="/" />
        </div>
      </div>
    </section>
  );
};

export default HeroVendas;
