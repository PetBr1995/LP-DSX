const HeaderMask = ({ titulo, textColor, backgroundColor, link, target, font }) => {
    return (
        <a href={link} target={target}>
            <section className="font-jamjuree relative z-10 flex justify-center items-center">
                
                {/* Wrapper com borda gradient */}
                <div className="relative rounded-2xl bg-gradient-to-r from-[#8E3EEB] to-[#E0474A] p-[2px]">
                    
                    {/* Container interno */}
                    <div
                        className="relative flex justify-center items-center rounded-[14px] w-[200px] h-10 overflow-hidden"
                        style={{ backgroundColor }}
                    >
                        
                        {/* INNER GRADIENT GLOW */}
                        <div className="absolute inset-0 rounded-[14px]
                                        bg-gradient-to-r from-[#8E3EEB] to-[#E0474A]
                                        opacity-40 blur-md">
                        </div>

                        {/* Conteúdo */}
                        <p
                            className="relative uppercase text-[14px]"
                            style={{ fontWeight: font, color: textColor }}
                        >
                            {titulo}
                        </p>

                    </div>
                </div>

            </section>
        </a>
    )
}

export default HeaderMask