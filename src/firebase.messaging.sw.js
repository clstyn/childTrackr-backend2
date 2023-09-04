import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyA9221SHKqYBLDbhU0FHlXCjClNngazB_U",
  authDomain: "childtrackr-app.firebaseapp.com",
  projectId: "childtrackr-app",
  storageBucket: "childtrackr-app.appspot.com",
  messagingSenderId: "578179113949",
  appId: "1:578179113949:web:11e790e95330a888cb4c34",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Mengambil objek messaging
const messaging = getMessaging(app);

export { messaging }; // Export messaging untuk digunakan di komponen lain
