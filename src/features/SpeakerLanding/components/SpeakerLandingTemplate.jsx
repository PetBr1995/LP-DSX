import NewVendasHeaderMask from "../../../components/NewVendas/NewVendasHeaderMask";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  ShieldCheck,
  Ticket,
  Users,
  XCircle,
} from "lucide-react";
import { useMemo } from "react";

const THEME_COPY = {
  marketing: {
    painPoints: [
      "Investe em tráfego, mas não enxerga ROI com clareza.",
      "Produz conteúdo, mas os leads não avançam para venda.",
      "Equipe sem processo claro de aquisição e conversão.",
      "Dependência de campanhas pontuais para bater meta.",
    ],
    promise: "Sair com funis e campanhas estruturados para gerar demanda previsível.",
    ctaAfterSpeakers: "QUERO APRENDER COM ESSES ESPECIALISTAS",
    ctaAfterSocial: "QUERO FAZER PARTE",
    ctaAfterPrices: "GARANTIR POR 12x R$ 41,42",
    ctaFinal: "GARANTIR AGORA — ULTIMAS VAGAS",
  },
  vendas: {
    painPoints: [
      "Time vende por esforço, sem processo repetivel.",
      "Pipeline desorganizado e baixa previsibilidade mensal.",
      "Negociacao longa, com perda de margem no fechamento.",
      "Dependencia excessiva de poucos vendedores-chave.",
    ],
    promise: "Sair com rotina comercial, playbook e metodo de fechamento aplicavel no dia seguinte.",
    ctaAfterSpeakers: "QUERO FECHAR MAIS",
    ctaAfterSocial: "QUERO FAZER PARTE",
    ctaAfterPrices: "GARANTIR POR 12x R$ 41,42",
    ctaFinal: "GARANTIR AGORA — ULTIMAS VAGAS",
  },
  inovacao: {
    painPoints: [
      "Muita tendencia e pouca aplicacao real no negocio.",
      "Operacao lenta por falta de automacao pratica.",
      "Dificuldade para priorizar o que realmente gera ganho.",
      "Decisoes sem dados confiaveis em tempo habil.",
    ],
    promise: "Sair com mapa de adocao de inovacao orientado a resultado e produtividade.",
    ctaAfterSpeakers: "QUERO INOVAR COM METODO",
    ctaAfterSocial: "QUERO FAZER PARTE",
    ctaAfterPrices: "GARANTIR POR 12x R$ 41,42",
    ctaFinal: "GARANTIR AGORA — ULTIMAS VAGAS",
  },
  negocios: {
    painPoints: [
      "A empresa para quando voce para.",
      "Falta clareza de prioridade para o proximo ciclo.",
      "Crescimento sem estrutura, com retrabalho constante.",
      "Networking sem estrategia de negocio concreta.",
    ],
    promise: "Sair com direcao estrategica para crescer com mais previsibilidade e liberdade.",
    ctaAfterSpeakers: "QUERO CRESCER COM ESTRATEGIA",
    ctaAfterSocial: "QUERO FAZER PARTE",
    ctaAfterPrices: "GARANTIR POR 12x R$ 41,42",
    ctaFinal: "GARANTIR AGORA — ULTIMAS VAGAS",
  },
};

const LOT_CONFIG = {
  currentLot: "Lote 2",
  nextLot: "Lote 3",
  percentFilled: 73,
  currentPrice: "R$ 497",
  nextPrice: "R$ 697",
  remainingSeats: 27,
};

const FAQS = [
  {
    q: "Para quem essa trilha e indicada?",
    a: "Para empresarios, gestores e profissionais que querem acelerar resultado com aplicacao pratica, sem teoria vazia.",
  },
  {
    q: "Vale a pena vir de fora de Manaus?",
    a: "Sim. O networking, as trilhas praticas e os cases ao vivo foram pensados para gerar retorno direto para quem se desloca.",
  },
  {
    q: "Posso parcelar o ingresso?",
    a: "Sim. Parcelamento em ate 12x no cartao com confirmacao imediata.",
  },
  {
    q: "O que inclui no ingresso?",
    a: "Acesso completo aos dois dias, trilhas de conteudo, area de conexoes e experiencias oficiais do evento.",
  },
  {
    q: "E se eu nao puder comparecer?",
    a: "Voce pode transferir sua vaga sem custo dentro do prazo definido nas politicas do evento.",
  },
  {
    q: "Como funciona logistica de hotel e estacionamento?",
    a: "Apos a compra, voce recebe o guia com recomendacoes de hospedagem, acesso ao local e informacoes de estacionamento.",
  },
];

