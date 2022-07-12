import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCBFxOIDji3XBrt4733aeup6S-QwKQizB4",
  authDomain: "el-isim.firebaseapp.com",
  projectId: "el-isim",
  storageBucket: "el-isim.appspot.com",
  messagingSenderId: "149366105186",
  appId: "1:149366105186:web:1eba85fd0365a999025d3b",
  measurementId: "G-R14H5FCNY2"
};




const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth();

export default app