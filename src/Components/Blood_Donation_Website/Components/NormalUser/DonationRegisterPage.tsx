import "../../Css/Register.css";
import { Link } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const DonationRegisterPage = () => {
  interface userData {
    email: string;
    password: string;
    cpassword: string;
    bloodgroup: string;
  }
  const [EyeIcon, setEyeIcon] = useState(true);
  const [EyeForCpwd, setEyeForCpwd] = useState(true);
  const [userData, setuserData] = useState<userData>({
    email: "",
    password: "",
    cpassword: "",
    bloodgroup: "",
  });
  const [process,setprocess] = useState(false);
  const [Error,setError]  = useState(false);
  const RegisterUser = async (e: any) => {
    e.preventDefault();
    try {
        const duplicate = await fetch("http://localhost:5004/RegisterUser");
        const users = await duplicate.json();
        const emailExists = users.some(
            (user: any) => user.email === userData.email,
        );
        setprocess(true);
   if (emailExists) {
  setTimeout(() => {
    setprocess(false);
    setError(true);
  }, 1000);

  return;
}
    } catch (error) {
      console.log(error);
    }
    try {
      const send = await fetch("http://localhost:5004/RegisterUser", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          cpassword: userData.cpassword,
          bloodGroup: userData.bloodgroup,
        }),
      });

      if (send.ok) {
        setprocess(false)
        alert("Inserted successfully");
      } else {
        alert("Not inserted");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="Main-Register">
        <div className="Register-Header">
          <h2>Create Account </h2>
          <p>Sign up to get started</p>
        </div>
        <div className="Register-credentials">
          <form onSubmit={RegisterUser}>
            <label className="Register-label">
              Email
              <div className="input-box">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  onChange={(e) =>
                  {
                    setuserData({ ...userData, email: e.target.value })
                    setError(false)
                  }
                  }
                />
              </div>
            </label>

            <label className="Register-label">
              Password
              <div className="input-box">
                <FiLock className="input-icon" />
                <input
                  type={EyeIcon ? "password" : "text"}
                  placeholder="Create a password"
                  required
                  onChange={(e) =>
                    
                    setuserData({ ...userData, password: e.target.value })
                  }
                />
                <div className="eyeIcon-on-and-off">
                  {EyeIcon ? (
                    <>
                      <FiEyeOff onClick={() => setEyeIcon((prev) => !prev)} />
                    </>
                  ) : (
                    <>
                      <FiEye onClick={() => setEyeIcon((prev) => !prev)} />
                    </>
                  )}
                </div>
              </div>
            </label>

            <label className="Register-label">
              Confirm Password
              <div className="input-box">
                <FiLock className="input-icon" />
                <input
                  type={EyeForCpwd ? "password" : "text"}
                  placeholder="Confirm your password"
                  required
                  onChange={(e) =>
                    setuserData({ ...userData, cpassword: e.target.value })
                  }
                />
                <div className="eyeIcon-on-and-off">
                  {EyeForCpwd ? (
                    <>
                      <FiEyeOff
                        onClick={() => setEyeForCpwd((prev) => !prev)}
                      />
                    </>
                  ) : (
                    <>
                      <FiEye onClick={() => setEyeForCpwd((prev) => !prev)} />
                    </>
                  )}
                </div>
              </div>
            </label>
            <label className="select-blood-group">
              <select
                required
                onChange={(e) =>
                  setuserData({ ...userData, bloodgroup: e.target.value })
                }
              >
                <option value="">Select Blood Group</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>
            </label>
            <div className="SignIn-btn">
              <button type="submit">Register</button>
            </div>

            <div className="Google-act">
              <button type="button">Google</button>
            </div>

            <div>
              <span>Already  have an Account? </span>

              <Link to="/" className="RegisterLink">
                login 
              </Link>
            </div>
            <div>
                {Error&&
                (<>
                        <span style={{color:"red"}}>
                            Email Already Available
                        </span>
                </>)
                }
            </div>
          </form>
        </div>
      </div>
      {
        process&&(<>
         <div className="Process-screen">
        <CircularProgress size={90} />
      </div>
        </>)
      }
     
    </>
  );
};
export default DonationRegisterPage;
