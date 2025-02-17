// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxqVF0n90ziJGAH62Q_t6xLMZq7KmzCg4",
  authDomain: "slack-bf894.firebaseapp.com",
  projectId: "slack-bf894",
  storageBucket: "slack-bf894.firebasestorage.app",
  messagingSenderId: "656047374193",
  appId: "1:656047374193:web:49a33e2d20bf406b1780d0",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth();
const db = getFirestore();
const provider = new GoogleAuthProvider();

export default db;

export { provider, auth };
