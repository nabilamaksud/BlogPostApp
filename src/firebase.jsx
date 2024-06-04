
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAUv-t4dNT5Kbwe0QlyDUZrcXEXOEpFihM",
    authDomain: "blogpost-test-af519.firebaseapp.com",
    projectId: "blogpost-test-af519",
    storageBucket: "blogpost-test-af519.appspot.com",
    messagingSenderId: "58804381378",
    appId: "1:58804381378:web:88c9ee77b925cc39867d5b"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firebaseDb = getFirestore(app)