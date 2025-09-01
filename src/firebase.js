// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLCO_gM9qIO-GjiwCfcpOupxgJECoL_Io",
  authDomain: "sport-f5c0e.firebaseapp.com",
  projectId: "sport-f5c0e",
  storageBucket: "sport-f5c0e.firebasestorage.app",
  messagingSenderId: "983025872641",
  appId: "1:983025872641:web:a0c69589b493d3626cb500",
  measurementId: "G-0Z645F16WY"
};

// Ініціалізація
const app = initializeApp(firebaseConfig);

// Підключення Firestore
export const db = getFirestore(app);
