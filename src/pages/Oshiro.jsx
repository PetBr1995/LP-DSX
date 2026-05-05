import { useEffect, useState } from "react";
import { RD_API_URL } from "../lib/rdStation";
import { withRdTrackingToken } from "../lib/rdStationTracking";
import { getSupabaseClient, isSupabaseConfigured } from "../lib/supabaseClient";
import { formatDsxFormOrigin } from "../utils/formOrigin";
import PassaportesSection from "../components/NewVendas/sections/PassaportesSection";

const OSHIRO_SYMPLA_LINK =
  "https://www.sympla.com.br/evento/dsx-2026---digital-summit-experience/3339721?d=OSHIRO20";
const ALLOWED_SYMPLA_UTM_KEYS = ["utm_source", "utm_medium"];
const OSHIRO_DISCOUNT_PARAM_KEY = "d";
const OSHIRO_DISCOUNT_PARAM_VALUE = "OSHIRO20";

const resolveRdConversionIdentifier = (origin = "") => {
  const normalized = String(origin || "")
    .trim()
    .toLowerCase();

  if (normalized.includes("vip")) {
    return "DSX 2026 - FormulÃ¡rio VIP";
  }
  if (normalized.includes("standard")) {
    return "DSX 2026 - FormulÃ¡rio Standard";
  }
  if (normalized.includes("grupo") && normalized.includes("10")) {
    return "DSX 2026 - FormulÃ¡rio Grupo 10";
  }
  if (normalized.includes("grupo") && normalized.includes("5")) {
    return "DSX 2026 - FormulÃ¡rio Grupo 5";
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

const Oshiro = () => {
  const [leadStatus, setLeadStatus] = useState("idle");
  const [isMobile, setIsMobile] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [pendingSymplaUrl, setPendingSymplaUrl] = useState("");
  const [selectedPassOrigin, setSelectedPassOrigin] = useState("Oshiro");
  const [leadSuccessMessage, setLeadSuccessMessage] = useState("");
  const [leadError, setLeadError] = useState("");
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [sourceData, setSourceData] = useState({
    page_url: "",
    site_origin: "",
    site_hostname: "",
  });

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

  const handleBuyPassaporte = (_targetLink, formOrigin) => {
    const symplaUrl = buildSymplaCheckoutUrl(
      OSHIRO_SYMPLA_LINK,
      typeof window !== "undefined" ? window.location.search : "",
    );

    setPendingSymplaUrl(symplaUrl);
    setSelectedPassOrigin(formOrigin || "Oshiro");
    setLeadError("");
    setLeadSuccessMessage("");
    setLeadStatus("idle");
    setShowLeadModal(true);
  };

  const handleCloseLeadModal = () => {
    if (leadStatus === "loading") return;
    setShowLeadModal(false);
    if (pendingSymplaUrl) {
      window.location.href = pendingSymplaUrl;
    }
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
    const resolvedFormOrigin = selectedPassOrigin || "Oshiro";

    if (!name) {
      setLeadError("Informe seu nome.");
      return;
    }
    if (!isValidEmail(email)) {
      setLeadError("Informe um e-mail vÃ¡lido.");
      return;
    }
    if (!(phoneDigits.length === 10 || phoneDigits.length === 11)) {
      setLeadError("Informe um telefone com DDD.");
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
      setLeadSuccessMessage("Lead enviado com sucesso. Redirecionando...");

      if (pendingSymplaUrl) {
        window.setTimeout(() => {
          window.location.href = pendingSymplaUrl;
        }, 1200);
      }
    } catch (_error) {
      setLeadStatus("error");
      console.error("[Oshiro] erro no envio do lead", _error);
      setLeadError(
        _error?.message || "NÃ£o foi possÃ­vel enviar agora. Tente novamente.",
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

          <p className="mt-8 font-anton text-xs uppercase tracking-[0.35em] text-[#F5C02B]">
            Oferta exclusiva
          </p>
          <h1 className="mt-4 w-full max-w-6xl font-anton text-[clamp(2rem,6.2vw,5rem)] uppercase leading-[1] text-white">
            <span>Você ganhou </span>
            <span className="text-[#F5C02B]">20% de desconto</span>
          </h1>
          <p className="mt-5 max-w-4xl font-jamjuree text-[clamp(0.9rem,1.35vw,1.05rem)] leading-[1.7] tracking-[0.01em] text-white/70">
            Garanta agora seu passaporte para o DSX 2026 com 20% off. Dois dias
            de evento, +40 palestras e a maior feira de negócios do Norte.
          </p>

        </div>
      </section>

      <section className="mx-auto mt-6 w-full max-w-5xl">
        <PassaportesSection
          isMobile={isMobile}
          onBuyPassaporte={handleBuyPassaporte}
          showOshiroDiscount
          hideGroupPassaporte
        />
      </section>

      {showLeadModal ? (
        <div
          className="fixed inset-0 z-[70] overflow-y-auto bg-black px-4 py-6 md:py-8"
          onClick={handleCloseLeadModal}
        >
          <div
            className="relative mx-auto my-auto w-full max-w-4xl rounded-[28px] border border-white/20 bg-[#07090D] p-5 md:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Fechar formulário"
              onClick={handleCloseLeadModal}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-[#F5B42A]/60 text-[#F5B42A] transition hover:bg-[#F5B42A]/10"
            >
              x
            </button>
            <div className="h-[3px] w-24 rounded-full bg-[#F5B42A]" />
            <p className="mt-8 text-center font-anton text-[clamp(2.1rem,5vw,5rem)] uppercase leading-[0.95] text-[#F5B42A]">
              Garanta seu desconto de 20%
            </p>

            <form onSubmit={handleLeadSubmit} className="mt-8 space-y-5">
              <label className="block">
                <span className="mb-2 block font-jamjuree text-[13px] uppercase tracking-[0.11em] text-white/70">
                  Nome completo
                </span>
                <input
                  type="text"
                  value={leadForm.name}
                  onChange={(e) => handleLeadInputChange("name", e.target.value)}
                  placeholder="Digite seu nome completo"
                  className="h-14 w-full rounded-xl border border-white/30 bg-white/[0.03] px-4 font-jamjuree text-[1.05rem] text-white outline-none transition placeholder:text-white/45 focus:border-[#F5C02B]"
                  disabled={leadStatus === "loading"}
                />
              </label>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                    placeholder="voce@empresa.com"
                    className="h-14 w-full rounded-xl border border-white/30 bg-white/[0.03] px-4 font-jamjuree text-[1.05rem] text-white outline-none transition placeholder:text-white/45 focus:border-[#F5C02B]"
                    disabled={leadStatus === "loading"}
                  />
                </label>
              </div>

              {leadError ? (
                <p className="text-sm font-semibold text-red-300">{leadError}</p>
              ) : null}
              {leadSuccessMessage ? (
                <p className="text-sm font-semibold text-green-300">
                  {leadSuccessMessage}
                </p>
              ) : null}

              <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <p className="font-jamjuree text-xs uppercase tracking-[0.12em] text-white/45">
                  Preenchimento rápido e seguro
                </p>
                <button
                  type="submit"
                  disabled={leadStatus === "loading"}
                  className="inline-flex h-[58px] items-center overflow-hidden rounded-[18px] border border-[#E7A240]/60 bg-gradient-to-r from-[#F3CB46] to-[#E7A240] font-jamjuree text-base font-extrabold uppercase tracking-[0.06em] text-black transition hover:brightness-105 disabled:opacity-70"
                >
                  <span className="px-8">
                    {leadStatus === "loading"
                      ? "Enviando..."
                      : "Comprar passaporte"}
                  </span>
                  <span className="grid h-full w-[64px] place-items-center border-l border-black/20 bg-[#E7A240] text-4xl leading-none">
                    →
                  </span>
                </button>
              </div>
              <p className="pt-1 text-center font-jamjuree text-xs text-white/55">
                Você será redirecionado ao Sympla após o envio.
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



