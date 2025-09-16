// src/App.jsx
import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import RoleSelection from "./pages/RoleSelection.jsx";
import Foods from "./pages/Foods.jsx";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Onboarding from "./pages/Onboarding";
import Planner from "./pages/Planner";
import Profile from "./pages/Profile";
import Welcome from "./pages/Welcome";
import Footer from "./components/Footer.jsx";
import Login from "./pages/Login.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { useAuth } from "./context/AuthContext";
import DoctorConsultation from "./pages/DoctorConsultation";
import DoctorProfile from "./pages/Doctorprofile.jsx";// ✅ proper import

export default function App() {
  const location = useLocation();
  const { user, role } = useAuth();

  // ✅ Hide footer on doctor-profile too
  const noFooterPaths = ["/", "/login", "/landing", "/welcome", "/role-selection", "/doctor-profile"];

  return (
    <div className="pb-16">
      <div className="p-4">
        <Routes>
          {/* Step 1: Role Selection */}
          <Route path="/" element={<RoleSelection />} />
          <Route path="/role-selection" element={<RoleSelection />} />

          {/* Step 2: Login */}
          <Route path="/login" element={<Login />} />

          {/* Optional onboarding */}
          <Route path="/landing" element={<Landing />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/welcome" element={<Welcome />} />

          {/* Step 3: Role-based private routes */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                {role === "doctor" ? <Navigate to="/doctor-profile" /> : <Home />}
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/foods"
            element={
              <PrivateRoute>
                <Foods />
              </PrivateRoute>
            }
          />
          <Route
            path="/planner"
            element={
              <PrivateRoute>
                <Planner />
              </PrivateRoute>
            }
          />
          <Route
            path="/consultation"
            element={
              <PrivateRoute>
                <DoctorConsultation user={user} />
              </PrivateRoute>
            }
          />
          <Route
            path="/doctor-profile"
            element={
              <PrivateRoute>
                <DoctorProfile />
              </PrivateRoute>
            }
          />

          {/* Catch-all */}
          <Route
            path="*"
            element={
              <div className="text-center text-red-500 text-xl mt-8">
                404 - Page Not Found
              </div>
            }
          />
        </Routes>
      </div>

      {/* ✅ Footer hidden when on doctor-profile */}
      {!noFooterPaths.includes(location.pathname) && <Footer />}
    </div>
  );
}
