const PassaporteVendas = () => {
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

  const info = [
    {
      title: "teste",
      icon: "V"
    },
    {
      title: "teste",
      icon: "V"
    },
    {
      title: "teste",
      icon: "V"
    },
    {
      title: "teste",
      icon: "V"
    },
    {
      title: "teste",
      icon: "V"
    },
    {
      title: "teste",
      icon: "V"
    },
    {
      title: "teste",
      icon: "V"
    },
    {
      title: "teste",
      icon: "V"
    },
  ]

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 relative">
        <h2 className="font-anton uppercase text-white text-center text-3xl sm:text-4xl md:text-5xl">
          Esteja onde os grandes nomes decidem o futuro dos negócios.
        </h2>

        <p className="text-white uppercase font-extralight text-center text-xl sm:text-2xl mt-4">
          Sua experiência começa aqui
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-end gap-2">
          {infPrice.map((item) => (
            <div
              key={item.nome}
              style={{
                "--bgColor": item.borderColor,
                "--gradientColor": item.gradientColor,
                "--textColor": item.textColor,
                // IMPORTANTÍSSIMO: a variável precisa guardar o url(...)
                "--icon": `url(${item.iconCard})`,
              }}
              className="w-70 h-[702px] rounded-2xl bg-gradient-to-b from-[var(--bgColor)] to-[var(--gradientColor)]"
            >
              <div
                className={`relative bg-black h-[700px] rounded-2xl m-px overflow-hidden
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
                <div className="mt-7">
                  <h1 className="text-white text-center py-2">teste</h1>
                  <h1 className="text-white text-center py-2">teste</h1>
                  <h1 className="text-white text-center py-2">teste</h1>
                  <h1 className="text-white text-center py-2">teste</h1>
                  <h1 className="text-white text-center py-2">teste</h1>
                  <h1 className="text-white text-center py-2">teste</h1>
                  <h1 className="text-white text-center py-2">teste</h1>
                  <h1 className="text-white text-center py-2">teste</h1>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute top-125 left-5 right-4">
          {
            info.map((item) => (
              <div className="bg-slate-300/40 p-2 relative border-b-1">
                <h2 className="text-black">teste</h2>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default PassaporteVendas;
