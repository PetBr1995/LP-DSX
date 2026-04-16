import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PreserveUtmLinks from "./components/PreserveUtmLinks";
import RoutePageTracking from "./components/RoutePageTracking";
import Vendas2 from "./pages/Vendas2";
import Vendas from "./pages/Vendas";

const HomeTeste = lazy(() => import("./pages/HomeTeste"));
const Palestrantes = lazy(() => import("./pages/Palestrantes"));
const Agradecimento = lazy(() => import("./pages/Agradecimento"));
const Patrocinadores = lazy(() => import("./pages/Patrocinadores"));
const WhatsappPage = lazy(() => import("./pages/WhatsappPage"));
const TesteAnimation = lazy(() => import("./pages/testeAnimation"));
const Checkout = lazy(() => import("./pages/Checkout"));
const NewVendas = lazy(() => import("./pages/NewVendas"));
const NewVendasCopy = lazy(() => import("./pages/NewVendasCopy"));
const PreCheckout = lazy(() => import("./pages/PreCheckout"));
const SpeakerLandingPage = lazy(() =>
  import("./features/SpeakerLanding/SpeakerLandingPage"),
);

const App = () => {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo principal
      </a>
      <PreserveUtmLinks />
      <RoutePageTracking />
      <div id="main-content" tabIndex={-1}>
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
          <Routes>
            <Route path="/" element={<HomeTeste />} />
            <Route path="/palestrantes" element={<Palestrantes />} />
            <Route path="/agradecimento" element={<Agradecimento />} />
            <Route path="/patrocinador" element={<Patrocinadores />} />
            <Route path="/whatsapp" element={<WhatsappPage />} />
            <Route path="/testeanimation" element={<TesteAnimation />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/precheckout" element={<PreCheckout />} />
            <Route path="/checkoutvendas" element={<Navigate to="/precheckout" replace />} />
            <Route path="/checkoutVendas" element={<Navigate to="/precheckout" replace />} />
            <Route path="/vendas" element={<NewVendas />} />
            <Route path="/newvendas-copy" element={<NewVendasCopy />} />
            <Route
              path="/lp/segmento/:slug"
              element={<SpeakerLandingPage />}
            />
            <Route
              path="/lp/:slug"
              element={<SpeakerLandingPage />}
            />
            <Route path="/sobre" element={<Navigate to="/" replace />} />
            <Route path="/teste" element={<Vendas/>} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
};

export default App;
