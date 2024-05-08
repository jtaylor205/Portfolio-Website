import React, { useState } from 'react';
import PushUpWord from './PushUpWord';
import Hamburger from './Hamburger';
const NavBar = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(-1);
  
  const handleMouseEnter = index => setHoverIndex(index);
  const handleMouseLeave = () => setHoverIndex(-1);

  const handleTextClick = () => {
    setIsShrunk(!isShrunk);
  };

  const navItems = [
    {title: "HOME"},
    {title: "ABOUT"},
    {title: "PROJECTS"},
  ];

  return (
    <div className={'nav-container'}>
    <div className={`nav-name-container ${isShrunk ? 'shrunk' : ''}`}>
        <div className="nav-name" onClick={handleTextClick}>JT</div>
    </div>
    <div className="nav-list">
        {navItems.map((item, index) => (
          <div key={index}>
            <PushUpWord word={item.title} />
          </div>
        ))}
    </div>
    <Hamburger />
</div>
  );
};

export default NavBar;
