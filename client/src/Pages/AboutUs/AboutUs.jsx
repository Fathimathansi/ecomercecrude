import React from 'react';
import './AboutUs.css';
import aboutus1 from './aboutus1.png';

function AboutUs() {
  return (
    <div>
      <h1 className='heading1'><b className=''>About Us</b></h1>
      <p className='aboutus_content'>Congokart is guided by four principles: customer obsession rather than competitor focus, passion for invention, commitment to operational excellence, and long-term thinking. We strive to be Earth’s most customer-centric company, Earth’s best employer, and Earth’s safest place to work.</p>
     <img className="aboutus1 " src={aboutus1} alt="Slide 1" />
     <p className='aboutus_content'>Congokart’s “Day 1” mentality is our approach to doing everything with the energy and entrepreneurial spirit of a new organization on its first day.</p>
     <p>  Our mission is to make online shopping easy, affordable, and enjoyable. We bring a wide range of high-quality products
     to your fingertips with fast delivery and unbeatable prices.</p>
    </div>
  )
}

export default AboutUs
