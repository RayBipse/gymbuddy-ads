import "./App.css";
import { useState, useReducer } from "react";
import AdList from "./components/AdList.js";
import Dashboard from "./components/Dashboard";
import { LoginButton, LoginPopup } from "./components/Login";
import { NewAdButton, NewAdPopup } from "./components/NewAd";

function App() {
  const [ads, setAds] = useState([
    {
      key: 0,
      title: "title 1",
      image_src: "",
      clicks: 1000,
      views: 1001,
      screenshots: 1002,
    },
    {
      key: 1,
      title: "title 2",
      image_src: "",
      clicks: 100000,
      views: 100001,
      screenshots: 100002,
    },
  ]);
  const [adIndex, dispatchAdIndex] = useReducer((_, action) => {
    return Math.max(-1, Math.min(action, ads.length - 1));
  }, Math.max(-1, ads.length - 1));
  const [isLoginModalOpen, toggleLoginModal] = useReducer((state, _) => {
    return !state;
  }, false);
  const [isNewAdModalOpen, toggleNewAdModal] = useReducer((state, _) => {
    return !state;
  }, false);
  return (
    <div className="App">
      <img className="logo-img" src="/logo.png" alt="gymbuddy" />
      <header>
        <NewAdButton setAds={setAds} toggleNewAdModal={toggleNewAdModal} />
        <LoginButton toggleLoginModal={toggleLoginModal} />
      </header>
      <AdList ads={ads} adIndex={adIndex} handleAdIndex={dispatchAdIndex} />
      <Dashboard ads={ads} adIndex={adIndex} />
      <LoginPopup isLoginModalOpen={isLoginModalOpen} />
      <NewAdPopup isNewAdModalOpen={isNewAdModalOpen} />
    </div>
  );
}

export default App;
