import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Palestrantes from "./pages/Palestrantes";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/palestrantes" element={<Palestrantes />} />
    </Routes>
  );
};

export default App;
