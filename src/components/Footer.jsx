import React from "react";
import logo from "../images/Mann Ko Bhawana.png"; // Import the image
import '@fortawesome/fontawesome-free/css/all.min.css';


const Footer = () => {
  return (
    <>
      <footer id="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <a href="index.html">
                <img
                  src={logo}
                  alt="Logo"
                  className="img-fluid logo-footer"
                />
              </a>
              <div className="footer-about">
                <p>We're committed to providing the best mental health resources. If you or someone you know is in a mental health crisis or danger, please seek immediate medical help. Our resources are designed to support and inform, but they are not a substitute for professional care.</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="useful-link">
                <h2>Useful Links</h2>
                <img src="./assets/images/about/home_line.png" alt="" className="img-fluid" />
                <div className="use-links">
                  <li><a href="index.html"><i className="fa-solid fa-angles-right"></i> Home</a></li>
                  <li><a href="about.html"><i className="fa-solid fa-angles-right"></i> About Us</a></li>
                  <li><a href="gallery.html"><i className="fa-solid fa-angles-right"></i> Gallery</a></li>
                  <li><a href="contact.html"><i className="fa-solid fa-angles-right"></i> Contact</a></li>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="social-links">
                <h2>Follow Us</h2>
                <img src="./assets/images/about/home_line.png" alt="" />
                <div className="social-icons">
                  <li><a href="#"><i className="fa-brands fa-facebook-f"></i> Facebook</a></li>
                  <li><a href="#"><i className="fa-brands fa-instagram"></i> Instagram</a></li>
                  <li><a href="#"><i className="fa-brands fa-linkedin-in"></i> Linkedin</a></li>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="address">
                <h2>Address</h2>
                <img src="./assets/images/about/home_line.png" alt="" className="img-fluid" />
                <div className="address-links">
                  <li className="address1"><i className="fa-solid fa-location-dot"></i> Kumaripati lalitpur</li>
                  <li><a href="#"><i className="fa-solid fa-phone"></i> +977 9800000000</a></li>
                  <li><a href="#"><i className="fa-solid fa-envelope"></i>info@gmail.com</a></li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

     
        <div className="copy-right-sec">
          <i className="fa-solid fa-copyright"></i> Copyright <a href="#">Asmita Don</a>
        </div>
    
      <style jsx>{`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-size: 14px;
    background: #fff;
    max-width: 1920px;
    margin: 0 auto;
    overflow-x: hidden;
    font-family: poppins;
    min-height: 100vh; 
  }

  #footer {
    background: #f7f7f7;
    padding: 3rem 0; 
    background-image: url(https://arena.km.ua/wp-content/uploads/3538533.jpg);
    background-size: cover; 
    background-position: center; 
    width: 100%; 
    position: relative; 
  }

  .logo-footer {
    max-width: 100%;
  }

  .social-links {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .social-links h2 {
    padding-bottom: 10px; 
    font-size: 18px; 
    font-weight: 600;
  }

  .social-links img {
    padding-bottom: 15px; 
  }

  .social-icons {
    display: flex;
    flex-direction: column;
    gap: 0.5rem; 
    color: #777777;
  }

  .social-icons a {
    color: #777777;
  }

  .social-icons a:hover {
    color: #000;
  }

  .social-icons a i {
    box-shadow: rgb(0 0 0 / 8%) 0px 4px 8px; 
    padding: 0.3rem 0.8rem; 
    border-radius: 3px;
    color: #b2d5f5;
    font-size: 14px;
    margin-right: 8px; 
  }

  li {
    list-style: none;
  }

  .useful-link h2 {
    padding-bottom: 10px; 
    font-size: 18px;
    font-weight: 600;
  }

  .useful-link img {
    padding-bottom: 10px; 
  }

  .use-links {
    line-height: 28px;
  }

  .use-links li i {
    font-size: 12px;
    padding-right: 6px; 
    color: #898989;
  }

  .use-links li a {
    color: #777777;
    font-size: 14px; 
    font-weight: 500;
  }

  .use-links li a:hover {
    color: #000;
  }

  .address h2 {
    padding-bottom: 10px; 
    font-size: 18px; 
    font-weight: 600;
  }

  .address img {
    padding-bottom: 10px; 
  }

  .address-links li a {
    color: #777777;
    font-size: 14px; 
    font-weight: 500;
  }

  .address-links li i {
    font-size: 14px;
    padding-right: 6px; 
    color: #b2d5f5;
  }

  .address-links li i:nth-child(1) {
    padding-top: 7px; 
  }

  .address-links .address1 {
    font-weight: 500;
    font-size: 14px; 
    display: flex;
  }

  .address-links {
    line-height: 28px; 
    color: #777777;
  }

  #copy-right {
    background: #b2d5f5; 
    width: 100%; 
    position: relative;
  }

  .copy-right-sec {
    padding: 0.5rem; 
    background: #b2d5f5; 
    color: #fff;
    text-align: center;
    font-size: 14px;
  }

  .copy-right-sec a {
    color: black;
    font-weight: 500;
  }

  a {
    text-decoration: none;
  }
`}</style>





    </>
  );
};

export default Footer;
