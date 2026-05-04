import { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NewVendas from "./pages/NewVendas";
const PreserveUtmLinks = lazy(() => import("./components/PreserveUtmLinks"));
const RoutePageTracking = lazy(() => import("./components/RoutePageTracking"));

const HomeTeste = lazy(() => import("./pages/HomeTeste"));
const Palestrantes = lazy(() => import("./pages/Palestrantes"));
const Agradecimento = lazy(() => import("./pages/Agradecimento"));
const Patrocinadores = lazy(() => import("./pages/Patrocinadores"));
const WhatsappPage = lazy(() => import("./pages/WhatsappPage"));
const TesteAnimation = lazy(() => import("./pages/testeAnimation"));
const Checkout = lazy(() => import("./pages/Checkout"));
const NewVendasCopy = lazy(() => import("./pages/NewVendasCopy"));
const PreCheckout = lazy(() => import("./pages/PreCheckout"));
const Oshiro = lazy(() => import("./pages/Oshiro"));
const Vendas = lazy(() => import("./pages/Vendas"));
const LPAyla = lazy(() => import("./pages/LPAyla"));
const LPAyla2 = lazy(() => import("./pages/LPAyla2"));
const CalendarioPage = lazy(() => import("./pages/Calendario"));
const SpeakerLandingPage = lazy(
  () => import("./features/SpeakerLanding/SpeakerLandingPage"),
);

const App = () => {
  const [shouldLoadTracking, setShouldLoadTracking] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(
        () => setShouldLoadTracking(true),
        { timeout: 1200 },
      );
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(() => setShouldLoadTracking(true), 300);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo principal
      </a>
      {shouldLoadTracking ? (
        <Suspense fallback={null}>
          <PreserveUtmLinks />
          <RoutePageTracking />
        </Suspense>
      ) : null}
      <div id="main-content" tabIndex={-1}>
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
          <Routes>
            <Route path="/" element={<NewVendas />} />
            <Route path="/precheckout" element={<PreCheckout />} />
            <Route path="/oshiro" element={<Oshiro />} />

            <Route path="/lpayla" element={<LPAyla />} />
            <Route path="/lpayla2" element={<LPAyla2 />} />
            <Route path="/calendario" element={<CalendarioPage />} />
            <Route path="/lp/:slug" element={<SpeakerLandingPage />} />
            <Route path="/sobre" element={<HomeTeste />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
};

export default App;
