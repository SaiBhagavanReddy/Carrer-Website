import { useEffect, useState } from "react";
import "../Css/userData.css";
const UserData = () => {
  interface Data {
    email: "";
    bloodGroup: "";
    id: number;
    DateofLogin:number
  }
  const [displayData, setdisplayData] = useState<Data[]>([]);
  const [originalData, setOriginalData] = useState<Data[]>([]);
  const [DeleteModal, setDeleteModal] = useState<{
    ind?: 0;
    idFromServer?: 0;
    isOpen: false;
  }>();
  interface bloodGroupTypes
  {
    "AB":string,
    "othersOnegative":string,
    "othersOpositive":string,
  }
  const bloodGroupType:bloodGroupTypes={
    "AB":"AB+",
    "othersOnegative":"O-",
    "othersOpositive":"O+"
  }
  
  const [searchFilter, setsearchFilter] = useState("");
  const [bloodGroupfilter, setbloodGroupfilter] = useState("");
  const [timeout, Checktime] = useState(15);
  const fetchUserdata = async () => {
    try {
      const res = await fetch("http://localhost:5004/RegisterUser");
      const data = await res.json();
      setdisplayData(data);
    } catch (error) {
      if (JSON.stringify(error)) {
        alert("Please connect to the dataBase");
      } else {
        alert("Check the api URL");
      }
    }
  };
  const Total = displayData.length;
  const  others= displayData.filter(
    (data, _) => data.bloodGroup ===bloodGroupType.othersOnegative || data.bloodGroup === bloodGroupType.othersOpositive,
  );
  const ABCBloodGroupCount = displayData.filter(
    (data, _) => data.bloodGroup ===bloodGroupType.AB  && data.bloodGroup === bloodGroupType.othersOnegative && data.bloodGroup===bloodGroupType.othersOpositive
  );
  useEffect(() => {
    fetchUserdata();
  }, []);
  const deleteFromServer = async () => {
    setDeleteModal({ ...DeleteModal, isOpen: false });
    const deleteid = DeleteModal?.idFromServer;
    try {
      const deleteServer = await fetch(
        `http://localhost:5004/RegisterUser/${deleteid}`,
        {
          method: "Delete",
        },
      );
      if (deleteServer.ok) {
        alert("Deleted from server also");
        Checktime(15);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!DeleteModal?.isOpen) return;

    const time = setInterval(() => {
      Checktime((prev) => {
        if (prev <= 1) {
          clearInterval(time);
          deleteFromServer();
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(time);
    };
  }, [DeleteModal?.isOpen]);
  const UndoChanges = () => {
    setdisplayData(originalData);
    setDeleteModal({ ...DeleteModal, isOpen: false });
    Checktime(15);
  };
  const Delete = (idFromServer: number) => {
    setdisplayData((prev) => prev.filter((data) => data.id !== idFromServer));
    setOriginalData(displayData);
    setDeleteModal((prev) => ({
      ...prev,
      isOpen: true,
      idFromServer: idFromServer,
    }));
  };
  const filteredUsers = displayData.filter((user) => {
    return (
      user.email.toLowerCase().includes(searchFilter.toLowerCase()) ||
      bloodGroupfilter === "all" ||
      user.bloodGroup === bloodGroupfilter
    );
  });
  const ClearFilter = () => {
    setsearchFilter("");
    setbloodGroupfilter("");
  };
  return (
    <>
      <div className="UserDataMain">
        <div className="headerForUserData">
          <h3>User Management</h3>
          <p>View and manage all blood donation user Data</p>
        </div>
        <div className="UsersCount">
          <div className="SeparateSection">
            <pre>Total Users-{Total}</pre>
          </div>
          <div className="SeparateSection">
            <pre>A+/B+-{ABCBloodGroupCount.length}</pre>
          </div>
          <div className="SeparateSection">
            Other blood groups -{others.length}
          </div>
        </div>
        <div className="SearchFilterSection">
          <input
            type="text"
            placeholder="Search By Email Id"
            value={searchFilter}
            onChange={(e) => setsearchFilter(e.target.value)}
          />
          <div>
            <select
              value={bloodGroupfilter}
              onChange={(e) => setbloodGroupfilter(e.target.value)}
            >
              <option value={"all"}>All Blood Group</option>
              <option value={"A+"}>A+</option>
              <option value={"B+"}>B+</option>
              <option value={"B-"}>B-</option>
              <option value={"O-"}>O-</option>
            </select>
          </div>
          <div className="clear-all-btn">
            <button onClick={() => ClearFilter()}>Clear</button>
          </div>
        </div>
        <div>
          <table border={2}>
            <thead>
              <tr>
                <th>Email</th>
                <th>Blood Group</th>
                <th>Action</th>
                <th>Last Loggged Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((data, ind) => (
                <>
                  <tr key={ind}>
                    <td>{data.email}</td>

                    <td>{data.bloodGroup}</td>
                    <td>
                      <div className="delete-btn">
                        <button onClick={() => Delete(data.id)}>Delete</button>
                      </div>
                    </td>
                  <td>
                    {data?.DateofLogin}
                  </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        {DeleteModal?.isOpen ? (
          <>
            <div className="DeleteModal">
              <div className="DeleteDescription">
                <div className="DeleteHeader">
                  <h2>Do you want to delete this user</h2>
                  <pre style={{ paddingTop: "20px", textAlign: "center" }}>
                    Once the time is over it will delete completly
                  </pre>
                </div>
                <div className="timeout-with-undo-btn">
                  {timeout}
                  <div className="undo-btn">
                    <button onClick={() => UndoChanges()}>Undo</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default UserData;
