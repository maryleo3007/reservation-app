import firebase from 'firebase';
import 'firebase/storage';

// Initialize Firebase
const DB_CONFIG = {
    apiKey: "AIzaSyDrGc2Q2ba3iCk8fGixdIqMQytawTzgToI",
    authDomain: "customer-desarrollo.firebaseapp.com",
    databaseURL: "https://customer-desarrollo.firebaseio.com",
    // projectId: "customer-desarrollo",
    storageBucket: "customer-desarrollo.appspot.com",
    // messagingSenderId: "257036633584"
};

const app = firebase.initializeApp(DB_CONFIG);

const ref = firebase.database().ref();
const firebaseAuth = firebase.auth;
const storage = firebase.storage()

export {
    app, ref, firebaseAuth, storage as default
}