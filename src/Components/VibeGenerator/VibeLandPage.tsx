import "../VibeGenerator/Vibe.css";
import NavigationMenu from "../VibeGenerator/NavigationMenu";
import userImage from "../../../src/Components/Assests/UserImage.png";
import {
  Utensils,
  Palette,
  Clapperboard,
  MapPin,
  Star,
  Music,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const steps = [
  {
    title: "Food",
    icon: Utensils,
  },
  {
    title: "Color",
    icon: Palette,
  },
  {
    title: "Movie",
    icon: Clapperboard,
  },
  {
    title: "Destination",
    icon: MapPin,
  },
  {
    title: "Hero",
    icon: Star,
  },
  {
    title: "Song",
    icon: Music,
  },
];
const VibeLandPage = () => {
  const nav = useNavigate();
  interface Result {
    Description: string;
  }
  const [OpenResultModal, setOpenResultModal] = useState(false);
  const [sampleResult, setsampleResult] = useState<Result[]>([
    { Description: "" },
  ]);
  const GetSampleResult = async () => {
    try {
      const res = await fetch(`http://localhost:5007/SampleResult/?id=${2}`);
      const data = await res.json();
      if (data) {
        setsampleResult(data);
      } else {
        console.log("error");
      }
    } catch (error) {
      alert("Server is OFF");
    }
  };
  useEffect(() => {
    if (!OpenResultModal) {
      return;
    }
    GetSampleResult();
  }, [OpenResultModal]);
  return (
    <>
      <div className="VibeMain">
        <main>
          <div className="nav">
            <NavigationMenu />
          </div>
          <div className="Inside-Content">
            <div className="Row1">
              <span>Discover your own vibe</span>
              <div>
                <header>
                  <h2>
                    Small Choices,
                    <span>
                      {" "}
                      A <span style={{ color: "blue" }}>Bigger You</span>
                    </span>
                  </h2>
                </header>
                <div>
                  <p style={{ fontFamily: "cursive" }}>
                    Pick your favorite food, color, movie, destination, hero,
                    and song. We’ll bring all your favorites together to create
                    a personalized vibe that reflects your style, taste, and
                    personality. Primary button: Start Your Journey →
                  </p>
                </div>
                <div className="btn-vibe">
                  <button onClick={() => nav("/StartVibe")}>
                    Start Your Journey
                  </button>
                  <button onClick={() => setOpenResultModal((prev) => !prev)}>
                    Sample Result
                  </button>
                </div>
              </div>
            </div>
            <div className="Row2">
              <img src={userImage} />
            </div>
          </div>
          <div className="steps-to-work">
            <header className="header-for-steps">
              <pre>How It Works</pre>
              <h3>
                Just
                <span style={{ color: "blue", paddingLeft: "5px" }}>
                  6 Simple Steps
                </span>
              </h3>
              <p>Pick your favorite let us create perfect Vibe</p>
            </header>
            <div className="Icons">
              {steps.map(({ title, icon: Icon }) => (
                <>
                  <div key={title}>
                    <Icon
                      size={24}
                      strokeWidth={2.8}
                      fill={title === "Hero" ? "currentColor" : "none"}
                    />
                    <div>{title}</div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </main>
        <div>
          {OpenResultModal && (
            <>
              <div className="ResultPop">
                <div className="ModalDes">
                  <div className="HeaderwithCloseIcon">
                    <header>
                      <h2>Sample Vibe Result is here</h2>
                    </header>
                    <CloseIcon
                      onClick={() => {
                        setOpenResultModal((prev) => !prev);
                      }}
                    />
                  </div>
                  <div>
                    {sampleResult.map((data, ind) => (
                      <>
                        <p key={ind} className="ResultText">
                          {data.Description}
                        </p>
                      </>
                    ))}
                  </div>
                  <div className="userAlertMsg">
                    <span>
                      Ready to discover the personality hidden in your choices?
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default VibeLandPage;
