import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, Calendar, Database, User, Menu, X, LogOut } from "lucide-react";
import { User as UserEntity } from "@/entities/User";
import { button } from "@/components/ui/button";

const navigationItems = [
  {
    title: "Home",
    url: createPageUrl("Home"),
    icon: Home,
    key: "home"
  },
  {
    title: "Planner",
    url: createPageUrl("Planner"),
    icon: Calendar,
    key: "planner"
  },
  {
    title: "Foods",
    url: createPageUrl("Foods"),
    icon: Database,
    key: "foods"
  },
  {
    title: "Profile",
    url: createPageUrl("Profile"),
    icon: User,
    key: "profile"
  }
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await UserEntity.me();
        setUser(userData);
      } catch (error) {
        console.log("User not authenticated");
      }
      setLoading(false);
    };
    
    loadUser();
  }, []);

  const handleLogout = async () => {
    await UserEntity.logout();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-lime-50 via-green-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
            <span className="text-2xl font-bold text-white">🌿</span>
          </div>
          <p className="text-green-800 font-medium">Loading Ayurveda...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-green-50 to-emerald-50">
      <style>
        {`
          :root {
            --ayur-primary: #16a34a;
            --ayur-secondary: #15803d;
            --ayur-accent: #22c55e;
            --ayur-earth: #92400e;
            --ayur-cream: #f7fee7;
            --ayur-sage: #374151;
          }
          
          .ayur-pattern {
            background-image: 
              radial-gradient(circle at 20px 20px, rgba(34, 197, 94, 0.1) 1px, transparent 0),
              radial-gradient(circle at 60px 60px, rgba(22, 163, 74, 0.05) 1px, transparent 0);
            background-size: 80px 80px, 120px 120px;
          }
          
          .ayur-card {
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.95);
            border: 1px solid rgba(34, 197, 94, 0.2);
            box-shadow: 0 4px 20px rgba(22, 163, 74, 0.1);
          }
          
          .ayur-nav-active {
            background: linear-gradient(135deg, #16a34a, #15803d);
            color: white;
            transform: translateY(-2px);
          }
        `}
      </style>

      {/* Mobile Header - Simplified for mobile-first approach */}
      <header className="bg-white/90 backdrop-blur-md border-b border-green-200 sticky top-0 z-50">
        <div className="flex justify-center items-center px-4 h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-xl">🌿</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-900">AYURVEDA</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20">
        <div className="ayur-pattern">
          {children}
        </div>
      </main>

      {/* Bottom Navigation - Consistent across all screens */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-green-200 z-40">
        <div className="flex justify-around py-2 px-2">
          {navigationItems.map((item) => (
            <Link
              key={item.key}
              to={item.url}
              className={`flex flex-col items-center py-3 px-4 rounded-xl transition-all duration-300 ${
                location.pathname === item.url
                  ? 'ayur-nav-active shadow-lg'
                  : 'text-green-600 hover:text-green-800 hover:bg-green-50'
              }`}
            >
              <item.icon className={`w-5 h-5 mb-1 ${
                location.pathname === item.url ? 'scale-110' : ''
              }`} />
              <span className="text-xs font-semibold">{item.title}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}