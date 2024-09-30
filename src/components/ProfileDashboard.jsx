import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../src/App.css";
import "./register.css";

const ProfileDashboard = ({ userId, handleClose, handleEditClick, handleLogout }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [user, setUser] = useState(userId);
  const [userdata, setUserdata] = useState(null);

  const handleScore = ()=>{
    navigate("/user/score")
    handleClose()
  }

  useEffect(() => {
    if (!userId) {
      const storedUser = JSON.parse(localStorage.getItem("com.questapp.user"));
      if (storedUser && storedUser.id) {
        setUser(storedUser.id);
      } else {
        console.error('No user ID found in local storage');
      }
    } else {
      setUser(userId);
    }
  }, [userId]);

  useEffect(() => {
    const fetchProfileAndUserData = async () => {
      if (user) {
        try {
          const profileResponse = await axios.post("http://127.0.0.1:8080/api/profile", { id: user }, {
            headers: { "Content-Type": "application/json" }
          });

          const userResponse = await axios.post("http://127.0.0.1:8080/api/find/user", { id: user }, {
            headers: { "Content-Type": "application/json" }
          });

          setProfile(profileResponse.data);
          setUserdata(userResponse.data);
          console.log("Profile data:", profileResponse.data);
          console.log("User data:", userResponse.data);
        } catch (error) {
          console.error('Error fetching profile or user data:', error);
        }
      }
    };
    fetchProfileAndUserData();
    console.log(profile)
  }, [user]);

  const onLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("com.questapp.user");
    navigate("/");
    handleLogout();
  };

  return (
    <div className="body2">
      <form className='log' encType="multipart/form-data">
        <div className="profile-dashboard">
          <div className="profile-header">
            <img src={profile?.url} alt="Profile" className="profile-image" />
          </div>
          <div className="profile-details">
            <h2>Profile Details</h2>
            <p><strong>User ID: </strong>{userdata?.id}</p>
            <p><strong>Name: </strong>{userdata?.user_name}</p>
          </div>
          <button type="button" className="btn btn-primary mt-3" onClick={handleEditClick}>
            Edit Profile
          </button><div style={{  display: "flex", alignItems: "center" }}>
              <button type="button" className="btn btn-primary mt-3" onClick={handleScore}>
                ViewScore
              </button>
            </div>
          <div className='mt-4' style={{ marginTop: 6, display: "flex", alignItems: "space-between",justifyContent:"space-between" }}>
            <button type="button" className="btn btn-primary" onClick={onLogout}>
              Logout
            </button>
            <div style={{ marginLeft: 5, display: "flex", alignItems: "center" }}>
              <button type="button" className="btn btn-primary" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileDashboard;
