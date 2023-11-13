import React, { useEffect, useState } from "react";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { Link, useNavigate } from "react-router-dom";

// https://blog.logrocket.com/user-authentication-firebase-react-apps/

export function LogoutButton() {
  return <button onClick={logout}>Logout</button>;
}

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div id="login-page">
      <main>
        <h2>Login</h2>
        <section>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label>Password</label>
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button onClick={() => logInWithEmailAndPassword(email, password)}>
            Login
          </button>
        </section>
        <h5>
          <Link to="/reset">Forgot Password</Link>
        </h5>
        <button className="google-login" onClick={signInWithGoogle}>
          Login in with Google
        </button>
        <h5>Don't have an account?</h5>
        <Link to="/register">Register here</Link>.
      </main>
    </div>
  );
}

export function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const register = () => {
    registerWithEmailAndPassword(email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div id="register-page">
      <main>
        <h2>Register</h2>
        <section>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label>Password</label>
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button
            onClick={() => {
              register(email, password);
            }}
          >
            Register
          </button>
        </section>
        <button className="google-login" onClick={signInWithGoogle}>
          Login in with Google
        </button>
        <h5>Already have an account?</h5>
        <Link to="/login">Log in here</Link>.
      </main>
    </div>
  );
}

export function ResetPage() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div id="reset-page">
      <main>
        <section>
          <h2>Reset password</h2>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <button onClick={() => sendPasswordReset(email)}>
            Send reset email
          </button>
        </section>
        <h5>
          Don't have an account? <Link to="/register">Register</Link> now.
        </h5>
      </main>
    </div>
  );
}
