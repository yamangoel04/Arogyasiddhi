// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { ref, get } from "firebase/database";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null); // Firebase user
  const [user, setUser] = useState(null);         // DB user
  const [role, setRole] = useState(null);         // <-- ADD role here
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setAuthUser(currentUser);

      if (currentUser) {
        try {
          // Fetch user from DB
          const snapshot = await get(ref(db, "users/" + currentUser.uid));
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setUser(userData);
            setRole(userData.role || null); // <-- set role from DB
          } else {
            setUser(null);
            setRole(null);
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          setUser(null);
          setRole(null);
        }
      } else {
        setUser(null);
        setRole(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ authUser, user, role, setRole, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
