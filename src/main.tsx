import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import Index from "./Components/Blood_Donation_Website/Components/Index";
// import VibeLandPage from "./Components/VibeGenerator/VibeLandPage";
// import VibeApp from "./Components/VibeGenerator/VibeApp";
import CarrerWebsite from "./Components/CarrerWebsite/CarrerWebsite";
import Tesesupabase from "./Components/CarrerWebsite/supabaseClient/Testsupabase";
// import TestPage from "./Components/TailwindCss/TestPage";
// import UseMemoSample from "./Components/Hooks/useMemo/UseMemoSample";
// import TodoApp from "../src/Components/TodoListComponent/TodoApp";
// import Accordain from "../src/Components/Accordain/Accordain "
// import MenuTab from "../src/Components/Tabs/MenuTab"
// import "../src/index.css"
//import StudentProfile from "./Components/Practices/SideBar/StudentProfile";
// import Index from "./Components/Practices/SideBar/Index";
createRoot(document.getElementById("root")!).render(
  
    <StrictMode>
      <CarrerWebsite />
    </StrictMode>
);
