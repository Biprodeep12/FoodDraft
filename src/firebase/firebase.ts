import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBN2DnzSqI-ac0ET2a0HByW3vPB_qRGUnk",
  authDomain: "fooddraft-2c424.firebaseapp.com",
  projectId: "fooddraft-2c424",
  storageBucket: "fooddraft-2c424.firebasestorage.app",
  messagingSenderId: "672390124109",
  appId: "1:672390124109:web:9280a81233a92d4e428204"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
