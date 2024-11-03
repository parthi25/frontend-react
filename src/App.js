import React, { useEffect, useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../src/App.css";
import ProfileDashboard from "./components/ProfileDashboard";
import ProfileModal from "./components/ProfileModal.jsx";
import Login from "./components/login.jsx"; // Ensure the correct path to Login component

const App = () => {
  const [user, setUser] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [admin, setAdmin] = useState(false);

  const handleEditClick = () => {
    setShowProfileModal(true);
    setShowDashboard(false);
  };

  const closeEdit = () => {
    setShowProfileModal(false);
    setShowDashboard(true);
  };

  const handleProfileClick = () => {
    setShowDashboard(true);
  };

  const handleCloseModal = () => {
    setShowDashboard(false);
  };

  const handleLogout = () => {
    setShowDashboard(false);
    setUser(null);
    localStorage.removeItem("com.questapp.user");
  };

  const handleLogin = useCallback((userData) => {
    setUser(userData);
    setShowLogin(false);
  }, []); // Dependencies are empty, so this won't change unless the component is remounted.

  const toggleLogin = useCallback(() => {
    console.log("Toggle login clicked");
    setShowLogin(prevShowLogin => !prevShowLogin); // Using functional update for better performance
    console.log('login', showLogin);
  }, [showLogin]); // Same here, we want to keep this function stable.

  useEffect(() => {
    const storedUser = localStorage.getItem("com.questapp.user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (localStorage.getItem("admin")) {
      setAdmin(true);
    }
  }, [showLogin]);

  console.log("Render App component");

  return (
    <div >
      <nav className="navbar navbar-expand-lg  bg-primary navbar-light ">
        <div className="container-fluid ">
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
          <NavLink to="/" className="navbar-brand " onClick={handleLogin}>
            <i><b>QUESTAPP</b></i>
          </NavLink>
          <div className="collapse navbar-collapse " id="navbarTogglerDemo03">
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
              <li className="nav-item">
                <button onClick={toggleLogin} className="nav-link">
                  Login
                </button>
              </li>
            </ul>
            <form className="d-flex ">
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
              <NavLink to={"/admin"} className="nav-link" onClick={() => { localStorage.removeItem("admin"); setAdmin(false); }}>
                Logout
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

     {!user| user === "User created" && showLogin && <Login onLogin={handleLogin} />}
  
      </div>  
  );
};

export default App;
