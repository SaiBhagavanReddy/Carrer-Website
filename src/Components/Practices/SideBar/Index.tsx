import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Admin from "./Admin.tsx";

const Home = lazy(() => import("../SideBar/SideBar"));
const Attendance = lazy(() => import("../SideBar/Attendence"));
const LoginPage = lazy(() => import("../SideBar/LoginPage.tsx"));
const ProtectedRoute = lazy(() => import("../SideBar/ProtectedRoute.tsx"));
const Register = lazy(()=>import("../SideBar/Register.tsx"));
const ExpenseTracker = lazy(()=>import("../../ExpenseTracker/ExpenseTracker.tsx"))
const Index = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Attendance" element={<Attendance />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Register" element={<Register/>}/>
          <Route
            path="/SideBar"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/" element={<ExpenseTracker/>}></Route> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Index;
