import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const SellerId = localStorage.getItem("Sellerid");
  console.log(SellerId);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
    SellerId: SellerId,
    image: null,
  });

  const [preview, setPreview] = useState(null);

  
  useEffect(() => {
    axios
      .get(`https://ecomercecrude-app.onrender.com/productid/${id}`)
      .then((response) => {
     setFormData(response.data.data);

        
        if (response.data.data.image) {
          setPreview(`https://ecomercecrude-app.onrender.com/upload/${response.data.data.image.filename}`);
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
    data.append("productName", formData.productName);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("stockQuantity", formData.stockQuantity);
    data.append("SellerId", formData.SellerId);

   
    if (formData.image && formData.image instanceof File) {
      data.append("image", formData.image);
    }

    axios
      .put(`hhttps://ecomercecrude-app.onrender.com/updateproduct/${id}`, data)
      .then((result) => {
        console.log(result);
        
        alert("Product updated successfully");
        navigate("/productlist");
      })
      .catch((error) => {
        console.error("Update error:", error);
      });
  };
console.log(formData);

  return (
    <div className="add-product-container">
      <h1>Update Product</h1>

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

        <label>Product Name</label>
        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>Price ($)</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
          required
        />

        <label>Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <label>Stock Quantity</label>
        <input
          type="number"
          name="stockQuantity"
          value={formData.stockQuantity}
          onChange={handleChange}
          required
        />

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
