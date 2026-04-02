import { useEffect, useMemo, useRef, useState } from "react";
import useScrollToHash from "../hooks/useScrollToHash";
import { isSupabaseConfigured, supabase } from "../lib/supabaseClient";

import SlideNovosPalestrantes from "../components/SlideNovosPalestrantes";
import ContentSection from "../components/ContentSection";
import FaleConosco from "../components/FaleConosco";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import NewTimerHeaderHomeTeste from "../components/HomeTesteComponentes/NewTimerHeaderHomeTeste";
import SlidePalestrantes from "../components/SlidePalestrantes";
import HeroSectionV2 from "../components/HeroSectionV2";
import SlideFaixa from "../components/SlideFaixa";
import Depoimentos from "../components/Depoimentos";
import PublicoDSX from "../components/PublicoDSX";
import FAQ from "../components/FAQ";
import BannerSection from "../components/BannerSection";
import BotaoWPFooter from "../components/BotaoWPFooter";
import PassaporteVendasHomeTeste from "../components/HomeTesteComponentes/PassaporteVendasHomeTeste";
import PassaportesMobileHomeTeste from "../components/HomeTesteComponentes/PassaportesMobileHomeTeste";
import PassaporteGrupoHomeTeste from "../components/HomeTesteComponentes/PassaporteGrupoHomeTeste";
import LeadPopupFormHomeTeste from "../components/HomeTesteComponentes/LeadPopupFormHomeTeste";

function onlyDigits(value = "") {
  return value.replace(/\D/g, "");
}

