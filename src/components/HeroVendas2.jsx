import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

const HeroVendas2 = () => {
  const cardItens = [
    {
      iconType: "calendar",
      number: "2",
      title: "Dias de imersão",
      desc: "Dois dias intensivos de conteúdo prático e networking.",
    },
    {
      icon: "/icon-foguete.svg",
      number: "+40",
      title: "Palestras",
      desc: "Grandes nomes do mercado de IA, gestão, vendas e inovação.",
    },
    {
      icon: "/icone-pessoas.svg",
      number: "+2.000",
      title: "Participantes",
      desc: "Empresários, decisores, gestores e profissionais de alto nível.",
    },
    {
      icon: "/icone-target.svg",
      number: "+30",
      title: "Expositores regionais",
      desc: "Marcas que representam a força e diversidade dos negócios no Norte.",
    },
  ];

  const containerStagger = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const cardAnim = {
    hidden: { opacity: 0, y: 18, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="relative overflow-hidden bg-center bg-cover">
      <div className="pb-12 mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 sm:px-6 md:px-10 lg:px-16">
        <div className="flex-1 w-full">
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {cardItens.map((item) => (
              <motion.div
                key={item.title}
                variants={cardAnim}
                className="w-full rounded-xl px-4 py-4 flex flex-col items-center text-center"
              >
                <div className="flex items-center gap-3">
                  <h2
                    className="font-jamjuree text-[#12DB98] font-medium leading-none 
                               text-6xl sm:text-5xl md:text-5xl lg:text-5xl whitespace-nowrap"
                  >
                    {item.number}
                  </h2>

                  {item.iconType === "calendar" ? (
                    <CalendarDays className="h-14 w-14 sm:h-10 sm:w-10 md:h-12 md:w-12 text-white/90" />
                  ) : (
                    <img
                      src={item.icon}
                      alt=""
                      className="h-14 w-14 sm:h-10 sm:w-10 md:h-12 md:w-12 object-contain opacity-90"
                    />
                  )}
                </div>

                <h3
                  className="mt-3 font-roboto text-white uppercase 
                             text-base sm:text-lg md:text-xl leading-snug"
                >
                  {item.title}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroVendas2;
