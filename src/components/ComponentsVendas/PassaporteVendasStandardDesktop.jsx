const PassaporteVendasStandardDesktop = () => {
  const infPrice = [
    {
      nome: "VIP",
      price: "xxxx",
      parcelas: "xx,xx",
      borderColor: "#79E3A3",
      gradientColor: "#242424",
      textColor: "#6DCC96",
      iconSide: "left",
      iconCard: "/vector-31.svg",
    },
    {
      nome: "STANDARD",
      price: "297,00",
      parcelas: "xx,xx",
      borderColor: "#E46142",
      gradientColor: "#797979",
      textColor: "#DA4068",
      iconSide: "right",
      iconCard: "/vector-32.svg",
    },
  ];

  const info = [
    {
      title: "ACESSO AOS 2 DIAS",
      icon: "/checkPassport.svg",
      desc: "VIVA A EXPERIêNCIA COMPLETA",
    },
    {
      title: "+50 PALESTRAS",
      icon: "/checkPassport.svg",
      desc: "ACESSO INTEGRAL AO CONTEÚDO DOS 3 PALCOS",
    },
    {
      title: "ACESSO A FEIRA DE NEGÓCIOS",
      icon: "/checkPassport.svg",
      desc: "LOREN IPSUN  LOREN IPSUN",
    },
    {
      title: "Oportunidade de networking",
      icon: "/checkPassport.svg",
      desc: "LOREN IPSUN  LOREN IPSUN",
    },
  ];

  const vantagens = [
    { vip: true, standard: true },
    { vip: true, standard: true },
    { vip: true, standard: true },
    { vip: true, standard: true },
  ];

  // ✅ Só o card STANDARD
  const standardCards = infPrice.filter((item) => item.nome === "STANDARD");

  return (
    <section className="py-8 relative after:content-[''] after:absolute after:-top-85 after:right-0 after:bg-cover after:bg-no-repeat after:bg-center after:w-80 after:h-140 after:bg-[url(/banner-passaporte.png)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative">
        <h2 className="md:leading-15 font-anton uppercase text-white text-center text-3xl sm:text-4xl md:text-5xl">
          Esteja onde os grandes nomes decidem
          <br />
          o futuro dos negócios.
        </h2>

        <p className="text-white uppercase font-extralight text-center text-xl sm:text-2xl mt-4">
          Sua experiência começa aqui
        </p>

        {/* ✅ MESMA DISPOSIÇÃO: só centraliza o card */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-2">
          {standardCards.map((item) => (
            <div
              key={item.nome}
              style={{
                "--bgColor": item.borderColor,
                "--gradientColor": item.gradientColor,
                "--textColor": item.textColor,
                "--icon": `url(${item.iconCard})`,
              }}
              className="w-80 h-[622px] rounded-2xl bg-gradient-to-b from-[var(--bgColor)] to-[var(--gradientColor)]"
            >
              <div
                className={`relative bg-black h-[620px] rounded-2xl m-px overflow-hidden
                  after:content-['']
                  after:absolute
                  after:top-0
                  after:w-24
                  after:h-24
                  after:opacity-80
                  after:bg-[image:var(--icon)]
                  after:bg-no-repeat
                  after:bg-contain
                  after:bg-center
                  after:z-0
                  ${item.iconSide === "left" ? "after:left-0" : "after:right-0"}
                `}
              >
                <h2 className="relative z-10 text-white text-6xl text-center uppercase pt-6 font-anton">
                  {item.nome}
                </h2>

                <p className="relative z-10 uppercase border text-white text-center text-[12px] font-normal p-1 border-white mx-12 rounded-xl mt-5">
                  garanta seu passaporte
                </p>

                <div className="relative z-10 mx-12">
                  <p
                    className="font-bold uppercase my-4 text-4xl"
                    style={{ color: item.textColor }}
                  >
                    R$ {item.price}
                  </p>

                  <p className="text-white text-sm uppercase">
                    12x de {item.parcelas}
                  </p>

                  <button className="uppercase bg-gradient-to-r from-[#F3CB46] to-[#E7A240] p-3 w-full mt-6 rounded-2xl font-bold">
                    Comprar agora
                  </button>
                </div>

                <div className="mt-10 relative">
                  {vantagens.map((_, index) => (
                    <div
                      key={index}
                      className="relative z-30 flex items-center justify-center py-2"
                    >
                      <img
                        src="/checkPassaport.svg"
                        alt="Disponível"
                        className="w-8 h-8 my-[6px] -translate-y-3"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ MESMO MODELO: lista de texto com linear-gradient (mantida absoluta) */}
        <div className="absolute top-130 md:top-130 left-5 right-4">
          {info.map((item, index) => (
            <div
              key={index}
              className="
                py-2 pl-3 mb-[1px] relative
                odd:bg-gradient-to-r odd:from-[#090909]/60 odd:via-[#525151]/60 odd:to-[#464646]/60
                even:bg-gradient-to-r even:from-[#090909]/60 even:via-[#1C1C1C]/60 even:to-[#222222]/60
              "
            >
              <h2 className="relative z-20 text-white uppercase font-extrabold">
                {item.title}
              </h2>
              <p className="text-sm uppercase font-extralight text-white">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PassaporteVendasStandardDesktop;
