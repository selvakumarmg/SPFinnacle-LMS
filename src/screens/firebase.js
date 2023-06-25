import { initializeApp, } from 'firebase/app';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDkyqF1OhQVx7-moX2bScjIqBSlCGQuX9E",
    authDomain: "lms-spfinnacle.firebaseapp.com",
    projectId: "lms-spfinnacle",
    storageBucket: "lms-spfinnacle.appspot.com",
    messagingSenderId: "1008599864009",
    appId: "1:1008599864009:web:e4a76db6bf68d17203f318",
    measurementId: "G-N2MQSZT408"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const db = getFirestore(app);

export { auth, provider, db };
