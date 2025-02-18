// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYz975wqP17ztXjdj66p9owJfv4mB-vvs",
  authDomain: "swd392-522ba.firebaseapp.com",
  projectId: "swd392-522ba",
  storageBucket: "swd392-522ba.firebasestorage.app",
  messagingSenderId: "480348753887",
  appId: "1:480348753887:web:556bc1dae0789519563e6a",
  measurementId: "G-GL8M6JC6X2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app; 