import firebase from 'firebase';
import 'firebase/storage';

// Initialize Firebase
const DB_CONFIG = {
    apiKey: "AIzaSyDrGc2Q2ba3iCk8fGixdIqMQytawTzgToI",
    authDomain: "customer-desarrollo.firebaseapp.com",
    databaseURL: "https://customer-desarrollo.firebaseio.com",
    // projectId: "customer-desarrollo",
    storageBucket: "customer-desarrollo.appspot.com",
    messagingSenderId: "257036633584"
    // apiKey: "AIzaSyDPrMgwUKV0H2ECiVOFHKLCfBg8QQK5jE4",
    // authDomain: "recepcion-prod.firebaseapp.com",
    // databaseURL: "https://recepcion-prod.firebaseio.com",
    // projectId: "recepcion-prod",
    // storageBucket: "recepcion-prod.appspot.com",
    // messagingSenderId: "725271756885",
    // appId: "1:725271756885:web:11daae268b19aa33"
};

const app = firebase.initializeApp(DB_CONFIG);

const ref = firebase.database().ref();
const firebase_messaging = firebase.messaging;
const firebaseAuth = firebase.auth;
const storage = firebase.storage()

export {
    app, ref, firebaseAuth, storage, firebase_messaging
    
}