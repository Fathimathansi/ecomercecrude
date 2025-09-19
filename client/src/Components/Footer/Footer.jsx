import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPinterestP } from '@fortawesome/free-brands-svg-icons';
import { faYoutube} from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom';
import "./Footer.css"


function Footer() {
    return (
        <div className='full_footer'>
            <div className="footer_baground row text-light">
                <div className=" col-sm-3 mt-4">
                   
                <h6><b className='congo '>CONGO</b>KART</h6>
               
               
<a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
  <FontAwesomeIcon className='icons' icon={faFacebookF}/>
</a>
<a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
  <FontAwesomeIcon className='icons' icon={faTwitter}/>
</a>
<a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
  <FontAwesomeIcon className='icons' icon={faInstagram}/>
</a>
<a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
  <FontAwesomeIcon className='icons' icon={faPinterestP}/>
</a>
<a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
  <FontAwesomeIcon className='icons' icon={faYoutube}/>
</a>

      
                </div>
                <div className=" col-sm-3 mt-4 full_font">
                <h6>Quick Link</h6>
                <Link className='footer_content'   to="/home">Home</Link>
                    <br />
                    <Link className='footer_content'to="/aboutus">About</Link><br/>
                    <Link className='footer_content'to="/contactus">Contact</Link><br/>
                    <Link className='footer_content'to="/login">Login</Link>
                   
                    
                </div>
                <div className=" col-sm-3 mt-4 full_font">
                <h6>Terms & Polices</h6>
                    <a className='footer_content'  href="#">Terms of Conditions</a><br></br>
                    <a className='footer_content'  href="#">F&Q</a><br></br>
                    <a className='footer_content'  href="#">Privacy Policy</a>
               </div>
               <div className="col-sm-3 mt-4 full_font">
                  <h6>Get In Touch</h6>
                  <a className='footer_content' href="#">0471-252544</a> <br />
                  <a className='footer_content' href="#">blogsphere@gmail.com</a>
               </div>
               <footer className='footer text-light text-center py-3'>
               <small className='full_font'>@ 2025 CongoHub. All rights reserved.</small>
               </footer>
               
               
            </div>
            
           
        </div>
    )
}

export default Footer
