

const Agradecimento = () => {
  return (
    <section
      className="
        relative
        min-h-screen
        bg-black
        bg-[url('/background-agradecimento.png')]
        bg-cover
        bg-center
        bg-no-repeat
        pb-[120px]   /* reserva espaço pro footer fixo */
      "
    >
      <div className="max-w-[1200px] mx-auto px-6 pt-10">
        <img
          src="/DSX-logo-palestrantes.png"
          alt="logo"
          className="mx-auto"
        />

        <h2 className="mt-16 sm:mt-20 font-bebas text-4xl sm:text-6xl md:text-7xl text-white text-center leading-tight">
          Obrigado! Recebemos seu interesse em participar do DSX 2026
        </h2>

        <p className="mt-6 sm:mt-8 text-center text-white font-roboto uppercase text-lg sm:text-2xl md:text-3xl font-extralight">
          Em breve, nossa equipe vai entrar em contato&nbsp;com&nbsp;você.
        </p>
      </div>

      {/* Footer fixo somente nesta página */}
      <footer
        className="
          fixed
          bottom-0
          left-0
          right-0
          z-20
          py-6
          bg-[#111111]
          bg-no-repeat
          bg-bottom-right
          bg-[url('/Ellipse-background.png')]
          bg-[length:240px]
          md:bg-[length:320px]
        "
      >
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <img
            src="/vemai-dsx.png"
            alt="Vem aí DSX"
            className="w-[60%] max-w-[260px] md:w-[40%]"
          />

          <img
            src="/powered-digital-hub.png"
            alt="Powered by Digital Hub"
            className="w-[60%] max-w-[260px] md:w-[40%]"
          />
        </div>
      </footer>
    </section>
  );
};

export default Agradecimento;
