import banner from "../assets/DSX_banner.png";
import data_evento from "../assets/data-evento.png";

const SecondSection = () => {
  return (
    <section className="relative bg-[url('/background-dsx-second-section.png')] bg-cover bg-center-bottom bg-no-repeat">
      {/* overlay escuro pra dar contraste sem matar o bg */}
     

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-8 font-bebas">
          <div className="text-white text-center md:text-left">
            <img
              src={banner}
              alt="logo"
              className="w-[280px] md:w-[300px] mx-auto md:mx-0"
            />
            <h2 className="text-5xl text-[#F5A205] font-bold">2026</h2>
          </div>

          <div className="text-white text-center md:text-left space-y-4">
            <h4 className="font-roboto text-3xl font-extralight uppercase">
              O maior evento de
            </h4>
            <h2 className="font-bold text-5xl uppercase">
              Negócios, Marketing, Vendas e Inovação do norte
            </h2>
          </div>
        </div>

        {/* Botão dentro do mesmo container */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate("/palestrantes")}
            className="cursor-pointer text-black font-bold bg-[#F5A205] px-8 py-3 rounded-3xl uppercase hover:brightness-110 transition"
          >
            faça parte da lista de espera
          </button>
        </div>
      </div>
    </section>

  );
};

export default SecondSection;
