import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDG1odWKaHocmdAPH8HcJ4dno5XG_LUod4",
    authDomain: "fir-tutorial-c0ab9.firebaseapp.com",
    projectId: "fir-tutorial-c0ab9",
    storageBucket: "fir-tutorial-c0ab9.appspot.com",
    messagingSenderId: "907626071093",
    appId: "1:907626071093:web:84ad00fd89dfc6dce09d7c",
    measurementId: "G-GKJBEFC0X6"
  };

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);