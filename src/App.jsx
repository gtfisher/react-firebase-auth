// src/App.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./Login";
import ProtectedPage from "./ProtectedPage";
import PublicPage from "./PublicPage";
// import "./App.css";
import "./simple.css";
import "./navbar.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to Firebase authentication state.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <Router>
      {/* Navbar at the top */}
      <div className="navbar">
        <div className="logo">FB Auth</div>
        <nav>
          <Link to="/public">Public Page</Link>
          {user ? (
            <>
              <Link to="/protected">Protected Page</Link>
              {/* Optionally, you might include a logout link here */}
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </div>

      {/* Main content container */}
      <div className="container">
        {user && (
          <div>
            <h1>Welcome, {user.displayName}</h1>
            <button onClick={() => signOut(auth)}>Logout</button>
          </div>
        )}
        <Routes>
          <Route path="/public" element={<PublicPage />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/protected" />}
          />
          <Route
            path="/protected"
            element={user ? <ProtectedPage /> : <Navigate to="/login" />}
          />
          <Route path="/" element={<Navigate to="/public" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
