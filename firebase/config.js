import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBP-kY_UftA9dfm6bGKMAczvikJfkTUWjY",
  authDomain: "postgram-d2aa2.firebaseapp.com",
  projectId: "postgram-d2aa2",
  storageBucket: "postgram-d2aa2.appspot.com",
  messagingSenderId: "483036266723",
  appId: "1:483036266723:web:4bfc2d5ea63afb25d505d6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
