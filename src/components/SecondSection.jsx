import banner from "../assets/DSX_banner.png";
import data_evento from "../assets/data-evento.png";

const SecondSection = () => {
  return (
    <section>
      <div className="w-full bg-black flex items-center font-bebas">
        {/* Conteúdo centralizado */}
        <div
          className="
        w-full max-w-[1200px] mx-auto 
        grid grid-cols-1 md:grid-cols-2 
        place-items-center 
        gap-8
        px-6 py-16
        "
        >
          <div className="text-white text-center md:text-left">
            <img
              src={banner}
              alt="logo"
              className="md:w-[300px] w-[350px] mx-auto md:mx-0"
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
      </div>

      <div className="flex justify-center items-center pb-4">
        <button onClick={() => navigate('/palestrantes')} className="cursor-pointer text-black font-bold bg-[#F5A205] px-8 py-2 rounded-3xl uppercase">
          faça parte da lista de espera
        </button>
      </div>
    </section>
  );
};

export default SecondSection;
