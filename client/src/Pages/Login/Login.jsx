import React, { useState } from 'react';
import './Login.css';
import img from "../Login/loginimage.png";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      const storedUsername = localStorage.getItem("firstName");
      const storedPassword = localStorage.getItem("password");

      
      if (formData.username === storedUsername && formData.password === storedPassword) {
        alert("Logged in successfully!");
        
        navigate("/home")
        localStorage.setItem("isLoggedin",true)
      } else {
        alert("Invalid credentials. Please try again.");
      }
    }
  }

  function validateForm() {
    let formErrors = { username: "", password: "" };
    let isValid = true;

    if (!formData.username) {
      formErrors.username = "Username is required";
      isValid = false;
    }

    if (!formData.password) {
      formErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  }

  return (
    <div className="main" style={{ backgroundImage: `url(${img})` }}>
      <form onSubmit={handleSubmit} className="login-form">
        <h1 className="log">Login</h1>
        <p className="para2">
          Don't have an account?{" "}
          <Link className="link" to="/signup">Create Your Account</Link>
        </p>

        <input
          className="input"
          type="text"
          id="loguser"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <div className="error">{errors.username}</div>}

        <input
          className="input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <div className="error">{errors.password}</div>}

        <div className="checkbox-row">
          <div>
            <input className="check" type="checkbox" id="remember" />
            <label className="remember" htmlFor="remember">Remember me</label>
          </div>
          <Link className="forget" to="/password">Forget Password?</Link>
        </div>

        <button type="submit" className="log1">Login</button>

        <p className="signup-text">Don't have an account? <Link className="signup" to="/signup">Signup</Link></p>
      </form>
    </div>
  );
}

export default Login;
