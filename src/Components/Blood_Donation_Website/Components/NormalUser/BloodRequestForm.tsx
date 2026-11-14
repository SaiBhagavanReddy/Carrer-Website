import { useEffect, useState } from "react";
import { FaFileCsv, FaFileCode, FaFileExcel, FaFileAlt } from "react-icons/fa";
import ProcessScreen from "../../Common/ProcessScreen";
const BloodRequestForm = () => {
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  interface FileType {
    fileIcon: any;
    header: string;
    text: string;
    button: string;
  }
  const fileTypes: FileType[] = [
    {
      fileIcon: FaFileCsv,
      header: "csv",
      text: "Download as Csv",
      button: ".Csv",
    },
    {
      fileIcon: FaFileCode,
      header: "JSON File",
      text: "Download as JSON",
      button: ".Json",
    },
    {
      fileIcon: FaFileExcel,
      header: "Excel Sheet",
      text: "Download as Excel sheet",
      button: ".xslx",
    },
    {
      fileIcon: FaFileAlt,
      header: "Text File",
      text: "Download as text file",
      button: ".text",
    },
  ];
  interface UserData {
    PatientName: string;
    HospitalName: string;
    BloodGroupNeed: string;
    UnitsRequired: number;
    HospitalAddress: string;
    AdditionalDetail: string;
    Contactnumber: number;
    date: string;
  }
  const [userData, setuserData] = useState<UserData>({
    PatientName: "",
    HospitalName: "",
    BloodGroupNeed: "",
    UnitsRequired: 0,
    HospitalAddress: "",
    AdditionalDetail: "",
    Contactnumber: 0,
    date: "",
  });
  const [successMsg, setsuccessMsg] = useState(false);
  const [allowDownload, setallowDownload] = useState(true);
  const [downloadFiletypeModal, setdownloadFiletypeModal] = useState(false);
  const [cleanData, setcleanData] = useState(false);
  const [ProcessScreenforBloodReq, setProcessScreen] = useState(false);
  const SubmitRequest = async (e: any) => {
    e.preventDefault();
    setProcessScreen(true);
    try {
      const res = await fetch("http://localhost:5005/DonationData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          PatientName: userData.PatientName,
          HospitalName: userData.HospitalName,
          BloodGroupNeed: userData.BloodGroupNeed,
          UnitsRequired: userData.UnitsRequired,
          HospitalAddress: userData.HospitalAddress,
          AdditionalDetail: userData.AdditionalDetail,
          Date: userData.date,
        }),
      });
      if (res.ok) {
        setProcessScreen(true);
        setTimeout(() => {
          setallowDownload(false);
          setsuccessMsg(true);
          setProcessScreen(false);
        }, 1000);
        return;
      } else {
        alert("Not");
      }
    } catch (Error) {}
  };
  const Download = () => {
    setdownloadFiletypeModal((prev) => !prev);
  };
  const DownloadWithFileType = (fileType: string, fileName: string) => {
    const jsonData = JSON.stringify(userData);
    const blobData = new Blob([jsonData], {
      type: "json",
    });
    const url = URL.createObjectURL(blobData);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}${fileType}`;
    link.click();
    setcleanData((prev) => !prev);
  };
  const CloseModal = () => {
    setdownloadFiletypeModal((prev) => !prev);
  };
  useEffect(() => {
    setuserData({
      PatientName: "",
      HospitalName: "",
      BloodGroupNeed: "",
      UnitsRequired: 0,
      HospitalAddress: "",
      AdditionalDetail: "",
      Contactnumber: 0,
      date: "",
    });
  }, [cleanData]);

  return (
    <>
      <div className="BloodRequestForm_main">
        <div className="Br">
          <h2>Blood Request</h2>
          <span>Fill the form in-order to request</span>
        </div>
        <div className="Blood-request-data">
          <div className="Blood-request-header">
            <h2>Blood Request Form</h2>
          </div>
          <form onSubmit={(e) => SubmitRequest(e)}>
            <div className="Blood-request-userData">
              <div className="row1">
                <label className="Blood-label">
                  <span className="label-with-required">
                    Patient Name <span style={{ color: "red" }}>*</span>
                  </span>

                  <input
                    type="text"
                    required
                    value={userData.PatientName}
                    onChange={(e) =>
                      setuserData({
                        ...userData,
                        PatientName: e.target.value,
                      })
                    }
                  />
                </label>
                <label className="Blood-label">
                  <span className="label-with-required">
                    Hospital Name <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    type="text"
                    required
                    value={userData.HospitalName}
                    onChange={(e) =>
                      setuserData({
                        ...userData,
                        HospitalName: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
              <div className="row2">
                <label className="Blood-label">
                  <span className="label-with-required">
                    Blood Group Need <span style={{ color: "red" }}>*</span>
                  </span>
                  <select
                    required
                    onChange={(e) =>
                      setuserData({
                        ...userData,
                        BloodGroupNeed: e.target.value,
                      })
                    }
                    value={userData.BloodGroupNeed}
                  >
                    {bloodGroups.map((data, ind) => (
                      <>
                        <option key={ind}>{data}</option>
                      </>
                    ))}
                  </select>
                </label>
                <label className="Blood-label">
                  <span className="label-with-required">
                    Units Required <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    type="number"
                    required
                    value={userData.UnitsRequired}
                    onChange={(e) =>
                      setuserData({
                        ...userData,
                        UnitsRequired: Number(e.target.value),
                      })
                    }
                  />
                </label>
              </div>
              <div className="row3">
                <label className="Blood-label">
                  <span className="label-with-required">
                    Requried Date: <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    type="date"
                    required
                    value={userData.date}
                    onChange={(e) =>
                      setuserData({ ...userData, date: e.target.value })
                    }
                  />
                </label>
                <label className="Blood-label">
                  <span className="label-with-required">
                    Contact number <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    type="number"
                    required
                    value={userData.Contactnumber}
                    onChange={(e) =>
                      setuserData({
                        ...userData,
                        Contactnumber: Number(e.target.value),
                      })
                    }
                  />
                </label>
              </div>
              <div className="row4">
                <label className="Blood-label">
                  <span className="label-with-required">
                    Hospital Address <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    type="textarea"
                    required
                    value={userData.HospitalAddress}
                    onChange={(e) =>
                      setuserData({
                        ...userData,
                        HospitalAddress: e.target.value,
                      })
                    }
                  />
                </label>
                <label className="Blood-label">
                  <span className="label-with-required">
                    Reason/Additiona Detail
                    <span style={{ color: "red" }}>*</span>
                  </span>
                  <input
                    type="textarea"
                    required
                    value={userData.AdditionalDetail}
                    onChange={(e) =>
                      setuserData({
                        ...userData,
                        AdditionalDetail: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
              <div className="successMsg">
                {successMsg && (
                  <>
                    <span style={{ color: "green", textAlign: "center" }}>
                      Request has been raised now, You can download the data
                    </span>
                  </>
                )}
              </div>
              <div className="Submit-btn">
                <button>Submit Request</button>
              </div>
            </div>
          </form>
          <div className="Download-btn">
            <button
              onClick={() => Download()}
              className={allowDownload ? "notAllowed" : "acceptDownload"}
              disabled={allowDownload}
            >
              Download Details
            </button>
          </div>
        </div>

        {downloadFiletypeModal && (
          <>
            <div className="download-data-with-types">
              <div className="download-data-main">
                <div className="Header-for-download">
                  <h2>Select the Download File type</h2>
                  <p>
                    Choose the file format to download the blood request details
                  </p>
                </div>
                <div className="file-type">
                  {fileTypes.map((data, ind) => {
                    const Icon = data.fileIcon;
                    return (
                      <div
                        key={ind}
                        className="File-type-template-for-Download"
                      >
                        <pre>
                          <Icon size={20} />
                        </pre>
                        <h2>{data.header}</h2>
                        <pre>{data.text}</pre>
                        <div className="btn-download">
                          <button
                            onClick={() => {
                              DownloadWithFileType(data?.button, data?.header);
                            }}
                          >
                            {data.button}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="del-btn">
                  <button onClick={() => CloseModal()}>Close</button>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="ProcessScreen">
          {ProcessScreenforBloodReq && (
            <>
              <ProcessScreen />
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default BloodRequestForm;
