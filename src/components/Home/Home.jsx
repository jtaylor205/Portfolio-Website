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
          <div
            className='navigate-button'
            onClick={() => { setMenuOpen(!menuOpen); }}
            ref={navigateButtonRef}
          >
             <span className="button-text">My work</span>
          </div>
          <div className='navigate-button'
            onClick={() => setIsContactModalOpen(true)}>
            <span className="button-text">Contact</span>
          </div>
        </div>
      </div>
      <div className="fixed bottom-8 left-8 flex space-x-4">
        {linkItems.map((item, index) => (
          <a
            href={item.link}
            target={item.onClick ? '_self' : '_blank'}
            rel={item.onClick ? undefined : "noopener noreferrer"}
            key={index}
            onClick={() => handleLinkClick(item.link, item.isDownload)}
          >
            <div className="bg-white text-white bg-opacity-30 hover:bg-opacity-60 backdrop-blur-md w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110">
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
