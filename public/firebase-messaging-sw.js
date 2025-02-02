importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');


// Your Firebase config
const firebaseConfig = {
	apiKey: "AIzaSyA4oPwvgyL0umuWb66WLyNxbf-k2gGKglc",
	authDomain: "shahbaz-eb776.firebaseapp.com",
	databaseURL: "https://shahbaz-eb776-default-rtdb.firebaseio.com",
	projectId: "shahbaz-eb776",
	storageBucket: "shahbaz-eb776.appspot.com",
	messagingSenderId: "389233998805",
	appId: "1:389233998805:web:1f81a9a4532c96aa215b5c",
	measurementId: "G-9CBQJBF52G",
};



firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
    return self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: '/icon.png'
    });
});