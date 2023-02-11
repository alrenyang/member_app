import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth"


// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAC7TXF0f8znCcUjLbWgQDGORKyqUfdGLI",
    authDomain: "member-app-d019d.firebaseapp.com",
    databaseURL: "https://member-app-d019d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "member-app-d019d",
    storageBucket: "member-app-d019d.appspot.com",
    messagingSenderId: "479434588375",
    appId: "1:479434588375:web:5b12892a7472b478f77092"
  };

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth()