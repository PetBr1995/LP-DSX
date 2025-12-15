import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * ⚠️ CHAVES FAKE — APENAS EXEMPLO DIDÁTICO
 * NÃO USAR EM PRODUÇÃO
 */
const RD_CLIENT_ID = "9f630d53-f053-4a1e-b933-02b395254e04";
const RD_CLIENT_SECRET = "3e5506d29c6c4b2ca94bd7e8986291ce";

/**
 * Endpoint do seu backend/proxy
 * (é ele que, no mundo real, usaria as chaves acima)
 */
const API_URL = "/api/lead";

function onlyDigits(v = "") {
  return v.replace(/\D/g, "");
}

function isValidEmail(email = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// Converte para padrão +55XXXXXXXXXXX
function formatWhatsappE164(numero = "") {
  const n = onlyDigits(numero);
  if (!n) return "";
  if (n.startsWith("55")) return `+${n}`;
  return `+55${n}`;
}

const FormSection = () => {
  const [sourceData, setSourceData] = useState({
    page_url: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setSourceData({
      page_url: window.location.href,
      utm_source: urlParams.get("utm_source") || "",
      utm_medium: urlParams.get("utm_medium") || "",
      utm_campaign: urlParams.get("utm_campaign") || "",
      utm_term: urlParams.get("utm_term") || "",
      utm_content: urlParams.get("utm_content") || "",
    });
  }, []);

  const [form, setForm] = useState({
    name: "",
    whatsapp: "",
    email: "",
    company: "",
  });

  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const handleWhatsappMask = (e) => {
    let value = e.target.value;
    value = onlyDigits(value);

    if (value.length === 0) {
      setForm((prev) => ({ ...prev, whatsapp: "" }));
      return;
    }

    value = value.slice(0, 11);

    if (value.length <= 2) {
      value = `(${value}`;
    } else if (value.length <= 6) {
      value = value.replace(/^(\d{2})(\d{0,4})/, "($1) $2");
    } else {
      if (value.length <= 10) {
        value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
      } else {
        value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
      }
    }

    setForm((prev) => ({ ...prev, whatsapp: value }));
  };

  const errors = useMemo(() => {
    const e = {};
    if (!form.name.trim()) e.name = "Informe seu nome completo.";
    if (!isValidEmail(form.email)) e.email = "Informe um e-mail válido.";

    const phone = onlyDigits(form.whatsapp);
    if (!(phone.length === 10 || phone.length === 11)) {
      e.whatsapp = "Informe um WhatsApp com DDD.";
    }

    if (!form.company.trim()) e.company = "Informe a empresa.";
    return e;
  }, [form]);

  const canSubmit = Object.keys(errors).length === 0 && status !== "loading";


   const navigate = useNavigate() 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!canSubmit) {
      setStatus("error");
      setMessage("Revise os campos e tente novamente.");
      return;
    }

    setStatus("loading");

    /**
     * Payload no formato do RD (CDP / CONVERSION)
     * Mantendo cf_* exatamente como você enviou
     */
    const payload = {
      event_type: "CONVERSION",
      event_family: "CDP",
      payload: {
        conversion_identifier: "LP - Dsx 2026",

        // Dados principais
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        personal_phone: formatWhatsappE164(form.whatsapp),
        company_name: form.company.trim(),

        // Campos customizados (cf_*)
        cf_nome_completo: form.name.trim(),
        cf_nome_da_empresa: form.company.trim(),
        cf_telefon: formatWhatsappE164(form.whatsapp),

        // UTMs / tracking
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
      },

      // extras opcionais
      tags: ["lista-antecipada", "dsx"],
      source: "landing-save-the-date",
    };

    try {
      const res = await fetch("https://api.rd.services/platform/conversions?api_key=MHnWDjBYARQKdwUsfZRbjtVmPEyoHnSqtgFz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || data.ok === false) {
        setStatus("error");
        setMessage(data.message || "Não foi possível enviar. Tente novamente.");
        return;
      }

      setStatus("success");
      setMessage(
        data.message || "Cadastro enviado! Em breve entraremos em contato."
      );

      setForm({ name: "", whatsapp: "", email: "", company: "" });
      navigate('/agradecimento')
    } catch (err) {
      setStatus("error");
      setMessage("Falha de rede. Verifique sua conexão e tente novamente.");
    }
  };

  return (
    <section className="pt-10 text-center" id="form">
      <h2 className="font-bebas text-8xl text-white">Save the date</h2>

      <div className="h-[250px] bg-cover bg-center bg-no-repeat flex items-center justify-center bg-[url('/background-form-section.png')]">
        <img
          className="w-[80%] max-w-[700px]"
          src="/logo-dsx-form.svg"
          alt="logo-dsx"
        />
      </div>

      <h4 className="mt-10 text-white text-4xl font-bebas">
        Entre na lista antecipada e saia na frente
      </h4>

      <form
        onSubmit={handleSubmit}
        className="relative grid grid-cols-1 md:grid-cols-2 gap-4 py-10 w-[90%] max-w-[800px] mx-auto"
      >
        <div className="pointer-events-none absolute -top-20 right-200 w-150 h-150 bg-[url('/Ellipse-form.png')] bg-no-repeat bg-contain opacity-100" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full col-span-1 md:col-span-2 relative z-10">
          <input
            className="p-3 text-white bg-transparent border border-white rounded-md placeholder-white/70 focus:outline-none focus:border-[#F5A205] transition w-full"
            type="text"
            placeholder="Nome completo:"
            value={form.name}
            onChange={(e) =>
              setForm((p) => ({ ...p, name: e.target.value }))
            }
            autoComplete="name"
          />

          <input
            className="p-3 text-white bg-transparent border border-white rounded-md placeholder-white/70 focus:outline-none focus:border-[#F5A205] transition w-full"
            type="text"
            placeholder="Contato (Whatsapp):"
            value={form.whatsapp}
            onChange={handleWhatsappMask}
            inputMode="tel"
            autoComplete="tel"
          />

          <input
            className="p-3 text-white bg-transparent border border-white rounded-md placeholder-white/70 focus:outline-none focus:border-[#F5A205] transition w-full"
            type="email"
            placeholder="E-mail:"
            value={form.email}
            onChange={(e) =>
              setForm((p) => ({ ...p, email: e.target.value }))
            }
            autoComplete="email"
          />

          <input
            className="p-3 text-white bg-transparent border border-white rounded-md placeholder-white/70 focus:outline-none focus:border-[#F5A205] transition w-full"
            type="text"
            placeholder="Empresa:"
            value={form.company}
            onChange={(e) =>
              setForm((p) => ({ ...p, company: e.target.value }))
            }
            autoComplete="organization"
          />

          {(status === "success" || status === "error") && (
            <div className="md:col-span-2">
              <p
                className={`text-sm ${
                  status === "success"
                    ? "text-green-300"
                    : "text-red-300"
                }`}
              >
                {message}
              </p>
            </div>
          )}

          <div className="pt-8 flex justify-center items-center md:col-span-2">
            <button
              type="submit"
              disabled={!canSubmit}
              className={`font-roboto text-black font-bold bg-[#F5A205] px-8 py-2 rounded-3xl uppercase transition ${
                !canSubmit
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:opacity-95"
              }`}
            >
              {status === "loading" ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default FormSection;
