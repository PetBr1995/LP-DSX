import banner from "../assets/DSX_banner.png";
import data_evento from "../assets/data-evento.png";
import CTAButton from "./Mascaras/CTAButton";

const SecondSection = () => {
  return (
    <section className="relative bg-[url('/background-banner-2.png')]  bg-cover bg-center-bottom bg-no-repeat
    after:absolute
    after:content-['']
    after:w-[80px]
    after:h-[115px]
    after:bottom-0
    after:right-0
    after:bg-[url('/vector-2.svg')]
    after:bg-cover
    after:bg-center
    after:bg-no-repeat
    ">
      {/* overlay escuro pra dar contraste sem matar o bg */}


      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 place-items-center gap-8 font-bebas">
          <div className="text-white text-center md:text-left">
            <img src="/data-dsx.png" alt="data" className="w-[250px] mb-2" />
            <img
              src="/dsx2026main.png"
              alt="logo"
              className="w-[260px] md:w-[260px] mx-auto md:mx-0"
            />
          </div>

          <div className="text-white text-center space-y-3 sm:space-y-4">
            <h4
              className="
      tracking-wider
      font-jamjuree
      font-extralight
      uppercase

      text-xl        /* mobile */
      leading-tight  /* mobile */

      sm:text-2xl
      sm:leading-snug

      md:text-4xl
      md:leading-normal
    "
            >
              O maior evento de
            </h4>

            <h2
              className="
                font-anton
                font-medium
                uppercase
                mx-auto

                text-4xl        /* mobile */
                leading-tight  /* mobile */

               
                sm:leading-snug

                md:text-6xl
                md:leading-tight
              "
            >
              Negócios, Marketing,<br />
              Vendas e Inovação do norte
            </h2>
          </div>

        </div>

        {/* Botão dentro do mesmo container */}
        <div className="flex justify-center mt-10">
          <CTAButton link="#form" titulo="Lista de espera 2026" />
        </div>
      </div>
    </section>

  );
};

export default SecondSection;
