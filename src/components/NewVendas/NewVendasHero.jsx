import NewVendasHeaderMask from "./NewVendasHeaderMask";

const metrics = [
  { value: "+40", label: "Palestras" },
  { value: "+2.000", label: "Participantes em 2025" },
  { value: "+30", label: "Expositores regionais" },
  { value: "2 dias", label: "Imersão total" },
];

const NewVendasHero = () => {
  const loteMessage = "3º LOTE ABERTO — Garanta antes da virada de lote. Preço sobe sem aviso.";

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

      <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-12 md:pt-16">
        <div className="text-center">
          <img
            src="/DSX-2026-icon-1.png"
            alt="Logo DSX"
            className="mx-auto h-20 w-auto md:h-25"
            loading="eager"
            decoding="async"
          />

          <div className="mt-6 inline-flex rounded-full border border-[#6B5C33] bg-[#1E1A12] px-5 py-2 text-[12px] text-[#F5C02B] md:text-[14px]">
            23 e 24 de julho de 2026 · Manaus, AM
          </div>

          <h1 className="mx-auto mt-8 max-w-[16ch] font-anton text-[clamp(1.75rem,7.8vw,5rem)] uppercase leading-[1.35] tracking-[0.01em] text-white md:max-w-[20ch] md:leading-[1.22]">
            O maior evento de <span className="text-[#F5C02B]">negócios, marketing, vendas e inovação</span> do Norte
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-[18px] leading-relaxed text-[#D8D2C3] md:text-[28px]">
            2 dias intensos com +40 palestras, +30 expositores e os maiores nomes do mercado para
            você destravar o próximo nível do seu negócio.
          </p>
          <p className="mt-4 text-[15px] text-[#A79B83] md:text-[18px]">
            +2.000 participantes na edição 2025 · Centro de Convenções Vasco Vasques
          </p>

          <div className="mt-9">
            <p className="text-[18px] font-semibold uppercase leading-[1.25] tracking-[0.18em] text-[#A79B83] md:text-[24px]">
              3º lote encerra em <br />
              <span className="mt-1 inline-block text-3xl font-black text-[#F5C02B]">poucos dias</span>
            </p>
          </div>

          <div id="newvendas-primary-cta" className="mt-7 flex justify-center">
            <NewVendasHeaderMask
              titulo="Garantir meu passaporte"
              link="#passaportes"
              textColor="#FFFFFF"
              backgroundColor="#1E1A12"
              font="700"
              size="lg"
            />
          </div>
          <span className="mt-3 block text-center text-[13px] leading-tight font-semibold text-[#F5C02B] md:text-[17px]">
            vagas limitadas
          </span>

        </div>
      </div>

      <div className="border-y border-[#2A2419] bg-[#16130E] px-4 py-5 text-center text-[17px] font-semibold tracking-[0.01em] text-white md:py-6 md:text-[24px]">
        O DSX consolidou o Norte como referência em inovação e tecnologia
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4">
        {metrics.map((item) => (
          <div key={item.label} className="text-center">
            <p className="text-[42px] font-extrabold leading-none text-[#F5C02B] md:text-[60px]">
              {item.value}
            </p>
            <p className="mt-2 text-[13px] text-[#A79B83] md:text-[18px]">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewVendasHero;
