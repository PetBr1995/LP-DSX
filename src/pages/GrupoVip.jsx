import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { RD_API_URL } from "../lib/rdStation";
import { withRdTrackingToken } from "../lib/rdStationTracking";
import { formatDsxFormOrigin } from "../utils/formOrigin";

const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/GXEsJXjFNBi1a3LLAiG90R";

function onlyDigits(value = "") {
  return value.replace(/\D/g, "");
}

function isValidEmail(email = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function formatWhatsappE164(value = "") {
  const digits = onlyDigits(value);
  if (!digits) return "";
  if (digits.startsWith("55")) return `+${digits}`;
  return `+55${digits}`;
}

function formatPhoneMask(value = "") {
  const digits = onlyDigits(value).slice(0, 11);

  if (!digits) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) {
    return digits.replace(/^(\d{2})(\d{0,4})/, "($1) $2");
  }
  if (digits.length <= 10) {
    return digits.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  }
  return digits.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
}

const benefits = [
  {
    text_1: "+300",
    text_2: "Participantes",
  },
  {
    text_1: "Conteúdos",
    text_2: "diários",
  },
  {
    text_1: "Informações",
    text_2: "exclusivas",
  },
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
};

const GrupoVipCTA = ({
  titulo = "Entrar no Grupo VIP",
  disabled = false,
  type = "submit",
  onClick,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="group disabled:cursor-not-allowed"
    >
      <span
        className={`relative inline-flex h-12 w-full min-w-[250px] items-center justify-center bg-linear-to-r from-[#F3CB46] to-[#E7A040] px-8 font-jamjuree text-[14px] font-black uppercase text-black transition group-hover:brightness-110 sm:w-auto ${
          disabled ? "opacity-60" : ""
        }`}
      >
        {titulo}
      </span>
    </button>
  );
};

