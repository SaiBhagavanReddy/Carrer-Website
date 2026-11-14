import { useNavigate } from "react-router-dom";
import "../SideBar/Attendence.css";
import { FiDownload } from "react-icons/fi";
const Attendence = () => {
  const attendanceData = [
    {
      id: 1,
      subject: "Operating Systems",
      faculty: "Dr. Kumar",
      classesHeld: 28,
      classesAttended: 24,
      classesAbsent: 4,
      attendance: 86,
      status: "Good",
    },
    {
      id: 2,
      subject: "Database Management Systems",
      faculty: "Mrs. Rathi",
      classesHeld: 26,
      classesAttended: 22,
      classesAbsent: 4,
      attendance: 85,
      status: "Good",
    },
    {
      id: 3,
      subject: "Computer Networks",
      faculty: "Mr. Prakash",
      classesHeld: 24,
      classesAttended: 20,
      classesAbsent: 4,
      attendance: 83,
      status: "Average",
    },
    {
      id: 4,
      subject: "Software Engineering",
      faculty: "Mrs. Kavya",
      classesHeld: 22,
      classesAttended: 18,
      classesAbsent: 4,
      attendance: 82,
      status: "Average",
    },
    {
      id: 5,
      subject: "Web Technologies",
      faculty: "Mr. Arjun",
      classesHeld: 20,
      classesAttended: 18,
      classesAbsent: 2,
      attendance: 90,
      status: "Excellent",
    },
    {
      id: 6,
      subject: "Java Programming",
      faculty: "Mrs. Priya",
      classesHeld: 30,
      classesAttended: 28,
      classesAbsent: 2,
      attendance: 93,
      status: "Excellent",
    },
    {
      id: 7,
      subject: "Data Structures",
      faculty: "Mr. Suresh",
      classesHeld: 27,
      classesAttended: 24,
      classesAbsent: 3,
      attendance: 89,
      status: "Good",
    },
    {
      id: 8,
      subject: "Computer Organization",
      faculty: "Mr. Ravi",
      classesHeld: 21,
      classesAttended: 17,
      classesAbsent: 4,
      attendance: 81,
      status: "Average",
    },
  ];
  const navigation = useNavigate();
  return (
    <>
      <div className="Attendence-main">
        <div className="Attendence-Header">
          <div className="HeaderPart">
            Attendence , <br />
            <pre>Track your Attendance and class</pre>
          </div>
          <div className="btn-section">
            <select>
              <option>Semester01</option>
            </select>

            <button>
              <div className="btn-with-icon">
                <FiDownload />
                Download Report
              </div>
            </button>
          </div>
        </div>
        <div className="attendanceData">
          <h2>Subject wise Attendence</h2>
          <div className="TableData">
            <table border={2}>
              <thead className="tablethead">
                <tr className="tablerow">
                  <th>Subject</th>
                  <th>Classes Held</th>
                  <th>Classes Attended</th>
                  <th>Classes Absent</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.subject}</td>
                    <td>{item.classesHeld}</td>
                    <td>{item.classesAttended}</td>
                    <td>{item.classesAbsent}</td>
                    <td>{item.attendance}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="back-btn">
          <button onClick={()=>navigation("/")}>
            Back
          </button>
        </div>
      </div>
    </>
  );
};
export default Attendence;
