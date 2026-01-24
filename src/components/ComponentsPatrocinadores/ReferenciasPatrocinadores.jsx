import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

const InfoReferencias = [
  { img: "/card-tallis.png" },
  { img: "/Card-alfredo.png" },
  { img: "/card-camila.png" },
  { img: "/Card-kepler.png" },
  { img: "/Card-hanna.png" },
  { img: "/Card-rafael.png" },
];

const ReferenciasPatrocinadores = () => {
  return (
    <section className="relative bg-black text-white overflow-hidden">
      {/* Conteúdo */}
      <div className="relative z-10 pt-10 pb-20">
        <h3 className="text-center font-extralight uppercase text-2xl font-jamjuree mb-4">
          Em 2025, reunimos
        </h3>

        <h5 className="font-anton font-extralight text-center uppercase text-4xl leading-tight">
          <span className="text-[#F5D247]">as principais referências</span> em marketing,
          <br />
          vendas e performance do Brasil
        </h5>

        <div className="relative after:absolute after:content-[''] after:top-0 after:left-0 after:w-80 after:h-80 after:bg-[url(/vector-23.png)] after:bg-cover">

          <div className="relative my-12 max-w-7xl mx-auto px-4">
            {/* Botões de navegação */}
            <div className="absolute -bottom-20 -translate-y-1/2 left-4 z-20 hidden md:flex">
              <button
                className="
              swiper-ref-prev
              w-8 h-8 rounded-xl
              bg-[#232323] text-white
              grid place-items-center
              cursor-pointer
              rounded-r-none
              border-r-1
              border-white/10
              "
                aria-label="Anterior"
              >
                ‹
              </button>

              <button
                className="
              swiper-ref-next
              w-8 h-8 rounded-xl
              bg-[#232323] text-white
              grid place-items-center
              cursor-pointer
              rounded-l-none
              "
                aria-label="Próximo"
              >
                ›
              </button>
            </div>

            {/* Swiper */}
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: ".swiper-ref-prev",
                nextEl: ".swiper-ref-next",
              }}
              spaceBetween={16}
              slidesPerView="auto"
              grabCursor={true}
              className="cursor-grab active:cursor-grabbing"
            >
              {InfoReferencias.map((item, index) => (
                <SwiperSlide key={index} className="!w-[260px]">
                  <div
                    className="
                  h-[360px]
                  rounded-xl
                  bg-cover bg-center
                  shadow-lg
                  "
                    style={{ backgroundImage: `url(${item.img})` }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <button
            type="button"
            className="
              h-11 px-6 rounded-xl
              bg-gradient-to-r from-[#913DE3] via-[#A83EAA] to-[#C34484]
              text-white font-semibold
              shadow-lg
              hover:scale-[1.02] hover:shadow-xl
              transition-all duration-300
              uppercase
              mt-6
            "
          >
            Quero patrocinar
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReferenciasPatrocinadores;
