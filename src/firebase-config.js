import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD5do7PbI3lWpwuT5KSmejah5TimQzK-ng",
    authDomain: "deliveryfood-9c436.firebaseapp.com",
    projectId: "deliveryfood-9c436",
    storageBucket: "deliveryfood-9c436.appspot.com",
    messagingSenderId: "682756485581",
    appId: "1:682756485581:web:7bcb0b616d335b81285484",
    measurementId: "G-0HQRH50TQ3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
