import React, { useState } from 'react';
import linkedInLogo from '../assets/linkedin.png';
import gitHubLogo from '../assets/github.png';
const NavBar = () => {
  const [isShrunk, setIsShrunk] = useState(false);

  const handleTextClick = () => {
    setIsShrunk(!isShrunk);
  };

  const navItems = [
    {title: "About"},
    {title: "Projects"},
    {title: "Resume"}
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
    {navItems.map((item) => (<div className="nav-item">{item.title}</div>))}
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
