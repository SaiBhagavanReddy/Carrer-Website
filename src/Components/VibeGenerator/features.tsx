import "../VibeGenerator/Vibe.css";
import { WandSparkles } from "lucide-react";

import NavigationMenu from "./NavigationMenu";
const Features = () => {
  return (
    <>
      <div className="FeaturesPage">
        <div>
          <NavigationMenu />
        </div>
        <div className="FeaturesContext">
          <div className="FeaturesContextOne">
            <div>
              <header className="header-for-features">
                <h3>What makes VibeMe Special?</h3>
              </header>
              <div style={{ padding: "10px" }}>
                <h2>
                  Explore Our <br />
                  <span style={{ color: "blue" }}>Features</span>
                </h2>
                <p
                  style={{
                    padding: "10px",
                    fontFamily: "monospace",
                    fontSize: "larger",
                  }}
                >
                  A fun and simple way to discover your personality
                </p>
              </div>
            </div>
          </div>
          <div className="magic-wand">
            <WandSparkles />
          </div>
        </div>
        <div className="Instructions-section">
          <div className="row1">
            <h2>Choose your Vibe</h2>
          </div>
          <div className="row1">
            <h2>Choose your Vibe</h2>
          </div>
          <div className="row1">
            <h2>Choose your Vibe</h2>
          </div>
        </div>
      </div>
    </>
  );
};
export default Features;
