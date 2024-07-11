import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./NavbarStyle.css";
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const [color, setColor] = useState(false);
  const changeColor = () => {
    if (window.scrollY >= 10) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return () => {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);

  return (
    <div className={color ? "header header-bg" : "header"}>
      <Link to="/">
        <h1 className="portfolio-title">
          <span className="water-text">Portfolio</span>
          <span className="water-fill">Portfolio</span>
        </h1>
      </Link>
      <ul className={click ? "nav-menu active" : "nav-menu"}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Project">Project</Link>
        </li>
        <li>
          <Link to="/About">About</Link>
        </li>
        <li>
          <Link to="/Contact">Contact</Link>
        </li>
        <li>
          <Link to="https://drive.google.com/file/d/1lpY1gL8af6tX-iRrs9bBwoVt6ZQOiwTF/view" target='black'>
            <button>
              Resume
            </button>
          </Link>
        </li>
      </ul>
      <div className={`hamburger ${click ? 'spin' : ''}`} onClick={handleClick}>
        {click ? (
          <FaTimes size={30} style={{ color: "white" }} />
        ) : (
          <FaBars size={30} style={{ color: "white" }} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
