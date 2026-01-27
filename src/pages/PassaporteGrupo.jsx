const PassaporteGrupo = () => {

    const inf = [
        {
            qtdPessoas: "5",
            valor: "xxxx",
            valorParcela: "xx,xx"
        },
        {
            qtdPessoas: "10",
            valor: "xxxx",
            valorParcela: "xx,xx"
        },
    ]

    return (
        <>
            <section className="py-8 px-4 max-w-7xl mx-auto flex justify-center gap-2 flex-wrap">
                {
                    inf.map((item, index) => (
                        <div
                            key={index}
                            className="relative p-[1px] w-[350px] h-[340px] rounded-3xl bg-linear-to-b from-[#F5D247] to-[#797979] after:absolute after:content-[''] after:bg-[url(/fundo-passaporte.svg)] after:bg-center after:bg-no-repeat after:bg-cover after:w-50 after:h-20 after:top-0 after:right-0"
                        >
                            <div className="py-2 px-10 bg-black rounded-3xl w-full h-full">
                                <p className="text-white font-extralight uppercase">
                                    In group
                                </p>

                                <h2 className="text-6xl text-white uppercase font-anton">
                                    {item.qtdPessoas} pessoas
                                </h2>

                                <div className="mt-6">
                                    <p className="text-white text-sm text-center uppercase font-extralight p-1 border border-white rounded-xl">
                                        garanta seu passaporte
                                    </p>

                                    <h2 className="uppercase font-extrabold text-5xl mt-4 bg-gradient-to-r from-[#F2C845] to-[#E7A440] bg-clip-text text-transparent">
                                        R$ {item.valor}
                                    </h2>

                                    <p className="text-white">
                                        12 x de {item.valorParcela}
                                    </p>

                                    <button className="w-full p-2 rounded-xl mt-8 cursor-pointer font-bold uppercase bg-linear-to-r from-[#F3CB46] to-[#E7A240]">
                                        Comprar agora
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </section>
        </>
    )
}

export default PassaporteGrupo
