import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import { Link } from 'react-router-dom';

import homeimage1 from './homeimage1.jpg';
import homeimage2 from './homeimage2.jpg';
import homeimage3 from './homeimage3.jpg';

function HomePage() {
  const [products, setProducts] = useState([]);
  const api = "https://fakestoreapi.com/products";

  useEffect(() => {
    async function fetchApi() {
      try {
        const response = await axios.get(api);
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }
    fetchApi();
  }, []);

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
                <Link to='/login'> <button  className="btn login-button" type="button">Logout</button>  </Link>
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
       <p  className="card-main1"> <b className="card-main">Shop By Category</b> <br />Save up to 40% with bulk purchase  </p>
       
    
      {products.map((item) => (
        <Link to={`/productdetails/${item.id}`} key={item.id} className="card-link">
         
          <div className="card">
            <img className="card-image" src={item.image} alt={item.title} />
            <div className="card-body">
              <h5 className="card-heading">{item.title}</h5>
              <p>${item.price}</p>
              
            </div>
            </div>
        </Link>
      
      ))}
    </div>  
    </div>
  );
}

export default HomePage;
