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
import "./profile.css";


const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Subscribe to Firebase authentication state.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleProfileClick = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    signOut(auth);
    setShowDropdown(false);
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <Router>
      {/* Navbar with logo, links, and the profile button */}
      <div className="navbar">
        <div className="logo">FB Auth</div>
        <nav>
          <Link to="/public">Public Page</Link>
          {user ? (
            <Link to="/protected">Protected Page</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
        {user && (
          <div className="profile-container">
            <button className="profile-button" onClick={handleProfileClick}>
              {user.displayName}
            </button>
            {showDropdown && (
              <div className="dropdown-menu">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main content container */}
      <div className="container">
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
