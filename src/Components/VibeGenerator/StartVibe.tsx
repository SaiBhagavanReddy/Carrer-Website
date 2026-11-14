import NavigationMenu from "./NavigationMenu";
import { Utensils, Palette, Clapperboard, MapPin, Music } from "lucide-react";
import TemplateSelection from "./Sub-components/TemplateForselection";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StartVibe = () => {
  const nav = useNavigate();
  const steps = [
    { title: "Food", icon: Utensils },
    { title: "Colour", icon: Palette },
    { title: "Movie", icon: Clapperboard },
    { title: "Destination", icon: MapPin },
    { title: "Song", icon: Music },
  ];

  const [vibeSwitch, setvibeSwitch] = useState("Food");

  const currentIndex = steps.findIndex((step) => step.title === vibeSwitch);

  const Back = () => {
    if (currentIndex > 0) {
      setvibeSwitch(steps[currentIndex - 1].title);
    }
  };

  const Forward = () => {
    if (currentIndex < steps.length - 1) {
      setvibeSwitch(steps[currentIndex + 1].title);
    }
  };

  return (
    <div className="VibeMain">
      <NavigationMenu />

      <div className="Content-section">
        <main>
          <div className="icon-navigation">
            {steps.map(({ title, icon: Icon }) => (
              <div
                key={title}
                onClick={() => setvibeSwitch(title)}
                style={{ cursor: "pointer" }}
              >
                <Icon size={24} strokeWidth={2.8} />
                <div>{title}</div>
              </div>
            ))}
          </div>

          <TemplateSelection vibeSwitch={vibeSwitch} />

          <div className="nav-btn">
            <button onClick={Back} disabled={currentIndex === 0}>
              Back
            </button>

            {currentIndex === 4 ? (
              <div className="generate-btn">
              <button onClick={()=>
                {
                  localStorage.setItem("AllowUserVibe","true");
                  nav("/VibeResult")
                }
                }>✨ Generate My Vibe</button>
              </div>
            ) : (
              <button onClick={Forward}>Next</button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StartVibe;
