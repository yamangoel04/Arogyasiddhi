// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
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

export default function App() {
  return (
    <div className="pb-16">
      <div className="p-4">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/welcome" element={<Welcome />} />

          {/* Private routes */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
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

      {/* Footer hidden on login, landing, welcome */}
      {!["/", "/login", "/landing", "/welcome"].includes(window.location.pathname) && (
        <Footer />
      )}
    </div>
  );
}
