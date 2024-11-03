import React, { useState, useEffect } from 'react';
import "../../src/App.css";
import "./register.css";
import axios from 'axios';

const ProfileModal = ({ handleClose }) => {
  const [user, setUser] = useState({ id: '', userName: '' });
  const [file, setFile] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('com.questapp.user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('userId', user.id);
    formData.append('userName', user.userName);
    if (file) {
      formData.append('file', file);
    }
    else{
      formData.append('file', null)
    }
    try {
      await axios.put('http://127.0.0.1:8080/api/update/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      handleClose();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="body2">
      <div className="log">
        <button style={{ marginLeft: 400 }} className="close" onClick={handleClose}>&times;</button>
        <form className='log' onSubmit={handleSubmit}>
          <label className='text-dark form-label'>
            User ID:
            <input type="text" className='form-control' disabled name="id" value={user.id || ''} onChange={handleChange} />
          </label>
          <label className='text-dark form-label'>
            User Name:
            <input type="text" name="userName" className='form-control' value={user.userName || ''} onChange={handleChange} />
          </label>
          <label className='text-dark form-label'>
            <input type="file" name="file" onChange={handleFileChange}  required />
          </label>
          <button type="submit" className='btn btn-primary'>Save</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
