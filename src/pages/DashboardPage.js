import "../App.css";
import { useState, useReducer, useEffect } from "react";
import AdList from "../components/AdList.js";
import Dashboard from "../components/Dashboard.js";
import { NewAdButton, NewAdPopup } from "../components/NewAd.js";

import { useAuthState } from "react-firebase-hooks/auth";
import { LogoutButton } from "./UserAuth.js";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase.js";
import {
  query,
  collection,
  getDoc,
  where,
  setDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [ads, setAds] = useState([]);
  const [adIndex, dispatchAdIndex] = useReducer((_, action) => {
    return Math.max(-1, action);
  }, Math.max(-1, ads.length - 1));
  const [isNewAdModalOpen, toggleNewAdModal] = useReducer((state, _) => {
    return !state;
  }, false);
  const [user, loading, error] = useAuthState(auth);
  const [userRef, setUserRef] = useState(null);
  const navigate = useNavigate();
  const fetchUserData = async () => {
    try {
      console.log("hello");
      console.log(user.uid);
      const q = doc(db, "users", user.uid);
      const docSnap = await getDoc(q);
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          ads: [],
        });
      }
      const data = docSnap.data();
      setAds(data.ads || []);
      setUserRef(docSnap.ref);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    fetchUserData();
  }, [user, loading, navigate]);
  return (
    <div className="App">
      <img className="logo-img" src="/logo.png" alt="gymbuddy" />
      <header>
        <NewAdButton setAds={setAds} toggleNewAdModal={toggleNewAdModal} />
        <LogoutButton />
      </header>
      <AdList ads={ads} adIndex={adIndex} handleAdIndex={dispatchAdIndex} />
      <Dashboard ads={ads} adIndex={adIndex} />
      <NewAdPopup
        toggleNewAdModal={toggleNewAdModal}
        isNewAdModalOpen={isNewAdModalOpen}
        userRef={userRef}
        setAds={setAds}
        ads={ads}
      />
    </div>
  );
}

export default App;
