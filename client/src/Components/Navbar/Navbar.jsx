import React, { useEffect, useState } from 'react';
import './Navbar.css';
import logo from '../Navbar/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedLogin = localStorage.getItem('isLoggedin');
    setIsLoggedIn(storedLogin === 'true');
  }, []);

  
  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className="change">
      <nav className="navbar navbar-expand-sm full_nav">
        <div className="container-fluid">
          <img className="logo_image" src={logo} alt="logo" />

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link text-light" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/aboutus">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/services">Services</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/contactus">Contact</Link>
              </li>
            </ul>
             <div className="d-flex align-items-center ms-4">
            <button className="btn btn-outline-warning rounded-pill me-3">
              <FontAwesomeIcon icon={faHeart} className="me-2" />
              Wishlist
            </button>
            <button className="btn btn-outline-warning rounded-pill">
              <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
              View Cart
            </button>
          </div>
           
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
