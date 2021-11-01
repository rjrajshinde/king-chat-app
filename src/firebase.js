import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyBrD0oxOoJCGx7ot1CLfyRvFj6PxsLLKJw",
    authDomain: "kingchat-4c6f2.firebaseapp.com",
    projectId: "kingchat-4c6f2",
    storageBucket: "kingchat-4c6f2.appspot.com",
    messagingSenderId: "511730740009",
    appId: "1:511730740009:web:e2bea970c8228f7c0f6538",
  })
  .auth();
