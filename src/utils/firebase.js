// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMfxVie4kRQjwvYQubqVeinm8OmPGRUZI",
  authDomain: "netflixgpt-ed4d5.firebaseapp.com",
  projectId: "netflixgpt-ed4d5",
  storageBucket: "netflixgpt-ed4d5.firebasestorage.app",
  messagingSenderId: "474547832131",
  appId: "1:474547832131:web:7a8796b06222efa1c85bf6",
  measurementId: "G-W6CBSF6ZJ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();