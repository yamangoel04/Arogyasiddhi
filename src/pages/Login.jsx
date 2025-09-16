import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

import { ref, set, get } from "firebase/database";
import { auth, db, googleProvider } from "../firebase"; // adjust path if needed

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("patient"); // ✅ new role state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignUp) {
        // 1) Create account in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // 2) Update Firebase Auth profile with displayName
        if (name && name.trim().length > 0) {
          await updateProfile(user, { displayName: name.trim() });
        }

        // 3) Save user record in Realtime Database
        await set(ref(db, "users/" + user.uid), {
          uid: user.uid,
          name: name?.trim() || null,
          email,
          role, // ✅ store role in DB
          createdAt: new Date().toISOString(),
        });

        // 4) Redirect based on role
        navigate(role === "doctor" ? "/DoctorProfile" : "/home");
      } else {
        // Sign in existing user
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Get role from DB
        const snapshot = await get(ref(db, "users/" + user.uid));
        let userRole = "patient";
        if (snapshot.exists()) {
          const dbUser = snapshot.val();
          userRole = dbUser?.role || "patient";

          // If no displayName in Auth, sync from DB
          if (!user.displayName && dbUser?.name) {
            await updateProfile(user, { displayName: dbUser.name });
          }
        }

        // Redirect based on DB role
        navigate(userRole === "doctor" ? "/doctor-profile" : "/home");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userRef = ref(db, "users/" + user.uid);
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        // new Google user → save with selected role
        await set(userRef, {
          uid: user.uid,
          name: user.displayName || "Google User",
          email: user.email,
          photoURL: user.photoURL || null,
          role, // ✅ save selected role
          createdAt: new Date().toISOString(),
        });

        navigate(role === "doctor" ? "/doctor-profile" : "/home");
      } else {
        // existing user → check their role
        const dbUser = snapshot.val();
        const userRole = dbUser?.role || "patient";

        navigate(userRole === "doctor" ? "/doctor-profile" : "/home");
      }
    } catch (err) {
      if (err.code === "auth/popup-closed-by-user") {
        setError("Sign-in was cancelled. Please try again.");
      } else if (err.code === "auth/popup-blocked") {
        setError("Pop-up blocked. Allow pop-ups and try again.");
      } else {
        setError(err.message || "Google sign-in failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 flex items-center justify-center px-4">
      <div className="relative max-w-md w-full">
        <div className="backdrop-blur-xl bg-white/20 p-8 rounded-3xl shadow-2xl border border-white/30 space-y-6">
          <div className="text-center">
            <div className="mx-auto h-20 w-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-lg transform hover:scale-110 transition-transform duration-300">
              <div className="text-white text-3xl drop-shadow-lg">🌿</div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-1">Welcome to</h2>
            <h1 className="text-2xl font-bold text-green-900 mb-1">
              Arogyapatha
            </h1>
            <h2 className="text-2xl italic font-semibold text-emerald-300 drop-shadow-md mb-1">
              A Journey Towards Ayurveda
            </h2>

            <h2 className="text-xl font-semibold text-white/90">
              {isSignUp ? "Create your account" : "Sign in to continue"}
            </h2>
          </div>

          {/* Google login */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-white/90 rounded-xl font-semibold hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          {/* OR divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 text-white/80 font-medium">OR</span>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 text-red-100 px-4 py-3 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="Your full name"
                  required
                />
              </div>
            )}

            {/* Role selection */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  I am a
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg"
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-50"
            >
              {loading
                ? isSignUp
                  ? "Creating account..."
                  : "Signing in..."
                : isSignUp
                ? "Create account"
                : "Sign in"}
            </button>
          </form>

          {/* Toggle */}
          <div className="text-center text-sm">
            <span className="text-gray-600">
              {isSignUp ? "Already have an account? " : "Need an account? "}
            </span>
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
              }}
              className="text-green-600 font-semibold hover:text-green-700"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
