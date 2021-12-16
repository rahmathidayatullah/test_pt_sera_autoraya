// import firebase from "firebase/compat/app";
// import "firebase/database";

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyARi78IWfkvXZqhZ1oEPSkkC-W-Pw1X2GQ",
  authDomain: "react-test-project-fc3b8.firebaseapp.com",
  databaseURL:
    "https://react-test-project-fc3b8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-test-project-fc3b8",
  storageBucket: "react-test-project-fc3b8.appspot.com",
  messagingSenderId: "31524657363",
  appId: "1:31524657363:web:0445884c3e40a7c3179c26",
};

// Initialize Firebase
// const fireDb = firebase.initializeApp(firebaseConfig);
// export default fireDb.database().ref();

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

export default database;
