import "../App.css";
import { useState, useReducer, useEffect, useCallback } from "react";
import AdList from "../components/AdList.js";
import Dashboard from "../components/Dashboard.js";
import { NewAdButton, NewAdPopup } from "../components/NewAd.js";

import { useAuthState } from "react-firebase-hooks/auth";
import { LogoutButton } from "./UserAuth.js";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase.js";
import { getDoc, doc } from "firebase/firestore";
import { User, userReducer } from "../models/User.js";

function App() {
    const [firebaseUser, loading, error] = useAuthState(auth);
    const [user, dispatchUser] = useReducer(userReducer, null);
    const [adIndex, setAdIndex] = useState(-1);
    const [isNewAdModalOpen, toggleNewAdModal] = useReducer((state) => !state, false);

    const navigate = useNavigate();
    const fetchUserData = useCallback(async () => {
        try {
            const userSnapshot = await getDoc(doc("users", firebaseUser.uid));
            const userData = userSnapshot.data;
            dispatchUser({
                type: "set user",
                user: User.fromUserData(userData),
            });
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
            navigate("/login");
        }
    }, [firebaseUser, navigate]);

    useEffect(() => {
        if (loading) return;
        if (error) navigate("/login");
        if (!user) return navigate("/login");
        fetchUserData();
    }, [user, loading, error, navigate, fetchUserData]);

    return (
        <div className="App">
            <img className="logo-img" src="/logo.png" alt="gymbuddy" />
            <header>
                <NewAdButton toggleNewAdModal={toggleNewAdModal} />
                <LogoutButton />
            </header>
            <AdList user={user} adIndex={adIndex} setAdIndex={setAdIndex} />
            <Dashboard user={user} adIndex={adIndex} />
            <NewAdPopup user={user} dispatchUser={dispatchUser} toggleNewAdModal={toggleNewAdModal} isNewAdModalOpen={isNewAdModalOpen} />
        </div>
    );
}

export default App;
