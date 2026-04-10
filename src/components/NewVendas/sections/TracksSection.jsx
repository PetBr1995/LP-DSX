import { motion } from "framer-motion";
import {
  BadgeCheck,
  BrainCircuit,
  Handshake,
  Megaphone,
  ShoppingBag,
  UserCog,
  Wrench,
} from "lucide-react";

const normalizeTitle = (value = "") =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const getTrackIcon = (title = "") => {
  const normalized = normalizeTitle(title);

  if (normalized.includes("vendas")) return Handshake;
  if (normalized.includes("marketing")) return Megaphone;
  if (normalized.includes("posicionamento") || normalized.includes("branding")) return BadgeCheck;
  if (normalized.includes("inteligencia artificial")) return BrainCircuit;
  if (normalized.includes("ferramentas") || normalized.includes("crescimento")) return Wrench;
  if (normalized.includes("gestao comercial")) return UserCog;

  return ShoppingBag;
};

const TracksSection = ({ items }) => {
  return (
    <section className="border-t border-[#2A2419] bg-[#0F0E0A] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center font-anton text-[30px] uppercase leading-[1.12] text-white md:text-[52px] md:leading-[1.04]">
          6 trilhas de conteúdo para <span className="text-[#F5C02B]">resultados reais</span>
        </h2>

        <p className="mx-auto mt-3 max-w-4xl text-center font-jamjuree text-[15px] font-normal leading-relaxed text-white md:text-[18px]">
          Cada trilha foi desenhada para gerar ações práticas no dia seguinte do evento.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2">
          {items.map((track, index) => {
            const Icon = getTrackIcon(track.title);

            return (
              <motion.article
                key={track.title}
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -50 : 50,
                  scale: 0.96,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.06,
                }}
                className="group relative overflow-hidden rounded-[16px] border border-[#3A3222] bg-[#1E1A12] p-5 shadow-[inset_0_0_0_1px_rgba(201,168,76,0.07)] transition-colors duration-300 md:p-6"
              >
                {/* Linha decorativa com efeito de deslize */}
                <div className="pointer-events-none absolute left-0 top-0 h-[1px] w-full origin-left scale-x-[0.28] bg-gradient-to-r from-[#C9A84C]/80 to-transparent opacity-95 transition-transform duration-500 ease-out group-hover:scale-x-100" />

                {/* Ícone */}
                <div className="relative z-10 mb-4 grid h-15 w-15 place-items-center rounded-[12px] border border-[#4A3F2A] bg-[#272115]">
                  <Icon
                    className="h-[22px] w-[22px] text-[#E8DEC4] transition-colors duration-300 group-hover:text-[#F5C02B]"
                    strokeWidth={2.25}
                  />
                </div>

                {/* Título */}
                <h3 className="mt-1 text-[28px] font-bold leading-[1.16] text-white md:text-[36px] md:leading-tight">
                  {track.title}
                </h3>

                {/* Descrição */}
                <p className="mt-2 font-jamjuree text-[15px] font-normal leading-relaxed text-white md:text-[17px]">
                  {track.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TracksSection;
