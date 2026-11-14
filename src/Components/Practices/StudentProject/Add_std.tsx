import { useCallback, useEffect, useRef, useState } from "react";
import "../../Practices/StudentProject/Add.css";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { createPortal } from "react-dom";
import { FiRefreshCw } from "react-icons/fi";
import { API_URL } from "./Constants";

const Add = () => {
  const [Id, setId] = useState<number | undefined>();
  const [branch, setBranch] = useState("");
  const [name, setName] = useState("");
  const [percentage, setPercentage] = useState<number | undefined>();
  const [year, setYear] = useState<number | undefined>();
  const [isChecked, setIsChecked] = useState(false);
  const [duplicateError, setDuplicateError] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
  const [processScreen, setProcessScreen] = useState(false);

  const nav = useNavigate();
  const [popup, setPop] = useState(false);
  const [session, setSession] = useState<number | "">("");
  const [valueEntered, setEnteredValue] = useState<number | "">("");
  const [HumanDescription, setAllowHuman] = useState(false);

  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setSession(Math.floor(1000 + Math.random() * 9000));
  }, []);

  const generateSession = useCallback(() => {
    
    setIsChecked(false);
    setEnteredValue("");
    
    setSession(Math.floor(1000 + Math.random() * 9000));
    setAllowHuman(false);

  }, []);
  const submit = async () => {
    if (
      name === "" ||
      branch === "" ||
      Id === null ||
      percentage == null ||
      year == null || valueEntered === ""
    ) {
      setEmptyError(true);
      return;
    }

    try {
      const checkResponse = await fetch(`${API_URL}${Id}`);

      if (checkResponse.ok) {
        setDuplicateError(true);
        return;
      }

      setProcessScreen(true);

      const payload = {
        id: String(Id),
        name,
        branch,
        percentage,
        year,
      };

      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setProcessScreen(false);
      setPop(true);
    } catch (error) {
      console.error(error);
      setProcessScreen(false);
    }
  };
  const Checkvalue = () => {
    ref.current?.focus();
    if (valueEntered === "") {
      
      alert("Pleas enter value");
      // setIsChecked(false);
      return;
    }
    if (valueEntered === session) {
      setAllowHuman(true);
      setIsChecked(true);
      setEmptyError(false)
      return;
    } else {
      alert("Enter Correct the Value ")
      setAllowHuman(false);
      setIsChecked(false);
      return;
    }
  };
 
  type PopupProps = {
    onClose: () => void;
  };
  const Modal = ({ onClose }: PopupProps) => {
    return createPortal(
      <div>
        <div className="Pop-up">
          <span>
            <h3>Data added successfully</h3>
          </span>
          <div>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>,
      document.body,
    );
  };
  return (
    <div className="Add_main">
      <div className="input_data">
        <h2>Add Student Details</h2>
        <div className="Updateinput-data"></div>
        <input
          type="number"
          placeholder="Enter ID"
          value={Id ?? ""}
          onChange={(e) => {
            setId(Number(e.target.value));
            setDuplicateError(false);
          }}
        />

        {duplicateError && (
          <span style={{ color: "red" }}>This ID is already used.</span>
        )}

        <input
          type="text"
          placeholder="Enter Branch"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter Percentage"
          value={percentage ?? ""}
          onChange={(e) => setPercentage(Number(e.target.value))}
        />

        <input
          type="number"
          placeholder="Enter Year"
          value={year ?? ""}
          onChange={(e) => {
            const value = e.target.value;

            if (value.length <= 4) {
              setYear(Number(value));
            }
          }}
        />
        {emptyError && (
          <span style={{ color: "red" }}>Please fill all fields.</span>
        )}
        {true && (
          <div className="session-check">
            <span>
              {session}
              <button onClick={generateSession}>
                <FiRefreshCw />
              </button>
            </span>

            <hr className="horizontal-line" />
            <div className="user-data">
              <input
                type="number"
                value={valueEntered}
                ref={ref}
                onChange={(e) => {
                  if (e.target.value.length <= 4) {
                    setEnteredValue(
                      e.target.value === "" ? "" : Number(e.target.value),
                    );
                  }
                }}
              />
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => Checkvalue()}
              />
            </div>
            {HumanDescription && (
              <>
                <div className="successMessage ">
                  <span>Verified</span>
                </div>
              </>
            )}
          </div>
        )}
        <button
          onClick={submit}
          style={{ backgroundColor: "black", color: "whitesmoke" }}
        >
          Add
        </button>

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
        <div>
          {popup && (
            <>
              <Modal
                onClose={() => {
                  nav("/");
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Add;
