const HeaderMask = ({ titulo, textColor, backgroundColor, link, target }) => {
    return (
        <>
            <a href={link} target={target}>
                <section className="font-jamjuree relative z-10 flex justify-center items-center">
                    {/* ESQUERDA */}
                    <div
                        className="
                    relative
                    rounded-2xl
                    bg-linear-to-r from-[#8E3EEB] to-[#E0474A]
                    p-0.5
                    "
                        style={{ '--afterBackground': backgroundColor }}
                    >
                        <div className="flex justify-center items-center rounded-[14px] w-[200px] h-10" style={{ backgroundColor: backgroundColor }}>
                            <p className="uppercase text-[14px] font-normal" style={{ color: textColor }}>{titulo}</p>
                        </div>
                    </div>

                </section>
            </a>
        </>
    )
}

export default HeaderMask