// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
// const { getAnalytics } = require("firebase/analytics");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9221SHKqYBLDbhU0FHlXCjClNngazB_U",
  authDomain: "childtrackr-app.firebaseapp.com",
  projectId: "childtrackr-app",
  storageBucket: "childtrackr-app.appspot.com",
  messagingSenderId: "578179113949",
  appId: "1:578179113949:web:11e790e95330a888cb4c34",
  measurementId: "G-K5HJH00B5G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// firebaseConfig.js
module.exports = firebaseConfig;
