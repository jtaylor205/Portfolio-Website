import React, { useState, useEffect, useRef } from 'react';
import '../css/NavBar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PushUpWord from './PushUpWord';
import Hamburger from './Hamburger';
import SlideoverNav from './SlideoverNav';

const NavBar = () => {
  // Define the state for menu open/close
  const [menuOpen, setMenuOpen] = useState(false);

  // Define refs for the hamburger and slideover navigation elements
  const hamburgerRef = useRef(null);
  const slideoverNavRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { title: "HOME", to: "/" },
    { title: "ABOUT", to: "/About" },
    { title: "PROJECTS", to: "/Projects" },
  ];

  useEffect(() => {
    
    const handleClickOutside = (event) => {
      // Closes menu if click is outside of hamburger / slideoverNav
      if (
        slideoverNavRef.current &&
        !slideoverNavRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavClick = (to) => {
    if (location.pathname === to) {
      // If the user is already on the current route, refresh the page
      window.location.reload();
    } else {
      // Otherwise, navigate to the new route
      sessionStorage.setItem('navigate', 'true');
      navigate(to);
    }
  };

  return (
    <div className={'nav-container'}>
      <div className={`nav-name-container`}>
        <div onClick={() => handleNavClick('/')}>
          <Link className="nav-name" to="/">
            JT
          </Link>
        </div>
      </div>
      <div className="nav-list">
        {navItems.map((item, index) => (
          //For each item in navItems, creates a spot on navbar with alternating PushUpWord
          <div key={index} onClick={() => handleNavClick(item.to)}>
            <Link className="nav-link" to={item.to}>
              <PushUpWord
                word={item.title}
                alternate={true}
                wordClass={'nav-item'}
                letterClass={'letter'}
              />
            </Link>
          </div>
        ))}
      </div>
        
      <div ref={hamburgerRef}>
        <Hamburger menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </div>
      <div ref={slideoverNavRef}>
        <SlideoverNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </div>
    </div>
  );
};

export default NavBar;
