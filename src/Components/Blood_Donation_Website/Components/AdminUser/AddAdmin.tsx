import { useEffect, useState } from "react";
import "../../Css/AddAdmin.css";
import ProcessScreen from "../../Common/ProcessScreen";
import { EyeOffIcon, EyeIcon } from "lucide-react";
const AddAdmin = ({ UpdateAdmin }: any) => {
  interface adminData {
    adminUsername: string;
    Password: string;
    id?: number | undefined;
    date?: number;
  }
  const [adminData, setadminData] = useState<adminData>({
    adminUsername: "",
    Password: "",
  });
  const [toupdate, setUpdate] = useState<adminData>({
    adminUsername: "",
    Password: "",

  });
  const [updateCheck, CheckUpdate] = useState<adminData>({
    adminUsername: "",
    Password: "",
  });
  const [Process, setProcess] = useState(false);
  const [showUpdate, setshowUpdate] = useState(false);
  const [Eyeicon, setEyeicon] = useState(true);
  const [UpdateStatus, setUpdateStatus] = useState(false);
  const [alertMsg, setalertMsg] = useState(false);
  const CreateAdmin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5006/AdminUser");
      const json = await res.json();
      const dup = json.find(
        (name: any) =>
          name.Admin === adminData.adminUsername ||
          name.Password === adminData.Password,
      );

      if (dup) {
        setProcess(true);
        setTimeout(() => {
          setProcess(true);
          alert("duplicate are not allowed");
          setadminData({
            ...adminData,
            adminUsername: "",
            Password: "",
          });
          setProcess(false);
        }, 3000);
        return;
      }
    } catch (error) {
      alert(error);
    }

    try {
      const url = await fetch("http://localhost:5006/AdminUser", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          Admin: adminData.adminUsername,
          Password: adminData.Password,
          date: new Date(),
        }),
      });
      if (url.ok) {
        setProcess(true);
        setTimeout(() => {
          setProcess(false);
          alert("Inserted");
        }, 3000);
      } else {
        alert("not");
      }
    } catch (error) {
      alert(error);
    }
  };
  const Update = async () => {
    setshowUpdate((prev) => !prev);
    setUpdateStatus((prev) => !prev);
    try {
      const url = await fetch(
        `http://localhost:5006/AdminUser?Admin=${UpdateAdmin}`,
      );
      const res = await url.json();

      setUpdate({
        adminUsername: res[0].Admin,
        Password: res[0].Password,
        id: res[0].id,
      });

      CheckUpdate({
        adminUsername: res[0].Admin,
        Password: res[0].Password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const AdminUpdate = async (id: number) => {
    if (
      updateCheck.adminUsername === toupdate.adminUsername ||
      updateCheck.Password === toupdate.Password
    ) {
      setUpdateStatus(true);
    } else {
      try {
        alert(id);
        const url = await fetch(`http://localhost:5006/AdminUser/${id}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            Admin: toupdate.adminUsername,
            Password: toupdate.Password,
          }),
        });

        if (url.ok) {
          alert("Completed");
          setalertMsg(true);
        } else {
          alert("not");
        }
      } catch (error) {}
    }
  };
  useEffect(() => {
    setUpdateStatus(false);
  }, [toupdate.adminUsername, toupdate.Password]);
  const CancelChanges = () => {
    setUpdate({
      ...toupdate,
      adminUsername: updateCheck.adminUsername,
      Password: updateCheck.Password,
    });
  };
  return (
    <>
      <div className="UpdateAndAdd">
        <div className="AddAdminMain">
          <div className="AdminHeaders">
            <h3>Add the Admin</h3>
            <pre>
              Only admin can have the access to create the admin account
            </pre>
          </div>
          <div>
            <form className="AdminData" onSubmit={(e) => CreateAdmin(e)}>
              <label className="AdminLabel">
                Admin
                <input
                  type="text"
                  value={adminData.adminUsername}
                  placeholder="Enter admin name"
                  required
                  onChange={(e) =>
                    setadminData({
                      ...adminData,
                      adminUsername: e.target.value,
                    })
                  }
                />
              </label>
              <label className="AdminLabel">
                Password
                <input
                  type="password"
                  value={adminData.Password}
                  placeholder="Enter the password"
                  required
                  onChange={(e) =>
                    setadminData({ ...adminData, Password: e.target.value })
                  }
                />
              </label>
              <div className="addAdmin-btn">
                <button>Add</button>
              </div>
            </form>
            <div className="update-btn-for-admin">
              <button onClick={() => Update()}>Update</button>
            </div>
          </div>
        </div>
        {showUpdate && (
          <>
            <div className={showUpdate ? "UpdateAdminMain" : "RemoveModal"}>
              <div className="UpdateDataForAdmin">
                <div className="UpdateHeader">
                  <h3>Update Admin</h3>
                  <pre>Below are the admin details of current user</pre>
                </div>
                <div className="UpdateAdmin-enter-details">
                  <label className="UpdateLabel">
                    Admin
                    <input
                      type="text"
                      className={UpdateStatus ? "UpdateStatus" : ""}
                      value={toupdate.adminUsername}
                      onChange={(e) =>
                        setUpdate({
                          ...toupdate,
                          adminUsername: e.target.value,
                        })
                      }
                    />
                  </label>
                  <label className="UpdateLabel">
                    Password
                    <input
                      type={Eyeicon ? "password" : "text"}
                      value={toupdate.Password}
                      onChange={(e) =>
                        setUpdate({ ...toupdate, Password: e.target.value })
                      }
                      className={UpdateStatus ? "UpdateStatus" : ""}
                    />
                    <div className="eye-icon-for-update">
                      {Eyeicon ? (
                        <>
                          <EyeOffIcon
                            onClick={() => setEyeicon((prev) => !prev)}
                          />
                        </>
                      ) : (
                        <>
                          <EyeIcon
                            onClick={() => setEyeicon((prev) => !prev)}
                          />
                        </>
                      )}
                    </div>
                  </label>
                  <span>
                    {alertMsg ? (
                      <>
                        <pre style={{ color: "green" }}>
                          Please logout and check the updated Credintals
                        </pre>
                      </>
                    ) : (
                      <></>
                    )}
                  </span>
                  <div className="update-and-cancel-btn">
                    <button onClick={() => AdminUpdate(toupdate.id===undefined?0:toupdate.id)}>
                      Update
                    </button>
                    <button onClick={() => CancelChanges()}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="Process-screen-for-Admin">
        {Process && (
          <>
            <ProcessScreen />
          </>
        )}
      </div>
    </>
  );
};
export default AddAdmin;
