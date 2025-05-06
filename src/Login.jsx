// src/Login.jsx
import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

const Login = () => {
  const signIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log("User signed in:", result.user);
      })
      .catch((error) => {
        console.error("Error during sign in:", error);
      });
  };

  return (
    <div className="container">
      <h2>Please Sign In</h2>
      <button onClick={signIn}>Sign in with Google</button>
    </div>
  );
};

export default Login;
