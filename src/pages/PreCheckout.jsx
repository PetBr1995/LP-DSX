import { useEffect, useMemo, useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import NewVendasHeaderMask from "../components/NewVendas/NewVendasHeaderMask";
import NewVendasSpeakersSlider from "../components/NewVendas/NewVendasSpeakersSlider";
import AudienceSection from "../components/NewVendas/sections/AudienceSection";
import { audienceProfiles } from "../components/NewVendas/newVendasData";
import { getSupabaseClient, isSupabaseConfigured } from "../lib/supabaseClient";
import { formatDsxFormOrigin } from "../utils/formOrigin";

const galleryItems = [
  { src: "/img-ambiantes/amb-1.png", alt: "Networking entre participantes" },
  { src: "/img-ambiantes/amb-2.png", alt: "Discussões estratégicas no evento" },
  { src: "/img-ambiantes/amb-3.png", alt: "Palestra com plateia" },
  { src: "/img-ambiantes/amb-4.png", alt: "Conteúdo em palco principal" },
  { src: "/img-ambiantes/amb-5.png", alt: "Conversa sobre negócios" },
  { src: "/img-ambiantes/amb-6.png", alt: "Momentos de conexão no DSX" },
  { src: "/img-ambiantes/amb-7.png", alt: "Perguntas e respostas no auditório" },
  { src: "/img-ambiantes/amb-3.png", alt: "Painel com executivos" },
  { src: "/img-ambiantes/amb-2.png", alt: "Interação entre palestrantes" },
  { src: "/img-ambiantes/amb-1.png", alt: "Trocas em ambiente premium" },
];
const galleryTopRow = galleryItems.slice(0, 5);
const galleryBottomRow = galleryItems.slice(5, 10);

const faqItems = [
  {
    question: "O DSX é para o meu perfil de negócio?",
    answer:
      "Se você é dono de empresa, líder de equipe, profissional autônomo ou executivo buscando crescimento escalável e conexões de alto nível, o DSX é para você.",
  },
  {
    question: "Posso comprar agora e trocar o nome do participante depois?",
    answer:
      "Sim. A titularidade do passaporte pode ser alterada entrando em contato com o suporte após a compra.",
  },
  {
    question: "Quais são as formas de pagamento?",
    answer:
      "Você pode garantir o seu passaporte via PIX (aprovação imediata) ou parcelar no cartão de crédito em até 12 vezes.",
  },
  {
    question: "A feira de negócios está inclusa em todos os passaportes?",
    answer:
      "Sim. Tanto o passaporte Standard quanto o VIP dão acesso à feira e às ativações de marca durante o evento.",
  },
  {
    question: "Qual a diferença principal do VIP?",
    answer:
      "O VIP inclui benefícios exclusivos, como área reservada, melhor experiência presencial e ambiente ideal para networking estratégico.",
  },
];

const CHECKOUT_LINK =
  "https://www.sympla.com.br/evento/dsx-2026-digital-summit-experience/3339721";
const RD_API_URL =
  "https://api.rd.services/platform/conversions?api_key=MHnWDjBYARQKdwUsfZRbjtVmPEyoHnSqtgFz";

const profileOptions = [
  "Empresário",
  "Diretor ou Gestor",
  "Profissional de marketing, vendas e operações",
  "Estudante",
  "Outros",
];
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
const experienceHighlights = [
  { value: "3 PALCOS", label: "simultâneos" },
  { value: "FEIRA", label: "de negócios" },
  { value: "VIP", label: "área exclusiva", desktopOnly: true },
  { value: "PRAÇA", label: "de alimentação", desktopOnly: true },
];

const formatMetricValue = (value, metric) => {
  const baseValue = metric.useThousands
    ? value.toLocaleString("pt-BR")
    : String(value);
  return `${metric.prefix}${baseValue}${metric.suffix}`;
};

const onlyDigits = (value = "") => value.replace(/\D/g, "");
const isValidEmail = (email = "") => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const normalizeHostname = (value = "") =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/^www\./, "");
const detectSiteOriginFromUrl = (value = "") => {
  if (!value) return "";

  try {
    const hostname = normalizeHostname(new URL(value).hostname);
    if (!hostname) return "";
    if (hostname.includes("dsx.com.vc")) return "dsx";
    if (hostname.includes("digitalhub.com.vc")) return "digitalhub";
    if (hostname.includes("digitaleduca.com.vc")) return "digitaleduca";
    return hostname;
  } catch {
    return "";
  }
};
const isMissingColumnError = (error) => {
  const code = String(error?.code || "").toUpperCase();
  const message = String(error?.message || "").toLowerCase();
  return (
    code === "PGRST204" ||
    message.includes("column") ||
    message.includes("schema cache")
  );
};

