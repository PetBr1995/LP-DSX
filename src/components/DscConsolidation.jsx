const DsxConsolidation = () => {
    const cardItens = [
      {
        icon: "/person-1-3D.svg",
        number: "+ 50",
        title: "Palestras",
        desc: "Grandes nomes do mercado de IA, gestão, vendas e inovação.",
      },
      {
        icon: "/person-2-3D.svg",
        number: "+ 2.000",
        title: "Participantes",
        desc: "Empresários, decisores, gestores e profissionais de alto nível.",
      },
      {
        icon: "/expositor-icon-3D.svg",
        number: "+ 30",
        title: "Expositores regionais",
        desc: "Marcas que representam a força e diversidade dos negócios no Norte.",
      },
    ];
  
    return (
      <section className="py-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {cardItens.map((iten) => (
              <div
                key={iten.title}
                className="
                  font-roboto bg-[#111111] rounded-2xl
                  w-full max-w-[320px]
                  min-h-[280px]
                  flex flex-col justify-start items-start sm:justify-center
                  px-6 pt-14 pb-6
                  relative
                "
              >
                <div className="bg-black rounded-full p-2 absolute -top-12 left-1/2 -translate-x-1/2">
                  <img
                    src={iten.icon}
                    alt="icone"
                    className="w-[88px] h-[88px] sm:w-[96px] sm:h-[96px]"
                  />
                </div>
  
                <h2 className="text-[#F5A205] text-4xl sm:text-5xl font-bold">
                  {iten.number}
                </h2>
                <h4 className="text-2xl sm:text-3xl my-3 font-bold text-white uppercase">
                  {iten.title}
                </h4>
                <p className="text-white text-sm sm:text-base">{iten.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default DsxConsolidation;
  