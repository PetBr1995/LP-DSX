import { useEffect, useState } from "react";
import { RD_API_URL } from "../lib/rdStation";
import { withRdTrackingToken } from "../lib/rdStationTracking";
import { getSupabaseClient, isSupabaseConfigured } from "../lib/supabaseClient";
import { formatDsxFormOrigin } from "../utils/formOrigin";
import PassaportesSection from "../components/NewVendas/sections/PassaportesSection";
import { FormButton } from "../components/FormSection";
import SlidePalestrantesComponent from "../components/pageOshiroComponents/slidePalestrantesComponent";
import NewVendasHeaderMask from "../components/NewVendas/NewVendasHeaderMask";
import { Calendar, MapPin } from "lucide-react";
const OSHIRO_LEAD_UNLOCK_KEY = "dsx_oshiro_lead_unlocked_v1";
const OSHIRO_SYMPLA_LINK =
  "https://www.sympla.com.br/evento/dsx-2026---digital-summit-experience/3339721?d=OSHIRO20";
const ALLOWED_SYMPLA_UTM_KEYS = ["utm_source", "utm_medium"];
const OSHIRO_DISCOUNT_PARAM_KEY = "d";
const OSHIRO_DISCOUNT_PARAM_VALUE = "OSHIRO20";

const profileOptions = [
  "Empresário",
  "Diretor ou Gestor",
  "Profissional de marketing, vendas e operações",
  "Estudante",
  "Outros",
];

const revenueOptions = [
  "Até R$ 100 mil/ano",
  "R$ 100 mil a R$ 500 mil/ano",
  "R$ 500 mil a R$ 1 milhão/ano",
  "R$ 1 milhão a R$ 5 milhões/ano",
  "Acima de R$ 5 milhões/ano",
];