const GrupoVip = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [sourceData, setSourceData] = useState({
    page_url: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    setSourceData({
      page_url: window.location.href,
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_term: params.get("utm_term") || "",
      utm_content: params.get("utm_content") || "",
    });
  }, []);

  useEffect(() => {
    if (!isFormModalOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsFormModalOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFormModalOpen]);

  const errors = useMemo(() => {
    const nextErrors = {};
    const phoneDigits = onlyDigits(form.phone);

    if (!form.name.trim()) nextErrors.name = "Informe seu nome.";
    if (!isValidEmail(form.email)) nextErrors.email = "Informe um e-mail válido.";
    if (!(phoneDigits.length === 10 || phoneDigits.length === 11)) {
      nextErrors.phone = "Informe um telefone com DDD.";
    }

    return nextErrors;
  }, [form]);

  const canSubmit = status !== "loading";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (Object.keys(errors).length > 0) {
      setStatus("error");
      setMessage("Revise os campos destacados para entrar no grupo.");
      return;
    }

    setStatus("loading");

    const formOrigin = "DSX 2026 - LP: Grupo VIP";
    const payload = {
      event_type: "CONVERSION",
      event_family: "CDP",
      payload: {
        conversion_identifier: "DSX 2026 - LP: Grupo VIP",
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        personal_phone: formatWhatsappE164(form.phone),
        cf_nome_completo: form.name.trim(),
        cf_telefon: formatWhatsappE164(form.phone),
        cf_whatsapp: formatWhatsappE164(form.phone),
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
        cf_origem_formulario: formatDsxFormOrigin(formOrigin, "Grupo VIP"),
      },
      tags: ["grupo-vip", "whatsapp", "dsx-2026"],
      source: "landing-grupo-vip",
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

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.ok === false) {
        setStatus("error");
        setMessage(data.message || "Não foi possível enviar. Tente novamente.");
        return;
      }

      setStatus("success");
      setMessage("Cadastro confirmado. Abrindo o grupo VIP...");
      window.location.href = WHATSAPP_GROUP_URL;
    } catch {
      setStatus("error");
      setMessage("Falha de conexão. Verifique sua internet e tente novamente.");
    }
  };

  const fieldClass = (field) => {
    const hasError = status === "error" && errors[field];
    return [
      "h-12 w-full border bg-[#0c1938] px-4 font-jamjuree text-white",
      "placeholder-white/45 outline-none transition",
      "focus:border-[#F5A205] focus:ring-2 focus:ring-[#F5A205]/20",
      hasError ? "border-red-400" : "border-white/20",
    ].join(" ");
  };

  const benefitsList = (
    <ul className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-3 font-jamjuree text-white sm:grid-cols-3">
      {benefits.map((benefit) => (
        <li
          key={`${benefit.text_1}-${benefit.text_2}`}
          className="flex min-h-20 items-center justify-between gap-4 border border-white/16 bg-[#0c1938] p-4 sm:min-h-28 sm:flex-col sm:items-center sm:justify-center sm:gap-2"
        >
          <p className="whitespace-nowrap font-jamjuree text-xl font-bold leading-[1.1] text-white sm:text-[clamp(1rem,1.55vw,1.5rem)]">
            {benefit.text_1}
          </p>
          <p className="max-w-[15rem] text-right font-jamjuree text-sm font-semibold leading-[1.2] text-white/78 sm:max-w-none sm:text-center sm:text-[clamp(0.72rem,1vw,0.9rem)]">
            {benefit.text_2}
          </p>
        </li>
      ))}
    </ul>
  );

  const formContent = (
    <>
      <div className="mb-6 border-b border-white/16 pb-5 text-left">
        <p className="font-jamjuree text-xs font-black uppercase tracking-[0.35em] text-[#F3CB46]">
          Grupo VIP
        </p>
        <h2
          id="grupo-vip-modal-title"
          className="mt-3 font-anton text-4xl font-normal uppercase leading-[1.05] text-white sm:text-5xl"
        >
          Entrar no grupo
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        noValidate
      >
        <label className="grid gap-1.5 text-left font-jamjuree text-sm font-bold text-white/80">
          Nome
          <input
            className={fieldClass("name")}
            type="text"
            value={form.name}
            onChange={(event) =>
              setForm((current) => ({ ...current, name: event.target.value }))
            }
            placeholder="Seu nome"
            aria-label="Seu nome"
            autoComplete="name"
          />
        </label>

        <label className="grid gap-1.5 text-left font-jamjuree text-sm font-bold text-white/80">
          E-mail
          <input
            className={fieldClass("email")}
            type="email"
            value={form.email}
            onChange={(event) =>
              setForm((current) => ({ ...current, email: event.target.value }))
            }
            placeholder="seu@email.com"
            aria-label="Seu e-mail"
            autoComplete="email"
          />
        </label>

        <label className="grid gap-1.5 text-left font-jamjuree text-sm font-bold text-white/80">
          WhatsApp
          <input
            className={fieldClass("phone")}
            type="tel"
            value={form.phone}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                phone: formatPhoneMask(event.target.value),
              }))
            }
            placeholder="(92) 99999-9999"
            aria-label="Seu telefone"
            inputMode="tel"
            autoComplete="tel"
          />
        </label>

        {message ? (
          <p
            className={`sm:col-span-2 rounded-md border px-3 py-2 text-center font-jamjuree text-sm ${
              status === "success"
                ? "border-green-300/30 bg-green-300/10 text-green-300"
                : "border-red-300/30 bg-red-300/10 text-red-300"
            }`}
          >
            {message}
          </p>
        ) : null}

        <div className="pt-2 sm:col-span-2">
          <button
            type="submit"
            disabled={!canSubmit}
            className="h-12 w-full bg-linear-to-r from-[#F3CB46] to-[#E7A040] px-6 font-jamjuree text-sm font-black uppercase text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? "Enviando..." : "Entrar no Grupo VIP"}
          </button>
        </div>
      </form>
      <p className="mt-5 font-jamjuree text-xs leading-relaxed text-white/52">
        Cadastro gratuito. Após o envio, você será direcionado para o grupo
        oficial do DSX.
      </p>
    </>
  );

  return (
    <main className="min-h-screen bg-[#050b18] text-white">
      <section className="relative flex min-h-screen items-center overflow-hidden bg-[#050b18]">
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-5 py-9 text-center sm:px-8 md:py-14 lg:px-12">
          <div className="flex w-full flex-col items-center">
            <img
              src="/logo-dsx-horizontal-2.svg"
              alt="DSX"
              className="mb-8 block h-16 w-auto object-contain md:h-20"
              loading="eager"
              decoding="async"
            />

            <h1 className="max-w-3xl font-anton text-[38px] font-normal uppercase leading-[1.25] text-white sm:text-[56px] lg:text-[68px]">
              Grupo VIP de Networking
            </h1>

            <h2 className="mt-5 max-w-2xl border-t border-white/16 pt-5 font-jamjuree text-lg font-medium leading-[1.25] text-white/72 sm:text-2xl">
              Receba em primeira mão novidades, bastidores e oportunidades do
              maior evento de negócios do Norte.
            </h2>

            <motion.img
              src="/DSX-Phone-Mockup.png"
              alt="Prévia do grupo VIP DSX no celular"
              className="mt-7 h-auto w-full max-w-[260px] object-contain sm:max-w-[320px] md:max-w-[360px]"
              loading="eager"
              decoding="async"
              animate={{
                x: [0, 4, -3, 2, 0],
                y: [0, -9, -14, -6, 0],
                rotate: [0, 0.35, -0.25, 0.18, 0],
              }}
              transition={{
                duration: 5.8,
                ease: [0.45, 0, 0.25, 1],
                times: [0, 0.22, 0.47, 0.76, 1],
                repeat: Infinity,
              }}
            />

            <div className="mt-7 flex justify-center">
              <GrupoVipCTA
                type="button"
                titulo="Entrar para grupo VIP"
                onClick={() => {
                  setMessage("");
                  setIsFormModalOpen(true);
                }}
              />
            </div>

            <div className="mt-8 w-full">{benefitsList}</div>
          </div>
        </div>
      </section>

      {isFormModalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#020817]/86 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="grupo-vip-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Fechar formulário"
            onClick={() => setIsFormModalOpen(false)}
          />

          <div className="relative z-10 w-full max-w-2xl border border-white/16 bg-[#07142d] p-5 shadow-2xl sm:p-7">
            <button
              type="button"
              className="absolute right-5 top-5 flex size-9 items-center justify-center text-white/78 transition hover:text-[#F5A205]"
              aria-label="Fechar formulário"
              onClick={() => setIsFormModalOpen(false)}
            >
              <X size={24} />
            </button>

            <div className="pr-0">
              {formContent}
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
};

export default GrupoVip;
