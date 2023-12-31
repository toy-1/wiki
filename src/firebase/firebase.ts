import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "toy-1-1dfe1.firebaseapp.com",
  projectId: "toy-1-1dfe1",
  storageBucket: "toy-1-1dfe1.appspot.com",
  messagingSenderId: "6124898264",
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  measurementId: "G-GFE642HZGF",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
