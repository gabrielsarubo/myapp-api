const firebase = require('firebase/app');
require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyBeyb_EZhqENcroSJtian9qBzPhXl4vn2k",
    authDomain: "web-2-bac2b.firebaseapp.com",
    projectId: "web-2-bac2b",
    storageBucket: "web-2-bac2b.appspot.com",
    messagingSenderId: "502165762186",
    appId: "1:502165762186:web:d9d3fabcdef9756cc43d73"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

module.exports =  firebase 