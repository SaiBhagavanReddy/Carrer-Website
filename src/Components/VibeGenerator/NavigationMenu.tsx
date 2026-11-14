import { Link, useNavigate } from "react-router-dom";
import "../VibeGenerator/Vibe.css";
import { Sparkles } from "lucide-react";
import "../VibeGenerator/Vibe.css";
import { useContext } from "react";
import { Store } from "./Sub-components/ContextApi";
const NavigationMenu = () => {
  const nav = useNavigate();
  const {setuserData} = useContext(Store)
  return (
    <div className="VibeNav">
      <div  className="header-with-icon">
        <header>
          <Sparkles />
          <h3>
            Vibe Me
          </h3>
        </header>
      </div>
      <nav className="links-with-btn">
        <Link to="/" onClick={()=>setuserData({setuserData:[]})}>Home</Link>
        <Link to="/features">Features</Link>
        <Link to="/About">About</Link>
      <div>
        <button onClick={()=>nav("/StartVibe")}>
            Get Started 
        </button>
      </div>
      </nav>
    </div>
  );
};
export default NavigationMenu;
