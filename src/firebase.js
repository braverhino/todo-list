import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

// const firebaseConfig = {
//   apiKey: "AIzaSyB9RKzl9Tqwx0nhqYVW5l6c5ZBPobURc1I",
//   authDomain: "todoapp-11ii1.firebaseapp.com",
//   projectId: "todoapp-11ii1",
//   storageBucket: "todoapp-11ii1.appspot.com",
//   messagingSenderId: "390579362602",
//   appId: "1:390579362602:web:574582d1cf375d8fbe9c53"
// };


const firebaseConfig = {
  apiKey: "AIzaSyD2MevYd6nGYaqjd6lSlkUcJ5pypegUWtA",
  authDomain: "test-cd9bf.firebaseapp.com",
  projectId: "test-cd9bf",
  storageBucket: "test-cd9bf.appspot.com",
  messagingSenderId: "664547702610",
  appId: "1:664547702610:web:2cb764cd780689b0b2ac8b"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);

export {db};