
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyBFuNB6ltr5DVtNyv32p2WJaBGH8QF09sc",
  authDomain: "blogpostapp-c0c3f.firebaseapp.com",
  projectId: "blogpostapp-c0c3f",
  storageBucket: "blogpostapp-c0c3f.appspot.com",
  messagingSenderId: "807111936446",
  appId: "1:807111936446:web:19479640493bc4c3c591ef"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firebaseDb = getFirestore(app)