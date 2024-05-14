import React, { useState, useEffect, useRef } from 'react';
import PushUpWord from './PushUpWord';
import Hamburger from './Hamburger';
import SlideoverNav from './SlideoverNav';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const slideoverNavRef = useRef(null);
  const hamburgerRef = useRef(null);

  const navItems = [
    { title: "HOME" },
    { title: "ABOUT" },
    { title: "PROJECTS" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
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

  return (
    <div className={'nav-container'}>
      <div className={`nav-name-container`}>
        <div className="nav-name">JT</div>
      </div>
      <div className="nav-list">
        {navItems.map((item, index) => (
          <div key={index}>
            <PushUpWord word={item.title} alternate={true} wordClass={'nav-item'} letterClass={'letter'} />
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
