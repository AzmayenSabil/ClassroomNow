import firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

// Replace this with your Firebase SDK config snippet
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDY1rPugYco66Zgr-zGzfx2sDhONP3MT2A",
    authDomain: "chatapp1-e98ba.firebaseapp.com",
    projectId: "chatapp1-e98ba",
    storageBucket: "chatapp1-e98ba.appspot.com",
    messagingSenderId: "766007895845",
    appId: "1:766007895845:web:8ad869e0bbe840f930dccc",
    measurementId: "G-HYWFMKYTES"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };