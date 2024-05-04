// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "${{ secrets.REACT_APP_FIREBASE_API_KEY }}",
  authDomain: "${{ secrets.REACT_APP_FIREBASE_AUTH_DOMAIN }}",
  projectId: "${{ secrets.REACT_APP_FIREBASE_PROJECT_ID }}",
  storageBucket: "${{ secrets.REACT_APP_FIREBASE_STORAGE_BUCKET }}",
  messagingSenderId: "${{ secrets.REACT_APP_FIREBASE_MESSAGING_SENDER_ID }}",
  appId: "${{ secrets.REACT_APP_FIREBASE_APP_ID }}"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider= new GoogleAuthProvider();
export const db= getFirestore(app)