import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Palestrantes from "./pages/Palestrantes";
import Agradecimento from "./pages/Agradecimento";
import ScrollToTop from "./components/ScrollToTop";
import Patrocinadores from "./pages/Patrocinadores";
import Vendas from "./pages/Vendas";
import WhatsappPage from "./pages/WhatsappPage";
import PreserveUtmLinks from "./components/PreserveUtmLinks";
import TesteAnimation from "./pages/testeAnimation";
import Checkout from "./pages/Checkout";
import Vendas2 from "./pages/Vendas2";

const App = () => {
  return (
    <>
      <PreserveUtmLinks />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/palestrantes" element={<Palestrantes />} />
        <Route path="/agradecimento" element={<Agradecimento />} />
        <Route path="/patrocinador" element={<Patrocinadores />} />
        <Route path="/vendas" element={<Vendas />} />
        <Route path="/passaportes" element={<Vendas2 />} />
        <Route path="/whatsapp" element={<WhatsappPage />} />
        <Route path="/testeanimation" element={<TesteAnimation />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
};

export default App;
