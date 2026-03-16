import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion } from "framer-motion";

import { InfoNovosPalestrantes } from "../data/InfoNovosPalestrantes";
import CTAButton from "./Mascaras/CTAButton";

const SlideNovosPalestrantes = () => {
  const inViewOptions = {
    once: false,
    amount: 0.2,
    margin: "0px 0px -30% 0px",
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  return (
    <section className="relative bg-black text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-white"
        style={{
          "--shift": "clamp(60px, 14vw, 260px)",
          "--bottom": "clamp(18px, 3.5vw, 56px)",
          "--kink": "clamp(16px, 2.5vw, 48px)",
          clipPath: `
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

      <motion.div
        className="relative z-10 text-black pt-10 pb-20"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={inViewOptions}
      >
        <motion.h3
          variants={fadeUp}
          className="text-center uppercase text-4xl font-anton"
        >
          Os principais nomes do mercado nos palcos do DSX 2026
        </motion.h3>

        <motion.h5
          variants={fadeUp}
          className="font-jamjuree font-normal text-center uppercase text-3xl"
        >
          Aprenda com quem transforma decisões em resultados
        </motion.h5>

        <motion.div variants={fadeUp} className="my-10 max-w-7xl mx-auto px-4">
          <Swiper
            spaceBetween={16}
            slidesPerView="auto"
            loop={false}
            grabCursor={true}
            touchStartPreventDefault={false}
            className="cursor-grab active:cursor-grabbing"
          >
            {InfoNovosPalestrantes.map((inf, index) => (
              <SwiperSlide key={index} className="!w-[78vw] max-w-[260px] sm:!w-[230px]">
                <div
                  className="relative overflow-hidden bg-[#111111] bg-cover bg-top pb-4 px-4 rounded-xl shadow-lg h-80 flex flex-col justify-end"
                  style={{
                    backgroundImage: `url(${inf.img})`,
                    backgroundSize: inf.bgSize,
                    backgroundPosition: inf.bgPosition,
                  }}
                >
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none" />
                  <div className="flex flex-col justify-start items-center h-18">
                    <h4 className="relative z-50 font-bebas text-[#F5A205] text-3xl text-center uppercase">
                      {inf.nome}
                    </h4>
                    <p className="relative z-40 font-roboto font-medium text-sm text-white text-center">
                      {inf.desc}
                    </p>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <motion.div variants={fadeUp} className="flex justify-center items-center">
          <CTAButton titulo="Compre agora" link="/vendas" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SlideNovosPalestrantes;
