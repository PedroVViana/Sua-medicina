// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBsGB0A3TCsz89oBA1BRVsTeQQ_K5cCYKs",
  authDomain: "suamedicina-88266.firebaseapp.com",
  projectId: "suamedicina-88266",
  storageBucket: "suamedicina-88266.firebasestorage.app",
  messagingSenderId: "283212157653",
  appId: "1:283212157653:web:c9f169e82ca3bdbafdc85c",
  measurementId: "G-G4N55XGXNM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;
