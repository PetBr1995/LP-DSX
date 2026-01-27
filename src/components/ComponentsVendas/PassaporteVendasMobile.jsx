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
        { vip: true, standard: true, titulo: "ACESSO AOS 2 DIAS", desc: "VIVA A EXPERIêNCIA COMPLETA" },
        { vip: true, standard: true, titulo: "+50 PALESTRAS", desc: "ACESSO INTEGRAL AO CONTEÚDO DOS 3 PALCOS" },
        { vip: true, standard: true, titulo: "ACESSO A FEIRA DE NEGÓCIOS", desc: "LOREN IPSUN  LOREN IPSUN " },
        { vip: true, standard: true, titulo: "Oportunidade de networking", desc: "LOREN IPSUN  LOREN IPSUN " },
        { vip: true, standard: false, titulo: "Acesso exclusivo ao Lounge VIP", desc: "LOREN IPSUN  LOREN IPSUN " },
        { vip: true, standard: false, titulo: "Acesso ao food station", desc: "LOREN IPSUN  LOREN IPSUN " },
        { vip: true, standard: false, titulo: "Certificado de participação", desc: "LOREN IPSUN  LOREN IPSUN " },
        { vip: true, standard: false, titulo: "Acesso AS primeiras fileiras ", desc: "LOREN IPSUN  LOREN IPSUN " },
    ];

    return (
        <section className="py-8">
            {/* Mantém a ideia do relative pra segurar o absolute */}
            <div className="mx-auto px-4 relative">
                <h2 className="font-anton uppercase text-white text-center text-3xl">
                    Esteja onde os grandes nomes decidem o futuro dos negócios.
                </h2>

                <p className="text-white uppercase font-extralight text-center text-xl mt-4">
                    Sua experiência começa aqui
                </p>

                {/* Cards (mobile = coluna) */}
                <div className="mt-8 flex flex-col gap-4 sm:w-[55%] mx-auto">
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
                                <h2 className="relative z-10 text-white text-6xl text-center uppercase pt-6 font-anton">
                                    {card.nome}
                                </h2>

                                <p className="relative z-10 uppercase border text-white text-center text-[12px] font-normal p-1 border-white mx-10 rounded-xl mt-5">
                                    garanta seu passaporte
                                </p>

                                <div className="relative z-10 mx-10">
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

                                {/* Ícones de vantagens dentro do card (mesma lógica do desktop) */}
                                <div className="mt-10 relative">
                                    {vantagens.map((vantagem, index) => {
                                        const hasAccess =
                                            card.nome === "VIP" ? vantagem.vip : vantagem.standard;

                                        return (
                                            <div
                                                key={`${card.nome}-vant-${index}`}
                                                className="even:bg-gradient-to-r
                                                    even:from-[#090909]
                                                    even:via-[#1C1C1C]
                                                    even:to-[#222222]
                                                    even:opacity-60 flex items-center p-2 text-center justify-center bg-slate-600 mb-[1px]
                                                    odd:bg-gradient-to-r
                odd:from-[#090909]
                odd:via-[#525151]
                odd:to-[#464646]
                odd:opacity-60
                                                    "
                                                    
                                            >
                                                <div className="flex flex-col justify-center items-center gap-2">
                                                    <h2 className="text-white uppercase">{vantagem.titulo}</h2>
                                                    <p className="text-white font-extralight">{vantagem.desc}</p>
                                                    <img
                                                        src={hasAccess ? "/checkPassaport.svg" : "/xPassaport.svg"}
                                                        alt={hasAccess ? "Disponível" : "Indisponível"}
                                                        className="w-8 h-8 my-[6px] -translate-y-3"
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PassaporteVendasMobile;
