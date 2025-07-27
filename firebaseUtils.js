// src/utils/firebaseUtils.js

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB6v3HMYc2ldStFOBUPj40Ioyt83gHv_jc',
  authDomain: 'project-kisan-ai-466505.firebaseapp.com',
  projectId: 'project-kisan-ai-466505',
  storageBucket: 'project-kisan-ai-466505.appspot.com',
  messagingSenderId: '1015582125254',
  appId: '1:1015582125254:web:baf6c5ba7622ebf4defbc7',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Save a new Q&A to Firestore
export async function saveQuery(sessionId, text, reply) {
  try {
    const ref = collection(db, 'sessions', sessionId, 'queries');
    await addDoc(ref, {
      text,
      reply,
      time: new Date(),
    });
  } catch (e) {
    console.error('❌ Error saving query:', e);
  }
}

// ✅ Load all past Q&A from Firestore
export async function loadPastQueries(sessionId) {
  try {
    const ref = collection(db, 'sessions', sessionId, 'queries');
    const q = query(ref, orderBy('time', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map((doc) => doc.data());
  } catch (e) {
    console.error('❌ Error loading queries:', e);
    return [];
  }
}
