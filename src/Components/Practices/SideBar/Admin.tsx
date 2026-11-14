import { useEffect, useState } from "react";
import "../SideBar/Admin.css";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
const Admin = () => {
  interface Admin {
    id: number;
    AdminName: string;
    AdminId: string;
  }
  const [pwd, setPwd] = useState("");
  const [Admin, setAdmin] = useState("");
  const [showPassword, setPassword] = useState(true);
  const [adminFromDb, setAdminFromDb] = useState<Admin[]>([]);
  const [adminCreate, setOpenModal] = useState(false);
  const [newAdminId, setnewAdmin] = useState("");
  const [newId, setnewId] = useState("");
  const nav = useNavigate();
  const [closeBtnValue, setcloseBtnValue] = useState(false);
  const [showPasswordForModal, setshowPasswordForModal] = useState(true);

  const fetchAdminCredintials = async () => {
    try {
      const data = await fetch("http://localhost:5002/AdminDb");
      const res = await data.json();
      setAdminFromDb(res);
    } catch (error) {
      console.error(error);
    }
  };
  const LoginCheck = () => {
    if (Admin.trim() === "" || pwd.trim() === "") {
      alert("Password or Admin ID are missing");
      return;
    }

    const res = adminFromDb.find(
      (item) => item.AdminName === Admin && item.AdminId === pwd,
    );

    if (res) {
      localStorage.setItem("isAdminLoggedIn", "true");

      nav("/SideBar", {
        state: {
          Admin,
          pwd,
        },
      });
    } else {
      alert("Invalid Admin Name or Password");
    }
  };
  const CreateAdminAccount = async () => {
    try {
      if (newAdminId === "" || newId === "") {
        alert("Admin Name or Password is missing");
        return;
      }
      const data = await fetch(
        `http://localhost:5002/AdminDb?AdminName=${newAdminId}`,
      );

      const res = await data.json();

      if (res.length > 0) {
        alert("Admin name already exists");
        return;
      }
      const response = await fetch("http://localhost:5002/AdminDb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          AdminName: newAdminId,
          AdminId: newId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create admin account");
      }

      alert("Created Account");
      setcloseBtnValue(true);
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Something went wrong.");
      }
    }
  };
  useEffect(() => {
    if(!Admin.length==null||pwd.length==null)
    {
      alert("valuea r empty")
    }
    else{
                   fetchAdminCredintials();
      return;
    }
      
  }, [newAdminId, newId]);
  const createAdminAct = () => {
    setOpenModal((prev) => !prev);
  };
  return (
    <>
      <div className="adminMain">
        <div className="admainModal">
          <div className="admainHeader">
            <h2>Admin Login</h2>

            <pre>Sign into continue to the admin dashboard</pre>
          </div>
          <div className="inputDataForAdmin">
            <label className="admin-label">
              <div className="username-icon">
                <HiOutlineEnvelope />
              </div>
              Admin
              <input
                type="text"
                value={Admin}
                onChange={(e) => setAdmin(e.target.value)}
              />
            </label>
            <label className="admin-label">
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
                <span>Forget Password?</span>
              </div>
              <input
                type={showPassword ? "password" : "text"}
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />
            </label>
            <div className="login-btn">
              <button onClick={() => LoginCheck()}>Login</button>
            </div>
            <div className="divider">
              <hr />
              <span>OR</span>
              <hr />
            </div>
            <div className="Login-with-google">
              <button onClick={() => createAdminAct()}>
                Create Admin Account
              </button>
            </div>
            <div className="FooterAdmin">
              <div>
                <p>Not an Admin</p>
              </div>
              <div className="loginAsAdmin">
                <button onClick={() => nav("/")}>Go to User Login Again</button>
              </div>
            </div>
          </div>
        </div>
        {adminCreate && (
          <>
            <div className="CreateAdminAct">
              <div className="CreateAdminActSection">
                <div>
                  <div className="CreateAdminHeader">
                    <h2>Create Admin Account</h2>
                    <pre>Enter details below to create admin account</pre>
                  </div>
                </div>

                <div className="inputDataForCreate">
                  <label className="admin-label">
                    <div className="username-icon">
                      <HiOutlineEnvelope />
                    </div>
                    Admin
                    <input
                      type="text"
                      value={newAdminId}
                      onChange={(e) => setnewAdmin(e.target.value)}
                    />
                  </label>
                  <label className="admin-label">
                    <div className="forgot-pwd">
                      <div className="icon-for-email">
                        <HiOutlineLockClosed />
                      </div>
                      Password
                      <div className="eye-icon">
                        {showPasswordForModal ? (
                          <>
                            <HiOutlineEyeSlash
                              onClick={() =>
                                setshowPasswordForModal((prev) => !prev)
                              }
                            />
                          </>
                        ) : (
                          <>
                            <HiOutlineEye
                              onClick={() =>
                                setshowPasswordForModal((prev) => !prev)
                              }
                            />
                          </>
                        )}
                      </div>
                    </div>
                    <input
                      type={showPasswordForModal ? "password" : "text"}
                      value={newId}
                      onChange={(e) => setnewId(e.target.value)}
                    />
                  </label>

                  <div className="CreateAct-btn">
                    <button onClick={() => CreateAdminAccount()}>Create</button>

                    <button
                      onClick={() => {
                        setOpenModal(false);
                        setnewId("");
                        setnewAdmin("");
                        setcloseBtnValue(false)
                      }}
                    >
                      {closeBtnValue?"Close":"Cancel"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Admin;
