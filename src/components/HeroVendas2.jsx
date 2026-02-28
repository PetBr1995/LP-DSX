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

  const inViewOptions = {
    once: false,
    amount: 0.2,
    margin: "0px 0px -35% 0px",
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const containerStagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
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
      <div className="pb-12 mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 sm:px-6 md:gap-12 md:px-10 lg:gap-16 lg:px-16">
        <div className="flex-1 w-full">
          <motion.div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6 md:mt-6 md:grid-cols-2 lg:grid-cols-4">
            {cardItens.map((item) => (
              <motion.div
                key={item.title}
                className="w-full rounded-lg px-1 py-2 flex flex-col items-center"
              >
                <div className="flex items-start gap-3">
                  <h2 className="font-jamjuree text-[#12DB98] font-medium leading-none text-4xl sm:text-5xl md:text-5xl whitespace-nowrap">
                    {item.number}
                  </h2>

                  {item.iconType === "calendar" ? (
                    <CalendarDays className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-8 text-white/90 mt-1" />
                  ) : (
                    <img
                      src={item.icon}
                      alt=""
                      className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-8 object-contain opacity-90 mt-1"
                    />
                  )}
                </div>

                <h3 className="mt-2 font-roboto text-white uppercase text-center text-sm sm:text-lg md:text-xl leading-snug">
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
