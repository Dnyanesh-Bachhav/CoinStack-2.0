import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCB6UmGsvAY4uH6Gaiz6Vz0gjhhVeWc1B0",
    authDomain: "coinstack-ce1c2.firebaseapp.com",
    projectId: "coinstack-ce1c2",
    storageBucket: "coinstack-ce1c2.appspot.com",
    messagingSenderId: "674721262423",
    appId: "1:674721262423:web:7fe944dc4ef1ff977f6c12",
    measurementId: "G-TVDEJ6GNLL"
};

const app = initializeApp(firebaseConfig);
export default app;
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
