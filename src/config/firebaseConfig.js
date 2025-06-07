// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1FG4DTIwQZvV14ds7vBiFX_q0gKVM7dk",
  authDomain: "bstore-3328e.firebaseapp.com",
  projectId: "bstore-3328e",
  storageBucket: "bstore-3328e.firebasestorage.app",
  messagingSenderId: "1071229681935",
  appId: "1:1071229681935:web:e998be8d7ba099d11d7e7a",
  measurementId: "G-1BDJMX9PJ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);