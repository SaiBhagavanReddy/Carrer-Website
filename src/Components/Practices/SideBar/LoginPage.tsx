import "../SideBar/LoginPage.css";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const LoginPage = () => {
  const [showPassword, setPassword] = useState(true);
  // const login = useGoogleLogin({});
  const nav = useNavigate();
  const [UserName, setDataForUserName] = useState();
  const [UserPwd, setDataForUserPwd] = useState();
  const [forgetEmail, setforgetEmail] = useState("");
  const [ShowProcess, setShowProcess] = useState(false);
  const [openForgetPwdModal, setopenForgetPwdModal] = useState(false);
  const [ShowNotication, setShowNotication] = useState("");
  const [ProcessScreenForget, setProcessScreenForget] = useState(false);
  interface LoginData {
    Email: string;
    password: string;
  }
  const [getDatafromUser, setUserData] = useState<LoginData>({
    Email: "",
    password: "",
  });
  const LoginCheck = async () => {
    try {
      if (getDatafromUser.Email === "" || getDatafromUser.password === "") {
        alert("Missing all data");
        return;
      }
      const res = await fetch("http://localhost:5003/Users");
      const data = await res.json();
      const userExits = data.some(
        (user: any) => user.Password === getDatafromUser.password,
      );

      if (userExits) {
        setShowProcess(true);
        setTimeout(() => {
          setShowProcess(false);
          nav("/SideBar");
        }, 1000);
        localStorage.setItem("isAdminLoggedForUser", "true");
        setDataForUserName(data.Email);
        setDataForUserPwd(data.Password);
      } else {
        alert("UserName are not registered please create ant account");
      }
    } catch (error) {
      alert(Error);
    }
  };
  const ForgetPWd = async () => {
    if(forgetEmail==="")
    {
      alert("Enter the Mail Id");
      return;
    }
      try {
      const get = await fetch(
        `http://localhost:5003/Users?Email=${forgetEmail}`,
      );
      setProcessScreenForget(true);
      const res = await get.json();
      const emailCheck = res.some((rev: any) => rev.Email === forgetEmail);
      if (emailCheck) {
        setTimeout(() => {
          setProcessScreenForget(false);
          setShowNotication("A Mail has been sent to reset the password");
        }, 600);
      } else {
        setTimeout(()=>{
          setProcessScreenForget(false);
          setShowNotication(
          "Entered Email is incorrect! Please enter registered Email",
        );
        },600)
       
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (forgetEmail.length === 0) {
      setShowNotication("");
    }
  }, [forgetEmail]);
  return (
    <>
      <div className="LoginMain">
        <div className="Sections">
          <div className="College-section">
            <h2>College</h2>
          </div>
          <div className="Login-section">
            <div className="login-header">
              <h3>Welcome Back Login</h3>
              <pre>Login to access your account</pre>
            </div>
            <div className="LogininputData">
              <label className="Inputlabel">
                <div className="username-icon">
                  <HiOutlineEnvelope />
                </div>
                Email
                <input
                  type="email"
                  value={getDatafromUser.Email}
                  onChange={(e) =>
                    setUserData({ ...getDatafromUser, Email: e.target.value })
                  }
                />
              </label>
              <label className="Inputlabel">
                <div className="forgot-pwd">
                  <div className="icon-for-email">
                    <HiOutlineLockClosed />
                  </div>
                  Password
                  <div className="eye-icon">
                    {showPassword ? (
                      <>
                        <HiOutlineEyeSlash
                          onClick={() => setPassword((prev) => !prev)}
                        />
                      </>
                    ) : (
                      <>
                        <HiOutlineEye
                          onClick={() => setPassword((prev) => !prev)}
                        />
                      </>
                    )}
                  </div>
                  <div className="forgetPassword-btn">
                    <button
                      onClick={() => setopenForgetPwdModal((prev) => !prev)}
                    >
                      Forget Password?
                    </button>
                  </div>
                </div>
                <input
                  type={showPassword ? "password" : "text"}
                  value={getDatafromUser.password}
                  onChange={(e) =>
                    setUserData({
                      ...getDatafromUser,
                      password: e.target.value,
                    })
                  }
                />
              </label>
              <div className="Saving-data-section">
                <div className="checkbox-section">
                  <input type="checkbox" />
                  Remember me
                </div>
                <div className="loginAsAdmin">
                  <button onClick={() => nav("/Admin")}>Login as Admin</button>
                </div>
              </div>{" "}
              <div className="login-btn">
                <button onClick={() => LoginCheck()}>Login</button>
              </div>
              <div className="divider">
                <hr />
                <span>OR</span>
                <hr />
              </div>
              <div className="Login-with-google">
                <button>Login With Google</button>
              </div>
              <div className="Footer">
                <div className="register-btn">
                  <button onClick={() => nav("/Register")}>
                    Don't have an account?
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {openForgetPwdModal && (
            <>
              <div className="forgot-modal">
                <div className="forgot-modal-description">
                  <div className="Header-With-close-btn">
                    <h3>Enter your registered Email</h3>
                    <CloseIcon
                      onClick={() => {
                        setforgetEmail("");
                        setopenForgetPwdModal((prev) => !prev);
                        setShowNotication("");
                      }}
                    />
                  </div>
                  <div className="ForgotPwdUserData">
                    <div className="forget-email">
                      <input
                        type="email"
                        placeholder="Enter your registered email"
                        value={forgetEmail}
                        onChange={(e) => setforgetEmail(e.target.value)}
                      />
                    </div>
                    <div className="Process-icon-for-forgetpwd">
                      {ProcessScreenForget && (
                        <>
                          <CircularProgress size={100} />
                        </>
                      )}
                    </div>
                    <div style={{ color: "blue", textAlign: "center" }}>
                      {ShowNotication ? (
                        <>
                          <span>{ShowNotication}</span>
                          {/* {
                            DuplicateApiCall.map((data,ind)=>
                            <>  
                                <div key={ind}>
                                    {data}
                                </div>
                              </>
                            )
                          } */}
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="forgetPwd-btn">
                      <button onClick={() => ForgetPWd()}>
                        Forget Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="Process-icon">
          {ShowProcess && (
            <>
              <CircularProgress size={100} />
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default LoginPage;
