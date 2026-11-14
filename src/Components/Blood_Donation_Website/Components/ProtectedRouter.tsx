import { Navigate } from "react-router-dom";

const ProtectedRouter = ({ children }: any) => {
  const isLoggedIn = localStorage.getItem("AllowUser");
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRouter;
