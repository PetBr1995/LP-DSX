const DEFAULT_EVENT = {
  name: "DSX 2026",
  date: "23 e 24 de julho",
  city: "Manaus",
  startDateIso: "2026-07-23T09:00:00-04:00",
};

const SYMPLA_CHECKOUT_URL =
  "https://www.sympla.com.br/evento/dsx-2026-digital-summit-experience/3339721";

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
    headline: "Marketing no DSX 2026",
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
    image: "/Banner-vendas-hero.png",
    category: "Segmento Estratégico",
    headline: "Onde empresários constroem o futuro dos negócios no Norte.",
    subtitle:
      "Conecte-se com quem já escalou operações de milhões e entenda o modelo de gestão da nova economia.",
    hook:
      "Em 2 dias, você sai com o mapa completo para a construir uma empresa que cresce sem depender só de você.",
    about:
      "Imersão construída para donos de negócio e líderes que precisam estruturar governança, processos e delegação para ganhar escala com previsibilidade.",
    topics: [
      "Estrutura e governança para decisões de alto impacto",
      "Processos-chave e delegação para escalar com previsibilidade",
      "Crescimento com clareza estratégica e execução disciplinada",
    ],
    painPoints: [
      "Você é o maior gargalo da sua empresa, toda decisão passa por você.",
      "Faturamento cresce, mas lucro some em custo fixo e retrabalho.",
      "Seu time executa, mas não pensa. Você ainda precisa resolver tudo.",
      "Você sabe que precisa de processos, mas nunca tem tempo pra montar.",
      "Toda vez que tira o pé do acelerador, a empresa desacelera junto.",
    ],
    transitionLine:
      "Você não chegou até aqui por falta de esforço. Chegou até aqui com o modelo errado de empresa. E o DSX existe para mudar isso.",
    outcomesHeadline: "O que você sai tendo depois do DSX para o seu negócio:",
    outcomes: [
      "Estrutura de governança: quem decide o quê, quando e como.",
      "Mapa de processos-chave: os 3 fluxos que mais impactam seu caixa, desenhados e prontos.",
      "Método de delegação: como transferir responsabilidade sem perder qualidade.",
      "Plano de crescimento previsível: meta, indicador, ação. Sem achismo.",
      "Clareza sobre o próximo movimento estratégico da sua empresa.",
    ],
    speakersHeadline: "PALESTRANTES CONFIRMADOS NO DSX 2026",
    segmentSpeakers: [
      {
        name: "João Kepler",
        image: "/novas-palestrantes/Joao-Kepler.png",
        bio: "O maior investidor-anjo do Brasil. Especialista em Equity e em como preparar sua empresa para valer 10x mais no mercado.",
      },
      {
        name: "Nicolas Charão",
        image: "/novas-palestrantes/Nicolas-Charao.png",
        bio: "Com mais de 10 anos de experiência, já mentoreou centenas de empresários e donos de agência, contribuindo para a formação de mais de 50 negócios milionários.",
      },
      {
        name: "Netão Bom Beef",
        image: "/foto-netao-bom-beef.PNG",
        bio: "Do açougue de bairro a um faturamento de R$1 milhão por dia. O case real de como transformar produto em uma rede de franquias escalável.",
      },
      {
        name: "Carlos Oshiro",
        image: "/foto-carlos-oshiro.png",
        bio: "Ajuda empresários a transitar a mentalidade da velha para a nova economia. Tem um ecossistema de mais de 1500 empresários de Manaus na nova economia.",
      },
      {
        name: "Chay Santos",
        image: "/foto-chay-santos.png",
        bio: "Estrategista de Marketing e Branding. Especialista em construir posicionamentos que permitam cobrar mais caro e dominar nichos de mercado.",
      },
      {
        name: "Fabrício Alva",
        image: "/novas-palestrantes/slide-fabricio-alva.PNG",
        bio: "Consultor empresarial, estrategista de negócios e especialista em performance. Já ajudou empresas e profissionais a estruturarem seus negócios com mais clareza, eficiência e previsibilidade.",
      },
    ],
    socialProofHeadline: "Quem já esteve no DSX não volta ao mesmo nível de negócio",
    socialProofQuotes: [
      "Saí do DSX com clareza para reorganizar minha operação e ganhamos velocidade no crescimento.",
      "Foi o ponto de virada para delegar melhor e parar de centralizar todas as decisões.",
      "As conexões que fiz no evento se transformaram em parcerias reais para o negócio.",
    ],
    socialProofVideos: [
      {
        nome: "AUGUSTO CÉSAR",
        tipo: "EXPOSITOR",
        thumb: "/card-image/expositor-card-img.png",
        video: "https://vimeo.com/1148163345?fl=ip&fe=ec",
      },
      {
        nome: "JOÃO KEPLER",
        tipo: "PALESTRANTE",
        thumb: "/card-image/kepler-card-img.png",
        video: "https://vimeo.com/1148163374?fl=ip&fe=ec",
      },
      {
        nome: "FERNANDA",
        tipo: "PARTICIPANTE",
        thumb: "/card-image/participante-card-img.png",
        video: "https://vimeo.com/1148163408?fl=ip&fe=ec",
      },
    ],
    immersionHeadline:
      "O DSX é uma imersão construída para quem não tem tempo a perder.",
    immersionBullets: [
      "2 dias de conteúdos estratégicos com os maiores nomes do mercado",
      "+40 palestras",
      "3 palcos simultâneos",
      "Feira de Negócios",
      "Local: Centro de Convenções Vasco Vasques",
    ],
    valueAnchor:
      "O custo de não estar no DSX é muito maior do que o valor do passaporte. Um erro na sua estratégia de escala ou um processo de delegação mal feito custa, por mês, dez vezes o investimento que você fará hoje.",
    groupHeadline: "Ninguém cresce sozinho",
    groupCopy:
      "Monte sua delegação e acelere decisões com o time alinhado no mesmo método de crescimento.",
    urgencyHeadline: "GARANTIR NO LOTE ATUAL",
    urgencyCopy:
      "O mercado não espera. Garanta sua cadeira no setor de decisões antes da virada de lote.",
    faqs: [
      {
        q: "Para quem é o DSX?",
        a: "Para donos de negócio e empreendedores que querem estruturar suas empresas para crescer e perceberam que o amadorismo na gestão está drenando o lucro.",
      },
      {
        q: "Como funciona o parcelamento?",
        a: "Você pode garantir o seu passaporte via PIX (com aprovação imediata) ou parcelar no cartão de crédito em até 12 vezes.",
      },
      {
        q: "O que está incluso no ingresso VIP?",
        a: "Lounge VIP exclusivo, networking com decisores, kit premium, primeiras fileiras, 2 dias de evento, +40 palestras, feira de negócios e certificado de participação.",
      },
    ],
    finalHeadline: "Não estar no DSX também é uma decisão estratégica.",
    finalSubheadline:
      "Só certifique-se de que você consegue arcar com o preço dela.",
    finalRecap: [
      "23 e 24 de julho • Manaus • Centro de Convenções Vasco Vasques — 2 dias de imersão com os melhores especialistas em negócios do Brasil.",
      "Estrutura, processos, delegação e crescimento: tudo o que falta para sua empresa funcionar sem você.",
      "3º lote com poucas vagas restantes neste valor.",
    ],
  },
].map((segment) => ({
  ...segment,
  slug: toSegmentSlug(segment.name),
  role: `Trilha de ${segment.name}`,
  event: DEFAULT_EVENT,
  ctaLabel: `Quero ingresso para ${segment.name}`,
  ctaLink: SYMPLA_CHECKOUT_URL,
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
