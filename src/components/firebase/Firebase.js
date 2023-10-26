import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  arrayUnion,
  updateDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
// import { Form } from "react-router-dom";
const firebaseConfig = {
  apiKey: "AIzaSyCxVFcWr0o5iIw1M4bJIWb7H6miICDOP2A",
  authDomain: "ecommercedatabase-76772.firebaseapp.com",
  databaseURL: "https://ecommercedatabase-76772-default-rtdb.firebaseio.com",
  projectId: "ecommercedatabase-76772",
  storageBucket: "ecommercedatabase-76772.appspot.com",
  messagingSenderId: "404323863384",
  appId: "1:404323863384:web:302d7c19e5d5615d54732d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
export {
  app,
  doc,
  auth,
  getFirestore,
  collection,
  addDoc,
  arrayUnion,
  updateDoc,
  getDoc,
  setDoc,
  db,
};
