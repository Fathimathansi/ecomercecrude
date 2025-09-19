import React, { useEffect, useState } from 'react';
import './LandingPage.css';
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
          <p className="body_content">
            Discover Thousands of Products. One Seamless Experience.
          </p>
          <p className="body_content1">
            From everyday essentials to unique finds, we bring you a curated collection of
            high-quality items — all at unbeatable prices.
          </p>

          <div className="landing_buttons">
            <Link to="/login">
              <button className="landing_button">User Login</button>
            </Link>
            <Link to="/loginpage">
              <button className="landing_button">Seller Login</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
