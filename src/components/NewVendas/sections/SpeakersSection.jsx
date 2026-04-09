import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { InfoNovosPalestrantes } from "../../../data/InfoNovosPalestrantes";

const speakers = InfoNovosPalestrantes.filter((item) => item?.nome?.trim());

const getOptimizedSources = (src = "") => {
  const base = src.replace(/\.[^.]+$/i, "");
  return {
    avif: `/optimized${base}.avif`,
    webp: `/optimized${base}.webp`,
  };
};

const SpeakersSection = () => {
  return (
    <div className="border-t border-[#2A2419] bg-[#0F0E0A] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center font-anton text-[30px] uppercase leading-[1.12] text-white md:text-[50px] md:leading-[1.05]">
          Os principais nomes do mercado no palco do DSX
        </h2>
        <p className="mt-2 text-center text-[15px] text-[#A79B83] md:text-[20px]">
          Aprenda com quem transforma decisões em resultados
        </p>

        <div className="mt-10">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1.15}
            spaceBetween={14}
            loop={true}
            speed={700}
            autoplay={{
              delay: 2400,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            grabCursor={true}
            breakpoints={{
              640: { slidesPerView: 2.2, spaceBetween: 16 },
              900: { slidesPerView: 3.2, spaceBetween: 18 },
              1200: { slidesPerView: 4, spaceBetween: 20 },
            }}
            className="cursor-grab active:cursor-grabbing"
          >
            {speakers.map((speaker) => (
              <SwiperSlide key={`${speaker.nome}-${speaker.img}`}>
                <article className="group rounded-2xl border border-[#3A3222] bg-[#000000] p-3 shadow-[inset_0_0_0_1px_rgba(201,168,76,0.06)] transition duration-300 hover:border-[#C9A84C]/40">
                  <div className="relative h-[260px] overflow-hidden rounded-xl bg-[#000000]">
                    <picture>
                      <source srcSet={getOptimizedSources(speaker.img).avif} type="image/avif" />
                      <source srcSet={getOptimizedSources(speaker.img).webp} type="image/webp" />
                      <img
                        src={speaker.img}
                        alt={speaker.nome}
                        loading="lazy"
                        decoding="async"
                        width="640"
                        height="800"
                        className="h-full w-full object-contain object-top"
                      />
                    </picture>
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/90 via-black/55 to-transparent" />
                  </div>

                  <div className="px-1 pb-1 pt-4">
                    <h3 className="text-[18px] font-bold leading-[1.2] text-white md:text-[22px] md:leading-tight">
                      {speaker.nome}
                    </h3>
                    <p className="mt-2 min-h-[44px] text-[13px] leading-relaxed text-[#B7AA8A] md:text-[15px]">
                      {speaker.desc}
                    </p>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <p className="mt-10 text-center text-[14px] text-[#A79B83] md:text-[18px]">
          + dezenas de palestrantes confirmados para a edição 2026
        </p>
      </div>
    </div>
  );
};

export default SpeakersSection;
