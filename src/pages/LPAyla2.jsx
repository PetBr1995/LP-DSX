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
  normalizeHostname,
} from "../features/LPAyla/utils";
import { withRdTrackingToken } from "../lib/rdStationTracking";

const LPAyla2 = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState(FORM_INITIAL_STATE);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [sourceData, setSourceData] = useState(SOURCE_INITIAL_STATE);

  const step = FORM_STEPS[stepIndex];
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === FORM_STEPS.length - 1;
  const progress = ((stepIndex + 1) / FORM_STEPS.length) * 100;

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
    [form, step.key],
  );

  const handleChange = (field, value) => {
    setStatus("idle");
    setMessage("");
    setForm((prev) => ({
      ...prev,
      [field]: field === "phone" ? formatWhatsappMask(value) : value,
    }));
  };

  const goNext = () => {
    if (currentError) {
      setStatus("error");
      setMessage(currentError);
      return;
    }

    setStatus("idle");
    setMessage("");
    setStepIndex((prev) => Math.min(prev + 1, FORM_STEPS.length - 1));
  };

  const goBack = () => {
    setStatus("idle");
    setMessage("");
    setStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isLastStep) {
      goNext();
      return;
    }

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

    const formOrigin = "LPAyla2";

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
        cf_origem_formulario: formatDsxFormOrigin(formOrigin, "LPAyla2"),
      },
      tags: ["dsx-vendas", "lp-ayla", "lp-ayla2"],
      source: "landing-ayla",
    };

    try {
      const response = await fetch(RD_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(withRdTrackingToken(payload)),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar formulario.");
      }

      const supabaseRuntime = await import("../lib/supabaseClient");
      const supabaseTarget = "ayla";
      const isAylaConfigured = supabaseRuntime.isSupabaseConfiguredFor
        ? supabaseRuntime.isSupabaseConfiguredFor(supabaseTarget)
        : supabaseRuntime.isSupabaseConfigured;

      if (isAylaConfigured) {
        const supabase = await supabaseRuntime.getSupabaseClient(supabaseTarget);
        if (supabase) {
          const leadPayload = {
            name: form.name.trim(),
            phone: form.phone.trim(),
            email: form.email.trim().toLowerCase(),
            cargo: form.cargo,
          };

          const { error: leadError } = await supabase
            .from("lp_ayla_chat_leads")
            .insert([leadPayload]);

          if (leadError?.code === "23505") {
            console.warn("[LPAyla2] Lead already exists (duplicate email)", {
              email: leadPayload.email,
            });
          }

          if (leadError && leadError.code !== "23505") {
            console.error("[LPAyla2] Supabase insert failed", {
              code: leadError.code,
              message: leadError.message,
              details: leadError.details,
              hint: leadError.hint,
            });
            throw new Error("Erro ao salvar lead no Supabase.");
          }
        }
      } else {
        console.warn(
          "[LPAyla2] Supabase (Ayla) is not configured. Check VITE_SUPABASE_AYLA_URL and VITE_SUPABASE_AYLA_ANON_KEY.",
        );
      }

      setStatus("success");
      setMessage("Perfeito. Seus dados foram enviados com sucesso.");

      const params = new URLSearchParams(window.location.search);
      params.delete("etapa");
      const queryString = params.toString();
      const targetUrl = queryString
        ? `/calendario?${queryString}`
        : "/calendario";

      window.setTimeout(() => {
        navigate(targetUrl, { replace: true });
      }, 700);
    } catch {
      setStatus("error");
      setMessage("Nao foi possivel enviar agora. Tente novamente.");
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f6fb] px-4 py-8 text-[#0f172a] sm:px-6">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-6 rounded-2xl bg-[#021b39] px-5 py-5 text-white shadow-lg sm:px-6">
          <p className="font-jamjuree text-xs uppercase tracking-[0.12em] text-white/70">
            Digital Summit Experience 2026
          </p>
          <h1 className="mt-2 font-jamjuree text-2xl font-bold leading-tight sm:text-3xl">
            Quero participar do DSX e receber novidades
          </h1>
          <p className="mt-2 font-jamjuree text-sm text-white/80">
            Preencha em poucos passos. Leva menos de 1 minuto.
          </p>
        </header>

        <section className="rounded-2xl border border-[#dce2ef] bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-jamjuree text-xs font-semibold uppercase tracking-[0.1em] text-[#64748b]">
                Passo {stepIndex + 1} de {FORM_STEPS.length}
              </p>
              <p className="font-jamjuree text-xs font-semibold text-[#334155]">
                {Math.round(progress)}%
              </p>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#e2e8f0]">
              <div
                className="h-full rounded-full bg-[#021b39] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor={step.key}
                className="mb-2 block font-jamjuree text-base font-semibold text-[#0f172a]"
              >
                {step.title}
              </label>

              {step.type === "select" ? (
                <div className="grid gap-2">
                  {step.options.map((option) => {
                    const isSelected = form.cargo === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleChange("cargo", option)}
                        className={`rounded-xl border px-4 py-3 text-left font-jamjuree text-sm transition ${
                          isSelected
                            ? "border-[#021b39] bg-[#e8eef8] text-[#021b39]"
                            : "border-[#cbd5e1] bg-white text-[#0f172a] hover:border-[#021b39]/50"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <input
                  id={step.key}
                  ref={inputRef}
                  type={step.type}
                  value={form[step.key]}
                  placeholder={step.placeholder}
                  autoComplete={step.autoComplete}
                  onChange={(event) => handleChange(step.key, event.target.value)}
                  className="h-12 w-full rounded-xl border border-[#cbd5e1] px-4 font-jamjuree text-base outline-none transition focus:border-[#021b39] focus:ring-2 focus:ring-[#021b39]/15"
                />
              )}
            </div>

            {(status === "error" || status === "success") && message ? (
              <p
                className={`rounded-lg px-4 py-3 font-jamjuree text-sm ${
                  status === "success"
                    ? "bg-green-500/15 text-green-700"
                    : "bg-red-500/15 text-red-700"
                }`}
              >
                {message}
              </p>
            ) : null}

            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={goBack}
                disabled={isFirstStep || status === "loading"}
                className="rounded-lg border border-[#cbd5e1] px-4 py-2.5 font-jamjuree text-sm font-semibold text-[#334155] transition hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Voltar
              </button>

              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-lg bg-[#021b39] px-5 py-2.5 font-jamjuree text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLastStep
                  ? status === "loading"
                    ? "Enviando..."
                    : "Enviar"
                  : "Continuar"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default LPAyla2;
