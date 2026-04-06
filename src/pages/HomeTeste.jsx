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
import ParceirosSection from "../components/ParceirosSection";
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

const LEAD_DONE_KEY = "lead_home_teste_done";
const LEAD_IDENTITY_KEY = "lead_home_teste_identity";
const PENDING_EVENTS_KEY = "lead_home_teste_pending_events";

const HomeTeste = () => {
  const [showTimerHeader, setShowTimerHeader] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [hasAutoPopupShown, setHasAutoPopupShown] = useState(false);
  const [hasClosedAutoPopup, setHasClosedAutoPopup] = useState(false);
  const [hasLeadConverted, setHasLeadConverted] = useState(false);
  const [leadModalOrigin, setLeadModalOrigin] = useState("auto");

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
  const pendingTrackingEventsRef = useRef([]);
  const hasLeadConvertedRef = useRef(false);
  const leadIdentityRef = useRef(null);
  const markSymplaFlagTrue = async () => {
    if (!isSupabaseConfigured || !supabase) return;
    const leadIdentity = leadIdentityRef.current;
    if (!leadIdentity?.email) return;

    const trackerState = window.DSXTracker?.getState?.() || {};
    const sessionId = trackerState.sessionId || null;
    const nowIso = new Date().toISOString();

    const { error: profileError } = await supabase
      .from("tracking_lead_profiles")
      .upsert(
        [
          {
            lead_email: leadIdentity.email,
            lead_name: leadIdentity.name || null,
            lead_phone: leadIdentity.phone || null,
            lead_cargo: leadIdentity.cargo || null,
            last_seen_at: nowIso,
            has_sympla_redirected: true,
            last_sympla_redirected_at: nowIso,
          },
        ],
        { onConflict: "lead_email" }
      );

    if (profileError) {
      console.error("[HomeTeste] erro ao marcar profile sympla=true", profileError);
    }

    if (!sessionId) return;

    const { error: sessionError } = await supabase
      .from("tracking_lead_sessions")
      .upsert(
        [
          {
            session_id: sessionId,
            lead_email: leadIdentity.email,
            lead_name: leadIdentity.name || null,
            lead_phone: leadIdentity.phone || null,
            lead_cargo: leadIdentity.cargo || null,
            page:
              sourceData.page_url ||
              window.location.pathname + window.location.search,
            referrer: document.referrer || null,
            utm_source: sourceData.utm_source || null,
            utm_medium: sourceData.utm_medium || null,
            utm_campaign: sourceData.utm_campaign || null,
            utm_content: sourceData.utm_content || null,
            utm_term: sourceData.utm_term || null,
            has_sympla_redirected: true,
            sympla_redirected_at: nowIso,
          },
        ],
        { onConflict: "session_id" }
      );

    if (sessionError) {
      console.error("[HomeTeste] erro ao marcar session sympla=true", sessionError);
    }
  };
  const dispatchJourneyEvent = (eventName, data = {}) => {
    try {
      const trackerState = window.DSXTracker?.getState?.() || {};
      const sessionId = trackerState.sessionId || null;
      const detail = {
        name: eventName,
        session_id: sessionId,
        at: new Date().toISOString(),
        page: window.location.pathname + window.location.search,
        data,
      };
      window.dispatchEvent(new CustomEvent("dsx:track", { detail }));
    } catch {
      // no-op
    }
  };

  const midnightToday = useMemo(() => {
    const date = new Date();
    date.setHours(24, 0, 0, 0);
    return date;
  }, []);

  useScrollToHash(90);

  useEffect(() => {
    try {
      const leadAlreadyCaptured = window.localStorage.getItem(LEAD_DONE_KEY);
      const leadIdentityRaw = window.localStorage.getItem(LEAD_IDENTITY_KEY);
      const pendingEventsRaw = window.sessionStorage.getItem(PENDING_EVENTS_KEY);

      if (leadAlreadyCaptured === "1") {
        setHasLeadConverted(true);
      }

      if (leadIdentityRaw) {
        const parsedIdentity = JSON.parse(leadIdentityRaw);
        if (parsedIdentity?.email) {
          leadIdentityRef.current = parsedIdentity;
        }
      }

      if (pendingEventsRaw) {
        const parsedEvents = JSON.parse(pendingEventsRaw);
        if (Array.isArray(parsedEvents)) {
          pendingTrackingEventsRef.current = parsedEvents;
        }
      }
    } catch {
      // no-op
    }
  }, []);

  useEffect(() => {
    hasLeadConvertedRef.current = hasLeadConverted;
  }, [hasLeadConverted]);

  const buildTrackingEventRow = (eventDetail, leadIdentity) => {
    const eventName = eventDetail?.name;
    const section = (() => {
      if (eventName === "section_completed") {
        return eventDetail?.data?.section || "__unknown_section__";
      }
      if (eventName === "all_sections_completed") return "__all__";
      if (eventName === "lead_form_submit") return "__form_submit__";
      if (eventName === "buy_button_clicked") return "__buy_clicked__";
      if (eventName === "sympla_redirected") return "__sympla_redirected__";
      return "__other__";
    })();

    return {
      session_id: eventDetail?.session_id || null,
      lead_email: leadIdentity?.email || null,
      event_name: eventName,
      section,
      occurred_at: eventDetail?.at || new Date().toISOString(),
      page: eventDetail?.page || window.location.pathname + window.location.search,
      payload: eventDetail?.data || {},
    };
  };

  const persistTrackingEvents = async (events, leadIdentity) => {
    if (!events?.length || !isSupabaseConfigured || !supabase || !leadIdentity) {
      return;
    }

    const sessionId = events[0]?.session_id || null;
    if (!sessionId) return;
    const hasSymplaRedirected = events.some(
      (eventDetail) =>
        eventDetail?.name === "sympla_redirected" ||
        eventDetail?.name === "buy_button_clicked"
    );
    const nowIso = new Date().toISOString();

    const sessionPayload = {
      session_id: sessionId,
      lead_name: leadIdentity.name || null,
      lead_email: leadIdentity.email || null,
      lead_phone: leadIdentity.phone || null,
      lead_cargo: leadIdentity.cargo || null,
      page: sourceData.page_url || window.location.pathname + window.location.search,
      referrer: document.referrer || null,
      utm_source: sourceData.utm_source || null,
      utm_medium: sourceData.utm_medium || null,
      utm_campaign: sourceData.utm_campaign || null,
      utm_content: sourceData.utm_content || null,
      utm_term: sourceData.utm_term || null,
      converted_at: nowIso,
      has_sympla_redirected: hasSymplaRedirected,
      sympla_redirected_at: hasSymplaRedirected ? nowIso : null,
    };

    const profilePayload = {
      lead_email: leadIdentity.email || null,
      lead_name: leadIdentity.name || null,
      lead_phone: leadIdentity.phone || null,
      lead_cargo: leadIdentity.cargo || null,
      first_converted_at: nowIso,
      last_seen_at: nowIso,
      has_sympla_redirected: hasSymplaRedirected,
      last_sympla_redirected_at: hasSymplaRedirected ? nowIso : null,
    };

    const rows = events
      .filter(
        (eventDetail) =>
          eventDetail?.name === "section_completed" ||
          eventDetail?.name === "all_sections_completed" ||
          eventDetail?.name === "lead_form_submit" ||
          eventDetail?.name === "buy_button_clicked" ||
          eventDetail?.name === "sympla_redirected"
      )
      .map((eventDetail) => buildTrackingEventRow(eventDetail, leadIdentity));

    if (!rows.length) return;

    const { error: profileError } = await supabase
      .from("tracking_lead_profiles")
      .upsert([profilePayload], { onConflict: "lead_email" });

    if (profileError) {
      console.error("[HomeTeste] erro ao salvar tracking_lead_profiles", profileError);
      return;
    }

    const { error: sessionError } = await supabase
      .from("tracking_lead_sessions")
      .upsert([sessionPayload], { onConflict: "session_id" });

    if (sessionError) {
      console.error("[HomeTeste] erro ao salvar tracking_lead_sessions", sessionError);
      return;
    }

    const { error: eventsError } = await supabase
      .from("tracking_lead_section_events")
      .upsert(rows, { onConflict: "session_id,event_name,section" });

    if (eventsError) {
      console.error(
        "[HomeTeste] erro ao salvar tracking_lead_section_events",
        eventsError
      );
      return;
    }

    pendingTrackingEventsRef.current = [];
    try {
      window.sessionStorage.removeItem(PENDING_EVENTS_KEY);
    } catch {
      // no-op
    }
  };

  useEffect(() => {
    const onTrackEvent = (event) => {
      const detail = event?.detail || {};
      const eventName = detail?.name;

      if (
        eventName !== "section_completed" &&
        eventName !== "all_sections_completed" &&
        eventName !== "lead_form_submit" &&
        eventName !== "buy_button_clicked" &&
        eventName !== "sympla_redirected"
      ) {
        return;
      }

      // Dedup local por sessao + evento + secao/chave.
      const sectionToken =
        eventName === "section_completed"
          ? detail?.data?.section || "no-section"
          : eventName === "all_sections_completed"
            ? "__all__"
            : eventName === "buy_button_clicked"
              ? "__buy__"
              : eventName === "sympla_redirected"
                ? "__redirect__"
                : "__form__";

      const dedupKey = [
        detail?.session_id || "no-session",
        eventName,
        sectionToken,
      ].join("|");

      const alreadyQueued = pendingTrackingEventsRef.current.some(
        (item) => item.__dedupKey === dedupKey
      );
      if (alreadyQueued) return;

      const enriched = { ...detail, __dedupKey: dedupKey };
      pendingTrackingEventsRef.current.push(enriched);
      try {
        window.sessionStorage.setItem(
          PENDING_EVENTS_KEY,
          JSON.stringify(pendingTrackingEventsRef.current)
        );
      } catch {
        // no-op
      }

      if (hasLeadConvertedRef.current && leadIdentityRef.current) {
        void persistTrackingEvents(
          pendingTrackingEventsRef.current,
          leadIdentityRef.current
        );
      }
    };

    window.addEventListener("dsx:track", onTrackEvent);
    return () => window.removeEventListener("dsx:track", onTrackEvent);
  }, [sourceData]);

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
    if (hasAutoPopupShown) return undefined;

    const onScroll = () => {
      if (hasAutoPopupShown) return;
      const totalHeight = document.documentElement.scrollHeight || 0;
      const triggerPoint = totalHeight * 0.5;
      const viewportBottom = window.scrollY + window.innerHeight;

      if (viewportBottom < triggerPoint) return;

      setHasAutoPopupShown(true);
      setLeadModalOrigin("auto");
      setShowLeadModal(true);
      window.removeEventListener("scroll", onScroll);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [hasAutoPopupShown]);

  const errors = useMemo(() => {
    const currentErrors = {};

    if (!leadForm.name.trim()) {
      currentErrors.name = "Informe seu nome completo.";
    }
    if (!isValidEmail(leadForm.email)) {
      currentErrors.email = "Informe um e-mail válido.";
    }

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
    else if (value.length <= 6)
      value = value.replace(/^(\d{2})(\d{0,4})/, "($1) $2");
    else if (value.length <= 10)
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    else value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");

    setLeadForm((prev) => ({ ...prev, phone: value }));
  };

  const closeLeadModal = () => {
    if (loading) return;
    if (leadModalOrigin === "auto" && !hasLeadConvertedRef.current) {
      setHasClosedAutoPopup(true);
    }

    setShowLeadModal(false);
  };

  const handleBuyPassaporte = (targetLink) => {
    if (!targetLink) return;

    dispatchJourneyEvent("buy_button_clicked", {
      target_link: targetLink,
    });

    if (hasLeadConvertedRef.current && leadIdentityRef.current) {
      void markSymplaFlagTrue();
    }

    if (hasLeadConverted) {
      dispatchJourneyEvent("sympla_redirected", {
        target_link: targetLink,
      });
      window.open(targetLink, "_blank");
      return;
    }

    if (!hasClosedAutoPopup) {
      setLeadStatus("error");
      setMensagem(
        "Feche o primeiro formulário da página para desbloquear a compra."
      );
      return;
    }

    setPendingPurchaseLink(targetLink);
    setLeadStatus("idle");
    setMensagem("Para continuar com a compra, preencha e envie o formulário.");
    setLeadModalOrigin("checkout");
    setShowLeadModal(true);
  };

  const redirectToPendingPurchase = () => {
    if (!pendingPurchaseLink) return;
    const targetLink = pendingPurchaseLink;
    setPendingPurchaseLink("");
    dispatchJourneyEvent("sympla_redirected", {
      target_link: targetLink,
    });
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

      const rdResult = await fetch(
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

      if (!rdResult.ok) {
        throw new Error("Erro ao enviar para RD Station");
      }

      const leadIdentity = { name, email, phone, cargo };
      leadIdentityRef.current = leadIdentity;
      window.localStorage.setItem(LEAD_IDENTITY_KEY, JSON.stringify(leadIdentity));
      await persistTrackingEvents(pendingTrackingEventsRef.current, leadIdentity);

      setLeadStatus("success");
      setHasLeadConverted(true);
      window.localStorage.setItem(LEAD_DONE_KEY, "1");
      const successText = "Cadastro enviado! Em breve entraremos em contato.";
      setMensagem(successText);
      setLeadForm({ name: "", phone: "", email: "", cargo: "" });
      e.target.reset();
      setTimeout(() => {
        setShowLeadModal(false);
        redirectToPendingPurchase();
      }, 1200);
    } catch (_error) {
      setLeadStatus("error");
      const errorText =
        _error?.message || "Erro ao enviar formulário. Tente novamente.";
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
      <div data-section="depoimentos">
        <Depoimentos ctaLink="#passaportes" />
      </div>
      <div data-section="publico">
        <PublicoDSX />
      </div>
      <div data-section="banner">
        <BannerSection />
      </div>
      <div data-section="parceiros">
        <ParceirosSection />
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
      <div className="h-px w-full" data-section="footer-trigger" />
      <div data-section="footer">
        <Footer />
      </div>
      <LeadPopupFormHomeTeste
        isOpen={showLeadModal}
        popupStep={1}
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
