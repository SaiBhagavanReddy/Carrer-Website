import "./HomeControlPage.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import { NotificationContext } from "./ContextApi";

const Notification = () => {
  const { notifications, setNotifications } =
    useContext(NotificationContext);

  const clearAll = () => {
    setNotifications([]);
  };
  
  return (
    <div className="notification-panel-Main">
      <div className="notification-panel">

        <div className="notification-panel-Header">

          <div className="Notification-with-icon">
            <NotificationsNoneIcon />
            <h3>Notifications</h3>
          </div>

          <div className="Notification-btn-deletion">
            <button onClick={clearAll}>
              <DeleteIcon />
              Clear All
            </button>
          </div>

        </div>

        {notifications.length > 0 ? (
          notifications.map((data:any, index:any) => (
            <div className="notification-data" key={index}>

              <div className="Notifications-with-data">

                <NotificationsNoneIcon />

                <div className="Notifications-with-date">
                  <h3>{data}</h3>
                </div>

              </div>

            </div>
          ))
        ) : (
          <div className="Notifications-with-emptyData">
            <p>No notifications yet.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Notification;