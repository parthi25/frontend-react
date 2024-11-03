import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAxios } from './custom/useAxios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Admin() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(0);
  const navigate = useNavigate();

  const { data, error: fetchError, fetchData } = useAxios();

  const signin = async (e) => {
    e.preventDefault();
    if (name === '' || password === '') {
      setError(1);
    } else {
      try {
        await fetchData("http://127.0.0.1:8080/api/admin", { admin: name, password });
       
      } catch (error) {
        console.error("Error signing in:", error);
        setError(2);
      }
      if (data === "admin") {

        localStorage.setItem("admin","admin")
        navigate("/admin/home");
      } else {
        setError(2);
      }
    }
  };

  return (
    <div className="App">
      <div className="body2">
        <form className="log" onSubmit={signin}>
          {error === 1 && <small className="text-danger">Please fill all fields</small>}
          {error === 2 && <small className="text-danger">Click again to confirm</small>}
          {fetchError && <small className="text-danger">An error occurred</small>}
          <div className="form-group">
            <label htmlFor="exampleInputName" className="text-dark form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              name="name"
              id="exampleInputName"
              aria-describedby="nameHelp"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1" className="text-dark form-label">
              Password
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          <div className="r">
            <button
              type="submit"
              className="btn btn-primary"
            >
              Sign-in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Admin;
