
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

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// Authentication via Email and Google
ui.start('#firebaseui-auth-container', {
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: false
      },
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      scopes: ['https://www.googleapis.com/auth/contacts.readonly'],
      customParameters: {
        // Forces account selection even when one account is available.
        prompt: 'select_account'
      }
    }
  ],
  // Other config options...
});


// code to create a new instance of authentication
var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

// UI ocnfig
var uiConfig = {
callbacks: {
  signInSuccessWithAuthResult: function(authResult, redirectUrl) {
    // User successfully signed in.
    // Return type determines whether we continue the redirect automatically
    // or whether we leave that to developer to handle.
    return true;
  },
  uiShown: function() {
    // The widget is rendered.
    // Hide the loader.
    document.getElementById('loader').style.display = 'none';
  }
},
// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
signInFlow: 'redirect',
  // we will determine sign in success url in the future
signInSuccessUrl: '/make-your-date.html',
signInOptions: [
  // Leave the lines as is for the providers you want to offer your users.
  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  firebase.auth.EmailAuthProvider.PROVIDER_ID
],
// Terms of service url.
tosUrl: '<your-tos-url>',
// Privacy policy url.
privacyPolicyUrl: '<your-privacy-policy-url>'
};