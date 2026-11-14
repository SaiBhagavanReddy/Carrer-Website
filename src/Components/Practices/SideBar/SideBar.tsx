import { useEffect, useRef, useState } from "react";
import "../SideBar/SideBar.css"
import DashBoard from "./DashBoard";
import Department from "./Department.tsx";
import ContactUs from "./ContactUs.tsx";
import HelpAndSupport from "../SideBar/HelpAndSupport.tsx"
import StudentProfile from "../SideBar/StudentProfile.tsx";
import { useLocation } from "react-router-dom";
import NavBar from "../SideBar/NavBar.tsx";
// /import { useNavigate } from "react-router-dom";
const SideBar = () => {
  const refe = useRef(null);
  const refer2 = useRef(null);
  const [menu, setMenu] = useState("All");
  const location = useLocation();
const { Admin } = location.state || {};
  const HandleMenu = () => {
    if (refe.current?.classList.contains("Hide")) {
      refe.current.classList.remove("Hide");
      refer2.current?.classList.remove("ShowMenu");
    } else {
      refe.current?.classList.add("Hide");
      refer2.current?.classList.add("ShowMenu");
    }
  };

  return (
    <>
      <div className="Main-SideBar">
        <div className="Description" ref={refe}>
          <pre onClick={HandleMenu} style={{fontSize:"25px"}} ref={refer2}>
            &#9776;
          </pre>
          <div className="values_inside_menu">
            <div className="hover-menu">
              <pre onClick={() => setMenu("Dashboard")}>DashBoard</pre>
              <pre onClick={()=> setMenu("Department")}>Department</pre>
              <pre onClick={() => setMenu("Contact Us")}>Contact US</pre>
              <pre onClick={() => setMenu("HelpAndSupport")}>Help & Support </pre>
            </div>
          </div>
         
        </div>
        <div>
          {" "}
           <div className="NavBar">
            <div className="NavBarDetails">
                   <NavBar Admin={Admin}/>
            </div>
          </div>
          {menu === "Dashboard" ? (
            
                <DashBoard/>
          ) 
          : menu === "Contact Us" ? (
            <ContactUs/>
          ) : menu === "Remarks" ? (
            <div>Hey Remarks</div>
          ) : menu === "Department" ? (
            <>
                  <Department/>
            </>
          ):
          menu === "HelpAndSupport"?
          (<>
          <HelpAndSupport/>
          </>):
          menu === "All"?
          (
            <>
               <StudentProfile/>
            </>
          )
          :null}
        </div>
      </div>
    </>
  );
};
export default SideBar;
