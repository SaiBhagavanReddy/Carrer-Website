import "../VibeGenerator/Vibe.css";
import NavigationMenu from "./NavigationMenu";
const About = () => {
  return (
    <>
      <div className="AboutMain">
        <div>
          <NavigationMenu />
        </div>
        <div className="AboutContent">
          <div className="Row1">
            <div>
              <div className="about-icon">
                <p>About Us</p>
              </div>
              <header>
                <h4>
                  <span style={{ color: "white" }}>
                    Will Help you <br />
                    Find your
                    <br />
                  </span>{" "}
                  <span style={{ color: "b" }}>Vibe</span>
                </h4>
                <h5>Fun. Simple. Yours</h5>
              </header>
            </div>
          </div>
          <div className="Row2">
            <div className="Row2-one">
              <h4>The Story</h4>
              <p>
                Started as a small project to make personality quizess less
                boring
              </p>
            </div>
            <div className="Row2-two">
              <div className="Row2-two-one">
                <span>
                  10+
                  <br /> Unique vibes to discover
                </span>
              </div>
              <div className="Row2-two-two">
                <span>
                  2 Min
                  <br />
                  to your result
                </span>
                <div className="Row2-two-three">
                  <span>You</span>
                  <div>
                    <p>Creator</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="Row3andRow4">
          <div className="Row3">
            <div className="Row3-one">
              <p>No judgment, ever</p>
            </div>
            <span>
              "Every personality is a good one. We just help you name it."
            </span>
          </div>
          <div className="Row4">
              <pre>
                Ready to find yours?
              </pre>
              <div>
                <button>
                  Get Started -{">"}
                </button>
              </div>
          </div>
        </div>
          </div>
      </div>
    </>
  );
};
export default About;
