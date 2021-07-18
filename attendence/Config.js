import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDHIPJ7zrTUa936lp6FbNlUsu_XebeanyY",
  authDomain: "attendance-class-72e40.firebaseapp.com",
  databaseURL: "https://attendance-class-72e40-default-rtdb.firebaseio.com",
  projectId: "attendance-class-72e40",
  storageBucket: "attendance-class-72e40.appspot.com",
  messagingSenderId: "1028649773147",
  appId: "1:1028649773147:web:7a519d3ab405aa4d22377e"
};

  if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
} 
 
export default firebase.database();
