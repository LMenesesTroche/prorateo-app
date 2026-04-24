// Firebase config
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your config here
const firebaseConfig = {
  apiKey: "XXX",
  authDomain: "XXX",
  projectId: "XXX",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
