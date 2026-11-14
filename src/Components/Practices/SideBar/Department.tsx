import { useCallback, useEffect, useState } from "react";
import "./DashBoard.css";
import { FiFilter, FiUpload, FiEdit2, FiTrash2 } from "react-icons/fi";

const Department = () => {
  interface Depart {
    id: number;
    code: string;
    departmentName: string;
    hodName: string;
    email: string;
    programs: string;
    status: string;
  }
  const [DepartmentData, setDisplayDepartment] = useState<Depart[]>([]);
  const [departName, setDepartName] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [sort, setsort] = useState("");
  const [deletePopup, setDeletePopUp] = useState(false);
  const [EditModal, setEditModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [originalStudent, setOriginalStudent] = useState<any>(null);
  const [UpdateDepartmentCode, setUpdateDepartCode] = useState("");
  const [UpdateDepartmentName, setUpdateDepartName] = useState("");
  const [UpdateDepartmenthodName, setUpdateDeparthodName] = useState("");
  const [UpdateDepartmentEmail, setUpdateDepartEmail] = useState("");
  const [UpdatePrograms, setUpdatePrograms] = useState("");
  const [Updatestatus, setStatus] = useState("");
  const [Id,setId]=useState<number|null>(); 

  const fetchDepartment = async () => {
    try {
      const data = await fetch("http://localhost:5000/Department");
      const res = await data.json();
      setDisplayDepartment(res);
    } catch (error) {
      console.log(error);
    }
  };
  const Delete = (id: number) => {
    setDeletePopUp(true);
    setSelectedIndex(id);
  };
  const ConfrimDelete = async (id: number) => {
    try {
      const deleted = await fetch(`http://localhost:5000/Department/${id}`, {
        method: "DELETE",
      });
      if (deleted.ok) {
        setDeletePopUp(false);
        fetchDepartment(); // Reload the updated list
      } else {
        alert("Failed to delete department");
      }
    } catch (error) {}
  };
  const OpenModal = async (id: number) => {
    setEditModal(true);
    const res = await fetch(`http://localhost:5000/Department/${id}`);
    const data = await res.json();
    setOriginalStudent(data);
    setUpdateDepartCode(data.code);
    setUpdateDepartName(data.departmentName);
    setUpdateDeparthodName(data.hodName);
    setUpdateDepartEmail(data.email);
    setUpdatePrograms(data.programs);
    setStatus(data.status);
    setId(data.id);
  };
  const Update = async() => {
    if (
      UpdateDepartmentCode === originalStudent.code &&
      UpdateDepartmentEmail === originalStudent.email &&
      UpdateDepartmentName === originalStudent.departmentName &&
      UpdateDepartmenthodName===originalStudent.hodName &&
      UpdatePrograms===originalStudent.programs && Updatestatus===originalStudent.status
    ) {
      alert("values are same");
    } else {
            try{
              const res = await fetch(`http://localhost:5000/Department/${Id}`,{
                  method:"PUT",
                  headers:{
                     "Content-Type": "application/json",
                  },
                  body:JSON.stringify({
                    code:UpdateDepartmentCode,
                    departmentName:UpdateDepartmentName,
                    hodName:UpdateDepartmenthodName,
                    programs:UpdatePrograms,
                    status:Updatestatus    
                  })
              })
              fetchDepartment();
              setEditModal(false);

            }
            catch(error)
            {
              alert(error)
            }
    }
  };

  useEffect(() => {
    fetchDepartment();
  }, []);

  const FilterDepartMent = DepartmentData.filter((data) =>
    data.departmentName.toUpperCase().includes(departName.toUpperCase()),
  ).sort((a, b) => {
    if (sort === "asc") {
      return (
        a.code.localeCompare(b.code) ||
        a.departmentName.localeCompare(b.departmentName)
      );
    }

    if (sort === "desc") {
      return (
        b.code.localeCompare(a.code) ||
        b.departmentName.localeCompare(a.departmentName)
      );
    }

    return 0;
  });

  const totalPage = 5;
  const startIndex = (pageCount - 1) * totalPage;
  const endIndex = startIndex + totalPage;
  const start = FilterDepartMent.slice(startIndex, endIndex);
  const totalPages = Math.ceil(FilterDepartMent.length / totalPage);
  return (
    <>
      <div className="Main">
      <div className="header-with-btn">
        <div className="header-section-Department">
          <h1>Departments</h1>
          <pre>Manage all the academic Departments in the instution</pre>
        </div>
        </div>
        <div className="btn-addDepartment">
          <button>
            <div style={{ fontSize: "20px" }}>+</div>
            Add Department
          </button>
        </div>
      </div>
      <div className="list_of_items_for_department">
        <pre>Total Students</pre>
        <pre>Department</pre>
        <pre>Programs</pre>
        <pre>Sessions</pre>
      </div>
      <div className="Filter_section">
        <div className="search-text">
          <input
            type="text"
            value={departName}
            onChange={(e) => setDepartName(e.target.value)}
            placeholder="Search By Department Name"
          />
          <div className="Search_icon">&#128269;</div>
        </div>
        <div className="filter-btn">
          <div className="filter-icon">
            <FiFilter />
            <span>Filter</span>
            <select
              className="filter-select"
              onChange={(e) => setsort(e.target.value)}
            >
              <option value="">Filter</option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
          </div>
          <div className="filter-icon">
            <FiUpload />
            <span>Import</span>
            <input type="file" className="file-export" />
          </div>
        </div>
      </div>
      <div className="table">
        <table border={2}>
          <thead>
            <tr>
              <th rowSpan={2}>#</th>
              <th>Department Code</th>
              <th>Department Name</th>
              <th>HOD Name</th>
              <th>Email</th>
              <th>Programs</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {start.map((data, index) => (
              <>
                <tr key={index}>
                  <td>{data.id}</td>

                  <td>{data.code}</td>
                  <td>{data.departmentName}</td>
                  <td>{data.hodName}</td>
                  <td>{data.email}</td>
                  <td>{data.programs}</td>
                  <td className="status-section">
                    <pre>{data.status}</pre>
                  </td>
                  <td>
                    <div className="btn-edit-delete">
                      <FiEdit2
                        size={18}
                        color="#0ea5a8"
                        onClick={() => OpenModal(data.id)}
                      />{" "}
                      <FiTrash2
                        onClick={() => Delete(data.id)}
                        size={18}
                        color="red"
                      />
                    </div>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
      <div className="Pagination">
        <div className="">
          <pre>Navigation</pre>
        </div>
        <div className="Pagination-bts">
          <button
            onClick={() => setPageCount((prev) => prev - 1)}
            disabled={pageCount === 1}
          >
            Previous
          </button>
          <div className="page-count">{pageCount}</div>
          <button
            onClick={() => setPageCount((prev) => prev + 1)}
            disabled={pageCount === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <div>
        {deletePopup && (
          <>
            <div className="delete-popup">
              <div className="delete-description">
                <h1>Delete</h1>
                <div className="confrimation-btn">
                  <button onClick={() => setDeletePopUp((prev) => !prev)}>
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (selectedIndex !== null) {
                        ConfrimDelete(selectedIndex);
                      }
                    }}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div>
        {EditModal && (
          <>
            <div className="edit-popup">
              <div className="edit-description">
                <div className="edit-header">
                  <h2>Edit The Details</h2>
                  <div onClick={() => setEditModal(false)}>X</div>
                </div>
                <div className="edit-details">
                  <div className="row1-for-update-data">
                    <label>
                      {" "}
                      DepartmentCode
                      <br />
                      <input
                        type="text"
                        value={UpdateDepartmentCode}
                        onChange={(e) => setUpdateDepartCode(e.target.value)}
                      />
                    </label>
                    <label>
                      {" "}
                      Department Name
                      <br />
                      <input
                        type="text"
                        value={UpdateDepartmentName}
                        onChange={(e) => setUpdateDepartName(e.target.value)}
                      />
                    </label>
                  </div>
                  <div className="row2-for-update-data">
                    <label>
                      {" "}
                      HOD Name
                      <br />
                      <input
                        type="text"
                        value={UpdateDepartmenthodName}
                        onChange={(e) => setUpdateDeparthodName(e.target.value)}
                      />
                    </label>
                    <label>
                      {" "}
                      Email
                      <br />
                      <input
                        type="text"
                        value={UpdateDepartmentEmail}
                        onChange={(e) => setUpdateDepartEmail(e.target.value)}
                      />
                    </label>
                  </div>
                </div>
                <div className="row3-for-update-data">
                  <div className="textBox-for-programs">
                    <label>
                      {" "}
                      Programs
                      <br />
                      <input
                        type="text"
                        placeholder="Programs"
                        value={UpdatePrograms}
                        onChange={(e) => setUpdatePrograms(e.target.value)}
                      />
                    </label>
                  </div>
                  <div className="drop-down">
                    <select
                      value={Updatestatus}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div>
                  <div className="btn-for-update-cancel">
                    <button onClick={() => setEditModal((prev) => !prev)}>
                      Cancel
                    </button>
                    <button onClick={Update}>Update Department</button>
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
export default Department;
