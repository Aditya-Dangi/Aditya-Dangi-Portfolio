import React from 'react'
import Navbar from '../components/Navbar';
import Hero from "../components/HeroImg";
import Footer from "../components/Footer";
import AboutContent from "../components/About/About";
const Home = () => {
  return (
    <div>
      < Navbar />
      < Hero />
      < AboutContent />
      < Footer/>
    </div>
  )
}

export default Home