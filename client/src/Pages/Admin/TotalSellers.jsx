import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./TotalSellers.css";


const TotalSellers = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/sellergetall") // ✅ backend API
      .then((res) => {
        setSellers(res.data.sellers); // ✅ use response data
      })
      .catch((err) => {
        console.error("Error fetching sellers:", err);
      });
  }, []);
   
   useEffect(() => {
    axios
      .get("http://localhost:3000/sellers") // ✅ only approved sellers
      .then((res) => {
        setSellers(res.data.sellers || []);
      })
      .catch((err) => {
        console.error("Error fetching sellers:", err);
      });
  }, []);

  
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
    <div className="sellers-container">
      <h2>Total Sellers</h2>
      <table className="sellers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((seller, index) => (
            <tr key={seller.id}>
              <td>{index + 1}</td>
              <td>{seller.firstName}</td>
              <td>{seller.email}</td>
              <td>{seller.tel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default TotalSellers;
