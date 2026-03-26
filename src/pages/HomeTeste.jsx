import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useScrollToHash from "../hooks/useScrollToHash";
import { FormButton } from "../components/FormSection";
import { smoothEase } from "../utils/motion";

import SlideNovosPalestrantes from "../components/SlideNovosPalestrantes";
import ContentSection from "../components/ContentSection";
import FaleConosco from "../components/FaleConosco";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import NewTimerHeader from "../components/NewTimerHeader";
import SlidePalestrantes from "../components/SlidePalestrantes";
import HeroSectionV2 from "../components/HeroSectionV2";
import SlideFaixa from "../components/SlideFaixa";
import Depoimentos from "../components/Depoimentos";
import PublicoDSX from "../components/PublicoDSX";
import FAQ from "../components/FAQ";
import BannerSection from "../components/BannerSection";
import CondicoesGrupos from "../components/CondicoesGrupos";
import BotaoWPFooter from "../components/BotaoWPFooter";

function onlyDigits(value = "") {
  return value.replace(/\D/g, "");
}

function isValidEmail(email = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function formatWhatsappE164(number = "") {
  const digits = onlyDigits(number);
  if (!digits) return "";
  if (digits.startsWith("55")) return `+${digits}`;
  return `+55${digits}`;
}

const HomeTeste = () => {
  const maxGraceDismissals = 3;
  const [showTimerHeader, setShowTimerHeader] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [hasOpenedLeadModal, setHasOpenedLeadModal] = useState(false);
  const [leadModalDismissCount, setLeadModalDismissCount] = useState(0);
  const firstSpeakersSectionEndRef = useRef(null);
  const reopenModalTimeoutRef = useRef(null);

  const [sourceData, setSourceData] = useState({
    page_url: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
  });

  const [leadForm, setLeadForm] = useState({
    name: "",
    whatsapp: "",
    email: "",
  });
  const [leadStatus, setLeadStatus] = useState("idle");
  const [leadMessage, setLeadMessage] = useState("");

  // ✅ garante scroll ao chegar com /#form, /#faleconosco etc.
  useScrollToHash(90); // 90px = altura do header (ajuste)

  useEffect(() => {
    const onScroll = () => setShowTimerHeader(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  useEffect(() => {
    if (!showLeadModal) return undefined;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.touchAction = previousBodyTouchAction;
    };
  }, [showLeadModal]);

  useEffect(() => {
    return () => {
      if (reopenModalTimeoutRef.current) {
        clearTimeout(reopenModalTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (hasOpenedLeadModal || !firstSpeakersSectionEndRef.current) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;

        setShowLeadModal(true);
        setHasOpenedLeadModal(true);
        observer.disconnect();
      },
      { threshold: 0 }
    );

    observer.observe(firstSpeakersSectionEndRef.current);

    return () => observer.disconnect();
  }, [hasOpenedLeadModal]);

  const errors = useMemo(() => {
    const currentErrors = {};

    if (!leadForm.name.trim()) currentErrors.name = "Informe seu nome completo.";
    if (!isValidEmail(leadForm.email)) currentErrors.email = "Informe um e-mail válido.";

    const phone = onlyDigits(leadForm.whatsapp);
    if (!(phone.length === 10 || phone.length === 11)) {
      currentErrors.whatsapp = "Informe um WhatsApp com DDD.";
    }

    return currentErrors;
  }, [leadForm]);

  const isLeadFormValid = Object.keys(errors).length === 0;
  const canSubmitLead = leadStatus !== "loading";
  const canCloseLeadModal = leadStatus !== "loading";
  const isSecondOpenOrMore = leadModalDismissCount >= 1 && leadStatus !== "success";

  const handleWhatsappMask = (e) => {
    let value = e.target.value;
    value = onlyDigits(value).slice(0, 11);

    if (!value.length) {
      setLeadForm((prev) => ({ ...prev, whatsapp: "" }));
      return;
    }

    if (value.length <= 2) value = `(${value}`;
    else if (value.length <= 6) value = value.replace(/^(\d{2})(\d{0,4})/, "($1) $2");
    else if (value.length <= 10) value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    else value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");

    setLeadForm((prev) => ({ ...prev, whatsapp: value }));
  };

  const closeLeadModal = () => {
    if (leadStatus === "loading") return;

    setShowLeadModal(false);

    if (leadStatus === "success") {
      if (reopenModalTimeoutRef.current) {
        clearTimeout(reopenModalTimeoutRef.current);
      }
      return;
    }

    setLeadModalDismissCount((prevCount) => {
      if (prevCount >= maxGraceDismissals) return prevCount;

      const nextCount = prevCount + 1;

      if (reopenModalTimeoutRef.current) {
        clearTimeout(reopenModalTimeoutRef.current);
      }

      reopenModalTimeoutRef.current = setTimeout(() => {
        setLeadStatus("idle");
        setLeadMessage("");
        setShowLeadModal(true);
      }, 10000);

      return nextCount;
    });
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setLeadMessage("");

    if (!isLeadFormValid || !canSubmitLead) {
      setLeadStatus("error");
      setLeadMessage("Revise os campos e tente novamente.");
      return;
    }

    setLeadStatus("loading");

    const payload = {
      event_type: "CONVERSION",
      event_family: "CDP",
      payload: {
        conversion_identifier: "LP - Dsx 2026",
        name: leadForm.name.trim(),
        email: leadForm.email.trim().toLowerCase(),
        personal_phone: formatWhatsappE164(leadForm.whatsapp),
        company_name: "",
        cf_nome_completo: leadForm.name.trim(),
        cf_nome_da_empresa: "",
        cf_telefon: formatWhatsappE164(leadForm.whatsapp),
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
      tags: ["popup-home-teste", "dsx"],
      source: "landing-save-the-date",
    };

    try {
      const response = await fetch(
        "https://api.rd.services/platform/conversions?api_key=MHnWDjBYARQKdwUsfZRbjtVmPEyoHnSqtgFz",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.ok === false) {
        setLeadStatus("error");
        setLeadMessage(data.message || "Não foi possível enviar. Tente novamente.");
        return;
      }

      setLeadStatus("success");
      setLeadMessage("Cadastro enviado! Em breve entraremos em contato.");
      setLeadForm({ name: "", whatsapp: "", email: "" });
    } catch (error) {
      setLeadStatus("error");
      setLeadMessage("Falha de rede. Verifique sua conexão e tente novamente.");
    }
  };

  return (
    <section id="home" className="bg-black pb-43 md:pb-18 overflow-x-hidden">
      <HeroSection />
      <HeroSectionV2 />
      <SlideFaixa />
      <div>
        <SlideNovosPalestrantes />
        <div ref={firstSpeakersSectionEndRef} className="h-px w-full" />
      </div>
      <NewTimerHeader
        isVisible={showTimerHeader}
        headerText="O lote vira em:"
        ctaTitle="Compre agora"
        targetDate="2026-03-31T00:00:00"
      />

      <ContentSection />
      <SlidePalestrantes />
      <Depoimentos />
      <PublicoDSX />
      <BannerSection />
      <CondicoesGrupos />
      {/*
      <FormSection />
      */}
      <FaleConosco />
      <FAQ />
      <BotaoWPFooter />
      <Footer />

      <AnimatePresence>
        {showLeadModal && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: smoothEase }}
          >
            <button
              type="button"
              className={`absolute inset-0 bg-black/80 backdrop-blur-[2px] ${canCloseLeadModal ? "cursor-pointer" : "cursor-not-allowed"}`}
              onClick={closeLeadModal}
              aria-label="Fechar popup"
            />

            <motion.div
              className="relative z-10 w-full max-w-[760px] rounded-2xl border border-white/10 bg-[#101010] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.45)] sm:p-6 md:rounded-[28px] md:p-9"
              initial={{ opacity: 0, y: 24, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.99 }}
              transition={{ duration: 0.36, ease: smoothEase }}
            >
              <div className="mb-5 h-[3px] w-24 rounded-full bg-gradient-to-r from-[#F5A205] to-[#FFD26A]" />

              <button
                type="button"
                onClick={closeLeadModal}
                className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-2xl leading-none ${
                  canCloseLeadModal
                    ? "text-white/80 transition hover:border-white/35 hover:text-white"
                    : "text-white/40 cursor-not-allowed"
                }`}
                aria-label="Fechar formulário"
              >
                ×
              </button>

              <p className="pr-12 font-bebas text-[2rem] leading-[0.95] text-[#F5A205] sm:text-4xl md:text-5xl">
                {isSecondOpenOrMore
                  ? "Tem certeza que vai ficar de fora?"
                  : "Esse evento pode mudar seu nivel"}
              </p>
              <h3 className="mt-2 max-w-[560px] font-jamjuree text-sm leading-relaxed text-white/85 sm:mt-3 md:text-base">
                {isSecondOpenOrMore
                  ? "As vagas estão sendo preenchidas e você pode perder essa oportunidade"
                  : "Alguns detalhes do evento são exclusivos. Preencha para desbloquear agora"}
              </h3>

              <form onSubmit={handleLeadSubmit} className="mt-5 grid grid-cols-1 gap-3.5 sm:gap-4 md:mt-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-xs font-jamjuree uppercase tracking-[0.08em] text-white/70">
                    Nome completo
                  </label>
                  <input
                    className="w-full rounded-lg border border-white/20 bg-white/5 p-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#F5A205] focus:bg-white/10 sm:text-base"
                    type="text"
                    placeholder="Digite seu nome completo"
                    value={leadForm.name}
                    onChange={(e) => setLeadForm((prev) => ({ ...prev, name: e.target.value }))}
                    autoComplete="name"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-jamjuree uppercase tracking-[0.08em] text-white/70">
                    Contato (Whatsapp)
                  </label>
                  <input
                    className="w-full rounded-lg border border-white/20 bg-white/5 p-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#F5A205] focus:bg-white/10 sm:text-base"
                    type="text"
                    placeholder="(92) 99999-9999"
                    value={leadForm.whatsapp}
                    onChange={handleWhatsappMask}
                    autoComplete="tel"
                    inputMode="tel"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-jamjuree uppercase tracking-[0.08em] text-white/70">
                    E-mail
                  </label>
                  <input
                    className="w-full rounded-lg border border-white/20 bg-white/5 p-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#F5A205] focus:bg-white/10 sm:text-base"
                    type="email"
                    placeholder="voce@empresa.com"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm((prev) => ({ ...prev, email: e.target.value }))}
                    autoComplete="email"
                    required
                  />
                </div>

                {(leadStatus === "success" || leadStatus === "error") && (
                  <p className={`md:col-span-2 rounded-md px-3 py-2 text-sm ${leadStatus === "success" ? "bg-green-500/12 text-green-300" : "bg-red-500/12 text-red-300"}`}>
                    {leadMessage}
                  </p>
                )}

                <div className="mt-1 flex flex-col items-center gap-3 sm:flex-row sm:justify-between md:col-span-2">
                  <p className="text-center text-[11px] font-jamjuree uppercase tracking-[0.08em] text-white/45 sm:text-left">
                    Preenchimento rapido e seguro
                  </p>
                  <div className="self-center sm:self-auto">
                    <FormButton
                      titulo={
                        leadStatus === "loading"
                          ? "Enviando..."
                          : isSecondOpenOrMore
                            ? "Não quero ficar de fora"
                            : "Liberar acesso"
                      }
                      textColor="#000"
                      disabled={!canSubmitLead}
                      leftWidthClass={isSecondOpenOrMore ? "w-[190px] sm:w-[230px]" : "w-[120px] sm:w-[140px]"}
                    />
                  </div>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HomeTeste;
