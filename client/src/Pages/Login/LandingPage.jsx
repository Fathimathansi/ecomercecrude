import React, { useEffect, useState } from 'react';
import './LandingPage.css';
import grocery from './grocery.jpg';
import fashion from './fashion.jpg';
import food from './food.jpg';
import electronics from './electronics.jpg';
import furniture from './furniture.jpg';
import homeappliance from './homeappliance.jpg';
import kids from './kids.png';
import luggage from './lagagge.png';
import makeup1 from './makeup1.png';
import { Link } from 'react-router-dom';

function LandingPage() {
   const [showLogo, setShowLogo] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    
    const logoTimer = setTimeout(() => {
      setShowLogo(false); 
      setShowContent(true); 
    }, 100);

    return () => clearTimeout(logoTimer);
  }, []);

  return (
    <div>
     <div className="landing_page">
         <div className={`landing_content ${showContent ? 'slide-in' : ''}`}>
        <h1 className="body_heading">
          Step into the world of <b className="congo">Congo</b>kart
        </h1>
        <p className="body_content">Discover Thousands of Products. One Seamless Experience.</p>
        <p className="body_content1">
          From everyday essentials to unique finds, we bring you a curated collection of high-quality
          items — all at unbeatable prices.
        </p>
        <Link to="/login">
          <button className="landing_button">Buy Now</button>
        </Link>
      </div>
      </div>

      {/* Product Cards Section */}
      <div className="row landing_cards">
        {[
          { img: grocery, title: 'Grocery', desc: 'Fresh produce, daily essentials, and pantry must-haves.' },
          { img: fashion, title: 'Fashion', desc: 'Trendy styles and timeless classics for everyone.' },
          { img: electronics, title: 'Electronics', desc: 'Latest gadgets, devices, and accessories at great prices.' }
        ].map((item, index) => (
          <div key={index} className="col-sm-12 col-lg-4">
            <div className="container mt-3">
              <div className="card" style={{ width: '100%' }}>
                <img className="card-img-top" src={item.img} alt={item.title} />
                <div className="card-body">
                  <h4 className="card-title">{item.title}</h4>
                  <p className="card-text">{item.desc}</p>
                  <Link to="/login" className="btn shop-now">Shop Now</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row landing_cards">
        {[
          { img: food, title: 'Food', desc: 'Tasty snacks, meals, and gourmet ingredients delivered.' },
          { img: furniture, title: 'Furniture', desc: 'Modern and classic pieces for every room.' },
          { img: homeappliance, title: 'Home Appliances', desc: 'Efficient and smart appliances to simplify your life.' }
        ].map((item, index) => (
          <div key={index} className="col-sm-12 col-lg-4">
            <div className="container mt-3">
              <div className="card" style={{ width: '100%' }}>
                <img className="card-img-top" src={item.img} alt={item.title} />
                <div className="card-body">
                  <h4 className="card-title">{item.title}</h4>
                  <p className="card-text">{item.desc}</p>
                  <Link to="/login" className="btn shop-now">Shop Now</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row landing_cards">
        {[
          { img: kids, title: 'Kids Fashion', desc: 'Adorable and comfy clothes for all ages.' },
          { img: luggage, title: 'Luggage and Baggage', desc: 'Stylish and durable luggage for all your travel needs.' },
          { img: makeup1, title: 'Beauty', desc: 'Explore makeup, skincare, and grooming essentials.' }
        ].map((item, index) => (
          <div key={index} className="col-sm-12 col-lg-4">
            <div className="container mt-3">
              <div className="card" style={{ width: '100%' }}>
                <img className="card-img-top" src={item.img} alt={item.title} />
                <div className="card-body">
                  <h4 className="card-title">{item.title}</h4>
                  <p className="card-text">{item.desc}</p>
                  <Link to="/login" className="btn  shop-now">Shop Now</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
   </div>
  );
}

export default LandingPage;
