import { createContext, useState } from "react";

const NotificationContext = createContext<any>(null);

const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<string[]>([]);

  return (
    <NotificationContext.Provider
      value={{ notifications, setNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext, NotificationProvider };