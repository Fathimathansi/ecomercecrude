import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./TotalProducts.css";



const TotalProducts = () => {
  
  
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/getproduct") // ✅ backend API
      .then((res) => {
         console.log("API Response:", res.data); // 👀 check shape
        setProducts(res.data.data); // ✅ use response data
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

    <div className="products-container">
      <h2>Total Products</h2>
      <table className="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Decription</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
             <td>{index + 1}</td>
              <td>{product.productName}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default TotalProducts;
