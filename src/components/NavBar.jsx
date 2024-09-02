import React, { useEffect, useRef } from 'react';
import '../css/NavBar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PushUpWord from './PushUpWord';
import Hamburger from './Hamburger';
import SlideoverNav from './SlideoverNav';

const NavBar = ({ menuOpen, setMenuOpen, navigateButtonRef }) => {  
  const hamburgerRef = useRef(null);
  const slideoverNavRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { title: "ABOUT", to: "/About" },
    { title: "PROJECTS", to: "/Projects" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Closes menu if click is outside of hamburger / slideoverNav
      const isOutsideClick = 
        (slideoverNavRef.current && !slideoverNavRef.current.contains(event.target)) &&
        (hamburgerRef.current && !hamburgerRef.current.contains(event.target));

      const isOutsideNavigateButton = 
        navigateButtonRef.current && !navigateButtonRef.current.contains(event.target);

      if (isOutsideClick && (!navigateButtonRef.current || isOutsideNavigateButton)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setMenuOpen, navigateButtonRef]);

  const handleNavClick = (to) => {
    if (location.pathname === to) {
      window.location.reload();
    } else {
      sessionStorage.setItem('navigate', 'true');
      navigate(to);
    }
  };

  return (
    <div className={'navbar-container'}>
      <div className={`nav-name-container`}>
        <div onClick={() => handleNavClick('/')}>
          <Link className="nav-name" to="/">
            JT
          </Link>
        </div>
      </div>
      <div className="nav-list">
        {navItems.map((item, index) => (
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
