import { motion } from "framer-motion";
import MainMask from "./Mascaras/MainMask";
import CTAButton from "./Mascaras/CTAButton";
import Timer from "./Timer";

const NewTimerHeader = ({ isVisible }) => {
  return (
    <motion.section
      initial={{ y: 100, opacity: 0 }}
      animate={isVisible ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="
      fixed bottom-0 left-0 right-0
      z-50
      bg-white
      shadow-[0_-8px_30px_rgba(0,0,0,0.2)]
      px-3 py-3
      pb-[calc(env(safe-area-inset-bottom)+12px)]
      overflow-hidden
    
      after:absolute
      after:content-['']
      after:hidden
      sm:after:block
      after:-bottom-7
      after:right-0
      after:w-[100px]
      after:h-[100px]
      after:bg-[url('/vector-1.svg')]
      after:bg-no-repeat
      after:bg-contain
      after:z-[1]
    "

    >

      <div
        className="
          mx-auto
          max-w-6xl
          flex flex-col
          items-center justify-center
          gap-2

          sm:flex-row
          sm:gap-4
        "
      >
        {/* Esquerda: texto */}
        <div className="w-full sm:w-auto flex justify-center sm:justify-start">
          <MainMask
            titulo="As vendas começam em:"
            backgroundColor="#F2F2F2"
            textColor="#000000"
          />
        </div>

        {/* Meio: timer */}
        <div className="w-full sm:w-auto flex justify-center">
          <Timer
            targetDate="2026-02-01T00:00:00"
            className="scale-90 sm:scale-100"
          />
        </div>
        {/* Direita: CTA */}
        {/*
         
        <div className="relative z-50 w-full sm:w-auto flex justify-center sm:justify-end">
          <CTAButton titulo="Lista de espera 2026" link="/#form" />
        </div>
          */}
      </div>
    </motion.section>
  );
};

export default NewTimerHeader;
