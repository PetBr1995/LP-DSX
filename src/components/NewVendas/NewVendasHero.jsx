const metrics = [
  { value: "+40", label: "Palestras" },
  { value: "+2.000", label: "Participantes em 2025" },
  { value: "+30", label: "Expositores regionais" },
  { value: "2 dias", label: "De imersao total" },
];

const timerBlocks = [
  { value: "03", label: "DIAS" },
  { value: "14", label: "HORAS" },
  { value: "24", label: "MIN" },
  { value: "48", label: "SEG" },
];

const NewVendasHero = () => {
  return (
    <section className="bg-[#050505] text-white">
      <div className="bg-[#B8121A] px-4 py-2 text-center text-[12px] font-semibold tracking-[0.02em] md:text-[13px]">
        3º LOTE ABERTO — Garanta antes da virada de lote. Preco sobe sem aviso.
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-0 pt-12 md:pt-16">
        <div className="text-center">
          <p className="font-anton text-[54px] leading-none tracking-[0.05em] text-[#F5C02B] md:text-[64px]">
            DSX
          </p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#F5C02B] md:text-[12px]">
            Digital Summit Experience
          </p>

          <div className="mt-6 inline-flex rounded-full border border-[#5D4A16] bg-[#1A1408] px-5 py-2 text-[12px] text-[#F5C02B] md:text-[14px]">
            23 e 24 de julho de 2026 · Manaus, AM
          </div>

          <h1 className="mx-auto mt-8 max-w-4xl text-[38px] font-extrabold leading-[1.05] text-white md:text-[56px]">
            O maior evento de{" "}
            <span className="text-[#F5C02B]">negocios, marketing, vendas e inovacao</span>{" "}
            do Norte
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-[20px] leading-relaxed text-[#D2D2D2] md:text-[30px]">
            2 dias intensos com +40 palestras, +30 expositores e os maiores nomes do
            mercado para voce destravar o proximo nivel do seu negocio.
          </p>
          <p className="mt-4 text-[15px] text-[#A8A8A8] md:text-[18px]">
            +2.000 participantes na edicao 2025 · Centro de Convencoes Vasco Vasques
          </p>

          <div className="mt-9">
            <p className="text-[12px] font-medium uppercase tracking-[0.28em] text-[#9D9D9D] md:text-[14px]">
              3º lote encerra em
            </p>
            <div className="mt-4 flex items-center justify-center gap-2.5 md:gap-3">
              {timerBlocks.map((block) => (
                <div
                  key={block.label}
                  className="w-[68px] rounded-xl border border-[#5D4A16] bg-[#14110A] px-2 py-2.5 md:w-[84px] md:py-3"
                >
                  <p className="text-[30px] font-extrabold leading-none text-[#F5C02B] md:text-[42px]">
                    {block.value}
                  </p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-[#9E9E9E] md:text-[10px]">
                    {block.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <a
            href="/checkout"
            aria-label="Garantir meu passaporte no terceiro lote"
            className="mx-auto mt-10 block w-full max-w-[770px] rounded-xl bg-[#F5C02B] px-6 py-5 text-center text-[18px] leading-tight font-extrabold uppercase tracking-[0.01em] text-black transition hover:brightness-105 md:text-[34px]"
          >
            Garantir meu passaporte
            <span className="mt-2 block text-[12px] leading-tight font-medium normal-case text-[#372A03] md:text-[18px]">
              3º Lote — vagas limitadas
            </span>
          </a>

          <div className="mx-auto mt-7 flex max-w-[700px] flex-wrap items-center justify-center gap-5 text-[13px] text-[#AFAFAF] md:gap-8 md:text-[16px]">
            <span>✓ +40 palestras</span>
            <span>✓ +2.000 pessoas</span>
            <span>✓ Networking real</span>
          </div>
        </div>
      </div>

      <div className="mt-12 border-y border-[#2A2A2A] bg-[#0D0D0D] px-4 py-4 text-center text-[15px] text-[#9E9E9E] md:text-[20px]">
        O DSX consolidou o Norte como referencia em inovacao e tecnologia
      </div>

      <div className="border-b border-[#1A1A1A]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-9 md:grid-cols-4">
          {metrics.map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-[42px] font-extrabold leading-none text-[#F5C02B] md:text-[60px]">
                {item.value}
              </p>
              <p className="mt-2 text-[13px] text-[#9E9E9E] md:text-[18px]">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default NewVendasHero;
