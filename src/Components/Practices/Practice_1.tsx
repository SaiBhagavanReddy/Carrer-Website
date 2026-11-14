import { useState } from "react";

const Table_filter = () => {
const [val ,setVal]= useState("");
  let users_Data = [
    {
      name: "sai",
      role: "web",
    },
    {
      name: "nani",
      role: "java",
    },
    {
      name: "jai",
      role: "Backend",
    },
    {
      name: "laya",
      role: "Frontend",
    },
    {
      name: "kiran",
      role: "Testing",
    },
    {
      name: "ram",
      role: "DevOps",
    },
    {
      name: "vamsi",
      role: "Backend",
    },
    {
      name: "teja",
      role: "web",
    },
    {
      name: "akhil",
      role: "java",
    },
    {
      name: "surya",
      role: "UI/UX",
    },
  ];
 const filteredData = users_Data.filter((item) =>
  item.role.toLowerCase().includes(val.toLowerCase())
);
  return (
    <>
      <div>
        <center>
          <h1>Filtering the table data</h1>
          <input type="text" value={val} onChange={(e)=>setVal(e.target.value)} placeholder="Enter name or job role"/><br/><br/>
          <table border={2}>
            <thead>
              <tr>
                <th>Emp:Name</th>
                <th>Emp:Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((na, index) => (
                <tr key={index}>
                  <td>{na.name}</td>
                  <td>{na.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </center>
      </div>
    </>
  );
};
export default Table_filter;
