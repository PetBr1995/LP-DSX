import CTAButton from './Mascaras/CTAButton'
import { motion } from "framer-motion"
const HeroSectionV2 = () => {
    const cardItens = [
        {
            icon: "/icon-foguete.svg",
            number: "+50",
            title: "Palestras",
            desc: "Grandes nomes do mercado de IA, gestão, vendas e inovação.",
        },
        {
            icon: "/icone-pessoas.svg",
            number: "+2.000",
            title: "Participantes",
            desc: "Empresários, decisores, gestores e profissionais de alto nível.",
        },
        {
            icon: "/icone-target.svg",
            number: "+30",
            title: "Expositores regionais",
            desc: "Marcas que representam a força e diversidade dos negócios no Norte.",
        },
    ];

    return (
        <section className="py-20 relative bg-[url('/background-banner-2.png')] bg-cover bg-center  after:bg-[url('/vector-2.svg')] after:bg-cover after:absolute after:content-[''] after:bottom-0 after:right-0 after:w-20 after:h-[100px] before:absolute before:content-[''] before:top-8 before:left-10 before:bg-[url('/vector-11.svg')] before:w-[60px] before:h-[60px] before:bg-cover">
            <div
                className="
          mx-auto max-w-7xl
          flex flex-col md:flex-row items-center
          gap-8 md:gap-12 lg:gap-16
          px-4 sm:px-6 md:px-10 lg:px-16
          py-10 md:py-16
        "
            >
                {/* Logo: ao lado em telas maiores, acima em mobile */}
                <div className="flex-shrink-0" initial={{ scale: 0 }} animate={{ scale: 1 }} >
                    <img
                        src="/dsx-2026-logo.png"
                        alt="logo"
                        className="
                        object-contain
                        h-30 sm:h-34 md:h-50 lg:h-56
                        w-auto
                        "
                    />
                </div>

                {/* Conteúdo: ocupa o espaço restante */}
                <div className="flex-1 w-full">
                    {/* Headline */}
                    <div className="text-center md:text-left">
                        <h3
                            className="
                mb-3 font-jamjuree text-white uppercase font-extralight
                tracking-[0.22em]
                text-xl
              "
                        >
                            o maior evento de
                        </h3>

                        <h4
                            className="
                font-anton text-white uppercase font-normal tracking-wide
                text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
                leading-tight
              "
                        >
                            Negócios, Marketing,
                            <br />
                            Vendas e Inovação do norte
                        </h4>
                    </div>

                    {/* Cards */}
                    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {cardItens.map((item) => (
                            <div key={item.title} className="w-full flex flex-col items-center md:items-start">
                                <div className="flex items-start gap-3">
                                    <h2
                                        className="
                            font-jamjuree text-[#12DB98] font-medium leading-none
                            text-4xl sm:text-5xl md:text-5xl
                            whitespace-nowrap
                        "
                                    >
                                        {item.number}
                                    </h2>

                                    <img
                                        src={item.icon}
                                        alt=""
                                        className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-8 object-contain opacity-90 mt-1"
                                    />
                                </div>

                                <h3
                                    className="
                        mt-2 font-roboto text-white uppercase text-center md:text-left
                        text-sm sm:text-lg md:text-xl
                        leading-snug
                    "
                                >
                                    {item.title}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSectionV2