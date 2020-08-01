
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
  signInSuccessUrl: 'https://youthful-austin-e8326e.netlify.app/make-your-date.html',
  signInOptions: [
    // {
    //   provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //     requireDisplayName: false
    //   },
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
    return false;
  },
  uiShown: function() {
    // The widget is rendered.
    // Hide the loader.
    document.getElementById('loader').style.display = 'none';
  }
},
// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
signInFlow: 'redirect',
signInSuccessUrl: '/https://youthful-austin-e8326e.netlify.app/make-your-date.html',
signInOptions: [
  // Leave the lines as is for the providers you want to offer your users.
  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  firebase.auth.EmailAuthProvider.PROVIDER_ID
],
};











// This part of the code is for the login form
// get sign-in.html elements
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');
const bannerSignIn = document.getElementById('bannerSignIn');
const bannerLogout = document.getElementById('bannerLogout')

//login event for sign-in.html
btnLogin.addEventListener('click', e => {
  // Get email and pass
  const email = txtEmail.value;
  const pass = txtPassword.value;
  
firebase.auth().signInWithEmailAndPassword(email, pass)

.then(function(){
  console.log("redirect")
  window.location.href = "https://youthful-austin-e8326e.netlify.app/make-your-date.html";

})
.catch(function(error){
  console.log(error);
});

});
// signup event
btnSignUp.addEventListener('click', e=> {
  const email = txtEmail.value;
  const pass = txtPassword.value;
  
firebase.auth().createUserWithEmailAndPassword(email, pass).then(user => console.log()).catch(function(error){
  console.log(error);
});
});

// sign in redirect
bannerSignIn.addEventListener('click', e=> {
 window.location = "https://youthful-austin-e8326e.netlify.app/sign-in.html"
});

// Log Out event
btnLogout.addEventListener('click', e => {
  firebase.auth().signOut();
  window.location = "https://youthful-austin-e8326e.netlify.app/index.html";
});

bannerLogout.addEventListener('click', e => {
  firebase.auth().signOut();
  window.location = "https://youthful-austin-e8326e.netlify.app/index.html";
});

//realtime authentication listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    console.log(firebaseUser);
    btnLogout.classList.remove('d-none');
    bannerLogout.classList.remove('d-none');
    bannerSignIn.classList.add('d-none');
    btnLogin.classList.add('d-none');

  } else {
    console.log('not logged in');
    btnLogout.classList.add('d-none');
    bannerLogout.classList.add('d-none');
    bannerSignIn.classList.remove('d-none');
    btnLogin.classList.remove('d-none');
  }
});
console.log(firebaseuser);