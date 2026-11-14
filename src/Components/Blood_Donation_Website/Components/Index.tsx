import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

const DonationLoginPage = lazy(() => import("./NormalUser/DonationLoginPage"));
const Register = lazy(() => import("./NormalUser/DonationRegisterPage"));
const Dashboard = lazy(() => import("../Components/Dashboard"));
const ProtectedRoute = lazy(() => import("../Components/ProtectedRouter"));
const Admin = lazy(() => import("./AdminUser/AdminPanel"));
const Index = () => {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId="66736286448-gvlei5ed9846lcg340sk2oubrpsdfabr.apps.googleusercontent.com">
        <Routes>
          <Route path="/" element={<DonationLoginPage />} />
        </Routes>
      </GoogleOAuthProvider>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
      <Routes>
        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
      <Routes>
        <Route path="Admin" element={<Admin />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Index;
