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

const normalizeSegmentLookup = (value = "") =>
  toSegmentSlug(String(value || "").replace(/\//g, " ").trim());

const segmentLandingList = [
  {
    name: "Marketing",
    image: "/optimized/step1/BannerCallToActionVendas.webp",
    category: "Segmento EstratÃ©gico",
    headline: "Marketing no DSX 2026",
    subtitle:
      "EstratÃ©gias prÃ¡ticas para posicionar sua marca, aumentar demanda e transformar conteÃºdo em crescimento previsÃ­vel.",
    hook:
      "Da atraÃ§Ã£o ao fechamento: vocÃª vai enxergar o marketing como sistema de geraÃ§Ã£o de receita.",
    about:
      "A trilha de Marketing foi desenhada para empresas que querem sair do improviso e construir uma mÃ¡quina de aquisiÃ§Ã£o com consistÃªncia.",
    topics: [
      "Posicionamento de marca com autoridade no mercado",
      "ConteÃºdo que gera atenÃ§Ã£o, relacionamento e conversÃ£o",
      "AquisiÃ§Ã£o previsÃ­vel com trÃ¡fego, funis e ofertas",
    ],
    outcomes: [
      "Plano de aÃ§Ã£o para destravar demanda qualificada",
      "Estrutura clara para escalar presenÃ§a e vendas",
      "DecisÃµes orientadas por dados e performance",
    ],
    segmentSpeakers: [
      { name: "Camila Renaux", image: "/palestrantes/CamilaRenaux.png" },
      { name: "Rafael Kiso", image: "/palestrantes/RafaelKiso.png" },
      { name: "Carol Lima", image: "/palestrantes/CarolLima.png" },
      { name: "AndrÃ© Siqueira", image: "/palestrantes/AndreSiqueira.png" },
      { name: "Hanah Franklin", image: "/palestrantes/HanahFranklin.png" },
    ],
  },
  {
    name: "Vendas",
    image: "/optimized/step1/Banner-vendas-hero.webp",
    category: "Segmento EstratÃ©gico",
    headline: "Segmento de Vendas no DSX 2026",
    subtitle:
      "MÃ©todos de prospecÃ§Ã£o, negociaÃ§Ã£o e fechamento para vender com mais margem, previsibilidade e escala.",
    hook:
      "Menos achismo comercial e mais processo: da abordagem ao fechamento com direÃ§Ã£o.",
    about:
      "A trilha de Vendas conecta estratÃ©gia e execuÃ§Ã£o para quem quer crescimento real sem depender de sorte ou sazonalidade.",
    topics: [
      "ProspecÃ§Ã£o inteligente para gerar oportunidades reais",
      "NegociaÃ§Ã£o de alto valor e fechamento consultivo",
      "GestÃ£o de pipeline e previsibilidade comercial",
    ],
    outcomes: [
      "Playbook comercial para aplicar no time",
      "Ritual de vendas com indicadores de performance",
      "EstratÃ©gias para aumentar taxa de conversÃ£o",
    ],
    segmentSpeakers: [
      { name: "Tallis Gomes", image: "/palestrantes/TallisGomes.png" },
      { name: "Nicolas CharÃ£o", image: "/palestrantes/NicolasCharao.png" },
      { name: "JoÃ£o Brognoli", image: "/palestrantes/JoaoBrognoli.png" },
      { name: "Alfredo Soares", image: "/palestrantes/AlfredoSoares.png" },
      { name: "Fernando Miranda", image: "/palestrantes/FernandoMiranda.png" },
    ],
  },
  {
    name: "InovaÃ§Ã£o",
    aliases: ["inovacao"],
    image: "/dsx-2026.jpeg",
    category: "Segmento EstratÃ©gico",
    headline: "Segmento de InovaÃ§Ã£o no DSX 2026",
    subtitle:
      "Como aplicar tecnologia, IA e novos modelos de execuÃ§Ã£o para acelerar eficiÃªncia e vantagem competitiva.",
    hook:
      "InovaÃ§Ã£o aplicada ao negÃ³cio real: menos tendÃªncia vazia, mais resultado concreto.",
    about:
      "A trilha de InovaÃ§Ã£o mostra como transformar mudanÃ§as de mercado em oportunidades com foco em velocidade e adaptaÃ§Ã£o.",
    topics: [
      "IA aplicada ao marketing, vendas e operaÃ§Ã£o",
      "AutomaÃ§Ã£o de processos para ganho de produtividade",
      "Tomada de decisÃ£o com visÃ£o de futuro e dados",
    ],
    outcomes: [
      "Mapa prÃ¡tico de adoÃ§Ã£o de inovaÃ§Ã£o",
      "IdentificaÃ§Ã£o dos gargalos que mais travam escala",
      "EstratÃ©gias para acelerar execuÃ§Ã£o com tecnologia",
    ],
    segmentSpeakers: [
      { name: "JoÃ£o Kepler", image: "/palestrantes/JoaoKepler.png" },
      { name: "MaurÃ­cio Stellato", image: "/palestrantes/MauricioStellato.png" },
      { name: "Gerson Toller", image: "/palestrantes/GersonToller.png" },
      { name: "Suelen Scop", image: "/palestrantes/SuellenScop.png" },
      { name: "Lucas Pimenta", image: "/palestrantes/LucasPimenta.png" },
    ],
  },
  {
    name: "NegÃ³cios",
    aliases: ["negocios"],
    image: "/optimized/step1/Banner-vendas-hero.webp",
    category: "Segmento EstratÃ©gico",
    headline: "Onde empresÃ¡rios constroem o futuro dos negÃ³cios no Norte.",
    subtitle:
      "Conecte-se com quem jÃ¡ escalou operaÃ§Ãµes de milhÃµes e entenda o modelo de gestÃ£o da nova economia.",
    hook:
      "Em 2 dias, vocÃª sai com o mapa completo para a construir uma empresa que cresce sem depender sÃ³ de vocÃª.",
    about:
      "ImersÃ£o construÃ­da para donos de negÃ³cio e lÃ­deres que precisam estruturar governanÃ§a, processos e delegaÃ§Ã£o para ganhar escala com previsibilidade.",
    topics: [
      "Estrutura e governanÃ§a para decisÃµes de alto impacto",
      "Processos-chave e delegaÃ§Ã£o para escalar com previsibilidade",
      "Crescimento com clareza estratÃ©gica e execuÃ§Ã£o disciplinada",
    ],
    painPoints: [
      "VocÃª Ã© o maior gargalo da sua empresa, toda decisÃ£o passa por vocÃª.",
      "Faturamento cresce, mas lucro some em custo fixo e retrabalho.",
      "Seu time executa, mas nÃ£o pensa. VocÃª ainda precisa resolver tudo.",
      "VocÃª sabe que precisa de processos, mas nunca tem tempo pra montar.",
      "Toda vez que tira o pÃ© do acelerador, a empresa desacelera junto.",
    ],
    transitionLine:
      "VocÃª nÃ£o chegou atÃ© aqui por falta de esforÃ§o. Chegou atÃ© aqui com o modelo errado de empresa. E o DSX existe para mudar isso.",
    outcomesHeadline: "O que vocÃª sai tendo depois do DSX para o seu negÃ³cio:",
    outcomes: [
      "Estrutura de governanÃ§a: quem decide o quÃª, quando e como.",
      "Mapa de processos-chave: os 3 fluxos que mais impactam seu caixa, desenhados e prontos.",
      "MÃ©todo de delegaÃ§Ã£o: como transferir responsabilidade sem perder qualidade.",
      "Plano de crescimento previsÃ­vel: meta, indicador, aÃ§Ã£o. Sem achismo.",
      "Clareza sobre o prÃ³ximo movimento estratÃ©gico da sua empresa.",
    ],
    speakersHeadline: "PALESTRANTES CONFIRMADOS NO DSX 2026",
    segmentSpeakers: [
      {
        name: "JoÃ£o Kepler",
        image: "/novas-palestrantes/Joao-Kepler.png",
        bio: "O maior investidor-anjo do Brasil. Especialista em Equity e em como preparar sua empresa para valer 10x mais no mercado.",
      },
      {
        name: "Nicolas CharÃ£o",
        image: "/novas-palestrantes/Nicolas-Charao.png",
        bio: "Com mais de 10 anos de experiÃªncia, jÃ¡ mentoreou centenas de empresÃ¡rios e donos de agÃªncia, contribuindo para a formaÃ§Ã£o de mais de 50 negÃ³cios milionÃ¡rios.",
      },
      {
        name: "NetÃ£o Bom Beef",
        image: "/foto-netao-bom-beef.PNG",
        bio: "Do aÃ§ougue de bairro a um faturamento de R$1 milhÃ£o por dia. O case real de como transformar produto em uma rede de franquias escalÃ¡vel.",
      },
      {
        name: "Carlos Oshiro",
        image: "/foto-carlos-oshiro.png",
        bio: "Ajuda empresÃ¡rios a transitar a mentalidade da velha para a nova economia. Tem um ecossistema de mais de 1500 empresÃ¡rios de Manaus na nova economia.",
      },
      {
        name: "Chay Santos",
        image: "/foto-chay-santos.png",
        bio: "Estrategista de Marketing e Branding. Especialista em construir posicionamentos que permitam cobrar mais caro e dominar nichos de mercado.",
      },
      {
        name: "FabrÃ­cio Alva",
        image: "/novas-palestrantes/slide-fabricio-alva.PNG",
        bio: "Consultor empresarial, estrategista de negÃ³cios e especialista em performance. JÃ¡ ajudou empresas e profissionais a estruturarem seus negÃ³cios com mais clareza, eficiÃªncia e previsibilidade.",
      },
    ],
    socialProofHeadline: "Quem jÃ¡ esteve no DSX nÃ£o volta ao mesmo nÃ­vel de negÃ³cio",
    socialProofQuotes: [
      "SaÃ­ do DSX com clareza para reorganizar minha operaÃ§Ã£o e ganhamos velocidade no crescimento.",
      "Foi o ponto de virada para delegar melhor e parar de centralizar todas as decisÃµes.",
      "As conexÃµes que fiz no evento se transformaram em parcerias reais para o negÃ³cio.",
    ],
    socialProofVideos: [
      {
        nome: "AUGUSTO CÃ‰SAR",
        tipo: "EXPOSITOR",
        thumb: "/card-image/expositor-card-img.png",
        video: "https://vimeo.com/1148163345?fl=ip&fe=ec",
      },
      {
        nome: "JOÃƒO KEPLER",
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
      "O DSX Ã© uma imersÃ£o construÃ­da para quem nÃ£o tem tempo a perder.",
    immersionBullets: [
      "2 dias de conteÃºdos estratÃ©gicos com os maiores nomes do mercado",
      "+40 palestras",
      "3 palcos simultÃ¢neos",
      "Feira de NegÃ³cios",
      "Local: Centro de ConvenÃ§Ãµes Vasco Vasques",
    ],
    valueAnchor:
      "O custo de nÃ£o estar no DSX Ã© muito maior do que o valor do passaporte. Um erro na sua estratÃ©gia de escala ou um processo de delegaÃ§Ã£o mal feito custa, por mÃªs, dez vezes o investimento que vocÃª farÃ¡ hoje.",
    groupHeadline: "NinguÃ©m cresce sozinho",
    groupCopy:
      "Monte sua delegaÃ§Ã£o e acelere decisÃµes com o time alinhado no mesmo mÃ©todo de crescimento.",
    urgencyHeadline: "GARANTIR NO LOTE ATUAL",
    urgencyCopy:
      "O mercado nÃ£o espera. Garanta sua cadeira no setor de decisÃµes antes da virada de lote.",
    faqs: [
      {
        q: "Para quem Ã© o DSX?",
        a: "Para donos de negÃ³cio e empreendedores que querem estruturar suas empresas para crescer e perceberam que o amadorismo na gestÃ£o estÃ¡ drenando o lucro.",
      },
      {
        q: "Como funciona o parcelamento?",
        a: "VocÃª pode garantir o seu passaporte via PIX (com aprovaÃ§Ã£o imediata) ou parcelar no cartÃ£o de crÃ©dito em atÃ© 12 vezes.",
      },
      {
        q: "O que estÃ¡ incluso no ingresso VIP?",
        a: "Lounge VIP exclusivo, networking com decisores, kit premium, primeiras fileiras, 2 dias de evento, +40 palestras, feira de negÃ³cios e certificado de participaÃ§Ã£o.",
      },
    ],
    finalHeadline: "NÃ£o estar no DSX tambÃ©m Ã© uma decisÃ£o estratÃ©gica.",
    finalSubheadline:
      "SÃ³ certifique-se de que vocÃª consegue arcar com o preÃ§o dela.",
    finalRecap: [
      "23 e 24 de julho â€¢ Manaus â€¢ Centro de ConvenÃ§Ãµes Vasco Vasques â€” 2 dias de imersÃ£o com os melhores especialistas em negÃ³cios do Brasil.",
      "Estrutura, processos, delegaÃ§Ã£o e crescimento: tudo o que falta para sua empresa funcionar sem vocÃª.",
      "3Âº lote com poucas vagas restantes neste valor.",
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

const segmentBySlug = segmentLandingList.reduce((acc, segment) => {
  acc[segment.slug] = segment;

  (segment.aliases || []).forEach((alias) => {
    const normalizedAlias = normalizeSegmentLookup(alias);
    if (normalizedAlias) {
      acc[normalizedAlias] = segment;
    }
  });

  return acc;
}, {});

export const getSegmentBySlug = (slug = "") => {
  const directKey = String(slug || "");
  return segmentBySlug[directKey] || segmentBySlug[normalizeSegmentLookup(directKey)];
};

export { segmentLandingList };

