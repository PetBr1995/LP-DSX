import { useEffect, useState } from "react";
import NewVendasHeaderMask from "./NewVendasHeaderMask";
import { Calendar, MapPin } from "lucide-react";

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

const mainSpeakers = [
  {
    name: "João Branco",
    image: "/foto-joao-branco.png",
    bio: "O CMO que transformou o McDonald's em Méqui. Foram quase 10 anos na linha de frente, batendo absolutamente todos os recordes da história da marca no Brasil.",
  },
  {
    name: "João Kepler",
    image: "/novas-palestrantes/Joao-Kepler.png",
    bio: 'Autor de "O Poder do Equity" e "O Ponto Cego Empresarial". Ele não fala sobre crescimento isolado; ele desenha estratégias e amplia a visão de dezenas de grandes empresários. Você vai descobrir os problemas que o seu negócio tem e você não está enxergando.',
  },
  {
    name: "Netão Bom Beef",
    image: "/foto-netao-bom-beef.PNG",
    bio: "A verdadeira aula de escala física. Ele começou com um açougue de bairro. Hoje, fatura R$ 1 MILHÃO por dia. A trajetória real que vai virar aprendizado puro para quem quer construir um império.",
  },
  {
    name: "Fernando Miranda",
    image: "/novas-palestrantes/Fernando-Miranda.png",
    bio: "CEO da Staage e host do maior podcast de marketing do Brasil. Fernando liderou um crescimento de 40 vezes na unidade de educação da EXAME e traz a bagagem de gigantes como Banco do Brasil, XP e InfoMoney.",
  },
  {
    name: "Nicolas Charão",
    image: "/novas-palestrantes/Nicolas-Charao.png",
    bio: "O destravador de crescimento. Já ajudou mais de 50 negócios a cruzarem a barreira do primeiro milhão. Ele vai te provar que ter mais receita sem ter mais liberdade não é sucesso, é cilada.",
  },
  {
    name: "Carolina Lima",
    image: "/foto-carolina-lima.png",
    bio: "17 anos construindo estratégia de conteúdo para marcas de sucesso. Você vai entender de uma vez por todas a mecânica da atração.",
  },
  {
    name: "Roberto Reis",
    image: "/novas-palestrantes/Roberto-Reis.png",
    bio: "Estrategista eleitoral com 27 anos de atuação. Em 2026 tem eleição. E política move mercado, capital e negócio. Você vai entender quais regras vão mudar no seu setor.",
  },
];

const formatMetricValue = (value, metric) => {
  const baseValue = metric.useThousands
    ? value.toLocaleString("pt-BR")
    : String(value);
  return `${metric.prefix}${baseValue}${metric.suffix}`;
};

const NewVendasHero = () => {
  const [animatedValues, setAnimatedValues] = useState(metrics.map(() => 0));

  useEffect(() => {
    const duration = 1900;
    const start = performance.now();
    let frameId;

    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const nextValues = metrics.map((metric) =>
        Math.round(metric.target * easedProgress),
      );
      setAnimatedValues(nextValues);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[url(/[DSX]-Banner-Site-BG.png)] bg-cover bg-center bg-no-repeat opacity-40"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-10 pt-10 md:pb-12 md:pt-14">
        <div className="text-center space-y-5 md:space-y-6">
          <h2 className="mx-auto flex flex-wrap items-center justify-center gap-2 font-anton text-[clamp(1.1rem,3.4vw,2rem)] uppercase leading-[1.1] tracking-[0.03em] text-white">
            <span>O</span>
            <span className="inline-flex items-center">
              <img
                src="/logo-dsx-horizontal-2.svg"
                alt="DSX"
                className="block h-[3em] w-auto object-contain"
                style={{ clipPath: "inset(0 1px 0 0)" }}
                loading="eager"
                decoding="async"
              />
            </span>
            <span>está de volta</span>
          </h2>
          <h1 className="mx-auto max-w-6xl font-anton text-[clamp(1rem,5vw,4.8rem)] uppercase leading-[1.08] tracking-[0.012em] text-[#F5C02B] md:leading-[1.12]">
            <span className="block whitespace-nowrap">
              O maior evento de negócios,
            </span>
            <span className="block whitespace-nowrap">
              <span className="text-[#ffffff]">
                marketing, vendas e inovação
              </span>{" "}
              do Norte
            </span>
          </h1>
          <div className="mx-auto max-w-4xl">
            <p className="text-center text-[clamp(1.15rem,4.8vw,2.6rem)] leading-[1.2] text-white">
              <span className="block">Dois dias de conteúdo estratégico</span>
              <span className="block">e conexões de alto nível.</span>
            </p>
          </div>
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-2 text-center">
            <div className="flex items-center justify-center gap-3 text-[clamp(1.1rem,4.5vw,2.1rem)]">
              <span className="grid h-7 w-7 shrink-0 place-items-center">
                <Calendar
                  className="h-6 w-6 text-[#F5C02B]"
                  strokeWidth={2.2}
                />
              </span>
              <p>23 e 24 de Julho.</p>
            </div>
            <div className="flex items-start justify-center gap-3 text-[clamp(1.1rem,4.5vw,2.1rem)]">
              <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center">
                <MapPin className="h-6 w-6 text-[#F5C02B]" strokeWidth={2.2} />
              </span>
              <p>
                <span className="block">
                  Centro de Convenções Vasco Vasques
                </span>
                <span className="block">Manaus/AM</span>
              </p>
            </div>
          </div>

          <div id="newvendas-primary-cta" className="flex justify-center">
            <NewVendasHeaderMask
              titulo="Comprar passaporte"
              link="#passaportes"
              textColor="#FFFFFF"
              backgroundColor="#1E1A12"
              font="700"
              size="lg"
            />
          </div>

          <div>
            <h3 className="font-anton text-[clamp(1.1rem,2.8vw,2rem)] uppercase tracking-[0.03em]">
              Onde os maiores especialistas do país se encontram.
            </h3>
          </div>

          <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-x-3 gap-y-5 px-2 py-2">
            {metrics.map((item, index) => (
              <div key={item.label} className="min-w-0 w-[30%] text-center">
                <p className="font-jamjuree font-extrabold text-[28px] leading-none tracking-normal text-white sm:text-[36px] md:text-[64px]">
                  {formatMetricValue(animatedValues[index] ?? 0, item)}
                </p>
                <p className="mt-1 font-jamjuree text-[11px] font-bold uppercase tracking-[0.02em] text-white md:text-[19px]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <section className="mx-auto mt-8 w-full max-w-6xl">
            <h3 className="text-center font-anton text-[clamp(1.3rem,4.2vw,2.8rem)] uppercase leading-[1.08] tracking-[0.03em] text-[#F5C02B]">
              Conheça os primeiros palestrantes confirmados do DSX
            </h3>

            <div className="mx-auto mt-6 grid w-full max-w-6xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {mainSpeakers.map((speaker) => (
                <article
                  key={speaker.name}
                  className="overflow-hidden rounded-xl border border-[#5A4718] bg-black/80 text-left shadow-lg"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#101010]">
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="h-full w-full object-contain object-center"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="px-4 pt-3">
                    <h4 className="font-bebas text-2xl uppercase tracking-[0.02em] text-[#F5A205]">
                      {speaker.name}
                    </h4>
                  </div>
                  <div className="px-4 pb-4">
                    <p className="font-jamjuree text-sm leading-relaxed text-white/90 md:text-[15px]">
                      {speaker.bio}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default NewVendasHero;
