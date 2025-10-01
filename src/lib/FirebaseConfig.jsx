import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyB7I2kk2qDH1dTSiXJSDd8sNCuJ28HOvw0",
    authDomain: "kasbon-3afd3.firebaseapp.com",
    databaseURL: "https://kasbon-3afd3-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "kasbon-3afd3",
    storageBucket: "kasbon-3afd3.firebasestorage.app",
    messagingSenderId: "163834327347",
    appId: "1:163834327347:web:cfdbb347cdacf9a28e8e46",
    measurementId: "G-QVFMZLZQ16"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };