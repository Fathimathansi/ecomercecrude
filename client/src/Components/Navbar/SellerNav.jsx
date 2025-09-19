import React, { useEffect, useState } from 'react';
import './SellerNav.css';
import logo from '../Navbar/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function SellerNav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedLogin = localStorage.getItem('isLoggedin');
    setIsLoggedIn(storedLogin === 'true');
  }, []);

  const handleLogout = () => {
    localStorage.setItem('isLoggedin', 'false'); 
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate('/');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="change">
      <nav className="navbar navbar-expand-sm full_nav">
        <div className="container-fluid">
          {/* Logo */}
          <img className="logo_image" src={logo} alt="logo" />

          {/* Toggler Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
            aria-controls="mynavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible Navbar */}
          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button
                  className="nav-link text-light btn btn-link"
                  style={{ textDecoration: 'none' }}
                  onClick={() => navigate(isLoggedIn ? '/home' : '/sellerdashboard')}
                >
                  Home
                </button>
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

            {/* Auth buttons inside the same toggle */}
            <div className="d-flex ms-auto mt-2 mt-sm-0">
                 <Link to="/sellerprofile">
    <button className="btn btn-outline-warning rounded-pill me-2">
      <FontAwesomeIcon icon={faUser} className="me-2" />
      Profile
    </button>
  </Link>
             
              
                <button
                  className="btn btn-outline-danger rounded-pill ms-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default SellerNav;
