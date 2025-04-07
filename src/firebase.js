 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrNMs_c_QMdkJvK0kSYUDPDHG7VLbCcgk",
  authDomain: "fortune-61ccc.firebaseapp.com",
  projectId: "fortune-61ccc",
  storageBucket: "fortune-61ccc.firebasestorage.app",
  messagingSenderId: "855275069623",
  appId: "1:855275069623:web:4ee432e3780b40b4e56d32",
  measurementId: "G-3GHPEV6QNQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
