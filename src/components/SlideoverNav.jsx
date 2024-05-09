import React, { useState } from 'react';

const SlideoverNav = ({ menuOpen, setMenuOpen }) => {
  const [navHoverIndex, setNavHoverIndex] = useState(-1);
  const handleNavMouseEnter = (index) => setNavHoverIndex(index);
  const handleNavMouseLeave = () => setNavHoverIndex(-1);

  const [linkHoverIndex, setLinkHoverIndex] = useState(-1);
  const handleLinkMouseEnter = (index) => setLinkHoverIndex(index);
  const handleLinkMouseLeave = () => setLinkHoverIndex(-1);


  const navItems = [
    { title: "HOME" },
    { title: "ABOUT" },
    { title: "PROJECTS" },
  ];

  const linkItems = [
    {title: "LINKEDIN", link: 'https://www.linkedin.com/in/jaedon-taylor-982316102/'},
    {title: "GITHUB", link: 'https://github.com/jtaylor205'},
    {title: "RESUME"},
  ];

  return (
    <div className={`slideover-container ${menuOpen ? 'open' : ''}`}>
      <div className="slideover-tabs-container">
        {navItems.map((item, index) => (
          <div key={index}>
            <div
              className={`slideover-tab ${navHoverIndex === index ? 'hover' : ''} ${index === 0 && navHoverIndex === 0 ? 'first-hover' : ''}`}
              onMouseEnter={() => handleNavMouseEnter(index)}
              onMouseLeave={handleNavMouseLeave}
            >
              {item.title}
            </div>
          </div>
        ))}
      </div>
      <div className="slideover-links-container">
        {linkItems.map((item, index) => (
          <div key={index}>
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