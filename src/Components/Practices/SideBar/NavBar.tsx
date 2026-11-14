import { useState } from "react";
import "../SideBar/SideBar.css";
import { HiChevronDown } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import ForgetPasswordModal from "../SideBar//forgetPasswordModal";

interface NavBarProps {
  Admin: string;
}
const NavBar = ({ Admin }: NavBarProps) => {
  const nav = useNavigate();
  const [ShowForgetPasswordModal, setShowForgetPasswordModal] = useState(false);
  const Logout = () => {
    const admin = localStorage.getItem("isAdminLoggedIn");
    const user= localStorage.getItem("isAdminLoggedForUser");

    if(admin)
    {
       nav("/Admin");
      localStorage.removeItem("isAdminLoggedIn");
      }
      else if(user) {
        nav("/")
      }
    
   
  };

  const [ShowDetails, setShowDetails] = useState(false);
  return (
    <>
      <div className="AdminDetails">
        <div className="AdminHeader">
          <div className="admin-name">
            <h3>Hey Admin</h3>
          </div>
          <div>
            <HiChevronDown
              size={40}
              onClick={() => setShowDetails((prev) => !prev)}
            />
          </div>
        </div>
        {ShowDetails && (
          <>
            <div className="AdminHandler">
              <div className="profile-settings">
                <div className="userName">
                  <span> {Admin}</span>
                </div>
                <div className="change-password-btn">
                  <button
                    onClick={() => setShowForgetPasswordModal((prev) => !prev)}
                  >
                    Change Password
                  </button>
                </div>
                <div className="download-id-card">
                  <button>Download ID Card</button>{" "}
                </div>
                <div className="logout-btn">
                  <button onClick={() => Logout()}>Logout</button>
                </div>
              </div>
            </div>
          </>
        )}
        {ShowForgetPasswordModal && (
          <div className="forget-password-modal">
            <ForgetPasswordModal Admin={Admin} setShowForgetPasswordModal={setShowForgetPasswordModal} />
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
