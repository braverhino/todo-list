import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB9RKzl9Tqwx0nhqYVW5l6c5ZBPobURc1I",
  authDomain: "todoapp-11ii1.firebaseapp.com",
  projectId: "todoapp-11ii1",
  storageBucket: "todoapp-11ii1.appspot.com",
  messagingSenderId: "390579362602",
  appId: "1:390579362602:web:574582d1cf375d8fbe9c53"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};