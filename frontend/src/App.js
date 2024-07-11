import React from "react";
import "./index.css";
import About from "./routes/About";
import Contact from "./routes/Contact";
import Home from "./routes/Home";
import Project from "./routes/Project";
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop"; 

function App() {
  return (
    <>
      <ScrollToTop /> 
      <Routes>
        <Route path="/About" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Project" element={<Project />} />
      </Routes>
    </>
  );
}

export default App;
