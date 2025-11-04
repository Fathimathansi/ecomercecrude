import React, { useEffect, useState } from "react";
import './ContactUs.css'
import contactimage from '../../Pages/ContactUs/contactimage.png'
import {Link} from "react-router-dom"
import axios from "axios";

function ContactUs() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://ecomercecrude-app.onrender.com/addcontact', formData);
      alert(response.data.message);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to send message');
    }
  };


  return (
    <div >
      <h1><b className='congo'>Congo</b>kart Help Center| 24x7 Customer Care Support</h1>
      <p className='contactus_content'>The CongoKart Help Centre page offers a seamless way to resolve any issues you may encounter while shopping online. It covers a wide range of topics, such as order tracking, changing delivery schedules, returns, refunds, and much more—ensuring you can get back to enjoying your shopping experience without unnecessary delays.

Whether you're looking for information about CongoKart Rewards, payment methods, ongoing offers, or general shopping assistance, the Help Centre has it all. Convenient filters are listed on the left-hand side of the page, allowing you to quickly find the exact solution you're looking for—making your support journey simple, fast, and hassle-free.

You can also get in touch with customer support through the CongoKart Help Centre number or access live chat for professional assistance across a range of concerns. Our dedicated support team ensures prompt help so your overall shopping journey remains smooth and satisfying.

Don’t forget to let your family and friends know about the CongoKart Help Centre so they can also resolve their queries efficiently. Once all your concerns are addressed, you can dive right back into shopping for your favorite items—all in one place. And if you’re shopping during festive seasons or special sales, you’ll find unbeatable deals that are just too good to miss.</p>
<div className='full_contactus'>
<div className='help_center'>
<h5 className='contactus_content'>Help Centre</h5>
<div className='contact_us'>
<img className="contact_image" src={contactimage} alt="contactimage" />
<p>Login to get help with your recent orders and issues</p>
<button className='loginbtn'><Link className='loginbtn' to="/login">Login</Link></button>


</div>
</div>

</div>

<div style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required /><br /><br />
        <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required /><br /><br />
        <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required /><br /><br />
        <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required /><br /><br />
        <button type="submit">Send Message</button>
      </form>
    </div>
  


    </div>
  )
}

export default ContactUs
