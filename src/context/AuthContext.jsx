import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { User } from "@/entities/User"; // your API wrapper

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null); // Firebase user
  const [user, setUser] = useState(null);         // DB user
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setAuthUser(currentUser);

      if (currentUser) {
        try {
          const userData = await User.me(); // fetch DB user
          setUser(userData);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ authUser, user, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}