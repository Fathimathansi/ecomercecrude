import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./NewRegistration.css";

const NewRegistration = () => {
  const [pendingSellers, setPendingSellers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/seller/pending")
      .then(res => setPendingSellers(res.data.sellers || []))
      .catch(err => console.error("Error fetching pending sellers:", err));
  }, []);

  const handleApprove = id => {
    axios.put(`http://localhost:3000/seller/approve/${id}`)
      .then(() => setPendingSellers(prev => prev.filter(s => s._id !== id)))
      .catch(err => console.error(err));
  };

  const handleReject = id => {
    axios.delete(`http://localhost:3000/seller/reject/${id}`)
      .then(() => setPendingSellers(prev => prev.filter(s => s._id !== id)))
      .catch(err => console.error(err));
  };

  return (
      <div className='dashboard-container'>
       <aside className="sidebar">
            <h2>Admin Panel</h2>
            <ul>
              <Link className="nav-link text-light" to="/totalsellers">
                <button>
                  <li>Total Sellers</li>
                </button>
              </Link>
              <Link className="nav-link text-light" to="/totalusers">
                <button>
                  <li>Total Users</li>
                </button>
              </Link>
              <Link className="nav-link text-light" to="/totalproducts">
                <button>
                  <li>Total Products</li>
                </button>
              </Link>
             <Link to="/newregistration"> <button><li>New Registration</li></button></Link>
            </ul>
             </aside>
    <div className="new-registration-page">
      <h2>New Seller Registrations</h2>
      {pendingSellers.length ? (
        pendingSellers.map(seller => (
          <div className="registration-card" key={seller._id}>
            <p><strong>Name:</strong> {seller.firstName} {seller.lastName}</p>
            <p><strong>Email:</strong> {seller.email}</p>
            <div className="buttons">
              <button className="accept" onClick={() => handleApprove(seller._id)}>Accept</button>
              <button className="reject" onClick={() => handleReject(seller._id)}>Reject</button>
            </div>
          </div>
        ))
      ) : (
        <p>No new seller registrations</p>
      )}
    </div>
    </div>
  );
};

export default NewRegistration;
