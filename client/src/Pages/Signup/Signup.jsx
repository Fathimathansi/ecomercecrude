import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
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
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // validate on change
    validateField(name, value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const validateField = (name, value) => {
    let message = "";

    if (!value && name !== "address") {
      message = "This field is required";
    }
 if (name === "firstName" || name === "lastName") {
    const nameRegex = /^[A-Za-z\s]+$/; // Only letters and spaces
    if (!nameRegex.test(value)) message = "Only letters are allowed";
  }
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) message = "Invalid email address";
    }

    if (name === "tel") {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(value)) message = "Phone number must be 10 digits";
    }

    if (name === "password") {
      const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
      if (!pwdRegex.test(value))
        message = "Password must be at least 6 chars and include a number";
    }

    if (name === "confirmPassword" && value !== formData.password) {
      message = "Passwords do not match";
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const validateForm = () => {
    const fields = ["firstName", "lastName", "tel", "email", "password", "confirmPassword"];
    let valid = true;
    fields.forEach((field) => {
      validateField(field, formData[field]);
      if (errors[field]) valid = false;
    });
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Please fix validation errors before submitting");
      return;
    }

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key !== "confirmPassword" && formData[key]) {
          data.append(key, formData[key]);
        }
      });

      const result = await axios.post("http://localhost:3000/usereg", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Signup successful!");
      navigate("/login");
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
        <label htmlFor="file-upload" className="custom-file-input">Choose Image</label>
        <input
          id="file-upload"
          type="file"
          name="image"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>

      <form className="add-product-form" onSubmit={handleSubmit}>
        {["firstName", "lastName", "tel", "email", "address", "password", "confirmPassword"].map((field) => (
          <div key={field} className="form-group">
            <label htmlFor={field}>{field === "tel" ? "Phone Number" : field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field.includes("password") ? "password" : field === "tel" ? "tel" : "text"}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Enter ${field}`}
              required={field !== "address"}
            />
            {errors[field] && <span className="error">{errors[field]}</span>}
          </div>
        ))}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
