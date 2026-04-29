const partnerGroups = [
  {
    title: "Realização",
    layout: "single",
    logos: [
      {
        src: "/logo-parceiros/logo-digital-hub-dsx-2026.png",
        alt: "Digital Hub Xperience",
      },
    ],
  },
  {
    title: "Apoio",
    logos: [
      {
        src: "/logo-parceiros/logo-rede-onda-digital-dsx-2026.png",
        alt: "Rede Onda Digital",
        sizeClass: "max-h-24 sm:max-h-28",
      },
      {
        src: "/logo-parceiros/logo-digital-educa-dsx-2026.png",
        alt: "Digital Educa",
      },
      {
        src: "/logo-parceiros/logo-antena-1-dsx-2026.png",
        alt: "Antena 1",
      },
      {
        src: "/logo-parceiros/logo-manaus-play.png",
        alt: "Manaus Play",
        sizeClass: "max-h-14 sm:max-h-16",
      },
      {
        src: "/logo-parceiros/logo-xpress-dsx-2026.png",
        alt: "Xpress",
        sizeClass: "max-h-16 sm:max-h-20",
      },
      {
        src: "/logo-parceiros/logo-tore-dsx-2026.png",
        alt: "Tore",
      },
      {
        src: "/logo-parceiros/MARCA%20PURAKA%20BRANCA-04.png",
        alt: "Puraka",
        sizeClass: "max-h-14 sm:max-h-16",
      },
    ],
  },
  {
    title: "Expositores",
    logos: [
      {
        src: "/logo-parceiros/logo-stock360.png",
        alt: "Stock360",
      },
      {
        src: "/logo-parceiros/Logo_Influx.png",
        alt: "Influx",
      },
      {
        src: "/logo-parceiros/logo-paracabos.webp",
        alt: "Paracabos",
      },
      {
        src: "/logo-parceiros/logo-AC%20Display.png",
        alt: "AC Display",
      },
      {
        src: "/logo-parceiros/Logo_Polo.png",
        alt: "Polo",
        sizeClass: "max-h-25 sm:max-h-30",
      },
      {
        src: "/logo-parceiros/Logo_TS_Clinic.png",
        alt: "TS Clinic",
        sizeClass: "max-h-25 sm:max-h-30",
      },
      {
        src: "/logo-vbot.png",
        alt: "VBOT",
        sizeClass: "max-h-25 sm:max-h-30",
      },
    ],
  },
  {
    title: "Food",
    logos: [
      {
        src: "/logo-parceiros/logo-lord-brownie.png",
        alt: "Lord Brownie",
        sizeClass: "max-h-25 sm:max-h-30",
      },
      {
        src: "/logo-parceiros/logo-CIA-DO-ESPETO.png",
        alt: "Cia do Espeto",
        sizeClass: "max-h-25 sm:max-h-30",
      },
      {
        src: "/logo-maquinista.png",
        alt: "Maquinista",
        sizeClass: "max-h-15 sm:max-h-20",
      },
    ],
  },
];

const baseLogoClass = "max-h-10 sm:max-h-12";

const LogoCard = ({ logo, highlighted = false }) => (
  <div
    className={`flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-4 ${
      highlighted ? "w-full px-6 py-5" : "min-h-[92px]"
    }`}
  >
    <img
      src={logo.src}
      alt={logo.alt}
      className={`w-auto object-contain ${logo.sizeClass || baseLogoClass}`}
      loading="lazy"
    />
  </div>
);

const PartnerGroup = ({ group, className = "" }) => {
  const isSingle = group.layout === "single";

  return (
    <article className={`rounded-xl bg-black p-5 sm:p-6 ${className}`.trim()}>
      <h3 className="mb-4 text-center font-jamjuree text-lg font-semibold tracking-wide text-[#F5A205]">
        {group.title}:
      </h3>

      <div className={isSingle ? "grid place-items-center gap-4" : "grid grid-cols-1 gap-4 sm:grid-cols-2"}>
        {group.logos.map((logo) => (
          <LogoCard key={logo.src} logo={logo} highlighted={isSingle} />
        ))}
      </div>
    </article>
  );
};

const ParceirosSection = () => {
  const [realizacao, apoio, expositores, food] = partnerGroups;

  return (
    <section className="bg-black px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-bebas text-2xl tracking-wide text-[#F5A205] sm:text-3xl">
          Quem está ao lado do maior evento de negócios do Norte.
        </h2>

        <div className="mt-6 rounded-2xl border border-[#F5A205]/50 bg-black/80 p-6 sm:p-8 lg:p-10">
          <div className="grid gap-6 md:grid-cols-2">
            <PartnerGroup group={realizacao} />
            <PartnerGroup group={apoio} />
          </div>

          <PartnerGroup group={expositores} className="mt-6" />
          <PartnerGroup group={food} className="mt-6" />
        </div>
      </div>
    </section>
  );
};

export default ParceirosSection;
