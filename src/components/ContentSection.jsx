import CTAButton from './Mascaras/CTAButton'
import { motion } from 'framer-motion'

const ContentSection = () => {

    const cardInfo = [
        {
            icon: '/icons/icone-carrinho.svg',
            cartTitle: 'Vendas',
            cardDesc: 'Como atrair, negociar e fechar contratos maiores, construindo um modelo de receita previsível.'
        },
        {
            icon: '/icons/icone-grafico.svg',
            cartTitle: 'Marketing & Performance',
            cardDesc: 'Domine tráfego pago, funis de venda, criativos que convertem e estratégias de automação.'
        },
        {
            icon: '/icons/icone-engrenagem.svg',
            cartTitle: 'Posicionamento e Branding',
            cardDesc: 'Construa autoridade, seja referência na sua área e destaque sua marca no mercado.'
        },
        {
            icon: '/icons/icone-money.svg',
            cartTitle: 'Ferramentas de Crescimento',
            cardDesc: 'Aprenda com especialistas as estratégias e tecnologias que geram escala real.'
        },
        {
            icon: '/icons/icone-target.svg',
            cartTitle: 'Planejamento Estratégico',
            cardDesc: 'Trace metas sólidas e transforme suas ideias em ações concretas.'
        },
        {
            icon: '/icons/icone-cavalo.svg',
            cartTitle: 'Gestão Comercial',
            cardDesc: 'Otimize seu processo de vendas, use bem seu CRM e escale sua operação.'
        },
    ]

    return (
        <>
            <section className="py-12 relative overflow-hidden">

                {/* Elemento que substitui o ::after */}
                <motion.div
                    className="
                        absolute
                        top-[20%]
                        right-[5%]
                        w-[50px]
                        h-[50px]
                        bg-[url('/vector-4.svg')]
                        bg-cover
                        bg-no-repeat
                        bg-center
                        pointer-events-none
                    "
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "linear"
                    }}
                />

                {/* Título */}
                <div className="text-center uppercase text-white">
                    <h3 className="font-bebas text-5xl">
                        Os conteúdos que marcaram o DSX 2025
                    </h3>
                    <h5 className="font-extralight text-3xl">
                        e destravaram novos resultados
                    </h5>
                </div>

                {/* Cards */}
                <div
                    className="
                        max-w-[1200px]
                        w-full
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-3
                        gap-3
                        mx-auto
                        my-10
                        px-4
                    "
                >
                    {cardInfo.map((inf, index) => (
                        <div
                            key={index}
                            className="flex flex-col justify-start items-start border rounded-md py-6 px-8 h-auto"
                        >
                            <div className="border rounded-full p-3">
                                <img
                                    src={inf.icon}
                                    alt={inf.cartTitle}
                                    className="w-6"
                                />
                            </div>

                            <h4 className="py-3 font-medium text-3xl text-[#F5A205]">
                                {inf.cartTitle}
                            </h4>

                            <p className="text-white">
                                {inf.cardDesc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <CTAButton
                    titulo="Lista de espera 2026"
                    link="#form"
                />

            </section>
        </>
    )
}

export default ContentSection
