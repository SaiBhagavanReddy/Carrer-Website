import CloseIcon from "@mui/icons-material/Close";
import "../SideBar/SideBar.css";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
const ForgetPasswordModal = ({ setShowForgetPasswordModal, Admin }: any) => {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [CharactersLength, setCharactersLength] = useState(0);
  const [newPwd, setnewPwd] = useState("");
  const [ConfrimnewPwd, setConfrimPwd] = useState("");
  const [oldPwd, setOldPwd] = useState("");
  const [userNewPwd, setuserNewPwdPwd] = useState("");
  const hasUppercase = /[A-Z]/.test(newPwd);
  const [pwdMisMatchError, setpwdMisMatchError] = useState(false);
  const hasNumber = /\d/.test(newPwd);
  const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(newPwd);
  const togglePassword = (field: "current" | "new" | "confirm") => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  const fetchPassword = async () => {
    try {
      const res = await fetch(
        `http://localhost:5002/AdminDb?AdminName=${Admin}`,
      );
      const data = await res.json();
      setnewPwd(data[0].AdminId);
    } catch (error) {}
  };
  useEffect(() => {
    fetchPassword();
  }, []);
  const UpdatePassword = async () => {
  if (oldPwd === "" || newPwd === "" || ConfrimnewPwd === "") {
    alert("Passwords are missing");
    return;
  }
 



  // if (oldPwd === newPwd) {
  //   alert("Old password and New password cannot be the same");
  //   return;
  // }

  // Find admin
  
  const response = await fetch(
    `http://localhost:5002/AdminDb?AdminId=${oldPwd}`
  );

  const data = await response.json();
  if (data.length === 0) {
    alert("Admin not found");
    return;
  }
  const admin = data[0];

  const update = await fetch(
  `http://localhost:5002/AdminDb/${admin.id}`,
  {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...admin,
      AdminId: userNewPwd,
    }),
  }
);

  const result = await update.json();
  console.log(result);
  alert("Password updated successfully");
  return;
};
  return (
    <>
      <div className="DescriptionForgetPassword">
        <div className="forgotPasswordHeader">
          <h3>Change Password</h3>
          <CloseIcon onClick={() => setShowForgetPasswordModal(false)} />
        </div>
        <div className="Forget-passwordDetails">
          <label className="forgotPwd-label">
            Current Password
            <input
              type={showPassword.current ? "text" : "password"}
              value={oldPwd}
              onChange={(e) => setOldPwd(e.target.value)}
            />
            <div
              className="eye-icon-forgotPwd"
              onClick={() => togglePassword("current")}
            >
              {showPassword.current ? (
                <>
                  <HiOutlineEye />
                </>
              ) : (
                <>
                  <HiOutlineEyeSlash />
                </>
              )}
            </div>
          </label>
          <label className="forgotPwd-label">
            New Password
            <input
              type={showPassword.new ? "text" : "password"}
              value={userNewPwd}
              onChange={(e) => {
                const value = e.target.value;
                setuserNewPwdPwd(value);
                      if (e.target.value !== ConfrimnewPwd) {
                  setpwdMisMatchError(true);
                } else if(e.target.value === ConfrimnewPwd) {
                  setpwdMisMatchError(false);
                }
               
                if (value.length > 8) {
                  setCharactersLength(value.length);
                } else {
                  setCharactersLength(0);
                }
              }}
            />
            <div
              className="eye-icon-forgotPwd"
              onClick={() => togglePassword("new")}
            >
              {showPassword.new ? (
                <>
                  <HiOutlineEye />
                </>
              ) : (
                <>
                  <HiOutlineEyeSlash />
                </>
              )}
            </div>
          </label>
          <label className="forgotPwd-label">
            Confrim New Password
            <input
              type={showPassword.confirm ? "text" : "password"}
              value={ConfrimnewPwd}
              onChange={(e) => {
                setConfrimPwd(e.target.value);
                if (e.target.value !== userNewPwd) {
                  setpwdMisMatchError(true);
                } else if(e.target.value === userNewPwd) {
                  setpwdMisMatchError(false);
                }
              }}

              // }}
            />
            <div
              className="eye-icon-forgotPwd"
              onClick={() => togglePassword("confirm")}
            >
              {showPassword.confirm ? (
                <>
                  <HiOutlineEye />
                </>
              ) : (
                <>
                  <HiOutlineEyeSlash />
                </>
              )}
            </div>
          </label>
          {pwdMisMatchError ? (
            <>
              <span style={{ color: "red" }}>Password Mismatch</span>
            </>
          ) : (
            <></>
          )}
          <div className="passwordPattern">
            <div className="passwordPatternDetails">
              <div>
                <h3>Password Must Contains</h3>
              </div>
              <div className="patternMatch">
                <div className="charLength">
                  <FiCheckCircle
                    style={{ color: CharactersLength > 8 ? "red" : "green" }}
                  />

                  <strong>8+ Characters</strong>
                </div>
                <div className="UpperCaseLetter">
                  <FiCheckCircle
                    style={{ color: hasUppercase ? "red" : "green" }}
                  />

                  <strong>UpperCase Letter</strong>
                </div>
                <div className="Number">
                  <FiCheckCircle
                    style={{ color: hasNumber ? "red" : "green" }}
                  />

                  <strong>Number</strong>
                </div>
                <div className="SpecialCharacter">
                  <FiCheckCircle
                    style={{ color: hasSpecialCharacter ? "red" : "green" }}
                  />
                  <strong>SpecialCharacter</strong>
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="update-btn">
            <button onClick={() => UpdatePassword()}>Update</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ForgetPasswordModal;
