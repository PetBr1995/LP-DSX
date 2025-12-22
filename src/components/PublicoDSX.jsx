import React from 'react';

const cardInf = [
    {
        keyword: "Empresário ",
        desc: "que precisa destravar o crescimento da sua empresa com estratégia."
    },
    {
        keyword: "Gestor e líder ",
        desc: "que tomam  decisões e desejam mais clareza, método e visão de mercado."
    },
    {
        keyword: "Profissional em ascensão ",
        desc: "que busca networking qualificado e referências de alto nível.  "
    },
    {
        keyword: "Time de marketing e vendas ",
        desc: "que precisam focar em performance e resultado."
    },
    {
        keyword: "Estudante e universitário ",
        desc: "que buscam acelerar o repertório e se conectar com o mercado de trabalho."
    },

]

const PublicoDSX = () => {
    return (
        <section className="relative bg-black py-20 overflow-hidden">
            {/* Fundo branco com clip-path criando a ponta preta à direita */}
            <div
                className="absolute inset-0 bg-white"
                style={{
                    clipPath: "polygon(81% 0, 100% 0, 100% 100%, 0 100%, 0 8%, 74% 8%)",
                }}
            />

            {/* Conteúdo da seção (fica por cima) */}
            <div className=" relative z-10 max-w-[1600px] mx-auto px-4 text-center py-10">
                <h2 className="font-anton text-3xl md:text-4xl uppercase font-medium text-black">
                    O DSX é para você…
                </h2>
                {/* Adicione mais conteúdo aqui se quiser */}
                <div className="py-6 after:absolute after:content-[''] after:top-20 after:right-2 after:bg-[url(/vector-18.svg)] after:bg-cover after:bg-no-repeat   after:w-[45px] after:h-[45px] ">
                    <img src="/banner-public-component.png" className="relative " alt="" />
                </div>
                <div
                    className="
                        grid gap-4 text-left
                        [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]
                        md:gap-6
                    "
                >
                    {cardInf.map((inf) => (
                        <div
                            key={inf.keyword}
                            className="
                                relative
                                pl-8 pr-2
                                md:pl-10
                                after:content-['']
                                after:absolute
                                after:left-0
                                after:top-1/2
                                after:-translate-y-1/2
                                after:w-5 after:h-5
                                md:after:w-6 md:after:h-6
                                after:bg-[url('/vector-19.svg')]
                                after:bg-no-repeat
                                after:bg-contain
                            "
                        >
                            <p className="text-sm md:text-base leading-relaxed">
                                <span className="font-black">{inf.keyword}</span>{" "}
                                {inf.desc}
                            </p>
                        </div>
                    ))}
                </div>


            </div>
        </section>
    );
};

export default PublicoDSX;