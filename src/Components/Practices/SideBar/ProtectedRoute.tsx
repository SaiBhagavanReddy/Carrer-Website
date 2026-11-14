import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
  const isLoggeInForUser = localStorage.getItem("isAdminLoggedForUser");
  if (!isLoggedIn && !isLoggeInForUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
