import React, { useState } from 'react';
import './Adminlogin.css';
import img from "../Seller/loginpage.png";
import { useNavigate } from "react-router-dom";

function Adminlogin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    email: "",
  });

  const navigate = useNavigate();

  // ✅ Hardcoded credentials
  const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "admin123",
    email: "admin68@gmail.com",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      if (
        formData.username === ADMIN_CREDENTIALS.username &&
        formData.password === ADMIN_CREDENTIALS.password &&
        formData.email === ADMIN_CREDENTIALS.email
      ) {
        alert("Admin logged in successfully!");
        localStorage.setItem("isLoggedin", true);
        localStorage.setItem("adminEmail", ADMIN_CREDENTIALS.email);
        localStorage.setItem("adminUsername", ADMIN_CREDENTIALS.username);
        navigate("/admindashboard");
      } else {
        alert("Invalid credentials. Please try again.");
      }
    }
  }

  function validateForm() {
    let formErrors = { username: "", password: "", email: "" };
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

    if (!formData.email) {
      formErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Invalid email format";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  }

  return (
    <div className="main" style={{ backgroundImage: `url(${img})` }}>
      <form onSubmit={handleSubmit} className="login-form">
        <h1 className="log">Admin Login</h1>

        <input
          className="input"
          type="text"
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

        <input
          className="input"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <div className="error">{errors.email}</div>}

        <button type="submit" className="log1">Login</button>
      </form>
    </div>
  );
}

export default Adminlogin;
