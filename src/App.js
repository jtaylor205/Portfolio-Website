import React, {useState} from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import logo from './assets/linkedin.png';
import './App.css';
import NavBar from "./components/NavBar"
import About from "./components/About/About"
import Projects from './components/Projects/Projects';
import Home from './components/Home/Home';
import { AnimatePresence } from 'framer-motion';


function App() {

  const location = useLocation();
  return (
      
      <header className="App-header">
        <div>
          <NavBar/>
          <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route index element={<Home />}/>
            <Route path="/About" element={<About />} />
            <Route path="/Projects" element={<Projects />} />
          </Routes>
          </AnimatePresence>
        </div>
      </header>
      
  
  );
}

export default App;
