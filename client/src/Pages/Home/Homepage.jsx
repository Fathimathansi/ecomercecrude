import React, { useEffect, useState } from 'react';
import './Homepage.css';

// Import your images here
import grocery from './grocery.jpg';
import fashion from './fashion.jpg';
import food from './food.jpg';
import electronics from './electronics.jpg';
import furniture from './furniture.jpg';
import homeappliance from './homeappliance.jpg';
import kids from './kids.jpg';
import luggage from './lagagge.jpg';
import makeup1 from './makeup1.jpg';
import { Link } from 'react-router-dom';

import homeimage1 from './homeimage1.jpg';
import homeimage2 from './homeimage2.jpg';
import homeimage3 from './homeimage3.jpg';

function Homepage() {
  const [products, setProducts] = useState([]);

  const categories = [
    {
      img: grocery,
      title: 'Grocery',
      desc: 'Fresh produce, daily essentials, and pantry must-haves.',
      featured: true
    },
    {
      img: fashion,
      title: 'Fashion',
      desc: 'Trendy styles and timeless classics for everyone.',
      featured: true
    },
    {
      img: electronics,
      title: 'Electronics',
      desc: 'Latest gadgets, devices, and accessories at great prices.',
      featured: true
    },
    {
      img: food,
      title: 'Food',
      desc: 'Tasty snacks, meals, and gourmet ingredients delivered.',
      featured: false
    },
    {
      img: furniture,
      title: 'Furniture',
      desc: 'Modern and classic pieces for every room.',
      featured: false
    },
    {
      img: homeappliance,
      title: 'Home Appliances',
      desc: 'Efficient and smart appliances to simplify your life.',
      featured: false
    },
    {
      img: kids,
      title: 'Kids Fashion',
      desc: 'Adorable and comfy clothes for all ages.',
      featured: false
    },
    {
      img: luggage,
      title: 'Luggage',
      desc: 'Stylish and durable luggage for all your travel needs.',
      featured: false
    },
    {
      img: makeup1,
      title: 'Beauty',
      desc: 'Explore makeup, skincare, and grooming essentials.',
      featured: false
    }
  ];

  const featuredCategories = categories.filter(cat => cat.featured);
  const regularCategories = categories.filter(cat => !cat.featured);

  return (
    <div className="homepage">
     

      {/* Hero Section */}
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

      {/* Categories Section */}
      <div className="categories-section">
        {/* Featured Categories */}
        <h2 className="section-title">Featured Categories</h2>
        <p className="section-subtitle">
          Explore our top categories with special offers
        </p>
         
        
        <div className="featured-grid">
          {featuredCategories.map((item, index) => (
            <div key={index} className="featured-card">
              <div className="featured-card-image-container">
                <img 
                  src={item.img} 
                  alt={item.title}
                  className="featured-card-image"
                />
                <div className="featured-badge">
                  Featured
                </div>
              </div>
              <div className="featured-card-body">
                <h3 className="featured-card-title">
                  {item.title}
                </h3>
                <p className="featured-card-desc">
                  {item.desc}
                </p>
                <Link to={`/home/${item.title}`} className="featured-shop-button">
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Regular Categories */}
       <h2 className="section-title-regular">All Categories</h2>
        
        <div className="regular-grid">
          {regularCategories.map((item, index) => (
            <div key={index} className="regular-card">
              <img 
                src={item.img} 
                alt={item.title}
                className="regular-card-image"
              />
              <div className="regular-card-body">
                <h4 className="regular-card-title">
                  {item.title}
                </h4>
                <p className="regular-card-desc">
                  {item.desc}
                </p>
                <Link to={`/home/${item.title}`}className="regular-explore-button">
                  Explore
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p className="footer-title">
          © 2024 Congokart. All rights reserved.
        </p>
        <p className="footer-subtitle">
          Your one-stop shop for everything you need.
        </p>
      </div>
    </div>
  );
}

export default Homepage;