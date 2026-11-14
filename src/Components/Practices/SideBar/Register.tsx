import { useEffect, useState } from "react";
import "../SideBar/RegisterMain.css";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const Register = () => {
  interface RegisterUserArray {
    FullName: string;
    Email: string;
    MiddleName: string;
    RollNumber: string;
    Password: string;
    confrimPassword: string;
    Department?: string;
    year?: string;
    ConfrimPassword?: string;
  }
  const nav = useNavigate();
  const [OpenTermsPop, setOpenTermsPop] = useState(false);
  const [disabledCheckbox,setdisabledCheckbox] = useState(false);
  const [registerUser, setRegisterUser] = useState<RegisterUserArray>({
    FullName: "",
    Email: "",
    MiddleName: "",
    RollNumber: "",
    Password: "",
    confrimPassword: "",
  });
  const [UserAccepted, setUserAccepted] = useState(false);
  const RegisterUser = async () => {
    try {
      if (
        registerUser.Email === "" ||
        registerUser.FullName === "" ||
        registerUser.MiddleName === "" ||
        registerUser.Password === "" ||
        registerUser.RollNumber === "" ||
        registerUser?.Department === "" ||
        registerUser?.year === ""
      ) {
        alert("Please enter all fields");
        return;
      } else {
        alert("Entered");
      }
      const checkExistingUser = await fetch("http://localhost:5003/Users");
      const response = await checkExistingUser.json();
      const available = response.some(
        (eee: any) => eee.Password === registerUser.Password,
      );
      if (available) {
        alert("User already Exists");
        return;
      }
      const url = await fetch("http://localhost:5003/Users", {
        method: "POST",
        headers: {
          "Content-type": "Application/json",
        },
        body: JSON.stringify({
          Username: registerUser.FullName,
          Email: registerUser.Email,
          Password: registerUser.Password,
        }),
      });
      if (url.ok) {
        const data = await url.json();
        console.log(data);
        alert("Inserted");
      } else {
        alert("Error while inserting");
      }
    } catch (error) {
      alert(error);
    }
  };
  useEffect(()=>{
    setdisabledCheckbox(true)
  },[UserAccepted])
  return (
    <>
      <div className="RegisterMain">
        <div className="RegisterDetails">
          <div className="RegisterHeader">
            <h4>Create Your Account</h4>
            <span>Fill in the details to get started</span>
          </div>
          <div className="UserEnterDataRegister">
            <div className="row01">
              <label className="labelForRegister">
                Full Name
                <input
                  type="text"
                  value={registerUser.FullName}
                  onChange={(e) =>
                    setRegisterUser({
                      ...registerUser,
                      FullName: e.target.value,
                    })
                  }
                />
              </label>
              <label className="labelForRegister">
                Email
                <input
                  type="email"
                  value={registerUser.Email}
                  onChange={(e) =>
                    setRegisterUser({
                      ...registerUser,
                      Email: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div className="row02">
              <label className="labelForRegister">
                Middle Name
                <input
                  type="text"
                  value={registerUser.MiddleName}
                  onChange={(e) =>
                    setRegisterUser({
                      ...registerUser,
                      MiddleName: e.target.value,
                    })
                  }
                />
              </label>
              <label className="labelForRegister">
                Roll Number
                <input
                  type="text"
                  value={registerUser.RollNumber}
                  onChange={(e) =>
                    setRegisterUser({
                      ...registerUser,
                      RollNumber: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div className="row03">
              <label className="labelForRegister">
                DepartMent Name
                <select
                  onChange={(e) =>
                    setRegisterUser({
                      ...registerUser,
                      Department: e.target.value,
                    })
                  }
                >
                  <option value={"ECE"}>ECE</option>
                  <option value={"CSE"}>CSE</option>
                  <option value={"MECH"}>MECH</option>
                  <option value={"EEE"}>EEE</option>
                </select>
              </label>
              <label className="labelForRegister">
                Academic Year
                <select
                  onChange={(e) =>
                    setRegisterUser({
                      ...registerUser,
                      RollNumber: e.target.value,
                    })
                  }
                >
                  <option value={"2023"}>2023</option>
                  <option value={"2024"}>2024</option>
                  <option value={"2025"}>2025</option>
                </select>
              </label>
            </div>
            <div className="row04">
              <label className="labelForRegister">
                Password
                <input
                  type="password"
                  value={registerUser.Password}
                  onChange={(e) =>
                    setRegisterUser({
                      ...registerUser,
                      Password: e.target.value,
                    })
                  }
                />
              </label>
              <label className="labelForRegister">
                Confrim Password
                <input
                  type="password"
                  value={registerUser.ConfrimPassword}
                  onChange={(e) =>
                    setRegisterUser({
                      ...registerUser,
                      ConfrimPassword: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div className="AcceptTerms">
              <div>
                <input type="checkbox"  checked={UserAccepted}  style={{cursor:disabledCheckbox?"default":"not-allowed"}}/>
              </div>
              <div>
                <p>
                  I agree the{" "}
                  <span
                    style={{ color: "blue" }}
                    onClick={() => setOpenTermsPop((prev) => !prev)}
                  >
                    Terms and conditions{" "}
                  </span>{" "}
                  and<span style={{ color: "blue" }}> privacy policy</span>
                </p>
              </div>
            </div>
            <div className="createAct ">
              <button onClick={() => RegisterUser()}>Create Account</button>
            </div>
            <div className="BackLogin removeColorForLogin">
              <p>Already have an account ?</p>
              <button onClick={() => nav("/")}>Login</button>
            </div>
          </div>
        </div>
      </div>
      {OpenTermsPop ? (
        <div className="TermsandCondtionsMain">
          <div className="TermsDescription">
            <div className="Header-with-close-btn">
              <div className="Header">
                <h2>Terms and Condition</h2>
                <pre>
                  Please read terms and conditions before creating account
                </pre>
              </div>
              <div>
                <CloseIcon onClick={()=>setOpenTermsPop(false)} />
              </div>
            </div>
            <div className="TermsAndPolicy">
              <div className="Terms">
                <h3>Terms and Conditions</h3>
                <p>
                  By creating an account in the College Management System, you
                  agree to provide accurate and complete information during
                  registration. You are responsible for maintaining the
                  confidentiality of your account credentials and for all
                  activities performed using your account.
                </p>
              </div>
              <hr />
              <div className="Policy">
                <h3>Privacy Policy</h3>
                <p>
                  Your personal information, including your name, email address,
                  roll number, department, and academic details, is collected
                  solely to provide and improve college services.
                </p>
              </div>
            </div>
            <div className="checkbox-with-text">
              <div>
                <input
                  type="checkbox"
                 
                  checked={UserAccepted}
                  onChange={() => setUserAccepted(prev=>!prev)}
                />
              </div>
              <p>
                I have read, understood, and agree to the{" "}
                <span style={{ color: "blue" }}>Terms and Conditions</span> and{" "}
                <span style={{ color: "blue" }}>Privacy Policy</span>
              </p>
            </div>
            <div className="close-btn">
              <button onClick={()=>setOpenTermsPop(false)}>Close</button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default Register;
