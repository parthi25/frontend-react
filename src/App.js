import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../src/App.css";
import ProfileDashboard from "./components/ProfileDashboard";
import ProfileModal from "./components/ProfileModal.jsx";

const App = () => {
  const [user, setUser] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [admin, setAdmin] = useState(false);

  // Handle user edit click (show profile modal)
  const handleEditClick = () => {
    setShowProfileModal(true);
    setShowDashboard(false);
  };

  // Close the profile modal
  const closeEdit = () => {
    setShowProfileModal(false);
    setShowDashboard(true);
  };

  // Handle clicking on profile
  const handleProfileClick = () => {
    setShowDashboard(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setShowDashboard(false);
  };

  // Handle logout
  const handleLogout = () => {
    setShowDashboard(false);
    setUser(null);
    localStorage.removeItem("com.questapp.user");
  };

  // Set up useEffect to check for changes in localStorage and update state
  useEffect(() => {
    // Function to retrieve the user from localStorage
    const retrieveUser = () => {
      const storedUser = localStorage.getItem("com.questapp.user");
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // Set the user state from localStorage
      } else {
        setUser(null);
      }
    };

    // Retrieve the user when the component mounts
    retrieveUser();

    // Listen for changes in localStorage
    window.addEventListener("storage", retrieveUser);

    // Clean up listener when component unmounts
    return () => {
      window.removeEventListener("storage", retrieveUser);
    };
  }, []); // Empty dependency array means this runs only once when the component mounts

  // Check for admin in localStorage
  useEffect(() => {
    if (localStorage.getItem("admin")) {
      setAdmin(true);
    }
  }, []); // Admin check is independent of user state, so runs once on mount

  console.log("Render App component");

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary navbar-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <NavLink to="/" className="navbar-brand">
            <i>
              <b>QUESTAPP</b>
            </i>
          </NavLink>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to={user ? "/react/home" : "/"} className="nav-link active" aria-current="page">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about-us" className="nav-link">
                  About Us
                </NavLink>
              </li>
              {!user && (
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              )}
              {user && (
                <li className="nav-item">
                  <button onClick={handleLogout} className="nav-link">
                    Logout
                  </button>
                </li>
              )}
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            {admin && (
              <NavLink
                to="/admin"
                className="nav-link"
                onClick={() => { localStorage.removeItem("admin"); setAdmin(false); }}
              >
                Admin
              </NavLink>
            )}
            {user && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <i className="fas fa-user" style={{ cursor: "pointer" }} onClick={handleProfileClick}>
                  <h2>{user.user_name}</h2>
                </i>
              </div>
            )}
          </div>
        </div>
      </nav>
      {showDashboard && (
        <ProfileDashboard
          userId={user?.id}
          handleClose={handleCloseModal}
          handleEditClick={handleEditClick}
          handleLogout={handleLogout}
        />
      )}
      {showProfileModal && (
        <ProfileModal
          showProfileModal={showProfileModal}
          handleClose={closeEdit}
        />
      )}
    </div>
  );
};

export default App;
