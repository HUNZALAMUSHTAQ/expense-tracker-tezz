// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// import 'firebase/compat/firestore';
// import 'firebase/compat/auth';

// import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyDS1phxtXiw8qKO1CpEHGe4SwWuJwBeycQ",
    authDomain: "expense-tracker-fb980.firebaseapp.com",
    databaseURL: "https://expense-tracker-fb980-default-rtdb.firebaseio.com",
    projectId: "expense-tracker-fb980",
    storageBucket: "expense-tracker-fb980.appspot.com",
    messagingSenderId: "818104146377",
    appId: "1:818104146377:web:aea094a869be6d387bb018",
    measurementId: "G-9EN1H6C615"
};


const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

// createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//         // Signed in 
//         const user = userCredential.user;
//         console.log(user)
//         // ...
//     })
//     .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log(errorMessage)
//         // ..
//     });

// export default {auth, db}
// export  const auth = firebaseApp;