// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhAFO9mdXh6Sal9J_aY3UJW4e_LW4zuJE",
  authDomain: "personal-finance-tracker-ac058.firebaseapp.com",
  projectId: "personal-finance-tracker-ac058",
  storageBucket: "personal-finance-tracker-ac058.appspot.com",
  messagingSenderId: "232604672197",
  appId: "1:232604672197:web:15b32c6f2b185e40ebd0ac",
  measurementId: "G-FS805ZYRGT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth,analytics, provider, doc, setDoc };