import React, { useState } from 'react';
import PushUpWord from './PushUpWord';
import Hamburger from './Hamburger';
import SlideoverNav from './SlideoverNav';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false); 

  const navItems = [
    { title: "HOME" },
    { title: "ABOUT" },
    { title: "PROJECTS" },
  ];

  return (
    <div className={'nav-container'}>
      <div className={`nav-name-container`}>
        <div className="nav-name">JT</div>
      </div>
      <div className="nav-list">
        {navItems.map((item, index) => (
          <div key={index}>
            <PushUpWord word={item.title} />
          </div>
        ))}
      </div>
      <Hamburger menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <SlideoverNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </div>
  );
};

export default NavBar;
