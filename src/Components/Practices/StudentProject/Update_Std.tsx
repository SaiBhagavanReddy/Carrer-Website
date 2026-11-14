import { useState } from "react";
import "./Search.css";
import InfoIcon from "@mui/icons-material/Info";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../StudentProject/Constants";
const Update_Std = () => {
  const [Id, getId] = useState<number | "">("");
  const [error, setError] = useState(false);
  const [name, setName] = useState<string | "">("");
  const [branch, setBranch] = useState<string | "">("");
  const [percentage, setPercentage] = useState<number | "">();
  const [year, setYear] = useState<number | "">();
  const [processScreen, setProcessScreen] = useState(false);
  const [updateError, setUpdateError] = useState(false);
  const [originalStudent, setOriginalStudent] = useState<any>(null);
  const [stopEnteringId, setStopEnterningValue]= useState(false);
  const nav = useNavigate();

  const getDetails = async () => {
    try {
      const res = await fetch(`${API_URL}${Id}`);
      const data = await res.json();
      if (data.id) {
        setProcessScreen(true);
        setTimeout(() => {
          setProcessScreen(false);
        }, 900);
        setOriginalStudent(data);
        setBranch(data.branch);
        setName(data.name);
        setPercentage(data.percentage);
        setYear(data.year);
      } else {
        setProcessScreen(true);
        setTimeout(() => {
          setProcessScreen(false);
           setError(true);
        },1000);
       
        return;
      }
    }   catch (error) {
      setProcessScreen(false);
      console.error(error);
      alert("Failed to update student");
    }
  };
  const UpdateDetails = async () => {
    if(name=== "" || branch===""|| percentage ==="" ||year==="")
    {
      alert("values are missing");
      return; 
    }
    if(name === originalStudent.name && branch === originalStudent.branch && year === originalStudent.year && percentage === originalStudent.percentage)
    {
      
      setUpdateError(true);
      return;
    }
    setUpdateError(false);
     try 
     {
      const res = await fetch(`${API_URL}${Id}`,
        {
          method:"PUT",
          headers :{
            "Content-type" :"application/json"
          },
          body : JSON.stringify({
              id:Id,
              name,
              branch,
              percentage,
              year,
          }) 
        }
      )
      const resData = await res.json();
       setProcessScreen(true);

      setStopEnterningValue(true);  
      setOriginalStudent(resData);
       setTimeout(() => {   
          setStopEnterningValue(false);
          setProcessScreen(false);
          alert("Data is updated");
          setBranch("");
          setName("");
          setPercentage("");
          setYear("");
        }, 1000);
      
     }
     catch(error)
     {
          alert("error"+error)
     }
     

  };
  return (
    <>
      <div className="update-main">
        <div className="header_for_update">
          <h2>Update The Student Details</h2>
          <div className="info_icon">
            <InfoIcon style={{ color: "blue" }} />
            <strong>Enter the Id number to get update </strong>
          </div>
        </div>
        <div className="content-to-update">
          <input
            type="number"
            value={Id}
            disabled={stopEnteringId}
            placeholder="Enter Student Id"
            onChange={(e) => {
              getId(Number(e.target.value));
              setError(false);
            }}
          />

          <button onClick={getDetails} disabled={Id === ""}>
            Get Details
          </button>
        </div>
        {error && (
          <>
            <div>
              <span
                style={{
                  paddingLeft: " 50px",
                  paddingTop: "14px",
                  color: "red",
                }}
              >
                Id not found Check your Id again
              </span>
            </div>
          </>
        )}
        {processScreen && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              backgroundColor: "rgba(0,0,0,0.3)",
              zIndex: 9999,
            }}
          >
            <CircularProgress size={60} />
          </div>
        )}
        <div className="content">
          <div className="Update_input-data">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            />

            <input
              type="number"
              value={percentage}
              onChange={(e) => setPercentage(Number(e.target.value))}
            />

            <input
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
            />
            {updateError && (
              <>
                <div>
                  <span>No changes has made</span>
                </div>
              </>
            )}
            <button onClick={UpdateDetails} disabled={Id === ""} >Update</button>
            <button
              onClick={() => {
                nav("/");
              }}
            >
              {" "}
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Update_Std;
