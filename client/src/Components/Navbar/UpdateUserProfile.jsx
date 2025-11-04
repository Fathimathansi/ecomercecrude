import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateUserProfile= () => {
  const UserId = localStorage.getItem("userId");
  console.log(UserId);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    tel: "",
    address: "",
    image: null
  });

  const [preview, setPreview] = useState(null);

  
  useEffect(() => {
    axios
      .get(`https://ecomercecrude-app.onrender.com/userbyid/${id}`)
      .then((response) => {
     setFormData(response.data.user);

        
        if (response.data.user.image) {
          setPreview(`https://ecomercecrude-app.onrender.com/upload/${response.data.user.image.filename}`);
        }
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
      setPreview(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("tel", formData.tel);
    data.append("email", formData.email);
    data.append("address", formData.address);
     if (formData.image && formData.image instanceof File) {
      data.append("image", formData.image);
    }

    axios
      .put(`http://localhost:3000/update/${id}`, data)
      .then((result) => {
        console.log(result);
        
        alert("Profile updated successfully");
        navigate("/userprofile");
      })
      .catch((error) => {
        console.error("Update error:", error);
      });
  };
console.log(formData);

  return (
    <div className="add-product-container">
      <h1>Update Profile</h1>

      <form className="add-product-form" onSubmit={handleSubmit}>
        <div className="image-upload-group">
          {preview && (
            <img src={preview} alt="Preview" className="image-preview" />
          )}
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

        <label>Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <label>Phone Number</label>
        <input
          name="tel"
          value={formData.tel}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          step="0.01"
          required
        />

        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

       

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateUserProfile;
