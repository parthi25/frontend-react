import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../src/App.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./register.css";

function Login() {
  const [name, setName] = useState("login"); // Track whether it's login or register
  const [formData, setFormData] = useState({
    email: "",
    pass: "",
    cpass: "",
    user_name: "",
  });
  const [error, setError] = useState(null); // Track form validation errors
  const navigate = useNavigate(); // To navigate to different pages

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate password confirmation during registration
  const validatePassword = () => {
    if (formData.pass !== formData.cpass) {
      setError("Passwords do not match");
      return false;
    }
    setError(null);
    return true;
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (name === "register" && !validatePassword()) {
      return;
    }

    const { user_name: username, email, pass: password } = formData;
    const url = name === "register" ? "http://127.0.0.1:8080/api/register" : "http://127.0.0.1:8080/api/login";
    const payload = name === "register" ? { userName: username, email, password } : { email, password };

    try {
      const response = await axios.post(url, payload);
      const user = response.data;

      // Store user data in localStorage
      localStorage.setItem("com.questapp.user", JSON.stringify(user));

      // Navigate to the home page after successful login/registration
      navigate(name === "register" ? "/" : "/react/home");

      // Reset form data
      setFormData({ email: "", pass: "", cpass: "", user_name: "" });

    } catch (error) {
      // Set error message based on the type of error
      const errorMessage = name === "register" 
        ? "Registration failed. Please try again." 
        : "Invalid email or password. Please try again.";
      setError(errorMessage);
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="App">
      <div className="body2">
        <form className="form log" onSubmit={handleFormSubmit}>
          {name === "register" && (
            <div className="mb-3">
              <label htmlFor="username" className="text-dark form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.user_name}
                onChange={handleChange}
                id="user_name"
                name="user_name"
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