const formatPhone = (value = "") => {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const PreCheckout = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [animatedValues, setAnimatedValues] = useState(metrics.map(() => 0));
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadStatus, setLeadStatus] = useState("idle");
  const [leadError, setLeadError] = useState("");
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
    cargo: "",
  });
  const [sourceData, setSourceData] = useState({
    page_url: "",
    site_origin: "",
    site_hostname: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
  });

  const yearLabel = useMemo(() => new Date().getFullYear(), []);

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

  useEffect(() => {
    const iconSelector = 'link[rel="icon"]';
    let iconTag = document.head.querySelector(iconSelector);
    const iconExisted = Boolean(iconTag);
    const previousIconHref = iconTag?.getAttribute("href");

    if (!iconTag) {
      iconTag = document.createElement("link");
      iconTag.setAttribute("rel", "icon");
      iconTag.setAttribute("type", "image/png");
      document.head.appendChild(iconTag);
    }

    iconTag.setAttribute("href", "/favicon-dsx-new.png");

    return () => {
      if (!iconExisted) {
        iconTag?.remove();
      } else if (previousIconHref === null) {
        iconTag?.removeAttribute("href");
      } else {
        iconTag?.setAttribute("href", previousIconHref);
      }
    };
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const currentUrl = window.location.href;
    const siteHostname = normalizeHostname(window.location.hostname);
    const siteOrigin = detectSiteOriginFromUrl(currentUrl) || siteHostname;

    setSourceData({
      page_url: currentUrl,
      site_origin: siteOrigin,
      site_hostname: siteHostname,
      utm_source: urlParams.get("utm_source") || "",
      utm_medium: urlParams.get("utm_medium") || "",
      utm_campaign: urlParams.get("utm_campaign") || "",
      utm_term: urlParams.get("utm_term") || "",
      utm_content: urlParams.get("utm_content") || "",
    });
  }, []);

  const handleOpenLeadModal = (event) => {
    event.preventDefault();
    setLeadError("");
    setLeadStatus("idle");
    setShowLeadModal(true);
  };

  const handleCloseLeadModal = () => {
    if (leadStatus === "loading") return;
    setShowLeadModal(false);
    setLeadError("");
  };

  const handleLeadInputChange = (field, value) => {
    setLeadForm((current) => ({
      ...current,
      [field]: field === "phone" ? formatPhone(value) : value,
    }));
  };

  const handleLeadSubmit = async (event) => {
    event.preventDefault();

    const name = leadForm.name.trim();
    const email = leadForm.email.trim().toLowerCase();
    const phoneDigits = onlyDigits(leadForm.phone);
    const phone = leadForm.phone.trim();
    const cargo = leadForm.cargo.trim();

    if (!name) {
      setLeadError("Informe seu nome.");
      return;
    }
    if (!isValidEmail(email)) {
      setLeadError("Informe um e-mail válido.");
      return;
    }
    if (!(phoneDigits.length === 10 || phoneDigits.length === 11)) {
      setLeadError("Informe um telefone com DDD.");
      return;
    }
    if (!cargo) {
      setLeadError("Selecione o campo 'Você é...'.");
      return;
    }

    setLeadStatus("loading");
    setLeadError("");

    try {
      const resolvedFormOrigin = "Checkout";
      const payload = {
        event_type: "CONVERSION",
        event_family: "CDP",
        payload: {
          conversion_identifier: `LP - DSX 2026 - Formulario ${resolvedFormOrigin}`,
          name,
          email,
          personal_phone: phone,
          voce_e: cargo,
          cf_voce_e: cargo,
          cf_cargo: cargo,
          traffic_source: sourceData.utm_source,
          traffic_campaign: sourceData.utm_campaign,
          traffic_medium: sourceData.utm_medium,
          traffic_value: sourceData.utm_term,
          cf_utm_campaign: sourceData.utm_campaign,
          cf_utm_medium: sourceData.utm_medium,
          cf_utm_term: sourceData.utm_term,
          cf_utm_content: sourceData.utm_content,
          cf_utm_source: sourceData.utm_source,
          cf_url_de_conversao: sourceData.page_url,
          cf_origem_formulario: formatDsxFormOrigin(
            resolvedFormOrigin,
            "Home Principal",
          ),
        },
        tags: ["dsx-hometeste", "popup"],
        source: "landing-home-teste",
      };

      const rdResult = await fetch(RD_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const rdData = await rdResult.json().catch(() => ({}));
      if (!rdResult.ok || rdData?.ok === false) {
        const rdMessage =
          rdData?.errors?.[0]?.error_message ||
          rdData?.message ||
          "Falha ao enviar lead";
        throw new Error(rdMessage);
      }

      const trackerState = window.DSXTracker?.getState?.() || {};
      const sessionId =
        trackerState.sessionId ||
        (window.crypto?.randomUUID?.() || `session-${Date.now()}`);
      const nowIso = new Date().toISOString();
      const leadIdentity = {
        email,
        name,
        phone,
        cargo,
      };

      const profilePayload = {
        lead_email: leadIdentity.email,
        lead_name: leadIdentity.name,
        lead_phone: leadIdentity.phone,
        lead_cargo: leadIdentity.cargo,
        site_origin: sourceData.site_origin || null,
        site_hostname: sourceData.site_hostname || window.location.hostname || null,
        first_converted_at: nowIso,
        last_seen_at: nowIso,
        has_sympla_redirected: true,
        last_sympla_redirected_at: nowIso,
      };

      // Mantem o mesmo tracking do HomeTeste quando Supabase estiver configurado.
      // Se não estiver, não bloqueia a conversão nem o redirect para o Sympla.
      if (isSupabaseConfigured) {
        try {
          const supabase = await getSupabaseClient();

          if (supabase) {
            let { error: profileError } = await supabase
              .from("tracking_lead_profiles")
              .upsert([profilePayload], { onConflict: "lead_email" });

            if (profileError && isMissingColumnError(profileError)) {
              const fallbackProfilePayload = { ...profilePayload };
              delete fallbackProfilePayload.site_origin;
              delete fallbackProfilePayload.site_hostname;
              const retry = await supabase
                .from("tracking_lead_profiles")
                .upsert([fallbackProfilePayload], { onConflict: "lead_email" });
              profileError = retry.error;
            }

            if (profileError) {
              console.error(
                "[PreCheckout] erro ao salvar lead profile no Supabase",
                profileError,
              );
            } else {
              const sessionPayload = {
                session_id: sessionId,
                lead_name: leadIdentity.name,
                lead_email: leadIdentity.email,
                lead_phone: leadIdentity.phone,
                lead_cargo: leadIdentity.cargo,
                site_origin: sourceData.site_origin || null,
                site_hostname:
                  sourceData.site_hostname || window.location.hostname || null,
                page:
                  sourceData.page_url ||
                  window.location.pathname + window.location.search,
                referrer: document.referrer || null,
                utm_source: sourceData.utm_source || sourceData.site_origin || null,
                utm_medium: sourceData.utm_medium || null,
                utm_campaign: sourceData.utm_campaign || null,
                utm_content: sourceData.utm_content || null,
                utm_term: sourceData.utm_term || null,
                converted_at: nowIso,
                has_sympla_redirected: true,
                sympla_redirected_at: nowIso,
              };

              let { error: sessionError } = await supabase
                .from("tracking_lead_sessions")
                .upsert([sessionPayload], { onConflict: "session_id" });

              if (sessionError && isMissingColumnError(sessionError)) {
                const fallbackSessionPayload = { ...sessionPayload };
                delete fallbackSessionPayload.site_origin;
                delete fallbackSessionPayload.site_hostname;
                const retry = await supabase
                  .from("tracking_lead_sessions")
                  .upsert([fallbackSessionPayload], { onConflict: "session_id" });
                sessionError = retry.error;
              }

              if (sessionError) {
                console.error(
                  "[PreCheckout] erro ao salvar lead session no Supabase",
                  sessionError,
                );
              } else {
                const eventRows = [
                  {
                    session_id: sessionId,
                    lead_email: leadIdentity.email,
                    event_name: "lead_form_submit",
                    section: "__form_submit__",
                    occurred_at: nowIso,
                    page: window.location.pathname + window.location.search,
                    payload: {
                      form_origin: "PreCheckout",
                      site_origin: sourceData.site_origin || null,
                      site_hostname:
                        sourceData.site_hostname || window.location.hostname || null,
                      page_url: sourceData.page_url || window.location.href,
                      profile: leadIdentity.cargo,
                    },
                  },
                  {
                    session_id: sessionId,
                    lead_email: leadIdentity.email,
                    event_name: "sympla_redirected",
                    section: "__sympla_redirected__",
                    occurred_at: nowIso,
                    page: window.location.pathname + window.location.search,
                    payload: {
                      target_link: CHECKOUT_LINK,
                      site_origin: sourceData.site_origin || null,
                      site_hostname:
                        sourceData.site_hostname || window.location.hostname || null,
                      page_url: sourceData.page_url || window.location.href,
                    },
                  },
                ];

                const { error: eventsError } = await supabase
                  .from("tracking_lead_section_events")
                  .upsert(eventRows, { onConflict: "session_id,event_name,section" });

                if (eventsError) {
                  console.error(
                    "[PreCheckout] erro ao salvar tracking events no Supabase",
                    eventsError,
                  );
                }
              }
            }
          } else {
            console.warn("[PreCheckout] Supabase client indisponivel");
          }
        } catch (supabaseError) {
          console.error(
            "[PreCheckout] erro inesperado no tracking Supabase",
            supabaseError,
          );
        }
      } else {
        console.warn("[PreCheckout] Supabase nao configurado no ambiente");
      }

      setLeadStatus("success");
      setShowLeadModal(false);
      window.open(CHECKOUT_LINK, "_blank", "noopener,noreferrer");
    } catch (_error) {
      setLeadStatus("error");
      console.error("[PreCheckout] erro no envio do lead", _error);
      setLeadError(
        _error?.message || "Não foi possível enviar agora. Tente novamente.",
      );
    }
  };

  return (
    <main className="bg-black text-white">
      <section className="relative overflow-hidden px-4 pb-0 pt-10 md:px-8 md:pb-20 md:pt-14">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 14% 12%, rgba(245,192,43,0.25), transparent 40%), radial-gradient(circle at 80% 20%, rgba(0,158,64,0.2), transparent 38%)",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/10 bg-[#0B0B0B]">
          <div className="flex flex-col items-center justify-center px-5 py-8 md:px-10 md:py-12">
            <div className="inline-flex w-fit self-center rounded-sm bg-[#0A0A0A] px-2 py-1">
              <img
                src="/logo-dsx-horizontal-2.svg"
                alt="DSX 2026"
                className="h-12 w-auto object-contain md:h-14"
                loading="eager"
                decoding="async"
              />
            </div>
            <h1 className="mt-4 max-w-xl text-center font-anton text-[clamp(1.2rem,6vw,3.2rem)] md:max-w-4xl uppercase leading-[1.35]">
              O maior evento de negócios, marketing, vendas e inovação do Norte
            </h1>

            <div className="mx-auto mt-7 flex w-full max-w-4xl flex-wrap justify-center gap-x-4 gap-y-5 px-2 py-2 md:px-0">
              {metrics.map((item, index) => (
                <div key={item.label} className="min-w-0 text-center">
                  <p className="font-jamjuree text-[28px] font-extrabold leading-none tracking-normal text-white md:text-[52px]">
                    {formatMetricValue(animatedValues[index] ?? 0, item)}
                  </p>
                  <p className="mt-1 font-jamjuree text-[12px] font-bold uppercase tracking-[0.02em] text-white md:text-[15px]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mx-auto mt-3 grid w-full max-w-[980px] grid-cols-2 gap-3 px-2 md:grid-cols-4 md:gap-5 md:px-0">
              {experienceHighlights.map((item) => (
                <div
                  key={`${item.value}-${item.label}`}
                  className="nv-highlight-wrap w-full"
                >
                  <div className="nv-highlight-inner flex min-h-[104px] flex-col items-center justify-center px-3 py-3 text-center md:min-h-[132px] md:px-5">
                    <p className="font-jamjuree text-[20px] font-extrabold leading-none text-[#F5C02B] md:text-[40px]">
                      {item.value}
                    </p>
                    <p className="mt-1 font-jamjuree text-[12px] font-bold uppercase tracking-[0.02em] text-white md:text-[20px] md:leading-[1.05]">
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2 text-left text-white/90">
              <div className="flex w-full items-center justify-start gap-1.5">
                <Calendar size={18} color="#F5C02B" />
                <p className="text-left font-jamjuree text-[0.98rem] leading-relaxed">
                  23 e 24 de Julho
                </p>
              </div>
              <div className="flex w-full items-center justify-start gap-1.5">
                <MapPin size={18} color="#F5C02B" className="mt-0.5 shrink-0" />
                <p className="text-left font-jamjuree text-[0.98rem] leading-relaxed">
                  Centro de Convenções Vasco Vasques, Manaus/AM
                </p>
              </div>
            </div>

            <div
              id="newvendas-primary-cta"
              className="mt-7 w-full max-w-[460px]"
              onClickCapture={handleOpenLeadModal}
            >
              <NewVendasHeaderMask
                titulo="COMPRAR PASSAPORTE"
                link="#lead-form-checkoutvendas"
                target="_self"
                textColor="#FFFFFF"
                backgroundColor="#1E1A12"
                font="700"
                size="lg"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-black px-4 pb-10 md:px-8 md:pb-14">
        <NewVendasSpeakersSlider />
      </section>
      <AudienceSection items={audienceProfiles} />

      <section className="relative overflow-hidden bg-black px-4 py-14 md:px-8 md:py-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 12% 85%, rgba(0,183,255,0.18), transparent 34%), radial-gradient(circle at 83% 5%, rgba(245,192,43,0.16), transparent 32%)",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto w-full max-w-7xl">
          <h2 className="text-center font-anton text-[clamp(2rem,6vw,3.7rem)] uppercase leading-[1.2]">
            O Ambiente que gera negócios reais
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-relaxed text-white/75 md:text-lg">
            Conteúdo aplicado, conexões de alto nível e experiências que aproximam
            decisores, marcas e oportunidades em um único lugar.
          </p>
        </div>
        <div className="mt-10 space-y-4 -mx-4 md:-mx-8">
          <div className="faixa-wrapper">
            <div
              className="faixa-track gap-3 md:gap-5"
              style={{ animationDuration: "92s" }}
            >
              {[...galleryTopRow, ...galleryTopRow, ...galleryTopRow, ...galleryTopRow].map((item, index) => (
                <div
                  key={`top-${item.src}-${index}`}
                  className="group w-[220px] shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-[#0E0E0E] md:w-[300px] lg:w-[340px]"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-[180px] w-full object-cover transition duration-500 group-hover:scale-105 md:h-[210px] lg:h-[230px]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="faixa-wrapper">
            <div
              className="faixa-track-fast gap-3 md:gap-5"
              style={{ animationDirection: "reverse", animationDuration: "64s" }}
            >
              {[...galleryBottomRow, ...galleryBottomRow, ...galleryBottomRow, ...galleryBottomRow].map((item, index) => (
                <div
                  key={`bottom-${item.src}-${index}`}
                  className="group w-[220px] shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-[#0E0E0E] md:w-[300px] lg:w-[340px]"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-[180px] w-full object-cover transition duration-500 group-hover:scale-105 md:h-[210px] lg:h-[230px]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0A0A0A] px-4 pb-16 pt-14 md:px-8 md:pb-20 md:pt-20">
        <div className="mx-auto w-full max-w-4xl">
          <h2 className="text-center font-anton text-[clamp(2rem,5vw,3rem)] uppercase leading-none">
            Perguntas frequentes
          </h2>

          <div className="mt-8 rounded-2xl border border-[#2B2B2B] bg-[#121212] p-2 md:p-3">
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index;

              return (
                <article
                  key={item.question}
                  className="border-b border-[#2B2B2B] px-3 py-4 last:border-b-0 md:px-4"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 text-left"
                    onClick={() =>
                      setOpenFaqIndex((current) =>
                        current === index ? -1 : index,
                      )
                    }
                    aria-expanded={isOpen}
                  >
                    <h3 className="font-jamjuree text-lg font-semibold leading-snug text-white md:text-[1.35rem]">
                      {item.question}
                    </h3>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#3B3B3B] text-[#F5C02B] transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                      aria-hidden="true"
                    >
                      <img src="/arrow-down.svg" alt="" className="h-4 w-4" />
                    </span>
                  </button>

                  <div
                    className={`grid overflow-hidden transition-all duration-300 ${isOpen
                        ? "mt-3 grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                      }`}
                  >
                    <p className="overflow-hidden font-jamjuree text-[1rem] leading-relaxed text-white/80">
                      {item.answer}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="mt-8 text-center font-jamjuree text-sm text-white/45">
            DSX {yearLabel}. Todos os direitos reservados.
          </p>
        </div>
      </section>

      {showLeadModal ? (
        <div className="fixed inset-0 z-[200] grid place-items-center bg-black/75 px-4">
          <div className="w-full max-w-[560px] rounded-2xl border border-[#3A3222] bg-[#111111] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] md:p-6">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="font-anton text-2xl uppercase text-white md:text-3xl">
                  PREENCHA O FORMULÁRIO PARA COMPRAR SEU PASSAPORTE
                </h3>
              </div>
              <button
                type="button"
                onClick={handleCloseLeadModal}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white/80 transition hover:bg-white/10"
                aria-label="Fechar formulário"
              >
                ×
              </button>
            </div>

            <form id="lead-form-checkoutvendas" onSubmit={handleLeadSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Nome"
                value={leadForm.name}
                onChange={(event) => handleLeadInputChange("name", event.target.value)}
                className="w-full rounded-xl border border-[#2E2E2E] bg-[#181818] px-4 py-3 font-jamjuree text-white outline-none transition focus:border-[#F5C02B]"
                required
              />
              <input
                type="email"
                placeholder="E-mail"
                value={leadForm.email}
                onChange={(event) => handleLeadInputChange("email", event.target.value)}
                className="w-full rounded-xl border border-[#2E2E2E] bg-[#181818] px-4 py-3 font-jamjuree text-white outline-none transition focus:border-[#F5C02B]"
                required
              />
              <input
                type="tel"
                placeholder="Telefone"
                value={leadForm.phone}
                onChange={(event) => handleLeadInputChange("phone", event.target.value)}
                className="w-full rounded-xl border border-[#2E2E2E] bg-[#181818] px-4 py-3 font-jamjuree text-white outline-none transition focus:border-[#F5C02B]"
                required
              />
              <select
                value={leadForm.cargo}
                onChange={(event) => handleLeadInputChange("cargo", event.target.value)}
                className="w-full rounded-xl border border-[#2E2E2E] bg-[#181818] px-4 py-3 font-jamjuree text-white outline-none transition focus:border-[#F5C02B]"
                required
              >
                <option value="" disabled>
                  Selecione
                </option>
                {profileOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              {leadError ? (
                <p className="font-jamjuree text-sm text-[#FF7C7C]">{leadError}</p>
              ) : null}

              <div className="mt-2 flex justify-center">
                <button
                  type="submit"
                  disabled={leadStatus === "loading"}
                  className="group nv-mask-shell relative rounded-2xl bg-gradient-to-r from-[#8E3EEB] to-[#E0474A] p-[2px] shadow-[0_0_0_1px_rgba(224,71,74,0.2)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_14px_34px_rgba(224,71,74,0.35)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <span className="relative flex h-12 min-w-[248px] items-center justify-center overflow-hidden rounded-[14px] bg-[#1E1A12] px-6">
                    <span className="nv-mask-shine pointer-events-none absolute inset-y-0 -left-[40%] w-[36%] rotate-12 bg-white/30 blur-sm transition-transform duration-500 ease-out group-hover:translate-x-[430%]" />
                    <span className="nv-mask-glow pointer-events-none absolute inset-0 rounded-[14px] bg-gradient-to-r from-[#8E3EEB] to-[#E0474A] opacity-45 blur-md transition-opacity duration-300 group-hover:opacity-65" />
                    <span className="relative text-center font-jamjuree text-[15px] font-bold uppercase leading-none text-white">
                      {leadStatus === "loading"
                        ? "Enviando..."
                        : "Comprar agora"}
                    </span>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

    </main>
  );
};

export default PreCheckout;


