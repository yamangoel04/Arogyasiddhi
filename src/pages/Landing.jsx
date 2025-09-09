// src/pages/LandingPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Import auth from your firebase.js
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function LandingPage() {
  const navigate = useNavigate();

  // This function will be called when the button is clicked
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      // This opens the Google sign-in popup
      await signInWithPopup(auth, provider);
      // If login is successful, navigate to the home page
      navigate('/home');
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      alert("Failed to sign in with Google. Please check the console for errors.");
    }
  };

  return (
    <div className="min-h-screen bg-lime-50 flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <span className="text-8xl">🌿</span>
        <h1 className="text-5xl font-bold text-green-900 mt-4">AyurPro</h1>
        <p className="text-xl text-green-700 mt-2">Your Personal Ayurvedic Wellness Guide</p>
      </div>
      <button
        onClick={handleGoogleLogin}
        className="mt-12 px-8 py-4 bg-white text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-100 flex items-center transition"
      >
        <svg className="w-6 h-6 mr-3" viewBox="0 0 48 48">
          <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
          <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
          <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-6.627 0-12-5.373-12-12h-8c0 11.045 8.955 20 20 20z" />
          <path fill="#1976D2" d="M43.611 20.083H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C44.491 35.636 48 29.932 48 24c0-1.341-.138-2.65-.389-3.917z" />
        </svg>
        Sign in with Google
      </button>
    </div>
  );
}