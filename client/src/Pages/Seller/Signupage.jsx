import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signupage.css";

const Signupage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    tel: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
    image: null,
  });

  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({}); // store validation messages

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate as user types
    validateField(name, value);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      setPreview(URL.createObjectURL(file));
    }
  };

  // Validation function
  const validateField = (name, value) => {
    let message = "";

    if (!value && name !== "address") {
      message = "This field is required";
    }

    if (name === "firstName" || name === "lastName") {
      if (!/^[A-Za-z\s]+$/.test(value)) message = "Only letters allowed";
    }

    if (name === "tel") {
      if (!/^\d{10}$/.test(value)) message = "Phone must be 10 digits";
    }

    if (name === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) message = "Invalid email";
    }

    if (name === "password") {
      if (!/^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(value))
        message = "Password must be at least 6 characters and include a number";
    }

    if (name === "confirmPassword") {
      if (value !== formData.password) message = "Passwords do not match";
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Run validation for all fields
    Object.keys(formData).forEach((key) => validateField(key, formData[key]));

    // Check if any errors exist
    if (Object.values(errors).some((msg) => msg)) {
      alert("Please fix the errors in the form");
      return;
    }

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key !== "confirmPassword" && formData[key]) data.append(key, formData[key]);
      });

      const result = await axios.post("http://localhost:3000/sellereg", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Signup successful! Waiting for admin approval.");
      navigate("/loginpage");
    } catch (error) {
      console.error("Signup failed:", error.response || error.message);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="add-product-container">
      <h1>Sign Up</h1>

      <div className="image-upload-group">
        {preview && <img src={preview} alt="Preview" className="preview-image" />}
        <label htmlFor="file-upload" className="custom-file-input">
          Choose Image
        </label>
        <input
          id="file-upload"
          type="file"
          name="image"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>

      <form className="add-product-form" onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Enter First Name"
          required
        />
        {errors.firstName && <p className="error">{errors.firstName}</p>}

        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Enter Last Name"
          required
        />
        {errors.lastName && <p className="error">{errors.lastName}</p>}

        <label>Phone Number</label>
        <input
          type="tel"
          name="tel"
          value={formData.tel}
          onChange={handleChange}
          placeholder="Enter Phone Number"
          required
        />
        {errors.tel && <p className="error">{errors.tel}</p>}

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Email"
          required
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter Address"
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter Password"
          required
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <label>Re-enter Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Re-enter Password"
          required
        />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signupage;
