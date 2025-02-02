    // firebase-config.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
	apiKey: "AIzaSyA4oPwvgyL0umuWb66WLyNxbf-k2gGKglc",
	authDomain: "shahbaz-eb776.firebaseapp.com",
	databaseURL: "https://shahbaz-eb776-default-rtdb.firebaseio.com",
	projectId: "shahbaz-eb776",
	storageBucket: "shahbaz-eb776.appspot.com",
	messagingSenderId: "389233998805",
	appId: "1:389233998805:web:1f81a9a4532c96aa215b5c",
	measurementId: "G-9CBQJBF52G",
    vapidKey: "BLB3efGPh8nqtTbsu17eGz6xhRQnaBVd-pm1B2OSFAFqZioHozXTBixlwNPhD6urfv5vOq2h60PeLQQSBRfoRII	",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export default { messaging, getToken, onMessage };
