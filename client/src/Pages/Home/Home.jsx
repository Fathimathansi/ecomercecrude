import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import { Link, useParams } from 'react-router-dom';

import homeimage1 from './homeimage1.jpg';
import homeimage2 from './homeimage2.jpg';
import homeimage3 from './homeimage3.jpg';

function Home() {
  const [products, setProducts] = useState([]);
const {category}=useParams()
 useEffect(() => {
  axios
    .get("http://localhost:3000/getproduct")
    .then((response) => {
      const allProducts = response.data.data;

      // if category param exists, filter
      if (category) {
        const filtered = allProducts.filter(
          (p) => p.category?.toLowerCase() === category.toLowerCase()
        );
        setProducts(filtered);
      } else {
        setProducts(allProducts);
      }
    })
    .catch((err) => {
      console.error("Error fetching the products:", err);
    });
}, [category]); // run again when category changes


  return (
    <div className="homepage">
      {/* Navbar */}
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#"><b className='congo'>Congo</b><b>kart</b></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav navbar-nav1">
              {["Mens", "Womens", "Kids", "Beauty", "Grocery", "Home", "Food", "Electronics"].map((item, index) => (
                <li className="nav-item" key={index}>
                  <a className="nav-link" href="#">{item}</a>
                </li>
              ))}
            </ul>
            <div className='search-bar ms-auto'>
              <form className="d-flex">
                <input className="form-control me-2" type="text" placeholder="Search" />
                <button className="btn search-button" type="button">Search</button>
                <Link to='/login'>
                  <button className="btn login-button" type="button">Logout</button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </nav>

      {/* Carousel */}
      <div id="demo" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="home-image" src={homeimage1} alt="Slide 1" />
          </div>
          <div className="carousel-item">
            <img className="home-image" src={homeimage2} alt="Slide 2" />
          </div>
          <div className="carousel-item">
            <img className="home-image" src={homeimage3} alt="Slide 3" />
          </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* Featured Products Section */}
      <div className="product-container">
        <p className="card-main1">
          <b className="card-main">Shop By Category</b> <br />
          Save up to 40% with bulk purchase
        </p>

        {products.map((item) => (
          <div key={item.id} className="card">
            <div className="card-body">
              <img
                src={`http://localhost:3000/upload/${item.image?.filename}`}
                className="product-image"
                alt={item.name}
              />
              <h1>{item.productName}</h1>
              <h5 className="card-heading">{item.description}</h5>
              <p>${item.price}</p>
              <p>{item.category}</p>

              {/* View Details Button */}
              <Link to={`/productdetails/${item._id}`}>
                <button className="btn btn-info mt-2">View Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
