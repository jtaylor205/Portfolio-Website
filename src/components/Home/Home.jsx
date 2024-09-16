import React, { useEffect} from 'react';
import '../../css/Home.css';
import homeDots from './homeDots';
import Transition from '../transition';
import { RandomReveal } from 'react-random-reveal';
import resumePDF from '../../assets/resume.pdf';
import {SiGithub} from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import { BiSolidFile } from "react-icons/bi";

const Home = ({menuOpen, setMenuOpen, navigateButtonRef }) => {
  useEffect(() => {
    const cleanupDots = homeDots();
    return () => {
      cleanupDots();
    };
  }, []);

  const linkItems = [
    { title: "LINKEDIN", link: 'https://www.linkedin.com/in/jaedon-taylor/', imgSrc: <FaLinkedinIn/>, alt: "Linkedin" },
    { title: "GITHUB", link: 'https://github.com/jtaylor205', imgSrc: <SiGithub/>, alt: "Github" },
    { title: "RESUME", link: resumePDF, imgSrc: <BiSolidFile/>, alt: "Resume", isDownload: true }, 
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
  

  return (
    <div className="home-container">
      <canvas className="connecting-dots"></canvas>
      <div className='heading'>
        <div className= 'heading-title'>
        <RandomReveal isPlaying duration={2} characters="Jaedon Taylor" />
        </div>
        <div className= 'subHeading'>University of Florida Student</div>
        <div className= 'subHeading'>Computer Science</div>
        <div 
          className='navigate-button' 
          onClick={() => {setMenuOpen(!menuOpen);}} 
          ref={navigateButtonRef} 
        >
          View my work
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
    </div>
  );
};

export default Transition(Home);
