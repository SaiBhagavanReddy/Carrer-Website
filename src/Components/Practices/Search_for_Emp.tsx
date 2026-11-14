import { useState, useMemo } from "react";
import "../../../src/Components/Practices/Search.css";
import { FaSearch } from "react-icons/fa";

// import SearchIcon from "@mui/icons-material/Search";

function Search_for_Emp() {
  const employees = [
    {
      id: 1,
      name: "John Smith",
      department: "Developer",
      salary: 2000,
      status: "Online",
    },
    {
      id: 2,
      name: "Alice Johnson",
      department: "HR",
      salary: 52000,
      status: "Offline",
    },
    {
      id: 3,
      name: "Michael Brown",
      department: "Developer",
      salary: 4000,
      status: "Online",
    },
    {
      id: 4,
      name: "David Wilson",
      department: "Testing",
      salary: 48000,
      status: "Offline",
    },
    {
      id: 5,
      name: "Sarah Davis",
      department: "Manager",
      salary: 95000,
      status: "Online",
    },
    {
      id: 6,
      name: "Emma Taylor",
      department: "Developer",
      salary: 5000,
      status: "Online",
    },
    {
      id: 7,
      name: "James Anderson",
      department: "Testing",
      salary: 55000,
      status: "Offline",
    },
    {
      id: 8,
      name: "Sophia Martin",
      department: "HR",
      salary: 60000,
      status: "Online",
    },
    {
      id: 9,
      name: "Daniel Thomas",
      department: "Developer",
      salary: 72000,
      status: "Online",
    },
    {
      id: 10,
      name: "Olivia White",
      department: "Manager",
      salary: 98000,
      status: "Offline",
    },
    {
      id: 11,
      name: "William Harris",
      department: "Testing",
      salary: 51000,
      status: "Online",
    },
    {
      id: 12,
      name: "Isabella Clark",
      department: "HR",
      salary: 58000,
      status: "Online",
    },
    {
      id: 13,
      name: "Benjamin Lewis",
      department: "Developer",
      salary: 3000,
      status: "Offline",
    },
    {
      id: 14,
      name: "Mia Walker",
      department: "Testing",
      salary: 47000,
      status: "Online",
    },
    {
      id: 15,
      name: "Ethan Hall",
      department: "Manager",
      salary: 91000,
      status: "Offline",
    },
    {
      id: 16,
      name: "Charlotte Allen",
      department: "Developer",
      salary: 76000,
      status: "Online",
    },
    {
      id: 17,
      name: "Alexander Young",
      department: "HR",
      salary: 64000,
      status: "Offline",
    },
    {
      id: 18,
      name: "Amelia King",
      department: "Testing",
      salary: 53000,
      status: "Online",
    },
    {
      id: 19,
      name: "Henry Scott",
      department: "Developer",
      salary: 89000,
      status: "Online",
    },
    {
      id: 20,
      name: "Grace Green",
      department: "Manager",
      salary: 102000,
      status: "Offline",
    },
  ];
  const sortBtn = ["All", "Developer", "HR"];

  const [department, setDepartment] = useState("All");
  const [search, setSearch] = useState("");
  const [salary, sortSalary] = useState(0);

  const filterData = useMemo(() => {
    return employees.filter((emp) => {
      const matchSearch =
        search === "" || emp.name.toLowerCase().includes(search.toLowerCase());

      const matchDepartment =
        department === "All" || emp.department === department;

      let matchSalary = true;

      if (salary == 5000) {
        matchSalary = emp.salary > 5000;
      } else if (salary == 7000) {
        matchSalary = emp.salary < 7000;
      } else if (salary == 10000) {
        matchSalary = emp.salary > 100000;
      }

      return matchSearch && matchDepartment && matchSalary;
    });
  }, [search, department, salary]);
  return (
    <>
    <div className="main-cls">
      <div className="header">
        <h1>
          EMPLYOEE HISTORY 
        </h1>
        
      </div>
      <div className="btn-to-Search">
        <div className="searchwithIcon">
        <input
          type="text"
          value={search}
          placeholder="Search by Name"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="searchIcon">
        <FaSearch/>
        </div>
</div>

        {/* <SearchIcon/> */}
        <div className="btn-list">
          {sortBtn.map((btn, index) => (
            <button
              key={index}
              className={department === btn ? "active " : ""}
              onClick={() => setDepartment(btn)}
            >
              {btn}
            </button>
          ))}
          <select
            onChange={(e) => {
              sortSalary(Number(e.target.value));
            }}
          >
            <option>Choose the Salary range</option>
            <option value={5000}>Salart greater than 5000</option>
            <option value={7000}>Salart less than 7000</option>
            <option value={100000}>Salart greater than 100000</option>
          </select>
        </div>
      
      </div>
      <div className="Emp-list">
         <p>
              Total Employee - {employees.length}
          </p>     
          <p>
            Showing Employe - {filterData.length}
          </p>
      </div>
      <div className="Search_header">
        {filterData.length > 0 ? (
          filterData.map((employee) => (
            <div className="main_search" key={employee.id}>
              <h2>{employee.name}</h2>
              <p style={{ color: "blue" }}>{employee.department}</p>
              <p style={{ color: "green" }}>{`$` + employee.salary}</p>
            </div>
          ))
        ) : (
          <p className="no-data">No Employee Data Available</p>
          
        )}
      </div>
      </div>
    </>
  );
}
export default Search_for_Emp;
