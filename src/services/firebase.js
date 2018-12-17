import firebase from 'firebase';
// import 'firebase/database';

// Initialize Firebase
const DB_CONFIG = {
    apiKey: "AIzaSyDrGc2Q2ba3iCk8fGixdIqMQytawTzgToI",
    authDomain: "customer-desarrollo.firebaseapp.com",
    databaseURL: "https://customer-desarrollo.firebaseio.com",
    // projectId: "customer-desarrollo",
    // storageBucket: "customer-desarrollo.appspot.com",
    // messagingSenderId: "257036633584"
};

export const app = firebase.initializeApp(DB_CONFIG);

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth