// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB6v3HMYc2ldStFOBUPj40Ioyt83gHv_jc",
  authDomain: "project-kisan-ai-466505.firebaseapp.com",
  projectId: "project-kisan-ai-466505",
  storageBucket: "project-kisan-ai-466505.appspot.com",
  messagingSenderId: "1015582125254",
  appId: "1:1015582125254:web:baf6c5ba7622ebf4defbc7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
