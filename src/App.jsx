import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PreserveUtmLinks from "./components/PreserveUtmLinks";

const HomeTeste = lazy(() => import("./pages/HomeTeste"));
const Palestrantes = lazy(() => import("./pages/Palestrantes"));
const Agradecimento = lazy(() => import("./pages/Agradecimento"));
const Patrocinadores = lazy(() => import("./pages/Patrocinadores"));
const WhatsappPage = lazy(() => import("./pages/WhatsappPage"));
const TesteAnimation = lazy(() => import("./pages/testeAnimation"));
const Checkout = lazy(() => import("./pages/Checkout"));
const NewVendas = lazy(() => import("./pages/NewVendas"));

const App = () => {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo principal
      </a>
      <PreserveUtmLinks />
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
            <Route path="/newvendas" element={<NewVendas />} />
            <Route path="/sobre" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
};

export default App;
