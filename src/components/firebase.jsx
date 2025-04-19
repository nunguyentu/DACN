// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";// nếu bạn dùng Realtime Database
import { getAnalytics } from "firebase/analytics" 

const firebaseConfig = {
  apiKey: "AIzaSyAMmpFEO3Aw6QNOq_QHFVJK2FWEpk3Mb8I",
  authDomain: "webhoadp.com",
  projectId: "webhoadp",
  storageBucket: "webhoadp.firebasestorage.app",
  messagingSenderId: "666091956422",
  appId: "1:666091956422:web:c534f682d249d9489a4fc7",
  measurementId: "G-EM3Z6G3WP3"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Realtime Database và export
const database = getDatabase(app);
export { database };
const analytics = getAnalytics(app);