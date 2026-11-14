import { useLocation, useNavigate } from "react-router-dom";
import "../Css/Dashboard.css";
import { HiMenu } from "react-icons/hi";
import { lazy, useEffect, useState } from "react";
import Blood_Availability from "./NormalUser/Blood_Availability";
const UserProfile = lazy(() => import("../Components/UserProfile"));
const MyBloodRequest = lazy(() => import("./AdminUser/MyBloodRequest"));
const MyBloodDonation = lazy(() => import("./NormalUser/MyBloodDonation"));
const UserData = lazy(() => import("../Components/UserData"));
const AddAdmin = lazy(() => import("./AdminUser/AddAdmin"));
const BloodRequestForm = lazy(() => import("./NormalUser/BloodRequestForm"));
const ViewAdmin = lazy(() => import("./AdminUser/ViewAdmin"));
const Dashboard = () => {
  const res = useLocation();
  const nav = useNavigate();
  const [LoggedUser, setLoggedUser] = useState("");
  const [DashboardSelection, setDashboardSelection] = useState("All");
  const [sideDashboard, setsideDashboard] = useState(false);
  interface AdminCheck {
    Admin: string;
  }
  const [admincheck, setAdmincheck] = useState<AdminCheck>({ Admin: "" });
  const LogoutUser = () => {
    const logout = localStorage.removeItem("AllowUser");
    if (logout === undefined) {
      nav("/");
    }
  };
  const fetchAdminUser = async () => {
    const url = await fetch("http://localhost:5006/AdminUser");
    const result = await url.json();
    const check = result.filter((data: any) => data.Admin === res.state?.email);
    setAdmincheck({
      Admin: check[0]?.Admin,
    });
  };

  useEffect(() => {
    if (res.state?.userEmail) {
      setLoggedUser(res.state.userEmail);
    }
    if (res.state?.email) {
      setLoggedUser(res.state.email);
    }
  }, []);

  useEffect(() => {
    if (!res?.state?.email) return;
    fetchAdminUser();
  }, [res?.state?.email]);
  return (
    <div className="Dashboard-main">
      {/* Navbar */}
      <div className="Nav">
        <div className="Header">
          <h3>Save the Blood</h3>

          <HiMenu
            className="menu-icon"
            onClick={() => setsideDashboard((prev) => !prev)}
          />
        </div>

        <div className="userCredentails">
          <span>{LoggedUser}</span>

          <div className="logout-btn">
            <button onClick={() => LogoutUser()}>Logout</button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="Dashboard-body">
        {sideDashboard && (
          <div className="sideDashboard">
            {
              <>
                <div className="Dashboard">
                  <div>
                    <button onClick={() => setDashboardSelection("All")}>
                      DashBoard
                    </button>
                  </div>
                </div>
                {res.state?.email === admincheck?.Admin ? (
                  <></>
                ) : (
                  <>
                    <div>
                      <button
                        onClick={() => setDashboardSelection("Blood Request ")}
                      >
                        Blood Request{" "}
                      </button>
                    </div>
                  </>
                )}
                {res.state?.email === admincheck?.Admin ? (
                  <></>
                ) : (
                  <>
                    <div>
                      <button
                        onClick={() => setDashboardSelection("UserProfile")}
                      >
                        UserProfile{" "}
                      </button>
                    </div>
                  </>
                )}
                {res.state?.email === admincheck?.Admin ? (
                  <></>
                ) : (
                  <>
                    <div>
                      <button
                        onClick={() =>
                          setDashboardSelection("Blood Availability")
                        }
                      >
                        Blood Availability{" "}
                      </button>
                    </div>
                  </>
                )}
                <div>
                  <button
                    onClick={() => setDashboardSelection("MyBloodRequest")}
                  >
                    {res.state?.email === admincheck?.Admin ? (
                      <>Blood Requests</>
                    ) : (
                      <>My BloodRequest</>
                    )}
                  </button>
                </div>
                {res.state?.email === admincheck?.Admin ? (
                  <></>
                ) : (
                  <>
                    <div>
                      <button
                        onClick={() => setDashboardSelection("MyBloodDonation")}
                      >
                        MyBloodDonation{" "}
                      </button>
                    </div>
                  </>
                )}
                {
                  <div>
                    <button onClick={() => setDashboardSelection("UserData")}>
                      {res.state?.email === admincheck?.Admin ? (
                        <>UserData</>
                      ) : (
                        <></>
                      )}
                    </button>
                  </div>
                }
                {
                  <div>
                    <button onClick={() => setDashboardSelection("AddAdmin")}>
                      {res.state?.email === admincheck?.Admin ? (
                        <>Add/Update</>
                      ) : (
                        <></>
                      )}
                    </button>
                  </div>
                }
                {
                  <div>
                    <button onClick={() => setDashboardSelection("ViewAdmin")}>
                      {res.state?.email === admincheck?.Admin ? (
                        <>View Admin Details</>
                      ) : (
                        <></>
                      )}
                    </button>
                  </div>
                }
              </>
            }
          </div>
        )}
      </div>
      <div className="main-content">
        {DashboardSelection === "All" ? (
          <>
            <div className="UserDetails">
              <div className="UserDetailsHeader">
                <h2>
                  Welcome Come Back-
                  <br /> {LoggedUser}
                </h2>
              </div>
            </div>
          </>
        ) : DashboardSelection === "Blood Request " ? (
          <>
            <BloodRequestForm />
          </>
        ) : DashboardSelection === "Blood Availability" ? (
          <>
            <Blood_Availability />
          </>
        ) : DashboardSelection === "UserProfile" ? (
          <>
            <UserProfile res={res} />
          </>
        ) : DashboardSelection === "MyBloodRequest" ? (
          <>
            <MyBloodRequest
              adminUser={res.state?.email === admincheck?.Admin}
            />
          </>
        ) : DashboardSelection === "MyBloodDonation" ? (
          <>
            <MyBloodDonation />
          </>
        ) : DashboardSelection === "UserData" ? (
          <>
            <UserData />
          </>
        ) : DashboardSelection === "AddAdmin" ? (
          <>
            <AddAdmin UpdateAdmin={res.state?.email} />
          </>
        ) : DashboardSelection === "ViewAdmin" ? (
          <>
            <ViewAdmin />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;
