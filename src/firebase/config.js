import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAANMfPsQRu0VlxaQol9zTBgzkOzZyyGuo",
  authDomain: "smartboard-bed5e.firebaseapp.com",
  projectId: "smartboard-bed5e",
  storageBucket: "smartboard-bed5e.firebasestorage.app",
  messagingSenderId: "94255326474",
  appId: "1:94255326474:web:7d91985826dd712de2c6f3",
  measurementId: "G-29QPZT84HV"
};

const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, db, storage };
