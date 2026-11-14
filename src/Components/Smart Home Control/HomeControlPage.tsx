import { useContext, useState } from "react";
import "../Smart Home Control/HomeControlPage.css";
import homeApps from "./HomeData";
import Schedule from "./Schedule";
import Notification from "./Notification.tsx";
import { NotificationContext } from "./ContextApi";

const HomeControlPage = () => {
  const { notifications } = useContext(NotificationContext);
  const [activeBtn, setActiveBtn] = useState("Devices");
  const [operations, setOperations] = useState<boolean[]>(
    homeApps.map(() => false),
  );
  const [activeStatusCount, setactiveStatusCount] = useState(0);
  const setOnAndOff = (ind: number) => {
  const currentStatus = operations[ind];

  setOperations((prev) =>
    prev.map((status, index) =>
      index === ind ? !status : status
    )
  );

  if (!currentStatus) {
    setactiveStatusCount((prev) => prev + 1);
  } else {
    // ON → OFF
    setactiveStatusCount((prev) => prev - 1);
  }
};
  return (
    <>
      <div className="HomeControlPageMain">
        <div className="Nav_with_header">
          <div>
            <h3>Smart Home Control</h3>
          </div>
          <div className="Active-btn">
            <span>{activeStatusCount}/6Active</span>
          </div>
        </div>
        <div className="HomeControlBody">
          <div className="app-nav">
            <div className="nav-btns">
              <button
                className={activeBtn === "Devices" ? "active" : ""}
                onClick={() => setActiveBtn("Devices")}
              >
                Devices
              </button>
            </div>

            <div className="nav-btns">
              <button
                className={activeBtn === "Schedule" ? "active" : ""}
                onClick={() => setActiveBtn("Schedule")}
              >
                Schedule
              </button>
            </div>

            <div className="nav-btns">
              <button
                className={activeBtn === "Notfi" ? "active" : ""}
                onClick={() => setActiveBtn("Notfi")}
              >
                Notfication({notifications.length})
              </button>
            </div>
          </div>
          {activeBtn === "Devices" ? (
            <>
              <div className="App-Main">
                <div className="homeApp">
                  {homeApps.map((data, ind) => {
                    const Icon = data.icon;
                    const isOn = operations[ind];
                    return (
                      <div key={ind} className="Appblock">
                        <div className={isOn ? "Icon" : "IconColorAdd"}>
                          <Icon />
                        </div>

                        <h3>{data.name}</h3>
                        <p>{data.location}</p>

                        <div>
                          <span>{isOn ? "ON" : "OFF"}</span>{" "}
                        </div>

                        <div className="power-btn">
                          <button onClick={() => setOnAndOff(ind)}>
                            ON/OFF
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : activeBtn === "Schedule" ? (
            <>
              <Schedule />
            </>
          ) : (
            <>
              <Notification />
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default HomeControlPage;
