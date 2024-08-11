importScripts("https://www.gstatic.com/firebasejs/7.15.5/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.15.5/firebase-messaging.js");

//Using singleton breaks instantiating messaging()
// App firebase = FirebaseWeb.instance.app;


firebase.initializeApp({
    apiKey: 'AIzaSyATNW2PVUxDIjcqKGKbOVt5fOWpfJjEOqU',
    appId: '1:134398201098:web:20a77c87a4f38ba1ed7ef3',
    messagingSenderId: '134398201098',
    projectId: 'beautydoor-b1058',
    authDomain: 'beautydoor-b1058.firebaseapp.com',
    storageBucket: 'beautydoor-b1058.appspot.com',
    measurementId: 'G-Y5TKYJH6VB',
});



const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            return registration.showNotification("New Message");
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});