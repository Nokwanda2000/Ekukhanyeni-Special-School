import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCfQfe_LO3LiCr9UiLhuAwaAB16K2HToxI",
    authDomain: "ekukhanyeni-73230.firebaseapp.com",
    projectId: "ekukhanyeni-73230",
    storageBucket: "ekukhanyeni-73230.firebasestorage.app",
    messagingSenderId: "94881707429",
    appId: "1:94881707429:web:4f5a4160d3515676b8e44c",
    measurementId: "G-J4WBLBPNMF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };