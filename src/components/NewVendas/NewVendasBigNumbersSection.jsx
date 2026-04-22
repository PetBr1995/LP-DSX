const metrics = [
  {
    target: 2000,
    label: "Participantes",
    prefix: "+",
    suffix: "",
    useThousands: true,
  },
  {
    target: 40,
    label: "Palestras",
    prefix: "+",
    suffix: "",
    useThousands: false,
  },
  {
    target: 30,
    label: "Expositores",
    prefix: "+",
    suffix: "",
    useThousands: false,
  },
];

const experienceHighlights = [
  { value: "3 PALCOS", label: "simultâneos" },
  { value: "VIP", label: "área exclusiva" },
  { value: "FEIRA", label: "de negócios" },
  { value: "PRAÇA", label: "de alimentação" },
];

const formatMetricValue = (value, metric) => {
  const baseValue = metric.useThousands
    ? value.toLocaleString("pt-BR")
    : String(value);
  return `${metric.prefix}${baseValue}${metric.suffix}`;
};

const NewVendasBigNumbersSection = () => {
  return (
    <section className="bg-black text-white">
      <div className="mx-auto w-full max-w-6xl px-4 pb-4 pt-6 md:pb-6 md:pt-8">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-3 gap-3 px-2 py-2 md:gap-4">
          {metrics.map((item) => (
            <div
              key={item.label}
              className="rounded-[14px] border border-[#5A4718]/30 bg-black/35"
            >
              <div className="px-2 py-3 text-center md:px-3 md:py-4">
                <p className="font-jamjuree font-extrabold text-[28px] leading-none tracking-normal text-white sm:text-[36px] md:text-[64px]">
                  {formatMetricValue(item.target, item)}
                </p>
                <p className="mt-1 font-jamjuree text-[11px] font-bold uppercase tracking-[0.02em] text-white md:text-[19px]">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-2 grid w-full max-w-5xl grid-cols-2 gap-3 px-2 md:grid-cols-4 md:gap-4">
          {experienceHighlights.map((item) => (
            <div
              key={`${item.value}-${item.label}`}
              className="nv-highlight-wrap"
            >
              <div className="nv-highlight-inner px-3 py-3 text-center">
                <p className="font-jamjuree font-extrabold leading-none text-[#F5C02B] text-[20px] md:text-[30px]">
                  {item.value}
                </p>
                <p className="mt-1 font-jamjuree text-[10px] font-bold uppercase tracking-[0.02em] text-white md:text-[14px]">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewVendasBigNumbersSection;
