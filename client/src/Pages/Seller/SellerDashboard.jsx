import React, { useState, useEffect } from 'react';
import './SellerDashboard.css';
import { Link,useNavigate } from 'react-router-dom'; 

const SellerDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSales: 0,
    newProducts: 0,
    balance: 0,
    isLoading: true
  });

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: ''
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        totalProducts: 1200,
        totalSales: 850,
        newProducts: 45,
        balance: 12500,
        isLoading: false
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSidebarClick = (action) => {
    if (action === 'Add Product') {
      setShowModal(true);
    } else {
      alert(`${action} feature coming soon!`);
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      alert('Please enter product name and price');
      return;
    }

    const product = {
      id: Date.now(),
      ...newProduct,
      price: parseFloat(newProduct.price),
      dateAdded: new Date().toLocaleDateString()
    };

    setProducts(prev => [...prev, product]);

    setStats(prev => ({
      ...prev,
      totalProducts: prev.totalProducts + 1,
      newProducts: prev.newProducts + 1
    }));

    setShowModal(false);
    setNewProduct({ name: '', price: '', category: '', description: '' });
    alert('Product added!');
    
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);

  const quickActions = [
    'Add Product',
    'Orders',
    'View Product',
    'Messages',
    'Settings'
  ];

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
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

      {/* Main Dashboard */}
      <div className="dashboard">
        <h1>Seller Dashboard</h1>

      </div>

   
    </div>
  );
};


const styles = {
  modalBackdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 999,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    marginTop: '14px',
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    marginBottom: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc'
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px'
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#10b981',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#e5e7eb',
    color: '#111827',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};

export default SellerDashboard;
