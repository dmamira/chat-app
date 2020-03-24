import * as firebase from 'firebase';
import sweet from 'firestore-sweet';

var firebaseConfig = {
    apiKey: "AIzaSyAtYFbfbkueEfHAApH-VqU3noaVrh_aewM",
    authDomain: "chat-app-with-next.firebaseapp.com",
    databaseURL: "https://chat-app-with-next.firebaseio.com",
    projectId: "chat-app-with-next",
    storageBucket: "chat-app-with-next.appspot.com",
    messagingSenderId: "96444999089",
    appId: "1:96444999089:web:dbaefa622fbe97c6f90990"
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = sweet(firebase.firestore);
const firestore = firebase.firestore();

export {firebase,db,firestore}
