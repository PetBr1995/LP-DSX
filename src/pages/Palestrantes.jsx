import Footer from "../components/Footer";
import Header from "../components/Header";
import TimerHeaderPalestrantes from "../components/TimerHeaderPalestrantes";
import { InfoPalestrantesNacionais } from "../data/InfoPalestrantesNacionais";
import { InfoPalestrantesRegionais } from "../data/InfoPalestrantesRegionais";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Palestrantes = () => {
  return (
    <>
      <section className="bg-black font-bebas">
        <div className="max-w-(--largura) mx-auto">
          <Header />

          {/* Título */}
          <motion.h3
            className="mt-30 md:mt-20 pt-20 pb-10 text-center font-bebas text-4xl text-white"
            variants={titleVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            Grandes mentes. Grandes ideias.
            <br /> Conheça nossos palestrantes.
          </motion.h3>

          {/* Nacionais */}
          <motion.div
            className="flex gap-3 justify-center items-center flex-wrap"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {InfoPalestrantesNacionais.map((inf, index) => (
              <motion.div
                key={index}
                className="w-[230px] pb-10"
                variants={itemVariants}
              >
                <div
                  className="
                    bg-[#111111]
                    bg-cover
                    bg-center
                    p-4
                    rounded-xl
                    shadow-lg
                    aspect-3/4
                    flex
                    flex-col
                    justify-between
                  "
                  style={{ backgroundImage: `url(${inf.img})` }}
                >
                  <h4 className="font-bebas text-[#F5A205] text-xl text-center uppercase">
                    // {inf.nome}
                  </h4>

                  <p className="font-roboto font-medium text-sm mt-2 text-gray-300 text-center normal-case">
                    {inf.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Título Regionais */}
          <motion.h3
            className="pt-10 pb-10 text-center font-bebas text-4xl text-white"
            variants={titleVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            Regionais
          </motion.h3>

          {/* Regionais */}
          <motion.div
            className="flex gap-3 justify-center items-center flex-wrap"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {InfoPalestrantesRegionais.map((inf, index) => (
              <motion.div
                key={index}
                className="w-[230px] pb-10"
                variants={itemVariants}
              >
                <div
                  className="
                    bg-[#111111]
                    bg-cover
                    bg-center
                    p-4
                    rounded-xl
                    shadow-lg
                    aspect-3/4
                    flex
                    flex-col
                    justify-between
                  "
                  style={{ backgroundImage: `url(${inf.img})` }}
                >
                  <h4 className="font-bebas text-[#F5A205] text-xl text-center uppercase">
                    // {inf.nome}
                  </h4>

                  <p className="font-roboto font-medium text-sm mt-2 text-gray-300 text-center normal-case">
                    {inf.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <Footer />
      </section>
    </>
  );
};

export default Palestrantes;
