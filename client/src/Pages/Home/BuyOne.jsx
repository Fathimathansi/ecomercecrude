import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import './BuyOne.css';
import axios from 'axios';

const BuyOne = () => {
  const navigate = useNavigate();
  // Ensure userId is a clean string, remove extra quotes if present
  const rawUserId = localStorage.getItem('userId');
  const userId = rawUserId ? rawUserId.replace(/^"|"$/g, '') : null; // Remove leading/trailing quotes

  const location = useLocation();
  const { id } = useParams();

  // State for form
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    UserId: userId, // Use the cleaned userId
    productIds: id ? [id] : [], // Ensure productIds is always an array
    quantity: ''
  });

  const [errors, setErrors] = useState({});

  // If coming from cart with multiple productIds
  useEffect(() => {
    if (location.state && location.state.productIds) {
      // Ensure productIds from location.state are also cleaned if they might have quotes
      const cleanedProductIds = location.state.productIds.map(pid => typeof pid === 'string' ? pid.replace(/^"|"$/g, '') : pid);
      setFormData(prev => ({ ...prev, productIds: cleanedProductIds }));
    }
  }, [location.state]);

  // Handle inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: id === 'quantity' ? parseInt(value, 10) : value
    }));
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName) newErrors.fullName = 'Full Name is required.';
    if (!formData.address) newErrors.address = 'Shipping Address is required.';
    if (!formData.city) newErrors.city = 'City is required.';

    if (!/^\d{5}$/.test(formData.zip)) newErrors.zip = 'ZIP Code must be 5 digits.';
    if (!/^\d{16}$/.test(formData.cardNumber)) newErrors.cardNumber = 'Card Number must be 16 digits.';
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry)) newErrors.expiry = 'Expiry Date must be in MM/YY format.';
    if (!/^\d{3}$/.test(formData.cvv)) newErrors.cvv = 'CVV must be 3 digits.';
    if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = 'Quantity must be at least 1.';

    return newErrors;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate first
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (!userId) {
      alert("You must be logged in to make a purchase.");
      return;
    }

    try {
      // Update stock
      // Ensure the ID passed to BuyStock is clean
      await axios.put(`http://localhost:3000/BuyStock/${id.replace(/^"|"$/g, '')}`, {
        UserId: userId,
        count: formData.quantity
      });

      // Save order
      // Send formData directly, as UserId and productIds are now cleaned
      await axios.post(`http://localhost:3000/processcheckout/${id}`, formData); // Removed /${id} from here as productIds is in formData

      alert("Order Placed!");
      navigate('/orders');
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="buy-now-container">
      <div className="checkout-card">
        <div className="checkout-header">
          <h2 className="header-title">Secure Checkout</h2>
          <p className="header-subtitle">Complete your purchase</p>
        </div>

        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          {/* Shipping Info */}
          <div className="form-section">
            <h4 className="section-title">Shipping Information</h4>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                className="form-input"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && <p className="error-text">{errors.fullName}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="address">Shipping Address</label>
              <input
                type="text"
                id="address"
                className="form-input"
                placeholder="123 Main Street"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && <p className="error-text">{errors.address}</p>}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  className="form-input"
                  placeholder="Anytown"
                  value={formData.city}
                  onChange={handleChange}
                />
                {errors.city && <p className="error-text">{errors.city}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="zip">ZIP Code</label>
                <input
                  type="text"
                  id="zip"
                  className="form-input"
                  placeholder="12345"
                  value={formData.zip}
                  onChange={handleChange}
                />
                {errors.zip && <p className="error-text">{errors.zip}</p>}
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="form-section">
            <h4 className="section-title">Order Details</h4>
            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                id="quantity"
                className="form-input"
                placeholder="1"
                min="1"
                value={formData.quantity}
                onChange={handleChange}
              />
              {errors.quantity && <p className="error-text">{errors.quantity}</p>}
            </div>
          </div>

          {/* Payment */}
          <div className="form-section">
            <h4 className="section-title">Payment Details</h4>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                className="form-input"
                placeholder="**** **** **** ****"
                value={formData.cardNumber}
                onChange={handleChange}
              />
              {errors.cardNumber && <p className="error-text">{errors.cardNumber}</p>}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiry">Expiry Date</label>
                <input
                  type="text"
                  id="expiry"
                  className="form-input"
                  placeholder="MM/YY"
                  value={formData.expiry}
                  onChange={handleChange}
                />
                {errors.expiry && <p className="error-text">{errors.expiry}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  className="form-input"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleChange}
                />
                {errors.cvv && <p className="error-text">{errors.cvv}</p>}
              </div>
            </div>
          </div>
 
          <button type="submit" className="submit-btn">Place Order</button>
         
        </form>

        <div className="back-to-shop">
          <Link to="/">or Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default BuyOne;