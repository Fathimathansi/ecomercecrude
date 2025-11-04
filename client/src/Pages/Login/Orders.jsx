import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate,Link } from 'react-router-dom';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID not found in local storage. Please log in.");
      return;
    }

    axios
      .get(`https://ecomercecrude-app.onrender.com/viewallpurchases`)
      .then((response) => {
        const fetchedOrders = response.data.data;
        if (Array.isArray(fetchedOrders)) {
          setOrders(fetchedOrders);
          console.log("Fetched Orders:", fetchedOrders);
        } else {
          console.error("API response for orders is not an array:", fetchedOrders);
          setOrders([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching the purchases:", err);
        alert("Failed to load your orders. Please try again later.");
        setOrders([]);
      });
  }, []);
  
  const quickActions = [
    'Add Product',
    'Orders',
    'View Product',
    'Messages',
    'Settings'
  ];

  return (
     
    <div className="order-list-container">
    
      <h1>Your Purchase History</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Buyer Name</th>
              <th>Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((orderItem) => (
              <tr key={orderItem._id}>
                <td>{orderItem._id}</td>
                <td>
                  {orderItem.productIds &&
                  orderItem.productIds.length > 0 &&
                  orderItem.productIds[0]?.image?.filename ? (
                    <img
                      src={`http://localhost:3000/upload/${orderItem.productIds[0].image.filename}`}
                      alt={orderItem.productIds[0].name || "Product"}
                      className="table-product-image"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td>
                  {orderItem.productIds && orderItem.productIds.length > 0
                    ? orderItem.productIds[0].productName
                    : "N/A"}
                </td>
                <td>{orderItem.quantity || "1"}</td>
                <td>
                  {orderItem.productIds && orderItem.productIds.length > 0
                    ? `$${orderItem.productIds[0].price?.toFixed(2) || "0.00"}`
                    : "N/A"}
                </td>
                <td>{orderItem.fullName || "N/A"}</td>
                <td>{new Date(orderItem.purchaseDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  
  );
};

export default Orders;
