const HeroPatrocinadores = () => {
    return (
        <section
            className="
          relative isolate overflow-hidden
          bg-[url('/BannerPatrocinadores.png')]
          bg-cover bg-center bg-no-repeat
        "
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/55"></div>

            {/* Decoração (pseudo-elemento) */}
            <div
                className="
            pointer-events-none absolute bottom-0 right-0
            h-40 w-40 sm:h-56 sm:w-56 md:h-72 md:w-72
            bg-[url('/vector-21.svg')] bg-contain bg-no-repeat bg-right-bottom
            opacity-90
          "
                aria-hidden="true"
            />

            {/* Logo */}
            <img
                src="/dsx2026.png"
                className="absolute top-6 left-1/2 -translate-x-1/2 z-20 w-36 sm:w-44 md:w-52"
                alt="logo"
            />

            {/* Conteúdo */}
            <div className="relative z-10 px-4 pt-28 sm:pt-32 md:pt-36 pb-12">
                <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    {/* Texto */}
                    <div className="text-center md:text-left">
                        <h1 className="uppercase font-anton text-white text-2xl sm:text-3xl md:text-4xl lg:text-6xl leading-tight">
                            PATROCINE O MAIOR
                            <br />
                            EVENTO DE NEGÓCIOS, MARKETING, VENDAS E INOVAÇÃO DO NORTE
                        </h1>

                        <p className="mt-4 font-roboto text-white/90 text-base sm:text-lg max-w-xl mx-auto md:mx-0">
                            Presença estratégica, networking e ativações que aproximam sua marca de quem lidera o mercado.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="w-full">
                        <form
                            className="
                  bg-white/95 backdrop-blur
                  rounded-2xl shadow-xl
                  p-5 sm:p-6
                  grid gap-3
                  max-w-xl mx-auto md:ml-auto md:mr-0
                "
                        >
                            <input
                                className="h-11 rounded-xl border-2 border-black/40 px-4 outline-none focus:ring-2 focus:ring-black/20"
                                type="text"
                                placeholder="Nome Completo"
                            />
                            <input
                                className="h-11 rounded-xl border-2 border-black/40 px-4 outline-none focus:ring-2 focus:ring-black/20"
                                type="email"
                                placeholder="Email corporativo"
                            />
                            <input
                                className="h-11 rounded-xl border-2 border-black/40 px-4 outline-none focus:ring-2 focus:ring-black/20"
                                type="tel"
                                placeholder="WhatsApp"
                            />
                            <input
                                className="h-11 rounded-xl border-2 border-black/40 px-4 outline-none focus:ring-2 focus:ring-black/20"
                                type="text"
                                placeholder="Cargo"
                            />
                            <input
                                className="h-11 rounded-xl border-2 border-black/40 px-4 outline-none focus:ring-2 focus:ring-black/20"
                                type="text"
                                placeholder="Empresa"
                            />

                            <button
                                type="submit"
                                className="
                                    cursor-pointer
                                    mt-2 h-11 rounded-xl
                                    bg-gradient-to-r from-[#913DE3] via-[#A83EAA] to-[#C34484]
                                    text-white font-semibold
                                    shadow-lg
                                    hover:scale-[1.02] hover:shadow-xl
                                    transition-all duration-300
                                    uppercase
                                    "
                            >
                                Quero patrocinar
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroPatrocinadores;
