import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../src/App.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./register.css";

function Login({ onLogin }) {
  const [name, setName] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    pass: "",
    cpass: "",
    username: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = () => {
    if (formData.pass !== formData.cpass) {
      setError("Passwords do not match");
      return false;
    }
    setError(null);
    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (name === "register" && !validatePassword()) {
      return;
    }

    const { username, email, pass: password } = formData;
    const url = name === "register" ? "http://127.0.0.1:8080/api/register" : "http://127.0.0.1:8080/api/login";
    const payload = name === "register" ? { userName: username, email, password } : { email, password };

    try {
      const response = await axios.post(url, payload);
      const user = response.data;
      localStorage.setItem("com.questapp.user", JSON.stringify(user));
      onLogin(user); // Call onLogin function passed from App.jsx
      setFormData({ email: "", pass: "", cpass: "", username: "" }); // Reset form data
      navigate(name === "register" ? "/" : "/react/home");
    } catch (error) {
      const errorMessage = name === "register" ? "Registration failed. Please try again." : "Invalid email or password. Please try again.";
      setError(errorMessage);
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("com.questapp.user");
    if (storedUser !== null && storedUser !== undefined) {
      navigate("/react/home");
    }
  }, [navigate]);
  

  return (
    <div className="App">
      <div className="body2">
        <form className="log" onSubmit={handleFormSubmit}>
          {name === "register" && (
            <div className="mb-3">
              <label htmlFor="username" className="text-dark form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                id="username"
                name="username"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="exampleInputEmail" className="text-dark form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              name="email"
              id="exampleInputEmail"
              aria-describedby="emailHelp"
              required
            />
            <small id="emailHelp" className="text-dark">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1" className="text-dark form-label">
              Password
            </label>
            <input
              type="password"
              name="pass"
              value={formData.pass}
              onChange={handleChange}
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          {name === "register" && (
            <div className="mb-3">
              <label htmlFor="confirm_password" className="text-dark form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                value={formData.cpass}
                onChange={handleChange}
                onBlur={validatePassword}
                id="confirm_password"
                name="cpass"
                required
              />
              {error && <small className="text-danger">{error}</small>}
            </div>
          )}
          <div className="r">
            <button
              type="submit"
              onClick={() => setName("login")}
              className={name === "login" ? "btn btn-primary" : "sbtn"}
            >
              Sign-in
            </button>
            <button
              type="submit"
              onClick={() => setName("register")}
              className={name === "register" ? "btn btn-primary" : "btn btn-primary sbtn"}
            >
              Sign-up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
