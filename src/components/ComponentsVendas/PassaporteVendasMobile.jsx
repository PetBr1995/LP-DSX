const PassaporteVendasMobile = () => {
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
        price: "xxxx",
        parcelas: "xx,xx",
        borderColor: "#E46142",
        gradientColor: "#797979",
        textColor: "#DA4068",
        iconSide: "right",
        iconCard: "/vector-32.svg",
      },
    ];
  
    const vantagens = [
      { vip: true, standard: true, titulo: "ACESSO AOS 2 DIAS", desc: "VIVA A EXPERIÊNCIA COMPLETA" },
      { vip: true, standard: true, titulo: "+50 PALESTRAS", desc: "ACESSO INTEGRAL AO CONTEÚDO DOS 3 PALCOS" },
      { vip: true, standard: true, titulo: "ACESSO A FEIRA DE NEGÓCIOS", desc: "LOREN IPSUN LOREN IPSUN" },
      { vip: true, standard: true, titulo: "OPORTUNIDADE DE NETWORKING", desc: "LOREN IPSUN LOREN IPSUN" },
      { vip: true, standard: false, titulo: "ACESSO AO LOUNGE VIP", desc: "LOREN IPSUN LOREN IPSUN" },
      { vip: true, standard: false, titulo: "ACESSO AO FOOD STATION", desc: "LOREN IPSUN LOREN IPSUN" },
      { vip: true, standard: false, titulo: "CERTIFICADO DE PARTICIPAÇÃO", desc: "LOREN IPSUN LOREN IPSUN" },
      { vip: true, standard: false, titulo: "PRIMEIRAS FILEIRAS", desc: "LOREN IPSUN LOREN IPSUN" },
    ];
  
    return (
      <section className="py-8">
        <div className="mx-auto px-4 relative">
          <h2 className="font-anton uppercase text-white text-center text-3xl">
            Esteja onde os grandes nomes decidem o futuro dos negócios.
          </h2>
  
          <p className="text-white uppercase font-extralight text-center text-xl mt-4">
            Sua experiência começa aqui
          </p>
  
          {/* Grid simples */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-7xl mx-auto">
            {infPrice.map((card) => (
              <div
                key={card.nome}
                style={{
                  "--bgColor": card.borderColor,
                  "--gradientColor": card.gradientColor,
                  "--textColor": card.textColor,
                  "--icon": `url(${card.iconCard})`,
                }}
                className="w-full rounded-2xl bg-gradient-to-b from-[var(--bgColor)] to-[var(--gradientColor)]"
              >
                <div
                  className={`relative bg-black rounded-2xl m-px overflow-hidden
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
                    ${card.iconSide === "left" ? "after:left-0" : "after:right-0"}
                  `}
                >
                  <h2 className="relative z-10 text-white text-5xl sm:text-6xl text-center uppercase pt-6 font-anton">
                    {card.nome}
                  </h2>
  
                  <p className="relative z-10 uppercase border text-white text-center text-[12px] p-1 border-white mx-6 sm:mx-10 rounded-xl mt-5">
                    garanta seu passaporte
                  </p>
  
                  <div className="relative z-10 mx-6 sm:mx-10">
                    <p
                      className="font-bold uppercase my-4 text-4xl"
                      style={{ color: card.textColor }}
                    >
                      R$ {card.price}
                    </p>
  
                    <p className="text-white text-sm uppercase">
                      12x de {card.parcelas}
                    </p>
  
                    <button className="uppercase bg-gradient-to-r from-[#F3CB46] to-[#E7A240] p-3 w-full mt-6 rounded-2xl font-bold">
                      Comprar agora
                    </button>
                  </div>
  
                  {/* Vantagens */}
                  <div className="mt-10 relative">
                    {vantagens.map((vantagem, index) => {
                      const hasAccess =
                        card.nome === "VIP" ? vantagem.vip : vantagem.standard;
  
                      return (
                        <div
                          key={`${card.nome}-vant-${index}`}
                          className="
                            mb-[1px] p-3
                            odd:bg-gradient-to-r odd:from-[#090909] odd:via-[#525151] odd:to-[#464646] odd:opacity-60
                            even:bg-gradient-to-r even:from-[#090909] even:via-[#1C1C1C] even:to-[#222222] even:opacity-60
                            flex items-center justify-between gap-3
                          "
                        >
                          <div className="text-left">
                            <h3 className="text-white uppercase font-extrabold text-sm">
                              {vantagem.titulo}
                            </h3>
                            <p className="text-white/90 uppercase font-extralight text-xs">
                              {vantagem.desc}
                            </p>
                          </div>
  
                          <img
                            src={hasAccess ? "/checkPassaport.svg" : "/xPassaport.svg"}
                            alt={hasAccess ? "Disponível" : "Indisponível"}
                            className="w-7 h-7 shrink-0"
                          />
                        </div>
                      );
                    })}
                  </div>
  
                  <div className="h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default PassaporteVendasMobile;
  