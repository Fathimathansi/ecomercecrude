import React, { useState } from 'react';
import './Reset.css';
import { Link, useNavigate } from 'react-router-dom';

function Reset() {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formErrors = {
      password: '',
      confirmPassword: ''
    };

    let isValid = true;

    if (!formData.password) {
      formErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!formData.confirmPassword) {
      formErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(formErrors);

    if (isValid) {
      alert('Password reset successful!');
      navigate('/login'); 
    }
  };

  return (
    <div className='full_reset'>
      <h1 className='reset_heading'>Reset Password!</h1>
      <p className='tex-light'>
        Your new password must be different<br />from your previous password.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          className="form"
          name="password"
          placeholder="Enter the New Password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <div className="error">{errors.password}</div>}

        <br /><br />

        <input
          type="password"
          className="form"
          name="confirmPassword"
          placeholder="Re-enter the New Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}

        <br /><br />
        <button className='reset_btn' type="submit">Confirm</button>
      </form>
    </div>
  );
}

export default Reset;
