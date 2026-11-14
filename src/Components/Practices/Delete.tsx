import { useState } from "react";
import "../Practices/Add.css";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { createPortal } from "react-dom";
const Delete = () => {
  const nav = useNavigate();

  const [deleteId, setDelete] = useState<number | "">("");
  const [error, showError] = useState(false);
  const [processScreen, showProcessScreen] = useState(false);
  const [popup, setPop] = useState(false);
  const Delete = async () => {
    if (deleteId === "") {
      alert("Enter the Id");
      return;
    }

    try {
      const checkResponse = await fetch(
        `http://localhost:5000/users/${deleteId}`,
      );

      if (!checkResponse.ok) {
        showProcessScreen(true);

        setTimeout(() => {
          showProcessScreen(false);
          showError(true);
        }, 900);

        return;
      }
      await fetch(`http://localhost:5000/users/${deleteId}`, {
        method: "DELETE",
      });

      showProcessScreen(true);

      setTimeout(() => {
        showProcessScreen(false);
        setPop(true);
      }, 900);
    } catch (error) {
      console.error(error);
    }
  };
  type PopupProps = {
    onClose: () => void;
  };
  const Modal = ({ onClose }: PopupProps) => {
    return createPortal(
      <div>
        <div className="overlay">
          <div className="Pop-up">
            <span>
              <h3>The Id is deleted successfully</h3>
            </span>
            <div>
              <button onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>,
      document.body,
    );
  };
  return (
    <>
      <div className="Delete">
        <div className="delete_id">
          <div className="header">
            <p> Enter Student Id To Delete </p>
          </div>
          <input
            type="number"
            value={deleteId}
            onChange={(e) => {
              showError(false);

              setDelete(e.target.value === "" ? "" : Number(e.target.value));
            }}
          />

          {error && (
            <>
              <div style={{ marginTop: "115px", position: "fixed" }}>
                <span style={{ color: "red" }}>Invalid ID number</span>
              </div>
            </>
          )}
        </div>

        <div className="back-btn">
          <button
            className="button1"
            onClick={() => {
              nav("/");
            }}
          >
            Cancel
          </button>
          <button
            className={deleteId === "" ? "button2-disabled" : "button2"}
            onClick={Delete}
            disabled={deleteId === ""}
          >
            Confirmation
          </button>
        </div>
        {processScreen && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              backgroundColor: "rgba(0,0,0,0.3)",
              zIndex: 9999,
            }}
          >
            <CircularProgress size={60} />
          </div>
        )}
        {popup && (
          <Modal
            onClose={() => {
              nav("/");
              setPop(false);
            }}
          />
        )}
      </div>
    </>
  );
};
export default Delete;
