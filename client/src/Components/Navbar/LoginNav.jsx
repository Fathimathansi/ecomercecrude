import React, { useEffect, useState } from 'react';
import './LoginNav.css';
import logo from '../Navbar/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function LoginNav() {


  

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
                  onClick={() => navigate(isLoggedIn ? '/home' : '/login')}
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

           
          </div>
        </div>
      </nav>
    </div>
  );
}

export default LoginNav;
