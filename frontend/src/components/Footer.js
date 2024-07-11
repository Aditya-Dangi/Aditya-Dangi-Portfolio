import React from 'react';
import "./FooterStyle.css";
import { FaGithub, FaHome, FaLinkedin, FaMailBulk, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const iconSize = window.innerWidth < 1025 ? 25 : 45;

  const handlePhoneCall = () => {
    window.location.href = 'tel:+918178900995'; 
  };

  const handleEmail = () => {
    window.location.href = 'mailto:adityasinghdangi9899@gmail.com';
  };

  const openLocation = () => {
    window.open('https://www.google.com/maps/place/Delhi,+India', '_blank');
  };

  return (
    <div className='footer'>
      <div className='footer-container'>
        <div className='footer-left'>
          <div className='location' onClick={openLocation} style={{ cursor: "pointer" }}>
            <FaHome className='icon' size={iconSize} style={{ color: "white", marginRight: "1em" }} />
            <div>
              <p style={{ color: "white", fontWeight: "500", padding: 0, margin: 0 }}>Delhi, India</p>
            </div>
          </div>
          <div className='phone' onClick={handlePhoneCall} style={{ cursor: "pointer" }}>
            <div>
              <FaPhone className='icon' size={iconSize} style={{ color: "white", marginRight: "1em" }} />
            </div>
            <div>
              <p style={{ color: "white", fontWeight: "600", padding: 0, margin: 0 }}>
                +91 8178900995
              </p>
            </div>
          </div>
          <div className='mail' onClick={handleEmail} style={{ cursor: "pointer" }}>
            <FaMailBulk className='icon' size={iconSize} style={{ color: "white", marginRight: "1em" }} />
            <div>
              <p style={{ color: "white", fontWeight: "700", padding: 0, margin: 0 }}>
                adityasinghdangi9899<br />@gmail.com
              </p>
            </div>
          </div>
        </div>

        <div className='github'>
          <Link to="https://github.com/Aditya-Dangi" target='_blank' rel="noopener noreferrer">
            <FaGithub className='icon' size={iconSize} style={{ color: "white", marginRight: "1em" }} />
          </Link>
        </div>

        <div className='linkedin'>
          <Link to="https://www.linkedin.com/in/aditya-singh-dangi-1b38a2235" target='_blank' rel="noopener noreferrer">
            <FaLinkedin className='icon' size={iconSize} style={{ color: "white", marginRight: ".7em" }} />
          </Link>
        </div>

        <div className='footer-right'>
          <h1>About Me</h1>
          <p className='about-me'>
            I am an enthusiastic and dedicated third year student pursuing a bachelor's degree in information technology. With a strong curiosity for technology and its applications, I am committed to learning and enhancing my skills in the ever-evolving field of IT. I am excited to continue my journey in IT and am eager to seize opportunities that challenge me to grow and contribute positively to the tech industry.
          </p>
        </div>
      </div>
      <div className='footer-2'>
        <div className='footer-2-left'>
          designed and developed by <span className='name'>aditya singh dangi</span>
        </div>
        <div className='footer-2-right'>
          copyright<span className='name'>&copy;2024</span>
        </div>
      </div>
    </div>
  )
}

export default Footer;
