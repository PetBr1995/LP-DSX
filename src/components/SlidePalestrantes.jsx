import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useNavigate } from "react-router-dom";

import { InfoPalestrantes } from "../data/InfoPalestrantes";
import CTAButton from "./Mascaras/CTAButton";

const SlidePalestrantes = () => {

  const navigate = useNavigate()

  const infoPalestrantes = [
    { nome: "Alfredo Soares", desc: "Empreendedor e sócio do G4 Educação.", img: "/palestrantes/AlfredoSoares.png" },
    { nome: "Teste 1", desc: "Teste Descrição", img: "/palestrantes/AlfredoSoares.png" },
    { nome: "Teste 1", desc: "Teste Descrição", img: "/palestrantes/AlfredoSoares.png" },
    { nome: "Teste 1", desc: "Teste Descrição", img: "/palestrantes/AlfredoSoares.png" },
    { nome: "Teste 1", desc: "Teste Descrição", img: "/palestrantes/AlfredoSoares.png" },
    { nome: "Teste 1", desc: "Teste Descrição", img: "/palestrantes/AlfredoSoares.png" },
    { nome: "Teste 1", desc: "Teste Descrição", img: "/palestrantes/AlfredoSoares.png" },
  ];


  return (
    <section className="bg-white text-blackpb-10 pt-10">
      <h3 className=" text-center uppercase text-4xl font-anton">
        Confira todos os palestrantes
      </h3>
      <h5 className="font-jamjuree font-normal text-center uppercase font text-3xl">
        que marcaram presença na edição de 2025
      </h5>

      <div className="my-10 max-w-7xl mx-auto px-4">
        <Swiper
          spaceBetween={16}
          slidesPerView={"auto"}
          loop={false}
          grabCursor={true}     // 👈 ativa a mãozinha!
          className="cursor-grab active:cursor-grabbing"
        >
          {InfoPalestrantes.map((inf, index) => (
            <SwiperSlide key={index} className="w-[230px]!">
              <div
                className="
                  bg-[#111111]
                  bg-cover
                  p-4 
                  rounded-xl 
                  shadow-lg 
                  h-80
                  flex 
                  flex-col 
                  justify-between
                "
                style={{ backgroundImage: `url(${inf.img})` }}
              >
                <h4 className="font-bebas text-[#F5A205] text-xl text-center uppercase">
                  // {inf.nome}
                </h4>
                <p className="font-roboto font-medium text-sm mt-2 normal-case! text-gray-300 text-center">
                  {inf.desc}
                </p>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex justify-center items-center pb-12">
        <CTAButton titulo="Ver todos" link="/palestrantes" />
      </div>
    </section>
  );
};

export default SlidePalestrantes;
