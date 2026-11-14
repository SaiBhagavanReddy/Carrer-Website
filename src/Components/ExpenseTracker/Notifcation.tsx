import { useEffect } from "react";

const NotificationTab = () => {
  useEffect(() => {
    const requestNotificationPermission = async () => {
      if (!("Notification" in window)) {
        console.log("Notifications are not supported");
        return;
      }

      if (Notification.permission === "default") {
        const permission =
          await Notification.requestPermission();

        console.log(
          "Notification permission:",
          permission
        );
      } else {
        console.log(
          "Notification permission:",
          Notification.permission
        );
      }
    };

    const checkNotificationTime = () => {
      const now = new Date();

      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      console.log(
        `Current time: ${currentHour}:${currentMinute}`
      );

      // 6:00 PM
      if (currentHour === 22 && currentMinute === 10) {
        const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

        const notificationShown = localStorage.getItem(
          "expenseNotificationShown"
        );

        // Show only once per day
        if (notificationShown !== today) {
          if (
            "Notification" in window &&
            Notification.permission === "granted"
          ) {
            const notification = new Notification(
              "Expense Tracker 💰",
              {
                body: "Don't forget to add today's expenses!",
                icon: "/expense-icon.png",
              }
            );

            notification.onclick = () => {
              window.focus();

              window.location.href = "/ExpenseTracker";

              notification.close();
            };

            localStorage.setItem(
              "expenseNotificationShown",
              today
            );
          }
        }
      }
    };

    requestNotificationPermission();

    // Check immediately
    checkNotificationTime();

    // Check every second
    const interval = setInterval(
      checkNotificationTime,
      1000
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (<>
    <span>Loading.........</span>
  </>);
};

export default NotificationTab;