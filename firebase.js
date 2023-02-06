// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import * as firebase from "firebase";
// import { getAuth } from "firebase/auth";
// import { apps } from "firebase/app";

import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrRrmrsjm2AOsc617aGGrUbeJATOGkExA",
  authDomain: "signal-app-clone-7d103.firebaseapp.com",
  projectId: "signal-app-clone-7d103",
  storageBucket: "signal-app-clone-7d103.appspot.com",
  messagingSenderId: "120268271690",
  appId: "1:120268271690:web:14fb83293caae9a504b6b3"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

// Initialize Cloud Firestore and get a reference to the service
//const db = getFirestore(app);

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
})

export { db, auth };

// let app;

// if (apps.length === 0) {
//   app = initializeApp(firebaseConfig)
// }
// else {
//   app = apps()
// }

// // if (firebase.apps.length === 0) {
// //   app = firebase.initializeApp(firebaseConfig)
// // }
// // else {
// //   app = firebase.app();
// // }

// const auth = getAuth(app)

// const db = app.firestore();


// export { db, auth }