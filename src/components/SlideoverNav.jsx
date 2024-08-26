import React, { useState } from 'react';
import '../css/SlideoverNav.css';
import { useNavigate } from 'react-router-dom';
import PushUpWord from './PushUpWord';
import resumePDF from '../assets/resume.pdf';

const SlideoverNav = ({ menuOpen, setMenuOpen }) => {
  const navigate = useNavigate();

  const [linkHoverIndex, setLinkHoverIndex] = useState(-1);
  const handleLinkMouseEnter = (index) => setLinkHoverIndex(index);
  const handleLinkMouseLeave = () => setLinkHoverIndex(-1);

  const navItems = [
    { title: "HOME", to: "/" },
    { title: "ABOUT", to: "/About" },
    { title: "PROJECTS", to: "/Projects" },
  ];

  const linkItems = [
    { title: "LINKEDIN", link: 'https://www.linkedin.com/in/jaedon-taylor/' },
    { title: "GITHUB", link: 'https://github.com/jtaylor205' },
    { title: "RESUME", link: resumePDF, isDownload: true }, // Mark the resume link as a download
  ];

  const handleNavClick = (to) => {
    sessionStorage.setItem('navigate', 'true'); // Mark the transition
    setMenuOpen(false); // Close the slideover nav
    navigate(to); // Navigate to the selected route
  };

  const handleLinkClick = (link, isDownload) => {
    if (isDownload) {
      // Create a temporary <a> element to trigger the download
      const linkElement = document.createElement('a');
      linkElement.href = link;
      linkElement.download = 'Jaedon_Taylor_Resume.pdf'; // Set the name for the downloaded file
      document.body.appendChild(linkElement);
      linkElement.click();
      document.body.removeChild(linkElement);
    } else if (link.startsWith('http')) {
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
          <div 
            key={index} 
            onClick={() => handleLinkClick(item.link, item.isDownload)} // Handle click for resume download
          >
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
