import React, { useState } from 'react';
import '../css/SlideoverNav.css';
import { useNavigate } from 'react-router-dom';
import PushUpWord from './PushUpWord';
import resumePDF from '../assets/resume.pdf';
import Headshot from '../assets/headshot.jpeg';


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
    sessionStorage.setItem('navigate', 'true'); 
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
  
    const infoHeader = document.querySelector('.info-header');
    if (infoHeader) { // Check if the element exists
      infoHeader.addEventListener('mousemove', (e) => {
        const { width, height, left, top } = infoHeader.getBoundingClientRect();
        const x = e.clientX - left - width / 2;
        const y = e.clientY - top - height / 2;
  
        const rotateX = (y / height) * 20;
        const rotateY = (x / width) * -20; 
  
        infoHeader.style.transition = 'none'; 
        infoHeader.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
  
      infoHeader.addEventListener('mouseleave', () => {
        //Resets when mouse leaves
        infoHeader.style.transition = 'transform 0.5s ease'; 
        infoHeader.style.transform = `rotateX(0deg) rotateY(0deg)`;
      });
    }

  

  return (
    <div className={`slideover-container ${menuOpen ? 'open' : ''}`}>
      <div className="info-header">
        <img className='info-image' src={Headshot} alt="Jaedon Taylor" />
        <div className="info-text">
          <p className="name">Jaedon Taylor</p>
          <p className="email">JaedonATaylor@gmail.com</p>
        </div>
      </div>
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
