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
  if (normalized.includes("networking")) return Handshake;

  return ShoppingBag;
};

const TracksSection = ({ items }) => {
  return (
    <section className="bg-black pb-16 pt-0 md:pb-20 md:pt-0">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center font-anton text-[30px] uppercase leading-[1.12] text-white md:text-[52px] md:leading-[1.04]">
          O que você vai levar para a sua empresa?
        </h2>

        <p className="mx-auto mt-3 max-w-4xl text-center font-jamjuree text-[15px] font-normal leading-relaxed text-white md:text-[18px]">
          Trilhas práticas e aplicáveis para transformar estratégia em resultado.
        </p>

        <div className="mt-8 grid grid-cols-1 items-stretch gap-4 md:mt-10 md:grid-cols-2">
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
                className="group relative flex h-full min-h-[190px] overflow-hidden rounded-[16px] border border-transparent bg-transparent p-5 transition-colors duration-300 md:min-h-[210px] md:p-6"
              >
                <div className="pointer-events-none absolute inset-0 rounded-[16px]">
                  <div className="absolute inset-0 rounded-[16px] border border-[#8A7640]/70" />
                  <div className="absolute inset-[1.2px] rounded-[15px] bg-black" />
                </div>

                <div className="relative z-10 flex w-full items-center gap-4">
                  {/* Ãcone */}
                  <div className="grid h-15 w-15 shrink-0 place-items-center rounded-[12px] border border-[#4A3F2A] bg-[#272115]">
                    <Icon
                      className="h-[22px] w-[22px] text-[#E8DEC4] transition-colors duration-300 group-hover:text-[#F5C02B]"
                      strokeWidth={2.25}
                    />
                  </div>

                  <div>
                    {/* TÃ­tulo */}
                    <h3 className="text-[28px] font-bold leading-[1.16] text-white md:text-[36px] md:leading-tight">
                      {track.title}
                    </h3>

                    {/* DescriÃ§Ã£o */}
                    <p className="mt-2 font-jamjuree text-[15px] font-normal leading-relaxed text-white md:text-[17px]">
                      {track.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TracksSection;
