const FaleConosco = () => {
    return (
        <>
            <section 
                className="
                    relative
                    bg-cover 
                    bg-center 
                    bg-[url('/background-faleconosco.png')] 
                    py-15
                "
            >
                {/* Overlay */}
                <div 
                    className="
                        absolute 
                        inset-0 
                        bg-[#000EA4]/40    /* 42% de opacidade */
                        z-0
                    "
                />

                {/* Conteúdo acima do overlay */}
                <div className="relative z-10">
                    <h3 className="text-white font-bebas text-5xl text-center">
                        Sua marca no dsx 2026
                    </h3>

                    <div className="py-10 flex justify-center items-center">
                        <button className="cursor-pointer text-black font-bold bg-[#F5A205] px-8 py-2 rounded-3xl uppercase">
                            fale conosco
                        </button>
                    </div>
                </div>

            </section>
        </>
    );
};

export default FaleConosco;
