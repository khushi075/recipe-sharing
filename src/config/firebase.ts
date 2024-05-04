// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "${{ secrets.REACT_APP_FIREBASE_API_KEY }}",
  authDomain: "mous-saka.firebaseapp.com",
  projectId: "mous-saka",
  storageBucket: "mous-saka.appspot.com",
  messagingSenderId: "476241654251",
  appId: "1:476241654251:web:b2ec339b429001f0b329ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider= new GoogleAuthProvider();
export const db= getFirestore(app)