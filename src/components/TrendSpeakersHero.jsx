const trendSpeakers = [
  {
    name: "Joao Kepler",
    role: "Investidor",
    image: "/novas-palestrantes/Joao-Kepler.png",
    optimizedBase: "/optimized/novas-palestrantes/Joao-Kepler",
  },
  {
    name: "Nicolas Charao",
    role: "Grupo VTX",
    image: "/novas-palestrantes/Nicolas-Charao.png",
    optimizedBase: "/optimized/novas-palestrantes/Nicolas-Charao",
  },
  {
    name: "Netao Bom Beef",
    role: "Negocios",
    image: "/foto-netao-bom-beef.PNG",
    optimizedBase: "/optimized/foto-netao-bom-beef",
  },
  {
    name: "Giullya Becker",
    role: "Conteudos Magneticos",
    image: "/novas-palestrantes/GIULLYA-BECKER.png",
  },
  {
    name: "Joao Branco",
    role: "Marketing",
    image: "/foto-joao-branco.png",
    optimizedBase: "/optimized/foto-joao-branco",
  },
  {
    name: "Carolina Lima",
    role: "Social Media",
    image: "/foto-carolina-lima.png",
    optimizedBase: "/optimized/foto-carolina-lima",
  },
];

const TrendSpeakersHero = () => {
  return (
    <section className="h-[88svh] w-full overflow-hidden bg-[#111111] text-black md:h-[90svh]">
      <div className="grid h-full grid-cols-2 gap-0 md:grid-cols-6">
        {trendSpeakers.map((speaker, index) => {
          return (
            <article
              key={speaker.name}
              className="group flex h-full flex-col border-black/5 [&:not(:nth-child(2n+1))]:border-l md:[&:not(:nth-child(6n+1))]:border-l"
            >
            <div className="overflow-x-hidden flex min-h-[82px] items-center justify-center bg-[#F5D247] px-2 py-2 text-center md:min-h-[96px] md:px-3 md:py-2.5">
              <h3 className="translate-x-[32px] whitespace-nowrap font-anton text-[0.92rem] uppercase leading-[0.84] tracking-tight md:text-[1.12rem]">
                {speaker.name}
              </h3>
            </div>

            <div className="relative flex-1 overflow-hidden bg-black">
              <picture>
                {speaker.optimizedBase ? (
                  <>
                    <source srcSet={`${speaker.optimizedBase}.avif`} type="image/avif" />
                    <source srcSet={`${speaker.optimizedBase}.webp`} type="image/webp" />
                  </>
                ) : null}
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
                  loading={index < 2 ? "eager" : "lazy"}
                  fetchPriority={index < 2 ? "high" : "auto"}
                  decoding="async"
                />
              </picture>
            </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default TrendSpeakersHero;
