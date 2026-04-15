import NewVendasHeaderMask from "../../../components/NewVendas/NewVendasHeaderMask";
import { CalendarDays, CheckCircle2, MapPin, Ticket, TrendingUp, Users, XCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const buildCountdown = (targetDateIso) => {
  const diffMs = new Date(targetDateIso).getTime() - Date.now();
  if (Number.isNaN(diffMs) || diffMs <= 0) {
    return { days: "00", hours: "00", minutes: "00", seconds: "00" };
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
};

const SpeakerLandingTemplate = ({ speaker }) => {
  if (!speaker) return null;
  const repeatedEventSlides = useMemo(
    () => Array.from({ length: 10 }, () => "/BannerCallToActionVendas.png"),
    [],
  );

  const [countdown, setCountdown] = useState(() =>
    buildCountdown(speaker?.event?.startDateIso),
  );

  useEffect(() => {
    setCountdown(buildCountdown(speaker?.event?.startDateIso));
    const intervalId = window.setInterval(() => {
      setCountdown(buildCountdown(speaker?.event?.startDateIso));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [speaker?.event?.startDateIso]);

  const urgencyTicker = useMemo(
    () => `${speaker.urgencyLabel} • ${speaker.urgencyLabel} • ${speaker.urgencyLabel} • ${speaker.urgencyLabel}`,
    [speaker.urgencyLabel],
  );

  return (
    <section className="relative isolate overflow-hidden bg-black text-white">
      <style>{`
        @keyframes speaker-urgency-marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes speaker-image-marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes speaker-premium-glow {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.02); }
        }
        @keyframes speaker-premium-sheen {
          0% { transform: translateX(-140%) rotate(12deg); opacity: 0; }
          25% { opacity: 0.22; }
          100% { transform: translateX(180%) rotate(12deg); opacity: 0; }
        }
        .seg-glass-chip{
          position:relative;
          isolation:isolate;
          border-radius:9999px;
          padding:8px 14px;
          backdrop-filter: blur(10px);
          background: rgba(255,255,255,0.03);
        }
        .seg-glass-chip::before{
          content:"";
          position:absolute;
          inset:0;
          padding:1px;
          border-radius:inherit;
          background: linear-gradient(140deg, rgba(255,255,255,0.45) 0%, rgba(245,192,43,0.42) 35%, rgba(255,255,255,0.08) 62%, rgba(245,192,43,0.55) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events:none;
          opacity:0.9;
        }
        .seg-glass-panel{
          position:relative;
          isolation:isolate;
          border-radius:24px;
          background: linear-gradient(170deg, rgba(255,255,255,0.055) 0%, rgba(0,0,0,0.45) 55%);
          backdrop-filter: blur(8px);
        }
        .seg-glass-panel::before{
          content:"";
          position:absolute;
          inset:0;
          padding:1px;
          border-radius:inherit;
          background: linear-gradient(155deg, rgba(255,255,255,0.38) 0%, rgba(245,192,43,0.44) 28%, rgba(255,255,255,0.12) 60%, rgba(245,192,43,0.5) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events:none;
          opacity:0.9;
        }
        .seg-hero-shell{
          position:relative;
          isolation:isolate;
          border-radius:28px;
          background: linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(18,18,18,0.75) 42%, rgba(0,0,0,0.88) 100%);
          backdrop-filter: blur(8px);
          box-shadow: 0 24px 50px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.12);
        }
        .seg-hero-shell::before{
          content:"";
          position:absolute;
          inset:0;
          padding:1px;
          border-radius:inherit;
          background: linear-gradient(145deg, rgba(255,255,255,0.45) 0%, rgba(245,192,43,0.55) 22%, rgba(255,255,255,0.12) 58%, rgba(245,192,43,0.58) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events:none;
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_8%,rgba(245,192,43,0.20)_0%,rgba(0,0,0,0.96)_44%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(245,192,43,0.10)_0%,rgba(0,0,0,0)_40%,rgba(165,48,48,0.14)_100%)]" />
        <div className="absolute -left-14 top-28 h-56 w-56 rounded-full bg-[#F5C02B]/15 blur-3xl" />
        <div className="absolute -right-10 bottom-12 h-64 w-64 rounded-full bg-[#A53030]/16 blur-3xl" />
      </div>

      <div className="relative z-20 bg-[#140F07]/85 py-2">
        <div className="overflow-hidden whitespace-nowrap">
          <div
            className="inline-flex min-w-[200%]"
            style={{ animation: "speaker-urgency-marquee 20s linear infinite" }}
          >
            <p className="w-1/2 text-center font-jamjuree text-xs font-bold uppercase tracking-[0.14em] text-[#F5C02B] md:text-sm">
              {urgencyTicker}
            </p>
            <p className="w-1/2 text-center font-jamjuree text-xs font-bold uppercase tracking-[0.14em] text-[#F5C02B] md:text-sm">
              {urgencyTicker}
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-20 bg-black/35 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-5 px-4 py-3 md:gap-9">
          <div className="text-center">
            <p className="font-anton text-3xl leading-none text-[#F5C02B]">{countdown.days}</p>
            <p className="font-jamjuree text-[11px] uppercase tracking-[0.08em] text-white/65">Dias</p>
          </div>
          <span className="text-white/25">:</span>
          <div className="text-center">
            <p className="font-anton text-3xl leading-none text-[#F5C02B]">{countdown.hours}</p>
            <p className="font-jamjuree text-[11px] uppercase tracking-[0.08em] text-white/65">Horas</p>
          </div>
          <span className="text-white/25">:</span>
          <div className="text-center">
            <p className="font-anton text-3xl leading-none text-[#F5C02B]">{countdown.minutes}</p>
            <p className="font-jamjuree text-[11px] uppercase tracking-[0.08em] text-white/65">Minutos</p>
          </div>
          <span className="text-white/25">:</span>
          <div className="text-center">
            <p className="font-anton text-3xl leading-none text-[#F5C02B]">{countdown.seconds}</p>
            <p className="font-jamjuree text-[11px] uppercase tracking-[0.08em] text-white/65">Segundos</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-10 md:pt-16">
        <div className="seg-hero-shell p-4 md:p-6">
        <header className="grid items-center gap-9 md:grid-cols-[1.08fr_0.92fr]">
          <div>
            <p className="font-jamjuree text-sm uppercase tracking-[0.12em] text-[#F5C02B] md:text-base">
              LP de Segmento | {speaker.event.name}
            </p>
            <h1 className="mt-3 font-anton text-4xl uppercase leading-[1.02] md:text-6xl">
              {speaker.headline}
            </h1>
            <p className="mt-5 max-w-2xl font-jamjuree text-base text-white/85 md:text-xl">
              {speaker.subtitle}
            </p>

            <p className="mt-4 max-w-2xl border-l-2 border-[#F5C02B]/45 pl-4 font-jamjuree text-[15px] text-[#F9E1A5] md:text-base">
              {speaker.hook}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm uppercase tracking-[0.08em] text-white/80">
              <span className="seg-glass-chip inline-flex items-center gap-2">
                <CalendarDays size={16} className="text-[#F5C02B]" />
                {speaker.event.date}
              </span>
              <span className="seg-glass-chip inline-flex items-center gap-2">
                <MapPin size={16} className="text-[#F5C02B]" />
                {speaker.event.city}
              </span>
            </div>

            <div className="mt-8 w-fit">
              <NewVendasHeaderMask
                titulo={speaker.ctaLabel}
                link={speaker.ctaLink}
                textColor="#FFFFFF"
                backgroundColor="#17140D"
                font="700"
                size="lg"
              />
              <p className="mt-3 text-center font-jamjuree text-sm font-semibold uppercase leading-none tracking-[0.08em] text-[#F5C02B] md:mt-4">
                {speaker.urgencyLabel}
              </p>
            </div>

            <div className="mt-9 grid grid-cols-3 gap-3 pt-6">
              <div className="rounded-2xl border border-[#F5C02B]/30 bg-[linear-gradient(160deg,rgba(245,192,43,0.12)_0%,rgba(20,20,20,0.7)_80%)] px-3 py-4 text-center shadow-[inset_0_1px_0_rgba(255,240,190,0.2)]">
                <p className="font-anton text-3xl leading-none text-[#F5C02B]">{speaker.socialProof.attendees}</p>
                <p className="mt-1 font-jamjuree text-[11px] uppercase tracking-[0.08em] text-white/70">Participantes</p>
              </div>
              <div className="rounded-2xl border border-[#F5C02B]/30 bg-[linear-gradient(160deg,rgba(245,192,43,0.12)_0%,rgba(20,20,20,0.7)_80%)] px-3 py-4 text-center shadow-[inset_0_1px_0_rgba(255,240,190,0.2)]">
                <p className="font-anton text-3xl leading-none text-[#F5C02B]">{speaker.socialProof.talks}</p>
                <p className="mt-1 font-jamjuree text-[11px] uppercase tracking-[0.08em] text-white/70">Palestras</p>
              </div>
              <div className="rounded-2xl border border-[#F5C02B]/30 bg-[linear-gradient(160deg,rgba(245,192,43,0.12)_0%,rgba(20,20,20,0.7)_80%)] px-3 py-4 text-center shadow-[inset_0_1px_0_rgba(255,240,190,0.2)]">
                <p className="font-anton text-3xl leading-none text-[#F5C02B]">{speaker.socialProof.exhibitors}</p>
                <p className="mt-1 font-jamjuree text-[11px] uppercase tracking-[0.08em] text-white/70">Expositores</p>
              </div>
            </div>
          </div>

          <article className="nv-highlight-wrap relative rounded-[26px]">
            <span
              className="pointer-events-none absolute -inset-5 rounded-[38px] bg-[radial-gradient(circle_at_50%_38%,rgba(245,192,43,0.32)_0%,rgba(245,192,43,0.05)_42%,rgba(0,0,0,0)_72%)] blur-xl"
              style={{ animation: "speaker-premium-glow 3.6s ease-in-out infinite" }}
            />
            <div className="nv-highlight-inner relative overflow-hidden rounded-[26px] bg-black/45">
              <span
                className="pointer-events-none absolute inset-y-0 -left-[35%] z-[3] w-[22%] bg-gradient-to-r from-transparent via-[#FDE7A2]/35 to-transparent blur-sm"
                style={{ animation: "speaker-premium-sheen 4.8s ease-in-out infinite" }}
              />
              <img
                src={speaker.image}
                alt={speaker.name}
                loading="eager"
                decoding="async"
                className="h-full max-h-[560px] w-full rounded-[26px] object-cover object-top"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 rounded-b-[26px] bg-gradient-to-t from-black via-black/65 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <h2 className="font-anton text-3xl uppercase text-[#F5C02B]">{speaker.name}</h2>
                <p className="mt-1 font-jamjuree text-white/90">{speaker.role}</p>
              </div>
            </div>
          </article>
        </header>
        </div>

        <section className="mt-16 grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <article>
            <iframe
              src="https://player.vimeo.com/video/1146735494?autoplay=1&muted=1&loop=1&controls=0&title=0&byline=0&portrait=0&autopause=0&playsinline=1"
              title={`Vídeo de apresentação DSX para ${speaker.name}`}
              loading="lazy"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="h-[360px] w-full border-0 md:h-[420px]"
            />
          </article>

          <article className="seg-glass-panel p-6 md:p-7">
            <h3 className="font-anton text-3xl uppercase text-white">Por que participar dessa trilha</h3>
            <p className="mt-4 font-jamjuree leading-relaxed text-white/85">{speaker.about}</p>
            <p className="mt-5 inline-flex items-center gap-2 border-b border-[#F5C02B]/35 pb-2 font-jamjuree text-sm font-semibold uppercase tracking-[0.08em] text-[#F5C02B]">
              <TrendingUp size={16} />
              Transformação esperada
            </p>
            <p className="mt-2 font-jamjuree text-white/80">
              Sair do consumo passivo de conteúdo para um plano real de crescimento em vendas, marketing e posicionamento.
            </p>
          </article>
        </section>

        <section className="mt-14 grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <article>
            <h3 className="font-anton text-3xl uppercase text-white">O que você vai aprender</h3>
            <ul className="mt-4 space-y-3">
              {speaker.topics.map((topic) => (
                <li key={topic} className="border-l border-[#F5C02B]/40 pl-4 font-jamjuree text-white/88">
                  {topic}
                </li>
              ))}
            </ul>
          </article>

          <article className="relative overflow-hidden rounded-[24px] bg-black/50 p-3">
            <div className="relative overflow-hidden rounded-[20px]">
              <div
                className="flex w-max"
                style={{ animation: "speaker-image-marquee 120s linear infinite" }}
              >
                {[...repeatedEventSlides, ...repeatedEventSlides].map((imageSrc, index) => (
                  <img
                    key={`${imageSrc}-${index}`}
                    src={imageSrc}
                    alt="Destaque do evento DSX"
                    loading="lazy"
                    decoding="async"
                    className="h-[320px] w-[86vw] max-w-[520px] shrink-0 rounded-[20px] object-cover object-center md:h-[380px] md:w-[520px]"
                  />
                ))}
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-[20px] bg-[linear-gradient(120deg,rgba(245,192,43,0.12)_0%,rgba(0,0,0,0)_48%,rgba(165,48,48,0.2)_100%)]" />
            </div>
          </article>
        </section>

        <section className="mt-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-jamjuree text-xs font-semibold uppercase tracking-[0.12em] text-[#F5C02B]">
                Especialistas Confirmados
              </p>
              <h3 className="mt-1 font-anton text-3xl uppercase text-white md:text-4xl">
                Palestrantes Da Trilha De {speaker.name}
              </h3>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {(speaker.segmentSpeakers || []).map((item) => (
              <article
                key={`${item.name}-${item.image}`}
                className="seg-glass-panel relative overflow-hidden rounded-2xl p-2"
              >
                <div className="relative overflow-hidden rounded-xl bg-black">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="h-[250px] w-full object-cover object-top"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/60 to-transparent" />
                </div>
                <p className="mt-3 px-1 pb-1 font-anton text-[1.45rem] uppercase leading-none text-[#F5C02B]">
                  {item.name}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="relative mt-16 py-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(245,192,43,0.08)_0%,rgba(0,0,0,0)_58%)]" />

          <div className="relative grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
            <article className="md:self-center">
              <h3 className="font-anton text-3xl uppercase text-[#FF8B8B]">O que essa trilha não é</h3>
              <p className="mt-1 font-jamjuree text-sm uppercase tracking-[0.08em] text-white/55">
                O que você não vai perder tempo consumindo
              </p>
              <ul className="mt-5 space-y-4 font-jamjuree text-white/80">
                <li className="flex items-start gap-3">
                  <XCircle size={18} className="mt-0.5 shrink-0 text-[#FF8B8B]" />
                  <span>Conteúdo genérico sem aplicação prática no seu negócio.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle size={18} className="mt-0.5 shrink-0 text-[#FF8B8B]" />
                  <span>Motivação vazia sem método para gerar resultado.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle size={18} className="mt-0.5 shrink-0 text-[#FF8B8B]" />
                  <span>Teoria desconectada da realidade de quem executa.</span>
                </li>
              </ul>
            </article>

            <article className="rounded-2xl border border-[#F5C02B]/55 bg-[linear-gradient(155deg,rgba(26,20,10,0.9)_0%,rgba(12,12,12,0.95)_70%)] p-6 shadow-[0_0_0_1px_rgba(255,230,160,0.2),0_16px_30px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,238,183,0.28),inset_0_-1px_0_rgba(110,80,20,0.55)]">
              <h3 className="font-anton text-3xl uppercase text-[#F5C02B]">O que essa trilha é</h3>
              <p className="mt-1 font-jamjuree text-sm uppercase tracking-[0.08em] text-white/55">
                O que você leva para aplicar de verdade
              </p>
              <ul className="mt-5 space-y-4 font-jamjuree text-white/88">
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#F5C02B]" />
                  <span>Direcionamento claro para decidir melhor e executar mais rápido.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#F5C02B]" />
                  <span>Estratégias que conectam vendas, marketing e posicionamento.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#F5C02B]" />
                  <span>Aprendizado com quem vive isso na prática todos os dias.</span>
                </li>
              </ul>
            </article>
          </div>
        </section>

        <section className="mt-16 grid gap-10 md:grid-cols-2 md:gap-16">
          <article>
            <h3 className="font-anton text-3xl uppercase text-white">Resultados em foco</h3>
            <ul className="mt-4 space-y-3">
              {speaker.outcomes.map((outcome) => (
                <li key={outcome} className="font-jamjuree text-white/90">
                  {outcome}
                </li>
              ))}
            </ul>
          </article>

          <article className="relative">
            <h3 className="font-anton text-3xl uppercase text-[#F5C02B]">Garanta seu lugar agora</h3>
            <p className="mt-3 font-jamjuree text-white/90">
              A trilha de {speaker.name} foi pensada para quem quer sair do evento com visão e execução. As vagas são limitadas.
            </p>
            <p className="mt-4 border-l-2 border-[#F5C02B]/45 pl-3 font-jamjuree text-sm font-semibold uppercase tracking-[0.08em] text-[#F5C02B]">
              Atenção: lotes podem virar sem aviso
            </p>
            <div className="mt-5 space-y-2">
              <p className="inline-flex items-center gap-2 font-jamjuree text-sm uppercase text-white/80">
                <Ticket size={16} className="text-[#F5C02B]" />
                Acesso completo aos dois dias de evento
              </p>
              <p className="inline-flex items-center gap-2 font-jamjuree text-sm uppercase text-white/80">
                <Users size={16} className="text-[#F5C02B]" />
                Networking com empresários e decisores
              </p>
            </div>
            <div className="mt-7 w-fit">
              <NewVendasHeaderMask
                titulo={speaker.ctaLabel}
                link={speaker.ctaLink}
                textColor="#FFFFFF"
                backgroundColor="#17140D"
                font="700"
                size="lg"
              />
            </div>
          </article>
        </section>
      </div>
    </section>
  );
};

export default SpeakerLandingTemplate;
