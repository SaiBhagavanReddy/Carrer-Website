import { useContext, useEffect, useState } from "react";
import { geminiModel } from "../VibeGenerator/Sub-components/Firebase";
import { Store } from "./Sub-components/ContextApi";
import NavigationMenu from "./NavigationMenu";
import { Star } from "lucide-react";

import "../VibeGenerator/Vibe.css";
import { useNavigate } from "react-router-dom";
const VibeResult = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [rating, setRating] = useState(0);
  const con = useContext(Store);
  const nav = useNavigate();
  if (!con) {
    alert("Error");
  }
  const { userData,setuserData } = con;
  useEffect(()=>{
      if(!result)
        return;
      ShareSampleResult();
  },[result])
  const generateMyVibe = async () => {
    setLoading(true);
    setResult("");
    setError("");
    try {
      const prompt = `
        Create a unique personality profile for VibeMe using these choices:
        ${JSON.stringify(userData)}
        Return:
        Personality Title:
        Description:
        Make the description specific to the user's choices.
        don't keep any quotes.
        `;
      const response = await geminiModel.generateContent(prompt);
      setResult(response.response.text());
    } catch (err) {
      console.error(err);
      setError("Unable to generate your vibe. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const ShareSampleResult = async()=>{
     try{ const url  = await fetch("http://localhost:5007/SampleResult",{
        method:"Post",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({
          Description:result
        })
      })
      if(url.ok)
      {
        alert("Inserted")
      }
      else{
        alert("Failed")
      }}
      catch(error)
      { 
        alert(error);

      }
  }
  useEffect(() => {
    generateMyVibe();
  }, []);
  return (
    <div className="vibe-result">
      <div>
        <NavigationMenu />
      </div>
      <div>
        <main className="Result-main">
          <h1>Your Vibe, Your Story ✨</h1>
          {error && <p>{error}</p>}
          <div style={{ paddingTop: "10px" }}>
            {loading && <span>Generating....</span>}
          </div>
          {result && (
            <div className="result-card">
              <p style={{ whiteSpace: "pre-wrap" }} className="result">
                <span className="first-word">{result.split(" ")[0]}</span>{" "}
                {result.split(" ").slice(1).join(" ")}
              </p>
            </div>
          )}
          <div className="rating">
            {loading ? (
              <></>
            ) : (
              <>
                <header style={{ marginTop: "10px" }}>
                  <h2>How would you rate your Vibe</h2>
                </header>
                <div className="starIcon">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <>
                      <div>
                        <Star
                          size={35}
                          key={star}
                          color="orange"
                          fill={star <= rating ? "orange" : "none"}
                          onClick={() => setRating(star)}
                        />
                      </div>
                    </>
                  ))}
                </div>
                <div>
                  {rating == 0 ? (
                    <></>
                  ) : rating <= 3 ? (
                    <div>
                      <textarea
                        style={{ width: "-webkit-fill-available" }}
                        placeholder="Share your experience"
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="cls-btn">
                  <button onClick={()=>
                    {
                     setuserData({setuserData:[]})     
                      nav("/")
                    }
                    }>
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default VibeResult;
