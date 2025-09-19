import React, { useState } from 'react';
import './Login.css';
import img from "../Login/loginimage.png";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // ✅ Fix: use e.target instead of event.target
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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

  axios.post('http://localhost:3000/findone', { email: formData.email })
    .then((result) => {
      const user = result.data.user;
      console.log(user);

      if (!user) {
        alert("User not found. Please sign up first.");
        return;
      }

      if (user.password === formData.password) {
        // ✅ Save correct user._id into localStorage
        localStorage.setItem("userId", user._id);

        alert("Login successful!");
        navigate("/homepage");
      } else {
        alert("Invalid email or password.");
      }
    })
    .catch((error) => {
      console.error("Login error:", error);
    });
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
          type="email"
          id="loguser"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <div className="error">{errors.email}</div>}

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

        <p className="signup-text">
          Don't have an account? <Link className="signup" to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
