import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9Q-9mKSMZf8cwj75SUG_YtagEYML6CJ0",
  authDomain: "ayurpro-a9b26.firebaseapp.com",
  projectId: "ayurpro-a9b26",
  storageBucket: "ayurpro-a9b26.firebasestorage.app",
  messagingSenderId: "93275558622",
  appId: "1:93275558622:web:afd0541ee42bcf39f4284f",
  measurementId: "G-XHGDBFLQ6X",
  databaseURL: "https://ayurpro-a9b26-default-rtdb.firebaseio.com",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
