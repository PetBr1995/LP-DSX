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
  toSegmentSlug(
    String(value || "")
      .replace(/\//g, " ")
      .trim(),
  );

const segmentLandingList = [
  {
    name: "Marketing",
    image: "/optimized/step1/BannerCallToActionVendas.webp",
    category: "Segmento Estratégico",
    headline:
      "Pare de tratar o seu tráfego como aposta. No DSX, o marketing é ciência de dados e lucro",
    subtitle:
      "O ambiente presencial onde empresários e gestores dominam a aquisição de clientes com previsibilidade e escala.",
    hook: "Em 2 dias, você terá o direcionamento estratégico para eliminar o desperdício de verba e construir um sistema de vendas que não depende da sorte, mas de método.",
    about:
      "Você investe em social media, design e tráfego todo mês, mas não sabe exatamente o que está funcionando e o que está queimando dinheiro?",
    topics: [
      "Posicionamento e autoridade de marca em mercados saturados sem depender de impulsionamento toda semana.",
      "Estratégias de tráfego pago, funis de venda e criativos de alta conversão que realmente escalam.",
      "Inteligência artificial aplicada para produzir mais, gastar menos e decidir com base em dados.",
    ],
    painPoints: [
      "Você investe em anúncios todo mês mas no final não sabe se lucrou ou só movimentou dinheiro.",
      "O custo para conseguir um novo cliente sobe todo mês e você não sabe por quê.",
      "Cada campanha parece um teste novo, nunca um sistema replicável.",
      "Você depende de agências que entregam relatórios, mas não entregam clientes.",
      "Seu conteúdo gera alcance, mas não gera caixa.",
    ],
    transitionLine:
      "Marketing sem método não tem escala. No DSX você aprende a construir a máquina, não só apertar o botão.",
    outcomesHeadline: "O que você vai encontrar no DSX:",
    outcomes: [
      "Como construir posicionamento e autoridade de marca em mercados saturados.",
      "Estratégias de tráfego pago, funis de venda e criativos de alta conversão que realmente escalam.",
      "O que os maiores times criativos do Brasil estão fazendo agora para transformar conteúdo em venda.",
      "Como usar inteligência artificial para produzir mais, gastar menos e tomar decisões baseadas em dados.",
      "Ferramentas e táticas modernas que geram escala sem precisar adivinhar o que funciona.",
      "Network com outros profissionais e acesso direto a palestrantes que estão no centro do mercado nacional.",
    ],
    speakersHeadline: "PALESTRANTES CONFIRMADOS NO DSX 2026",
    segmentSpeakers: [
      {
        name: "Fernando Miranda",
        image: "/novas-palestrantes/Fernando-Miranda.png",
        bio: "Liderou o crescimento de uma operação de educação em 40 vezes. Especialista em Growth e Ciência de Marketing, focado em transformar dados em faturamento bruto.",
      },
      {
        name: "Roberto Reis",
        image: "/novas-palestrantes/Roberto-Reis.png",
        bio: "Estrategista de Liderança e Performance. Mentor de mais de 1.200 líderes, especialista em comunicação de impacto que converte atenção em decisão.",
      },
      {
        name: "Carolina Lima",
        image: "/foto-carolina-lima.png",
        bio: "+17 anos de experiência em mídias sociais, une visão estratégica e criativa, com formação multidisciplinar e atuação empreendedora no e-commerce.",
      },
      {
        name: "João Branco",
        image: "/foto-joao-branco.png",
        bio: "O CMO responsável pelo Méqui. Transformou a maior rede de fast-food do mundo no Brasil, batendo recordes de vendas com marca e performance integradas.",
      },
      {
        name: "Giullya Becker",
        image: "/novas-palestrantes/GIULLYA-BECKER.png",
        bio: "Criadora do Método dos Conteúdos Magnéticos. Pioneira em oficinas práticas de criação, referência em conteúdos que geram conexão e vendas.",
      },
      {
        name: "Clayton Pascarelli",
        image: "/foto-claytonpascarelli.png",
        bio: "Especialista em jornalismo investigativo e PNL aplicada à oratória, atuando na formação de profissionais e líderes para comunicação com segurança.",
      },
      {
        name: "Rafael Liporace",
        image: "/palestrantes/RafaelLiporace.png",
        bio: "CEO da Tardezinha. Mentor por trás da maior turnê da história da música brasileira. Expert em economia criativa e em transformar eventos em ativos de milhões.",
      },
    ],
    socialProofHeadline:
      "Quem aplicou o método DSX não voltou a fazer marketing no achismo.",
    socialProofQuotes: [
      "Depois do DSX, estruturamos o funil e paramos de investir no escuro.",
      "Saímos do achismo para um processo claro de aquisição e conversão.",
      "O conteúdo aplicado no evento mudou nosso resultado já na semana seguinte.",
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
      "Quanto custa para o seu negócio continuar investindo por mês em anúncios que não trazem lucro? O DSX se paga no primeiro ajuste de campanha que você fizer na segunda-feira pós-evento.",
    groupHeadline: "Ninguém cresce sozinho",
    groupCopy:
      "Passaporte em grupo para alinhar time, acelerar decisões e aplicar o método DSX com execução coordenada.",
    urgencyHeadline: "GARANTIR NO LOTE ATUAL",
    urgencyCopy: "3º lote • Poucas vagas disponíveis.",
    faqs: [
      {
        q: "Para quem é o DSX?",
        a: "Para donos de negócio, empreendedores, gestores e profissionais que querem construir uma operação de marketing previsível dentro da própria empresa em busca de ROI.",
      },
      {
        q: "Como funciona o parcelamento?",
        a: "Em até 12x sem juros no cartão.",
      },
    ],
    finalHeadline:
      "Cada semana sem uma estratégia de marketing que funciona é mais verba queimada.",
    finalSubheadline: "Isso acaba no DSX Marketing.",
    finalRecap: [
      "23 e 24 de julho • Manaus • Centro de Convenções Vasco Vasques.",
      "2 dias de imersão com os maiores nomes do mercado nacional.",
      "3º lote com poucas vagas restantes neste valor.",
    ],
  },
  {
    name: "Vendas",
    image: "/optimized/step1/Banner-vendas-hero.webp",
    category: "Segmento Estratégico",
    headline:
      "Vender não pode ser uma questão de sorte. Construa uma máquina de vendas que funciona mesmo quando seu melhor vendedor sai",
    subtitle:
      "Para empreendedores, gestores e profissionais de vendas que sabem que venda previsível não é sorte nem carisma. É método, processo e métricas.",
    hook: "Em 2 dias, você sai com processo, funil e time estruturados para fechar mais. Sem depender de talento individual.",
    about:
      "Você tem vendedores. Mas tem um processo validado, ou cada um vende do jeito que quer?",
    topics: [
      "Vendas",
      "Marketing & Performance",
      "Ferramentas de Crescimento",
      "Inteligência Artificial",
      "Gestão Comercial",
    ],
    painPoints: [
      "Seu processo de vendas existe na cabeça de uma pessoa, não num playbook.",
      "Quando entra um vendedor novo, leva meses para atingir a meta.",
      "Taxa de conversão varia demais entre os vendedores, sem consistência.",
      "Você não sabe exatamente em qual etapa do funil estão perdendo negócios.",
      "Seu time vende por volume e pressão, não por processo e método.",
    ],
    transitionLine:
      "No DSX você aprende a construir o sistema que qualquer bom vendedor consegue replicar.",
    outcomesHeadline: "O QUE VOCÊ LEVA DO DSX",
    outcomes: [
      "Vendas: descubra como atrair clientes de alto valor, negociar com previsibilidade e fechar contratos maiores, construindo um modelo de receita que não depende de mês bom ou vendedor motivado.",
      "Marketing & Performance: pare de impulsionar no achismo. Aprenda a estruturar tráfego pago, funis de venda e criativos de alta conversão que geram lead qualificado e reduzem o custo de aquisição.",
      "Ferramentas de Crescimento: chega de testar o que não funciona. Aprenda direto com especialistas as tecnologias e táticas que realmente escalam operações comerciais, sem desperdiçar verba nem tempo.",
      "Inteligência Artificial: transforme a IA em vantagem competitiva no seu processo de vendas. Automatize tarefas, eleve a produtividade do time comercial e tome decisões baseadas 100% em dados.",
      "Gestão Comercial: pare de perder vendas por desorganização. Estruture cada etapa do processo comercial, use o CRM de forma inteligente e prepare sua operação para escalar sem perder negócio no caminho.",
    ],
    speakersHeadline: "PALESTRANTES CONFIRMADOS NO DSX 2026",
    segmentSpeakers: [
      {
        name: "Breno Maciel",
        image: "/foto-breno-maciel.png",
        bio: "Estrategista de Vendas e Processos. Especialista em estruturação de máquinas de vendas que geram previsibilidade e escala para empresas de médio e grande porte.",
      },
      {
        name: "Magno Rodrigues",
        image: "/foto-magno-rodrigues.png",
        bio: "Especialista em Performance de Time e Gestão Comercial. Mentor de líderes que buscam transformar grupos de vendedores em esquadrões de fechamento orientados por dados.",
      },
      {
        name: "Roberta Veras",
        image: "/palestrantes/RobertaGaspar.png",
        bio: "Especialista em Vendas Consultivas e Experiência do Cliente. Focada em otimização de funil e aumento de LTV (Lifetime Value) através de processos replicáveis.",
      },
    ],
    socialProofHeadline:
      "Quem aplicou métodos aprendidos no DSX não voltou a fazer vendas no achismo.",
    socialProofQuotes: [
      "Depois do DSX, nosso time passou a vender com processo e previsibilidade real.",
      "Ajustamos funil e abordagem comercial, e a taxa de fechamento subiu com consistência.",
      "Saímos do improviso e montamos uma operação comercial que funciona sem depender de herói.",
    ],
    immersionHeadline:
      "O DSX é um evento construído para quem não tem tempo a perder.",
    immersionBullets: [
      "2 dias de conteúdos estratégicos com os maiores nomes do mercado",
      "+40 palestras",
      "3 palcos simultâneos",
      "Feira de Negócios",
      "Local: Centro de Convenções Vasco Vasques",
    ],
    valueAnchor:
      "Qual é o custo de um vendedor novo levar 6 meses para performar? Ou de um lead qualificado ser perdido por falta de processo? O passaporte do DSX custa menos do que um mês de meta não batida por falta de processo.",
    groupHeadline: "NINGUÉM CRESCE SOZINHO",
    groupCopy:
      "Traga seu time para alinhar funil, script e operação comercial no mesmo método de crescimento.",
    urgencyHeadline: "GARANTIR NO LOTE ATUAL",
    urgencyCopy: "3º lote • Poucas vagas disponíveis.",
    faqs: [
      {
        q: "Para quem é o DSX?",
        a: "Para empreendedores, gestores e profissionais de vendas que lideram times e sabem que o problema não é o vendedor, é a falta de processo, método e métricas por trás dele.",
      },
      {
        q: "Serve para vendas B2B e B2C?",
        a: "Sim. O conteúdo do DSX foi desenvolvido para funcionar em qualquer modelo de venda: consultiva, transacional, recorrente ou por projeto.",
      },
      {
        q: "Como funciona o parcelamento?",
        a: "Em até 12x no cartão de crédito.",
      },
    ],
    finalHeadline:
      "Cada semana sem um processo de vendas que funciona é mais lead perdido, mais verba queimada e mais meta não batida. Isso muda no DSX.",
    finalRecap: [
      "23 e 24 de julho • Manaus • Centro de Convenções Vasco Vasques — 2 dias de imersão para construir uma máquina de vendas previsível.",
      "Funil, script e treinamento: tudo estruturado antes de sair do evento.",
      "3º lote com poucas vagas restantes neste valor.",
    ],
  },
  {
    name: "Inovação",
    aliases: ["inovacao"],
    image: "/dsx-2026.jpeg",
    category: "Segmento Estratégico",
    headline:
      "Domine o método para inovar sua operação e manter sua empresa relevante e lucrativa",
    subtitle:
      "Menos teoria, mais método para aplicar tecnologia onde ela realmente importa: no seu caixa.",
    hook: "Em 2 dias, você terá o framework prático para antecipar tendências e aplicar tecnologia onde ela realmente gera escala.",
    about:
      "Você sente que o mercado está mudando mais rápido do que sua empresa consegue acompanhar?",
    topics: [
      "Radar de mercado",
      "Framework de priorização",
      "Processo de validação",
      "Cultura de inovação",
      "Roteiro de tecnologia",
    ],
    painPoints: [
      "Você vê concorrentes novos crescendo em meses o que você levou anos para construir.",
      "Tenta inovar, mas as ideias morrem antes de virar produto ou processo.",
      "Sua equipe é boa no operacional, mas não tem cultura de pensar diferente.",
      "Já investiu em tecnologia que não entregou o retorno prometido.",
      "Você sabe que precisa mudar, mas não sabe por onde começar sem comprometer o que já funciona.",
    ],
    transitionLine:
      "Inovação sem método é apenas gasto. No DSX Inovação você aprende a estrutura que transforma experimentação em vantagem competitiva sustentável.",
    outcomesHeadline: "O que você sai tendo depois do DSX:",
    outcomes: [
      "Radar de mercado: como identificar movimentos antes que virem ameaça.",
      "Framework de priorização: como escolher o que inovar primeiro com o menor risco.",
      "Processo de validação: como testar uma ideia nova em poucos dias e com baixo custo.",
      "Cultura de inovação: como criar um ambiente onde seu time pensa em melhoria contínua.",
      "Roteiro de tecnologia: quais ferramentas e tendências realmente importam para o seu negócio agora.",
    ],
    speakersHeadline: "PALESTRANTES CONFIRMADOS NO DSX 2026",
    segmentSpeakers: [
      {
        name: "Afrânio Soares",
        image: "/novas-palestrantes/Afranio-Soares.png",
        bio: "O maior estrategista de dados e cenários do Norte. Fundador da Action, traduz números em decisões de mercado que antecipam tendências antes que elas virem ameaças.",
      },
      {
        name: "Gisele Oshiro",
        image: "/novas-palestrantes/foto-giselle-oshiro.png",
        bio: "Transforma inteligência emocional em estratégia aplicada ao negócio, impactando decisões, liderança e performance.",
      },
      {
        name: "Suelen Scop",
        image: "/novas-palestrantes/foto-suelen-scop.png",
        bio: "Psicóloga e estrategista de IA aplicada ao lucro. Especialista em integrar inteligência artificial no fluxo empresarial para reduzir custos e acelerar a produtividade.",
      },
      {
        name: "Flávia Sausmikat",
        image: "/novas-palestrantes/Flavia-Sausmikat.png",
        bio: "Especialista em análise de comportamento social e de consumo, unindo rigor técnico e sensibilidade para gerar insights relevantes e estratégicos para organizações.",
      },
    ],
    socialProofHeadline:
      "Depoimentos de quem aprendeu a aplicar inovação com assertividade.",
    socialProofQuotes: [
      "Saímos com um plano claro para inovar sem comprometer a operação atual.",
      "Aplicamos o framework do DSX e validamos novas iniciativas com muito menos risco.",
      "A visão estratégica de inovação trouxe decisões mais rápidas e melhores resultados.",
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
      "Qual o preço de continuar investindo tempo e dinheiro em processos que o mercado já abandonou? O DSX Inovação não é um gasto; é o seguro contra a obsolescência do seu negócio.",
    groupHeadline: "NINGUÉM CRESCE SOZINHO",
    groupCopy:
      "Leve seu time para alinhar tecnologia, priorização e execução da inovação com o mesmo método.",
    urgencyHeadline: "GARANTIR NO LOTE ATUAL",
    urgencyCopy: "3º lote • Poucas vagas disponíveis.",
    faqs: [
      {
        q: "Para quem é o DSX?",
        a: "Para donos de negócio e líderes que querem entender como usar a inovação como ferramenta estratégica.",
      },
      {
        q: "Preciso entender de tecnologia para aproveitar?",
        a: "Não. O DSX foi feito justamente para o dono do negócio, não para o programador. Você não vai aprender a fazer código, vai aprender a comprar, gerir e implementar inovação para ter vantagem competitiva.",
      },
      {
        q: "Como funciona o parcelamento?",
        a: "Em até 12 vezes no cartão de crédito.",
      },
    ],
    finalHeadline:
      "O mercado não espera. As empresas que ganham nos próximos anos já estão aprendendo a inovar com método. O DSX Inovação é o seu próximo passo.",
    finalRecap: [
      "23 e 24 de julho • Manaus • Centro de Convenções Vasco Vasques — 2 dias de imersão em inovação estratégica para empreendedores.",
      "Framework, validação, tendências e cultura: o kit completo para inovar com resultado.",
      "3º lote com poucas vagas restantes neste valor.",
    ],
  },
  {
    name: "Negócios",
    aliases: ["negocios"],
    image: "/optimized/step1/Banner-vendas-hero.webp",
    category: "Segmento Estratégico",
    headline: "Onde empresários constroem o futuro dos negócios no Norte",
    subtitle:
      "Conecte-se com quem já escalou operações de milhões e entenda o modelo de gestão da nova economia.",
    hook: "Em 2 dias, você sai com o mapa completo para construir uma empresa que cresce sem depender só de você.",
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
      "Você sabe que precisa de processos, mas nunca tem tempo para montar.",
      "Toda vez que tira o pé do acelerador, a empresa desacelera junto.",
    ],
    transitionLine:
      "Você não chegou até aqui por falta de esforço. Chegou até aqui com o modelo errado de empresa. E o DSX existe para mudar isso.",
    outcomesHeadline: "O que você sai tendo depois do DSX:",
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
        bio: "Do açougue de bairro a um faturamento de R$ 1 milhão por dia. O case real de como transformar produto em uma rede de franquias escalável.",
      },
      {
        name: "Carlos Oshiro",
        image: "/foto-carlos-oshiro.png",
        bio: "Ajuda empresários a transitar a mentalidade da velha para a nova economia. Tem um ecossistema de mais de 1.500 empresários de Manaus na nova economia.",
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
    socialProofHeadline:
      "Quem já esteve no DSX não volta ao mesmo nível de negócio",
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
  return (
    segmentBySlug[directKey] || segmentBySlug[normalizeSegmentLookup(directKey)]
  );
};

export { segmentLandingList };
