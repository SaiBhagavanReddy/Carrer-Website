import { Link, useNavigate } from "react-router-dom";
import "../../Css/Login.css";
import { useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const DonationLoginPage = () => {
  interface userData {
    email: string;
    password: string;
    DateofLogin?: Date;
    id?: number;
  }
  const [userDetail, setuserDetail] = useState<userData>({
    email: "",
    password: "",
  });
  const [getData, setgetData] = useState<userData[]>([]);
  const [Process, setProcess] = useState(false);
  const [Error, setError] = useState(false);
  const nav = useNavigate();
  const login = useGoogleLogin({
    onSuccess: (response) => {
      console.log("Success:", response);
    },
    onError: () => {
      console.log("Login Failed");
    },
  });
  const LoginUser = async (e: any) => {
    e.preventDefault();
    const matchedUser = getData.find(
      (res) =>
        res.email === userDetail.email && res.password === userDetail.password,
    );

    const IdToUpdateDate = matchedUser?.id;
    setProcess(true);
    if (matchedUser) {
      setProcess(true);
      userDetail.DateofLogin = new Date();
      localStorage.setItem("AllowUser", "true");
      try {
        const url = await fetch(
          `http://localhost:5004/RegisterUser/${IdToUpdateDate}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              DateofLogin: new Date().toISOString(),
            }),
          },
        );
        if (url.ok) {
          console.log("Date has been added");
        }
      } catch (error) {
        alert(error);
      }
      setTimeout(() => {
        setProcess(false);
        nav("/Dashboard", {
          state: {
            userEmail: userDetail.email,
          },
        });
      }, 1000);
    } else {
      setProcess(true);
      setTimeout(() => {
        setProcess(false);
        setError(true);
      }, 1000);
      return;
    }
  };
  const fetchUser = async () => {
    try {
      const data = await fetch("http://localhost:5004/RegisterUser");
      const res = await data.json();
      setgetData(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div className="Main-Login">
        <div className="Login-Header">
          <h2>Save Blood Connect</h2>
          <p>Sign your Account</p>
        </div>

        <div className="Login-credentials">
          <form onSubmit={LoginUser}>
            <label className="login-label">
              Email
              <input
                type="email"
                required
                onChange={(e) => {
                  setuserDetail({ ...userDetail, email: e.target.value });
                  setError(false);
                }}
              />
            </label>

            <label className="login-label">
              Password
              <input
                type="password"
                required
                onChange={(e) =>
                  setuserDetail({ ...userDetail, password: e.target.value })
                }
              />
            </label>

            <div className="SignIn-btn">
              <button type="submit">Sign In</button>
            </div>
            {Error && (
              <>
                <span style={{ color: "red" }}>
                  Login Failed Verify the credentials
                </span>
              </>
            )}

            <div className="Google-act">
              <button type="button" onClick={() => login()}>
                Google
              </button>
            </div>

            <div>
              <span>Don't have an Account </span>
              <Link to="/Register" className="RegisterLink">
                Register Here
              </Link>
            </div>
            <div>
              <span>Admin</span>
              <Link to="/Admin" className="AdminLink">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>

      {Process && (
        <>
          <div className="Login-Process">
            <CircularProgress />
          </div>
        </>
      )}
    </>
  );
};

export default DonationLoginPage;
