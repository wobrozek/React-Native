import { initializeApp } from 'firebase/app';
// import {...} from "firebase/auth";
import { getFirestore } from 'firebase/firestore'


CONFIGURE_FIREBASE={apiKey: "AIzaSyC2XfPmMxIazYzptJR814BHO0R5BVzoj3o",authDomain: "filmlibary.firebaseapp.com",projectId: "filmlibary",storageBucket: "filmlibary.appspot.com",messagingSenderId: "165231365975",appId:"1:165231365975:web:3a4f01e98d6872c3f23812",measurementId: "G-7X9E9SNM4W"}

const app = initializeApp(CONFIGURE_FIREBASE);

  // firebase
export const db = getFirestore(app);