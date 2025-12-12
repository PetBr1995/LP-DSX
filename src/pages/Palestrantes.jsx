import Footer from "../components/Footer"
import TimerHeaderPalestrantes from "../components/TimerHeaderPalestrantes"

import { InfoPalestrantes } from "../data/InfoPalestrantes"


const Palestrantes = () => {
    return (
        <>
            <section className="bg-black">
                <div>
                    <TimerHeaderPalestrantes />
                    <h3 className="mt-20 pt-20 pb-10 text-center font-bebas text-4xl text-white">Grandes mentes. Grandes ideias.<br /> Conheça nossos palestrantes.</h3>
                    <div className="flex gap-3 justify-center items-center flex-wrap">

                        {InfoPalestrantes.map((inf, index) => (
                            <div className="w-[230px]! pb-10">
                                <div
                                    className="
                                bg-[url('/palestrantes/AlfredoSoares.png')] 
                                bg-[#111111]
                                bg-cover
                                p-4 
                                rounded-xl 
                                shadow-lg 
                                h-80
                                flex 
                                flex-col 
                                justify-between
                                "
                                >
                                    <h4 className="font-bebas text-[#F5A205] text-xl text-center uppercase">
                             // {inf.nome}
                                    </h4>
                                    <p className="font-roboto font-medium text-sm mt-2 normal-case! text-gray-300 text-center">
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