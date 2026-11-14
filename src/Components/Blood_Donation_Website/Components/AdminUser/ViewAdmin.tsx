import { useEffect, useState } from "react";
import "../../Css/ViewAdmin.css";
const ViewAdmin = () => {
  interface AdminDetails {
    Admin: string;
    Password: string;
    date?: number;
  }
  const [AdminData, setAdminData] = useState<AdminDetails[]>([]);
  const fetchAdmin = async () => {
    try {
      const url = await fetch("http://localhost:5006/AdminUser");
      const res = await url.json();
      setAdminData(res);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    fetchAdmin();
  }, []);
  return (
    <>
      <div className="ViewAdminMain">
        <div className="ViewAdmin-header">
          <h2>View All Admins Details</h2>
          <pre>Verify all the Admin data with created Date</pre>
        </div>
        <div>
          <table border={2}>
            <thead>
              <tr>
                <th>Admin Name</th>
                <th>Password</th>
                <th>Date Of Created</th>
              </tr>
            </thead>
            <tbody>
              {AdminData.map((data, ind) => (
                <>
                  <tr key={ind}>
                    <td>{data.Admin}</td>
                    <td>{data.Password}</td>
                    <td>{data?.date}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default ViewAdmin;
