import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import img from "../Login/logo.png";

import './IntroPage.css';

function IntroPage() {
  const navigate = useNavigate();
  const audioRef = useRef(null);

  // Function to try playing the audio
  const tryPlay = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((e) => {
        console.log("Audio playback failed:", e);
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/landing');
    }, 2000);

    window.addEventListener("click", tryPlay, { once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", tryPlay);
    };
  }, [navigate]);

  const word = "Congokart";

  return (
    <div className="intro-wrapper">
      {/* Optional: Add audio tag if you're using sound */}
      <audio ref={audioRef} src="/path-to-audio.mp3" preload="auto" />

      <div className="intro-content">
        <img className="intro-img" src={img} alt="Logo" />
        <h1 className="intro-title">
          {word.split("").map((char, i) => (
            <span
              key={i}
              className={`intro-letter delay-${i} ${i < 5 ? 'congo' : 'kart'}`}
            >
              {char}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
}

export default IntroPage;
