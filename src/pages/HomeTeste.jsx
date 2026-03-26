import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useScrollToHash from "../hooks/useScrollToHash";
import { FormButton } from "../components/FormSection";
import { smoothEase } from "../utils/motion";
import { supabase } from "../lib/supabaseClient";

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

const HomeTeste = () => {
  const [showTimerHeader, setShowTimerHeader] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [popupStep, setPopupStep] = useState(0); // 1: apos slide | 2: +10s | 3: footer (obrigatorio)
  const [hasClosedFirstPopup, setHasClosedFirstPopup] = useState(false);
  const [hasShownSecondPopup, setHasShownSecondPopup] = useState(false);
  const [hasClosedSecondPopup, setHasClosedSecondPopup] = useState(false);
  const [isFooterInView, setIsFooterInView] = useState(false);
  const [waitForFooterAfterSecondClose, setWaitForFooterAfterSecondClose] = useState(false);
  const [mustExitFooterBeforeThird, setMustExitFooterBeforeThird] = useState(false);
  const [hasLeadConverted, setHasLeadConverted] = useState(false);
  const firstSpeakersSectionEndRef = useRef(null);
  const footerTriggerRef = useRef(null);
  const reopenModalTimeoutRef = useRef(null);

  const [leadForm, setLeadForm] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [leadStatus, setLeadStatus] = useState("idle");

  // ✅ garante scroll ao chegar com /#form, /#faleconosco etc.
  useScrollToHash(90); // 90px = altura do header (ajuste)

  useEffect(() => {
    const leadAlreadyCaptured = window.localStorage.getItem("lead_home_teste_done");
    if (leadAlreadyCaptured === "1") {
      setHasLeadConverted(true);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTimerHeader(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
    if (hasLeadConverted || popupStep > 0 || !firstSpeakersSectionEndRef.current) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;

        setPopupStep(1);
        setShowLeadModal(true);
        observer.disconnect();
      },
      { threshold: 0 }
    );

    observer.observe(firstSpeakersSectionEndRef.current);

    return () => observer.disconnect();
  }, [hasLeadConverted, popupStep]);

  useEffect(() => {
    if (!hasClosedFirstPopup || hasLeadConverted || popupStep >= 2) return undefined;

    reopenModalTimeoutRef.current = setTimeout(() => {
      if (hasLeadConverted) return;
      setPopupStep(2);
      setHasShownSecondPopup(true);
      setLeadStatus("idle");
      setMensagem("");
      setShowLeadModal(true);
    }, 10000);

    return () => {
      if (reopenModalTimeoutRef.current) {
        clearTimeout(reopenModalTimeoutRef.current);
      }
    };
  }, [hasClosedFirstPopup, hasLeadConverted, popupStep]);

  useEffect(() => {
    if (!footerTriggerRef.current) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsFooterInView(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.05 }
    );

    observer.observe(footerTriggerRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (
      !waitForFooterAfterSecondClose ||
      hasLeadConverted ||
      popupStep >= 3 ||
      !hasShownSecondPopup ||
      !hasClosedSecondPopup ||
      showLeadModal
    ) {
      return;
    }

    if (mustExitFooterBeforeThird) {
      if (!isFooterInView) setMustExitFooterBeforeThird(false);
      return;
    }

    if (!isFooterInView) return;

    setPopupStep(3);
    setLeadStatus("idle");
    setMensagem("");
    setShowLeadModal(true);
    setWaitForFooterAfterSecondClose(false);
  }, [
    hasClosedSecondPopup,
    hasLeadConverted,
    hasShownSecondPopup,
    isFooterInView,
    mustExitFooterBeforeThird,
    popupStep,
    showLeadModal,
    waitForFooterAfterSecondClose,
  ]);

  const errors = useMemo(() => {
    const currentErrors = {};

    if (!leadForm.name.trim()) currentErrors.name = "Informe seu nome completo.";
    if (!isValidEmail(leadForm.email)) currentErrors.email = "Informe um e-mail válido.";

    const phone = onlyDigits(leadForm.phone);
    if (!(phone.length === 10 || phone.length === 11)) {
      currentErrors.phone = "Informe um WhatsApp com DDD.";
    }

    return currentErrors;
  }, [leadForm]);

  const isLeadFormValid = Object.keys(errors).length === 0;
  const canSubmitLead = !loading;
  const isFinalMandatoryPopup = popupStep === 3 && leadStatus !== "success";
  const canCloseLeadModal = !loading && !isFinalMandatoryPopup;
  const isSecondOpenOrMore = popupStep >= 2 && leadStatus !== "success";

  const handleWhatsappMask = (e) => {
    let value = e.target.value;
    value = onlyDigits(value).slice(0, 11);

    if (!value.length) {
      setLeadForm((prev) => ({ ...prev, phone: "" }));
      return;
    }

    if (value.length <= 2) value = `(${value}`;
    else if (value.length <= 6) value = value.replace(/^(\d{2})(\d{0,4})/, "($1) $2");
    else if (value.length <= 10) value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    else value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");

    setLeadForm((prev) => ({ ...prev, phone: value }));
  };

  const closeLeadModal = () => {
    if (loading) return;
    if (isFinalMandatoryPopup) {
      setLeadStatus("error");
      setMensagem("Para continuar, preencha e envie o formulário.");
      return;
    }

    setShowLeadModal(false);

    if (leadStatus === "success") {
      if (reopenModalTimeoutRef.current) {
        clearTimeout(reopenModalTimeoutRef.current);
      }
      return;
    }

    if (popupStep === 1) setHasClosedFirstPopup(true);
    if (popupStep === 2) {
      setHasClosedSecondPopup(true);
      setWaitForFooterAfterSecondClose(true);
      setMustExitFooterBeforeThird(isFooterInView);
    }
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");

    if (!isLeadFormValid || !canSubmitLead) {
      setLeadStatus("error");
      setMensagem("Revise os campos e tente novamente.");
      return;
    }

    setLoading(true);
    setLeadStatus("loading");

    try {
      const formData = new FormData(e.target);
      const payload = {
        name: formData.get("name")?.toString().trim() || "",
        email: formData.get("email")?.toString().trim().toLowerCase() || "",
        phone:
          formData.get("phone")?.toString().trim() || "",
      };

      const { error } = await supabase
        .from("leads")
        .insert([payload]);

      if (error) {
        setLeadStatus("error");
        const isDuplicateEmail =
          error.code === "23505" ||
          (error.message && error.message.toLowerCase().includes("leads_email_key")) ||
          (error.message && error.message.toLowerCase().includes("duplicate key"));

        if (isDuplicateEmail) {
          const duplicateText = "Este e-mail já está cadastrado. Vamos seguir com seu acesso.";
          setMensagem(duplicateText);
          setLeadStatus("success");
          setHasLeadConverted(true);
          window.localStorage.setItem("lead_home_teste_done", "1");
          if (reopenModalTimeoutRef.current) {
            clearTimeout(reopenModalTimeoutRef.current);
          }
          setTimeout(() => {
            setShowLeadModal(false);
          }, 900);
          return;
        }

        setMensagem(error.message || "Não foi possível enviar. Tente novamente.");
        return;
      }

      setLeadStatus("success");
      setHasLeadConverted(true);
      window.localStorage.setItem("lead_home_teste_done", "1");
      const successText = "Cadastro enviado! Em breve entraremos em contato.";
      setMensagem(successText);
      setLeadForm({ name: "", phone: "", email: "" });
      e.target.reset();
      if (reopenModalTimeoutRef.current) {
        clearTimeout(reopenModalTimeoutRef.current);
      }
      setTimeout(() => {
        setShowLeadModal(false);
      }, 1200);
    } catch (error) {
      setLeadStatus("error");
      setMensagem("Falha de rede. Verifique sua conexão e tente novamente.");
    } finally {
      setLoading(false);
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
      <div ref={footerTriggerRef} className="h-px w-full" />
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
                    name="name"
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
                    name="phone"
                    placeholder="(92) 99999-9999"
                    value={leadForm.phone}
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
                    name="email"
                    placeholder="voce@empresa.com"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm((prev) => ({ ...prev, email: e.target.value }))}
                    autoComplete="email"
                    required
                  />
                </div>

                {(leadStatus === "success" || leadStatus === "error") && (
                  <p className={`md:col-span-2 rounded-md px-3 py-2 text-sm ${leadStatus === "success" ? "bg-green-500/12 text-green-300" : "bg-red-500/12 text-red-300"}`}>
                    {mensagem}
                  </p>
                )}

                <div className="mt-1 flex flex-col items-center gap-3 sm:flex-row sm:justify-between md:col-span-2">
                  <p className="text-center text-[11px] font-jamjuree uppercase tracking-[0.08em] text-white/45 sm:text-left">
                    Preenchimento rapido e seguro
                  </p>
                  <div className="self-center sm:self-auto">
                    <FormButton
                      titulo={
                        loading
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
