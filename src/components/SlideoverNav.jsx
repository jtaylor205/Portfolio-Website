import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PushUpWord from './PushUpWord';

const SlideoverNav = ({ menuOpen, setMenuOpen }) => {
  const [navHoverIndex, setNavHoverIndex] = useState(-1);
  const navigate = useNavigate();

  const handleNavMouseEnter = (index) => setNavHoverIndex(index);
  const handleNavMouseLeave = () => setNavHoverIndex(-1);

  const [linkHoverIndex, setLinkHoverIndex] = useState(-1);
  const handleLinkMouseEnter = (index) => setLinkHoverIndex(index);
  const handleLinkMouseLeave = () => setLinkHoverIndex(-1);

  const navItems = [
    { title: "HOME", to: "/" },
    { title: "ABOUT", to: "/About" },
    { title: "PROJECTS", to: "/Projects" },
  ];

  const linkItems = [
    { title: "LINKEDIN", link: 'https://www.linkedin.com/in/jaedon-taylor-982316102/' },
    { title: "GITHUB", link: 'https://github.com/jtaylor205' },
    { title: "RESUME", link: '/resume' },  // Assuming RESUME is an internal route
  ];

  const handleNavClick = (to) => {
    sessionStorage.setItem('navigate', 'true'); // Mark the transition
    setMenuOpen(false); // Close the slideover nav
    navigate(to); // Navigate to the selected route
  };

  const handleLinkClick = (link) => {
    if (link.startsWith('http')) {
      window.open(link, '_blank'); // Open external link in a new tab
    } else {
      setMenuOpen(false); // Close the slideover nav
      navigate(link); // Navigate to the internal route
    }
  };

  return (
    <div className={`slideover-container ${menuOpen ? 'open' : ''}`}>
      <div className="slideover-tabs-container">
        {navItems.map((item, index) => (
          <div key={index} onClick={() => handleNavClick(item.to)}>
            <div>
              <PushUpWord
                word={item.title}
                alternate={false}
                wordClass={'slideover-tab'}
                letterClass={'slideover-letter'}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="slideover-links-container">
        {linkItems.map((item, index) => (
          <div key={index} onClick={() => handleLinkClick(item.link)}>
            <div
              className={`slideover-link ${linkHoverIndex === index ? 'hover' : ''}`}
              onMouseEnter={() => handleLinkMouseEnter(index)}
              onMouseLeave={handleLinkMouseLeave}
            >
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlideoverNav;
