import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDsxFormOrigin } from "../utils/formOrigin";
import {
  FORM_INITIAL_STATE,
  FORM_STEPS,
  RD_API_URL,
  SOURCE_INITIAL_STATE,
} from "../features/LPAyla/constants";
import {
  detectSiteOriginFromUrl,
  formatWhatsappE164,
  formatWhatsappMask,
  getFieldError,
  getFirstFormError,
  isMissingColumnError,
  normalizeHostname,
} from "../features/LPAyla/utils";
import LPAylaFormStage from "../features/LPAyla/components/LPAylaFormStage";
import LPAylaEventStage from "../features/LPAyla/components/LPAylaEventStage";

const LPAyla = () => {
  const navigate = useNavigate();

  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState(FORM_INITIAL_STATE);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [sourceData, setSourceData] = useState(SOURCE_INITIAL_STATE);
  const [currentStage, setCurrentStage] = useState("form");

  const inputRef = useRef(null);
  const step = FORM_STEPS[stepIndex];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("etapa") === "evento") {
      setCurrentStage("evento");
    }
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    setSourceData({
      page_url: window.location.href,
      site_origin: detectSiteOriginFromUrl(window.location.href),
      site_hostname: normalizeHostname(window.location.hostname),
      utm_source: urlParams.get("utm_source") || "",
      utm_medium: urlParams.get("utm_medium") || "",
      utm_campaign: urlParams.get("utm_campaign") || "",
      utm_term: urlParams.get("utm_term") || "",
      utm_content: urlParams.get("utm_content") || "",
    });
  }, []);

  useEffect(() => {
    if (step.type !== "select") {
      inputRef.current?.focus();
    }
  }, [step.type, stepIndex]);

  const currentError = useMemo(
    () => getFieldError(step.key, form),
    [step.key, form],
  );

  const progress = ((stepIndex + 1) / FORM_STEPS.length) * 100;

  const nextStep = () => {
    if (currentError) {
      setMessage(currentError);
      setStatus("error");
      return;
    }

    setStatus("idle");
    setMessage("");
    setStepIndex((prev) => Math.min(prev + 1, FORM_STEPS.length - 1));
  };

  const prevStep = () => {
    setStatus("idle");
    setMessage("");
    setStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: field === "phone" ? formatWhatsappMask(value) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const firstError = getFirstFormError(FORM_STEPS, form);
    if (firstError) {
      const targetStep = FORM_STEPS.findIndex((item) => item.key === firstError.key);
      setStepIndex(targetStep >= 0 ? targetStep : 0);
      setStatus("error");
      setMessage(firstError.error);
      return;
    }

    setStatus("loading");
    setMessage("");

    const formOrigin = "LPAyla";

    const payload = {
      event_type: "CONVERSION",
      event_family: "CDP",
      payload: {
        conversion_identifier: `LP - DSX 2026 - Formulario ${formOrigin}`,
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        personal_phone: formatWhatsappE164(form.phone),
        job_title: form.cargo,
        company_name: form.cargo,
        traffic_source: sourceData.utm_source,
        traffic_campaign: sourceData.utm_campaign,
        traffic_medium: sourceData.utm_medium,
        cf_utm_campaign: sourceData.utm_campaign,
        cf_utm_medium: sourceData.utm_medium,
        cf_utm_source: sourceData.utm_source,
        cf_utm_term: sourceData.utm_term,
        cf_utm_content: sourceData.utm_content,
        cf_url_de_conversao: sourceData.page_url,
        cf_origem_formulario: formatDsxFormOrigin(formOrigin, "LPAyla"),
      },
      tags: ["dsx-vendas", "lp-ayla"],
      source: "landing-ayla",
    };

    try {
      const response = await fetch(RD_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar formulario.");
      }

      const supabaseRuntime = await import("../lib/supabaseClient");
      if (supabaseRuntime.isSupabaseConfigured) {
        const supabase = await supabaseRuntime.getSupabaseClient();
        if (supabase) {
          const nowIso = new Date().toISOString();
          const trackerState = window.DSXTracker?.getState?.() || {};
          const sessionId =
            trackerState.sessionId ||
            window.crypto?.randomUUID?.() ||
            `session-${Date.now()}`;

          const profilePayload = {
            lead_email: form.email.trim().toLowerCase(),
            lead_name: form.name.trim(),
            lead_phone: form.phone.trim(),
            lead_cargo: form.cargo,
            site_origin: sourceData.site_origin || null,
            site_hostname: sourceData.site_hostname || window.location.hostname || null,
            lp_identifier: "LP Ayla",
            first_converted_at: nowIso,
            last_seen_at: nowIso,
            has_sympla_redirected: false,
            last_sympla_redirected_at: null,
          };

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
                .upsert([fallbackProfileWithoutLp], { onConflict: "lead_email" });
              profileError = retry.error;
            }
          }

          if (!profileError) {
            const sessionPayload = {
              session_id: sessionId,
              lead_name: form.name.trim(),
              lead_email: form.email.trim().toLowerCase(),
              lead_phone: form.phone.trim(),
              lead_cargo: form.cargo,
              site_origin: sourceData.site_origin || null,
              site_hostname:
                sourceData.site_hostname || window.location.hostname || null,
              lp_identifier: "LP Ayla",
              page: sourceData.page_url || window.location.pathname + window.location.search,
              referrer: document.referrer || null,
              utm_source: sourceData.utm_source || sourceData.site_origin || null,
              utm_medium: sourceData.utm_medium || null,
              utm_campaign: sourceData.utm_campaign || null,
              utm_content: sourceData.utm_content || null,
              utm_term: sourceData.utm_term || null,
              converted_at: nowIso,
              has_sympla_redirected: false,
              sympla_redirected_at: null,
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
                .upsert([fallbackSessionPayload], { onConflict: "session_id" });
              sessionError = retry.error;

              if (sessionError && isMissingColumnError(sessionError)) {
                const fallbackSessionWithoutLp = { ...fallbackSessionPayload };
                delete fallbackSessionWithoutLp.lp_identifier;
                retry = await supabase
                  .from("tracking_lead_sessions")
                  .upsert([fallbackSessionWithoutLp], { onConflict: "session_id" });
                sessionError = retry.error;
              }
            }
          }
        }
      }

      setStatus("success");
      setMessage("Perfeito. Seus dados foram enviados com sucesso.");

      const params = new URLSearchParams(window.location.search);
      params.set("etapa", "evento");

      window.setTimeout(() => {
        setCurrentStage("evento");
        navigate(`/lpayla?${params.toString()}`, { replace: true });
      }, 700);
    } catch {
      setStatus("error");
      setMessage("Nao foi possivel enviar agora. Tente novamente.");
    }
  };

  if (currentStage === "evento") {
    return <LPAylaEventStage />;
  }

  return (
    <LPAylaFormStage
      steps={FORM_STEPS}
      step={step}
      stepIndex={stepIndex}
      totalSteps={FORM_STEPS.length}
      progress={progress}
      form={form}
      inputRef={inputRef}
      status={status}
      message={message}
      onChange={handleChange}
      onNext={nextStep}
      onBack={prevStep}
      onSubmit={handleSubmit}
    />
  );
};

export default LPAyla;
