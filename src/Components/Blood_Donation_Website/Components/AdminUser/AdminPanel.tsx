import { useState } from "react";
import "../../Css/AdminPanel.css";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const AdminPanel = () => {
  interface Details {
    email: string;
    password: string;
  }
  const [showPwd, setshowPwd] = useState(true);
  const [userData, setuserData] = useState([]);
  const [Process, setProcess] = useState(false);
  const [error, SetError] = useState(false);
  const nav = useNavigate();
  const [userEnteredData, setuserEnteredData] = useState<Details>({
    email: "",
    password: "",
  });
  const LoginAdminUser = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5006/AdminUser");
      const data = await res.json();
      if (res.ok) {
        setuserData(data);
        const rep = data.some(
          (details:any) =>
            details.Admin === userEnteredData.email &&
            details.Password === userEnteredData.password,
        );

        if (rep) {
          setProcess(true);
          setTimeout(() => {
            localStorage.setItem("AllowUser", "true");
            nav("/Dashboard", {
              state: {
                email: userEnteredData.email,
              },
            });
            setProcess(false);
          }, 3000);
        } else {
          setProcess(true);
          setTimeout(() => {
            SetError(true);
            setProcess(false);
          }, 3000);
        }
      } else {
        alert("Error while retreiving data");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="AdminMain">
        <div className="AdminHeader">
          <h3>Admin Login</h3>
          <p>Access the admin panel to manage the platform</p>
        </div>
        <div className="AdminInfo">
          <form className="AdminForm" onSubmit={(e) => LoginAdminUser(e)}>
            <label className="adminLabel-for-email">
              Admin
              <input
                type="text"
                placeholder="Enter the email id"
                required
                value={userEnteredData.email}
                onChange={(e) =>
                  setuserEnteredData({
                    ...userEnteredData,
                    email: e.target.value,
                  })
                }
              />
              <div className="mail-icon">
                <FiMail />
              </div>
            </label>
            <label className="adminLabel-for-password">
              <div className="pwd-icon">
                <FiLock />
              </div>
              Password
              <input
                type={showPwd ? "password" : "text"}
                placeholder="Enter the password"
                required
                value={userEnteredData.password}
                onChange={(e) =>
                  setuserEnteredData({
                    ...userEnteredData,
                    password: e.target.value,
                  })
                }
              />
              <div className="pwd-icon2">
                {showPwd ? (
                  <>
                    <FiEyeOff onClick={() => setshowPwd((prev) => !prev)} />
                  </>
                ) : (
                  <>
                    <FiEye onClick={() => setshowPwd((prev) => !prev)} />
                  </>
                )}
              </div>
            </label>
            <div>
              {error && (
                <>
                  <span style={{ color: "red" }}>Invalid Credentails!</span>
                </>
              )}
            </div>
            <div className="Btns-for-navigation">
              <button
                onClick={() =>
                  nav("/", {
                    state: userEnteredData.email,
                  })
                }
              >
                Back To Normal User
              </button>
              <button>Login</button>
            </div>
          </form>
        </div>
      </div>
      <div className="ProcessScreenForAdmin">
        {Process && (
          <>
            <CircularProgress size={80} />
          </>
        )}
      </div>
    </>
  );
};
export default AdminPanel;
