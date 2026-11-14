import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../VibeGenerator/VibeLandPage";
import Features from "../VibeGenerator/features.tsx";
import About from "../VibeGenerator/About";
import StartVibe from "../VibeGenerator/StartVibe"
import ContextApiForStoring from "../VibeGenerator/Sub-components/ContextApi"
import VibeResult from "./VibeResult";
import ProtectedRouter from "./Sub-components/ProtectedRouter";
const VibeApp = () => {
  return (
    <>
    <ContextApiForStoring>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/About" element={<About/>}/>
        <Route path="/StartVibe" element={<StartVibe/>}/>
        <Route path="/VibeResult" element=
        {
          <ProtectedRouter>
            <VibeResult/>
          </ProtectedRouter>
      }
        />
      </Routes>
    </BrowserRouter>
    </ContextApiForStoring>
    </>
  );
};

export default VibeApp;