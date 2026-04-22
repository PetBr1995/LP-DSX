const trendSpeakers = [
  { name: "Joao Kepler", role: "Investidor", image: "/novas-palestrantes/Joao-Kepler.png" },
  { name: "Nicolas Charao", role: "Grupo VTX", image: "/novas-palestrantes/Nicolas-Charao.png" },
  { name: "Netao Bom Beef", role: "Negocios", image: "/foto-netao-bom-beef.PNG" },
  { name: "Giullya Becker", role: "Conteudos Magneticos", image: "/novas-palestrantes/GIULLYA-BECKER.png" },
  { name: "Joao Branco", role: "Marketing", image: "/foto-joao-branco.png" },
];

const TrendSpeakersHero = () => {
  return (
    <section className="h-[100svh] w-full overflow-hidden bg-[#111111] text-black">
      <div className="grid h-full grid-cols-2 gap-0 md:grid-cols-5">
        {trendSpeakers.map((speaker) => (
          <article
            key={speaker.name}
            className="group flex h-full flex-col border-black/35 [&:not(:nth-child(2n+1))]:border-l md:[&:not(:nth-child(5n+1))]:border-l"
          >
            <div className="flex min-h-[96px] items-center justify-center bg-[#F5D247] px-2 py-2.5 text-center md:min-h-[120px] md:px-3 md:py-3">
              <h3 className="font-anton text-[1rem] uppercase leading-[0.9] tracking-tight md:text-[1.6rem]">
                {speaker.name}
              </h3>
            </div>

            <div className="relative flex-1 overflow-hidden bg-black">
              <img
                src={speaker.image}
                alt={speaker.name}
                className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                loading="lazy"
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TrendSpeakersHero;
