import { useEffect, useState } from "react";
import "../../Practices/StudentProject/Search.css";
import { useNavigate } from "react-router-dom";

const Search_for_Std = () => {
  const [storeName, setName] = useState("");
  const nav = useNavigate();

  interface Student {
    id: number;
    name: string;
    branch: string;
    percentage: number;
    year: number;
    img: string;
  }
  const [std, setStds] = useState<Student[]>([]);
  const [retrivePercentage, setRetrivePercentage] = useState("");
  const [valuePerpage, setValuePerPage] = useState(1);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/users");

      const students = await response.json();
      setStds(students);
    } catch (error) {
      alert("Json is server is not connected");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [Order, setOrder] = useState("");
  const filterStdData = std
    .filter((student) => {
      const matchName =
        storeName === "" ||
        student.name.toLowerCase().includes(storeName.toLowerCase());

      let matchPercentage = true;

      if (retrivePercentage === "90") {
        matchPercentage = student.percentage > 90;
      } else if (retrivePercentage === "80") {
        matchPercentage = student.percentage < 80;
      } else if (retrivePercentage === "65") {
        matchPercentage = student.percentage < 65;
      }

      return matchName && matchPercentage;
    })
    .sort((a, b) => {
      if (Order === "ASC") {
        return a.name.localeCompare(b.name);
      }
      return b.name.localeCompare(a.name);
    });
  const numberOfRows = 5;
  const startIndex = (valuePerpage - 1) * numberOfRows;
  const endIndex = startIndex + numberOfRows;
  const dataToDisplay = filterStdData.slice(startIndex, endIndex);

  return (
    <>
      <div className="main-for-std">
        <h2>Student Search</h2>
        <input
          type="text"
          placeholder="Search by student name..."
          value={storeName}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="btn-filter">
          <button onClick={() => nav("/add")}>Add</button>
          <button onClick={() => nav("/delete")}>Delete</button>
          <button onClick={() => nav("/update")}>Update</button>
          <select onChange={(e) => setRetrivePercentage(e.target.value)}>
            <option value="">Percentage</option>
            <option value="90">Above 90</option>
            <option value="70-80">70-80</option>
            <option value="65">Below 65</option>
          </select>
          <div className="total-stds">
            <span>Total Students - {dataToDisplay.length}</span>
          </div>
          <select
            onChange={(e) => {
              setOrder(e.target.value);
            }}
          >
            <option value={"ASC"}>A-Z</option>
            <option value={"DSC"}>Z-A</option>
          </select>
        </div>
      </div>

      <div className="details">
        <table border={1}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Branch</th>
              <th>Percentage</th>
              <th>Year</th>
            </tr>
          </thead>

          <tbody>
            {filterStdData.length > 0 ? (
              dataToDisplay.map((student): any => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.branch}</td>
                  <td>{student.percentage}</td>
                  <td>{student.year}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No Student Found</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="nav-btn-main">
          <button
            className="NavBtn"
            disabled={valuePerpage === 1}
            style={{ cursor: valuePerpage === 1 ? "Not-allowed" : "" }}
            onClick={() => setValuePerPage((prev) => prev - 1)}
          >
            Prev
          </button>
          <button
            className="NavBtn"
            disabled={valuePerpage === numberOfRows}
            onClick={() => setValuePerPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};
export default Search_for_Std;
