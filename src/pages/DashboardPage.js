import "../App.css";
import { useState, useReducer, useEffect } from "react";
import AdList from "../components/AdList.js";
import Dashboard from "../components/Dashboard.js";
import { NewAdButton, NewAdPopup } from "../components/NewAd.js";

import { useAuthState } from "react-firebase-hooks/auth";
import { LogoutButton } from "./UserAuth.js";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase.js";
import { query, collection, getDocs, where } from "firebase/firestore";

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
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setAds(data.ads || []);
      setUserRef(doc.docs[0].ref);
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
