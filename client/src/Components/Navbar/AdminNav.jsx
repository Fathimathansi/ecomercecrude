import React from 'react';
import './AdminNav.css';
import logo from '../Navbar/logo.png';
import { Link } from 'react-router-dom';

function AdminNav() {
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
                <Link to="/admindashboard">
                  <button
                    className="nav-link text-light btn btn-link"
                    style={{ textDecoration: 'none' }}
                  >
                    Home
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/aboutus">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/services">
                  Services
                </Link>
              </li>
            </ul>

            {/* Auth button */}
            <Link to="/adminlogin">
              <button className="btn btn-outline-warning rounded-pill">
                Login
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default AdminNav;