const resolveRdConversionIdentifier = (origin = "") => {
  const normalized = String(origin || "")
    .trim()
    .toLowerCase();

  if (normalized.includes("vip")) {
    return "DSX 2026 - Formulário VIP";
  }
  if (normalized.includes("standard")) {
    return "DSX 2026 - Formulário Standard";
  }
  if (normalized.includes("grupo") && normalized.includes("10")) {
    return "DSX 2026 - Formulário Grupo 10";
  }
  if (normalized.includes("grupo") && normalized.includes("5")) {
    return "DSX 2026 - Formulário Grupo 5";
  }

  return `LP - DSX 2026 - Formulario ${origin || "Oshiro"}`;
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

const buildSymplaCheckoutUrl = (baseUrl, search = "") => {
  const url = new URL(baseUrl);
  const params = new URLSearchParams(search || "");

  url.searchParams.set(OSHIRO_DISCOUNT_PARAM_KEY, OSHIRO_DISCOUNT_PARAM_VALUE);

  ALLOWED_SYMPLA_UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
};

const leadSteps = [
  {
    key: "personal",
    label: "Dados pessoais",
    fields: ["name", "phone", "email"],
  },
  {
    key: "business",
    label: "Dados da empresa",
    fields: ["cargo", "company", "revenue"],
  },
];

const Oshiro = () => {
  const [leadStatus, setLeadStatus] = useState("idle");
  const [isMobile, setIsMobile] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(true);
  const [pendingSymplaUrl, setPendingSymplaUrl] = useState("");
  const [selectedPassOrigin, setSelectedPassOrigin] = useState("Oshiro");
  const [isLeadUnlocked, setIsLeadUnlocked] = useState(false);
  const [activeLeadStep, setActiveLeadStep] = useState(0);
  const [leadSuccessMessage, setLeadSuccessMessage] = useState("");
  const [leadError, setLeadError] = useState("");
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
    cargo: "",
    company: "",
    revenue: "",
  });
  const [sourceData, setSourceData] = useState({
    page_url: "",
    site_origin: "",
    site_hostname: "",
  });

  useEffect(() => {
    const alreadyUnlocked =
      typeof window !== "undefined" &&
      window.localStorage.getItem(OSHIRO_LEAD_UNLOCK_KEY) === "true";

    if (alreadyUnlocked) {
      setIsLeadUnlocked(true);
      setShowLeadModal(false);
    }
  }, []);

  useEffect(() => {
    const currentUrl = window.location.href;
    const siteHostname = normalizeHostname(window.location.hostname);
    const siteOrigin = detectSiteOriginFromUrl(currentUrl) || siteHostname;

    setSourceData({
      page_url: currentUrl,
      site_origin: siteOrigin,
      site_hostname: siteHostname,
    });
  }, []);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 1015);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    if (!showLeadModal) return undefined;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [showLeadModal]);

  const handleBuyPassaporte = (targetLink, formOrigin) => {
    const symplaUrl = buildSymplaCheckoutUrl(
      OSHIRO_SYMPLA_LINK,
      typeof window !== "undefined" ? window.location.search : "",
    );

    if (isLeadUnlocked) {
      window.location.href = symplaUrl;
      return;
    }

    setPendingSymplaUrl(symplaUrl);
    setSelectedPassOrigin(formOrigin || "Oshiro");
    setLeadError("");
    setLeadSuccessMessage("");
    setLeadStatus("idle");
    setActiveLeadStep(0);
    setShowLeadModal(true);
  };

  const handleCloseLeadModal = () => {
    if (leadStatus === "loading" || !isLeadUnlocked) return;
    setShowLeadModal(false);
  };

  const handleLeadInputChange = (field, value) => {
    setLeadForm((current) => ({
      ...current,
      [field]: field === "phone" ? formatPhone(value) : value,
    }));
  };

  const getStepError = (stepKey) => {
    const name = leadForm.name.trim();
    const email = leadForm.email.trim().toLowerCase();
    const phoneDigits = onlyDigits(leadForm.phone);
    const cargo = leadForm.cargo.trim();
    const company = leadForm.company.trim();
    const revenue = leadForm.revenue.trim();

    if (stepKey === "name" && !name) return "Informe seu nome.";
    if (stepKey === "email" && !isValidEmail(email))
      return "Informe um e-mail válido.";
    if (
      stepKey === "phone" &&
      !(phoneDigits.length === 10 || phoneDigits.length === 11)
    ) {
      return "Informe um telefone com DDD.";
    }
    if (stepKey === "cargo" && !cargo) return "Selecione o campo 'Você é...'.";
    if (stepKey === "company" && !company) return "Informe o nome da empresa.";
    if (stepKey === "revenue" && !revenue) return "Selecione o faturamento.";
    return "";
  };

  const handleLeadStepNext = () => {
    const currentStepFields = leadSteps[activeLeadStep]?.fields || [];
    if (!currentStepFields.length) return;

    for (const field of currentStepFields) {
      const currentStepError = getStepError(field);
      if (currentStepError) {
        setLeadError(currentStepError);
        return;
      }
    }

    setLeadError("");
    if (activeLeadStep < leadSteps.length - 1) {
      setActiveLeadStep((current) => current + 1);
    }
  };

  const handleLeadStepBack = () => {
    setLeadError("");
    if (activeLeadStep > 0) {
      setActiveLeadStep((current) => current - 1);
    }
  };

  const handleLeadSubmit = async (event) => {
    event.preventDefault();

    const name = leadForm.name.trim();
    const email = leadForm.email.trim().toLowerCase();
    const phoneDigits = onlyDigits(leadForm.phone);
    const phone = leadForm.phone.trim();
    const cargo = leadForm.cargo.trim();
    const company = leadForm.company.trim();
    const revenue = leadForm.revenue.trim();
    const resolvedFormOrigin = selectedPassOrigin || "Oshiro";

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
    if (!company) {
      setLeadError("Informe o nome da empresa.");
      return;
    }
    if (!revenue) {
      setLeadError("Selecione o faturamento.");
      return;
    }

    setLeadStatus("loading");
    setLeadError("");
    setLeadSuccessMessage("");

    try {
      const lpIdentifier = "LP DSX - Oshiro";
      const payload = {
        event_type: "CONVERSION",
        event_family: "CDP",
        payload: {
          conversion_identifier:
            resolveRdConversionIdentifier(resolvedFormOrigin),
          name,
          email,
          personal_phone: phone,
          company_name: company,
          voce_e: cargo,
          cf_nome_da_empresa: company,
          cf_faturamento: revenue,
          cf_voce_e: cargo,
          cf_cargo: cargo,
          cf_url_de_conversao: sourceData.page_url,
          cf_origem_formulario: formatDsxFormOrigin(
            resolvedFormOrigin,
            "Home Principal",
          ),
        },
        tags: ["dsx-oshiro", "lp"],
        source: "landing-oshiro",
      };

      const rdResult = await fetch(RD_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(withRdTrackingToken(payload)),
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
        window.crypto?.randomUUID?.() ||
        `session-${Date.now()}`;
      const nowIso = new Date().toISOString();

      const profilePayload = {
        lead_email: email,
        lead_name: name,
        lead_phone: phone,
        lead_cargo: cargo,
        site_origin: sourceData.site_origin || null,
        site_hostname:
          sourceData.site_hostname || window.location.hostname || null,
        lp_identifier: lpIdentifier,
        first_converted_at: nowIso,
        last_seen_at: nowIso,
        has_sympla_redirected: true,
        last_sympla_redirected_at: nowIso,
      };

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
              let retry = await supabase
                .from("tracking_lead_profiles")
                .upsert([fallbackProfilePayload], { onConflict: "lead_email" });
              profileError = retry.error;

              if (profileError && isMissingColumnError(profileError)) {
                const fallbackProfileWithoutLp = { ...fallbackProfilePayload };
                delete fallbackProfileWithoutLp.lp_identifier;
                retry = await supabase
                  .from("tracking_lead_profiles")
                  .upsert([fallbackProfileWithoutLp], {
                    onConflict: "lead_email",
                  });
                profileError = retry.error;
              }
            }

            if (!profileError) {
              const sessionPayload = {
                session_id: sessionId,
                lead_name: name,
                lead_email: email,
                lead_phone: phone,
                lead_cargo: cargo,
                site_origin: sourceData.site_origin || null,
                site_hostname:
                  sourceData.site_hostname || window.location.hostname || null,
                lp_identifier: lpIdentifier,
                page:
                  sourceData.page_url ||
                  window.location.pathname + window.location.search,
                referrer: document.referrer || null,
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
                let retry = await supabase
                  .from("tracking_lead_sessions")
                  .upsert([fallbackSessionPayload], {
                    onConflict: "session_id",
                  });
                sessionError = retry.error;

                if (sessionError && isMissingColumnError(sessionError)) {
                  const fallbackSessionWithoutLp = {
                    ...fallbackSessionPayload,
                  };
                  delete fallbackSessionWithoutLp.lp_identifier;
                  retry = await supabase
                    .from("tracking_lead_sessions")
                    .upsert([fallbackSessionWithoutLp], {
                      onConflict: "session_id",
                    });
                  sessionError = retry.error;
                }
              }

              if (!sessionError) {
                const eventRows = [
                  {
                    session_id: sessionId,
                    lead_email: email,
                    event_name: "lead_form_submit",
                    section: "__form_submit__",
                    occurred_at: nowIso,
                    page: window.location.pathname + window.location.search,
                    payload: {
                      form_origin: "Oshiro",
                      passaporte_origem: resolvedFormOrigin,
                      lp_identifier: lpIdentifier,
                      site_origin: sourceData.site_origin || null,
                      site_hostname:
                        sourceData.site_hostname ||
                        window.location.hostname ||
                        null,
                      page_url: sourceData.page_url || window.location.href,
                      profile: cargo,
                      company_name: company,
                      revenue,
                    },
                  },
                  {
                    session_id: sessionId,
                    lead_email: email,
                    event_name: "sympla_redirected",
                    section: "__sympla_redirected__",
                    occurred_at: nowIso,
                    page: window.location.pathname + window.location.search,
                    payload: {
                      target_link: pendingSymplaUrl || null,
                      passaporte_origem: resolvedFormOrigin,
                      site_origin: sourceData.site_origin || null,
                      site_hostname:
                        sourceData.site_hostname ||
                        window.location.hostname ||
                        null,
                      page_url: sourceData.page_url || window.location.href,
                    },
                  },
                ];

                await supabase
                  .from("tracking_lead_section_events")
                  .upsert(eventRows, {
                    onConflict: "session_id,event_name,section",
                  });
              }
            }
          }
        } catch (supabaseError) {
          console.error(
            "[Oshiro] erro inesperado no tracking Supabase",
            supabaseError,
          );
        }
      }

      setLeadStatus("success");
      setLeadSuccessMessage("Lead enviado com sucesso. Acesso liberado.");
      setIsLeadUnlocked(true);
      setShowLeadModal(false);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(OSHIRO_LEAD_UNLOCK_KEY, "true");
      }

      if (pendingSymplaUrl) {
        window.setTimeout(() => {
          window.location.href = pendingSymplaUrl;
        }, 1200);
      }
    } catch (_error) {
      setLeadStatus("error");
      console.error("[Oshiro] erro no envio do lead", _error);
      setLeadError(
        _error?.message || "Não foi possível enviar agora. Tente novamente.",
      );
    }
  };

  return (
    <main className="min-h-screen bg-black px-4 pb-12 pt-6 text-white md:px-8 md:pt-9">
      <section className="relative overflow-hidden px-4 py-10 md:px-8 md:py-14">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center text-center">
          <img
            src="/logo-dsx-horizontal-2.svg"
            alt="DSX 2026"
            className="h-14 w-auto object-contain md:h-16"
            loading="eager"
            decoding="async"
          />

          <h1 className="mt-6 w-full max-w-[360px] font-anton text-[clamp(1.6rem,5.6vw,4.1rem)] uppercase leading-[1.15] text-white md:max-w-6xl md:leading-[1.25]">
            <span className="block text-[#F5C02B]">O maior evento</span>
            <span className="block md:hidden">
              de negócios, marketing, vendas e
            </span>
            <span className="block md:hidden">inovação</span>
            <span className="block text-[#F5C02B]">do Norte</span>
          </h1>
          <h2></h2>

          <p className="mt-6 max-w-3xl font-jamjuree text-[clamp(1rem,2.3vw,1.8rem)] leading-relaxed text-white/90">
            Dois dias de conteúdo estratégico e conexões de alto nível.
          </p>

          <p className="mt-5 max-w-3xl font-anton text-[clamp(1.3rem,3.3vw,2.4rem)] uppercase leading-[1.08] text-white">
            Onde os maiores especialistas do país se encontram.
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <div className="flex items-center justify-center gap-2">
              <span>
                <Calendar color="#F5C02B" />
              </span>
              <p className="text-center text-[clamp(.95rem,2.8vw,1rem)] leading-[1.2] text-white/90">
                23 e 24 de Julho
              </p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span>
                <MapPin color="#F5C02B" />
              </span>
              <div>
                <p>Centro de Convenções</p>
                <p>Vasco Vasques, Manaus/AM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-6 w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/10 bg-black">
        <div className="relative w-full pb-[56.25%]">
          <iframe
            src="https://player.vimeo.com/video/1146735494?autoplay=1&muted=1&loop=1&controls=0&title=0&byline=0&portrait=0&autopause=0&playsinline=1"
            className="absolute inset-0 h-full w-full"
            allow="autoplay; fullscreen; picture-in-picture"
            title="DSX Oshiro Video"
          />
        </div>
      </section>

      <section className="bg-black px-0 pb-2 pt-8 md:pt-10">
        <SlidePalestrantesComponent />
      </section>

      <section className="mx-auto mt-6 w-full max-w-5xl">
        <PassaportesSection
          isMobile={isMobile}
          onBuyPassaporte={handleBuyPassaporte}
          showOshiroDiscount
        />
      </section>

      {showLeadModal ? (
        <div
          className="fixed inset-0 z-[70] overflow-y-auto bg-black px-4 py-6 md:py-8"
          onClick={isLeadUnlocked ? handleCloseLeadModal : undefined}
        >
          <div
            className="relative mx-auto my-auto w-full max-w-4xl rounded-[28px] border border-white/20 bg-[#07090D] p-5 md:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            {!isLeadUnlocked ? null : (
              <button
                type="button"
                aria-label="Fechar formulário"
                onClick={handleCloseLeadModal}
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-[#F5B42A]/60 text-[#F5B42A] transition hover:bg-[#F5B42A]/10"
              >
                x
              </button>
            )}
            <div className="h-[3px] w-24 rounded-full bg-[#F5B42A]" />
            <img
              src="/logo-dsx-vertical.svg"
              alt="DSX 2026"
              className="mx-auto mt-5 h-24 w-auto object-contain"
              loading="eager"
              decoding="async"
            />
            <p className="mt-7 text-center font-anton text-[clamp(2rem,4vw,3.1rem)] uppercase leading-none text-[#F5B42A]">
              Garanta sua vaga
            </p>
            {!isLeadUnlocked ? (
              <p className="mt-2 text-center font-jamjuree text-xs uppercase tracking-[0.11em] text-white/60">
                Preencha o formulário para liberar o acesso a página
              </p>
            ) : null}
            <form onSubmit={handleLeadSubmit} className="mt-7 space-y-4">
              <p className="font-jamjuree text-xs uppercase tracking-[0.11em] text-white/55">
                Etapa {activeLeadStep + 1} de {leadSteps.length}
              </p>
              {leadSteps[activeLeadStep]?.fields?.includes("name") ? (
                <label className="block">
                  <span className="mb-2 block font-jamjuree text-[13px] uppercase tracking-[0.11em] text-white/70">
                    Nome completo
                  </span>
                  <input
                    type="text"
                    value={leadForm.name}
                    onChange={(e) =>
                      handleLeadInputChange("name", e.target.value)
                    }
                    placeholder="Digite seu nome completo"
                    className="h-14 w-full rounded-xl border border-white/30 bg-white/[0.03] px-4 font-jamjuree text-[1.05rem] text-white outline-none transition placeholder:text-white/45 focus:border-[#F5C02B]"
                    disabled={leadStatus === "loading"}
                  />
                </label>
              ) : null}
              {leadSteps[activeLeadStep]?.fields?.includes("phone") ? (
                <label className="block">
                  <span className="mb-2 block font-jamjuree text-[13px] uppercase tracking-[0.11em] text-white/70">
                    Contato (WhatsApp)
                  </span>
                  <input
                    type="tel"
                    value={leadForm.phone}
                    onChange={(e) =>
                      handleLeadInputChange("phone", e.target.value)
                    }
                    placeholder="(92) 99999-9999"
                    className="h-14 w-full rounded-xl border border-white/30 bg-white/[0.03] px-4 font-jamjuree text-[1.05rem] text-white outline-none transition placeholder:text-white/45 focus:border-[#F5C02B]"
                    disabled={leadStatus === "loading"}
                  />
                </label>
              ) : null}
              {leadSteps[activeLeadStep]?.fields?.includes("email") ? (
                <label className="block">
                  <span className="mb-2 block font-jamjuree text-[13px] uppercase tracking-[0.11em] text-white/70">
                    E-mail
                  </span>
                  <input
                    type="email"
                    value={leadForm.email}
                    onChange={(e) =>
                      handleLeadInputChange("email", e.target.value)
                    }
                    placeholder="você@empresa.com"
                    className="h-14 w-full rounded-xl border border-white/30 bg-white/[0.03] px-4 font-jamjuree text-[1.05rem] text-white outline-none transition placeholder:text-white/45 focus:border-[#F5C02B]"
                    disabled={leadStatus === "loading"}
                  />
                </label>
              ) : null}
              {leadSteps[activeLeadStep]?.fields?.includes("cargo") ? (
                <label className="block">
                  <span className="mb-2 block font-jamjuree text-[13px] uppercase tracking-[0.11em] text-white/70">
                    Você é:
                  </span>
                  <select
                    value={leadForm.cargo}
                    onChange={(e) =>
                      handleLeadInputChange("cargo", e.target.value)
                    }
                    className="w-full rounded-lg border border-white/20 bg-[#1a1a1a] p-3 text-sm text-white outline-none transition focus:border-[#F5A205] focus:bg-[#222] sm:text-base"
                    disabled={leadStatus === "loading"}
                  >
                    <option value="">Selecione</option>
                    {profileOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              ) : null}
              {leadSteps[activeLeadStep]?.fields?.includes("company") ? (
                <label className="block">
                  <span className="mb-2 block font-jamjuree text-[13px] uppercase tracking-[0.11em] text-white/70">
                    Empresa
                  </span>
                  <input
                    type="text"
                    value={leadForm.company}
                    onChange={(e) =>
                      handleLeadInputChange("company", e.target.value)
                    }
                    placeholder="Nome da empresa"
                    className="h-14 w-full rounded-xl border border-white/30 bg-white/[0.03] px-4 font-jamjuree text-[1.05rem] text-white outline-none transition placeholder:text-white/45 focus:border-[#F5C02B]"
                    disabled={leadStatus === "loading"}
                  />
                </label>
              ) : null}
              {leadSteps[activeLeadStep]?.fields?.includes("revenue") ? (
                <label className="block">
                  <span className="mb-2 block font-jamjuree text-[13px] uppercase tracking-[0.11em] text-white/70">
                    Faturamento
                  </span>
                  <select
                    value={leadForm.revenue}
                    onChange={(e) =>
                      handleLeadInputChange("revenue", e.target.value)
                    }
                    className="w-full rounded-lg border border-white/20 bg-[#1a1a1a] p-3 text-sm text-white outline-none transition focus:border-[#F5A205] focus:bg-[#222] sm:text-base"
                    disabled={leadStatus === "loading"}
                  >
                    <option value="">Selecione</option>
                    {revenueOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              ) : null}

              {leadError ? (
                <p className="text-sm font-semibold text-red-300">
                  {leadError}
                </p>
              ) : null}
              {leadSuccessMessage ? (
                <p className="text-sm font-semibold text-green-300">
                  {leadSuccessMessage}
                </p>
              ) : null}

              <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <p className="font-jamjuree text-xs uppercase tracking-[0.12em] text-white/45">
                  Preenchimento rápido e seguro
                </p>
                <div className="flex w-full items-center gap-2 md:w-auto">
                  {activeLeadStep > 0 ? (
                    <button
                      type="button"
                      onClick={handleLeadStepBack}
                      className="h-[58px] rounded-xl border border-white/25 px-5 font-jamjuree text-xs uppercase tracking-[0.1em] text-white/80 transition hover:bg-white/10"
                      disabled={leadStatus === "loading"}
                    >
                      Voltar
                    </button>
                  ) : null}
                  {activeLeadStep < leadSteps.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleLeadStepNext}
                      className="h-[58px] min-w-[170px] rounded-xl bg-[#F5B42A] px-6 font-jamjuree text-xs font-bold uppercase tracking-[0.1em] text-black transition hover:brightness-105 disabled:opacity-70"
                      disabled={leadStatus === "loading"}
                    >
                      Continuar
                    </button>
                  ) : (
                    <FormButton
                      titulo={
                        leadStatus === "loading"
                          ? "Enviando..."
                          : "Garantir 20% OFF"
                      }
                      textColor="#000"
                      disabled={leadStatus === "loading"}
                      leftWidthClass="w-[170px] sm:w-[255px]"
                    />
                  )}
                </div>
              </div>
              <p className="pt-1 text-center font-jamjuree text-xs text-white/55">
                {pendingSymplaUrl
                  ? "Você será redirecionado ao Sympla após o envio."
                  : "Após o envio, sua navegação na página será liberada."}
              </p>
              <p className="text-center font-jamjuree text-xs text-white/40">
                Seus dados são usados apenas para liberar sua condição especial.
              </p>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  );
};

export default Oshiro;
