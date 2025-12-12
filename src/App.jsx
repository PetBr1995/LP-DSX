import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Palestrantes from "./pages/Palestrantes";
import Agradecimento from "./pages/Agradecimento";

const App = () => {
  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/palestrantes" element={<Palestrantes />} />
      <Route path="/agradecimento" element={<Agradecimento />} />
    </Routes>

  );
};

export default App;
