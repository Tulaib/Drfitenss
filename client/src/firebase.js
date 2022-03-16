// Import the functions you need from the SDKs you need
/*eslint-disable  */
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'
import { getAuth , createUserWithEmailAndPassword } from "@firebase/auth";
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxtRhHcd93wssyTJlqwDbPWpVqECOBSzo",
  authDomain: "drfitness-d7c30.firebaseapp.com",
  projectId: "drfitness-d7c30",
  storageBucket: "drfitness-d7c30.appspot.com",
  messagingSenderId: "767578437714",
  appId: "1:767578437714:web:efdb147c8b67b10d14878b",
  measurementId: "G-3V3F1YD0ZM"
};


// Initialize Firebase  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth,db,storage}