const SpeakerLandingTemplate = ({ speaker }) => {
  if (!speaker) return null;

  const theme = useMemo(() => {
    const slug = String(speaker.slug || "").toLowerCase();
    return THEME_COPY[slug] || THEME_COPY.marketing;
  }, [speaker.slug]);

  return (
    <section className="relative isolate overflow-hidden bg-black pb-24 text-white md:pb-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_10%,rgba(245,192,43,0.18)_0%,rgba(0,0,0,0.96)_48%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(245,192,43,0.08)_0%,rgba(0,0,0,0)_44%,rgba(165,48,48,0.12)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl space-y-12 px-4 pb-16 pt-8 md:space-y-16 md:pt-12">
        <section className="grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="font-jamjuree text-xs font-bold uppercase tracking-[0.14em] text-[#F5C02B] md:text-sm">
              {speaker.name} | {speaker.event.name}
            </p>
            <h1 className="mt-3 font-anton text-4xl uppercase leading-[1.02] md:text-6xl">{speaker.headline}</h1>
            <p className="mt-4 max-w-2xl font-jamjuree text-base text-white/85 md:text-xl">{speaker.subtitle}</p>
            <p className="mt-4 border-l-2 border-[#F5C02B]/50 pl-4 font-jamjuree text-[#F9E1A5]">{speaker.hook}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm uppercase tracking-[0.08em] text-white/80">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#F5C02B]/35 bg-[#111111]/80 px-4 py-2">
                <CalendarDays size={16} className="text-[#F5C02B]" />
                {speaker.event.date}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#F5C02B]/35 bg-[#111111]/80 px-4 py-2">
                <MapPin size={16} className="text-[#F5C02B]" />
                {speaker.event.city}
              </span>
            </div>
            <div className="mt-7 w-fit">
              <NewVendasHeaderMask
                titulo="GARANTIR MINHA VAGA"
                link={speaker.ctaLink}
                textColor="#FFFFFF"
                backgroundColor="#17140D"
                font="700"
                size="lg"
              />
              <p className="mt-3 text-center font-jamjuree text-xs font-bold uppercase tracking-[0.1em] text-[#F5C02B]">
                {LOT_CONFIG.currentLot} - ultimas {LOT_CONFIG.remainingSeats} vagas neste preco
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[24px] border border-[#F5C02B]/45 bg-black/60 shadow-[0_0_0_1px_rgba(255,221,130,0.16),0_20px_44px_rgba(0,0,0,0.55)]">
            <iframe
              src="https://player.vimeo.com/video/1146735494?autoplay=1&muted=1&loop=1&controls=0&title=0&byline=0&portrait=0&autopause=0&playsinline=1"
              title={`Aftermovie DSX - ${speaker.name}`}
              loading="lazy"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="h-[320px] w-full border-0 md:h-[480px]"
            />
          </div>
        </section>

        <section className="rounded-2xl border border-[#F5C02B]/35 bg-[linear-gradient(150deg,rgba(30,20,6,0.9)_0%,rgba(12,12,12,0.9)_82%)] p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-jamjuree text-sm font-bold uppercase tracking-[0.08em] text-[#F5C02B]">
              {LOT_CONFIG.currentLot}: {LOT_CONFIG.percentFilled}% preenchido
            </p>
            <p className="font-jamjuree text-sm uppercase text-white/80">
              Hoje {LOT_CONFIG.currentPrice} | {LOT_CONFIG.nextLot}: {LOT_CONFIG.nextPrice}
            </p>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#F5C02B_0%,#E89921_100%)]"
              style={{ width: `${LOT_CONFIG.percentFilled}%` }}
            />
          </div>
          <p className="mt-3 font-jamjuree text-sm text-white/75">
            O preco sobe quando as vagas acabam - sem aviso previo.
          </p>
        </section>

        <section className="grid gap-8 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-[#0E0E0E]/85 p-6">
            <h2 className="font-anton text-3xl uppercase text-[#FF8B8B]">Isso esta acontecendo com voce?</h2>
            <ul className="mt-5 space-y-3 font-jamjuree text-white/85">
              {theme.painPoints.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <XCircle size={18} className="mt-0.5 shrink-0 text-[#FF8B8B]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 font-jamjuree text-sm uppercase tracking-[0.08em] text-[#F5C02B]">
              A boa noticia: existe um caminho pratico para virar esse jogo.
            </p>
          </article>

          <article className="rounded-2xl border border-[#F5C02B]/45 bg-[linear-gradient(160deg,rgba(26,20,9,0.9)_0%,rgba(10,10,10,0.92)_70%)] p-6 shadow-[inset_0_1px_0_rgba(255,236,180,0.24)]">
            <h2 className="font-anton text-3xl uppercase text-[#F5C02B]">Transformacao Que Voce Leva</h2>
            <ul className="mt-5 space-y-3 font-jamjuree text-white/90">
              {speaker.outcomes.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#F5C02B]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl border border-[#F5C02B]/25 bg-[#171107] px-4 py-3 font-jamjuree text-sm text-[#F8E3AA]">
              Dado da ultima edicao: +{speaker.socialProof.attendees} participantes e +{speaker.socialProof.talks} palestras aplicadas.
            </p>
            <p className="mt-4 font-jamjuree text-white/80">{theme.promise}</p>
          </article>
        </section>

        <section>
          <p className="font-jamjuree text-xs font-semibold uppercase tracking-[0.12em] text-[#F5C02B]">
            Especialistas Confirmados
          </p>
          <h2 className="mt-1 font-anton text-3xl uppercase md:text-4xl">Palestrantes Da Trilha De {speaker.name}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {(speaker.segmentSpeakers || []).map((item, idx) => (
              <article
                key={`${item.name}-${item.image}`}
                className={`overflow-hidden rounded-2xl border border-[#F5C02B]/30 bg-[#080808] ${idx % 2 ? "lg:translate-y-4" : ""}`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                  className="h-[250px] w-full object-cover object-top"
                />
                <div className="bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.92)_45%)] px-3 pb-4 pt-5">
                  <p className="font-anton text-[1.3rem] uppercase leading-none text-[#F5C02B]">{item.name}</p>
                  <p className="mt-2 font-jamjuree text-xs uppercase tracking-[0.06em] text-white/75">
                    +{10 + idx * 3} anos de mercado | case real na trilha de {speaker.name}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-7 w-fit">
            <NewVendasHeaderMask
              titulo={theme.ctaAfterSpeakers}
              link={speaker.ctaLink}
              textColor="#FFFFFF"
              backgroundColor="#17140D"
              font="700"
              size="lg"
            />
            <p className="mt-2 font-jamjuree text-xs uppercase tracking-[0.08em] text-white/70">
              Pagamento seguro | Parcelamento | Transferencia permitida
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#0D0D0D]/88 p-6">
          <h2 className="font-anton text-3xl uppercase">Programacao Da Trilha</h2>
          <div className="mt-5 space-y-4">
            {speaker.topics.map((topic, idx) => (
              <article key={topic} className="grid gap-2 rounded-xl border border-white/10 bg-[#141414]/85 p-4 md:grid-cols-[140px_1fr] md:items-center">
                <p className="font-jamjuree text-xs font-bold uppercase tracking-[0.1em] text-[#F5C02B]">
                  Bloco {idx + 1}
                </p>
                <div>
                  <h3 className="font-anton text-2xl uppercase text-white">{topic}</h3>
                  <p className="mt-1 font-jamjuree text-sm text-white/80">
                    Voce sai sabendo aplicar esse bloco no seu negocio com roteiro pratico.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 rounded-2xl border border-white/10 bg-[#0C0C0C]/90 p-6 md:grid-cols-2">
          <article>
            <h2 className="font-anton text-3xl uppercase">Prova Social Real</h2>
            <p className="mt-2 font-jamjuree text-white/75">
              Resultado de quem participou e aplicou no proprio negocio.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl border border-[#F5C02B]/25 bg-[#15120B] p-3">
                <p className="font-anton text-2xl text-[#F5C02B]">{speaker.socialProof.attendees}</p>
                <p className="font-jamjuree text-[11px] uppercase text-white/70">Participantes</p>
              </div>
              <div className="rounded-xl border border-[#F5C02B]/25 bg-[#15120B] p-3">
                <p className="font-anton text-2xl text-[#F5C02B]">{speaker.socialProof.talks}</p>
                <p className="font-jamjuree text-[11px] uppercase text-white/70">Palestras</p>
              </div>
              <div className="rounded-xl border border-[#F5C02B]/25 bg-[#15120B] p-3">
                <p className="font-anton text-2xl text-[#F5C02B]">{speaker.socialProof.exhibitors}</p>
                <p className="font-jamjuree text-[11px] uppercase text-white/70">Expositores</p>
              </div>
            </div>
          </article>
          <article className="space-y-3">
            {[
              "Saí com funil pronto e reduzi CPL em 32% em 30 dias.",
              "Ajustamos o processo comercial e dobramos taxa de fechamento.",
              "Networking do evento virou parceria e novo canal de receita.",
            ].map((quote) => (
              <blockquote key={quote} className="rounded-xl border border-white/10 bg-[#141414] p-4 font-jamjuree text-sm text-white/85">
                "{quote}"
              </blockquote>
            ))}
            <p className="font-jamjuree text-xs uppercase tracking-[0.1em] text-white/60">
              Empresas presentes: varejo | industria | servicos | tecnologia
            </p>
          </article>
          <div className="md:col-span-2 mt-2 w-fit">
            <NewVendasHeaderMask
              titulo={theme.ctaAfterSocial}
              link={speaker.ctaLink}
              textColor="#FFFFFF"
              backgroundColor="#17140D"
              font="700"
              size="lg"
            />
            <p className="mt-2 font-jamjuree text-xs uppercase tracking-[0.08em] text-white/70">
              Pagamento seguro | Parcelamento | Transferencia permitida
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-[#F5C02B]/30 bg-[linear-gradient(150deg,rgba(16,12,6,0.88)_0%,rgba(7,7,7,0.92)_78%)] p-6">
          <h2 className="font-anton text-3xl uppercase text-[#F5C02B]">Experiencia Do Evento</h2>
          <p className="mt-3 max-w-3xl font-jamjuree text-white/85">
            Ambiente imersivo, networking com decisores, coffee premium, area de conexoes e energia ao vivo que nao existe no online.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <img src="/BannerCallToActionVendas.png" alt="Ambiente DSX" className="h-40 w-full rounded-xl object-cover md:h-48" />
            <img src="/local-dsx-2026.png" alt="Local do evento DSX" className="h-40 w-full rounded-xl object-cover md:h-48" />
            <img src="/dsx-2026.jpeg" alt="Experiencia de palco DSX" className="h-40 w-full rounded-xl object-cover md:h-48" />
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-[#101010]/90 p-6">
            <h2 className="font-anton text-3xl uppercase">Oferta</h2>
            <p className="mt-2 font-jamjuree text-white/75">
              Dois dias para acelerar sua execucao com metodo e conexoes certas.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-white/15 bg-[#161616] p-4">
                <p className="font-anton text-xl uppercase text-white">Standard</p>
                <p className="mt-2 font-anton text-3xl text-[#F5C02B]">{LOT_CONFIG.currentPrice}</p>
                <p className="font-jamjuree text-xs uppercase text-white/65">12x de R$ 41,42</p>
                <ul className="mt-3 space-y-2 font-jamjuree text-sm text-white/85">
                  <li className="inline-flex items-center gap-2"><CheckCircle2 size={14} className="text-[#F5C02B]" />2 dias de trilhas</li>
                  <li className="inline-flex items-center gap-2"><CheckCircle2 size={14} className="text-[#F5C02B]" />Area de conexoes</li>
                </ul>
              </div>
              <div className="rounded-xl border border-[#F5C02B]/45 bg-[linear-gradient(160deg,rgba(32,22,8,0.95)_0%,rgba(16,16,16,0.95)_82%)] p-4 shadow-[inset_0_1px_0_rgba(255,236,180,0.2)]">
                <p className="font-anton text-xl uppercase text-[#F5C02B]">VIP</p>
                <p className="mt-2 font-anton text-3xl text-[#F5C02B]">R$ 797</p>
                <p className="font-jamjuree text-xs uppercase text-white/70">12x de R$ 66,42</p>
                <ul className="mt-3 space-y-2 font-jamjuree text-sm text-white/88">
                  <li className="inline-flex items-center gap-2"><CheckCircle2 size={14} className="text-[#F5C02B]" />Tudo do Standard</li>
                  <li className="inline-flex items-center gap-2"><CheckCircle2 size={14} className="text-[#F5C02B]" />Fila preferencial e area VIP</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 w-fit">
              <NewVendasHeaderMask
                titulo={theme.ctaAfterPrices}
                link={speaker.ctaLink}
                textColor="#FFFFFF"
                backgroundColor="#17140D"
                font="700"
                size="lg"
              />
              <p className="mt-2 font-jamjuree text-xs uppercase tracking-[0.08em] text-white/70">
                Pagamento seguro | Parcelamento | Transferencia permitida
              </p>
            </div>
          </article>

          <article className="rounded-2xl border border-[#F5C02B]/25 bg-[#12100A]/90 p-6">
            <h2 className="font-anton text-3xl uppercase text-[#F5C02B]">Bonus Exclusivos</h2>
            <ul className="mt-4 space-y-3 font-jamjuree text-white/88">
              <li className="rounded-xl border border-white/10 bg-[#181818] p-3">Comunidade pos-evento <span className="ml-2 text-white/50 line-through">R$ 297</span></li>
              <li className="rounded-xl border border-white/10 bg-[#181818] p-3">Templates de execucao <span className="ml-2 text-white/50 line-through">R$ 197</span></li>
              <li className="rounded-xl border border-white/10 bg-[#181818] p-3">Workshop extra online <span className="ml-2 text-white/50 line-through">R$ 397</span></li>
              <li className="rounded-xl border border-white/10 bg-[#181818] p-3">Certificado oficial <span className="ml-2 text-white/50 line-through">R$ 97</span></li>
            </ul>
          </article>
        </section>

        <section className="rounded-2xl border border-[#F5C02B]/35 bg-[linear-gradient(160deg,rgba(24,16,6,0.92)_0%,rgba(12,12,12,0.94)_75%)] p-6">
          <h2 className="inline-flex items-center gap-2 font-anton text-3xl uppercase text-[#F5C02B]">
            <ShieldCheck size={24} />
            Garantia E Seguranca
          </h2>
          <p className="mt-3 font-jamjuree text-white/88">
            Se nao puder comparecer, transferencia sem custo dentro do prazo oficial. Sua vaga e seu investimento ficam protegidos.
          </p>
          <p className="mt-2 inline-flex items-center gap-2 font-jamjuree text-sm text-white/75">
            <Clock3 size={16} className="text-[#F5C02B]" />
            Confirmacao imediata apos pagamento.
          </p>
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#0E0E0E]/90 p-6">
          <h2 className="font-anton text-3xl uppercase">FAQ</h2>
          <div className="mt-4 space-y-3">
            {FAQS.map((item) => (
              <details key={item.q} className="rounded-xl border border-white/10 bg-[#171717] p-4">
                <summary className="cursor-pointer font-jamjuree text-sm font-semibold uppercase tracking-[0.06em] text-[#F5C02B]">
                  {item.q}
                </summary>
                <p className="mt-3 font-jamjuree text-sm text-white/85">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[26px] border border-[#F5C02B]/35 p-6 md:p-8">
          <div className="pointer-events-none absolute inset-0">
            <img src="/BannerCallToActionVendas.png" alt="" aria-hidden="true" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.62)_48%,rgba(10,7,3,0.8)_100%)]" />
          </div>
          <div className="relative">
            <h2 className="font-anton text-3xl uppercase md:text-5xl">{theme.ctaFinal}</h2>
            <ul className="mt-4 space-y-2 font-jamjuree text-white/90">
              <li className="inline-flex items-center gap-2"><Ticket size={16} className="text-[#F5C02B]" />Acesso completo aos 2 dias de evento</li>
              <li className="inline-flex items-center gap-2"><Users size={16} className="text-[#F5C02B]" />Networking com decisores e empresarios</li>
              <li className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-[#F5C02B]" />Trilha pratica para aplicar ja no proximo ciclo</li>
            </ul>
            <p className="mt-4 font-jamjuree text-sm font-bold uppercase tracking-[0.08em] text-[#F5C02B]">
              {LOT_CONFIG.currentLot} - ultimas {LOT_CONFIG.remainingSeats} vagas neste preco
            </p>
            <div className="mt-6 w-fit">
              <NewVendasHeaderMask
                titulo={theme.ctaFinal}
                link={speaker.ctaLink}
                textColor="#FFFFFF"
                backgroundColor="#17140D"
                font="700"
                size="lg"
              />
              <p className="mt-2 font-jamjuree text-xs uppercase tracking-[0.08em] text-white/75">
                Pagamento seguro | Parcelamento | Transferencia permitida
              </p>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 pt-6 font-jamjuree text-xs text-white/55">
          <p>Digital Hub Eventos LTDA | CNPJ 00.000.000/0001-00</p>
          <p className="mt-1">Politica de privacidade | Termos de uso | Politica de cancelamento e transferencia</p>
        </footer>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#F5C02B]/35 bg-black/95 p-3 backdrop-blur-sm md:hidden">
        <p className="mb-2 text-center font-jamjuree text-[11px] font-bold uppercase tracking-[0.08em] text-[#F5C02B]">
          {LOT_CONFIG.currentLot}: ultimas {LOT_CONFIG.remainingSeats} vagas
        </p>
        <div className="mx-auto w-fit">
          <NewVendasHeaderMask
            titulo="GARANTIR MINHA VAGA"
            link={speaker.ctaLink}
            textColor="#FFFFFF"
            backgroundColor="#17140D"
            font="700"
            size="lg"
          />
        </div>
      </div>
    </section>
  );
};

export default SpeakerLandingTemplate;
