import React, { useState, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import NavBar from "./components/NavBar";
import About from "./components/About/About";
import Projects from './components/Projects/Projects';
import Home from './components/Home/Home';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigateButtonRef = useRef(null);  // Create a ref for the navigate button

  return (
    <header className="App-header">
      <div>
        <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} navigateButtonRef={navigateButtonRef} />
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route index element={<Home menuOpen={menuOpen} setMenuOpen={setMenuOpen} navigateButtonRef={navigateButtonRef} />} />
            <Route path="/About" element={<About />} />
            <Route path="/Projects" element={<Projects />} />
          </Routes>
        </AnimatePresence>
        
      </div>
    </header>
  );
}

export default App;
