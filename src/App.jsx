import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Palestrantes from "./pages/Palestrantes";
import Agradecimento from "./pages/Agradecimento";
import ScrollToTop from "./components/ScrollToTop";
import Patrocinadores from "./pages/Patrocinadores";

const App = () => {
  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/palestrantes" element={<Palestrantes />} />
      <Route path="/agradecimento" element={<Agradecimento />} />
      <Route path="/patrocinador" element={<Patrocinadores />} />
    </Routes>

  );
};

export default App;
