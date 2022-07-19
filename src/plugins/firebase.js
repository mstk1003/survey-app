// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABxGiFnq2UzXjUdijPCPbgwJe4gKG4LQw",
  authDomain: "survey-app-40037.firebaseapp.com",
  projectId: "survey-app-40037",
  storageBucket: "survey-app-40037.appspot.com",
  messagingSenderId: "942829369658",
  appId: "1:942829369658:web:ef2f89881171cfe8d2f803",
  measurementId: "G-JCCSJLYRTK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
