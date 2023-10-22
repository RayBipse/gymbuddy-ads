import "./App.css";
import { useState, useReducer } from "react";
import AdList from "./components/AdList.js";
import Dashboard from "./components/Dashboard";
import { LoginButton, LoginPopup } from "./components/Login";

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
  return (
    <div className="App">
      <header>
        <button>Upload New ad</button>
        <LoginButton />
      </header>
      <AdList ads={ads} adIndex={adIndex} handleAdIndex={dispatchAdIndex} />
      <Dashboard ads={ads} adIndex={adIndex} />
      <LoginPopup />
    </div>
  );
}

export default App;
