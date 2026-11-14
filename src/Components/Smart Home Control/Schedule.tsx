import { useContext, useEffect, useState } from "react";
import "./HomeControlPage.css";
import homeApps from "./HomeData";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import DeleteIcon from "@mui/icons-material/Delete";
import { NotificationContext } from "./ContextApi";

interface ScheduleInfo {
  device: string;
  time: string;
  status: string;
  enabled: boolean;
}

const Schedule = () => {
  const { setNotifications } = useContext(NotificationContext);

  const [enableAddSchedule, setEnableAddSection] = useState(false);

  const [addUserScheduleInfo, setAddUserScheduleInfo] =
    useState<ScheduleInfo>({
      device: "",
      time: "",
      status: "",
      enabled: false,
    });

  const [userDataToDisplay, setUserDataToDisplay] = useState<ScheduleInfo[]>(
    [],
  );

  // Default schedules
  const defaultSchedules: ScheduleInfo[] = [
    {
      device: "Light",
      time: "08:00",
      status: "Turn On",
      enabled: true,
    },
    {
      device: "Fan",
      time: "22:00",
      status: "Turn Off",
      enabled: false,
    },
  ];

  // Load schedules from sessionStorage
  useEffect(() => {
    const savedSchedules = sessionStorage.getItem("schedules");

    if (savedSchedules) {
      setUserDataToDisplay(JSON.parse(savedSchedules));
    } else {
      setUserDataToDisplay(defaultSchedules);

      sessionStorage.setItem(
        "schedules",
        JSON.stringify(defaultSchedules),
      );
    }
  }, []);

  // Toggle ON/OFF
 const turnAction = (index: number) => {
  setUserDataToDisplay((prev) => {
    const updatedData = prev.map((schedule, i) =>
      i === index
        ? {
            ...schedule,
            enabled: !schedule.enabled,
          }
        : schedule,
    );

    sessionStorage.setItem(
      "schedules",
      JSON.stringify(updatedData),
    );

    return updatedData;
  });

  const schedule = userDataToDisplay[index];

  setNotifications((prev: any) => [
    ...prev,
    schedule.enabled ? `${schedule.device} Turn Off` : "Turn On",
  ]);
};

  // Delete schedule
  const deleteItem = (index: number) => {
    setUserDataToDisplay((prev) => {
      const updatedData = prev.filter((_, i) => i !== index);
      return updatedData;
    });

    setNotifications((prev: any) => [
      ...prev,
      `Schedule deleted - ${new Date().getHours()}:${String(
        new Date().getMinutes(),
      ).padStart(2, "0")}`,
    ]);
  };

  // Create schedule
  const createSchedule = () => {
    if (
      addUserScheduleInfo.device === "" ||
      addUserScheduleInfo.status === "" ||
      addUserScheduleInfo.time === ""
    ) {
      alert("Missing Data");
      return;
    }

    // Check duplicate device + time
    const duplicate = userDataToDisplay.some(
      (data) =>
        data.device === addUserScheduleInfo.device &&
        data.time === addUserScheduleInfo.time,
    );

    if (duplicate) {
      alert("Schedule already exists with the same device and time");
      return;
    }

    const updatedData = [
      ...userDataToDisplay,
      addUserScheduleInfo,
    ];

    setUserDataToDisplay(updatedData);

    sessionStorage.setItem(
      "schedules",
      JSON.stringify(updatedData),
    );

    // Notification
    setNotifications((prev: any) => [
      ...prev,
      `Schedule Created - ${new Date().getHours()}:${String(
        new Date().getMinutes(),
      ).padStart(2, "0")}`,
    ]);

    // Close add schedule section
    setEnableAddSection(false);

    // Reset input fields
    setAddUserScheduleInfo({
      device: "",
      time: "",
      status: "",
      enabled: false,
    });
  };

  return (
    <>
      <div className="ScheduleMain">
        <div className="ScheduleBlock">

          {/* Header */}
          <div className="HeaderWithBtn">
            <div className="header">
              <h3>Device Schedules</h3>
            </div>

            <div className="btn-Add-Schedule">
              <button
                onClick={() =>
                  setEnableAddSection((prev) => !prev)
                }
              >
                <span style={{ paddingRight: "10px" }}>+</span>
                Add Schedule
              </button>
            </div>
          </div>

          {/* Add Schedule */}
          {enableAddSchedule && (
            <div className="scheduleDetailsMain">
              <div className="scheduleDetails">
                <div className="scheduleInput">

                  {/* Device */}
                  <div className="Device-rows">
                    <label className="Device-label">
                      Device

                      <select
                        value={addUserScheduleInfo.device}
                        onChange={(e) =>
                          setAddUserScheduleInfo({
                            ...addUserScheduleInfo,
                            device: e.target.value,
                          })
                        }
                      >
                        <option value="">
                          Select an option
                        </option>

                        {homeApps.map((data) => (
                          <option
                            key={data.name}
                            value={data.name}
                          >
                            {data.name}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  {/* Time */}
                  <div>
                    <label className="Device-label">
                      Time

                      <input
                        type="time"
                        value={addUserScheduleInfo.time}
                        onChange={(e) =>
                          setAddUserScheduleInfo({
                            ...addUserScheduleInfo,
                            time: e.target.value,
                          })
                        }
                      />
                    </label>
                  </div>

                  {/* Action */}
                  <div>
                    <label className="Device-label">
                      Action

                      <select
                        value={addUserScheduleInfo.status}
                        onChange={(e) =>
                          setAddUserScheduleInfo({
                            ...addUserScheduleInfo,
                            status: e.target.value,
                          })
                        }
                      >
                        <option value="">
                          Select action
                        </option>

                        <option value="Turn Off">
                          Turn Off
                        </option>

                        <option value="Turn On">
                          Turn On
                        </option>
                      </select>
                    </label>
                  </div>

                  {/* Buttons */}
                  <div>
                    <div className="action-btn">

                      <button onClick={createSchedule}>
                        Create Schedule
                      </button>

                      <button
                        onClick={() =>
                          setEnableAddSection(false)
                        }
                      >
                        Cancel
                      </button>

                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* Schedule List */}
          <div>

            {userDataToDisplay.map((data, index) => (
              <div
                key={`${data.device}-${data.time}-${index}`}
                className={
                  data.enabled
                    ? "scheduledInfo"
                    : "scheduledInfoOff"
                }
              >
                <div>
                  <h2>{data.device}</h2>

                  <pre>{data.time}</pre>

                  <p>{data.status}</p>
                </div>

                <div className="btns-scheduledInfo">

                  {/* ON/OFF */}
                  <button
                    onClick={() => turnAction(index)}
                  >
                    <PowerSettingsNewIcon />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => deleteItem(index)}
                  >
                    <DeleteIcon />
                  </button>

                </div>
              </div>
            ))}

            {/* Empty state */}
            {userDataToDisplay.length === 0 && (
              <div className="ScheduleInfo">
                <span>
                  No schedules yet. Create your first schedule!
                </span>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default Schedule;