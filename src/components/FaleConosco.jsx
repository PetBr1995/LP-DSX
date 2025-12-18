import CTAButton from "./Mascaras/CTAButton";
import HeaderMask from "./Mascaras/HeaderMask"
import { motion } from "framer-motion";
const FaleConosco = () => {


  
  return (
    <section
      id="faleconosco"
      className="
          relative
          bg-cover 
          bg-center 
          bg-black 
          py-15

          after:absolute
          after:content-['']
          after:top-0
          after:right-0
          after:w-[100px]
          after:h-[100px]
          after:bg-[url('/vector-6.svg')]
          after:bg-cover
          after:bg-center
          after:bg-no-repeat

          before:absolute
          before:content-['']
          before:bottom-0
          before:left-0
          before:w-[130px]
          before:h-[120px]
          before:bg-[url('/vector-7.svg')]
          before:bg-cover
          before:bg-center
          before:bg-no-repeat
        "
    >
      {/* Overlay */}
  

      {/* Conteúdo */}
      <div className="relative z-10">
        {/* “after” (vector-8) girando para um lado */}
        <motion.div
          className="
      absolute
      -top-10
      right-40
      w-[80px]
      h-[80px]
      bg-[url('/vector-8.svg')]
      bg-cover
      bg-center
      bg-no-repeat
      pointer-events-none
      z-10
    "
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 14,
            ease: "linear",
          }}
        />

        {/* “before” (vector-9) girando para o outro lado */}
        <motion.div
          className="
      absolute
      bottom-10
      left-40
      w-[80px]
      h-[80px]
      bg-[url('/vector-9.svg')]
      bg-cover
      bg-center
      bg-no-repeat
      pointer-events-none
      z-10
    "
          animate={{ rotate: -360 }}
          transition={{
            repeat: Infinity,
            duration: 16,
            ease: "linear",
          }}
        />

        <h3 className="relative z-20 font-anton uppercase pb-6 text-white font-bebas text-5xl text-center">
          Coloque sua marca em<br /> evidência no DSX 2026
        </h3>

        <p className="relative z-20 font-jamjuree text-center text-[#F5D247] text-xl uppercase">
          o maior evento de Negócios, Marketing,<br /> Vendas e Inovação do norte
        </p>

        <div className="relative z-20 py-10 flex justify-center items-center">
          <HeaderMask
            titulo="seja patrocinador"
            textColor="#ffffff"
            link="https://wa.me/5592991112802"
            target="_blank"
          />
        </div>
      </div>
    </section>
  );
};

export default FaleConosco;
