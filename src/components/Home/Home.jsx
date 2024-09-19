// Home.js
import React, { useState, useEffect } from 'react';
import '../../css/Home.css';
import homeDots from './homeDots';
import Transition from '../transition';
import { RandomReveal } from 'react-random-reveal';
import resumePDF from '../../assets/resume.pdf';
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import { BiSolidFile } from "react-icons/bi";
import ContactModal from '../ContactModal'; // Import the ContactModal component

const Home = ({ menuOpen, setMenuOpen, navigateButtonRef }) => {
  // State to control modal visibility
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Initialize homeDots and add resize listener
  useEffect(() => {
    let cleanupDots = homeDots();

    const handleResize = () => {
      if (cleanupDots) cleanupDots();
      cleanupDots = homeDots();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (cleanupDots) cleanupDots();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const linkItems = [
    { title: "LINKEDIN", link: 'https://www.linkedin.com/in/jaedon-taylor/', imgSrc: <FaLinkedinIn />, alt: "Linkedin" },
    { title: "GITHUB", link: 'https://github.com/jtaylor205', imgSrc: <SiGithub />, alt: "Github" },
    { title: "RESUME", link: resumePDF, imgSrc: <BiSolidFile />, alt: "Resume", isDownload: true },
  ];

  const handleLinkClick = (link, isDownload) => {
    if (isDownload) {
      const linkElement = document.createElement('a');
      linkElement.href = link;
      linkElement.download = 'Jaedon_Taylor_Resume.pdf';
      document.body.appendChild(linkElement);
      linkElement.click();
      document.body.removeChild(linkElement);
    } else {
      window.open(link, '_blank');
    }
  };

  // Close modal function
  const closeModal = () => {
    setIsContactModalOpen(false);
  };

  return (
    <div className="home-container">
      <canvas className="connecting-dots"></canvas>
      <div className='heading'>
        <div className='heading-title'>
          <RandomReveal isPlaying duration={2} characters="Jaedon Taylor" />
        </div>
        <div className='subHeading'>University of Florida Student</div>
        <div className='subHeading'>Computer Science</div>
        <div className='navigate-button-container'>
          <p
            className='navigate-button'
            onClick={() => { setMenuOpen(!menuOpen); }}
            ref={navigateButtonRef}
          >
            My work
          </p>
          <p className='navigate-button'>
            {/* onClick={() => setIsContactModalOpen(true)}>*/} 
            {/* Contact */}
            <a href="mailto:JaedonATaylor@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
              Contact
            </a>
          </p>
        </div>
      </div>
      <div className='bottomButtons'>
        {linkItems.map((item, index) => (
          <a
            href={item.link}
            target={item.onClick ? '_self' : '_blank'}
            rel={item.onClick ? undefined : "noopener noreferrer"}
            key={index}
            onClick={() => handleLinkClick(item.link, item.isDownload)}
          >
            <div className={`bottom-button`}>
              {item.imgSrc}
            </div>
          </a>
        ))}
      </div>

      {/* Conditionally render the ContactModal */}
      {isContactModalOpen && <ContactModal closeModal={closeModal} />}
    </div>
  );
};

export default Transition(Home);
