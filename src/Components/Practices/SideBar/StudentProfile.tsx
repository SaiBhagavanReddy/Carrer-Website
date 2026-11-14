import { useEffect, useState } from "react";
import "../SideBar/StudentProfile.css";
// import EmptyImg from "../../../../src/assets/Empty.png";
import { FaCamera } from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";
import IdCard from "../../Practices/SideBar/IdCard.tsx";
import {
  HiOutlineClipboardDocumentCheck,
  HiOutlineChartBar,
  HiOutlineWallet,
  HiOutlineDocumentCheck,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const StudentProfile = () => {
  const [img, setPreview] = useState<string | "">("");
  const [edit, setEdit] = useState(true);
  const [gender, setGender] = useState("Male");
  const [genderedit, setgenderEdit] = useState(false);
  const [nationality, setNationality] = useState("Indian");
  const [RollNo, setRollNo] = useState("02-0315");
  const nav = useNavigate();
  const setImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };
  const getData = async () => {
    const res = await fetch(`http://localhost:5001/Students?RollNo=${RollNo}`);
    if (res.ok) {
      return true;
    } else {
      return false;
    }
  };

  const SendData = async () => {
    const res = await fetch("http://localhost:5001/Students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gender: gender,
        RollNo: RollNo,
      }),
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      const exists = await getData();

      if (exists) {
        return;
      }

      await SendData();
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="StudentProfileMain">
        <div className="Profileheader">
          <h2>StudentProfile</h2>
          <pre>View and update your personal details</pre>
        </div>
        <div className="edit-btn">
          <button
            onClick={() => {
              setgenderEdit((prev) => !prev);
              setEdit((prev) => !prev);
            }}
          >
            {edit ? "edit" : "Save"}
          </button>
        </div>
      </div>

      <div className="profileData">
        <div className="details">
          <div className="Profile">
            <div className="selectFile">
              <div className="HideInput">
                <div className="camera-icon">
                  <FaCamera style={{ color: "white" }} />
                </div>
              </div>
              <input type="file" accept="image" onChange={(e) => setImage(e)} />
            </div>
            <div className="preview-image">
              {/* <img src={img ? img : EmptyImg} /> */}
            </div>
          </div>

          {edit ? (
            <>
              <div className="education detailsAlign">
                <h3>J Sai Bhagavan Reddy</h3>
                <label>CSE-3rd Year </label>
                <span>{"02-0315"}</span>
                <label>
                  <span>jsai@gmail.com</span>
                </label>
                <label>
                  <span>8074778566</span>
                </label>
              </div>
            </>
          ) : (
            <>
              <div className="education detailsAlign">
                <h3>J Sai Bhagavan Reddy</h3>
                <label>CSE-3rd Year </label>
                <input value={"02-0315"} className={edit ? "EditData" : ""} />
                <pre>jsai@gmail.com</pre>
                <input
                  value={"8074778566"}
                  className={edit ? "EditData" : ""}
                />
              </div>
            </>
          )}

          <div className="Dob detailsAlign">
            {edit ? (
              <>
                <label>Date of Birth</label>
                <span>12-10-2001</span>
              </>
            ) : (
              <>
                <label>Date of Birth</label>
                <input
                  type="date"
                  className="EditData"
                  value="2001-10-12"
                  readOnly={edit}
                />
              </>
            )}
            {genderedit ? (
              <>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={gender === "Male"}
                    onChange={(e) => setGender(e.target.value)}
                    defaultValue="Male"
                  />
                  Male
                </label>

                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={gender === "Female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  Female
                </label>
              </>
            ) : (
              <span>{gender}</span>
            )}
            {edit ? (
              <span>{nationality}</span>
            ) : (
              <select
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
              >
                <option value="Indian">Indian</option>
                <option value="American">American</option>
              </select>
            )}
          </div>
          <div className="class detailsAlign">
            <label>Addmission Year</label>{" "}
            <input
              type="year"
              className={edit ? "EditData" : ""}
              value="2024"
              readOnly={!edit}
            />
            <label>Roll number</label>{" "}
            <input
              type="text"
              className={edit ? "EditData" : ""}
              value={RollNo}
              readOnly={!edit}
            />
            <label>Student Status</label>{" "}
            <input
              type="text"
              className={edit ? "EditData" : ""}
              value={"Active"}
            />
          </div>
          {edit ? (
            <>
              <div>
                <div className="QrCode">
                  <div className="QrCode-header">
                    <span>Student ID Card</span>
                  </div>
                  <QRCodeSVG value={"saddsa"} />
                  <div className="Id_Download">
                    <IdCard gender={gender} RollNo={RollNo} />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className={edit ? "" : "details"}></div>
          )}
        </div>
      </div>
      <div className="Academic-details">
        <div className="Academic-dataOne">
          <HiOutlineClipboardDocumentCheck
            className="Icon1"
            size={38}
            color="red"
          />
          <div className="AttendenceData">
            <h3>Attendence</h3>
            <span>
              <pre>88%</pre>
            </span>
            <span>
              <strong>This month</strong>
            </span>
          </div>
          <div>
            <button onClick={() => nav("/Attendance")}
              >{">"}</button>
            
            
            </div>
        </div>
        <div className="Academic-dataTwo ">
          <HiOutlineChartBar size={36} color="red" className="Icon2" />
          <div className="Main">

         
          <div className="AttendenceData">
            <h3>Results</h3>
            <span>
              <pre>CGPA 8.90</pre>
            </span>
            <span>
              <strong>View sem results</strong>
            </span>
           
          </div> 
          <div>
            {">"}
            </div>
          </div>
           
        </div>
        <div className="Academic-dataThree">
          <HiOutlineWallet size={36} color="red" className="Icon3" />
          <div className="Main">
          <div className="AttendenceData">
            <h3>Fee Payment</h3> 
             <span>
              <pre>Status:Paid</pre>
            </span>
            <span>
              <strong>View payment history</strong>
            </span>
          </div>
            <div>
            {">"}
            </div>
        </div>
        </div>
        <div className="Academic-dataFour">
          <HiOutlineDocumentCheck className="Icon4" size={36} color="red" />
          <div className="Main">
          <div className="AttendenceData">
            <h3>Assignments</h3> 
            <span>
              <pre>4: Pending</pre>
            </span>
            <span>
              <strong>View and submit</strong>
            </span>
          </div>
            <div>
            {">"}
            </div>
        </div>

          </div>
        </div>
    </>
  );
};
export default StudentProfile;
