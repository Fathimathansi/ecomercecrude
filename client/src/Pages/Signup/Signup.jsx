import React, { useState } from 'react';
import './signup.css';
import { Link } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    tel: "",
    address: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem("firstName", formData.firstName);
      localStorage.setItem("lastName", formData.lastName);
      localStorage.setItem("email", formData.email);
      localStorage.setItem("tel", formData.tel);
      localStorage.setItem("address", formData.address);
      localStorage.setItem("password", formData.password);
      alert("Form submitted successfully");
    }
  };

  const validateForm = () => {
    const formErrors = {};
    let isValid = true;

    if (!formData.firstName) {
      formErrors.firstName = "First name is required";
      isValid = false;
    }
    if (!formData.lastName) {
      formErrors.lastName = "Last name is required";
      isValid = false;
    }
    if (!formData.email) {
      formErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Invalid email format";
      isValid = false;
    }
    if (!formData.tel) {
      formErrors.tel = "Mobile number is required";
      isValid = false;
    }
    if (!formData.address) {
      formErrors.address = "Address is required";
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
  };



  return (
    <div className="main1">
      <form className="form-container" onSubmit={handleSubmit}>
        <h1 className="log">Sign-up</h1>

        <div className="input-group">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <div className="error">{errors.firstName}</div>}
        </div>

        <div className="input-group">
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <div className="error">{errors.lastName}</div>}
        </div>

        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>

        <div className="input-group">
          <input
            type="tel"
            name="tel"
            placeholder="Mobile Number"
            value={formData.tel}
            onChange={handleChange}
          />
          {errors.tel && <div className="error">{errors.tel}</div>}
        </div>

        <div className="input-group">
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <div className="error">{errors.address}</div>}
        </div>

        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            
            value={formData.password}
            onChange={handleChange}
          />
             
          {errors.password && <div className="error">{errors.password}</div>}
        </div>

        <button type="submit" className="sign_up">Signup</button>

        <p className="last_content text-light">
          Already have an account? <Link className="login" to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
