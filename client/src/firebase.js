// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cci-data-platform.firebaseapp.com",
  projectId: "cci-data-platform",
  storageBucket: "cci-data-platform.appspot.com",
  messagingSenderId: "202319949875",
  appId: "1:202319949875:web:ef794c42bbe066c2cb7346"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);