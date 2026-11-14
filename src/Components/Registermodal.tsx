import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import CloseIcon from "../assets/close.png";

import "../../src/Style/Home.css";
import { toast } from "react-toastify";
interface ModalProps2 {
  toOpen: boolean;
  toClose: () => void;
  children: React.ReactNode;
  setProcess:React.Dispatch<React.SetStateAction<boolean>>;
  // isChecked:boolean
  //     setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}
function Registermodal({ toClose,setProcess }: ModalProps2) {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [cpwd, setCpwd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showComnfrimPassword, setShowComnfrimPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [disableBtn, setdisableBtn] = useState(true);
  const [cursor, Disablecursor] = useState(false);
  const errorRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const pwdRef = useRef<HTMLDivElement>(null);
  const cpwdRef = useRef<HTMLDivElement>(null);
  const [hideWarning, setWarning] = useState(false);
  const [range, setRange] = useState(0);
  function ChangeIcon() {
    setShowPassword(!showPassword);
  }
  function ChangeIconPwd() {
    setShowComnfrimPassword(!showComnfrimPassword);
  }
  useEffect(() => {
    errorRef.current?.classList.add("animation_error_message");
  }, [isChecked]);

  const emailError = useMemo(() => {
    if (!email) {
      return "";
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setWarning(true);
      return "Invalid email format";
    }
    setWarning(false);
    return "";
  }, [email]);
  const validation = useCallback(() => {
    if (email.length == 0) {
      emailRef.current?.classList.add("email-focus");
      setWarning(true);
      toast.error("Enter the Email address");
    } 
    setProcess(true)
    setTimeout(()=>{
    setProcess(false)
    toClose();
  fetch("http://localhost:3001/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: email,
    password: pwd,
  }),
});
    },2000)
     
    
  }, [email, pwd, cpwd]);

  const PasswordError = useMemo(() => {
    if (!pwd) {
      setRange(0);
      return "";
    }
    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{7,}$/.test(pwd)) {
      setRange(10);
      return "Weak Password";
    }
    setRange(100);
    return "Strong Password";
  }, [pwd]);

  return (
    <div className="Register-main">
      <div className="register-header">
        <h3>Register</h3>
        <img
          src={CloseIcon}
          onClick={toClose}
          style={{
            marginTop: "0px",
            width: "20px",
            height: "20px",
            position: "absolute",
            marginLeft: "370px",
          }}
        />
      </div>
      <div className="Register-inputData">
        <label>
          Email<span style={{ color: "red", paddingLeft: "1px" }}>*</span>{" "}
          <br />
          <input
            type="email"
            value={email}
            autoComplete="Email"
            ref={emailRef}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter Your Email Id"
          ></input>
          {hideWarning ? (
            <>
              <span style={{ color: "red" }}>!</span>
            </>
          ) : (
            <>
              <span style={{ color: "red" }}></span>
            </>
          )}
          {emailError && <p>{emailError}</p>}
        </label>
        <label>
          Password<span style={{ color: "red", paddingLeft: "1px" }}>*</span>
          <br />
          <div className="input-wrapper">
            <input
              type={showComnfrimPassword ? "text" : "password"}
              placeholder="Password"
              value={pwd}
              ref={pwdRef}
              autoComplete="current-password"
              onChange={(e) => {
                setPwd(e.target.value);
                if (cpwd !== e.target.value) {
                  setIsChecked(true);
                  setdisableBtn(false);
                  Disablecursor(true);
                } else {
                  setIsChecked(false);
                }
                if (cpwd == "" && pwd !== "") {
                  setIsChecked(false);
                }
              }}
              onPaste={(e) => {
                e.preventDefault();
              }}
            />
            <span className="eye-icon" onClick={ChangeIconPwd}>
              <FontAwesomeIcon
                icon={showComnfrimPassword ? faEye : faEyeSlash}
              />
            </span>
          </div>
          {PasswordError && <p style={{ color: "red" }}>{PasswordError}</p>}
          {PasswordError && (
            <>
              {" "}
              <div className="range-bar">
                <input type="range" value={range}></input>
              </div>
            </>
          )}
        </label>
        <div className="input-wrapper2">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={cpwd}
            ref={cpwdRef}
            onChange={(e) => {
              setCpwd(e.target.value);
              if (pwd !== e.target.value) {
                setIsChecked(true);
                setdisableBtn(false);
                Disablecursor(true);
              } else {
                setIsChecked(false);
              }
            }}
            onPaste={(e) => {
              e.preventDefault();
            }}
            onCopy={(e) => {
              e.preventDefault();
            }}
          />
          <span className="eye-icon2" onClick={ChangeIcon}>
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </span>
        </div>
        {isChecked && (
          <span ref={errorRef} style={{ color: "red" }}>
            Password Mismatch
          </span>
        )}
        {/* <div className="Remember-me">
          <input type="checkbox" />
          <span>Remember Me</span>
        </div> */}
        <button
          disabled={disableBtn}
          style={{ cursor: cursor ? "pointer" : "not-allowed" }}
          onClick={validation}
        >
          Register
        </button>
      </div>
    </div>
  );
}
export default Registermodal;
