import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./TotalUsers.css";



const TotalUsers = () => {
  
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/getall") // ✅ backend API
      .then((res) => {
        setUsers(res.data.users); // ✅ use response data
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

    <div className="users-container">
      <h2>Total Users</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user,index) => (
            <tr key={user.id}>
               <td>{index + 1}</td>
              <td>{user.firstName}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default TotalUsers;
