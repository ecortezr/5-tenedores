import firebase from "firebase/app";

firebaseConfig = {
  apiKey: "AIzaSyDw0yL0HWL_zapIJCdsgEHRqk1D4bOX06w",
  authDomain: "tenedores-5.firebaseapp.com",
  databaseURL: "https://tenedores-5.firebaseio.com",
  projectId: "tenedores-5",
  storageBucket: "tenedores-5.appspot.com",
  messagingSenderId: "622540523004",
  appId: "1:622540523004:web:5ec0f50ea2cc7234"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
