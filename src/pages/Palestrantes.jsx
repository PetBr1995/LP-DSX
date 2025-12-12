import Footer from "../components/Footer"
import TimerHeaderPalestrantes from "../components/TimerHeaderPalestrantes"

import { InfoPalestrantes } from "../data/InfoPalestrantes"
import { InfoPalestrantesNacionais } from "../data/InfoPalestrantesNacionais"
import { InfoPalestrantesRegionais } from "../data/InfoPalestrantesRegionais"


const Palestrantes = () => {
    return (
        <>
            <section className="bg-black">
                <div className="max-w-(--largura) mx-auto">
                    <TimerHeaderPalestrantes />
                    <h3 className="mt-20 pt-20 pb-10 text-center font-bebas text-4xl text-white">Grandes mentes. Grandes ideias.<br /> Conheça nossos palestrantes.</h3>
                    <div className="flex gap-3 justify-center items-center flex-wrap">

                        {InfoPalestrantesNacionais.map((inf, index) => (
                            <div key={index} className="w-[230px] pb-10">
                                <div
                                    className="
                                    bg-[#111111]
                                    bg-cover
                                    bg-center
                                    p-4 
                                    rounded-xl 
                                    shadow-lg 
                                    aspect-3/4   /* 👈 Tamanho padrão (3:4, 230×300 aprox.) */
                                    flex 
                                    flex-col 
                                    justify-between
                                    "
                                    style={{ backgroundImage: `url(${inf.img})` }}
                                >

                                    <h4 className="font-bebas text-[#F5A205] text-xl text-center uppercase">
                                        // {inf.nome}
                                    </h4>

                                    <p className="font-roboto font-medium text-sm mt-2 text-gray-300 text-center normal-case">
                                        {inf.desc}
                                    </p>
                                </div>
                            </div>
                        ))}

                    </div>

                    <h3 className="pt-10 pb-10 text-center font-bebas text-4xl text-white">Regionais</h3>

                    <div className="flex gap-3 justify-center items-center flex-wrap">

                        {InfoPalestrantesRegionais.map((inf, index) => (
                            <div key={index} className="w-[230px] pb-10">
                                <div
                                    className="
                                        bg-[#111111]
                                        bg-cover
                                        bg-center
                                        p-4 
                                        rounded-xl 
                                        shadow-lg 
                                        aspect-3/4   /* 👈 Tamanho padrão (3:4, 230×300 aprox.) */
                                        flex 
                                        flex-col 
                                        justify-between
                                    "
                                    style={{ backgroundImage: `url(${inf.img})` }}
                                >

                                    <h4 className="font-bebas text-[#F5A205] text-xl text-center uppercase">
                                        // {inf.nome}
                                    </h4>

                                    <p className="font-roboto font-medium text-sm mt-2 text-gray-300 text-center normal-case">
                                        {inf.desc}
                                    </p>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>



                <Footer />
            </section>
        </>
    )
}

export default Palestrantes