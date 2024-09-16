import React, { useEffect, useState, useRef } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import NavBar from "./components/NavBar";
import About from "./components/About/About";

import Projects from './components/Projects/Projects';
import Home from './components/Home/Home';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navigateButtonRef = useRef(null);

  // Redirect logic to handle ?redirect=/path query parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirectPath = params.get('redirect');

    if (redirectPath && location.pathname === '/') {
      // Redirect to the specified path using HashRouter's pattern
      navigate(redirectPath, { replace: true });
    }
  }, [navigate, location.pathname]);

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
