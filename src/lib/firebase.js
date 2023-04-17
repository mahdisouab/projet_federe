import  firebase from "./firebase";
import "firebase/firestore";
import "firebase/compat/auth";
import "firebase/compat/firestore";


const Config = {
  apiKey: "AIzaSyC1h8BknJCqXNES4fxshGTbPqxbtyiImpY",
  authDomain: "projet-federe.firebaseapp.com",
  projectId: "projet-federe",
  storageBucket: "projet-federe.appspot.com",
  messagingSenderId: "817947843477",
  appId: "1:817947843477:web:8db3072d492f28e9ecf49c",
  measurementId: "G-1XJMPKWX60",
};

firebase.initializeApp(Config);

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();


export { auth, provider, storage };
export default db;
