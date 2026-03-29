// 1. IMPORTAÇÕES (Tudo organizado em uma única vez por origem)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 2. CONFIGURAÇÃO
const firebaseConfig = {
  apiKey: "AIzaSyAaLzIJ6LgFMOvEmzpmBo8d2Owh_DIyfWI",
  authDomain: "liberi-e377c.firebaseapp.com",
  projectId: "liberi-e377c",
  storageBucket: "liberi-e377c.firebasestorage.app",
  messagingSenderId: "304236275616",
  appId: "1:304236275616:web:3ecf402fe0b1a6e0a7e6c5",
};

// 3. INICIALIZAÇÃO
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// 4. EXPORTAÇÃO (Uma única linha com TODAS as ferramentas para as outras páginas)
export {
  auth,
  db,
  provider,
  signInWithPopup,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
};
