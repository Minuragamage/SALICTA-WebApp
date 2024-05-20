import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB34ETDWoWzo5ZynOQND2f_6OCsCdChEkk",
  authDomain: "salicta-c56ad.firebaseapp.com",
  projectId: "salicta-c56ad",
  storageBucket: "salicta-c56ad.appspot.com",
  messagingSenderId: "341279407350",
  appId: "1:341279407350:web:a011b845e766c3d9af00d7"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);
export {db,auth}
