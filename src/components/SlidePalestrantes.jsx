import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { InfoPalestrantes } from "../data/InfoPalestrantes";
import CTAButton from "./Mascaras/CTAButton";

const SlidePalestrantes = () => {
  return (
    <section className="relative bg-black text-white overflow-hidden">
      {/* Fundo branco com clip-path criando a aba/ponta preta à direita */}
      <div
        className="absolute inset-0 bg-white"
        style={{
          // Quanto o efeito entra para dentro da tela (horizontal)
          "--shift": "clamp(60px, 14vw, 260px)",

          // Altura do recorte inferior
          "--bottom": "clamp(18px, 3.5vw, 56px)",

          // “quina” da ponta
          "--kink": "clamp(16px, 2.5vw, 48px)",

          clipPath:
            `
            polygon(
              100% calc(100% - var(--bottom)),
              calc(40% - var(--shift)) calc(100% - var(--bottom)),
              calc(39% - (var(--shift) + var(--kink))) 100%,
              0 100%,
              0 0,
              100% 0
            )
            `,
        }}
      />


      {/* Conteúdo por cima */}
      <div className="relative z-10 text-black pt-10 pb-20">
        <h3 className="text-center uppercase text-4xl font-anton">
          Confira todos os palestrantes
        </h3>
        <h5 className="font-jamjuree font-normal text-center uppercase text-3xl">
          que marcaram presença na edição de 2025
        </h5>

        <div className="my-10 max-w-7xl mx-auto px-4">
          <Swiper
            spaceBetween={16}
            slidesPerView="auto"
            loop={false}
            grabCursor={true}
            className="cursor-grab active:cursor-grabbing"
          >
            {InfoPalestrantes.map((inf, index) => (
              <SwiperSlide key={index} className="!w-[230px]">
                <div
                  className="bg-[#111111] bg-cover bg-center p-4 rounded-xl shadow-lg h-80 flex flex-col justify-between"
                  style={{ backgroundImage: `url(${inf.img})` }}
                >
                  <h4 className="font-bebas text-[#F5A205] text-xl text-center uppercase">
                    {inf.nome}
                  </h4>
                  <p className="font-roboto font-medium text-sm text-gray-300 text-center">
                    {inf.desc}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex justify-center items-center">
          <CTAButton titulo="Ver todos" link="/palestrantes" />
        </div>
      </div>
    </section>
  );
};

export default SlidePalestrantes;