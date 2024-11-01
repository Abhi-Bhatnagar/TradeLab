import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "", //removed for privacy
    authDomain: "",//removed for privacy
    projectId: "",//removed for privacy
    storageBucket: "",//removed for privacy
    messagingSenderId: "",//removed for privacy
    appId: "",//removed for privacy
    measurementId: ""//removed for privacy
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
