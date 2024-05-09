import React from 'react';
import Hamburger from './Hamburger';

const SlideoverNav = ({ menuOpen, setMenuOpen }) => {
  const navItems = [
    { title: "HOME" },
    { title: "ABOUT" },
    { title: "PROJECTS" },
  ];

  return (
    <div className={`slideover-container ${menuOpen ? 'open' : ''}`}>
      <div className="hamburger-right">
        <Hamburger menuOpen={menuOpen} setMenuOpen={setMenuOpen} className="hamburger-slideover" />
      </div>
      <div className="nav-list">
        {navItems.map((item, index) => (
          <div key={index} className="nav-item">
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlideoverNav;
