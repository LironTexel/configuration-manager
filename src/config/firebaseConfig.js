import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBU-P5CRAymrKAjpE5wka1T9rj0I4t2jF4",
    authDomain: "json-configuration-manager.firebaseapp.com",
    projectId: "json-configuration-manager",
    storageBucket: "json-configuration-manager.appspot.com",
    messagingSenderId: "1091360095743",
    appId: "1:1091360095743:web:da979d07177f82a300fbca",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({});

export default firebase;