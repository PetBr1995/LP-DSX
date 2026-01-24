const CallToActionPatrocinadores = () => {
    return (
      <section
        className="
          relative
          flex items-center
          bg-[url(/banner-call-section.png)]
          bg-cover
          bg-no-repeat
          bg-center
          w-screen
  
          min-h-[520px]
          sm:min-h-[600px]
          lg:min-h-[680px]
  
          py-24

          after:absolute
          after:content-['']
          after:w-100
          after:h-70
          after:top-0
          after:right-0
          after:bg-cover
          after:bg-no-repeat
          after:bg-center
          after:bg-[url(/vector-27.svg)]

          before:absolute
          before:content-['']
          before:w-90
          before:h-80
          before:bottom-0
          before:left-0
          before:bg-cover
          before:bg-no-repeat
          before:bg-center
          before:bg-[url(/vector-28.svg)]
          before:z-10
        "
      >
        {/* Overlay preto 71% */}
        <div className="absolute inset-0 bg-black/70" />
  
        {/* Conteúdo */}
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-6 flex-wrap">
            <img src="/logo-dsx-horizontal.svg" alt="logo DSX" />
            <img src="/data-dsx.svg" alt="data DSX" />
          </div>
  
          <h2 className="mt-8 font-anton text-white text-5xl max-w-3xl">
            PATROCINE O DSX 2026
             E GARANTA PRESENÇA E NETWORK
          </h2>
  
          <p className="mt-4 text-white max-w-xl text-2xl">
            Escolha agora os espaços mais estratégicos para posicionar sua marca no
            evento.
          </p>
  
          <button
            type="button"
            className="
              mt-8
              h-11 px-6 rounded-xl
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
        </div>
      </section>
    );
  };
  
  export default CallToActionPatrocinadores;
  