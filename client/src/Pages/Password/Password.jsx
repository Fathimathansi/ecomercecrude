import React, { useState } from 'react';
import './Password.css';
import { useNavigate } from 'react-router-dom';

function Password() {
  const [formData, setFormData] = useState({
    email: ""
  });

  const [errors, setErrors] = useState({
    email: ""
  });

  const navigate = useNavigate(); 

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
      alert("Reset instructions sent to your email.");
      navigate("/reset"); 
    }
  };

  const validateForm = () => {
    let formErrors = {
      email: ""
    };
    let isValid = true;

    if (!formData.email) {
      formErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Invalid email format";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  return (
    <div className="password-reset1">
      <h1 className="heading">Forgot Password?</h1>
      <p className="text-light">
        Enter your email below to receive your password reset instructions.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <div className="error">{errors.email}</div>}

        <br /><br />
        <button type="submit" className="submit-button">Next</button>
      </form>
    </div>
  );
}

export default Password;