function isValidEmail(email = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

const HomeTeste = () => {
  const [showTimerHeader, setShowTimerHeader] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [popupStep, setPopupStep] = useState(0); // 1: metade secao apos slide | 2: +10s | 3: footer
  const [hasClosedFirstPopup, setHasClosedFirstPopup] = useState(false);
  const [hasShownSecondPopup, setHasShownSecondPopup] = useState(false);
  const [hasClosedSecondPopup, setHasClosedSecondPopup] = useState(false);
  const [isFooterInView, setIsFooterInView] = useState(false);
  const [waitForFooterAfterSecondClose, setWaitForFooterAfterSecondClose] = useState(false);
  const [mustExitFooterBeforeThird, setMustExitFooterBeforeThird] = useState(false);
  const [hasLeadConverted, setHasLeadConverted] = useState(false);
  const postSpeakersSectionRef = useRef(null);
  const footerTriggerRef = useRef(null);
  const reopenModalTimeoutRef = useRef(null);

  const [leadForm, setLeadForm] = useState({
    name: "",
    phone: "",
    email: "",
    cargo: "",
  });
  const [sourceData, setSourceData] = useState({
    page_url: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
  });
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [leadStatus, setLeadStatus] = useState("idle");
  const [isMobile, setIsMobile] = useState(false);
  const [pendingPurchaseLink, setPendingPurchaseLink] = useState("");

  const midnightToday = useMemo(() => {
    const date = new Date();
    date.setHours(24, 0, 0, 0);
    return date;
  }, []);

  // Garante scroll ao chegar com /#form, /#faleconosco etc.
  useScrollToHash(90); // 90px = altura do header (ajuste)

  useEffect(() => {
    const leadAlreadyCaptured = window.localStorage.getItem("lead_home_teste_done");
    if (leadAlreadyCaptured === "1") {
      setHasLeadConverted(true);
    }
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
    const onScroll = () => setShowTimerHeader(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
    if (hasLeadConverted || popupStep > 0 || !postSpeakersSectionRef.current) return undefined;

    const onScroll = () => {
      if (!postSpeakersSectionRef.current || hasLeadConverted || popupStep > 0) return;

      const sectionTop = postSpeakersSectionRef.current.offsetTop;
      const sectionHeight = postSpeakersSectionRef.current.offsetHeight;
      const triggerPoint = sectionTop + sectionHeight / 2;
      const viewportBottom = window.scrollY + window.innerHeight;

      if (viewportBottom < triggerPoint) return;

      setPopupStep(1);
      setShowLeadModal(true);
      window.removeEventListener("scroll", onScroll);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
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
    if (!leadForm.cargo) {
      currentErrors.cargo = "Selecione seu perfil.";
    }

    return currentErrors;
  }, [leadForm]);

  const isLeadFormValid = Object.keys(errors).length === 0;
  const canSubmitLead = !loading;
  const canCloseLeadModal = !loading;

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

  const handleBuyPassaporte = (targetLink) => {
    if (!targetLink) return;

    if (hasLeadConverted) {
      window.open(targetLink, "_blank");
      return;
    }

    setPendingPurchaseLink(targetLink);
    setLeadStatus("idle");
    setMensagem("Para continuar com a compra, preencha e envie o formulário.");
    if (popupStep === 0) setPopupStep(1);
    setShowLeadModal(true);
  };

  const redirectToPendingPurchase = () => {
    if (!pendingPurchaseLink) return;
    const targetLink = pendingPurchaseLink;
    setPendingPurchaseLink("");
    window.location.href = targetLink;
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
      const name = formData.get("name")?.toString().trim() || "";
      const email = formData.get("email")?.toString().trim().toLowerCase() || "";
      const phone = formData.get("phone")?.toString().trim() || "";
      const cargo = formData.get("cargo")?.toString().trim() || "";
      const nowIso = new Date().toISOString();

      const payload = {
        event_type: "CONVERSION",
        event_family: "CDP",
        payload: {
          conversion_identifier: "LP - DSX 2026",
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
        },
        tags: ["dsx-hometeste", "popup"],
        source: "landing-home-teste",
      };

      if (!isSupabaseConfigured || !supabase) {
        throw new Error("Supabase não configurado");
      }

      const [rdResult, supabaseResult] = await Promise.allSettled([
        fetch("https://api.rd.services/platform/conversions?api_key=MHnWDjBYARQKdwUsfZRbjtVmPEyoHnSqtgFz", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }),
        supabase.from("leads").upsert(
          [
            {
              name,
              email,
              phone,
              cargo: [cargo],
              stage: "cadastro",
              status: "novo",
              last_seen: nowIso,
            },
          ],
          { onConflict: "email" }
        ),
      ]);

      if (rdResult.status !== "fulfilled" || !rdResult.value.ok) {
        throw new Error("Erro ao enviar para RD Station");
      }

      if (
        supabaseResult.status !== "fulfilled" ||
        supabaseResult.value.error
      ) {
        throw new Error("Erro ao salvar no Supabase");
      }

      setLeadStatus("success");
      setHasLeadConverted(true);
      window.localStorage.setItem("lead_home_teste_done", "1");
      const successText = "Cadastro enviado! Em breve entraremos em contato.";
      setMensagem(successText);
      setLeadForm({ name: "", phone: "", email: "", cargo: "" });
      e.target.reset();
      if (reopenModalTimeoutRef.current) {
        clearTimeout(reopenModalTimeoutRef.current);
      }
      setTimeout(() => {
        setShowLeadModal(false);
        redirectToPendingPurchase();
      }, 1200);
    } catch (_error) {
      setLeadStatus("error");
      const errorText = _error?.message || "Erro ao enviar formulário. Tente novamente.";
      console.error("[HomeTeste] erro no envio", _error);
      setMensagem(errorText);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="home" className="bg-black pb-43 md:pb-18 overflow-x-hidden">
      <div data-section="hero">
        <HeroSection ctaLink="#passaportes" />
      </div>
      <div data-section="destaques">
        <HeroSectionV2 />
      </div>
      <div data-section="faixa">
        <SlideFaixa />
      </div>
      <div data-section="novos-palestrantes">
        <SlideNovosPalestrantes ctaLink="#passaportes" />
      </div>
      <NewTimerHeaderHomeTeste
        isVisible={showTimerHeader}
        headerText="3º lote disponível:"
        ctaTitle="Garanta seu passaporte"
        targetDate={midnightToday}
      />

      <div data-section="conteudo">
        <ContentSection />
      </div>
      <div data-section="palestrantes">
        <SlidePalestrantes />
      </div>
      <div ref={postSpeakersSectionRef} data-section="depoimentos">
        <Depoimentos ctaLink="#passaportes" />
      </div>
      <div data-section="publico">
        <PublicoDSX />
      </div>
      <div data-section="banner">
        <BannerSection />
      </div>
      <div
        id="passaportes"
        data-section="passaportes"
        className="bg-[url(/ELEMENTOS-BANNER-2.png)] bg-cover bg-no-repeat bg-center"
      >
        {isMobile ? (
          <PassaportesMobileHomeTeste onBuyPassaporte={handleBuyPassaporte} />
        ) : (
          <PassaporteVendasHomeTeste onBuyPassaporte={handleBuyPassaporte} />
        )}
      </div>
      <div data-section="grupo">
        <PassaporteGrupoHomeTeste onBuyPassaporte={handleBuyPassaporte} />
      </div>
      <div data-section="fale-conosco">
        <FaleConosco />
      </div>
      <div data-section="faq">
        <FAQ />
      </div>
      <BotaoWPFooter />
      <div ref={footerTriggerRef} className="h-px w-full" data-section="footer-trigger" />
      <div data-section="footer">
        <Footer />
      </div>
      <LeadPopupFormHomeTeste
        isOpen={showLeadModal}
        popupStep={popupStep}
        canClose={canCloseLeadModal}
        onClose={closeLeadModal}
        onSubmit={handleLeadSubmit}
        leadForm={leadForm}
        setLeadForm={setLeadForm}
        onWhatsappChange={handleWhatsappMask}
        leadStatus={leadStatus}
        message={mensagem}
        loading={loading}
        canSubmit={canSubmitLead}
      />
    </section>
  );
};

export default HomeTeste;
