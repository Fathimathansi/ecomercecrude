import React, { useEffect, useState } from 'react';
import './HomeNav.css';
import logo from '../Navbar/logo.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';

function HomeNav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();  // 👈 grabs the product ID
 
  useEffect(() => {
    const storedLogin = localStorage.getItem('isLoggedin');
    setIsLoggedIn(storedLogin === 'true');
  }, []);

  const handleLogout = () => {
    localStorage.setItem('isLoggedin', 'false'); // fixed key name
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleUserClick = () => {
    if (isLoggedIn) {
      // Navigate to profile page or show dropdown
      navigate('/profile');
    } else {
      navigate('/userprofile');
    }
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
                <button
                  className="nav-link text-light btn btn-link"
                  style={{ textDecoration: 'none' }}
                  onClick={() => navigate(isLoggedIn ? '/home' : '/homepage')}
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

            <div className="d-flex align-items-center ms-4">
           
          <Link to={`/addtocart/${id}`}> <button className="btn btn-outline-warning rounded-pill me-3">
                <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                View Cart
              </button></Link>
            <button
                className="btn btn-outline-warning rounded-pill"
                onClick={handleUserClick}
              >
                <FontAwesomeIcon icon={faUser} className="me-2" />
                {isLoggedIn ? "Profile" : "Profile"}
              </button>
              {isLoggedIn && (
                <button
                  className="btn btn-outline-danger rounded-pill ms-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default HomeNav;
