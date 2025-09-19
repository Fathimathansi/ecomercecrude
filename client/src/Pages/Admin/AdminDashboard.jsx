import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ sellers: 0, users: 0, products: 0 });
  const [pendingSellers, setPendingSellers] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch stats
    axios.get("http://localhost:3000/sellergetall")
      .then(res => setStats(p => ({ ...p, sellers: res.data.sellers?.length || 0 })));
    axios.get("http://localhost:3000/getall")
      .then(res => setStats(p => ({ ...p, users: res.data.users?.length || 0 })));
    axios.get("http://localhost:3000/getproduct")
      .then(res => {
        const data = res.data.data || res.data.products || res.data;
        setStats(p => ({ ...p, products: Array.isArray(data) ? data.length : 0 }));
      });

    // Fetch pending sellers
    axios.get("http://localhost:3000/seller/pending")
      .then(res => setPendingSellers(res.data.sellers || []));

    // Fetch contact messages
    axios.get("http://localhost:3000/viewcontact")
      .then(res => setMessages(res.data.data || []))
      .catch(err => console.error("Error fetching messages:", err));
  }, []);

  const handleApprove = id => {
    axios.put(`http://localhost:3000/seller/approve/${id}`)
      .then(() => setPendingSellers(prev => prev.filter(s => s._id !== id)));
  };

  const handleReject = id => {
    axios.delete(`http://localhost:3000/seller/reject/${id}`)
      .then(() => setPendingSellers(prev => prev.filter(s => s._id !== id)));
  };

  const handleDeleteMessage = id => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    axios.delete(`http://localhost:3000/deletecontact/${id}`)
      .then(() => setMessages(prev => prev.filter(m => m._id !== id)))
      .catch(err => console.error("Error deleting message:", err));
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <Link to="/totalsellers"><button><li>Total Sellers</li></button></Link>
          <Link to="/totalusers"><button><li>Total Users</li></button></Link>
             
          <Link to="/totalproducts"><button><li>Total Products</li></button></Link>
           <Link to="/newregistration"> <button><li>New Registration</li></button></Link>
     
        </ul>
      </aside>

      <main className="main-content">
        <div className="stats">
          <div className="card">Total Sellers: {stats.sellers}</div>
          <div className="card">Total Users: {stats.users}</div>
          <div className="card">Total Products: {stats.products}</div>
        </div>

        <div className="contact-messages">
          <h3>Contact Us Messages</h3>
          {messages.length ? messages.map(msg => (
            <div key={msg._id} className="message-card">
              <p><strong>Name:</strong> {msg.name}</p>
              <p><strong>Email:</strong> {msg.email}</p>
              <p><strong>Subject:</strong> {msg.subject}</p>
              <p><strong>Message:</strong> {msg.message}</p>
              <button className="delete-msg" onClick={() => handleDeleteMessage(msg._id)}>Delete</button>
            </div>
          )) : <p>No messages</p>}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
