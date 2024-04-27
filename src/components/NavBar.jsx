import React, { useState } from 'react';
import linkedInLogo from '../assets/linkedin.png';
import gitHubLogo from '../assets/github.png';
import PushUpWord from './PushUpWord';
const NavBar = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(-1);

  const handleMouseEnter = index => setHoverIndex(index);
  const handleMouseLeave = () => setHoverIndex(-1);

  const handleTextClick = () => {
    setIsShrunk(!isShrunk);
  };

  const navItems = [
    {title: "ABOUT"},
    {title: "PROJECTS"},
    {title: "RESUME"}
  ];
  const outLinks = [
    {title: "Github", logo: gitHubLogo, link: "https://github.com/jtaylor205"},
    {title: "Linkedin", logo: linkedInLogo, link: "https://www.linkedin.com/in/jaedon-taylor-982316102"}
  ];

  return (
    <div className={'nav-container'}>
    <div className={`nav-name-container ${isShrunk ? 'shrunk' : ''}`}>
        <div className="nav-name" onClick={handleTextClick}>JAEDON</div>
        <div className="nav-name" onClick={handleTextClick}>TAYLOR</div>
    </div>
    <div className="nav-list">
        {navItems.map((item, index) => (
          <div key={index}>
            <PushUpWord word={item.title} />
          </div>
        ))}
        {outLinks.map((link, index) => (
            <a key={index} href={link.link} className="link-item" target="_blank" rel="noopener noreferrer">
                <img src={link.logo} alt={link.title + " logo"} className="link-logo" />
            </a>
        ))}
    </div>
</div>
  );
};

export default NavBar;
