import React from 'react';
import "./HeroImgStyle.css";
import IntroImg from "../assets/heroimg.jpeg";
import { Link } from 'react-router-dom';
import Type from './Type';
import HeroImage from "../assets/hero2.jpg";

const HeroImg = () => {
  return (
    <div className='main-div'>
      <div className='mask'>
            <img className='into-img' src={IntroImg} alt='HeroImg' />
      </div>
      <div className='main-content'>
        <div className='heroimg-content'>
          <p className='welcome-text'>Hi,</p>
          <p>
            <span className='span-context'>
              I am a 
            </span>  
            <span className='span-text'>
              <Type text={"Final-year B.Tech student pursuing my degree in\nInformation Technology"} speed={100} />
            </span>
          </p>
          <Link to="/Contact"> 
            <button className='btn-flip btn2' data-front="CONTACT" data-back="ME"></button>
          </Link>
        </div>
        
          <img className='hero-img-2' src={HeroImage} alt="HeroImg2" />
        
      </div>
    </div>
  );
}

export default HeroImg;
