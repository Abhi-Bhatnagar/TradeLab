import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCP1W2AQk-mTQ6KoFdYF-gK0L3rZto4lM8",
    authDomain: "tradelab-8c262.firebaseapp.com",
    projectId: "tradelab-8c262",
    storageBucket: "tradelab-8c262.appspot.com",
    messagingSenderId: "804363744097",
    appId: "1:804363744097:web:5d4506006a888409068b20",
    measurementId: "G-6GGX21BTBG"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
