// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAtIOCYPl-vxOAJ65OKGxrD4zmIYXb1tGM",
    authDomain: "kudosinternalwiki.firebaseapp.com",
    projectId: "kudosinternalwiki",
    storageBucket: "kudosinternalwiki.appspot.com",
    messagingSenderId: "321637472428",
    appId: "1:321637472428:web:dc973710b95aaa72a6e709",
    measurementId: "G-220GVWM35H",
    databaseURL: "https://kudosinternalwiki-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);