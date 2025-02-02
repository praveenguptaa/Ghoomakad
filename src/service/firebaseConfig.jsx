import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB_-rAeseQOnEldbut9_bWWm-4u4g2wXJM",
  authDomain: "webd-b59df.firebaseapp.com",
  projectId: "webd-b59df",
  storageBucket: "webd-b59df.firebasestorage.app",
  messagingSenderId: "317702205688",
  appId: "1:317702205688:web:278c1f9828e3030bb08b0d",
  measurementId: "G-B39TD0814V"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);