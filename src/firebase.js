import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBobX32dPgV9wiXm2eYHaGoekgwO8thXPk",
  authDomain: "fitness-bcaf9.firebaseapp.com",
  projectId: "fitness-bcaf9",
  storageBucket: "fitness-bcaf9.firebasestorage.app",
  messagingSenderId: "377391519388",
  appId: "1:377391519388:web:2f47cf43d42977b8b5ff59"  
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
