import { useEffect, useState } from "react";
import NewVendasHeaderMask from "./NewVendasHeaderMask";

const metrics = [
  { target: 2000, label: "Participantes", prefix: "+", suffix: "", useThousands: true },
  { target: 40, label: "Palestras", prefix: "+", suffix: "", useThousands: false },
  { target: 30, label: "Expositores regionais", prefix: "+", suffix: "", useThousands: false },
  { target: 2, label: "Imersão total", prefix: "", suffix: " dias", useThousands: false },
];

const formatMetricValue = (value, metric) => {
  const baseValue = metric.useThousands ? value.toLocaleString("pt-BR") : String(value);
  return `${metric.prefix}${baseValue}${metric.suffix}`;
};

const NewVendasHero = () => {
  const loteMessage = "3º LOTE ABERTO — Garanta antes da virada de lote. Preço sobe sem aviso.";
  const [animatedValues, setAnimatedValues] = useState(metrics.map(() => 0));

  useEffect(() => {
    const duration = 1400;
    const start = performance.now();
    let frameId;

    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const nextValues = metrics.map((metric) => Math.round(metric.target * easedProgress));
      setAnimatedValues(nextValues);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-[#2A2419] bg-black text-white">
      <div className="bg-[#B8121A] py-2">
        <div className="faixa-wrapper" aria-label={loteMessage}>
          <div className="faixa-track-fast" style={{ animationDuration: "38s" }}>
            {Array.from({ length: 8 }).map((_, idx) => (
              <span
                key={`lote-open-${idx}`}
                className="inline-block whitespace-nowrap px-6 text-[12px] font-semibold tracking-[0.02em] text-white md:text-[13px]"
              >
                {loteMessage}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-10 md:pb-12 md:pt-14">
        <div className="text-center space-y-5 md:space-y-6">
          <div className="mx-auto h-50 w-[340px] md:h-40 md:w-[520px]">
            <img
              src="/logo-dsx-2026-transparente.png"
              alt="Logo DSX"
              className="h-full w-full object-contain object-center"
              loading="eager"
              decoding="async"
            />
          </div>

          <div className="inline-flex rounded-full border border-[#6B5C33] bg-[#1E1A12] px-5 py-2 font-anton text-[14px] uppercase tracking-[0.04em] text-[#F5C02B] md:text-[14px]">
            Manaus - AM
          </div>

          <h1 className="mx-auto max-w-[22ch] font-anton text-[clamp(1rem,7.8vw,5rem)] uppercase leading-[1.2] tracking-[0.01em] text-[#F5C02B] md:max-w-[19ch] md:leading-[1.22]">
            <span className="block">O maior evento de</span>
            <span className="block text-[#ffffff]">negócios, marketing,</span>
            <span className="block">
              <span className="text-[#ffffff]">vendas e inovação</span> do Norte
            </span>
          </h1>
          <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-x-3 gap-y-5 px-2 py-2">
            {metrics.map((item, index) => (
              <div key={item.label} className="min-w-0 w-[47%] text-center md:w-[23%]">
                <p className="font-jamjuree text-[36px] leading-none tracking-normal text-transparent bg-gradient-to-b from-[#1DE3C1] via-[#0FAF95] to-[#0A6A5A] bg-clip-text sm:text-[42px] md:text-[64px]">
                  {formatMetricValue(animatedValues[index] ?? 0, item)}
                </p>
                <p className="mt-1 font-jamjuree text-[13px] uppercase tracking-[0.02em] text-white md:text-[19px]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <div>
            <p className="text-[18px] font-semibold uppercase leading-[1.25] tracking-[0.18em] text-[#A79B83] md:text-[24px]">
              3º lote encerra em <br />
              <span className="mt-1 inline-block text-2xl font-black text-[#F5C02B]">poucos dias</span>
            </p>
          </div>

          <div id="newvendas-primary-cta" className="flex justify-center">
            <NewVendasHeaderMask
              titulo="Garantir meu passaporte"
              link="#passaportes"
              textColor="#FFFFFF"
              backgroundColor="#1E1A12"
              font="700"
              size="lg"
            />
          </div>
          <span className="mt-1 inline-block text-2xl font-black uppercase text-[#F5C02B]">Vagas limitadas</span>
        </div>
      </div>

      <div className="border-y border-[#5A4718] bg-[#3B2E10] px-4 py-5 text-center text-[17px] font-semibold tracking-[0.01em] text-white md:py-6 md:text-[24px]">
        O DSX consolidou o Norte como referência em inovação e tecnologia
      </div>

    </section>
  );
};

export default NewVendasHero;
