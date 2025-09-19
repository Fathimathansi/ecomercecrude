import React, { useState, useEffect } from 'react';
import './CartFooter.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CartFooter = ({ orders, onCartUpdate }) => {
  const [total, setTotal] = useState(0);
  const [productIds, setProductIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Calculate total price
    const addedProductsTotal = orders.reduce((sum, order) => {
      if (order.ProductId && typeof order.ProductId.price === 'number') {
        return sum + order.ProductId.price;
      }
      return sum;
    }, 0);

    // Extract all product IDs
    const ids = orders
      .filter(order => order.ProductId && order.ProductId._id)
      .map(order => order.ProductId._id);

    setTotal(addedProductsTotal);
    setProductIds(ids);
  }, [orders]);

  const handleBuyDetails = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert("Please log in to buy products!");
      return;
    }

    if (!orders || orders.length == 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/buycart/${userId}`);

      if (response.data.success) {
        alert(response.data.msg || "Purchase successful!");

        // Clear cart in parent component if callback provided
        if (onCartUpdate) onCartUpdate([]);

        // Navigate to BuyNow with purchased productIds
        navigate('/Buynow', { state: { productIds } });
      } else {
        alert(response.data.msg || "Purchase failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong while buying the products.");
    }
  };

  return (
    <div className="cart-footer">
      <div className="cart-total">
        <span className="label">Total:</span>
        <span className="amount">${total.toFixed(2)}</span>
      </div>
      <button className="add-to-cart-btn" onClick={handleBuyDetails}>
        Buy Now
      </button>
    </div>
  );
};

export default CartFooter;
