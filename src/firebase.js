import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    connectAuthEmulator,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, addDoc, arrayUnion, updateDoc, connectFirestoreEmulator } from "firebase/firestore";

import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC6rQSOjEhGTSnaFk1v9FusYHE_3CMhYeU",
    authDomain: "gymbuddy-ad-dashboard-dev.firebaseapp.com",
    projectId: "gymbuddy-ad-dashboard-dev",
    storageBucket: "gymbuddy-ad-dashboard-dev.appspot.com",
    messagingSenderId: "228518302922",
    appId: "1:228518302922:web:175103dc189473461ad033",
    measurementId: "G-WK9F89BW1K",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const storage = getStorage();
const emulating = false;
if (emulating) {
    connectFirestoreEmulator(db, "127.0.0.1", 8080);
    connectAuthEmulator(auth, "http://127.0.0.1:9099");
}
const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            ads: [],
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

export async function logInWithEmailAndPassword(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

export async function registerWithEmailAndPassword(email, password) {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            authProvider: "local",
            email,
            ads: [],
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

export async function sendPasswordReset(email) {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

export async function logout() {
    signOut(auth);
}

// export async function getUserData(userRef) {
//     const snapShot = await getDoc(userRef);
//     return snapShot.data();
// }

export async function uploadNewAd(ad, userRef) {
    updateDoc(userRef, {
        ads: arrayUnion(ad),
    });
}

export async function uploadAdImage(uid, key, ad) {
    const meta = await uploadBytes(ref(storage, `${uid}/${key}`), ad);
    return getDownloadURL(meta.ref);
}
