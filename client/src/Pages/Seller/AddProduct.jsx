import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import './AddProduct.css';


const AddProduct = () => {
const Sellerid=(localStorage.getItem("sellerid"))
console.log(Sellerid);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    price: '',
    category: '',
    stockQuantity: '',
    image: null,
     SellerId:Sellerid
  });
  const [product, setproduct] = useState({});
  const [preview, setPreview] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file
      });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    const data = new FormData();
    data.append('productName', formData.productName);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('stockQuantity', formData.stockQuantity);
    data.append('SellerId',formData.SellerId) 
    if (formData.image) {
      data.append('image', formData.image);
    console.log('Product data:', formData);
    alert('Product added successfully!');
    navigate('/sellerdashboard'); // Redirect after adding
  };


    axios.post("https://ecomercecrude-app.onrender.com/products", data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((result) => {
      console.log(result);
      alert("Success");
      navigate("/productlist")
    })
    .catch((error) => {
      console.log(error);
    });

   

  };
  
  const quickActions = [
    'Add Product',
    'Orders',
    'View Product',
    'Messages',
    'Settings'
  ];

  return (
      <div className="add-product-page">

           <div className="sidebar">
        <h2>Quick Actions</h2>
        {quickActions.map((action, index) => 
        action=== 'Orders' ? (
            <Link key={index} to="/orderlist" className="sidebar-link">
              {action}
            </Link>
            
              ) :action === 'Add Product' ? (
      <Link key={index} to="/addproduct" className="sidebar-link">
        {action}
      </Link>
    ) :
             action === 'View Product' ? (
      <Link key={index} to="/productlist" className="sidebar-link">
        {action}
      </Link>
     ) : (
          <button key={index} onClick={() => handleSidebarClick(action)}>
            {action}
          </button>
          
        ))}
        
      </div>
    <div className="add-product-container">
   
      
      <h1>Add New Product</h1>

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
        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          id="name"
          name="productName"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter product name"
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Write a short product description"
          required
        />

        <label htmlFor="price">Price ($)</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="e.g. 49.99"
          step="0.01"
          required
        />

        <label htmlFor="category">Category</label>
<select
  id="category"
  name="category"
  value={formData.category}
  onChange={handleChange}
  required
>
  <option value="">-- Select a Category --</option>
  <option value="Electronics">Electronics</option>
  <option value="Fashion">Fashion</option>
  <option value="Grocery">Grocery</option>
  <option value="Furniture">Furniture</option>
  <option value="Home Appliances">Home Appliances</option>
  <option value="Kids Fashion">Kids Fashion</option>
  <option value="Luggage">Luggage</option>
  <option value="Beauty">Beauty</option>
  <option value="Food">Food</option>
</select>


        <label htmlFor="stock">Stock Quantity</label>
        <input
          type="number"
          id="stock"
          name="stockQuantity"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Number of items available"
          required
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
    </div>
  );
};

export default AddProduct;
