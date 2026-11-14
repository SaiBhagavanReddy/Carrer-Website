import { useEffect, useState } from "react";
import "../Css/UserProile.css";
import CircularProgress from "@mui/material/CircularProgress";
interface Usersdata {
  email: string;
  password: string;
  cpassword: string;
  bloodGroup: string;
}

const UserProfile = ({ res }: any) => {
  const [getDataFromServer, setDataFromServer] = useState<Usersdata>({
    email: "",
    password: "",
    cpassword: "",
    bloodGroup: "",
  });

  const [updated, setupdated] = useState<Usersdata>({
    email: "",
    password: "",
    cpassword: "",
    bloodGroup: "",
  });

  const [startProcess, setstartProcess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState(false);
  const undoChanges = () => {
    setupdated({
      password: getDataFromServer.password,
      cpassword: getDataFromServer.cpassword,
      bloodGroup: getDataFromServer.bloodGroup,
    });
  };
  // Fetch current user data

  const fetchData = async () => {
    try {
      const getData = await fetch("http://localhost:5004/RegisterUser");

      if (!getData.ok) {
        throw new Error(`HTTP error: ${getData.status}`);
      }

      const data = await getData.json();

      const currentUser = data.find(
        (user: Usersdata) => user.email === res.state?.userEmail,
      );

      if (currentUser) {
        // Original server data
        setDataFromServer(currentUser);

        // Editable copy
        setupdated(currentUser);

        // Remove previous error message
        setErrorMessage(false);
      } else {
        alert("No data found");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch data");
    }
  };

  // Save changes
  const SaveChanges = async () => {
    setstartProcess(true);
    setErrorMessage(false);

    // Check whether anything changed
    const noChanges =
      updated.password === getDataFromServer.password &&
      updated.cpassword === getDataFromServer.cpassword &&
      updated.bloodGroup === getDataFromServer.bloodGroup;

    if (noChanges) {
      setTimeout(() => {
        setstartProcess(false);
        setErrorMessage(true);
      }, 3000);

      return;
    }

    try {
      // 1. Find user using email
      const response = await fetch(
        `http://localhost:5004/RegisterUser?email=${encodeURIComponent(
          updated.email,
        )}`,
      );

      const users = await response.json();

      if (users.length === 0) {
        setstartProcess(false);
        alert("User not found");
        return;
      }

      // 2. Get the user
      const user = users[0];

      // 3. Update that user
      const updateResponse = await fetch(
        `http://localhost:5004/RegisterUser/${user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: updated.password,
            cpassword: updated.cpassword,
            bloodGroup: updated.bloodGroup,
          }),
        },
      );

      if (updateResponse.ok) {
        alert("Updated");

        // Update local original data
        setDataFromServer(updated);
      } else {
        alert("Not Updated");
      }
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Something went wrong");
    }

    // Stop loading after 3 seconds
    setTimeout(() => {
      setstartProcess(false);
    }, 3000);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="UserProileMain">
        <div className="ManangeUserInfo">
          {/* Header */}
          <div className="Header">
            <h3>My Profile</h3>
            <pre>Manage your personal information</pre>
          </div>

          {/* User Data */}
          <div className="UserData">
            {/* Email */}
            <label className="LabelForUserData">
              Email
              <input
                type="email"
                value={getDataFromServer.email}
                readOnly
                className="readOnly"
              />
            </label>

            {/* Password */}
            <label className="LabelForUserData">
              Password
              <input
                type="text"
                value={updated.password}
                onChange={(e) =>
                  setupdated({
                    ...updated,
                    password: e.target.value,
                  })
                }
              />
            </label>

            {/* Confirm Password */}
            <label className="LabelForUserData">
              Confirm Password
              <input
                type="text"
                value={updated.cpassword}
                onChange={(e) =>
                  setupdated({
                    ...updated,
                    cpassword: e.target.value,
                  })
                }
              />
            </label>

            {/* Blood Group */}
            <label className="LabelForUserData">
              Blood Group
              <select
                value={updated.bloodGroup}
                onChange={(e) =>
                  setupdated({
                    ...updated,
                    bloodGroup: e.target.value,
                  })
                }
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>

                <option value="B+">B+</option>
                <option value="B-">B-</option>

                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>

                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </label>

            {/* Error Message */}
            <div className="errorMessage">
              {ErrorMessage && <p>Nothing changes</p>}
            </div>

            {/* Buttons */}
            <div className="btn-save-can">
              <button onClick={SaveChanges}>Save Changes</button>

              <button onClick={() => undoChanges()}>Cancel</button>
            </div>
          </div>
        </div>

        {/* Loading Process */}
        {startProcess && (
          <div className="ProcessBar">
            <CircularProgress />
          </div>
        )}
      </div>
    </>
  );
};

export default UserProfile;
