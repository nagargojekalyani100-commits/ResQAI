import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCAB1G9TqJzuJe6NgPi9VLTGUALyspyTfo",
  authDomain: "resqai-83856.firebaseapp.com",
  projectId: "resqai-83856",
  storageBucket: "resqai-83856.firebasestorage.app",
  messagingSenderId: "1058331531872",
  appId: "1:1058331531872:web:fbe2d730eb840998ab4105",
  measurementId: "G-YKCF86QF97"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;