
// firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAvBc_4-vNNsDc9yPlZeJbG0TcXJnj82-s",
    authDomain: "date-night-d7290.firebaseapp.com",
    databaseURL: "https://date-night-d7290.firebaseio.com",
    projectId: "date-night-d7290",
    storageBucket: "date-night-d7290.appspot.com",
    messagingSenderId: "88463090954",
    appId: "1:88463090954:web:57eb48541a63a2144b46f3",
    measurementId: "G-PFYG1YWFBX"
  };
// Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
// code to create a new instance of authentication
  var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

// code for bringing up a popup for google auth
firebase.auth().signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken;
    var user = result.user;
    console.log(user);
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log(error);
  });