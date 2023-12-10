import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import DashboardPage from "./pages/DashboardPage";
import IndexPage from "./pages/IndexPage";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LoginPage, RegisterPage, ResetPage } from "./pages/UserAuth";
import { ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <ChakraProvider> */}
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" Component={DashboardPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/register" Component={RegisterPage} />
        <Route path="/reset" Component={ResetPage} />
        <Route path="/" Component={IndexPage} />
      </Routes>
    </BrowserRouter>
    {/* </ChakraProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
