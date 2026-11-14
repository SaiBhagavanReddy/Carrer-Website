import { useCallback, useState } from "react";
import "../CSS/Form.css";
import { FiUploadCloud } from "react-icons/fi";
const FormApplication = () => {
  const [error,SetErrorPop] =  useState(false);
  const months = [
    "Jan",
    "Feb",
    " Mar",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  const years = [
    2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011,
    2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
    2024, 2025, 2026,
  ];
  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "React Developer",
    "Java Developer",
    "Python Developer",
    "Software Engineer",
    "Web Developer",
    "UI/UX Designer",
    "QA Engineer",
  ];
  const submit =useCallback(()=>{
          SetErrorPop(true);
  },[])
  const close = useCallback(()=>{
    SetErrorPop(false);
  },[])
  const sources = ["linkden", "JobPortal", "Job Referal", "Carrer Website"];
  return (
    <>
      <div className="Main">
        <div className="HeaderSection">
          <div className="Head">
            <h1>Job Application</h1>
            <pre>
              Please complete the form below to apply for a position with us.
            </pre>

            <hr />
            <div>
              <h2>Full Name</h2>
            </div>
            <div className="Full_name">
              <input />
              <input />
              <input />
            </div>
            <div className="sub-names">
              <pre>First Name</pre>
              <pre>Middle Name</pre>
              <pre>Last Name</pre>
            </div>
            <div className="Date_of_Birth">
              <select>
                {months.map((mon, index) => (
                  <>
                    <option key={index}>{mon}</option>
                  </>
                ))}
              </select>
              <select>
                {days.map((day, index) => (
                  <>
                    <option key={index}>{day}</option>
                  </>
                ))}
              </select>
              <select>
                {years.map((year, index) => (
                  <>
                    <option key={index}>{year}</option>
                  </>
                ))}
              </select>
            </div>
            <div className="dob_substitles">
              <pre>Month</pre>
              <pre>Date</pre>
              <pre>Year</pre>
            </div>
            <div className="address">
              <pre>Address</pre>
              <input type="" />
            </div>
            <div className="data">
              <div className="email-phone">
                <label>Phone Number</label>
                <label>Email</label>
              </div>
              <div className="form-group">
                <input type="email" />
                <input type="tel" />
              </div>
            </div>
            <div className="linkden">
              <pre>Linkden</pre>
              <input />
            </div>
            <hr style={{ marginTop: "30px" }} />
            <div className="job-details">
              <pre>Position Applied</pre>
              <pre>How did you hear about us</pre>
            </div>
            <div className="position-apply">
              <select>
                {roles.map((role, index) => (
                  <>
                    <option key={index}>{role}</option>
                  </>
                ))}
              </select>
              <select>
                {sources.map((source, index) => (
                  <>
                    <option key={index}>{source}</option>
                  </>
                ))}
              </select>
            </div>
            <div>
              <pre>Upload your Resume</pre>
              <div className="Resume">
                <label htmlFor="resume-upload">
                  <FiUploadCloud className="cloud-icon" />
                  <h3>Browse Files</h3>
                  <p>Drag & Drop files here</p>
                </label>

                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                />
              </div>
            </div>
            <div className="cover-letter">
              <pre>Cover Letter</pre>
              <textarea />
            </div>
            <hr />
            <div className="ApplyButton">
              <button onClick={submit}>Apply</button>
            </div>
          </div>
          {
            error&&(
              <>
              <div className="Error-popup">
            <div className="error-data">
              <div className="description">
                <h1>Please fill before submitting</h1>
                <div>
                  <button onClick={close}>Close</button>
                </div>
              </div>
            </div>
          </div></>
            )
          }

          
        </div>
      </div>
    </>
  );
};
export default FormApplication;
