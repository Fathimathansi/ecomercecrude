import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

      const SellerId= localStorage.getItem("sellerid"); // Corrected variable name
      console.log(SellerId)
        if (!SellerId) {
            console.error("Seller ID not found in local storage.");
            return;
        }
    axios
      .get(`https://ecomercecrude-app.onrender.com/getproduct`) 
      .then((response) => {
        setProducts(response.data.data); 
        console.log(response.data.data);

             const sellerProducts = response.data.data.filter(product => product.SellerId._id === SellerId);
                setFilteredProducts(sellerProducts);
      })
      .catch((err) => {
        console.error("Error fetching the products:", err);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`https://ecomercecrude-app.onrender.com/deleteproduct/${id}`)
      .then(response => {
        console.log(response);
       
        setProducts(products.filter(p => p._id !== id));
      })
      .catch(err => {
        console.log("error", err);
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
    <div className="product-page">
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
    <div className="product-detail-container">
      
      {products.map((product) => (
        <div className="product-card" key={product._id}>
          {product.image && (
            <img 
              src={`http://localhost:3000/upload/${product.image.filename}`} 
              alt={product.productName} 
              className="product-image"
            />
          )}
          
         
          <div className="product-info">
            <h1 className="product-name">{product.productName}</h1>
          <p className="product-description">{product.description}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Stock:</strong> {product.stockQuantity}</p>
          </div>

          <div className="product-actions">
            <Link to={`/updateproduct/${product._id}`}>
              <button className="buy-btn">Update</button>
            </Link>
            <button className="buy-btn" onClick={() => handleDelete(product._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default ProductList;
