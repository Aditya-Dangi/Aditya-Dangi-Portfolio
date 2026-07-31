import React from "react";
import "./index.css";
import Home from "./routes/Home";
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<Home />} />
        <Route path="/Contact" element={<Home />} />
        <Route path="/Project" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
