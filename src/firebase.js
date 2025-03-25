// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyDYz975wqP17ztXjdj66p9owJfv4mB-vvs",
  // authDomain: "swd392-522ba.firebaseapp.com",
  // projectId: "swd392-522ba",
  // storageBucket: "swd392-522ba.firebasestorage.app",
  // messagingSenderId: "480348753887",
  // appId: "1:480348753887:web:556bc1dae0789519563e6a",
  // measurementId: "G-GL8M6JC6X2"

  //test
  apiKey: "AIzaSyA42KXQ7CuzNSMBUzDgmhpuXLFvQt--IPA",
  authDomain: "reels-reactjs-3379f.firebaseapp.com",
  projectId: "reels-reactjs-3379f",
  storageBucket: "reels-reactjs-3379f.firebasestorage.app",
  messagingSenderId: "502276840593",
  appId: "1:502276840593:web:b7192036120f9e2303b330",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const message = getMessaging(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const generateToken = async () => {
  try {
        const token = await getToken(message, {
          vapidKey:
            "BH62BI0M4e89Qq8mdU6xFqT4gcH59g7QqOwLVALtf818X9OwQPEJUzgN0YxDYSgkC5ekgY1kMnpvvGvH85e79yc",
        });
        const fcmTokens = JSON.parse(localStorage.getItem("fcmTokens") || "{}");
        fcmTokens[sessionStorage.getItem("username")] = token;
        localStorage.setItem("fcmTokens", JSON.stringify(fcmTokens));
      
  } catch (error) {
    console.error("Error requesting notification permission:", error);
    return null;
  }
};

export default app;
