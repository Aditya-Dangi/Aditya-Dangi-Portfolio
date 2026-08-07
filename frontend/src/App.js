import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import ScrollToTop from "./components/ScrollToTop";

/**
 * Every route renders the same single-page portfolio; the legacy paths are
 * kept so existing links and bookmarks continue to resolve.
 */
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
