
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config ={
        apiKey: "AIzaSyCNDmQPsUwtBGP-hoCFIc1mVyCPw77vAno",
        authDomain: "webcommauth.firebaseapp.com",
        projectId: "webcommauth",
        storageBucket: "webcommauth.appspot.com",
        messagingSenderId: "492345057915",
        appId: "1:492345057915:web:3745e687d551192a7ef8de",
        measurementId: "G-BNZNQV6TTP"
};


firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
