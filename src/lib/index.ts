import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, addDoc, getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_SB,
  messagingSenderId: process.env.REACT_APP_MS_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_M_ID,
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const authentication = {
    auth: getAuth(app),
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
};

export const firestoredb = {
  db: getFirestore(app),
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  setDoc,
}

export const realtimedb = {

}

export const storage = {

}
