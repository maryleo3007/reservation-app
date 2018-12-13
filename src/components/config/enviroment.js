import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDrGc2Q2ba3iCk8fGixdIqMQytawTzgToI",
  authDomain: "customer-desarrollo.firebaseapp.com",
  databaseURL: "https://customer-desarrollo.firebaseio.com",
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
