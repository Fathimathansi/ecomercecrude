import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Loginpage.css';
import img from "../Seller/loginpage.png";

function Loginpage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // ✅ fixed
    });
  };

  function validateForm() {
    let formErrors = { email: "", password: "" };
    let isValid = true;

    if (!formData.email) {
      formErrors.email = "Email is required";
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

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    axios.post('http://localhost:3000/sellerfindone', { email: formData.email })
      .then((result) => {
        const seller = result.data.seller;
        console.log(seller);

        if (!seller) {
          alert("Seller not found. Please sign up first.");
          return;
        }

        if (seller.password !== formData.password) {
          alert("Invalid email or password.");
          return;
        }

        if (seller.status !== "approved") {
          alert("Admin has not approved your account yet. Please wait for approval.");
          return;
        }

        // ✅ Login successful
        localStorage.setItem("sellerid", seller._id);
        alert("Login successful!");
        navigate("/sellerdashboard");
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong. Please try again later.");
      });
  }

  return (
    <div className="main" style={{ backgroundImage: `url(${img})` }}>
      <form onSubmit={handleSubmit} className="login-form">
        <h1 className="log">Login</h1>
        <p className="para2">Don't have an account?</p>

        <input
          className="input"
          type="email"
          id="loguser"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <div className="error">{errors.email}</div>} {/* ✅ fixed */}

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
          <Link className="forget" to="/forgetpage">Forget Password?</Link>
        </div>

        <button type="submit" className="log1">Login</button>

        <p className="signup-text">
          Don't have an account? <Link className="signup" to="/signupage">Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default Loginpage;
