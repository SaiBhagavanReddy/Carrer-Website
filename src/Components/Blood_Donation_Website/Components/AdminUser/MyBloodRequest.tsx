
import { useEffect,memo, useState } from "react";
import "../../Css/BloodRequest.css";
import CircularProgress from "@mui/material/CircularProgress";

interface MyBloodRequestProps {
  adminUser: boolean;
}

interface UserData {
  PatientName: string;
  HospitalName: string;
  BloodGroupNeed: string;
  UnitsRequired: number;
  RequestedDate: string;
  status: string;
  Date: string;
  id: number;
}

const MyBloodRequest = memo(({ adminUser }: MyBloodRequestProps) => {
  const statusUpdate = ["Completed", "In-Progress", "Pending"];

  // Server data
  const [userDataFromserver, setuserDataFromserver] =
    useState<UserData[]>([]);

  // Selected status for each row
  const [selectedStatuses, setSelectedStatuses] =
    useState<Record<number, string>>({});

  // Loading state
  const [Process, setprocess] = useState(false);

  // Track updating and deleting rows
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Pagination
  const [noofPages, setnoofPages] = useState(1);
  const totalPagetodisplay = 5;

  // Search
  const [searchName, setsearchName] = useState("");

  // Fetch data from server
  const fetchDb = async () => {
    try {
      const get = await fetch(
        "http://localhost:5005/DonationData"
      );

      if (!get.ok) {
        throw new Error(`HTTP Error: ${get.status}`);
      }

      const result: UserData[] = await get.json();

      setuserDataFromserver(result);
    } catch (error) {
       if (JSON.stringify(error)) {
      
      alert("Please connect to the dataBase");
      return;
      } else {
        alert("Check the api URL");
      }
    }
  };

  useEffect(() => {
    fetchDb();
  }, []);

  // Search / Filter
  const displayData = userDataFromserver.filter((data) =>
    data.PatientName
      .toLowerCase()
      .includes(searchName.toLowerCase())
  );
  const ExportData=()=>{
    const jsonConvertData = JSON.stringify(userDataFromserver);
    const blobDAta = new Blob([jsonConvertData],{
      type:"applicaton/json"
    })
    const url = URL.createObjectURL(blobDAta);
    const link  =  document.createElement("a");
    link.href=url;
    link.download="Details.json"
    link.click();  

  
  } 

  // Total number of pages
  const totalPages = Math.ceil(
    displayData.length / totalPagetodisplay
  );

  // Keep page number valid after searching or deleting
  useEffect(() => {
    if (totalPages === 0 && noofPages !== 1) {
      setnoofPages(1);
    } else if (totalPages > 0 && noofPages > totalPages) {
      setnoofPages(totalPages);
    }
  }, [totalPages, noofPages]);

  // Pagination calculation
  const startIndex = (noofPages - 1) * totalPagetodisplay;
  const endIndex = startIndex + totalPagetodisplay;

  // Data to display on current page
  const DatawithPagination = displayData.slice(
    startIndex,
    endIndex
  );

  // Handle dropdown change
  const handleStatusChange = (
    id: number,
    selectedStatus: string
  ) => {
    setSelectedStatuses((prev) => ({
      ...prev,
      [id]: selectedStatus,
    }));
  };

  // Update status
  const UpdateStatus = async (
    id: number,
    selectedStatus: string
  ) => {
    if (id === undefined || id === null) {
      alert("Record ID is missing");
      return;
    }

    try {
      setUpdatingId(id);

      const res = await fetch(
        `http://localhost:5005/DonationData/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: selectedStatus,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`Update failed: ${res.status}`);
      }

      const updatedData: UserData = await res.json();

      // Update the table after successful PATCH
      setuserDataFromserver((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, status: updatedData.status }
            : item
        )
      );

      // Clear selected dropdown value for this row
      setSelectedStatuses((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });

      alert("Status updated successfully");
    } catch (error) {
      console.error("Update error:", error);
      alert("Unable to update status");
    } finally {
      setUpdatingId(null);
    }
  };
 const HandlerFilter = (
  e: React.ChangeEvent<HTMLSelectElement>
) => {
  const value = e.target.value;

  setuserDataFromserver((prev) => {
    const sorted = [...prev];

    if (value === "Latest") {
      sorted.sort(
        (a, b) =>
          new Date(b.Date).getTime() -
          new Date(a.Date).getTime()
      );
    }

    if (value === "Relevance") {
      sorted.sort(
        (a, b) =>
          new Date(a.Date).getTime() -
          new Date(b.Date).getTime()
      );
    }

    return sorted;
  });

  setnoofPages(1);
};
  // Delete request
  const DeleteUser = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this request?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      setprocess(true);

      const del = await fetch(
        `http://localhost:5005/DonationData/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!del.ok) {
        throw new Error(`Delete failed: ${del.status}`);
      }

      // Remove deleted record from table
      setuserDataFromserver((prev) =>
        prev.filter((data) => data.id !== id)
      );

      // Remove any unsaved status selection
      setSelectedStatuses((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });

      console.log("Deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Unable to delete request");
    } finally {
      setprocess(false);
      setDeletingId(null);
    }
  };

  return (
    <>
      <div className="BloodRequestMain">
        {/* Header */}
        <div className="HeaderForRequest">
          <h2>My Blood Requests</h2>
          <pre>View and track all my blood requests</pre>
        </div>

        {/* Search and Filter */}
        <div className="SearchFilter">
          <label>
            Sort By:
            <select
              style={{ marginLeft: "10px" }}
              defaultValue="Latest"
              onChange={(e)=>HandlerFilter(e)}
            >
              <option value="Latest">Latest</option>
              <option value="Relevance">Relevance</option>
            </select>
          </label>
          {
            adminUser?
            (<>
          <div className="export-data">
              <button onClick={()=>ExportData()}>
                Export
              </button>
          </div>
            </>):(<>
            </>)
          }
          <input
            type="text"
            placeholder="Search by name"
            value={searchName}
            onChange={(e) => {
              setsearchName(e.target.value);
              setnoofPages(1);
            }}
          />
        </div>

        {/* Table */}
        <div className="Table">
          <table border={1}>
            <thead>
              <tr>
                <th>Patient name</th>
                <th>Hospital name</th>
                <th>Blood Group</th>
                <th>Units</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {DatawithPagination.length > 0 ? (
                DatawithPagination.map((data) => (
                  <tr key={data.id}>
                    <td>{data.PatientName}</td>

                    <td>{data.HospitalName}</td>

                    <td>{data.BloodGroupNeed}</td>

                    <td>{data.UnitsRequired}</td>

                    {/* Status */}
                    <td>
                      {adminUser ? (
                        <select
                          value={
                            selectedStatuses[data.id] ??
                            data.status
                          }
                          onChange={(e) =>
                            handleStatusChange(
                              data.id,
                              e.target.value
                            )
                          }
                        >
                          {statusUpdate.map((status) => (
                            <option
                              key={status}
                              value={status}
                            >
                              {status}
                            </option>
                          ))}
                        </select>
                      ) : (
                        data.status
                      )}
                    </td>

                    <td>{data.Date}</td>

                    {/* Action */}
                      
                    <td className="action-btn">
                      {adminUser && (
                        <button
                          disabled={
                            updatingId === data.id ||
                            deletingId === data.id
                          }
                          onClick={() =>
                            UpdateStatus(
                              data.id,
                              selectedStatuses[data.id] ??
                                data.status
                            )
                          }
                        >
                          {updatingId === data.id
                            ? "Updating..."
                            : "Update Status"}
                        </button>
                      )}

                      <div className="del-btn">
                        <button
                          disabled={
                            deletingId === data.id ||
                            updatingId === data.id
                          }
                          onClick={() => DeleteUser(data.id)}
                        >
                          {deletingId === data.id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>No records found</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="Nav-btns">
            {/* Previous */}
            <button
              onClick={() =>
                setnoofPages((prev) => prev - 1)
              }
              disabled={noofPages === 1}
            >
              {"<"}
            </button>

            {/* Page Number */}
            <span>
              {totalPages === 0 ? 0 : noofPages} /{" "}
              {totalPages}
            </span>

            {/* Next */}
            <button
              onClick={() =>
                setnoofPages((prev) => prev + 1)
              }
              disabled={
                noofPages === totalPages ||
                totalPages === 0
              }
            >
              {">"}
            </button>
          </div>
        </div>
      </div>

      {/* Loading Screen */}
      {Process && (
        <div className="ProcessScreen">
          <CircularProgress size={70} />
        </div>
      )}
    </>
  );
});

export default MyBloodRequest;