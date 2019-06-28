import firebase from 'firebase';
import 'firebase/storage';



export const inicializarFirebase = () => {
    firebase.initializeApp({
      messagingSenderId: '257036633584'
    });
    
  navigator.serviceWorker
      .register('/my-sw.js')
      .then((registration) => {
        firebase.messaging().useServiceWorker(registration);
      });
  }