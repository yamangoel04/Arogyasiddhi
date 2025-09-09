import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Calendar, Utensils, User } from "lucide-react"; // icons

export default function Footer() {
  const location = useLocation();

  const navItems = [
    { path: "/home", label: "Home", icon: <Home size={22} /> },
    { path: "/planner", label: "Planner", icon: <Calendar size={22} /> },
    { path: "/foods", label: "Foods", icon: <Utensils size={22} /> },
    { path: "/profile", label: "Profile", icon: <User size={22} /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around py-2 z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center text-sm ${
              isActive ? "text-green-600 font-semibold" : "text-gray-500"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
