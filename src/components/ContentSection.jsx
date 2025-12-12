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
            cardDesc: 'Domine tráfego pago, funis de  venda, criativos que convertem e estratégias de automação.'
        },
        {
            icon: '/icons/icone-engrenagem.svg',
            cartTitle: 'Posicionamento e Branding',
            cardDesc: 'Construa autoridade, seja referência na sua área e destaque sua marca no mercado.'
        },
        {
            icon: '/icons/icone-money.svg',
            cartTitle: 'Ferramentas de Crescimento',
            cardDesc: 'Como atrair, negociar e fechar contratos maiores, construindo um modelo de receita previsível.'
        },
        {
            icon: '/icons/icone-target.svg',
            cartTitle: 'Planejamento Estratégico',
            cardDesc: 'Domine tráfego pago, funis de venda, criativos que convertem e estratégias de automação.'
        },
        {
            icon: '/icons/icone-cavalo.svg',
            cartTitle: 'Gestão Comercial',
            cardDesc: 'Construa autoridade, seja referência na sua área e destaque sua marca no mercado.'
        },
    ]

    return (
        <>
            <section className="py-12">
                <div className="text-center uppercase text-white">
                    <h3 className="font-bebas text-5xl">Os conteúdos que marcaram o DSX 2025</h3>
                    <h5 className="font-extralight text-3xl">e destravaram novos resultados</h5>
                </div>
                <div
                    className="
                        max-w-[1200px] 
                        w-full
                        grid 
                        grid-cols-1      /* mobile: 1 coluna */
                        sm:grid-cols-2   /* >= 640px: 2 colunas */
                        lg:grid-cols-3   /* >= 1024px: 3 colunas */
                        gap-3 
                        mx-auto 
                        my-10
                        px-4            /* respiro lateral no mobile */
                        
                        "

                >
                    {cardInfo.slice(0, 6).map((inf, index) => (
                        <div
                            key={index}
                            className="flex-col justify-start items-start border border-white rounded-md py-6 px-8 flex h-auto"
                        >
                            <div className="border border-[rgb(111,120,255,0.5)] rounded-[100%] p-3">
                                <img src={inf.icon} alt="icon" className="w-6" />
                            </div>
                            <h4 className="py-3 font-medium text-3xl text-[#12DB98]">{inf.cartTitle}</h4>
                            <p className="text-white">{inf.cardDesc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default ContentSection