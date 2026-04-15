const DEFAULT_EVENT = {
  name: "DSX 2026",
  date: "23 e 24 de julho",
  city: "Manaus",
  startDateIso: "2026-07-23T09:00:00-04:00",
};

const stripAccents = (value = "") =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

export const toSegmentSlug = (value = "") =>
  stripAccents(value)
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const segmentLandingList = [
  {
    name: "Marketing",
    image: "/BannerCallToActionVendas.png",
    category: "Segmento Estratégico",
    headline: "Segmento de Marketing no DSX 2026",
    subtitle:
      "Estratégias práticas para posicionar sua marca, aumentar demanda e transformar conteúdo em crescimento previsível.",
    hook:
      "Da atração ao fechamento: você vai enxergar o marketing como sistema de geração de receita.",
    about:
      "A trilha de Marketing foi desenhada para empresas que querem sair do improviso e construir uma máquina de aquisição com consistência.",
    topics: [
      "Posicionamento de marca com autoridade no mercado",
      "Conteúdo que gera atenção, relacionamento e conversão",
      "Aquisição previsível com tráfego, funis e ofertas",
    ],
    outcomes: [
      "Plano de ação para destravar demanda qualificada",
      "Estrutura clara para escalar presença e vendas",
      "Decisões orientadas por dados e performance",
    ],
    segmentSpeakers: [
      { name: "Camila Renaux", image: "/palestrantes/CamilaRenaux.png" },
      { name: "Rafael Kiso", image: "/palestrantes/RafaelKiso.png" },
      { name: "Carol Lima", image: "/palestrantes/CarolLima.png" },
      { name: "André Siqueira", image: "/palestrantes/AndreSiqueira.png" },
      { name: "Hanah Franklin", image: "/palestrantes/HanahFranklin.png" },
    ],
  },
  {
    name: "Vendas",
    image: "/Banner-vendas-hero.png",
    category: "Segmento Estratégico",
    headline: "Segmento de Vendas no DSX 2026",
    subtitle:
      "Métodos de prospecção, negociação e fechamento para vender com mais margem, previsibilidade e escala.",
    hook:
      "Menos achismo comercial e mais processo: da abordagem ao fechamento com direção.",
    about:
      "A trilha de Vendas conecta estratégia e execução para quem quer crescimento real sem depender de sorte ou sazonalidade.",
    topics: [
      "Prospecção inteligente para gerar oportunidades reais",
      "Negociação de alto valor e fechamento consultivo",
      "Gestão de pipeline e previsibilidade comercial",
    ],
    outcomes: [
      "Playbook comercial para aplicar no time",
      "Ritual de vendas com indicadores de performance",
      "Estratégias para aumentar taxa de conversão",
    ],
    segmentSpeakers: [
      { name: "Tallis Gomes", image: "/palestrantes/TallisGomes.png" },
      { name: "Nicolas Charão", image: "/palestrantes/NicolasCharao.png" },
      { name: "João Brognoli", image: "/palestrantes/JoaoBrognoli.png" },
      { name: "Alfredo Soares", image: "/palestrantes/AlfredoSoares.png" },
      { name: "Fernando Miranda", image: "/palestrantes/FernandoMiranda.png" },
    ],
  },
  {
    name: "Inovação",
    image: "/dsx-2026.jpeg",
    category: "Segmento Estratégico",
    headline: "Segmento de Inovação no DSX 2026",
    subtitle:
      "Como aplicar tecnologia, IA e novos modelos de execução para acelerar eficiência e vantagem competitiva.",
    hook:
      "Inovação aplicada ao negócio real: menos tendência vazia, mais resultado concreto.",
    about:
      "A trilha de Inovação mostra como transformar mudanças de mercado em oportunidades com foco em velocidade e adaptação.",
    topics: [
      "IA aplicada ao marketing, vendas e operação",
      "Automação de processos para ganho de produtividade",
      "Tomada de decisão com visão de futuro e dados",
    ],
    outcomes: [
      "Mapa prático de adoção de inovação",
      "Identificação dos gargalos que mais travam escala",
      "Estratégias para acelerar execução com tecnologia",
    ],
    segmentSpeakers: [
      { name: "João Kepler", image: "/palestrantes/JoaoKepler.png" },
      { name: "Maurício Stellato", image: "/palestrantes/MauricioStellato.png" },
      { name: "Gerson Toller", image: "/palestrantes/GersonToller.png" },
      { name: "Suelen Scop", image: "/palestrantes/SuellenScop.png" },
      { name: "Lucas Pimenta", image: "/palestrantes/LucasPimenta.png" },
    ],
  },
  {
    name: "Negócios",
    image: "/local-dsx-2026.png",
    category: "Segmento Estratégico",
    headline: "Segmento de Negócios no DSX 2026",
    subtitle:
      "Visão de gestão, crescimento e networking para empresários e líderes que querem expandir com segurança.",
    hook:
      "Conexões, estratégia e execução para quem está construindo negócio de longo prazo.",
    about:
      "A trilha de Negócios é voltada para líderes que querem clareza de direção, decisões melhores e novas oportunidades comerciais.",
    topics: [
      "Modelos de crescimento e escala sustentável",
      "Gestão estratégica para decisões de alto impacto",
      "Networking com foco em parcerias e receita",
    ],
    outcomes: [
      "Prioridades claras para o próximo ciclo de crescimento",
      "Framework para decidir com mais segurança",
      "Conexões mais qualificadas para geração de negócios",
    ],
    segmentSpeakers: [
      { name: "João Branco", image: "/foto-joao-branco.png" },
      { name: "Netão Bom Beef", image: "/foto-netao-bom-beef.PNG" },
      { name: "Carlos Oshiro", image: "/palestrantes/CarlosOshiro.png" },
      { name: "Breno Maciel", image: "/palestrantes/BrenoMaciel.png" },
      { name: "Afrânio Soares", image: "/palestrantes/AfranioSoares.png" },
    ],
  },
].map((segment) => ({
  ...segment,
  slug: toSegmentSlug(segment.name),
  role: `Trilha de ${segment.name}`,
  event: DEFAULT_EVENT,
  ctaLabel: `Quero ingresso para ${segment.name}`,
  ctaLink: "/vendas#passaportes",
  urgencyLabel: "Vagas limitadas para essa trilha",
  socialProof: {
    attendees: "+2.000",
    talks: "+40",
    exhibitors: "+30",
  },
}));

const segmentBySlug = Object.fromEntries(
  segmentLandingList.map((segment) => [segment.slug, segment]),
);

export const getSegmentBySlug = (slug = "") => segmentBySlug[String(slug || "")];

export { segmentLandingList };
