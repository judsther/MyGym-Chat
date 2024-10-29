// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2MK2nqoMGe9ISXjLBwykCfXYcJwhRXZU",
  authDomain: "mygym-chat.firebaseapp.com",
  projectId: "mygym-chat",
  storageBucket: "mygym-chat.appspot.com",
  messagingSenderId: "11270766861",
  appId: "1:11270766861:web:603eb3362a827f6d93b044",
  measurementId: "G-EZR0NVP66N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);






