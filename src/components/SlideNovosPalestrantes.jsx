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
          className="text-center uppercase text-2xl sm:text-3xl md:text-4xl font-anton px-4"
        >
          Os principais nomes do mercado nos palcos do DSX 2026
        </motion.h3>

        <motion.h5
          variants={fadeUp}
          className="font-jamjuree font-normal text-center uppercase text-lg sm:text-2xl md:text-3xl px-4"
        >
          Aprenda com quem transforma decisões em resultados
        </motion.h5>

        <motion.div variants={fadeUp} className="my-10 max-w-7xl mx-auto px-4">
          <Swiper
            spaceBetween={16}
            slidesPerView={1.1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            loop={false}
            grabCursor={true}
            className="cursor-grab active:cursor-grabbing"
          >
            {InfoNovosPalestrantes.map((inf, index) => (
              <SwiperSlide key={index}>
                <div
                  className="bg-[#111111] bg-cover bg-center p-4 rounded-xl shadow-lg h-80 w-full max-w-[230px] mx-auto flex flex-col justify-between"
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
        </motion.div>

        <motion.div variants={fadeUp} className="flex justify-center items-center">
          <CTAButton titulo="Compre agora" link="/vendas" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SlideNovosPalestrantes;
