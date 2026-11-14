import { useState } from "react";
import "../../Practices/SideBar/IdCard.css";
import CloseIcon from "@mui/icons-material/Close";
import { QRCodeSVG } from "qrcode.react";
import { FiDownload } from "react-icons/fi";

const IdCard = (props: any) => {
  const [OpenIdModal, setOpenIdModal] = useState(false);
  const [downloadformatType, setDownloadType] = useState("PDF");
  const downloadText = () => {
    const text = `
ABC College

Student ID Card
Roll Number : ${props.RollNo}
Gender : ${props.gender}
  `;

    const blob = new Blob([text], { type: "text/plain" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download =  `Student.${downloadformatType}`;
    link.click();
    URL.revokeObjectURL(url);
  };
  return (
    <>
      <div>
        <span onClick={() => setOpenIdModal(true)}>Download ID Card</span>
      </div>
      {OpenIdModal && (
        <div className="Id-modal">
          <div className="Modal">
            <div className="Header_With_Close-btn">
              <div className="headerofId">
                <h3>Download StudentId Card</h3>
              </div>
              <div className="Closebtn">
                <CloseIcon onClick={() => setOpenIdModal((prev) => !prev)} />
              </div>
            </div>
            <div className="Card-details">
              <div className="">
                <span>
                  <h4>ABC College</h4>
                  <span>Student Id Card</span>
                </span>
              </div>
              <div className="detailsOfEachCard">
                <span>
                  <h2>Gender:</h2> <span>{props.gender}</span>
                </span>
                <div className="QrCodewithNumber">
                  <h2>
                    Roll Number:{" "}
                    <span style={{ fontStyle: "unset" }}>{props.RollNo}</span>
                  </h2>
                  <div className="QRcode">
                    <QRCodeSVG value={props.RollNo} />
                  </div>
                </div>
              </div>
            </div>
            <div className="DownloadFormat">
              <div className="formatSelection">Choose Format</div>
              <div>
                <label>
                  <input
                    type="radio"
                    value="PDF"
                    checked={downloadformatType === "PDF"}
                    onChange={(e) => setDownloadType(e.target.value)}
                  />
                  PDF
                </label>

                <label>
                  <input
                    type="radio"
                    value="DOC"
                    checked={downloadformatType === "DOC"}
                    onChange={(e) => setDownloadType(e.target.value)}
                  />
                  DOC
                </label>

                <label>
                  <input
                    type="radio"
                    value="JPG"
                    checked={downloadformatType === "JPG"}
                    onChange={(e) => setDownloadType(e.target.value)}
                  />
                  JPG
                </label>
              </div>
              <div className="download-cls">
                <button onClick={() => setOpenIdModal(false)}>Close</button>
                <div className="download-btn">
                  <button onClick={() => downloadText()}>
                    <FiDownload />
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default IdCard;
